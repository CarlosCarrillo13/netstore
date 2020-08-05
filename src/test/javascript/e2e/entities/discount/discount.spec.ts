import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DiscountComponentsPage, DiscountDeleteDialog, DiscountUpdatePage } from './discount.page-object';

const expect = chai.expect;

describe('Discount e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let discountComponentsPage: DiscountComponentsPage;
  let discountUpdatePage: DiscountUpdatePage;
  let discountDeleteDialog: DiscountDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Discounts', async () => {
    await navBarPage.goToEntity('discount');
    discountComponentsPage = new DiscountComponentsPage();
    await browser.wait(ec.visibilityOf(discountComponentsPage.title), 5000);
    expect(await discountComponentsPage.getTitle()).to.eq('netstoreApp.discount.home.title');
    await browser.wait(ec.or(ec.visibilityOf(discountComponentsPage.entities), ec.visibilityOf(discountComponentsPage.noResult)), 1000);
  });

  it('should load create Discount page', async () => {
    await discountComponentsPage.clickOnCreateButton();
    discountUpdatePage = new DiscountUpdatePage();
    expect(await discountUpdatePage.getPageTitle()).to.eq('netstoreApp.discount.home.createOrEditLabel');
    await discountUpdatePage.cancel();
  });

  it('should create and save Discounts', async () => {
    const nbButtonsBeforeCreate = await discountComponentsPage.countDeleteButtons();

    await discountComponentsPage.clickOnCreateButton();

    await promise.all([
      discountUpdatePage.setPercentageInput('5'),
      discountUpdatePage.setConceptInput('concept'),
      discountUpdatePage.setStartDateInput('startDate'),
      discountUpdatePage.setEndDateInput('endDate'),
      discountUpdatePage.itemSelectLastOption(),
    ]);

    expect(await discountUpdatePage.getPercentageInput()).to.eq('5', 'Expected percentage value to be equals to 5');
    expect(await discountUpdatePage.getConceptInput()).to.eq('concept', 'Expected Concept value to be equals to concept');
    expect(await discountUpdatePage.getStartDateInput()).to.eq('startDate', 'Expected StartDate value to be equals to startDate');
    expect(await discountUpdatePage.getEndDateInput()).to.eq('endDate', 'Expected EndDate value to be equals to endDate');
    const selectedActive = discountUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await discountUpdatePage.getActiveInput().click();
      expect(await discountUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await discountUpdatePage.getActiveInput().click();
      expect(await discountUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }

    await discountUpdatePage.save();
    expect(await discountUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await discountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Discount', async () => {
    const nbButtonsBeforeDelete = await discountComponentsPage.countDeleteButtons();
    await discountComponentsPage.clickOnLastDeleteButton();

    discountDeleteDialog = new DiscountDeleteDialog();
    expect(await discountDeleteDialog.getDialogTitle()).to.eq('netstoreApp.discount.delete.question');
    await discountDeleteDialog.clickOnConfirmButton();

    expect(await discountComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
