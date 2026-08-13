import { Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;

  private readonly searchInput   = '[data-selenium="textInput"]';
  private readonly checkInBox    = '#check-in-box';
  private readonly checkOutBox   = '#check-out-box';
  private readonly occupancyBox  = '#occupancy-box';
  private readonly searchButton  = '[data-element-name="search-button"]';

  private readonly adultAddBtn    = '[aria-label="Add Adults"]';
  private readonly adultSubBtn    = '[aria-label="Subtract Adults"]';
  private readonly adultCount     = '[data-selenium="desktop-occ-adult-value"]';

  private readonly childAddBtn    = '[data-element-name="occupancy-selector-panel-children"][data-selenium="plus"]';
  private readonly childSubBtn    = '[data-element-name="occupancy-selector-panel-children"][data-selenium="minus"]';
  private readonly childCount     = '[data-selenium="desktop-occ-children-value"]';

  private readonly roomAddBtn     = '[aria-label="Add Room"]';
  private readonly roomSubBtn     = '[aria-label="Subtract Room"]';
  private readonly roomCount      = '[data-selenium="desktop-occ-room-value"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async searchHotel(name: string): Promise<void> {
    await this.page.locator(this.searchInput).click();
    await this.page.locator(this.searchInput).fill(name);
    await this.page.locator('[data-element-name="search-box-sub-suggestion"]').first().waitFor({ state: 'visible' });
    await this.page.locator('[data-element-name="search-box-sub-suggestion"]').first().click();
  }

  async setCheckInDateAndSetCheckOutDate (checkInDate: Date, checkOutDate: Date): Promise<void> {
    await this.selectDateOnCalendar(checkInDate);
    await this.selectDateOnCalendar(checkOutDate);
  }

  async setOccupancy(rooms: number, adults: number, children: number): Promise<void> {
    // await this.page.locator(this.occupancyBox).click();
    await this.setCount(this.roomCount, this.roomAddBtn, this.roomSubBtn, rooms);
    await this.page.locator(this.adultCount).waitFor({ state: 'visible' });
    await this.setCount(this.adultCount, this.adultAddBtn, this.adultSubBtn, adults);
    await this.setCount(this.childCount, this.childAddBtn, this.childSubBtn, children);
  }

  async clickSearch(): Promise<void> {
    await this.page.locator(this.searchButton).click();
  }

  private async selectDateOnCalendar(date: Date): Promise<void> {
    const yyyy = date.getFullYear();
    const mm   = String(date.getMonth() + 1).padStart(2, '0');
    const dd   = String(date.getDate()).padStart(2, '0');
    await this.page.locator(`[data-selenium-date="${yyyy}-${mm}-${dd}"]`).click();
  }

  private async setCount(
    countSelector: string,
    addSelector: string,
    subSelector: string,
    target: number
  ): Promise<void> {
    const countEl = this.page.locator(countSelector);
    const current = parseInt(await countEl.innerText(), 10);
    const delta = target - current;

    if (delta > 0) {
      for (let i = 0; i < delta; i++) {
        await this.page.locator(addSelector).click();
      }
    } else if (delta < 0) {
      for (let i = 0; i < Math.abs(delta); i++) {
        await this.page.locator(subSelector).click();
      }
    }
  }
}
