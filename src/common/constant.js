
const STAGING = 'http://api-admin.medicloud.sg';
const LOCAL = 'http://localhost:3000';

// const SERVERURL = LOCAL;
const SERVERURL = STAGING;

const AUTH_LOGIN = SERVERURL + '/login/signin';
const COMPANY_DETAILS = SERVERURL + '/company/corporate_details';


module.exports = {
	AUTH_LOGIN,
	COMPANY_DETAILS
}