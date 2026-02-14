import { reportClassSales } from "../handlers/report-class-sales.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "report_class_sales";
const toolDescription = "Get the Class Sales report from QuickBooks Online. Options: start_date, end_date, accounting_method (Cash/Accrual), etc.";

const toolSchema = z.object({
  options: z.any().optional(),
});

type ToolParams = z.infer<typeof toolSchema>;

const toolHandler = async (args: any) => {
  const response = await reportClassSales(args.params.options || {});

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting Class Sales report: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Class Sales report:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const ReportClassSalesTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
