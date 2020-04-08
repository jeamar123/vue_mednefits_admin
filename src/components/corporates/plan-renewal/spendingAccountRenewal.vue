<script>
  import Modal from "../../../views/modal/Modal.vue";

  let spendingAccountRenewal = {
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
        global_planStart: new Date(),
        global_isShowEditSpendingModal: false,
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
    },
    methods: {
      _fileUploadModal_() {
        this.global_showFileUpload = this.global_showFileUpload == false ? true : false;
      },
      _editSpendingAccountModal_() {
        this.global_isShowEditSpendingModal = this.global_isShowEditSpendingModal == false ? true: false;
      },
    }
  }
  
  export default spendingAccountRenewal
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/planRenewal.scss";
</style>
