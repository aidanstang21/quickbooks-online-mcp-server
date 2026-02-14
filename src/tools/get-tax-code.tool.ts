import { getQuickbooksTaxCode } from "../handlers/get-quickbooks-tax-code.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "get_tax_code";
const toolDescription = "Get a tax code by Id from QuickBooks Online.";

// Define the expected input schema for getting a tax code
const toolSchema = z.object({
  id: z.string(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await getQuickbooksTaxCode(args.params.id);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting tax code: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Tax code retrieved:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetTaxCodeTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
