
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
const ENROLL_EMPLOYEE_EXCEL = `${SERVERURL}/company/excel_enrollment`;
const ENROLLMENT_TEMP_EMPLOYEES = `${SERVERURL}/company/get_temp_enrollees`;
const UPDATE_TEMP_EMPLOYEES = `${SERVERURL}/company/update_employee_enrollment`;
const DELETE_TEMP_EMPLOYEES = `${SERVERURL}/company/remove_enrollee`;
const COMPANY_SPENDING_ACCOUNT_STATUS = `${SERVERURL}/company/get_spending_account_status`;
const UPDATE_TEMP_DEPENDENTS = `${SERVERURL}/company/updateDependentEnrolleeDetails`;
const ENROLL_TEMP_EMPLOYEES = `${SERVERURL}/company/finish_enroll_employee`;

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
	LOGIN_ACCESS_ACCOUNT,
	ENROLL_EMPLOYEE_EXCEL,
	ENROLLMENT_TEMP_EMPLOYEES,
	UPDATE_TEMP_EMPLOYEES,
	DELETE_TEMP_EMPLOYEES,
	COMPANY_SPENDING_ACCOUNT_STATUS,
	UPDATE_TEMP_DEPENDENTS,
	ENROLL_TEMP_EMPLOYEES
}