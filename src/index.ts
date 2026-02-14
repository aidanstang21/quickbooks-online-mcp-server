#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { QuickbooksMCPServer } from "./server/qbo-mcp-server.js";
// import { ListInvoicesTool } from "./tools/list-invoices.tool.js";
// import { CreateCustomerTool } from "./tools/create-customer.tool.js";
import { CreateInvoiceTool } from "./tools/create-invoice.tool.js";
import { RegisterTool } from "./helpers/register-tool.js";
import { ReadInvoiceTool } from "./tools/read-invoice.tool.js";
import { SearchInvoicesTool } from "./tools/search-invoices.tool.js";
import { UpdateInvoiceTool } from "./tools/update-invoice.tool.js";
import { CreateAccountTool } from "./tools/create-account.tool.js";
import { UpdateAccountTool } from "./tools/update-account.tool.js";
import { SearchAccountsTool } from "./tools/search-accounts.tool.js";
import { ReadItemTool } from "./tools/read-item.tool.js";
import { SearchItemsTool } from "./tools/search-items.tool.js";
import { CreateItemTool } from "./tools/create-item.tool.js";
import { UpdateItemTool } from "./tools/update-item.tool.js";
// import { ListAccountsTool } from "./tools/list-accounts.tool.js";
// import { UpdateCustomerTool } from "./tools/update-customer.tool.js";
import { CreateCustomerTool } from "./tools/create-customer.tool.js";
import { GetCustomerTool } from "./tools/get-customer.tool.js";
import { UpdateCustomerTool } from "./tools/update-customer.tool.js";
import { DeleteCustomerTool } from "./tools/delete-customer.tool.js";
import { CreateEstimateTool } from "./tools/create-estimate.tool.js";
import { GetEstimateTool } from "./tools/get-estimate.tool.js";
import { UpdateEstimateTool } from "./tools/update-estimate.tool.js";
import { DeleteEstimateTool } from "./tools/delete-estimate.tool.js";
import { SearchCustomersTool } from "./tools/search-customers.tool.js";
import { SearchEstimatesTool } from "./tools/search-estimates.tool.js";
import { CreateBillTool } from "./tools/create-bill.tool.js";
import { UpdateBillTool } from "./tools/update-bill.tool.js";
import { DeleteBillTool } from "./tools/delete-bill.tool.js";
import { GetBillTool } from "./tools/get-bill.tool.js";
import { CreateVendorTool } from "./tools/create-vendor.tool.js";
import { UpdateVendorTool } from "./tools/update-vendor.tool.js";
import { DeleteVendorTool } from "./tools/delete-vendor.tool.js";
import { GetVendorTool } from "./tools/get-vendor.tool.js";
import { SearchBillsTool } from "./tools/search-bills.tool.js";
import { SearchVendorsTool } from "./tools/search-vendors.tool.js";

// Employee tools
import { CreateEmployeeTool } from "./tools/create-employee.tool.js";
import { GetEmployeeTool } from "./tools/get-employee.tool.js";
import { UpdateEmployeeTool } from "./tools/update-employee.tool.js";
import { SearchEmployeesTool } from "./tools/search-employees.tool.js";

// Journal Entry tools
import { CreateJournalEntryTool } from "./tools/create-journal-entry.tool.js";
import { GetJournalEntryTool } from "./tools/get-journal-entry.tool.js";
import { UpdateJournalEntryTool } from "./tools/update-journal-entry.tool.js";
import { DeleteJournalEntryTool } from "./tools/delete-journal-entry.tool.js";
import { SearchJournalEntriesTool } from "./tools/search-journal-entries.tool.js";

// Bill Payment tools
import { CreateBillPaymentTool } from "./tools/create-bill-payment.tool.js";
import { GetBillPaymentTool } from "./tools/get-bill-payment.tool.js";
import { UpdateBillPaymentTool } from "./tools/update-bill-payment.tool.js";
import { DeleteBillPaymentTool } from "./tools/delete-bill-payment.tool.js";
import { SearchBillPaymentsTool } from "./tools/search-bill-payments.tool.js";

