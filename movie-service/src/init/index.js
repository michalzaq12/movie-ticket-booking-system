const movieController = require('../controllers/movie');
const openMovieService = require('../services/openMovie');

createData();

function randomHall(){
    return Math.floor((Math.random() * 10) + 1);
}

function randomHour(){
    return Math.floor((Math.random() * 10) + 10);
}

async function createData(){
    try{
        const movies = await openMovieService.getAll();
        const moviePromises = [];

        for(const movie of movies){
            console.log(movie);
            moviePromises.push(
                movieController.create({
                    imdbID: movie.imdbID,
                    title: movie.Title,
                    hall: randomHall(),
                    date: `2020-06-13 ${randomHour()}:00`
                })
            )
        }

        await Promise.all(moviePromises);

        console.log('> Done.')
    }catch (e) {
        console.error(e);
    }
}