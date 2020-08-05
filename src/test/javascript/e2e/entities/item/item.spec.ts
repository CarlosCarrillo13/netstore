import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ItemComponentsPage, ItemDeleteDialog, ItemUpdatePage } from './item.page-object';

const expect = chai.expect;

describe('Item e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemComponentsPage: ItemComponentsPage;
  let itemUpdatePage: ItemUpdatePage;
  let itemDeleteDialog: ItemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Items', async () => {
    await navBarPage.goToEntity('item');
    itemComponentsPage = new ItemComponentsPage();
    await browser.wait(ec.visibilityOf(itemComponentsPage.title), 5000);
    expect(await itemComponentsPage.getTitle()).to.eq('netstoreApp.item.home.title');
    await browser.wait(ec.or(ec.visibilityOf(itemComponentsPage.entities), ec.visibilityOf(itemComponentsPage.noResult)), 1000);
  });

  it('should load create Item page', async () => {
    await itemComponentsPage.clickOnCreateButton();
    itemUpdatePage = new ItemUpdatePage();
    expect(await itemUpdatePage.getPageTitle()).to.eq('netstoreApp.item.home.createOrEditLabel');
    await itemUpdatePage.cancel();
  });

  it('should create and save Items', async () => {
    const nbButtonsBeforeCreate = await itemComponentsPage.countDeleteButtons();

    await itemComponentsPage.clickOnCreateButton();

    await promise.all([
      itemUpdatePage.setNameInput('name'),
      itemUpdatePage.setSkuInput('sku'),
      itemUpdatePage.setEndDateInput('endDate'),
      itemUpdatePage.setAmountInput('amount'),
      itemUpdatePage.itemCategorySelectLastOption(),
      itemUpdatePage.invoiceSelectLastOption(),
    ]);

    expect(await itemUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await itemUpdatePage.getSkuInput()).to.eq('sku', 'Expected Sku value to be equals to sku');
    expect(await itemUpdatePage.getEndDateInput()).to.eq('endDate', 'Expected EndDate value to be equals to endDate');
    expect(await itemUpdatePage.getAmountInput()).to.eq('amount', 'Expected Amount value to be equals to amount');

    await itemUpdatePage.save();
    expect(await itemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await itemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Item', async () => {
    const nbButtonsBeforeDelete = await itemComponentsPage.countDeleteButtons();
    await itemComponentsPage.clickOnLastDeleteButton();

    itemDeleteDialog = new ItemDeleteDialog();
    expect(await itemDeleteDialog.getDialogTitle()).to.eq('netstoreApp.item.delete.question');
    await itemDeleteDialog.clickOnConfirmButton();

    expect(await itemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
