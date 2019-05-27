import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/pages/Movies'
import Movie from '@/pages/Movie'
import Orders from '@/pages/Orders'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'movies'
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: Movie
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
  ]
});
