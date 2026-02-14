import { createQuickbooksTransfer } from "../handlers/create-quickbooks-transfer.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "create_transfer";
const toolDescription = "Create a transfer in QuickBooks Online.";

// Define the expected input schema for creating a transfer
const toolSchema = z.object({
  transfer: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await createQuickbooksTransfer(args.params.transfer);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error creating transfer: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Transfer created:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const CreateTransferTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};