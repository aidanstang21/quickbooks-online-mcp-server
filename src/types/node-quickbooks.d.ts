declare module 'node-quickbooks' {
  export default class QuickBooks {
    constructor(
      consumerKey: string,
      consumerSecret: string,
      accessToken: string,
      tokenSecret: boolean | string,
      realmId: string,
      useSandbox?: boolean,
      debug?: boolean,
      minorversion?: string | number | null,
      oauthVersion?: string,
      refreshToken?: string
    );

    findCustomers(options: object, callback: (err: any, customers: any) => void): void;
    createCustomer(customerData: object, callback: (err: any, customer: any) => void): void;
    getCustomer(id: string, callback: (err: any, customer: any) => void): void;
    updateCustomer(customerData: object, callback: (err: any, customer: any) => void): void;
    deleteCustomer(idOrEntity: any, callback: (err: any, response: any) => void): void;

    // Estimate CRUD
    findEstimates(options: object, callback: (err: any, estimates: any) => void): void;
    createEstimate(estimateData: object, callback: (err: any, estimate: any) => void): void;
    getEstimate(id: string, callback: (err: any, estimate: any) => void): void;
    updateEstimate(estimateData: object, callback: (err: any, estimate: any) => void): void;
    deleteEstimate(idOrEntity: any, callback: (err: any, response: any) => void): void;
    findBills(options: {
      fetchAll?: boolean;
      limit?: number;
      offset?: number;
      asc?: boolean;
      desc?: boolean;
      DueDate?: string;
      TxnDate?: string;
      Balance?: number;
      TotalAmt?: number;
      VendorRef?: string;
    }, callback: (err: any, bills: any) => void): void;
    createBill(bill: object, callback: (err: any, bill: any) => void): void;
    updateBill(bill: object, callback: (err: any, bill: any) => void): void;
    deleteBill(bill: object, callback: (err: any, bill: any) => void): void;
    getBill(id: string, callback: (err: any, bill: any) => void): void;
    findVendors(options: {
      fetchAll?: boolean;
      limit?: number;
      offset?: number;
      asc?: boolean;
      desc?: boolean;
      DisplayName?: string;
      GivenName?: string;
      FamilyName?: string;
      CompanyName?: string;
      Active?: boolean;
    }, callback: (err: any, vendors: any) => void): void;
    createVendor(vendor: object, callback: (err: any, vendor: any) => void): void;
    updateVendor(vendor: object, callback: (err: any, vendor: any) => void): void;
    deleteVendor(vendor: object, callback: (err: any, vendor: any) => void): void;
    getVendor(id: string, callback: (err: any, vendor: any) => void): void;

    // Employee CRUD
    findEmployees(options: object, callback: (err: any, employees: any) => void): void;
    createEmployee(employeeData: object, callback: (err: any, employee: any) => void): void;
    getEmployee(id: string, callback: (err: any, employee: any) => void): void;
    updateEmployee(employeeData: object, callback: (err: any, employee: any) => void): void;

    // Journal Entry CRUD
    findJournalEntries(options: object, callback: (err: any, journalEntries: any) => void): void;
    createJournalEntry(journalEntryData: object, callback: (err: any, journalEntry: any) => void): void;
    getJournalEntry(id: string, callback: (err: any, journalEntry: any) => void): void;
    updateJournalEntry(journalEntryData: object, callback: (err: any, journalEntry: any) => void): void;
    deleteJournalEntry(idOrEntity: any, callback: (err: any, response: any) => void): void;

    // Bill Payment CRUD
    findBillPayments(options: object, callback: (err: any, billPayments: any) => void): void;
    createBillPayment(billPaymentData: object, callback: (err: any, billPayment: any) => void): void;
    getBillPayment(id: string, callback: (err: any, billPayment: any) => void): void;
    updateBillPayment(billPaymentData: object, callback: (err: any, billPayment: any) => void): void;
    deleteBillPayment(idOrEntity: any, callback: (err: any, response: any) => void): void;

    // Purchase CRUD
    findPurchases(options: object, callback: (err: any, purchases: any) => void): void;
    createPurchase(purchaseData: object, callback: (err: any, purchase: any) => void): void;
    getPurchase(id: string, callback: (err: any, purchase: any) => void): void;
    updatePurchase(purchaseData: object, callback: (err: any, purchase: any) => void): void;
    deletePurchase(idOrEntity: any, callback: (err: any, response: any) => void): void;

    // Deposit CRUD
    findDeposits(options: object, callback: (err: any, deposits: any) => void): void;
    createDeposit(depositData: object, callback: (err: any, deposit: any) => void): void;
    getDeposit(id: string, callback: (err: any, deposit: any) => void): void;
    updateDeposit(depositData: object, callback: (err: any, deposit: any) => void): void;
    deleteDeposit(idOrEntity: any, callback: (err: any, response: any) => void): void;

    // Transfer CRUD
    findTransfers(options: object, callback: (err: any, transfers: any) => void): void;
    createTransfer(transferData: object, callback: (err: any, transfer: any) => void): void;
    getTransfer(id: string, callback: (err: any, transfer: any) => void): void;
    updateTransfer(transferData: object, callback: (err: any, transfer: any) => void): void;
    deleteTransfer(idOrEntity: any, callback: (err: any, response: any) => void): void;

    // Payment CRUD
    findPayments(options: object, callback: (err: any, payments: any) => void): void;
    createPayment(paymentData: object, callback: (err: any, payment: any) => void): void;
    getPayment(id: string, callback: (err: any, payment: any) => void): void;
    updatePayment(paymentData: object, callback: (err: any, payment: any) => void): void;
    deletePayment(idOrEntity: any, callback: (err: any, response: any) => void): void;

    // Sales Receipt CRUD
    findSalesReceipts(options: object, callback: (err: any, salesReceipts: any) => void): void;
    createSalesReceipt(salesReceiptData: object, callback: (err: any, salesReceipt: any) => void): void;
    getSalesReceipt(id: string, callback: (err: any, salesReceipt: any) => void): void;
    updateSalesReceipt(salesReceiptData: object, callback: (err: any, salesReceipt: any) => void): void;
    deleteSalesReceipt(idOrEntity: any, callback: (err: any, response: any) => void): void;

    // Invoice CRUD
    findInvoices(options: object, callback: (err: any, invoices: any) => void): void;
    createInvoice(invoiceData: object, callback: (err: any, invoice: any) => void): void;
    getInvoice(id: string, callback: (err: any, invoice: any) => void): void;
    updateInvoice(invoiceData: object, callback: (err: any, invoice: any) => void): void;
    deleteInvoice(idOrEntity: any, callback: (err: any, response: any) => void): void;

    // Credit Memo CRUD
    findCreditMemos(options: object, callback: (err: any, creditMemos: any) => void): void;
    createCreditMemo(creditMemoData: object, callback: (err: any, creditMemo: any) => void): void;
    getCreditMemo(id: string, callback: (err: any, creditMemo: any) => void): void;
    updateCreditMemo(creditMemoData: object, callback: (err: any, creditMemo: any) => void): void;
    deleteCreditMemo(idOrEntity: any, callback: (err: any, response: any) => void): void;

    // Account CRUD
    findAccounts(options: object, callback: (err: any, accounts: any) => void): void;
    createAccount(accountData: object, callback: (err: any, account: any) => void): void;
    getAccount(id: string, callback: (err: any, account: any) => void): void;
    updateAccount(accountData: object, callback: (err: any, account: any) => void): void;

    // Item CRUD
    findItems(options: object, callback: (err: any, items: any) => void): void;
    createItem(itemData: object, callback: (err: any, item: any) => void): void;
    getItem(id: string, callback: (err: any, item: any) => void): void;
    updateItem(itemData: object, callback: (err: any, item: any) => void): void;

    // PDF exports
    getInvoicePdf(id: string, callback: (err: any, pdf: any) => void): void;
    getEstimatePdf(id: string, callback: (err: any, pdf: any) => void): void;
    getCreditMemoPdf(id: string, callback: (err: any, pdf: any) => void): void;
    getSalesReceiptPdf(id: string, callback: (err: any, pdf: any) => void): void;

    // Vendor Credit CRUD
    findVendorCredits(options: object, callback: (err: any, vendorCredits: any) => void): void;
    createVendorCredit(vendorCreditData: object, callback: (err: any, vendorCredit: any) => void): void;
    getVendorCredit(id: string, callback: (err: any, vendorCredit: any) => void): void;
    updateVendorCredit(vendorCreditData: object, callback: (err: any, vendorCredit: any) => void): void;
    deleteVendorCredit(idOrEntity: any, callback: (err: any, response: any) => void): void;

    // Attachable CRUD
    findAttachables(options: object, callback: (err: any, attachables: any) => void): void;
    createAttachable(attachableData: object, callback: (err: any, attachable: any) => void): void;
    getAttachable(id: string, callback: (err: any, attachable: any) => void): void;
    updateAttachable(attachableData: object, callback: (err: any, attachable: any) => void): void;
    deleteAttachable(idOrEntity: any, callback: (err: any, response: any) => void): void;

    // Tax Agency
    createTaxAgency(taxAgencyData: object, callback: (err: any, taxAgency: any) => void): void;
    getTaxAgency(id: string, callback: (err: any, taxAgency: any) => void): void;
    updateTaxAgency(taxAgencyData: object, callback: (err: any, taxAgency: any) => void): void;

    // Tax Code
    findTaxCodes(options: object, callback: (err: any, taxCodes: any) => void): void;
    getTaxCode(id: string, callback: (err: any, taxCode: any) => void): void;
    updateTaxCode(taxCodeData: object, callback: (err: any, taxCode: any) => void): void;

    // Tax Rate
    findTaxRates(options: object, callback: (err: any, taxRates: any) => void): void;
    getTaxRate(id: string, callback: (err: any, taxRate: any) => void): void;
    updateTaxRate(taxRateData: object, callback: (err: any, taxRate: any) => void): void;

    // Reports
    reportBalanceSheet(options: object, callback: (err: any, report: any) => void): void;
    reportProfitAndLoss(options: object, callback: (err: any, report: any) => void): void;
    reportProfitAndLossDetail(options: object, callback: (err: any, report: any) => void): void;
    reportTrialBalance(options: object, callback: (err: any, report: any) => void): void;
    reportCashFlow(options: object, callback: (err: any, report: any) => void): void;
    reportInventoryValuationSummary(options: object, callback: (err: any, report: any) => void): void;
    reportCustomerSales(options: object, callback: (err: any, report: any) => void): void;
    reportItemSales(options: object, callback: (err: any, report: any) => void): void;
    reportCustomerIncome(options: object, callback: (err: any, report: any) => void): void;
    reportCustomerBalance(options: object, callback: (err: any, report: any) => void): void;
    reportCustomerBalanceDetail(options: object, callback: (err: any, report: any) => void): void;
    reportAgedReceivables(options: object, callback: (err: any, report: any) => void): void;
    reportAgedReceivableDetail(options: object, callback: (err: any, report: any) => void): void;
    reportVendorBalance(options: object, callback: (err: any, report: any) => void): void;
    reportVendorBalanceDetail(options: object, callback: (err: any, report: any) => void): void;
    reportAgedPayables(options: object, callback: (err: any, report: any) => void): void;
    reportAgedPayableDetail(options: object, callback: (err: any, report: any) => void): void;
    reportVendorExpenses(options: object, callback: (err: any, report: any) => void): void;
    reportTransactionList(options: object, callback: (err: any, report: any) => void): void;
    reportTransactionListWithSplits(options: object, callback: (err: any, report: any) => void): void;
    reportTransactionListByCustomer(options: object, callback: (err: any, report: any) => void): void;
    reportTransactionListByVendor(options: object, callback: (err: any, report: any) => void): void;
    reportGeneralLedgerDetail(options: object, callback: (err: any, report: any) => void): void;
    reportTaxSummary(options: object, callback: (err: any, report: any) => void): void;
    reportDepartmentSales(options: object, callback: (err: any, report: any) => void): void;
    reportClassSales(options: object, callback: (err: any, report: any) => void): void;
    reportAccountListDetail(options: object, callback: (err: any, report: any) => void): void;
    reportJournalReport(options: object, callback: (err: any, report: any) => void): void;

    // You can add more methods as needed
  }
}
