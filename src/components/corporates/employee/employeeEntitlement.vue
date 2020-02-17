<script>
  import moment from "moment";
  import axios from "axios";

  let employeeEntitlement = {
    props: {
      member_id: [String, Number],
      name: [String, Number]
    },
    data() {
      return {
        empSelectorActive: {
          value: 0,
          text: ""
        },
        dropdownEntitlement: {
          med_alloc_formula: false,
          well_alloc_formula: false,
        },
        // sample data
        emp_entitlement: {
          original_medical_entitlement: 5,
          original_wellness_entitlement: 12,
          medical_new_entitlement: '',
          wellness_new_entitlement: '',
          medical_proration: 'months',
          wellness_proration: 'months',

          updated_medical_entitlement: false,
          updated_wellness_entitlement: false,
        },
        employee_info: {
          currency_type: 'SGD',
        },
        // end of sample data
        new_allocation_med: parseFloat(0).toFixed(2),
        new_allocation_well: parseFloat(0).toFixed(2),
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        med_effective_date: null,
        well_effective_date: null,
        medicalCalculatedInfo: false,
        wellnessCalculatedInfo: false,
        cal_one: false,
        cal_two: false,
        get_calc_medical: {},
        get_calc_wellness: {},

        new_credits_medical: 0,
        old_credits_medical: 0,
        effective_date_medical: undefined,

        new_credits_wellness: 0,
        old_credits_wellness: 0,
        effective_date_wellness: undefined,

        medical_entitlement: 0,
        wellness_entitlement: 0,
        effectiveMedDateError: false,
        effectiveWellDateError: false,
        medical_entitlement_status: undefined,
        wellness_entitlement_status: undefined,
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
      console.log(`${this.member_id} ug is ${this.name}`);
      this.onLoad();
      // console.log(this.get_calc_medical.entitlement_status.old_entitlement_credits);
    },
    methods: {
      onLoad() { 
        this.showLoading();
        axios.all([ // para sunod ang pag tawag sa api(In-Order)
            this.getEmployeeDetails(),
            this.getCalcData(),

          ]).then(res => {
            //methods if naa
            let res_len = res.length;
            res.map((value, index) => {
              if (index == res.length - 1) {
                this.hideLoading();
              }
            });
          })
          .catch(err => {
            this.hideLoading();
            this.errorHandler(err);
          });
      },

      // Api calls
      getEmployeeDetails() {
        // for single  buttons or manual trigger
        let get_employee_details = `${axios.defaults.serverUrl}/company/get_employee_details?member_id=${this.member_id}`;
        axios.get(get_employee_details)
          .then(res => {
            // Log the data to the console
            // You would do something with both sets of data here
            console.log(res);
            if (res.status == 200) {
              this.employee_info = res.data.data
              // this.start_date_entitlement = moment(this.employee_info.start_date).format('DD/MM/YYYY')
              // localStorage.employee_email = this.employee_info.work_email;
              // console.log(this.start_date_entitlement);
              console.log(this.employee_info);
            }
            // this.$parent.hideLoading();
          }).catch(err => {
            this.hideLoading();
            this.errorHandler(err);
          });
      },

      getMemberEntitlement() {
        this.emp_entitlement.medical_entitlement_date = moment(this.med_effective_date).format('DD/MM/YYYY');
        this.emp_entitlement.wellness_entitlement_date = moment(this.well_effective_date).format('DD/MM/YYYY');
        // console.log(this.med_effective_date);
        //sample update entitlement
        this.emp_entitlement.updated_medical_entitlement = true;
        this.emp_entitlement.updated_wellness_entitlement = true;
      },

      getCalcData() {
        this.showLoading();
        let get_calc_details = `${axios.defaults.serverUrl}/company/get_member_entitlement_calculation_details?member_id=${this.member_id}`;
        axios.get(get_calc_details)
					.then(response => {
            // console.log(response);
            this.hideLoading();
            this.get_calc_medical = response.data.medical;
            this.get_calc_wellness = response.data.wellness;
            
            if (this.get_calc_medical.entitlement_status != null ) {    
              this.effective_date_medical = moment(this.get_calc_medical.entitlement_status.effective_date).format('DD/MM/YYYY');
              this.old_credits_medical = this.get_calc_medical.entitlement_status.old_entitlement_credits;
              this.new_credits_medical = this.get_calc_medical.entitlement_status.new_entitlement_credits;
            }

            if (this.get_calc_wellness.entitlement_status != null ) {            
              this.effective_date_wellness = moment(this.get_calc_wellness.entitlement_status.effective_date).format('DD/MM/YYYY');
              this.old_credits_wellness = this.get_calc_wellness.entitlement_status.old_entitlement_credits;
              this.new_credits_wellness = this.get_calc_wellness.entitlement_status.new_entitlement_credits;
            }
            
                      
            // console.log('reponse sa get calculate',response);

            //trap for exceeding spending end date
            if ( new Date(this.med_effective_date) > new Date(this.get_calc_medical.medical_spending_validate_end_date) ) {
              this.effectiveMedDateError = true;
              console.log('trigger');
            } else {
              this.effectiveMedDateError = false;
            }

            if ( new Date(this.well_effective_date) > new Date(this.get_calc_wellness.wellness_spending_validate_end_date) ) {
              this.effectiveWellDateError = true;
            } else {
              this.effectiveWellDateError = false;
            }
					})
					.catch(err => {
						this.$parent.hideLoading();
						this.errorHandler(err);
					});
      },
      entitlementCalc( type, cal ) {
        this.getCalcData();
        this.entitlement_calc_type = type;

        this.med_data = {
          member_id: this.member_id,
          new_entitlement_credits: this.emp_entitlement.medical_new_entitlement,
          entitlement_usage_date: moment(this.med_effective_date).format('YYYY-MM-DD'),
          proration_type: this.emp_entitlement.medical_proration,
          entitlement_spending_type: 'medical',
        }

        this.well_data = {
          member_id: this.member_id,
          new_entitlement_credits: this.emp_entitlement.wellness_new_entitlement,
          entitlement_usage_date: moment(this.well_effective_date).format('YYYY-MM-DD'),
          proration_type: this.emp_entitlement.wellness_proration,
          entitlement_spending_type: 'wellness',
        }

        if ( cal == 1 ) {
          this.cal_one = true;
        }

        if ( cal == 2 ) {
          this.cal_two = true;
        }

        if ( type == 'medical' ) {
          // this.getCalcData();
          this.medicalCalculatedInfo = true;
          // console.log(this.med_data);
          
          //medical calculate two dates
          if ( this.emp_entitlement.medical_proration == 'months' ) {
            this.medical_plan_duration = moment(new Date(this.get_calc_medical.medical_spending_validate_end_date)).diff(new Date(this.get_calc_medical.medical_usage_date), 'months', false) + 1;
            console.log('medical_plan_duration',this.medical_plan_duration);

            if( new Date(this.med_effective_date) < new Date(this.get_calc_medical.medical_usage_date) ){
              // console.log('true siya');
              this.med_plan_month_duration = moment(new Date(this.get_calc_medical.medical_usage_date)).diff(new Date(this.med_effective_date), 'months', false) + 1;
              // console.log('plan month duration Months',this.med_plan_month_duration);
            } else {
              // console.log('false siya');
              this.med_plan_month_duration = moment(new Date(this.med_effective_date)).diff(new Date(this.get_calc_medical.medical_usage_date), 'months', false) + 1;
              // console.log('plan month duration Months',this.med_plan_month_duration);
            }

            this.med_entitlement_duration = moment(new Date(this.get_calc_medical.medical_spending_validate_end_date)).diff(new Date(this.med_effective_date), 'months', false) + 1;
            // console.log('entitlement duration Months',this.med_entitlement_duration);
          }
          if ( this.emp_entitlement.medical_proration == 'days' ) {
            console.log('days');
            this.medical_plan_duration = moment(new Date(this.get_calc_medical.medical_spending_validate_end_date)).diff(new Date(this.get_calc_medical.medical_usage_date), 'days', false) + 1;
            // console.log('medical_plan_duration Days',this.medical_plan_duration);

            if( new Date(this.med_effective_date) < new Date(this.get_calc_medical.medical_usage_date) ){
              console.log('true siya');
              this.med_plan_month_duration = moment(new Date(this.get_calc_medical.medical_usage_date)).diff(new Date(this.med_effective_date), 'days', false) + 1;
              console.log('plan month duration Days',this.med_plan_month_duration);
            } else {
              console.log('false siya');
              this.med_plan_month_duration = moment(new Date(this.med_effective_date)).diff(new Date(this.get_calc_medical.medical_usage_date), 'days', false) + 1;
              console.log('plan month duration Days',this.med_plan_month_duration);
            }  

            this.med_entitlement_duration = moment(new Date(this.get_calc_medical.medical_spending_validate_end_date)).diff(new Date(this.med_effective_date), 'days', false) + 1;
            // console.log('entitlement duration Days',this.med_entitlement_duration);
          }

          //calcuation in medical
          this.new_allocation_med = this.get_calc_medical.medical_entitlement * this.med_plan_month_duration / this.medical_plan_duration 
          + this.emp_entitlement.medical_new_entitlement * this.med_entitlement_duration / this.medical_plan_duration;
          // console.log(this.sample);
          this.new_allocation_med = parseFloat(this.new_allocation_med).toFixed(2);
        }

        if ( type == 'wellness' ) {
          // this.getCalcData();
          this.wellnessCalculatedInfo = true;
          console.log(this.well_data);

          //wellness calculate two dates
          if ( this.emp_entitlement.wellness_proration == 'months' ) {
            console.log('months');
            this.wellness_plan_duration = moment(new Date(this.get_calc_wellness.wellness_spending_validate_end_date)).diff(new Date(this.get_calc_wellness.wellness_usage_date), 'months', false) + 1;
            // console.log('wellness_plan_duration Months',this.wellness_plan_duration);

            if( new Date(this.well_effective_date) < new Date(this.get_calc_wellness.wellness_usage_date) ){
              // console.log('true siya');
              this.well_plan_month_duration = moment(new Date(this.get_calc_wellness.wellness_usage_date)).diff(new Date(this.well_effective_date), 'months', false) + 1;
              // console.log('plan month duration Months',this.well_plan_month_duration);
            } else {
              // console.log('false siya');
              this.well_plan_month_duration = moment(new Date(this.well_effective_date)).diff(new Date(this.get_calc_wellness.wellness_usage_date), 'months', false) + 1;
              // console.log('plan month duration Months',this.well_plan_month_duration);
            }

            this.well_entitlement_duration = moment(new Date(this.get_calc_wellness.wellness_spending_validate_end_date)).diff(new Date(this.well_effective_date), 'months', false) + 1;
            // console.log('entitlement duration Months',this.well_entitlement_duration);

          }
          if ( this.emp_entitlement.wellness_proration == 'days' ) {
            console.log('days');
            this.wellness_plan_duration = moment(new Date(this.get_calc_wellness.wellness_spending_validate_end_date)).diff(new Date(this.get_calc_wellness.wellness_usage_date), 'days', false) + 1;
            // console.log(this.wellness_plan_duration);

            if( new Date(this.well_effective_date) < new Date(this.get_calc_wellness.wellness_usage_date) ){
              // console.log('true siya');
              this.well_plan_month_duration = moment(new Date(this.get_calc_wellness.wellness_usage_date)).diff(new Date(this.well_effective_date), 'days', false) + 1;
              // console.log('plan month duration Days',this.well_plan_month_duration);
            } else {
              // console.log('false siya');
              this.well_plan_month_duration = moment(new Date(this.well_effective_date)).diff(new Date(this.get_calc_wellness.wellness_usage_date), 'days', false) + 1;
              // console.log('plan month duration Days',this.well_plan_month_duration);
            }  

            this.well_entitlement_duration = moment(new Date(this.get_calc_wellness.wellness_spending_validate_end_date)).diff(new Date(this.well_effective_date), 'days', false) + 1;
            // console.log('entitlement duration Days',this.well_entitlement_duration);
          }

          //calcuation in wellness
          this.new_allocation_well = this.get_calc_wellness.wellness_entitlement * this.well_plan_month_duration / this.wellness_plan_duration 
          + this.emp_entitlement.wellness_new_entitlement * this.well_entitlement_duration / this.wellness_plan_duration;
          // console.log(this.sample);
          this.new_allocation_well = parseFloat(this.new_allocation_well).toFixed(2);
        }
      },
      updateEntitlement() {

        if ( this.cal_one == true && this.cal_two == false ) {
          console.log('medical');
          console.log(this.med_data);
          // this.getMemberEntitlement();

          axios.post(axios.defaults.serverUrl + '/company/create_member_entitlement', this.med_data)
					.then(response => { 
            if (response.data.status) {
              this.$swal("Success!", response.data.message, "success");
              this.getEmployeeDetails();
              this.getCalcData();
              this.emp_entitlement.medical_new_entitlement = '';
              this.$emit('FromEntitlement', true);
            } else {
              this.$swal("Error!", response.data.message, "error");
            }
          }).catch(err => {
            this.hideLoading();
            this.errorHandler(err);
          });

        }

        if ( this.cal_two == true && this.cal_one == false ) {
          console.log('wellness');
          console.log(this.well_data);
          // this.getMemberEntitlement();

          axios.post(axios.defaults.serverUrl + '/company/create_member_entitlement', this.well_data)
					.then(response => { 
            if (response.data.status) {
              this.$swal("Success!", response.data.message, "success");
              this.getEmployeeDetails();
              this.getCalcData();
              this.emp_entitlement.wellness_new_entitlement = '';
              this.$emit('FromEntitlement', true);
            } else {
              this.$swal("Error!", response.data.message, "error");
            }
          }).catch(err => {
            this.hideLoading();
            this.errorHandler(err);
          });
        }

        if ( this.cal_one == true && this.cal_two == true ) {
          console.log('medical ug wellness');

          axios.post(axios.defaults.serverUrl + '/company/create_member_entitlement', this.med_data)
					.then(response => { 
            if (response.data.status) {
              this.$swal("Success!", response.data.message, "success");
              // this.getEmployeeDetails();
              // this.getCalcData();
              console.log('sulod sa medical');
              this.emp_entitlement.medical_new_entitlement = '';
            } else {
              this.$swal("Error!", response.data.message, "error");
            }
          }).catch(err => {
            this.hideLoading();
            this.errorHandler(err);
          });

          axios.post(axios.defaults.serverUrl + '/company/create_member_entitlement', this.well_data)
					.then(response => { 
            if (response.data.status) {
              this.$swal("Success!", response.data.message, "success");
              this.getEmployeeDetails();
              this.getCalcData();
              console.log('sulod sa wellness');
              this.emp_entitlement.wellness_new_entitlement = '';
            } else {
              this.$swal("Error!", response.data.message, "error");
            }
          }).catch(err => {
            this.hideLoading();
            this.errorHandler(err);
          });
        }
      },
    }
  }
  
  export default employeeEntitlement
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporateEmployee.scss";
</style>

<style type="text/css">
  @media( max-width: 400px ) {
    .entitlement-date-picker  .popover-origin .popover-content-wrapper .popover-content {
      left: -63px;
    }

    .entitlement-date-picker  .popover-origin .popover-content-wrapper .popover-content.align-left:after {
      left: 75px;
    }
  }
  
</style>