import { getQuickbooksTaxRate } from "../handlers/get-quickbooks-tax-rate.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "get_tax_rate";
const toolDescription = "Get a tax rate by Id from QuickBooks Online.";

// Define the expected input schema for getting a tax rate
const toolSchema = z.object({
  id: z.string(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await getQuickbooksTaxRate(args.params.id);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting tax rate: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Tax rate retrieved:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetTaxRateTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
