/**
 * @fileOverview
 * @name index.js<frontend/apps/home/js>
 * @author Andrey A. But
 * @license mit
 * initialization file for main page
 */
import Vue from 'vue';
import App from 's/App';
import router from 's/router';

const app = new Vue({
  router,
  components: {
    App,
  },
  template: '<App/>',
});

app.$mount('#app');

