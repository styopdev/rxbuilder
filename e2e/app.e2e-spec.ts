import { FindOperatorPage } from './app.po';

describe('find-operator App', () => {
  let page: FindOperatorPage;

  beforeEach(() => {
    page = new FindOperatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
