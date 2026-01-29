import { test as setup } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { DashboardPage } from '../../src/pages/dashboard.page';

const authFile = 'playwright/.auth/admin.json';

setup('authenticate as Admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.open();
  await loginPage.login('Admin', 'admin123');
  await dashboardPage.expectOpened();

  // Save signed-in state to 'playwright/.auth/admin.json'
  await page.context().storageState({ path: authFile });
});
