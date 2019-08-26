const puppeteer = require('puppeteer');

async function run() {
    //let browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    let browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();
    // await page.goto('https://www.scrapehero.com/');
    await page.setViewport({
        width: 960,
        height: 760,
        deviceScaleFactor: 1
    });
    await page.setContent("<div style='font-size:80px;'>testsss<img src='logo-white.png' /></div>", { waitUntil: 'load' });
    await page.screenshot({ path: './exportedImage/image.jpg', type: 'jpeg' });
    await page.close();
    await browser.close();
}

run();