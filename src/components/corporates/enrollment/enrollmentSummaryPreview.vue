<script>
import Modal from "../../../views/modal/Modal.vue";
import jobList from '../../../assets/json/job.json';
import moment from "moment";
import { 
  _showPageLoading_,
  _hidePageLoading_,
  _fetchPreviewTempEmployees_ ,
  _formatDate_,
  _updateTempEmployees_,
  _deleteTempEmployees_,
  _updateTempDependents_,
  _enrollTempEmployees_,
} from '../../../common/functions/common_functions';

  let enrollmentSummaryPreview = {
    components: {
      Modal
    },
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_isSummaryEditModalShow: false,
        global_selectedEmployee: {
          dependents: [
            {
              dob: new Date(),
              start_date: new Date(),
            }
          ],
        },
        jobList: jobList,
        global_tempEmployeeList:  [],
        global_enrollOptions: {
          isSendWelcomeEmail: false,
          isProvideDefaultPassword: false,
          defaultPassword: '',
        },
        global_selectedIds: [],
        global_isAllCheckBoxChecked:  false,
        global_deleteCtr: 0,
        global_DepCtr: 0,
        global_hasError: false,
        global_enrollCtr: 0,
      };
    },
    created(){
      this._getTempEmployeeList_();
    },
    methods: {
      _formatDate_(date, from, to){
        return _formatDate_(date, from, to);
      },
      _toggleSummaryEditModal_(selectedEmp){
        if(selectedEmp){
          this.global_selectedEmployee  = {
            temp_enrollment_id: selectedEmp.temp_enrollment_id,
            fullname: selectedEmp.fullname,
            job_title: selectedEmp.job_title,
            email: selectedEmp.email,
            dob: selectedEmp.dob,
            mobile: selectedEmp.mobile,
            mobile_area_code: selectedEmp.mobile_area_code,
            wellness_credits: selectedEmp.wellness_credits,
            medical_credits: selectedEmp.medical_credits,
            start_date: selectedEmp.start_date,
            dependent: [],
            error_logs: selectedEmp.error_logs,
          };
          if(selectedEmp.dependent){
            selectedEmp.dependent.map((value,  key) =>  {
              this.global_selectedEmployee.dependent.push({
                dependent_temp_enrollment_id: value.dependent_temp_enrollment_id,
                fullname: value.fullname,
                relationship: value.relationship,
                dob: value.dob,
                plan_start: value.plan_start,
                error_logs: value.error_logs,
              });
            });
          }
        }
        this.global_isSummaryEditModalShow = this.global_isSummaryEditModalShow ? false : true;
      },
      _getTempEmployeeList_(){
        this._resetValues_();
        let params  = {
          customer_id: this.customer_id,
        }
        _showPageLoading_();
        _fetchPreviewTempEmployees_(params)
          .then((res)  =>  {
            console.log(res);
            this.global_tempEmployeeList = res.data.data;
            this.global_hasError = _.some(this.global_tempEmployeeList, { 'error_status': true });
            _.forIn( this.global_tempEmployeeList, (value,key) =>  {
              value.dob = new Date( moment( value.dob, ['DD/MM/YYYY','YYYY-MM-DD'] ).format('YYYY-MM-DD') );
              value.start_date = new Date( moment( value.start_date, ['DD/MM/YYYY','YYYY-MM-DD'] ).format('YYYY-MM-DD') );
              if(value.dependent){
                value.dependent.map((dep,key)  =>  {
                  dep.dob = new Date( moment( dep.dob, ['DD/MM/YYYY','YYYY-MM-DD'] ).format('YYYY-MM-DD') );
                  dep.plan_start = new Date( moment( dep.plan_start, ['DD/MM/YYYY','YYYY-MM-DD'] ).format('YYYY-MM-DD') );
                });
                this.global_DepCtr = value.dependent.length > this.global_DepCtr ? value.dependent.length : this.global_DepCtr;
              }
            });
            _hidePageLoading_();
          });
      },
      _updateEmployeeDependents_(updateData){
        let params  = {
          temp_enrollment_id: updateData.temp_enrollment_id,
          fullname: updateData.fullname,
          job_title: updateData.job_title,
          email: updateData.email,
          dob: moment(updateData.dob).format('DD/MM/YYYY'),
          mobile: updateData.mobile,
          mobile_area_code: updateData.mobile_area_code,
          wellness_credits: updateData.wellness_credits,
          medical_credits: updateData.medical_credits,
          plan_start: moment(updateData.start_date).format('DD/MM/YYYY')
        }
        _updateTempEmployees_(params)
          .then((res)  =>  {
            if(res.status == 201 || res.status == 200){
              updateData.dependent.map((value, key)  =>  {
                let dep_params  = {
                  dependent_temp_enrollment_id: value.dependent_temp_enrollment_id,
                  fullname: value.fullname,
                  dob: moment(value.dob).format('DD/MM/YYYY'),
                  plan_start: moment(value.plan_start).format('DD/MM/YYYY'),
                  relationship: value.relationship,
                }
                _updateTempDependents_(dep_params)
                  .then((res)  =>  {
                    console.log(res);
                    if(key == updateData.dependent.length - 1){
                      this.global_isSummaryEditModalShow = false;
                      this._getTempEmployeeList_();
                      this.$swal('Success!',  res.data.message, 'success');
                    }
                  })
              });
            }else{
              this.$swal('Error!',  res.data.message, 'error');
            }
          });
      },
      _allCheckBoxEmployee_(opt){
        this.global_selectedIds = [];
        _.forIn( this.global_tempEmployeeList, (value,key) =>  {
          value.selected = opt;
          if(opt){
            this.global_selectedIds.push(value.temp_enrollment_id);
          }
        });
        this.$forceUpdate();
      },
      _checkBoxEmployee_(data,opt){
        if(opt){
          this.global_selectedIds.push(data.temp_enrollment_id);
        }else{
          _.pull(this.global_selectedIds, data.temp_enrollment_id);
        }
        this.$forceUpdate();
      },
      _removeSelectedEmployees_(id){
        this.$swal({
          title: 'Confirm',
          text: "Are you sure you want to remove this Enrollee/s?",
          type: 'warning',
          confirmButtonColor: 'rgb(37, 48, 108)',
          cancelButtonColor: '#C1C1C1',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          console.log(result);
          if (result.value) {
            if(id){
              this.global_selectedIds.push(id);
            }
            this.global_isSummaryEditModalShow = false;
            _showPageLoading_();
            this._removeEmployee_();
          }
        })
      },
      _removeEmployee_(){
        let params  = {
          id: this.global_selectedIds[this.global_deleteCtr]
        }
        _deleteTempEmployees_(params)
          .then((res)  =>  {
            console.log(res);
            if(this.global_deleteCtr != this.global_selectedIds.length - 1){
              this.global_deleteCtr += 1;
              this._removeEmployee_();
            }else{
              this._getTempEmployeeList_();
              _hidePageLoading_();
              this.$swal('Success!', res.data.message, 'success');
              this.global_deleteCtr = 0;
            }
          });
      },
      _resetValues_(){
        this.global_selectedIds = [];
        this.global_isAllCheckBoxChecked =  false;
        this.global_DepCtr = 0;
      },
      _submitEnrollTempEmployees_(){
        let params  = {
          temp_enrollment_id: this.global_tempEmployeeList[this.global_enrollCtr].temp_enrollment_id
        }
        _showPageLoading_();
        _enrollTempEmployees_(params)
          .then((res)  =>{
            console.log(res);
            if(this.global_enrollCtr != Object.keys(this.global_tempEmployeeList).length - 1){
              this.global_enrollCtr += 1;
              this._submitEnrollTempEmployees_();
            }else{
              _hidePageLoading_();
              this.$swal('Success!', res.data.message, 'success');
              this.global_enrollCtr = 0;
              this.$router.replace({ name: 'CorporateMenu' });
            }
          });
      }
    }
  }
  
  export default enrollmentSummaryPreview
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/employeeEnrollment.scss";
</style>
