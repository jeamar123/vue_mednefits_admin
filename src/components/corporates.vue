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
        isExportModalShow : false,
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
      closeAllModals(){
      	// if( this.isFilterModalShow == true ){
      	// 	this.isFilterModalShow = false;
      	// }
      	// if( this.isExportModalShow == true ){
      	// 	this.isExportModalShow = false;
      	// }
      },
      addFilterModal(){
      	this.isFilterModalShow = this.isFilterModalShow == false ? true : false;
      },
      exportModal(){
      	this.isExportModalShow = this.isExportModalShow == false ? true : false;
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


		/* Small (sm) */
		@media (max-width: 640px) { 

		}
		/* Medium (md) */
		@media (max-width: 768px) { 

		}
		/* Mobile max */
		@media (max-width: 992px) { 
			.header-corporate-list {
				.search-input-wrapper input{
					width: 200px;
				}
			}
		}
		/* Large (lg) */
		@media (max-width: 1024px) { 
			.header-corporate-list {
				.search-container{
					flex: 1;
				}
			}
		}
		/* Extra Large (xl) */
		@media (max-width: 1260px) { 
			.header-corporate-list {
				.page-title{
					width: 220px;
				}
				.search-container{
					flex: 1;
				}
				.right-icon-header{
			    width: 90px;
				}
			}
		}



	</style>


