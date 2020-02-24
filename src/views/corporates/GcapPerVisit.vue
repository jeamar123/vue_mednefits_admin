<template>
	<div>
		<div class="gp-cap-per-wrapper">
			<div class="gp-cap-header">
				<div class="gp-cap-header-title">
					<h3>GP - Cap per Visit</h3>
				</div>
				<div class="dp-flex gp-header-btn">
					<img :src="'../assets/img/download_emp.png'">
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
							<tr v-for="(list, index) of global_getGpData" :key="list.index">
								<td>{{ list.id }}</td>
								<td>{{ list.name }}</td>
								<td>
									<div @click="___editTable( list, index )">
										<span>SGD </span>	
										<span v-if="global_showText && !global_showInput" >{{ list.amount }}</span>
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
							<span>
								<i class="fa fa-angle-left"></i>
								<span class="prev-page">Prev</span>
							</span>
							<div>
								<span class="gp-page-num active">1</span>
								<span class="gp-page-num">2</span>
								<span class="gp-page-num">3</span>
							</div>
							<span>
								<span class="prev-page">Next</span>
								<i class="fa fa-angle-right"></i>
							</span>
						</div>
					</div>
					<div class="rows-page-wrapper">
						<span>10 per page <span><i class="fa fa-caret-down"></i></span></span>
						<div v-if="false" class="page-dp-container">
							<div>10</div>
							<div>20</div>
							<div>30</div>
							<div>40</div>
							<div>50</div>
							<div>60</div>
							<div>70</div>
							<div>80</div>
							<div>90</div>
							<div>100</div>
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
				<div class="drop-box dp-flex">
					<div>
						<div class="drop-file-upload dp-flex-ai">
							<img :src="'../assets/img/fileupload.png'">
							<span>Drop afile to uload, or </span>
							<button class="btn-primary">Browse</button>
						</div>
						<div>
							<div class="progress-wrapper">
								<span>
									<i class="fa fa-file-o"></i>
									<span>Empoyee Cap.xls</span>
								</span>
								<div class="progress-bar error"></div>
							</div>
							<div class="cap-file-err">Excel is invalid format. Please download the recommended file for Employee Cap Per Visit.</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer">
				<button class="btn-primary">Upload</button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import gcapPerVisit from '@/components/corporates/gcapPerVisit'
	export default gcapPerVisit
</script>