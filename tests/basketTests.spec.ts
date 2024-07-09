import { test, chromium, expect } from '@playwright/test';
import { NavigationHelper } from '../helpers/navigationHelper';
import { urls } from '../data/urls';
import { LoginPage } from '../pages/login';
import { NavigationBar } from '../pages/navbar';
import { ElementHelper } from '../helpers/elementHelper';
import { Basket } from '../pages/basket';
import { MainPage } from '../pages/main';

test.describe('Basket tests', async () => {
	let browser;
	let page;

	test.beforeEach(async () => {
		browser = await chromium.launch();
		page = await browser.newPage();
		const navigationHelper = new NavigationHelper(page);
		const elementHelper = new ElementHelper(page);
		const loginPage = new LoginPage(page);
		const navBar = new NavigationBar(page);

		await navigationHelper.openPage(urls.baseUrl);
		await elementHelper.click(navBar.elements.entranceButton);
		await loginPage.loginToShop();
	});

	test('Scenario 1: Adding items to the empty basket', async () => {
		const elementHelper = new ElementHelper(page);
		const navBar = new NavigationBar(page);
		const basket = new Basket(page);
		const mainPage = new MainPage(page);
		const itemsCount = 9;

		await basket.clearBasket();
		await elementHelper.click(navBar.elements.brand);

		await mainPage.addToCart(itemsCount);
		expect(await basket.getBasketCounter()).toEqual(itemsCount);
		await elementHelper.click(basket.elements.basketIcon);
		//no basket preview and order details due to the 500 error
	});

	test('Scenario 2: Adding items to the basket with existing items', async () => {
		const elementHelper = new ElementHelper(page);
		const navBar = new NavigationBar(page);
		const basket = new Basket(page);
		const mainPage = new MainPage(page);
		const itemsCount = 1;

		await basket.clearBasket();
		await elementHelper.click(navBar.elements.brand);

		await mainPage.addToCart(itemsCount);
	});
});
