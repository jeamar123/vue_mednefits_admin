<template>
	<div class="health-partner-access-wrapper">
		<!-- <button @click="selectCorporatesView( 'CorporateMenu' )" class="btn-primary">BACK</button> -->
		<div>
			<a v-on:click="goBack()" class="close-btn"><span class="oi" data-glyph="x" aria-hidden="true"></span></a>
			<h2 class="corporate-text txt-transform-capitalize">{{ type }}</h2>
		</div>
		<div class="health-partner-access-container">
			<!-- <div class="health-partner-tab">
				<div class="tab">
					Blocked
				</div>
				<div class="tab">
					Opened
				</div>
			</div> -->

			<div class="health-partner-access-blocked">
				<div v-if="!isBlockSearchShow" class="blocked-opened-header">
					<h3>Health Partner Access - BLOCKED</h3>
					<i class="fa fa-search" v-on:click="toggleSearch('block', true)"></i>
				</div>

				<div v-if="isBlockSearchShow" class="health-partner-search">
					<i class="fa fa-search left"></i>
					<form v-on:submit.prevent="getClinicList()" class="wpc-100">
						<input type="text" placeholder="Search for partner access" v-model="block_clinic_search">
					</form>
					<i class="fa fa-times right" v-on:click="toggleSearch('block', false)"></i>
				</div>

				<div class="clinic-name-header" >
          <label class="health-checkbox-container"> 
            <span>Blocked Access</span>
            <input type="checkbox">
            <span class="health-checkmark"></span>
          </label>	
          <div class="select-filter-div">
	        	<select v-model="block_clinic_region" v-on:change="regionChange('block')">
	        		<option value="all">All Region</option>
							<option value="sgd">Singapore - SGD</option>
	        		<option value="myr">Malaysia - MYR</option>
	        	</select>
	        </div>
          <div class="select-filter-div">
	        	<select v-model="block_clinic_opt">
	        		<option value="type">Clinic Type</option>
	        		<option value="name">Clinic Name</option>
	        	</select>
	        </div>
          <button class="btn-primary">
          	<div class="xs-hide">OPEN</div>
          	<div class="xs-show"><i class="fa fa-check"></i></div>
          </button>  
        </div>

        <div class="clinic-name-wrapper">
        	<div v-for="list in block_clinic_list" class="clinic-name-container">
	        	<label class="health-checkbox-container"> 
	            <span>{{ list.clinic_name }}</span>
	            <input type="checkbox" v-model="list.selected">
	            <span class="health-checkmark"></span>
	          </label>
	          <div class="country">{{ list.currency_type == 'sgd' ? 'Singapore' : 'Malaysia' }}</div>
          </div>
        </div>

        <div class="pagination-container">
					<div class="pagination-wrapper">
						<div class="page">
							<span class="page-text">Page:</span>
							<div class="page-select">
								<span class="page-value">1</span>
								<span data-glyph="caret-bottom" aria-hidden="true" class="oi"></span>
								<div class="drop-pagi">
									<div class="drop-list">1</div>
									<div class="drop-list">1</div>
									<div class="drop-list">1</div>
									<div class="drop-list">1</div>
								</div>
							</div>
						</div>
						<div class="row">
							<span class="row-text">Rows per page:</span>
							<div class="row-select">
								<span class="row-value">5</span>
								<span data-glyph="caret-bottom" aria-hidden="true" class="oi"></span>
								<div class="drop-pagi">
									<div class="drop-list">1</div>
									<div class="drop-list">1</div>
									<div class="drop-list">1</div>
									<div class="drop-list">1</div>
								</div>
							</div>
						</div>
						<div class="page-count">
							<span>1</span> - <span>2</span> of <span>5</span>
						</div>
						<div class="page-arrows">
							<div class="arrows">
								<span data-glyph="caret-left" aria-hidden="true" class="oi"></span>
							</div>
							<div class="arrows">
								<span data-glyph="caret-right" aria-hidden="true" class="oi"></span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="sort-container">
				<img :src="'../assets/img/sort.png'">
			</div>

			<div class="health-partner-access-opened">
				<div v-if="!isOpenSearchShow" class="blocked-opened-header">
					<h3>Health Partner Access - OPENED</h3>
					<i class="fa fa-search" v-on:click="toggleSearch('open', true)"></i>
				</div>

				<div v-if="isOpenSearchShow" class="health-partner-search">
					<i class="fa fa-search left"></i>
					<form v-on:submit.prevent="getClinicList()" class="wpc-100">
						<input type="text" placeholder="Search for partner access" v-model="open_clinic_search">
					</form>
					<i class="fa fa-times right" v-on:click="toggleSearch('open', false)"></i>
				</div>

				<div class="clinic-name-header">
          <label class="health-checkbox-container"> 
            <span>Opened Access</span>
            <input type="checkbox">
            <span class="health-checkmark"></span>
          </label>	
          <div class="select-filter-div">
	        	<select v-model="open_clinic_region" v-on:change="regionChange('open')">
	        		<option value="all">All Region</option>
							<option value="sgd">Singapore - SGD</option>
	        		<option value="myr">Malaysia - MYR</option>
	        	</select>
	        </div>
          <div class="select-filter-div">
	        	<select v-model="open_clinic_opt">
	        		<option value="type">Clinic Type</option>
	        		<option value="name">Clinic Name</option>
	        	</select>
	        </div>
          <button class="btn-primary">
          	<div class="xs-hide">BLOCK</div>
          	<div class="xs-show"><i class="fa fa-check"></i></div>
          </button>  
        </div>
        <div class="clinic-name-wrapper">
					<div v-for="list in open_clinic_list" class="clinic-name-container">
	        	<label class="health-checkbox-container"> 
	            <span>{{ list.clinic_name }}</span>
	            <input type="checkbox" v-model="list.selected">
	            <span class="health-checkmark"></span>
	          </label>
						<div class="country">{{ list.currency_type == 'sgd' ? 'Singapore' : 'Malaysia' }}</div>
	        </div>
				</div>
				<div class="pagination-container">
					<div class="pagination-wrapper">
						<div class="page">
							<span class="page-text">Page:</span>
							<div v-on:click="togglePageDrop( 0, true )" class="page-select">
								<span class="page-value">{{ open_active_page }}</span>
								<span data-glyph="caret-bottom" aria-hidden="true" class="oi"></span>
								<div v-show="isPageDropShow[0]" class="drop-pagi">
									<div class="drop-list" v-for="list in range( open_pagination.table_open_last_page )">{{ list }}</div>
								</div>
							</div>
						</div>
						<div class="row">
							<span class="row-text">Rows per page:</span>
							<div class="row-select">
								<span class="row-value">{{ open_page_limit }}</span>
								<span data-glyph="caret-bottom" aria-hidden="true" class="oi"></span>
								<div class="drop-pagi">
									<div class="drop-list" v-on:click="openSetPerPage(10)">10</div>
									<div class="drop-list" v-on:click="openSetPerPage(20)">20</div>
									<div class="drop-list" v-on:click="openSetPerPage(30)">30</div>
									<div class="drop-list" v-on:click="openSetPerPage(40)">40</div>
									<div class="drop-list" v-on:click="openSetPerPage(50)">50</div>
									<div class="drop-list" v-on:click="openSetPerPage(100)">100</div>
								</div>
							</div>
						</div>
						<div class="page-count">
							<span>{{ open_pagination.from }}</span> - <span>{{ open_pagination.to }}</span> of <span>{{ open_pagination.table_open_total }}</span>
						</div>
						<div class="page-arrows">
							<div class="arrows" v-on:click="openPrevPage()">
								<span data-glyph="caret-left" aria-hidden="true" class="oi"></span>
							</div>
							<div class="arrows" v-on:click="openNextPage()">
								<span data-glyph="caret-right" aria-hidden="true" class="oi"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import healthPartnerAccess from '@/components/corporates/healthPartnerAccess.vue'
	export default healthPartnerAccess
</script>