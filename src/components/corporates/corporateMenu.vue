<script>
import axios from "axios";
import moment from "moment"
import Loader from "../../views/loader/Loader";

import { 
	_getCorporateDetailsData_ ,
	_globalStorage_
} from '../../common/functions/common_functions';

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
				employee:{},
				dependent: {}
			},
			corporateCreditsInfo_data: {},
			corporateRenewalStatus_data: {},
		};
	},
	created() {
		this.corporateViewStatus = this.$route.name;
		this.onLoad();
	},
	methods: {
		// emits
		fromMemberList(data) {
			if(data) {
				this.getCorporateDetails(true);
			}
		},
		fromBulkCredits(data) {
			if(data) {
				this.getCorporateDetails();
				this.getCorporateCreditsInfo();
			}
		},
		// -----
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
				localStorage.startMemberList = true;
			}).catch(err => {
				this.$parent.hideLoading();
				this.errorHandler(err);
			});
		},
		async getCorporateDetails(isRefresh) {
			// side info'
			let params	=	{ 
				customer_id :	this.customer_id 
			};
			this.corporateDetails_data = await _getCorporateDetailsData_(params, isRefresh);
		},
		getCorporateCreditsInfo() {
			// side info
			let url = `${axios.defaults.serverUrl}/company/corporate_credits_info?customer_id=${this.customer_id}`;
			axios.get(url)
				.then(res => {
					if (res.status == 200) {
						this.corporateCreditsInfo_data = res.data;
					}
				})
				.catch(err => {
					this.$parent.hideLoading();
					this.errorHandler(err);
				});
		},
		getCustomerRenewalStatus() {
			// side info
			let url = `${axios.defaults.serverUrl}/company/get_customer_renewal_status?customer_id=${this.customer_id}`;
			axios.get(url)
				.then(res => {
					if (res.status == 200) {
						this.corporateRenewalStatus_data = res.data;
					}
				})
				.catch(err => {
					this.$parent.hideLoading();
					this.errorHandler(err);
				});
		},
		sendPlanExpiration() {
			this.$parent.showLoading();
			let url = `${axios.defaults.serverUrl}/company/send_company_plan_expiration_notification`;
			let data = {
				customer_id: this.customer_id,
				email: localStorage.company_email
			}
			axios.post(url,data)
				.then(res => {
					if (res.status == 200) {
						this.$parent.hideLoading();
						this.$swal('Success', res.data.message, 'success');
					}
				})
				.catch(err => {
					this.$parent.hideLoading();
					this.errorHandler(err);
				});
		}
	},
};

export default corporateMenu;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateMenu.scss";
</style>
