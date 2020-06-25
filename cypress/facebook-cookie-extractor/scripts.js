// @ts-check
const {chromium} = require('playwright');
module.exports = async function FacebookLogin(username, password) {
	if (!username || !password) {
		throw new Error('Username or Password missing for login');
	}
	let browser = await chromium.launch({headless: true, args: ['--disable-notifications']});
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto('https://www.facebook.com/login', {waitUntil: 'networkidle'});
	await page.waitForSelector('input[name="email"]');
	await page.fill('input[name="email"]', username);
	await page.fill('input[name="pass"]', password);
	await page.click('button[name="login"]');
	await page.waitForNavigation({waitUntil: 'load'});
	const cookies = await context.cookies();
	const session = cookies.filter(x => x.name === 'presence');
	console.log(session);
	await context.close();
	await browser.close();
	return cookies;
};
