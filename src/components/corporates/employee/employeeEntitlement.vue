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

          updated_medical_entitlement: false,
          updated_wellness_entitlement: false,
        },
        calc_entitlement_med: {
          currency_type: 'SGD',
          plan_month_duration: 11,
          plan_year_duration: 3,
          entitlement_duration: 1,
        },
        calc_entitlement_well: {
          currency_type: 'SGD',
          plan_month_duration: 11,
          plan_year_duration: 12,
          entitlement_duration: 1,
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
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
      console.log(`${this.member_id} ug is ${this.name}`);
      this.getEmployeeDetails();
    },
    methods: {
      // selectCorporateView( opt ){
      //   this.corporateViewStatus = opt;
      //   this.$router.push( { name : opt } );
      // }

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
      entitlementCalc( type, cal ) {

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

        // this.medical_date = moment(this.med_data.entitlement_usage_date).format('DD/MM/YYYY');
        // this.plan_month_duration = moment.duration(this.medical_date.diff(this.start_date_entitlement));
        // console.log(this.plan_month_duration);
        // console.log(this.medical_date);
        // console.log(this.start_date_entitlement);
        if ( cal == 1 ) {
          this.cal_one = true;
        }

        if ( cal == 2 ) {
          this.cal_two = true;
        }

        if ( type == 'medical' ) {
          this.medicalCalculatedInfo = true;
          console.log(this.med_data);

          //calcuation in medical
          this.new_allocation_med = this.emp_entitlement.original_medical_entitlement * this.calc_entitlement_med.plan_month_duration / this.calc_entitlement_med.plan_year_duration 
          + this.emp_entitlement.medical_new_entitlement * this.calc_entitlement_med.entitlement_duration / this.calc_entitlement_med.plan_year_duration;
          // console.log(this.sample);
          this.new_allocation_med = parseFloat(this.new_allocation_med).toFixed(2);
        }

        if ( type == 'wellness' ) {
          this.wellnessCalculatedInfo = true;
           console.log(this.well_data);

          //calcuation in wellness
          this.new_allocation_well = this.emp_entitlement.original_wellness_entitlement * this.calc_entitlement_well.plan_month_duration / this.calc_entitlement_well.plan_year_duration 
          + this.emp_entitlement.wellness_new_entitlement * this.calc_entitlement_well.entitlement_duration / this.calc_entitlement_well.plan_year_duration;
          // console.log(this.sample);
          this.new_allocation_well = parseFloat(this.new_allocation_well).toFixed(2);
        }
      },
      updateEntitlement() {

        if ( this.cal_one == true && this.cal_two == false ) {
          console.log('medical');
          console.log(this.med_data);
          this.getMemberEntitlement();
        }

        if ( this.cal_two == true && this.cal_one == false ) {
          console.log('wellness');
          console.log(this.well_data);
          this.getMemberEntitlement();
        }

        if ( this.cal_one == true && this.cal_two == true ) {
          console.log('medical ug wellness');
          console.log(this.med_data);
          console.log(this.well_data);
          this.getMemberEntitlement();
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