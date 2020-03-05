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
      toggleViewPlanModal()  {
        this.global_isViewPlanModalShow = this.global_isViewPlanModalShow == false ? true : false;
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
      }
    }
  }
  
  export default corporatePlan
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/planDetails.scss";
</style>
