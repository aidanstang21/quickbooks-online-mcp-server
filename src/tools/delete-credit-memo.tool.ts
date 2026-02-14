import { deleteQuickbooksCreditMemo } from "../handlers/delete-quickbooks-credit-memo.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "delete_credit_memo";
const toolDescription = "Delete (make inactive) a credit memo in QuickBooks Online.";

// Define the expected input schema for deleting a credit memo
const toolSchema = z.object({
  idOrEntity: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await deleteQuickbooksCreditMemo(args.params.idOrEntity);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error deleting credit memo: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Credit memo deleted:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const DeleteCreditMemoTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
