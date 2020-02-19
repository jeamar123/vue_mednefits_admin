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
        block_clinic_opt: 'name',
        block_clinic_region: 'sgd',
        block_clinic_search: null,
        block_active_page: 1,
        block_page_limit: 10,
        isBlockSearchShow: false,
        block_pagination: {},
        block_selected_clinics: [],
        block_selected_clinic_types: [],

        open_clinic_list: [],
        open_clinic_opt: 'name',
        open_clinic_region: 'sgd',
        open_clinic_search: null,
        open_active_page: 1,
        open_page_limit: 10,
        isOpenSearchShow: false,
        open_pagination: {},
        open_selected_clinics: [],
        open_selected_clinic_types: [],

        block_clinic_type_list: [],
        open_clinic_type_list: [],

        isPageDropShow: [false,false],
        isLimitDropShow: [false,false],

        allOpenSelected: false,
        allBlockSelected: false,
      };
    },
    created(){
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
          if( opt == false ){
            this.open_clinic_search = null;
            this.getClinicList();
          }
        }
        if( type == 'block' ){
          this.isBlockSearchShow = opt;
          if( opt == false ){
            this.block_clinic_search = null;
            this.getClinicList();
          }
        }
      },
      regionChange( type ){
        if( type == 'open' ){
          this.open_active_page = 1;
        }
        if( type == 'block' ){
          this.block_active_page = 1;
        }
        this.getClinicList();
      },
      typeChange( type ){
        if( type == 'open' ){
          this.allOpenSelected = false;
          Object.keys(this.open_clinic_list).map(( value, key ) => {
            this.open_clinic_list[key].selected = false;
          });
          this.open_clinic_type_list.map(( value, key ) => {
            value.selected = false;
          });
        }
        if( type == 'block' ){
          this.allBlockSelected = false;
          Object.keys(this.block_clinic_list).map(( value, key ) => {
            this.block_clinic_list[key].selected = false;
          });
          this.block_clinic_type_list.map(( value, key ) => {
            value.selected = false;
          });
        }
      },
      // PAGINATION FUNCTIONS
        togglePageDrop( index, opt ){
          this.isPageDropShow[ index ] = opt;
          this.$forceUpdate();
        },
        toggleLimitDrop( index, opt ){
          this.isLimitDropShow[ index ] = opt;
          this.$forceUpdate();
        },
        hideAllDrop( e ){
          if ($(e.target).parents(".page-select").length === 0) {
            this.isPageDropShow = [false, false];
          }
          if ($(e.target).parents(".row-select").length === 0) {
            this.isLimitDropShow = [false, false];
          }
          this.$forceUpdate();
        },
        openPrevPage(){
          if( this.open_active_page != 1 ){
            this.open_active_page -= 1;
            this.getClinicList();
          }
        },
        openNextPage(){
          if( this.open_active_page != this.open_pagination.table_open_last_page ){
            this.open_active_page += 1;
            this.getClinicList();
          }
        },
        openSetPerPage( page ){
          this.open_page_limit = page;
          this.open_active_page = 1;
          this.toggleLimitDrop( 0, false );
          this.getClinicList();
        },
        openGoToPage( page ){
          this.open_active_page = page;
          this.togglePageDrop( 0, false );
          this.getClinicList();
        },
        blockPrevPage(){
          if( this.block_active_page != 1 ){
            this.block_active_page -= 1;
            this.getClinicList();
          }
        },
        blockNextPage(){
          if( this.block_active_page != this.block_pagination.table_block_last_page ){
            this.block_active_page += 1;
            this.getClinicList();
          }
        },
        blockSetPerPage( page ){
          this.block_page_limit = page;
          this.block_active_page = 1;
          this.toggleLimitDrop( 1, false );
          this.getClinicList();
        },
        blockGoToPage( page ){
          this.block_active_page = page;
          this.togglePageDrop( 1, false );
          this.getClinicList();
        },
      // CHECKBOX FUNCTIONS
        selectAllOpen( opt ){
          if( this.open_clinic_opt == 'name' ){
            this.open_selected_clinics = [];
            Object.keys(this.open_clinic_list).map(( value, key ) => {
              this.open_clinic_list[key].selected = opt;
              this.open_selected_clinics.push({
                clinic_id: this.open_clinic_list[key].clinic_id,
                account_type: this.type,
                status: 1
              });
            });
          }
          if( this.open_clinic_opt == 'type' ){
            this.open_clinic_type_list.map(( value, key ) => {
              value.selected = opt;
              this.open_selected_clinic_types.push({
                type_id : value.provider_id,
                status : 1,
                account_type : this.type,
              });
            });
          }
        },
        selectAllBlock( opt ){
          if( this.block_clinic_opt == 'name' ){
            this.block_selected_clinics = [];
            Object.keys(this.block_clinic_list).map(( value, key ) => {
              this.block_clinic_list[key].selected = opt;
              this.block_selected_clinics.push({
                clinic_id: this.block_clinic_list[key].clinic_id,
                account_type: this.type,
                status: 0
              });
            });
          }
          if( this.block_clinic_opt == 'type' ){
            this.block_clinic_type_list.map(( value, key ) => {
              value.selected = opt;
              this.block_selected_clinic_types.push( {
                type_id : value.provider_id,
                status : 0,
                account_type : this.type,
              } );
            });
          }
        },
        selectOne( opt, data ){
          console.log( data );
          var clinic_name_data = { 
            clinic_id: data.clinic_id, 
            account_type: this.type, 
            status: opt == 'open' ? 1 : 0 
          };
          var clinic_type_data = { 
            type_id: data.provider_id, 
            status: opt == 'open' ? 1 : 0, 
            account_type : this.type,
          };
          if( opt == 'open' ){
            if( this.open_clinic_opt == 'name' ){
              var index = _.findIndex( this.open_selected_clinics , [ 'clinic_id', data.clinic_id ]);
              if( index > -1 ){
                this.open_selected_clinics.splice( index, 1 );
              }else{
                this.open_selected_clinics.push( clinic_name_data );
              }
            }else{
              var index = _.findIndex( this.open_selected_clinic_types , [ 'provider_id', data.provider_id ]);
              if( index > -1 ){
                this.open_selected_clinic_types.splice( index, 1 );
              }else{
                this.open_selected_clinic_types.push( clinic_type_data );
              }
            }
          }
          if( opt == 'block' ){
            if( this.open_clinic_opt == 'name' ){
              var index = _.findIndex( this.block_selected_clinics , [ 'clinic_id', data.clinic_id ]);
              if( index > -1 ){
                this.block_selected_clinics.splice( index, 1 );
              }else{
                this.block_selected_clinics.push( clinic_name_data );
              }
            }else{
              var index = _.findIndex( this.block_selected_clinic_types , [ 'provider_id', data.provider_id ]);
              if( index > -1 ){
                this.block_selected_clinic_types.splice( index, 1 );
              }else{
                this.block_selected_clinic_types.push( clinic_type_data );
              }
            }
          }

          console.log( this.open_selected_clinics );
          console.log( this.open_selected_clinic_types );
          console.log( this.block_selected_clinic_types );
          console.log( this.block_selected_clinic_types );
        },
        

      resetValues(){
        this.allOpenSelected = false;
        this.allBlockSelected = false;
        // this.isOpenSearchShow = false;
        // this.isBlockSearchShow = false;

        this.open_selected_clinics = [];
        this.open_selected_clinic_types = [];
        this.block_selected_clinics = [];
        this.block_selected_clinic_types = [];
        this.open_clinic_type_list = [];
        this.block_clinic_type_list = [];
      },
      updateClinicStatus( opt ){
        this.showLoading();
        var data = {
          corporate_id: 1,
          clinic_details: opt == 'toOpen' ? this.block_selected_clinics : this.open_selected_clinics, 
          provider_type_ids: opt == 'toOpen' ? this.block_selected_clinic_types : this.open_selected_clinic_types,
          region : opt == 'toOpen' ? ( this.block_clinic_region == 0 ? 'all' : this.block_clinic_region ) : ( this.open_clinic_region == 0 ? 'all' : this.open_clinic_region ),
        }
        console.log( data );
        axios.put( axios.defaults.serverUrl + '/company/clinic' , data )
          .then(res => {
            console.log( res );
            this.getClinicList();
            // this.hideLoading();
          })
          .catch(err => {
            this.hideLoading();
            this.errorHandler( err );
          });
      },
      getClinicList(){
        var url = axios.defaults.serverUrl + '/company/clinic?';
        url += '&token=' + localStorage.getItem('vue_admin_session');
        url += '&corporate_id=' + this.id;
        url += '&region[0]=' + this.open_clinic_region;
        url += '&region[1]=' + this.block_clinic_region;
        url += '&options[0][limit]=' + this.open_page_limit;
        url += '&options[0][page]=' + this.open_active_page;
        url += '&options[1][limit]=' + this.block_page_limit;
        url += '&options[1][page]=' + this.block_active_page;
        url += '&account_type[0]=' + this.type;
        url += '&account_type[1]=' + this.type;
        
        if( this.open_clinic_search != null || this.block_clinic_search != null ){
          var search = [ (this.open_clinic_search == null ? 0 : this.open_clinic_search), (this.block_clinic_search == null ? 0 : this.block_clinic_search) ];
          url += '&search[0]=' + search[0];
          url += '&search[1]=' + search[1];
        }

        this.showLoading();
        console.log( url );
        axios.get( url )
          .then(res => {
            console.log( res );
            this.resetValues();
            this.block_clinic_list = res.data.block_list.docs;
            this.block_pagination = res.data.block_list;
            this.block_pagination.from = (this.block_active_page * this.block_page_limit) - this.block_page_limit + 1;
            this.block_pagination.to = this.block_active_page == this.block_pagination.table_block_last_page ? this.block_pagination.table_block_total : (this.block_active_page * this.block_page_limit);

            this.open_clinic_list = res.data.open_list.docs;
            this.open_pagination = res.data.open_list;
            this.open_pagination.from = (this.open_active_page * this.open_page_limit) - this.open_page_limit + 1;
            this.open_pagination.to = this.open_active_page == this.open_pagination.table_open_last_page ? this.open_pagination.table_open_total : (this.open_active_page * this.open_page_limit);
                        
            res.data.clinic_type_list.map(( value, key ) => {
              if( value.block == 1 ){
                this.block_clinic_type_list.push( value );
              }
              if( value.block == 0 ){
                this.open_clinic_type_list.push( value );
              }
            });

            this.block_clinic_type_list = _(this.block_clinic_type_list)
              .groupBy('provider_id')
              .map((items, value) => ({ ...items[0], provider_region : items.length > 1 ? ['sgd','myr'] : [ items[0].provider_region ], currency : items.length > 1 ? 'all' : items[0].provider_region }))
              .value();

            this.open_clinic_type_list = _(this.open_clinic_type_list)
              .groupBy('provider_id')
              .map((items, value) => ({ ...items[0], provider_region : items.length > 1 ? ['sgd','myr'] : [ items[0].provider_region ], currency : items.length > 1 ? 'all' : items[0].provider_region }))
              .value();

            console.log( this.block_clinic_type_list );
            console.log( this.open_clinic_type_list );

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
