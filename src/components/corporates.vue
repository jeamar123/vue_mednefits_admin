<script>
	import axios from 'axios';
	import Modal from "../views/modal/Modal.vue";

	var corporates = {
		components: {
      Modal
    },
		data() {
			return {
				startDateDetails: {
          startDate: undefined,
        },
        endDateDetails: {
        	endDate: undefined,
        },
        isFilterModalShow : false,
				user_id : null,
				isSearchShow : false,
				allCorporatesSelected : false,
				corporate_id_arr : [],
				corporate_list_arr : [ 
				{ 
					corporate_id : 1,
					company_name : 'StackGeckos',
					expiry_date : '31/03/2020',
					active : 'active',
					total_employee_seat : 110,
					total_dependent_seat : 42,
					total_medical_credits : 100,
					account_type : 'Pro Plan',
				},
				{ 
					corporate_id : 2,
					company_name : 'Mednefits',
					expiry_date : '31/03/2020',
					active : 'active',
					total_employee_seat : 110,
					total_dependent_seat : 42,
					total_medical_credits : 100,
					account_type : 'Pro Plan',
				},  


				],
			}
		},
		created() {
		},
		methods: {
      showSearch(){
      	this.isSearchShow = true;
      },
      hideSearch(){
      	this.isSearchShow = false;
      },
      addFilterModal() {
      	this.isFilterModalShow = this.isFilterModalShow == false ? true : false;
      },
      selectAllCorporatesList( opt ) {
      	this.allCorporatesSelected = opt;
      	console.log(this.allCorporatesSelected);
      	console.log(this.corporate_list_arr);     	
      },
    }
	}



	export default corporates;
	</script>
	<style lang="scss" scoped>
		@import "./src/assets/css/corporates.scss";
	</style>