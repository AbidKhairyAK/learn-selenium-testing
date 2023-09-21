const { By, WebDriver } = require('selenium-webdriver')
const Page = require('./Page')

class InventoryPage extends Page {
	// initialization
	constructor(driver) {
		super(driver)
	}

	pageTitleEl = By.css('.product_label')

	async openPage() {
		await this.openUrl('/inventory.html')
	}
	async getPageTitle () {
		return await this.driver.findElement(this.pageTitleEl).getText()
	}
}

module.exports = InventoryPage