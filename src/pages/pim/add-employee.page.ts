import { expect, type Locator, type Page } from '@playwright/test';

export class AddEmployeePage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.middleNameInput = page.getByPlaceholder('Middle Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.employeeIdInput = page .locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async open() {
    await this.page.goto('/web/index.php/pim/addEmployee');
    // Wait for the form to be visible


  console.log('URL after goto:', this.page.url()); // <- добавь
  await this.page.waitForTimeout(500); 
    await expect(this.firstNameInput).toBeVisible();
  }

  async createEmployee(firstName: string, middleName: string, lastName: string): Promise<{ employeeId: string }> {
    // Fill first name
    await this.firstNameInput.fill(firstName);
    
    // Fill last name
    await this.lastNameInput.fill(lastName);

    // Fill middle name
    await this.middleNameInput.fill(middleName);
    
    // Read employeeId before saving
    await expect(this.employeeIdInput).toBeVisible();
    const employeeId = await this.employeeIdInput.inputValue();
    
    // Click Save button
    await this.saveButton.click();
    
    return { employeeId };
  }
}
