<script>
import Modal from "../../../views/modal/Modal.vue";


  let corporateEmployeeInformation = {
    components: {
      Modal
    },
    data() {
      return {
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
        showSetupAccountModal: false,
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
      };
    },
    created(){
      this.healthPartnerViewStatus = this.$route.name;
    },
    methods: {
      selectHealthPartnerView( opt ){
        this.healthPartnerViewStatus = opt;
        this.$router.push( { name : opt } );
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
      removeEmployeeBtn( data ) {
        let x = data;

        if(x === "back") {
          if (this.remove_step_active == 'remove-opt' ) {
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

        if(x === "next") {
         
          if (this.remove_step_active == 'remove-emp' ) {
            this.removeBackBtn = true;
            this.remove_step_active = 'remove-opt';

          } else if (this.remove_step_active == 'remove-opt') {

            if ( this.emp_details_replace ) {
              this.remove_step_active = 'replace-emp';          
            } 

            if ( this.emp_details_reserve ) {
              this.remove_step_active = 'health-spending-summary';
            }

            if ( this.emp_details_remove ) {
              this.remove_step_active = 'health-spending-summary';
            }
              
          } else if (this.remove_step_active == 'replace-emp') {
            this.remove_step_active = 'health-spending-summary';  

          } else if (this.remove_step_active == 'health-spending-summary') {
            this.remove_step_active = 'health-spending-account';
          }
            
        }

        
      },
      changeRemoveOption ( opt ) {
        this.emp_details_replace = false;
        this.emp_details_reserve = false;
        this.emp_details_remove = false;

        if ( opt === 1 ) {
          this.emp_details_replace = true;
        }
        if ( opt === 2 ) {
          this.emp_details_reserve = true;
          console.log('2 ni siya');
        }
        if ( opt === 3 ) {
          this.emp_details_remove = true;
          console.log('3 ni siya');
        }
      },
      inNetworkSubmit() { 
        this.inNetworkClaimSummaryModal = this.inNetworkClaimSummaryModal == false ? true : false;
      },
      toggleShowInNetwork(data) {
        let x = data;
        if ( x === "in-network" ) {
          this.showInNetwork = true;
        } else if ( x === "cancel" ) {
          this.showInNetwork = false;
        }
      },
      toggleShowOutNetwork(data) {
        let x = data;
        if ( x === "out-network" ) {
          this.showOutNetwork = true;
        } else if ( x === "cancel" ) {
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
      empDetailsOutNetworkNextBackBtn( data ) {
        let x = data;
        if (x === "next") {
          if (this.step_active == 1) {
            this.step_active = 2;
          } else if (this.step_active == 2) {
            this.step_active = 3;
          }
        }
        if (x === "back") {
          if (this.step_active == 2 ) {
            this.step_active = 1;
          } else if (this.step_active == 3) {
            this.step_active = 2;
          }
        }
      },
      //SETTINGS BUTTON FOR SHOWING MODAL
      selectedEmpDetailsSettingsClicked(value,data) {
        let y = value;
        let x = data;

        if ( y == 0 ) {
          if ( x === "setup-reset-account" ) {
            this.showSetupAccountModal = true;
          } else if ( x === "cancel" ) {
            this.showSetupAccountModal = false;
          }
        }
        
        if ( y == 1 ) {
          if ( x === "renew-plan" ) {
            this.showRenewModal = true;
          } else if ( x === "cancel" ) {
            this.showRenewModal = false;
          }
        }

        if ( y == 2 ) {
          if ( x === "manage-visit" ) {
            this.showManageCapPerVisit = true;
          } else if ( x === "cancel" ) {
            this.showManageCapPerVisit = false;
          }
        }

        if ( y == 3 ) {
          if ( x === "sms-update-notify" ) {
            this.showSmsUpdateNotify = true;
          } else if ( x === "cancel" ) {
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
      openEmpCreditsPlan( data ) {
        let x = data;
        if ( x === "credits-plans" ) {
          this.showEmpCreditsPlan = true;
        } else if ( x === "cancel" ) {
          this.showEmpCreditsPlan = false;
        }
      },
      shortTermRadioBtn(data) {
        let x = data;
        if ( x === "short-term" ) {
          this.showShortTermSelector = true;
        } 
        else if ( x === "standard-one-year") {
          this.showShortTermSelector = false;
        }
      }
    }
  }
  
  export default corporateEmployeeInformation
</script>

<style lang="scss">
	@import "./src/assets/css/corporates.scss";
</style>
