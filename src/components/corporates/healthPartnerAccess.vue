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
