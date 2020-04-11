<script>
  import Modal from "../../../views/modal/Modal.vue";
  import moment, { locale } from "moment";

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
        employee_details_arr: [
          {
            id: 15,
            fullname: 'Noelou Jan',
            dob: new Date(),
            start_date: new Date(),
            country_code: +65,
            mobile_number: 888888,
          },
          {
            id: 12,
            fullname: 'Janskie Nagac',
            dob: new Date(),
            start_date: new Date(),
            country_code: +65,
            mobile_number: 888888
          }
        ],
        global_isAddSeatDropShow: false,
        global_isPerPageShow: false,
        global_removeSelector: 'remove',
      };
    },
    created(){
      this._fetchMemberData_();
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
      },
      _toggleTableInput_( index,inputIndex ) {
        this._resetActionSelector_('input');
        console.log(index,inputIndex);
        this.employee_details_arr[ index ].activeInput[inputIndex] = true;
        console.log( this.employee_details_arr[ index ].activeInput[inputIndex] );
        setTimeout(function() {
          $(".empl-tbl tbody tr:nth-child(" + (index+1) + ") td:nth-child(" + (inputIndex+3) + ") input").focus();
        }, 200);
        this.$forceUpdate();
      },
      _formatDate_( date, from, to ){
        return moment( date, from ).format( to );
      },
      _fetchMemberData_() {
        this.employee_details_arr.forEach((value,key) => {
          console.log(value,key);
          value.index = key;
          value.isVacantSeatShow = [];
          value.activeInput = [];
          console.log(value.activeInput);
        })
      },
      _toggleOptions_( data ) {
        // console.log(data);
        this._resetActionSelector_('options');
        this.employee_details_arr.forEach((value,key)  => {
          if ( data.id == value.id ) {
            value.isOptionsShow = value.isOptionsShow == true ? false : true;
          } else {
            value.isOptionsShow = false;
          }
        })
        this.$forceUpdate();
      },
      _hideAllDrop_( e ) {
        console.log(e);
        if ( $(e.target).parents(".option-selector").length === 0 ) {
          this._resetActionSelector_('options');
          this.$forceUpdate();
        }
        if ($(e.target).parents(".add-seat-wrapper").length === 0) {
          this.global_isAddSeatDropShow = false;
        }
        if ($(e.target).parents(".custom-list-per-page").length === 0) {
          this.global_isPerPageShow = false;
        }
        if ($(e.target).parents(".country-code-wrapper").length === 0) {
          this._resetActionSelector_('input');
          this.$forceUpdate();
        }
      },
      _resetActionSelector_(opt) {
        this.employee_details_arr.forEach((value,key)  => {
          if(opt == 'options'){
            value.isOptionsShow = false;
          }
          if(opt == 'input'){
            value.activeInput[3] = false;
          }
          // value.isOptionsShow = value.isOptionsShow == false ? true : false;
          console.log('para sa country code',value.activeInput);
          console.log('para sa 3 ka dot',value.isOptionsShow);
          
          // if (this.employee_details_arr[ key ].activeInput[3] == value.activeInput[3]) {
          //   value.activeInput[3] = false;
          // }
        })
      },
      // _resetCountryActionSelector_() {
      //   this.employee_details_arr.forEach((value,key)  => {
      //     if (this.employee_details_arr[ key ].activeInput[3] == value.activeInput[3]) {
      //       // value.activeInput[3] = false;
      //       value.activeInput[3] = false  ;
      //       console.log('testing sa 3');
      //     } else {
      //       value.activeInput[3] = true;
      //     }
      //   })
      // },
      _toggleAddSeatOptions_() {
        this.global_isAddSeatDropShow = this.isAddSeatDropShow == true ? false : true;
      },
      _togglePerPage_() {
        this.global_isPerPageShow = this.global_isPerPageShow == false ? true : false;
      }
    }
  }
  
  export default memberDetails
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/planRenewal.scss";
</style>
