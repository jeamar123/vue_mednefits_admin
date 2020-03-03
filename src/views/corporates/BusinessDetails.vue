<template>
	<div class="business-details-wrapper">
    <div class="columns">
			<div class="column">
				<h1>Company Information</h1>
				<div class="form-box">
					<label>Company Name*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label>Company Address*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label>Postal Code*</label>
					<input type="text">
				</div>
			</div>
			<div class="column">
				<h1>Clinic Peak Status</h1>
			</div>
			<div class="column">
				<h1>HR Account Status</h1>
			</div>
		</div>


		<div class="btn-container">
			<button class="btn-primary">Add More Contact</button>
			<button class="btn-primary">Update</button>
		</div>
	</div>
</template>

<script>
	import businessDetails from '@/components/corporates/businessDetails'
	export default businessDetails
</script>