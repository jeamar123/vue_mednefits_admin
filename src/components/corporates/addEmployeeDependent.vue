<script>
import axios from "axios";
import { 
  _showPageLoading_,
  _hidePageLoading_,
  _uploadEmployeeDependent_,
  _downloadEmployeeDependentExcel_,
} from '../../common/functions/common_functions';

  let addEmployeeDependent = {
    props: {
      customer_id: [String, Number],
      company_name: [String, Number],
    },
    data() {
      return {
        global_uploadFile: {},
        global_isShowPreview: false,
        global_empDepList: [],
      };
    },
    created(){
      
    },
    methods: {
      _uploadEmployeeDependentExcel_(){
        let formData = new FormData();
        let params = {
          company_id: this.customer_id,
          filename: this.global_uploadFile,
        }
        Object.keys( params ).map(( key ) => {
          formData.append(key, params[ key ]);
        });
        _showPageLoading_();
        _uploadEmployeeDependent_(formData)
					.then(( res ) => {
            console.log(res);
            if( res.status == 200 || res.status == 201 ){
              this.global_isShowPreview = true;
              this.global_uploadFile = {};
              this.global_empDepList = _.chain(res.data.data)
                                        .groupBy("employee_name")
                                        .map((value, key) => ({ employee_name: key, dependents: value }))
                                        .value();
              console.log(this.global_empDepList);
            } else {
              this.$swal('Error!', res.data.message, 'error');
            }
            _hidePageLoading_();
          })
      },
      _setUploadFile_(data){
        this.global_uploadFile = data[0];
      },
      _downloadEmpDepExcel_(){
        let params = {
          token: localStorage.getItem('vue_admin_session'),
          customer_id: this.customer_id
        }
        window.open(axios.defaults.serverUrl + '/company/downloadEmployeeDependent?token=' + params.token + '&companyID=' + params.customer_id);
      }
    }
  }
  
  export default addEmployeeDependent
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporateSettings.scss";
</style>