<script>
  import { 
    _fetchCredentialsData_,
    _showPageLoading_,
    _hidePageLoading_,
  } from '../../common/functions/common_functions';

  let corporateCredentials = {
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        global_credentialsData: {
          resend_welcome_email_send_status: undefined,
          access_e_claim: 1,
        },
        type: 'password',
        re_password: undefined,
        global_addBccEmail: undefined,
        cc_emails: [],
        cc_email_err: false,
        cc_email_repeat: false,
      };
    },
    created(){
      this._getCredentialData_();
    },
    methods: {
      _getCredentialData_() {
        let params = {
          customer_id: this.customer_id,
        }
        _showPageLoading_();
        _fetchCredentialsData_(params)
        .then(( res ) => {
          console.log(res);
          if( res.status == 200 || res.status == 201 ){
            this.global_credentialsData = res.data.data;
            _hidePageLoading_();
          }
        });
      },
      _showPassword_() {
        if ( this.type == 'password' ) {
          this.type = "text";
        } else {
          this.type = 'password';
        }
      },
      _generatePassword_() {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let pass = "";
        let length = 8;
        for (let x = 0; x < length; x++) {
          let i = Math.floor(Math.random() * chars.length);
          pass += chars.charAt(i);
        }
       
        this.re_password = pass;
        console.log(this.re_password);
        // this.global_credentialsData.re_password = pass;
        // console.log(this.global_credentialsData.re_password);
      },
      _addCCEmail_( opt ) {
        if (opt == false) {
          this.cc_emails = [];
        }
      },
      _addCreateCompanyCCEmail_( email ) {
        this.cc_email_err = false;

        if ( email != "" || email != null ) {
          var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          if ( regex.test(email) == true ) {
            this.cc_email_err = false;  
            var check = this.cc_emails.indexOf( email );
            if ( check < 0 ) {
              // console.log('less than 0');
              this.cc_emails.push( email );
              this.cc_email_repeat = false;
              this.global_addBccEmail = "";
            } else {
              // console.log('greater than 0');
              this.cc_email_repeat = true;
            }

          } else{
            this.cc_email_repeat = false;
            this.cc_email_err = true;
          }

        }
      },
      _removeCreateCompanyCCEmail_( email ) {
        var check = this.cc_emails.indexOf( email );
        this.cc_emails.splice( check, 1 );
      },
      _eclaimSubSelector_( opt ) {
        this.global_credentialsData.access_e_claim = opt;
      },
    }
  }
  
  export default corporateCredentials
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporateDetails.scss";
</style>
