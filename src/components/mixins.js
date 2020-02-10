import Vue from 'vue';
import router from '../router';

export default {
  methods: {
    errorHandler: ( error ) => {
      console.log(error);
      if (error.response) {
        console.log(error.response);
        Vue.swal('Error!', error.response.status + ' ' + error.response.statusText, 'error');
      } else if (error.request) {
        console.log('The request was made but no response was received. ', error.request);
        Vue.swal('Error!', 'Something went wrong. The request was made but no response was received.', 'error');
      } else {
        console.log('Something happened in setting up the request that triggered an Error. ', error.message);
        Vue.swal('Error!', 'Something went wrong. Something happened in setting up the request that triggered an Error.', 'error');
      }
      console.log(error.config);
    },
    goBack : () => {
      router.back();
    },
    showLoading : () =>{
      router.app.$children[0].$children[0].showLoading();
    },
    hideLoading : () =>{
      router.app.$children[0].$children[0].hideLoading();
    },
  }
}