import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BussinessUnitComponentsPage, BussinessUnitDeleteDialog, BussinessUnitUpdatePage } from './bussiness-unit.page-object';

const expect = chai.expect;

describe('BussinessUnit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bussinessUnitComponentsPage: BussinessUnitComponentsPage;
  let bussinessUnitUpdatePage: BussinessUnitUpdatePage;
  let bussinessUnitDeleteDialog: BussinessUnitDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load BussinessUnits', async () => {
    await navBarPage.goToEntity('bussiness-unit');
    bussinessUnitComponentsPage = new BussinessUnitComponentsPage();
    await browser.wait(ec.visibilityOf(bussinessUnitComponentsPage.title), 5000);
    expect(await bussinessUnitComponentsPage.getTitle()).to.eq('netstoreApp.bussinessUnit.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(bussinessUnitComponentsPage.entities), ec.visibilityOf(bussinessUnitComponentsPage.noResult)),
      1000
    );
  });

  it('should load create BussinessUnit page', async () => {
    await bussinessUnitComponentsPage.clickOnCreateButton();
    bussinessUnitUpdatePage = new BussinessUnitUpdatePage();
    expect(await bussinessUnitUpdatePage.getPageTitle()).to.eq('netstoreApp.bussinessUnit.home.createOrEditLabel');
    await bussinessUnitUpdatePage.cancel();
  });

  it('should create and save BussinessUnits', async () => {
    const nbButtonsBeforeCreate = await bussinessUnitComponentsPage.countDeleteButtons();

    await bussinessUnitComponentsPage.clickOnCreateButton();

    await promise.all([
      bussinessUnitUpdatePage.setNameInput('name'),
      bussinessUnitUpdatePage.setNitInput('nit'),
      bussinessUnitUpdatePage.setBrandInput('brand'),
      bussinessUnitUpdatePage.bussinessSelectLastOption(),
    ]);

    expect(await bussinessUnitUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await bussinessUnitUpdatePage.getNitInput()).to.eq('nit', 'Expected Nit value to be equals to nit');
    expect(await bussinessUnitUpdatePage.getBrandInput()).to.eq('brand', 'Expected Brand value to be equals to brand');
    const selectedActive = bussinessUnitUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await bussinessUnitUpdatePage.getActiveInput().click();
      expect(await bussinessUnitUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await bussinessUnitUpdatePage.getActiveInput().click();
      expect(await bussinessUnitUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }

    await bussinessUnitUpdatePage.save();
    expect(await bussinessUnitUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await bussinessUnitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last BussinessUnit', async () => {
    const nbButtonsBeforeDelete = await bussinessUnitComponentsPage.countDeleteButtons();
    await bussinessUnitComponentsPage.clickOnLastDeleteButton();

    bussinessUnitDeleteDialog = new BussinessUnitDeleteDialog();
    expect(await bussinessUnitDeleteDialog.getDialogTitle()).to.eq('netstoreApp.bussinessUnit.delete.question');
    await bussinessUnitDeleteDialog.clickOnConfirmButton();

    expect(await bussinessUnitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
