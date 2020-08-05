import { element, by, ElementFinder } from 'protractor';

export class BussinessUnitComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-bussiness-unit div table .btn-danger'));
  title = element.all(by.css('jhi-bussiness-unit div h2#page-heading span')).first();
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

export class BussinessUnitUpdatePage {
  pageTitle = element(by.id('jhi-bussiness-unit-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  nitInput = element(by.id('field_nit'));
  brandInput = element(by.id('field_brand'));
  activeInput = element(by.id('field_active'));

  bussinessSelect = element(by.id('field_bussiness'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setNitInput(nit: string): Promise<void> {
    await this.nitInput.sendKeys(nit);
  }

  async getNitInput(): Promise<string> {
    return await this.nitInput.getAttribute('value');
  }

  async setBrandInput(brand: string): Promise<void> {
    await this.brandInput.sendKeys(brand);
  }

  async getBrandInput(): Promise<string> {
    return await this.brandInput.getAttribute('value');
  }

  getActiveInput(): ElementFinder {
    return this.activeInput;
  }

  async bussinessSelectLastOption(): Promise<void> {
    await this.bussinessSelect.all(by.tagName('option')).last().click();
  }

  async bussinessSelectOption(option: string): Promise<void> {
    await this.bussinessSelect.sendKeys(option);
  }

  getBussinessSelect(): ElementFinder {
    return this.bussinessSelect;
  }

  async getBussinessSelectedOption(): Promise<string> {
    return await this.bussinessSelect.element(by.css('option:checked')).getText();
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

export class BussinessUnitDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-bussinessUnit-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-bussinessUnit'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
