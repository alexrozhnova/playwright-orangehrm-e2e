import { expect, type Locator, type Page } from '@playwright/test';

export class EmployeeListPage {
  readonly page: Page;

  readonly employeeIdInput: Locator;
  readonly searchButton: Locator;
  readonly tableBody: Locator;

  constructor(page: Page) {
    this.page = page;

    this.employeeIdInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.tableBody = page.locator('.oxd-table-body');
  }

  async open() {
    await this.page.goto('/web/index.php/pim/viewEmployeeList');
    await expect(this.employeeIdInput).toBeVisible();
  }

  async searchByEmployeeId(employeeId: string) {
    await this.employeeIdInput.fill(employeeId);
    await this.searchButton.click();
  }

  async expectRowWithEmployeeId(employeeId: string) {
    // Wait for table to update after search
    await expect(this.tableBody).toBeVisible({ timeout: 10000 });
    
    const row = this.tableBody.locator('.oxd-table-card').filter({ hasText: employeeId });
    await expect(row).toBeVisible({ timeout: 10000 });
  }
}
