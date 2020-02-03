<script>
  let employeeEntitlement = {
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
        emp_entitlement: {
          medical_new_entitlement: '',
          wellness_new_entitlement: '',
        },
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
    },
    methods: {
      // selectCorporateView( opt ){
      //   this.corporateViewStatus = opt;
      //   this.$router.push( { name : opt } );
      // }
      entitlementCalc( type, cal ) {

        if ( cal == 1 ) {
          this.cal_one = true;
        }

        if ( cal == 2 ) {
          this.cal_two = true;
        }

        if ( type == 'medical' ) {
          this.medicalCalculatedInfo = true;
        }

        if ( type == 'wellness' ) {
          this.wellnessCalculatedInfo = true;
        }
        
        
      },
      updateEntitlement() {

        if ( this.cal_one == true && this.cal_two == false ) {
          console.log('medical');
        }

        if ( this.cal_two == true && this.cal_one == false ) {
          console.log('wellness');
        }

        if ( this.cal_one == true && this.cal_two == true ) {
          console.log('medical ug wellness');
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