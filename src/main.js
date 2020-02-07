import Vue from 'vue';
import vClickOutside from 'v-click-outside';
import VCalendar from 'v-calendar';
import VueSweetalert2 from 'vue-sweetalert2';
import VueMoment from 'vue-moment';
import VueSlider from 'vue-slider-component';
import JsonExcel from 'vue-json-excel'
import Vue2Filters from 'vue2-filters'
 
import $ from 'jquery'; 
import '@/assets/css/tailwind.scss'

import 'v-calendar/lib/v-calendar.min.css';
import 'vue-slider-component/theme/default.css';

import App from './App.vue';
import router from './router';

Vue.use(VCalendar);
Vue.use(vClickOutside);
Vue.use(Vue2Filters);

const options = {
    confirmButtonColor: '#0392CF',
    cancelButtonColor: '#FF5959',
};

Vue.use(VueSweetalert2,options);
Vue.use(VueMoment);
Vue.component('VueSlider', VueSlider);
Vue.component('downloadExcel', JsonExcel)
Vue.config.productionTip = false;

Vue.mixin( Vue2Filters.mixin );

Vue.mixin({
  methods: {
    errorHandler: ( error ) => {
      console.log(error);
      if (error.response) {
        console.log(error.response);
        Vue.swal('Error!', error.response.status + ' ' + error.response.statusText, 'error');
      } else if (error.request) {
        console.log('The request was made but no response was received. ', error.request);
        Vue.swal('Error!', 'Something went wrong.', 'error');
      } else {
        console.log('Something happened in setting up the request that triggered an Error. ', error.message);
        Vue.swal('Error!', 'Something went wrong.', 'error');
      }
      console.log(error.config);
    },
  }
});

// const $ = require('jquery');
window.$ = $; 

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
