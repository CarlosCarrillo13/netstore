import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  SubscriptionProgramComponentsPage,
  SubscriptionProgramDeleteDialog,
  SubscriptionProgramUpdatePage,
} from './subscription-program.page-object';

const expect = chai.expect;

describe('SubscriptionProgram e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subscriptionProgramComponentsPage: SubscriptionProgramComponentsPage;
  let subscriptionProgramUpdatePage: SubscriptionProgramUpdatePage;
  let subscriptionProgramDeleteDialog: SubscriptionProgramDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SubscriptionPrograms', async () => {
    await navBarPage.goToEntity('subscription-program');
    subscriptionProgramComponentsPage = new SubscriptionProgramComponentsPage();
    await browser.wait(ec.visibilityOf(subscriptionProgramComponentsPage.title), 5000);
    expect(await subscriptionProgramComponentsPage.getTitle()).to.eq('netstoreApp.subscriptionProgram.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(subscriptionProgramComponentsPage.entities), ec.visibilityOf(subscriptionProgramComponentsPage.noResult)),
      1000
    );
  });

  it('should load create SubscriptionProgram page', async () => {
    await subscriptionProgramComponentsPage.clickOnCreateButton();
    subscriptionProgramUpdatePage = new SubscriptionProgramUpdatePage();
    expect(await subscriptionProgramUpdatePage.getPageTitle()).to.eq('netstoreApp.subscriptionProgram.home.createOrEditLabel');
    await subscriptionProgramUpdatePage.cancel();
  });

  it('should create and save SubscriptionPrograms', async () => {
    const nbButtonsBeforeCreate = await subscriptionProgramComponentsPage.countDeleteButtons();

    await subscriptionProgramComponentsPage.clickOnCreateButton();

    await promise.all([
      subscriptionProgramUpdatePage.subscriptionTypeSelectLastOption(),
      subscriptionProgramUpdatePage.setStartDateInput('startDate'),
      subscriptionProgramUpdatePage.setEndDateInput('endDate'),
      subscriptionProgramUpdatePage.setAmountInput('amount'),
      subscriptionProgramUpdatePage.setNumberOfPosInput('5'),
    ]);

    expect(await subscriptionProgramUpdatePage.getStartDateInput()).to.eq(
      'startDate',
      'Expected StartDate value to be equals to startDate'
    );
    expect(await subscriptionProgramUpdatePage.getEndDateInput()).to.eq('endDate', 'Expected EndDate value to be equals to endDate');
    expect(await subscriptionProgramUpdatePage.getAmountInput()).to.eq('amount', 'Expected Amount value to be equals to amount');
    expect(await subscriptionProgramUpdatePage.getNumberOfPosInput()).to.eq('5', 'Expected numberOfPos value to be equals to 5');

    await subscriptionProgramUpdatePage.save();
    expect(await subscriptionProgramUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await subscriptionProgramComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SubscriptionProgram', async () => {
    const nbButtonsBeforeDelete = await subscriptionProgramComponentsPage.countDeleteButtons();
    await subscriptionProgramComponentsPage.clickOnLastDeleteButton();

    subscriptionProgramDeleteDialog = new SubscriptionProgramDeleteDialog();
    expect(await subscriptionProgramDeleteDialog.getDialogTitle()).to.eq('netstoreApp.subscriptionProgram.delete.question');
    await subscriptionProgramDeleteDialog.clickOnConfirmButton();

    expect(await subscriptionProgramComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
