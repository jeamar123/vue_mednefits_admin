<template>
  <div class="download-transaction-container">
    <div class="download-btn-container">
      <button class="btn-gray">CSV Download <img :src="'../assets/img/download_emp.png'"></button>
      <button class="btn-gray">PDF Download <img :src="'../assets/img/download_emp.png'"></button>
    </div>
    <div class="download-view-transation-content">
      <div class="header-box">
        <div class="div-col">
          <p class="fw-700 fs-16">Statemt for <span>Feb - 28 Feb 2018</span></p>
          <p class="fw-700 fs-16">Full Company Statent - Panel Spending Account StackGeckos</p>
          <p>Allan Alzula</p>
          <p>+639064317892</p>
          <p>allan.alzula@gmail.com</p>
        </div>
        <div class="div-col">
          <p><img class="mednefits-new-logo" :src="'../assets/img/latest logo/Mednefits Logo V1.svg'"></p>
          <p class="fw-700 fs-16">Medicloud Pte Ltd</p>
          <p>7 Temasek Boulevard</p>
          <p>#18-02 Suntec Tower One</p>
          <p>038987</p>
          <p>Singapore</p>
          <p>+65 6254 7889</p>
          <p>mednefits.com</p></div>
      </div>
      <div class="body-one-box">
        <div class="stats">
          <p>Total Transactions</p>
          <p class="total-amount">2</p>
        </div>
        <div class="stats">
          <p>Total Spent</p>
          <p class="total-amount">SGD 89.00</p>
        </div>
      </div>
      <div class="body-tbl-box">
        <table class="download-transaction-tbl">
          <thead>
            <tr>
              <th>TRANSACTION #</th>
              <th>EMPLOYEE</th>
              <th>DEPENDENT</th>
              <th>DATE</th>
              <th>CATEGORY</th>
              <th>PROVIDER</th>
              <th>ITEM/SERVICE</th>
              <th>TOTAL AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="x in 4" :key="x.index">
              <td>STA000393</td>
              <td>Jazer Kemuel Zayas</td>
              <td></td>
              <td>01 February 2018, 05:20pm</td>
              <td>Dental</td>
              <td>StackGecko Dental</td>
              <td>Dental - Teeth Cleaning</td>
              <td>SGD 84.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
	import downloadTransactions from '@/components/corporates/downloadTransactions'
	export default downloadTransactions
</script>