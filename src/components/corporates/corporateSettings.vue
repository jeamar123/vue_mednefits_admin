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
          },
          deviceOs: null,
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
        if (this.device0s == 'iOS') {
          window.location.assign( axios.defaults.serverUrl + '/company/settings_access_account?token=' + localStorage.getItem('vue_admin_session') + '&customer_id=' + this.customer_id );
        } else {
          console.log('access account');
          window.open( axios.defaults.serverUrl + '/company/settings_access_account?token=' + localStorage.getItem('vue_admin_session') + '&customer_id=' + this.customer_id );
        }
      },
      ___downloadEmployeeLists() {
        window.location.href = axios.defaults.serverUrl + '/company/download_employee_list_credits?token=' + localStorage.getItem('vue_admin_session') + '&customer_id=' + this.customer_id;
      },
      getOs() {
        let userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;

            if (macosPlatforms.indexOf(platform) !== -1) {
              os = 'Mac OS';
            } else if (iosPlatforms.indexOf(platform) !== -1) {
              os = 'iOS';
            } else if (windowsPlatforms.indexOf(platform) !== -1) {
              os = 'Windows';
            } else if (/Android/.test(userAgent)) {
              os = 'Android';
            } else if (!os && /Linux/.test(platform)) {
              os = 'Linux';
            }
            
            this.deviceOs = os;
      },
      ___resendEmpWelcomeEmail() {
        this.$swal({
          title: "",
          text: "Are you sure you want to resend employee welcome email?",
          type: "warning",
          confirmButtonColor: "#25306C",
          cancelButtonColor: "#C1C1C1",
          showCancelButton: true,
          showCloseButton: false,
          confirmButtonText: "Yes, Send it!",
          reverseButtons: true,
        }).then(result => {
          if (result.value == true) {
            let data =  {
              customer_id: this.customer_id,
            }
            this.$parent.showLoading();
            axios.post( axios.defaults.serverUrl + '/company/resend_welcome_email', data )
              .then(( res ) => {
                if( res.status == 200 || res.status == 201 ){ 
                  this.$parent.hideLoading();
                  this.$swal( "Success!", res.data.message, "success" );
                }
              })
          }
        });
      }
    }
  }
  export default corporateSettings
</script>

<style lang="scss" scoped>
	// @import "./src/assets/css/corporateSettings.scss";
</style>