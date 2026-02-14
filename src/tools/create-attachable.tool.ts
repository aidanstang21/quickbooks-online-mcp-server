import { createQuickbooksAttachable } from "../handlers/create-quickbooks-attachable.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "create_attachable";
const toolDescription = "Create an attachable in QuickBooks Online.";

// Define the expected input schema for creating an attachable
const toolSchema = z.object({
  attachable: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await createQuickbooksAttachable(args.params.attachable);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error creating attachable: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Attachable created:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const CreateAttachableTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
