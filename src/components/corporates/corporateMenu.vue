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
@media (min-width: 1280px) {
  /* ... */
}

/* Large (lg) */
@media (min-width: 1024px) {
  /* ... */
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
