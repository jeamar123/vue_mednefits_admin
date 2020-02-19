<template>
	<div class="dependent-details">
		<div v-if="!editDependentInfo && !editReplaceDependentInfo">
			<h3>Dependent Information</h3>
			<template v-for="list in dependent_arr">
				<div class="dep-info-header md:text-center" :key="list.index">
					<div class="right-btn-container md:relative md:text-right">
						<button @click="showReplaceDependent()" class="btn btn-edit xs:w-full xs:m-1"><img :src="'../assets/img/replace.png'">Replace</button>
						<button @click="showRemoveDependent()" class="btn btn-edit btn-remove xs:w-full xs:m-1"><img :src="'../assets/img/icons/dustbin.png'">Remove</button>
						<button @click="showEditDependent(list)" class="btn btn-edit xs:w-full xs:m-1"><img :src="'../assets/img/icons/edit.png'">Edit</button>
					</div>
				</div>
				<div class="emp-information-details sm:flex sm:flex-wrap" :key="list.index">
					<div class="col-1-emp-info-details sm:w-full">
						<div>
							<strong>Full Name</strong>
							<span>{{list.fullname || null }}</span> 
							<!-- to change fullname -->
						</div>
						<div>
							<strong>Plan Start</strong>
							<span>{{ (formatDate(list.plan_start, null, 'DD/MM/YYYY')) || 'null' }}</span>
						</div>
						<div>
							<strong>Plan End</strong>
							<span>{{ (formatDate(list.plan_end, null, 'DD/MM/YYYY')) || 'null' }}</span>
						</div>
					</div>

					<div class="col-2-emp-info-details sm:w-full">
						<div>
							<strong>Date of Birth</strong>
							<span>{{ (formatDate(list.dob, null, 'DD/MM/YYYY')) || 'null' }}</span>
						</div>
						<div>
							<strong>Relationship</strong>
							<span>{{list.relationship || 'null'}}</span>
						</div>
						<div>
							<strong>Member ID</strong>
							<span>{{list.member_id || 'null'}}</span>
						</div>
					</div>

				</div>
			</template>
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
				<div class="edit-dependent-row">
					<div class="employee-details-input-wrapper sm:m-0">
						<label>Full Name</label>
						<input type="name" v-model="toEdit.fullname" required autocomplete="name">
					</div>
					<div class="employee-details-input-wrapper sm:m-0">
						<label>Relationship</label>
						<div class="relationship-container"> 
							<select v-model="toEdit.relationship">
								<option value="spouse">Spouse</option>
								<option value="child">Child</option>
								<option value="siblings">Siblings</option>
								<option value="family">Family</option>
								<option value="parent">Parent</option>
							</select>
							<i class="fa fa-caret-down"></i>
						</div>
					</div>
				</div>

				<div class="edit-dependent-row sm:flex sm:flex-wrap">
					<div class="employee-details-input-wrapper sm:mx-0">
						<label>Date of Birth</label>
						<div class="date-container caret vDatepicker">
							<v-date-picker
                popoverDirection="bottom"
                v-model="toEdit.dob"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                popover-visibility="focus"
								:formats="formats"
              ></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
					</div>
					<div class="employee-details-input-wrapper sm:mx-0">
						<label>Member ID</label>
						<input type="number" v-model="toEdit.member_id"  required readonly="readonly">
					</div>
				</div>

				<div class="edit-dependent-row">
					<div class="employee-details-input-wrapper  sm:mx-0">
						<label>Plan Start</label>
						
						<div class="date-container caret vDatepicker">
							<v-date-picker
                popoverDirection="bottom"
                v-model="toEdit.plan_start"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                popover-visibility="focus"
								:formats="formats"
              ></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
					</div>
					<div class="employee-details-input-wrapper sm:hidden"></div>
				</div>

				<div class="save-btn-footer">
					<button class="btn-primary" @click="updateDependent(toEdit)">SAVE & CONTINUE</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import dependentInformation from '@/components/corporates/employee/dependentInformation.vue'
	export default dependentInformation
</script>
