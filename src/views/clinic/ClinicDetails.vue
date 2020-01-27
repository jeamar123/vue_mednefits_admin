<template>
	<div class="clinic-details-wrapper">
		<form>
			<div class="form-row">
				<div class="form-col">
					<div class="form-div">
						<label>Clinic Name</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div">
						<label>Login Email</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div com-email-form">
						<label class="input-checkbox">
						  <input type="checkbox">
						  <span class="input-text">Communication Email same as Login Email</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
					<div class="form-div">
						<label>Communication Email</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div">
						<label>Clinic Type</label>
						<select>
							<option></option>
							<option>A</option>
							<option>A</option>
							<option>A</option>
							<option>A</option>
						</select>
					</div>
					<div class="form-div">
						<label>MRT</label>
						<select>
							<option></option>
							<option>A</option>
							<option>A</option>
							<option>A</option>
							<option>A</option>
						</select>
					</div>
					<div class="form-div">
						<label>Phone</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div">
						<label>Opening</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div">
						<label>Currency Type</label>
						<select>
							<option></option>
							<option>A</option>
							<option>A</option>
							<option>A</option>
							<option>A</option>
						</select>
					</div>
					<div class="form-div">
						<label>Description</label>
						<input type="text" class="form-input">
					</div>
				</div>

				<div class="form-col">
					<div class="form-div">
						<label>Address</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div">
						<label>State</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div">
						<label>City</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div">
						<label>District</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div">
						<label>Postal Code</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div">
						<label>Country</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div bill-info-form">
						<p>Billing Information</p>
						<div class="white-space-10"></div>
						<label class="input-checkbox">
						  <input type="checkbox">
						  <span class="input-text">Same as Health Provider Details</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
					<div class="form-div">
						<label>Billing Name</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div">
						<label>Billing Address</label>
						<input type="text" class="form-input">
					</div>
				</div>

				<div class="form-col">
					<div class="form-div">
						<label>Latitude</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div">
						<label>Longitude</label>
						<input type="text" class="form-input">
					</div>
					<div class="form-div">
						<label>Select address from google map (optional)</label>
						<div class="form-map">
							map here
						</div>
					</div>
					
				</div>
			</div>

			<div class="form-btn-wrapper">
				<button class="btn btn-primary">Update</button>
			</div>
		</form>
	</div>
</template>

<script>
	import clinicDetails from '@/components/clinic/clinicDetails';
	export default clinicDetails;
</script>