const got = require('got');
const movieTrailer = require('movie-trailer');
const fakeData = require('./data');

const API_KEY ='64b833c7';

module.exports = {
  getAll(){
      return new Promise(resolve => {
          resolve(fakeData.Search);
      })
  },
    async getMovieDetails(imdbID){
      const { body } = await got(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
      const data = JSON.parse(body);

      const trailerUrl = await movieTrailer(data.Title, data.Year);

      return {
          ...data,
          Trailer: trailerUrl
      }
    }
};



