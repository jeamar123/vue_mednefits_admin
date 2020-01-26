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
        <div>
          <img :src="'../assets/img/refresh.png'">
        </div>
      </div>
			<!-- <div class="page-options">
				<div class="btn-page-options data-transfer-upload">
					<span class="oi" data-glyph="data-transfer-upload" aria-hidden="true"></span>
				</div>
				<div class="btn-page-options" v-on:click="showSearch()">
					<span class="oi" data-glyph="magnifying-glass" aria-hidden="true"></span>
				</div>
				<router-link tag="div" class="btn-page-options" to="/dashboard/corporates/add">
					<span class="oi" data-glyph="plus" aria-hidden="true"></span>
				</router-link>
				<div class="btn-page-options">
					<span class="oi" data-glyph="reload" aria-hidden="true"></span>
				</div>
			</div> -->
			<div class="search-container">
        <form class="search-input-wrapper">
          <i class="fa fa-search"></i>
          <input type="text" placeholder="Search" v-model="search_text">
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
            <tr v-if="allCompanySelected == false">
              <th>
                <div class="corporate-list-checkbox-container">
                  <label class="checkbox-input">
                  <input v-on:click="allCompanyCheckBox( allCompanySelected )" v-model="allCompanySelected" value="true" type="checkbox">
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

            <tr v-if="allCompanySelected == true">
              <th>
                <div class="corporate-list-checkbox-container">
                  <label class="checkbox-input">
                  <input v-on:click="allCompanyCheckBox( allCompanySelected )" v-model="allCompanySelected" value="true" type="checkbox">
                  <span class="checkbox-mark"></span>
                  </label>
                </div>
              </th>
              <th class="selected-companies">
                <span>
                  <span></span>
                  <span>1</span>
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
                  <span>12</span>
                  <span v-if="false">15</span>
                   companies are selected. 
                  <span class="select-btn-text">Select all 12 companies.</span>
                  <span v-if="false" class="select-btn-text">Clear selection.</span>
                </span>
              </td>
            </tr>
            <tr v-for="list of corporate_list_arr">
              <td>
                <div class="corporate-list-checkbox-container">
                  <label class="checkbox-input">
                    <input type="checkbox" v-model="list.selected" v-on:click.self="companyCheckBox( list, list.selected )" value="true">
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
                <span>{{ list.expiry_date }}</span>
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
                <span>{{ list.total_medical_credits }}</span>
              </td>
              <td v-on:click="goToCompanyDetails( list )">
                <span v-show="list.employees.account_type == 'stand_alone_plan'">Pro Plan</span>
                <span v-show="list.employees.account_type == 'insurance_bundle'">Insurance Bundle</span>
                <span v-show="list.employees.account_type == 'trial_plan'">Trial Plan</span>
                <span v-show="list.employees.account_type == 'lite_plan'">Lite Plan</span>
                <span v-show="list.employees.account_type == 'super_pro_plan'">Super Pro Plan</span>
                <span v-show="list.employees.account_type == 'enterprise_plan'">Enterprise Plan</span>
                <!-- <span>Trial Plan</span>
                <span>Lite Plan</span>
                <span>Super Pro Plan</span>
                <span>Enterprise Plan</span> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="corporate-pagination">
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
      <div class="corporate-list-per-page">
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

		<!-- <div class="tbl-wrapper">
			<table class="table">
				<thead>
					<tr>
						<th>Options</th>
						<th>Company ID</th>
						<th>Email Address</th>
						<th>Company Name</th>
						<th>HR Account Status</th>
						<th>Employee Plan</th>
						<th>Enrolled Employees</th>
						<th>Employees to be Enroll</th>
						<th>Account/Plan Type</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="list in [1,2,3,4,5]">
						<td>
							<router-link tag="button" class="table-btn" :to="{ name: 'CorporateMenu' }">
								<span class="oi" data-glyph="cog" aria-hidden="true"></span>
							</router-link>
						</td>
						<td>Lorem Ipsum</td>
						<td>Lorem Ipsum</td>
						<td>Lorem Ipsum</td>
						<td>Lorem Ipsum</td>
						<td>Lorem Ipsum</td>
						<td>Lorem Ipsum</td>
						<td>Lorem Ipsum</td>
						<td>Lorem Ipsum</td>
					</tr>
				</tbody>
			</table>
		</div> -->

		<!-- <div class="pagination-container">
			<div class="pagination-wrapper">
				<div class="page">
					<span class="page-text">Page:</span>
					<div class="page-select">
						<span class="page-value">1</span> <span class="oi" data-glyph="caret-bottom" aria-hidden="true"></span>
						<div class="drop-pagi">
							<div class="drop-list" v-for="list in [1,2,3,4,5,6]">1</div>
						</div>
					</div>
				</div>
				
				<div class="row">
					<span class="row-text">Rows per page:</span>
					<div class="row-select">
						<span class="row-value">5</span> <span class="oi" data-glyph="caret-bottom" aria-hidden="true"></span>
						<div class="drop-pagi">
							<div class="drop-list" v-for="list in [1,2,3,4,5,6]">1</div>
						</div>
					</div>
				</div>

				<div class="page-count">
					<span>1</span> - <span>2</span> of <span>5</span>
				</div>

				<div class="page-arrows">
					<div class="arrows">
						<span class="oi" data-glyph="caret-left" aria-hidden="true"></span>
					</div>
					<div class="arrows">
						<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
					</div>
				</div>
			</div>
		</div> -->


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
              ></v-date-picker>
              <img class="calendar-icon" :src="'../assets/img/calendar-gray.png'"></i>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn-primary" v-on:click="getCompanyList()">Apply Filter</button>
      </div>
    </Modal>

    <!-- Export Modal -->
    <Modal v-if="isExportModalShow" class="export-modal-wrapper">
      <div slot="header">
        <h3 class="sm:bg-green">Choose which columns you see</h3>
        <img v-on:click="exportModal()" class="cancel-icon" :src="'../assets/img/close.svg'"></i>
      </div>
      <div slot="body">
        <div class="dl-corp-content-wrapper">
          <div class="properties-container">
            <div class="properties-search-container">
              <input type="text" placeholder="Search properties..." v-model="searchPropertiesText">
              <i class="fa fa-search"></i>
            </div>
            <div class="properties-title">Properties</div>
            <div v-for="( list, index ) in searchedExportProperties" class="column-check-box">
              <div class="corporate-list-checkbox-container">
                <label class="checkbox-input">
                  <span class="checkbox-label">{{ list }}</span>
                  <input type="checkbox" v-model="export_data_key_index[index]" value="true">
                  <span class="checkbox-mark"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="selected-columns-container">
            <div class="data-column-header-title">SELECTED COLUMNS<span>(1)</span></div>
            <div v-show="export_data_key_index[ index ] == true" class="selected-col-box-container" v-for=" (list, index) in export_data_header">
              <span>{{ list }}</span>
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
