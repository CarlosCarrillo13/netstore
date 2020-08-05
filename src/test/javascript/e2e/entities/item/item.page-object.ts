import { element, by, ElementFinder } from 'protractor';

export class ItemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-item div table .btn-danger'));
  title = element.all(by.css('jhi-item div h2#page-heading span')).first();
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

export class ItemUpdatePage {
  pageTitle = element(by.id('jhi-item-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  skuInput = element(by.id('field_sku'));
  endDateInput = element(by.id('field_endDate'));
  amountInput = element(by.id('field_amount'));

  itemCategorySelect = element(by.id('field_itemCategory'));
  invoiceSelect = element(by.id('field_invoice'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setSkuInput(sku: string): Promise<void> {
    await this.skuInput.sendKeys(sku);
  }

  async getSkuInput(): Promise<string> {
    return await this.skuInput.getAttribute('value');
  }

  async setEndDateInput(endDate: string): Promise<void> {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput(): Promise<string> {
    return await this.endDateInput.getAttribute('value');
  }

  async setAmountInput(amount: string): Promise<void> {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput(): Promise<string> {
    return await this.amountInput.getAttribute('value');
  }

  async itemCategorySelectLastOption(): Promise<void> {
    await this.itemCategorySelect.all(by.tagName('option')).last().click();
  }

  async itemCategorySelectOption(option: string): Promise<void> {
    await this.itemCategorySelect.sendKeys(option);
  }

  getItemCategorySelect(): ElementFinder {
    return this.itemCategorySelect;
  }

  async getItemCategorySelectedOption(): Promise<string> {
    return await this.itemCategorySelect.element(by.css('option:checked')).getText();
  }

  async invoiceSelectLastOption(): Promise<void> {
    await this.invoiceSelect.all(by.tagName('option')).last().click();
  }

  async invoiceSelectOption(option: string): Promise<void> {
    await this.invoiceSelect.sendKeys(option);
  }

  getInvoiceSelect(): ElementFinder {
    return this.invoiceSelect;
  }

  async getInvoiceSelectedOption(): Promise<string> {
    return await this.invoiceSelect.element(by.css('option:checked')).getText();
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

export class ItemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-item-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-item'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
