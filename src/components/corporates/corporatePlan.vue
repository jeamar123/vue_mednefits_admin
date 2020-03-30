<script>
  import Modal from "../../views/modal/Modal.vue";
  import axios from 'axios';
  import moment ,{ locale } from "moment";
  import { 
    _getActivePlans_,
    _createDependentAccount_,
    _getSpendingSetttingsData_,
    _uploadCreditAllocation_,
    _fetchViewPlanData_,
    _fetchEmployeeList_,
    _searchEmployeeList_,
    _updateDependentPlan_,
    _showPageLoading_,
    _hidePageLoading_,
    _updateDependentRecordPayment_,
    _formChecker_,
    _updateEmployeePlan_,
    _updateEmployeeRecordPayment_,
    _updateAccountPlanType_,
    _updateDependentRecordRefund_,
    _createPlanExtension_,
    _activatePlanExtension_,
    _downloadPDFInvoice_,
    _updateEmpRefundRecordPayment_,
    _updateSpendingDeposit_,
    _planExtensionRecordPayment_,
    _spendingDepositRecordPayment_,
    _updateEditPlanExtension_,
  } from '../../common/functions/common_functions';
   
  let corporatePlan = {
    components: {
      Modal
    },
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        planSelectorActive: {
          value: 0,
          text: ""
        },
        accountPlanTypeModal : false,
        global_isViewPlanModalShow: false,
        global_recordPayment: {},
        global_isRecordPaymentShow: false,
        // corporateViewStatus : 'CorporateDetails',
        formats: {
          input: ["DD/MM/YYYY"],
          data: ["DD/MM/YYYY"]
        },
        global_isCreateDependentModalShow: false,
        global_isSpendingAccountModalShow: false,
        global_isCreditAllocationModalShow: false,
        global_creditAllocationDeposit: 0,
        global_isPendingEnrollmentModalShow: false,
        // global_isRecordFundModalShow: false,
        global_isEditDepositModalShow: false,
        global_isEditPlanModalShow: false,
        global_isEditPlanDependetModalShow: false,
        global_editPlan: {
          payment_status: false,
          
        },
        global_getPlans: {
          current_plan: {
            plan_start: undefined,
          },
          old_plans: {}
        },
        global_oldPlanStartDate: undefined,
        global_addDependentData: {
          start_date: undefined,
          total_dependents: 0,
          account_type: undefined,
          secondary_account_type: undefined,
          is_paid: 0,
          individual_price: 0,
        },
        global_getSpendingData: {
          spending_account: false,
          medical_spending_start_date: new Date(),
          medical_spending_end_date: new Date(),
          wellness_spending_start_date: new Date(),
          wellness_spending_end_date: new Date(),
        },
        global_customerPlanData: {},
        global_creditAllocationData: {
          credit_amount: 0,
        },
        global_creditSpendingType: 'medical',
        global_creditAllocationType: 'add',
        global_spendingDeposit: {
          medical_deposit: 0,
          wellness_deposit: 0,
        },
        global_customerActivePlansOld: {},
        global_viewPlanData: {
          employee_plan: {},
          dependent_plans: [],
          spending_deposits: [],
          employee_refunds: [],
          dependent_refunds: [],
        },
        global_activePlanEnrolled: {},
        global_activePlanPagination: {},
        global_pageActive: 1,
        global_pageLimit: 10,
        global_searchEmp: undefined, 
        searchActive: false,
        global_isEmployeeRecordPayment: false,
        global_isDependentRecordPayment: false,
        global_isEmployeeRefundRecordPayment: false,
        global_selectPlanType: { },
        global_isCreatePlanExtensionShow: false,
        global_editDepositData: {
          invoice_date: new Date(),
          invoice_due: new Date(),
        },
        global_isPlanExtensionRecordPayment: false,
        global_isSpendingDepositRecordPayment: false,
        global_isEditPlanExtensionModalShow: false,
        global_isDependentRefundRecordPayment: false,
        global_createPlanExtensionDate: {},
      };
    },
    created(){
      // this.corporateViewStatus = this.$route.name;
      this._fecthPlanList_();
    },
    methods: {
      showPlanActive(value,text) {
        this.planSelectorActive.value = value;
        this.planSelectorActive.text = text;
      },
      showAccountPlanType(list) {
        this.accountPlanTypeModal = this.accountPlanTypeModal == false ? true : false;
        this.global_currentCustomerPlanId = list.customer_active_plan_id;
      },
      toggleClosePlanModal()  {
        this.global_isViewPlanModalShow = false;
        this.global_isCreateDependentModalShow = false;
        this.global_isSpendingAccountModalShow = false;
        this.global_isCreditAllocationModalShow = false;
        this.global_isPendingEnrollmentModalShow = false;
        this.global_isEditDepositModalShow = false;
        this.global_isCreatePlanExtensionShow = false;
        this.global_pageActive = 1;

        // this.global_addDependentData = {};
      },
      toggleRecordPayment(type, data)  {
        this.global_recordPayment = {};
        this.global_isRecordPaymentShow = this.global_isRecordPaymentShow == false ? true : false;
        this.global_editPlan = data;
        this.global_isEmployeeRecordPayment = false;
        this.global_isDependentRecordPayment = false;
        this.global_isEmployeeRefundRecordPayment = false;
        this.global_isPlanExtensionRecordPayment = false;
        this.global_isSpendingDepositRecordPayment = false;
        this.global_isDependentRefundRecordPayment = false;
        if(type == 'dependent'){
          this.global_isDependentRecordPayment = true;
        }
        if(type == 'employee'){
          this.global_isEmployeeRecordPayment = true;
        }
        if(type == 'employee_refund'){
          this.global_isEmployeeRefundRecordPayment = true;
          // console.log(data);
        }
        if (type == 'spending_deposit') {
          this.global_isSpendingDepositRecordPayment = true;
          // console.log(data);
          this.global_spendingAccountData = data;
          console.log(this.global_spendingAccountData);
        }
        if (type == 'plan_extension') {
          this.global_isPlanExtensionRecordPayment = true;
          this.global_planExtensionData = data.plan_extension;
        }
        if(type == 'dependent_refund'){
          this.global_isDependentRefundRecordPayment = true;
        }
      },
      _downloadInvoice_(data, type, account_type, index) {
        console.log(data);
        /*----- Invoice Plan/Account type -------*/
        /*----- 1 = Employee Account ------------*/
        /*----- 2 = Dependent Account -----------*/   
        /*----- 3 = Spending Deposit Account ----*/   
        /*----- 4 = Employee Refund -------------*/   
        /*----- 5 = Dependent Refund ------------*/   
        /*----- 6 = Plan Extension --------------*/
        /*---------------------------------------*/
        
        // if( type == 'receipt' ){
        //   window.open( window.location.origin + '/#/dashboard/download-receipt/' + this.customer_id  );
        // }else{
        //   window.open( window.location.origin + '/#/dashboard/download-pdf/' + this.customer_id + '/' + this.global_customerActiveId + '/' + account_type + '/' + index );
        // }

        _downloadPDFInvoice_(data, account_type);
      },
      _showCorporatePlanModal_( opt,list ) {
        console.log(opt);
        if ( opt == 'create-dependent-account' ) {
          this.global_isCreateDependentModalShow = this.global_isCreateDependentModalShow == false ? true : false;
        }
        if ( opt == 'spending-account-settings' ) {
          this.global_isSpendingAccountModalShow = this.global_isSpendingAccountModalShow == false ? true : false;
          this._fetchSpendingData_();
        }
        if ( opt == 'credit-allocation' ) {
          this.global_isCreditAllocationModalShow = this.global_isCreditAllocationModalShow == false ? true : false;
          this.global_creditAllocationData = {};
          this.global_creditAllocationData.amount = 0;
          this.global_creditAllocationData.deposit = 0;
          // console.log(list);
          this.global_customerPlanData = list;
        }
        if ( opt == 'view-plan' || opt == 'edit-close' ) { 
          this.global_isViewPlanModalShow = this.global_isViewPlanModalShow == false ? true : false;
          // this.global_isRecordFundModalShow = false;
          this.global_isEditDepositModalShow = false;
          this.global_isEditPlanModalShow = false;
          this.global_isEditPlanDependetModalShow = false;
          this.global_isEditPlanExtensionModalShow = false;
          this.global_isDependentRecordPayment = false;
          this.global_customerActiveId = list.customer_active_plan_id;
          // console.log(this.global_customerActiveId);

          //declaring a global_customerActivePlanData variable for back button in edit plan
          this.global_customerActivePlanData = list;
          if(opt == 'view-plan'){
            this._getViewPlanData_();
          }
        }
        if ( opt == 'create-plan-extension' ) {
          this.global_customerPlanData = list;
          console.log(list);
          this.global_createPlanExtensionDate.invoice_date = new Date(this.global_customerPlanData.plan_start);
          this.global_isCreatePlanExtensionShow = this.global_isCreatePlanExtensionShow == false ? true : false;;
        }
      },
      ___medicalSelector( opt ) {
        if ( opt == true ) {
          this.global_getSpendingData.medical_enable = true;
        } else {
          this.global_getSpendingData.medical_enable = false;
        }
      },
      ___wellnessSelector( opt ) {
        if ( opt == true ) {
          this.global_getSpendingData.wellness_enable = true;
        } else {
          this.global_getSpendingData.wellness_enable = false;
        }
      },
      _showViewPlanModal_( type, data ) {
        this.global_isViewPlanModalShow = false;

        if ( type == 'pending-enrollment' ) {
          this.global_isPendingEnrollmentModalShow = true;
          this._getEmployeeList_();
        }
        // if ( type == 'record-refund' ) {
        //   this.global_isRecordFundModalShow = true;
        // }
        if ( type == 'edit-deposit' ) {
          this.global_isEditDepositModalShow = true;
          // console.log(data);
          this.global_editDepositData = data;
          console.log(this.global_editDepositData);
          this.global_editDepositData.invoice_date = new Date(this.global_editDepositData.invoice_date);
          this.global_editDepositData.invoice_due = new Date(this.global_editDepositData.invoice_due);
          console.log(this.global_editDepositData);
        }
        if ( type == 'edit-plan-employee' ) {
          this.global_isEditPlanModalShow = true;
          this.global_editPlan = data;
          this.global_editPlan.plan_start = new Date(this.global_editPlan.plan_start);
          this.global_editPlan.invoice_date = new Date(this.global_editPlan.invoice_date);
          this.global_editPlan.invoice_due_date = new Date(this.global_editPlan.invoice_due_date);
          console.log('employee');
        }
        if ( type == 'edit-plan-dependent' ) {
          this.global_isEditPlanDependetModalShow = true;
          this.global_editPlan = data;
          this.global_editPlan.plan_start = new Date(this.global_editPlan.plan_start);
          console.log('dependent');
        }
        if ( type == 'edit-plan-extension' ) {
          this.global_isEditPlanExtensionModalShow = true;
          this.global_editPlan = data.plan_extension;
          console.log(this.global_editPlan);
          this.global_editPlan.plan_start = new Date(this.global_editPlan.plan_start);
          this.global_editPlan.invoice_date = new Date(this.global_editPlan.invoice_date);
          this.global_editPlan.invoice_due_date = new Date(this.global_editPlan.invoice_due_date);
          console.log(this.global_editPlan.duration);
          console.log('extension');
        }
      },
      _setAccountType_(account_type)  {
        if (account_type == "trial_plan") {
          this.global_editPlan.payment_status = true;
          this.global_editPlan.secondary_account_type = "pro_trial_plan_bundle";
          this.global_createPlanExtensionDate.payment_status = true;
          this.global_createPlanExtensionDate.secondary_account_type = "pro_trial_plan_bundle";
        } else {
          this.global_editPlan.payment_status = false;
        }
        if (account_type == "insurance_bundle") {
          this.global_editPlan.secondary_account_type = 'pro_plan_bundle';
          this.global_editPlan.payment_status = true;
          this.global_createPlanExtensionDate.secondary_account_type = 'pro_plan_bundle';
          this.global_createPlanExtensionDate.payment_status = true;
        } else {
          this.global_editPlan.payment_status = false;
          this.global_createPlanExtensionDate.payment_status = false;
        }
        if (account_type == "stand_alone_plan") {
          this.global_editPlan.secondary_account_type = "default_price";
          this.global_editPlan.price_per_employee = 99;
          this.global_createPlanExtensionDate.secondary_account_type = "default_price";
          this.global_createPlanExtensionDate.price_per_employee = 99;
        } 
        if (account_type == "lite_plan") {
          this.global_editPlan.secondary_account_type = "fixed_price";
          this.global_editPlan.price_per_employee = 5;
          this.global_editPlan.payment_status = false;
          this.global_createPlanExtensionDate.secondary_account_type = "fixed_price";
          this.global_createPlanExtensionDate.price_per_employee = 5;
          this.global_createPlanExtensionDate.payment_status = false;
        }
        if (account_type == "enterprise_plan") {
          this.global_editPlan.payment_status = false;
          this.global_editPlan.secondary_account_type = "fixed_price";
          this.global_editPlan.price_per_employee = 100;
          this.global_createPlanExtensionDate.payment_status = false;
          this.global_createPlanExtensionDate.secondary_account_type = "fixed_price";
          this.global_createPlanExtensionDate.price_per_employee = 100;
        }
        this.$forceUpdate();
      },
      _setSecondaryAccountType_(account_type)  {
        this.$forceUpdate();
      },
      _fecthPlanList_(index) {
        let params = {
          customer_id :	Number(this.customer_id),
        };
        this.$parent.showLoading();
        _getActivePlans_(params)
					.then(( res ) => {
            console.log(res);
            this.$parent.hideLoading();
            this.global_getPlans = res.data.data;
            this.global_customerActivePlansOld = this.global_getPlans.old_plans;
            this.global_getPlans.current_plan.plan_start = moment(this.global_getPlans.current_plan.plan_start).format("DD MMMM, YYYY");

            this.global_currentCustomerActive = this.global_getPlans.current_plan.customer_active_plans;
            for (let i = 0;i < this.global_currentCustomerActive.length; i++) {
              console.log(this.global_currentCustomerActive[i]);
              this.global_currentCustomerActive[i].plan_extension.plan_start = moment(this.global_currentCustomerActive[i].plan_extension.plan_start).format('YYYY-MM-DD');
            }

					});
      },
      _dependentActiveButton_( opt ) {
        this.global_addDependentData.is_paid = opt;
      },
      _submitDependentAccount_() {
        let params = {
          customer_id :	Number(this.customer_id),
          total_dependents: this.global_addDependentData.total_dependents,
          plan_start: moment(this.global_addDependentData.start_date).format('YYYY-MM-DD'),
          account_type: this.global_addDependentData.account_type,
          secondary_account_type: this.global_addDependentData.secondary_account_type,
          isPaid: this.global_addDependentData.is_paid,
          individual_price: this.global_addDependentData.individual_price,
        };
        _createDependentAccount_(params)
					.then(( res ) => {
            console.log(res);
            if( res.status == 200 || res.status == 201 ){ 
              this.$swal("Success!", res.data.message, "success");
              this._resetAddDependents_();
              this.global_isCreateDependentModalShow = false;
            }
					});
      },
      _resetAddDependents_() {
        this.global_addDependentData = {
          is_paid: 0,
          total_dependents: 0,
          individual_price: 0,
          account_type: '',
          secondary_account_type: '',
        }
      },
      _spendingAccountWallet_( opt ) {
        console.log(opt);

        if ( opt === 'false' ) {
          this.global_getSpendingData.spending_account = (this.global_getSpendingData.spending_account === false);
          console.log(this.global_getSpendingData.spending_account);
          this.global_getSpendingData.medical_enable = false;
          this.global_getSpendingData.wellness_enable = false;
        }
      },
      _fetchSpendingData_() {
        let params = {
          customer_id :	Number(this.customer_id),
        };
        this.$parent.showLoading();
        _getSpendingSetttingsData_(params)
					.then(( res ) => {
            // console.log(res);
            if( res.status == 200 || res.status == 201 ){
              this.$parent.hideLoading(); 
              this.global_getSpendingData = res.data.data;
              console.log(this.global_getSpendingData);

              this.global_getSpendingData.medical_spending_start_date = new Date(moment(this.global_getSpendingData.medical_spending_start_date));
              this.global_getSpendingData.medical_spending_end_date = new Date(moment(this.global_getSpendingData.medical_spending_end_date));
              this.global_getSpendingData.wellness_spending_start_date = new Date(moment(this.global_getSpendingData.wellness_spending_start_date));
              this.global_getSpendingData.wellness_spending_end_date = new Date(moment(this.global_getSpendingData.wellness_spending_end_date));
              
            }
					});
      },
      _selectCreditAllocationSpending_( opt ) {
        this.global_creditSpendingType = opt;
      },
      _selectCreditAllocationType_( opt ) {
        this.global_creditAllocationType = opt;
      },
      _updateCreditAllocation_() {
        let params = {
          customer_id: this.customer_id,
          spending_type: this.global_creditSpendingType,
          allocation_type: this.global_creditAllocationType,
          credits: this.global_creditAllocationData.credit_amount,
          customer_active_plan_id: this.global_customerPlanData.customer_plan_id,
          medical_deposit: this.global_spendingDeposit.medical_deposit,
          wellness_deposit: this.global_spendingDeposit.wellness_deposit,
        }
        _uploadCreditAllocation_(params)
					.then(( res ) => {
            // console.log(res);
            if( res.status == 200 || res.status == 201 ){
              this.$swal("Success!", res.data.message, "success");
              this._fecthPlanList_();
              this.global_isCreditAllocationModalShow = false;
              this.global_spendingDeposit = {
                medical_deposit: 0,
                wellness_deposit: 0,
              }
            }
					});
      },
      _getViewPlanData_() {
        let params = {
          customer_active_plan_id: this.global_customerActiveId,
        }
        _showPageLoading_();
        _fetchViewPlanData_(params)
					.then(( res ) => {
            // console.log(res);
            if( res.status == 200 || res.status == 201 ){
              this.global_viewPlanData = res.data.data;
              console.log(this.global_viewPlanData);
              // console.log(this.global_viewPlanData.employee_refunds);

              this.global_viewPlanData.employee_refunds.map((value, index) => {
                // console.log(value);
                value.date_refund = moment(value.date_refund).format(
                  "YYYY-MM-DD"
                );
              }); 
              
            }
            _hidePageLoading_();
					});
      },
      _getEmployeeList_() {
        let params = {
          customer_id: this.customer_id,
          page: this.global_pageActive,
          limit: this.global_pageLimit,
          customer_active_plan_id: this.global_customerActiveId,
        }
        _showPageLoading_();
        _fetchEmployeeList_(params)
          .then(( res ) => {
            console.log(res);
            if( res.status == 200 || res.status == 201 ){
              this.global_activePlanEnrolled = res.data.data;
              this.global_activePlanPagination = res.data;

              this.global_activePlanEnrolled.map((value, index) => {
                value.start_date = moment(value.start_date).format(
                  "DD MMMM, YYYY"
                );
                value.expiry_date = moment(value.expiry_date).format(
                  "DD MMMM, YYYY"
                );
              });
               this.searchActive = false;  
              _hidePageLoading_();
            }
          });
      },
      _prevPage_() {
        if (this.global_activePlanPagination.hasPrevPage) {
          this.global_pageActive = this.global_activePlanPagination.prevPage;
          this._getEmployeeList_();
        }
      },
      _nextPage_() {
        if (this.global_activePlanPagination.hasNextPage) {
          this.global_pageActive = this.global_activePlanPagination.nextPage;
          this._getEmployeeList_();
        }
      },
      _searchMemberList_( item ) {
        let params	=	{ 
          customer_id :	this.customer_id,
          search: item 
        };
        _showPageLoading_();
        _searchEmployeeList_(params)
					.then(( res ) => {
						if( res.status == 200 || res.status == 201 ){
              this.global_activePlanEnrolled = res.data.data;
              // console.log(this.global_activePlanEnrolled);
              this.searchActive = true;
              _hidePageLoading_();
						}
					});
      },
      _searchEmpty_( data ) {
        if (data == "") {
          this._getEmployeeList_();
        }
      },
      _updatePlan_(){
        let request = null;
        if(this.global_isEditPlanModalShow){
          let params  = {
            customer_id: Number(this.customer_id),
            customer_active_plan_id: this.global_editPlan.customer_active_plan_id,
            active_plan_invoice_id: this.global_editPlan.customer_active_plan_id,
            employees: Number(this.global_editPlan.employees),
            plan_start: this.global_editPlan.plan_start ? moment( this.global_editPlan.plan_start ).format('YYYY-MM-DD') : null,
            invoice_due_date: this.global_editPlan.invoice_due_date ? moment( this.global_editPlan.invoice_due_date ).format('YYYY-MM-DD') : null,
            invoice_date: this.global_editPlan.invoice_date ? moment( this.global_editPlan.invoice_date ).format('YYYY-MM-DD') : null,
            individual_price: this.global_editPlan.individual_price,
            account_type: this.global_editPlan.account_type,
            isPaid: this.global_editPlan.paid,
            override_total_amount_status: this.global_editPlan.override_total_amount_status,
            override_total_amount: this.global_editPlan.override_total_amount,
            spending_default_invoice_day: this.global_editPlan.spending_default_invoice_day,
          }
          if(_formChecker_(params) == false){
            return false;
          }
          request = _updateEmployeePlan_(params);
          console.log(params);
        }
        if(this.global_isEditPlanDependetModalShow){
          let params  = {
            customer_id: Number(this.customer_id),
            dependent_plan_id: this.global_editPlan.dependent_plan_id,
            dependent_invoice_id: this.global_editPlan.dependent_invoice_id,
            total_dependents: Number(this.global_editPlan.total_dependents),
            plan_start: this.global_editPlan.plan_start ? moment( this.global_editPlan.plan_start ).format('YYYY-MM-DD') : null,
            individual_price: this.global_editPlan.individual_price,
            duration: this.global_editPlan.duration,
            account_type: this.global_editPlan.account_type,
            isPaid: this.global_editPlan.paid
          }
          if(_formChecker_(params) == false){
            return false;
          }
          request = _updateDependentPlan_(params);
          console.log(params);
        }

        if(this.global_isEditPlanExtensionModalShow) {
          let params  = {
            customer_id: Number(this.customer_id),
            customer_active_plan_id: this.global_editPlan.customer_active_plan_id,
            active_plan_extensions_id: this.global_editPlan.active_plan_extensions_id,
            employees: Number(this.global_editPlan.employees),
            plan_start: this.global_editPlan.plan_start ? moment( this.global_editPlan.plan_start ).format('YYYY-MM-DD') : null,
            invoice_due: this.global_editPlan.invoice_due ? moment( this.global_editPlan.invoice_due ).format('YYYY-MM-DD') : null,
            invoice_date: this.global_editPlan.invoice_date ? moment( this.global_editPlan.invoice_date ).format('YYYY-MM-DD') : null,
            individual_price: this.global_editPlan.individual_price,
            account_type: this.global_editPlan.account_type,
            isPaid: this.global_editPlan.paid,
            // override_total_amount_status: this.global_editPlan.override_total_amount_status,
            // override_total_amount: this.global_editPlan.override_total_amount,
            spending_default_invoice_day: this.global_editPlan.spending_default_invoice_day,
          }
          if(_formChecker_(params) == false){
            return false;
          }
          request = _updateEditPlanExtension_(params);
          console.log(params);
        }
        
        _showPageLoading_();
        request.then((res)  =>  {
          console.log(res);
          if(res.status == 200 || res.status == 201){
            this._showCorporatePlanModal_('view-plan',this.global_customerActivePlanData);
            this.$swal('Success!', res.data.message, 'success');
          }else{
            _hidePageLoading_();
            this.$swal('Error!', res.data.message, 'error');
          }
        });
      },
      _updateRecordPayments_(){
        let request = null;
       
        if(this.global_isEmployeeRecordPayment){  // if Dependent Record Payment
          let params  = {
            customer_id: Number(this.customer_id),
            active_plan_invoice_id: this.global_editPlan.active_plan_invoice_id,
            paid_amount: Number(this.global_recordPayment.paid_amount),
            transaction_date: this.global_recordPayment.transaction_date ? moment(this.global_recordPayment.transaction_date).format('YYYY-MM-DD') : null,
            remarks: this.global_recordPayment.remarks,
          }
          if(_formChecker_(params) == false){
            return false;
          }
          request = _updateEmployeeRecordPayment_(params);
        }
        if(this.global_isDependentRecordPayment){  // if Dependent Record Payment
          let params  = {
            dependent_plan_id: this.global_editPlan.dependent_plan_id,
            dependent_invoice_id: this.global_editPlan.dependent_invoice_id,
            paid_amount: Number(this.global_recordPayment.paid_amount),
            transaction_date: this.global_recordPayment.transaction_date ? moment(this.global_recordPayment.transaction_date).format('YYYY-MM-DD') : null,
            remarks: this.global_recordPayment.remarks,
          }
          if(_formChecker_(params) == false){
            return false;
          }
          request = _updateDependentRecordPayment_(params);
        }

        if(this.global_isEmployeeRefundRecordPayment){  // if Employee Refund Record Payment
          let params = {
            customer_employee_plan_payment_refund_id: this.global_editPlan.customer_employee_plan_payment_refund_id,
            customer_active_plan_id: this.global_editPlan.customer_active_plan_id,
            refund_amount: Number(this.global_recordPayment.paid_amount),
            refund_date: this.global_recordPayment.transaction_date ? moment(this.global_recordPayment.transaction_date).format('YYYY-MM-DD') : null,
            remarks: this.global_recordPayment.remarks
          }
          if(_formChecker_(params) == false){
            return false;
          }
          request = _updateEmpRefundRecordPayment_(params);
        }
        
        if(this.global_isDependentRefundRecordPayment){  // if Employee Refund Record Payment
          let params  = {
            dependent_plan_id: this.global_editPlan.dependent_plan_id,
            dependent_payment_refund_id: this.global_editPlan.dependent_payment_refund_id,
            paid_amount: Number(this.global_recordPayment.paid_amount),
            transaction_date: this.global_recordPayment.transaction_date ? moment(this.global_recordPayment.transaction_date).format('YYYY-MM-DD') : null,
            remarks: this.global_recordPayment.remarks
          }
          if(_formChecker_(params) == false){
            return false;
          }
          request = _updateDependentRecordRefund_(params);
        }

        if (this.global_isSpendingDepositRecordPayment) { // if Spending Deposit Record Payment
          let params = {
            customer_spending_invoice_id: this.global_spendingAccountData.customer_spending_deposit_credit_id,
            customer_id: this.customer_id,
            paid_amount: Number(this.global_recordPayment.paid_amount),
            paid_date: this.global_recordPayment.transaction_date ? moment(this.global_recordPayment.transaction_date).format('YYYY-MM-DD') : null,
            payment_remarks: this.global_recordPayment.remarks
          }
          if(_formChecker_(params) == false){
            return false;
          }
          request = _spendingDepositRecordPayment_(params);
        }

        if (this.global_isPlanExtensionRecordPayment) { // if Plan Extension Record Payment
          let params = {
            paid_amount: Number(this.global_recordPayment.paid_amount),
            transaction_date: this.global_recordPayment.transaction_date ? moment(this.global_recordPayment.transaction_date).format('YYYY-MM-DD') : null,
            customer_id: Number(this.customer_id),
            active_plan_extensions_id: this.global_planExtensionData.active_plan_extensions_id,
          }
          if(_formChecker_(params) == false){
            return false;
          }
          request = _planExtensionRecordPayment_(params);
        }

        if(request){
          _showPageLoading_();
          request.then((res)  =>  {
            console.log(res);
            if(res.status == 200 || res.status == 201){
              this._getViewPlanData_();
              this.toggleRecordPayment();
              this.$swal('Success!', res.data.message, 'success');
            }else{
              _hidePageLoading_();
              this.$swal('Error!', res.data.message, 'error');
            }
          });
        }
      },
      _selectPlanType_() {
        let params = {
          customer_id: this.customer_id,
          customer_active_plan_id: this.global_currentCustomerPlanId,
          account_type: this.global_selectPlanType.account_type,
          secondary_account_type: this.global_selectPlanType.secondary_account_type,
        }
        _updateAccountPlanType_(params) 
        .then(( res ) => {
          console.log(res);
          if( res.status == 200 || res.status == 201 ){
            this.$swal("Success!", res.data.message, "success");
            this.accountPlanTypeModal = false;
            this._fecthPlanList_();
          }
        });
      },
      _submitSpendingDeposit_() {
        let params = {
          customer_active_plan_id: this.global_editDepositData.customer_active_plan_id,
          company_id: this.customer_id,
          medical_credits: this.global_editDepositData.medical_credits,
          wellness_credits: this.global_editDepositData.wellness_credits,
          medical_percent: this.global_editDepositData.medical_percent,
          wellness_percent: this.global_editDepositData.wellness_percent,
          invoice_date: moment(this.global_editDepositData.invoice_date).format('YYYY-MM-DD'),
          invoice_due: moment(this.global_editDepositData.invoice_due).format('YYYY-MM-DD'),
        };
        _updateSpendingDeposit_(params)
					.then(( res ) => {
            console.log(res);
            if( res.status == 200 || res.status == 201 ){ 
              this.$swal("Success!", res.data.message, "success");
              this.global_isEditDepositModalShow = false;
            }
					});
      },
      _addPlanExtension_(){
        console.log(this.global_createPlanExtensionDate);
        let params  = {
          customer_id: Number( this.customer_id ),
          customer_active_plan_id: this.global_customerPlanData.customer_active_plan_id,
          account_type: this.global_createPlanExtensionDate.account_type,
          secondary_account_type: this.global_createPlanExtensionDate.secondary_account_type,
          plan_start: moment( this.global_createPlanExtensionDate.plan_start ).format('YYYY-MM-DD'),
          invoice_date: moment( this.global_createPlanExtensionDate.invoice_date ).format('YYYY-MM-DD'),
          duration: this.global_createPlanExtensionDate.duration,
          payment_status: this.global_createPlanExtensionDate.payment_status
        }
        if(_formChecker_(params) == false){
          return false;
        }
        _showPageLoading_();
        _createPlanExtension_(params)
        .then((res)  =>  {
          console.log(res);
          _hidePageLoading_();
          if(res.status == 200 || res.status == 201){
            this._fecthPlanList_();
            this.global_isCreatePlanExtensionShow = false;
            this.$swal('Success!', res.data.message, 'success');
          }else{
            this.$swal('Error!', res.data.message, 'error');
          }
        });
      },
      _formatDate_(date, from, to){
        return moment(date, from).format(to);
      },
      _activateExtension_(active_plan_extensions_id){
        this.$swal({
          title: 'Confirm',
          text: "Are you sure you want to activate Plan Extension?",
          type: 'warning',
          confirmButtonColor: 'rgb(37, 48, 108)',
          cancelButtonColor: '#C1C1C1',
          showCancelButton: true,
        }).then((result) => {
          if(result.value){
            let params  = {
              active_plan_extensions_id : active_plan_extensions_id
            }
            _activatePlanExtension_(params)
              .then((res)  =>  {
                if(res.status == 200 || res.status == 201){
                  this._fecthPlanList_();
                  this.$swal('Success!', res.data.message, 'success');
                }else{
                  _hidePageLoading_();
                  this.$swal('Error!', res.data.message, 'error');
                }
              });
          }
        })
      },
    }
  }
  
  export default corporatePlan
</script>

<style lang="scss">
  @import "./src/assets/css/planDetails.scss";
  
  .end-date-container {
    .popover-origin.direction-bottom.align-left {
      right: 0;
      left: inherit;
    }
    .popover-origin .popover-content-wrapper .popover-content.align-left:after {
      left: 145px
    }
  }

  .edit-deposit-modal .date-container {
    .popover-origin.direction-bottom.align-left {
      right: 0;
      left: inherit;
    }
  }

  @media (max-width: 600px) {
    .edit-plan-modal .date-container {
      .popover-origin.direction-bottom.align-left {
        left: -35px;
      }
    }
    .edit-plan-modal {
      .popover-origin .popover-content-wrapper .popover-content.align-left:after {
        left: 50px;
      }
    }  
  }
  
  @media (max-width: 320px) { 
    .record-refund-modal .date-container {
      .popover-origin.direction-bottom.align-left {
        right: 0;
        left: inherit;
      }
    }
    .edit-deposit-modal {
      .popover-origin .popover-content-wrapper .popover-content.align-left:after {
        left: 50px;
      }
    }
  }
</style>
