<script>
  let corporateEmployeeMenu = {
    data() {
      return {
        empSelectorActive : {
          value : 0,
          text : 'lorem ipsum',
        }
      };
    },
    created(){

    },
    methods: {
      showEmpSelectorInfo(value, text) {
        if( value == 0 && value != this.empSelectorActive.value ){
          this.$router.push({ name : 'EmployeeInformation' });
        }
        if( value == 1 && value != this.empSelectorActive.value ){
          this.$router.push({ name : 'DependentInformation' });
        }
        if( value == 2 && value != this.empSelectorActive.value ){
          this.$router.push({ name : 'ClaimSubmission' });
        }
        if( value == 3 && value != this.empSelectorActive.value ){
          this.$router.push({ name : 'EmployeeSettings' });
        }

        this.empSelectorActive.value = value;
        this.empSelectorActive.text = text;
      },
    }
  }
  
  export default corporateEmployeeMenu
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporateEmployee.scss";
</style>
