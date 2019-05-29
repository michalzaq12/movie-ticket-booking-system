/*globals IS_DEV */
import Vue from 'vue';
import Vuetify from 'vuetify';

import App from './App';
import router from '@/router';

import api from '@/api';
import './eventBus';

import io from 'socket.io-client';

import VueYouTubeEmbed from 'vue-youtube-embed';
Vue.use(VueYouTubeEmbed);

import '@/assets/reset.css';


import colors from 'vuetify/es5/util/colors';
Vue.use(Vuetify, {
  theme: {
    primary: '#023037',
    secondary: colors.red.lighten4,
    accent: '#f0c835',
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

Vue.prototype.$http = api;
api.init();

Vue.prototype.$socket = io(api.API_URL);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
