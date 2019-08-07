<script>
let clinicDoctors = {
  data() {
    return {
      isAddDoctorsShow : false,
      isEditDoctor : false,
    };
  },
  created(){

  },
  methods: {
    editDoctors( opt ){
      if( this.isAddDoctorsShow == false ){
        this.isAddDoctorsShow = true;
      }else{
        this.isAddDoctorsShow = false;
      }
      this.isEditDoctor = (opt == 'edit') ? true : false;
    },
  }
}
  
export default clinicDoctors
</script>

<style lang="scss" scoped>
  @import "./src/assets/css/clinic.scss";
</style>
