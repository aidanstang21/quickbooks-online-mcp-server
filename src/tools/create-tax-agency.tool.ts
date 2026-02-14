import { createQuickbooksTaxAgency } from "../handlers/create-quickbooks-tax-agency.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "create_tax_agency";
const toolDescription = "Create a tax agency in QuickBooks Online.";

// Define the expected input schema for creating a tax agency
const toolSchema = z.object({
  taxAgency: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await createQuickbooksTaxAgency(args.params.taxAgency);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error creating tax agency: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Tax agency created:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const CreateTaxAgencyTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
