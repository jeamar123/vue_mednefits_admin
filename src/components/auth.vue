<script>
	import axios from 'axios'

	var auth = {
		data() {
			return {
				showLoader : false,
				user_id : null,
				formData : {
					username : null,
					password : null,
				}
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
				},100);
      },
      login( formData ){
				if( !formData.username ){
					this.$swal('Error!', 'Email is required.', 'error');
					return false;
				}
				if( !formData.password ){
					this.$swal('Error!', 'Password is required.', 'error');
					return false;
				}
				this.showLoading();
				axios.post( axios.defaults.serverUrl + '/login/signin' , formData )
				.then(res => {
					console.log( res );
					if( res.data.status ){
						localStorage.setItem('vue_admin_session', res.data.token);
						this.$router.push( { name: 'Corporates' } );
					}
					this.hideLoading();
				})
				.catch(err => {
					this.$parent.hideLoading();
					this.errorHandler( err );
				});
      }
    }
	}

	export default auth;
</script>
<style lang="scss" scoped>
	@import "./src/assets/css/auth.scss";
</style>