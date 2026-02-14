import { updateQuickbooksAttachable } from "../handlers/update-quickbooks-attachable.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "update_attachable";
const toolDescription = "Update an attachable in QuickBooks Online.";

// Define the expected input schema for updating an attachable
const toolSchema = z.object({
  attachable: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await updateQuickbooksAttachable(args.params.attachable);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error updating attachable: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Attachable updated:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const UpdateAttachableTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
