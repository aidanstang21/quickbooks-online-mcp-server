import { getSalesReceiptPdf } from "../handlers/get-sales-receipt-pdf.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "get_sales_receipt_pdf";
const toolDescription = "Get a Sales Receipt PDF from QuickBooks Online by ID.";

const toolSchema = z.object({
  id: z.string(),
});

const toolHandler = async (args: any) => {
  const response = await getSalesReceiptPdf(args.params.id);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting sales receipt PDF: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Sales Receipt PDF retrieved:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetSalesReceiptPdfTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
