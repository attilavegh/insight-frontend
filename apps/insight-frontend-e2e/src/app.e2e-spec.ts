import { AppPage } from './app.po';

describe('Insight app', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.open();
    page.login('elte.insight@gmail.com', 'insight_insightapp');
  });

  afterEach(() => {
    page.logout();
  });

  it('should be logged in', () => {
    expect(page.isLoggedIn()).toBeTruthy();
  });

  it('should be able to send messages', () => {
    page.logout();
    page.login('elte.insight.test1@gmail.com', 'ElteInsightTest1').then(() => {
      page.selectUser();
      page.addContinueMessage();
      page.sendInsight();

      expect(page.sentNotificationElement().getText()).toEqual('Insight has been successfully sent!');
    });
  });

  it('should contain the sent message', () => {
    page.navigateToSentInsights();
    expect(page.isSent()).toBeTruthy();
  });
});
