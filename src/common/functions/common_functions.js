
import Vue from 'vue';
import router from '../../router';
import * as Config from '../constant.js';
import axios from 'axios';
import moment from "moment";
import jsPDF from 'jspdf'
import 'jspdf-autotable';

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
	if ( params.customer_active_plan_id ) {
		let	req	=	{ 
			method:	'GET',
			url:	Config.EMPLOYEE_LIST + '?customer_id=' + params.customer_id + '&page=' + params.page + '&limit=' + params.limit + '&customer_active_plan_id=' + params.customer_active_plan_id,
			header:	defaultHeaders,
		};
		console.log('naa siya gipasa nga customer id');
		return _axiosCall_(req);
	} else {
		let	req	=	{
			method:	'GET',
			url:	Config.EMPLOYEE_LIST + '?customer_id=' + params.customer_id + '&page=' + params.page + '&limit=' + params.limit,
			header:	defaultHeaders,
		};
		return _axiosCall_(req);
	}
	
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
	if (formData.hasOwnProperty('duration') && !formData.duration)	{
		error_checkForm.push('Duration.');
	}
	if (formData.hasOwnProperty('payment_status') && formData.payment_status == undefined)	{
		error_checkForm.push('Payment Status.');
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

const _updateAccountPlanType_ = (params) => {
	let	req	=	{
		method:	'PUT',
		url:	Config.UPDATE_ACCOUNT_PLAN_TYPE,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _updateDependentRecordRefund_ = (params) => {
	let	req	=	{
		method:	'PUT',
		url:	Config.DEPENDENT_RECORD_REFUND,
    data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _updateEmpRefundRecordPayment_ = (params) => {
	let	req	=	{
		method:	'PUT',
		url:	Config.UPDATE_EMPLOYEE_REFUND_PAYMENT,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _updateSpendingDeposit_ = (params) => {
	let	req	=	{
		method:	'PUT',
		url:	Config.UPDATE_SPENDING_DEPOSIT,
    data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}
const _createPlanExtension_ = (params) => {
	let	req	=	{
		method:	'POST',
		url:	Config.CREATE_PLAN_EXTENSION,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _planExtensionRecordPayment_ = (params) => {
	let	req	=	{
		method:	'PUT',
		url:	Config.PLAN_EXTENSION_RECORD_PAYMENT,
    data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _activatePlanExtension_ = (params) => {
	let	req	=	{
		method:	'POST',
		url:	Config.ACTIVATE_PLAN_EXTENSION,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

//------------ PDF DOWNLOAD FUNCTION -------------//
const _spendingDepositRecordPayment_ = (params) => {
	let	req	=	{
		method:	'PUT',
		url:	Config.SPENDING_DEPOSIT_RECORD_PAYMENT,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _updateEditPlanExtension_ = (params) => {
	let	req	=	{
		method:	'PUT',
		url:	Config.UPDATE_EDIT_PLAN_EXTENSION,
		data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}

const _getBase64Image_	=	(url)	=>{
	let img = new Image();
	let canvas = document.createElement('canvas');
	let dataURL;
	img.src = url;
	let promise = new Promise((resolve, reject)	=>	{
		img.onload = function(){
			canvas.width = img.width;
			canvas.height = img.height;
			let context = canvas.getContext('2d');
			context.drawImage(img, 0, 0);
			dataURL = canvas.toDataURL('image/png');
			resolve(dataURL);
			return dataURL;
		};
	});
	return promise;
}

const _downloadPDFInvoice_ = async (params, type)	=>	{
	/*----- Invoice Plan/Account type -------*/
	/*----- 1 = Employee Account ------------*/
	/*----- 2 = Dependent Account -----------*/   
	/*----- 3 = Spending Deposit Account ----*/   
	/*----- 4 = Employee Refund -------------*/   
	/*----- 5 = Dependent Refund ------------*/   
	/*----- 6 = Plan Extension --------------*/
	/*---------------------------------------*/
	let tblData = null;
	if(type == 1){
		params.dependents = [];
		tblData = await _formatEmployeeInvoiceBody_(params);
	}
	if(type == 2){

	}
	if(type == 3){

	}
	if(type == 4){

	}
	if(type == 5){

	}
	if(type == 6){

	}
	console.log(tblData);
	_generatePDF_(tblData);
};

const _generatePDF_	=	async (params)	=>	{
	const pdfDoc = new jsPDF('p','mm');
	pdfDoc.setDrawColor(238, 238, 238);
	let pdfHeader = await _renderHeader_(pdfDoc, params);
	let pdfSubHeader = await _renderSubHeader_(pdfDoc);
	let pdfTable = await _renderTable_(pdfDoc, params);
	let pdfTotal = await _renderTotal_(pdfDoc, params, pdfTable.lastPosition);
	let pdfFooter = await _renderFooter_(pdfDoc, pdfTotal.lastPosition);
	console.log('pdfHeader', pdfHeader);
	console.log('pdfSubHeader', pdfSubHeader);
	console.log('pdfTable', pdfTable);
	console.log('pdfTotal', pdfTotal);
	console.log('pdfFooter', pdfFooter);
	// doc.save('table.pdf')
	window.open(pdfDoc.output('bloburl'), '_blank');
}

const _renderHeader_ = async (pdfDoc, params) =>	{
	if(params.paid){
		pdfDoc.setTextColor(228,228,228);
		pdfDoc.setFontSize(120);
		pdfDoc.text('PAID', 70, 105, null, 30 );
	}

	let logo = await _getBase64Image_(window.location.origin + '/assets/img/latest logo/mobile-logo-blue-latest.png');
	pdfDoc.addImage(logo, "PNG", 15, 25, 80, 15);

	let header = [
		[
			{ 
				content: '', 
				rowSpan: 10,
				styles: { 
					fontStyle: 'bold',
					font: 'helvetica',
					fontSize: 20,
					textColor: '#333',
				}  
			},
			{ 
				content: 'INVOICE', 
				rowSpan: 1,
				styles: { 
					fontStyle: 'bold',
					font: 'helvetica',
					fontSize: 25,
					textColor: '#333',
				} 
			}
		],
		[],
		[
			{ 
				content: 'Medicloud Pte Ltd', 
				styles: { 
					fontStyle: 'bold',
					textColor: '#333'
				} 
			},
		],
		[
			'7 Temasek Boulevard'
		],
		[
			'#18-02 Suntec Tower One'
		],
		[
			'038987'
		],
		[],
		[
			'Singapore'
		],
		[
			'+65 6254 7889'
		],
		[
			'mednefits.com'
		],
	];
	pdfDoc.autoTable({
		theme: 'plain',
		margin: { top: 0, bottom: 0, left: 15, right: 15 },
		startY: 10,
		columns: ['', ''],
		styles: {
			font: 'helvetica',
			valign: 'middle',
			cellPadding: 0.3,
			fontSize: 11,
		},
		columnStyles: {
			1:  {
				halign: 'right',
				cellWidth: 50,
				textColor: '#444'
			}
		},
		body: header,
	})
	pdfDoc.rect(5,5,pdfDoc.internal.pageSize.width - 10, pdfDoc.internal.pageSize.height - 10, 'S');

	return true;
};

const _renderSubHeader_	=	async	(pdfDoc)	=>	{
	let subHeader = [
		[
			{ 
				content: 'BILL TO', 
				rowSpan: 2,
				styles: { 
					fontStyle: 'bold',
					textColor: '#666',
				}  
			},
			{ 
				content: 'Invoice Number: ', 
				rowSpan: 2,
			},
			'',
			{ 
				content: 'OMC000012', 
				rowSpan: 2,
			}
		],
		[],
		[
			'StackGeckos',
			{ 
				content: 'Invoice Date: ', 
				rowSpan: 2,
			},
			'',
			{ 
				content: '04 January, 2018', 
				rowSpan: 2,
			}
		],
		[
			'Allans Alzulas'
		],
		[
			'test, 1222',
			{
				content: 'Payment Due: ',
				rowSpan: 2,
			},
			'',
			{
				content: '27 December, 2017',
				rowSpan: 2,
			}
		],
		[
			'',
		],
		[
			'+639064317892',
			{
				content: 'Payment Date: ',
				rowSpan: 1,
			},
			'',
			{
				content: '27 December, 2017',
				rowSpan: 1,
			}
		],
		[
			'allan.alzula@gmail.com',
		],
		[
			'',
			{
				content: 'Amount Due: ',
				rowSpan: 2,
				styles:  {
					valign: 'middle',
					fillColor: [240, 240, 240]
				}
			},
			{
				content: '',
				rowSpan: 2,
				styles:  {
					valign: 'middle',
					fillColor: [240, 240, 240]
				}
			},
			{
				content: 'SGD 410',
				rowSpan: 2,
				styles:  {
					valign: 'middle',
					fillColor: [240, 240, 240]
				}
			}
		],
		[],
	];
	pdfDoc.autoTable({
		theme: 'plain',
		margin: { top: 0, bottom: 0, left: 15, right: 15 },
		startY: 75,
		columns: ['','','',''],
		styles: {
			font: 'helvetica',
			cellPadding: 0,
		},
		columnStyles: {
			0: {
				textColor: '#333'
			},
			1:  {
				halign: 'right',
				cellWidth: 40,
				textColor: '#333'
			},
			2:  {
				cellWidth: 3,
			},
			3:  {
				halign: 'left',
				cellWidth: 40,
				textColor: '#666'
			},
		},
		body: subHeader,
	})
	pdfDoc.line(5, 70, pdfDoc.internal.pageSize.width - 5, 70);

	return true;
}

const _renderTable_	=	async	(pdfDoc, params)	=>	{
	let tableHeader = [
		[
			{
				content : '',
				styles: {
					fillColor: [3, 146, 207],
				}
			},
			{
				content : 'Items',
				styles: {
					fillColor: [3, 146, 207],
					textColor: [255, 255, 255],
					halign: 'left',
					cellWidth: 80,
				}
			},
			{
				content : 'Quantity',
				styles: {
					fillColor: [3, 146, 207],
					textColor: [255, 255, 255],
				}
			},
			{
				content : 'Price',
				styles: {
					fillColor: [3, 146, 207],
					textColor: [255, 255, 255],
				}
			},
			{
				content : 'Amount',
				styles: {
					fillColor: [3, 146, 207],
					textColor: [255, 255, 255],
				}
			},
			{
				content : '',
				styles: {
					fillColor: [3, 146, 207],
				}
			},
		],
	];
	pdfDoc.autoTable({
		theme: 'plain',
		margin: { top: 0, bottom: 0, left: 5, right: 5 },
		startY: 120,
		columns: ['', '', '', '', '', ''],
		styles: {
			font: 'helvetica',
			halign: 'center',
			cellPadding: 0.3,
			valign: 'middle',
			minCellHeight: 10,
		},
		columnStyles: {
			0: {
				cellWidth: 8
			},
			2:  {
				cellWidth: 32,
			},
			3:  {
				cellWidth: 35,
			},
			4:  {
				cellWidth: 35,
			},
			5:  {
				cellWidth: 8
			},
		},
		body: tableHeader,
	})
	let tableBody = params;
	pdfDoc.autoTable({
		theme: 'plain',
		margin: { top: 0, bottom: 0, left: 5, right: 5 },
		startY: 135,
		columns: ['', '', '', '', '', ''],
		styles: {
			font: 'helvetica',
			halign: 'center',
			valign: 'middle',
			cellPadding: 0.3,
			fontStyle: 'bold',
		},
		columnStyles: {
			0:  {
				cellWidth: 8,
			},
			1:  {
				halign: 'left',
				fontStyle: 'normal',
			},
			2:  {
				cellWidth: 32,
			},
			3:  {
				cellWidth: 35,
			},
			4:  {
				cellWidth: 35,
			},
			5:  {
				cellWidth: 8
			},
		},
		body: tableBody,
	})
	pdfDoc.line(5, pdfDoc.previousAutoTable.finalY + 10, pdfDoc.internal.pageSize.width - 5, pdfDoc.previousAutoTable.finalY + 10);
	return { lastPosition: pdfDoc.previousAutoTable.finalY + 10 };
}

const _renderTotal_	=	async	(pdfDoc, params, lastPosition)	=>	{
	let total = [
		[
			'',
			{
				content : 'Total: ',
			},
			'',
			{
				content : 'SGD 10,560',
			},
			''
		],
		[
			'',
			{
				content : 'Amount Due: ',
			},
			'',
			{
				content : 'SGD 120',
				styles: {
					fontStyle: 'bold',
					textColor: '#333'
				}
			},
			''
		],
	];
	pdfDoc.autoTable({
		theme: 'plain',
		margin: { top: 0, bottom: 0, left: 5, right: 5 },
		startY: lastPosition + 5,
		// startY: 210,
		columns: ['', '', '', '', ''],
		styles: {
			font: 'helvetica',
			halign: 'right',
			valign: 'middle'
		},
		columnStyles: {
			0:  {
				cellWidth: 120,
			},
			1:  {
			},
			2:  {
				cellWidth: 3,
			},
			3:  {
				
			},
			4:  {
				cellWidth: 8
			},
		},
		body: total,
	})

	pdfDoc.line(130, lastPosition + 12, 195, lastPosition + 12);
	return { lastPosition: pdfDoc.previousAutoTable.finalY + 10 };
}

const _renderFooter_	=	async	(pdfDoc, lastPosition)	=>	{
	let stamp = await _getBase64Image_(window.location.origin + '/assets/img/invoice bottom stamp.png');
	pdfDoc.addImage(stamp, "PNG", pdfDoc.internal.pageSize.getWidth() - 50, lastPosition + 20, 35, 35);
	
	let paymentInfo = [
		[
			{
				content : 'Payment Information',
				styles: {
					textColor: '#009ec8',
					fontSize: 12,
				},
			},
		],
		[],
		[
			{
				content : 'Corporate PayNow',
				styles: {
					fontSize: 11,
					textColor: '#333',
					fontStyle: 'bold'
				}
			},
		],
		[
			'UEN: 201415681W'
		],
		[],
		[
			{
				content : 'Bank Transfer:',
				styles: {
					fontSize: 11,
					textColor: '#333',
					fontStyle: 'bold'
				}
			},
		],
		[
			'Account Name: Medicloud Pte Ltd'
		],
		[
			'Bank Name: UNITED OVERSEAS BANK LIMITED'
		],
		[
			'Bank A/C: 374-3069-399'
		],
		[
			'Swift Code: UOVBSGSG - UNITED OVERSEAS BANK LIMITED'
		],
		[
			'Bank Address: 3 Temasek Boulevard #02-735/736 Suntec City Mall Singapore 038987'
		],
		[],
		[
			{
				content : 'Please contact us for any questions related to your invoice/contract at',
				styles: {
					textColor: '#222',
				}
			},
		],
		[
			{
				content : 'happiness@mednefits.com',
				styles: {
					textColor: '#222',
				}
			},
		],
		[
			''
		],
		[
			'Notes:Note for this invoice'
		],
		[
			{
				content : 'Please send all payment advice to finance@mednefits.com',
				styles: {
					textColor: '#222',
				}
			},
		],
	];
	pdfDoc.autoTable({
		theme: 'plain',
		margin: { top: 0, bottom: 0, left: 14, right: 14 },
		startY: lastPosition - 10,
		// startY: 215,
		columns: ['', '', '', '', ''],
		styles: {
			font: 'helvetica',
			cellPadding: 0,
			fontSize: 9,
			textColor: '#666'
		},
		body: paymentInfo,
		pageBreak: 'auto'
	})
	let copyright = [
		[
			{
				content: '© 2020 Mednefits. All rights reserved',
			}
		],
	];
	pdfDoc.autoTable({
		theme: 'plain',
		margin: { top: 0, bottom: 0, left: 14, right: 14 },
		startY: pdfDoc.previousAutoTable.finalY + 10,
		columns: [''],
		styles: {
			font: 'helvetica',
			cellPadding: 0,
			fontSize: 9,
			textColor: '#666',
			valign: 'middle',
			halign: 'center',
		},
		body: copyright,
	})

	return true;
}

const _getAccountType_	=	(type)	=>	{
	if(type == 'stand_alone_plan'){
		return 'Pro Plan';
	}
	if(type == 'insurance_bundle'){
		return 'Insurance Bundle';
	}
	if(type == 'trial_plan'){
		return 'Trial Plan';
	}
	if(type == 'lite_plan'){
		return 'Lite Plan';
	}
}

const	_generateTblBody_	=	(params)	=>	{
	let promise = new Promise((resolve, reject) => {
		let result = [];
		let rows = params.rows;
		let cols = params.cols;
		params.data.map((row, rowKey) =>  {
			let tempRow = [];
			row.map((col, colKey)  =>  {
				if(colKey == 0){
					tempRow.push({
						content: '',
					});
				}
				tempRow.push({
					content: col.content,
					styles: col.style ? col.style : {},
					rowSpan: col.options ? col.options.rowSpan : 1,
				});
				if(colKey == row.length - 1){
					tempRow.push({
						content: '',
					});
					result.push(tempRow);
					if(rowKey == rows - 1){
						resolve(result);
						return result;
					}
				}
			});
		});
	});
	return promise;
}

const _formatEmployeeInvoiceBody_	=	async	(params)	=>{
	let tblData  = {
		rows: 9,
		cols: 4,
		data : [
			[
				{
					content: params.plan_type.plan_name,
					style: {
						fontSize: 11,
						fontStyle: 'bold'
					},
				},
				{
					content: params.employees,
					options:  {
						rowSpan: 8,
					}
				},
				{
					content: params.currency_type.toUpperCase() + ' ' + (parseFloat( params.individual_price ).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
					options:  {
						rowSpan: 8,
					}
				},
				{
					content: params.currency_type.toUpperCase() + ' ' + (parseFloat( params.amount ).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
					options:  {
						rowSpan: 8,
					}
				},
			],
			[
				{
					content: 'Active Type: ' + _getAccountType_(params.account_type),
				},
			],
			[
				{
					content: 'Active Plan ID: #' + params.customer_active_plan_id,
				},
			],
			[
				{
					content: 'No. of employees: ' + params.employees,
				},
			],
			[
				{
					content: 'Billing Frequency: Annual',
				},
			],
			[
				{
					content: 'Start Date: ' + moment(params.plan_start, 'YYYY-MM-DD').format('DD MMMM, YYYY'),
				},
			],
			[
				{
					content: 'End Date: ' + moment(params.plan_end, 'YYYY-MM-DD').format('DD MMMM, YYYY'),
				},
			],
			[
				{
					content: 'Plan Duration: ' + params.duration,
				},
			],
			[
				{
					content: '',
				},
			],
		]
	}
	params.dependents.map((value, key)  =>  {
		tblData.data.push([
			{
				content: 'Active Plan Type: ' + _getAccountType_(value.account_type),
			},
			{
				content: value.total_dependents,
				options: {
					rowSpan: 5,
				}
			},
			{
				content: value.currency_type.toUpperCase() + ' ' + (parseFloat( value.individual_price ).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
				options: {
					rowSpan: 5,
				}
			},
			{
				content: value.currency_type.toUpperCase() + ' ' + (parseFloat( value.amount ).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
				options: {
					rowSpan: 5,
				}
			},
		]);
		tblData.data.push([
			{
				content: 'No. of dependents: ' + value.total_dependents,
			}
		]);
		tblData.data.push([
			{
				content: 'Start Date: ' + moment(value.plan_start, 'YYYY-MM-DD').format('DD MMMM, YYYY'),
			}
		]);
		tblData.data.push([
			{
				content: 'End Date: ' + moment(value.plan_end, 'YYYY-MM-DD').format('DD MMMM, YYYY'),
			}
		]);
		tblData.data.push([
			{
				content: 'Plan Duration: ' + value.plan_end,
			}
		]);
	});
	console.log(tblData);
	return await _generateTblBody_(tblData);
};
// ----------------------------------------------- //

const _downloadEmployeePlanDetails_ = (params, isDownload)	=> {
	let	url	=	Config.DOWNLOAD_EMPLOYEE_PLAN + '?customer_id=' + params.customer_id + '&customer_active_plan_id=' + params.customer_active_plan_id + '&token=' + localStorage.vue_admin_session;
	if(isDownload){
		return window.open(url);
	}else{
		let	req	=	{
			method:	'GET',
			url:	url,
			header:	defaultHeaders,
		};
		return _axiosCall_(req);
	}
}

const _updateSpendingAccoutSettings_ = (params) => {
	let	req	=	{
		method:	'PUT',
		url:	Config.UPDATE_SPENDING_ACCOUNT_SETTINGS,
    data: params,
		header:	defaultHeaders,
	};
	return _axiosCall_(req);
}
const _downloadSpendingDepositInvoice_ = (params, isDownload)	=> {
	let	url	=	Config.DOWNLOAD_SPENDING_DEPOSIT + '?customer_spending_deposit_credit_id=' + params.customer_spending_deposit_credit_id + '&token=' + localStorage.vue_admin_session;
	if(isDownload){
		return window.open(url);
	}else{
		let	req	=	{
			method:	'GET',
			url:	url,
			header:	defaultHeaders,
		};
		return _axiosCall_(req);
	}
}

const _downloadEmployeeRefundInvoice_ = (params, isDownload)	=> {
	let	url	=	Config.DOWNLOAD_EMPLOYEE_REFUND + '?customer_id=' + params.customer_id + '&customer_employee_plan_payment_refund_id=' + params.customer_employee_plan_payment_refund_id + '&token=' + localStorage.vue_admin_session;
	if(isDownload){
		return window.open(url);
	}else{
		let	req	=	{
			method:	'GET',
			url:	url,
			header:	defaultHeaders,
		};
		return _axiosCall_(req);
	}
}

const _downloadPlanExtensionInvoice_ = (params, isDownload)	=> {
	let	url	=	Config.DOWNLOAD_PLAN_EXTENSION + '?customer_id=' + params.customer_id + '&customer_active_plan_id=' + params.customer_active_plan_id + '&token=' + localStorage.vue_admin_session;
	if(isDownload){
		return window.open(url);
	}else{
		let	req	=	{
			method:	'GET',
			url:	url,
			header:	defaultHeaders,
		};
		return _axiosCall_(req);
	}
}

const _downloadDependentRefundInvoice_ = (params, isDownload)	=> {
	let	url	=	Config.DOWNLOAD_DEPENDENT_REFUND + '?customer_id=' + params.customer_id + '&dependent_payment_refund_id=' + params.dependent_payment_refund_id + '&token=' + localStorage.vue_admin_session;
	if(isDownload){
		return window.open(url);
	}else{
		let	req	=	{
			method:	'GET',
			url:	url,
			header:	defaultHeaders,
		};
		return _axiosCall_(req);
	}
}

const _updateMarkUsUnpaid_ = (params) => {
	let	req	=	{
		method:	'PUT',
		url:	Config.UPDATE_UNPAID,
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
	_updateAccountPlanType_,
	_updateDependentRecordRefund_,
	_createPlanExtension_,
	_activatePlanExtension_,
	_downloadPDFInvoice_,
	_getAccountType_,
	_updateEmpRefundRecordPayment_,
	_downloadEmployeePlanDetails_,
	_updateSpendingDeposit_,
	_planExtensionRecordPayment_,
	_spendingDepositRecordPayment_,
	_updateEditPlanExtension_,
	_updateSpendingAccoutSettings_,
	_downloadSpendingDepositInvoice_,
	_downloadEmployeeRefundInvoice_,
	_downloadPlanExtensionInvoice_,
	_downloadDependentRefundInvoice_,
	_updateMarkUsUnpaid_,
}