import * as Config from '../../config/config.js';
import axios from 'axios'

console.log( Config );
const defaultHeaders = {
  'Accept': 'application/json',
	'Content-Type': 'application/json',
	'Authorization': localStorage.vue_admin_session
};


let _axiosCall_	=	( params ) => {
	axios(params)
		.then(res => {
			return Promise( res );
		})
		.catch(err => {
			return _errorHandlers_( err );
		});
}
let _errorHandlers_ = ( err ) => {
	console.log(err);
	if (err.response) {
		console.log(err.response);
		// Vue.swal('Error!', error.response.data.message, 'error');
	} else if (err.request) {
		// console.log('The request was made but no response was received. ', error.request);
		// Vue.swal('Error!', 'Something went wrong. The request was made but no response was received.', 'error');
	} else {
		// console.log('Something happened in setting up the request that triggered an Error. ', error.message);
		// Vue.swal('Error!', 'Something went wrong. Something happened in setting up the request that triggered an Error.', 'error');
	}
}
let _login_ = ( params ) => {
	let req = {
		method: 'POST',
		url: Config.AUTH_LOGIN,
		data: params,
		header: defaultHeaders,
	};
	_axiosCall_( req );
}


module.exports = {
	_login_,
}