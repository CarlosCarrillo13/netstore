import { element, by, ElementFinder } from 'protractor';

export class SubscriptionProgramComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-subscription-program div table .btn-danger'));
  title = element.all(by.css('jhi-subscription-program div h2#page-heading span')).first();
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

export class SubscriptionProgramUpdatePage {
  pageTitle = element(by.id('jhi-subscription-program-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  subscriptionTypeSelect = element(by.id('field_subscriptionType'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  amountInput = element(by.id('field_amount'));
  numberOfPosInput = element(by.id('field_numberOfPos'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSubscriptionTypeSelect(subscriptionType: string): Promise<void> {
    await this.subscriptionTypeSelect.sendKeys(subscriptionType);
  }

  async getSubscriptionTypeSelect(): Promise<string> {
    return await this.subscriptionTypeSelect.element(by.css('option:checked')).getText();
  }

  async subscriptionTypeSelectLastOption(): Promise<void> {
    await this.subscriptionTypeSelect.all(by.tagName('option')).last().click();
  }

  async setStartDateInput(startDate: string): Promise<void> {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput(): Promise<string> {
    return await this.startDateInput.getAttribute('value');
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

  async setNumberOfPosInput(numberOfPos: string): Promise<void> {
    await this.numberOfPosInput.sendKeys(numberOfPos);
  }

  async getNumberOfPosInput(): Promise<string> {
    return await this.numberOfPosInput.getAttribute('value');
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

export class SubscriptionProgramDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-subscriptionProgram-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-subscriptionProgram'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
