<template>
	<div class="claim-submission-details">
		
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
				<div class="tbl-scroll-wrapper">
					<table>
						<thead>
							<tr>
								<th class="xs-show-tbl-cell ">Options</th>
								<th>ID</th>
								<th>Provider</th>
								<th>Service</th>
								<th>Amount</th>
								<th>Spending type</th>
								<th>Status</th>
								<th class="xs-hide-tbl-cell">Options</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="xs-show-tbl-cell">
									<span>
										<button @click="editInNetworkOpt()">Edit</button>
									</span>
								</td>
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
								<td class="xs-hide-tbl-cell">
									<span>
										<button @click="editInNetworkOpt()">Edit</button>
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<div v-if="showInNetwork" class="in-network-box">
			<div class="network-header-container">
				<h5>IN-NETWORK</h5>
				<i @click="toggleShowInNetwork('cancel')" class="fa fa-times"></i>
			</div>
			<div class="in-network-table-container">
				<div class="tbl-scroll-wrapper xs-hide">
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
									<div class="in-network-input-wrapper visit-date-input-wrapper in-network-visit">
										<v-date-picker
											popoverDirection="bottom"
											v-model="starDateDetails.starDate"
											:input-props='{class: "vDatepicker start-date-input", placeholder: "DD/MM/YYYY", readonly: true, }'
											popover-visibility="focus"
										></v-date-picker>
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
										<input @click="clickedTimeVisitDropdown()" type="text">
										<div class="am-pm-container">
											<span>AM</span>
											<i class="fa fa-caret-down"></i>
										</div>

										<div v-if="showTimeVisitDropdown" class="dropdown-menu">
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

				<div class="xs-in-network-form">
					<div class="claim-form-div">
						<label>Health Partner</label>
						<div class="in-network-input-wrapper">
							<input type="text" placeholder="Search Health Partner">
						</div>
					</div>

					<div class="claim-form-div">
						<label>Service</label>
						<div class="in-network-input-wrapper">
							<input type="text" placeholder="Search Service">
							<ul v-if="false" class="dropdown-menu search-service-dropdown">
								<li>
									<a>No Service</a>
								</li>
							</ul>
						</div>
					</div>

					<div class="claim-form-div">
						<label>Date of Visit</label>
						<div class="in-network-input-wrapper visit-date-input-wrapper in-network-visit">
							<v-date-picker
								popoverDirection="bottom"
								v-model="starDateDetails.starDate"
								:input-props='{class: "vDatepicker start-date-input", placeholder: "DD/MM/YYYY", readonly: true, }'
								popover-visibility="focus"
							></v-date-picker>
							<div class="visit-date-container">
								<img :src="'../assets/img/coverage/Submit-E-Claim---Visit-Date.png'">
							</div>
						</div>
					</div>

					<div class="claim-form-div">
						<label>Time of Visit</label>
						<div class="in-network-input-wrapper visit-time-input-wrapper">
							<div class="visit-time-container">
								<img :src="'../assets/img/coverage/Submit-E-Claim---Visit-Time.png'">
							</div>
							<input @click="clickedTimeVisitDropdown()" type="text">
							<div class="am-pm-container">
								<span>AM</span>
								<i class="fa fa-caret-down"></i>
							</div>

							<div v-if="showTimeVisitDropdown" class="dropdown-menu">
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
					</div>

					<div class="claim-form-div">
						<label>Payment Type</label>
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
					</div>

					<div class="claim-form-div">
						<label>Amount</label>
						<div class="in-network-input-wrapper">
							<div class="in-network-input-wrapper">
								<input type="text" placeholder="Enter Amount">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="in-network-btn-footer">
				<button @click="inNetworkSubmit()" class="btn-submit">Submit</button>
			</div>
		</div>

		<div v-if="showOutNetwork" class="out-network-box">
			<div class="network-header-container">
				<h5>OUT-OF-NETWORK</h5>
				<i @click="toggleShowOutNetwork('cancel')" class="fa fa-times"></i>
			</div>
			<div class="out-of-network-form-wrapper">
				<div class="out-of-network-form">
					<div v-if="step_active == 1" class="step-one">
						<div class="input-group">
							<label>Spending Account <span class="required">*</span></label>
							<div class="input-wrapper spending-type-box">
								<button @click="setSpendingType('medical')" v-bind:class="{'active': spendingTypeOpt == 'medical' }" 
								class="btn-medical">Medical</button>
								<button @click="setSpendingType('wellness')" v-bind:class="{'active': spendingTypeOpt == 'wellness' }" 
								class="btn-medical">Wellness</button>
							</div>
						</div>
						<div class="input-group">
							<label>Claim Type <span class="required">*</span></label>
							<div class="input-wrapper">
								<input @click="claimTypeListOption()" type="text">
								<i class="fa fa-caret-down"></i>
								<ul v-if="showClaimTypeListOption" class="dropdown-menu">
									<li>
										<a>General Practice</a>
									</li>
									<li>
										<a>Health Screening</a>
									</li>
									<li>
										<a>Traditional Chinese Medicine</a>
									</li>
									<li>
										<a>Medical Specialist</a>
									</li>
									<li>
										<a>Other</a>
									</li>
								</ul>
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
								<v-date-picker
	                  popoverDirection="bottom"
	                  v-model="starDateDetails.starDate"
	                  :input-props='{class: "vDatepicker start-date-input", placeholder: "DD/MM/YYYY", readonly: true, }'
	                  popover-visibility="focus"
	                ></v-date-picker>
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
								<input @click="clickedTimeOption()" type="text">
								<div @click="clickedDaytimeOption()" class="am-pm-container">
									<span>AM</span>
									<i class="fa fa-caret-down"></i>
								</div>

								<div v-if="showTimeOption" class="time-opt-wrapper">
									<div class="time-wrapper">
										<div class="hour">
											<div class="hour-up-arrow">
												<i class="fa fa-chevron-up"></i>
											</div>
											<div class="hour-value">
												<span>0</span>
												<span>5</span>
											</div>
											<div class="hour-down-arrow">
												<i class="fa fa-chevron-down"></i>
											</div>
										</div>
										<div class="middle">
											<span>:</span>
										</div>
										<div class="minute">
											<div class="hour-up-arrow">
												<i class="fa fa-chevron-up"></i>
											</div>
											<div class="hour-value">
												<span>0</span>
												<span>5</span>
											</div>
											<div class="hour-down-arrow">
												<i class="fa fa-chevron-down"></i>
											</div>
										</div>
									</div>
								</div>

								<ul v-if="showDaytimeOption" class="daytime-opt">
									<li>
										<a>AM</a>
									</li>
									<li>
										<a>PM</a>
									</li>
								</ul>
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
								<input @click="memberListOption()" type="text">
								<i class="fa fa-caret-down"></i>

								<ul v-if="showMemberListOption" class="dropdown-menu">
									<li>
										<a>Kynn Rodriguez</a>
									</li>
									<li>
										<a>Mike Vega</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div v-if="step_active == 2" class="step-two">
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
					<div v-if="step_active == 3" class="step-three">
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
					<button v-if="step_active == 2 || step_active == 3" @click="empDetailsOutNetworkNextBackBtn('back')" class="btn-submit btn-back">BACK</button>
					<button v-if="step_active == 1 || step_active == 2" @click="empDetailsOutNetworkNextBackBtn('next')" class="btn-submit">Next</button>
					<button v-if="step_active == 3" @click="empDetailsOutNetworkNextBackBtn()" class="btn-submit">SUBMIT</button>
				</div>
			</div>
		</div>		
	</div>
</template>

<script>
	import claimSubmission from '@/components/corporates/employee/claimSubmission.vue'
	export default claimSubmission
</script>
