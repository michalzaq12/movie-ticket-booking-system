<template>
<div>

  <v-container grid-list-xs text-xs-center>
    <v-layout row wrap fill-height :align-center="isLoading">
      <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
      <v-flex xs12 md3 wrap v-for="movie in movies" :key="movie.imdbID" class="pa-2 mb-4 movie__card" @click="routeTo(movie)" color="accent">
        <v-layout column fill-height class="movie__card__content">
          <v-flex>
            <v-layout column class="mb-2">
              <div class="text-xl-center headline my-2 font-weight-bold">{{movie.Title}}</div>
              <div class="text-xl-center subheading font-italic">{{movie.Year}}</div>
            </v-layout>
          </v-flex>
          <div>
            <div style="position: relative;">
              <img :src="movie.Poster" style="max-width: 100%; height: 350px;"/>
              <v-btn
                color="accent"
                absolute
                bottom
                right
                fab
              >
                <v-icon color="primary">shopping_cart</v-icon>
              </v-btn>
            </div>
            <div class="mt-3">
              <div>
                <span class="subheading font-italic">{{movie.date | time}}</span>
              </div>
              <div>
                <span class="subheading">Hall: {{movie.hall}}</span>

              </div>
            </div>
          </div>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>

</div>
</template>



<script>
  export default {
    name: 'movies',
    data(){
      return {
        movies: [],
        totalResults: 0,
        isLoading: true
      }
    },

    filters: {
      time(value){
        if (!value) return '';
        value = value.toString();
        return new Date(value).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      }
    },

    methods:{
      fetchMovies(){
          this.isLoading = true;
          this.$http.get('/movies').then(({data}) => {
            console.log(data);
            this.movies = data;
          }).finally(() => this.isLoading = false)
      },
      routeTo(movie){
        this.$router.push({ name: 'movie', params: { id: movie.id }})
      }
    },

    created(){
      this.fetchMovies();
    }
  }
</script>


<style lang="scss" scoped>
  .movie__card{
    border-radius: 10px;
    & .movie__card__content{
      border-radius: 10px;
    }

    & img {
      transition: all 1s;
    }

    &:hover{
      cursor: pointer;
      background-color: white;

      & img {
        transform: scale(1.05) !important;
      }

    }
  }
</style>
