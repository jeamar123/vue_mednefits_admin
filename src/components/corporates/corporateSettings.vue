<script>
  import Modal from "../../views/modal/Modal.vue";
  import axios from "axios";
  import moment, { locale } from "moment";
  import jszip from "jszip";
  import { 
    _showPageLoading_,
	  _hidePageLoading_,
    _fetchDownloadEclaimReceipts_
  } from '../../common/functions/common_functions';

  let corporateSettings = {
    components: {
      Modal,
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
          selected_date:  null,
          date_list:  [],
          filters:  {
            approved: true,
            rejected: true,
            pending: true,
            all: true,
          },
          deviceOs: null,
        },
        monthLabels:  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        global_receiptArr: [],
      };
    },
    created(){

    },
    methods: {
      _formatDate_( date, from, to ){
        return moment( date, from ).format( to );
      },
      _toggleDownloadEclaimModal(){
        this.global_isEclaimDownloadModalShow = this.global_isEclaimDownloadModalShow == true ? false : true;
        if(this.global_isEclaimDownloadModalShow == false){
          this.global_downloadEclaimData =  {
            selected_date:  null,
            date_list:  [],
            filters:  {
              approved: true,
              rejected: true,
              pending: true,
              all: true,
            },
            deviceOs: null,
          };
          this.global_receiptArr = [];
        }
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
      },
      _downloadEclaimReceipts_(){
        let params  = {
          customer_id: this.customer_id,
          dates:  this.global_downloadEclaimData.date_list,
          filters:  [],
        }
        if(this.global_downloadEclaimData.filters.approved){
          params.filters.push(1);
        }
        if(this.global_downloadEclaimData.filters.rejected){
          params.filters.push(0);
        }
        if(this.global_downloadEclaimData.filters.pending){
          params.filters.push(2);
        }
        if(this.global_downloadEclaimData.filters.all){
          params.filters.push(3);
        }
        _fetchDownloadEclaimReceipts_(params)
          .then((res)  =>  {
            console.log(res);
            res.data.data.data.map((value, key) =>  {
              if( value.out_of_networks.length > 0 ){
                value.out_of_networks.map((receipt, receipt_key) =>  {
                  this.global_receiptArr.push(receipt);
                  if(receipt_key == value.out_of_networks.length - 1){
                    this._downloadAllReceipts_();
                  }
                });
              }else{
                if(key == res.data.data.data.length - 1){
                  this._downloadAllReceipts_();
                }
              }
            });
          });
      },
      _addDate_(date){
        if(_.includes(this.global_downloadEclaimData.date_list, moment(date).format('YYYY-MM-DD')) == false){
          this.global_downloadEclaimData.date_list.push( moment(date).format('YYYY-MM-DD') );
        }
        this.global_downloadEclaimData.selected_date = null;
      },
      _removeDate_(date){
        _.pull(this.global_downloadEclaimData.date_list, date);
        this.$forceUpdate();
      },
      _filterChange_(isAll){
        if(isAll){
          this.global_downloadEclaimData.filters = {
            approved: true,
            rejected: true,
            pending: true,
            all: true,
          };
        }
        if(!this.global_downloadEclaimData.filters.approved || !this.global_downloadEclaimData.filters.rejected || !this.global_downloadEclaimData.filters.pending){
          this.global_downloadEclaimData.filters.all = false;
        }else{
          this.global_downloadEclaimData.filters = {
            approved: true,
            rejected: true,
            pending: true,
            all: true,
          };
        }
      },
      _downloadAllReceipts_(){
        console.log(this.global_receiptArr);
        let companyZip = 'StackYawa';
        let monthFolder = 'January 2020';
        let transactionFolder = 'MNF000826 - MemberName - SpendingType - Status'
      }
    }
  }
  export default corporateSettings
</script>

<style lang="scss" scoped>
	// @import "./src/assets/css/corporateSettings.scss";
</style>