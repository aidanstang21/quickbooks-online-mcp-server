import { reportGeneralLedgerDetail } from "../handlers/report-general-ledger-detail.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "report_general_ledger_detail";
const toolDescription = "Get the General Ledger Detail report from QuickBooks Online. Options: start_date, end_date, accounting_method (Cash/Accrual), etc.";

const toolSchema = z.object({
  options: z.any().optional(),
});

type ToolParams = z.infer<typeof toolSchema>;

const toolHandler = async (args: any) => {
  const response = await reportGeneralLedgerDetail(args.params.options || {});

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting General Ledger Detail report: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `General Ledger Detail report:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const ReportGeneralLedgerDetailTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
