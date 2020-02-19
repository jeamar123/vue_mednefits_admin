<template>
	<div class="claim-submission-details">
		
		<div class="emp-info-header">
			<div class="emp-info-header">
				<h3>Claim Submission</h3>	
			</div>
		</div>
		<div v-if="!showInNetwork && !showOutNetwork">
			<div class="btn-network-container">
				<button v-on:click="toggleShowInNetwork('in-network')" class="btn-network">IN-NETWORK</button>
				<button v-on:click="toggleShowOutNetwork('out-network')" class="btn-network">OUT-OF-NETWORK</button>
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
							<tr v-for="( list, index ) in outNetworkList">
								<td class="xs-show-tbl-cell">
									<span>
										<button v-on:click="editOutNetworkOpt( list )">Edit</button>
									</span>
								</td>
								<td>{{ setTransID( list.out_of_network_transaction_id ) }}</td>
								<td>{{ list.provider }}</td>
								
								<td>{{ list.claim_type }}</td>
								<td><span class="txt-transform-uppercase">{{ list.currency_type ? list.currency_type : $parent.$data.employee_side_info.currency_type }}</span> {{ list.claim_amount | number('0.00') }}</td>
								<td>{{ list.spending_type }}</td>
								<td>
									<span v-if="list.claim_status == 0">Pending</span>
									<span v-if="list.claim_status == 1">Approved</span>
									<span v-if="list.claim_status == 2">Rejected</span>
								</td>
								<td class="xs-hide-tbl-cell">
									<span>
										<button v-if="list.claim_status == 0" v-on:click="editOutNetworkOpt( list )">Edit</button>
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
				<i v-on:click="toggleShowInNetwork('cancel')" class="fa fa-times"></i>
			</div>
			<div class="in-network-table-container">
				<div class="xs-in-network-form">
					<div class="claim-form-div">
						<label>Member</label>
						<div class="in-network-input-wrapper member-input-wrapper" >
							<span v-on:click="toggleMemberDrop()">
								<input type="text" placeholder="Member" v-model="inNetwork_data.member" readonly>

								<div class="caret-down-container">
									<i class="fa fa-caret-down"></i>
								</div>
							</span>

							<ul v-if="isInMemberDropShow" class="dropdown-menu member-drop" v-click-outside="hideAllDrop">
								<li v-for="list in memberList" v-on:click="selectMember(list)">
									<a>{{ list.name }}</a>
								</li>
							</ul>
						</div>
					</div>

					<div class="claim-form-div">
						<label>Health Partner</label>
						<div class="in-network-input-wrapper partner-input-wrapper">
							<input type="text" placeholder="Search Health Partner" v-model="inNetwork_data.health_partner" v-on:input="partnerInputChanged( inNetwork_data.health_partner )">

							<div v-if="isInPartnerDropShow" class="health-partner-drop" v-click-outside="hideAllDrop">
								<div v-for="list in filterBy(clinicList, inNetwork_data.health_partner)" class="health-partner-drop-row" v-on:click="selectHealthPartner( list )">
									<img :src="list.provider_image">
									<div class="partner-details">
										<p>{{ list.name }}</p>
										<p>{{ list.website_link }}</p>
										<p><span>{{ list.phone_no }}</span></p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="claim-form-div">
						<label>Service</label>
						<div class="in-network-input-wrapper service-input-wrapper">
							<input type="text" placeholder="Search Service" v-model="inNetwork_data.service_text" v-on:click="toggleServiceDrop()" readonly>
							<ul v-if="isInServiceDropShow" class="dropdown-menu" v-click-outside="hideAllDrop">
								<li v-for="(list, index) in serviceList" >
									<a v-on:click="selectService( list, index )">{{ list.service_name }}</a>
									<a v-show="list.selected" class="rmv-service" v-on:click="removeService( list, index )"><i class="fa fa-times"></i></a>
								</li>
								<li v-if="serviceList.length == 0">
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
								v-model="inNetwork_data.visit_date"
								:input-props='{class: "vDatepicker start-date-input", placeholder: "DD/MM/YYYY", readonly: true, }'
								popover-visibility="focus"
								:formats="formats"
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
							<input type="text" v-model="inNetwork_data.visit_time" v-on:click="toggleVisitTimeDrop()" >
							<div class="am-pm-container" v-on:click="toggleDayTimeDrop()">
								<span>{{ inNetwork_data.daytime }}</span>
								<i class="fa fa-caret-down"></i>
							</div>

							<div v-if="isInVisitTimeDropShow" class="dropdown-menu timepicker-drop" v-click-outside="hideAllDrop">
								<div class="time-wrapper">
									<div class="hour">
										<div class="hour-up-now" v-on:click="timeHour(true)">
											<i class="fa fa-chevron-up"></i>
										</div>
										<div class="hour-value">
											<span>{{ timePickerValues.hour < 10 ? '0' : null }}{{ timePickerValues.hour }}</span>
										</div>
										<div class="hour-up-now" v-on:click="timeHour(false)">
											<i class="fa fa-chevron-down"></i>
										</div>
									</div>
									<div class="middle">
										<span>:</span>
									</div>
									<div class="minute">
										<div class="hour">
											<div class="hour-up-now" v-on:click="timeMinute(true)">
												<i class="fa fa-chevron-up"></i>
											</div>
											<div class="hour-value">
												<span>{{ timePickerValues.minute < 10 ? '0' : null }}{{ timePickerValues.minute }}</span>
											</div>
											<div class="hour-up-now" v-on:click="timeMinute(false)">
												<i class="fa fa-chevron-down"></i>
											</div>
										</div>
									</div>
								</div>
							</div>

							<ul v-if="isInDayTimeDropShow" class="dropdown-menu daytime-drop" v-click-outside="hideAllDrop">
								<li v-on:click="selectDayTime('AM')"><a>AM</a></li>
								<li v-on:click="selectDayTime('PM')"><a>PM</a></li>
							</ul>
						</div>
					</div>

					<div class="claim-form-div">
						<label>Payment Type</label>
						<div class="in-network-input-wrapper payment-type-input-wrapper">
							<span v-on:click="togglePaymentTypeDrop()">
								<input type="text" v-model="inNetwork_data.payment_type" readonly>
								<div class="caret-down-container">
									<i class="fa fa-caret-down"></i>
								</div>
							</span>

							<ul v-if="isInPaymentTypeDropShow" class="dropdown-menu" v-click-outside="hideAllDrop">
								<li v-on:click="selectPaymentType('credits')"><a>Credit</a></li>
								<li v-on:click="selectPaymentType('cash')"><a>Cash</a></li>
							</ul>
						</div>
					</div>

					<div class="claim-form-div">
						<label>Amount</label>
						<div class="in-network-input-wrapper">
							<input type="text" placeholder="Enter Amount" v-model="inNetwork_data.amount">
						</div>
					</div>
				</div>
			</div>
			<div class="in-network-btn-footer">
				<button v-on:click="toggleSummaryModal( )" class="btn-submit" 
					:disabled="!inNetwork_data.member || !inNetwork_data.health_partner || !inNetwork_data.service || !inNetwork_data.visit_date || !inNetwork_data.visit_time || !inNetwork_data.payment_type || inNetwork_data.amount == '' "
				>Submit</button>
			</div>
		</div>

		<div v-if="showOutNetwork" class="out-network-box">
			<div class="network-header-container">
				<h5>OUT-OF-NETWORK</h5>
				<i v-on:click="toggleShowOutNetwork('cancel')" class="fa fa-times"></i>
			</div>
			<div class="out-of-network-form-wrapper">
				<div class="out-of-network-form">
					<div v-if="out_step_active == 1" class="step-one">
						<div class="input-group">
							<label>Spending Account <span class="required">*</span></label>
							<div class="input-wrapper spending-type-box">
								<button v-on:click="selectSpendingType('medical')" v-bind:class="{'active': outNetwork_data.spending_type == 'medical' }" 
								class="btn-medical">Medical</button>
								<button v-on:click="selectSpendingType('wellness')" v-bind:class="{'active': outNetwork_data.spending_type == 'wellness' }" 
								class="btn-medical">Wellness</button>
							</div>
						</div>
						<div class="input-group">
							<label>Claim Type <span class="required">*</span></label>
							<div class="input-wrapper claim-type-input-wrapper">
								<input v-on:click="toggleClaimTypeDrop()" type="text" v-model="outNetwork_data.claim_type" readonly>
								<i class="fa fa-caret-down"></i>
								<ul v-if="isOutClaimDropShow" class="dropdown-menu" v-click-outside="hideAllDrop">
									<li v-for="list in claimTypeList" v-on:click="selectClaimType(list)"><a>{{ list.name }}</a></li>
								</ul>
							</div>
						</div>
						<div class="input-group">
							<label>Provider <span class="required">*</span></label>
							<div class="input-wrapper">
								<input type="text" placeholder="Mednefits Pte LTd" v-model="outNetwork_data.provider">
							</div>
						</div>
						<div class="input-group">
							<label>Visit Date <span class="required">*</span></label>
							<div class="input-wrapper visit-date-input-wrapper">
								<v-date-picker
	                  popoverDirection="bottom"
	                  v-model="outNetwork_data.visit_date"
	                  :input-props='{class: "vDatepicker start-date-input", placeholder: "DD/MM/YYYY", readonly: true, }'
	                  popover-visibility="focus"
										:formats="formats"
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
								<input v-on:click="toggleVisitTimeDrop()" type="text" v-model="outNetwork_data.visit_time">
								<div v-on:click="toggleDayTimeDrop()" class="am-pm-container">
									<span>{{ outNetwork_data.daytime }}</span>
									<i class="fa fa-caret-down"></i>
								</div>

								<div v-if="isOutVisitTimeDropShow" class="time-opt-wrapper" v-click-outside="hideAllDrop">
									<div class="time-wrapper">
										<div class="hour">
											<div class="hour-up-now" v-on:click="timeHour(true)">
												<i class="fa fa-chevron-up"></i>
											</div>
											<div class="hour-value">
												<span>{{ timePickerValues.hour < 10 ? '0' : null }}{{ timePickerValues.hour }}</span>
											</div>
											<div class="hour-up-now" v-on:click="timeHour(false)">
												<i class="fa fa-chevron-down"></i>
											</div>
										</div>
										<div class="middle">
											<span>:</span>
										</div>
										<div class="minute">
											<div class="hour">
												<div class="hour-up-now" v-on:click="timeMinute(true)">
													<i class="fa fa-chevron-up"></i>
												</div>
												<div class="hour-value">
													<span>{{ timePickerValues.minute < 10 ? '0' : null }}{{ timePickerValues.minute }}</span>
												</div>
												<div class="hour-up-now" v-on:click="timeMinute(false)">
													<i class="fa fa-chevron-down"></i>
												</div>
											</div>
										</div>
									</div>
								</div>

								<ul v-if="isOutDayTimeDropShow" class="daytime-opt" v-click-outside="hideAllDrop">
									<li v-on:click="selectDayTime('AM')"><a>AM</a></li>
									<li v-on:click="selectDayTime('PM')"><a>PM</a></li>
								</ul>
							</div>
						</div>
						<div class="input-group">
							<label>Claim Amount <span class="required">*</span></label>
							<div class="input-wrapper currency-input-wrapper">
								<input type="text" placeholder="Price" v-model="outNetwork_data.claim_amount">
								<div v-on:click="toggleCurrencyDrop()" class="currency-container">
									<span class="txt-transform-uppercase">{{ outNetwork_data.currency }}</span>
									<i class="fa fa-caret-down"></i>
								</div>

								<ul v-if="isOutCurrencyDropShow" class="currency-opt" v-click-outside="hideAllDrop">
									<li v-on:click="selectCurrency('sgd')"><a>SGD</a></li>
									<li v-on:click="selectCurrency('myr')"><a>MYR</a></li>
								</ul>
							</div>
						</div>
						<div class="input-group">
							<label>Member <span class="required">*</span></label>
							<div class="input-wrapper member-input-wrapper">
								<input v-on:click="toggleMemberDrop()" type="text" v-model="outNetwork_data.member" readonly>
								<i class="fa fa-caret-down"></i>

								<ul v-if="isOutMemberDropShow" class="dropdown-menu">
									<li v-for="list in memberList" v-on:click="selectMember(list)">
										<a>{{ list.name }}</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div v-if="out_step_active == 2" class="step-two">
						<div class="drop-box">
							<input ref="receiptUploader" type="file" v-on:change="uploadReceipts($event.target.files);">
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
							<div class="progress-wrapper" v-for="(img,index) in uploading_files">
								<div class="icon-img">
									<img v-if="img.type == 'image/png' || img.type == 'image/jpeg'" :src="'../assets/img/file-types/Receipt-png.png'" style="width: 30px;">
									<img v-if="img.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'" :src="'../assets/img/file-types/Receipt-doc-xls.png'" style="width: 30px;">
									<img v-if="img.type == 'application/pdf'" :src="'../assets/img/file-types/Receipt-pdf.png'" style="width: 30px;">
									<img v-if="img.type != 'image/png' && img.type != 'image/jpeg' && img.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && img.type != 'application/pdf'" :src="'../assets/img/file-types/Receipt-png.png'" style="width: 30px;">
								</div>
								<div class="progress-bar-container">
									<div class="file-info-container">
										<span>{{ !img.name ? '' : img.name.length < 13 ? img.name : img.name.substring(0,13) + "..."}}</span>
										<span class="file-size"><span>{{ img.size / 1000 }}</span>mb</span>
										<span v-on:click="removeReceipt(index)"><i class="fa fa-times"></i></span>	
									</div>
									<div class="progress-bar"> 
										<div v-show="img.uploading == 20" class="progress" style="width: 20%;"></div>
										<div v-show="img.uploading == 60" class="progress progress-error" style="width: 60%;"></div>
										<div v-show="img.uploading == 100" class="progress" style="width: 100%;"></div>
									</div>
									<div class="file-status-container">
										<span v-if="img.uploading == 100 && !img.error" class="file-status">Completed.</span>
										<span v-if="img.uploading < 100 && !img.error" class="file-status">Uploading...</span>
										<span v-if="img.error == true" class="file-status">Invalid file.</span>
									</div>
								</div>
							</div>
						</div>	
					</div>
					<div v-if="out_step_active == 3" class="step-three">
						<div class="summary-list">
							<div class="summary-list-row">
								<div class="summary-label">
									<label>Spending type*</label>
								</div>
								<div class="label-item">
									<span>{{ outNetwork_data.spending_type }}</span>
								</div>
							</div>
							<div class="summary-list-row">
								<div class="summary-label">
									<label>Item/Service*</label>
								</div>
								<div class="label-item">
									<span>{{ outNetwork_data.claim_type }}</span>
								</div>
							</div>
							<div class="summary-list-row">
								<div class="summary-label">
									<label>Merchant*</label>
								</div>
								<div class="label-item">
									<span>{{ outNetwork_data.provider }}</span>
								</div>
							</div>
							<div class="summary-list-row">
								<div class="summary-label">
									<label>Visit Date*</label>
								</div>
								<div class="label-item">
									<span>{{ formatDate( outNetwork_data.visit_date, null, 'MMMM DD, YYYY' ) }}</span>
								</div>
							</div>
							<div class="summary-list-row">
								<div class="summary-label">
									<label>Visit Time*</label>
								</div>
								<div class="label-item">
									<span>{{ outNetwork_data.visit_time }} {{ outNetwork_data.daytime }}</span>
								</div>
							</div>
							<div class="summary-list-row">
								<div class="summary-label">
									<label>Claim Amount*</label>
								</div>
								<div class="label-item">
									<span><span class="txt-transform-uppercase">{{ outNetwork_data.currency }}</span> {{ outNetwork_data.claim_amount }}</span>
								</div>
							</div>
							<div class="summary-list-row">
								<div class="summary-label">
									<label>Member*</label>
								</div>
								<div class="label-item">
									<span>{{ outNetwork_data.member }}</span>
								</div>
							</div>
							<div class="summary-list-row">
								<div class="summary-label">
									<label>Receipt*</label>
								</div>
								<div class="label-item">
									<span v-for="img in outNetwork_data.receipts" class="img-wrapper">
										<img v-if="img.type == 'image/png' || img.type == 'image/jpeg'" :src="img.fake" style="">
										<img v-if="img.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'" :src="'../assets/img/file-types/Receipt-doc-xls.png'">
										<img v-if="img.type == 'application/pdf'" :src="'../assets/img/file-types/Receipt-pdf.png'">
										<img v-if="img.type != 'image/png' && img.type != 'image/jpeg' && img.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && img.type != 'application/pdf'" :src="'../assets/img/file-types/Receipt-png.png'">
									</span>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div class="next-btn-footer">
					<button v-if="outNetwork_data.isUpdate" v-on:click="submitOutnNetwork( outNetwork_data )" class="btn-submit">UPDATE</button>
					<span v-if="!outNetwork_data.isUpdate">
						<button v-if="out_step_active > 1" v-on:click="outStepButton('back')" class="btn-submit btn-back">BACK</button>
						<button v-if="out_step_active < 3" v-on:click="outStepButton('next')" class="btn-submit">Next</button>
						<button v-if="out_step_active == 3" v-on:click="submitOutnNetwork( outNetwork_data )" class="btn-submit">SUBMIT</button>
					</span>
				</div>
			</div>
		</div>		




		<div>
			<Modal v-if="inNetworkClaimSummaryModal" class="employee-details-options in-network-claim-container">
				<div slot="header">
					<h1>In Network Claim Summary</h1>
				</div>
				<div slot="body">
					<div class="network-summary-row">
						<label>Health Partner</label>
						<span>{{ inNetwork_data.health_partner }}</span>
					</div>
					<div class="network-summary-row">
						<label>Services</label>
						<span>{{ inNetwork_data.service_text }}</span>
					</div>
					<div class="network-summary-row">
						<label>Date of Visit</label>
						<span>{{ formatDate( inNetwork_data.visit_date, null, 'DD MMMM, YYYY' ) }}</span>
					</div>
					<div class="network-summary-row">
						<label>Time of Visit</label>
						<span>{{ inNetwork_data.visit_time }} {{ inNetwork_data.daytime }}</span>
					</div>
					<div class="network-summary-row">
						<label>Payment Type</label>
						<span class="txt-transform-capitalize">{{ inNetwork_data.payment_type }}</span>
					</div>
					<div class="network-summary-row">
						<label>Amount</label>
						<span><span class="txt-transform-uppercase">{{ $parent.$data.employee_side_info.currency_type }} </span>{{ inNetwork_data.amount }}</span>
					</div>
				</div>
				<div slot="footer">
					<label>
	          <input type="checkbox" v-model="inNetwork_data.send_receipt"> Send Email Receipt
	        </label>

					<button v-on:click="toggleSummaryModal()" class="btn-close">CANCEL</button>
	  			<button class="btn-primary settings-btn-submit" v-on:click="submitInNetwork( inNetwork_data )">CONFIRM</button>
				</div>
			</Modal>

		</div>
	</div>
</template>

<script>
	import claimSubmission from '@/components/corporates/employee/claimSubmission.vue'
	export default claimSubmission
</script>
