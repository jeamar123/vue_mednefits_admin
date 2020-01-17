<template>
	<div class="corporates-container">
		<div class="header-corporate-list">
			<div class="page-title">
				<h3>List of Corporate Clients</h3>
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
          <input type="text" placeholder="Search">
        </form>
        <div>
          <button><i class="fa fa-plus"></i>Add filter</button>
        </div>
      </div>

      <div class="right-icon-header">
        <div>
          <img :src="'../assets/img/download_emp.png'">
        </div>
        <div>
          <img :src="'../assets/img/plus_add.png'">
        </div>
        <div>
          <img :src="'../assets/img/refresh.png'">
        </div>
      </div>
		</div>

		<div class="corporate-tbl-list-wrapper">
      <div class="corporate-tbl-list-container">
        <table>
          <thead>
            <tr>
              <th>
                <div class="corporate-list-checkbox-container">
                  <label class="checkbox-input">
                  <input v-on:click="selectAllCorporatesList( allCorporatesSelected )" v-model="allCorporatesSelected" value="true" type="checkbox">
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
              <!-- <th></th> -->
            </tr>
          </thead>
          <thead ng-if="corporate_id_arr.length > 0">
            <tr>
              <th>
                <div class="corporate-list-checkbox-container">
                  <label class="checkbox-input">
                  <input ng-model="allCorporatesSelected" value="true" type="checkbox">
                  <span class="checkbox-mark"></span>
                  </label>
                </div>
              </th>
              <th>
                <span>
                  <span></span>
                  <span>1</span>
                   selected
                </span>
              </th>
              <th>
                <span class="export-text">
                  <img :src="'assets/img/download_emp.png'" /> 
                  <span>Export</span>
                </span>
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="allCorporatesSelected == true" class="selected-companies-container">
              <td colspan="9">
                <span>All 
                  <span>12</span>
                  <span>15</span>
                   companies are selected. 
                  <span class="select-btn-text">Select all 95 companies.</span>
                  <span class="select-btn-text">Clear selection.</span>
                </span>
              </td>
            </tr>
            <tr v-for="list in corporate_list_arr">
              <td>
                <div class="corporate-list-checkbox-container">
                  <label class="checkbox-input">
                  <input type="checkbox">
                  <span class="checkbox-mark"></span>
                  </label>
                </div>
              </td>
              <td> {{ list.corporate_id }}</td>
              <td>{{ list.company_name }}</td>
              <td>
                <span>{{ list.expiry_date }}</span>
              </td>
              <td>
                <span>{{ list.active }}</span>
                <!-- <span>Deactivated</span> -->
              </td>
              <td>
                <span>{{ list.total_employee_seat }}</span>
              </td>
              <td>
                <span>{{ list.total_dependent_seat }}</span>
              </td>
              <td>
                <span>{{ list.total_medical_credits }}</span>
              </td>
              <td>
                <span>{{ list.account_type }}</span>
                <!-- <span>Insurance Bundle</span>
                <span>Trial Plan</span>
                <span>Lite Plan</span>
                <span>Super Pro Plan</span>
                <span>Enterprise Plan</span> -->
              </td>
              
            </tr>
          </tbody>
        </table>
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

		<div class="pagination-container">
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
		</div>
  </div>
</template>

<script>
	import corporates from '@/components/corporates'
	export default corporates
</script>
