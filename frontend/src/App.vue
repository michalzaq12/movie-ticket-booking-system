<template>
  <v-app>
    <basic-layout  v-if="!this.$route.meta.withoutLayout">
      <router-view></router-view>
    </basic-layout>
    <router-view v-else></router-view>
    <loading :loading="isLoading" />
      <v-snackbar v-model="snackbar" color="error" :timeout="5000">
        {{ errorText }}
        <v-btn dark flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
  </v-app>
</template>

<script>
  import BasicLayout from '@/BasicLayout';
  import Vue from 'vue';
  import Loading from '@/components/Loading';
  
  export default {
    name: 'app',
    components: {
      BasicLayout,
      Loading
    },
    data() {
      return {
        isLoading: false,
        errorText: null,
        snackbar: false
      }
    },
    created() {
      this.$eventBus.$on('loading', state => this.isLoading = state);

      this.$eventBus.$on('error', msg => {
        this.errorText = msg;
        this.snackbar = true;
      });
    }
  }
</script>



