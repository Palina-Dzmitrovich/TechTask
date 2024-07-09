import { Page } from '@playwright/test';

export class Basket {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	public elements = {
		basketIcon: '#dropdownBasket',
		clearBasketButton: '.actionClearBasket>a',
		basketCounter: '.basket-count-items',
	};

	public async clearBasket(): Promise<void> {
		const counter = await this.page.innerText(this.elements.basketCounter);
		if (counter != '0') {
			await this.page.locator(this.elements.basketIcon).click();
			await this.page.locator(this.elements.basketIcon).click();
			await this.page.locator(this.elements.clearBasketButton).click();
		}
	}

	public async getBasketCounter(): Promise<number> {
		const counter = await this.page
			.locator(this.elements.basketCounter)
			.innerHTML();
		return Number(counter);
	}
}
