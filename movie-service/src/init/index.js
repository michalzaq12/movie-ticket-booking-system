const movieController = require('../controllers/movie');
const openMovieService = require('../services/openMovie');

createData();

function randomHall(){
    return Math.floor((Math.random() * 10) + 1);
}

async function createData(){
    try{
        const movies = await openMovieService.getAll();
        const moviePromises = [];

        for(const movie of movies){
            moviePromises.push(
                movieController.create({imdbID: movie.imdbID, hall: randomHall()})
            )
        }

        await Promise.all(moviePromises);

        console.log('> Done.')
    }catch (e) {
        console.error(e);
    }
}