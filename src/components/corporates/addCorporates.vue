<script>
  import moment from "moment";
  import axios from "axios";

  let addCorporates = {
    data() {
      return {
        create_company : {
          // duration : undefined,
          billing_status : false,
          add_contacts : false,
          duration_value: 1,
          duration_value_extension: 1,
          duration_type: 'months',
          employee_duration_extension_type: 'months',
          employee_employees: 0,
          employee_plan_price: 0,
          employee_plan_price_extension: 0,
          dependents_employees: 0,
          dependent_plan_price: 0,
          dependent_plan_price_extension: 0,
          employee_plan_extension : false,
          plan_extension_change_plan: false,
          dependent_plan_extension_status: false,
          dependent_status: false,
          health_spending_account: false,
          medical_spending_account: false,
          wellness_spending_account: false,
          schedule_email: false,
          add_cc: false,
          emmployee_plan_start: new Date(),
          main_plan_invoice_date: new Date(),
          employee_payment_status: false,
          employee_payment_status_extension: false,
          dependent_payment_status: false,
          dependent_payment_status_extension: false,
          dependent_plan_start: new Date(),
          plan_start_extension: new Date( moment().add( 1,'months').subtract(1,'days') ),
          plan_start_extension_dependents: new Date(),
          employee_plan_start_extension: undefined,
          medical_spending_start_date: new Date(),
          medical_spending_end_date: new Date(),
          wellness_spending_start_date: new Date(),
          wellness_spending_end_date: new Date(),
          send_account_email_date: new Date(),
          cc_emails: [],
          generate_password: false,
          // company_contacts : [
          //   {
          //     first_name : "",
          //     last_name : "",
          //     job_title : "",
          //     email : "",
          //     phone : "",
          //     send_email_comm_related : false,
          //     send_email_bill_related : false,
          //   }
          // ],
          company_contacts : [
            {
              add_contact_business_contact_first_name : "",
              add_contact_business_contact_last_name : "",
              add_contact_business_job_title : "",
              add_contact_business_contact_email : "",
              add_contact_business_phone : "",
              send_email_comm_related : false,
              send_email_bill_related : false,
            }
          ],
        },
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        cc_email_err: false,
        cc_email_repeat: false,
        add_cc_create_data : '',
        job_title : [
          'Accounting, Audit, Finance',
          'Administration Support',
          'Arts/Cultural/Heritage',
          'Building and Estate Management',
          'Conciliation/Mediation',
          'Corporate Strategy/Top Management',
          'Customer Service',
          'Economics/Statistics',
          'Education',
          'Engineering',
          'Healthcare',
          'Human Resources',
          'InfoComm, Technology, New Media Communications',
          'International Relations',
          'Landscape/Horticulture',
          'Law/Legal Services',
          'Logistics/Supply Chain',
          'Marketing/Business Development',
          'Orgnisation Development',
          'Policy Formulation',
          'Public Relations/Corporate Communications/Psychology',
          'Research and Analysis',
          'Sales/Telesales/Telemarketing',
          'Self-Employed',
          'Sciences (e.g. life sciences, bio-technology etc.)',
          'Social and Community Development',
          'Statistics',
          'Training and Development',
          'Translators/Interpreters',
          'Others',
        ],
      };
    },
    created(){
      
    },
    methods: {
      toggleBusinessInfoAddCorporate( opt ) {
        this.create_company.billing_status = opt;

        if ( opt == true ) {
          this.create_company.billing_name = this.create_company.company_name;
          this.create_company.billing_address = this.create_company.company_address;
          this.create_company.billing_postal_code = this.create_company.company_postal_code;
          this.create_company.billing_first_name = this.create_company.business_contact_first_name;
          this.create_company.billing_last_name = this.create_company.business_contact_last_name;
          this.create_company.billing_email = this.create_company.business_contact_email;
          this.create_company.billing_phone = this.create_company.business_phone;
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
        this.create_company.add_contacts = opt;
      },
      togglePlanExtensionAddCorporate( opt ) {
        this.create_company.employee_plan_extension = opt;

        if ( opt == true ){
          this.create_company.dependent_plan_extension_status = true;
          this.create_company.plan_extension_status = true;
          // this.create_company.employee_account_type_extension = this.create_company.employee_account_type;
          // this.create_company.secondary_account_type_extension = this.create_company.secondary_account_type;
          this.create_company.plan_start_extension_dependents = this.create_company.plan_start_extension;
          // this.create_company.secondary_account_type_extension = this.create_company.dependent_account_type;
          // this.create_company.secondary_account_type_extension_dependents = this.create_company.secondary_account_type_dependents;
          // this.create_company.dependent_plan_price_extension = this.create_company.plan_price_dependents;
          // this.create_company.dependent_payment_status_extsension = this.create_company.payment_status_dependents ;
          // this.create_company.duration_extension_dependents = this.create_company.duration_value_extension + " " + this.create_company.employee_duration_extension_type;
          this.create_company.employee_plan_start_extension = new Date(moment(this.create_company.plan_start_extension).add(1,'months'));
          this.create_company.plan_start_extension_dependents = new Date(moment(this.create_company.plan_start_extension).add(1,'months'));

          // console.log(this.create_company.employee_plan_start_extension);
          // console.log(this.create_company.plan_start_extension_dependents);
        } else {
          this.create_company.dependent_plan_extension_status = false;
          this.create_company.plan_extension_status = false;
        }
      },
      togglePlanExtensionChangeType( opt ) {
        this.create_company.plan_extension_change_plan = opt;
      },
      togglePlanExtensionDependentsAddCorporate( opt ) {
        console.log(this.create_company.plan_start_extension_dependents);
        this.create_company.dependent_plan_extension_status = opt;
      },
      toggleDependentsAddCorporate( opt ) {
        this.create_company.dependent_status = opt;
      },
      toggleHealthSpendingAddCorporate( opt ) {
        this.create_company.health_spending_account = opt;

        this.create_company.medical_spending_start_date = '';
        this.create_company.medical_spending_end_date = '';
        this.create_company.wellness_spending_start_date = '';
        this.create_company.wellness_spending_end_date = '';
      },
      toggleMedicalSpendingAccount( opt ) {
        this.create_company.medical_spending_account = opt;
        console.log(moment(this.create_company.medical_spending_start_date).format('YYYY-MM-DD'));

        if ( opt == true ) {
          this.create_company.medical_spending_start_date = new Date(moment(this.create_company.emmployee_plan_start));
          this.create_company.medical_spending_end_date = new Date(moment(this.create_company.emmployee_plan_start).add( this.create_company.duration_value, this.create_company.duration_type ).subtract(1, 'days'));
        } else {
          this.create_company.medical_spending_start_date = '';
          this.create_company.medical_spending_end_date = '';
        }
      },
      toggleWellnessSpendingAccount( opt ) {
        this.create_company.wellness_spending_account = opt;

        if ( opt == true ) {
          this.create_company.wellness_spending_start_date = new Date(moment(this.create_company.emmployee_plan_start));
          this.create_company.wellness_spending_end_date = new Date(moment(this.create_company.emmployee_plan_start).add( this.create_company.duration_value, this.create_company.duration_type ).subtract(1, 'days'));
        } else {
          this.create_company.wellness_spending_start_date = '';
          this.create_company.wellness_spending_end_date = '';
        }

      },
      toggleSendWelcomeEmailAddCorporate ( opt ) {
        this.create_company.add_cc = opt;
      },
      toggleScheduleEmailSend ( opt ) {
        this.create_company.schedule_email = opt;
      },
      addCompanyContact () {
        this.create_company.company_contacts.push({
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
          confirmButtonColor: "#25306C",
          cancelButtonColor: "#C1C1C1",
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonText: "Yes!",
          reverseButtons: true,
        }).then(result => {
          if (result) {
            console.log(result);
            this.create_company.company_contacts.splice(index,1);
          } 
        });
      },
      accountTypeChanged( type ) {
        if( type == 'trial_plan' ){
          this.create_company.employee_plan_price = 0;
        }
        if( type == 'insurance_bundle' ){
          this.create_company.employee_plan_price = 99;
        }
        if( type == 'stand_alone_plan' ){
          this.create_company.employee_plan_price = 99;
        }
        if( type == 'lite_plan' ){
          this.create_company.employee_plan_price = 5;
        }
        if( type == 'enterprise_plan' ){
          this.create_company.employee_plan_price = 300;
        }
      },
      accountTypeExtensionChanged( type ) {
        if( type == 'trial_plan' ){
          this.create_company.employee_plan_price_extension = 0;
        }
        if( type == 'insurance_bundle' ){
          this.create_company.employee_plan_price_extension = 99;
        }
        if( type == 'stand_alone_plan' ){
          this.create_company.employee_plan_price_extension = 99;
        }
        if( type == 'lite_plan' ){
          this.create_company.employee_plan_price_extension = 5;
        }
        if( type == 'enterprise_plan' ){
          this.create_company.employee_plan_price_extension = 300;
        }
      },
      accountDependentsTypeChanged( type ) {
        if( type == 'trial_plan' ){
          this.create_company.dependent_plan_price = 0;
        }
        if( type == 'insurance_bundle' ){
          this.create_company.dependent_plan_price = 99;
        }
        if( type == 'stand_alone_plan' ){
          this.create_company.dependent_plan_price = 99;
        }
        if( type == 'lite_plan' ){
          this.create_company.dependent_plan_price = 5;
        }
        if( type == 'enterprise_plan' ){
          this.create_company.dependent_plan_price = 300;
        }
      },
      accountTypeExtensionDependentsChanged( type ) {
        if( type == 'trial_plan' ){
          this.create_company.dependent_plan_price_extension = 0;
        }
        if( type == 'insurance_bundle' ){
          this.create_company.dependent_plan_price_extension = 99;
        }
        if( type == 'stand_alone_plan' ){
          this.create_company.dependent_plan_price_extension = 99;
        }
        if( type == 'lite_plan' ){
          this.create_company.dependent_plan_price_extension = 5;
        }
        if( type == 'enterprise_plan' ){
          this.create_company.dependent_plan_price_extension = 300;
        }
      },
      togglePaymentStatusAddCorporate( opt ) {
        this.create_company.employee_payment_status = opt;
      },
      togglePaymentStatusExtensionAddCorporate( opt ) {
        this.create_company.employee_payment_status_extension = opt;
      },
      togglePaymentStatusDependentsAddCorporate( opt ) {
        this.create_company.dependent_payment_status = opt;
      },
      togglePaymentStatusExtensionDependentsAddCorporate( opt ) {
        this.create_company.dependent_payment_status_extension = opt;
      },
      startDateChanged() {
        // console.log( moment( this.create_company.plan_start_extension ).add(this.create_company.duration_value ,this.create_company.duration_type).subtract(1,'days') );
        this.create_company.plan_start_extension = new Date(moment( this.create_company.emmployee_plan_start ).add(this.create_company.duration_value ,this.create_company.duration).subtract(1,'days'));

        this.create_company.medical_spending_start_date = new Date(moment(this.create_company.emmployee_plan_start));
        this.create_company.medical_spending_end_date = new Date(moment( this.create_company.emmployee_plan_start ).add( this.create_company.duration_value, this.create_company.duration_type ).subtract(1, 'days'));
        this.create_company.wellness_spending_start_date = new Date(moment(this.create_company.emmployee_plan_start));
        this.create_company.wellness_spending_end_date = new Date(moment( this.create_company.emmployee_plan_start ).add( this.create_company.duration_value, this.create_company.duration_type ).subtract(1, 'days'));
        this.$forceUpdate();  

        if ( this.create_company.medical_spending_account == false ) {
          this.create_company.medical_spending_start_date = '';
          this.create_company.medical_spending_end_date = '';
        }

        if ( this.create_company.wellness_spending_account == false ) {
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
          this.create_company.business_portal_password = "";
        } else {
          this.create_company.disable_password_input = false;
        }
      },
      createCorporateDashboard( create_data ) {
        // console.log(create_data);
        if( this.checkAddCorpForm( create_data ) == false ){
          return false;
        }

        this.create_company.emmployee_plan_start = moment(this.create_company.emmployee_plan_start).format('YYYY-MM-DD');
        this.create_company.main_plan_invoice_date = moment(this.create_company.main_plan_invoice_date).format('YYYY-MM-DD');
        this.create_company.plan_start_extension = moment(this.create_company.plan_start_extension).format('YYYY-MM-DD');
        this.create_company.plan_start_extension_dependents = moment(this.create_company.plan_start_extension_dependents).format('YYYY-MM-DD');
        this.create_company.employee_plan_start_extension = moment(this.create_company.employee_plan_start_extension).format('YYYY-MM-DD');
        this.create_company.medical_spending_start_date = moment(this.create_company.medical_spending_start_date).format('YYYY-MM-DD');
        this.create_company.medical_spending_end_date = moment(this.create_company.medical_spending_end_date).format('YYYY-MM-DD');
        this.create_company.wellness_spending_start_date = moment(this.create_company.wellness_spending_start_date).format('YYYY-MM-DD');
        this.create_company.wellness_spending_end_date = moment(this.create_company.wellness_spending_end_date).format('YYYY-MM-DD');
        this.create_company.wellness_spending_end_date = moment(this.create_company.wellness_spending_end_date).format('YYYY-MM-DD');
        this.create_company.send_account_email_date = moment(this.create_company.send_account_email_date).format('YYYY-MM-DD');
        this.create_company.dependent_plan_start = moment(this.create_company.dependent_plan_start).format('YYYY-MM-DD');
        this.create_company.duration = `${ this.create_company.duration_value } ${ this.create_company.duration_type }`
        this.create_company.employee_plan_duration = `${ this.create_company.duration_value_extension } ${ this.create_company.employee_duration_extension_type }`
        this.create_company.employee_duration_extension = `${ this.create_company.duration_value_extension } ${ this.create_company.employee_duration_extension_type }`
        this.create_company.dependent_plan_duration = `${ this.create_company.duration_value_extension } ${ this.create_company.employee_duration_extension_type }`
        this.create_company.duration_extension_dependents = `${ this.create_company.duration_value_extension } ${ this.create_company.employee_duration_extension_type }`

        // let data = {
        //   company_name = this.create_company.billing_name;
        // }

        axios.post( axios.defaults.serverUrl + '/company/create_company', this.create_company ) 
          .then(response => { 
            console.log(response);
            this.$swal("Success!", response.data.message, "success");
            this.resetCreateCorporateData();
            this.$router.push({ path: '/dashboard/corporates' })
          })
          .catch(err => {
            console.log(err.response);
            this.resetCreateCorporateData();
            this.$swal("Error!", err.response.data.message, "error");
            
          });
        
      },
      checkAddCorpForm( data ) {
        // console.log(data);

        if( !data.company_name ){
          this.$swal( "Error!", "Please input your Company Name", "error" );
          return false;
        }
        if( !data.company_address ){
          this.$swal( "Error!", "Please input your Company Address", "error" );
          return false;
        }
        if( !data.country ){
          this.$swal( "Error!", "Please select your Company Country", "error" );
          return false;
        }
        if( !data.business_contact_first_name ){
          this.$swal( "Error!", "Please input Business Contact First Name", "error" );
          return false;
        }
        if( !data.business_contact_last_name ){
          this.$swal( "Error!", "Please input Business Contact Last Name", "error" );
          return false;
        }
        if( !data.business_job_title ){
          this.$swal( "Error!", "Please select a Business Contact Job Title", "error" );
          return false;
        }
        if( !data.business_contact_email ){
          this.$swal( "Error!", "Please input your Business Contact Email", "error" );
          return false;
        }
        if( !data.business_phone ){
          this.$swal( "Error!", "Please input your Business Contact Phone Number", "error" );
          return false;
        }
        if( !data.billing_name ){
          this.$swal( "Error!", "Please input your Billing Name", "error" );
          return false;
        }
        if( !data.billing_address ){
          this.$swal( "Error!", "Please input your Billing Address", "error" );
          return false;
        }
        if( !data.billing_first_name ){
          this.$swal( "Error!", "Please input your Billing First Name", "error" );
          return false;
        }
        if( !data.billing_last_name ){
          this.$swal( "Error!", "Please input your Billing Last Name", "error" );
          return false;
        }
        if( !data.billing_email ){
          this.$swal( "Error!", "Please input your Billing Email", "error" );
          return false;
        }
        if( !data.billing_phone ){
          this.$swal( "Error!", "Please input your Billing Phone Number", "error" );
          return false;
        }
        if( data.add_contacts ){
          if( this.create_company.company_contacts.length > 0 ){
            for( let value of this.create_company.company_contacts ){
              console.log( value );
              if ( !value.add_contact_business_contact_first_name ) {
                this.$swal( "Error!", "Please input your Contact First Name", "error" );
                return false;
              }
              if ( !value.add_contact_business_contact_last_name ) {
                this.$swal( "Error!", "Please input your Contact Last Name", "error" );
                return false;
              }
              if ( !value.add_contact_business_job_title ) {
                this.$swal( "Error!", "Please select your Contact Job Title", "error" );
                return false;
              }
              if ( !value.add_contact_business_contact_email ) {
                this.$swal( "Error!", "Please input your Contact Email", "error" );
                return false;
              }
              if ( !value.add_contact_business_phone ) {
                this.$swal( "Error!", "Please input your Contact Phone Number", "error" );
                return false;
              }
            }
          }else{
            this.$swal( "Error!", "Company Contact First Name is required.", "error" );
            return false;
          }
        }
        if( !data.emmployee_plan_start ){
          this.$swal( "Error!", "Please select Plan Start date", "error" );
          return false;
        }
        if( data.duration_value == 0 ){
          this.$swal( "Error!", "Plan duration must be 1 or more", "error" );
          return false;
        }
        if( !data.duration_type ){
          this.$swal( "Error!", "Please select a duration type", "error" );
          return false;
        }
        if( !data.currency ){
          this.$swal( "Error!", "Please select a Plan currency type.", "error" );
          return false;
        }
        if (data.employee_employees < 3) {
          this.$swal( "Error!", "At least three (3) eligible, active, full-time employee must be enrolled", "error" );
          return false;
        }
        if (!data.employee_account_type) {
          this.$swal( "Error!", "Please select your Plan account type", "error" );
          return false;
        }
        if (!data.employee_secondary_account_type && data.employee_account_type != 'enterprise_plan' && data.employee_account_type != 'lite_plan' && data.employee_account_type != 'stand_alone_plan') {
          this.$swal( "Error!", "Please select your Plan secondary account type", "error" );
          return false;
        }
        if( data.employee_plan_extension == true ){
          if( !data.plan_start_extension ){
            this.$swal( "Error!", "Please select Extension Plan Start date ", "error" );
            return false;
          }
          if( !data.duration_value_extension ){
            this.$swal( "Error!", "Extension Plan duration must be 1 or more", "error" );
            return false;
          }
          if( !data.employee_duration_extension_type ){
            this.$swal( "Error!", "Please select your Extension duration type", "error" );
            return false;
          }
          if (!data.employee_account_type_extension) {
            this.$swal( "Error!", "Please select your Extension Plan account type", "error" );
            return false;
          }
          if (!data.employee_secondary_account_type_extension && data.employee_account_type_extension != 'lite_plan' && data.employee_account_type_extension != 'stand_alone_plan') {
            this.$swal( "Error!", "Please select your Extension Plan secondary account type", "error" );
            return false;
          }
          if (!data.employee_plan_start_extension ) {
            this.$swal( "Error!", "Please select your Extension Plan Invoice date", "error" );
            return false;
          }
        }
        if( data.dependent_status == true ){
          if ( data.dependents_employees == 0 ) {
            this.$swal( "Error!", "Dependent employees should be 1 or more.", "error" );
            return false;
          }
          if (!data.dependent_account_type) {
            this.$swal( "Error!", "Please select your Dependents Plan account type", "error" );
            return false;
          }
          if (!data.dependent_secondary_account_type && data.employee_account_type != 'enterprise_plan' && data.dependent_account_type != 'lite_plan' && data.dependent_account_type != 'stand_alone_plan') {
            this.$swal( "Error!", "Please select your Dependents Plan secondary account type", "error" );
            return false;
          }
          if( data.dependent_plan_extension_status == true ){
            // if( !data.plan_start_extension_dependents ){
            //   this.$swal( "Error!", "Please select your Dependents Extension Plan Start date ", "error" );
            //   return false;
            // }
            // if( !data.duration_value_extension_dependents ){
            //   this.$swal( "Error!", "Dependents Extension Plan duration must be 1 or more", "error" );
            //   return false;
            // }
            // if( !data.duration_type_extension_dependents ){
            //   this.$swal( "Error!", "Please select your Dependents Extension duration type", "error" );
            //   return false;
            // }
            if (!data.secondary_account_type_extension) {
              this.$swal( "Error!", "Please select your Dependents Extension Plan account type", "error" );
              return false;
            }
            if (!data.secondary_account_type_extension_dependents && data.secondary_account_type_extension != 'lite_plan' && data.secondary_account_type_extension != 'stand_alone_plan') {
              this.$swal( "Error!", "Please select your Dependents Extension Plan secondary account type", "error" );
              return false;
            }
            if (!data.plan_start_extension_dependents ) {
              this.$swal( "Error!", "Please select your Dependents Extension Plan Invoice date", "error" );
              return false;
            }
          }
        }
        if( data.health_spending_account == true ){
          if( data.medical_spending_account == true ){
            console.log('true and medical spending');

            if( !data.medical_spending_start_date ){
              this.$swal( "Error!", "Please select Medical Start date", "error" );
              return false;
            }
            if( !data.medical_spending_end_date ){
              this.$swal( "Error!", "Please select Medical End date", "error" );
              return false;
            }
          }
          if( data.wellness_spending_account == true ){
            if( !data.wellness_spending_start_date ){
              this.$swal( "Error!", "Please select Wellness Start date", "error" );
              return false;
            }
            if( !data.wellness_spending_end_date ){
              this.$swal( "Error!", "Please select Wellness End date", "error" );
              return false;
            }
          }
        }
        if( !data.business_portal_email ){
          this.$swal( "Error!", "Please input your Login ID", "error" );
          return false;
        }
        var checkEmail = this.validateEmail( data.business_portal_email );
        if( !checkEmail ){
          this.$swal( "Error!", "Invalid Login ID email", "error" );
          return false;
        }
        if(!data.disable_password_input){
          if( !data.business_portal_password ){
            this.$swal( "Error!", "Please input your Password", "error" );
            return false;
          }
        }
        if (data.cc_emails.length == 0) {
          data.add_cc = false;
        }
        if( data.benefits_specialist_user_name && !data.benefits_specialist_user_code ){
          this.$swal( "Error!", "Please input your Benefits Specialist User Code", "error" );
          return false;
        }
        return true;
      },
      validateEmail( email ) {
        var comp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;
        return comp.test(email);
      },
      resetCreateCorporateData () {
        this.create_company.emmployee_plan_start = new Date();
        this.create_company.main_plan_invoice_date = new Date();
        this.create_company.plan_start_extension = new Date( moment().add( 1,'months').subtract(1,'days') );
        this.create_company.plan_start_extension_dependents = new Date(moment(this.create_company.plan_start_extension).add(1,'months'));
        this.create_company.employee_plan_start_extension = new Date(moment(this.create_company.plan_start_extension).add(1,'months'));
        this.create_company.medical_spending_start_date = new Date();
        this.create_company.medical_spending_end_date = new Date();
        this.create_company.wellness_spending_start_date = new Date();
        this.create_company.wellness_spending_end_date = new Date();
        this.create_company.send_account_email_date = new Date();
        console.log(this.create_company);
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
      .mg-rgt-20 {
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
