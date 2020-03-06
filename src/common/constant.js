
const STAGING = 'http://api-admin.medicloud.sg';
const LOCAL = 'http://localhost:3000';

// const SERVERURL = LOCAL;
const SERVERURL = STAGING;

const AUTH_LOGIN = `${SERVERURL}/login/signin`;
// company
const COMPANY_DETAILS = `${SERVERURL}/company/corporate_details`;
const COMPANY_PLAN_HEADCOUNT = `${SERVERURL}/company/add_customer_plan_head_count`;


// employee
const EMPLOYEE_DETAILS = `${SERVERURL}/company/get_employee_details`;

const EMPLOYEE_LIST = `${SERVERURL}/company/employee_lists`;

const SEARCH_EMPLOYEE_LIST = `${SERVERURL}/company/employee_lists`;

const UPDATE_BULK_CREDIT = `${SERVERURL}/company/employee_allocate_credits`;

const CAP_VISIT_LIST = `${SERVERURL}/company/getCapVisitList`;

const DOWNLOAD_EMP_DEPENDENT = `${SERVERURL}/company/downloadEmployeeDependent`;

const UPLOAD_FILE_CAP = `${SERVERURL}/company/uploadCapVisitFile`;

const UPDATE_CAP_VISIT = `${SERVERURL}/company/CapVisit`;

const LOGIN_ACCESS_ACCOUNT = `${SERVERURL}/company/settings_access_account`;

module.exports = {
	AUTH_LOGIN,
	COMPANY_DETAILS,
	EMPLOYEE_DETAILS,
	EMPLOYEE_LIST,
	SEARCH_EMPLOYEE_LIST,
	UPDATE_BULK_CREDIT,
	COMPANY_PLAN_HEADCOUNT,
	CAP_VISIT_LIST,
	DOWNLOAD_EMP_DEPENDENT,
	UPLOAD_FILE_CAP,
	UPDATE_CAP_VISIT,
	LOGIN_ACCESS_ACCOUNT
}