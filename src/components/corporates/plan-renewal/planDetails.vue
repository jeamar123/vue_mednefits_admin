<script>
import Modal from "../../../views/modal/Modal.vue";

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
        global_planStart: new Date(),
        global_isChangePlanShow: false,
        global_planDetailsData: {},
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
    },
    methods: {
      _changePlan_( type ) {
        this.global_isChangePlanShow = this.global_isChangePlanShow == false ? true : false;
      },
      _setAccountType_( account_type ) {},
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
              // this.create_company.company_contacts.splice(index,1);
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
