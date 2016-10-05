import { FinancePage } from './app.po';

describe('finance App', function() {
  let page: FinancePage;

  beforeEach(() => {
    page = new FinancePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
