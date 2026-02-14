import { updateQuickbooksPayment } from "../handlers/update-quickbooks-payment.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "update_payment";
const toolDescription = "Update a payment in QuickBooks Online.";

// Define the expected input schema for updating a payment
const toolSchema = z.object({
  payment: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await updateQuickbooksPayment(args.params.payment);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error updating payment: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Payment updated:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const UpdatePaymentTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};