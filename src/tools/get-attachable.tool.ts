import { getQuickbooksAttachable } from "../handlers/get-quickbooks-attachable.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "get_attachable";
const toolDescription = "Get an attachable by Id from QuickBooks Online.";

// Define the expected input schema for getting an attachable
const toolSchema = z.object({
  id: z.string(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await getQuickbooksAttachable(args.params.id);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting attachable: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Attachable retrieved:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetAttachableTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
