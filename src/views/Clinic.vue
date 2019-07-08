<template>
	<div class="clinic-container">
		<div v-if="!isSearchShow" class="page-toolbar">
			<div class="page-title">
				<p>List of Clinics</p>
			</div>

			<div class="page-options">
				<div class="btn-page-options data-transfer-upload">
					<span class="oi" data-glyph="data-transfer-upload" aria-hidden="true"></span>
				</div>
				<div class="btn-page-options" v-on:click="showSearch()">
					<span class="oi" data-glyph="magnifying-glass" aria-hidden="true"></span>
				</div>
				<router-link tag="div" class="btn-page-options" to="/dashboard/clinic/add">
					<span class="oi" data-glyph="plus" aria-hidden="true"></span>
				</router-link>
				<div class="btn-page-options">
					<span class="oi" data-glyph="reload" aria-hidden="true"></span>
				</div>
			</div>
		</div>

		<div v-if="isSearchShow" class="search-toolbar-container">
			<div class="input-icon">
				<span class="oi" data-glyph="magnifying-glass" aria-hidden="true"></span>
			</div>
			<div class="form-div">
				<input type="text" placeholder="Search Clinic and hit Enter" autofocus>
			</div>
			<div class="close-icon" v-on:click="hideSearch()">
				<span class="oi" data-glyph="x" aria-hidden="true"></span>
			</div>
		</div>

		<div class="tbl-wrapper">
			<table class="table">
				<thead>
					<tr>
						<th>Options</th>
						<th>Status</th>
						<th>ID</th>
						<th>Name</th>
						<th>Login Email</th>
						<th>Communication Email</th>
						<th>Clinic Type</th>
						<th>Image</th>
						<th>City</th>
						<th>Country</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Phone</th>
            <th>Doctors Active</th>
            <th>Doctors InActive</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="list in [1,2,3,4,5]">
						<td>
							<router-link tag="button" class="table-btn" to="/dashboard/clinic/details/1">
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
						<td>Lorem Ipsum</td>
						<td>Lorem Ipsum</td>
						<td>Lorem Ipsum</td>
						<td>Lorem Ipsum</td>
						<td>Lorem Ipsum</td>
						<td>Lorem Ipsum</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="pagination-container">
			<div class="pagination-wrapper">
				<div class="page">
					<span class="page-text">Page:</span>
					<div class="page-select">
						<span class="page-value"></span>
						<div class="page-drop">
							<div class="drop-list" v-for="list in [1,2,3,4]">1</div>
						</div>
					</div>
				</div>
				
				<div class="row">
					<span class="row-text">Rows per page:</span>
					<div class="row-select">
						<span class="row-value"></span>
						<div class="row-drop">
							<div class="drop-list" v-for="list in [1,2,3,4]">1</div>
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
	import clinic from '@/components/clinic'
	export default clinic
</script>
