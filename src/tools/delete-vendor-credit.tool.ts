import { deleteQuickbooksVendorCredit } from "../handlers/delete-quickbooks-vendor-credit.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "delete_vendor_credit";
const toolDescription = "Delete (make inactive) a vendor credit in QuickBooks Online.";

// Define the expected input schema for deleting a vendor credit
const toolSchema = z.object({
  idOrEntity: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await deleteQuickbooksVendorCredit(args.params.idOrEntity);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error deleting vendor credit: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Vendor credit deleted:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const DeleteVendorCreditTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
