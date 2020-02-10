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
      formats: {
				input: ["DD/MM/YYYY"],
				data: ["DD/MM/YYYY"]
			},
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
      exportAllCompany: false,

      search_text: "",
      searchPropertiesText: "",

      corporate_id_arr : [],
      corporate_list_arr : [],
      export_data_header : [
        {
          name: 'Company Name',
          isSelected: true
        },
        {
          name: 'Expiry Date',
          isSelected: true
        },
        {
          name: 'HR Account Status',
          isSelected: true
        },
        {
          name: 'Total Employee Seats',
          isSelected: true
        },
        {
          name: 'Total Dependent Seats',
          isSelected: true
        },
        {
          name: 'Total Medical Credits',
          isSelected: true
        },
        {
          name: 'Account/Plan Type',
          isSelected: true
        },
        {
          name: 'No. of Employees',
          isSelected: false
        },
        {
          name: 'No. of Dependents',
          isSelected: false
        },
        {
          name: 'Start Date',
          isSelected: false
        },
        {
          name: 'Medical Allocated Credits',
          isSelected: false
        },
        {
          name: 'Medical Spent Credits',
          isSelected: false
        },
        {
          name: 'Wellness Allocated Credits',
          isSelected: false
        },
        {
          name: 'Plan Amount',
          isSelected: false
        },
        {
          name: 'HR Email Address',
          isSelected: false
        },
        {
          name: 'Employee Full Name',
          isSelected: false
        },
        {
          name: 'Employee Email Address',
          isSelected: false
        },
        {
          name: 'Employee Mobile Number',
          isSelected: false
        },
        {
          name: 'Employee Date of Birth',
          isSelected: false
        },
        {
          name: 'Employee Status',
          isSelected: false
        },
        {
          name: 'Employee Cap Per Visit',
          isSelected: false
        },
      ],
      export_data_keys : [
        'company_name',
        'plan_end',
        'hr_account_status',
        'total_employee_seats',
        'total_dependent_seat',
        'total_medical_credit',
        'account_type',
        'no_employees',
        'no_dependents',
        'plan_start',
        'medical_credit', //allocated
        'medical_spent_credits',
        'wellness_credit', //allocated
        'plan_amount',
        'hr_email',
        'employee_fullname',
        'employee_email',
        'mobile',
        'employee_dob',
        'employee_status',
        'cap_status'
      ],
      page_active: 1,
      page_limit: 10,
      pagesToDisplay: 5,
      overallTotalCompanies: 0,
    };
  },
  created() {
    localStorage.startMemberList = false;
    localStorage.company_name = '';
    localStorage.company_email= '';
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
          return value.name.toLowerCase().startsWith(this.searchPropertiesText.toLowerCase());
        });
      } else {
        return this.export_data_header;
      }
    },
    countSelectedProperties(){
      let ctr = 0;
      this.export_data_header.map((value) => {
        if( value.isSelected == true ){
          ctr += 1;
        }
      });
      return ctr;
    },
  },
  methods: {
    formatDate( date, from, to ){
      return moment( date, from ).format( to );
    },
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
    setPageLimit( limit ){
      this.page_limit = limit;
      this.page_active = 1;
      this.isPageLimitDropShow = false;
      this.getCompanyList();
    },
    togglePageLimitDrop(){
      this.isPageLimitDropShow = this.isPageLimitDropShow == true ? false : true;
    },
    addFilterModal(){
      this.isFilterModalShow = this.isFilterModalShow == false ? true : false;
    },
    exportModal(){
      this.isExportModalShow = this.isExportModalShow == false ? true : false;
      if( this.isExportModalShow == false ){
        this.export_data_header.map( ( value, index ) => {
          value.isSelected = index > 6 ? false : true;
        });
      }
    },
    allCompanyCheckBox( opt ){
      console.log( this.allCompanySelected );
      this.corporate_id_arr = [];
      if( opt == true ){
        this.corporate_list_arr.map((value) => {
          this.corporate_id_arr.push( value.corporate.customer_id );
          value.selected = true;
        });

        if( this.corporate_pagination.total == this.corporate_id_arr.length ){
          this.exportAllCompany = true;
        }
      }else{
        this.corporate_list_arr.map((value) => {
          value.selected = false;
        });
        this.exportAllCompany = false;
        this.overallTotalCompanies = this.corporate_pagination.total;
      }
    },
    companyCheckBox( list, opt ){
      if( opt == true ){
        this.corporate_id_arr.push( list.corporate.customer_id );
      }else{
        this.corporate_id_arr.splice( $.inArray( list.corporate.customer_id, this.corporate_id_arr ) , 1);
        // this.exportAllCompany = false;
        // this.allCompanySelected = false;
      }
      if( this.exportAllCompany == true ){
        this.overallTotalCompanies = opt == true ? this.overallTotalCompanies + 1 : this.overallTotalCompanies - 1;
      }
      if( this.corporate_id_arr.length == this.corporate_pagination.total ){
        this.exportAllCompany = true;
        this.allCompanySelected = true;
      }
    },
    goToCompanyDetails(data) {
      // console.log( data );
      this.$router.push({
        name: "CorporateMenu",
        params: {
          customer_id: data.corporate.customer_id,
          company_name: data.corporate.company_name
				}
			});
      // localStorage.company_email = data.corporate.contact.email;
    },
    submitSearch(){
      this.export_data_header.map( ( value, index ) => {
        value.isSelected = index > 6 ? false : true;
      });
      this.exportAllCompany = false;
      this.allCompanySelected = false;
      this.page_active = 1;
      this.overallTotalCompanies = 0;
      this.getCompanyList();
    },
    closeAllModalsDrop() {
      // console.log('click outside.');
      // this.isPageLimitDropShow = false;
      // this.isFilterModalShow = false;
      // this.isExportModalShow = false;
    },
    refreshData() {
      this.filterData = {
        start: null,
        end: null
      };
      this.exportAllCompany = false;
      this.allCompanySelected = false;
      this.search_text = "";
      this.searchPropertiesText = "";
      this.corporate_id_arr = [];
      this.export_data_header.map( ( value, index ) => {
        value.isSelected = index > 6 ? false : true;
      });
      this.page_active = 1;
      this.page_limit = 10;

      this.getCompanyList();
    },
    selectAllCompany(){
      this.exportAllCompany = true;
      this.corporate_list_arr.map(value => {
        value.selected = true;
      });
    },
    clearAllCompany(){
      this.exportAllCompany = false;
      this.corporate_id_arr = [];
      this.allCompanySelected = false;
      this.corporate_list_arr.map((value) => {
        value.selected = false;
      });
    },
    removeExportKey(index) {
      this.export_data_header[index].isSelected = false;
      this.$forceUpdate();
    },
    searchCompanyChanged(data) {
      if (data == "") {
        // this.getCompanyList();
      }
		},
		submitDateFilter(){
      this.exportAllCompany = false;
      this.allCompanySelected = false;
      this.search_text = '';
      this.searchPropertiesText = '';
      this.corporate_id_arr = [];

      this.page_active = 1;
      this.page_limit = 10;
      this.overallTotalCompanies = 0;
      this.getCompanyList();
		},
		exportData(){
			var params = '';
			var params_header = '';
			this.export_data_keys.map((value, key) => {
				if( this.export_data_header[ key ].isSelected == true ){
					params += ( "dataIndex[]=" + value + "&" );
					params_header += ( "column_header[]=" + this.export_data_header[ key ].name + '&' );
				}
				if( key == this.export_data_keys.length - 1 ){
					if( this.corporate_id_arr.length > 0 ){
						this.corporate_id_arr.map((value2, key2) => {
              params += ( "ids[]=" + value2 + "&" );
							if( key2 == this.corporate_id_arr.length - 1 ){
								this.exportCompanyCSV( params, params_header );
							}
						});
					}else{
						this.exportCompanyCSV( params, params_header );
					}
				}
			});
    },
    dateChanged( val ){
      console.log( val );
      console.log( this.filterData.start );
      this.filterData.start = val.date;
    },
		exportCompanyCSV( params, params_header ){
			let download_type = ['by_all'];
			let params_download_type = '';
			if( this.corporate_id_arr.length > 0 ){
				download_type = ['by_id'];
			}
			if( this.filterData.start != null && this.filterData.end != null ){
				download_type.push( 'by_date' );
				params += ("start=" + moment( this.filterData.start ).format('YYYY-MM-DD') + "&end=" + moment( this.filterData.end ).format('YYYY-MM-DD') + '&');
			}
			download_type.map((value, key) => {
				params_download_type += ('&download_type[]=' + value);
			});
			// if( this.exportAllCompany == true || ( this.corporate_id_arr.length == this.corporate_pagination.total ) ){
			// 	download_type = 'by_all';
			// }
			console.log( axios.defaults.serverUrl + '/company/corporate?isGetCSV=true' + params_download_type + '&token=' + localStorage.getItem('vue_admin_session') + '&' + params + params_header );
			window.open( axios.defaults.serverUrl + '/company/corporate?isGetCSV=true' + params_download_type + '&token=' + localStorage.getItem('vue_admin_session') + '&' + params + params_header );
		},
		getCompanyList(){
			this.showLoading();
			this.isFilterModalShow = false;
			var url = axios.defaults.serverUrl + '/company/corporate?page=' + this.page_active + '&limit=' + this.page_limit;
			if( this.filterData.start != null && this.filterData.end != null ){
				url += "&start=" + moment( this.filterData.start ).format('YYYY-MM-DD') + "&end=" + moment( this.filterData.end ).format('YYYY-MM-DD');
			}
			if( this.search_text != null && this.search_text != '' ){
				url += '&search=' + this.search_text;
			}
			// console.log( url );
			axios.get( url )
			.then(res => {
				console.log( res );
				this.corporate_list_arr = res.data.data;
        this.corporate_pagination = res.data;
        this.overallTotalCompanies = this.overallTotalCompanies == 0 ? this.corporate_pagination.total : this.overallTotalCompanies;
				// console.log(this.corporate_list_arr);
				// console.log(this.corporate_pagination);
        console.log( this.exportAllCompany );
				this.corporate_list_arr.map(value => {
          if( this.exportAllCompany == true ){
            value.selected = true;
          }else{
            value.selected = $.inArray( value.corporate.customer_id, this.corporate_id_arr ) > -1 ? true : false;
          }

          if( $.inArray( value.corporate.customer_id, this.corporate_id_arr ) > -1 ){
            this.allCompanySelected = true;
          }
				});

				// this.filterData = {
				// 	start: null,
				// 	end: null,
				// };
				this.hideLoading();
			})
			.catch(err => {
        this.hideLoading();
        this.errorHandler( err );
			});
		}
	}
}

export default corporates;
</script>
	<style lang="scss" scoped>
@import "./src/assets/css/corporates.scss";
@import "./src/assets/css/corporate-list.scss";
</style>


