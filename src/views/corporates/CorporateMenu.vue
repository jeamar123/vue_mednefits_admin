<template>
	<div class="corporate-menu-container">
		<div class="left-box-wrapper transition-easeInOutCubic-300ms" :class="[sideBar.trigger ? 'sideBar-hide' : '']">
			<div class="corporate-details-box h-full">
				<div class="menu-responsive hidden lg:flex transition-easeInOutCubic-100ms" :class="[sideBar.trigger ? 'lg:hidden' : '']" @click="toggleSideInfoBar()">
					<img :src="'../assets/img/admin_user.png'" />
					<span class="oi text-xs text-white" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<a href="#" class="close-btn summary" :class="[sideBar.trigger == false ? 'hide' : '']"
					@click="toggleSideInfoBar()">
					<span class="oi" data-glyph="x" aria-hidden="true"></span>
				</a>
				<img :src="'../assets/img/admin_user.png'" />

				<div class="company-basic-details">
					<div class="info-div">
						<label>Company Name</label>
						<p v-if="corporateDetails_data.company_name">{{corporateDetails_data.company_name}}</p>
						<p v-else>Loading . . .</p>
					</div>
					<div class="info-div">
						<label>Plan Start Date</label>
						<p v-if="corporateDetails_data.plan_start">{{ formatDate(corporateDetails_data.plan_start, null, 'DD MMMM, YYYY') }}</p>
						<p v-else>Loading . . .</p>
					</div>
					<div class="info-div">
						<label>Plan End Date</label>
						<p v-if="corporateDetails_data.plan_end">{{ formatDate(corporateDetails_data.plan_end, null, 'DD MMMM, YYYY') }}</p>
						<p v-else>Loading . . .</p>
					</div>
					<div class="info-div">
						<label>Days to Expire Plan</label>
						<p v-if="corporateDetails_data.days_left">{{corporateDetails_data.days_left}}</p>
						<p v-else>Loading . . .</p>
					</div>
				</div>

				<div class="company-basic-details enrollment-status">
					<p class="info-title">Employee Enrollment Status</p>

					<div class="info-div-inline">
						<label>Total seats:</label>
						<p>{{corporateDetails_data.employee ? corporateDetails_data.employee.total_seats: 0}}</p>
						<!-- <p>{{corporateDetails_data.employee ? corporateDetails_data.employee.total_seats: 0}}</p> -->
					</div>
					<div class="info-div-inline">
						<label>Occupied Seats:</label>
						<p>{{corporateDetails_data.employee ? corporateDetails_data.employee.occupied_seats : 0}}</p>
					</div>
					<div class="info-div-inline">
						<label>Vacant Seats:</label>
						<p>{{corporateDetails_data.employee ? corporateDetails_data.employee.vacant_seats : 0}}</p>
					</div>

					<div class="white-space-10"></div>
					<p class="info-title">Dependent Enrollment Status</p>

					<div class="info-div-inline">
						<label>Total seats:</label>
						<p>{{corporateDetails_data.dependent ? corporateDetails_data.dependent.total_seats : 0}}</p>
					</div>
					<div class="info-div-inline">
						<label>Occupied Seats:</label>
						<p>{{corporateDetails_data.dependent ? corporateDetails_data.dependent.occupied_seats: 0}}</p>
					</div>
					<div class="info-div-inline">
						<label>Vacant Seats:</label>
						<p>{{corporateDetails_data.dependent ? corporateDetails_data.dependent.vacant_seats: 0}}</p>
					</div>
					<div class="white-space-10"></div>
				</div>

				<div class="company-basic-details company-credits">
					<p class="info-title">Company Credits:</p>
					<p class="info-title">Medical Spending Account:</p>

					<div class="info-div-inline">
						<label>Total:</label>
						<p v-if="corporateCreditsInfo_data.total_medical_company_allocation != null" class="uppercase">
							{{corporateCreditsInfo_data.total_medical_company_allocation | currency(`${corporateCreditsInfo_data.currency_type} `, 2, { thousandsSeparator: ',' }) }}
						</p>
						<p v-else>Loading . . .</p>
					</div>
					<div class="info-div-inline">
						<label>Allocated:</label>
						<p v-if="corporateCreditsInfo_data.total_medical_employee_allocated != null" class="uppercase">
						 {{corporateCreditsInfo_data.total_medical_employee_allocated | currency(`${corporateCreditsInfo_data.currency_type} `, 2, { thousandsSeparator: ',' }) }}
						</p>
						<p v-else>Loading . . .</p>
					</div>
					<div class="info-div-inline">
						<label>Unallocated:</label>
						<p v-if="corporateCreditsInfo_data.total_medical_company_unallocation != null" class="uppercase">
							{{corporateCreditsInfo_data.total_medical_company_unallocation | currency(`${corporateCreditsInfo_data.currency_type} `, 2, { thousandsSeparator: ',' }) }}
						</p>
						<p v-else>Loading . . .</p>
					</div>
					<div class="info-div-inline">
						<label>Spent:</label>
						<p v-if="corporateCreditsInfo_data.total_medical_employee_spent != null" class="uppercase">
							{{corporateCreditsInfo_data.total_medical_employee_spent | currency(`${corporateCreditsInfo_data.currency_type} `, 2, { thousandsSeparator: ',' }) }}
						</p>
						<p v-else>Loading . . .</p>
					</div>
					<div class="info-div-inline">
						<label>Balance:</label>
						<p v-if="corporateCreditsInfo_data.total_medical_employee_balance != null" class="uppercase">
						 {{corporateCreditsInfo_data.total_medical_employee_balance | currency(`${corporateCreditsInfo_data.currency_type} `, 2, { thousandsSeparator: ',' }) }}
						</p>
						<p v-else>Loading . . .</p>
					</div>

					<div class="white-space-20"></div>
					<p class="info-title">Company Credits:</p>
					<p class="info-title">Wellness Spending Account:</p>

					<div class="info-div-inline">
						<label>Total:</label>
						<p v-if="corporateCreditsInfo_data.total_medical_wellness_allocation != null" class="uppercase"> 
							{{corporateCreditsInfo_data.total_medical_wellness_allocation | currency(`${corporateCreditsInfo_data.currency_type} `, 2, { thousandsSeparator: ',' }) }}
						</p>
						<p v-else>Loading . . .</p>
					</div>
					<div class="info-div-inline">
						<label>Allocated:</label>
						<p v-if="corporateCreditsInfo_data.total_wellness_employee_allocated != null" class="uppercase">
							{{corporateCreditsInfo_data.total_wellness_employee_allocated | currency(`${corporateCreditsInfo_data.currency_type} `, 2, { thousandsSeparator: ',' }) }}
						</p>
						<p v-else>Loading . . .</p>
					</div>
					<div class="info-div-inline">
						<label>Unallocated:</label>
						<p v-if="corporateCreditsInfo_data.total_medical_wellness_unallocation!= null" class="uppercase">
							{{corporateCreditsInfo_data.total_medical_wellness_unallocation | currency(`${corporateCreditsInfo_data.currency_type} `, 2, { thousandsSeparator: ',' }) }}
						</p>
						<p v-else>Loading . . .</p>
					</div>
					<div class="info-div-inline">
						<label>Spent:</label>
						<p v-if="corporateCreditsInfo_data.total_wellness_employee_spent != null" class="uppercase">
							{{corporateCreditsInfo_data.total_wellness_employee_spent | currency(`${corporateCreditsInfo_data.currency_type} `, 2, { thousandsSeparator: ',' }) }}
						</p>
						<p v-else>Loading . . .</p>
					</div>
					<div class="info-div-inline">
						<label>Balance:</label>
						<p v-if="corporateCreditsInfo_data.total_wellness_employee_balance != null" class="uppercase">
							{{corporateCreditsInfo_data.total_wellness_employee_balance | currency(`${corporateCreditsInfo_data.currency_type} `, 2, { thousandsSeparator: ',' }) }}
						</p>
						<p v-else>Loading . . .</p>
					</div>

					<div class="white-space-20"></div>
					<div class="info-div credit-reset" v-if="corporateDetails_data.last_credit_reset_data">
						<label>Latest Credit Reset Date</label>
						<p>{{ formatDate(corporateDetails_data.last_credit_reset_data, null, 'DD MMMM, YYYY') }}</p>
					</div>

					<div class="white-space-50"></div>
					<div class="btn-container">
						<router-link tag="div" :to="{ name : 'PlanRenewal' }"><button v-if="corporateRenewalStatus_data.to_plan_renew" class="btn btn-primary txt-transform-uppercase">Plan Renewal Details</button></router-link>
						<router-link tag="div" :to="{ name : 'Clinic' }"><button v-if="corporateRenewalStatus_data.to_spending_renew && !corporateRenewalStatus_data.combine" class="btn btn-primary txt-transform-uppercase">Spending Account Renewal Details</button></router-link>
						<button v-if="corporateDetails_data.to_expire" class="btn btn-primary txt-transform-uppercase" @click="sendPlanExpiration()">Send Plan Expiration Notification</button>
						<router-link tag="div" :to="{ name : 'Clinic' }"><button class="btn btn-primary txt-transform-uppercase">Corporate Details</button></router-link>
						<router-link tag="div" :to="{ name : 'CorporateSettings' }"><button v-if="false" class="btn btn-primary txt-transform-uppercase">Pending Enrollnent <span ng-bind="corprorate_details.pending_enrollment"> 0 </span></button></router-link>
						<router-link tag="div" :to="{ name : 'CorporateSettings' }"><button class="btn btn-primary txt-transform-uppercase">Settings</button></router-link>
					</div>
				</div>
			</div>
		</div>

		<div class="right-box-wrapper transition-easeInOutCubic-300ms" :class="[sideBar.trigger ? 'sideBar-hide' : '']">
			<div class="corporate-main-container sm:px-4">
				<div class="toggleResponsive-closeCorporate sm:px-3">
					<div class="col-1">
						<!-- <a href="#" :class="[sideBar.trigger ? 'hide' : '']" class="btn-menu" @click="toggleSideInfoBar()">
							<span class="oi" data-glyph="menu" title="menu" aria-hidden="true"></span>
						</a> -->
					</div>
					<div class="col-2">
						<div v-if="$route.name == 'CorporateMemberList'" class="close-btn corporate" v-on:click="$router.push({ name: 'Corporates'})">
							<span class="oi" data-glyph="x" aria-hidden="true"></span>
						</div>

						<div v-else class="close-btn corporate" v-on:click="$router.push({ name: 'CorporateMemberList'})">
							<span class="oi" data-glyph="x" aria-hidden="true"></span>
						</div>
					</div>
				</div>

				<router-view name="child" @FromMemberList="fromMemberList"></router-view>
			</div>
		</div>

		<transition name="fade">
			<Loader v-if="showLoader"></Loader>
		</transition>
	</div>
</template>

<script>
	import corporateMenu from "@/components/corporates/corporateMenu";
	export default corporateMenu;
</script>