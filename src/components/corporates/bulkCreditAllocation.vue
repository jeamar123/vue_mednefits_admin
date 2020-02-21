<script>
  let bulkCreditAllocation = {
    data() {
      return {
        // empSelectorActive: {
        //   value: 0,
        //   text: ""
        // },
        global_showCreditDp:  false,
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
    }
  }
  
  export default bulkCreditAllocation
</script>

<style lang="scss" scoped>
	// @import "./src/assets/css/corporateSettings.scss";
</style>