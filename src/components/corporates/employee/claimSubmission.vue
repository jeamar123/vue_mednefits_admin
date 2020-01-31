<script>
import Modal from "../../../views/modal/Modal.vue";


  let claimSubmission = {
    components: {
      Modal
    },
    data() {
      return {
        inNetworkClaimSummaryModal: false,
        showInNetwork: false,
        showOutNetwork: false,
        spendingTypeOpt: 'medical',
        step_active: 1,
        showTimeVisitDropdown: false,
        showDaytimeOption: false,
        showTimeOption: false,
        showClaimTypeListOption: false,
        showMemberListOption: false,
        starDateDetails: {
          startDate: undefined,
        },
      };
    },
    created(){
    },
    methods: {
      
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
    }
  }
  
  export default claimSubmission
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporateEmployee.scss";
</style>

<style type="text/css">
  .in-network-input-wrapper .vDatepicker,
  .xs-in-network-form .vDatepicker{
    background: transparent;
    border: none !important;
  }
  .out-of-network-form .visit-date-input-wrapper input{
    background-color: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    color: #888;
    height: 34px;
    width: 100%;
    padding: 6px 18px;
  }
</style>