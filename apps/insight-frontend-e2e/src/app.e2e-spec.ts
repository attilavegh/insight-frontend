import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('Insight app', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should be able to login and send an insight', () => {
    page.open();
    page.login('elte.insight@gmail.com', 'insight_insightapp');

    page.logout();
    page.login('elte.insight.test1@gmail.com', 'ElteInsightTest1', true);

    page.selectUser();
    page.addContinueMessage();
    page.sendInsight();

    page.navigateToSentInsights();
    expect(page.isSent).toBeTruthy();
  });
});
