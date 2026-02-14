import { reportProfitAndLossDetail } from "../handlers/report-profit-and-loss-detail.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "report_profit_and_loss_detail";
const toolDescription = "Get the Profit and Loss Detail report from QuickBooks Online. Options: start_date, end_date, accounting_method (Cash/Accrual), etc.";

const toolSchema = z.object({
  options: z.any().optional(),
});

type ToolParams = z.infer<typeof toolSchema>;

const toolHandler = async (args: any) => {
  const response = await reportProfitAndLossDetail(args.params.options || {});

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting Profit and Loss Detail report: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Profit and Loss Detail report:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const ReportProfitAndLossDetailTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
