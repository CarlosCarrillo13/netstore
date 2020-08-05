import { element, by, ElementFinder } from 'protractor';

export class PointOfSaleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-point-of-sale div table .btn-danger'));
  title = element.all(by.css('jhi-point-of-sale div h2#page-heading span')).first();
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

export class PointOfSaleUpdatePage {
  pageTitle = element(by.id('jhi-point-of-sale-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  subscribedInput = element(by.id('field_subscribed'));
  statusSelect = element(by.id('field_status'));

  addressSelect = element(by.id('field_address'));
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

  getSubscribedInput(): ElementFinder {
    return this.subscribedInput;
  }

  async setStatusSelect(status: string): Promise<void> {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }

  async addressSelectLastOption(): Promise<void> {
    await this.addressSelect.all(by.tagName('option')).last().click();
  }

  async addressSelectOption(option: string): Promise<void> {
    await this.addressSelect.sendKeys(option);
  }

  getAddressSelect(): ElementFinder {
    return this.addressSelect;
  }

  async getAddressSelectedOption(): Promise<string> {
    return await this.addressSelect.element(by.css('option:checked')).getText();
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

export class PointOfSaleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-pointOfSale-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-pointOfSale'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
