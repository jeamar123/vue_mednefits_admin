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
        this.global_isSummaryEditModalShow = this.global_isSummaryEditModalShow ? false : true;
        if(selectedEmp){
          // selectedEmp
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
            start_date: selectedEmp.start_date
          };
          if(selectedEmp.dependents){
            this.global_selectedEmployee.dependents = [];
            selectedEmp.dependents.map((value,  key) =>  {
              this.global_selectedEmployee.dependents.push({
                temp_enrollment_id: value.temp_enrollment_id,
                fullname: value.fullname,
                relationship: value.relationship,
                dob: value.dob,
                start_date: value.start_date,
              });
            });
          }
        }
      },
      _getTempEmployeeList_(){
        let params  = {
          customer_id: this.customer_id,
        }
        _showPageLoading_();
        _fetchPreviewTempEmployees_(params)
          .then((res)  =>  {
            console.log(res);
            this.global_tempEmployeeList = res.data.data;
            this.global_tempEmployeeList.map((value,key) =>  {
              value.dob = new Date( moment( value.dob, ['DD/MM/YYYY','YYYY-MM-DD'] ).format('YYYY-MM-DD') );
              value.start_date = new Date( moment( value.start_date, ['DD/MM/YYYY','YYYY-MM-DD'] ).format('YYYY-MM-DD') );
              if(value.dependents){
                value.dependents.map((dep,key)  =>  {
                  dep.dob = new Date( moment( dep.dob, ['DD/MM/YYYY','YYYY-MM-DD'] ).format('YYYY-MM-DD') );
                  dep.start_data = new Date( moment( dep.start_data, ['DD/MM/YYYY','YYYY-MM-DD'] ).format('YYYY-MM-DD') );
                });
              }
            });
            _hidePageLoading_();
          });
      },
      _updateEmployeeDependents_(updateData){
        console.log(updateData);
        let params  = {
          temp_enrollment_id: updateData.temp_enrollment_id,
          first_name: updateData.fullname,
          last_name: updateData.fullname,
          fullname: updateData.fullname,
          job_title: updateData.job_title,
          email: updateData.email,
          // nric: '',
          dob: moment(updateData.dob).format('YYYY-MM-DD'),
          mobile: updateData.mobile,
          mobile_area_code: updateData.mobile_area_code,
          wellness_credits: updateData.wellness_credits,
          medical_credits: updateData.medical_credits,
          // postal_code: '',
          plan_start: moment(updateData.start_date).format('YYYY-MM-DD')
        }
        _updateTempEmployees_(params)
          .then((res)  =>  {
            console.log(res);
            if(res.status == 201 || res.status == 200){
              this._toggleSummaryEditModal_();
              this._getTempEmployeeList_();
              this.$swal('Success!',  res.data.message, 'success');
            }else{
              this.$swal('Error!',  res.data.message, 'error');
            }
          });
      },
      _allCheckBoxEmployee_(opt){
        this.global_selectedIds = [];
        this.global_tempEmployeeList.map((value,key) =>  {
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
      _removeSelectedEmployees_(){
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
            this._removeEmployee_();
          }
        })
      },
      _removeEmployee_(){
        let params  = {
          id: this.global_selectedIds[this.global_deleteCtr]
        }
        console.log(params);
        _deleteTempEmployees_(params)
          .then((res)  =>  {
            console.log(res);
            if(this.global_deleteCtr != this.global_selectedIds.length - 1){
              this.global_deleteCtr += 1;
              this._removeEmployee_();
            }else{
              this._getTempEmployeeList_();
              this.$swal('Success!', res.data.message, 'success');
              this.global_deleteCtr = 0;
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
