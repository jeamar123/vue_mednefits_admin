<script>
  let  healthPartnerAccess = {
    data() {
      return {
        
      };
    },
    created(){
      this.corporatesViewStatus = this.$route.name;
    },
    methods: {
      selectCorporatesView( opt ){
        this.corporatesViewStatus = opt;
        this.$router.push( { name : opt } );
      },
    }
  }
  
  export default healthPartnerAccess
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporates.scss";
</style>
