<script>
  let resetCompanyCredits = {
    data() {
      return {
        // empSelectorActive: {
        //   value: 0,
        //   text: ""
        // },
        // corporateViewStatus : 'CorporateDetails',
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_resetEffectiveDate:  undefined,
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
  
  export default resetCompanyCredits
</script>

<style lang="scss" scoped>
	// @import "./src/assets/css/corporates.scss";
</style>
