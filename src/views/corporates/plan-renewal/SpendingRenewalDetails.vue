<template>
	<div class="spending-renewal-wrapper">
		<div class="dp-flex-ai">
			<div class="rollover-wrapper flex-1">
				<span>Rollover</span>
				<span class="rollover-selector-container">
					<select v-on:change="_rolloverChange_(global_isRollover)" v-model="global_isRollover">
						<option value="no">No</option>
						<option value="yes">Yes</option>
					</select>
					<img :src="'../assets/img/down-arrow.svg'">
				</span>
			</div>
			<div class="sub-details-header dp-flex-ai">
				<div><img :src="'../assets/img/download_emp.png'"></div>
				<div @click="_fileUploadModal_()"><img :src="'../assets/img/Import icon.svg'"></div>
				<div>
					<button class="btn-primary">Save</button>
				</div>
			</div>
		</div>
		<div class="spending-renewal-tbl-wrapper">
			<div class="spending-renewal-tbl-container">
				<table class="spending-tbl">
					<thead v-if="global_isRollover == 'yes'">
						<tr class="spending-row-1">
							<th rowspan="2"></th>
							<th rowspan="2">Member ID</th>
							<th rowspan="2">
								<span>Full Name</span>
							</th>
							<th rowspan="2">Start Date</th>
							<th colspan="3" class="medical-text">MEDICAL</th>
							<th colspan="3" class="wellness-text">WELLNESS</th>
						</tr>
						<tr v-if="global_isRollover == 'yes'" class="spending-row-2">
							<th>Entitlement</th>
							<th class="rollover-col">Rollover</th>
							<th>Allocated Credits</th>
							<th>Entitlement</th>
							<th class="rollover-col">Rollover</th>
							<th>Allocated Credits</th>
						</tr>
					</thead>
					<thead v-if="global_isRollover == 'no'">
						<tr>
							<th></th>
							<th>Member ID</th>
							<th>Name</th>
							<th>Start Date</th>
							<th>Medical Entitlement</th>
							<th>Wellness Entitlement</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="( list,index ) in get_spending_data">
							<td>
								<div class="option-selector">
									<img :src="'../assets/img/dots.png'">
									<!-- <div v-if="false" class="remove-emp-selector-container">
										<li>
											<a>
												<span>Remove Employee</span>
												<span>(hold the seat)</span>
											</a>
										</li>
										<li>
											<a>
												<span>Remove Employee</span>
												<span>(remove the seat)</span>
											</a>
										</li>
									</div> -->
								</div>
							</td>
							<td>
								<div>{{ list.id }}</div>
							</td>
							<td>
								<div>{{ list.name }}</div>
							</td>
							<td>
								<div>{{ list.start_date }}</div>
							</td>
							<!-- <td v-if="global_isRollover == 'no'">
								<div @click="toggleTableInput()">{{ list.medical_entitlement }}</div>
								<input v-if="false" type="number">
							</td>
							<td v-if="global_isRollover == 'no'">
								<div>{{ list.wellness_entitlement }}</div>
								<input v-if="false" type="number">
							</td> -->
							<td v-if="global_isRollover == 'yes' || global_isRollover == 'no' ">
								<div @click="_toggleTableInput_( index, 0, 4 )" v-if="!list.activeInput[0]">{{ list.medical_entitlement }}</div>
								<input v-if="list.activeInput[0]" class="renewal-input" type="text">
							</td>
							<td v-if="global_isRollover == 'yes'" class="rollover-col">{{ list.medical_rollover_amount }}</td>
							<td v-if="global_isRollover == 'yes'">{{ list.medical_allocated_credits }}</td>
							<td v-if="global_isRollover == 'yes' || global_isRollover == 'no' ">
								<div @click="_toggleTableInput_( index, 1, 6 )" v-if="!list.activeInput[1]">{{ list.medical_entitlement }}</div>
								<input v-if="list.activeInput[1]" class="renewal-input" type="text">
							</td>
							<td v-if="global_isRollover == 'yes'" class="rollover-col">{{ list.wellness_rollover_amount }}</td>
							<td v-if="global_isRollover == 'yes'">{{ list.wellness_allocated_credits }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="plan-renewal-footer dp-flex">
			<div class="custom-pagination-container flex-1">
				<div class="custom-pagination">
					<div class="page-wrapper">
						<div class="page-scroll-container">
							<span class="prev-next-container">  
								<i class="fa fa-angle-left"></i> 
								<span>Prev</span>
							</span>
							<div class="pages-list">
								<span class="page-num active">1</span>
								<!-- <span v-show="page_active > 6" style="margin-left: -10px;">...</span> -->

								<!-- <span v-for="(list, index) of limitPagination" class="page-num" v-bind:class="{'active' : list + 1 == page_active}" v-on:click="goToPage( list + 1 )">{{ list + 1 }}</span> -->
								
								<!-- <span v-show="corporate_pagination.last_page > 10 && page_active < ( corporate_pagination.last_page - 5 )" style="margin-right: -5px;">...</span> -->
								<!-- <span class="page-num" v-show="corporate_pagination.last_page > 10 && page_active < ( corporate_pagination.last_page - 5 )" v-on:click="goToPage( corporate_pagination.last_page )">{{ corporate_pagination.last_page }}</span> -->
							</div>
							<span class="prev-next-container">  
								<span>Next</span>
								<i class="fa fa-angle-right"></i> 
							</span>
						</div>
					</div>
					<div class="custom-list-per-page">
						<span><span>10</span> per page</span>
						<span>  
							<i class="fa fa-caret-down"></i>
						</span>
						<div class="opened-per-page-scroll" v-if="false">
							<span v-on:click="setPageLimit( 10 )">10 per page</span>
							<span v-on:click="setPageLimit( 25)">25 per page</span>
							<span v-on:click="setPageLimit( 50 )">50 per page</span>
							<span v-on:click="setPageLimit( 100 )">100 per page</span>
						</div>
					</div>
				</div>
				<div class="subtext-rollover">
					<p>* Credit Rollover is subjected to change based on Credit Balance.</p>
					<p>* Total Allocated Medical/Wellness Credit is subjected to change based on Credit Rollover</p>
				</div>
			</div>
			<div>
				<div class="total-number-container dp-flex-ai">
					<span>Company Allocated Medical Credits</span>
					<div class="total-number-box dp-flex-ai">96</div>
				</div>
				<div class="total-number-container dp-flex-ai">
					<span>Company Allocated Wellness Credits</span>
					<div class="total-number-box dp-flex-ai">2</div>
				</div>
			</div>
		</div>

		<Modal v-if="global_showFileUpload" class="file-upload-modal">
			<div slot="header" class="dp-flex-ai">
				<h4>File Uploader</h4>
				<img @click="_fileUploadModal_()" :src="'../assets/img/cancel.png'">
			</div>
			<div slot="body">
				<div class="drop-box dp-flex" >
					<div>
						<div class="drop-file-upload dp-flex-ai">
							<input ref="excelUploader" type="file" class="upload-file">
							<img :src="'../assets/img/fileupload.png'">
							<span>Drop a file to upload, or </span>
							<button class="btn-primary">Browse</button>
						</div>
						<div v-if="false">
							<div class="progress-wrapper">
								<span>
									<i class="fa fa-file-o"></i>
									<!-- <span>Empoyee Cap.xls</span> -->
									<!-- <span>{{ global_selectedFile.name }}</span> -->
								</span>
								<div>
									<!-- <div v-show="global_selectedFile.uploading == 100 || global_selectedFile.uploading == 10" class="progress-bar" v-bind:class="{error : global_selectedFile.uploading == 10, success : global_selectedFile.uploading == 100}"></div> -->
								</div>
							</div>
							<div v-if="false" class="cap-file-err">Excel is invalid format. Please download the recommended file for Employee Cap Per Visit.</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button @click="___uploadGpCapPerVisit( global_selectedFile )" class="btn-primary">Upload</button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import spendingRenewalDetails from '@/components/corporates/plan-renewal/spendingRenewalDetails'
	export default spendingRenewalDetails
</script>