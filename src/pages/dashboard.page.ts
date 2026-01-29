import { expect, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/dashboard/);
  }
}
