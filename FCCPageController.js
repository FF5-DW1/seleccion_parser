const pageScraper = require('./FCCPageScrapper');
async function scrapeAll(browserInstance, username){
	let browser;
	try{
		browser = await browserInstance;
		// Se ejecuta el scraper usando la instacia de navegador abierta y conociendo el username para formar la url.
		// Devolverá los puntos scrapeados en el perfil de cada username.
		let points = await pageScraper.scraper(browser, username);
		
		// Una vez scrapeado, cerrar el navegador.
		await browser.close();
		
		// Y devolver los puntos encontrados.
		return points;
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance, username) => scrapeAll(browserInstance, username)
