<script>
import axios from "axios";
import moment, { locale } from "moment";
import Modal from "../views/modal/Modal.vue";

var corporates = {
  components: {
    Modal
  },
  data() {
    return {
      filterData: {
        start: null,
        end: null
      },
      corporate_pagination: {},

      isFilterModalShow: false,
      isExportModalShow: false,
      isSearchShow: false,
      isPageLimitDropShow: false,
      allCompanySelected: false,

      search_text: "",
      searchPropertiesText: "",

      corporate_id_arr: [],
      corporate_list_arr: [],
      export_data_header: [
        "Company Name",
        "Expiry Date",
        "HR Account Status",
        "Total Employee Seats",
        "Total Dependent Seats",
        "Total Medical Credits",
        "Account/Plan Type",
        "No. of Employees",
        "No. of Dependents",
        "Start Date",
        "Medical Allocated Credits",
        "Medical Spent Credits",
        "Wellness Allocated Credits",
        "Plant Amount",
        "HR Email Address",
        "Employee Full Name",
        "Employee Email Address",
        "Employee Mobile Number",
        "Employee Date of Birth",
        "Employee Status",
        "Employee Cap Per Visit"
      ],
      export_data_keys: [
        "company_name",
        "end_date",
        "hr_account_status",
        "employee_seats",
        "dependent_seats",
        "total_medical_credits",
        "account_type",
        "no_of_employees",
        "no_of_dependents",
        "start_date",
        "medical_credits_allocated",
        "medical_spent_credits",
        "wellness_credits_allocated",
        "plan_amount",
        "hr_email",
        "employee_fullname",
        "employee_email_address",
        "mobile",
        "dob",
        "employee_status",
        "employee_cap"
      ],
      export_data_key_index: [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],

      page_active: 1,
      page_limit: 10,
      pagesToDisplay: 10
    };
  },
  created() {
    this.getCompanyList();
  },
  computed: {
    limitPagination() {
      if (this.corporate_pagination.last_page) {
        var arr = this.range(this.corporate_pagination.last_page);
        return arr.slice(
          this.startIndex(),
          this.startIndex() + this.pagesToDisplay
        );
      } else {
        return this.range(this.corporate_pagination.last_page);
      }
    },
    searchedExportProperties() {
      // console.log( this.searchedExportProperties );
      if (this.searchPropertiesText != "") {
        return this.export_data_header.filter(value => {
          // console.log( value );
          return value
            .toLowerCase()
            .startsWith(this.searchPropertiesText.toLowerCase());
        });
      } else {
        return this.export_data_header;
      }
    }
  },
  methods: {
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
          this.corporate_pagination.last_page
        ) {
          return this.corporate_pagination.last_page - this.pagesToDisplay + 1;
        }
        return this.page_active - Math.floor(this.pagesToDisplay / 2);
      }
      return 0;
    },
    goToPage(num) {
      this.page_active = num;
      this.getCompanyList();
    },
    prevPage() {
      if (this.page_active != 1) {
        this.page_active -= 1;
        this.getCompanyList();
      }
    },
    nextPage() {
      if (this.page_active != this.corporate_pagination.last_page) {
        this.page_active += 1;
        this.getCompanyList();
      }
    },
    setPageLimit(limit) {
      this.page_limit = limit;
      this.page_active = 1;
      this.isPageLimitDropShow = false;
      this.getCompanyList();
    },
    togglePageLimitDrop() {
      this.isPageLimitDropShow =
        this.isPageLimitDropShow == true ? false : true;
    },
    addFilterModal() {
      this.isFilterModalShow = this.isFilterModalShow == false ? true : false;
    },
    exportModal() {
      this.isExportModalShow = this.isExportModalShow == false ? true : false;
    },
    allCompanyCheckBox(opt) {
      this.corporate_id_arr = [];
      if (opt == false) {
        this.corporate_list_arr.map(value => {
          this.corporate_id_arr.push(value.corporate.customer_id);
          value.selected = true;
        });
      } else {
        this.corporate_list_arr.map(value => {
          value.selected = false;
        });
      }
    },
    companyCheckBox(list, opt) {
      if (opt == false) {
        this.corporate_id_arr.push(list.corporate.customer_id);
      } else {
        this.corporate_id_arr.splice(
          $.inArray(list.corporate.customer_id, this.corporate_id_arr),
          1
        );
      }
    },
    goToCompanyDetails(data) {
      // console.log( data );
      this.$router.push({
        name: "CorporateMenu",
        params: {
					customer_id: data.corporate.customer_id,
				}
			});
			
			localStorage.selected_corporate = JSON.stringify(data);
    },
    closeAllModalsDrop() {
      // console.log('click outside.');
      // this.isPageLimitDropShow = false;
      // this.isFilterModalShow = false;
      // this.isExportModalShow = false;
    },
    refreshData() {
      // console.log('so refreshing...');
    },
    removeExportKey(index) {
      this.export_data_key_index[index] = false;
      this.$forceUpdate();
    },
    searchCompanyChanged(data) {
      console.log(data);
      if (data == "") {
        // this.getCompanyList();
      }
    },

    exportData() {
      var params = "";
      this.export_data_keys.map((value, key) => {
        if (this.export_data_key_index[key] == true) {
          params += value.toLowerCase().replace(" ", "_") + "=true&";
        }

        if (key == this.export_data_keys.length - 1) {
          // this.$parent.showLoading();
          // axios.get( url )
          // 	.then(res => {
          // 		console.log( res );
          // 		this.$parent.hideLoading();
          // 	})
          // 	.catch(err => {
          // 		console.log(err);
          // 		this.$parent.hideLoading();
          // 		this.swal('Error!', err, 'error');
          // 	});
        }
      });

      console.log(params);
    },
    getCompanyList() {
      this.$parent.showLoading();
      this.isFilterModalShow = false;
      // + '&limit=' + this.page_limit
      var url =
        axios.defaults.serverUrl +
        "/company/corporate?page=" +
        this.page_active;
      if (this.filterData.start != null && this.filterData.end != null) {
        url +=
          "&start=" +
          moment(this.filterData.start).format("YYYY-MM-DD") +
          "&end=" +
          moment(this.filterData.end).format("YYYY-MM-DD");
      }
      if (this.search_text != null && this.search_text != "") {
        url += "&search=" + this.search_text;
      }
      //  ?page=' + this.page_active + '&limit' + this.page_limit
      console.log(url);
      axios
        .get(url)
        .then(res => {
          console.log(res);
          this.corporate_list_arr = res.data.data;
          this.corporate_pagination = res.data;
          // console.log(this.corporate_list_arr);
          // console.log(this.corporate_pagination);

          this.corporate_list_arr.map(value => {
            value.selected = false;
          });

					// this.filterData = {
					// 	start: null,
					// 	end: null,
					// };
					this.$parent.hideLoading();
				})
				.catch(err => {
					console.log(err);
					// this.$parent.hideLoading();
					this.swal('Error!', err, 'error');
				});
			}
    }
  };

export default corporates;
</script>
	<style lang="scss" scoped>
@import "./src/assets/css/corporates.scss";
@import "./src/assets/css/corporate-list.scss";
</style>


