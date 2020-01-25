<script>
	import axios from 'axios'

	var dashboard = {
		data() {
			return {
				showLoader : false,
				user_id : null,
				isMenuShow: false,
			}
		},
		created() {
		},
		methods: {
      showLoading() {
      	this.showLoader = true;
      },
      hideLoading() {
      	setTimeout(()=>{
				  this.showLoader = false;
				},1000);
			},
			toggleMenu(){
				this.isMenuShow = this.isMenuShow == true ? false : true;
			}
    }
	}

	export default dashboard
</script>