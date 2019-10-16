<template>
	<div class="health-partner-access-wrapper">
		<button @click="selectCorporatesView( 'CorporateMenu' )" class="btn-primary">BACK</button>
		<div>
			<h2 class="corporate-text">Corporate</h2>
		</div>
		<div class="health-partner-access-container">
			<div class="health-partner-access-blocked">
				<div class="blocked-opened-header">
					<h3>Health Partner Access - BLOCKED</h3>
					<i class="fa fa-search"></i>
				</div>
				<div class="clinic-name-header">
          <label class="health-checkbox-container"> 
            <span>Blocked Access</span>
            <input type="checkbox">
            <span class="health-checkmark"></span>
          </label>	
          <div class="select-filter-div">
	        	<select >
	        		<option value="type">Clinic Type</option>
	        		<option value="name">Clinic Name</option>
	        	</select>
	        </div>
          <button class="btn-primary">OPEN</button>  
        </div>
        <div class="clinic-name-wrapper">
        	<div class="clinic-name-container">
	        	<label class="health-checkbox-container"> 
	            <span>Healthway Medical Clinic (Yishun Avenue 6)</span>
	            <input type="checkbox">
	            <span class="health-checkmark"></span>
	          </label>
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
				<div class="blocked-opened-header">
					<h3>Health Partner Access - OPENED</h3>
					<i class="fa fa-search"></i>
				</div>
				<div class="clinic-name-header">
          <label class="health-checkbox-container"> 
            <span>Opened Access</span>
            <input type="checkbox">
            <span class="health-checkmark"></span>
          </label>	
          <div class="select-filter-div">
	        	<select >
	        		<option value="type">Clinic Type</option>
	        		<option value="name">Clinic Name</option>
	        	</select>
	        </div>
          <button class="btn-primary">BLOCK</button>  
        </div>
        <div class="clinic-name-wrapper">
					<div class="clinic-name-container">
	        	<label class="health-checkbox-container"> 
	            <span>Royce Dental Surgery (Bishan)</span>
	            <input type="checkbox">
	            <span class="health-checkmark"></span>
	          </label>
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
		</div>
	</div>
</template>

<script>
	import healthPartnerAccess from '@/components/corporates/healthPartnerAccess.vue'
	export default healthPartnerAccess
</script>