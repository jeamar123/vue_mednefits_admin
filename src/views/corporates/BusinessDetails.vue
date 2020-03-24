<template>
	<div class="business-details-wrapper">
    <div class="columns">
			<div class="column">
				<h1>Company Information</h1>
				<div class="form-box">
					<label>Company Name*</label>
					<input type="text" v-model="global_businessDetails.company_name">
				</div>
				<div class="form-box">
					<label>Company Address*</label>
					<input type="text" v-model="global_businessDetails.company_address">
				</div>
				<div class="form-box">
					<label>Postal Code*</label>
					<input type="text" v-model="global_businessDetails.postal_code">
				</div>
			</div>
			<div class="column">
				<h1>Clinic Peak Status</h1>
				<div class="form-box">
					<div class="toggle-form">
						<div class="custom-toggle-container">
							<div class="toggle toggle-on" v-bind:class="{'active' : global_businessDetails.peak_status == 1}" v-on:click="_toggleButtons_('clinic_peak_status', 1)">
								<i class="fa fa-check"></i>
							</div>
							<div class="toggle toggle-off" v-bind:class="{'active' : global_businessDetails.peak_status == 0}" v-on:click="_toggleButtons_('clinic_peak_status', 0)"> 
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
							<div class="toggle toggle-on" v-bind:class="{'active' : global_businessDetails.spending_notification == 1}" v-on:click="_toggleButtons_('spending_invoice_notif', 1)">
								<i class="fa fa-check"></i>
							</div>
							<div class="toggle toggle-off" v-bind:class="{'active' : global_businessDetails.spending_notification == 0}" v-on:click="_toggleButtons_('spending_invoice_notif', 0)">
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
				<p>Status: {{ global_businessDetails.active == 1 ? 'Active' : 'Deactivated' }}</p>
				<div class="white-space-20"></div>
				<div class="white-space-20"></div>
				<button class="btn-primary" v-on:click="_updateHrAccountStatus_()">{{ global_businessDetails.active == 1 ? 'DEACTIVATE' : 'ACTIVATE' }}</button>
				<div class="white-space-20"></div>
			</div>
		</div>

		<div class="columns">
			<div class="column">
				<h1>Business Contact</h1>
				<div class="form-box">
					<label>First Name*</label>
					<input type="text" v-model="global_businessDetails.business_contact.first_name">
				</div>
				<div class="form-box">
					<label>Last Name*</label>
					<input type="text" v-model="global_businessDetails.business_contact.last_name">
				</div>
				<div class="form-box">
					<label>Email Address*</label>
					<input type="text" v-model="global_businessDetails.business_contact.email">
				</div>
				<div class="form-box">
					<label>Phone Number*</label>
					<input type="text" v-model="global_businessDetails.business_contact.phone">
				</div>
				<div class="form-box">
					<label class="custom-checkbox">
						<input type="checkbox" :value="1" v-model="global_businessDetails.business_contact.send_email_communication">
						Send Email for Communication related
						<span class="checkmark"></span>
					</label>
					<label class="custom-checkbox">
						<input type="checkbox" :value="1" v-model="global_businessDetails.business_contact.send_email_billing">
						Send Email for Billing related
						<span class="checkmark"></span>
					</label>
				</div>
			</div>
			<div class="column">
				<h1>Billing Contact</h1>
				<div class="form-box">
					<label>First Name*</label>
					<input type="text" v-model="global_businessDetails.billingContactDetails.billing_first_name">
				</div>
				<div class="form-box">
					<label>Last Name*</label>
					<input type="text" v-model="global_businessDetails.billingContactDetails.billing_last_name">
				</div>
				<div class="form-box">
					<label>Email Address*</label>
					<input type="text" v-model="global_businessDetails.billingContactDetails.billing_email">
				</div>
				<div class="form-box">
					<label>Phone Number*</label>
					<input type="text" v-model="global_businessDetails.billingContactDetails.billing_phone">
				</div>
				<div class="form-box">
					<label class="custom-checkbox">
						<input type="checkbox" :value="1" v-model="global_businessDetails.billingContactDetails.bill_send_email_comm_related">
						Send Email for Communication related
						<span class="checkmark"></span>
					</label>
					<label class="custom-checkbox">
						<input type="checkbox" :value="1" v-model="global_businessDetails.billingContactDetails.bill_send_email_bill_related">
						Send Email for Billing related
						<span class="checkmark"></span>
					</label>
				</div>
			</div>
			<div class="column">
				<h1>Benefits Specialist User</h1>
				<div class="form-box">
					<label>Name*</label>
					<input type="text" v-model="global_businessDetails.benefitsSpecialistUser.name">
				</div>
				<div class="form-box">
					<label>Code*</label>
					<input type="text" v-model="global_businessDetails.benefitsSpecialistUser.code">
				</div>
				<div class="form-box txt-right">
					<button class="btn-primary" v-on:click="_addSpecialist_()">Add</button>
				</div>
			</div>
		</div>
		
		<h1 class="company-contacts-text">Company Contacts</h1>

		<div class="contact-scroll-container">
			<div class="columns company-contacts-container" :key="list.index" v-for="(list, index) in global_businessDetails.companyContacts">
				<div class="column">
					<div class="form-box">
						<label>First Name*</label>
						<input type="text" v-model="list.first_name">
					</div>
					<div class="form-box">
						<label>Last Name*</label>
						<input type="text" v-model="list.last_name">
					</div>
				</div>
				<div class="column">
					<div class="form-box">
						<label>Email Address*</label>
						<input type="text" v-model="list.email">
					</div>
					<div class="form-box">
						<label>Phone Number*</label>
						<input type="text" v-model="list.phone">
					</div>
					<div class="form-box">
						<label class="custom-checkbox">
							<input type="checkbox" :value="1" v-model="list.send_email_communication">
							Send Email for Communication related
							<span class="checkmark"></span>
						</label>
						<label class="custom-checkbox">
							<input type="checkbox" :value="1" v-model="list.send_email_billing">
							Send Email for Billing related
							<span class="checkmark"></span>
						</label>
					</div>
				</div>
				<div class="column">
					<button class="btn-primary btn-remove" v-on:click="_addRemoveContacts_('remove', list.company_contact_id)">Remove</button>
				</div>
			</div>
		</div>

		<div class="btn-container">
			<button class="btn-primary" v-on:click="_addRemoveContacts_('add')">Add More Contact</button>
			<button class="btn-primary" v-on:click="_updateBusinessDetails_()">Update</button>
		</div>
	</div>
</template>

<script>
	import businessDetails from '@/components/corporates/businessDetails'
	export default businessDetails
</script>