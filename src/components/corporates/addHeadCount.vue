<script>
  import VueSlider from 'vue-slider-component'
  import { 
    _addHeadCount_,
    _globalStorage_,
    _formChecker_,
    _showPageLoading_,
    _hidePageLoading_,
  } from '../../common/functions/common_functions';
  import moment, { locale } from "moment";

  let addHeadCount = {
    components: {
      VueSlider
    },
    props: {
      customer_id: [String, Number],
      company_name: [String, Number],
    },
    data() {
      return {
        // empSelectorActive: {
        //   value: 0,
        //   text: ""
        // },
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_addHeadCountData:  {
          plan_start: new Date(),
          price_per_employee: 99,
          medical_credits:  0,
          wellness_credits:  0,
          deposit_medical:  0,
          deposit_wellness:  0,
        }
      };
    },
    created(){
      
    },
    methods: {
      _createAddHeadCount_(submitData) {
        let data  = {
          customer_id: this.customer_id,
          plan_start: moment(submitData.plan_start).format('YYYY-MM-DD'),
          employees: submitData.employees,
          price_per_employee: submitData.price_per_employee,
          account_type: submitData.account_type,
          secondary_account_type: submitData.secondary_account_type,
          payment_status: submitData.payment_status,
          medical_credits: submitData.medical_credits,
          wellness_credits: submitData.wellness_credits,
          deposit_medical: submitData.deposit_medical,
          deposit_wellness: submitData.deposit_wellness
        }
        if( _formChecker_(data) == true ){
          _showPageLoading_();
          _addHeadCount_(data)
            .then((res)  =>  {
              _hidePageLoading_();
              if( res.status == 200 ){
                this.$swal('Success', res.data.message, 'success');
                this.$router.back();
                this.$emit('FromMemberList', true);
              }
              console.log(res);
            });
        }
      },
      _setAccountType_(account_type)  {
        if (account_type == "trial_plan") {
          this.global_addHeadCountData.payment_status = true;
          this.global_addHeadCountData.secondary_account_type = "pro_trial_plan_bundle";
        } else {
          this.global_addHeadCountData.payment_status = false;
        }
        if (account_type == "insurance_bundle") {
          this.global_addHeadCountData.secondary_account_type = 'pro_plan_bundle';
          this.global_addHeadCountData.payment_status = true;
        } else {
          this.global_addHeadCountData.payment_status = false;
        }
        if (account_type == "stand_alone_plan") {
          this.global_addHeadCountData.secondary_account_type = "default_price";
          this.global_addHeadCountData.price_per_employee = 99;
        } 
        if (account_type == "lite_plan") {
          this.global_addHeadCountData.secondary_account_type = "fixed_price";
          this.global_addHeadCountData.price_per_employee = 5;
          this.global_addHeadCountData.payment_status = false;
        }
        if (account_type == "enterprise_plan") {
          this.global_addHeadCountData.payment_status = false;
          this.global_addHeadCountData.secondary_account_type = "fixed_price";
          this.global_addHeadCountData.price_per_employee = 100;
        }
        this.$forceUpdate();
      },
      _setSecondaryAccountType_(account_type)  {
        this.$forceUpdate();
      },
      
    }
  }
  
  export default addHeadCount
</script>

<style lang="scss">
  @import "./src/assets/css/corporateAddHeadCount.scss";
  
  input.vDatepicker {
    background-color: transparent;
    border-bottom: 1px solid rgba(0,0,0,0.12);
    padding: 2px;
    width: 100%;
  }
</style>