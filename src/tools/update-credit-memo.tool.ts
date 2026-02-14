import { updateQuickbooksCreditMemo } from "../handlers/update-quickbooks-credit-memo.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "update_credit_memo";
const toolDescription = "Update a credit memo in QuickBooks Online.";

// Define the expected input schema for updating a credit memo
const toolSchema = z.object({
  creditMemo: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await updateQuickbooksCreditMemo(args.params.creditMemo);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error updating credit memo: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Credit memo updated:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const UpdateCreditMemoTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
