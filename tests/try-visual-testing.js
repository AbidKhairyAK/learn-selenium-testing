const { By } = require('selenium-webdriver')
const { existsSync, writeFileSync, readFileSync } = require('fs')
const setupDriver = require('../utils/setupDriver')
const chai = require('chai')
const { chaiImage } = require('chai-image')

chai.use(chaiImage)
const { expect } = chai

async function visualTesting () {
	const PAGE_NAME = 'flashsale'
	const PAGE_URL = 'https://www.tokopedia.com/help/article/syarat-dan-ketentuan-flash-sale-kejar-diskon-spesial-99'

	const driver = await setupDriver()
	await driver.get(PAGE_URL)

	const baseScreenshotPath = `screenshots/base/${PAGE_NAME}.jpg`
	const actualScreenshotPath = `screenshots/actual/${PAGE_NAME}.jpg`
	const isBaseScreenshotExist = existsSync(baseScreenshotPath)

	const pageScreenshot = await driver.takeScreenshot()
	const pageScreenshotBuffer = Buffer.from(pageScreenshot, 'base64')

	if (isBaseScreenshotExist) {
		const baseScreenshotBuffer = readFileSync(baseScreenshotPath)

		writeFileSync(actualScreenshotPath, pageScreenshotBuffer)
		expect(pageScreenshotBuffer).to.matchImage(baseScreenshotBuffer)
	} else {
		writeFileSync(baseScreenshotPath, pageScreenshotBuffer)
	}

	await driver.close()
}
visualTesting()

// === cek apakah file ada atau tidak ===
// const isFileExist = existsSync('screenshots/base/bambang.jpg')
// console.log(isFileExist ? 'ada' : 'nggak ada')

// === ambil screenshot halaman ===
// async function pageScreenshot () {
// 	const driver = await setupDriver()
// 	await driver.get('https://www.tokopedia.com/help/article/syarat-dan-ketentuan-flash-sale-kejar-diskon-spesial-99')

// 	const screenshotBase64 = await driver.takeScreenshot()
// 	const screenshotBuffer = Buffer.from(screenshotBase64, 'base64')
// 	writeFileSync('screenshots/base/flashsale.jpg', screenshotBuffer)

// 	await driver.close()
// }
// pageScreenshot()

// === bandingkan gambar ===
// async function imageComparison () {
// 	const driver = await setupDriver()
// 	await driver.get('https://www.tokopedia.com/help/article/syarat-dan-ketentuan-flash-sale-kejar-diskon-spesial-99')

// 	try {
// 		// ambil actual screenshot
// 		const actualScreenshot = await driver.takeScreenshot()
// 		const actualScreenshotBuffer = Buffer.from(actualScreenshot, 'base64')

// 		// ambil base screenshot
// 		const baseScreenshotBuffer = readFileSync('screenshots/base/flashsale.jpg')

// 		// bandingkan kedua screenshot
// 		expect(actualScreenshotBuffer).to.matchImage(baseScreenshotBuffer)
// 	} finally {
// 		await driver.close()
// 	}
// }
// imageComparison()