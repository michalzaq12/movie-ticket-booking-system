/*globals API_GATEWAY_URL, API_GATEWAY_PORT*/
import axios from 'axios'
import errorHandler from './errorHanlder';

const API_URL = API_GATEWAY_URL + ':' + API_GATEWAY_PORT;

const httpClient = axios.create({
  baseURL: API_URL
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
