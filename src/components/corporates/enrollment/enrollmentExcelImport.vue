<script>
import { 
  _showPageLoading_,
  _hidePageLoading_,
  _uploadEmployeeEnrollmentExcel_,
  _getCompanySpendingAccountStatus_
} from '../../../common/functions/common_functions';

  let enrollmentExcelImport = {
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        global_uploadFile:  {},
        global_spendingStatus: {},
      };
    },
    created(){
      this._getSpendingStatus_();
    },
    methods: {
      async _getSpendingStatus_(){
        let params	=	{ 
          customer_id :	this.customer_id 
        };
        this.global_spendingStatus = await _getCompanySpendingAccountStatus_(params);
      },
      _uploadExcel_(data){
        this.global_uploadFile = data[0];
      },
      _uploadfile_(){
        let formData = new FormData();
        let params = {
          employee_enrollment: this.global_uploadFile,
          customer_id: this.customer_id
        }
        Object.keys( params ).map(( key ) => {
          formData.append(key, params[ key ]);
        });
        _showPageLoading_();
        _uploadEmployeeEnrollmentExcel_(formData)
					.then(( res ) => {
            console.log(res);
            if( res.status == 200 || res.status == 201 ){
              this.$router.push({ name: 'EnrollmentSummaryPreview' });
              this.global_uploadFile = null;
            } else {
              this.$swal('Error!', res.data.message, 'error');
            }
            _hidePageLoading_();
          })
      },
      _downloadExcelTemplate(isEmpOnly){
        if(isEmpOnly){
          if(this.global_spendingStatus.medical_enable && this.global_spendingStatus.wellness_enable){
            window.location.href = 'https://mednefits.s3-ap-southeast-1.amazonaws.com/excel/v2/employees/Employee-Enrollment-Listing-With-Medical-With-Wellness.xlsx';
          }else if(this.global_spendingStatus.medical_enable){
            window.location.href = 'https://mednefits.s3-ap-southeast-1.amazonaws.com/excel/v2/employees/Employee-Enrollment-Listing-With-Medical.xlsx';
          }else if(this.global_spendingStatus.wellness_enable){
            window.location.href = 'https://mednefits.s3-ap-southeast-1.amazonaws.com/excel/v2/employees/Employee-Enrollment-Listing-With-Wellness.xlsx';
          }else{
            window.location.href = 'https://mednefits.s3-ap-southeast-1.amazonaws.com/excel/v2/employees/Employee-Enrollment-Listing.xlsx';
          }
        }else{
          if(this.global_spendingStatus.medical_enable && this.global_spendingStatus.wellness_enable){
            window.location.href = 'https://mednefits.s3-ap-southeast-1.amazonaws.com/excel/v2/dependents/Employees-and-Dependents-With-Medical-With-Wellness.xlsx';
          }else if(this.global_spendingStatus.medical_enable){
            window.location.href = 'https://mednefits.s3-ap-southeast-1.amazonaws.com/excel/v2/dependents/Employees-and-Dependents-With-Medical.xlsx';
          }else if(this.global_spendingStatus.wellness_enable){
            window.location.href = 'https://mednefits.s3-ap-southeast-1.amazonaws.com/excel/v2/dependents/Employees-and-Dependents-With-Wellness.xlsx';
          }else{
            window.location.href = 'https://mednefits.s3-ap-southeast-1.amazonaws.com/excel/v2/dependents/Employees-and-Dependents.xlsx';
          }
        }
      },
    }
  }
  
  export default enrollmentExcelImport
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/employeeEnrollment.scss";
</style>