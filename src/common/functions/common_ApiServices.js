import * as Config from '../../config/config.js';
import axios from 'axios';

const defaultHeaders = {
  'Accept': 'application/json',
	'Content-Type': 'application/json',
	'Authorization': localStorage.vue_admin_session
};


const _axiosCall_	=	( params ) => { // Axios HTTP Request
	return axios(params)
		.then(res => {
			return res;
		})
		.catch(err => {
			console.log( _apiServices._errorHandlers_( err ) );
			return _errorHandlers_( err );
		});
};
const _errorHandlers_ = ( err ) => { // Axios ERROR HANDLER
	// console.log(err);
	var err_data = {};
	if	(err.response) {
		console.log(err.response);
		if	(err.response.status == 400 || err.response.status == 401 || err.response.status == 404 || err.response.status == 500){
			err_data = { status: false, message: err.response.status + ' : ' + err.response.data.message };
		}
	} else if	(err.request) {
		console.log(err.request);
		err_data = { status: false, message: 'Something went wrong. The request was made but no response was received.' };
	} else {
		console.log('Something happened in setting up the request that triggered an Error. ', error.message);
		err_data = { status: false, message: 'Something went wrong. The request was made but no response was received.' };
	}
	return { data: err_data };
};


const	_login_	=  ( params ) => { // ADMIN LOGIN
	let req = {
		method: 'POST',
		url: Config.AUTH_LOGIN,
		data: params,
		header: defaultHeaders,
	};
	return _axiosCall_( req );
};

export { 
	_login_,
};