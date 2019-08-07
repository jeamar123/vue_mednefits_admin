<template>
	<div class="corporate-members-container">
		
		<div class="search-member-wrapper">
			<span class="oi" data-glyph="magnifying-glass" aria-hidden="true"></span>
			<div class="form-div">
				<input type="text" placeholder="Search employee">
			</div>
		</div>

		<div class="member-list-container">
			
			<div class="member-wrapper" v-for="list in [1,2,3,4,5]">
				<router-link tag="div" :to="{ name: 'CorporateEmployeeMenu' }" class="header">
					<i class="fa fa-user"></i>
					<label>Lorem Ipsum</label>
					<span class="oi" data-glyph="caret-right" aria-hidden="true"></span>
				</router-link>
				<div class="body">
					<div class="info-div">
						<label>Email:</label>
						<p>afdsafa.asdfa@fmail.com</p>
					</div>
					<div class="info-div">
						<label>NRIC:</label>
						<p>afdsafa</p>
					</div>
					<div class="info-div">
						<label>Dependents:</label>
						<p>0</p>
					</div>
					
					<label>Spending Account</label>
					<div class="info-row">
						<div class="info-col"></div>
						<div class="info-col">
							<label>Medical</label>
						</div>
						<div class="info-col">
							<label>Wellness</label>
						</div>
					</div>
					<div class="info-row">
						<div class="info-col">
							<label>Allocation</label>
						</div>
						<div class="info-col">
							S$<span>0.00</span>
						</div>
						<div class="info-col">
							S$<span>0.00</span>
						</div>
					</div>
					<div class="info-row">
						<div class="info-col">
							<label>Usage</label>
						</div>
						<div class="info-col">
							S$<span>0.00</span>
						</div>
						<div class="info-col">
							S$<span>0.00</span>
						</div>
					</div>
					<div class="white-space-20"></div>
					<div class="info-div">
						<label>Start date:</label>
						<p>July 04, 1995</p>
					</div>
					<div class="info-div">
						<label>End date:</label>
						<p>July 04, 1995</p>
					</div>

					<div class="btn-container">
						<button class="btn btn-primary">Transfer Account</button>
					</div>
				</div>
			</div>

		</div>

  </div>
</template>

<script>
	import corporateMemberList from '@/components/corporates/corporateMemberList'
	export default corporateMemberList
</script>
