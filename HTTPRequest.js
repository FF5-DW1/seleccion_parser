const request = require('request');
const asyncRequest = require('request-promise');
// Clase HTTPRequest
class HTTPRequest {
    constructor(url) {
        this.url = url;
    }

    getContent(callback) {

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

    async getAsyncContent(resolve, reject) {


        return await asyncRequest(this.url);

        const req = asyncRequest(this.url)
            .then(response => {
                // console.log("response");
                // console.log(response);
                if (response.statusCode === 200) {
                    return response;
                } else {
                    return false;
                    // return new Error(response.statusCode);
                }
                // response.body
            })
            // .then(response => response)
            .catch(error => {
                console.log("error");
                console.log(error.error);
            });

        // Realizar la solicitud HTTP
        return req;


    }
}
module.exports = HTTPRequest;