import { createQuickbooksSalesReceipt } from "../handlers/create-quickbooks-sales-receipt.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "create_sales_receipt";
const toolDescription = "Create a sales receipt in QuickBooks Online.";

// Define the expected input schema for creating a sales receipt
const toolSchema = z.object({
  salesReceipt: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await createQuickbooksSalesReceipt(args.params.salesReceipt);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error creating sales receipt: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Sales receipt created:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const CreateSalesReceiptTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};