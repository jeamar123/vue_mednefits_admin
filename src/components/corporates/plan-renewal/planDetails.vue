<script>
import Modal from "../../../views/modal/Modal.vue";
import moment, { locale } from "moment";
import {
  _showPageLoading_,
  _hidePageLoading_, 
  _fetchPlanRenewalData_,
} from '../../../common/functions/common_functions';

  let planDetails = {
    components: {
      Modal
    },
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        empSelectorActive: {
          value: 0,
          text: ""
        },
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_isChangePlanShow: false,
        global_updatePlanDetails: {
          plan_start: new Date(),
        },
        global_planDetails: {
          employee_renewal_details: {
            plan_end: new Date(),
          },
          dependent_renewal_details: {
            plan_end: new Date(),
          }
        },
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
      this._getPlanRenewalData_();
    },
    methods: {
      _changePlan_( type, data ) {
        this.global_isChangePlanShow = this.global_isChangePlanShow == false ? true : false;
        this.global_selectedType = type;
        this.global_changePlan = data;
        console.log(this.global_changePlan);
        
        this.global_changePlan.plan_start = new Date(this.global_changePlan.plan_start);
        
      },
      _setAccountType_( account_type ) {},
      _updatePlanDetails_( data ) {
        let params = {
          customer_plan_renewal_id: 1,
          account_type: data.account_type,
          secondary_account_type: data.secondary_account_type,
          seats: data.seats,
          plan_start: moment( data.plan_start ).format('YYYY-MM-DD'),
          plan_duration: data.plan_duration,
          type: this.global_selectedType,
          price_per_employee: data.price_per_employee,
        }
        console.log(params);
      },
      _confirmPlan_() {
        this.$swal({
          title: "Confirm?",
          text: "Activating plan renewal. Cannot revert any changes.",
          type: "warning",
          confirmButtonColor: "rgb(221, 107, 85)",
          cancelButtonColor: "#C1C1C1",
          showCancelButton: true,
          showCloseButton: false,
          confirmButtonText: "Yes!",
          reverseButtons: true,
        }).then(result => {
          if (result) {
            console.log(result);
            // console.log(result.dismiss);
            if (result.value == true) {
              let params = {
                customer_plan_renewal_id: 1,
              }
              console.log( params );
            }
          } 
        });
      },
      _getPlanRenewalData_() {
        let params = {
          customer_id: this.customer_id,
        }
        _showPageLoading_();
        _fetchPlanRenewalData_(params)
        .then(( res ) => {
          // console.log(res);
          if( res.status == 200 || res.status == 201 ){
            this.global_planDetails = res.data.data;
            localStorage.customerRenewalId = this.global_planDetails.customer_plan_renewal_id;

            this.global_planDetails.employee_plan_start = moment(this.global_planDetails.employee_plan_start).format('DD/MM/YYYY');
            this.global_planDetails.employee_renewal_details.plan_end = moment(this.global_planDetails.employee_renewal_details.plan_end).format('DD/MM/YYYY');
            this.global_planDetails.dependent_plan_start = moment(this.global_planDetails.dependent_plan_start).format('DD/MM/YYYY');
            this.global_planDetails.dependent_renewal_details.plan_end = moment(this.global_planDetails.dependent_renewal_details.plan_end).format('DD/MM/YYYY');

            console.log(this.global_planDetails);
            _hidePageLoading_();
          }
        });
      },
    }
  }
  
  export default planDetails
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/planRenewal.scss";
</style>
