<script>
  let corporateEmployeeMenu = {
    data() {
      return {
        data : null,
      };
    },
    created(){
      console.log( this.$route );
    },
    methods: {
      showEmpSelectorInfo(  page ) {
        this.$router.push({ name : page });
      },
    }
  }
  
  export default corporateEmployeeMenu
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporateEmployee.scss";
</style>
