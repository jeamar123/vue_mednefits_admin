<template>
	<div class="corporates-container">
		<div v-if="!isSearchShow" class="page-toolbar">
			<div class="page-title">
				<p>List of Corporate Clients</p>
			</div>

			<div class="page-options">
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
			</div>
		</div>

		<div v-if="isSearchShow" class="search-toolbar-container">
			<div class="input-icon">
				<span class="oi" data-glyph="magnifying-glass" aria-hidden="true"></span>
			</div>
			<div class="form-div">
				<input type="text" placeholder="Search Corporate and hit Enter" autofocus>
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
		</div>

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
