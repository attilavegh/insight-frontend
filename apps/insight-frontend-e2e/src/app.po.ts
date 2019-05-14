import { browser, by, element } from 'protractor';

export class AppPage {

  private message = 'Keep up the good work';

  open() {
    return browser.get('/');
  }

  login(email: string, password: string, hasExistingAccounts = false) {
    const loginButton = element(by.css('.login__button'));
    loginButton.click();

    browser.driver.sleep(5000);

    return browser.getAllWindowHandles().then((handles) => {
      browser.switchTo().window(handles[1]).then(() => {
        browser.ignoreSynchronization = true;

        if (hasExistingAccounts) {
          browser.driver.findElement(by.css('.eARute')).click();
          browser.driver.sleep(3000);
        }

        browser.driver.findElement(by.id('identifierId')).sendKeys(email);
        browser.driver.findElement(by.id('identifierNext')).click();

        browser.driver.sleep(5000);

        browser.driver.findElement(by.name('password')).sendKeys(password);
        browser.driver.findElement(by.id('passwordNext')).click();

        browser.driver.sleep(5000);
        browser.ignoreSynchronization = false;
      });
    }).then(() => {
      browser.getAllWindowHandles().then((handles) => {
        browser.switchTo().window(handles[0]);
      });
    });
  }

  logout() {
    browser.element(by.css('.insight-header__settings')).click();
    browser.element(by.css('.insight-header__settings-menu-list-item')).click();
  }

  selectUser() {
    const searchField = browser.element(by.css('.user-search__box-input'));
    searchField.click();
    searchField.sendKeys('Attila');

    browser.sleep(3000);

    browser.element.all(by.css('.user-search__dropdown-item')).get(0).click();
  }

  addContinueMessage() {
    const inputBox = browser.element(by.css('.insight-input-box__text'));
    inputBox.click();
    inputBox.sendKeys(this.message);
    browser.sleep(1000);
  }

  sendInsight() {
    browser.element(by.css('.button-wrapper__button')).click();
    browser.sleep(1000);
  }

  navigateToSentInsights() {
    browser.get('/insights/sent');
    browser.sleep(2000);
  }

  isSent() {
    return !!browser.element(by.cssContainingText('.message__content-continue', this.message));
  }
}
