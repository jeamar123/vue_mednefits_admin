<script>
  import Modal from "../../views/modal/Modal.vue";
   
  let corporatePlan = {
    components: {
      Modal
    },
    data() {
      return {
        planSelectorActive: {
          value: 0,
          text: ""
        },
        accountPlanTypeModal : false,
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
    }
  }
  
  export default corporatePlan
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporates.scss";
</style>
