const cheerio = require('cheerio');

class Parso{
    constructor(html){
        this.$ = cheerio.load(html);
    }

    exists(selector) {
        const element = this.$(selector);
        return (element.length) ? true : false;
    }

    // attrib(selector, atributo){
    //     return this.$(selector)[0].attribs[atributo]
    // }

    attribs(selector, atributo){
        const elements = this.$(selector);
        let data = []
        
        const elemsArray = elements.toArray(); 
        elemsArray.forEach(element => {
            data.push(element.attribs[atributo]);
        });
        return data;
    }

    text(selector){
        const elements = this.$(selector);
        let data = []
        
        const elemsArray = elements.toArray(); 
        elemsArray.forEach(element => {
            // console.log(element);
            // console.log(element.type);
            // console.log(element.children[0].data);
            // console.log(element.children.data);
            // console.log(element.children());
            // data.push(element.text());
            data.push(element.children[0].data);
        });
        return data;
    }
}


module.exports = Parso;