<script>
import axios from "axios";
import moment, { locale } from "moment";

  let  healthPartnerAccess = {
    props: {
      id: [String, Number],
      type: [String, Number]
    },
    data() {
      return {
        block_clinic_list: [],
        block_clinic_opt: 'type',
        block_clinic_region: 'sgd',
        block_clinic_search: null,
        block_active_page: 1,
        block_page_limit: 10,
        isBlockSearchShow: false,
        block_pagination: {},

        open_clinic_list: [],
        open_clinic_opt: 'type',
        open_clinic_region: 'sgd',
        open_clinic_search: null,
        open_active_page: 1,
        open_page_limit: 10,
        isOpenSearchShow: false,
        open_pagination: {},
      };
    },
    created(){
      console.log( this.type );
      this.getClinicList();
    },
    methods: {
      range( range ){
        var arr = []; 
        for (var i = 0; i < range; i++) {
          arr.push(i+1);
        }
        return arr;
      },
      toggleSearch( type, opt ){
        if( type == 'open' ){
          this.isOpenSearchShow = opt;
        }
        if( type == 'block' ){
          this.isBlockSearchShow = opt;
        }
      },
      // PAGINATION FUNCTIONS
        openPrevPage(){
          if( this.open_active_page != 1 ){
            this.open_active_page -= 1;
            this.getClinicList();
          }
        },
        openNextPage(){
          if( this.open_active_page != 5 ){
            this.open_active_page += 1;
            this.getClinicList();
          }
        },
        openSetPerPage( page ){
          this.open_page_limit = page;
          this.open_active_page = 1;
          this.getClinicList();
        },
        openGoToPage( page ){
          this.open_active_page = page;
          this.getClinicList();
        },
        blockPrevPage(){
          if( this.block_active_page != 1 ){
            this.block_active_page -= 1;
            this.getClinicList();
          }
        },
        blockNextPage(){
          if( this.block_active_page != 5 ){
            this.block_active_page += 1;
            this.getClinicList();
          }
        },
        blockSetPerPage(){
          this.block_page_limit = page;
          this.block_active_page = 1;
          this.getClinicList();
        },
        blockGoToPage( page ){
          this.block_active_page = page;
          this.getClinicList();
        },




        
      getClinicList(){
        var url = axios.defaults.serverUrl + '/company/clinic';
        var data = {
          token: localStorage.getItem('vue_admin_session'), 
          corporate_id: this.id,
          region: [ this.open_clinic_region, this.block_clinic_region ],
          options: [
            { limit: this.open_page_limit, page: this.open_active_page },
            { limit: this.block_page_limit, page: this.block_active_page },
          ], 
          account_type: [this.type, this.type],
          // search: [ this.open_clinic_search , this.block_clinic_search ],
        }
        console.log( data );
        axios.get( url, { params: data } )
          .then(res => {
            console.log( res );
            this.block_clinic_list = res.data.block_list.docs;
            this.block_pagination = res.data.block_list;
            this.open_clinic_list = res.data.open_list.docs;
            this.open_pagination = res.data.open_list;
            this.hideLoading();
          })
          .catch(err => {
            this.hideLoading();
            this.errorHandler( err );
          });
      },
    }
  }
  
  export default healthPartnerAccess
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/healthPartnerAccess.scss";
</style>
