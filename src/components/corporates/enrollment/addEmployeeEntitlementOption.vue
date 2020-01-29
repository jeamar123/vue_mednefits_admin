<script>
  let addEmployeeEntitlementOption = {
    data() {
      return {
        data : false,
        medicalInfoDrop : false,
        wellnessInfoDrop : false,
        medicalSelectDrop : false,
        wellnessSelectDrop : false,
      };
    },
    created(){
    },
    methods: {
      showDrop( type, opt ){
        if( type == 1 ){
          this.medicalInfoDrop = opt;
        }
        if( type == 2 ){
          this.wellnessInfoDrop = opt;
        }
      },
      medicalSelectToggle( opt ){
        console.log( opt );
        this.medicalSelectDrop = opt == true ? true : false;
      },
    }
  }
  
  export default addEmployeeEntitlementOption
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/employeeEnrollment.scss";
</style>