import { IbOptionsPage } from './app.po';

describe('ib-options App', function() {
  let page: IbOptionsPage;

  beforeEach(() => {
    page = new IbOptionsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
