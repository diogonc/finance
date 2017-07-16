import { FinancePage } from './app.po';

describe('finance App', () => {
  let page: FinancePage;

  beforeEach(() => {
    page = new FinancePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
