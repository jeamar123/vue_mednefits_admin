<script>

  let corporateSpendingInvoice = {
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        global_isActionsSelectorShow: false,
      };
    },
    created(){

    },
    methods: {
      ___showActionsSelector() {
        this.global_isActionsSelectorShow = this.global_isActionsSelectorShow == false ? true : false;
      },
      ___hideAllDrop( e ) {
        if ($(e.target).parents(".actions-selector").length === 0) {
          this.global_isActionsSelectorShow  = false;
          console.log('click sa gawas');
        }
      },
      _downloadInvoice_(data,type) {
        if( type == 'receipt' ){
          window.open( window.location.origin + '/#/dashboard/download-receipt/' + this.customer_id );
        }else{
          window.open( window.location.origin + '/#/dashboard/download-pdf/' + this.customer_id );
        }
      },
    }
  }
  
  export default corporateSpendingInvoice
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/spendingInvoice.scss";
</style>
