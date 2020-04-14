<script>
	import axios from 'axios';
	axios.defaults.headers.common['Authorization'] = localStorage.getItem('vue_admin_session');

	var dashboard = {
		data() {
			return {
				showLoader : false,
				user_id : null,
				isMenuShow: false,
				global_isTransactionDropdownShow: false,
				global_isAdminDropdownShow: false,
				global_isSettingsDropdownShow: false,
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
			},
			_hideAllDrop_( e ) {
        if ($(e.target).parents(".nav-ul").length === 0) {
          this.global_isTransactionDropdownShow  = false;
          this.global_isAdminDropdownShow = false;
          this.global_isSettingsDropdownShow = false;
          // console.log('click sa gawas');
				}
      },
			_transactionSelector_() {
				console.log('ma close');
				this.global_isTransactionDropdownShow = false;
			},
			_hideSelector_() {
				this.isMenuShow = false;
			},
			_hideDpSelector_() {
				this.global_isTransactionDropdownShow  = false;
				this.global_isAdminDropdownShow = false;
				this.global_isSettingsDropdownShow = false;
			},
			_showAdminDropdown_( type ) {
				this.global_isTransactionDropdownShow  = false;
				this.global_isAdminDropdownShow = false;
				this.global_isSettingsDropdownShow = false;
				
				if ( type == 'transaction' ) {
					this.global_isTransactionDropdownShow = this.global_isTransactionDropdownShow == false ? true : false;
				}
				if ( type == 'settings' ) {
					this.global_isSettingsDropdownShow = this.global_isSettingsDropdownShow == false ? true : false;
				}
				if ( type == 'admin' ) {
					this.global_isAdminDropdownShow = this.global_isAdminDropdownShow == false ? true : false;
				}
				
			},
    }
	}

	export default dashboard
</script>