import { reportTransactionListWithSplits } from "../handlers/report-transaction-list-with-splits.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "report_transaction_list_with_splits";
const toolDescription = "Get the Transaction List with Splits report from QuickBooks Online. This is the closest report to bank transactions. Options: start_date, end_date, accounting_method (Cash/Accrual), etc.";

const toolSchema = z.object({
  options: z.any().optional(),
});

type ToolParams = z.infer<typeof toolSchema>;

const toolHandler = async (args: any) => {
  const response = await reportTransactionListWithSplits(args.params.options || {});

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting Transaction List with Splits report: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Transaction List with Splits report:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const ReportTransactionListWithSplitsTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
