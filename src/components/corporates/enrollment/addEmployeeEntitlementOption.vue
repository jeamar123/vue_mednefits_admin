<script>
  let addEmployeeEntitlementOption = {
    data() {
      return {
        data : false,
        medicalInfoDrop : false,
        wellnessInfoDrop : false,
        medicalSelectDrop : false,
        wellnessSelectDrop : false,
        spending_account_status : {
          medical : true,
          wellness : true,
        },

        isMedicalEntitlementBalance : null,
        isWellnessEntitlementBalance : null,
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
        this.medicalSelectDrop = opt == true ? true : false;
      },
      wellnessSelectToggle( opt ){
        this.wellnessSelectDrop = opt == true ? true : false;
      },
      selectMedicalDropOption( opt ){
        this.isMedicalEntitlementBalance = opt;
        this.medicalSelectDrop = false;
      },
      selectWellnessDropOption( opt ){
        this.isWellnessEntitlementBalance = opt;
        this.wellnessSelectDrop = false;
      },
    }
  }
  
  export default addEmployeeEntitlementOption
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/employeeEnrollment.scss";
</style>