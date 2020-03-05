<template>
	<div class="download-receipt-container">
    <div class="download-btn-container">
			<button class="btn-gray">Download <img :src="'../assets/img/download_emp.png'"/></button>
		</div>

		<div class="download-receipt-content">
			<div class="header-box">
				<img :src="'../assets/img/latest logo/Mednefits Logo V1.svg'"/>
				<p class="receipt-title">Receipt</p>
				<p>Invoice #OMC000039</p>
				<p class="text-gray">for StackGeckos</p>
				<p class="text-gray">paid on November 30, -0001</p>
				<div class="white-space-10"></div>
				<p>Medicloud Pte Ltd 7 <br>Temasek Boulevard <br>#18-02 Suntec <br>Tower One</p>
				<p>038987</p>
				<p>Singapore</p>
				<p>Tel: +6562547889</p>
				<p>mednefits.com</p>
				<p>happiness@mednefits.com</p>
			</div>
			<div class="body-box">
				<p>Hi,</p>
				<div class="white-space-10"></div>
				<p>Here's your payment receipt for Invoice #OMC000039, for 360.00 SGD.</p>
				<div class="white-space-10"></div>
				<p>If you have any questions, please let us know.</p>
				<div class="white-space-10"></div>
				<p>Thanks,</p>
				<p class="text-black fs-18">Your Mednefits Team</p>
			</div>
			<div class="payment-box">
				<p>Payment Amount: 360.00 SGD</p>
				<p class="note-text">Note: done</p>
			</div>
			<div class="payment-method-box">
				<p>PAYMENT METHOD: CHEQUE</p>
				<img :src="'../assets/img/paid.png'"/>
			</div>
		</div>
	</div>
</template>

<script>
	import downloadPDFReceipt from '@/components/corporates/downloadPDFReceipt'
	export default downloadPDFReceipt
</script>