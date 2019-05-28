<template>
  <v-navigation-drawer class="primary" v-model="drawer" dark fixed app :clipped="$vuetify.breakpoint.lgAndUp">
  
    <v-list class="primary">
      <router-link tag="v-list-tile" :to="{name: item.component}" v-for="item in items" :key="item.title" @click="console.log('hello')">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
  
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    props: ['value'],
    data() {
      return {
        drawer: this.value,
        items: [
          {
            title: 'Movies',
            icon: 'theaters',
            component: 'movies'
          },
          {
            title: 'Orders',
            icon: 'assignment',
            component: 'orders'
          },
        ]
      }
    },
    watch: {
      drawer(newValue) {
        this.$emit('input', newValue)
      },
      value(newValue) {
        this.drawer = newValue;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .router-link-active {
    border-left: 3px solid $brand-accent;
    background: darken($brand-primary, 40%);
  }
</style>
