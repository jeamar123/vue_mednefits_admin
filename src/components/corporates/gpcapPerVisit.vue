<script>
  import axios from "axios";
  import Modal from "../../views/modal/Modal.vue";
  import { 
    _fetchCapVisitList_,
    _downloadEmployeeDependent_
  } from '../../common/functions/common_functions';

  let gcapPerVisit = {
    components: {
      Modal
    },
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        global_getCapList: {},
        global_showInput: false,
        global_showText:  true,
        global_selectedIndex: 0,
        // global_getGpData: [
        //   {
        //     id: 0,
        //     name: "Noelou Nagac",
        //     amount: 100
        //   },
        //   {
        //     id: 2,
        //     name: "Agniez Permites",
        //     amount: 250
        //   }
        // ],
        global_showFileUpload:  false,
      };
    },
    created(){
      this.___getCapVisitList();
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
      },
      ___getCapVisitList() {
        let params = {
          company_id: this.customer_id,
        }
        _fetchCapVisitList_(params)
					.then(( res ) => {
          console.log(res);
          if( res.status == 200 || res.status == 201 ){
            this.global_getCapList = res.data;
            console.log(this.global_getCapList);
          }
        });
      },
      ___dowloadEmployeeDependent() {
        window.open( axios.defaults.serverUrl + '/company/downloadEmployeeDependent?token=' + localStorage.getItem('vue_admin_session') + '&company_id=' + this.customer_id );
      },
    }
  }
  
  export default gcapPerVisit
</script>

<style lang="scss" scoped>
	/*@import "./src/assets/css/corporates.scss";*/
  @import "./src/assets/css/gpCapPerVisit.scss";
</style>