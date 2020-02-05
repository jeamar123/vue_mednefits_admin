<template>
	<!-- corporate-members-container -->
	<div class="corporate-members-container">
		<!-- Search-member Start -->
		<div class="search-member-wrapper sm:pl-8 lg:ml-6 mb-10">
			<span class="oi" data-glyph="magnifying-glass" aria-hidden="true"></span>
			<div class="form-div">
				<input type="text" placeholder="Search Employee and Hit Enter..." class v-model="searchEmployee"
					@keypress.enter="searchMemberList(searchEmployee)" @input="searchEmpty(searchEmployee)" />
				<!-- @keypress.enter="searchMemberList(0, searchEmployee)" -->
			</div>
		</div>
		<!-- Search-member End -->

		<div class="member-list-container flex flex-wrap">
			<div class="member-wrapper xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2 xs:w-full my-3 mx-3" v-for="list in corporate_members"
				:key="list.index" ng-repeat="list in corporate_members | orderBy: list.member.created_at">
				<template>
					<div class="header" @click="goToEmployeeInformation(list)">
						<h3 ng-click="showHideEmployeeDetail(list, $index)">
							<span>{{list.fullname}}</span>
						</h3>
					</div>
					<!-- start body -->
					<div class="body">
						<!-- start div info-div -->
						<div class="info-div">
							<div class="info-details" v-if="list.email">
								<label class="block">Email Address:</label>
								<span class="info-bind">{{list.email}}</span>
							</div>
							<div class="info-details" v-if="!list.email">
								<label>Mobile Number:</label>
								<span class="info-bind">{{list.phone_code}}</span>
								<span class="info-bind">{{list.phone_no }}</span>
							</div>
							<div class="info-details">
								<label>Mobile Number:</label>
								<span class="info-bind">{{list.phone_code}}</span>
								<span class="info-bind">{{list.phone_no}}</span>
							</div>
							<!-- <div><label>NRIC:</label> <span ng-bind="list.member.NRIC"></span></div> -->
							<!-- <div class="info-details no-margin-bottom">
    								<label>Family Coverage:</label>
              </div>-->
							<div class="info-details">
								<label>Dependents:</label>
								<span>{{list.dependents}}</span>
							</div>
							<div class="info-details no-margin-bottom">
								<label class="block">Spending Account:</label>
								<div class="flex flex-wrap justify-between">
									<span class="w-12 xs:1/3 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mr-2"></span>
									<span class="w-1/4 xs:1/3 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mx-2">Wellness</span>
									<span class="w-1/4 xs:1/3 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mx-2">Medical</span>
								</div>
								<div class="flex flex-wrap justify-between">
									<label class="w-12 xs:1/3 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mr-2">Allocation</label>
									<div class="w-1/4 xs:1/3 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mx-2">
										<span ng-bind="corprorate_details.credits.currency_type" class="currency-type">SGD</span>
										<span>{{list.spending_account.medical.credits_allocation | currency('', 2, { thousandsSeparator: ',' }) }}</span>
									</div>
									<div class="w-1/4 xs:1/3 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mx-2">
										<span ng-bind="corprorate_details.credits.currency_type" class="currency-type">SGD</span>
										<span
											ng-bind="list.spending_account.wellness.credits_allocation">{{list.spending_account.wellness.credits_allocation_wellness | currency('', 2, { thousandsSeparator: ',' }) }}</span>
									</div>
								</div>
								<div class="flex flex-wrap justify-between">
									<label class="w-12 xs:1/3 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mr-2">Usage</label>
									<div class="w-1/4 xs:1/3 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mx-2">
										<span ng-bind="corprorate_details.credits.currency_type" class="currency-type">SGD</span>
										<span
											ng-bind="list.spending_account.medical.credits_allocation">{{list.spending_account.medical.credits_spent | currency('', 2, { thousandsSeparator: ',' }) }}</span>
									</div>
									<div class="w-1/4 xs:1/3 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 mx-2">
										<span ng-bind="corprorate_details.credits.currency_type" class="currency-type">SGD</span>
										<span
											ng-bind="list.spending_account.wellness.credits_allocation">{{list.spending_account.wellness.credits_spent_wellness | currency('', 2, { thousandsSeparator: ',' }) }}</span>
									</div>
								</div>
							</div>

							<div class="info-details">
								<label>Start Date:</label>
								<span class="info-bind" ng-bind="list.start_date | cmdate:'dd MMMM, yyyy'">{{list.start_date}}</span>
							</div>
							<div class="info-details">
								<label>End Date:</label>
								<span class="info-bind" ng-bind="list.end_date | cmdate:'dd MMMM, yyyy'">{{list.expiry_date}}</span>
							</div>
							<div class="info-details block" v-if="list.date_deleted">
								<label>Date Deleted/Remove:</label>
								<!-- lacking data sa api -->
								<span class="info-bind text-sm block">{{list.date_deleted || 'N/A'}}</span>
							</div>
							<div class="info-details" v-if="list.deletion_text || list.deletion">
								<span class="info-bind text-sm block text-red-700">{{list.deletion_text ? list.deletion_text : 'walay deletion_text sa data sa api'}}</span>
							</div>
						</div>
						<!-- end info-div -->

						<!-- <div ng-if="list.deletion"><span ng-bind="list.deletion_text"></span></div> -->
						<div v-if="list.active == false" ng-if="list.member.Active == 0"
							class="account-deactivated-status p-3 bg-red-300 text-center">
							<span class="text-red-600 text-base">Account Deleted/Deactivated</span>
						</div>
						<button v-if="!list.deletion && list.active && !list.schedule || !list.deletion && list.active && list.schedule == undefined" ng-if="!list.deletion && !list.schedule && list.member.Active == 1"
							class="btn btn-transfer-company" @click="toggleTransferAccountModal(list)">Transfer Account</button>
					</div>
					<!-- end body -->
				</template>
			</div>
		</div>

		<!-- Pagination Start -->
		<div v-show="corporate_pagination.length > 5 && !searchActive" class="custom-pagination-container">
			<div class="custom-pagination flex-wrap">
				<div class="page-wrapper">
					<div class="page-scroll-container m-0">
						<span class="prev-next-container" v-on:click="prevPage()">
							<i class="fa fa-angle-left"></i>
							<span>Prev</span>
						</span>
						<div class="pages-list">
							<span class="page-num xs:m-0" v-show="page_active > 3" v-on:click="goToPage( 1 )">1</span>
							<span v-show="page_active > 3" class="-ml-3">...</span>

							<span v-for="(list) of limitPagination" :key="list.index" class="page-num xs:m-0"
								v-bind:class="{'active' : list + 1 == page_active}"
								v-on:click="goToPage( list + 1 )">{{ list + 1 }}</span>

							<span
								v-show="corporate_pagination.totalPages > 5 && page_active < ( corporate_pagination.totalPages - 3 )"
								class="-mr-2">...</span>
							<span class="page-num"
								v-show="corporate_pagination.totalPages > 5 && page_active < ( corporate_pagination.totalPages - 3 )"
								v-on:click="goToPage( corporate_pagination.totalPages )">{{ corporate_pagination.totalPages }}</span>
						</div>
						<span class="prev-next-container" v-on:click="nextPage()">
							<span>Next</span>
							<i class="fa fa-angle-right"></i>
						</span>
					</div>
				</div>
				<div class="custom-list-per-page px-8">
					<span v-on:click="togglePageLimitDrop()">
						<span>{{ page_limit }}</span> per page
					</span>
					<span v-on:click="togglePageLimitDrop()">
						<i class="fa fa-caret-down"></i>
					</span>
					<div class="opened-per-page-scroll" v-if="isPageLimitDropShow">
						<span v-on:click="setPageLimit( 10 )">10 per page</span>
						<span v-on:click="setPageLimit( 25)">25 per page</span>
						<span v-on:click="setPageLimit( 50 )">50 per page</span>
						<span v-on:click="setPageLimit( 100 )">100 per page</span>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="member-list-pagination">
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
    </div>-->
		<!-- Pagination End -->

		<!-- Modal Start -->
		<Modal v-if="showTransferAccountModal" class="transfer-account">
			<div slot="header" class="h-20 flex items-center px-6 text-2xl">
				<h1>Transfer Account</h1>
			</div>
			<div slot="body" class="p-6 pb-12 text-xl">
				<div class="trans-comp-container">
					<div v-if="!showTransferCompanySummary">
						<div>
							User:
							<span class="text-gray-900">{{selected_transfer_data.name}}</span>
						</div>
						<div>
							ID:
							<span class="text-gray-600">{{selected_transfer_data.member_id}}</span>
						</div>
						<div>
							Company:
							<span class="text-gray-600">{{selected_transfer_data.current_company}}</span>
						</div>

						<div class="pt-8 pb-3">Transfer Date/Start Date</div>
						<v-date-picker popoverDirection="bottom" :formats="formats" v-model="selected_transfer_data.transfer_date"
							:input-props='{class: "vDatepicker border border-gray-400 w-full h-10 rounded-sm px-4 cursor-pointer", placeholder: "DD/MM/YYYY", readonly: true, }'
							popover-visibility="focus"></v-date-picker>
						<!-- <md-datepicker ng-model="selected_user_data.transfer_start_date" md-hide-icons="calendar"></md-datepicker> -->

						<div class="pb-3 pt-4">Transfer to:</div>

						<div class="transfer-to-wrapper">
							<input class="border border-gray-400 w-full h-10 rounded-sm" type="text"
								v-model="selected_transfer_data.company"
								@keypress="companyTransferTyping( selected_transfer_data.company )" />
							<div v-show="showCompanyDrop" class="company-list-drop">
								<div class="company"
									v-for="list in filterBy(company_list, selected_transfer_data.company , 'company_name')"
									:key="list.index" @click="setCustomerId( list )">
									<span>{{list.company_name}}</span>
								</div>
							</div>
						</div>
					</div>

					<div v-if="showTransferCompanySummary">
						<div>Summary</div>
						<div>
							Name:
							<span class="text-gray-600">{{selected_transfer_data.name}}</span>
						</div>
						<div>
							ID:
							<span class="text-gray-600">{{selected_transfer_data.member_id}}</span>
						</div>
						<div>
							Current Company:
							<span class="text-gray-600">{{selected_transfer_data.current_company}}</span>
						</div>
						<div>
							Transfer date/Start date:
							<span class="text-gray-600">{{selected_transfer_data.transfer_date}}</span>
						</div>
						<div>
							Transfer to:
							<span class="text-gray-600">{{selected_transfer_data.company}}</span>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer" class="flex justify-end items-center px-3 pb-3">
				<h3 v-if="false" ng-bind="text_status.error">Status Error</h3>
				<button v-if="!showTransferCompanySummary" class="btn-primary bg-white text-black mx-1"
					@click="toggleTransferAccountModal()">Cancel</button>
				<button v-if="!showTransferCompanySummary" class="btn-primary mx-1" aria-label="s"
					@click="toggleTransferCompSummary()">
					<span>Proceed</span>
				</button>
				<button v-if="showTransferCompanySummary" class="btn-primary mx-1"
					@click="toggleTransferCompSummary()">Back</button>
				<button v-if="showTransferCompanySummary" class="btn-primary mx-1" aria-label="s"
					@click="updateTransferCompanyBtn(selected_transfer_data)">
					<span>Submit</span>
				</button>
			</div>
		</Modal>
		<!-- Modal End -->

		<!-- <transition name="fade">
			<Loader v-if="showLoader"></Loader>
		</transition> -->
	</div>
	<!-- End corporate-members-container -->
</template>

<script>
	import corporateMemberList from "@/components/corporates/corporateMemberList";
	export default corporateMemberList;
</script>