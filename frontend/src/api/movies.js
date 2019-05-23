import axios from 'axios'
import errorHandler from './errorHanlder';

const API_URL = 'http://www.omdbapi.com/';

const httpClient = axios.create({
  baseURL : API_URL,
  params: {
    apikey: '64b833c7'
  }
});

export default {
  API_URL,

  init () {
    httpClient.interceptors.response.use(res => res, errorHandler);
  },

  get () {
    return httpClient.get(...arguments)
  },

  post () {
    return httpClient.post(...arguments)
  },

  update () {
    return httpClient.put(...arguments)
  },

  put () {
    return httpClient.put(...arguments)
  },

  delete () {
    return httpClient.delete(...arguments)
  }


};
