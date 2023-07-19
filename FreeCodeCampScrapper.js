const HTTPRequest = require('./HTTPRequest')
const cheerio = require('cheerio');
const Parso = require('./Parso');
const browserObject = require('./browser');
const scraperController = require('./FCCPageController');

class FreeCodeCampScrapper {

    baseUrl = "https://www.freecodecamp.org/";

    async getPoints(username, id) {

        //Start the browser and create a browser instance
        let browserInstance = browserObject.startBrowser();
        let puntos = await scraperController(browserInstance, username)
        puntos.id = id;
        return puntos;
    }

}

module.exports = FreeCodeCampScrapper;