<script>
import Modal from "../../../views/modal/Modal.vue";
import axios from "axios";
import moment, { locale } from "moment";

  let claimSubmission = {
    components: {
      Modal
    },
    props: {
      member_id: [String, Number],
    },
    data() {
      return {
        spendingTypeOpt: 'medical',
        step_active: 1,

        inNetworkClaimSummaryModal: false,
        showInNetwork: false,
        showOutNetwork: false,
        showTimeVisitDropdown: false,
        showDaytimeOption: false,
        showTimeOption: false,
        showClaimTypeListOption: false,
        showMemberListOption: false,

        starDateDetails: {
          startDate: undefined,
        },
        inNetwork_data: {
          health_partner: '',
        },

        memberList : [],
        clinicList : [],
      };
    },
    created(){
      console.log( this.member_id );
      console.log( this.inNetwork_data.health_partner );
      // this.getClinicList();
      this.showLoading();
      axios.all([ //butang sa array ang ipa load na api or function para in order pag tawag.
				// axios.get(get_employee_details),
        this.getMemberList( true ),
        this.getClinicList( true )
			]).then(res => {
        console.log(res);
        this.getMemberList( false, res[0] );
        this.getClinicList( false, res[1] );
				this.hideLoading();
			}).catch(err => {
				// if there's an error, log it
        this.hideLoading();
        this.errorHandler( err );
			});
    },
    methods: {
      
      inNetworkSubmit() { 
        this.inNetworkClaimSummaryModal = this.inNetworkClaimSummaryModal == false ? true : false;
      },
      toggleShowInNetwork(data) {
        let x = data;
        if ( x === "in-network" ) {
          this.showInNetwork = true;
        } else if ( x === "cancel" ) {
          this.showInNetwork = false;
        }
      },
      toggleShowOutNetwork(data) {
        let x = data;
        if ( x === "out-network" ) {
          this.showOutNetwork = true;
        } else if ( x === "cancel" ) {
          this.showOutNetwork = false;
        }
      },
      editInNetworkOpt() {
        this.showOutNetwork = true;
      },
      claimTypeListOption() {
        this.showClaimTypeListOption = this.showClaimTypeListOption == false ? true : false;
      },
      memberListOption() {
        this.showMemberListOption = this.showMemberListOption == false ? true : false;
      },
      setSpendingType(opt) {
        this.spendingTypeOpt = opt;
      },
      clickedTimeVisitDropdown() {
        this.showTimeVisitDropdown = this.showTimeVisitDropdown == false ? true : false;
      },
      clickedTimeOption() {
        this.showTimeOption = this.showTimeOption == false ? true : false;
      },
      clickedDaytimeOption() {
        this.showDaytimeOption = this.showDaytimeOption == false ? true : false;
      },
      empDetailsOutNetworkNextBackBtn( data ) {
        let x = data;
        if (x === "next") {
          if (this.step_active == 1) {
            this.step_active = 2;
          } else if (this.step_active == 2) {
            this.step_active = 3;
          }
        }
        if (x === "back") {
          if (this.step_active == 2 ) {
            this.step_active = 1;
          } else if (this.step_active == 3) {
            this.step_active = 2;
          }
        }
      },



      getMemberList( isGetAPI, resData ) {
        var request = axios.get( axios.defaults.serverUrl + '/company/get_members_by_user_id?member_id=' + this.member_id);
        var response = res => {
          console.log( res );
          this.memberList = res.data.data;
          this.hideLoading();
        }
        if( isGetAPI ){ return request; }
        if( resData ){ response( resData ); return false; }
        this.showLoading();
        request.then(response)
        .catch(err => {
          this.hideLoading();
          this.errorHandler( err );
        });
      },
      getClinicList( isGetAPI, resData ) {
        var request = axios.get( axios.defaults.serverUrl + '/clinics/get_clinics' )
        var response = res => {
          console.log( res );
          this.clinicList = res.data.data;
          this.hideLoading();
        }
        if( isGetAPI ){ return request; }
        if( resData ){ response( resData ); return false; }
        this.showLoading();
        request.then(response)
        .catch(err => {
          this.hideLoading();
          this.errorHandler( err );
        });
      },
      getServiceList() {
        this.showLoading();
        axios.get( axios.defaults.serverUrl + '/clinics/get_clinic_services?clinic_id=' + this.member_id)
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
  
  export default claimSubmission
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporateEmployee.scss";
</style>

<style type="text/css">
  .in-network-input-wrapper .vDatepicker,
  .xs-in-network-form .vDatepicker{
    background: transparent;
    border: none !important;
  }
  .out-of-network-form .visit-date-input-wrapper input{
    background-color: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    color: #888;
    height: 34px;
    width: 100%;
    padding: 6px 18px;
  }
</style>