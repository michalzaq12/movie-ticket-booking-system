<template>
  <div>
    <v-container grid-list-xs text-xs-center>
      <v-layout row wrap fill-height>


        <v-flex xs12 v-for="order in orders" :key="order.id">
          <div>Zamówienie z dnia: {{order.createdAt}}</div>
          <p>Film: {{order.movie.title}}</p>
          <div>Miejsca: <div v-for="seat in order.seats">{{seat.row}}{{seat.column}}</div></div>
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
        orders: []
      }
    },


    methods:{
      fetchOrders(){
        this.$http.get('/orders').then(({data}) => {
          this.orders = data;
        })
      }
    },


    created(){
      this.fetchOrders();
    }

  }
</script>
