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
          <tbody v-for="(list,index) of global_spendingInvoiceData">
            <tr>
              <td>
                <div v-if="list.payment_status === 1" class="status-card paid">PAID</div>
                <div v-if="list.payment_status === 0" class="status-card unpaid">PENDING</div>
              </td>
              <td>{{ _formatDate_( list.invoice_date, null,'DD MMM,YYYY'  )  }}</td>
              <td>{{ list.invoice_number }}</td>
              <td><span class="currency-type">{{ list.currency_value }}</span> {{ list.total_amount }}</td>
              <td><span class="currency-type">{{ list.currency_value }}</span>  {{ list.amount_due }}</td>
              <td>{{ _formatDate_( list.invoice_due_date, null,'DD MMM,YYYY' ) }}</td>
              <td><span class="currency-type">{{ list.currency_value }} </span> {{ list.trail_transaction.paid_amount }}</td>
              <td>
                <span v-if="list.trail_transaction.transaction_date == null">Not Paid</span>
                <span v-if="list.trail_transaction.transaction_date != null">{{ _formatDate_( list.trail_transaction.transaction_date,null,'DD MMM,YYYY' ) }}</span>
              </td>
              <td>{{ list.trail_transaction.remarks }}</td>
              <td>
                <i @click="___showActionsSelector(list)" class="fa fa-caret-down"></i>
                <div v-click-outside="___hideAllDrop" v-if="list.global_isActionsSelectorShow" class="actions-selector">
                  <!-- <div @click="___selectActionsSelector('download-invoice',list)">View as PDF</div> -->
                  <div @click="___selectActionsSelector('download-statement',list)">Download Statement</div>
                  <div @click="___selectActionsSelector('payment-method',list)">Payment Method</div>
                  <!-- <div @click="___selectActionsSelector('view-transactions',list)">View Transactions</div> -->
                  <div @click="___selectActionsSelector('download-transactions',list)">Download Transactions</div>
                  <div @click="___selectActionsSelector('edit-invoice-dates',list)">Edit Invoice Dates</div>
                  <div v-if="list.payment_status == 1" @click="___selectActionsSelector('mark-us-unpaid',list,4)">Mark Us Unpaid</div>
                </div>
              </td>
            </tr>
            <tr v-if="list.global_isPaymentDetailsShow" class="company-drop-wrapper">
              <td colspan="10">
                <div class="company-drop-details dp-flex">
                  <div class="list-status-wrapper">
                    <div class="list-status">
                      <div v-if="list.trail_transaction.transaction_date == null">PENDING</div>
                      <div v-if="list.trail_transaction.transaction_date != null">PAID</div>
                      <div v-if="list.trail_transaction.transaction_date != null" class="paid-date">Paid Date: {{ _formatDate_(list.trail_transaction.transaction_date,null,'DD MMM,YYYY') }}</div>
                    </div>
                  </div>
                  <div>
                    <div class="dp-flex">
                      <div class="spending-input-wrapper">
                        <label>Payment Date</label>
                        <div class="date-container">
                          <v-date-picker
                            popoverDirection="bottom"
                            v-model="global_paymentTrailTrans.transaction_date"
                            :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                            :formats='formats'
                            popover-visibility="focus"
                          ></v-date-picker>
                          <i class="fa fa-caret-down"></i>
                        </div>
                      </div>
                      <div class="spending-input-wrapper">
                        <label>Payment Amount</label>
                        <input v-model="global_paymentTrailTrans.paid_amount" type="number">
                      </div>
                      <div class="spending-input-wrapper">
                        <label>Payment Remarks</label>
                        <input v-model="global_paymentTrailTrans.remarks" type="text">
                      </div>
                    </div>
                    <div class="btn-spending-container">
                      <button @click="___selectActionsSelector('payment-method',list)" class="btn-cancel">CANCEL</button>
                      <button @click="_submitPayment_()" class="btn-submit">SUBMIT</button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Modal v-if="global_isEditInvoiceModalShow" class="edit-invoice-modal">
      <div slot="header">
        <h1>Edit Statement</h1>
      </div>
      <div slot="body">
        <div class="edit-invoice-input-wrapper dp-flex">
          <div>
           <i class="fa fa-calendar-o" aria-hidden="true"></i>
          </div>
          <div>
            <label>Invoice Date</label>
            <div class="date-container">
              <v-date-picker
                popoverDirection="bottom"
                v-model="global_editStatementData.invoice_date"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                :formats='formats'
                popover-visibility="focus"
              ></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
          </div>
        </div>
        <div class="edit-invoice-input-wrapper dp-flex">
          <div>
           <i class="fa fa-calendar-o" aria-hidden="true"></i>
          </div>
          <div>
            <label>Payment Date</label>
            <div class="date-container">
              <v-date-picker
                popoverDirection="bottom"
                v-model="global_editStatementData.invoice_due_date"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                :formats='formats'
                popover-visibility="focus"
              ></v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button @click="___selectActionsSelector('edit-invoice-dates',global_editStatementData)" class="btn-close">CANCEL</button>
        <button @click="_submitInvoiceDates_()" class="btn-primary">UPDATE</button>
      </div>
    </Modal>
  </div>
</template>

<script>
	import corporateSpendingInvoice from '@/components/corporates/corporateSpendingInvoice'
	export default corporateSpendingInvoice
</script>