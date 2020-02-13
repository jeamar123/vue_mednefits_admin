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
        showInNetwork: false,
        showOutNetwork: false,
        showDaytimeOption: false,
        showTimeOption: false,
        showClaimTypeListOption: false,
        showMemberListOption: false,

        isInMemberDropShow: false,
        isInPartnerDropShow: false,
        isInServiceDropShow: false,
        isInVisitTimeDropShow: false,
        isInDayTimeDropShow: false,
        isInPaymentTypeDropShow: false,
        inNetworkClaimSummaryModal: false,

        starDateDetails: {
          startDate: undefined,
        },

        inNetwork_data: {
          member: '',
          member_data: {},
          health_partner: '',
          health_partner_data: {},
          service_text: '',
          service: [],
          service_data: [],
          visit_date: new Date(),
          visit_time: moment().format('hh : mm'),
          daytime: moment().format('A'),
          payment_type: '',
          amount: '',
        },
        timePickerValues: {
          hour: Number( moment().format('h') ),
          minute: Number( moment().format('m') ),
        },

        memberList : [],
        clinicList : [],
        serviceList : [],
      };
    },
    created(){
      this.showLoading();
      axios.all([ //butang sa array ang ipa load na api or function para in order pag tawag.
        this.getMemberList( true ),
        this.getClinicList( true )
			]).then(res => {
        console.log(res);
        this.getMemberList( false, res[0] );
        this.getClinicList( false, res[1] );
				this.hideLoading();
			}).catch(err => {
        this.hideLoading();
        this.errorHandler( err );
			});
    },
    methods: {
      
      

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



      // TimePicker
        setVisitTime(){
          this.inNetwork_data.visit_time = (this.timePickerValues.hour < 10 ? 0 : '') + '' + this.timePickerValues.hour + ' : ' + (this.timePickerValues.minute < 10 ? 0 : '') + '' + this.timePickerValues.minute;
        },
        timeHour( opt ){
          if( opt == true ){
            this.timePickerValues.hour = ( this.timePickerValues.hour == 12 ) ? 1 : this.timePickerValues.hour + 1;
          }
          if( opt == false ){
            this.timePickerValues.hour = ( this.timePickerValues.hour == 1 ) ? 12 : this.timePickerValues.hour - 1;
          }
          this.setVisitTime();
        },
        timeMinute( opt ){
          if( opt == true ){
            this.timePickerValues.minute = ( this.timePickerValues.minute == 59 ) ? 0 : this.timePickerValues.minute + 1;
          }
          if( opt == false ){
            this.timePickerValues.minute = ( this.timePickerValues.minute == 0 ) ? 59 : this.timePickerValues.minute - 1;
          }
          this.setVisitTime();
        },



      // IN NETWORK FUNCTIONS
        toggleMemberDrop(){
          this.isInMemberDropShow = this.isInMemberDropShow == true ? false : true;
        },
        selectMember( data ){
          console.log( data );
          this.isInMemberDropShow = false;
          this.inNetwork_data.member = data.name;
          this.inNetwork_data.member_data = data;
        },
        partnerInputChanged( data ){
          // console.log( data );
          if( data.length > 2 ){
            this.isInPartnerDropShow = true;
          }else{
            this.isInPartnerDropShow = false;
          }
        },
        selectHealthPartner( data ){
          // console.log( data );
          this.isInPartnerDropShow = false;
          this.inNetwork_data.health_partner = data.name;
          this.inNetwork_data.health_partner_data = data;
          this.inNetwork_data.service_text = '';
          this.inNetwork_data.service = [];
          this.inNetwork_data.service_data = [];
          this.getServiceList( data.health_provider_id );
        },
        toggleServiceDrop(){
          this.isInServiceDropShow = this.isInServiceDropShow == true ? false : true;
        },
        selectService( data, index ){
          // console.log( data );
          if( !this.serviceList[ index ].selected ){
            this.serviceList[ index ].selected = true;
            this.inNetwork_data.service.push( data.service_name );
            this.inNetwork_data.service_text = '';
            this.inNetwork_data.service.map((value,key) => {
              if( key != 0 ){
                this.inNetwork_data.service_text += ',';
              }
              this.inNetwork_data.service_text += value;
            });
            this.inNetwork_data.service_data.push( data );
          }
        },
        removeService( data, index ){
          this.serviceList[ index ].selected = false;
          this.inNetwork_data.service.splice( $.inArray( data.service_name, this.inNetwork_data.service ), 1 );
          this.inNetwork_data.service_data.splice( $.inArray( data.service_name, this.inNetwork_data.service ), 1 );
          this.inNetwork_data.service_text = '';
          this.inNetwork_data.service.map((value,key) => {
            if( key != 0 ){
              this.inNetwork_data.service_text += ',';
            }
            this.inNetwork_data.service_text += value;
          });
        },
        toggleVisitTimeDrop() {
          this.isInDayTimeDropShow = false;
          this.isInVisitTimeDropShow = this.isInVisitTimeDropShow == false ? true : false;
        },
        toggleDayTimeDrop() {
          this.isInVisitTimeDropShow = false;
          this.isInDayTimeDropShow = this.isInDayTimeDropShow == false ? true : false;
        },
        selectDayTime( opt ){
          this.isInDayTimeDropShow = false;
          this.inNetwork_data.daytime = opt;
        },
        togglePaymentTypeDrop(){
          this.isInPaymentTypeDropShow = this.isInPaymentTypeDropShow == false ? true : false;
        },
        selectPaymentType( opt ){
          this.isInPaymentTypeDropShow = false;
          this.inNetwork_data.payment_type = opt;
        },
        hideAllDrop( e ){
          if ($(e.target).parents(".member-input-wrapper").length === 0) {
            this.isInMemberDropShow = false;
          }
          if ($(e.target).parents(".partner-input-wrapper").length === 0) {
            this.isInPartnerDropShow = false;
          }
          if ($(e.target).parents(".service-input-wrapper").length === 0) {
            this.isInServiceDropShow = false;
          }
          if ($(e.target).parents(".visit-time-input-wrapper").length === 0) {
            this.isInVisitTimeDropShow = false;
            this.isInDayTimeDropShow = false;
          }
          if ($(e.target).parents(".payment-type-input-wrapper").length === 0) {
            this.isInPaymentTypeDropShow = false;
          }
          this.$forceUpdate();
        },
        inNetworkSubmitData( in_network_data ) { 
          console.log( in_network_data );
          this.inNetworkClaimSummaryModal = true;
        },
        hideSummaryModal(){
          this.inNetworkClaimSummaryModal = false;
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
      getServiceList( clinic_id ) {
        this.showLoading();
        axios.get( axios.defaults.serverUrl + '/clinics/get_clinic_services?clinic_id=' + clinic_id )
          .then(res => {
            console.log( res );
            this.serviceList = res.data.data;
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
  .xs-in-network-form .vDatepicker{
    background: transparent;
    border: none !important;
    font-weight: 700;
  }
  .xs-in-network-form .vDatepicker::placeholder{
    font-weight: 300;
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