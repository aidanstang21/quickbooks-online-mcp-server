import { reportAgedReceivableDetail } from "../handlers/report-aged-receivable-detail.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "report_aged_receivable_detail";
const toolDescription = "Get the Aged Receivable Detail report from QuickBooks Online. Options: start_date, end_date, accounting_method (Cash/Accrual), etc.";

const toolSchema = z.object({
  options: z.any().optional(),
});

type ToolParams = z.infer<typeof toolSchema>;

const toolHandler = async (args: any) => {
  const response = await reportAgedReceivableDetail(args.params.options || {});

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting Aged Receivable Detail report: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Aged Receivable Detail report:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const ReportAgedReceivableDetailTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
