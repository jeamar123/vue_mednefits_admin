<script>
  let addCorporates = {
    data() {
      return {
        billing_status : false,
        add_contacts : false,
        plan_extension : false,
        plan_extension_change_plan: false,
        health_spending_account: false,
        medical_spending_account: false,
        wellness_spending_account: false,
        add_cc: false,
        accountStartDate : {
          startDate: undefined,
        },
        invoiceStartDate : {
          startDate: undefined,
        },
        planExtensionStartDate : {
          startDate: undefined,
        },
        changePlanInvoiceStartDate : {
          startDate: undefined,
        },
      };
    },
    created(){

    },
    methods: {
      toggleBusinessInfoAddCorporate( opt ) {
        this.billing_status = opt;
      },
      toggleAddContactStatus( opt ) {
        this.add_contacts = opt;
      },
      togglePlanExtensionAddCorporate( opt ) {
        this.plan_extension = opt;
      },
      togglePlanExtensionChangeType( opt ) {
        this.plan_extension_change_plan = opt;
      },
      toggleHealthSpendingAddCorporate( opt ) {
        this.health_spending_account = opt;
      },
      toggleMedicalSpendingAccount( opt ) {
        this.medical_spending_account = opt;
      },
      toggleWellnessSpendingAccount( opt ) {
        this.wellness_spending_account = opt;
      },
      toggleSendWelcomeEmailAddCorporate ( opt ) {
        this.add_cc = opt;
      },
    }
  }
  
  export default addCorporates
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporates.scss";
</style>
