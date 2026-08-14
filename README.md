# Agoda Hotel Search — Playwright E2E

Automated end-to-end test that simulates a real user searching for a hotel on [agoda.com](https://www.agoda.com):
enters a hotel name → picks check-in / check-out dates → sets room and guest count → navigates to the hotel detail page → verifies that a price is displayed.

---

## Prerequisites

Install these before running:

- [Node.js 18+](https://nodejs.org)
- [npm 9+](https://www.npmjs.com) (bundled with Node.js)

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Download the Chromium browser Playwright needs
npx playwright install chromium
```

---

## Run the tests

```bash
# Headless (no visible browser window)
npm test

# Headed (watch the browser as the test runs)
npm run test:headed
```

After a run, open the HTML report:

```bash
npx playwright show-report
```

---

## What's inside

```
pages/
  HomePage.ts           search form — hotel name, dates, occupancy
  SearchResultsPage.ts  hotel listing — opens the first result
  HotelDetailPage.ts    detail page — asserts the price is visible

tests/
  hotel-search.spec.ts  the test scenario

utils/
  dateHelper.ts         date arithmetic and formatting helpers

playwright.config.ts    timeouts, base URL, browser settings
```
