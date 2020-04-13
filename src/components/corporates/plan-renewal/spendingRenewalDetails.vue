<script>
  import Modal from "../../../views/modal/Modal.vue";

  let spendingRenewalDetails = {
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
        global_isRollover: 'no', 
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
    },
    methods: {
     _fileUploadModal_() {
        this.global_showFileUpload = this.global_showFileUpload == false ? true : false;
      },
    }
  }
  
  export default spendingRenewalDetails
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/planRenewal.scss";
</style>
