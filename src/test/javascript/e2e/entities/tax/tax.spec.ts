import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TaxComponentsPage, TaxDeleteDialog, TaxUpdatePage } from './tax.page-object';

const expect = chai.expect;

describe('Tax e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taxComponentsPage: TaxComponentsPage;
  let taxUpdatePage: TaxUpdatePage;
  let taxDeleteDialog: TaxDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Taxes', async () => {
    await navBarPage.goToEntity('tax');
    taxComponentsPage = new TaxComponentsPage();
    await browser.wait(ec.visibilityOf(taxComponentsPage.title), 5000);
    expect(await taxComponentsPage.getTitle()).to.eq('netstoreApp.tax.home.title');
    await browser.wait(ec.or(ec.visibilityOf(taxComponentsPage.entities), ec.visibilityOf(taxComponentsPage.noResult)), 1000);
  });

  it('should load create Tax page', async () => {
    await taxComponentsPage.clickOnCreateButton();
    taxUpdatePage = new TaxUpdatePage();
    expect(await taxUpdatePage.getPageTitle()).to.eq('netstoreApp.tax.home.createOrEditLabel');
    await taxUpdatePage.cancel();
  });

  it('should create and save Taxes', async () => {
    const nbButtonsBeforeCreate = await taxComponentsPage.countDeleteButtons();

    await taxComponentsPage.clickOnCreateButton();

    await promise.all([
      taxUpdatePage.setPercentageInput('5'),
      taxUpdatePage.setConceptInput('concept'),
      taxUpdatePage.itemSelectLastOption(),
    ]);

    expect(await taxUpdatePage.getPercentageInput()).to.eq('5', 'Expected percentage value to be equals to 5');
    expect(await taxUpdatePage.getConceptInput()).to.eq('concept', 'Expected Concept value to be equals to concept');

    await taxUpdatePage.save();
    expect(await taxUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await taxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Tax', async () => {
    const nbButtonsBeforeDelete = await taxComponentsPage.countDeleteButtons();
    await taxComponentsPage.clickOnLastDeleteButton();

    taxDeleteDialog = new TaxDeleteDialog();
    expect(await taxDeleteDialog.getDialogTitle()).to.eq('netstoreApp.tax.delete.question');
    await taxDeleteDialog.clickOnConfirmButton();

    expect(await taxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
