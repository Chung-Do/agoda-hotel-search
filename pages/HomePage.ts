import { Page } from '@playwright/test';
import { formatDate } from '../utils/dateHelper.js';

export class HomePage {
  private readonly page: Page;

  private readonly searchInput      = '[data-selenium="textInput"]';
  private readonly searchSuggestion = '[data-element-name="search-box-sub-suggestion"]';
  private readonly searchButton     = '[data-element-name="search-button"]';

  private readonly adultAddBtn = '[aria-label="Add Adults"]';
  private readonly adultSubBtn = '[aria-label="Subtract Adults"]';
  private readonly adultCount  = '[data-selenium="desktop-occ-adult-value"]';

  private readonly childAddBtn = '[data-element-name="occupancy-selector-panel-children"][data-selenium="plus"]';
  private readonly childSubBtn = '[data-element-name="occupancy-selector-panel-children"][data-selenium="minus"]';
  private readonly childCount  = '[data-selenium="desktop-occ-children-value"]';

  private readonly roomAddBtn = '[aria-label="Add Room"]';
  private readonly roomSubBtn = '[aria-label="Subtract Room"]';
  private readonly roomCount  = '[data-selenium="desktop-occ-room-value"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async searchHotel(name: string): Promise<void> {
    const searchEl = this.page.locator(this.searchInput);
    await searchEl.click();
    await searchEl.fill(name);
    await this.page.locator(this.searchSuggestion).first().click();
  }

  async selectDates(checkIn: Date, checkOut: Date): Promise<void> {
    await this.selectDateOnCalendar(checkIn);
    await this.selectDateOnCalendar(checkOut);
  }

  async setOccupancy(rooms: number, adults: number, children: number): Promise<void> {
    await this.setCount(this.roomCount, this.roomAddBtn, this.roomSubBtn, rooms);
    await this.page.locator(this.adultCount).waitFor({ state: 'visible' });
    await this.setCount(this.adultCount, this.adultAddBtn, this.adultSubBtn, adults);
    await this.setCount(this.childCount, this.childAddBtn, this.childSubBtn, children);
  }

  async clickSearch(): Promise<void> {
    await this.page.locator(this.searchButton).click();
  }

  private async selectDateOnCalendar(date: Date): Promise<void> {
    await this.page.locator(`[data-selenium-date="${formatDate(date)}"]`).click();
  }

  private async setCount(
    countSelector: string,
    addSelector: string,
    subSelector: string,
    target: number
  ): Promise<void> {
    const countEl = this.page.locator(countSelector);
    const current = parseInt(await countEl.innerText(), 10);
    const delta   = target - current;

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
