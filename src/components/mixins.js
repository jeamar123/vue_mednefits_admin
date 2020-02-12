import Vue from 'vue';
import router from '../router';

export default {
  methods: {
    errorHandler: ( error ) => {
      console.log(error);
      if (error.response) {
        console.log(error.response);
        // Vue.swal('Error!', error.response.status + ' ' + error.response.statusText, 'error');
        Vue.swal('Error!', error.response.data.message, 'error');
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

    // For validtaion with RegEx
    validEmail: (email) => {
			let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
  }
}