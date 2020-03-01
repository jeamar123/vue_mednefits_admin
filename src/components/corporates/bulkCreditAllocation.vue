<script>
  import { 
    _fetchEmployeeList_,
    _searchEmployeeList_ 
  } from '../../common/functions/common_functions';
  
  let bulkCreditAllocation = {
    props: {
      customer_id: [String, Number],
      company_name: [String, Number],
    },
    data() {
      return {
        employee_list: {},
        global_employeeListPagination: {}, 
        global_showCreditDp:  false,
        global_searchEmp: undefined,
        global_pageActive: 1,
        global_pageLimit: 5, 
      };
    },
    created(){
      this._getMemberList_();
    },
    methods: {
      ___selectedCreditPerPage() {
        this.global_showCreditDp  = this.global_showCreditDp  ==  false ? true : false;
      },
      ___hideAllDrop( e ) {
        if ($(e.target).parents(".per-page-container").length === 0) {
          this.global_showCreditDp  = false;
          console.log('click sa gawas');
        }
      },
      ___selectCreditAllocationSpending( opt,index ) {
          this.employee_list[index].global_creditSpendingType = opt;
          this.$forceUpdate();  
      },
      ___selectCreditAllocationType( opt,index ) {
          this.employee_list[index].global_creditAllocationType = opt;
          this.$forceUpdate();
      },
      _getMemberList_() {
        let params	=	{ 
          customer_id :	this.customer_id,
          page : this.global_pageActive,
          limit : this.global_pageLimit
        };
        this.$parent.showLoading();
        _fetchEmployeeList_(params)
					.then(( res ) => {
            console.log(res);
						if( res.status == 200 || res.status == 201 ){
              this.$parent.hideLoading();
              this.employee_list = res.data.data;
              this.global_employeeListPagination = res.data;
              this.employee_list.map((value,index) => {
                value.global_creditSpendingType = 0;
                value.global_creditAllocationType = 0;
              });
              
              console.log(this.employee_list);
						}
					});
      },
      _searchMemberList_( item ) {
        let params	=	{ 
          customer_id :	this.customer_id,
          search: item 
        };
        this.$parent.showLoading();
        _searchEmployeeList_(params)
					.then(( res ) => {
						if( res.status == 200 || res.status == 201 ){
              this.$parent.hideLoading();
              this.employee_list = res.data.data;

              this.employee_list.map((value,index) => {
                value.global_creditSpendingType = 0;
                value.global_creditAllocationType = 0;
              });
              
              console.log(this.employee_list);
						}
					});
      },
      _searchEmpty_( data ) {
        // console.log(data);
        if (data == "") {
          this._getMemberList_();
        }
      },
      ___setPageLimit( limit ) {
        this.global_pageLimit = limit;
        this.global_pageActive = 1;
        this.global_showCreditDp = false;
        this._getMemberList_();
      },
      ___prevPage() {
        if (this.global_employeeListPagination.hasPrevPage) {
          this.global_pageActive = this.global_employeeListPagination.prevPage;
          this._getMemberList_();
        }
      },
      ___nextPage() {
        if (this.global_employeeListPagination.hasNextPage) {
          this.global_pageActive = this.global_employeeListPagination.nextPage;
          this._getMemberList_();
        }
      },
    }
  }
  
  export default bulkCreditAllocation
</script>

<style lang="scss" scoped>
	// @import "./src/assets/css/corporateSettings.scss";
</style>