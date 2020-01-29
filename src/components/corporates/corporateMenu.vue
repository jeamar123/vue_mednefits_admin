<script>
import axios from "axios";
import moment from "moment"

let corporateMenu = {
	props: {
		customer_id: {
			type: null
		},
	},
	data() {
		return {
			corporateViewStatus: "CorporateDetails",
			sideBar: {
				trigger: false
			},
			corporateDetails_data: {},
			corporateCreditsInfo_data: {},
			corporateRenewalStatus_data: {},
			selectedCorporate : JSON.parse(localStorage.selected_corporate),

		};
	},
	created() {
		this.corporateViewStatus = this.$route.name;
		console.log('id gikan sa corporate list', this.customer_id, 'data pd niya', this.selectedCorporate);

		// trigger api onLoad
		this.getCorporateDetails();
		this.getCorporateCreditsInfo();
		this.getCustomerRenewalStatus();
	},
	methods: {
		selectCorporateView(opt) {
			this.corporateViewStatus = opt;
			this.$router.push({ name: opt });
		},
		toggleSideInfoBar(opt) {
			//sidebar information in mobile view
			this.sideBar.trigger = !this.sideBar.trigger;
		},
		goBackToLastPage() {
			this.$router.back();
		},

		// Api Calls

		getCorporateDetails() {
			// side info
			let url = `${axios.defaults.serverUrl}/company/corporate_details?customer_id=${this.customer_id}`;
			axios.get(url)
				.then(res => {
					console.log('details', res);
					this.corporateDetails_data = res.data


					this.corporateDetails_data.plan_start = moment(this.corporateDetails_data.plan_start).format('MMMM DD, YYYY');
					this.corporateDetails_data.plan_end = moment(this.corporateDetails_data.plan_end).format('MMMM DD, YYYY');
					this.corporateDetails_data.last_credit_reset_data = moment(this.corporateDetails_data.last_credit_reset_data).format('MMMM DD, YYYY');

					this.$parent.hideLoading();
				})
				.catch(err => {
					console.log(err);
					// this.$parent.hideLoading();
					this.swal("Error!", err, "error");
				});
		},
		getCorporateCreditsInfo() {
			// side info
			let url = `${axios.defaults.serverUrl}/company/corporate_credits_info?customer_id=${this.customer_id}`;
			axios.get(url)
				.then(res => {
					console.log('credits info', res);
					this.corporateCreditsInfo_data = res.data;

					this.$parent.hideLoading();
				})
				.catch(err => {
					console.log(err);
					// this.$parent.hideLoading();
					this.swal("Error!", err, "error");
				});
		},
		getCustomerRenewalStatus() {
			// side info
			let url = `${axios.defaults.serverUrl}/company/get_customer_renewal_status?customer_id=${this.customer_id}`;
			axios.get(url)
				.then(res => {
					console.log('renewal status', res);
					this.corporateRenewalStatus_data = res.data;
					this.$parent.hideLoading();
				})
				.catch(err => {
					console.log(err);
					// this.$parent.hideLoading();
					this.swal("Error!", err, "error");
				});
		},
	}
};

export default corporateMenu;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateMenu.scss";
//global css
//button container
/* Extra Large (xl) */
</style>
