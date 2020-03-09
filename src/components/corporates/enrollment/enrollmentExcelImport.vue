<script>
import { 
  _showPageLoading_,
  _hidePageLoading_,
	_uploadEmployeeEnrollmentExcel_ ,
} from '../../../common/functions/common_functions';

  let enrollmentExcelImport = {
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        global_uploadFile:  {},
      };
    },
    created(){
    },
    methods: {
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
          window.location.href = 'https://mednefits.s3-ap-southeast-1.amazonaws.com/excel/Employee+Enrollment+Listing+-+With+Medical+Spending+Account+-+No+Medical+Entitlement+Balance+-+No+Wellness+Spending+Account.xlsx';
        }else{
          window.location.href = 'https://mednefits.s3-ap-southeast-1.amazonaws.com/excel/Employees+and+Dependents+-+With+Medical+Spending+Account+-+No+Medical+Entitlement+Balance+-+No+Wellness+Spending+Account.xlsx';
        }
      },
    }
  }
  
  export default enrollmentExcelImport
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/employeeEnrollment.scss";
</style>