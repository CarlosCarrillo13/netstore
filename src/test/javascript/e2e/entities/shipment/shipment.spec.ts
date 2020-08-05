import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ShipmentComponentsPage, ShipmentDeleteDialog, ShipmentUpdatePage } from './shipment.page-object';

const expect = chai.expect;

describe('Shipment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let shipmentComponentsPage: ShipmentComponentsPage;
  let shipmentUpdatePage: ShipmentUpdatePage;
  let shipmentDeleteDialog: ShipmentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Shipments', async () => {
    await navBarPage.goToEntity('shipment');
    shipmentComponentsPage = new ShipmentComponentsPage();
    await browser.wait(ec.visibilityOf(shipmentComponentsPage.title), 5000);
    expect(await shipmentComponentsPage.getTitle()).to.eq('netstoreApp.shipment.home.title');
    await browser.wait(ec.or(ec.visibilityOf(shipmentComponentsPage.entities), ec.visibilityOf(shipmentComponentsPage.noResult)), 1000);
  });

  it('should load create Shipment page', async () => {
    await shipmentComponentsPage.clickOnCreateButton();
    shipmentUpdatePage = new ShipmentUpdatePage();
    expect(await shipmentUpdatePage.getPageTitle()).to.eq('netstoreApp.shipment.home.createOrEditLabel');
    await shipmentUpdatePage.cancel();
  });

  it('should create and save Shipments', async () => {
    const nbButtonsBeforeCreate = await shipmentComponentsPage.countDeleteButtons();

    await shipmentComponentsPage.clickOnCreateButton();

    await promise.all([
      shipmentUpdatePage.setShipDateInput('shipDate'),
      shipmentUpdatePage.setEstimatedArrivalDateInput('estimatedArrivalDate'),
      shipmentUpdatePage.deliveryStatusSelectLastOption(),
      shipmentUpdatePage.setTrackingNumberInput('trackingNumber'),
      shipmentUpdatePage.setShippingCompanyInput('shippingCompany'),
      shipmentUpdatePage.shipmentAddressSelectLastOption(),
    ]);

    expect(await shipmentUpdatePage.getShipDateInput()).to.eq('shipDate', 'Expected ShipDate value to be equals to shipDate');
    expect(await shipmentUpdatePage.getEstimatedArrivalDateInput()).to.eq(
      'estimatedArrivalDate',
      'Expected EstimatedArrivalDate value to be equals to estimatedArrivalDate'
    );
    expect(await shipmentUpdatePage.getTrackingNumberInput()).to.eq(
      'trackingNumber',
      'Expected TrackingNumber value to be equals to trackingNumber'
    );
    expect(await shipmentUpdatePage.getShippingCompanyInput()).to.eq(
      'shippingCompany',
      'Expected ShippingCompany value to be equals to shippingCompany'
    );

    await shipmentUpdatePage.save();
    expect(await shipmentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await shipmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Shipment', async () => {
    const nbButtonsBeforeDelete = await shipmentComponentsPage.countDeleteButtons();
    await shipmentComponentsPage.clickOnLastDeleteButton();

    shipmentDeleteDialog = new ShipmentDeleteDialog();
    expect(await shipmentDeleteDialog.getDialogTitle()).to.eq('netstoreApp.shipment.delete.question');
    await shipmentDeleteDialog.clickOnConfirmButton();

    expect(await shipmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
