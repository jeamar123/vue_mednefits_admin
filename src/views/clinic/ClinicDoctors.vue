<template>
	<div class="doctors-details-wrapper">
		<span v-if="!isAddDoctorsShow">
			<div class="header-title">
				<p class="box-title">List of Doctors</p>
				<div class="add-service-btn">
					<button class="btn btn-primary" v-on:click="editDoctors('add')">Add</button>
				</div>
			</div>
			<div class="tbl-wrapper">
				<table class="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<div class="icon">
									<img :src="'../assets/img/ico_Profile.svg'">
								</div>
								<div class="service-details">
									<label>Sophia Go</label>
								</div>		
							</td>
							<td>
								<p>lorem@ipsum.com</p>
							</td>
							<td>
								<button class="btn btn-primary" v-on:click="editDoctors('edit')">Edit</button>
								<button class="btn btn-primary">Delete</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</span>
		<span v-if="isAddDoctorsShow">
			<div class="header-title">
				<p><span v-if="!isEditDoctor">Add</span><span v-if="isEditDoctor">Edit</span> Doctor</p>
			</div>
			<form>
				<div class="form-row">
					<div class="form-col">
						<div class="form-div">
							<label>Name</label>
							<input type="text" >
						</div>
						<div class="form-div">
							<label>Email</label>
							<input type="text">
						</div>
					</div>
					<div class="form-col"></div>
				</div>
				<div class="btn-container">
					<button v-if="!isEditDoctor" class="btn btn-primary" v-on:click="editDoctors()">Submit</button>
					<button v-if="isEditDoctor" class="btn btn-primary" v-on:click="editDoctors()">Update</button>
				</div>
			</form>
		</span>
	</div>
</template>

<script>
	import clinicDoctors from '@/components/clinic/clinicDoctors';
	export default clinicDoctors;
</script>