import { createQuickbooksVendorCredit } from "../handlers/create-quickbooks-vendor-credit.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "create_vendor_credit";
const toolDescription = "Create a vendor credit in QuickBooks Online.";

// Define the expected input schema for creating a vendor credit
const toolSchema = z.object({
  vendorCredit: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await createQuickbooksVendorCredit(args.params.vendorCredit);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error creating vendor credit: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Vendor credit created:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const CreateVendorCreditTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
