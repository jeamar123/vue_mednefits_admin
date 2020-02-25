<template>
	<div class="enrollment-method-container">
		<h1>Pick your preferred enrollment method.</h1>

    <div class="columns enrollment-method-box txt-center">
      <div class="column excel-import-container">
        <!-- <button class="enrollment-method-btn" > -->
        <router-link tag="button" class="enrollment-method-btn" :to="{ name : 'EnrollmentExcelImport' }">
          <img :src="'../assets/img/excel.png'">
          <p class="text-center weight-700">EXCEL IMPORT</p>
        </router-link>
        <!-- </button> -->
        <div class="enrollment-method-btn-text">
          <p class="below-text download-below-text">Upload employee details in a<br>excel file using the template<br>provided by us in the next step</p>
        </div>
        
      </div>

      <div class="column web-input-container">
        <!-- <button class="enrollment-method-btn"> -->
        <router-link tag="button" class="enrollment-method-btn" :to="{ name : 'EnrollmentExcelImport' }">
          <img :src="'../assets/img/web-input.png'">
          <p class="text-center weight-700">WEB INPUT</p>
        </router-link>
        <!-- </button> -->
        <div class="enrollment-method-btn-text">
          <p class="below-text download-below-text">Input employee details<br>using our web enrollment form.</p>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	import enrollmentMethodOption from '@/components/corporates/enrollment/enrollmentMethodOption.vue'
	export default enrollmentMethodOption
</script>