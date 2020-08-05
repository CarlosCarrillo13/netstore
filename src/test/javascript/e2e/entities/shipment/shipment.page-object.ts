import { element, by, ElementFinder } from 'protractor';

export class ShipmentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-shipment div table .btn-danger'));
  title = element.all(by.css('jhi-shipment div h2#page-heading span')).first();
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

export class ShipmentUpdatePage {
  pageTitle = element(by.id('jhi-shipment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  shipDateInput = element(by.id('field_shipDate'));
  estimatedArrivalDateInput = element(by.id('field_estimatedArrivalDate'));
  deliveryStatusSelect = element(by.id('field_deliveryStatus'));
  trackingNumberInput = element(by.id('field_trackingNumber'));
  shippingCompanyInput = element(by.id('field_shippingCompany'));

  shipmentAddressSelect = element(by.id('field_shipmentAddress'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setShipDateInput(shipDate: string): Promise<void> {
    await this.shipDateInput.sendKeys(shipDate);
  }

  async getShipDateInput(): Promise<string> {
    return await this.shipDateInput.getAttribute('value');
  }

  async setEstimatedArrivalDateInput(estimatedArrivalDate: string): Promise<void> {
    await this.estimatedArrivalDateInput.sendKeys(estimatedArrivalDate);
  }

  async getEstimatedArrivalDateInput(): Promise<string> {
    return await this.estimatedArrivalDateInput.getAttribute('value');
  }

  async setDeliveryStatusSelect(deliveryStatus: string): Promise<void> {
    await this.deliveryStatusSelect.sendKeys(deliveryStatus);
  }

  async getDeliveryStatusSelect(): Promise<string> {
    return await this.deliveryStatusSelect.element(by.css('option:checked')).getText();
  }

  async deliveryStatusSelectLastOption(): Promise<void> {
    await this.deliveryStatusSelect.all(by.tagName('option')).last().click();
  }

  async setTrackingNumberInput(trackingNumber: string): Promise<void> {
    await this.trackingNumberInput.sendKeys(trackingNumber);
  }

  async getTrackingNumberInput(): Promise<string> {
    return await this.trackingNumberInput.getAttribute('value');
  }

  async setShippingCompanyInput(shippingCompany: string): Promise<void> {
    await this.shippingCompanyInput.sendKeys(shippingCompany);
  }

  async getShippingCompanyInput(): Promise<string> {
    return await this.shippingCompanyInput.getAttribute('value');
  }

  async shipmentAddressSelectLastOption(): Promise<void> {
    await this.shipmentAddressSelect.all(by.tagName('option')).last().click();
  }

  async shipmentAddressSelectOption(option: string): Promise<void> {
    await this.shipmentAddressSelect.sendKeys(option);
  }

  getShipmentAddressSelect(): ElementFinder {
    return this.shipmentAddressSelect;
  }

  async getShipmentAddressSelectedOption(): Promise<string> {
    return await this.shipmentAddressSelect.element(by.css('option:checked')).getText();
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

export class ShipmentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-shipment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-shipment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
