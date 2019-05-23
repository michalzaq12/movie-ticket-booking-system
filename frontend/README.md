

<p align="center">
  <a href="https://vuetifyjs.com" target="_blank">
      <img width="100"src="https://vuejs.org/images/logo.png" alt="Vuetify logo">
    </a>
    <img width="100" src="https://cdn4.iconfinder.com/data/icons/ios7-essence/22/add_plus-512.png">
  <a href="https://vuetifyjs.com" target="_blank">
    <img width="100"src="https://vuetifyjs.com/static/doc-images/logo.svg" alt="Vuetify logo">
  </a>
  <img width="100" src="https://cdn4.iconfinder.com/data/icons/ios7-essence/22/add_plus-512.png">
  <a href="https://webpack.js.org" target="_blank">
    <img width="100" src="https://webpack.js.org/assets/icon-square-big.svg" alt="Webpack logo">
  </a>
  <br><br><i><strong>vue-web-starter</strong> is a basic Vue.js starter <br>which uses Vue 2, Vuetify and Webpack 3.</i>
</p>

<p align="center"></p>



### [Live demo - michalzaq12.github.io/vue-web-starter/](https://michalzaq12.github.io/vue-web-starter/)



## Quick start

  ```bash
  # install dependencies
  npm install
  
  # build all vendor modules (only once)
  npm run dll
  
  # serve with hot reload at localhost:3333
  npm run dev
  
  # build for github pages
  npm run gh
  ```

## Includes

- module bundler
  - webpack 3

- vue ecosystem
  - vue 2
  - vue-loader
  - vuex
  - vue-router

- UI framework
  - vuetify 
  
- HTTP client
  - axios
  
- extra loaders
  - babel
  - sass
   
## Features   

### dev 

- Hot reloading for single-file components ([webpack-hot-middleware](https://www.npmjs.com/package/webpack-hot-middleware))
- Multi webpack configuration based on env variable ([monfy](https://www.npmjs.com/package/monfy))
- Separate configuration for vendor modules to speed up build ([dll-plugin](https://webpack.js.org/plugins/dll-plugin/))


### app
- Fetching posts from REST API [JSONPlaceholder](https://jsonplaceholder.typicode.com) and store it in vuex
- Pagination on desktop devices
- Infinite scrolling on mobile devices
  
