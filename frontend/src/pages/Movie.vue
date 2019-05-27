<template>
  <div>


    <v-container grid-list-xs text-xs-center>
      <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
      <v-layout v-else row justify-center>
        <v-flex xs3 class="px-4 text-xs-center">
          <p class="headline demko--text">12:00 ({{details.Runtime}})</p>
          <p class="headline demko--text">Hall: {{details.hall}}</p>
          <p class="display-1 font-weight-bold mt-4">{{details.Title}}</p>
          <p class="subheading font-italic">{{details.Year}}</p>
          <p class="subheading mt-5"><span class="font-weight-bold">Production: </span>{{details.Production}}</p>
          <p class="subheading"><span class="font-weight-bold">Director: </span>{{details.Director}}</p>

        </v-flex>
        <v-flex xs6>
          <div class="screen">
            <v-layout row justify-center align-center fill-height>
            <youtube v-if="trailerUrl" :video-id="getIdFromURL(trailerUrl)" player-width="100%" player-height="100%"></youtube>
            <v-progress-circular v-else indeterminate color="white"></v-progress-circular>
            </v-layout>
          </div>
        </v-flex>
        <v-flex xs3>
          <span class="subheading">Open Movie Database:</span>
          <v-rating color="demko" background-color="demko" v-if="details.imdbRating" :value="details.imdbRating / 2.0" half-increments></v-rating>
          <span class="subheading">Metacritic:</span>
          <v-rating color="demko" background-color="demko" v-if="details.Metascore" :value="details.Metascore / 20.0" half-increments></v-rating>
          <p class="subheading mt-3 text-xs-center">Awards:</p>
          <p class="subheading px-5 font-italic">{{details.Awards}}</p>
        </v-flex>
      </v-layout>

      <v-layout v-if="details !== null" row wrap fill-height class="movies__container">


            <v-flex xs2 v-for="seat in details.seats" :key="seat.id">
              <div class="seat" :class="{'available': seat.isAvailable, 'unavailable': !seat.isAvailable, 'selected': seat.isSelected}" @click="addToOrder(seat)">
                <span class="display-1 font-weight-thin">{{seat.row}} {{seat.column}}</span>
              </div>
            </v-flex>


      </v-layout>
    </v-container>

    <v-btn :disabled="seatsOrder.length === 0" fixed dark bottom right large style="z-index: 2;" color="demko" @click="sendOrder">
      <v-icon left>shopping_cart</v-icon>
      <span>Buy ({{seatsOrder.length}})</span>
    </v-btn>

  </div>
</template>



<script>
  import { getIdFromURL } from 'vue-youtube-embed'
  export default {
    name: 'movie',
    data(){
      return {
        isLoading: true,
        details: null,
        trailerUrl: null,
        seatsOrder: []
      }
    },

    methods: {
      getIdFromURL(url){
        return getIdFromURL(url);
      },
      fetchDetails(){
        this.isLoading = true;
        this.$http.get('/movies/' + this.$route.params.id).then(({data}) => {
          this.details = data;
          this.$nextTick(() => this.isLoading = false);
          return this.$http.get('/movies/' + this.$route.params.id + '/trailer', {
            params: {
              title: this.details.Title,
              year: this.details.Year
            }
          })
        }).then(({data}) => {
          this.trailerUrl = data.trailerUrl;
        })
      },
      addToOrder(seat){
        if(!seat.isAvailable) return;
        if(seat.isSelected === true){
          this.$set(seat, 'isSelected', false);
          this.seatsOrder.splice(this.seatsOrder.indexOf(seat.is), 1);
          return;
        }
        this.$set(seat, 'isSelected', true);
        this.seatsOrder.push(seat.id);
      },
      sendOrder(){
        this.$http.post('/movies/' + this.$route.params.id + '/orders', {
          seatIds: this.seatsOrder
        }).then(() => {
          this.$router.push({ name: 'orders'})
        })
      }
    },

    created(){
      this.fetchDetails();
    }

  }
</script>



<style lang="scss" scoped>

  .screen {
    height: 15vw;
    border: 1px solid black;
    background-color: black;
    margin-bottom: 0;
    box-shadow: 0 -5px 10px 5px rgba(0,0,0,0.75);

    & > .layout >div{
      height: 100%;
      width: 100%;
    }
  }

  .movies__container{
    transform: perspective(50em) rotateX(40deg);
    /*<!--margin-top: -150px !important;-->*/
    padding: 5px 150px;
  }

  /*.main__container{*/
  /*  background: linear-gradient(white 0%, rgba(black, 0.6) 60%);*/
  /*}*/


  .seat {
    height: 100%;
    margin: 0 10px;
    /*transform: perspective(10em) rotateX(10deg);*/
    font-size: 3rem;
    color: white;
    box-shadow: 0 2px 5px 2px rgba(#023037,0.75);
    text-shadow: 1px 1px #023037;
  }

  .available{
    $color: rgba(#f0c835, 0.9);
    background-color: $color;
    cursor: pointer;

    &:hover:not(.selected){
      background-color: whitesmoke;
      color: black;
    }
  }

  .selected{
    background-color: #023037;
  }

  .unavailable{
    background-color: #9a0000;
  }
</style>
