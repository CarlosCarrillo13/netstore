import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PrizeComponentsPage, PrizeDeleteDialog, PrizeUpdatePage } from './prize.page-object';

const expect = chai.expect;

describe('Prize e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prizeComponentsPage: PrizeComponentsPage;
  let prizeUpdatePage: PrizeUpdatePage;
  let prizeDeleteDialog: PrizeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Prizes', async () => {
    await navBarPage.goToEntity('prize');
    prizeComponentsPage = new PrizeComponentsPage();
    await browser.wait(ec.visibilityOf(prizeComponentsPage.title), 5000);
    expect(await prizeComponentsPage.getTitle()).to.eq('netstoreApp.prize.home.title');
    await browser.wait(ec.or(ec.visibilityOf(prizeComponentsPage.entities), ec.visibilityOf(prizeComponentsPage.noResult)), 1000);
  });

  it('should load create Prize page', async () => {
    await prizeComponentsPage.clickOnCreateButton();
    prizeUpdatePage = new PrizeUpdatePage();
    expect(await prizeUpdatePage.getPageTitle()).to.eq('netstoreApp.prize.home.createOrEditLabel');
    await prizeUpdatePage.cancel();
  });

  it('should create and save Prizes', async () => {
    const nbButtonsBeforeCreate = await prizeComponentsPage.countDeleteButtons();

    await prizeComponentsPage.clickOnCreateButton();

    await promise.all([
      prizeUpdatePage.setSymbolInput('symbol'),
      prizeUpdatePage.setCountryInput('country'),
      prizeUpdatePage.setAmountInput('amount'),
      prizeUpdatePage.itemSelectLastOption(),
      prizeUpdatePage.pointOfSaleSelectLastOption(),
    ]);

    expect(await prizeUpdatePage.getSymbolInput()).to.eq('symbol', 'Expected Symbol value to be equals to symbol');
    expect(await prizeUpdatePage.getCountryInput()).to.eq('country', 'Expected Country value to be equals to country');
    expect(await prizeUpdatePage.getAmountInput()).to.eq('amount', 'Expected Amount value to be equals to amount');

    await prizeUpdatePage.save();
    expect(await prizeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await prizeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Prize', async () => {
    const nbButtonsBeforeDelete = await prizeComponentsPage.countDeleteButtons();
    await prizeComponentsPage.clickOnLastDeleteButton();

    prizeDeleteDialog = new PrizeDeleteDialog();
    expect(await prizeDeleteDialog.getDialogTitle()).to.eq('netstoreApp.prize.delete.question');
    await prizeDeleteDialog.clickOnConfirmButton();

    expect(await prizeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
