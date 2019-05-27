import Vue from 'vue';
import Vuetify from 'vuetify';

import App from './App';
import router from '@/router';

import api from '@/api';
import moviesApi from '@/api/movies'
import './eventBus';

import VueYouTubeEmbed from 'vue-youtube-embed';
Vue.use(VueYouTubeEmbed);

import '@/assets/reset.css';


import colors from 'vuetify/es5/util/colors';
Vue.use(Vuetify, {
  theme: {
    primary: colors.green.base, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: '#f0c835', // #3F51B5
    demko: '#023037'
  }
});


Vue.mixin({
  methods:{
    reset(obj, value=null){
      Object.keys(obj).forEach(key => {
        if(obj[key] !== null && typeof obj[key] === 'object') this.reset(obj[key], value);
        else obj[key] = value;
      })
    }
  }
})

Vue.mixin({
  data: function() {
    return {
      get apiUrl() {
        return api.API_URL;
      }
    }
  }
})



Vue.config.productionTip = IS_DEV;
Vue.config.debug = IS_DEV;

Vue.prototype.$moviesApi = moviesApi;
Vue.prototype.$http = api;
api.init();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
