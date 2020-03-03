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
				<div class="form-box">
					<div class="toggle-form">
						<div class="custom-toggle-container">
							<div class="toggle toggle-on active">
								<i class="fa fa-check"></i>
							</div>
							<div class="toggle toggle-off">
								<i class="fa fa-times"></i>
							</div>
						</div>
						<label>Peak Hour Status</label>
					</div>
				</div>
				<div class="white-space-10"></div>
				<div class="white-space-5"></div>
				<h1>Spending Invoice Notifcation</h1>
				<div class="form-box">
					<div class="toggle-form">
						<div class="custom-toggle-container">
							<div class="toggle toggle-on active">
								<i class="fa fa-check"></i>
							</div>
							<div class="toggle toggle-off">
								<i class="fa fa-times"></i>
							</div>
						</div>
						<label>Notifcation Status</label>
					</div>
				</div>
			</div>
			<div class="column">
				<h1>HR Account Status</h1>
				<div class="white-space-20"></div>
				<p>Status: Active</p>
				<div class="white-space-20"></div>
				<div class="white-space-20"></div>
				<button class="btn-primary">DEACTIVATE</button>
				<div class="white-space-20"></div>
			</div>
		</div>

		<div class="columns">
			<div class="column">
				<h1>Business Contact</h1>
				<div class="form-box">
					<label>First Name*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label>Last Name*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label>Email Address*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label>Phone Number*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label class="custom-checkbox">
						<input type="checkbox">
						Send Email for Communication related
						<span class="checkmark"></span>
					</label>
					<label class="custom-checkbox">
						<input type="checkbox">
						Send Email for Billing related
						<span class="checkmark"></span>
					</label>
				</div>
			</div>
			<div class="column">
				<h1>Billing Contact</h1>
				<div class="form-box">
					<label>First Name*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label>Last Name*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label>Email Address*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label>Phone Number*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label class="custom-checkbox">
						<input type="checkbox">
						Send Email for Communication related
						<span class="checkmark"></span>
					</label>
					<label class="custom-checkbox">
						<input type="checkbox">
						Send Email for Billing related
						<span class="checkmark"></span>
					</label>
				</div>
			</div>
			<div class="column">
				<h1>Benefits Specialist User</h1>
				<div class="form-box">
					<label>Name*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label>Code*</label>
					<input type="text">
				</div>
				<div class="form-box txt-right">
					<button class="btn-primary">Add</button>
				</div>
			</div>
		</div>
		
		<h1 class="company-contacts-text">Company Contacts</h1>

		<div class="columns company-contacts-container" v-for="list in [1,2,3]">
			<div class="column">
				<div class="form-box">
					<label>Company Name*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label>Company Address*</label>
					<input type="text">
				</div>
			</div>
			<div class="column">
				<div class="form-box">
					<label>Email Address*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label>Phone Number*</label>
					<input type="text">
				</div>
				<div class="form-box">
					<label class="custom-checkbox">
						<input type="checkbox">
						Send Email for Communication related
						<span class="checkmark"></span>
					</label>
					<label class="custom-checkbox">
						<input type="checkbox">
						Send Email for Billing related
						<span class="checkmark"></span>
					</label>
				</div>
			</div>
			<div class="column">
				<button class="btn-primary btn-remove">Remove</button>
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