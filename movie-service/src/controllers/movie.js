const Op = require('sequelize').Op;
const {Movie, Seats} = require('../models');
const openMovieService = require('../services/openMovie');
const movieTrailerService = require('movie-trailer');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const SEATS_ROWS = 6;
const SEATS_COMUNS = 6;


module.exports = {
    async create(data){
        const movie = await Movie.create(data);

        const seats = [];

        for(let x = 0; x < SEATS_ROWS; x++){
            const row = alphabet[x].toUpperCase();
            for(let y = 0; y < SEATS_COMUNS; y++){
                const seat = Seats.create({
                    row,
                    column: (y + 1),
                    movieId: movie.id
                });
                seats.push(seat);
            }
        }

        await Promise.all(seats);
        return movie;
    },

    async getAll(){
        const results = [];
        const movies = await openMovieService.getAll();


        for(const movie of movies){
            const movieEntity = await Movie.findOne({
                where: {
                    imdbID: {[Op.eq]: movie.imdbID}
                }
            });
            results.push({
                ...movie,
                ...(movieEntity.toJSON())
            })
        }

        return results;
    },


    async getById(id){
        const movie = await Movie.findOne({
            where: {
                id: {[Op.eq]: id}
            },
            include: {
                attributes: ['id', 'row', 'column', 'isAvailable'],
                model: Seats
            },
            order: [
                [{model: Seats}, 'row'],
                [{model: Seats}, 'column']
            ]
        });

        if(movie === null){
            return {};
        }

        const movieDetails = await openMovieService.getMovieDetails(movie.imdbID);

        return {
            ...movieDetails,
            ...(movie.toJSON())
        }
    },

    async getTrailer({title, year}){
        const trailer = await movieTrailerService(title, year);
        return {
            trailerUrl: trailer
        }
    }
};