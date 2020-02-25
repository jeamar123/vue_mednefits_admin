<script>
  let enrollmentExcelImport = {
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
        this.$router.push({ name: 'EnrollmentSummaryPreview' });
      }
    }
  }
  
  export default enrollmentExcelImport
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/employeeEnrollment.scss";
</style>