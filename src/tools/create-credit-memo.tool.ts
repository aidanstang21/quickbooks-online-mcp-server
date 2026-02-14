import { createQuickbooksCreditMemo } from "../handlers/create-quickbooks-credit-memo.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "create_credit_memo";
const toolDescription = "Create a credit memo in QuickBooks Online.";

// Define the expected input schema for creating a credit memo
const toolSchema = z.object({
  creditMemo: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await createQuickbooksCreditMemo(args.params.creditMemo);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error creating credit memo: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Credit memo created:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const CreateCreditMemoTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
