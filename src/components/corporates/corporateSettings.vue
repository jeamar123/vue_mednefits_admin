<script>
  import Modal from "../../views/modal/Modal.vue";

  let corporateSettings = {
    components: {
      Modal
    },
    props: {
      customer_id: [String, Number],
		  company_name: [String, Number],
    },
    data() {
      return {
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_isEclaimDownloadModalShow: false,
        global_downloadEclaimData:  {
          selected_date:  new Date(),
          date_list:  [],
          filters:  {
            approved: true,
            rejected: true,
            pending: true,
            all: true,
          }
        },
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
      console.log( this.customer_id );
      console.log( this.company_name );
    },
    methods: {
      _toggleDownloadEclaimModal(){
        this.global_isEclaimDownloadModalShow = this.global_isEclaimDownloadModalShow == true ? false : true;
      },
    }
  }
  
  export default corporateSettings
</script>

<style lang="scss" scoped>
	// @import "./src/assets/css/corporateSettings.scss";
</style>