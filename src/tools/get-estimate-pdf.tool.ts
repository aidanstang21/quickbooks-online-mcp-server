import { getEstimatePdf } from "../handlers/get-estimate-pdf.handler.js";
import { ToolDefinition } from "../types/tool-definition.js";
import { z } from "zod";

const toolName = "get_estimate_pdf";
const toolDescription = "Get an Estimate PDF from QuickBooks Online by ID.";

const toolSchema = z.object({
  id: z.string(),
});

const toolHandler = async (args: any) => {
  const response = await getEstimatePdf(args.params.id);

  if (response.isError) {
    return {
      content: [
        { type: "text" as const, text: `Error getting estimate PDF: ${response.error}` },
      ],
    };
  }

  return {
    content: [
      { type: "text" as const, text: `Estimate PDF retrieved:` },
      { type: "text" as const, text: JSON.stringify(response.result) },
    ],
  };
};

export const GetEstimatePdfTool: ToolDefinition<typeof toolSchema> = {
  name: toolName,
  description: toolDescription,
  schema: toolSchema,
  handler: toolHandler,
};
