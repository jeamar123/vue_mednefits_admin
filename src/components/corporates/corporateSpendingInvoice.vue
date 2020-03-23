<script>
  import Modal from "../../views/modal/Modal.vue";

  let corporateSpendingInvoice = {
    components: {
      Modal,
    },
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        global_isActionsSelectorShow: false,
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_spendingInvoiceData: {
          payment_date: new Date(),
          invoice_date: new Date(),
          payment_due: new Date()
        },
        global_isPaymentDetailsShow: false,
        global_isEditInvoiceModalShow: false,
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
      ___selectActionsSelector( type ) {
        this.global_isActionsSelectorShow = false;

        if ( type == 'download-invoice' ) {
          window.open( window.location.origin + '/#/dashboard/download-pdf/' + this.customer_id );
        }
        if ( type == 'payment-method' ) {
          this.global_isPaymentDetailsShow = this.global_isPaymentDetailsShow == false ? true : false;
        }
        if ( type == 'edit-invoice-dates' ) {
          this.global_isEditInvoiceModalShow = this.global_isEditInvoiceModalShow == false ? true : false;
        }
        if ( type == 'view-transactions' ) {
          window.open( window.location.origin + '/#/dashboard/download-transactions/' + this.customer_id );
        }
      }
    }
  }
  
  export default corporateSpendingInvoice
</script>

<style lang="scss">
  @import "./src/assets/css/spendingInvoice.scss";
  
  .company-drop-details input.vDatepicker {
    height: 30px;
  }
</style>
