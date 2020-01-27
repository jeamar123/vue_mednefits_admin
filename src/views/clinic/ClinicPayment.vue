<template>
	<div class="clinic-discount-wrapper">
		<div class="payment-details-wrapper">
			<p class="box-title">Payment Details</p>
			<div class="white-space-20"></div>
			<div class="details-box">
				<label>Company Name:</label>
				<p>Sophia Goh</p>
			</div>
			<div class="details-box">
				<label>Billing Address:</label>
				<p>79 Anson Road #21-01, Singapore 079906</p>
			</div>
			<div class="details-box">
				<label>Bank Account Type:</label>
				<p>DBS (Bank code: 7171)</p>
			</div>
			<div class="details-box">
				<label>Bank Account Number:</label>
				<p>014-3-053781</p>
			</div>
		</div>
		<div class="discount-wrapper">
			<p class="box-title">Update Clinic Discount</p>
			<div class="white-space-20"></div>
			<p>Clinic Type : <span>Wellness</span></p>
			<div class="white-space-20"></div>
			<form>
				<div class="form-div">
					<label>Clinic Discount</label>
					<input type="number">
				</div>
				<div class="form-div">
					<label>Mednefits Fee (Payable to Clinics)</label>
					<input type="number">
				</div>
				<div class="form-div">
					<label>(With GST SGD13.91)</label>
					<label class="input-radio">GST
					  <input type="radio" name="gst">
					  <span class="input-radio-checkmark"></span>
					</label>
					<label class="input-radio">Non-GST
					  <input type="radio" name="gst">
					  <span class="input-radio-checkmark"></span>
					</label>
				</div>
				<div class="form-div">
					<label>Consultation Fee (Charged to Customers)</label>
					<input type="number">
				</div>
				<div class="form-div">
					<label>(With GST SGD13.91)</label>
					<label class="input-radio">GST
					  <input type="radio" name="gst">
					  <span class="input-radio-checkmark"></span>
					</label>
					<label class="input-radio">Non-GST
					  <input type="radio" name="gst">
					  <span class="input-radio-checkmark"></span>
					</label>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import clinicPayment from '@/components/clinic/clinicPayment';
	export default clinicPayment;
</script>