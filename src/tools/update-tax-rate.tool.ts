import { updateQuickbooksTaxRate } from "../handlers/update-quickbooks-tax-rate.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "update_tax_rate";
const toolDescription = "Update a tax rate in QuickBooks Online.";

// Define the expected input schema for updating a tax rate
const toolSchema = z.object({
  taxRate: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await updateQuickbooksTaxRate(args.params.taxRate);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error updating tax rate: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Tax rate updated:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const UpdateTaxRateTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
