<script>
import axios from "axios";
import moment from "moment"
import Loader from "../../views/loader/Loader";

let corporateMenu = {
	components: {
		Loader
	},
	props: {
		customer_id: [String, Number],
	},
	data() {
		return {
			// --- Loading State ---
			showLoader: false,
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

		this.api_all();
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
			this.showLoader = true;
		},
		hideLoading() {
			this.showLoader = false;
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
		api_all() {
			this.showLoading();
			let corporate_details = `${axios.defaults.serverUrl}/company/corporate_details?customer_id=${this.customer_id}`;
			let corporate_credits_info = `${axios.defaults.serverUrl}/company/corporate_credits_info?customer_id=${this.customer_id}`;
			let get_customer_renewal_status = `${axios.defaults.serverUrl}/company/get_customer_renewal_status?customer_id=${this.customer_id}`;

			Promise.all([
				axios.get(corporate_details),
				axios.get(corporate_credits_info),
				axios.get(get_customer_renewal_status)
			]).then(response => {
				// Log the data to the console
				// You would do something with both sets of data here
				console.log(response);
				if (response[0].status == 200) {
					this.corporateDetails_data = response[0].data;
				}
				if (response[1].status == 200) {
					this.corporateCreditsInfo_data = response[1].data;
				}
				if (response[2].status == 200) {
					this.corporateRenewalStatus_data = response[2].data;
				}
				this.hideLoading();
			}).catch(error => {
				// if there's an error, log it
				console.log(error);
				this.hideLoading();
			});

			// Promise.all([
			// 	this.getCorporateDetails(),
			// 	this.getCorporateCreditsInfo(),
			// 	this.getCustomerRenewalStatus(),
			// ]).then( res => {
			// 	console.log('mana ang side bar summary');
			// 	// this.hideLoading();
			// })
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
					console.log(err);
					// this.hideLoading();
					this.$swal("Error!", err, "error");
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
					console.log(err);
					// this.hideLoading();
					this.$swal("Error!", err, "error");
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
					console.log(err);
					// this.hideLoading();
					this.$swal("Error!", err, "error");
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
