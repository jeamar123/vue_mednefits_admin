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
        global_showCapDp: false,
        pagesToDisplay: 7,
        page_active: 1,
        page_limit: 10,
        global_capListPagination: {
          last_page: 7,
        }
      };
    },
    created(){
      this.___getCapVisitList();
    },
    computed: {
      ___limitPagination() {
        if (this.global_capListPagination.last_page) {
          var arr = this.___range(this.global_capListPagination.last_page);
          return arr.slice(
            this.startIndex(),
            this.startIndex() + this.pagesToDisplay
          );
        } else {
          return this.___range(this.global_capListPagination.last_page);
        }
      },
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
          page: this.page_active,
          limit: this.page_limit,
          token: localStorage.getItem('vue_admin_session'),
        }
        this.$parent.showLoading();
        _fetchCapVisitList_(params)
					.then(( res ) => {
          console.log(res);
          if( res.status == 200 || res.status == 201 ){
            this.$parent.hideLoading();
            this.global_getCapList = res.data.docs;
            this.global_capListPagination = res.data;
            // console.log(this.global_capListPagination.last_page);
          }
        });
      },
      ___dowloadEmployeeDependent() {
        window.open( axios.defaults.serverUrl + '/company/downloadEmployeeDependent?token=' + localStorage.getItem('vue_admin_session') + '&company_id=' + this.customer_id );
      },
      ___hideAllDrop( e ) {
        if ($(e.target).parents(".gp-cap-pagination").length === 0) {
          this.global_showCapDp  = false;
          // console.log('click sa gawas');
        }
      },
      ___selectedCapPerPage() {
        this.global_showCapDp  = this.global_showCapDp  ==  false ? true : false;
      },
      ___range(num) {
        let arr = [];
        for (let i = 0; i < num; i++) {
          arr.push(i);
        }
        return arr;
      },
      startIndex() {
        if (this.page_active > this.pagesToDisplay / 2 + 1) {
          if (
            this.page_active + Math.floor(this.pagesToDisplay / 2) >
            this.global_capListPagination.last_page
          ) {
            return this.global_capListPagination.last_page - this.pagesToDisplay + 1;
          }
          return this.page_active - Math.floor(this.pagesToDisplay / 2);
        }
        return 0;
      },
      goToPage(num) {
        this.page_active = num;
        this.___getCapVisitList();
      },
      ___prevPage() {
        if (this.page_active != 1) {
          this.page_active -= 1;
          this.___getCapVisitList();
        }
      },
      ___nextPage() {
        if (this.page_active != this.global_capListPagination.last_page) {
          this.page_active += 1;
          this.___getCapVisitList();
        }
      },
      ___setPageLimit( limit ){
        this.page_limit = limit;
        this.page_active = 1;
        this.global_showCapDp = false;
        this.___getCapVisitList();
      },
    }
  }
  
  export default gcapPerVisit
</script>

<style lang="scss" scoped>
	/*@import "./src/assets/css/corporates.scss";*/
  @import "./src/assets/css/gpCapPerVisit.scss";
</style>