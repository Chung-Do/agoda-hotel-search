import { Page } from '@playwright/test';

export class SearchResultsPage {
  private readonly page: Page;

  private readonly hotelList        = 'ol.hotel-list-container';
  private readonly hotelItem        = '[data-selenium="hotel-item"]';
  private readonly propertyNameLink = '[data-testid="property-name-link"]';

  constructor(page: Page) {
    this.page = page;
  }

  async openFirstResult(): Promise<Page> {
    await this.page.locator(this.hotelList).waitFor({ state: 'visible' });

    const firstItem = this.page.locator(this.hotelList).locator(this.hotelItem).first();

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      firstItem.locator(this.propertyNameLink).click(),
    ]);

    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }
}
