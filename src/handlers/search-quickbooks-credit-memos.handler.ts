import { quickbooksClient } from "../clients/quickbooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";
import { buildQuickbooksSearchCriteria } from "../helpers/build-quickbooks-search-criteria.js";

/**
 * Search credit memos in QuickBooks Online that match given criteria
 */
export async function searchQuickbooksCreditMemos(params: any): Promise<ToolResponse<any>> {
  try {
    await quickbooksClient.authenticate();
    const quickbooks = quickbooksClient.getQuickbooks();

    const criteria = buildQuickbooksSearchCriteria(params);

    return new Promise((resolve) => {
      quickbooks.findCreditMemos(criteria, (err: any, creditMemos: any) => {
        if (err) {
          resolve({
            result: null,
            isError: true,
            error: formatError(err),
          });
        } else {
          resolve({
            result: creditMemos,
            isError: false,
            error: null,
          });
        }
      });
    });
  } catch (error) {
    return {
      result: null,
      isError: true,
      error: formatError(error),
    };
  }
}
