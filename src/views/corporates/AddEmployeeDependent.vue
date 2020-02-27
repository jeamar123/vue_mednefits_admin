<template>
  <div class="add-dependent-wrapper">
    <div v-if="false" class="dp-flex-ai">
      <h2 class="fs-18">Excel Import</h2>
      <div class="flex-1">
        <button class="btn-gray-with-shadow download-emp-list-btn"><img :src="'../assets/img/download_emp.png'">DEPENDENT ONLY</button>
      </div>
    </div>
    <div v-if="true">
      <h2 class="fs-18">Preview Result</h2>
    </div>
    <div v-if="true" class="drop-box-wrapper">
      <div class="drop-box">
        <input type="file">
        <img :src="'../assets/img/Upload-Receipt.png'">
        <div class="selected-file"></div>
        <div>Drop .xlxs file here or click to upload</div>
      </div>
    </div>
    <div v-if="false" class="add-dependent-tbl-wrapper">
      <div class="add-dependent-tbl-container">
        <table class="add-dependent-tbl">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Dependent</th>
              <th>Relationship</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alla Cheam</td>
              <td>Unique</td>
              <td>Spouse</td>
              <td>New Account</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="add-dependent-footer">
      <button class="btn-gray-with-shadow">UPLOAD</button>
    </div>
  </div>
</template>

<script>
	import addEmployeeDependent from '@/components/corporates/addEmployeeDependent'
	export default addEmployeeDependent
</script>