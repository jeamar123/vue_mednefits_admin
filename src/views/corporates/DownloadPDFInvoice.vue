<template>
	<div class="download-pdf-container">
    <div class="download-btn-container">
			<button class="btn-gray" v-on:click="_downloadAsPdf_()">Download <img :src="'../assets/img/download_emp.png'"/></button>
		</div>

		<table id="my-table">
  <!-- ... -->
</table>

		<div id="print-content" class="download-pdf-content">
			<p class="paid-text">PAID</p>
			<div class="header-box">
				<div class="div-col">
					<img id="medne_logo" :src="'../assets/img/latest logo/Mednefits Logo V1.svg'"/>
				</div>
				<div class="div-col">
					<p class="pdf-title">Invoice</p>
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
					<p>BILL TO</p>
					<p>StackGeckos</p>
					<p>Allans Alzulas</p>
					<p>test, 1222</p>
					<div class="white-space-20"></div>
					<p>+639064317892</p>
					<p>allan.alzula@gmail.com</p>
				</div>
				<div class="div-col">
					<p><label>Invoice Number:</label> <span>OMC000012</span></p>
					<p><label>Invoice Date:</label> <span>04 January, 2018</span></p>
					<p><label>Payment Due:</label> <span>27 December, 2017</span></p>
					<p class="with-bg-gray"><label>Amount Due (SGD):</label> <span>410</span></p>
				</div>
			</div>

			<div class="body-tbl-box">
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
						<tr>
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
						<tr>
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
					</tbody>
				</table>	
			</div>

			<div class="total-box">
				<div class="total-space"></div>
				<div class="total-container">
					<p><label>Total:</label> <span><span class="txt-uppercase">SGD</span> 410.00</span></p>
					<div class="total-separator"></div>
					<p><label>Amount Due (SGD):</label> <span>410.00</span></p>
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
				<p class="note-text"><label>Notes:</label> <span>Note for this invoice</span></p>
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