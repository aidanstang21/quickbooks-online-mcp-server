import { getInvoicePdf } from "../handlers/get-invoice-pdf.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "get_invoice_pdf";
const toolDescription = "Get an Invoice PDF from QuickBooks Online by ID.";

const toolSchema = z.object({
  id: z.string(),
});

const toolHandler = async (args: any) => {
  const response = await getInvoicePdf(args.params.id);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting invoice PDF: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Invoice PDF retrieved:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetInvoicePdfTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
