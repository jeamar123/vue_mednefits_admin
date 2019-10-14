<script>
  let corporateEmployeeInformation = {
    data() {
      return {
        empSelectorActive: {
          value: 0,
          text: ""
        },
        showInNetwork: false,
        showOutNetwork: false
      };
    },
    created(){

    },
    methods: {
      showEmpSelectorInfo(value, text) {
        this.empSelectorActive.value = value;
        this.empSelectorActive.text = text;
      },
      toggleShowInNetwork(data) {
        let x = data;
        if ( x === "in-network" ) {
          this.showInNetwork = true;
          console.log('true');
        } else if ( x === "cancel" ) {
          this.showInNetwork = false;
        }
      },
      toggleShowOutNetwork(data) {
        let x = data;
        if ( x === "out-network" ) {
          this.showOutNetwork = true;
          console.log('true');
        } else if ( x === "cancel" ) {
          this.showOutNetwork = false;
        }
      }
    }
  }
  
  export default corporateEmployeeInformation
</script>

<style lang="scss">
	@import "./src/assets/css/corporates.scss";
</style>
