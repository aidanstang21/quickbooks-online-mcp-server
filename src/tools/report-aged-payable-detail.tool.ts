import { reportAgedPayableDetail } from "../handlers/report-aged-payable-detail.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "report_aged_payable_detail";
const toolDescription = "Get the Aged Payable Detail report from QuickBooks Online. Options: start_date, end_date, accounting_method (Cash/Accrual), etc.";

const toolSchema = z.object({
  options: z.any().optional(),
});

type ToolParams = z.infer<typeof toolSchema>;

const toolHandler = async (args: any) => {
  const response = await reportAgedPayableDetail(args.params.options || {});

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting Aged Payable Detail report: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Aged Payable Detail report:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const ReportAgedPayableDetailTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
