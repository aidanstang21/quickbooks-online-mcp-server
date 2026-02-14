import { reportTrialBalance } from "../handlers/report-trial-balance.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "report_trial_balance";
const toolDescription = "Get the Trial Balance report from QuickBooks Online. Options: start_date, end_date, accounting_method (Cash/Accrual), etc.";

const toolSchema = z.object({
  options: z.any().optional(),
});

type ToolParams = z.infer<typeof toolSchema>;

const toolHandler = async (args: any) => {
  const response = await reportTrialBalance(args.params.options || {});

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting Trial Balance report: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Trial Balance report:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const ReportTrialBalanceTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
