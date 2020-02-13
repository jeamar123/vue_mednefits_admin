<template>
	<div class="health-partner-access-wrapper">
		<!-- <button @click="selectCorporatesView( 'CorporateMenu' )" class="btn-primary">BACK</button> -->
		<div>
			<a v-on:click="goBack()" class="close-btn"><span class="oi" data-glyph="x" aria-hidden="true"></span></a>
			<h2 class="corporate-text txt-transform-capitalize">{{ type }}</h2>
		</div>
		<div class="health-partner-access-container">

			<div class="health-partner-access-blocked">
				<div v-if="!isBlockSearchShow" class="blocked-opened-header">
					<h3>Health Partner Access - BLOCKED</h3>
					<i v-if="block_clinic_opt == 'name'" class="fa fa-search" v-on:click="toggleSearch('block', true)"></i>
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
	        		<option value="0">All Region</option>
							<option value="sgd">Singapore - SGD</option>
	        		<option value="myr">Malaysia - MYR</option>
	        	</select>
	        </div>
          <div class="select-filter-div">
	        	<select v-model="block_clinic_opt" v-on:change="typeChange( )">
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
        	<div v-if="block_clinic_opt == 'name'" v-for="list in block_clinic_list" class="clinic-name-container">
	        	<label class="health-checkbox-container"> 
	            <span>{{ list.clinic_name }}</span>
	            <input type="checkbox" v-model="list.selected">
	            <span class="health-checkmark"></span>
	          </label>
	          <div class="country">{{ list.currency_type == 'sgd' ? 'Singapore' : 'Malaysia' }}</div>
          </div>
					<div v-if="block_clinic_opt == 'type'" v-for="list in clinic_type_list" class="clinic-name-container">
	        	<label class="health-checkbox-container"> 
	            <span>{{ list.name }}</span>
	            <input type="checkbox" v-model="list.selected">
	            <span class="health-checkmark"></span>
	          </label>
						<div v-if="list.currency_type" class="country">{{ list.currency_type == 'sgd' ? 'Singapore' : 'Malaysia' }}</div>
	        </div>
        </div>

        <div class="pagination-container">
					<div v-if="Object.keys(block_clinic_list).length > 0" class="pagination-wrapper">
						<div class="page">
							<span class="page-text">Page:</span>
							<div v-click-outside="hideAllDrop" class="page-select">
								<span v-on:click="togglePageDrop( 1, true )"> 
									<span class="page-value">{{ block_active_page }}</span>
									<span data-glyph="caret-bottom" aria-hidden="true" class="oi"></span>
								</span>
								<div v-show="isPageDropShow[1]" class="drop-pagi">
									<div class="drop-list" v-for="list in range( block_pagination.table_block_last_page )" v-on:click="blockGoToPage( list )">{{ list }}</div>
								</div>
							</div>
						</div>
						<div class="row">
							<span class="row-text">Rows per page:</span>
							<div v-click-outside="hideAllDrop" class="row-select">
								<span v-on:click="toggleLimitDrop( 1, true )">
									<span class="row-value">{{ block_page_limit }}</span>
									<span data-glyph="caret-bottom" aria-hidden="true" class="oi"></span>
								</span>
								<div v-show="isLimitDropShow[1]" class="drop-pagi">
									<div class="drop-list" v-on:click="blockSetPerPage(10)">10</div>
									<div class="drop-list" v-on:click="blockSetPerPage(20)">20</div>
									<div class="drop-list" v-on:click="blockSetPerPage(30)">30</div>
									<div class="drop-list" v-on:click="blockSetPerPage(40)">40</div>
									<div class="drop-list" v-on:click="blockSetPerPage(50)">50</div>
									<div class="drop-list" v-on:click="blockSetPerPage(100)">100</div>
								</div>
							</div>
						</div>
						<div class="page-count">
							<span>{{ block_pagination.from }}</span> - <span>{{ block_pagination.to }}</span> of <span>{{ block_pagination.table_block_total }}</span>
						</div>
						<div class="page-arrows">
							<div class="arrows" v-on:click="blockPrevPage()">
								<span data-glyph="caret-left" aria-hidden="true" class="oi"></span>
							</div>
							<div class="arrows" v-on:click="blockNextPage()">
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
					<i v-if="open_clinic_opt == 'name'" class="fa fa-search" v-on:click="toggleSearch('open', true)"></i>
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
            <input type="checkbox" v-model="allOpenSelected" v-on:change="selectAllOpen( allOpenSelected )">
            <span class="health-checkmark"></span>
          </label>	
          <div class="select-filter-div">
	        	<select v-model="open_clinic_region" v-on:change="regionChange('open')">
	        		<option value="0">All Region</option>
							<option value="sgd">Singapore - SGD</option>
	        		<option value="myr">Malaysia - MYR</option>
	        	</select>
	        </div>
          <div class="select-filter-div">
	        	<select v-model="open_clinic_opt" v-on:change="typeChange( )">
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
					<div v-if="open_clinic_opt == 'name'" v-for="list in open_clinic_list" class="clinic-name-container">
	        	<label class="health-checkbox-container"> 
	            <span>{{ list.clinic_name }}</span>
	            <input type="checkbox" v-model="list.selected">
	            <span class="health-checkmark"></span>
	          </label>
						<div v-if="list.currency_type" class="country">{{ list.currency_type == 'sgd' ? 'Singapore' : 'Malaysia' }}</div>
	        </div>
					<div v-if="open_clinic_opt == 'type'" v-for="list in clinic_type_list" class="clinic-name-container">
	        	<label class="health-checkbox-container"> 
	            <span>{{ list.name }}</span>
	            <input type="checkbox" v-model="list.selected">
	            <span class="health-checkmark"></span>
	          </label>
						<div v-if="list.provider_region" class="country">{{ list.currency_type == 'sgd' ? 'Singapore' : 'Malaysia' }}</div>
	        </div>
				</div>
				<div class="pagination-container">
					<div v-if="Object.keys(open_clinic_list).length > 0 && open_clinic_opt == 'name'" class="pagination-wrapper">
						<div class="page">
							<span class="page-text">Page:</span>
							<div v-click-outside="hideAllDrop" class="page-select">
								<span v-on:click="togglePageDrop( 0, true )"> 
									<span class="page-value">{{ open_active_page }}</span>
									<span data-glyph="caret-bottom" aria-hidden="true" class="oi"></span>
								</span>
								<div v-show="isPageDropShow[0]" class="drop-pagi">
									<div class="drop-list" v-for="list in range( open_pagination.table_open_last_page )" v-on:click="openGoToPage( list )">{{ list }}</div>
								</div>
							</div>
						</div>
						<div class="row">
							<span class="row-text">Rows per page:</span>
							<div v-click-outside="hideAllDrop" class="row-select">
								<span v-on:click="toggleLimitDrop( 0, true )">
									<span class="row-value">{{ open_page_limit }}</span>
									<span data-glyph="caret-bottom" aria-hidden="true" class="oi"></span>
								</span>
								<div v-show="isLimitDropShow[0]" class="drop-pagi">
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