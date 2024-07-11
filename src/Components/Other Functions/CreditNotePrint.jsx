import React from "react";
import { jsPDF } from "jspdf";
import { numberToIndianWords } from "./numberToIndianWords";

export const creditNotePrint = (csData) => {
  console.log(csData, "csData In function Rurchase rcpt,");
  console.log(csData, "csData In function Rurchase rcpt,");
  console.log(csData, "csData In function Rurchase rcpt,");
  const doc = new jsPDF({
    orientation: "portrait",
    // format: "a5",
    format: [180, 250],
  });
  doc.setDrawColor(0, 0, 0);
  doc.setFontSize(13);
  doc.setFont("times");

  doc.text("Credit Note", 77, 42);
  doc.setFontSize(10);
  doc.text("GST-No-27BBKPK5411K1ZI", 5, 42);
  doc.text(
    `Date - ${new Date(csData.createdOn).toLocaleDateString("en-GB")}`,
    135,
    42
  );
  doc.line(5, 44, 175, 44);
  doc.setFont("times");
  let y = 50; // Adjust starting Y position
  const columnWidth = 15; // Adjust column widths for A5
  const contentWidth = 120; // Adjust content width for A5
  let srNo = 1;
  let pGSrNo = 1;
  let pSSrNo = 1;
  let totalOldGoldAmount = 0;
  let totalOldNotGoldAmount = 0;
  if (csData) {
    doc.text(`Mobile - ${csData.tblCustomerDetails.mobile}`, 5, y);
    doc.text(
      `Name - ${csData.tblCustomerDetails.firstName} ${csData.tblCustomerDetails.lastName}`,
      5,
      y + 5
    );
    doc.text(
      `Address - ${csData.tblCustomerDetails.currAddStreet} ${csData.tblCustomerDetails.currAddTown} ${csData.tblCustomerDetails.currAddState} ${csData.tblCustomerDetails.currAddPinCode}`,
      5,
      y + 10
    );
    doc.text(`Invoice No - ${csData.invoiceNo}`, 125, y);
    doc.text(
      `Date - ${new Date(csData.createdOn).toLocaleDateString("en-GB")}`,
      125,
      y + 5
    );
    doc.text(
      `Email - ${
        csData.tblCustomerDetails.email.includes("@example.com")
          ? ""
          : csData.tblCustomerDetails.email
      }`,
      125,
      y + 10
    );
    doc.text(`Pan Card - ${csData.tblCustomerDetails.panNo}`, 5, y + 15);
    doc.text(`Gst No - ${csData.tblCustomerDetails.gstNo}`, 125, y + 15);
  }

  doc.line(5, y + 20, 175, y + 20);
  y = 75;
  doc.setFontSize(12);
  doc.text(`Credit Type - ${csData.creditType}`, 75, y + 15);
  doc.text(`Payment Mode - ${csData.paymentMode}`, 75, y + 25);
  doc.text(`Credit Amount - ${csData.creditAmount}`, 75, y + 35);
  doc.text(`Credit Gold - ${csData.creditGold}`, 75, y + 45);
  doc.text(`Credit Silver - ${csData.creditSilver}`, 75, y + 55);
  doc.text(`Remark - ${csData.remark}`, 15, y + 75);
  let footerY = doc.internal.pageSize.height - 40;
  doc.setFontSize(9);

  doc.text("Customer Signature", 10, footerY);

  doc.text("For S.K Khandre Jewellers", 135, footerY);

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};
