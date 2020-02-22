<script>
  let gcapPerVisit = {
    data() {
      return {
        global_showInput: false,
        global_showText: true,
        global_getGpData: [
          {
            id: 0,
            name: "Noelou Nagac",
            amount: 100
          },
          {
            id: 2,
            name: "Agniez Permites",
            amount: 250
          }
        ],
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
    },
    methods: {
      ___editTable( data ) { 

          

        _.forEach( [data], function(value) {
          console.log(value);
          
        });
      },
    }
  }
  
  export default gcapPerVisit
</script>

<style lang="scss" scoped>
	/*@import "./src/assets/css/corporates.scss";*/
  @import "./src/assets/css/corporateSettings.scss";
</style>