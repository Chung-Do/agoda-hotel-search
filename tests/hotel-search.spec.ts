import { test } from '@playwright/test';

import { HomePage } from '../pages/HomePage.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import { HotelDetailPage } from '../pages/HotelDetailPage.js';
import { addDays } from '../utils/dateHelper.js';

const SEARCH = {
  hotelName:           'Muong Thanh Saigon Centre Hotel',
  checkInOffsetDays:   2,
  checkOutOffsetDays:  3,
  rooms:               1,
  adults:              4,
  children:            2,
};

test.describe('Hotel Search', () => {
  test('should display price on detail page after searching with occupancy', async ({ page }) => {
    const home    = new HomePage(page);
    const results = new SearchResultsPage(page);

    const today    = new Date();
    const checkIn  = addDays(today, SEARCH.checkInOffsetDays);
    const checkOut = addDays(today, SEARCH.checkOutOffsetDays);

    await home.goto();
    await home.searchHotel(SEARCH.hotelName);
    await home.selectDates(checkIn, checkOut);
    await home.setOccupancy(SEARCH.rooms, SEARCH.adults, SEARCH.children);
    await home.clickSearch();

    const detailPage = await results.openFirstResult();
    const detail     = new HotelDetailPage(detailPage);

    await detail.expectPriceVisible();
  });
});
