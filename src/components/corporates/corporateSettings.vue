<script>
  let corporateSettings = {
    props: {
      customer_id: [String, Number],
		  company_name: [String, Number],
    },
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
      console.log( this.customer_id );
      console.log( this.company_name );
    },
    methods: {
      // selectCorporateView( opt ){
      //   this.corporateViewStatus = opt;
      //   this.$router.push( { name : opt } );
      // }
    }
  }
  
  export default corporateSettings
</script>

<style lang="scss" scoped>
	// @import "./src/assets/css/corporateSettings.scss";
</style>