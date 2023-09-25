const { By, WebDriver } = require('selenium-webdriver')
const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const LoginPage = require('../pageobjects/LoginPage')
const InventoryPage = require('../pageobjects/InventoryPage')

describe('coba integrasi selenium dan mocha', function () {
	/** @type {WebDriver} */ let driver
	/** @type {LoginPage} */ let loginPage
	/** @type {InventoryPage} */ let inventoryPage

	before(async function () {
		driver = await setupDriver()
		loginPage = new LoginPage(driver)
		inventoryPage = new InventoryPage(driver)
	})

	it('coba login dengan user yang salah', async function () {
		await loginPage.openPage()
		await loginPage.loginProcess('abid', 'secret_sauce')

		const errorMessage = await loginPage.getErrorMessage()
		expect(errorMessage).to.include('Username and password do not match any user')
	})

	it('coba login dengan user yang benar', async function () {
		await loginPage.openPage()
		await loginPage.loginProcess('standard_user', 'secret_sauce')

		const productTitle = await inventoryPage.getPageTitle()
		expect(productTitle).to.be.equal('Products')
	})

	afterEach(async function () {
		await driver.sleep(2000)
	})

	after(async function () {
		await driver.close()
	})
})
