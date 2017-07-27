import { A2forumPage } from './app.po';

describe('a2forum App', function() {
  let page: A2forumPage;

  beforeEach(() => {
    page = new A2forumPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
