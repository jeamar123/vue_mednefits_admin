<script>
  let clinicMenu = {
    data() {
      return {
        clinicViewStatus : 'clinic_details',
      };
    },
    created(){
        console.log( this.$route.name );
        this.clinicViewStatus = this.$route.name;
    },
    methods: {
    	selectClinicView( opt ){
    		this.clinicViewStatus = opt;
            this.$router.push( { name : opt } );
    	},
    }
  }
  
  export default clinicMenu
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/clinic.scss";
</style>
