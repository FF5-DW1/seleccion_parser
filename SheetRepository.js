const { google } = require('googleapis');
const API_KEY = '';
const SheetID = '';

class SheetRepository {

    filaInicial = 2;
    colUser = 'F';  
    colRepo = 'G';
    colPuntos = 'H';

    constructor(sheetId) {
        this.sheetId = sheetId;

        this.auth = new google.auth.GoogleAuth({
            keyFile: 'secret.json',
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
}

module.exports = SheetRepository;