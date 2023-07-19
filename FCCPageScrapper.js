const scraperObject = {

	baseUrl : "https://www.freecodecamp.org/",

	async scraper(browser, username){
		// Se forma la url final a consultar usando la baseUrl y el username
		let url = this.baseUrl + username;

		// Se abre una página nueva en el navegador
		// La instacia 'page' contendrá todo lo referente a la web a scrapear: header, body, js...
		let page = await browser.newPage();
		console.log(`Navigating to ${url}...`);
		
		// Navegar hasta la url a scrapear
		await page.goto(url);
		
		// Se busca el selector '.points', que es donde están los puntos.
		const pointsSelector = '.points';
		const pointsHandler = await page.waitForSelector(pointsSelector);
		const pointsTitle = await pointsHandler?.evaluate(el => el.textContent);	// Obtener el texto del elemento
		
		// Extraer con RegEx el numero del string obtenido. Ej: 'Number of points: 15'.
		// Se considera no hacer busqueda exacta de 'Number of points: ' por si cambia el idioma.
		const points = /\d+/.exec(pointsTitle);
		// console.log(points);

		// Si hay puntos, estará el número solicitado en la posición [0] del array devuelto por .exec()
		if(points) return {"username":username, "points": points[0]};
		
		// Si no, se escribe lo encontrado en el elemento por si sirve para futuras investigaciones.
		return {"username":username, "points": pointsTitle};

	}
}

module.exports = scraperObject;
