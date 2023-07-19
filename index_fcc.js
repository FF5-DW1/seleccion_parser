const SheetRepository = require('./SheetRepository');
// const GitHubScrapper = require('./GitHubScrapper');
const FreeCodeCampScrapper = require('./FreeCodeCampScrapper');


const SPREADSHEET_ID = '1FJTGREcIZ3KLuZtI7YhsX-Sog00AXbw3rKTsf13p3b8';
// const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Conectar a google sheet Repository
const sheetRepo = new SheetRepository(SPREADSHEET_ID);

// Traer lista de Usuarios
let users = [];

// Resolver la promesa para obtener los datos y llamar a la siguiente función 'processUsers'.
sheetRepo.getFreeCodeCampUsers()
        .then(data => {
            users = data.slice();
            processUsers();
        });


function processUsers(){
    console.log("-----USERS-----");
    console.log(users);
    console.log("---------------");

    let promesas = [];
    const scrapper = new FreeCodeCampScrapper();

    users.forEach(async (user, index) => {

        console.log(user, index);

        if(user.length)    
        {
            // limpiar la @ y los espacios del username
            let usuario = user[0].trim().replace("@","");
            
            // Se usa el método getPoints del FreeCodeCampScrapper para obtener un objeto con el index, username y puntos
            pointsPromise = scrapper.getPoints(usuario, index);
            // Se añade la promesa al array para esperar a completar todas juntas luego.
            promesas.push(pointsPromise);
            // Y se espera a que finalice el scrapping de puntos. 
            const points = await pointsPromise;
    
            console.log("---Points---");
            console.log(points);

            // Se incluyen los puntos en el array en cada usuario por su id (index)
            users[points.id]["puntos"] = points.points;
        }


    });

    // Esperar a scrapear todas las puntuaciones de todos los usuarios antes de grabarlos en la excel.
    Promise.allSettled(promesas)
            .then(values => {
                console.log("========== FINAL ===========");
                console.log(values)
                console.log(users)

                // Se crea un array con las puntuaciones solamente
                const puntos = users.map((user)=>user.puntos);
                console.log(puntos)

                // Que será el que se pase al metodo que actualiza la columna de puntos de FCC.
                sheetRepo.updateFreeCodeCampScore(puntos);
            })


}
