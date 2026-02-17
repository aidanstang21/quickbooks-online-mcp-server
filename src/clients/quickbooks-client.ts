import dotenv from "dotenv";
import QuickBooks from "node-quickbooks";
import OAuthClient from "intuit-oauth";
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import open from 'open';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Env vars from Claude Code (.mcp.json) take priority.
// Only fall back to .env if a key var is missing (e.g. running standalone).
if (!process.env.QUICKBOOKS_CLIENT_ID) {
  dotenv.config();
}

const client_id = process.env.QUICKBOOKS_CLIENT_ID;
const client_secret = process.env.QUICKBOOKS_CLIENT_SECRET;
const environment = process.env.QUICKBOOKS_ENVIRONMENT || 'sandbox';
const redirect_uri = process.env.QUICKBOOKS_REDIRECTURI || 'http://localhost:8000/callback';

// For tokens, read the freshest value from .mcp.json first (it gets updated
// on every token rotation), then fall back to env vars / .env file.
function readFreshestToken(): { refreshToken?: string; realmId?: string } {
  const mcpPath = path.resolve('/workspace/work/.mcp.json');
  try {
    if (fs.existsSync(mcpPath)) {
      const mcpConfig = JSON.parse(fs.readFileSync(mcpPath, 'utf-8'));
      const qbEnv = mcpConfig?.mcpServers?.quickbooks?.env;
      if (qbEnv) {
        return {
          refreshToken: qbEnv.QUICKBOOKS_REFRESH_TOKEN || process.env.QUICKBOOKS_REFRESH_TOKEN,
          realmId: qbEnv.QUICKBOOKS_REALM_ID || process.env.QUICKBOOKS_REALM_ID,
        };
      }
    }
  } catch { /* fall through */ }
  return {
    refreshToken: process.env.QUICKBOOKS_REFRESH_TOKEN,
    realmId: process.env.QUICKBOOKS_REALM_ID,
  };
}

const { refreshToken: refresh_token, realmId: realm_id } = readFreshestToken();

// Only throw error if client_id or client_secret is missing
if (!client_id || !client_secret || !redirect_uri) {
  throw Error("Client ID, Client Secret and Redirect URI must be set in environment variables");
}

class QuickbooksClient {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private refreshToken?: string;
  private realmId?: string;
  private readonly environment: string;
  private accessToken?: string;
  private accessTokenExpiry?: Date;
  private quickbooksInstance?: QuickBooks;
  private oauthClient: OAuthClient;
  private isAuthenticating: boolean = false;
  private redirectUri: string;

