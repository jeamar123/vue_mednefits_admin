<script>
let corporateMenu = {
  data() {
    return {
      corporateViewStatus: "CorporateDetails",
      sideBar: {
        trigger: false,
      }
    };
  },
  created() {
    this.corporateViewStatus = this.$route.name;
  },
  methods: {
    selectCorporateView(opt) {
      this.corporateViewStatus = opt;
      this.$router.push({ name: opt });
    },
    toggleSideInfoBar(opt) {
      //sidebar information in mobile view
      this.sideBar.trigger = !this.sideBar.trigger;
    }
  }
};

export default corporateMenu;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateMenu.scss";

//global css

//button container

/* Extra Large (xl) */

</style>
