<script>
	import axios from 'axios'

	axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjVlMmIyZjUwZWY5ODcxMTc1NWVhNDU1NCIsInVzZXJuYW1lIjoiYWRtaW5AbWVkbmVmaXRzLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU3OTg4ODQ4NSwiZXhwIjoxNTgyNDgwNDg1fQ.Wv1VsLF9mECVF5VwmdSx6xLmGW9Ot06AA0lgBvGIMcM';

	var dashboard = {
		data() {
			return {
				showLoader : false,
				user_id : null,
				isMenuShow: false,
			}
		},
		created() {
			axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6IjVlMmIyZjUwZWY5ODcxMTc1NWVhNDU1NCIsInVzZXJuYW1lIjoiYWRtaW5AbWVkbmVmaXRzLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU3OTg4ODQ4NSwiZXhwIjoxNTgyNDgwNDg1fQ.Wv1VsLF9mECVF5VwmdSx6xLmGW9Ot06AA0lgBvGIMcM';
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