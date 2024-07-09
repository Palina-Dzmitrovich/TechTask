import { Locator, type Page } from '@playwright/test';

export class ElementHelper {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	public async click(element: string): Promise<void> {
		await this.page.click(element);
	}
}
