import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InvoiceComponentsPage, InvoiceDeleteDialog, InvoiceUpdatePage } from './invoice.page-object';

const expect = chai.expect;

describe('Invoice e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let invoiceComponentsPage: InvoiceComponentsPage;
  let invoiceUpdatePage: InvoiceUpdatePage;
  let invoiceDeleteDialog: InvoiceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Invoices', async () => {
    await navBarPage.goToEntity('invoice');
    invoiceComponentsPage = new InvoiceComponentsPage();
    await browser.wait(ec.visibilityOf(invoiceComponentsPage.title), 5000);
    expect(await invoiceComponentsPage.getTitle()).to.eq('netstoreApp.invoice.home.title');
    await browser.wait(ec.or(ec.visibilityOf(invoiceComponentsPage.entities), ec.visibilityOf(invoiceComponentsPage.noResult)), 1000);
  });

  it('should load create Invoice page', async () => {
    await invoiceComponentsPage.clickOnCreateButton();
    invoiceUpdatePage = new InvoiceUpdatePage();
    expect(await invoiceUpdatePage.getPageTitle()).to.eq('netstoreApp.invoice.home.createOrEditLabel');
    await invoiceUpdatePage.cancel();
  });

  it('should create and save Invoices', async () => {
    const nbButtonsBeforeCreate = await invoiceComponentsPage.countDeleteButtons();

    await invoiceComponentsPage.clickOnCreateButton();

    await promise.all([
      invoiceUpdatePage.setTotalPrizeInput('totalPrize'),
      invoiceUpdatePage.setTotalTaxInput('totalTax'),
      invoiceUpdatePage.setTotalDiscountInput('totalDiscount'),
      invoiceUpdatePage.setDateInput('date'),
      invoiceUpdatePage.invoiceVendorSelectLastOption(),
      invoiceUpdatePage.invoiceShipmentSelectLastOption(),
    ]);

    expect(await invoiceUpdatePage.getTotalPrizeInput()).to.eq('totalPrize', 'Expected TotalPrize value to be equals to totalPrize');
    expect(await invoiceUpdatePage.getTotalTaxInput()).to.eq('totalTax', 'Expected TotalTax value to be equals to totalTax');
    expect(await invoiceUpdatePage.getTotalDiscountInput()).to.eq(
      'totalDiscount',
      'Expected TotalDiscount value to be equals to totalDiscount'
    );
    expect(await invoiceUpdatePage.getDateInput()).to.eq('date', 'Expected Date value to be equals to date');
    const selectedRecall = invoiceUpdatePage.getRecallInput();
    if (await selectedRecall.isSelected()) {
      await invoiceUpdatePage.getRecallInput().click();
      expect(await invoiceUpdatePage.getRecallInput().isSelected(), 'Expected recall not to be selected').to.be.false;
    } else {
      await invoiceUpdatePage.getRecallInput().click();
      expect(await invoiceUpdatePage.getRecallInput().isSelected(), 'Expected recall to be selected').to.be.true;
    }

    await invoiceUpdatePage.save();
    expect(await invoiceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Invoice', async () => {
    const nbButtonsBeforeDelete = await invoiceComponentsPage.countDeleteButtons();
    await invoiceComponentsPage.clickOnLastDeleteButton();

    invoiceDeleteDialog = new InvoiceDeleteDialog();
    expect(await invoiceDeleteDialog.getDialogTitle()).to.eq('netstoreApp.invoice.delete.question');
    await invoiceDeleteDialog.clickOnConfirmButton();

    expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
