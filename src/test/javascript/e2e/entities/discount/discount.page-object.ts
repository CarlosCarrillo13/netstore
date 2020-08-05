import { element, by, ElementFinder } from 'protractor';

export class DiscountComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-discount div table .btn-danger'));
  title = element.all(by.css('jhi-discount div h2#page-heading span')).first();
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

export class DiscountUpdatePage {
  pageTitle = element(by.id('jhi-discount-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  percentageInput = element(by.id('field_percentage'));
  conceptInput = element(by.id('field_concept'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  activeInput = element(by.id('field_active'));

  itemSelect = element(by.id('field_item'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPercentageInput(percentage: string): Promise<void> {
    await this.percentageInput.sendKeys(percentage);
  }

  async getPercentageInput(): Promise<string> {
    return await this.percentageInput.getAttribute('value');
  }

  async setConceptInput(concept: string): Promise<void> {
    await this.conceptInput.sendKeys(concept);
  }

  async getConceptInput(): Promise<string> {
    return await this.conceptInput.getAttribute('value');
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

  getActiveInput(): ElementFinder {
    return this.activeInput;
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

export class DiscountDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-discount-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-discount'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
