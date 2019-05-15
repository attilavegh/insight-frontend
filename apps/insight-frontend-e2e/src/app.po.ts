import { browser, by, element, protractor } from 'protractor';

export class AppPage {

  private message = 'Keep up the good work';

  open() {
    browser.get('/');
    browser.driver.sleep(2000);
  }

  login(email: string, password: string) {
    const loginButton = element(by.css('.login__button'));
    loginButton.click();

    browser.driver.sleep(5000);

    return browser.getAllWindowHandles()
      .then((handles) => {
        return browser.switchTo().window(handles[1]);
      })
      .then(() => {
        browser.ignoreSynchronization = true;
        return browser.driver.findElements(by.css('.eARute'));
      })
      .then((newAccountCreatorElements) => {
        if (!!newAccountCreatorElements[0]) {
          newAccountCreatorElements[0].click();
          browser.driver.sleep(3000);
        }

        browser.driver.findElement(by.id('identifierId')).sendKeys(email);
        browser.driver.findElement(by.id('identifierNext')).click();

        browser.driver.sleep(5000);

        browser.driver.findElement(by.name('password')).sendKeys(password);
        browser.driver.findElement(by.id('passwordNext')).click();

        browser.driver.sleep(5000);
        browser.ignoreSynchronization = false;
      })
      .then(() => {
        return browser.getAllWindowHandles();
      })
      .then((handles) => {
        browser.switchTo().window(handles[0]);
      });
  }

  logout() {
    browser.element(by.css('.insight-header__settings')).click();
    browser.element(by.css('.insight-header__settings-menu-list-item')).click();
    browser.driver.sleep(2000);
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

  sentNotificationElement() {
    const notificationElement = element(by.css('.notification__message'));
    browser.wait(protractor.ExpectedConditions.visibilityOf(notificationElement), 5000);

    return notificationElement;
  }

  isSent() {
    return !!browser.element(by.cssContainingText('.message__content-continue', this.message));
  }

  isLoggedIn() {
    const authToken = browser.executeScript('return window.localStorage.getItem("insightAuthToken");');
    return !!authToken;
  }
}
