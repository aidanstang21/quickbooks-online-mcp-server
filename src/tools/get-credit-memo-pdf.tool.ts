import { getCreditMemoPdf } from "../handlers/get-credit-memo-pdf.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "get_credit_memo_pdf";
const toolDescription = "Get a Credit Memo PDF from QuickBooks Online by ID.";

const toolSchema = z.object({
  id: z.string(),
});

const toolHandler = async (args: any) => {
  const response = await getCreditMemoPdf(args.params.id);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting credit memo PDF: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Credit Memo PDF retrieved:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetCreditMemoPdfTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
