import { reportInventoryValuationSummary } from "../handlers/report-inventory-valuation-summary.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "report_inventory_valuation_summary";
const toolDescription = "Get the Inventory Valuation Summary report from QuickBooks Online. Options: start_date, end_date, accounting_method (Cash/Accrual), etc.";

const toolSchema = z.object({
  options: z.any().optional(),
});

type ToolParams = z.infer<typeof toolSchema>;

const toolHandler = async (args: any) => {
  const response = await reportInventoryValuationSummary(args.params.options || {});

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting Inventory Valuation Summary report: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Inventory Valuation Summary report:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const ReportInventoryValuationSummaryTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
