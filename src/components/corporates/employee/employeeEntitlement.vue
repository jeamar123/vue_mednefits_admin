<script>
  let employeeEntitlement = {
    data() {
      return {
        empSelectorActive: {
          value: 0,
          text: ""
        },
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        med_effective_date: undefined,
        well_effective_date: undefined,
        emp_entitlement: {},
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