import { updateQuickbooksTransfer } from "../handlers/update-quickbooks-transfer.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "update_transfer";
const toolDescription = "Update a transfer in QuickBooks Online.";

// Define the expected input schema for updating a transfer
const toolSchema = z.object({
  transfer: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await updateQuickbooksTransfer(args.params.transfer);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error updating transfer: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Transfer updated:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const UpdateTransferTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};