// Purchase tools
import { CreatePurchaseTool } from "./tools/create-purchase.tool.js";
import { GetPurchaseTool } from "./tools/get-purchase.tool.js";
import { UpdatePurchaseTool } from "./tools/update-purchase.tool.js";
import { DeletePurchaseTool } from "./tools/delete-purchase.tool.js";
import { SearchPurchasesTool } from "./tools/search-purchases.tool.js";

// Deposit tools
import { CreateDepositTool } from "./tools/create-deposit.tool.js";
import { GetDepositTool } from "./tools/get-deposit.tool.js";
import { UpdateDepositTool } from "./tools/update-deposit.tool.js";
import { DeleteDepositTool } from "./tools/delete-deposit.tool.js";
import { SearchDepositsTool } from "./tools/search-deposits.tool.js";

// Transfer tools
import { CreateTransferTool } from "./tools/create-transfer.tool.js";
import { GetTransferTool } from "./tools/get-transfer.tool.js";
import { UpdateTransferTool } from "./tools/update-transfer.tool.js";
import { DeleteTransferTool } from "./tools/delete-transfer.tool.js";
import { SearchTransfersTool } from "./tools/search-transfers.tool.js";

// Payment tools
import { CreatePaymentTool } from "./tools/create-payment.tool.js";
import { GetPaymentTool } from "./tools/get-payment.tool.js";
import { UpdatePaymentTool } from "./tools/update-payment.tool.js";
import { DeletePaymentTool } from "./tools/delete-payment.tool.js";
import { SearchPaymentsTool } from "./tools/search-payments.tool.js";

// Sales Receipt tools
import { CreateSalesReceiptTool } from "./tools/create-sales-receipt.tool.js";
import { GetSalesReceiptTool } from "./tools/get-sales-receipt.tool.js";
import { UpdateSalesReceiptTool } from "./tools/update-sales-receipt.tool.js";
import { DeleteSalesReceiptTool } from "./tools/delete-sales-receipt.tool.js";
import { SearchSalesReceiptsTool } from "./tools/search-sales-receipts.tool.js";

// Vendor Credit tools
import { CreateVendorCreditTool } from "./tools/create-vendor-credit.tool.js";
import { GetVendorCreditTool } from "./tools/get-vendor-credit.tool.js";
import { UpdateVendorCreditTool } from "./tools/update-vendor-credit.tool.js";
import { DeleteVendorCreditTool } from "./tools/delete-vendor-credit.tool.js";
import { SearchVendorCreditsTool } from "./tools/search-vendor-credits.tool.js";

// Credit Memo tools
import { CreateCreditMemoTool } from "./tools/create-credit-memo.tool.js";
import { GetCreditMemoTool } from "./tools/get-credit-memo.tool.js";
import { UpdateCreditMemoTool } from "./tools/update-credit-memo.tool.js";
import { DeleteCreditMemoTool } from "./tools/delete-credit-memo.tool.js";
import { SearchCreditMemosTool } from "./tools/search-credit-memos.tool.js";

// Attachable tools
import { CreateAttachableTool } from "./tools/create-attachable.tool.js";
import { GetAttachableTool } from "./tools/get-attachable.tool.js";
import { UpdateAttachableTool } from "./tools/update-attachable.tool.js";
import { DeleteAttachableTool } from "./tools/delete-attachable.tool.js";
import { SearchAttachablesTool } from "./tools/search-attachables.tool.js";

// Tax Agency tools
import { CreateTaxAgencyTool } from "./tools/create-tax-agency.tool.js";
import { GetTaxAgencyTool } from "./tools/get-tax-agency.tool.js";
import { UpdateTaxAgencyTool } from "./tools/update-tax-agency.tool.js";

