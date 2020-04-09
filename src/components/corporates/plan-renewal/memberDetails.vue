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
      }
    }
  }
  
  export default memberDetails
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/planRenewal.scss";
</style>
