<template>
	<div>
		<div class="gp-cap-per-wrapper">
			<div class="gp-cap-header">
				<div class="gp-cap-header-title">
					<h3>GP - Cap per Visit</h3>
				</div>
				<div class="dp-flex gp-header-btn">
					<img @click="___dowloadEmployeeDependent()" :src="'../assets/img/download_emp.png'">
					<img @click="___fileUploadModal()" :src="'../assets/img/Import icon.svg'">
					<button class="save-continue-btn">SAVE & CONTINUE</button>
				</div>
			</div>
			<div class="gp-cap-body">
				<div class="gp-cap-body-container">
					<table class="gp-cap-table-wrapper">
						<thead>
							<tr>
								<th>Member ID</th>
								<th>Name</th>
								<th>Cap per Visit</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(list, index) of global_getCapList" :key="list.index">
								<td>{{ list.memeber_id }}</td>
								<td>{{ list.fullname }}</td>
								<td>
									<div @click="___editTable( list, index )">
										<span>SGD </span>	
										<span v-if="global_showText && !global_showInput" >{{ list.cap_amount }}</span>
										<span v-if="global_showInput">
											<input type="text">
										<!-- <span v-if="global_showInput && global_selectedIndex == index">
											<input type="text" :value="list.amount"> -->
										</span>
										<!-- <span v-else>{{ list.amount }}</span> -->
									</div>
									<div v-if="false">
										<span>Not Applicable</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="gp-cap-pagination dp-flex">
					<div class="page-wrapper">
						<div class="page-scroll-container dp-flex-ai">
							<span @click="___prevPage()">
								<i class="fa fa-angle-left"></i>
								<span class="prev-page">Prev</span>
							</span>
							<div>
								<span v-for="(list,index) of ___limitPagination" class="gp-page-num" v-bind:class="{'active' : list + 1 == page_active}" v-on:click="goToPage( list + 1 )">{{ list + 1 }}</span>
							</div>
							<span @click="___nextPage()">
								<span class="prev-page">Next</span>
								<i class="fa fa-angle-right"></i>
							</span>
						</div>
					</div>
					<div class="rows-page-wrapper">
						<span @click="___selectedCapPerPage()">10 per page <span><i class="fa fa-caret-down"></i></span></span>
						<div v-click-outside="___hideAllDrop" v-if="global_showCapDp" class="page-dp-container">
							<div @click="___setPageLimit(10)">10</div>
							<div @click="___setPageLimit(20)">20</div>
							<div @click="___setPageLimit(30)">30</div>
							<div @click="___setPageLimit(40)">40</div>
							<div @click="___setPageLimit(50)">50</div>
							<div @click="___setPageLimit(60)">60</div>
						</div>
					</div>
				</div>	
		</div>
		<Modal v-if="global_showFileUpload" class="file-upload-modal">
			<div slot="header" class="dp-flex-ai">
				<h4>File Uploader</h4>
				<img @click="___fileUploadModal()" :src="'../assets/img/cancel.png'">
			</div>
			<div slot="body">
				<div class="drop-box dp-flex" >
					<div>
						<div class="drop-file-upload dp-flex-ai">
							<input ref="excelUploader" type="file" class="upload-file" v-on:change="___uploadGpCapChanged($event.target.files);">
							<img :src="'../assets/img/fileupload.png'">
							<span>Drop a file to upload, or </span>
							<button class="btn-primary">Browse</button>
						</div>
						<div v-if="global_selectedFile.name">
							<div class="progress-wrapper">
								<span>
									<i class="fa fa-file-o"></i>
									<!-- <span>Empoyee Cap.xls</span> -->
									<span>{{ global_selectedFile.name }}</span>
								</span>
								<div v-for="(img,index) in uploading_files">
									<div class="progress-bar"></div>
								</div>
							</div>
							<div v-if="uploadCapData == false" class="cap-file-err">Excel is invalid format. Please download the recommended file for Employee Cap Per Visit.</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button @click="___uploadGpCapPerVisit()" class="btn-primary">Upload</button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import gcapPerVisit from '@/components/corporates/gpcapPerVisit'
	export default gcapPerVisit
</script>