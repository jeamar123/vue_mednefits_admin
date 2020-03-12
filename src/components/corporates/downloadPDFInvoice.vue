<script>
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  // import htmlToImage from 'html-to-image';

  let downloadPDFInvoice = {
    props: {
      customer_id: [String, Number],
    },
    data() {
      return {
        
      };
    },
    created(){

    },
    methods: {
      _downloadAsPdf_(){
        const doc = new jsPDF();

        doc.autoTable({ html: '#my-table' })
        let content = [
          [
            { content: '', rowSpan: 10, styles: { valign: 'center' } },
            { 
              content: 'INVOICE', 
              styles: { 
                halign: 'right',
                fontStyle: 'bold',
                font: 'helvetica',
                fontSize: 20,
                textColor: '#222'
              } 
            }
          ],
          [],
          [
            { 
              content: 'Medicloud Pte Ltd', 
              styles: { 
                halign: 'right',
                fontStyle: 'bold'
              } 
            },
          ],
          [
            { content: '7 Temasek Boulevard', styles: { halign: 'right' } },
          ],
          [
            { content: '#18-02 Suntec Tower One', styles: { halign: 'right' } },
          ],
          [
            { content: '038987', styles: { halign: 'right' } },
          ],
          [
            { content: 'Singapore', styles: { halign: 'right' } },
          ],
          [],
          [
            { content: '+65 6254 7889', styles: { halign: 'right' } },
          ],
          [
            { content: 'mednefits.com', styles: { halign: 'right' } },
          ],
        ];
        doc.autoTable({
          margin: {
            top: 0,
            bottom: 0
          },
          theme: 'plain',
          columns: ['',''],
          styles: {
            // lineWidth: 1,
          },
          columnStyles: {
            0:  {

            }
          },
          body: content,
          didDrawCell: function (data) {
            console.log( data );
            // if(data.row.index === 0 && data.column.dataKey === 0){
            //       var img = new Image();
            //       var svg = new XMLSerializer().serializeToString(document.getElementById("medne_logo"));
            //       var base64 = window.btoa(svg);
            //       var imgSource = `data:image/svg+xml;base64,${base64}`;
            //       img.src = imgSource;
            //       console.log(img);
            //       setTimeout(() => {
            //         var canvas = document.createElement('canvas');
            //         var ctx = canvas.getContext('2d');
            //         canvas.height = 46;
            //         canvas.width = 250;
            //         ctx.drawImage(img, 0, 0);
            //         var dataURL = canvas.toDataURL();
            //         // callback(dataURL);
            //         doc.addImage(dataURL, 'JPEG', 0, 0);
            //         window.open(doc.output('bloburl'), '_blank');
            //       }, 1000);
            // }
          },
        })
        
        // doc.save('table.pdf')
        window.open(doc.output('bloburl'), '_blank');
        
      }
    }
  }
  
  export default downloadPDFInvoice
</script>

<style lang="scss" scoped>
	@import "./src/assets/css/corporatePlanPDFDownload.scss";
</style>
