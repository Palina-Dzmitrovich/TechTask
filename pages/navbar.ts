import { Page } from '@playwright/test';

export class NavigationBar {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	public elements = {
		entranceButton: '//a[@href="/login"]',
		brand: 'a.navbar-brand',
	};
}
