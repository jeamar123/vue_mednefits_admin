<script>
import Modal from "../../views/modal/Modal";
import moment from "moment";
import axios from "axios";
//

let corporateMemberList = {
	components: {
		Modal
	},
	data() {
		return {
			// --- Date options ---
			formats: {
				input: ["DD/MM/YYYY"],
				data: ["DD/MM/YYYY"]
			},
			//---------------------

			selectedCorporate: JSON.parse(localStorage.selected_corporate),
			customer_id: null,
			showTransferAccountModal: false,

			// ---for get member details and pagination ---
			corporate_members: [],
			corporate_pagination: [],
			page: 1,
			limit: 10,
			search: "",
			// -----------------------------
			// --- Tranfer Account ---
			showTransferCompanySummary: false,
			transfer_date: new Date()
			// -----------------------
		};
	},
	created() {
		this.customer_id = this.selectedCorporate.corporate.customer_id;

		// trigger api
		this.getMemberList();
	},
	methods: {
		// --- Tranfer Account ---
		toggleTransferAccountModal(data, index) {
			this.showTransferAccountModal = !this.showTransferAccountModal;
		},
		toggleTransferCompSummary() {
			this.showTransferCompanySummary = !this.showTransferCompanySummary;
		},
		updateTransferCompanyBtn(params) {
			let data = {
				member_id: undefined,
				old_customer_id: this.customer_id,
				new_customer_id: undefined,
				start_date: "2019-12-01"
				// serach: 'name'
			};

			let url = `${axios.defaults.serverUrl}/company/transfer_employee`;
			axios.post(url, data)
				.then(res => {
					if (res.status == 200) {
						console.log("transfer_employee", res);
						// this.$parent.hideLoading();
						this.toggleTransferAccountModal();
					}
				})
				.catch(err => {
					console.log(err);
					// this.$parent.hideLoading();
					this.toggleTransferAccountModal();
					this.$swal("Error!", err, "error");
				});
		},
		// -----------------------

		// api calls
		getMemberList() {
			let data = {
				customer_id: this.customer_id,
				page: this.page,
				limit: this.limit
				// serach: 'name'
			};

			let url = `${axios.defaults.serverUrl}/company/employee_lists?customer_id=${data.customer_id}&page=${data.page}&limit=${data.limit}`;
			axios.get(url)
				.then(res => {
					// this.$parent.showLoading();
					console.log("member list", res);
					if (res.status == 200) {
						this.corporate_members = res.data.data;
						this.corporate_pagination = res.data;

						this.corporate_members.map((value, index) => {
							value.enrollment_date = moment(value.enrollment_date).format(
								"DD MMMM, YYYY"
							);
							value.start_date = moment(value.start_date).format("DD MMMM, YYYY");
							value.expiry_date = moment(value.expiry_date).format(
								"DD MMMM, YYYY"
							);
							value.dob = moment(value.dob).format("DD MMMM, YYYY");
						});

						console.log("member list", this.corporate_members);
						// this.$parent.hideLoading();
					}
				})
				.catch(err => {
					console.log(err);
					// this.$parent.hideLoading();
					this.$swal("Error!", err, "error");
				});
		}
	}
};

export default corporateMemberList;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/corporateMemberList.scss";
/* Extra Large (xl) */

@media (max-width: 1280px) {
	/* ... */
}

/* Large (lg) */

@media (max-width: 1024px) {
	/* ... */
}

/* Medium (md) */

@media (max-width: 768px) {
	/* ... */
	.corporate-members-container {
		.search-member-wrapper {
			width: 50%;
		}
	}
}

/* Small (sm) */

@media (max-width: 640px) {
	/* ... */
	.corporate-members-container {
		.search-member-wrapper {
			width: 75%;
		}
	}
}
</style>
