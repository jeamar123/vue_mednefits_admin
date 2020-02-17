<script>
import Modal from "../../../views/modal/Modal.vue";
import jobList from '../../../assets/json/job.json';
import axios from "axios";
import moment from "moment"


let corporateEmployeeInformation = {
	components: {
		Modal
	},
	props: {
		member_id: [String, Number],
		name: [String, Number],
		customer_id: [String, Number],
	},
	data:	()	=>	{
		return {
			// --- Date options ---
			formats: {
				input: ["DD/MM/YYYY"],
				data: ["DD/MM/YYYY"]
			},
			//---------------------
			empSelectorActive: {
				value: 0,
				text: ""
			},
			editEmployeeProfile: false,
			addDependentInfo: false,
			editRemoveEmpInfo: false,
			remove_step_active: "remove-emp",
			removeBackBtn: false,
			editReplaceDependentInfo: false,
			withdrawEmployeeModal: false,
			inNetworkClaimSummaryModal: false,
			editDependentInfo: false,
			showInNetwork: false,
			showOutNetwork: false,
			spendingTypeOpt: "medical",
			step_active: 1,
			showTimeVisitDropdown: false,
			showDaytimeOption: false,
			showTimeOption: false,
			showSetupAccountModal: false,
			showClaimTypeListOption: false,
			showMemberListOption: false,
			showRenewModal: false,
			showManageCapPerVisit: false,
			showSmsUpdateNotify: false,
			selected_emp_details_opt: 0,
			editCreditAllocationOpt: "medical",
			editCreditAllocationTypeOpt: "add",
			showEmpCreditsPlan: false,
			emp_details_replace: false,
			emp_details_reserve: false,
			emp_details_remove: false,
			starDateDetails: {
				startDate: undefined
			},
			showShortTermSelector: false,
			formats: {
				input: ["DD/MM/YYYY"],
				data: ["DD/MM/YYYY"]
			},
			// ---- Data storage ------
			//employee
			employee_info: {
				spending_account: {
					medical: {},
					wellness: {},
				}
			},
			toEdit: {},
			toRemove: {},
			toReplace: {},
			jobList: jobList,
			//dependent
			toAddDep: {}
			// ------------------------
		};
	},
	created() {
		// console.log(jobList);
		this.healthPartnerViewStatus = this.$route.name;

		this.onLoad();
	},
	methods: {
		formatDate(date, from, to) {
			if (date != null) {
				return moment(date, from).format(to);
			}
		},
		// - New methotds -

		// API calls
		onLoad() {
			this.showLoading();
			// let get_employee_details = `${axios.defaults.serverUrl}/company/get_employee_details?member_id=${this.member_id}`;
			// let update_employee_details = `${axios.defaults.serverUrl}/company/update_employee_details`;

			axios.all([ //butang sa array ang ipa load na api or function para in order pag tawag.
				// axios.get(get_employee_details),
				this.getEmployeeDetails(),
			]).then(res => {
				// Log the data to the console
				// You would do something with both sets of data here
				// console.log(res);
				let res_len = res.length;
				res.map((value, index) => {
					if (index == res.length - 1) {
						// this.hideLoading();
					}
				});
			}).catch(error => {
				// if there's an error, log it
				console.log(error);
				this.parent.hideLoading();
			});
		},
		addDependent(toAddDep) {
			let create_dependent_account = `${axios.defaults.serverUrl}/company/create_dependent_account`;

			if (this.checkForm_addDependent(toAddDep)) {
				toAddDep.dob = moment(toAddDep.dob.dob).format('YYYY-MM-DD');
				toAddDep.plan_start = moment(toAddDep.plan_start).format('YYYY-MM-DD');

				let data = {
					member_id: this.member_id,
					customer_id: this.customer_id,
					dependents: [toAddDep]
				}
				axios.post(create_dependent_account, data)
					.then(res => {
						console.log(res);
						if (res.data.status == true) {
							console.log(res.data);
							this.$swal("Success!", res.data.message, "success")
								.then(res => {
									// this.getEmployeeDetails();
									this.showAddDependent();
								});
						} else {
							this.$swal("Warning!", res.data.message, "warning");
						}
					})
					.catch(err => {
						this.editEmployeeProfile = false;
						this.hideLoading();
						this.errorHandler(err);
					});
			}
		},
		update_communication_type(value) {
			let update_employee_details = `${axios.defaults.serverUrl}/company/update_employee_details`;
			let data  = {
				member_id: this.member_id,
				communication_type: value
			}

			axios.put(update_employee_details, data)
				.then(res => {
					console.log(res);
					if (res.status == 200) {
						console.log(res.data);
						this.$swal("Success!", 'Update Successful', "success")
							.then(res => {
								this.getEmployeeDetails();
							});
					} else {
						this.$swal("Error!", res.data.message, "error");
					}
				})
				.catch(err => {
					this.editEmployeeProfile = false;
					this.hideLoading();
					this.errorHandler(err);
				});
		},
		update_employee() {
			let update_employee_details = `${axios.defaults.serverUrl}/company/update_employee_details`;
			let data = this.toEdit;

			if (this.checkForm_edit()) {
				axios.put(update_employee_details, data)
					.then(res => {
						console.log(res);
						if (res.status == 200) {
							console.log(res.data);
							this.$swal("Success!", 'Update Successful', "success")
								.then(res => {
									this.getEmployeeDetails();
									this.$emit('FromEmployee', true);
									// this.editEmployeeProfile = false;
								});
						} else {
							this.$swal("Error!", res.data.message, "error");
						}
					})
					.catch(err => {
						this.editEmployeeProfile = false;
						this.hideLoading();
						this.errorHandler(err);
					});
			}
		},
		getEmployeeDetails() {
			// for single  buttons or manual trigger
			let get_employee_details = `${axios.defaults.serverUrl}/company/get_employee_details?member_id=${this.member_id}`;
			axios.get(get_employee_details)
				.then(res => {
					// Log the data to the console
					// You would do something with both sets of data here
					console.log(res);
					if (res.status == 200) {
						this.employee_info = res.data.data;
						// localStorage.employee_email = this.employee_info.work_email;
						console.log(this.employee_info);
						this.hideLoading();
					}
					// this.hideLoading();
				}).catch(err => {
					this.hideLoading();
					this.errorHandler(err);
				});
		},
		checkForm_edit() {
			this.error_updateEmployee = [];

			if (!this.toEdit.fullname) {
				this.error_updateEmployee.push("Name.");
			}
			if (!this.toEdit.phone_code) {
				this.error_updateEmployee.push("Area Code.");
			}
			if (!this.toEdit.phone_no) {
				this.error_updateEmployee.push("Mobile Number.");
			}
			if (!this.toEdit.member_id) {
				this.error_updateEmployee.push("Member ID.");
			}
			if (!this.toEdit.job_title) {
				this.error_updateEmployee.push("Job Title.");
			}
			if (!this.toEdit.dob) {
				this.error_updateEmployee.push("Birthday.");
			}
			// if (!this.toEdit.bank_account_number) {
			// 	this.error_updateEmployee.push("Bank Account Number.");
			// }
			// if (!this.toEdit.postal_code) {
			// 	this.error_updateEmployee.push("Postal Code.");
			// }
			// if (!this.toEdit.bank_code) {
			// 	this.error_updateEmployee.push("Bank Code.");
			// }
			// if (!this.toEdit.bank_brh) {
			// 	this.error_updateEmployee.push("Bank BRH.");
			// }

			if (!this.toEdit.email) {
				this.error_updateEmployee.push('Email.');
			} else if (!this.validEmail(this.toEdit.email)) {
				this.error_updateEmployee.push('Valid email.');
			}

			if (!this.error_updateEmployee.length) {
				return true;
			} else {
				console.log(this.error_updateEmployee);
				let new_error = [];
				this.error_updateEmployee.map(value => {
					new_error.push(`<span class="block p-1 text-red-500 text-center w-1/2 mx-auto my-0">${value}</span>`);
				});
				this.$swal(
					'Required',
					new_error.join('\n\n'),
					'warning'
				);

			}
		},
		checkForm_addDependent(data) {
			this.error_addDep = [];

			if (!data.fullname) {
				this.error_addDep.push("Name.");
			}
			if (!data.dob) {
				this.error_addDep.push("Birthday.");
			}
			if (!data.relationship) {
				this.error_addDep.push("Relationship.");
			}
			if (!data.plan_start) {
				this.error_addDep.push("Start Date.");
			}

			if (!this.error_addDep.length) {
				return true;
			} else {
				console.log(this.error_addDep);
				let new_error = [];
				this.error_addDep.map(value => {
					new_error.push(`<span class="block p-1 text-red-500 text-center w-1/2 mx-auto my-0">${value}</span>`);
				});
				this.$swal(
					'Required',
					new_error.join('\n\n'),
					'warning'
				);

			}
		},
		validEmail(email) {
			let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
		//-------------
		selectHealthPartnerView(opt) {
			this.healthPartnerViewStatus = opt;
			this.$router.push({ name: opt });
		},
		showEmpSelectorInfo(value, text) {
			this.empSelectorActive.value = value;
			this.empSelectorActive.text = text;
		},
		showEditEmp() {
			this.editEmployeeProfile = this.editEmployeeProfile == false ? true : false;

			this.toEdit = {
				fullname: this.employee_info.fullname,
				phone_code: String(this.employee_info.phone_code),
				phone_no: this.employee_info.phone_no,
				member_id: this.employee_info.member_id,
				job_title: this.employee_info.job_title,
				dob: new Date(this.employee_info.dob),
				bank_account_number: this.employee_info.bank_account_number,
				postal_code: String(this.employee_info.postal_code),
				bank_code: this.employee_info.bank_code,
				email: this.employee_info.work_email,
				bank_brh: this.employee_info.bank_brh,
				// communication_type: this.employee_info.communication_type,
			}
		},
		showAddDependent() {
			this.toAddDep = {};
			this.addDependentInfo = this.addDependentInfo == false ? true : false;

		},
		showRemoveEmp() {
			this.editRemoveEmpInfo = this.editRemoveEmpInfo == false ? true : false;

			this.toRemove = {
				member_id: this.employee_info.member_id,
				fullname: this.employee_info.fullname,
				last_day: new Date(moment().add(1, 'days')),
			}
		},
		showReplaceDependent() {
			this.editReplaceDependentInfo =
				this.editReplaceDependentInfo == false ? true : false;
		},
		showRemoveDependent() {
			this.withdrawEmployeeModal =
				this.withdrawEmployeeModal == false ? true : false;
		},
		showEditDependent() {
			this.editDependentInfo = this.editDependentInfo == false ? true : false;
		},
		removeEmployeeBtn(data) {
			let x = data;

			if (x === "back") {
				this.emp_details_replace = false;
				this.emp_details_reserve = false;
				this.emp_details_remove = false;
				if (this.remove_step_active == "remove-opt") {
					this.removeBackBtn = false;
					this.remove_step_active = "remove-emp";
				}

				if (this.remove_step_active == "replace-emp") {
					this.remove_step_active = "remove-opt";
					this.emp_details_replace = false;
				}

				if (this.remove_step_active == "health-spending-summary") {
					this.remove_step_active = "remove-opt";
					this.emp_details_reserve = false;
				}

				if (this.remove_step_active == "health-spending-account") {
					this.remove_step_active = "health-spending-summary";
					this.emp_details_remove = false;
				}
			}

			if (x === "next") {
				if (this.remove_step_active == "remove-emp") {
					this.removeBackBtn = true;
					this.remove_step_active = "remove-opt";
				} else if (this.remove_step_active == "remove-opt") {
					if (this.emp_details_replace) {
						this.remove_step_active = "replace-emp";
					} else if (this.emp_details_reserve) {
						this.remove_step_active = "health-spending-summary";
					} else if (this.emp_details_remove) {
						this.remove_step_active = "health-spending-summary";
					} else {
						this.$swal('Warning', 'Select 1 Option', 'warning');
					}
				} else if (this.remove_step_active == "replace-emp") {
					this.remove_step_active = "health-spending-summary";
				} else if (this.remove_step_active == "health-spending-summary") {
					this.remove_step_active = "health-spending-account";
				}
			}
		},
		changeRemoveOption(opt) {
			this.emp_details_replace = false;
			this.emp_details_reserve = false;
			this.emp_details_remove = false;

			if (opt === 1) {
				this.emp_details_replace = !this.emp_details_replace;
			}
			if (opt === 2) {
				this.emp_details_reserve = !this.emp_details_reserve;
				console.log("2 ni siya");
			}
			if (opt === 3) {
				this.emp_details_remove = !this.emp_details_remove;
				console.log("3 ni siya");
			}
		},
		inNetworkSubmit() {
			this.inNetworkClaimSummaryModal =
				this.inNetworkClaimSummaryModal == false ? true : false;
		},
		toggleShowInNetwork(data) {
			let x = data;
			if (x === "in-network") {
				this.showInNetwork = true;
			} else if (x === "cancel") {
				this.showInNetwork = false;
			}
		},
		toggleShowOutNetwork(data) {
			let x = data;
			if (x === "out-network") {
				this.showOutNetwork = true;
			} else if (x === "cancel") {
				this.showOutNetwork = false;
			}
		},
		editInNetworkOpt() {
			this.showOutNetwork = true;
		},
		claimTypeListOption() {
			this.showClaimTypeListOption =
				this.showClaimTypeListOption == false ? true : false;
		},
		memberListOption() {
			this.showMemberListOption =
				this.showMemberListOption == false ? true : false;
		},
		setSpendingType(opt) {
			this.spendingTypeOpt = opt;
		},
		clickedTimeVisitDropdown() {
			this.showTimeVisitDropdown =
				this.showTimeVisitDropdown == false ? true : false;
		},
		clickedTimeOption() {
			this.showTimeOption = this.showTimeOption == false ? true : false;
		},
		clickedDaytimeOption() {
			this.showDaytimeOption = this.showDaytimeOption == false ? true : false;
		},
		empDetailsOutNetworkNextBackBtn(data) {
			let x = data;
			if (x === "next") {
				if (this.step_active == 1) {
					this.step_active = 2;
				} else if (this.step_active == 2) {
					this.step_active = 3;
				}
			}
			if (x === "back") {
				if (this.step_active == 2) {
					this.step_active = 1;
				} else if (this.step_active == 3) {
					this.step_active = 2;
				}
			}
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
				}
			}

			if (y == 1) {
				if (x === "renew-plan") {
					this.showRenewModal = true;
				} else if (x === "cancel") {
					this.showRenewModal = false;
				}
			}

			if (y == 2) {
				if (x === "manage-visit") {
					this.showManageCapPerVisit = true;
				} else if (x === "cancel") {
					this.showManageCapPerVisit = false;
				}
			}

			if (y == 3) {
				if (x === "sms-update-notify") {
					this.showSmsUpdateNotify = true;
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
			} else if (x === "cancel") {
				this.showEmpCreditsPlan = false;
			}
		},
		shortTermRadioBtn(data) {
			let x = data;
			if (x === "short-term") {
				this.showShortTermSelector = true;
			} else if (x === "standard-one-year") {
				this.showShortTermSelector = false;
			}
		},
	}
};

export default corporateEmployeeInformation;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateEmployee.scss";
// Responsive
@media (max-width: 1279px) {
	/* ... */
	.account-summary-pro-rated {
		text-align: center;
		display: grid;
		grid-row-gap: 10px;
		width: 100%;
		.health-spending-dpicker {
			width: 80%;
			padding: 6px 20px;
		}
	}
}

/* Large (lg) */

@media (max-width: 1023px) {
	/* ... */
}

/* Medium (md) */

@media (max-width: 767px) {
	/* ... */
	.employee-menu-container {
		.emp-information-details {
			grid-template-columns: 1fr;
		}
	}
	.medical-wellness-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-row-gap: 10px;
	}
}

/* Small (sm) */

@media (max-width: 640px) {
	/* ... */
}
</style>
