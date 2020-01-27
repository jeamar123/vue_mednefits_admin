<script>
  let corporateInformation = {
    data() {
      return {
        empSelectorActive: {
          value: 0,
          text: ""
        }
      };
    },
    created(){

    },
    methods: {
      showEmpSelectorInfo(value, text) {
        this.empSelectorActive.value = value;
        this.empSelectorActive.text = text;
      }
    }
  }
  
  export default corporateInformation
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporates.scss";
</style>
