import { element, by, ElementFinder } from 'protractor';

export class InvoiceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-invoice div table .btn-danger'));
  title = element.all(by.css('jhi-invoice div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class InvoiceUpdatePage {
  pageTitle = element(by.id('jhi-invoice-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  totalPrizeInput = element(by.id('field_totalPrize'));
  totalTaxInput = element(by.id('field_totalTax'));
  totalDiscountInput = element(by.id('field_totalDiscount'));
  dateInput = element(by.id('field_date'));
  recallInput = element(by.id('field_recall'));

  invoiceVendorSelect = element(by.id('field_invoiceVendor'));
  invoiceShipmentSelect = element(by.id('field_invoiceShipment'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTotalPrizeInput(totalPrize: string): Promise<void> {
    await this.totalPrizeInput.sendKeys(totalPrize);
  }

  async getTotalPrizeInput(): Promise<string> {
    return await this.totalPrizeInput.getAttribute('value');
  }

  async setTotalTaxInput(totalTax: string): Promise<void> {
    await this.totalTaxInput.sendKeys(totalTax);
  }

  async getTotalTaxInput(): Promise<string> {
    return await this.totalTaxInput.getAttribute('value');
  }

  async setTotalDiscountInput(totalDiscount: string): Promise<void> {
    await this.totalDiscountInput.sendKeys(totalDiscount);
  }

  async getTotalDiscountInput(): Promise<string> {
    return await this.totalDiscountInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  getRecallInput(): ElementFinder {
    return this.recallInput;
  }

  async invoiceVendorSelectLastOption(): Promise<void> {
    await this.invoiceVendorSelect.all(by.tagName('option')).last().click();
  }

  async invoiceVendorSelectOption(option: string): Promise<void> {
    await this.invoiceVendorSelect.sendKeys(option);
  }

  getInvoiceVendorSelect(): ElementFinder {
    return this.invoiceVendorSelect;
  }

  async getInvoiceVendorSelectedOption(): Promise<string> {
    return await this.invoiceVendorSelect.element(by.css('option:checked')).getText();
  }

  async invoiceShipmentSelectLastOption(): Promise<void> {
    await this.invoiceShipmentSelect.all(by.tagName('option')).last().click();
  }

  async invoiceShipmentSelectOption(option: string): Promise<void> {
    await this.invoiceShipmentSelect.sendKeys(option);
  }

  getInvoiceShipmentSelect(): ElementFinder {
    return this.invoiceShipmentSelect;
  }

  async getInvoiceShipmentSelectedOption(): Promise<string> {
    return await this.invoiceShipmentSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class InvoiceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-invoice-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-invoice'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
