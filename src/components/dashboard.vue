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
			_showTransactionDropdown_() {
				this.global_isTransactionDropdownShow = this.global_isTransactionDropdownShow == false ? true : false;
			},
			_hideAllDrop_( e ) {
        if ($(e.target).parents(".nav-ul").length === 0) {
          this.global_isTransactionDropdownShow  = false;
          // console.log('click sa gawas');
				}
      },
			_transactionSelector_() {
				console.log('ma close');
				this.global_isTransactionDropdownShow = false;
			},
			_hideSelector_() {
				this.isMenuShow = false;
			}
    }
	}

	export default dashboard
</script>