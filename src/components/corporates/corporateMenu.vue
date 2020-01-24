<script>
let corporateMenu = {
  data() {
    return {
      corporateViewStatus: "CorporateDetails"
    };
  },
  created() {
    this.corporateViewStatus = this.$route.name;
  },
  methods: {
    selectCorporateView(opt) {
      this.corporateViewStatus = opt;
      this.$router.push({ name: opt });
    }
  }
};

export default corporateMenu;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateMenu.scss";

//global css

//button container

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
      left: -336px;
    }

    .right-box-wrapper {
      position: relative;
      left: -292px;
    }
  }
}

/* Medium (md) */
@media (min-width: 768px) {
  /* ... */
}

/* Small (sm) */
@media (min-width: 640px) {
  /* ... */
}
</style>
