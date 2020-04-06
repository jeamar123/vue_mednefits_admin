<script>
  let planRenewal = {
    data() {
      return {
        empSelectorActive: {
          value: 0,
          text: ""
        },
       activeTab: this.$route.name,
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
    },
    methods: {
      _goToTab_( page ) {
        console.log(page);
        this.activeTab = page;
        this.$router.push({ name: page });
      },
    }
  }
  
  export default planRenewal
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/planRenewal.scss";
</style>
