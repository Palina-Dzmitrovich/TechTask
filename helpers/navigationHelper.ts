import { type Page } from '@playwright/test';

export class NavigationHelper {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	public async openPage(url: string): Promise<void> {
		await this.page.goto(url);
	}
}
