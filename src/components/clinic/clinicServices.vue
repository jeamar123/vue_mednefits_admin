<script>
let clinicServices = {
  data() {
    return {
      isAddServicesShow : false,
      isEditService : false,
    };
  },
  created(){

  },
  methods: {
    editServices( opt ){
      if( this.isAddServicesShow == false ){
        this.isAddServicesShow = true;
      }else{
        this.isAddServicesShow = false;
      }
      this.isEditService = (opt == 'edit') ? true : false;
    },
  }
}
  
export default clinicServices
</script>

<style lang="scss" scoped>
  @import "./src/assets/css/clinic.scss";
</style>
