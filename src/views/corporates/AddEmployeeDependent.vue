<template>
  <div class="add-dependent-wrapper">
    <div v-if="!global_isShowPreview" class="dp-flex-ai">
      <h2 class="fs-18">Excel Import</h2>
      <div class="flex-1">
        <button class="btn-gray-with-shadow download-emp-list-btn" v-on:click="_downloadEmpDepExcel_()"><img :src="'../assets/img/download_emp.png'">DEPENDENT ONLY</button>
      </div>
    </div>
    <div v-if="global_isShowPreview">
      <h2 class="fs-18">Preview Result</h2>
    </div>
    <div v-if="!global_isShowPreview" class="drop-box-wrapper">
      <div class="drop-box">
        <input ref="excelUploader" type="file" v-on:change="_setUploadFile_($event.target.files);">
        <img :src="'../assets/img/Upload-Receipt.png'">
        <div class="selected-file">{{ global_uploadFile.name }}</div>
        <div>Drop .xlxs file here or click to upload</div>
      </div>
    </div>
    <div v-if="global_isShowPreview" class="add-dependent-tbl-wrapper">
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
          <tbody v-for="(list, index) in global_empDepList" :key="list.index">
            <tr v-for="dep in list.dependents">
              <td>{{ index == 0 ? list.employee_name : '' }}</td>
              <td>{{ dep.dependent_name }}</td>
              <td>{{ dep.relationship }}</td>
              <td>{{ dep.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="!global_isShowPreview" class="add-dependent-footer">
      <button class="btn-gray-with-shadow" :disabled="!global_uploadFile.name" v-on:click="_uploadEmployeeDependentExcel_()">UPLOAD</button>
    </div>
  </div>
</template>

<script>
	import addEmployeeDependent from '@/components/corporates/addEmployeeDependent'
	export default addEmployeeDependent
</script>