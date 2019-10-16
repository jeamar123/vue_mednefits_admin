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
							<div class="drop-box">
								<input type="file">
								<div class="drop-box-content">
									<div>
										<img :src="'../assets/img/Upload-Receipt.png'">
										<h4>Drop your .xlxs file here</h4>
										<div class="or-text">or</div>
										<div class="select-file-text">Select a file</div>
										<div class="file-name-upload-text"></div>
									</div>
								</div>
							</div>

							<div class="uploaded-list">
								<h4>Uploaded</h4>
								<div class="progress-wrapper">
									<div class="icon-img">
										<img :src="'../assets/img/Receipt-doc-xls.png'">
									</div>
									<div class="progress-bar-container">
										<div class="file-info-container">
											<span class="file-name">Employee Enro</span>... 
											<span class="file-size">5.243kb</span>
											<span><i class="fa fa-times"></i></span>	
										</div>
										<div class="progress-bar"> 
											<div class="progress"></div>
										</div>
										<div class="file-status-container">
											<span v-if="false" class="file-status">Completed.</span>
											<span v-if="false" class="file-status">Uploading...</span>
											<span class="file-status">Invalid file.</span>
										</div>
									</div>
								</div>
							</div>	
						</div>
						<div v-if="false" class="step-three">
							<div class="summary-list">
								<div class="summary-list-row">
									<div class="summary-label">
										<label>Spending type*</label>
									</div>
									<div class="label-item">
										<span>medical</span>
									</div>
								</div>
								<div class="summary-list-row">
									<div class="summary-label">
										<label>Item/Service*</label>
									</div>
									<div class="label-item">
										<span>medical</span>
									</div>
								</div>
								<div class="summary-list-row">
									<div class="summary-label">
										<label>Merchant*</label>
									</div>
									<div class="label-item">
										<span>medical</span>
									</div>
								</div>
								<div class="summary-list-row">
									<div class="summary-label">
										<label>Visit Date*</label>
									</div>
									<div class="label-item">
										<span>October 14,2019</span>
									</div>
								</div>
								<div class="summary-list-row">
									<div class="summary-label">
										<label>Visit Time*</label>
									</div>
									<div class="label-item">
										<span>11 : 14 AM</span>
									</div>
								</div>
								<div class="summary-list-row">
									<div class="summary-label">
										<label>Claim Amount*</label>
									</div>
									<div class="label-item">
										<span>S$ </span>
									</div>
								</div>
								<div class="summary-list-row">
									<div class="summary-label">
										<label>Member*</label>
									</div>
									<div class="label-item">
										<span>medical</span>
									</div>
								</div>
								<div class="summary-list-row">
									<div class="summary-label">
										<label>Receipt*</label>
									</div>
									<div class="label-item">
										<span>
											<img :src="'../assets/img/Receipt-doc-xls.png'">
										</span>
									</div>
								</div>
							</div>
						</div>

					</div>
					<div class="next-btn-footer">
						<button class="btn-submit">Next</button>
					</div>
				</div>
			</div>		
		</div>

		<div v-if="empSelectorActive.value === 3" class="settings-details">
			<div v-if="!showEmpCreditsPlan">
				<div>
					<button @click="selectedEmpDetailsSettingsClicked(0,'setup-reset-account')" class="btn btn-settings"><i class="fa fa-wrench"></i> Setup/Reset Account</button>
				</div>
				<div>
					<button @click="openEmpCreditsPlan('credits-plans')" class="btn btn-settings"><i class="fa fa-check"></i> Credits & Plans</button>
				</div>
				<div>
					<button @click="selectedEmpDetailsSettingsClicked(1,'renew-plan')" class="btn btn-settings"><i class="fa fa-refresh"></i> Re-new Plan</button>
				</div>
				<div>
					<button @click="selectedEmpDetailsSettingsClicked(2,'manage-visit')" class="btn btn-settings"><i class="fa fa-dollar"></i> Manage Cap Per Visit</button>
				</div>
				<div>
					<button @click="selectHealthPartnerView( 'HealthPartnerAccess' )" 
									class="btn btn-settings">
									<i class="fa fa-search"></i> Health Partner Access
					</button>
				</div>	
				<div>
					<button @click="selectedEmpDetailsSettingsClicked(3,'sms-update-notify')" class="btn btn-settings"><i class="fa fa-envelope"></i> Send SMS Update Notification</button>
				</div>
			</div>

			<div v-if="showEmpCreditsPlan" class="credits-plans-wrapper">
				<div>
					<h1>Credits & Plans</h1>
				</div>
				<div>
					<i @click="openEmpCreditsPlan('cancel')" class="fa fa-times"></i>
					<div class="credit-plan-container">
						<div>
							<h3>Credit Allocation</h3>
							<div class="credit-type-selector">
								<button class="btn-primary active">MEDICAL</button>
								<button class="btn-primary">WELLNESS</button>
							</div>
							<div class="credit-details-container">
								<div class="credit-item-container">
									<div class="credit-item-detail">
										<span>
											<span>S$ </span> 
											<span>0.00</span>
										</span>
										<span>Allocation</span>
									</div>
									<div class="credit-item-detail">
										<span>
											<span>S$ </span> 
											<span>0.00</span>
										</span>
										<span>Usage</span>
									</div>
									<div class="credit-input-wrapper">
										<input type="number" placeholder="Credits Add*">
									</div>
								</div>
								<div class="add-deduct-btn-container">
									<button class="btn-primary active">ADD</button>
									<button class="btn-primary">DEDUCT</button>
								</div>
							</div>
							<div class="btn-update-credits">
								<button class="btn-primary">UPDATE CREDITS</button>
							</div>
						</div>
						<div>
							<h3>Plan Duration</h3>
							<div class="plan-type-selector">
								<label class="container">
									<span>Standard 1 year</span>
									<input @click="shortTermRadioBtn('standard-one-year')" type="radio" name="radio">
									<span class="plan-type-checkmark"></span>
								</label>
								<label class="container">
									<span>Short Term</span>
									<input @click="shortTermRadioBtn('short-term')" type="radio" name="radio">
									<span class="plan-type-checkmark"></span>
								</label>
								<select v-if="showShortTermSelector">
									<option>1 month</option>
									<option>2 months</option>
								</select>
							</div>
							<div class="plan-date-container">
								<div class="start-date-container">
									<h4>Start Date:</h4>
									<div class="start-date-input-wrapper">
										<v-date-picker
		                  popoverDirection="bottom"
		                  v-model="starDateDetails.starDate"
		                  :input-props='{class: "vDatepicker start-date-input", placeholder: "DD/MM/YYYY", readonly: true, }'
		                  popover-visibility="focus"
		                ></v-date-picker>
									</div>
								</div>
								<div class="end-date-container">
									<h4>End Date: <span>2020-08-02</span></h4> 
								</div>
								<div>
									<button class="btn-primary">UPDATE PLAN</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div>
	  	<Modal v-if="showSetupAccountModal" class="employee-details-options">
	  		<div slot="header">
	  			<h1>Employee Details Options</h1>
	  		</div>
	  		<div slot="body">
	  			<div v-if="selected_emp_details_opt == 0" class="btn-options-container">
	  				<button @click="selectedEmpDetailsToggleOpt(1)" class="btn-primary">UPDATE PASSWORD</button>
	  				<button class="btn-primary">RESEND/RESET ACCOUNT</button>
	  				<button @click="selectedEmpDetailsToggleOpt(2)" class="btn-primary">PIN SETUP</button>
	  				<button class="btn-primary">UNSET PIN</button>
	  			</div>

	  			<div v-if="selected_emp_details_opt == 1" class="update-password-container">
	  				<div class="update-pass-header">
	  					<i @click="selectedEmpDetailsToggleOpt(0)" class="fa fa-times"></i>
	  				</div>
	  				<div>
	  					<div class="employee-details-input-wrapper">
	  						<label>Email</label>
	  						<input type="text">
	  					</div>
	  					<div class="employee-details-input-wrapper">
	  						<label>Password*</label>
	  						<input type="text">
	  					</div>
	  					<div class="employee-details-input-wrapper">
	  						<label>Re-Type Password*</label>
	  						<input type="text">
	  					</div>
	  					<div>
	  						<button class="btn-primary btn-update">UPDATE</button>
	  					</div>
	  				</div>
	  			</div>

	  			<div v-if="selected_emp_details_opt == 2">
	  				<div class="update-pass-header">
	  					<i @click="selectedEmpDetailsToggleOpt(0)" class="fa fa-times"></i>
	  				</div>
	  				<div>
	  					<div class="employee-details-input-wrapper">
	  						<label>Pin*</label>
	  						<input type="text">
	  					</div>
	  					<div class="employee-details-input-wrapper">
	  						<label>Re-Type Pin*</label>
	  						<input type="text">
	  					</div>
	  					<div>
	  						<button class="btn-primary btn-update">UPDATE</button>
	  					</div>
	  				</div>
	  			</div>
	  		</div>
	  		<div slot="footer">
	  			<button @click="selectedEmpDetailsSettingsClicked(0, 'cancel')" class="btn-close">CLOSE</button>
	  		</div>
	  	</Modal>

	  	<Modal v-if="showRenewModal" class="employee-details-options">
	  		<div slot="header">
	  			<h1>Re-new Plan</h1>
	  		</div>
	  		<div slot="body">
	  			<div>
	  				<div class="renew-plan-row">
	  					<label>User: </label> 
	  					<span>niknik san</span>
	  				</div>
	  				<div class="renew-plan-row">
	  					<label>ID: </label> 
	  					<span>29467</span>
	  				</div>
	  				<div class="renew-plan-row">
	  					<label>Old Plan Start: </label> 
	  					<span>September 15, 2019</span>
	  				</div>

	  				<div class="new-plan-start-container">
	  					<h4>New Plan Start:</h4>
	  					<div class="start-date-input-wrapper">
								<v-date-picker
                  popoverDirection="bottom"
                  v-model="starDateDetails.null"
                  :input-props='{class: "vDatepicker start-date-input", placeholder: "DD/MM/YYYY", readonly: true, }'
                  popover-visibility="focus"
                ></v-date-picker>
                <i class="fa fa-caret-down"></i>
							</div>
	  				</div>
	  			</div>
	  		</div>
	  		<div slot="footer">
	  			<button @click="selectedEmpDetailsSettingsClicked(1, 'cancel')" class="btn-close">CANCEL</button>
	  			<button class="btn-primary settings-btn-submit">PROCEED</button>
	  		</div>
	  	</Modal>

	  	<Modal v-if="showManageCapPerVisit" class="employee-details-options">
	  		<div slot="header">
	  			<h1>Manage Cap Per Visit</h1>
	  		</div>
	  		<div slot="body">
	  			<div>
	  				<label>GP cap per visit</label>
	  				<div class="gp-cap-input-wrapper">
	  					<input type="text">
	  					<div class="icon-right">
	  						<span>S$</span>
	  					</div>
	  				</div>
	  			</div>
	  		</div>
	  		<div slot="footer">
	  			<button @click="selectedEmpDetailsSettingsClicked(2, 'cancel')" class="btn-close">CANCEL</button>
	  			<button class="btn-primary settings-btn-submit">SUBMIT</button>
	  		</div>
	  	</Modal>

	  	<Modal v-if="showSmsUpdateNotify" class="employee-details-options">
	  		<div slot="header">
	  			<h1>Send SMS Update Notification</h1>
	  		</div>
	  		<div slot="body">
	  			<div class="sms-form">
	  				<div>
	  					<label>Country Code</label>
	  					<div class="country-mobile-input-wrapper">
	  						<input type="text">
	  						<i class="fa fa-caret-down"></i>
	  					</div>
	  				</div>
	  				<div>
	  					<label>Mobile Number</label>
	  					<div class="country-mobile-input-wrapper">
	  						<input type="text">
	  					</div>
	  				</div>
	  			</div>
	  		</div>
	  		<div slot="footer">
	  			<button @click="selectedEmpDetailsSettingsClicked(3, 'cancel')" class="btn-close">CANCEL</button>
	  			<button class="btn-primary settings-btn-submit">SUBMIT</button>
	  		</div>
	  	</Modal>
	  </div>

  </div>
</template>

<script>
	import corporateEmployeeInformation from '@/components/corporates/employee/corporateEmployeeInformation.vue'
	export default corporateEmployeeInformation
</script>
