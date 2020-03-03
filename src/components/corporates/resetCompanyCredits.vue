<script>
  import Modal from "../../views/modal/Modal.vue";

  let resetCompanyCredits = {
    components: {
      Modal
    },
    data() {
      return {
        // empSelectorActive: {
        //   value: 0,
        //   text: ""
        // },
        // corporateViewStatus : 'CorporateDetails',
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_resetEffectiveDate:  undefined,
        global_showEditEmp: false,
        
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
    },
    methods: {
      ___editEmpDetails() {
         this.global_showEditEmp = this.global_showEditEmp == false ? true : false;
      }
    }
  }
  
  export default resetCompanyCredits
</script>

<style lang="scss">
	/*// @import "./src/assets/css/corporates.scss";*/
  @import "./src/assets/css/resetCompanyCredits.scss";

  .edit-emp-input-wrapper {
    .popover-origin.direction-bottom.align-left, .popover-origin.direction-top.align-left {
      left: -20px;
    }
  }
</style>
