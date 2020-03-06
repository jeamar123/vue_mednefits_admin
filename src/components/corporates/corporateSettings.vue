<script>
  import Modal from "../../views/modal/Modal.vue";
  import axios from "axios";
  // import { 
  //   _loginAccessAccount_
  // } from '../../common/functions/common_functions';

  let corporateSettings = {
    components: {
      Modal
    },
    props: {
      customer_id: [String, Number],
		  company_name: [String, Number],
    },
    data() {
      return {
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_isEclaimDownloadModalShow: false,
        global_downloadEclaimData:  {
          selected_date:  new Date(),
          date_list:  [],
          filters:  {
            approved: true,
            rejected: true,
            pending: true,
            all: true,
          }
        },
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
      console.log( this.customer_id );
      console.log( this.company_name );
    },
    methods: {
      _toggleDownloadEclaimModal(){
        this.global_isEclaimDownloadModalShow = this.global_isEclaimDownloadModalShow == true ? false : true;
      },
      ___loginCompanyAccount() {
        window.open( axios.defaults.serverUrl + '/company/settings_access_account?token=' + localStorage.getItem('vue_admin_session') + '&customer_id=' + this.customer_id );
      },
      ___downloadEmployeeLists() {
        window.location.href = axios.defaults.serverUrl + '/company/download_employee_list_credits?token=' + localStorage.getItem('vue_admin_session') + '&customer_id=' + this.customer_id;
      },
    }
  }
  
  export default corporateSettings
</script>

<style lang="scss" scoped>
	// @import "./src/assets/css/corporateSettings.scss";
</style>