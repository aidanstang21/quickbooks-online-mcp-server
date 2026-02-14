import { deleteQuickbooksTransfer } from "../handlers/delete-quickbooks-transfer.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "delete_transfer";
const toolDescription = "Delete (make inactive) a transfer in QuickBooks Online.";

// Define the expected input schema for deleting a transfer
const toolSchema = z.object({
  idOrEntity: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await deleteQuickbooksTransfer(args.params.idOrEntity);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error deleting transfer: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Transfer deleted:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const DeleteTransferTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};