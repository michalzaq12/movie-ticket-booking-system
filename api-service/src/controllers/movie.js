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
    }
};