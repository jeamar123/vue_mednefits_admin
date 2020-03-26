<script>
  import axios from 'axios';
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'

  import { 
    _fetchViewPlanData_,
    _showPageLoading_,
    _hidePageLoading_,
  } from '../../common/functions/common_functions';

  let downloadPDFInvoice = {
    props: {
      customer_id: [String, Number],
      customer_active_plan_id: [String, Number],
      type: [String, Number],
      index: [String, Number],
    },
    data() {
      return {
        global_planData : {},
      };
    },
    created(){
      console.log(this.type);
      console.log(this.index);
      this._getPlanData_();
    },
    methods: {
      _getPlanData_() {
        let params = {
          customer_active_plan_id: this.customer_active_plan_id,
        }
        _showPageLoading_();
        _fetchViewPlanData_(params)
					.then(( res ) => {
            // console.log(res);
            if( res.status == 200 || res.status == 201 ){
              /*----- Invoice Plan/Account type -------*/
              /*----- 1 = Employee Account ------------*/
              /*----- 2 = Dependent Account -----------*/   
              /*----- 3 = Spending Deposit Account ----*/   
              /*----- 4 = Employee Refund -------------*/   
              /*----- 5 = Dependent Refund ------------*/   
              /*----- 6 = Plan Extension --------------*/
              /*---------------------------------------*/

              if(this.type == 1){
                this.global_planData = res.data.data.employee_plan;
              }
              if(this.type == 2){
                this.global_planData = res.data.data.dependent_plans[this.index];
              }
              if(this.type == 3){
                this.global_planData = res.data.data.spending_deposits[this.index];
              }
              if(this.type == 4){
                this.global_planData = res.data.data.employee_refunds[this.index];
              }
              if(this.type == 5){
                this.global_planData = res.data.data.dependent_refunds[this.index];
              }
              if(this.type == 6){
                this.global_planData = res.data.data.plan_extension;
              }
              console.log(this.global_planData);
            }
            _hidePageLoading_();
					});
      },
      async _downloadAsPdf_(){
        const pdfDoc = new jsPDF('p','mm');
        pdfDoc.setDrawColor(238, 238, 238);
        pdfDoc.autoTable({ html: '#my-table' });
        let pdfHeader = await this._renderHeader_(pdfDoc);
        let pdfSubHeader = await this._renderSubHeader_(pdfDoc);
        let pdfTable = await this._renderTable_(pdfDoc);
        let pdfTotal = await this._renderTotal_(pdfDoc);
        let pdfFooter = await this._renderFooter_(pdfDoc);
        

        console.log('pdfHeader', pdfHeader);
        console.log('pdfSubHeader', pdfSubHeader);
        console.log('pdfTable', pdfTable);
        console.log('pdfTotal', pdfTotal);
        console.log('pdfFooter', pdfFooter);
        // doc.save('table.pdf')
        window.open(pdfDoc.output('bloburl'), '_blank');
      },
      _getBase64Image_(url){
        let img = new Image();
        let canvas = document.createElement('canvas');
        let dataURL;
        img.src = url;
        let promise = new Promise((resolve, reject)	=>	{
          img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            let context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
            return dataURL;
          };
        });
        return promise;
      },
      async _renderHeader_(pdfDoc){
        pdfDoc.setTextColor(228,228,228);
        pdfDoc.setFontSize(120);
        pdfDoc.text('PAID', 70, 105, null, 30 );

        let logo = await this._getBase64Image_(window.location.origin + '/assets/img/latest logo/mobile-logo-blue-latest.png');
        pdfDoc.addImage(logo, "PNG", 15, 25, 80, 15);

        let header = [
          [
            { 
              content: '', 
              rowSpan: 10,
              styles: { 
                fontStyle: 'bold',
                font: 'helvetica',
                fontSize: 20,
                textColor: '#333',
              }  
            },
            { 
              content: 'INVOICE', 
              rowSpan: 1,
              styles: { 
                fontStyle: 'bold',
                font: 'helvetica',
                fontSize: 25,
                textColor: '#333',
              } 
            }
          ],
          [],
          [
            { 
              content: 'Medicloud Pte Ltd', 
              styles: { 
                fontStyle: 'bold',
                textColor: '#333'
              } 
            },
          ],
          [
            '7 Temasek Boulevard'
          ],
          [
            '#18-02 Suntec Tower One'
          ],
          [
            '038987'
          ],
          [],
          [
            'Singapore'
          ],
          [
            '+65 6254 7889'
          ],
          [
            'mednefits.com'
          ],
        ];
        pdfDoc.autoTable({
          theme: 'plain',
          margin: { top: 0, bottom: 0, left: 15, right: 15 },
          startY: 10,
          columns: ['', ''],
          styles: {
            font: 'helvetica',
            valign: 'middle',
            cellPadding: 0.3,
            fontSize: 11,
          },
          columnStyles: {
            1:  {
              halign: 'right',
              cellWidth: 50,
              textColor: '#444'
            }
          },
          body: header,
        })
        pdfDoc.rect(5,5,pdfDoc.internal.pageSize.width - 10, pdfDoc.internal.pageSize.height - 10, 'S');

        return true;
      },
      async _renderSubHeader_(pdfDoc){
        let subHeader = [
          [
            { 
              content: 'BILL TO', 
              rowSpan: 2,
              styles: { 
                fontStyle: 'bold',
                textColor: '#666',
              }  
            },
            { 
              content: 'Invoice Number: ', 
              rowSpan: 2,
            },
            '',
            { 
              content: 'OMC000012', 
              rowSpan: 2,
            }
          ],
          [],
          [
            'StackGeckos',
            { 
              content: 'Invoice Date: ', 
              rowSpan: 2,
            },
            '',
            { 
              content: '04 January, 2018', 
              rowSpan: 2,
            }
          ],
          [
            'Allans Alzulas'
          ],
          [
            'test, 1222',
            {
              content: 'Payment Due: ',
              rowSpan: 2,
            },
            '',
            {
              content: '27 December, 2017',
              rowSpan: 2,
            }
          ],
          [
            '',
          ],
          [
            '+639064317892',
            {
              content: 'Payment Date: ',
              rowSpan: 1,
            },
            '',
            {
              content: '27 December, 2017',
              rowSpan: 1,
            }
          ],
          [
            'allan.alzula@gmail.com',
          ],
          [
            '',
            {
              content: 'Amount Due: ',
              rowSpan: 2,
              styles:  {
                valign: 'middle',
                fillColor: [240, 240, 240]
              }
            },
            {
              content: '',
              rowSpan: 2,
              styles:  {
                valign: 'middle',
                fillColor: [240, 240, 240]
              }
            },
            {
              content: 'SGD 410',
              rowSpan: 2,
              styles:  {
                valign: 'middle',
                fillColor: [240, 240, 240]
              }
            }
          ],
          [],
        ];
        pdfDoc.autoTable({
          theme: 'plain',
          margin: { top: 0, bottom: 0, left: 15, right: 15 },
          startY: 75,
          columns: ['','','',''],
          styles: {
            font: 'helvetica',
            cellPadding: 0,
          },
          columnStyles: {
            0: {
              textColor: '#333'
            },
            1:  {
              halign: 'right',
              cellWidth: 40,
              textColor: '#333'
            },
            2:  {
              cellWidth: 3,
            },
            3:  {
              halign: 'left',
              cellWidth: 40,
              textColor: '#666'
            },
          },
          body: subHeader,
        })
        pdfDoc.line(5, 70, pdfDoc.internal.pageSize.width - 5, 70);

        return true;
      },
      async _renderTable_(pdfDoc){
        let tableHeader = [
          [
            {
              content : '',
              styles: {
                fillColor: [3, 146, 207],
              }
            },
            {
              content : 'Items',
              styles: {
                fillColor: [3, 146, 207],
                textColor: [255, 255, 255],
                halign: 'left',
                cellWidth: 80,
              }
            },
            {
              content : 'Quantity',
              styles: {
                fillColor: [3, 146, 207],
                textColor: [255, 255, 255],
              }
            },
            {
              content : 'Price',
              styles: {
                fillColor: [3, 146, 207],
                textColor: [255, 255, 255],
              }
            },
            {
              content : 'Amount',
              styles: {
                fillColor: [3, 146, 207],
                textColor: [255, 255, 255],
              }
            },
            {
              content : '',
              styles: {
                fillColor: [3, 146, 207],
              }
            },
          ],
        ];
        pdfDoc.autoTable({
          theme: 'plain',
          margin: { top: 0, bottom: 0, left: 5, right: 5 },
          startY: 120,
          columns: ['', '', '', '', '', ''],
          styles: {
            font: 'helvetica',
            halign: 'center',
            cellPadding: 0.3,
            valign: 'middle',
            minCellHeight: 10,
          },
          columnStyles: {
            0: {
              cellWidth: 8
            },
            2:  {
              cellWidth: 32,
            },
            3:  {
              cellWidth: 35,
            },
            4:  {
              cellWidth: 35,
            },
            5:  {
              cellWidth: 8
            },
          },
          body: tableHeader,
        })
        let tableBody = [
          [
            {
              content: '',
              rowSpan: 14,
            },
            {
              content: 'Standalone Mednefits Care (Corporate)',
              styles: {
                fontSize: 11,
                fontStyle: 'bold'
              }
            },
            {
              content: '116',
              rowSpan: 8,
            },
            {
              content: 'SGD 90.00',
              rowSpan: 8,
            },
            {
              content: 'SGD 10,440.00',
              rowSpan: 8,
            },
            {
              content: '',
              rowSpan: 14,
            },
          ],
          [
            'Active Type: Pro Plan'
          ],
          [
            'Active Plan ID: #180'
          ],
          [
            'No. of employees: 116'
          ],
          [
            'Billing Frequency: Annual'
          ],
          [
            'Start Date: April 07, 2019'
          ],
          [
            'End Date: April 06, 2020'
          ],
          [
            'Plan Duration: 12 months'
          ],
          [],
          [
            {
              content: 'Active Plan Type: Pro Plan'
            },
            {
              content: '24',
              rowSpan: 5,
            },
            {
              content: 'SGD 5.00',
              rowSpan: 5,
            },
            {
              content: 'SGD 120.00',
              rowSpan: 5,
            },
          ],
          [
            'No. of dependents: 24'
          ],
          [
            'Start Date: March 18, 2020'
          ],
          [
            'End Date: March 17, 2021'
          ],
          [
            'Plan Duration: 12 months'
          ],
        ];
        pdfDoc.autoTable({
          theme: 'plain',
          margin: { top: 0, bottom: 0, left: 5, right: 5 },
          startY: 135,
          columns: ['', '', '', '', '', ''],
          styles: {
            font: 'helvetica',
            halign: 'center',
            valign: 'middle',
            cellPadding: 0.3,
            fontStyle: 'bold',
          },
          columnStyles: {
            0:  {
              cellWidth: 8,
            },
            1:  {
              halign: 'left',
              fontStyle: 'normal',
            },
            2:  {
              cellWidth: 32,
            },
            3:  {
              cellWidth: 35,
            },
            4:  {
              cellWidth: 35,
            },
            5:  {
              cellWidth: 8
            },
          },
          body: tableBody,
        })
        pdfDoc.line(5, 205, pdfDoc.internal.pageSize.width - 5, 205);

        return true;
      },
      async _renderTotal_(pdfDoc){
        let total = [
          [
            '',
            {
              content : 'Total: ',
            },
            '',
            {
              content : 'SGD 10,560',
            },
            ''
          ],
          [
            '',
            {
              content : 'Amount Due: ',
            },
            '',
            {
              content : 'SGD 120',
              styles: {
                fontStyle: 'bold',
                textColor: '#333'
              }
            },
            ''
          ],
        ];
        pdfDoc.autoTable({
          theme: 'plain',
          margin: { top: 0, bottom: 0, left: 5, right: 5 },
          startY: 210,
          columns: ['', '', '', '', ''],
          styles: {
            font: 'helvetica',
            halign: 'right',
            valign: 'middle'
          },
          columnStyles: {
            0:  {
              cellWidth: 120,
            },
            1:  {
            },
            2:  {
              cellWidth: 3,
            },
            3:  {
              
            },
            4:  {
              cellWidth: 8
            },
          },
          body: total,
        })
        pdfDoc.line(130, 217.5, 195, 217.5);

        return true;
      },
      async _renderFooter_(pdfDoc){
        let stamp = await this._getBase64Image_(window.location.origin + '/assets/img/invoice bottom stamp.png');
        pdfDoc.addImage(stamp, "PNG", pdfDoc.internal.pageSize.getWidth() - 50, pdfDoc.internal.pageSize.getHeight() - 60, 35, 35);
        
        let paymentInfo = [
          [
            {
              content : 'Payment Information',
              styles: {
                textColor: '#009ec8',
                fontSize: 12,
              },
            },
          ],
          [],
          [
            {
              content : 'Corporate PayNow',
              styles: {
                fontSize: 11,
                textColor: '#333',
                fontStyle: 'bold'
              }
            },
          ],
          [
           'UEN: 201415681W'
          ],
          [],
          [
            {
              content : 'Bank Transfer:',
              styles: {
                fontSize: 11,
                textColor: '#333',
                fontStyle: 'bold'
              }
            },
          ],
          [
            'Account Name: Medicloud Pte Ltd'
          ],
          [
            'Bank Name: UNITED OVERSEAS BANK LIMITED'
          ],
          [
            'Bank A/C: 374-3069-399'
          ],
          [
            'Swift Code: UOVBSGSG - UNITED OVERSEAS BANK LIMITED'
          ],
          [
            'Bank Address: 3 Temasek Boulevard #02-735/736 Suntec City Mall Singapore 038987'
          ],
          [],
          [
            {
              content : 'Please contact us for any questions related to your invoice/contract at',
              styles: {
                textColor: '#222',
              }
            },
          ],
          [
            {
              content : 'happiness@mednefits.com',
              styles: {
                textColor: '#222',
              }
            },
          ],
          [
            ''
          ],
          [
            'Notes:Note for this invoice'
          ],
          [
            {
              content : 'Please send all payment advice to finance@mednefits.com',
              styles: {
                textColor: '#222',
              }
            },
          ],
        ];
        pdfDoc.autoTable({
          theme: 'plain',
          margin: { top: 0, bottom: 0, left: 14, right: 14 },
          startY: 215,
          columns: ['', '', '', '', ''],
          styles: {
            font: 'helvetica',
            cellPadding: 0,
            fontSize: 9,
            textColor: '#666'
          },
          body: paymentInfo,
        })
        let copyright = [
          [
            {
              content: '© 2020 Mednefits. All rights reserved',
            }
          ],
        ];
        pdfDoc.autoTable({
          theme: 'plain',
          margin: { top: 0, bottom: 0, left: 14, right: 14 },
          startY: 285,
          columns: [''],
          styles: {
            font: 'helvetica',
            cellPadding: 0,
            fontSize: 9,
            textColor: '#666',
            valign: 'middle',
            halign: 'center',
          },
          body: copyright,
        })

        return true;
      },
    }
  }
  
  export default downloadPDFInvoice
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporatePlanPDFDownload.scss";
</style>
