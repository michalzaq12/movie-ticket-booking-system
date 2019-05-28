<template>
  <div>
    <v-container grid-list-xs text-xs-center>
      <v-layout row wrap fill-height>
        <v-progress-circular v-if="isLoading" indeterminate></v-progress-circular>

        <v-flex v-else xs12 v-for="order in orders" :key="order.id" class="order">
          <div class="font-weight-bold">{{order.createdAt | date}}</div>
          <p><span class="font-weight-bold">Hall:</span> {{order.movie.hall}}</p>
          <p><span class="font-weight-bold">Time:</span> {{order.movie.date | time}}</p>
          <p><span class="font-weight-bold">Movie:</span> {{order.movie.title}}</p>
          <div><span class="font-weight-bold">Seats:</span>
            <span v-for="seat in order.seats">{{seat.row}}{{seat.column}} </span>
          </div>
        </v-flex>


      </v-layout>
    </v-container>
  </div>
</template>




<script>
  export default {
    name: 'order',
    data(){
      return{
        isLoading: true,
        orders: []
      }
    },

    filters: {
      date(value){
        if (!value) return '';
        value = value.toString();
        return new Date(value).toLocaleString();
      },
      time(value){
        if (!value) return '';
        value = value.toString();
        return new Date(value).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      }
    },

    methods:{
      fetchOrders(){
        this.isLoading = true;
        this.$http.get('/orders').then(({data}) => {
          this.orders = data;
        }).finally(() => this.isLoading = false);
      }
    },


    created(){
      this.fetchOrders();
    }

  }
</script>


<style lang="scss" scoped>
  .order{
    border: 1px solid black;
    margin-bottom: 5px;
  }
</style>
