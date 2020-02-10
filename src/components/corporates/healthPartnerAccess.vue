<script>
import axios from "axios";
import moment, { locale } from "moment";

  let  healthPartnerAccess = {
    props: {
      id: [String, Number],
      type: [String, Number]
    },
    data() {
      return {
        block_clinic_list: [],
        block_clinic_opt: 'type',
        block_clinic_region: 'sgd',
        block_clinic_search: null,

        open_clinic_list: [],
        open_clinic_opt: 'type',
        open_clinic_region: 'sgd',
        open_clinic_search: null,
      };
    },
    created(){
      console.log( this.type );
      this.getClinicList();
    },
    methods: {
      getClinicList(){
        // 

        axios.get( axios.defaults.serverUrl + '/company/clinic?token=' + localStorage.getItem('vue_admin_session') + '&corporate_id=9&region=sgd' )
          .then(res => {
            console.log( res );
            
            this.hideLoading();
          })
          .catch(err => {
            this.hideLoading();
            this.errorHandler( err );
          });
      },
    }
  }
  
  export default healthPartnerAccess
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/healthPartnerAccess.scss";
</style>
