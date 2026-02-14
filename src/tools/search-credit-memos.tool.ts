import { searchQuickbooksCreditMemos } from "../handlers/search-quickbooks-credit-memos.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "search_credit_memos";
const toolDescription = "Search credit memos in QuickBooks Online that match given criteria.";

// Define the expected input schema for searching credit memos
const toolSchema = z.object({
  criteria: z.array(z.any()).optional(),
  asc: z.string().optional(),
  desc: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  count: z.boolean().optional(),
  fetchAll: z.boolean().optional(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await searchQuickbooksCreditMemos(args.params);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error searching credit memos: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Credit memos found:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const SearchCreditMemosTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
