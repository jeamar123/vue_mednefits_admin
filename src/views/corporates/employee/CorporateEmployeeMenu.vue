<template>
	<div class="employee-menu-container">
	
		<div class="left-box-wrapper transition-easeInOutCubic-300ms capitalize" :class="[sideBar.trigger ? 'sideBar-hide' : '']">
			<div class="corporate-details-box">
				<div class="menu-responsive hidden lg:flex transition-easeInOutCubic-100ms" :class="[sideBar.trigger ? 'lg:hidden' : '']" @click="toggleSideInfoBar()">
					<img :src="'../assets/img/admin_user.png'" />
					<span class="oi text-xs text-white" data-glyph="caret-right" aria-hidden="true"></span>
				</div>
				<a href="#" class="close-btn summary" :class="[sideBar.trigger == false ? 'hide' : '']" @click="toggleSideInfoBar()">
										<span class="oi" data-glyph="x" aria-hidden="true"></span>
									</a>
				<img :src="'../assets/img/admin_user.png'">
				<p class="corporate-name mt-6">
					{{employee_side_info.fullname}}
				</p>
			</div>
	
			<div class="emp-status-wrapper">
				<div class="label-text">
					<label>Status</label>
				</div>
				<div class="status-div active">
					<p>{{employee_side_info.emp_status}} <span :class="{'text-green-500': employee_side_info.emp_status == 'active', 'text-red-500' : employee_side_info.emp_status == 'deleted', 'text-orange-400' : employee_side_info.emp_status == 'pending' || employee_side_info.emp_status == 'schedule'  }" class="oi"
						    data-glyph="media-record" aria-hidden="true"></span></p>
				</div>
			</div>
			<div class="plan-info-wrapper">
				<p class="p-label">Plan Information</p>
				<div class="white-space-20"></div>
				<div class="row-div plan-info">
					<div class="label-text">
						<label>Plan</label>
					</div>
					<div class="status-div">
						<p v-for="plan in employee_side_info.coverage_plans" :key="plan.index">{{plan}}</p>
					</div>
				</div>
				<div class="row-div">
					<div class="label-text">
						<label>Plan Covers</label>
					</div>
					<div class="status-div">
						<p><span>{{employee_side_info.total_plan_covers}}</span> People</p>
					</div>
				</div>
				<div v-if="false" class="row-div">
					<div class="label-text">
						<label>Cap</label>
					</div>
					<div class="status-div">
						<p>GP cap per Visit SGD 50.00</p>
					</div>
				</div>
				<div class="row-div">
					<div class="label-text">
						<label>Start Date</label>
					</div>
					<div class="status-div">
						<p>{{ formatDate(employee_side_info.start_date, null, 'MMMM DD, YYYY') }}</p>
					</div>
				</div>
				<div class="row-div">
					<div class="label-text">
						<label>End Date</label>
					</div>
					<div class="status-div">
						<p>{{ formatDate(employee_side_info.expiry_date, null, ' MMMM DD, YYYY') }}</p>
					</div>
				</div>
			</div>
			<div class="spending-wrapper">
				<div v-if="employee_side_info.medical_enable">
					<p class="p-label">Medical Spending Account</p>
					<div class="white-space-20"></div>
					<div class="allocation-wrapper">
						<div class="row-div">
							<div class="label-text">
								<label>Allocation</label>
							</div>
							<div class="status-div">
								<p><span class="uppercase">{{employee_side_info.spending_account.medical.credits_allocation | currency(`${employee_side_info.currency_type} `, 2, { thousandsSeparator: ',' })}}</span></p>
							</div>
						</div>
						<p v-if="employee_side_info.medical_entitlement_status" class="small"> *The amount of <span class="currency-type">{{ employee_side_info.currency_type }} </span> <span>{{ employee_side_info.medical_entitlement_status.new_allocation_credits  | number('0,0') }} </span> will be update on <span>{{ medEffectiveDate }}</span></p>
					</div>
					<div class="row-div block">
						<div class="flex cursor-pointer" @click="spendingUsage('medical')">
							<div class="label-text" >
								<label class="cursor-pointer">Usage</label>
							</div>
							<div class="status-div">
								<p><span class="uppercase">{{(employee_side_info.spending_account.medical.credits_spent + employee_side_info.spending_account.medical.e_claim_amount_pending_medication) | currency(`${employee_side_info.currency_type} `, 2, { thousandsSeparator: ',' })}}</span> <i :class="{'fa-angle-right': !employee_side_info.spending_account.medical.usage, 'fa-angle-down': employee_side_info.spending_account.medical.usage}" class="fa ml-2 text-lg font-bold" aria-hidden="true"></i></p>
								
							</div>
						</div>

						<transition name="fade"> 
							<div v-if="employee_side_info.spending_account.medical.usage">
								<div class="flex">
									<div class="label-text font-normal text-sm flex-none">
										<label>Spent</label>
									</div>
									<div class="status-div text-sm">
										<p><span class="uppercase">{{employee_side_info.spending_account.medical.credits_spent | currency(`${employee_side_info.currency_type} `, 2, { thousandsSeparator: ',' })}}</span></p>
									</div>
								</div>
								<div class="flex">
									<div class="label-text font-normal text-sm flex-none">
										<label>Pending claim</label>
									</div>
									<div class="status-div text-sm">
										<p><span class="uppercase">{{employee_side_info.spending_account.medical.e_claim_amount_pending_medication | currency(`${employee_side_info.currency_type} `, 2, { thousandsSeparator: ',' })}}</span></p>
									</div>
								</div>
							</div>
						</transition>
						
					</div>
					<div class="row-div">
						<div class="label-text">
							<label>Balance</label>
						</div>
						<div class="status-div">
							<p><span class="uppercase">{{employee_side_info.spending_account.medical.balance | currency(`${employee_side_info.currency_type} `, 2, { thousandsSeparator: ',' })}}</span></p>
						</div>
					</div>
				</div>
				<div class="white-space-10"></div>
				<div class="white-space-20"></div>
				<div v-if="employee_side_info.wellness_enable">
					<p class="p-label">Wellness Spending Account</p>
					<div class="white-space-20"></div>
					<div class="allocation-wrapper">
						<div class="row-div">
							<div class="label-text">
								<label>Allocation</label>
							</div>
							<div class="status-div">
								<p><span class="uppercase">{{ employee_side_info.spending_account.wellness.credits_allocation_wellness | currency(`${employee_side_info.currency_type} `, 2, { thousandsSeparator: ',' }) }}</span></p>
							</div>
						</div>
						<p v-if="employee_side_info.wellness_entitlement_status"  class="small"> *The amount of <span class="currency-type">{{ employee_side_info.currency_type }} </span> <span>{{ employee_side_info.wellness_entitlement_status.new_allocation_credits | number('0,0') }} </span> will be update on <span>{{ wellEffectiveDate }}</span></p>
					</div>
					<div class="row-div block">
						<div class="flex cursor-pointer" @click="spendingUsage('wellness')">
							<div class="label-text">
								<label class="cursor-pointer">Usage</label>
							</div>
							<div class="status-div">
								<p><span class="uppercase">{{ (employee_side_info.spending_account.wellness.credits_spent_wellness + employee_side_info.spending_account.wellness.e_claim_amount_pending_wellness) | currency(`${employee_side_info.currency_type} `, 2, { thousandsSeparator: ',' }) }}</span> <i :class="{'fa-angle-right': !employee_side_info.spending_account.wellness.usage, 'fa-angle-down': employee_side_info.spending_account.wellness.usage}" class="fa ml-2 text-lg font-bold" aria-hidden="true"></i></p>
							</div>
						</div>
					

						<transition name="fade"> 
							<div v-if="employee_side_info.spending_account.wellness.usage">
								<div class="flex">
									<div class="label-text font-normal text-sm flex-none">
										<label>Spent</label>
									</div>
									<div class="status-div text-sm">
										<p><span class="uppercase">{{employee_side_info.spending_account.wellness.credits_spent_wellness | currency(`${employee_side_info.currency_type} `, 2, { thousandsSeparator: ',' })}}</span></p>
									</div>
								</div>
								<div class="flex">
									<div class="label-text font-normal text-sm flex-none">
										<label class="">Pending claim</label>
									</div>
									<div class="status-div text-sm">
										<p><span class="uppercase">{{employee_side_info.spending_account.wellness.e_claim_amount_pending_wellness | currency(`${employee_side_info.currency_type} `, 2, { thousandsSeparator: ',' })}}</span></p>
									</div>
								</div>
							</div>
						</transition>
					</div>
					<div class="row-div">
						<div class="label-text">
							<label>Balance</label>
						</div>
						<div class="status-div">
							<p><span class="uppercase">{{ employee_side_info.spending_account.wellness.balance | currency(`${employee_side_info.currency_type} `, 2, { thousandsSeparator: ',' }) }}</span></p>
						</div>
					</div>
				</div>
	
				<button class="btn btn-primary btn-access-account">Access Account</button>
			</div>
		</div>
	
		<div class="right-box-wrapper transition-easeInOutCubic-300ms" :class="[sideBar.trigger ? 'sideBar-hide' : '']">
			<div class="employee-information-container">
				<div class="emp-tab-wrapper lg:pl-20">
					<div class="" @click="showEmpSelectorInfo('EmployeeInformation')" v-bind:class="{'active': $route.name == 'EmployeeInformation'}">Employee</div>
					<div v-if="employee_side_info.dependents != 0" @click="showEmpSelectorInfo('DependentInformation')" v-bind:class="{'active': $route.name == 'DependentInformation'}">Dependent</div>
					<div @click="showEmpSelectorInfo('ClaimSubmission')" v-bind:class="{'active': $route.name == 'ClaimSubmission'}">Claim Submission</div>
					<div v-if="employee_side_info.medical_enable || employee_side_info.wellness_enable" @click="showEmpSelectorInfo('Entitlement')" v-bind:class="{'active': $route.name == 'Entitlement'}">
						Entitlement
					</div>
					<div @click="showEmpSelectorInfo('EmployeeSettings')" v-bind:class="{'active': $route.name == 'EmployeeSettings'}">Settings</div>
					<router-link tag="a" :to="{ name: 'CorporateMemberList', params: {customer_id: customer_id} }" class="close-btn"><span class="oi" data-glyph="x" aria-hidden="true"></span></router-link>
				</div>
				<div class="xs-employee-tabs">
					<div class="emp-tab-box">
						<select class="emp-tab-select" v-model="activeTab" v-on:change="showEmpSelectorInfo( activeTab )">
							<option value="EmployeeInformation">Employee</option>		
							<option value="DependentInformation">Dependent</option>		
							<option value="ClaimSubmission">Claim Submission</option>		
							<option value="Entitlement">Entitlement</option>		
							<option value="EmployeeSettings">Settings</option>		
						</select>
						<i class="fa fa-caret-down"></i>
					</div>
	
					<router-link tag="a" :to="{ name: 'CorporateMemberList', params: {customer_id: customer_id} }" class="close-btn"><span class="oi" data-glyph="x" aria-hidden="true"></span></router-link>
				</div>
	
				<router-view name="child" @FromEmployee="fromEmployee" @FromSettings="fromSettings" @FromEntitlement="fromEntitlement"></router-view>
			</div>
		</div>
	
		<transition name="fade">
			<Loader v-if="showLoader"></Loader>
		</transition>
	</div>
</template>

<script>
import corporateEmployeeMenu from '@/components/corporates/employee/corporateEmployeeMenu'
export default corporateEmployeeMenu
</script>