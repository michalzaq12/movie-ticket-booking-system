<template>
  <div>


    <v-container grid-list-xs text-xs-center>
      <v-layout row justify-center class="screen__container">
        <v-flex xs3>
              <b>Tytuł filmu: </b> {{details.Title}}
              <br>
              <b>Sala</b> {{details.hall}}

        </v-flex>
        <v-flex xs6>
          <div class="screen">
            <youtube :video-id="getIdFromURL(details.Trailer)" player-width="100%" player-height="100%"></youtube>
          </div>
        </v-flex>
        <v-flex xs3>
          Open Movie Database:
          <v-rating color="demko" v-if="details.imdbRating" :value="details.imdbRating / 2.0" half-increments></v-rating>
          Metacritic:
          <v-rating v-if="details.Metascore" :value="details.Metascore / 20.0" half-increments></v-rating>
        </v-flex>
      </v-layout>

      <v-layout row wrap fill-height class="movies__container">


            <v-flex xs2 v-for="seat in details.seats" :key="seat.id">
              <div class="seat" :class="{'available': seat.isAvailable, 'unavailable': !seat.isAvailable, 'selected': seat.isSelected}" @click="addToOrder(seat)">
                <span class="display-3 font-weight-thin">{{seat.row}} {{seat.column}}</span>
              </div>
            </v-flex>


      </v-layout>
    </v-container>

    <v-btn fixed dark bottom right large style="z-index: 2;" color="demko" @click="sendOrder">
      <v-icon>shopping_cart</v-icon>
      <span>Zamów</span>
    </v-btn>

  </div>
</template>



<script>
  import { getIdFromURL } from 'vue-youtube-embed'
  export default {
    name: 'movie',
    data(){
      return {
        details: null,
        seatsOrder: []
      }
    },

    methods: {
      getIdFromURL(url){
        return getIdFromURL(url);
      },
      fetchDetails(){
        this.$http.get('/movies/' + this.$route.params.id).then(({data}) => {
          this.details = data;
        })
      },
      addToOrder(seat){
        if(!seat.isAvailable) return;
        this.$set(seat, 'isSelected', true);
        this.seatsOrder.push(seat.id);
      },
      sendOrder(){
        this.$http.post('/movies/' + this.$route.params.id + '/orders', {
          seatIds: this.seatsOrder
        }).then(() => {
          this.$router.push({ name: 'movies'})
        })
      }
    },

    created(){
      this.fetchDetails();
    }

  }
</script>



<style lang="scss">

  .screen {
    height: 15vw;
    border: 1px solid black;
    margin-bottom: 0;
    box-shadow: 0 -5px 10px 5px rgba(0,0,0,0.75);

    & > div{
      height: 100%;
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
    transform: perspective(10em) rotateX(10deg);
    font-size: 3rem;
    color: white;
  }

  .available{
    $color: rgba(#f0c835, 0.9);
    background-color: $color;
    cursor: pointer;

    &:hover{
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
