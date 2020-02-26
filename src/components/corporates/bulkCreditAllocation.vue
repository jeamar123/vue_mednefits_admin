<script>
  let bulkCreditAllocation = {
    data() {
      return {
        // empSelectorActive: {
        //   value: 0,
        //   text: ""
        // },
        global_showCreditDp:  false,
        global_creditSpendingType: 0,
        global_creditAllocationType: 0,
      };
    },
    created(){
      
    },
    methods: {
      ___selectedCreditPerPage() {
        this.global_showCreditDp  = this.global_showCreditDp  ==  false ? true : false;
      },
      ___hideAllDrop( e ) {
        if ($(e.target).parents(".per-page-container").length === 0) {
          this.global_showCreditDp  = false;
          console.log('click sa gawas');
        }
      },
      ___selectCreditAllocationSpending( opt ) {
        this.global_creditSpendingType = opt;
      },
      ___selectCreditAllocationType( opt ) {
        this.global_creditAllocationType = opt;
      },
    }
  }
  
  export default bulkCreditAllocation
</script>

<style lang="scss" scoped>
	// @import "./src/assets/css/corporateSettings.scss";
</style>