<script>
  import Modal from "../../../views/modal/Modal.vue";

  let memberDetails = {
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
        global_showFileUpload: false,
        global_tblViewOpt: 1,
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
    },
    methods: {
      // selectCorporateView( opt ){
      //   this.corporateViewStatus = opt;
      //   this.$router.push( { name : opt } );
      // }
      _fileUploadModal_() {
        this.global_showFileUpload = this.global_showFileUpload == false ? true : false;
      },
      _selectViewOpt_( opt ) {
        this.global_tblViewOpt = opt;
      }
    }
  }
  
  export default memberDetails
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/planRenewal.scss";
</style>
