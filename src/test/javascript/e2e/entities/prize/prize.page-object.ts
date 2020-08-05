import { element, by, ElementFinder } from 'protractor';

export class PrizeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-prize div table .btn-danger'));
  title = element.all(by.css('jhi-prize div h2#page-heading span')).first();
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

export class PrizeUpdatePage {
  pageTitle = element(by.id('jhi-prize-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  symbolInput = element(by.id('field_symbol'));
  countryInput = element(by.id('field_country'));
  amountInput = element(by.id('field_amount'));

  itemSelect = element(by.id('field_item'));
  pointOfSaleSelect = element(by.id('field_pointOfSale'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSymbolInput(symbol: string): Promise<void> {
    await this.symbolInput.sendKeys(symbol);
  }

  async getSymbolInput(): Promise<string> {
    return await this.symbolInput.getAttribute('value');
  }

  async setCountryInput(country: string): Promise<void> {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput(): Promise<string> {
    return await this.countryInput.getAttribute('value');
  }

  async setAmountInput(amount: string): Promise<void> {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput(): Promise<string> {
    return await this.amountInput.getAttribute('value');
  }

  async itemSelectLastOption(): Promise<void> {
    await this.itemSelect.all(by.tagName('option')).last().click();
  }

  async itemSelectOption(option: string): Promise<void> {
    await this.itemSelect.sendKeys(option);
  }

  getItemSelect(): ElementFinder {
    return this.itemSelect;
  }

  async getItemSelectedOption(): Promise<string> {
    return await this.itemSelect.element(by.css('option:checked')).getText();
  }

  async pointOfSaleSelectLastOption(): Promise<void> {
    await this.pointOfSaleSelect.all(by.tagName('option')).last().click();
  }

  async pointOfSaleSelectOption(option: string): Promise<void> {
    await this.pointOfSaleSelect.sendKeys(option);
  }

  getPointOfSaleSelect(): ElementFinder {
    return this.pointOfSaleSelect;
  }

  async getPointOfSaleSelectedOption(): Promise<string> {
    return await this.pointOfSaleSelect.element(by.css('option:checked')).getText();
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

export class PrizeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-prize-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-prize'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
