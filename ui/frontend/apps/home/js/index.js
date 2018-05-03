/**
 * @fileOverview
 * @name index.js<frontend/apps/home/js>
 * @author Andrey A. But
 * @license mit
 * initialization file for main page
 */
import Vue from 'vue';
import App from 's/App';

function init () {
  console.log('main page');

  const app1 = new Vue({
    el:         '#v-app',
    delimiters: [ '<%', '%>', ],
    data:       {
      message: 'Hello Vue!!!!!!',
    },
    methods: {
      reverseMessage () {
        this.message = this.message
          .split('')
          .reverse()
          .join('');
      },
    },
  });
  const appFor = new Vue({
    el:         '#app-4',
    delimiters: [ '<%', '%>', ],
    data:       {
      todos: [
        { text: 'Create hello Vue with js and Django', },
        { text: 'Create component for main page', },
        { text: 'Create dynamically changed list', },
      ],
    },
  });

  // Define a new component called button-counter
  // simple button component
  Vue.component('button-counter', {
    data () {
      return {
        count: 0,
      };
    },
    template:
      '<button v-on:click="count++">You clicked me {{ count }}</button>',
  });

  new Vue({ el: '#components-demo', });

  const app = new Vue({
    el:         '#app',
    components: {
      App,
    },
    template: '<App/>',
  });
}

init();
