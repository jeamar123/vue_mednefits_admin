<script>
  import Modal from "../../views/modal/Modal.vue";
  import axios from 'axios';
  import moment, { locale } from "moment";
  import { 
    _getActivePlans_,
    _createDependentAccount_,
  } from '../../common/functions/common_functions';
   
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
        global_editPlan: {
          payment_status: false,
          
        },
        global_getPlans: {
          current_plan: {
            plan_start: undefined,
          },
          old_plans: {
            plan_start: undefined,
          },
        },
        global_addDependentData: {
          start_date: new Date(),
          total_dependents: 0,
          account_type: undefined,
          secondary_account_type: undefined,
          is_paid: 0,
          individual_price: 0,
        }
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
      this._fecthPlanList_();
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

        // this.global_addDependentData = {};
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
          this.global_addDependentData = {};
          this.global_addDependentData.is_paid = 0;
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
      _setAccountType_(account_type)  {
        if (account_type == "trial_plan") {
          this.global_editPlan.payment_status = true;
          this.global_editPlan.secondary_account_type = "pro_trial_plan_bundle";
        } else {
          this.global_editPlan.payment_status = false;
        }
        if (account_type == "insurance_bundle") {
          this.global_editPlan.secondary_account_type = 'pro_plan_bundle';
          this.global_editPlan.payment_status = true;
        } else {
          this.global_editPlan.payment_status = false;
        }
        if (account_type == "stand_alone_plan") {
          this.global_editPlan.secondary_account_type = "default_price";
          this.global_editPlan.price_per_employee = 99;
        } 
        if (account_type == "lite_plan") {
          this.global_editPlan.secondary_account_type = "fixed_price";
          this.global_editPlan.price_per_employee = 5;
          this.global_editPlan.payment_status = false;
        }
        if (account_type == "enterprise_plan") {
          this.global_editPlan.payment_status = false;
          this.global_editPlan.secondary_account_type = "fixed_price";
          this.global_editPlan.price_per_employee = 100;
        }
        this.$forceUpdate();
      },
      _setSecondaryAccountType_(account_type)  {
        this.$forceUpdate();
      },
      _fecthPlanList_() {
        let params = {
          customer_id :	Number(this.customer_id),
        };
        _getActivePlans_(params)
					.then(( res ) => {
            console.log(res);
            this.global_getPlans = res.data.data;
            this.global_getPlans.current_plan.plan_start = moment(this.global_getPlans.current_plan.plan_start).format("DD MMMM, YYYY");
            this.global_getPlans.old_plans.plan_start = moment(this.global_getPlans.old_plans.plan_start).format("DD MMMM, YYYY");

					});
      },
      _dependentActiveButton_( opt ) {
        this.global_addDependentData.is_paid = opt;
      },
      _submitDependentAccount_() {
        let params = {
          customer_id :	Number(this.customer_id),
          total_dependents: this.global_addDependentData.total_dependents,
          plan_start: moment(this.global_addDependentData.start_date).format('YYYY-MM-DD'),
          account_type: this.global_addDependentData.account_type,
          secondary_account_type: this.global_addDependentData.secondary_account_type,
          isPaid: this.global_addDependentData.is_paid,
          individual_price: this.global_addDependentData.individual_price,
        };
        _createDependentAccount_(params)
					.then(( res ) => {
            console.log(res);
            if( res.status == 200 || res.status == 201 ){ 
              this.$swal("Success!", res.data.message, "success");
            }
					});
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

  @media (max-width: 600px) {
    .edit-plan-modal .date-container {
      .popover-origin.direction-bottom.align-left {
        left: -35px;
      }
    }
    .edit-plan-modal {
      .popover-origin .popover-content-wrapper .popover-content.align-left:after {
        left: 50px;
      }
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
