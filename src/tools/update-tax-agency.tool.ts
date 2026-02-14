import { updateQuickbooksTaxAgency } from "../handlers/update-quickbooks-tax-agency.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "update_tax_agency";
const toolDescription = "Update a tax agency in QuickBooks Online.";

// Define the expected input schema for updating a tax agency
const toolSchema = z.object({
  taxAgency: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await updateQuickbooksTaxAgency(args.params.taxAgency);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error updating tax agency: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Tax agency updated:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const UpdateTaxAgencyTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
