export class FinancePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('finance-app h1')).getText();
  }
}
