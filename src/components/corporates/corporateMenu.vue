<script>
import axios from "axios";
import moment from "moment"
import Loader from "../../views/loader/Loader";

let corporateMenu = {
	components: {
		Loader,
	},
	props: {
		customer_id: [String, Number],
		company_name: [String, Number],
	},
	data() {
		return {
			// --- Loading State ---
			showLoader: false,
			dataTest: 'Loadding',
			// ---------------------
			corporateViewStatus: "CorporateDetails",
			sideBar: {
				trigger: false
			},
			corporateDetails_data: {
				employee: {
					// total_seats: 0,
					// occupied_seats: 0,
					// vacant_seats: 0,
				},
				dependent: {
					// total_seats: 0,
					// occupied_seats: 0,
					// vacant_seats: 0,
				}
			},
			corporateCreditsInfo_data: {},
			corporateRenewalStatus_data: {},
			// selectedCorporate: JSON.parse(localStorage.selected_corporate),
			// customer_id: null,

		};
	},
	created() {
		// this.customer_id = this.selectedCorporate.corporate.customer_id;
		this.corporateViewStatus = this.$route.name;
		console.log('id gikan sa corporate list', this.customer_id, 'data pd niya', this.selectedCorporate);

		this.onLoad();
		// trigger api onLoad
		// this.getCorporateDetails();
		// this.getCorporateCreditsInfo();
		// this.getCustomerRenewalStatus();
	},
	methods: {
		formatDate(date, from, to) {
			if (date != null) {
				return moment(date, from).format(to);
			}
		},
		// --- Methods Loading ------
		showLoading() {
			this.$parent.showLoading();
		},
		hideLoading() {
			this.$parent.hideLoading();
		},
		// --------------------------
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
		onLoad() {
			axios.all([
				this.getCorporateDetails(),
				this.getCustomerRenewalStatus(),
				this.getCorporateCreditsInfo(),
			]).then(res => {
				console.log('success all api');
				localStorage.startMemberList = true;
			}).catch(err => {
        this.$parent.hideLoading();
        this.errorHandler( err );
			});

		},

		getCorporateDetails() {
			// side info
			let url = `${axios.defaults.serverUrl}/company/corporate_details?customer_id=${this.customer_id}`;
			axios.get(url)
				.then(res => {
					if (res.status == 200) {
						console.log('details', res);
						this.corporateDetails_data = res.data;
						// this.hideLoading();
					}
				})
				.catch(err => {
					this.$parent.hideLoading();
					this.errorHandler( err );
				});
		},
		getCorporateCreditsInfo() {
			// side info
			let url = `${axios.defaults.serverUrl}/company/corporate_credits_info?customer_id=${this.customer_id}`;
			axios.get(url)
				.then(res => {

					if (res.status == 200) {
						console.log('credits info', res);
						this.corporateCreditsInfo_data = res.data;

						// this.hideLoading();
					}
				})
				.catch(err => {
					this.$parent.hideLoading();
					this.errorHandler( err );
				});
		},
		getCustomerRenewalStatus() {
			// side info
			let url = `${axios.defaults.serverUrl}/company/get_customer_renewal_status?customer_id=${this.customer_id}`;
			axios.get(url)
				.then(res => {
					if (res.status == 200) {
						console.log('renewal status', res);
						this.corporateRenewalStatus_data = res.data;
						// this.hideLoading();
					}
				})
				.catch(err => {
					this.$parent.hideLoading();
					this.errorHandler( err );
				});
		},
	},
};

export default corporateMenu;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateMenu.scss";
//global css
//button container
/* Extra Large (xl) */
</style>
