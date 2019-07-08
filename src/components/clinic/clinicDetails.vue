<script>

  let clinicDetails = {
    data() {
      return {
        peakHoursData : [{ day: 'Monday' },{ day: 'Tuesday' },{ day: 'Wednesday' },{ day: 'Thursday' },{ day: 'Friday' },{ day: 'Saturday' },{ day: 'Friday' }],
        clinicViewStatus : 'clinic_details',
        isAddServicesShow : false,
        isEditService : false,
        isAddDoctorsShow : false,
        isEditDoctor : false,
        peakHoursViewStatus : 'holidays',
      };
    },
    created(){

    },
    methods: {
    	selectClinicView( opt ){
    		this.clinicViewStatus = opt;
    	},
    	editServices( opt ){
    		if( this.isAddServicesShow == false ){
    			this.isAddServicesShow = true;
    		}else{
    			this.isAddServicesShow = false;
    		}
    		this.isEditService = (opt == 'edit') ? true : false;
    	},
    	editDoctors( opt ){
    		if( this.isAddDoctorsShow == false ){
    			this.isAddDoctorsShow = true;
    		}else{
    			this.isAddDoctorsShow = false;
    		}
    		this.isEditDoctor = (opt == 'edit') ? true : false;
    	},
        setPeakHourView( opt ){
            this.peakHoursViewStatus = opt;
        }
    }
  }
  
  export default clinicDetails
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/clinic.scss";
</style>
