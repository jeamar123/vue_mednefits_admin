<script>
	import { 
		_login_ 
	} from '../common/functions/common_functions';
	
	var auth = {
		data() {
			return {
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
      login( formData ){
				if( !formData.username ){
					this.$swal('Error!', 'Email is required.', 'error');
					return false;
				}
				if( !formData.password ){
					this.$swal('Error!', 'Password is required.', 'error');
					return false;
				}
				_login_( formData )
					.then(( res ) => {
						console.log( res );
						if( res.status == 200 || res.status == 201 ){
							// this.$swal( 'Success!', res.data.message, 'success' );
							localStorage.setItem('vue_admin_session', res.data.token);
							this.$router.push( { name: 'Corporates' } );
						}
					});
      }
    }
	}

	export default auth;
</script>
<style lang="scss" scoped>
	@import "./src/assets/css/auth.scss";
</style>