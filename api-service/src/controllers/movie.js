const movieService = require('../services/movie');


module.exports = {
    create(data){
        return movieService.createMovie(data);
    },

    getAll(){
        return movieService.getAllMovies();
    },

    getById(id){
        return movieService.getMovieById(id);
    },

    getTrailer(title, year){
        return movieService.getTrailer(title, year)
    }
};