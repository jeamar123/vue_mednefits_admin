<template>
	<div class="employee-information-container">
		<div class="emp-tab-wrapper">
			<div class="" @click="showEmpSelectorInfo(0, 'employee')" v-bind:class="{'active': empSelectorActive.value === 0}">Employee</div>
			<div @click="showEmpSelectorInfo(1, 'dependent')" v-bind:class="{'active': empSelectorActive.value === 1}">Dependent</div>
			<div @click="showEmpSelectorInfo(2, 'claim-submission')" v-bind:class="{'active': empSelectorActive.value === 2}">Claim Submission</div>
			<div @click="showEmpSelectorInfo(3, 'settings')" v-bind:class="{'active': empSelectorActive.value === 3}">Settings</div>
		</div>

		<div v-if="empSelectorActive.value === 0" class="emp-information-container-details">
			<div class="emp-info-header">
				<h3>Employee Information</h3>
				<div class="right-btn-container">
					<button class="btn btn-edit"><img :src="'../assets/img/icons/edit.png'">Edit Profile</button>
				</div>	
			</div>
			<div class="emp-information-details">
				<div class="col-1-emp-info-details">
					<div>
						<strong>Full Name</strong>
						<span>Honglay Rose Lim</span>
					</div>
					<div>
						<strong>Date of Birth</strong>
						<span>2019-03-04</span>
					</div>
					<div>
						<strong>Postal Code</strong>
						<span>12345</span>
					</div>
					<div>
						<strong>Job Title</strong>
						<span>Other</span>
					</div>
					<div>
						<strong>Mobile Country Code</strong>
						<span>+65</span>
					</div>
					<div>
						<strong>Mobile Number</strong>
						<span>+639064317892</span>
					</div>
				</div>

				<div class="col-2-emp-info-details">
					<div>
						<strong>Member ID</strong>
						<span>023735</span>
					</div>
					<div>
						<strong>Work Email</strong>
						<span>honglay@mednefits.com</span>
					</div>
					<div>
						<strong>Bank Account Number</strong>
						<span></span>
					</div>
					<div>
						<strong>Bank Code</strong>
						<span></span>
					</div>
					<div>
						<strong>Bank BRH</strong>
						<span></span>
					</div>
					<div>
						<strong>For Cummunication</strong>
						<span class="emp-username-type-container">
							<label><input type="radio" name="emp-username-type"> Email</label>
							<label><input type="radio" name="emp-username-type"> SMS</label>
						</span>
					</div>
				</div>

			</div>

			<div class="emp-info-btn-footer">
				<div>
					<h3>Add a Dependent?</h3>
					<button class="btn btn-add"><img :src="'../assets/img/icons/add-employee.svg'">Add</button>
				</div>
				<div>
					<button class="btn btn-remove-employee">Remove Employee <i class="fa fa-trash"></i></button>
				</div>
			</div>
		</div>

		<div v-if="empSelectorActive.value === 1" class="dependent-details">
			<div class="emp-info-header">
				<h3>Dependent Information</h3>
				<div class="right-btn-container">
					<button class="btn btn-edit"><img :src="'../assets/img/replace.png'">Replace</button>
					<button class="btn btn-edit btn-remove"><img :src="'../assets/img/icons/dustbin.png'">Remove</button>
					<button class="btn btn-edit"><img :src="'../assets/img/icons/edit.png'">Edit</button>
				</div>
			</div>
			<div class="emp-information-details">
				<div class="col-1-emp-info-details">
					<div>
						<strong>Full Name</strong>
						<span>Kevin Aton</span>
					</div>
					<div>
						<strong>Plan Start</strong>
						<span>August 03,2019</span>
					</div>
					<div>
						<strong>Plan End</strong>
						<span>August 02,2020</span>
					</div>
				</div>

				<div class="col-2-emp-info-details">
					<div>
						<strong>Date of Birth</strong>
						<span>04/03/2019</span>
					</div>
					<div>
						<strong>Relationship</strong>
						<span>Child</span>
					</div>
					<div>
						<strong>Member ID</strong>
						<span>023736</span>
					</div>
				</div>

			</div>
		</div>

		<div v-if="empSelectorActive.value === 2" class="claim-submission-details">
			
			<div class="emp-info-header">
				<div class="emp-info-header">
					<h3>Claim Submission</h3>	
				</div>
			</div>
			<div v-if="!showInNetwork && !showOutNetwork">
				<div class="btn-network-container">
					<button @click="toggleShowInNetwork('in-network')" class="btn-network">IN-NETWORK</button>
					<button @click="toggleShowOutNetwork('out-network')" class="btn-network">OUT-OF-NETWORK</button>
				</div>
				<div class="out-of-network-table-container">
					<h4>Out-of-Network Transactions</h4>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Provider</th>
								<th>Service</th>
								<th>Amount</th>
								<th>Spending type</th>
								<th>Status</th>
								<th>Options</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<span>MNF003978</span>
								</td>
								<td>
									<span>Lo</span>
								</td>
								<td>S$ 
									<span>4.00</span>
								</td>
								<td>
									<span>Genera Practice</span>
								</td>
								<td>
									<span>medical</span>
								</td>
								<td>
									<span>Pending</span>
								</td>
								<td>
									<span>
										<button>Edit</button>
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div v-if="showInNetwork">
				<div class="network-header-container">
					<h5>IN-NETWORK</h5>
					<i @click="toggleShowInNetwork('cancel')" class="fa fa-times"></i>
				</div>
				<div class="in-network-table-container">
					<table>
						<thead>
							<tr>
								<th>Health Partner</th>
								<th>Service</th>
								<th>Date of Visit</th>
								<th>Time of Visit</th>
								<th>Payment Type</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div class="in-network-input-wrapper">
										<input type="text" placeholder="Search Health Partner">
									</div>
								</td>
								<td>
									<div class="in-network-input-wrapper">
										<input type="text" placeholder="Search Service">
										<ul v-if="false" class="dropdown-menu search-service-dropdown">
											<li>
												<a>No Service</a>
											</li>
										</ul>
									</div>
								</td>
								<td>
									<div class="in-network-input-wrapper visit-date-input-wrapper">
										<input type="text">
										<div class="visit-date-container">
											<img :src="'../assets/img/coverage/Submit-E-Claim---Visit-Date.png'">
										</div>
									</div>
								</td>
								<td>
									<div class="in-network-input-wrapper visit-time-input-wrapper">
										<div class="visit-time-container">
											<img :src="'../assets/img/coverage/Submit-E-Claim---Visit-Time.png'">
										</div>
										<input type="text">
										<div class="am-pm-container">
											<span>AM</span>
											<i class="fa fa-caret-down"></i>
										</div>

										<div v-if="false" class="dropdown-menu">
											<div class="time-wrapper">
												<div class="hour">
													<div class="hour-up-now">
														<i class="fa fa-chevron-up"></i>
													</div>
													<div class="hour-value">
														<span>01</span>
													</div>
													<div class="hour-up-now">
														<i class="fa fa-chevron-down"></i>
													</div>
												</div>
												<div class="middle">
													<span>:</span>
												</div>
												<div class="minute">
													<div class="hour">
														<div class="hour-up-now">
															<i class="fa fa-chevron-up"></i>
														</div>
														<div class="hour-value">
															<span>01</span>
														</div>
														<div class="hour-up-now">
															<i class="fa fa-chevron-down"></i>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</td>
								<td>
									<div class="in-network-input-wrapper payment-type-input-wrapper">
										<input type="text">
										<div class="caret-down-container">
											<i class="fa fa-caret-down"></i>
										</div>

										<ul v-if="false" class="dropdown-menu">
											<li>
												<a>Credit</a>
											</li>
											<li>
												<a>Cash</a>
											</li>
										</ul>
									</div>
								</td>
								<td>
									<div class="in-network-input-wrapper">
										<input type="text" placeholder="Enter Amount">
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="in-network-btn-footer">
					<button class="btn-submit">Submit</button>
				</div>
			</div>

			<div v-if="showOutNetwork">
				<div class="network-header-container">
					<h5>OUT-OF-NETWORK</h5>
					<i @click="toggleShowOutNetwork('cancel')" class="fa fa-times"></i>
				</div>
				<div class="out-of-network-form-wrapper">
					<div class="out-of-network-form">
						<div v-if="true" class="step-one">
							<div class="input-group">
								<label>Spending Account <span class="required">*</span></label>
								<div class="input-wrapper">
									<button class="btn-medical active">Medical</button>
									<button class="btn-medical">Wellness</button>
								</div>
							</div>
							<div class="input-group">
								<label>Claim Type <span class="required">*</span></label>
								<div class="input-wrapper">
									<input type="text">
									<i class="fa fa-caret-down"></i>
								</div>
							</div>
							<div class="input-group">
								<label>Provider <span class="required">*</span></label>
								<div class="input-wrapper">
									<input type="text" placeholder="Mednefits Pte LTd">
								</div>
							</div>
							<div class="input-group">
								<label>Visit Date <span class="required">*</span></label>
								<div class="input-wrapper visit-date-input-wrapper">
									<input type="text">
									<div class="visit-date-container">
										<img :src="'../assets/img/coverage/Submit-E-Claim---Visit-Date.png'">
									</div>
								</div>
							</div>
							<div class="input-group">
								<label>Visit Time <span class="required">*</span></label>
								<div class="input-wrapper time-input-wrapper">
									<div class="visit-time-container">
										<img :src="'../assets/img/coverage/Submit-E-Claim---Visit-Time.png'">
									</div>
									<input type="text">
									<div class="am-pm-container">
										<span>AM</span>
										<i class="fa fa-caret-down"></i>
									</div>
								</div>
							</div>
							<div class="input-group">
								<label>Claim Amount <span class="required">*</span></label>
								<div class="input-wrapper currency-input-wrapper">
									<input type="text">
									<div class="currency-container">
										<span>S$</span>
									</div>
								</div>
							</div>
							<div class="input-group">
								<label>Member <span class="required">*</span></label>
								<div class="input-wrapper">
									<input type="text">
									<i class="fa fa-caret-down"></i>
								</div>
							</div>
						</div>
						<div v-if="false" class="step-two">
							
						</div>
						<div v-if="false" class="step-three">
							
						</div>

					</div>
					<div class="next-btn-footer">
						<button class="btn-submit">Next</button>
					</div>
				</div>
			</div>		
		</div>

		<div v-if="empSelectorActive.value === 3" class="settings-details">
			<div>
				<div>
					<button class="btn btn-settings"><i class="fa fa-wrench"></i> Setup/Reset Account</button>
				</div>
				<div>
					<button class="btn btn-settings"><i class="fa fa-check"></i> Credits & Plans</button>
				</div>
				<div>
					<button class="btn btn-settings"><i class="fa fa-refresh"></i> Re-new Plan</button>
				</div>
				<div>
					<button class="btn btn-settings"><i class="fa fa-dollar"></i> Manage Cap Per Visit</button>
				</div>
				<div>
					<button class="btn btn-settings"><i class="fa fa-search"></i> Health Partner Access</button>
				</div>	
			</div>
		</div>
  </div>
</template>

<script>
	import corporateEmployeeInformation from '@/components/corporates/employee/corporateEmployeeInformation.vue'
	export default corporateEmployeeInformation
</script>
