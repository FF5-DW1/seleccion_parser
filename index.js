const SheetRepository = require('./SheetRepository');
const GitHubScrapper = require('./GitHubScrapper');


const SPREADSHEET_ID = '1FJTGREcIZ3KLuZtI7YhsX-Sog00AXbw3rKTsf13p3b8';
// const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Conectar a google sheet Repository
const sheetRepo = new SheetRepository(SPREADSHEET_ID);

// Traer lista de Usuarios
let users = [];
// Resolvemos la promesa para obtener los datos y llamar a la siguiente función.
sheetRepo.getUsers()
        .then(data => {
            users = data.slice();
            processUsers();
        });


function processUsers(){
    console.log("-----USERS-----");
    console.log(users);
    console.log("---------------");

    let promesas = [];

    const scrapper = new GitHubScrapper();

    users.forEach(async (user, index) => {

        console.log(user, index);
        let url = `https://raw.githubusercontent.com/${user[0]}/${user[1]}/main/index.html`;

        console.log("-----scrap-----");
        console.log(url);

        pointsPromise = scrapper.getPoints(url, index);
        promesas.push(pointsPromise);
        const points = await pointsPromise;

        console.log("---Points---");
        console.log(points);

        users[points.id]["puntos"] = points.puntos;

    });

    Promise.allSettled(promesas)
            .then(values => {
                console.log("========== FINAL ===========");
                console.log(values)
                console.log(users)
                const puntos = users.map((user)=>user.puntos);
                console.log(puntos)

                sheetRepo.updateScore(puntos);
            })


}
// Por cada usuario


// Scrapear puntuación
// let url = `https://raw.githubusercontent.com/${user[0]}/${user[1]}/main/index.html`;
// const scrapper = new GitHubScrapper();
// let points = scrapper.points;
// 

// 