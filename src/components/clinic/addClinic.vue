<script>

  let addClinic = {
    data() {
      return {
        activeStep : 1
      };
    },
    created(){

    },
    methods: {
    	prevStep(){
            this.activeStep -= 1;
        },
        nextStep(){
            this.activeStep += 1;
        },
        submitAddClinic(){
            this.activeStep = 1;
            window.location = '/#/dashboard/clinic';
        }
    }
  }
  
  export default addClinic
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/clinic.scss";
</style>
