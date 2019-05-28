<template>
  <div>


    <v-container grid-list-xs text-xs-center>
      <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>
      <v-layout v-else row wrap justify-center>
        <v-flex md3 xs12 class="px-4 text-xs-center panel">
          <p class="headline primary--text">12:00 ({{details.Runtime}})</p>
          <p class="headline primary--text">Hall: {{details.hall}}</p>
          <p class="display-1 font-weight-bold mt-4">{{details.Title}}</p>
          <p class="subheading font-italic">{{details.Year}}</p>
          <p class="subheading mt-5"><span class="font-weight-bold">Production: </span>{{details.Production}}</p>
          <p class="subheading"><span class="font-weight-bold">Director: </span>{{details.Director}}</p>

        </v-flex>
        <v-flex md6 xs12 class="panel">
          <div class="screen">
            <v-layout row justify-center align-center fill-height>
            <youtube v-if="trailerUrl" :video-id="getIdFromURL(trailerUrl)" player-width="100%" player-height="100%"></youtube>
            <v-progress-circular v-else indeterminate color="white"></v-progress-circular>
            </v-layout>
          </div>
        </v-flex>
        <v-flex md3 xs12 class="panel">
          <span class="subheading">Open Movie Database:</span>
          <v-rating color="primary" background-color="primary" v-if="details.imdbRating"
                    :value="details.imdbRating / 2.0" half-increments></v-rating>
          <span class="subheading">Metacritic:</span>
          <v-rating color="primary" background-color="primary" v-if="details.Metascore"
                    :value="details.Metascore / 20.0" half-increments></v-rating>
          <p class="subheading mt-3 text-xs-center">Awards:</p>
          <p class="subheading px-5 font-italic">{{details.Awards}}</p>
        </v-flex>
      </v-layout>

      <v-layout v-if="details !== null" row wrap fill-height class="movies__container">


            <v-flex xs2 v-for="seat in details.seats" :key="seat.id">
              <div class="seat" @click="addToOrder(seat)"
                   :class="{'available': seat.isAvailable,
                   'unavailable': !seat.isAvailable,
                   'temp-unavailable': seat.isTempUnavailable,
                   'selected': seat.isSelected}" >
                <span class="display-1 font-weight-thin">{{seat.row}} {{seat.column}}</span>
              </div>
            </v-flex>


      </v-layout>
    </v-container>

    <v-btn :disabled="seatsOrder.length === 0" fixed dark bottom right large style="z-index: 2;" color="primary" @click="sendOrder">
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

    computed: {
      movieId(){
        return this.$route.params.id;
      },
      movieRoom(){
        return 'movie/' + this.movieId;
      }
    },

    methods: {
      getIdFromURL(url){
        return getIdFromURL(url);
      },
      async fetchDetails(){
        this.isLoading = true;

        const {data: details} = await this.$http.get('/movies/' + this.movieId);
        this.details = details;
        this.isLoading = false;

        this.$socket.emit('join-room', this.movieRoom);
        this.$socket.on('temp-book-seat', this.onTempBook);

        const {data} = await this.$http.get('/movies/' + this.movieId + '/trailer', {
            params: {
              title: this.details.Title,
              year: this.details.Year
            }
          }
        );
        this.trailerUrl = data.trailerUrl;

      },
      addToOrder(seat){
        if(!seat.isAvailable) return;
        if(seat.isSelected === true){
          this.$set(seat, 'isSelected', false);
          this.seatsOrder.splice(this.seatsOrder.indexOf(seat.is), 1);
          this.temporaryReservation(seat.id, false);
          return;
        }
        this.$set(seat, 'isSelected', true);
        this.seatsOrder.push(seat.id);
        this.temporaryReservation(seat.id, true)
      },
      temporaryReservation(seatId, state){
        this.$socket.emit('temp-book-seat', {
          room: 'movie/' + this.movieId,
          seatId: seatId,
          state
        });
      },
      sendOrder(){
        this.$http.post('/movies/' + this.movieId + '/orders', {
          seatIds: this.seatsOrder
        }).then(() => {
          this.$router.push({ name: 'orders'})
        })
      },
      onTempBook(params){
        const seat = this.details.seats.find(el => el.id === params.seatId);
        if(seat === undefined) return;
        this.$set(seat, 'isTempUnavailable', params.state);
      }
    },

    created(){
      this.fetchDetails();
    },
    beforeDestroy() {
      this.$socket.emit('leave-room', this.movieRoom);
      this.$socket.off('temp-book-seat')
    }

  }
</script>



<style lang="scss" scoped>

  .screen {
    height: 250px;
    border: 1px solid black;
    background-color: black;

    box-shadow: 0 -5px 10px 5px rgba(0,0,0,0.75);

    & > .layout >div{
      //fix youtube iframe container dimensions
      height: 100%;
      width: 100%;
    }
  }

  .panel {
    margin-bottom: 40px;
  }


  .movies__container{
    min-width: 800px;
    margin-top: -40px !important;
    transform: perspective(50em) rotateX(40deg);
    padding: 5px 150px;
  }


  $available-color: rgba($brand-accent, 0.9);
  $unavailable-color: #9a0000;

  .seat {
    height: 100%;
    margin: 0 10px;
    font-size: 3rem;
    color: white;
    box-shadow: 0 2px 5px 2px rgba(darken($brand-primary, 40%),0.75);
    text-shadow: 1px 1px darken($brand-primary, 40%);
  }

  .available{
    background-color: $available-color;
    cursor: pointer;

    &:hover:not(.selected){
      background-color: whitesmoke;
      color: black;
    }
  }

  .selected{
    background-color: darken($brand-primary, 40%);
  }

  .temp-unavailable{
    background: repeating-linear-gradient(
    45deg,
        $unavailable-color, $unavailable-color 10px, $available-color 10px, $available-color 20px
    );
  }

  .unavailable{
    background-color: $unavailable-color;
  }
</style>
