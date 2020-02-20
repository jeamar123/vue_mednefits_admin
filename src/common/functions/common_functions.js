
import Vue from 'vue';
import router from '../../router';
import * as Config from '../constant.js';
import axios from 'axios';

const	defaultHeaders	=		{
	'Accept':	'application/json',
	'Content-Type':	'application/json',
	'Authorization':	localStorage.vue_admin_session
};

let global_corporateData	=	null;
let global_employeeData	=	null

const	_axiosCall_	=	(params)	=>	{ // Axios HTTP Request
	return axios(params)
		.then(res	=>	{
			return	res;
		})
		.catch(err	=>	{
			// return _errorHandlers_( err );
			Vue.swal('Error!',	_errorHandlers_(err).data.message,	'error');
			return false;
		});
};

const	_errorHandlers_	=	(err)	=>	{ // Axios ERROR HANDLER
	// console.log(err);
	let	err_data	=	{};
	if	(err.response) {
		console.log(err.response);
		if	(err.response.status == 400 || err.response.status == 401 || err.response.status == 404 || err.response.status == 500){
			err_data	=	{status: false, message: err.response.status + ' : ' + err.response.data.message};
		}
	} else if	(err.request) {
		console.log(err.request);
		err_data	=	{status: false, message: 'Something went wrong. The request was made but no response was received.'};
	} else {
		console.log('Something happened in setting up the request that triggered an Error. ', error.message);
		err_data	=	{status: false, message: 'Something went wrong. The request was made but no response was received.'};
	}
	return {data:	err_data};
};

const _login_	=	(params) => { // ADMIN LOGIN
	let	req	=	{
		method:	'POST',
		url:	Config.AUTH_LOGIN,
		data:	params,
		header:	defaultHeaders,
	};
	return	_axiosCall_(req);
};

const _goBack_	=	()	=>	{
	router.back();
}

const _showPageLoading_	=	()	=>{
	// router.app.$children[0].$children[0].showLoading();
}

const _hidePageLoading_  =  () =>{
	// router.app.$children[0].$children[0].hideLoading();
}

const _validateEmail_	=	(email)	=>	{ // For validtaion with RegEx
	let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

const _setCorporateData_	=	(data)	=>	{
	global_corporateData = data;
}

const _getCorporateData_	=	()	=>	{
	return global_corporateData;
}

const _deleteCorporateData_	=	()	=>	{
	global_corporateData = null;
}





const _onLoad_	=	() =>{
	if( global_corporateData == null ){
		console.log('creating corporate data...');
		_setCorporateData_({
			name: 'Employee',
			age: 2,
			dob: '2015-05-05'
		});
	}
	
	console.log( _getCorporateData_() );
}	

_onLoad_();

export	{
	_login_,
	_goBack_,
	_showPageLoading_,
	_hidePageLoading_,
	_validateEmail_
}