// Tax Code tools
import { GetTaxCodeTool } from "./tools/get-tax-code.tool.js";
import { UpdateTaxCodeTool } from "./tools/update-tax-code.tool.js";
import { SearchTaxCodesTool } from "./tools/search-tax-codes.tool.js";

// Tax Rate tools
import { GetTaxRateTool } from "./tools/get-tax-rate.tool.js";
import { UpdateTaxRateTool } from "./tools/update-tax-rate.tool.js";
import { SearchTaxRatesTool } from "./tools/search-tax-rates.tool.js";

// PDF export tools
import { GetInvoicePdfTool } from "./tools/get-invoice-pdf.tool.js";
import { GetEstimatePdfTool } from "./tools/get-estimate-pdf.tool.js";
import { GetCreditMemoPdfTool } from "./tools/get-credit-memo-pdf.tool.js";
import { GetSalesReceiptPdfTool } from "./tools/get-sales-receipt-pdf.tool.js";

// Report tools
import { ReportBalanceSheetTool } from "./tools/report-balance-sheet.tool.js";
import { ReportProfitAndLossTool } from "./tools/report-profit-and-loss.tool.js";
import { ReportProfitAndLossDetailTool } from "./tools/report-profit-and-loss-detail.tool.js";
import { ReportTrialBalanceTool } from "./tools/report-trial-balance.tool.js";
import { ReportCashFlowTool } from "./tools/report-cash-flow.tool.js";
import { ReportInventoryValuationSummaryTool } from "./tools/report-inventory-valuation-summary.tool.js";
import { ReportCustomerSalesTool } from "./tools/report-customer-sales.tool.js";
import { ReportItemSalesTool } from "./tools/report-item-sales.tool.js";
import { ReportCustomerIncomeTool } from "./tools/report-customer-income.tool.js";
import { ReportCustomerBalanceTool } from "./tools/report-customer-balance.tool.js";
import { ReportCustomerBalanceDetailTool } from "./tools/report-customer-balance-detail.tool.js";
import { ReportAgedReceivablesTool } from "./tools/report-aged-receivables.tool.js";
import { ReportAgedReceivableDetailTool } from "./tools/report-aged-receivable-detail.tool.js";
import { ReportVendorBalanceTool } from "./tools/report-vendor-balance.tool.js";
import { ReportVendorBalanceDetailTool } from "./tools/report-vendor-balance-detail.tool.js";
import { ReportAgedPayablesTool } from "./tools/report-aged-payables.tool.js";
import { ReportAgedPayableDetailTool } from "./tools/report-aged-payable-detail.tool.js";
import { ReportVendorExpensesTool } from "./tools/report-vendor-expenses.tool.js";
import { ReportTransactionListTool } from "./tools/report-transaction-list.tool.js";
import { ReportTransactionListWithSplitsTool } from "./tools/report-transaction-list-with-splits.tool.js";
import { ReportTransactionListByCustomerTool } from "./tools/report-transaction-list-by-customer.tool.js";
import { ReportTransactionListByVendorTool } from "./tools/report-transaction-list-by-vendor.tool.js";
import { ReportGeneralLedgerDetailTool } from "./tools/report-general-ledger-detail.tool.js";
import { ReportTaxSummaryTool } from "./tools/report-tax-summary.tool.js";
import { ReportDepartmentSalesTool } from "./tools/report-department-sales.tool.js";
import { ReportClassSalesTool } from "./tools/report-class-sales.tool.js";
import { ReportAccountListDetailTool } from "./tools/report-account-list-detail.tool.js";
import { ReportJournalReportTool } from "./tools/report-journal-report.tool.js";

