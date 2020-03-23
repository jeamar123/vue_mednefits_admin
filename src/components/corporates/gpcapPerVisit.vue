<script>
  import axios from "axios";
  import Modal from "../../views/modal/Modal.vue";
  import { 
    _fetchCapVisitList_,
    _downloadEmployeeDependent_,
    _uploadFileCap_,
    _updateCapVisit_
  } from '../../common/functions/common_functions';

  let gcapPerVisit = {
    components: {
      Modal,
    },
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        global_getCapList: {},
        global_showInput: false,
        global_showText:  true,
        global_showZeroValue: false,
        global_showInput: [],
        global_showText:  [],
        global_showZeroValue: [],
        global_selectedIndex: 0,
        global_showFileUpload:  false,
        global_showCapDp: false,
        pagesToDisplay: 7,
        page_active: 1,
        page_limit: 10,
        global_capListPagination: {
          last_page: 7,
        },
        global_selectedFile: {
          name: '',
        },
        uploadCapData: {},
        uploading_files : [],
        uploading: false,

        global_activeBtn: false,
        capAmount: [],
      };
    },
    created(){
      this.___getCapVisitList();
    },
    watch: {
      
      capAmount: function(nv, ov,) {
        if ( nv == ov ) {
          this.global_activeBtn = true;
        }
      }
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
        this.global_showText[index] = false;
        this.global_showInput[index]  = true;
        this.global_showZeroValue[index] = true;
        this.capAmount[index] = data.cap_amount;
        if ( this.capAmount[index] == null ) {
          this.capAmount[index] = 0;
        }
        this.$forceUpdate();
      },
      ___fileUploadModal() {
        if ( this.global_showFileUpload == false ) {
          this.global_showFileUpload = true;
        } else {
          this.global_showFileUpload = false;
          this.global_selectedFile = {
            name: '',
          };      
        }  
      },
      ___getCapVisitList(index) {
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
            this.global_getCapList = res.data.data.docs;
            this.global_capListPagination = res.data.data;
            console.log(this.global_getCapList);
            for (let i = 0;i < this.global_getCapList.length; i++) {
              this.global_showInput[i] = false,
              this.global_showText[i] = true,
              this.global_showZeroValue[i] = false;
              this.capAmount[i] = this.global_getCapList[i].cap_amount;
            }
          }
          
        });
      },
      ___dowloadEmployeeDependent() {
        window.open( axios.defaults.serverUrl + '/company/downloadCapVisitList?token=' + localStorage.getItem('vue_admin_session') + '&company_id=' + this.customer_id );
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
      ___uploadGpCapChanged ( data ) {
        console.log(data);
        this.global_selectedFileName = data[0];
        this.global_selectedFile = data[0];
        console.log(this.global_selectedFile);
      },
      ___uploadGpCapPerVisit ( file ) {
        let formData = new FormData();
        let params = {
          filename: this.global_selectedFile,
          // token: localStorage.getItem('vue_admin_session'),
        }
        Object.keys( params ).map(( key ) => {
          formData.append(key, params[ key ]);
        });
        this.$parent.showLoading();
        _uploadFileCap_(formData)
					.then(( res ) => {
            this.uploadCapData = res;
            console.log(this.uploadCapData);
            if( res.status == 200 || res.status == 201 ){
              console.log(formData);
              this.$parent.hideLoading();
              file.uploading = 100;
              setTimeout(() => {
                this.global_showFileUpload = false;
              }, 2000);
              this.$forceUpdate();
              this.___getCapVisitList();
            } else {
              file.uploading = 10;
              this.$parent.hideLoading();
            }
          })
      },
      ___updateCapVisitAmount( data ) {
        let err_ctr = 0;
        data.map((value,key) => {

          let params = {
            company_id: this.customer_id,
            capList: [{
              member_id: value.memeber_id,
              cap_amount: Number(this.capAmount[key]),
              // cap_amount: Number(value.cap_amount),
            }],
          }
          this.$parent.showLoading();
          _updateCapVisit_(params)
            .then(( res ) => {
            // console.log(res);
            if( res.status == 200 || res.status == 201 ){
            }
          });

          if (data.length - 1 == key && err_ctr == 0) {
            this.___getCapVisitList();
            this.global_activeBtn = false;
            this.$parent.hideLoading();
            this.$swal('Success!', 'Cap updated', 'success');
          }
        });

      
      }
    }
  }
  
  export default gcapPerVisit
</script>

<style lang="scss" scoped>
	/*@import "./src/assets/css/corporates.scss";*/
  @import "./src/assets/css/gpCapPerVisit.scss";
</style>