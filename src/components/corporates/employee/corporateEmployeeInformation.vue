<script>
import Modal from "../../../views/corporates/modal/Modal.vue";


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
        showInNetwork: false,
        showOutNetwork: false,
        showSetupAccountModal: false,
        showRenewModal: false,
        showManageCapPerVisit: false,
        showSmsUpdateNotify: false,
        selected_emp_details_opt: 0,
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
