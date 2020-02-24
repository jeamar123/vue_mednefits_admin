<template>
	<div class="enrollment-excel-import-container">
		<div class="excel-header">
      <label>Excel Import</label>
      <div class="download-btn-container">
        <button class="btn">
          <img :src="'../assets/img/download_emp.png'">
          Employee Only
        </button>
        <button class="btn">
          <img :src="'../assets/img/download_emp.png'">
          Employee + Dependents
        </button>
      </div>
    </div>

    <div class="drop-upload-container">
      <input type="file">
      <img :src="'../assets/img/upload-receipt.png'" class="drop-img">
      <p class="filename"></p>
      <p class="info-text">Drop .xlxs file here or click to upload</p>
    </div>
	</div>
</template>

<script>
	import enrollmentExcelImport from '@/components/corporates/enrollment/enrollmentExcelImport.vue'
	export default enrollmentExcelImport
</script>