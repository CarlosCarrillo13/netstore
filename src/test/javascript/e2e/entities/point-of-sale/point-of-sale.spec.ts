import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PointOfSaleComponentsPage, PointOfSaleDeleteDialog, PointOfSaleUpdatePage } from './point-of-sale.page-object';

const expect = chai.expect;

describe('PointOfSale e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pointOfSaleComponentsPage: PointOfSaleComponentsPage;
  let pointOfSaleUpdatePage: PointOfSaleUpdatePage;
  let pointOfSaleDeleteDialog: PointOfSaleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PointOfSales', async () => {
    await navBarPage.goToEntity('point-of-sale');
    pointOfSaleComponentsPage = new PointOfSaleComponentsPage();
    await browser.wait(ec.visibilityOf(pointOfSaleComponentsPage.title), 5000);
    expect(await pointOfSaleComponentsPage.getTitle()).to.eq('netstoreApp.pointOfSale.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(pointOfSaleComponentsPage.entities), ec.visibilityOf(pointOfSaleComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PointOfSale page', async () => {
    await pointOfSaleComponentsPage.clickOnCreateButton();
    pointOfSaleUpdatePage = new PointOfSaleUpdatePage();
    expect(await pointOfSaleUpdatePage.getPageTitle()).to.eq('netstoreApp.pointOfSale.home.createOrEditLabel');
    await pointOfSaleUpdatePage.cancel();
  });

  it('should create and save PointOfSales', async () => {
    const nbButtonsBeforeCreate = await pointOfSaleComponentsPage.countDeleteButtons();

    await pointOfSaleComponentsPage.clickOnCreateButton();

    await promise.all([
      pointOfSaleUpdatePage.setNameInput('name'),
      pointOfSaleUpdatePage.statusSelectLastOption(),
      pointOfSaleUpdatePage.addressSelectLastOption(),
      pointOfSaleUpdatePage.bussinessSelectLastOption(),
    ]);

    expect(await pointOfSaleUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    const selectedSubscribed = pointOfSaleUpdatePage.getSubscribedInput();
    if (await selectedSubscribed.isSelected()) {
      await pointOfSaleUpdatePage.getSubscribedInput().click();
      expect(await pointOfSaleUpdatePage.getSubscribedInput().isSelected(), 'Expected subscribed not to be selected').to.be.false;
    } else {
      await pointOfSaleUpdatePage.getSubscribedInput().click();
      expect(await pointOfSaleUpdatePage.getSubscribedInput().isSelected(), 'Expected subscribed to be selected').to.be.true;
    }

    await pointOfSaleUpdatePage.save();
    expect(await pointOfSaleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await pointOfSaleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PointOfSale', async () => {
    const nbButtonsBeforeDelete = await pointOfSaleComponentsPage.countDeleteButtons();
    await pointOfSaleComponentsPage.clickOnLastDeleteButton();

    pointOfSaleDeleteDialog = new PointOfSaleDeleteDialog();
    expect(await pointOfSaleDeleteDialog.getDialogTitle()).to.eq('netstoreApp.pointOfSale.delete.question');
    await pointOfSaleDeleteDialog.clickOnConfirmButton();

    expect(await pointOfSaleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
