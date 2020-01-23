<script>
  import moment from "moment";

  let addCorporates = {
    data() {
      return {
        billing_status : false,
        add_contacts : false,
        plan_extension : false,
        plan_extension_change_plan: false,
        plan_extension_dependents: false,
        dependents: false,
        health_spending_account: false,
        medical_spending_account: false,
        wellness_spending_account: false,
        schedule_email: false,
        add_cc: false,
        create_company : {
          plan_start: undefined,
          main_plan_invoice_date: undefined,
          plan_start_extension: new Date(),
          plan_invoice_date: undefined,
          medical_spending_start_date: new Date(),
          medical_spending_end_date: new Date(),
          wellness_spending_start_date: new Date(),
          wellness_spending_end_date: new Date(),
          email_send_date: new Date(),
          cc_emails: [],
          generate_password: false,
        },
        company_contacts : [
          {
            first_name : "",
            last_name : "",
            job_title : "",
            email : "",
            phone : "",
            send_email_comm_related : false,
            send_email_bill_related : false,
          }
        ],
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        cc_email_err: false,
        cc_email_repeat: false,
        add_cc_create_data : '',
      };
    },
    created(){
      console.log(this.create_company.medical_spending_start_date);
    },
    methods: {
      toggleBusinessInfoAddCorporate( opt ) {
        this.billing_status = opt;

        if ( opt == true ) {
          this.create_company.billing_name = this.create_company.company;
          this.create_company.billing_address = this.create_company.company_address;
          this.create_company.billing_postal_code = this.create_company.company_postal_code;
          this.create_company.billing_first_name = this.create_company.contact_first_name;
          this.create_company.billing_last_name = this.create_company.contact_last_name;
          this.create_company.billing_email = this.create_company.contact_email;
          this.create_company.billing_phone = this.create_company.phone;
        } else {
          this.create_company.billing_name = "";
          this.create_company.billing_address = "";
          this.create_company.billing_postal_code = "";
          this.create_company.billing_first_name = "";
          this.create_company.billing_last_name = "";
          this.create_company.billing_email = "";
          this.create_company.billing_phone = "";
        }
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
      togglePlanExtensionDependentsAddCorporate( opt ) {
        this.plan_extension_dependents = opt;
      },
      toggleDependentsAddCorporate( opt ) {
        this.dependents = opt;
      },
      toggleHealthSpendingAddCorporate( opt ) {
        this.health_spending_account = opt;

        this.create_company.medical_spending_start_date = '';
        this.create_company.medical_spending_end_date = '';
        this.create_company.wellness_spending_start_date = '';
        this.create_company.wellness_spending_end_date = '';
      },
      toggleMedicalSpendingAccount( opt ) {
        this.medical_spending_account = opt;
        console.log(moment(this.create_company.medical_spending_start_date).format('YYYY-MM-DD'));

        if ( opt == true ) {
          this.create_company.medical_spending_start_date = new Date(this.create_company.medical_spending_start_date);
          this.create_company.medical_spending_end_date = new Date(this.create_company.medical_spending_end_date);
        } else {
          this.create_company.medical_spending_start_date = '';
          this.create_company.medical_spending_end_date = '';
        }
      },
      toggleWellnessSpendingAccount( opt ) {
        this.wellness_spending_account = opt;

        if ( opt == true ) {
          this.create_company.wellness_spending_start_date = new Date(this.create_company.wellness_spending_start_date);
          this.create_company.wellness_spending_end_date = new Date(this.create_company.wellness_spending_end_date);
        } else {
          this.create_company.wellness_spending_start_date = '';
          this.create_company.wellness_spending_end_date = '';
        }

      },
      toggleSendWelcomeEmailAddCorporate ( opt ) {
        this.add_cc = opt;
      },
      toggleScheduleEmailSend ( opt ) {
        this.schedule_email = opt;
      },
      addCompanyContact () {
        this.company_contacts.push({
          first_name : '',
          last_name : '',
          job_title : '',
          email : '',
          phone : '',
          send_email_comm_related : false,
          send_email_bill_related : false,
        });
      },
      removeCompanyContact ( index ) {
        this.$swal({
          title: "",
          text: "Are you sure you want to delete this contact?",
          type: "warning",
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonColor: "#25306C",
          confirmButtonText: "Yes!",
        }).then(result => {
          if (result) {
            console.log(result);
            this.company_contacts.splice(index,1);
          } 
        });
      },
      accountTypeChanged( type ) {
        if( type == 'trial_plan' ){
          this.create_company.plan_price = 0;
        }
        if( type == 'insurance_bundle' ){
          this.create_company.plan_price = 99;
        }
        if( type == 'stand_alone_plan' ){
          this.create_company.plan_price = 99;
        }
        if( type == 'lite_plan' ){
          this.create_company.plan_price = 5;
        }
        if( type == 'enterprise_plan' ){
          this.create_company.plan_price = 300;
        }
      },
      accountTypeExtensionChanged( type ) {
        if( type == 'trial_plan' ){
          this.create_company.plan_price_extension = 0;
        }
        if( type == 'insurance_bundle' ){
          this.create_company.plan_price_extension = 99;
        }
        if( type == 'stand_alone_plan' ){
          this.create_company.plan_price_extension = 99;
        }
        if( type == 'lite_plan' ){
          this.create_company.plan_price_extension = 5;
        }
        if( type == 'enterprise_plan' ){
          this.create_company.plan_price_extension = 300;
        }
      },
      accountDependentsTypeChanged( type ) {
        if( type == 'trial_plan' ){
          this.create_company.plan_price_dependents = 0;
        }
        if( type == 'insurance_bundle' ){
          this.create_company.plan_price_dependents = 99;
        }
        if( type == 'stand_alone_plan' ){
          this.create_company.plan_price_dependents = 99;
        }
        if( type == 'lite_plan' ){
          this.create_company.plan_price_dependents = 5;
        }
        if( type == 'enterprise_plan' ){
          this.create_company.plan_price_dependents = 300;
        }
      },
      accountTypeExtensionDependentsChanged( type ) {
        if( type == 'trial_plan' ){
          this.create_company.plan_price_extension_dependents = 0;
        }
        if( type == 'insurance_bundle' ){
          this.create_company.plan_price_extension_dependents = 99;
        }
        if( type == 'stand_alone_plan' ){
          this.create_company.plan_price_extension_dependents = 99;
        }
        if( type == 'lite_plan' ){
          this.create_company.plan_price_extension_dependents = 5;
        }
        if( type == 'enterprise_plan' ){
          this.create_company.plan_price_extension_dependents = 300;
        }
      },
      startDateChanged() {
        // console.log( moment( this.create_company.plan_start_extension ).add(this.create_company.duration_value ,this.create_company.duration_type).subtract(1,'days') );
        this.create_company.plan_start_extension = new Date(moment( this.create_company.plan_start_extension ).add(this.create_company.duration_value ,this.create_company.duration_type).subtract(1,'days'));

        this.create_company.medical_spending_start_date = new Date(moment(this.create_company.plan_start));
        this.create_company.medical_spending_end_date = new Date(moment( this.create_company.plan_start ).add( this.create_company.duration_value, this.create_company.duration_type ).subtract(1, 'days'));
        this.create_company.wellness_spending_start_date = new Date(moment(this.create_company.plan_start));
        this.create_company.wellness_spending_end_date = new Date(moment( this.create_company.plan_start ).add( this.create_company.duration_value, this.create_company.duration_type ).subtract(1, 'days'));
        this.$forceUpdate();  


        if ( this.medical_spending_account == false && this.medical_spending_account == false ) {
          console.log('check');
          this.create_company.medical_spending_start_date = '';
          this.create_company.medical_spending_end_date = '';
          this.create_company.wellness_spending_start_date = '';
          this.create_company.wellness_spending_end_date = '';
        }
      },
      addCreateCompanyCCEmail( email ) {
        this.cc_email_err = false;

        if ( email != "" || email != null ) {
          var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          if ( regex.test(email) == true ) {
            this.cc_email_err = false;  
            var check = this.create_company.cc_emails.indexOf( email );
            if ( check < 0 ) {
              // console.log('less than 0');
              this.create_company.cc_emails.push( email );
              this.cc_email_repeat = false;
              this.add_cc_create_data = "";
            } else {
              // console.log('greater than 0');
              this.cc_email_repeat = true;
            }

          } else{
            this.cc_email_repeat = false;
            this.cc_email_err = true;
          }

        }
      },
      removeCreateCompanyCCEmail( email ) {
        var check = this.create_company.cc_emails.indexOf( email );
        this.create_company.cc_emails.splice( email );
      },
      watchPasswordInput( data ) {
        data = !data;
        // console.log(data);
        if ( data == true ) {
          this.create_company.disable_password_input = true;
          this.create_company.reg_password = "";
        } else {
          this.create_company.disable_password_input = false;
        }
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
