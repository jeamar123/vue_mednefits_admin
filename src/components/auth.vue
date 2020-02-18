<script>
	import { _login_ } from '../common/functions/common_ApiServices';
	
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
      showLoading: () => {
      	this.showLoader = true;
      },
      // hideLoading() {
      // 	setTimeout(()=>{
			// 	  this.showLoader = false;
			// 	},100);
      // },
      login: ( formData ) => {
				if( !formData.username ){
					this.$swal('Error!', 'Email is required.', 'error');
					return false;
				}
				if( !formData.password ){
					this.$swal('Error!', 'Password is required.', 'error');
					return false;
				}
				this.showLoading();
				_login_( formData )
					.then(( res ) => {
						console.log( res );
						if( res.status == 200 || res.status == 201 ){
							// this.$swal( 'Success!', res.data.message, 'success' );
							// localStorage.setItem('vue_admin_session', res.data.token);
							// this.$router.push( { name: 'Corporates' } );
						}else{
							this.$swal( 'Error!', res.data.message, 'error' );
						}
						this.hideLoading();
					});
      }
    }
	}

	export default auth;
</script>
<style lang="scss" scoped>
	@import "./src/assets/css/auth.scss";
</style>