// Clase HTTPRequest
class HTTPRequest {
    constructor(url) {
        this.url = url;
    }

    getContent(callback) {
        const request = require('request');

        // Realizar la solicitud HTTP
        request(this.url, (error, response, body) => {
            if (error) {
                callback(error, null);
            } else if (response.statusCode !== 200) {
                callback(new Error(`Error en la solicitud. Código de estado: ${response.statusCode}`), null);
            } else {
                callback(null, body);
            }
        });
    }
}
module.exports = HTTPRequest;