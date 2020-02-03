<template>
	<div class="dependent-details">
		<div v-if="!editDependentInfo && !editReplaceDependentInfo">
			<div class="emp-info-header md:text-center">
				<h3>Dependent Information</h3>
				<div class="right-btn-container md:relative md:text-right">
					<button @click="showReplaceDependent()" class="btn btn-edit xs:w-full xs:m-1"><img :src="'../assets/img/replace.png'">Replace</button>
					<button @click="showRemoveDependent()" class="btn btn-edit btn-remove xs:w-full xs:m-1"><img :src="'../assets/img/icons/dustbin.png'">Remove</button>
					<button @click="showEditDependent()" class="btn btn-edit xs:w-full xs:m-1"><img :src="'../assets/img/icons/edit.png'">Edit</button>
				</div>
			</div>
			<div class="emp-information-details sm:flex sm:flex-wrap">
				<div class="col-1-emp-info-details sm:w-full">
					<div>
						<strong>Full Name</strong>
						<span>Kevin Aton</span>
					</div>
					<div>
						<strong>Plan Start</strong>
						<span>August 03,2019</span>
					</div>
					<div>
						<strong>Plan End</strong>
						<span>August 02,2020</span>
					</div>
				</div>

				<div class="col-2-emp-info-details sm:w-full">
					<div>
						<strong>Date of Birth</strong>
						<span>04/03/2019</span>
					</div>
					<div>
						<strong>Relationship</strong>
						<span>Child</span>
					</div>
					<div>
						<strong>Member ID</strong>
						<span>023736</span>
					</div>
				</div>

			</div>
		</div>
		<!-- Replace dependent container -->
		<div v-if="editReplaceDependentInfo" class="edit-employee-info-container">
			<i @click="showReplaceDependent()" class="fa fa-times"></i>
			<div class="emp-header-text">
				<h3>Replace Dependent</h3>
			</div>
			<form class="md:w-full">
				<div class="edit-dependent-row sm:flex-wrap">
					<div class="employee-details-input-wrapper sm:m-0">
						<label>Full Name</label>
						<input type="text">
					</div>
					<div class="employee-details-input-wrapper sm:m-0">
						<label>Relationship</label>
						<select>
							<option>Spouse</option>
							<option>Child</option>
							<option>Family</option>
							<option>Parent</option>
						</select>
					</div>
				</div>

				<div class="edit-dependent-row sm:flex-wrap">
					<div class="employee-details-input-wrapper sm:m-0">
						<label>Date of Birth</label>
						<div class="date-container vDatepicker">
							<v-date-picker
                popoverDirection="bottom"
                v-model="starDateDetails.null"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                popover-visibility="focus"
              ></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
					</div>
					<div class="employee-details-input-wrapper sm:m-0">
						<label>Plan Start</label>
						<div class="date-container vDatepicker">
							<v-date-picker
                popoverDirection="bottom"
                v-model="starDateDetails.null"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                popover-visibility="focus"
              ></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
					</div>
				</div>

				<div class="save-btn-footer">
					<button class="btn-primary xs:w-full">SAVE & CONTINUE</button>
				</div>
			</form>
		</div>
		<!-- Edit dependent container -->
		<div v-if="editDependentInfo" class="edit-employee-info-container">
			<i @click="showEditDependent()" class="fa fa-times"></i>
			<div class="emp-header-text">
				<h3>Edit Dependent Details</h3>
			</div>
			<form class="md:w-full">
				<div class="edit-dependent-row sm:flex sm:flex-wrap">
					<div class="employee-details-input-wrapper sm:m-0">
						<label>Full Name</label>
						<input type="text">
					</div>
					<div class="employee-details-input-wrapper sm:m-0">
						<label>Relationship</label>
						<select>
							<option>Spouse</option>
							<option>Child</option>
							<option>Family</option>
							<option>Parent</option>
						</select>
					</div>
				</div>

				<div class="edit-dependent-row sm:flex sm:flex-wrap">
					<div class="employee-details-input-wrapper sm:mx-0">
						<label>Date of Birth</label>
						<div class="date-container vDatepicker">
							<v-date-picker
                popoverDirection="bottom"
                v-model="starDateDetails.null"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                popover-visibility="focus"
              ></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
					</div>
					<div class="employee-details-input-wrapper sm:mx-0">
						<label>Member ID</label>
						<input type="number">
					</div>
				</div>

				<div class="edit-dependent-row">
					<div class="employee-details-input-wrapper  sm:mx-0">
						<label>Plan Start</label>
						<div class="date-container vDatepicker">
							<v-date-picker
                popoverDirection="bottom"
                v-model="starDateDetails.null"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                popover-visibility="focus"
              ></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
					</div>
					<div class="employee-details-input-wrapper sm:hidden"></div>
				</div>

				<div class="save-btn-footer">
					<button class="btn-primary">SAVE & CONTINUE</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import dependentInformation from '@/components/corporates/employee/dependentInformation.vue'
	export default dependentInformation
</script>
