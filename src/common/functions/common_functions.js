
import Vue from 'vue';
import router from '../../router';
import * as Config from '../constant.js';
import axios from 'axios';

const	defaultHeaders	=		{
	// 'Accept':	'application/json',
	// 'Content-Type':	'application/json',
	'Authorization':	localStorage.vue_admin_session
};

let global_storage	=	{};

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

const _globalStorage_	=	{
	// checkStorage:	(key)	=>	{
	// 	if (global_storage.hasOwnProperty(key)){
	// 		let	_dataStorage	=	global_storage.getStorage(key);
	// 		console.log(_dataStorage);
			
	// 	}
	// },
	getStorage: ( key )	=>	{
		if( key ){
			if(global_storage.hasOwnProperty(key)){
				return global_storage[ key ];
			}else{
				return null;
			}
		}
		return global_storage;
	},
	setStorage: ( key, value )	=>	{
		global_storage[key] = value;
	},
	refreshStorage: ()	=>	{

	}
}

const _fetchCompanyDetails_	= (params) => { // ADMIN LOGIN
	let	req	=	{
		method:	'GET',
		url:	Config.COMPANY_DETAILS + '?customer_id=' + params.customer_id,
		header:	defaultHeaders,
	};
	return _axiosCall_(req)
		.then((res)	=>	{
			_globalStorage_.setStorage( 'global_corporateData', res.data );
			return res.data;
		});
};

const _getCorporateDetailsData_	=	(params)	=>	{
	let storage = _globalStorage_.getStorage('global_corporateData');
	if(storage == null){
		return _fetchCompanyDetails_(params);
	}else{
		if( storage.customer_id != params.customer_id ){
			return _fetchCompanyDetails_(params);
		}
	}
	return storage;
}



const _onLoad_	=	() =>{

}	
_onLoad_();

export	{
	_login_,
	_goBack_,
	_showPageLoading_,
	_hidePageLoading_,
	_validateEmail_,
	_globalStorage_,
	_getCorporateDetailsData_
}