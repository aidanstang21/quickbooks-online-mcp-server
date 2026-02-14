import { createQuickbooksPayment } from "../handlers/create-quickbooks-payment.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "create_payment";
const toolDescription = "Create a payment in QuickBooks Online.";

// Define the expected input schema for creating a payment
const toolSchema = z.object({
  payment: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await createQuickbooksPayment(args.params.payment);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error creating payment: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Payment created:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const CreatePaymentTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};