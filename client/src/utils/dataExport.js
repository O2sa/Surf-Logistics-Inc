import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";

export const handleExportCSV = (header, body) => {
  // console.log('body', body)
  const csvData = [header, ...body].map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "table.csv");
};

export function exportPdf(head = {}, body = {}, title = "table") {
  // Add text to the PDF
  const doc = new jsPDF();

  doc.autoTable({
    // useCss: true,
    // startY: 45, // Adjust start position to avoid overlap with the title
    head: [head],
    // margin: { top: 50, bottom: 40 }, // Ensure the table doesn't overlap with the header or footer
    body: body,
    styles: {
      fontSize: 12,
      // halign: 'right',
      // lang: 'ar',
      minCellWidth: 26,
    },
    headStyles: {
      // halign: 'right',
    },
    bodyStyles: {
      // halign: 'right',
    },
    columnStyles: { 0: { cellWidth: 12, } }, // Cells in first column centered and green
    // didDrawPage: function (data) {
    //   doc.text(title, pageMiddle + 36, 35, {
    //     align: "right",
    //   });

    //   // Add page number in the footer
    //   const pageNumber = doc.internal.getNumberOfPages();
    //   doc.setFontSize(12);
    //   doc.setTextColor(0, 0, 0);
    //   // doc.text(
    //   //   `الصفحة ${pageNumber}`,
    //   //   doc.internal.pageSize.width / 2,
    //   //   {
    //   //     align: "center",
    //   //   }
    //   // );
    // },
  });

  // Save the PDF
  doc.save("report.pdf");
}
