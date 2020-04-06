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
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
    },
    methods: {
      _changePlan_( type ) {
        this.global_isChangePlanShow = this.global_isChangePlanShow == false ? true : false;
      }
    }
  }
  
  export default planDetails
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/planRenewal.scss";
</style>
