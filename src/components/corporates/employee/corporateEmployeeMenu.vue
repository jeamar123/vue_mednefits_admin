<script>
import axios from "axios";
import moment from "moment"
import Loader from "../../../views/loader/Loader";

import { 
	_getEmployeeDetailsData_ ,
	_globalStorage_
} from '../../../common/functions/common_functions';

let corporateEmployeeMenu = {
	components: {
		Loader,
	},
	props: {
		customer_id: [String, Number],
		member_id: [String, Number],
	},
	data() {
		return {
			// --- Loader ------
			showLoader: false,
			// -----------------
			// ---- Data storage ------
			employee_side_info: {
				spending_account: {
					medical: {
						// usage: false,
					},
					wellness: {
						// usage: false,
					},
				}
			},
			// ------------------------
			data: null,
			sideBar: {
				trigger: false,
			},
			activeTab: this.$route.name,
		};
	},
	created() {
		console.log(this.customer_id, this.member_id);
		console.log(this.$route);

		this.onLoad();
	},
	mounted() {},
	methods: {
		fromSettings(data) {
			// this.employee_side_info = data.from_settings;
			console.log(data);
			if (data) {
				this.onLoad();
				console.log('sulod');
			}
		},
		fromEntitlement(data) {
			// this.employee_side_info = data.from_settings;
			console.log(data);
			if (data) {
				this.onLoad();
				console.log('sulod');
			}
		},
		fromEmployee(data) {
			console.log(data);
			if (data) {
				this.getEmployeeSideDetails();
			}
		},
		formatDate(date, from, to) {
			if (date != null) {
				return moment(date, from).format(to);
			}
		},
		spendingUsage(type) {
			if (type == 'medical') {
				this.employee_side_info.spending_account.medical.usage = !this.employee_side_info.spending_account.medical.usage;
				this.$forceUpdate();
				// console.log(`medical usage ${this.employee_side_info.spending_account.medical.usage}`);
			} else {
				this.employee_side_info.spending_account.wellness.usage = !this.employee_side_info.spending_account.wellness.usage;
				this.$forceUpdate();
			}

		},
		// --- Methods Loader ------
		showLoading() {
			this.showLoader = true;
		},
		hideLoading() {
			this.showLoader = false;
		},
		// --------------------------
		toggleSideInfoBar(opt) {
			//sidebar information in mobile view
			this.sideBar.trigger = !this.sideBar.trigger;
		},
		showEmpSelectorInfo(page) {
			console.log(page);
			this.activeTab = page;
			this.$router.push({ name: page });
		},

		// API calls
		onLoad() {
			// this.$parent.showLoading();
			// let get_employee_details = `${axios.defaults.serverUrl}/company/get_employee_details?member_id=${this.member_id}`;

			axios.all([ //butang sa array ang ipa load na api or function para in order pag tawag.
				// axios.get(get_employee_details),
				this.getEmployeeSideDetails(),
			]).then(res => {
				// console.log(res);
				// this.$parent.hideLoading();
			}).catch(error => {
				// if there's an error, log it
				console.log(error);
				// this.parent.hideLoading();
			});
		},
		async getEmployeeSideDetails() {
			// for single  buttons or manual trigger
			let params	=	{ 
				member_id :	this.member_id 
			};
			this.employee_side_info = await _getEmployeeDetailsData_(params);
			console.log( this.employee_side_info );
			if ( this.employee_side_info.medical_entitlement_status != null ) {
				this.medEffectiveDate = moment(this.employee_side_info.medical_entitlement_status.effective_date).format('DD/MM/YYYY');
			}
			if ( this.employee_side_info.wellness_entitlement_status != null ) {
				this.wellEffectiveDate = moment(this.employee_side_info.wellness_entitlement_status.effective_date).format('DD/MM/YYYY');
			}

			// let get_employee_details = `${axios.defaults.serverUrl}/company/get_employee_details?member_id=${this.member_id}`;
			// axios.get(get_employee_details)
			// 	.then(res => {
			// 		// Log the data to the console
			// 		// You would do something with both sets of data here
			// 		console.log(res);
			// 		if (res.data.status == true) {
			// 			this.employee_side_info = res.data.data;
			// 			// localStorage.employee_email = this.employee_side_info.work_email;

			// 			if ( this.employee_side_info.medical_entitlement_status != null ) {
			// 				this.medEffectiveDate = moment(this.employee_side_info.medical_entitlement_status.effective_date).format('DD/MM/YYYY');
							
			// 			}
			// 			if ( this.employee_side_info.wellness_entitlement_status != null ) {
			// 				this.wellEffectiveDate = moment(this.employee_side_info.wellness_entitlement_status.effective_date).format('DD/MM/YYYY');
			// 			}
						
			// 			this.hideLoading();
			// 			console.log(this.employee_side_info);
			// 		}
			// 		// this.$parent.hideLoading();
			// 	}).catch(error => {
			// 		// if there's an error, log it
			// 		console.log(error);
			// 		// this.$parent.hideLoading();
			// 	});
		}
	}
}

export default corporateEmployeeMenu
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateEmployee.scss";
</style>
