import { expect, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectOpened() {
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async openPIM() {
    await this.page.goto('/web/index.php/dashboard/index');
    await this.page.locator('a[href*="/web/index.php/pim/viewPimModule"], a[href*="/web/index.php/pim/viewEmployeeList"]').first().click();
    await this.page.waitForURL(/\/web\/index\.php\/pim\/viewEmployeeList/);
  }
}