const main = async () => {
  // Create an MCP server
  const server = QuickbooksMCPServer.GetServer();
  // Add tools for customers
  RegisterTool(server, CreateCustomerTool);
  RegisterTool(server, GetCustomerTool);
  RegisterTool(server, UpdateCustomerTool);
  RegisterTool(server, DeleteCustomerTool);
  RegisterTool(server, SearchCustomersTool);
  // Add tools for estimates
  RegisterTool(server, CreateEstimateTool);
  RegisterTool(server, GetEstimateTool);
  RegisterTool(server, UpdateEstimateTool);
  RegisterTool(server, DeleteEstimateTool);
  RegisterTool(server, SearchEstimatesTool);
  
  // Add tools for bills
  RegisterTool(server, CreateBillTool);
  RegisterTool(server, UpdateBillTool);
  RegisterTool(server, DeleteBillTool);
  RegisterTool(server, GetBillTool);
  RegisterTool(server, SearchBillsTool);


  // Add tool to read a single invoice
  RegisterTool(server, ReadInvoiceTool);

  // Add tool to search invoices
  RegisterTool(server, SearchInvoicesTool);

  // Add tool to create invoice
  RegisterTool(server, CreateInvoiceTool);

  // Add tool to update invoice
  RegisterTool(server, UpdateInvoiceTool);

  // Chart of accounts tools
  RegisterTool(server, CreateAccountTool);
  RegisterTool(server, UpdateAccountTool);
  RegisterTool(server, SearchAccountsTool);

  // Add tool to read item
  RegisterTool(server, ReadItemTool);
  RegisterTool(server, SearchItemsTool);
  RegisterTool(server, CreateItemTool);
  RegisterTool(server, UpdateItemTool);

  // // Add a tool to create a customer
  // RegisterTool(server, CreateCustomerTool);

  // // Add tool to list accounts
  // RegisterTool(server, ListAccountsTool);

  // // Add tool to update a customer
  // RegisterTool(server, UpdateCustomerTool);

  // Add tools for vendors
  RegisterTool(server, CreateVendorTool);
  RegisterTool(server, UpdateVendorTool);
  RegisterTool(server, DeleteVendorTool);
  RegisterTool(server, GetVendorTool);
  RegisterTool(server, SearchVendorsTool);

  // Add tools for employees
  RegisterTool(server, CreateEmployeeTool);
  RegisterTool(server, GetEmployeeTool);
  RegisterTool(server, UpdateEmployeeTool);
  RegisterTool(server, SearchEmployeesTool);

  // Add tools for journal entries
  RegisterTool(server, CreateJournalEntryTool);
  RegisterTool(server, GetJournalEntryTool);
  RegisterTool(server, UpdateJournalEntryTool);
  RegisterTool(server, DeleteJournalEntryTool);
  RegisterTool(server, SearchJournalEntriesTool);

  // Add tools for bill payments
  RegisterTool(server, CreateBillPaymentTool);
  RegisterTool(server, GetBillPaymentTool);
  RegisterTool(server, UpdateBillPaymentTool);
  RegisterTool(server, DeleteBillPaymentTool);
  RegisterTool(server, SearchBillPaymentsTool);

  // Add tools for purchases
  RegisterTool(server, CreatePurchaseTool);
  RegisterTool(server, GetPurchaseTool);
  RegisterTool(server, UpdatePurchaseTool);
  RegisterTool(server, DeletePurchaseTool);
  RegisterTool(server, SearchPurchasesTool);

  // Add tools for deposits
  RegisterTool(server, CreateDepositTool);
  RegisterTool(server, GetDepositTool);
  RegisterTool(server, UpdateDepositTool);
  RegisterTool(server, DeleteDepositTool);
  RegisterTool(server, SearchDepositsTool);

  // Add tools for transfers
  RegisterTool(server, CreateTransferTool);
  RegisterTool(server, GetTransferTool);
  RegisterTool(server, UpdateTransferTool);
  RegisterTool(server, DeleteTransferTool);
  RegisterTool(server, SearchTransfersTool);

  // Add tools for payments
  RegisterTool(server, CreatePaymentTool);
  RegisterTool(server, GetPaymentTool);
  RegisterTool(server, UpdatePaymentTool);
  RegisterTool(server, DeletePaymentTool);
  RegisterTool(server, SearchPaymentsTool);

  // Add tools for sales receipts
  RegisterTool(server, CreateSalesReceiptTool);
  RegisterTool(server, GetSalesReceiptTool);
  RegisterTool(server, UpdateSalesReceiptTool);
  RegisterTool(server, DeleteSalesReceiptTool);
  RegisterTool(server, SearchSalesReceiptsTool);

  // Add tools for vendor credits
  RegisterTool(server, CreateVendorCreditTool);
  RegisterTool(server, GetVendorCreditTool);
  RegisterTool(server, UpdateVendorCreditTool);
  RegisterTool(server, DeleteVendorCreditTool);
  RegisterTool(server, SearchVendorCreditsTool);

  // Add tools for credit memos
  RegisterTool(server, CreateCreditMemoTool);
  RegisterTool(server, GetCreditMemoTool);
  RegisterTool(server, UpdateCreditMemoTool);
  RegisterTool(server, DeleteCreditMemoTool);
  RegisterTool(server, SearchCreditMemosTool);

  // Add tools for attachables
  RegisterTool(server, CreateAttachableTool);
  RegisterTool(server, GetAttachableTool);
  RegisterTool(server, UpdateAttachableTool);
  RegisterTool(server, DeleteAttachableTool);
  RegisterTool(server, SearchAttachablesTool);

  // Add tools for tax agencies
  RegisterTool(server, CreateTaxAgencyTool);
  RegisterTool(server, GetTaxAgencyTool);
  RegisterTool(server, UpdateTaxAgencyTool);

  // Add tools for tax codes
  RegisterTool(server, GetTaxCodeTool);
  RegisterTool(server, UpdateTaxCodeTool);
  RegisterTool(server, SearchTaxCodesTool);

  // Add tools for tax rates
  RegisterTool(server, GetTaxRateTool);
  RegisterTool(server, UpdateTaxRateTool);
  RegisterTool(server, SearchTaxRatesTool);

  // Add tools for PDF exports
  RegisterTool(server, GetInvoicePdfTool);
  RegisterTool(server, GetEstimatePdfTool);
  RegisterTool(server, GetCreditMemoPdfTool);
  RegisterTool(server, GetSalesReceiptPdfTool);

  // Add tools for reports
  RegisterTool(server, ReportBalanceSheetTool);
  RegisterTool(server, ReportProfitAndLossTool);
  RegisterTool(server, ReportProfitAndLossDetailTool);
  RegisterTool(server, ReportTrialBalanceTool);
  RegisterTool(server, ReportCashFlowTool);
  RegisterTool(server, ReportInventoryValuationSummaryTool);
  RegisterTool(server, ReportCustomerSalesTool);
  RegisterTool(server, ReportItemSalesTool);
  RegisterTool(server, ReportCustomerIncomeTool);
  RegisterTool(server, ReportCustomerBalanceTool);
  RegisterTool(server, ReportCustomerBalanceDetailTool);
  RegisterTool(server, ReportAgedReceivablesTool);
  RegisterTool(server, ReportAgedReceivableDetailTool);
  RegisterTool(server, ReportVendorBalanceTool);
  RegisterTool(server, ReportVendorBalanceDetailTool);
  RegisterTool(server, ReportAgedPayablesTool);
  RegisterTool(server, ReportAgedPayableDetailTool);
  RegisterTool(server, ReportVendorExpensesTool);
  RegisterTool(server, ReportTransactionListTool);
  RegisterTool(server, ReportTransactionListWithSplitsTool);
  RegisterTool(server, ReportTransactionListByCustomerTool);
  RegisterTool(server, ReportTransactionListByVendorTool);
  RegisterTool(server, ReportGeneralLedgerDetailTool);
  RegisterTool(server, ReportTaxSummaryTool);
  RegisterTool(server, ReportDepartmentSalesTool);
  RegisterTool(server, ReportClassSalesTool);
  RegisterTool(server, ReportAccountListDetailTool);
  RegisterTool(server, ReportJournalReportTool);

  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
};

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});