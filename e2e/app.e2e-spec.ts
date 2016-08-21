import { EventItPage } from './app.po';

describe('event-it App', function() {
  let page: EventItPage;

  beforeEach(() => {
    page = new EventItPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
