<script>
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'

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
        const doc = new jsPDF()
        doc.autoTable({ html: '#my-table' })
        doc.autoTable({
          body: [
            ['David', 'david@example.com', 'Sweden'],
            ['Castille', 'castille@example.com', 'Norway'],
            // ...
          ],
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
