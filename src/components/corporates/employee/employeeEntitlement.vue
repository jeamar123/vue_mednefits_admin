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
      this.onLoad();
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
            }
            // this.$parent.hideLoading();
          }).catch(err => {
            this.hideLoading();
            this.errorHandler(err);
          });
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
            

            //trap for exceeding spending end date
            if ( new Date(this.med_effective_date) > new Date(this.get_calc_medical.medical_spending_validate_end_date) ) {
              this.effectiveMedDateError = true;
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
          this.medicalCalculatedInfo = true;
         
          //medical calculate two dates
          if ( this.emp_entitlement.medical_proration == 'months' ) {
            this.medical_plan_duration = moment(new Date(this.get_calc_medical.medical_spending_validate_end_date)).diff(new Date(this.get_calc_medical.medical_usage_date), 'months', false) + 1;

            if( new Date(this.med_effective_date) < new Date(this.get_calc_medical.medical_usage_date) ){
              this.med_plan_month_duration = moment(new Date(this.get_calc_medical.medical_usage_date)).diff(new Date(this.med_effective_date), 'months', false) + 1;
              
            } else {
              this.med_plan_month_duration = moment(new Date(this.med_effective_date)).diff(new Date(this.get_calc_medical.medical_usage_date), 'months', false) + 1;
            }

            this.med_entitlement_duration = moment(new Date(this.get_calc_medical.medical_spending_validate_end_date)).diff(new Date(this.med_effective_date), 'months', false) + 1;
          }
          if ( this.emp_entitlement.medical_proration == 'days' ) {
            this.medical_plan_duration = moment(new Date(this.get_calc_medical.medical_spending_validate_end_date)).diff(new Date(this.get_calc_medical.medical_usage_date), 'days', false) + 1;

            if( new Date(this.med_effective_date) < new Date(this.get_calc_medical.medical_usage_date) ){
              this.med_plan_month_duration = moment(new Date(this.get_calc_medical.medical_usage_date)).diff(new Date(this.med_effective_date), 'days', false) + 1;
            } else {    
              this.med_plan_month_duration = moment(new Date(this.med_effective_date)).diff(new Date(this.get_calc_medical.medical_usage_date), 'days', false) + 1;
            }  

            this.med_entitlement_duration = moment(new Date(this.get_calc_medical.medical_spending_validate_end_date)).diff(new Date(this.med_effective_date), 'days', false) + 1;
          }

          //calcuation in medical
          this.new_allocation_med = this.get_calc_medical.medical_entitlement * this.med_plan_month_duration / this.medical_plan_duration 
          + this.emp_entitlement.medical_new_entitlement * this.med_entitlement_duration / this.medical_plan_duration;
          this.new_allocation_med = parseFloat(this.new_allocation_med).toFixed(2);
        }

        if ( type == 'wellness' ) {
          this.wellnessCalculatedInfo = true;

          //wellness calculate two dates
          if ( this.emp_entitlement.wellness_proration == 'months' ) { 
            this.wellness_plan_duration = moment(new Date(this.get_calc_wellness.wellness_spending_validate_end_date)).diff(new Date(this.get_calc_wellness.wellness_usage_date), 'months', false) + 1;          

            if( new Date(this.well_effective_date) < new Date(this.get_calc_wellness.wellness_usage_date) ){
              this.well_plan_month_duration = moment(new Date(this.get_calc_wellness.wellness_usage_date)).diff(new Date(this.well_effective_date), 'months', false) + 1;
            } else {
              this.well_plan_month_duration = moment(new Date(this.well_effective_date)).diff(new Date(this.get_calc_wellness.wellness_usage_date), 'months', false) + 1;
            }

            this.well_entitlement_duration = moment(new Date(this.get_calc_wellness.wellness_spending_validate_end_date)).diff(new Date(this.well_effective_date), 'months', false) + 1;

          }
          if ( this.emp_entitlement.wellness_proration == 'days' ) {
            this.wellness_plan_duration = moment(new Date(this.get_calc_wellness.wellness_spending_validate_end_date)).diff(new Date(this.get_calc_wellness.wellness_usage_date), 'days', false) + 1;
      
            if( new Date(this.well_effective_date) < new Date(this.get_calc_wellness.wellness_usage_date) ){
              this.well_plan_month_duration = moment(new Date(this.get_calc_wellness.wellness_usage_date)).diff(new Date(this.well_effective_date), 'days', false) + 1;
            } else {
              this.well_plan_month_duration = moment(new Date(this.well_effective_date)).diff(new Date(this.get_calc_wellness.wellness_usage_date), 'days', false) + 1;
            }  

            this.well_entitlement_duration = moment(new Date(this.get_calc_wellness.wellness_spending_validate_end_date)).diff(new Date(this.well_effective_date), 'days', false) + 1;
          }

          //calcuation in wellness
          this.new_allocation_well = this.get_calc_wellness.wellness_entitlement * this.well_plan_month_duration / this.wellness_plan_duration 
          + this.emp_entitlement.wellness_new_entitlement * this.well_entitlement_duration / this.wellness_plan_duration;
          this.new_allocation_well = parseFloat(this.new_allocation_well).toFixed(2);
        }
      },
      updateEntitlement() {

        if ( this.cal_one == true && this.cal_two == false ) {

          axios.post(axios.defaults.serverUrl + '/company/create_member_entitlement', this.med_data)
					.then(response => { 
            if (response.data.status) {
              this.$swal("Success!", response.data.message, "success");
              this.getEmployeeDetails();
              this.getCalcData();
              // this.emp_entitlement.medical_new_entitlement = '';
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

          axios.post(axios.defaults.serverUrl + '/company/create_member_entitlement', this.well_data)
					.then(response => { 
            if (response.data.status) {
              this.$swal("Success!", response.data.message, "success");
              this.getEmployeeDetails();
              this.getCalcData();
              // this.emp_entitlement.wellness_new_entitlement = '';
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
          this.showLoading();
          axios.post(axios.defaults.serverUrl + '/company/create_member_entitlement', this.med_data)
					.then(response => { 
            if (response.data.status) {
              this.getWellnessEntitlementData();
              this.getCalcData();
              this.$emit('FromEntitlement', true);
            } else {
              this.$swal("Error!", response.data.message, "error");
            }
          }).catch(err => {
            this.hideLoading();
            this.errorHandler(err);
          });
          
          // axios.all([
          //   axios.post(axios.defaults.serverUrl + '/company/create_member_entitlement', this.med_data),
          //   axios.post(axios.defaults.serverUrl + '/company/create_member_entitlement', this.well_data),
          // ])
          // .then(res => {
          //   this.hideLoading();
          //   console.log(res);
          //   if ( res[0].status == 201 || res[0].status == 200 ) {
          //     console.log('true ang medical');
          //     this.getCalcData();
          //     this.$emit('FromEntitlement', true);
          //   }

          //   if ( res[1].status == 201 || res[1].status == 200 ) {
          //     console.log('true ang wellness');
          //     this.$emit('FromEntitlement', true);
          //   }
          //   // this.getCalcData();
          //   // this.$emit('FromEntitlement', true);
          // })
          // .catch(err => {
          //   this.hideLoading();
          //   this.errorHandler(err);
          // });
        }
      },
      getWellnessEntitlementData() {
        axios.post(axios.defaults.serverUrl + '/company/create_member_entitlement', this.well_data)
					.then(response => { 
            if (response.data.status) {
              this.$swal("Success!", response.data.message, "success");
              // this.getEmployeeDetails();
              this.getCalcData();
              // this.get_calc_wellness.wellness_entitlement = this.emp_entitlement.wellness_new_entitlement;
              // console.log(this.get_calc_wellness.wellness_entitlement = this.emp_entitlement.wellness_new_entitlement);
              this.$emit('FromEntitlement', true);
            } else {
              this.$swal("Error!", response.data.message, "error");
            }
          }).catch(err => {
            this.hideLoading();
            this.errorHandler(err);
          });
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