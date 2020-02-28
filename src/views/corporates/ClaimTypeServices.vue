<template>
  <div class="claim-type-services-wrapper">
    <div class="dp-flex-ai claim-type-header">
      <h1 class="flex-1 fs-20">E-Claim - Claim Type Services</h1>
      <img @click="___openClaimTypesModal('add')" :src="'../assets/img/plus-gray.png'">
    </div>
    <div class="claim-type-tbl-wrapper">
      <div class="claim-type-tbl-container">
        <table>
          <thead>
            <tr>
              <th>Claim Type</th>
              <th>Spending Account</th>
              <th>Cap Claim Account</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="x in 7" :key="x.index">
              <td>General Practice Practice</td>
              <td>medical</td>
              <td>0</td>
              <td>
                <span>
                  <button @click="___openClaimTypesModal('update')" class="btn-primary">EDIT</button>
                  <button class="btn-primary">REMOVE</button>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Modal v-if="global_showClaimTypeModal" class="employee-details-options claim-type-modal">
      <div slot="header">
        <h1 v-if="global_updateClaimType">Update Claim Type</h1>
        <h1 v-if="global_addClaimType">Add Claim Type</h1>
      </div>
      <div slot="body">
        <div class="dp-flex claim-type-container">
          <div>
            <div class="settings-input-wrapper">
              <label>Claim Type*</label>
              <input type="text">
            </div>
            <div class="settings-input-wrapper">
              <label>Cap Claim Amount*</label>
              <input type="text">
            </div>
          </div>
          <div>
            <h4>Spending Account Type</h4>
            <div class="custom-checkbox-selector">
              <label class="selector-container">
                <span>Medical</span>
                <input value="0" type="radio" name="radio">
                <span class="custom-checkbox-checkmark"></span>
              </label>
              <label class="selector-container">
                <span>Wellness</span>
                <input value="1" type="radio" name="radio">
                <span class="custom-checkbox-checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button @click="___openClaimTypesModal()" class="btn-close">CANCEL</button>
        <button v-if="global_updateClaimType" class="btn-primary">UPDATE</button>
        <button v-if="global_addClaimType" class="btn-primary">ADD</button>
      </div>
    </Modal>
    
  </div>
</template>

<script>
	import claimTypeServices from '@/components/corporates/claimTypeServices'
	export default claimTypeServices
</script>