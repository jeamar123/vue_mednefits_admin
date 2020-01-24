<script>
let corporateMemberList = {
  data() {
    return {};
  },
  created() {},
  methods: {}
};

export default corporateMemberList;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateMemberList.scss";

/* Extra Large (xl) */
@media (max-width: 1280px) {
  /* ... */
}

/* Large (lg) */
@media (max-width: 1024px) {
  /* ... */
}

/* Medium (md) */
@media (max-width: 768px) {
  /* ... */

  .corporate-members-container {

    .search-member-wrapper {
      width: 50%;
    }
  }
}

/* Small (sm) */
@media (max-width: 640px) {
  /* ... */
  .corporate-members-container {

    .search-member-wrapper {
      width: 75%;
    }
  }
  
}
</style>
