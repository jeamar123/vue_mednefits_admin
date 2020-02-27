<script>
  import Modal from "../../views/modal/Modal.vue";

  let claimTypeServices = {
    components: {
      Modal
    },
    data() {
      return {
        // empSelectorActive: {
        //   value: 0,
        //   text: ""
        // }
        global_showClaimTypeModal:  false,
        global_updateClaimType: false,
        global_addClaimType:  false,
      };
    },
    created(){

    },
    methods: {
      ___openClaimTypesModal( type ) {
        this.global_showClaimTypeModal  = this.global_showClaimTypeModal  ==  false ? true : false;
        if ( type == 'update' ) {
          this.global_updateClaimType = true;
          this.global_addClaimType = false;
        }
        if ( type == 'add' ) {
          this.global_updateClaimType = false;
          this.global_addClaimType = true;
        }
      }
    }
  }
  
  export default claimTypeServices
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporateSettings.scss";
</style>
