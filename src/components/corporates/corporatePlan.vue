<script>
  import Modal from "../../views/modal/Modal.vue";
  import axios from 'axios'
   
  let corporatePlan = {
    components: {
      Modal
    },
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        planSelectorActive: {
          value: 0,
          text: ""
        },
        accountPlanTypeModal : false,
        global_isViewPlanModalShow: false,
        global_recordPayment: {},
        global_isRecordPaymentShow: false,
        // corporateViewStatus : 'CorporateDetails',
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_isCreateDependentModalShow: false,
        global_isSpendingAccountModalShow: false,
        global_isCreditAllocationModalShow: false,
        global_creditAllocationDeposit: 0,
        global_getSpendingSettings: {
          medical_enable: false,
          wellness_enable: false,
        },
        global_isPendingEnrollmentModalShow: false,
        global_isRecordFundModalShow: false,
        global_isEditDepositModalShow: false,
        global_isEditPlanModalShow: false,
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
    },
    methods: {
      showPlanActive(value,text) {
        this.planSelectorActive.value = value;
        this.planSelectorActive.text = text;
      },
      showAccountPlanType() {
        this.accountPlanTypeModal = this.accountPlanTypeModal == false ? true : false;
      },
      toggleClosePlanModal()  {
        this.global_isViewPlanModalShow = false;
        this.global_isCreateDependentModalShow = false;
        this.global_isSpendingAccountModalShow = false;
        this.global_isCreditAllocationModalShow = false;
        this.global_isPendingEnrollmentModalShow = false;
        this.global_isEditDepositModalShow = false;
      },
      toggleRecordPayment()  {
        this.global_isRecordPaymentShow = this.global_isRecordPaymentShow == false ? true : false;
      },
      _downloadInvoice_(data,type) {
        if( type == 'receipt' ){
          window.open( window.location.origin + '/#/dashboard/download-receipt/' + this.customer_id );
        }else{
          window.open( window.location.origin + '/#/dashboard/download-pdf/' + this.customer_id );
        }
      },
      _showCorporatePlanModal_( opt ) {
        console.log(opt);
        if ( opt == 'create-dependent-account' ) {
          this.global_isCreateDependentModalShow = this.global_isCreateDependentModalShow == false ? true : false;
        }
        if ( opt == 'spending-account-settings' ) {
          this.global_isSpendingAccountModalShow = this.global_isSpendingAccountModalShow == false ? true : false;
        }
        if ( opt == 'credit-allocation' ) {
          this.global_isCreditAllocationModalShow = this.global_isCreditAllocationModalShow == false ? true : false;
        }
        if ( opt == 'view-plan' ) {
          this.global_isViewPlanModalShow = this.global_isViewPlanModalShow == false ? true : false;
          this.global_isRecordFundModalShow = false;
          this.global_isEditDepositModalShow = false;
          this.global_isEditPlanModalShow = false;
        }
      },
      ___medicalSelector( opt ) {
        if ( opt == true ) {
          this.global_getSpendingSettings.medical_enable = true;
        } else {
          this.global_getSpendingSettings.medical_enable = false;
        }
      },
      ___wellnessSelector( opt ) {
        if ( opt == true ) {
          this.global_getSpendingSettings.wellness_enable = true;
        } else {
          this.global_getSpendingSettings.wellness_enable = false;
        }
      },
      _showViewPlanModal_( type ) {
        this.global_isViewPlanModalShow = false;

        if ( type == 'pending-enrollment' ) {
          this.global_isPendingEnrollmentModalShow = true;
        }
        if ( type == 'record-refund' ) {
          this.global_isRecordFundModalShow = true;
        }
        if ( type == 'edit-deposit' ) {
          this.global_isEditDepositModalShow = true;
        }
        if ( type == 'edit-plan' ) {
          this.global_isEditPlanModalShow = true;
        }
      },
    }
  }
  
  export default corporatePlan
</script>

<style lang="scss">
  @import "./src/assets/css/planDetails.scss";
  
  .end-date-container {
    .popover-origin.direction-bottom.align-left {
      right: 0;
      left: inherit;
    }
    .popover-origin .popover-content-wrapper .popover-content.align-left:after {
      left: 145px
    }
  }

  .edit-deposit-modal .date-container {
    .popover-origin.direction-bottom.align-left {
      right: 0;
      left: inherit;
    }
  }
  
  @media (max-width: 320px) { 
    .record-refund-modal .date-container {
      .popover-origin.direction-bottom.align-left {
        right: 0;
        left: inherit;
      }
    }
    .edit-deposit-modal {
      .popover-origin .popover-content-wrapper .popover-content.align-left:after {
        left: 50px;
      }
    }
  }
</style>
