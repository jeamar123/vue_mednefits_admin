<script>
  import Modal from "../../views/modal/Modal.vue";

  let gcapPerVisit = {
    components: {
      Modal
    },
    data() {
      return {
        global_showInput: false,
        global_showText:  true,
        global_selectedIndex: 0,
        global_getGpData: [
          {
            id: 0,
            name: "Noelou Nagac",
            amount: 100
          },
          {
            id: 2,
            name: "Agniez Permites",
            amount: 250
          }
        ],
        global_showFileUpload:  false,
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
    },
    methods: {
      ___editTable( data, index ) { 
        // console.log(index);
        this.global_showText = false;
        this.global_showInput  = true;
        // this.global_selectedIndex = index;
      },
      ___fileUploadModal() {
        this.global_showFileUpload = this.global_showFileUpload == false ? true : false;
      }
    }
  }
  
  export default gcapPerVisit
</script>

<style lang="scss" scoped>
	/*@import "./src/assets/css/corporates.scss";*/
  // @import "./src/assets/css/corporateSettings.scss";
</style>