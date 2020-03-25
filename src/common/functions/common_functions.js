
import Vue from 'vue';
import router from '../../router';
import * as Config from '../constant.js';
import axios from 'axios';
import moment from "moment";

const	defaultHeaders	=		{
	// 'Accept':	'application/json',
	// 'Content-Type':	'application/json',
	'Authorization':	localStorage.vue_admin_session
};
const	uploadHeaders	=		{
	// 'Accept':	'application/json',
	// 'Content-Type':	'application/json',
	'Authorization':	localStorage.vue_admin_session,
	'Content-Type': 'multipart/form-data'
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
			err_data	=	{status: false, message: err.response.data.message};
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

const _login_	=	(params) => { // ADMIN LOGIN API
	let	req	=	{
		method:	'POST',
		url:	Config.AUTH_LOGIN,
		data:	params,
		header:	defaultHeaders,
	};
	return	_axiosCall_(req);
};

const _goBack_	=	()	=>	{ // ROUTER BACK LAST STATE
	router.back();
}

const _showPageLoading_	=	()	=>{
	router.app.$children[0].$children[0].showLoading();
}

const _hidePageLoading_  =  () =>{
	router.app.$children[0].$children[0].hideLoading();
}

const _validateEmail_	=	(email)	=>	{ // For validtaion with RegEx
	let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

const _globalStorage_	=	{ // CUSTOM LOCAL STORAGE
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
}

const _fetchCompanyDetails_	= (params) => { // COMPANY DETAILS API
	let	req	=	{
		method:	'GET',
		url:	Config.COMPANY_DETAILS + '?customer_id=' + params.customer_id,
		header:	defaultHeaders,
	};
	return _axiosCall_(req)
		.then((res)	=>	{
			_globalStorage_.setStorage( 'global_corporateData', res.data );
			// _globalStorage_.setStorage('global_employeeListData', );
			delete global_storage['global_employeeListData'];
			return res.data;
		});
};

const _getCorporateDetailsData_	=	(params, isRefresh)	=>	{ // STORAGE CHECKER FOR COMPANY DETAILS
	if( isRefresh ){
		return _fetchCompanyDetails_(params);
	}
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

const _fetchEmployeeDetails_	= (params) => { // EMPLOYEE DETAILS API
	let	req	=	{
		method:	'GET',
		url:	Config.EMPLOYEE_DETAILS + '?member_id=' + params.member_id,
		header:	defaultHeaders,
	};
	return _axiosCall_(req)
		.then((res)	=>	{
			_globalStorage_.setStorage( 'global_employeeData', res.data.data );
			return res.data.data;
		});
};

const _getEmployeeDetailsData_	=	(params, isRefresh)	=>	{ // STORAGE CHECKER FOR EMPLOYEE DETAILS
	console.log(isRefresh);
	if( isRefresh ){
		return _fetchEmployeeDetails_(params);
	}
	let storage = _globalStorage_.getStorage('global_employeeData');
	if(storage == null){
		return _fetchEmployeeDetails_(params);
	}else{
		if( storage.member_id != params.member_id ){
			return _fetchEmployeeDetails_(params);
		}
	}
	return storage;
}

const _childGetStorage_	=	(key)	=>	{ // CHILD STATE/ROUTE STORAGE
	
	let promise = new Promise((resolve, reject)	=>	{
		let interval	=	setInterval(() => {
			let storage	=	_globalStorage_.getStorage(key);
			if( storage != null ){
				clearInterval(interval);
				resolve(storage);
				return storage;
			}
		}, 1000);
	});
	return promise;
			
}

const _fetchEmployeeList_	= (params)	=> { // EMPLOYEE LIST API
	console.log(params);
	let	req	=	{
		method:	'GET',
		url:	Config.EMPLOYEE_LIST + '?customer_id=' + params.customer_id + '&page=' + params.page + '&limit=' + params.limit,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
};

const _searchEmployeeList_	= (params)	=> {
	console.log(params);
	let	req	=	{
		method:	'GET',
		url:	Config.SEARCH_EMPLOYEE_LIST + '?customer_id=' + params.customer_id + '&search=' + params.search,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
};

const _updateBulkCredit_ = (params)	=> {
	console.log(params);
	let	req	=	{
		method:	'POST',
		url:	Config.UPDATE_BULK_CREDIT,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
};

const _addHeadCount_	=	(params) => { // CORPORATE ADD HEADCOUNT API
	let	req	=	{
		method:	'POST',
		url:	Config.COMPANY_PLAN_HEADCOUNT,
		data:	params,
		header:	defaultHeaders,
	};
	return	_axiosCall_(req);
};

const _formChecker_	=	(formData)	=>	{
	let error_checkForm = [];
	console.log(formData);
	if (formData.hasOwnProperty('fullname') && !formData.fullname) {
		error_checkForm.push("Name.");
	}
	if (formData.hasOwnProperty('phone_code') && !formData.phone_code) {
		error_checkForm.push("Area Code.");
	}
	if (formData.hasOwnProperty('phone_no') && !formData.phone_no) {
		error_checkForm.push("Mobile Number.");
	}
	if (formData.hasOwnProperty('phone') && !formData.phone) {
		error_checkForm.push("Phone Number.");
	}
	if (formData.hasOwnProperty('job_title') && !formData.job_title) {
		error_checkForm.push("Job Title.");
	}
	if (formData.hasOwnProperty('dob') && !formData.dob) {
		error_checkForm.push("Date of Birth.");
	}
	if (formData.hasOwnProperty('email') && !formData.email) {
		error_checkForm.push('Email.');
	} else if (formData.hasOwnProperty('email')) {
		if( !_validateEmail_(formData.email) ){
			error_checkForm.push('Valid email.');
		}
	}
	if (formData.hasOwnProperty('plan_start') && !formData.plan_start) {
		error_checkForm.push("Plan Start.");
	}
	if (formData.hasOwnProperty('postal_code') && !formData.postal_code) {
		error_checkForm.push("Postal Code.");
	}
	if (formData.hasOwnProperty('relationship') && !formData.relationship) {
		error_checkForm.push("Relationship.");
	}
	if (formData.hasOwnProperty('employees') && formData.employees === undefined) {
		error_checkForm.push("Employees.");
	}else if( formData.hasOwnProperty('employees') ){
		if( formData.employees < 3 ){
			error_checkForm.push("Employees should be at least 3.");
		}
	}
	if (formData.hasOwnProperty('account_type') && !formData.account_type) {
		error_checkForm.push("Account Type.");
	}
	if (formData.hasOwnProperty('payment_status') && formData.payment_status === undefined) {
		error_checkForm.push("Payment Status.");
	}
	if (formData.hasOwnProperty('medical_credits') && formData.medical_credits === undefined)	{
		error_checkForm.push('Medical Credits.');
	}
	if (formData.hasOwnProperty('wellness_credits') && formData.wellness_credits === undefined)	{
		error_checkForm.push('Wellness Credits.');
	}
	if (formData.hasOwnProperty('medical_allocation') && formData.medical_allocation === undefined)	{
		error_checkForm.push('Medical Credits.');
	}
	if (formData.hasOwnProperty('wellness_allocation') && formData.wellness_allocation === undefined)	{
		error_checkForm.push('Wellness Credits.');
	}

	if (formData.hasOwnProperty('company_name') && !formData.company_name)	{
		error_checkForm.push('Company Name.');
	}
	if (formData.hasOwnProperty('company_address') && !formData.company_address)	{
		error_checkForm.push('Company Address.');
	}
	if (formData.hasOwnProperty('first_name') && !formData.first_name)	{
		error_checkForm.push('First Name.');
	}
	if (formData.hasOwnProperty('last_name') && !formData.last_name)	{
		error_checkForm.push('Last Name.');
	}
	if (formData.hasOwnProperty('billing_first_name') && !formData.billing_first_name)	{
		error_checkForm.push('Billing First Name.');
	}
	if (formData.hasOwnProperty('billing_last_name') && !formData.billing_last_name)	{
		error_checkForm.push('Billing Last Name.');
	}
	if (formData.hasOwnProperty('billing_email') && !formData.billing_email)	{
		error_checkForm.push('Billing Email.');
	}
	if (formData.hasOwnProperty('billing_phone') && !formData.billing_phone)	{
		error_checkForm.push('Billing Phone Number.');
	}
	if (formData.hasOwnProperty('companyContacts'))	{
		formData.companyContacts.map((value, key)	=>	{
			if (value.hasOwnProperty('first_name') && !value.first_name)	{
				error_checkForm.push('Contact First Name.');
			}
			if (value.hasOwnProperty('last_name') && !value.last_name)	{
				error_checkForm.push('Contact Last Name.');
			}
			if (value.hasOwnProperty('email') && !value.email)	{
				error_checkForm.push('Contact Email.');
			}
			if (value.hasOwnProperty('phone') && !value.phone)	{
				error_checkForm.push('Contact Phone Number.');
			}
		});
	}

	if (formData.hasOwnProperty('paid_amount') && !formData.paid_amount)	{
		error_checkForm.push('Paid Amount.');
	}
	if (formData.hasOwnProperty('transaction_date') && !formData.transaction_date)	{
		error_checkForm.push('Date Received.');
	}
	if (formData.hasOwnProperty('invoice_due_date') && !formData.invoice_due_date)	{
		error_checkForm.push('Invoice Due Date.');
	}
	if (formData.hasOwnProperty('invoice_date') && !formData.invoice_date)	{
		error_checkForm.push('Invoice Date.');
	}
	if (formData.hasOwnProperty('individual_price') && !formData.individual_price)	{
		error_checkForm.push('Individual Price.');
	}
	
	
	if (!error_checkForm.length) {
		return true;
	} else {
		console.log(error_checkForm);
		let _newError = [];
		error_checkForm.map(value => {
			_newError.push(`<span class="block p-1 text-red-500 text-center w-1/2 mx-auto my-0">${value}</span>`);
		});
		Vue.swal( 'Required', _newError.join('\n\n'), 'warning' );
		return false;
	}
}

const _fetchCapVisitList_	= (params)	=> { 
	console.log(params);
	let	req	=	{
		method:	'GET',
		url:	Config.CAP_VISIT_LIST + '?company_id=' + params.company_id + '&page=' + params.page + '&limit=' + params.limit + '&token=' + params.token,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
};

const _downloadEmployeeDependent_	= (params)	=> { 
	console.log(params);
	let	req	=	{
		method:	'GET',
		url:	Config.DOWNLOAD_EMP_DEPENDENT + '?company_id=' + params.company_id + '&token=' + params.token,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
};

const _uploadFileCap_ = (params)	=> { 
	console.log(params);
	let	req	=	{
		method:	'POST',
		url:	Config.UPLOAD_FILE_CAP,
		data: params,
		header:	uploadHeaders,
	};
	return _axiosCall_(req);
};

const _updateCapVisit_ = (params)	=> { 
	console.log(params);
	let	req	=	{
		method:	'PUT',
		url:	Config.UPDATE_CAP_VISIT,
		data: params,
		header:	uploadHeaders,
	};
	return _axiosCall_(req);
}

const _uploadEmployeeEnrollmentExcel_ = (params)	=> { 
	let	req	=	{
		method:	'POST',
		url:	Config.ENROLL_EMPLOYEE_EXCEL,
		data: params,
		header:	uploadHeaders,
	};
	return _axiosCall_(req);
};

const _fetchPreviewTempEmployees_	= (params)	=> {
	let	req	=	{
		method:	'GET',
		url:	Config.ENROLLMENT_TEMP_EMPLOYEES + '?customer_id=' + params.customer_id,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
};

const	_formatDate_	=	( date, from, to )	=>	{
	return moment( date, from ).format( to );
}

const _updateTempEmployees_ = (params)	=> { 
	let	req	=	{
		method:	'PUT',
		url:	Config.UPDATE_TEMP_EMPLOYEES,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _updateTempDependents_ = (params)	=> { 
	let	req	=	{
		method:	'PUT',
		url:	Config.UPDATE_TEMP_DEPENDENTS,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _deleteTempEmployees_ = (params)	=> { 
	let	req	=	{
		method:	'DELETE',
		url:	Config.DELETE_TEMP_EMPLOYEES + '?id=' + params.id,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _fetchCompanySpendingAccountStatus_ = (params)	=> { 
	let	req	=	{
		method:	'GET',
		url:	Config.COMPANY_SPENDING_ACCOUNT_STATUS + '?customer_id=' + params.customer_id,
		header:	defaultHeaders,
	};
	return _axiosCall_(req)
		.then((res)	=>	{
			_globalStorage_.setStorage( 'global_corporateSpendingAccountStatus', res.data.data );
			return res.data.data;
		});
}

const _getCompanySpendingAccountStatus_	=	(params, isRefresh)	=>	{ 
	if( isRefresh ){
		return _fetchCompanySpendingAccountStatus_(params);
	}
	let storage = _globalStorage_.getStorage('global_corporateSpendingAccountStatus');
	if(storage == null){
		return _fetchCompanySpendingAccountStatus_(params);
	}else{
		if( storage.customer_id != params.customer_id ){
			return _fetchCompanySpendingAccountStatus_(params);
		}
	}
	return storage;
}

const _enrollTempEmployees_	=	(params) => { 
	let	req	=	{
		method:	'POST',
		url:	Config.ENROLL_TEMP_EMPLOYEES,
		data:	params,
		header:	defaultHeaders,
	};
	return	_axiosCall_(req);
};

const _fetchPackagePlanList_	= (params)	=> {
	let	req	=	{
		method:	'GET',
		url:	Config.COMPANY_PACKAGE_PLAN_LIST + '?customer_id=' + params.customer_id,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
};

const _enrollEmployeeWebInput_	=	(params) => { 
	let	req	=	{
		method:	'POST',
		url:	Config.WEB_INPUT_ADD_EMPLOYEE,
		data:	params,
		header:	defaultHeaders,
	};
	return	_axiosCall_(req);
};

const _fetchDownloadEclaimReceipts_	= (params)	=> {
	let query = '?customer_id=' + params.customer_id;
	params.dates.map((value, key)	=>	{
		query += '&dates[]=' + value;
	});
	params.filters.map((value, key)	=>	{
		query += '&filter[]=' + value;
	});
	let	req	=	{
		method:	'GET',
		url:	Config.DOWNLOAD_ECLAIM_RECEIPTS + query,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
};

const _uploadEmployeeDependent_	= (params)	=> {
	let	req	=	{
		method:	'POST',
		url:	Config.UPLOAD_EMPLOYEE_DEPENDENT,
		data: params,
		header:	uploadHeaders,
    };
	return _axiosCall_(req);
};
const _fetchEclaimList_	= (params)	=> {
	let	req	=	{
		method:	'GET',
		url:	Config.ECLAIM_TYPE_LIST + '?customer_id=' + params.customer_id,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
};

const _createEclaimType_	= (params)	=> {
	let	req	=	{
		method:	'POST',
		url:	Config.CREATE_ECLAIM_TYPE,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
};

const _updateEclaimType_	= (params)	=> {
	let	req	=	{
		method:	'PUT',
		url:	Config.UPDATE_ECLAIM_TYPE,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
};

const _deleteEclaimType_	= (params)	=> {
	let	req	=	{
		method:	'DELETE',
		url:	Config.DELETE_ECLAIM_TYPE + '?e_claim_service_type_id=' + params.e_claim_service_type_id + '&customer_id=' + params.customer_id,
		data: params,
		header:	defaultHeaders,
	}
}

const _getActivePlans_ = (params)	=> {
	let	req	=	{
		method:	'GET',
		url:	Config.GET_ACTIVE_PLANS + '?customer_id=' + params.customer_id,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _createDependentAccount_ = (params)	=> {
	let	req	=	{
		method:	'POST',
		url:	Config.CREATE_DEPENDENT_ACCOUNT,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _getSpendingSetttingsData_ = (params)	=> {
	let	req	=	{
		method:	'GET',
		url:	Config.GET_SPENDING_SETTINGS_DATA + '?customer_id=' + params.customer_id,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _uploadCreditAllocation_	= (params)	=> {
	let	req	=	{
		method:	'POST',
		url:	Config.UPLOAD_CREDIT_ALLOCATION,
		data: params,
		header:	uploadHeaders,
    };
	return _axiosCall_(req);
};

const _fetchViewPlanData_ = (params)	=> {
	let	req	=	{
		method:	'GET',
		url:	Config.FETCH_VIEW_PLAN_DATA + '?customer_active_plan_id=' + params.customer_active_plan_id,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}
	
const _fetchCompanyBusinessDetails_ = (params)	=> {
	let	req	=	{
		method:	'GET',
		url:	Config.COMPANY_BUSINESS_DETAILS + '?company_id=' + params.customer_id,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _updateCompanyStatus_ = (params)	=> {
	let	req	=	{
		method:	'PUT',
		url:	Config.COMPANY_STATUS,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _updateCompanyBusinessDetails_ = (params)	=> {
	let	req	=	{
		method:	'PUT',
		url:	Config.COMPANY_BUSINESS_DETAILS,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _deleteCompanyContact_ = (params)	=> {
	let	req	=	{
		method:	'DELETE',
		url:	Config.COMPANY_CONTACT + '?company_id=' + params.company_id + '&company_contact_id=' + params.company_contact_id ,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _addBenefitsSpecialist_ = (params)	=> {
	let	req	=	{
		method:	'POST',
		url:	Config.COMPANY_BENEFITS_SPECIALIST,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _updateDependentPlan_ = (params)	=> {
	let	req	=	{
		method:	'PUT',
		url:	Config.UPDATE_PLAN_DEPENDENT,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _updateDependentRecordPayment_ = (params)	=> {
	let	req	=	{
		method:	'PUT',
		url:	Config.DEPENDENT_RECORD_PAYMENT,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _updateEmployeeRecordPayment_ = (params)	=> {
	let	req	=	{
		method:	'PUT',
		url:	Config.EMPLOYEE_RECORD_PAYMENT,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _updateEmployeePlan_ = (params)	=> {
	let	req	=	{
		method:	'PUT',
		url:	Config.UPDATE_PLAN_EMPLOYEE,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

export	{
	_login_,
	_goBack_,
	_showPageLoading_,
	_hidePageLoading_,
	_validateEmail_,
	_globalStorage_,
	_getCorporateDetailsData_,
	_getEmployeeDetailsData_,
	_childGetStorage_,
	_fetchEmployeeList_,
	_searchEmployeeList_,
	_updateBulkCredit_,
	_addHeadCount_,
	_formChecker_,
	_fetchCapVisitList_,
	_downloadEmployeeDependent_,
	_uploadFileCap_,
	_updateCapVisit_,
	_uploadEmployeeEnrollmentExcel_,
	_fetchPreviewTempEmployees_,
	_formatDate_,
	_updateTempEmployees_,
	_updateTempDependents_,
	_deleteTempEmployees_,
	_fetchCompanySpendingAccountStatus_,
	_getCompanySpendingAccountStatus_,
	_enrollTempEmployees_,
	_fetchPackagePlanList_,
	_enrollEmployeeWebInput_,
	_fetchDownloadEclaimReceipts_,
	_uploadEmployeeDependent_,
	_fetchEclaimList_,
	_createEclaimType_,
	_updateEclaimType_,
	_deleteEclaimType_,
	_getActivePlans_,
	_createDependentAccount_,
	_getSpendingSetttingsData_,
	_fetchCompanyBusinessDetails_,
	_updateCompanyStatus_,
	_updateCompanyBusinessDetails_,
	_deleteCompanyContact_,
	_addBenefitsSpecialist_,
	_uploadCreditAllocation_,
	_fetchViewPlanData_,
	_updateDependentPlan_,
	_updateDependentRecordPayment_,
	_updateEmployeePlan_,
	_updateEmployeeRecordPayment_,
}