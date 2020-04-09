<template>
	<div class="member-details-wrapper">
		<div class="sub-details-header dp-flex-ai">
			<div><img :src="'../assets/img/download_emp.png'"></div>
			<div @click="_fileUploadModal_()"><img :src="'../assets/img/Import icon.svg'"></div>
			<div @click="_toggleAddSeatOptions_()" class="add-seat-wrapper">
				<img :src="'../assets/img/plus_add.png'">
				<div v-click-outside="_hideAllDrop_" v-if="global_isAddSeatDropShow" class="add-seat-container">
					<li>
						<a>
							<span>Add Seat</span>
						</a>
					</li>
					<li>
						<a>
							<span>Fill in Vacant Seat</span>
						</a>
					</li>
				</div>
			</div>
			<div>
				<button class="btn-primary">Save</button>
			</div>
		</div>
		<div class="member-details-selector">
			<button @click="_selectViewOpt_( 1 )" v-bind:class="{ 'active' : global_tblViewOpt == 1 }">Employee Details</button>
			<button @click="_selectViewOpt_( 2 )" v-bind:class="{ 'active' : global_tblViewOpt == 2 }">Dependent Details</button>
		</div>
		<div v-if="global_tblViewOpt == 1">
			<div class="employee-tbl-wrapper">
				<div class="employee-tbl-container">
					<table class="empl-tbl">
						<thead>
							<tr>
								<th></th>
								<th>Member ID</th>
								<th>Full Name</th>
								<th>Date of Birth</th>
								<th>Start Date</th>
								<th>Country Code</th>
								<th>Mobile Number</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(list,index) in employee_details_arr">
								<td>
									<div @click="_toggleOptions_(list)" class="option-selector">
										<img :src="'../assets/img/dots.png'">
										<div v-click-outside="_hideAllDrop_" v-if="list.isOptionsShow" class="remove-emp-selector-container">
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
										</div>
									</div>
								</td>
								<td>
									<div>{{ list.id }}</div>
								</td>
								<td>
									<div @click="_toggleTableInput_( index, 0 )"  v-if="!list.activeInput[0]">{{ list.fullname }}</div>
									<div v-if="list.activeInput[0]">
										<input type="text">
									</div>
								</td>
								<td>
									<div @click="_toggleTableInput_( index, 1 )" v-if="!list.activeInput[1]">{{ _formatDate_( list.dob, null,'DD MMM,YYYY' ) }}</div>
									<div v-if="list.activeInput[1]">
										<input type="text">
										<i class="fa fa-angle-down"></i>
									</div>
								</td>
								<td>
									<div @click="_toggleTableInput_( index, 2 )" v-if="!list.activeInput[2]">{{ _formatDate_( list.start_date, null,'DD MMM,YYYY' ) }}</div>
									<div v-if="list.activeInput[2]">
										<input type="text">
										<i class="fa fa-angle-down"></i>
									</div>
								</td>
								<td class="country-code-wrapper">
									<div @click="_toggleTableInput_( index, 3 )" v-if="!list.activeInput[3]">{{ list.country_code }}</div>
									<div v-if="list.activeInput[3]">
										<input type="text">
										<i class="fa fa-angle-down"></i>
									</div>
									<div v-if="list.activeInput[3]" class="tbl-custom-dropdown">
										<div class="select-num"> +60 </div>
									</div>
								</td>
								<td>
									<div @click="_toggleTableInput_( index, 4 )" v-if="!list.activeInput[4]">{{ list.mobile_number }}</div>
									<div v-if="list.activeInput[4]">
										<input type="text">
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="option-selector">
										<!-- <img :src="'../assets/img/dots.png'"> -->
									</div>
								</td>
								<td>
									<!-- <div>297</div> -->
								</td>
								<td>
									<div v-if="false">Llay Jk</div>
									<div>
										<input placeholder="Type in Employee's Name" type="text">
									</div>
								</td>
								<td>
									<div v-if="false">01/01/1970</div>
									<div>
										<input placeholder="DD/MM/YYY" type="text">
										<i class="fa fa-angle-down"></i>
									</div>
								</td>
								<td>
									<div v-if="false">01/12/2019</div>
									<div>
										<input placeholder="DD/MM/YYY" type="text">
										<i class="fa fa-angle-down"></i>
									</div>
								</td>
								<td>
									<div v-if="false">+65</div>
									<div>
										<input type="text">
										<i class="fa fa-angle-down"></i>
									</div>
								</td>
								<td>
									<div v-if="false">Llay Jk</div>
									<div>
										<input placeholder="Type in Phone Number" type="text">
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div v-if="global_tblViewOpt == 2">
			<div class="dependent-tbl-wrapper">
				<div class="dependent-tbl-container">
					<table class="dependent-tbl">
						<thead>
							<tr>
								<th></th>
								<th>Dependent Full Name</th>
								<th>Employee's Full Name</th>
								<th>Employee's ID</th>
								<th>Relationship</th>
								<th>Date of Birth</th>
								<th>Start Date</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div class="option-selector">
										<img :src="'../assets/img/dots.png'">
										<div v-if="false" class="remove-emp-selector-container">
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
										</div>
									</div>
								</td>
								<td>
									<div>Llay Jk</div>
									<div v-if="false">
										<input type="text">
									</div>
								</td>
								<td>
									<div>Llay Jk</div>
									<div v-if="false">
										<input type="text">
									</div>
								</td>
								<td class="employee-id-container">
									<div>297</div>
								</td>
								<td>
									<div>Child</div>
									<div v-if="false">
										<input type="text">
										<i class="fa fa-angle-down"></i>
									</div>
									<div v-if="false" class="tbl-custom-dropdown">
										<div class="select"> Parent</div>
										<div class="select"> Family</div>
									</div>
								</td>
								<td>
									<div>01/12/2019</div>
									<div v-if="false">
										<input type="text">
										<i class="fa fa-angle-down"></i>
									</div>
								</td>
								<td>
									<div>01/12/2019</div>
									<div v-if="false">
										<input type="text">
										<i class="fa fa-angle-down"></i>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="option-selector">
										<!-- <img :src="'../assets/img/dots.png'"> -->
									</div>
								</td>
								<td>
										<input placeholder="Type in Dependent's Name" type="text">
								</td>
								<td>
									<div v-if="false">Llay Jk</div>
									<div>
										<input placeholder="Tag Employee" type="text">
									</div>
								</td>
								<td class="employee-id-container">
									<div></div>
								</td>
								<td>
									<div v-if="false">Child</div>
									<div v-if="true">
										<input type="text">
										<i class="fa fa-angle-down"></i>
									</div>
									<div v-if="false" class="tbl-custom-dropdown">
										<div class="select"> Parent</div>
										<div class="select"> Family</div>
									</div>
								</td>
								<td>
									<div v-if="false">01/12/2019</div>
									<div>
										<input placeholder="DD/MM/YYYY" type="text">
										<i class="fa fa-angle-down"></i>
									</div>
								</td>
								<td>
									<div v-if="false">01/12/2019</div>
									<div>
										<input placeholder="DD/MM/YYYY" type="text">
										<i class="fa fa-angle-down"></i>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
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
					<div @click="_togglePerPage_()" class="custom-list-per-page">
						<span><span>10</span> per page</span>
						<span>  
							<i class="fa fa-caret-down"></i>
						</span>
						<div class="opened-per-page-scroll" v-click-outside="_hideAllDrop_" v-if="global_isPerPageShow">
							<span v-on:click="setPageLimit( 10 )">10 per page</span>
							<span v-on:click="setPageLimit( 25)">25 per page</span>
							<span v-on:click="setPageLimit( 50 )">50 per page</span>
							<span v-on:click="setPageLimit( 100 )">100 per page</span>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="total-number-container dp-flex-ai">
					<span>Total number of Seats</span>
					<div class="total-number-box dp-flex-ai">96</div>
				</div>
				<div class="total-number-container dp-flex-ai">
					<span>Total number of Employees</span>
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
	import memberDetails from '@/components/corporates/plan-renewal/memberDetails'
	export default memberDetails
</script>