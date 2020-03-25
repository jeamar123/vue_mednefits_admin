<script>
import { 
  _showPageLoading_,
  _hidePageLoading_,
  _fetchCompanyBusinessDetails_,
  _updateCompanyStatus_,
  _updateCompanyBusinessDetails_,
  _deleteCompanyContact_,
  _addBenefitsSpecialist_,
  _formChecker_
} from '../../common/functions/common_functions';

  let businessDetails = {
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        global_businessDetails: {
          business_contact: {},
          billingContactDetails: {},
          benefitsSpecialistUser: {
            name: null,
            cold: null,
          },
        },
      };
    },
    created(){
      this._getDetails_();
    },
    methods: {
      _getDetails_(){
        let params  = {
          customer_id:  this.customer_id,
        }
        _showPageLoading_();
        _fetchCompanyBusinessDetails_(params)
          .then((res)  =>  {
            console.log(res);
            _hidePageLoading_();
            this.global_businessDetails = res.data.data;
            this.global_businessDetails.business_contact = res.data.data.business_contact == null ? {} : res.data.data.business_contact;
            this.global_businessDetails.billingContactDetails = res.data.data.billingContactDetails == null ? {} : res.data.data.billingContactDetails;
            this.global_businessDetails.benefitsSpecialistUser = res.data.data.benefitsSpecialistUser == null ? {} : res.data.data.benefitsSpecialistUser;
          });
      },
      _updateHrAccountStatus_(){
        let params  = {
          company_id: Number(this.customer_id),
          status: this.global_businessDetails.active == 1 ? 0 : 1,
        }
        _showPageLoading_();
        _updateCompanyStatus_(params)
        .then((res)  =>  {
          console.log(res);
          if(res.status == 200 || res.status == 201){
            this._getDetails_();
            this.$swal('Success!', res.data.message, 'success');
          }else{
            _hidePageLoading_();
            this.$swal('Error!', res.data.message, 'error');
          }
        });
      },
      _addRemoveContacts_(opt, id){
        if(opt == 'add'){
          let data = {
            first_name: null,
            last_name: null,
            email: null,
            phone: null,
            send_email_communication: 0,
            send_email_billing: 0,
          }
          this.global_businessDetails.companyContacts.push(data);
        }
        if(opt == 'remove'){
          // this.global_businessDetails.companyContacts.splice( index, 1 );
          let params  = {
            company_id: Number(this.customer_id),
            company_contact_id: id,
          }
          _showPageLoading_();
          _deleteCompanyContact_(params)
            .then((res)  =>  {
              console.log(res);
              if(res.status == 200 || res.status == 201){
                this._getDetails_();
                // this.$swal('Success!', res.data.message, 'success');
              }else{
                _hidePageLoading_();
                this.$swal('Error!', res.data.message, 'error');
              }
            });
        }
      },
      _updateBusinessDetails_(){
        let params =  {
          company_id:	Number(this.customer_id),
          company_name: this.global_businessDetails.company_name,
          company_address: this.global_businessDetails.company_address,
          postal_code: this.global_businessDetails.postal_code,
          peak_status: this.global_businessDetails.peak_status,
          status:	this.global_businessDetails.active,
          spending_notification:	this.global_businessDetails.spending_notification,
          contacts: this.global_businessDetails.business_contact,
          billingContactDetails: this.global_businessDetails.billingContactDetails,
          companyContacts: this.global_businessDetails.companyContacts
        }
        if( _formChecker_(params) == false ){
          return false;
        }
        if(_formChecker_(params.contacts) == false){
          return false;
        }
        if(_formChecker_(params.billingContactDetails) == false){
          return false;
        }
        _showPageLoading_();
        _updateCompanyBusinessDetails_(params)
          .then((res)  =>  {
            console.log(res);
            if(res.status == 200 || res.status == 201){
              this._getDetails_();
              this.$parent.$parent.refreshCorporateDetails()
              this.$swal('Success!', res.data.message, 'success');
            }else{
              _hidePageLoading_();
              this.$swal('Error!', res.data.message, 'error');
            }
          });
      },
      _toggleButtons_(opt, value){
        if(opt == 'clinic_peak_status'){
          this.global_businessDetails.peak_status = value;
        }
        if(opt == 'spending_invoice_notif'){
          this.global_businessDetails.spending_notification = value;
        }
        this._updateBusinessDetails_();
      },
      _addSpecialist_(){
        let params  = {
          company_id:	Number(this.customer_id),
          code:	this.global_businessDetails.benefitsSpecialistUser.code,
          name:	this.global_businessDetails.benefitsSpecialistUser.name
        }
        _showPageLoading_();
        _addBenefitsSpecialist_(params)
        .then((res)  =>  { 
          console.log(res);
          if(res.status == 200 || res.status == 201){
            this._getDetails_();
            this.$swal('Success!', res.data.message, 'success');
          }else{
            _hidePageLoading_();
            this.$swal('Error!', res.data.message, 'error');
          }
        });
      },
    }
  }
  
  export default businessDetails
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/businessDetails.scss";
</style>
