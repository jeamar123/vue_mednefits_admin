<script>
	import axios from 'axios'

	var corporates = {
		data() {
			return {
				user_id : null,
				isSearchShow : false,
			}
		},
		created() {
		},
		methods: {
      showSearch(){
      	this.isSearchShow = true;
      },
      hideSearch(){
      	this.isSearchShow = false;
      }
    }
	}

	export default corporates;
</script>
<style lang="scss" scoped>
	@import "./src/assets/css/corporates.scss";
</style>