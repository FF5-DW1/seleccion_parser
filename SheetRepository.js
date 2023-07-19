const { google } = require('googleapis');

class SheetRepository {

    filaInicial = 2;
    colUser = 'F';  
    colRepo = 'G';
    colPuntos = 'H';
    colFreeCodeCamp = 'I';
    colFreeCodeCampPuntos = 'J';
    keyFile = 'secret.json';

    constructor(sheetId) {
        this.sheetId = sheetId;

        this.auth = new google.auth.GoogleAuth({
            keyFile: this.keyFile,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        this.sheets = google.sheets({
            version: 'v4',
            auth: this.auth
        });
    }

    getUsers() {

        const users = this.sheets.spreadsheets.values.get(
            {
                spreadsheetId: this.sheetId,
                range: `${this.colUser}${this.filaInicial}:${this.colRepo}`,
                // range: 'F' + this.filaInicial + ':G'
            })
            .then(data => {
                return data.data.values;
            });
        return users;
    }

    async updateScore(data) {
        const result = this.sheets.spreadsheets.values.update({
            spreadsheetId: this.sheetId,
            range: `${this.colPuntos}${this.filaInicial}:${this.colPuntos}`,
            includeValuesInResponse: true,
            valueInputOption: "USER_ENTERED",
            resource: {
                // range: `${this.colPuntos}${this.filaInicial}:${this.colPuntos}`,
                majorDimension: "COLUMNS",
                values: [data]
            }
        });
        console.log((await result).data);
        console.log((await result).data.updatedData.values);
        return (await result).data;
    }
    
    getFreeCodeCampUsers() {

        const users = this.sheets.spreadsheets.values.get(
            {
                spreadsheetId: this.sheetId,
                range: `${this.colFreeCodeCamp}${this.filaInicial}:${this.colFreeCodeCamp}`,
                // range: 'F' + this.filaInicial + ':G'
            })
            .then(data => {
                return data.data.values;  // Devolvemos todos, incluso los vacios.
                return data.data.values.filter(e => e.length);  // Devolvemos solo los que tienen username
                return data.data.values.filter(e => e.length);  // Devolvemos solo los que tienen username
            });
        return users;
    }

    async updateFreeCodeCampScore(data) {
        const result = this.sheets.spreadsheets.values.update({
            spreadsheetId: this.sheetId,
            range: `${this.colFreeCodeCampPuntos}${this.filaInicial}:${this.colFreeCodeCampPuntos}`,
            includeValuesInResponse: true,
            valueInputOption: "USER_ENTERED",
            resource: {
                // range: `${this.colPuntos}${this.filaInicial}:${this.colPuntos}`,
                majorDimension: "COLUMNS",
                values: [data]
            }
        });
        console.log((await result).data);
        console.log((await result).data.updatedData.values);
        return (await result).data;
    }
}

module.exports = SheetRepository;