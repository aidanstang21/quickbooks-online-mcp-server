import { getQuickbooksTaxAgency } from "../handlers/get-quickbooks-tax-agency.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "get_tax_agency";
const toolDescription = "Get a tax agency by Id from QuickBooks Online.";

// Define the expected input schema for getting a tax agency
const toolSchema = z.object({
  id: z.string(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await getQuickbooksTaxAgency(args.params.id);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting tax agency: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Tax agency retrieved:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetTaxAgencyTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
