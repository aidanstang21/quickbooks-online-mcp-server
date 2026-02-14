import { deleteQuickbooksAttachable } from "../handlers/delete-quickbooks-attachable.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "delete_attachable";
const toolDescription = "Delete (make inactive) an attachable in QuickBooks Online.";

// Define the expected input schema for deleting an attachable
const toolSchema = z.object({
  idOrEntity: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await deleteQuickbooksAttachable(args.params.idOrEntity);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error deleting attachable: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Attachable deleted:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const DeleteAttachableTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
