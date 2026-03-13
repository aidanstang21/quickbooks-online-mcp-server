import dotenv from 'dotenv';
import OAuthClient from 'intuit-oauth';
import http from 'http';
import fs from 'fs';

dotenv.config();

const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_CLIENT_ID,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
  environment: process.env.QUICKBOOKS_ENVIRONMENT || 'production',
  redirectUri: 'http://localhost:8000/callback',
});

const authUri = oauthClient.authorizeUri({
  scope: [OAuthClient.scopes.Accounting],
  state: 'auth'
});

console.log('\n========================================');
console.log('Open this URL in your browser:');
console.log('========================================\n');
console.log(authUri);
console.log('\n========================================');
console.log('Waiting for callback on port 8000...');
console.log('========================================\n');

const server = http.createServer(async (req, res) => {
  if (req.url?.startsWith('/callback')) {
    try {
      const response = await oauthClient.createToken(req.url);
      const tokens = response.token;

      // Update .env file
      let envContent = fs.readFileSync('.env', 'utf-8');

      const updateEnv = (name, value) => {
        const regex = new RegExp(`^${name}=.*$`, 'm');
        if (envContent.match(regex)) {
          envContent = envContent.replace(regex, `${name}=${value}`);
        } else {
          envContent += `\n${name}=${value}`;
        }
      };

      updateEnv('QUICKBOOKS_REFRESH_TOKEN', tokens.refresh_token);
      updateEnv('QUICKBOOKS_REALM_ID', tokens.realmId);

      fs.writeFileSync('.env', envContent);

      console.log('\n✓ Success! Tokens saved to .env');
      console.log(`  Realm ID: ${tokens.realmId}`);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>Success!</h1><p>You can close this window. Return to your terminal.</p>');

      setTimeout(() => process.exit(0), 1000);
    } catch (error) {
      console.error('Error:', error.message);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`<h1>Error</h1><p>${error.message}</p>`);
    }
  }
});

server.listen(8000);
