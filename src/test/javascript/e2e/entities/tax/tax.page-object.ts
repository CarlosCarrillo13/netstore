import { element, by, ElementFinder } from 'protractor';

export class TaxComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tax div table .btn-danger'));
  title = element.all(by.css('jhi-tax div h2#page-heading span')).first();
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

export class TaxUpdatePage {
  pageTitle = element(by.id('jhi-tax-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  percentageInput = element(by.id('field_percentage'));
  conceptInput = element(by.id('field_concept'));

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

export class TaxDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tax-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tax'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
