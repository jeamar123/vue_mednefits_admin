<script>
  let planRenewal = {
    data() {
      return {
        empSelectorActive: {
          value: 0,
          text: ""
        },
        // corporateViewStatus : 'CorporateDetails',
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
    },
    methods: {
      // selectCorporateView( opt ){
      //   this.corporateViewStatus = opt;
      //   this.$router.push( { name : opt } );
      // }
    }
  }
  
  export default planRenewal
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporates.scss";
</style>
