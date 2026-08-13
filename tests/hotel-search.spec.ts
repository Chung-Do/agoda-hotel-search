import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import { HotelDetailPage } from '../pages/HotelDetailPage.js';
import { addDays } from '../utils/dateHelper.js';

const SEARCH = {
  hotelName: 'Muong Thanh Saigon Centre Hotel',
  rooms: 1,
  adults: 4,
  children: 2,
};

test('Search hotel and verify price is displayed', async ({ page }) => {
  const home    = new HomePage(page);
  const results = new SearchResultsPage(page);

  const checkIn  = addDays(new Date(), 2);
  const checkOut = addDays(new Date(), 3);

  await home.goto();
  await home.searchHotel(SEARCH.hotelName);
  await home.setCheckInDateAndSetCheckOutDate(checkIn,checkOut);
  await home.setOccupancy(SEARCH.rooms, SEARCH.adults, SEARCH.children);
  await home.clickSearch();

  const detailPage = await results.clickFirstAvailableResult();
  const detail = new HotelDetailPage(detailPage);

  expect(await detail.isPriceVisible()).toBe(true);
});
