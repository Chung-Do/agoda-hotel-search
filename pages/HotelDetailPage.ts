import { Page } from '@playwright/test';

export class HotelDetailPage {
  private readonly page: Page;
private readonly stickyNavPrice = "//div[@id='hotelNavBar']//div[2]//div[1]//span[1]//div[1]//span[5]";
  constructor(page: Page) {
    this.page = page;
  }

  async isPriceVisible(): Promise<boolean> {
    await this.page.waitForLoadState('load');
    await this.page.locator('#hotelNavBar').waitFor({ state: 'visible' });
    await this.page.locator(this.stickyNavPrice).first().waitFor({ state: 'visible' });
    return this.page.locator(this.stickyNavPrice).first().isVisible();
  }
}
