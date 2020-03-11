<script>
import { 
  _showPageLoading_,
  _hidePageLoading_,
  _fetchPackagePlanList_,
  _getCompanySpendingAccountStatus_,
  _enrollEmployeeWebInput_,
  _getCorporateDetailsData_,
  _formChecker_,
} from '../../../common/functions/common_functions';
import moment from "moment";

  let enrollmentWebInput = {
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_addEmployeeData: {
          fixed:  1,
          dependents: [],
          plan_start: new Date(),
          plan_end: new Date(),
          medical_allocation: 0,
          wellness_allocation: 0,
        },
        global_isDependentInputShow:  false,
        global_spendingStatus: {
          medical_enable: true,
          wellness_enable: true,
        },
        global_package: {
          package: {
            name: 'Package Plan'
          }
        },
        global_addDependentData: {},
        corporateDetails_data: {},
        global_dependentArr: [],
        global_dependentCtr: 0,
      };
    },
    async created(){
      _showPageLoading_();
      await this.getCorporateDetails();
      await this._getPackagePlanList_();
      await this._getSpendingStatus_();
    },
    methods: {
      async _getSpendingStatus_(){
        let params	=	{ 
          customer_id :	this.customer_id 
        };
        this.global_spendingStatus = await _getCompanySpendingAccountStatus_(params);
         _hidePageLoading_();
      },
      async _getPackagePlanList_(){
        let params  = {
          customer_id: this.customer_id,
        }
        await _fetchPackagePlanList_(params)
          .then((res)  =>  {
            this.global_package = res.data;
          });
      },
      _toggleAddDependentForm_(){
        if( this.global_isDependentInputShow == true ){
          this.$swal({
            title: 'Confirm',
            text: "Unsaved changes will be deleted. Proceed?",
            type: 'warning',
            confirmButtonColor: 'rgb(37, 48, 108)',
            cancelButtonColor: '#C1C1C1',
            showCancelButton: true,
          }).then((result) => {
            if(result.value){
              this.global_isDependentInputShow = false;
            }
          })
        }else{
          this.global_isDependentInputShow = true;
        }
      },
      _enrollEmployee_(){
        let params  = {
          customer_id: this.customer_id,
          fullname: this.global_addEmployeeData.fullname,
          dob: this.global_addEmployeeData.dob ? moment(this.global_addEmployeeData.dob).format('YYYY-MM-DD') : undefined,
          phone_code: this.global_addEmployeeData.phone_code,
          phone_no: this.global_addEmployeeData.phone_no,
          postal_code: this.global_addEmployeeData.postal_code,
          email: this.global_addEmployeeData.email,
          plan_start: moment(this.global_addEmployeeData.plan_start).format('YYYY-MM-DD'),
          fixed: this.global_addEmployeeData.fixed == 1 ? true : false,
          medical_allocation: this.global_addEmployeeData.medical_allocation,
          wellness_allocation: this.global_addEmployeeData.wellness_allocation,
          dependents: this.global_addEmployeeData.dependents
        }
        if(_formChecker_(params) == false){
          return false;
        }
        this.$swal({
          title: 'Confirm',
          text: "Are you sure you want to create this Employee?",
          type: 'warning',
          confirmButtonColor: 'rgb(37, 48, 108)',
          cancelButtonColor: '#C1C1C1',
          showCancelButton: true,
          confirmButtonText: 'Yes, Create it!'
        }).then((result) => {
          if(result.value){
            _showPageLoading_();
            _enrollEmployeeWebInput_(params)
              .then((res)  =>  {
                console.log(res);
                if(res.status == 200 || res.status == 201){
                  this.$swal('Success!', res.data.message, 'success');
                  this.$router.push({'name': 'CorporateMemberList'});
                }else{
                  this.$swal('Error!', res.data.message, 'error');
                }
                _hidePageLoading_();
              });
          }
        })
      },
      async getCorporateDetails(isRefresh) {
        let params	=	{ 
          customer_id :	this.customer_id 
        };
        this.corporateDetails_data = await _getCorporateDetailsData_(params, isRefresh);
        console.log(this.corporateDetails_data);
        this.global_addEmployeeData.plan_start = new Date(this.corporateDetails_data.plan_start);
        this.global_addEmployeeData.plan_end = new Date(this.corporateDetails_data.plan_end);
      },
      _formatDate_(date, from, to){
        return moment(date, from).format(to);
      },
      _addDependentData_(data){
        let params = {
          fullname: data.fullname,
          relationship: data.relationship,
          dob: data.dob ? moment(data.dob).format('YYYY-MM-DD') : undefined,
          plan_start: data.plan_start ? moment(data.plan_start).format('YYYY-MM-DD') : undefined
        }
        if(_formChecker_(params) == true){
          this.global_dependentArr.push(params);
          this.global_addDependentData = {};
          this.global_dependentCtr += 1;
        }else{
          return false;
        }
        return true;
      },
      _nextPrevArrow_(opt){
        if(opt){
          this.global_dependentCtr += 1;
          console.log(this.global_dependentArr);
          console.log(this.global_dependentArr[this.global_dependentCtr]);
          if(this.global_dependentArr[this.global_dependentCtr] && this.global_dependentArr[this.global_dependentCtr].hasOwnProperty('fullname')){
            this._setDependentData_();
          }else{
            this.global_addDependentData = {};
          }
        }else{
          this.global_dependentCtr -= 1;
          this._setDependentData_();
        }
      },
      _saveDependentData_(){
        if(this.global_addDependentData.fullname != undefined || this.global_addDependentData.dob != undefined || this.global_addDependentData.relationship != undefined || this.global_addDependentData.plan_start != undefined){
          if(this._addDependentData_(this.global_addDependentData) == false){
            return false;
          }
        }
        if(this.global_dependentArr.length > 0){
          console.log(this.global_dependentArr);
          this.global_addDependentData = {};
          this.global_dependentCtr = 0;
          if(this.global_dependentArr.length > 0){
            this.global_addEmployeeData.dependents = _.concat(this.global_addEmployeeData.dependents, this.global_dependentArr);
          }else{
            this.global_addEmployeeData.dependents = this.global_dependentArr;
          }
          this.global_dependentArr = [];
          this.global_isDependentInputShow = false;
          console.log(this.global_addEmployeeData);
          this.$swal('Success!', 'Dependents added for this employee.', 'success');
        }else{
          this.$swal('Error!', 'Please add at least one dependent.', 'error');
        }
        
      },
      _setDependentData_(){
        let data = {
          fullname: this.global_dependentArr[this.global_dependentCtr].fullname,
          relationship: this.global_dependentArr[this.global_dependentCtr].relationship,
          dob: new Date(this.global_dependentArr[this.global_dependentCtr].dob),
          plan_start: new Date(this.global_dependentArr[this.global_dependentCtr].plan_start)
        }
        this.global_addDependentData = data;
      },
    }
  }
  
  export default enrollmentWebInput
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/employeeEnrollment.scss";
</style>

<style>
  .enrollment-web-input-container .date-container input.vDatepicker {
    position: relative;
    z-index: 1;
    cursor: pointer;
    display: block;
    margin-top: 0;
    background: none;
    padding: 2px 2px 1px;
    border-width: 0 0 1px;
    line-height: 26px;
    height: 30px;
    border-radius: 0;
    border-style: solid;
    width: 100%;
    font-weight: 700;
    z-index: 1;
  }
</style>