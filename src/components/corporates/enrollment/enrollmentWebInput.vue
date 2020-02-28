<script>
  let enrollmentWebInput = {
    data() {
      return {
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_addEmployeeData: {
          fixed:  0,
        },
        global_isDependentInputShow:  false,
      };
    },
    created(){
    },
    methods: {
      
    }
  }
  
  export default enrollmentWebInput
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/employeeEnrollment.scss";
</style>

<style>
  .date-container input.vDatepicker {
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
  }
</style>