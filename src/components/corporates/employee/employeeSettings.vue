<script>
import Modal from "../../../views/modal/Modal.vue";
import axios from "axios";
import moment from "moment";

let employeeSettings = {
	components: {
		Modal
	},
	props: {
		customer_id: [String, Number],
		member_id: [String, Number],
		name: [String, Number]
	},
	data() {
		return {
			// Modal Update - Reset //
			showSetupAccountModal: false,
			emp_padd_reset_wrapper: true,
			emp_pass_update: false,
			pin_setup_update: false,
			// END Modal //
			// data for reset pass and pin and sms update
			toSmsData: {},
			toUpdatePassword: {},
			member_email: '',
			showRenewModal: false,
			showManageCapPerVisit: false,
			showSmsUpdateNotify: false,
			selected_emp_details_opt: 0,
			editCreditAllocationOpt: 'medical',
			editCreditAllocationTypeOpt: 'add',
			showEmpCreditsPlan: false,
			starDateDetails: {
				startDate: undefined,
			},
			showShortTermSelector: false,
			formats: {
				input: ["DD/MM/YYYY"],
				data: ["DD/MM/YYYY"]
			},
			cap_per_visit: 0,
			showEmpRenewPlanSummary: false,
			// Sample data for re new plan modal 
			new_plan_start_date: undefined,
			credits_amount: '',
			plan_type: {
				fixed: "0",
				duration: '2 months',
				plan_start: undefined,
				end_date: '',
			},
			employee_info: {},
		};
	},
	created() {
		console.log(`${this.member_id} ug is ${this.name}`);
		this.onLoad();
	},
	methods: {
		selectHealthPartnerView(){
			this.$router.push({ name: 'HealthPartnerAccess', params: { type: 'employee', id: this.member_id } });
		},
		//SETTINGS BUTTON FOR SHOWING MODAL
		selectedEmpDetailsSettingsClicked(value, data) {
			let y = value;
			let x = data;

			if (y == 0) {
				if (x === "setup-reset-account") {
					this.showSetupAccountModal = true;
				} else if (x === "cancel") {
					this.showSetupAccountModal = false;
					this.emp_padd_reset_wrapper = true;
					this.emp_pass_update = false;
					this.pin_setup_update = false;
				}
			}

			if (y == 1) {
				if (x === "renew-plan") {
					this.showRenewModal = true;
					this.employee_info.start_date = moment(this.employee_info.start_date).format('MMMM DD, YYYY');
					console.log(this.employee_info.start_date);
				} else if (x === "cancel") {
					this.showRenewModal = false;
				}
			}

			if (y == 2) {
				if (x === "manage-visit") {
					this.showManageCapPerVisit = true;
					console.log(this.data_cap);
				} else if (x === "cancel") {
					this.showManageCapPerVisit = false;
				}
			}

			if (y == 3) {
				if (x === "sms-update-notify") {
					this.showSmsUpdateNotify = true;

					this.toSmsData = {
						phone_code: this.employee_info.phone_code,
						phone_no: this.employee_info.phone_no
					};
				} else if (x === "cancel") {
					this.showSmsUpdateNotify = false;
				}
			}

		},
		selectedEmpDetailsToggleOpt(opt) {
			this.selected_emp_details_opt = opt;
		},
		creditAllocationOption(opt) {
			this.editCreditAllocationOpt = opt;
		},
		creditAllocationTypeFunction(opt) {
			this.editCreditAllocationTypeOpt = opt;
		},
		openEmpCreditsPlan(data) {
			let x = data;
			if (x === "credits-plans") {
				this.showEmpCreditsPlan = true;
				console.log(this.plan_type.plan_start);
			} else if (x === "cancel") {
				this.showEmpCreditsPlan = false;
			}
		},
		// shortTermRadioBtn(data) {
		// 	let x = data;
		// 	if (x === "short-term") {
		// 		this.showShortTermSelector = true;
		// 	} else if (x === "standard-one-year") {
		// 		this.showShortTermSelector = false;
		// 	}
		// },
		updateCapPerVisit(cap) {
			console.log(cap);

			if (!cap || cap == null || cap == '') {
				this.$swal("Oops!", "Please input cap per visit", "error");
				return false;
			}
			this.data_cap = {
				employee_id: this.member_id,
				cap_amount: cap,
			}
			// console.log( data );

			axios.post(axios.defaults.serverUrl + '/company/updateEmployeeCap', this.data_cap)
				.then(response => {
					console.log(response);
					this.$swal("Success!", response.data.message, "success");
					this.showManageCapPerVisit = false;
					this.cap_per_visit = this.data_cap.cap_amount;
				})
				.catch(err => {
					this.$parent.hideLoading();
					this.errorHandler(err);
				});
		},

		// employee details options - JAZ
		showUpdatePass() {
			this.emp_padd_reset_wrapper = !this.emp_padd_reset_wrapper;
			this.emp_pass_update = !this.emp_pass_update;

			this.toUpdatePassword = {
				member_email: this.member_email,
				member_id: this.member_id,
			};
		},
		updatePasswordEmp(data) {

			let update_member_password = `${axios.defaults.serverUrl}/auth/update_member_password`;

			if (this.reset_pass_checkForm()) {
				axios.put(update_member_password, data)
					.then(res => {
						console.log(res);
						if (res.data.status == true) {
							this.$swal("Success!", 'Your password has been reset successfully', "success")
								.then(res1 => {
									this.showUpdatePass(); // cloase ang update password
									this.toUpdatePassword = {};
								});
						} else {
							this.$swal("Warning!", res.data.message, "warning");
						}
					})
					.catch(err => {
						this.$parent.hideLoading();
						this.errorHandler(err);
					});
			}
		},
		pinSetupShow() {
			this.emp_padd_reset_wrapper = !this.emp_padd_reset_wrapper;
			this.pin_setup_update = !this.pin_setup_update;
		},
		resend_reset_account() {
			// function here
			this.showLoading();
			let resend_employee_account = `${axios.defaults.serverUrl}/company/resend_employee_account`;
			let data = {
				member_id: this.member_id,
			}

			axios.post(resend_employee_account, data)
				.then(res => {
					console.log(res);
					if (res.data.status == true) {
						this.hideLoading();
						this.$swal("Success!", res.data.message, "success")
							.then(res1 => {
								// your additional functions to run after swal ok button clicked
							});
					} else {
						this.hideLoading();
						this.$swal("Warning!", res.data.message, "warning");
					}
				})
				.catch(err => {
					this.hideLoading();
					this.errorHandler(err);
				});
		},
		unPinSetup() {
			// function here
		},
		reset_pass_checkForm() {
			this.error_updatePassword = [];

			if (!this.toUpdatePassword.password) {
				this.error_updatePassword.push("Password.");
			}
			if (!this.toUpdatePassword.re_type_password) {
				this.error_updatePassword.push("Confirm Password.");
			}

			if (!this.error_updatePassword.length) {
				return true;
			} else {
				console.log(this.error_updateEmployee);
				let new_error = [];
				this.error_updatePassword.map(value => {
					new_error.push(`<span class="block p-1 text-red-500 text-center w-1/2 mx-auto my-0">${value}</span>`);
				});
				this.$swal(
					'Required',
					new_error.join('\n\n'),
					'warning'
				);
			}
		},
		send_sms_notification(data) {
			this.showLoading();
			let send_sms_specific = `${axios.defaults.serverUrl}/company/send_sms_specific`;

			if (this.send_sms_checkForm(data)) {
				data.member_id = this.member_id;
				axios.post(send_sms_specific, data)
					.then(res => {
						console.log(res);
						if (res.data.status == true) {
							this.hideLoading();
							this.$swal("Success!", res.data.message, "success")
								.then(res1 => {
									this.selectedEmpDetailsSettingsClicked(3, 'cancel'); // cloase ang SMS MODAL
									this.toSmsData = {}; // clear object
								});
						} else {
							this.hideLoading();
							this.$swal("Warning!", res.data.message, "warning");
						}
					})
					.catch(err => {
						this.$parent.hideLoading();
						this.errorHandler(err);
					});
			}
		},
		send_sms_checkForm(data) {
			this.error_sms_notif = [];

			if (!data.phone_code) {
				this.error_sms_notif.push("Area Code");
			}
			if (!data.phone_no) {
				this.error_sms_notif.push("Mobile Number");
			}

			if (!this.error_sms_notif.length) {
				return true;
			} else {
				console.log(this.error_sms_notif);
				let new_error = [];
				this.error_sms_notif.map(value => {
					new_error.push(`<span class="block p-1 text-red-500 text-center w-1/2 mx-auto my-0">${value}</span>`);
				});
				this.$swal(
					'Required',
					new_error.join('\n\n'),
					'warning'
				);
			}
		},
		//  -----------------------

		// Renew Plan Modal
		toggleEmpRenewPlanSummary() {
			if (this.showEmpRenewPlanSummary == false) {
				if (this.new_plan_start_date) {
					this.showEmpRenewPlanSummary = true;
					this.new_plan_start_date = moment(this.new_plan_start_date).format('MMMM DD, YYYY');
				} else {
					this.$swal("Error!", "Select New Plan Start first.", "error");
				}
			} else {
				this.showEmpRenewPlanSummary = false;
				this.new_plan_start_date = new Date(moment(this.new_plan_start_date, 'MMMM DD,YYYY'));
				// console.log(this.new_plan_start_date);
			}
		},
		updateEmpRenewPlanBtn(date) {
			var data = {
				member_id: this.member_id,
				plan_start: moment(this.new_plan_start_date).format('YYYY-MM-DD'),
			}

			console.log(data);
			this.showRenewModal = false;
			this.showEmpRenewPlanSummary = false;

			axios.put(axios.defaults.serverUrl + '/company/renew_plan', data)
				.then(response => {
					console.log(response);
					this.$swal("Success!", response.data.message, "success");
					this.new_plan_start_date = new Date(data.plan_start);
				})
				.catch(err => {
					this.$parent.hideLoading();
					this.errorHandler(err);
				});
		},
		submitUserCreditAllocation(credit) {
			if (credit && credit > 0) {
				var data = {
					member_id: this.member_id,
					customer_id: this.customer_id,
					spending_type: this.editCreditAllocationOpt,
					allocation_type: this.editCreditAllocationTypeOpt,
					credits: this.credits_amount,
				}

				axios.post(axios.defaults.serverUrl + '/company/employee_allocate_credits', data)
					.then(response => {
						// console.log(response.data.status);
						if (response.data.status) {
							this.$swal("Success!", response.data.message, "success")
							.then (response1 => { 
								this.getEmployeeDetails();
							});
						} else {
							this.$swal("Error!", response.data.message, "error");
						}
					})
					.catch(err => {
						this.$parent.hideLoading();
						this.errorHandler(err);
					});
			} else {
				this.$swal('Ooops!', 'Credits must be greater than zero.', 'error');
			}
		},
		updatePlanDetails() {
			var data = {
				member_id: this.member_id,
				plan_start: moment(this.plan_type.plan_start).format('YYYY-MM-DD'),
				plan_start: this.plan_type.plan_start,
				fixed: this.plan_type.fixed,
				duration: this.plan_type.duration,
			}

			axios.put(axios.defaults.serverUrl + '/company/update_plan_employee', data)
				.then(response => {
					console.log(response);
					console.log(data);
					this.$swal("Success!", response.data.message, "success");
				})
				.catch(err => {
					console.log(data);
					this.$parent.hideLoading();
					this.errorHandler(err);
				});
		},

		// Api calls
		getEmployeeDetails() {
			// for single  buttons or manual trigger
			let get_employee_details = `${axios.defaults.serverUrl}/company/get_employee_details?member_id=${this.member_id}`;
			axios.get(get_employee_details)
				.then(res => {
					// Log the data to the console
					// You would do something with both sets of data here
					console.log(res);
					if (res.status == 200) {
						this.member_email = res.data.data.work_email;
						this.employee_info = res.data.data;
						this.$emit('FromSettings', {from_settings: this.employee_info });
						// localStorage.employee_email = this.employee_info.work_email;
						console.log(this.employee_info);
					}
					// this.$parent.hideLoading();
				}).catch(err => {
					this.hideLoading();
					this.errorHandler(err);
				});
		},



		// ipa Last rani ang onLoad()
		onLoad() { // dri tawagon ang api na ipa load drtso
			this.showLoading();
			axios.all([ // para sunod ang pag tawag sa api(In-Order)
					this.getEmployeeDetails(),

				]).then(res => {
					//methods if naa
					let res_len = res.length;
					res.map((value, index) => {
						if (index == res.length - 1) {
							this.hideLoading();
						}
					});
				})
				.catch(err => {
					this.hideLoading();
					this.errorHandler(err);
				});
		}
	}
}

export default employeeSettings
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateEmployee.scss";
@media (max-width: 1280px) {
	/* ... */
}

/* Large (lg) */

@media (max-width: 1024px) {
	/* ... */
}

/* Medium (md) */

@media (max-width: 768px) {
	/* ... */
}

/* Small (sm) */

@media (max-width: 640px) {
	/* ... */
}
</style>
