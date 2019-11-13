<script>
  let corporatePlan = {
    data() {
      return {
        planSelectorActive: {
          value: 0,
          text: ""
        },
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
    }
  }
  
  export default corporatePlan
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporates.scss";
</style>
