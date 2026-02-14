import { reportTransactionListByVendor } from "../handlers/report-transaction-list-by-vendor.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "report_transaction_list_by_vendor";
const toolDescription = "Get the Transaction List by Vendor report from QuickBooks Online. Options: start_date, end_date, accounting_method (Cash/Accrual), etc.";

const toolSchema = z.object({
  options: z.any().optional(),
});

type ToolParams = z.infer<typeof toolSchema>;

const toolHandler = async (args: any) => {
  const response = await reportTransactionListByVendor(args.params.options || {});

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting Transaction List by Vendor report: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Transaction List by Vendor report:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const ReportTransactionListByVendorTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
