<template>
	<div class="download-pdf-container">
		<table id="my-table"></table>
    <div class="download-btn-container">
			<button class="btn-gray" v-on:click="_downloadAsPdf_()">Download <img :src="'../assets/img/download_emp.png'"/></button>
		</div>

		

		<div id="print-content" class="download-pdf-content">
			<p class="paid-text">PAID</p>
			<div class="header-box">
				<div class="div-col">
					<img id="medne_logo" :src="'../assets/img/latest logo/Mednefits Logo V1.svg'"/>
				</div>
				<div class="div-col">
					<p v-if="true" class="pdf-title">Invoice</p>

					<!-- Employee refund invoice download in spending invoice -->
					<p v-if="false" class="pdf-title">CANCELLATION</p>

					<p class="fw-700 fs-16">Medicloud Pte Ltd</p>
					<p>7 Temasek Boulevard</p>
					<p>#18-02 Suntec Tower One</p>
					<p>038987</p>
					<p>Singapore</p>
					<p>+65 6254 7889</p>
					<p>mednefits.com</p>
				</div>
			</div>

			<div class="body-one-box">
				<div class="div-col">
					<p v-if="true">BILL TO</p>
					<!-- Spending Invoice in corporate details -->
					<p v-if="false">Team Benefits Statement</p>

					<p>StackGeckos</p>
					<p>Allans Alzulas</p>
					<p>test, 1222</p>
					<div class="white-space-20"></div>
					<p>+639064317892</p>
					<p>allan.alzula@gmail.com</p>
				</div>
				<div class="div-col">
					<p v-if="true"><label>Invoice Number:</label> <span>OMC000012</span></p>
					<p v-if="true"><label>Invoice Date:</label> <span>04 January, 2018</span></p>

					<!-- Spending Invoice in corporate details -->
					<p v-if="false"><label>Statement Number:</label> <span>OMC000012</span></p>
					<p v-if="false"><label>Statement Date:</label> <span>04 January, 2018</span></p>

					<p><label>Payment Due:</label> <span>27 December, 2017</span></p>
					<p><label>Payment Date:</label> <span>27 December, 2017</span></p>
					<p class="with-bg-gray"><label>Amount Due:</label> <span>SGD 410</span></p>
				</div>
			</div>

			<div v-if="true" class="body-tbl-box">
				<table>
					<thead>
						<tr>
							<th>Items</th>
							<th>Quantity</th>
							<th>Price</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="true">
							<td>
								<p class="plan-name">Standalone Mednefits Care (Corporate)</p>
								<p><label>Active Type:</label> <span>Pro Plan</span></p>
								<p><label>Active Plan ID:</label> <span>#1</span></p>
								<p><label>No. of employees:</label> <span>4</span></p>
								<p><label>Billing Frequency:</label> <span>Annual</span></p>
								<p><label>Start Date:</label> <span>03 January, 2018</span></p>
								<p><label>End Date:</label> <span>03 January, 2018</span></p>
								<p><label>Plan Duration:</label> <span>12 months</span></p>
							</td>
							<td>4</td>
							<td>
								<span class="txt-uppercase">SGD</span> 90.00
							</td>
							<td>
								<span class="txt-uppercase">SGD</span> 360.00
							</td>
						</tr>
						<tr v-if="true">
							<td>
								<p><label>Active Plan Type:</label> <span>Lite Plan</span></p>
								<p><label>No. of dependents:</label> <span>4</span></p>
								<p><label>Start Date:</label> <span>03 January, 2018</span></p>
								<p><label>End Date:</label> <span>03 January, 2018</span></p>
								<p><label>Plan Duration:</label> <span>12 months</span></p>
							</td>
							<td>4</td>
							<td>
								<span class="txt-uppercase">SGD</span> 5.00
							</td>
							<td>
								<span class="txt-uppercase">SGD</span> 50.00
							</td>
						</tr>
						<!-- Employee refund invoice download in spending invoice -->
						<tr v-if="false">
							<td>
								<p><label>Cancellation - </label> <span>Allan Cheam Alzula</span></p>
								<p><label>Member: </label> <span>Allan Cheam Alzula</span></p>
								<p><label>Period of use: </label> <span>01/01/2018</span> <span>04/01/2018</span></p>
								<p><label>Refund: </label> <span>70% of unused period(<span>04/01/2018</span> - <span>02/01/2019</span>)</span></p>
							</td>
							<td>1</td>
							<td>SGD <span>62.31</span></td>
							<td>SGD <span>62.31</span></td>
						</tr>
					</tbody>
				</table>	
			</div>

			<div v-if="true" class="total-box">
				<div class="total-space"></div>
				<div class="total-container">
					<p><label>Total:</label> <span><span class="txt-uppercase">SGD</span> 410.00</span></p>
					<div class="total-separator"></div>
					<p><label>Amount Due (SGD):</label> <span>410.00</span></p>
				</div>
			</div>

			<!-- Spending Invoice in corporate details -->
			<div v-if="false" class="summary-charges">
				<h4>Summary of Charges</h4>
				<div class="charges-row dp-flex">
					<div class="flex-1">
						<div>Panel Spending Account Usage</div>
						<p>Statement for 01 February to 28 February 2018</p>
					</div>
					<div>SGD 89.00</div>					
				</div>
				<div class="sub-total-row dp-flex">
					<div class="flex-1">Sub Total</div>
					<div>SGD 89.00</div>
				</div>
				<div class="total-due-row">
					<div class="dp-flex">
						<div class="flex-1">Total Due</div>
						<div>SGD 89.00</div>
					</div>
				</div>
			</div>

			<div class="notes-box">
				<p class="text-blue">Payment Information</p>
				<p class="text-bold-black">Corporate PayNow</p>
				<p><label>UEN:</label> 201415681W</p>
				<div class="white-space-10"></div>
				<p class="text-bold-black">Bank Transfer:</p>
				<p><label>Account Name:</label> Medicloud Pte Ltd</p>
				<p><label>Bank Name:</label> UNITED OVERSEAS BANK LIMITED</p>
				<p><label>Bank A/C:</label> 374-3069-399</p>
				<p><label>Swift Code:</label> UOVBSGSG - UNITED OVERSEAS BANK LIMITED</p>
				<p><label>Bank Address:</label> 3 Temasek Boulevard #02-735/736 Suntec City Mall Singapore 038987</p>
				<div class="white-space-10"></div>
				<p class="text-black">Please contact us for any questions related to your invoice/contract at</p>
				<p class="text-black">happiness@mednefits.com</p>
				<p class="note-text"><label>Notes:</label> 
					<span v-if="true">Note for this invoice</span>
					
					<!-- Employee refund invoice download in spending invoice -->
					<span v-if="false">Cancellation refund will be made to the company by cheque in 10 - 14 working days</span>
				</p>
				<p class="text-black fs-12">Please send all payment advice to finance@mednefits.com</p>
			</div>

			<p class="copyright">&copy; 2020 Mednefits. All rights reserved</p>
		</div>
		
	</div>
</template>

<script>
	import downloadPDFInvoice from '@/components/corporates/downloadPDFInvoice'
	export default downloadPDFInvoice
</script>