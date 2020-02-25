
const STAGING = 'http://api-admin.medicloud.sg';
const LOCAL = 'http://localhost:3000';

// const SERVERURL = LOCAL;
const SERVERURL = STAGING;

const AUTH_LOGIN = SERVERURL + '/login/signin';
// company
const COMPANY_DETAILS = SERVERURL + '/company/corporate_details';


// employee
const EMPLOYEE_DETAILS = SERVERURL + '/company/get_employee_details';


module.exports = {
	AUTH_LOGIN,
	COMPANY_DETAILS,
	EMPLOYEE_DETAILS
}