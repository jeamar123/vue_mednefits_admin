<script>
let clinicDetails = {
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
          this.$router.push( 'Clinic' );
      }
  }
}
  
export default clinicDetails
</script>

<style lang="scss" scoped>
  @import "./src/assets/css/clinic.scss";
</style>
