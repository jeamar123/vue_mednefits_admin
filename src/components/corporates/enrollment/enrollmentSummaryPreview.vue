<script>
import Modal from "../../../views/modal/Modal.vue";
import jobList from '../../../assets/json/job.json';

  let enrollmentSummaryPreview = {
    components: {
      Modal
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
            }
          ],
        },
        jobList: jobList,
      };
    },
    created(){
    },
    methods: {
      _toggleSummaryEditModal_(){
        this.global_isSummaryEditModalShow = this.global_isSummaryEditModalShow ? false : true;
      }
    }
  }
  
  export default enrollmentSummaryPreview
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/employeeEnrollment.scss";
</style>