<template>
	<div class="add-corporate-container">
		

		<div class="header-wrapper">
			<p>Create corporate entity account</p>
			<router-link tag="a" to="/dashboard/corporates" class="close-btn"><span class="oi" data-glyph="x" aria-hidden="true"></span></router-link>
		</div>

		<div class="add-corporate-wrapper">
			<div class="white-box">
				<p class="box-title-blue">Business Information</p>

				<div class="form-row">
					<div class="form-col">
						<div class="form-div">
							<label>Company Name</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col flex-2 mr-20">
						<div class="form-div">
							<label>Company Address</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Postal Code</label>
							<input type="text">
						</div>
					</div>
				</div>

				<p class="box-title-black">Business Contact</p>

				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>First Name</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Last Name</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Job Title</label>
							<select>
								<option></option>
								<option>1</option>
								<option>2</option>
								<option>3</option>
							</select>
						</div>
					</div>
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Email Address</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Phone Number</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="white-space-20"></div>
				<div class="form-row">
					<div class="form-div">
						<label class="input-checkbox">
						  <input type="checkbox">
						  <span class="input-text">Send Email for Communication related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
					<div class="form-div">
						<label class="input-checkbox">
						  <input type="checkbox">
						  <span class="input-text">Send Email for Billing related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
				</div>

				<p class="box-title-black">Billing Information</p>
				<div class="form-toggle">
					<label>Same as Business Information?</label>
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div class="toggle on active">Yes</div>
							<div class="toggle off">No</div>
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col">
						<div class="form-div">
							<label>Billing Name</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col flex-2 mr-20">
						<div class="form-div">
							<label>Billing Address</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Postal Code</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>First Name (Billing Contact)</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Last name (Billing Contact)</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Email Address (Billing Contact)</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Phone Number (Billing Contact)</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
					</div>
				</div>
				<div class="white-space-20"></div>
				<div class="form-row">
					<div class="form-div">
						<label class="input-checkbox">
						  <input type="checkbox">
						  <span class="input-text">Send Email for Communication related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
					<div class="form-div">
						<label class="input-checkbox">
						  <input type="checkbox">
						  <span class="input-text">Send Email for Billing related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
				</div>

				<p class="box-title-black">Add Contact/s</p>
				<div class="form-toggle">
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div class="toggle on active">Yes</div>
							<div class="toggle off">No</div>
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>First Name</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Last Name</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Job Title</label>
							<select>
								<option></option>
								<option>1</option>
								<option>2</option>
								<option>3</option>
							</select>
						</div>
					</div>
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Email Address</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
						<div class="form-div">
							<label>Phone Number</label>
							<input type="text">
						</div>
					</div>
				</div>
				<div class="white-space-20"></div>
				<div class="form-row">
					<div class="form-div">
						<label class="input-checkbox">
						  <input type="checkbox">
						  <span class="input-text">Send Email for Communication related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
					<div class="form-div">
						<label class="input-checkbox">
						  <input type="checkbox">
						  <span class="input-text">Send Email for Billing related</span>
						  <span class="input-checkmark"></span>
						</label>
					</div>
				</div>

				<div class="btn-option-row">
					<div class="btn-container">
						<button class="btn btn-primary btn-add-contact">ADD MORE CONTACT</button>
					</div>
					<div class="rm-container">
						<span class="oi" data-glyph="minus" aria-hidden="true"></span>
					</div>
				</div>
				<div class="white-space-20"></div>

				<span>
					<div class="form-row">
						<div class="form-col mr-20">
							<div class="form-div">
								<label>First Name</label>
								<input type="text">
							</div>
						</div>
						<div class="form-col">
							<div class="form-div">
								<label>Last Name</label>
								<input type="text">
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Job Title</label>
								<select>
									<option></option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</select>
							</div>
						</div>
						<div class="form-col mr-20">
							<div class="form-div">
								<label>Email Address</label>
								<input type="text">
							</div>
						</div>
						<div class="form-col">
							<div class="form-div">
								<label>Phone Number</label>
								<input type="text">
							</div>
						</div>
					</div>
					<div class="white-space-20"></div>
					<div class="form-row">
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
							  <span class="input-text">Send Email for Communication related</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
							  <span class="input-text">Send Email for Billing related</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
					</div>

					<div class="btn-option-row">
						<div class="btn-container">
							<button class="btn btn-primary btn-add-contact">ADD MORE CONTACT</button>
						</div>
						<div class="rm-container">
							<span class="oi" data-glyph="minus" aria-hidden="true"></span>
						</div>
					</div>
					<div class="white-space-20"></div>
				</span>
			</div>

			<div class="white-box">
				<p class="box-title-blue">Account & Plan</p>

				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Company Name</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Company Name</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col">
					</div>
				</div>
				<div class="white-space-20"></div>
				<div class="form-toggle">
					<label>Plan Extension?</label>
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div class="toggle on active">Yes</div>
							<div class="toggle off">No</div>
						</div>
					</div>
				</div>

				<div class="white-space-20"></div>
				<p class="box-title-black">Employee Account</p>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Total Number of Eligible Employees</label>
							<input type="number">
						</div>
					</div>
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Plan Type</label>
							<select>
								<option></option>
								<option>1</option>
								<option>2</option>
								<option>3</option>
							</select>
						</div>
					</div>
					<div class="form-col">
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Plan Price</label>
							<input type="number">
						</div>
					</div>
					<div class="form-toggle form-col-toggle">
						<label>Payment Status?</label>
						<div class="toggle-wrapper">
							<div class="toggle-btns">
								<div class="toggle on active">Paid</div>
								<div class="toggle off">Pending</div>
							</div>
						</div>
					</div>
					<div class="form-col flex-2">
					</div>
				</div>

				<div class="white-space-20"></div>
				<p class="box-title-black">Dependent Account</p>
				<div class="form-toggle">
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div class="toggle on active">Yes</div>
							<div class="toggle off">No</div>
						</div>
					</div>
				</div>

				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Total Number of Eligible Employees</label>
							<input type="number">
						</div>
					</div>
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Plan Type</label>
							<select>
								<option></option>
								<option>1</option>
								<option>2</option>
								<option>3</option>
							</select>
						</div>
					</div>
					<div class="form-col">
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Plan Price</label>
							<input type="number">
						</div>
					</div>
					<div class="form-toggle form-col-toggle">
						<label>Payment Status?</label>
						<div class="toggle-wrapper">
							<div class="toggle-btns">
								<div class="toggle on active">Paid</div>
								<div class="toggle off">Pending</div>
							</div>
						</div>
					</div>
					<div class="form-col">
					</div>
				</div>
			</div>

			<div class="white-box">
				<p class="box-title-blue">Plan Add-On</p>

				<p class="box-title-black">Health Spending Account</p>
				<div class="form-toggle">
					<div class="toggle-wrapper">
						<div class="toggle-btns">
							<div class="toggle on active">Yes</div>
							<div class="toggle off">No</div>
						</div>
					</div>
				</div>

				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Medical Spending Account</label>
							<input type="number">
						</div>
					</div>
					<div class="form-col flex-2 form-slider">
						<div class="form-div">
							<label>Deposit</label>
							<div class="slider-wrapper"></div>
						</div>
					</div>
				</div>
				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Wellness Spending Account</label>
							<input type="number">
						</div>
					</div>
					<div class="form-col flex-2 form-slider">
						<div class="form-div">
							<label>Deposit</label>
							<div class="slider-wrapper"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="white-box">
				<p class="box-title-blue">Business Portal</p>

				<div class="form-row">
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Wellness Spending Account</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Wellness Spending Account</label>
							<input type="password">
						</div>
					</div>
					<div class="form-col">
						<div class="white-space-20"></div>
						<div class="form-div">
							<label class="input-checkbox">
							  <input type="checkbox">
							  <span class="input-text">Auto Generate Password</span>
							  <span class="input-checkmark"></span>
							</label>
						</div>
					</div>
				</div>
			</div>

			<div class="white-box">
				<p class="box-title-blue">Benefits Specialist User</p>

				<div class="form-row">
					<div class="form-col flex-2 mr-20">
						<div class="form-div">
							<label>Name</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col mr-20">
						<div class="form-div">
							<label>Code</label>
							<input type="password">
						</div>
					</div>
					<div class="form-col">

					</div>
				</div>
			</div>

			<div class="form-row justify-content-end margin-030">
				<button class="btn btn-primary">CREATE ACCOUNT</button>
			</div>
			<div class="white-space-50"></div>

		</div>
  </div>
</template>

<script>
	import addCorporates from '@/components/corporates/addCorporates'
	export default addCorporates
</script>
