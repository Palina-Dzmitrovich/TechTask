import { Page } from '@playwright/test';
import { userConfig } from '../userConfig';

export class LoginPage {
	private page: Page;

	private elements = {
		loginField: '#loginform-username',
		passwordField: '#loginform-password',
		submitButton: '//button[@name="login-button"]',
	};

	constructor(page: Page) {
		this.page = page;
	}

	public async loginToShop(): Promise<void> {
		await this.page.locator(this.elements.loginField).type(userConfig.login);
		await this.page
			.locator(this.elements.passwordField)
			.type(userConfig.password);
		await this.page.locator(this.elements.submitButton).click();
		await this.page.waitForSelector('div.note-item.card'); //remove
	}
}
