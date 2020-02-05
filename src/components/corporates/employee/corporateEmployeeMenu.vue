<script>
import axios from "axios";
import moment from "moment"
import Loader from "../../../views/loader/Loader";

let corporateEmployeeMenu = {
	components: {
		Loader
	},
	props: {
		customer_id: [String, Number],
		member_id: [String, Number],
	},
	data() {
		return {
			// --- Loader ------
			showLoader: false,
			// -----------------
			// ---- Data storage ------
			employee_side_info: {},
			// ------------------------
			data: null,
			sideBar: {
				trigger: false,
			},
			activeTab: this.$route.name,
		};
	},
	created() {
		console.log(this.customer_id, this.member_id);
		console.log(this.$route);

		this.onLoad();
	},
	mounted() {},
	methods: {
		formatDate(date, from, to) {
			if (date != null) {
				return moment(date, from).format(to);
			}
		},
		// --- Methods Loader ------
		showLoading() {
			this.showLoader = true;
		},
		hideLoading() {
			this.showLoader = false;
		},
		// --------------------------
		toggleSideInfoBar(opt) {
			//sidebar information in mobile view
			this.sideBar.trigger = !this.sideBar.trigger;
		},
		showEmpSelectorInfo(page) {
			this.activeTab = page;
			this.$router.push({ name: page });
		},

		// API calls
		onLoad() {
			this.showLoading();
			let get_employee_details = `${axios.defaults.serverUrl}/company/get_employee_details?member_id=${this.member_id}`;

			axios.all([ //butang sa array ang ipa load na api or function para masunod ug tawag.
				axios.get(get_employee_details),
			]).then(res => {
				// Log the data to the console
				// You would do something with both sets of data here
				console.log(res);
				if (res[0].status == 200) {
					this.employee_side_info = res[0].data.data;
					console.log(this.employee_side_info);
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
	}
}

export default corporateEmployeeMenu
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateEmployee.scss";
</style>
