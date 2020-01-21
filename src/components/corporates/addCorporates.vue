<script>
  let addCorporates = {
    data() {
      return {
        billing_status : false,
        add_contacts : false,
        plan_extension : false,
        plan_extension_change_plan: false,
        dependents: false,
        health_spending_account: false,
        medical_spending_account: false,
        wellness_spending_account: false,
        schedule_email: false,
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
      toggleDependentsAddCorporate( opt ) {
        this.dependents = opt;
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
      toggleScheduleEmailSend ( opt ) {
        this.schedule_email = opt;
      },
    }
  }
  
  export default addCorporates
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporates.scss";

  @media (max-width: 800px) {
    .add-corporate-container {
      min-width: auto;
      width: 100%;
      padding: 0 20px;

      .white-box {
        margin: 0 0 20px;
      }

      .margin-030 {
        margin: 0;
      }
    }
  }

  @media (max-width: 670px) {
    .add-corporate-container {
      .mr-20 {
        margin: 0;
      }

      .form-row {
        display: block;
      }

      .duration-container {
        width: 150px;
      }

      .invoice-date-container .date-container {
        width: 100%;
      }

      .med-date-container,
      .well-date-container {
        width: 100%;
        margin: 10px 0 0;
      }

      .med-well-spending-wrapper .form-toggle {
        margin: 0;
      }
    }
  }

  @media ( max-width: 460px ) {
    .add-corporate-container {
      .white-box {
        padding: 5px 15px 30px;
      }

      .btn-option-row .btn-container {
        flex: 5;
      }

      .duration-container {
        width: 100%;
      }

      .send-welcome-email-toggle {
        display: block;
      }

      .welcome-email-account-selector {
        margin: 20px 0 0;
      }
    }
  }  

</style>
