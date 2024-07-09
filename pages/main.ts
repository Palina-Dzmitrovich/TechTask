import { Page, ElementHandle } from '@playwright/test';

export class MainPage {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	public elements = {
		item: '.note-list .note-item ',
		itemAddButton: 'div.note-item>div>.actionBuyProduct',
		itemAddDiscountedButton: 'div.note-item.hasDiscount>div>.actionBuyProduct',
		discountedItem: 'div.note-item.hasDiscount',
	};

	public async addToCart(
		amount: number = 1,
		discounted: Boolean = false
	): Promise<void> {
		let itemCount;

		if (discounted) {
			const allItems = await this.page
				.locator(this.elements.itemAddDiscountedButton)
				.all();

			for (let i = 1; i <= allItems.length; i++) {
				itemCount = await this.page.innerHTML(
					`.note-list.row>div>.hasDiscount:nth-child(${i}) span.product_count`
				);
				if (Number(itemCount) < amount) {
					continue;
				} else {
					for (let j = 0; j < amount; j++) {
						await this.page.click(
							`.note-list.row>div>.hasDiscount:nth-child(${j}) button.actionBuyProduct`
						);
					}
				}
			}
		} else {
			const allItems = await this.page
				.locator(this.elements.itemAddButton)
				.all();

			for (let i = 1; i <= allItems.length; i++) {
				itemCount = await this.page.innerHTML(
					`.note-list.row>div:nth-child(${i}) span.product_count`
				);
				if (Number(itemCount) < amount) {
					continue;
				} else {
					for (let j = 0; j < amount; j++) {
						await this.page.click(
							`.note-list.row>div:nth-child(${i}) button.actionBuyProduct`
						);
					}
				}
			}
		}
	}
}
