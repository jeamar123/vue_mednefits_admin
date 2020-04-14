<script>
import Modal from "../../../views/modal/Modal.vue";
import moment, { locale } from "moment";

  let planDetails = {
    components: {
      Modal
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
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
    },
    methods: {
      _changePlan_( type ) {
        this.global_selectedType = type;
        let params = {
          type: this.global_selectedType,
        }
        console.log(params);
        this.global_isChangePlanShow = this.global_isChangePlanShow == false ? true : false;
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
    }
  }
  
  export default planDetails
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/planRenewal.scss";
</style>