  constructor(config: {
    clientId: string;
    clientSecret: string;
    refreshToken?: string;
    realmId?: string;
    environment: string;
    redirectUri: string;
  }) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.refreshToken = config.refreshToken;
    this.realmId = config.realmId;
    this.environment = config.environment;
    this.redirectUri = config.redirectUri;
    this.oauthClient = new OAuthClient({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      environment: this.environment,
      redirectUri: this.redirectUri,
    });
  }

  private async startOAuthFlow(): Promise<void> {
    if (this.isAuthenticating) {
      return;
    }

    this.isAuthenticating = true;
    const port = 8000;

    return new Promise((resolve, reject) => {
      // Create temporary server for OAuth callback
      const server = http.createServer(async (req, res) => {
        if (req.url?.startsWith('/callback')) {
          try {
            const response = await this.oauthClient.createToken(req.url);
            const tokens = response.token;
            
            // Save tokens
            this.refreshToken = tokens.refresh_token;
            this.realmId = tokens.realmId;
            this.saveTokens();
            
            // Send success response
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
              <html>
                <body style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                  font-family: Arial, sans-serif;
                  background-color: #f5f5f5;
                ">
                  <h2 style="color: #2E8B57;">✓ Successfully connected to QuickBooks!</h2>
                  <p>You can close this window now.</p>
                </body>
              </html>
            `);
            
            // Close server after a short delay
            setTimeout(() => {
              server.close();
              this.isAuthenticating = false;
              resolve();
            }, 1000);
          } catch (error) {
            console.error('Error during token creation:', error);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(`
              <html>
                <body style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                  font-family: Arial, sans-serif;
                  background-color: #fff0f0;
                ">
                  <h2 style="color: #d32f2f;">Error connecting to QuickBooks</h2>
                  <p>Please check the console for more details.</p>
                </body>
              </html>
            `);
            this.isAuthenticating = false;
            reject(error);
          }
        }
      });

      // Start server
      server.listen(port, async () => {
        
        // Generate authorization URL with proper type assertion
        const authUri = this.oauthClient.authorizeUri({
          scope: [OAuthClient.scopes.Accounting as string],
          state: 'testState'
        }).toString();
        
        // Open browser automatically
        await open(authUri);
      });

      // Handle server errors
      server.on('error', (error) => {
        console.error('Server error:', error);
        this.isAuthenticating = false;
        reject(error);
      });
    });
  }

  private saveTokens(): void {
    // Primary: update .mcp.json so Claude Code passes the fresh token on next restart
    const mcpPaths = [
      path.join(__dirname, '..', '..', '..', '.mcp.json'),   // /workspace/work/.mcp.json
      path.resolve('/workspace/work/.mcp.json'),              // absolute fallback
    ];

    for (const mcpPath of mcpPaths) {
      try {
        if (!fs.existsSync(mcpPath)) continue;
        const mcpConfig = JSON.parse(fs.readFileSync(mcpPath, 'utf-8'));
        const qbEnv = mcpConfig?.mcpServers?.quickbooks?.env;
        if (!qbEnv) continue;

        if (this.refreshToken) qbEnv.QUICKBOOKS_REFRESH_TOKEN = this.refreshToken;
        if (this.realmId) qbEnv.QUICKBOOKS_REALM_ID = this.realmId;

        fs.writeFileSync(mcpPath, JSON.stringify(mcpConfig, null, 2) + '\n');
        break; // written successfully, no need to try the fallback path
      } catch (e) {
        // continue to next path
      }
    }

    // Secondary: also update .env for any direct-run / dev usage
    try {
      const envPath = path.join(__dirname, '..', '..', '.env');
      if (fs.existsSync(envPath)) {
        const envLines = fs.readFileSync(envPath, 'utf-8').split('\n');

        const updateEnvVar = (name: string, value: string) => {
          const index = envLines.findIndex(line => line.startsWith(`${name}=`));
          if (index !== -1) {
            envLines[index] = `${name}=${value}`;
          } else {
            envLines.push(`${name}=${value}`);
          }
        };

        if (this.refreshToken) updateEnvVar('QUICKBOOKS_REFRESH_TOKEN', this.refreshToken);
        if (this.realmId) updateEnvVar('QUICKBOOKS_REALM_ID', this.realmId);

        fs.writeFileSync(envPath, envLines.join('\n'));
      }
    } catch (e) {
      // .env update is best-effort
    }
  }

  async refreshAccessToken(): Promise<{ access_token: string; expires_in: number }> {
    if (!this.refreshToken) {
      await this.startOAuthFlow();
      
      // Verify we have a refresh token after OAuth flow
      if (!this.refreshToken) {
        throw new Error('Failed to obtain refresh token from OAuth flow');
      }
    }

    try {
      // At this point we know refreshToken is not undefined
      const authResponse = await this.oauthClient.refreshUsingToken(this.refreshToken);

      this.accessToken = authResponse.token.access_token;

      // Intuit rotates refresh tokens — persist the new one so it survives restarts
      if (authResponse.token.refresh_token) {
        this.refreshToken = authResponse.token.refresh_token;
        this.saveTokens();
      }

      // Calculate expiry time
      const expiresIn = authResponse.token.expires_in || 3600; // Default to 1 hour
      this.accessTokenExpiry = new Date(Date.now() + expiresIn * 1000);

      return {
        access_token: this.accessToken,
        expires_in: expiresIn,
      };
    } catch (error: any) {
      // If refresh token is expired/invalid, clear it and try full OAuth flow
      const msg = error.message || '';
      if (msg.includes('Token expired') || msg.includes('invalid_grant') || msg.includes('Token rejected')) {
        console.error('Refresh token expired or invalid, starting OAuth flow...');
        this.refreshToken = undefined;
        await this.startOAuthFlow();
        if (!this.refreshToken) {
          throw new Error('Failed to obtain new refresh token from OAuth flow');
        }
        // Retry with the fresh token
        return this.refreshAccessToken();
      }
      throw new Error(`Failed to refresh Quickbooks token: ${error.message}`);
    }
  }

  async authenticate() {
    if (!this.refreshToken || !this.realmId) {
      await this.startOAuthFlow();
      
      // Verify we have both tokens after OAuth flow
      if (!this.refreshToken || !this.realmId) {
        throw new Error('Failed to obtain required tokens from OAuth flow');
      }
    }

    // Check if token exists and is still valid
    const now = new Date();
    if (!this.accessToken || !this.accessTokenExpiry || this.accessTokenExpiry <= now) {
      const tokenResponse = await this.refreshAccessToken();
      this.accessToken = tokenResponse.access_token;
    }
    
    // At this point we know all tokens are available
    this.quickbooksInstance = new QuickBooks(
      this.clientId,
      this.clientSecret,
      this.accessToken!,
      false, // no token secret for OAuth 2.0
      this.realmId!, // Safe to use ! here as we checked above
      this.environment === 'sandbox', // use the sandbox?
      false, // debug?
      null, // minor version
      '2.0', // oauth version
      this.refreshToken
    );
    
    return this.quickbooksInstance;
  }
  
  getQuickbooks() {
    if (!this.quickbooksInstance) {
      throw new Error('Quickbooks not authenticated. Call authenticate() first');
    }
    return this.quickbooksInstance;
  }
}

export const quickbooksClient = new QuickbooksClient({
  clientId: client_id,
  clientSecret: client_secret,
  refreshToken: refresh_token,
  realmId: realm_id,
  environment: environment,
  redirectUri: redirect_uri,
});
