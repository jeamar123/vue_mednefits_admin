<script>
	import axios from 'axios';
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('vue_admin_session');

	var dashboard = {
		data() {
			return {
				showLoader : false,
				user_id : null,
				isMenuShow: false,
			}
		},
		created() {
			if( localStorage.getItem('vue_admin_session') == 'null' || localStorage.getItem('vue_admin_session') == null || localStorage.getItem('vue_admin_session') == '' || localStorage.getItem('vue_admin_session') == undefined ){
				this.$router.replace({ name: 'Auth' });
			}else{
				axios.defaults.headers.common['Authorization'] = localStorage.getItem('vue_admin_session');
			}
		},
		methods: {
      showLoading() {
      	this.showLoader = true;
      },
      hideLoading() {
      	setTimeout(()=>{
				  this.showLoader = false;
				},100);
			},
			toggleMenu(){
				this.isMenuShow = this.isMenuShow == true ? false : true;
			}
    }
	}

	export default dashboard
</script>