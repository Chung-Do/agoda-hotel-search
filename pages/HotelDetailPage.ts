import { Page, expect } from '@playwright/test';

export class HotelDetailPage {
  private readonly page: Page;

  private readonly stickyNavPrice = "//div[@id='hotelNavBar']//div[2]//div[1]//span[1]//div[1]//span[5]";

  constructor(page: Page) {
    this.page = page;
  }

  async expectPriceVisible(): Promise<void> {
    await this.page.waitForLoadState('load');
    await expect(this.page.locator(this.stickyNavPrice).first()).toBeVisible();
  }
}
