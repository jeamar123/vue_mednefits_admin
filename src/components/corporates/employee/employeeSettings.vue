<script>
import Modal from "../../../views/modal/Modal.vue";
import axios from "axios";

let employeeSettings = {
	components: {
		Modal
	},
	props: {
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
			empSelectorActive: {
				value: 0,
				text: ""
			},
			editEmployeeProfile: false,
			addDependentInfo: false,
			editRemoveEmpInfo: false,
			remove_step_active: 'remove-emp',
			removeBackBtn: false,
			editReplaceDependentInfo: false,
			withdrawEmployeeModal: false,
			inNetworkClaimSummaryModal: false,
			editDependentInfo: false,
			showInNetwork: false,
			showOutNetwork: false,
			spendingTypeOpt: 'medical',
			step_active: 1,
			showTimeVisitDropdown: false,
			showDaytimeOption: false,
			showTimeOption: false,
			showClaimTypeListOption: false,
			showMemberListOption: false,
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
			cap_per_visit: '',
		};
	},
	created() {
		console.log(`${this.member_id} ug is ${this.name}`);
		this.healthPartnerViewStatus = this.$route.name;
	},
	methods: {
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
		},
		showAddDependent() {
			this.addDependentInfo = this.addDependentInfo == false ? true : false;
		},
		showRemoveEmp() {
			this.editRemoveEmpInfo = this.editRemoveEmpInfo == false ? true : false;
		},
		showReplaceDependent() {
			this.editReplaceDependentInfo = this.editReplaceDependentInfo == false ? true : false;
		},
		showRemoveDependent() {
			this.withdrawEmployeeModal = this.withdrawEmployeeModal == false ? true : false;
		},
		showEditDependent() {
			this.editDependentInfo = this.editDependentInfo == false ? true : false;
		},
		removeEmployeeBtn(data) {
			let x = data;
      
			if (x === "back") {
				if (this.remove_step_active == 'remove-opt') {
					this.removeBackBtn = false;
					this.remove_step_active = 'remove-emp';
				}

				if (this.remove_step_active == 'replace-emp') {
					this.remove_step_active = 'remove-opt';
				}

				if (this.remove_step_active == 'health-spending-summary') {
					this.remove_step_active = 'remove-opt';
				}

				if (this.remove_step_active == 'health-spending-account') {
					this.remove_step_active = 'health-spending-summary';
				}
			}

			if (x === "next") {

				if (this.remove_step_active == 'remove-emp') {
					this.removeBackBtn = true;
					this.remove_step_active = 'remove-opt';

				} else if (this.remove_step_active == 'remove-opt') {

					if (this.emp_details_replace) {
						this.remove_step_active = 'replace-emp';
					}

					if (this.emp_details_reserve) {
						this.remove_step_active = 'health-spending-summary';
					}

					if (this.emp_details_remove) {
						this.remove_step_active = 'health-spending-summary';
					}

				} else if (this.remove_step_active == 'replace-emp') {
					this.remove_step_active = 'health-spending-summary';

				} else if (this.remove_step_active == 'health-spending-summary') {
					this.remove_step_active = 'health-spending-account';
				}

			}


		},
		changeRemoveOption(opt) {
			this.emp_details_replace = false;
			this.emp_details_reserve = false;
			this.emp_details_remove = false;
      
			if (opt === 1) {
				this.emp_details_replace = true;
			}
			if (opt === 2) {
				this.emp_details_reserve = true;
				console.log('2 ni siya');
			}
			if (opt === 3) {
				this.emp_details_remove = true;
				console.log('3 ni siya');
			}
		},
		inNetworkSubmit() {
			this.inNetworkClaimSummaryModal = this.inNetworkClaimSummaryModal == false ? true : false;
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
			this.showClaimTypeListOption = this.showClaimTypeListOption == false ? true : false;
		},
		memberListOption() {
			this.showMemberListOption = this.showMemberListOption == false ? true : false;
		},
		setSpendingType(opt) {
			this.spendingTypeOpt = opt;
		},
		clickedTimeVisitDropdown() {
			this.showTimeVisitDropdown = this.showTimeVisitDropdown == false ? true : false;
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
					this.emp_padd_reset_wrapper = true;
					this.emp_pass_update = false;
					this.pin_setup_update = false;
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
     updateCapPerVisit( cap ) {
      console.log(cap);

      if (!cap || cap == null || cap == '') {
        this.$swal("Oops!", "Please input cap per visit", "error");
        return false;
      }
      var data = {
        employee_id: this.member_id,
        cap_amount: cap,
      }

      // console.log( data );

      axios.post( axios.defaults.serverUrl + '/company/updateEmployeeCap', data ) 
      .then(response => { 
        console.log(response);
        this.$swal("Success!", response.data.message, "success");
        this.showManageCapPerVisit = false;
      })
      .catch(err => {
        console.log(err.response);
        this.$swal("Error!", err.response.data.message, "error");
      });
		},
		showUpdatePass() {
			this.emp_padd_reset_wrapper = !this.emp_padd_reset_wrapper;
			this.emp_pass_update = !this.emp_pass_update;
		},
		pinSetupShow () {
			this.emp_padd_reset_wrapper = !this.emp_padd_reset_wrapper;
			this.pin_setup_update = !this.pin_setup_update;
		},
		resendEmployeeEmailDash() {
			// function here
		},
		unPinSetup() {
			// function here
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
