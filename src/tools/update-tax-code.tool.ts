import { updateQuickbooksTaxCode } from "../handlers/update-quickbooks-tax-code.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "update_tax_code";
const toolDescription = "Update a tax code in QuickBooks Online.";

// Define the expected input schema for updating a tax code
const toolSchema = z.object({
  taxCode: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await updateQuickbooksTaxCode(args.params.taxCode);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error updating tax code: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Tax code updated:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const UpdateTaxCodeTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
