import { createQuickbooksDeposit } from "../handlers/create-quickbooks-deposit.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

// Define the tool metadata
const toolName = "create_deposit";
const toolDescription = "Create a deposit in QuickBooks Online.";

// Define the expected input schema for creating a deposit
const toolSchema = z.object({
  deposit: z.any(),
});

type ToolParams = z.infer<typeof toolSchema>;

// Define the tool handler
const toolHandler = async (args: any) => {
  const response = await createQuickbooksDeposit(args.params.deposit);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error creating deposit: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Deposit created:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const CreateDepositTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};