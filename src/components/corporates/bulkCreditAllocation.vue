<script>
  import { 
		_fetchEmployeeList_ 
  } from '../../common/functions/common_functions';
  
  let bulkCreditAllocation = {
    props: {
      customer_id: [String, Number],
      company_name: [String, Number],
    },
    data() {
      return {
        // empSelectorActive: {
        //   value: 0,
        //   text: ""
        // },
        employee_list: {},
        global_showCreditDp:  false,
        global_creditSpendingType: 0,
        global_creditAllocationType: 0,
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
      ___selectCreditAllocationSpending( opt ) {
        this.global_creditSpendingType = opt;
      },
      ___selectCreditAllocationType( opt ) {
        this.global_creditAllocationType = opt;
      },
      _getMemberList_() {
        let params	=	{ 
          customer_id :	this.customer_id 
        };
        _fetchEmployeeList_(params)
					.then(( res ) => {
            // console.log( res );
            this.employee_list = res.data.data;

            // this.employee_list.map((value,index) => {
            //   console.log(value);
            // });
            console.log(this.employee_list);
						if( res.status == 200 || res.status == 201 ){
							
						}
					});
      }
    }
  }
  
  export default bulkCreditAllocation
</script>

<style lang="scss" scoped>
	// @import "./src/assets/css/corporateSettings.scss";
</style>