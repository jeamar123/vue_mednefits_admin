<script>
  import Modal from "../../views/modal/Modal.vue";
  import moment, { locale } from "moment";
  import { 
    _fetchSpendingInvoiceData_,
    _showPageLoading_,
    _hidePageLoading_,
    _updateSpendingPayment_,
    _updateInvoiceDates_,
  } from '../../common/functions/common_functions';

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
        // global_spendingInvoiceData: {
        //   payment_date: new Date(),
        //   invoice_date: new Date(),
        //   payment_due: new Date(),
        // },
        global_spendingInvoiceData: {},
        global_isPaymentDetailsShow: false,
        global_isEditInvoiceModalShow: false,
        paid_amount: 0,
        global_paymentTrailTrans: {
          paid_amount: undefined,
          transaction_date: undefined,
          remarks: undefined,
        },
      };
    },
    created(){
      this._getSpendingData_();
    },
    methods: {
      ___showActionsSelector( data ) {
        console.log(data);
        data.global_isActionsSelectorShow = data.global_isActionsSelectorShow == true ? false : true;
        console.log(data.global_isActionsSelectorShow);
        this.$forceUpdate();
      },
      ___hideAllDrop( e ) {
        if ($(e.target).parents(".actions-selector").length === 0) {
          this.global_isActionsSelectorShow  = false;
          console.log('click sa gawas');
          this.$forceUpdate();
        }
        this.$forceUpdate();
      },
      ___selectActionsSelector( type,data ) {
        console.log(data);
        data.global_isActionsSelectorShow = false;
        this.$forceUpdate();

        if ( type == 'download-invoice' ) {
          window.open( window.location.origin + '/#/dashboard/download-pdf/' + this.customer_id );
        }
        if ( type == 'payment-method' ) {
          data.global_isPaymentDetailsShow = data.global_isPaymentDetailsShow == true ? false : true;
          this.$forceUpdate();

          this.global_paymentStatusData = data;
          this.global_paymentTrailTrans = data.trail_transaction;
          this.global_paymentTrailTrans.transaction_date = new Date(this.global_paymentTrailTrans.transaction_date);
        }
        if ( type == 'edit-invoice-dates' ) {
          this.global_isEditInvoiceModalShow = this.global_isEditInvoiceModalShow == false ? true : false;
          this.global_editStatementData = data;
          
        }
        if ( type == 'view-transactions' ) {
          window.open( window.location.origin + '/#/dashboard/download-transactions/' + this.customer_id );
        }
      },
      _getSpendingData_() {
        let params = {
          customer_id: this.customer_id,
        }
        _showPageLoading_();
        _fetchSpendingInvoiceData_(params)
        .then(( res ) => {
          // console.log(res);
          if( res.status == 200 || res.status == 201 ){
            _hidePageLoading_();
            this.global_spendingInvoiceData = res.data.data;
            console.log(this.global_spendingInvoiceData);
              
            Object.keys(this.global_spendingInvoiceData).map(( value, key ) => {
              this.global_spendingInvoiceData[key].invoice_date = new Date(this.global_spendingInvoiceData[key].invoice_date);
              this.global_spendingInvoiceData[key].invoice_due_date = new Date(this.global_spendingInvoiceData[key].invoice_due_date);
              // this.global_spendingInvoiceData[key].trail_transaction.transaction_date = new Date();
            });
          }
        });
      },
      _submitPayment_() {
        let params = {
          paid_date:	this.global_paymentTrailTrans.transaction_date,
          paid_amount:	this.global_paymentTrailTrans.paid_amount,
          customer_spending_invoice_id:	this.global_paymentStatusData.customer_spending_invoice_id,
          customer_id:	this.customer_id,
          payment_remarks:	this.global_paymentTrailTrans.remarks,
        }
        _updateSpendingPayment_(params)
        .then(( res ) => { 
          console.log(res)
          if( res.status == 200 || res.status == 201 ){
            this.$swal('Success!', res.data.message, 'success');
            this._getSpendingData_();
          }
        });
      },
      _submitInvoiceDates_() {
        let params = {
          customer_id: this.customer_id,
          customer_spending_invoice_id: this.global_editStatementData.customer_spending_invoice_id,
          invoice_date: moment(this.global_editStatementData.invoice_date).format('YYYY-MM-DD'),
          invoice_due_date: moment(this.global_editStatementData.invoice_due_date).format('YYYY-MM-DD'),
        }
        _updateInvoiceDates_(params)
        .then(( res ) => { 
          console.log(res)
          if( res.status == 200 || res.status == 201 ){
            this.$swal('Success!', res.data.message, 'success');
            this.global_isEditInvoiceModalShow = false;
            this._getSpendingData_();
          }
        });
      },
      _formatDate_( date, from, to ){
        return moment( date, from ).format( to );
      },
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
