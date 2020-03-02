<script>
  import { 
    _fetchEmployeeList_,
    _searchEmployeeList_,
    _updateBulkCredit_
  } from '../../common/functions/common_functions';
  
  let bulkCreditAllocation = {
    props: {
      customer_id: [String, Number],
      member_id: [String, Number],
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
        list: {
          credit_amount: 0,
        }
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
                value.global_creditSpendingType = 'medical';
                value.global_creditAllocationType = 'add';
                value.credit_amount = 0;
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
                value.global_creditSpendingType = 'medical';
                value.global_creditAllocationType = 'add';
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
      ___updateCreditAllocation( list, index ) {
        console.log(list);
        if ( list.credit_amount || list.credit_amount > 0 ) {
          console.log('sulod');
          this.$swal({
          title: "",
          text: "Are you sure you want to update credits this account?",
          type: "warning",
          confirmButtonColor: "#25306C",
          cancelButtonColor: "#C1C1C1",
          showCancelButton: true,
          showCloseButton: false,
          confirmButtonText: "Yes, Update it!",
          reverseButtons: true,
          }).then(result => {
            if (result) {
              console.log(result);
              let params	=	{ 
                customer_id :	Number(this.customer_id),
                member_id: list.member_id,
                spending_type: list.global_creditSpendingType,
                allocation_type: list.global_creditAllocationType,
                credits: Number(list.credit_amount), 
              };
              console.log( params );
              _updateBulkCredit_(params)
              .then(( res ) => {
                if( res.status == 200 || res.status == 201 ){      
                  this.$swal("Success!", res.data.message, "success");
                  
                  list.credit_amount = 0;
                  this._getMemberList_();
                  console.log(list);
                }
              });
            } 
          });
        } else {
          this.$swal( "Error!", "Please assign credits", "error" );
        }
      },
    }
  }
  
  export default bulkCreditAllocation
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/bulkCreditAllocation.scss";
</style>