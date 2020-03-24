<script>
  import axios from 'axios';
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  // import htmlToImage from 'html-to-image';

  let downloadPDFInvoice = {
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        logo : this._getBase64Image_( window.location.origin + '/assets/img/latest logo/mobile-logo-blue-latest.png' ),
      };
    },
    created(){

    },
    methods: {
      async _downloadAsPdf_(){
        const doc = new jsPDF('p','mm');
        doc.setDrawColor(238, 238, 238);
        doc.rect(5,5,doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, 'S');
        doc.autoTable({ html: '#my-table' });
        let content = [
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
        doc.autoTable({
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
          body: content,
          didDrawCell: (data) => {
            // console.log( data );
          },
        })

        doc.line(5, 70, doc.internal.pageSize.width - 5, 70);
        let content2 = [
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
        doc.autoTable({
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
          body: content2,
        })

        let content3 = [
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
        doc.autoTable({
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
          body: content3,
        })

        doc.line(5, 205, doc.internal.pageSize.width - 5, 205);
        let content4 = [
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
        doc.autoTable({
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
          body: content4,
        })

        doc.line(130, 217.5, 195, 217.5);
        let content5 = [
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
        doc.autoTable({
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
          body: content5,
        })

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
        doc.autoTable({
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
        doc.autoTable({
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
        
        // doc.save('table.pdf')
        console.log(this.logo);
        doc.addImage(this.logo, "JPEG", 60,50); 
        window.open(doc.output('bloburl'), '_blank');
      },
       _getBase64Image_(url){
        let img = new Image();
        let dataURL;
        img.src = url;
        img.onload = () => {
          let canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          let context = canvas.getContext('2d');
          context.drawImage(img, 0, 0);
          dataURL = canvas.toDataURL('image/jpeg');
          console.log(dataURL);
          return dataURL;
        }
      },
    }
  }
  
  export default downloadPDFInvoice
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporatePlanPDFDownload.scss";
</style>
