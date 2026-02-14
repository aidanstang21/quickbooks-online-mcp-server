import { getQuickbooksCreditMemo } from "../handlers/get-quickbooks-credit-memo.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "get_credit_memo";
const toolDescription = "Get a credit memo by Id from QuickBooks Online.";

// Define the expected input schema for getting a credit memo
const toolSchema = z.object({
  id: z.string(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await getQuickbooksCreditMemo(args.params.id);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting credit memo: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Credit memo retrieved:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetCreditMemoTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
