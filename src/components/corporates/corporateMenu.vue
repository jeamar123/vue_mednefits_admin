<script>
let corporateMenu = {
  data() {
    return {
      corporateViewStatus: "CorporateDetails",
      sideBar: {
        trigger: false,
        sideStyle: "sideBar-hide",
        sideContainer: {},
        empInfoWrapper: {}
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

      // if (this.sideBar.trigger == true) {
      //   this.sideBar.sideStyle = {
      //     left: "sideBar-hide"
      //   };
      //   // this.sideInfo.sideContainer = {
      //   //   gridTemplateColumns: '1fr 100%',
      //   // }
      // } else {
      //   console.log("false ni");
      //   this.sideBar.sideStyle = {
      //     left: ""
      //   };
      //   // this.sideInfo.sideContainer = {
      //   //   gridTemplateColumns: '1fr 100%',
      //   // }
      // }
    }
  }
};

export default corporateMenu;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateMenu.scss";

//global css

//button container
.sideBar-hide {
  left: 0 !important;
}
.hide {
  display: none !important;
}

.btn {
  width: 100%;
  margin: 5px 0;
  font-size: 12px;
  line-height: 1.4;
  height: auto;
}

/* Extra Large (xl) */
@media (max-width: 1280px) {
  /* ... */
}

/* Large (lg) */
@media (max-width: 1024px) {
  /* ... */
  .corporate-menu-container {
    grid-template-columns: 1fr 100%;

    .left-box-wrapper {
      position: relative;
      left: -292px;
      // left: -336px;

      .corporate-details-box {
        .close-btn.summary {
          display: unset;
        }
      }
    }

    .right-box-wrapper {
      position: relative;
      left: -292px;

      .corporate-main-container {
        .toggleResponsive-closeCorporate {
          // grid-template-columns: 1fr;
          .btn-menu {
            display: unset;
          }
        }
      }
    }
  }
}

/* Medium (md) */
@media (max-width: 768px) {
  /* ... */
}

/* Small (sm) */
@media (max-width: 640px) {
  /* ... */
}
</style>
