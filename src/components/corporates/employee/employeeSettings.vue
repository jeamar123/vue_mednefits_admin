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
        this.$parent.hideLoading();
        this.errorHandler( err );
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
