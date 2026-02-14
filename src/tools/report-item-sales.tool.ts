import { reportItemSales } from "../handlers/report-item-sales.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "report_item_sales";
const toolDescription = "Get the Item Sales report from QuickBooks Online. Options: start_date, end_date, accounting_method (Cash/Accrual), etc.";

const toolSchema = z.object({
  options: z.any().optional(),
});

type ToolParams = z.infer<typeof toolSchema>;

const toolHandler = async (args: any) => {
  const response = await reportItemSales(args.params.options || {});

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting Item Sales report: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Item Sales report:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const ReportItemSalesTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
