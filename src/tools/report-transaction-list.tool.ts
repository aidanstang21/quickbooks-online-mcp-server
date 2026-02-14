import { reportTransactionList } from "../handlers/report-transaction-list.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "report_transaction_list";
const toolDescription = "Get the Transaction List report from QuickBooks Online. Options: start_date, end_date, accounting_method (Cash/Accrual), etc.";

const toolSchema = z.object({
  options: z.any().optional(),
});

type ToolParams = z.infer<typeof toolSchema>;

const toolHandler = async (args: any) => {
  const response = await reportTransactionList(args.params.options || {});

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting Transaction List report: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Transaction List report:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const ReportTransactionListTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
