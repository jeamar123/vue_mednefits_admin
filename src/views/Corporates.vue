<template>
	<div class="corporates-container">
		<div class="header-corporate-list">
			<div class="page-title">
				<h3>List of Corporate Clients</h3>
			</div>
      <div class="xxs-show right-icon-header ">
        <div v-on:click="exportModal()">
          <img :src="'../assets/img/download_emp.png'">
        </div>
        <router-link tag="div" to="/dashboard/corporates/add">
          <img :src="'../assets/img/plus_add.png'">
        </router-link>
        <div v-on:click="refreshData()">
          <img :src="'../assets/img/refresh.png'">
        </div>
      </div>
			<div class="search-container">
        <form class="search-input-wrapper" v-on:submit.prevent="getCompanyList()">
          <i class="fa fa-search"></i>
          <input type="text" placeholder="Search" v-model="search_text" v-on:input="searchCompanyChanged( search_text )">
        </form>
        <div>
          <button v-on:click="addFilterModal()" ><i class="fa fa-plus"></i>Add filter</button>
        </div>
      </div>

      <div class="xxs-hide right-icon-header">
        <div v-on:click="exportModal()">
          <img :src="'../assets/img/download_emp.png'">
        </div>
        <router-link tag="div" to="/dashboard/corporates/add">
          <img :src="'../assets/img/plus_add.png'">
        </router-link>
        <div v-on:click="refreshData()">
          <img :src="'../assets/img/refresh.png'">
        </div>
      </div>
		</div>

		<div class="corporate-tbl-list-wrapper">
      <div class="corporate-tbl-list-container">
        <table>
          <thead>
            <tr v-if="allCompanySelected == false && corporate_id_arr.length == 0">
              <th>
                <div class="corporate-list-checkbox-container">
                  <label class="checkbox-input">
                  <input v-on:change="allCompanyCheckBox( allCompanySelected )" v-model="allCompanySelected" value="true" type="checkbox">
                  <span class="checkbox-mark"></span>
                  </label>
                </div>
              </th>
              <th>Company ID</th>
              <th>Company Name</th>
              <th>Expiry Date</th>
              <th>HR Account Status</th>
              <th>Total Employee Seats</th>
              <th>Total Dependent Seats</th>
              <th>Total Medical Credits</th>
              <th>Account/Plan Type</th>
            </tr>

            <tr v-if="allCompanySelected == true || corporate_id_arr.length > 0">
              <th>
                <div class="corporate-list-checkbox-container">
                  <label class="checkbox-input">
                  <input v-on:change="allCompanyCheckBox( allCompanySelected )" v-model="allCompanySelected" value="true" type="checkbox">
                  <span class="checkbox-mark"></span>
                  </label>
                </div>
              </th>
              <th class="selected-companies">
                <span>
                  <span></span>
                  <span>{{ exportAllCompany == true ? overallTotalCompanies : corporate_id_arr.length }}</span>
                   selected
                </span>
              </th>
              <th>
                <span v-on:click="exportModal()" class="export-text">
                  <img :src="'assets/img/download_emp.png'" /> 
                  <span>Export</span>
                </span>
              </th>
              <th colspan="6"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="allCompanySelected == true" class="selected-companies-container">
              <td colspan="9">
                <span>All 
                  <span>{{ exportAllCompany == true ? overallTotalCompanies : corporate_id_arr.length }}</span>
                   companies are selected. 
                  <span v-if="!exportAllCompany" v-on:click="selectAllCompany()" class="select-btn-text">Select all {{ corporate_pagination.total }} companies.</span>
                  <span v-if="exportAllCompany" v-on:click="clearAllCompany()" class="select-btn-text">Clear selection.</span>
                </span>
              </td>
            </tr>
            <tr v-for="(list, index) of corporate_list_arr" :key="index">
              <td>
                <div class="corporate-list-checkbox-container">
                  <label class="checkbox-input">
                    <input type="checkbox" v-model="list.selected" v-on:change.self="companyCheckBox( list, list.selected )" value="true">
                    <span class="checkbox-mark"></span>
                  </label>
                </div>
              </td>
              <td v-on:click="goToCompanyDetails( list )">
                <span>{{ list.corporate.customer_id }}</span>
              </td>
              <td v-on:click="goToCompanyDetails( list )">
                <span>{{ list.corporate.company_name }}</span>
              </td>
              <td v-on:click="goToCompanyDetails( list )">
                <span>{{ formatDate( list.expiry_date, 'YYYY-MM-DD' ,'DD/MM/YYYY' ) }}</span>
              </td>
              <td v-on:click="goToCompanyDetails( list )">
                <span>{{ list.hr.active == 1 ? 'Active' : 'Deactivated' }}</span>
              </td>
              <td v-on:click="goToCompanyDetails( list )">
                <span>{{ list.total_employee_seat }}</span>
              </td>
              <td v-on:click="goToCompanyDetails( list )">
                <span>{{ list.total_dependent_seat }}</span>
              </td>
              <td v-on:click="goToCompanyDetails( list )">
                <span>{{ list.total_medical_credits | number('0,0.00') }}</span>
              </td>
              <td v-on:click="goToCompanyDetails( list )">
                <span>{{ list.account_type }}</span>
                <!-- <span v-show="list.employees.account_type == 'stand_alone_plan'">Pro Plan</span>
                <span v-show="list.employees.account_type == 'insurance_bundle'">Insurance Bundle</span>
                <span v-show="list.employees.account_type == 'trial_plan'">Trial Plan</span>
                <span v-show="list.employees.account_type == 'lite_plan'">Lite Plan</span>
                <span v-show="list.employees.account_type == 'super_pro_plan'">Super Pro Plan</span>
                <span v-show="list.employees.account_type == 'enterprise_plan'">Enterprise Plan</span> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-show="corporate_pagination.last_page > 0" class="custom-pagination-container">
      <div class="custom-pagination">
        <div class="page-wrapper">
          <div class="page-scroll-container">
            <span class="prev-next-container" v-on:click="prevPage()">  
              <i class="fa fa-angle-left"></i> 
              <span>Prev</span>
            </span>
            <div class="pages-list">
              <span class="page-num" v-show="page_active > 6" v-on:click="goToPage( 1 )">1</span>
              <span v-show="page_active > 6" style="margin-left: -10px;">...</span>

              <span v-for="(list, index) of limitPagination" class="page-num" v-bind:class="{'active' : list + 1 == page_active}" v-on:click="goToPage( list + 1 )">{{ list + 1 }}</span>
              
              <span v-show="corporate_pagination.last_page > 10 && page_active < ( corporate_pagination.last_page - 5 )" style="margin-right: -5px;">...</span>
              <span class="page-num" v-show="corporate_pagination.last_page > 10 && page_active < ( corporate_pagination.last_page - 5 )" v-on:click="goToPage( corporate_pagination.last_page )">{{ corporate_pagination.last_page }}</span>
            </div>
            <span class="prev-next-container" v-on:click="nextPage()">  
              <span>Next</span>
              <i class="fa fa-angle-right"></i> 
            </span>
          </div>
        </div>
        <div class="custom-list-per-page">
          <span v-on:click="togglePageLimitDrop()"><span>{{ page_limit }}</span> per page</span>
          <span v-on:click="togglePageLimitDrop()">  
            <i class="fa fa-caret-down"></i>
          </span>
          <div class="opened-per-page-scroll" v-if="isPageLimitDropShow">
            <span v-on:click="setPageLimit( 10 )">10 per page</span>
            <span v-on:click="setPageLimit( 25)">25 per page</span>
            <span v-on:click="setPageLimit( 50 )">50 per page</span>
            <span v-on:click="setPageLimit( 100 )">100 per page</span>
          </div>
        </div>
      </div>
    </div>

  <div v-click-outside="closeAllModalsDrop">
    <!-- Add Filter -->
    <Modal v-if="isFilterModalShow" class="add-filter-wrapper" >
      <div slot="header">
        <h3>Period of expiry</h3>
        <img v-on:click="addFilterModal()" class="cancel-icon" :src="'../assets/img/cancel.png'"></i>
      </div>
      <div slot="body" class="edit-employee-info-container">
        <div>
          <div class="expiry-input-wrapper">
            <label>From</label>
            <div class="date-container">
              <v-date-picker
                popoverDirection="bottom"
                v-model="filterData.start"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                popover-visibility="focus"
                :formats="formats"
              ></v-date-picker>
              <img class="calendar-icon" :src="'../assets/img/calendar-gray.png'"></i>
            </div>
          </div>
          <div class="expiry-input-wrapper">
            <label>to</label>
            <div class="date-container">
              <v-date-picker
                popoverDirection="bottom"
                v-model="filterData.end"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                popover-visibility="focus"
                :formats="formats"
              ></v-date-picker>
              <img class="calendar-icon" :src="'../assets/img/calendar-gray.png'"></i>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn-primary" v-on:click="submitDateFilter()">Apply Filter</button>
      </div>
    </Modal>

    <!-- Export Modal -->
    <Modal v-if="isExportModalShow" class="export-modal-wrapper">
      <div slot="header">
        <h3 class="sm:bg-green">Choose which columns you see</h3>
        <img v-on:click="exportModal()" class="cancel-icon" :src="'../assets/img/close.svg'">
      </div>
      <div slot="body">
        <div class="dl-corp-content-wrapper">
          <div class="properties-container">
            <div class="properties-search-container">
              <input type="text" placeholder="Search properties..." v-model="searchPropertiesText">
              <i class="fa fa-search"></i>
            </div>
            <div class="properties-title">Properties</div>
            <div v-for="( list, index ) in searchedExportProperties" :key="index" class="column-check-box">
              <div class="corporate-list-checkbox-container">
                <label class="checkbox-input">
                  <span class="checkbox-label">{{ list.name }}</span>
                  <input type="checkbox" v-model="list.isSelected" value="true">
                  <span class="checkbox-mark"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="selected-columns-container">
            <div class="data-column-header-title">SELECTED COLUMNS<span>({{ countSelectedProperties }})</span></div>
            <div v-show="list.isSelected" class="selected-col-box-container" v-for=" (list, index) in export_data_header" :key="index">
              <span>{{ list.name }}</span>
              <i class="fa fa-times" v-on:click="removeExportKey( index )"></i>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn-primary" v-on:click="exportData()">Download</button>
      </div>
    </Modal>
  </div>

  </div>
</template>

<script>
	import corporates from '@/components/corporates'
	export default corporates
</script>
