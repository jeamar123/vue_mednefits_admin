<script>
	import axios from 'axios';

	var dashboard = {
		data() {
			return {
				showLoader : false,
				user_id : null,
			}
		},
		created() {
			axios.defaults.headers.common['Authorization'] = localStorage.getItem('vue_admin_session');
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
    }
	}

	export default dashboard
</script>