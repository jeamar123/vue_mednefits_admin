<script>
	import axios from 'axios'

	var clinic = {
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

	export default clinic
</script>
<style lang="scss" scoped>
	@import "./src/assets/css/clinic.scss";
</style>