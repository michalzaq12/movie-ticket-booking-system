import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Movies from '@/pages/Movies'
import Movie from '@/pages/Movie'
import Orders from '@/pages/Orders'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
      meta: { omitAuth: true, withoutLayout: true}
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/movie/:id',
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
