import { getQuickbooksVendorCredit } from "../handlers/get-quickbooks-vendor-credit.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "get_vendor_credit";
const toolDescription = "Get a vendor credit by Id from QuickBooks Online.";

// Define the expected input schema for getting a vendor credit
const toolSchema = z.object({
  id: z.string(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await getQuickbooksVendorCredit(args.params.id);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting vendor credit: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Vendor credit retrieved:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetVendorCreditTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
