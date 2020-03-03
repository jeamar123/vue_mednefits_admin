<template>
	<div class="corporate-details-wrapper">
    <div class="tab-container">
      <div class="tab active">Business Details</div>
      <div class="tab">Plan</div>
      <div class="tab">Credentials</div>
      <div class="tab">Spending Invoice</div>
    </div>
    <router-view name="childTab"></router-view>
	</div>
</template>

<script>
	import corporateDetails from '@/components/corporates/corporateDetails'
	export default corporateDetails
</script>