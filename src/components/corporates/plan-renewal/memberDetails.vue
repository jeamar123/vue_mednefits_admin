<script>
  import Modal from "../../../views/modal/Modal.vue";
  import moment, { locale } from "moment";
  import { 
    _fetchEmployeePlanRenewalData_,
    _fetchDependentPlanRenewalData_,
    _showPageLoading_,
    _hidePageLoading_,
  } from '../../../common/functions/common_functions';


  import axios from 'axios'

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
        dependent_details_arr: [
          {
            id: 15,
            dependent_fullname: 'JanJan Jan',
            dob: new Date(),
            start_date: new Date(),
            relationship: 'Child',
            employee_fullname: 'Keno Duterts',
          },
          {
            id: 12,
            dependent_fullname: 'Allem Nagac',
            dob: new Date(),
            start_date: new Date(),
            relationship: 'Child',
            employee_fullname: 'Keno Duterts',
          },
          {
            id: 13,
            dependent_fullname: 'Nicole Nagac',
            dob: new Date(),
            start_date: new Date(),
            relationship: 'Child',
            employee_fullname: 'Noemi Duterts',
          },
        ],
        global_employeePlanData: [],
        global_dependentPlanData: []
      };
    },
    created(){
      console.log('created')
      this._fetchMemberData_();
    },
    mounted() {
      console.log('mounted')
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
        if ( opt == 2 ) {
          console.log('dependent');
          this._getDependentPlanRenewalData_();
        }
      },
      _toggleTableInput_( index,inputIndex ) {
        this._resetActionSelector_('input');
        console.log(index,inputIndex);
        this.global_employeePlanData[ index ].activeInput[inputIndex] = true;
        // setTimeout(function() {
        //   $(".empl-tbl tbody tr:nth-child(" + (index+1) + ") td:nth-child(" + (inputIndex+3) + ") input").focus();
        // }, 200);
        this.$forceUpdate();

      },
      _toggleDependentsTableInput_( index,inputIndex ) {
        this._resetActionSelector_('input-dependent');
        this._resetActionSelector_('input-emp-name');
        this.global_dependentPlanData[ index ].activeInput[inputIndex] = true;
        // setTimeout(function() {
        //   $(".empl-tbl tbody tr:nth-child(" + (index+1) + ") td:nth-child(" + (inputIndex+3) + ") input").focus();
        // }, 200);
        this.$forceUpdate();
      },
      _formatDate_( date, from, to ){
        return moment( date, from ).format( to );
      },
      _fetchMemberData_() {
        this._getEmployeePlanRenewalData_();
        // this._getDependentPlanRenewalData_();

      },
      _toggleOptions_( data ) {
        // this._resetActionSelector_('options')
        console.log(data);
        this.global_employeePlanData.map((value,key)  => {
          if ( data.member_id == value.member_id ) {
            value.isOptionsShow = value.isOptionsShow == true ? false : true;
          } else {
            value.isOptionsShow = false;
          }
        })

        this.global_dependentPlanData.map((value,key)  => {
          if ( data.member_id == value.member_id ) {
            value.isOptionsShow = value.isOptionsShow == true ? false : true;
          } else {
            value.isOptionsShow = false;
          }
        })
        this.$forceUpdate();
      },
      _hideAllDrop_( e ) {
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
        if ($(e.target).parents(".employee-fullname-wrapper").length === 0) {
          this._resetActionSelector_('input-emp-name');
          this.$forceUpdate();
        }
        if ($(e.target).parents(".relationship-wrapper").length === 0) {
          this._resetActionSelector_('input-dependent');
          this.$forceUpdate();
        }
      },
      _resetActionSelector_(opt) {
        this.global_employeePlanData.map((value,key)  => {
          if(opt == 'options'){
            value.isOptionsShow = false;
          }
          if(opt == 'input'){
            value.activeInput[3] = false;
          }
        })
        this.global_dependentPlanData.forEach((value,key)  => {
          if(opt == 'options'){
            value.isOptionsShow = false;
          }
          if(opt == 'input-emp-name'){
            value.activeInput[1] = false;
          }
          if(opt == 'input-dependent'){
            value.activeInput[2] = false;
          }
        })
      },
      _toggleAddSeatOptions_() {
        this.global_isAddSeatDropShow = this.isAddSeatDropShow == true ? false : true;
      },
      _togglePerPage_() {
        this.global_isPerPageShow = this.global_isPerPageShow == false ? true : false;
      },
      _addSeatHeadCount_() {
        this.global_isAddSeatDropShow = false;

        let params = {
          customer_plan_renewal_id: 1,
          seats: 1,
          type: this.global_tblViewOpt == 1 ? 'employee' : 'dependent',
        }
        console.log(params);
      },
      _fillVacantSeat_() {
        if ( this.global_tblViewOpt == 1 ) {
          console.log('table 1');
        } else {
          console.log('table 2');
        }
        this.global_isAddSeatDropShow = false;
        // this._fetchMemberData_(); call the data
      },
      async _getEmployeePlanRenewalData_() {
        let params = {
          customer_plan_renewal_id: localStorage.customerRenewalId,
        }
        _showPageLoading_();
        _fetchEmployeePlanRenewalData_(params)
        .then(( res ) => {
          console.log(res);
          if( res.status == 200 || res.status == 201 ){
            this.global_employeePlanData = res.data.data.EmployeeDetails;

            this.global_employeePlanData.map((value, key) => {
              console.log(value,key);
              value.index = key;
              value.isVacantSeatShow = [];
              value.activeInput = [false, false, false];
            });

            _hidePageLoading_();
          }
        });
      },
      _getDependentPlanRenewalData_() {
        let params = {
          customer_plan_renewal_id: localStorage.customerRenewalId,
        }
        _showPageLoading_();
        _fetchDependentPlanRenewalData_(params)
        .then(( res ) => {
          console.log(res);
          if( res.status == 200 || res.status == 201 ){
            this.global_dependentPlanData = res.data.data.DependentDetails;

            this.global_dependentPlanData.map((value, key) => {
              console.log(value,key);
              value.index = key;
              value.isVacantSeatShow = [];
              value.activeInput = [];
            });
            _hidePageLoading_();
          }
        });
      },
      _setCountryCode_( index,value ) {
        if ( value == 'singapore' ) {
          this.global_employeePlanData[index].country_code = '+65';
        }
        if ( value == 'malaysia' ) {
          this.global_employeePlanData[index].country_code = '+60';
        }
        this.global_employeePlanData[index].activeInput[3] = false;
      },
      _setEmployeeForDependent_( index, value ) {
        this.global_dependentPlanData[index].fullname = value.fullname;
        this.global_dependentPlanData[index].employee_id = value.employee_id;
        this.global_dependentPlanData[index].customer_employee_plan_renewal_id = value.customer_employee_plan_renewal_id;
        this.global_dependentPlanData[index].activeInput[1] = false
        this.$forceUpdate();
      },
      _setRelationship_( index, value ) {
        this.global_dependentPlanData[index].relationship = value;
        this.global_dependentPlanData[index].activeInput[2] = false
      }
    }
  }
  
  export default memberDetails
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/planRenewal.scss";
</style>
