<script>
  let corporateMenu = {
    data() {
      return {
        corporateViewStatus : 'CorporateDetails',
      };
    },
    created(){
      this.corporateViewStatus = this.$route.name;
    },
    methods: {
      selectCorporateView( opt ){
        this.corporateViewStatus = opt;
        this.$router.push( { name : opt } );
      }
    }
  }
  
  export default corporateMenu
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporateMenu.scss";
</style>
