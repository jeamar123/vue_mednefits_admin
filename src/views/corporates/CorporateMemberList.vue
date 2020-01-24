<template>
	<div class="corporate-members-container">
		<div class="search-member-wrapper">
			<span class="oi" data-glyph="magnifying-glass" aria-hidden="true"></span>
			<div class="form-div">
				<input type="text" placeholder="Search employee" />
			</div>
		</div>

		<div class="member-list-container">
			<div class="member-wrapper"
				ng-repeat="list in corprorate_details.corporate_members | orderBy: list.member.created_at">
				<template ng-if="list.emp_main_details">
					<div class="header">
						<h3 ng-click="showHideEmployeeDetail(list, $index)">
							<span ng-bind="list.member.Name">
								Jazer
								Zayas
							</span>
						</h3>
					</div>
					<!-- start body -->
					<div class="body">
						<!-- start div info-div -->
						<div class="info-div">
							<div class="info-details" ng-if="list.member.Email">
								<label>Email Address:</label>
								<span class="info-bind" ng-if="list.member.Email" ng-bind="list.member.Email">jazer.zayas10@gmail.com</span>
							</div>
							<div class="info-details" ng-if="!list.member.Email">
								<label>Mobile Number:</label>
								<span class="info-bind" ng-bind="list.member.PhoneCode">+63</span>
								<span class="info-bind" ng-bind="list.member.PhoneNo">9177799014</span>
							</div>
							<div class="info-details">
								<label>Mobile Number:</label>
								<span class="info-bind" ng-bind="list.member.PhoneCode">+63</span>
								<span class="info-bind" ng-bind="list.member.PhoneNo">9177799014</span>
							</div>
							<!-- <div><label>NRIC:</label> <span ng-bind="list.member.NRIC"></span></div> -->
							<div class="info-details no-margin-bottom">
								<label>Family Coverage:</label>
							</div>

							<div class="info-details">
								<label>Dependents:</label>
								<span ng-bind="list.dependents"></span>
							</div>
							<div class="info-details no-margin-bottom">
								<label>Spending Account:</label>
							</div>
							<div class="info-details">
								<label></label>
								<span>Medical</span>
								<span>Wellness</span>
							</div>
							<div class="info-details">
								<label>Allocation</label>
								<span>
									<span ng-bind="corprorate_details.credits.currency_type" class="currency-type"></span>
									<span ng-bind="list.spending_account.medical.credits_allocation"></span>
								</span>
								<span>
									<span ng-bind="corprorate_details.credits.currency_type" class="currency-type"></span>
									<span ng-bind="list.spending_account.wellness.credits_allocation"></span>
								</span>
							</div>
							<div class="info-details">
								<label>Usage</label>
								<span>
									<span ng-bind="corprorate_details.credits.currency_type" class="currency-type"></span>
									<span ng-bind="list.spending_account.medical.credits_spent"></span>
								</span>
								<span>
									<span ng-bind="corprorate_details.credits.currency_type" class="currency-type"></span>
									<span ng-bind="list.spending_account.wellness.credits_spent"></span>
								</span>
							</div>

							<div class="info-details">
								<label>Start Date:</label>
								<span ng-bind="list.start_date | cmdate:'dd MMMM, yyyy'"></span>
							</div>
							<div class="info-details">
								<label>End Date:</label>
								<span ng-bind="list.end_date | cmdate:'dd MMMM, yyyy'"></span>
							</div>
							<div class="info-details" ng-if="list.date_deleted">
								<label>Date Deleted/Remove:</label>
								<span ng-bind="list.date_deleted"></span>
							</div>
							<div class="info-details" ng-if="list.deletion_text">
								<span ng-bind="list.deletion_text"></span>
							</div>
						</div>
						<!-- end info-div -->

						<!-- <div ng-if="list.deletion"><span ng-bind="list.deletion_text"></span></div> -->
						<div ng-if="list.member.Active == 0" class="account-deactivated-status">
							<span>Account Deleted/Deactivated</span>
						</div>
						<button ng-if="!list.deletion && !list.schedule && list.member.Active == 1" class="btn btn-transfer-company"
							ng-click="showTransferModal(list, $event)">Transfer Account</button>

						<span ng-if="list.emp_padd_reset_wrapper">
							<div class="text-center">
								<a href="javascript:void(0)" ng-click="hideEmpPassReset(list)" class="pull-right">
									<i class="fa fa-times"></i>
								</a>
								<div class="white-space-30"></div>
								<button class="md-raised md-primary re-send-btn" ng-click="showUpdatePass(list)">Update
									Password</button>
								<div class="white-space-20"></div>
								<button class="md-raised md-primary re-send-btn"
									ng-click="resendEmployeeEmailDash($event, list)">Resend/Reset Account</button>
								<div class="white-space-20"></div>
								<button class="md-raised md-primary re-send-btn" ng-click="pinSetupShow(list)">Pin Setup</button>
								<div class="white-space-20"></div>
								<button class="md-raised md-primary re-send-btn" ng-click="unPinSetup(list, $event)">Unset Pin</button>
							</div>
						</span>

						<span ng-if="list.emp_pass_update">
							<div class>
								<a href="javascript:void(0)" ng-click="hideUpdatePass(list)" class="pull-right">
									<i class="fa fa-times"></i>
								</a>
								<div class="white-space-50"></div>
								<div class="input-container-padding">
									<md-input-container>
										<label>Email</label>
										<input type="text" ng-model="list.member.Email" disabled />
									</md-input-container>
								</div>
								<div class="input-container-padding">
									<md-input-container>
										<label>Password</label>
										<input type="text" ng-model="list.password" required />
									</md-input-container>
								</div>
								<div class="input-container-padding">
									<md-input-container>
										<label>Re-Type Password</label>
										<input type="text" ng-model="list.password2" required />
									</md-input-container>
								</div>

								<button class="md-raised md-primary re-send-btn"
									ng-click="updatePasswordEmp($event,list)">Update</button>
							</div>
						</span>

						<span ng-if="list.pin_setup_update">
							<div class>
								<a href="javascript:void(0)" ng-click="pinSetupHide(list)" class="pull-right">
									<i class="fa fa-times"></i>
								</a>
								<div class="white-space-50"></div>
								<div class="input-container-padding">
									<md-input-container>
										<label>Pin</label>
										<input type="text" ng-model="list.pin" class="number-only" required />
									</md-input-container>
								</div>
								<div class="input-container-padding">
									<md-input-container>
										<label>Re-Type Pin</label>
										<input type="text" ng-model="list.re_pin" class="number-only" required />
									</md-input-container>
								</div>

								<button class="md-raised md-primary re-send-btn" ng-click="updatePinEmp($event,list)">Update</button>
							</div>
						</span>
					</div>
					<!-- end body -->
				</template>
			</div>
		</div>

		<div class="member-list-pagination">
			<div class="global-pagination">
				<div class="prev-pagination">
					<i class="fa fa-angle-left"></i>
				</div>
				<div class="next-pagination">
					<i class="fa fa-angle-right"></i>
				</div>
				<div class="total-item">
					<span>1 - 10 of 100</span>
				</div>
				<div class="per-page-pagination">
					<span>
						<span>5</span> per page
					</span>
					<i class="fa fa-angle-down"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import corporateMemberList from "@/components/corporates/corporateMemberList";
	export default corporateMemberList;
</script>