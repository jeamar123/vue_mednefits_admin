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
            <tr v-for="list in global_claimTypes" :key="list.index">
              <td>{{ list.name }}</td>
              <td>{{ list.type }}</td>
              <td>{{ list.cap_amount }}</td>
              <td>
                <span>
                  <button @click="___openClaimTypesModal('update', list)" class="btn-primary">EDIT</button>
                  <button class="btn-primary" v-on:click="_removeClaimType_(list)">REMOVE</button>
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
              <input type="text" v-model="global_claimTypeData.name">
            </div>
            <div class="settings-input-wrapper">
              <label>Cap Claim Amount*</label>
              <input type="number" v-model="global_claimTypeData.cap_amount">
            </div>
          </div>
          <div>
            <h4>Spending Account Type</h4>
            <div class="custom-checkbox-selector">
              <label class="selector-container">
                <span>Medical</span>
                <input value="medical" type="radio" name="radio" v-model="global_claimTypeData.type">
                <span class="custom-checkbox-checkmark"></span>
              </label>
              <label class="selector-container">
                <span>Wellness</span>
                <input value="wellness" type="radio" name="radio" v-model="global_claimTypeData.type">
                <span class="custom-checkbox-checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button @click="___openClaimTypesModal()" class="btn-close">CANCEL</button>
        <button class="btn-primary" v-on:click="_addUpdateDeleteClaimType_()" :disabled="!global_claimTypeData.name || global_claimTypeData.cap_amount == '' || !global_claimTypeData.type">{{ global_updateClaimType ? 'UPDATE' : 'ADD' }}</button>
      </div>
    </Modal>
    
  </div>
</template>

<script>
	import claimTypeServices from '@/components/corporates/claimTypeServices'
	export default claimTypeServices
</script>