<template>
	<div class="corporate-members-container">
		
		<div class="search-member-wrapper">
			<span class="oi" data-glyph="magnifying-glass" aria-hidden="true"></span>
			<div class="form-div">
				<input type="text" placeholder="Search employee">
			</div>
		</div>

		<div v-if="false" class="member-list-container">
			
			<div  class="member-wrapper" v-for="list in [1,2,3,4,5]">
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

		<div v-if="true" class="member-list-table-wrapper">
			<div class="member-list-table">
				<table>
					<thead>
						<tr>
							<th class="name-title">Name</th>
							<th class="status-title">Status</th>
							<th class="mobile-number-title">Mobile number</th>
							<th class="family-coverage-title">Family coverage</th>
							<th class="spending-account-medical-title">Spending account <span>(medical)</span></th>
							<th class="spending-account-wellness-title">Spending account <span>(wellness)</span></th>
							<th class="date-title">Date</th>
						</tr>
					</thead>
					<tbody>
						
							<tr>
								<td class="name-data">
									<router-link :to="{ name: 'CorporateEmployeeMenu' }">
										<strong>Noelou Jan Nagac</strong>
									</router-link>
									<button class="btn-transfer-account">Transfer Account</button>
								</td>
								<router-link :to="{ name: 'CorporateEmployeeMenu' }">
									<td class="status-data">
										<div>
											<span class="status-color active"></span>
											<span>Active</span>
										</div>
										<div class="status-expired-details">
											<span>Last Day of Coverage/End Date 04/10/2019</span>
										</div>
									</td>
									<td class="mobile-number-data"><span>9064317892</span></td>
									<td class="family-coverage-data">
										<div class="dependent-details">
											<strong>Dependent: </strong>
											<span>1</span>
										</div>
									</td>
									<td class="spending-account-medical-data">
										<div class="medical-details">
											<strong>Allocation:</strong>
											<span>S$ <span>1000</span></span>
										</div>
										<div class="plan-details">
											<strong>Usage:</strong>
											<span>S$ <span>979.4</span></span>
										</div>
									</td>
									<td class="spending-account-wellness-data">
										<div class="medical-details">
											<strong>Allocation:</strong>
											<span>S$ <span>1000</span></span>
										</div>
										<div class="plan-details">
											<strong>Usage:</strong>
											<span>S$ <span>979.4</span></span>
										</div>
									</td>
									<td class="date-data">
										<div class="start-date-details">
											<strong>Start date:</strong>
											<span>July 05, 2019</span>
										</div>
										<div class="end-date-details">
											<strong>End date:</strong>
											<span>December 05, 2019</span>
										</div>
									</td>
								</router-link>
							</tr>
						
					</tbody>
				</table>
			</div>
		</div>

		<div class="member-list-pagination">
			<div class="global-pagination">
				<div class="prev-pagination">
					<i class="fa fa-angle-left"></i>
				</div>
				<div class="next-pagination">
					<i class="fa fa-angle-right"></i>
				</div><div class="total-item">
					<span>1 - 10 of 100</span>
				</div>
				<div class="per-page-pagination">
					<span>
						<span>5</span> per page
        	</span>
        	<i class="fa fa-angle-down"></i>
        </div>
      </div>
		</div>

  </div>
</template>

<script>
	import corporateMemberList from '@/components/corporates/corporateMemberList'
	export default corporateMemberList
</script>
