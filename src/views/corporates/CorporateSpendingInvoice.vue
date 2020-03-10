<template>
  <div class="spending-invoice-wrapper">
    <div class="spending-tbl-wrapper">
      <div class="spending-tbl-container">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Invoice Date</th>
              <th>Number</th>
              <th>Total</th>
              <th>Amount Due</th>
              <th>Payment Due</th>
              <th>Payment Amount</th>
              <th>Payment Date</th>
              <th>Payment Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="status-card paid">PAID</div>
              </td>
              <td>1 Mar 2018</td>
              <td>MC00000012</td>
              <td>SGD 89.00</td>
              <td>SGD 89.00</td>
              <td>16 Mar 2018</td>
              <td>SGD 0.00</td>
              <td>Not Paid</td>
              <td></td>
              <td>
                <i @click="___showActionsSelector()" class="fa fa-caret-down"></i>
                <div v-click-outside="___hideAllDrop" v-if="global_isActionsSelectorShow" class="actions-selector">
                  <div>View as PDF</div>
                  <div>Download Statement</div>
                  <div>Payment Method</div>
                  <div>View Transactions</div>
                  <div>Download Transactions</div>
                  <div>Edit Invoice Dates</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
	import corporateSpendingInvoice from '@/components/corporates/corporateSpendingInvoice'
	export default corporateSpendingInvoice
</script>