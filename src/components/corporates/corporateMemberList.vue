<script>
import Modal from "../../views/modal/Modal";
import moment from "moment";
import axios from "axios";
import Loader from "../../views/loader/Loader";
//

let corporateMemberList = {
	components: {
		Modal,
		Loader
	},
	props: {
		customer_id: [String, Number],
		company_name: [String, Number],
	},
	data() {
		return {
			// --- Date options ---
			formats: {
				input: ["DD/MM/YYYY"],
				data: ["DD/MM/YYYY"]
			},
			//---------------------

			// selectedCorporate: JSON.parse(localStorage.selected_corporate),
			showTransferAccountModal: false,

			// ---for get member details and pagination ---
			corporate_members: [],
			corporate_pagination: {
				data: [],
			},
			page_active: 1,
			page_limit: 10,
			searchEmployee: "",
			pagesToDisplay: 5,
			isPageLimitDropShow: false,
			searchActive: false,
			// -----------------------------
			// --- Tranfer Account ---
			showTransferCompanySummary: false,
			showCompanyDrop: false,
			selected_transfer_data: {
				name: "",
				member_id: "",
				current_company: "",
				transfer_date: new Date(),
				company: ""
			},
			compnayList_done: false,
			company_list: []
			// -----------------------
		};
	},
	created() {
		console.log(this.customer_id);
		// this.customer_id = this.selectedCorporate.corporate.customer_id;

		// this.getMemberList();
		// this.getCompanyList();
		// localStorage.employee_email = '';
		this.onLoad(localStorage.startMemberList);
		// await this.hideLoading();

	},
	computed: {
		limitPagination() {
			if (this.corporate_pagination.totalPages) {
				var arr = this.range(this.corporate_pagination.totalPages);
				return arr.slice(
					this.startIndex(),
					this.startIndex() + this.pagesToDisplay
				);
			} else {
				return this.range(this.corporate_pagination.totalPages);
			}
		}
	},
	methods: {
		formatDate(date, from, to) {
			if (date != null) {
				return moment(date, from).format(to);
			}
		},
		goToEmployeeInformation(list) {
			console.log("Employee Information ", list);
			this.$router.push({
				name: "EmployeeInformation",
				params: {
					member_id: list.member_id,
					name: list.fullname
						.split(" ")
						.slice(-1)
						.join(" ")
				}
			});
		},
		// --- Tranfer Account ---
		toggleTransferAccountModal(list) {
			this.showTransferAccountModal = !this.showTransferAccountModal;
			if (list) {
				this.selected_transfer_data = {
					name: list.fullname,
					member_id: list.member_id,
					current_company: this.company_name,
					transfer_date: new Date(),
					company: ""
				};
			}
		},
		toggleTransferCompSummary(type) {
			
			if(this.selected_transfer_data.company != '' || type == 'close') {

				if(this.selected_transfer_data.company == this.company_name) {
					this.$swal("Warning!", "Transfer to same company is not allowed", "warning");
				} else {
					this.showTransferCompanySummary = !this.showTransferCompanySummary;
				}

			} else {
				this.$swal('Warning', 'No company is selected.','warning');
			}

			if (this.showTransferCompanySummary == true) {
				this.selected_transfer_data.transfer_date = moment(
					this.selected_transfer_data.transfer_date
				).format("DD MMMM, YYYY");
			} else {
				this.selected_transfer_data.transfer_date = new Date(
					this.selected_transfer_data.transfer_date
				);
			}
		},
		companyTransferTyping(data) {
			if (data.length > 1) {
				this.showCompanyDrop = true;
				console.log(this.selected_transfer_data.company);
			} else {
				this.showCompanyDrop = false;
			}
		},
		setCustomerId(data) {
			this.showCompanyDrop = false;

			console.log(data);
			this.selected_transfer_data.new_company_id = data.customer_id;
			this.selected_transfer_data.company = data.company_name;
		},
		getCompanyList() {
			// this.showLoading();
			let url = `${axios.defaults.serverUrl}/company/get_company_lists`;
			axios
				.get(url)
				.then(res => {
					console.log("Company list", res);
					if (res.data.status == true) {
						this.company_list = res.data.data;
						this.compnayList_done = true;
						// console.log("Company list", this.company_list);
						// this.hideLoading();
					}
				})
				.catch(err => {
					this.$parent.hideLoading();
					this.errorHandler(err);
				});
		},
		updateTransferCompanyBtn(params) {
			console.log("params", params);
			let data = {
				member_id: params.member_id,
				old_customer_id: this.customer_id,
				new_customer_id: params.new_company_id,
				start_date: moment(params.transfer_date).format("YYYY/MM/DD")
				// serach: 'name'
			};
			let url = `${axios.defaults.serverUrl}/company/transfer_employee`;

			if(data.old_customer_id != data.new_customer_id) {

				this.showLoading();
				axios.post(url, data)
				.then(res => {
					if (res.data.status == true) {
						console.log("transfer_employee", res);
						this.hideLoading();
						this.$swal("Success!", res.data.message, "success")
							.then(res => {
								this.getMemberList();
							})
						// this.hideLoading();
						this.showTransferAccountModal = !this.showTransferAccountModal;
					} else {
						this.hideLoading();
						this.$swal("Error!", `${this.selected_transfer_data.company} is not a company`, "error");
					}
				})
				.catch(err => {
					this.showTransferAccountModal = !this.showTransferAccountModal;
					this.hideLoading();
					this.errorHandler(err);
				});
			} else {
				this.$swal("Warning!", "Transfer to same company is not allowed", "warning");
			}
			
		},
		// -----------------------

		// --- Pagination ---

		range(num) {
			var arr = [];
			for (var i = 0; i < num; i++) {
				arr.push(i);
			}
			return arr;
		},
		startIndex() {
			if (this.page_active > this.pagesToDisplay / 2 + 1) {
				if (
					this.page_active + Math.floor(this.pagesToDisplay / 2) >
					this.corporate_pagination.totalPages
				) {
					return this.corporate_pagination.totalPages - this.pagesToDisplay + 1;
				}
				return this.page_active - Math.floor(this.pagesToDisplay / 2);
			}
			return 0;
		},
		goToPage(num) {
			this.page_active = num;
			this.getMemberList();
		},
		prevPage() {
			if (this.corporate_pagination.hasPrevPage) {
				this.page_active = this.corporate_pagination.prevPage;
				this.getMemberList();
			}
		},
		nextPage() {
			if (this.corporate_pagination.hasNextPage) {
				this.page_active = this.corporate_pagination.nextPage;
				this.getMemberList();
			}
		},
		setPageLimit(limit) {
			this.page_limit = limit;
			this.page_active = 1;
			this.isPageLimitDropShow = false;
			this.getMemberList();
		},
		togglePageLimitDrop() {
			this.isPageLimitDropShow =
				this.isPageLimitDropShow == true ? false : true;
		},
		// ------------------

		// api calls
		onLoad(trigger) {
			console.log(trigger);
			axios.all([
				this.getMemberList(),
			]).then(res => {

			}).catch(err => {
				this.$parent.hideLoading();
				this.errorHandler(err);
			});
		},
		getMemberList() {
			let data = {
				customer_id: this.customer_id,
				page: this.page_active,
				limit: this.page_limit
				// search: this.searchEmployee
			};
			this.$parent.showLoading();
			let url = `${axios.defaults.serverUrl}/company/employee_lists?customer_id=${data.customer_id}&page=${data.page}&limit=${data.limit}`;
			axios
				.get(url)
				.then(res => {
					console.log("member list", res);
					if (res.status == 200) {
						this.corporate_members = res.data.data;
						this.corporate_pagination = res.data;

						this.corporate_members.map((value, index) => {
							value.enrollment_date = moment(value.enrollment_date).format(
								"DD MMMM, YYYY"
							);
							value.start_date = moment(value.start_date).format(
								"DD MMMM, YYYY"
							);
							value.expiry_date = moment(value.expiry_date).format(
								"DD MMMM, YYYY"
							);
							value.dob = moment(value.dob).format("DD MMMM, YYYY");
						});
						this.searchActive = false;
						console.log("member list", this.corporate_members);
						this.getCompanyList(),
							this.$parent.hideLoading();
					}
				})
				.catch(err => {
					this.$parent.hideLoading();
					this.errorHandler(err);
				});
		},
		searchMemberList(item) {
			let data = {
				customer_id: this.customer_id,
				page: this.page_active,
				limit: this.page_limit,
				search: item
			};

			this.$parent.showLoading();
			let url = `${axios.defaults.serverUrl}/company/employee_lists?customer_id=${data.customer_id}&page=${data.page}&limit=${data.limit}&search=${data.search}`;
			axios
				.get(url)
				.then(res => {
					console.log("search member list", res);
					if (res.status == 200) {
						this.corporate_members = res.data.data;

						this.corporate_members.map((value, index) => {
							value.enrollment_date = moment(value.enrollment_date).format(
								"DD MMMM, YYYY"
							);
							value.start_date = moment(value.start_date).format(
								"DD MMMM, YYYY"
							);
							value.expiry_date = moment(value.expiry_date).format(
								"DD MMMM, YYYY"
							);
							value.dob = moment(value.dob).format("DD MMMM, YYYY");
						});

						this.searchActive = true;
						console.log("search member list", this.corporate_members);
						this.$parent.hideLoading();
					}
				})
				.catch(err => {
					this.$parent.hideLoading();
					this.errorHandler(err);
				});
		},
		searchEmpty(data) {
			console.log(data);
			if (data == "") {
				this.getMemberList();
			}
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
	.transfer-account {
		.modal-container {
			width: 100% !important;
			margin: 70px auto;
		}
	}
	.corporate-members-container {
		.search-member-wrapper {
			width: 75%;
		}
	}
}
</style>
