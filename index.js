const HTTPRequest = require('./HTTPRequest')
const cheerio = require('cheerio');
const Parso = require('./Parso');

puntos = [];

// Leer HTML con request
let url = "https://raw.githubusercontent.com/pr0y3ct0Coder/proyecto-factoriaf5/main/index.html"
// let url = "https://raw.githubusercontent.com/AlexandraZambrano/Proceso-de-seleccion/main/index.html"
// let url = "https://raw.githubusercontent.com/AlexDiazF5/seleccion/main/index.html"


// const html = requester.getHtml(url);
const httpRequest = new HTTPRequest(url);
httpRequest.getContent((error, html) => {
  if (error) {
    console.error(error);
  } else {

    // Crear instancia cheerio con el HTML
    // const $ = cheerio.load(html);
    const parso = new Parso(html);


    // Testing de métodos y ejemplos de uso

    // parso.exists('nav');
    // parso.exists('navbar > ul a');
    // let imgSrc = parso.attribs('.logo', 'src');
    // console.log(imgSrc);
    // // let links = parso.attribs('.navbar > ul a', 'href');
    // let links = parso.text('nav > ul > a > li');
    // console.log("Enlaces navbar");
    // console.log(links);
    // let titulos = parso.text('h1.section-heading');
    // console.log("Titulos H1 section-heading");
    // console.log(titulos);

    // const faq = parso.exists('.faq-page');
    // console.log("Existen FAQs?");
    // console.log(faq);

    // console.log("InfoCard?");
    // console.log(parso.exists('.infoCard'));
    // console.log("Img de InforCard");
    // console.log(parso.attribs('.addImg', 'src'));
    // console.log(parso.attribs('script', 'src'));


    // Reglas a buscar en el código
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

    // Inicializamos los puntos
    let puntos = 0;

    // En lugar de hacer cada regla por separado, como son similares...

    // const hasNav = parso.exists('nav');
    // puntos += (hasNav) ? 1 : 0;

    // const hasHeader = parso.exists('div.header');
    // puntos += (hasHeader) ? 1 : 0;

    // puntos += (parso.exists('h2.title')) ? 1 : 0;


    // Lo gestionamos con un array de reglas definidas y un bucle for:
    // Añadimos 1 punto por cada regla que se cumple.
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

    })

    // Se imprimen los puntos por pantalla
    console.log(`Puntos totales: ${puntos}/10`);

  }
});
// console.log(html);

















// Parsear cada uno de los puntos a valorar

// parsea.checkExists('nav')                // true o false
// parsea.getAttrib('.logoImg', 'src')   // string
// parsea.getText('nav .navbar > ul a')      // Array 
// parsea.getTotal('nav')                   // Array
