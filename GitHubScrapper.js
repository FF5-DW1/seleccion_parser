const HTTPRequest = require('./HTTPRequest')
const cheerio = require('cheerio');
const Parso = require('./Parso');

class GitHubScrapper {

    // constructor(url, id) {
    constructor() {
        this._points = 0;
        // this.id = id;
        // this.url = url;
        // let puntos = this.scrap().then(points => this._points);
    }

    async getPoints(url, id) {
        const httpRequest = new HTTPRequest(url);
        try {
            let html = await httpRequest.getAsyncContent();

            let points = await this.calculatePoints(html);

            return {"puntos": points, "id":id};
        } catch (error) {
            return {"puntos":null, "id":id};
        }
    }


    async calculatePoints(html) {
        // Crear instancia cheerio con el HTML
        const parso = new Parso(html);

        const rules = [
            {
                method: 'exists',
                selector: 'nav',
                attrib: null
            },
            {
                method: 'exists',
                selector: 'div.header',
                attrib: null
            },
            // {  // Existe h2.title
            //   method: 'exists',
            //   selector: 'h2.title',
            //   attrib: null
            // },
            {
                method: 'exists',
                selector: 'footer',
                attrib: null
            },
            {   // Links en nav bar
                method: 'text',
                selector: 'nav > ul > a > li',
                attrib: null,
                equal: 6
            },
            {   // texto .btn
                method: 'text',
                selector: '.btn',
                attrib: null,
                equal: 4
            },
            {   // Opiniones small
                method: 'text',
                selector: '.extraText > small',
                attrib: null,
                equal: 2
            },
            {
                method: 'exists',
                selector: 'div.faqSection',
                attrib: null
            },
            {
                method: 'exists',
                selector: 'hr.hrLine',
                attrib: null
            },
            {
                method: 'text',
                selector: 'div.faq > h2.faqPage',
                attrib: null,
                equal: 4
            },
            {
                method: 'attribs',
                selector: 'script',
                attrib: 'src'
            }
        ];

        let puntos = 0;

        rules.forEach(rule => {
            // Si buscamos un número de elementos, se usa "equal" y el número al que debe ser igual
            if ("equal" in rule) {
                puntos += (parso[rule.method](rule.selector).length == rule.equal) ? 1 : 0;
                // Si la consulta es sobre atributos, añadimos el segundo parámetro rule.attrib 
            } else if (rule.attrib != null) {
                puntos += (parso[rule.method](rule.selector, rule.attrib)) ? 1 : 0;
                // Para el resto, llamada simple: parso.<método>(selector) 
            } else {
                puntos += (parso[rule.method](rule.selector)) ? 1 : 0;
            }

        });
        return puntos;
    }
}

module.exports = GitHubScrapper;