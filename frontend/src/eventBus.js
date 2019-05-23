import Vue from 'vue';

const EventBus = Vue.prototype.$eventBus = new Vue();

export default EventBus;