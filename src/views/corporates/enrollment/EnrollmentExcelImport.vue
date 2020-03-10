<template>
	<div class="enrollment-excel-import-container">
		<div class="excel-header">
      <label>Excel Import</label>
      <div class="download-btn-container">
        <button class="btn" v-on:click="_downloadExcelTemplate(true)">
          <img :src="'../../assets/img/download_emp.png'">
          Employee Only
        </button>
        <button class="btn" v-on:click="_downloadExcelTemplate(false)">
          <img :src="'../../assets/img/download_emp.png'">
          Employee + Dependents
        </button>
      </div>
    </div>

    <div class="drop-upload-container">
      <input ref="excelUploader" type="file" v-on:change="_uploadExcel_($event.target.files);">
      <img :src="'./assets/img/upload-receipt.png'" class="drop-img">
      <p class="filename">{{ global_uploadFile.name }}</p>
      <p class="info-text">Drop .xlxs file here or click to upload</p>
    </div>

    <div class="dp-flex">
      <div class="flex-1">
      </div>
      <div>
        <button class="btn-gray-with-shadow" :disabled="!global_uploadFile.name" v-on:click="_uploadfile_()">UPLOAD</button>
      </div>
    </div>
	</div>
</template>

<script>
	import enrollmentExcelImport from '@/components/corporates/enrollment/enrollmentExcelImport.vue'
	export default enrollmentExcelImport
</script>