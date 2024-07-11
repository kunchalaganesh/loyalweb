import React from "react";
import { jsPDF } from "jspdf";
import { numberToIndianWords } from "./numberToIndianWords";

export const createPurchaseReceiptPDF = (x, csData) => {
  console.log(csData, "csData In function Rurchase rcpt,");
  console.log(csData, "csData In function Rurchase rcpt,");
  console.log(csData, "csData In function Rurchase rcpt,");
  console.log(x, "x In function Rurchase rcpt,");
  console.log(x, "x In function Rurchase rcpt,");
  console.log(x, "x In function Rurchase rcpt,");
  const doc = new jsPDF({
    orientation: "portrait",
    // format: "a5",
    format: [180, 250],
  });
  doc.setDrawColor(0, 0, 0);
  // doc.setFontSize(13);
  // doc.setFont("times");
  // if (csData.billType === "false") {
  //   doc.text("Estimate", 77, 42);
  // } else {
  //   doc.text("Tax Invoice", 77, 42);
  // }
  // doc.setFontSize(10);
  // doc.text("GST No : 27BBKPK5411K1ZI ", 5, 42);
  // doc.line(5, 44, 175, 44);
  // doc.setFont("times");
  // // doc.text("GST-No-27BBKPK5411K1ZI", 100, 35);
  let y = 50; // Adjust starting Y position
  const columnWidth = 15; // Adjust column widths for A5
  const contentWidth = 120; // Adjust content width for A5
  let srNo = 1;
  let pGSrNo = 1;
  let pSSrNo = 1;
  let totalOldGoldAmount = 0;
  let totalOldNotGoldAmount = 0;
  const purchaseItems = x.filter((product) => product.billtype === "purchase");
  console.log(x, "x");
  console.log(csData, "csData");

  if (purchaseItems.length > 0) {
    const purchaseItemsGold = x.filter(
      (product) =>
        product.billtype === "purchase" &&
        product.categoryName.toLowerCase().includes("gold")
    );
    // doc.addPage();
    doc.setFontSize(12);
    doc.setFont("times");
    doc.text(`Mod Gold URD`, 75, 40);
    doc.setFontSize(9);
    doc.setFont("times");
    let y = 45; // Adjust starting Y position
    const columnWidth = 15; // Adjust column widths for A5
    const contentWidth = 120; // Adjust content width for A5

    console.log(purchaseItemsGold, "purchaseItems");
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
      doc.text(
        `Invoice No - ${purchaseItemsGold[0].purchase_invoice_no}`,
        125,
        y
      );
      doc.text(
        `Date - ${new Date(csData.createdOn).toLocaleDateString()}`,
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
    doc.setFontSize(9);
    doc.text("No", 6, y);
    doc.text("Items", 12, y);
    doc.text("HSN", 65, y);
    doc.text("Pc/Pr", 75, y);
    // doc.text("Other", 85, y);
    doc.text("Grs.Wt", 87, y);
    doc.text("Net.Wt", 100, y);
    doc.text("Rate", 115, y);
    doc.text("CFine", 130, y);
    doc.text("Other", 145, y);
    doc.text("Price", 160, y);
    doc.line(5, y + 3, 175, y + 3);

    const maxPageHeight = doc.internal.pageSize.height - 20;
    y += 10;
    doc.setFontSize(9);

    purchaseItemsGold.forEach((item) => {
      if (y + 8 > doc.internal.pageSize.height - 10) {
        doc.addPage();
        y = 10; // Reset Y position for the new page
      }

      doc.text(pGSrNo.toString(), 6, y);
      const productName =
        item.productName && item.productName.length > 15
          ? item.productName.substring(0, 12) + "..."
          : item.productName;

      doc.text(productName ? productName : "-", 12, y);
      doc.setFontSize(7);
      doc.setFont("times", "bold");
      doc.text(
        item.hallmark_amt ? `Hallmark amt-${item.hallmark_amt}` : "",
        12,
        y + 3
      );
      doc.setFont("times", "normal");
      doc.setFontSize(9);
      doc.text(
        item.hsnCode && item.hsnCode !== "null" && item.hsnCode !== "undefined"
          ? item.hsnCode
          : "-",
        65,
        y
      );
      doc.setFontSize(7);
      doc.setFont("times", "bold");
      doc.text(item.huidCode ? `UID-${item.huidCode}` : "", 70, y + 3);
      doc.setFontSize(9);
      doc.setFont("times", "normal");
      doc.text(item.quantity !== "null" ? item.quantity : "-", 75, y);
      // doc.text("-", 85, y);
      doc.text(item.grosswt ? item.grosswt : "-", 87, y);
      doc.text(item.netWt ? item.netWt : "-", 100, y);
      doc.text(item.rate ? item.rate : "-", 115, y);
      doc.text(item.fine_percentage ? item.fine_percentage : "-", 130, y);
      const price =
        item.billtype !== "purchase"
          ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
          : parseFloat(item.price).toFixed(2);
      doc.text("-", 145, y);

      doc.text(`${parseFloat(price) * -1}`, 160, y);
      totalOldGoldAmount += parseFloat(price) * -1;
      pGSrNo++;
      y += 8;
    });

    doc.line(5, y - 3, 175, y - 3);
    y += 10;
    let totalOldGoldAmountInWords = numberToIndianWords(
      parseFloat(totalOldGoldAmount).toFixed(0)
    );

    let footerY = doc.internal.pageSize.height - 40;
    doc.setFontSize(9);
    doc.text(`Total in Words: ${totalOldGoldAmountInWords} Only`, 10, y + 5);
    // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
    // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
    // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
    doc.text("Customer Signature", 10, footerY + 8);
    doc.text(`Bill By - ${csData.billedby} `, 60, footerY + 3);
    doc.text(`Salesman - ${csData.soldby} `, 60, footerY + 8);
    doc.text("For S.K Khandre Jewellers", 135, footerY + 8);
  }
  const purchaseItemsNotGold = x.filter(
    (product) =>
      product.billtype === "purchase" &&
      !product.categoryName.toLowerCase().includes("gold")
  );
  if (purchaseItemsNotGold.length > 0) {
    doc.addPage();
    doc.setFontSize(12);
    doc.setFont("times");
    doc.text(`Mod Silver URD`, 75, 40);
    doc.setFontSize(9);
    doc.setFont("times");
    let y = 45; // Adjust starting Y position
    const columnWidth = 15; // Adjust column widths for A5
    const contentWidth = 120; // Adjust content width for A5

    // console.log(purchaseItemsNotGold, "purchaseItems");
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
      doc.text(
        // `Invoice No - ${purchaseItemsNotGold[0].invoiceNo}`,
        `Invoice No - ${purchaseItemsNotGold[0].purchase_invoice_no}`,
        125,
        y
      );
      doc.text(
        `Date - ${new Date(csData.createdOn).toLocaleDateString()}`,
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
    doc.setFontSize(9);
    doc.text("No", 6, y);
    doc.text("Items", 12, y);
    doc.text("HSN", 65, y);
    doc.text("Pc/Pr", 75, y);
    // doc.text("Other", 85, y);
    doc.text("Grs.Wt", 87, y);
    doc.text("Net.Wt", 100, y);
    doc.text("Rate", 115, y);
    doc.text("CFine", 130, y);
    doc.text("Other", 145, y);
    doc.text("Price", 160, y);
    doc.line(5, y + 3, 175, y + 3);

    const maxPageHeight = doc.internal.pageSize.height - 20;
    y += 10;
    doc.setFontSize(9);

    purchaseItemsNotGold.forEach((item) => {
      if (y + 8 > doc.internal.pageSize.height - 10) {
        doc.addPage();
        y = 10; // Reset Y position for the new page
      }

      doc.text(pSSrNo.toString(), 6, y);
      const productName =
        item.productName && item.productName.length > 15
          ? item.productName.substring(0, 12) + "..."
          : item.productName;

      doc.text(productName ? productName : "-", 12, y);
      doc.setFontSize(7);
      doc.setFont("times", "bold");
      doc.text(
        item.hallmark_amt ? `Hallmark amt-${item.hallmark_amt}` : "",
        12,
        y + 3
      );
      doc.setFont("times", "normal");
      doc.setFontSize(9);
      doc.text(
        item.hsnCode && item.hsnCode !== "null" && item.hsnCode !== "undefined"
          ? item.hsnCode
          : "-",
        65,
        y
      );
      doc.setFontSize(7);
      doc.setFont("times", "bold");
      doc.text(item.huidCode ? `UID-${item.huidCode}` : "", 70, y + 3);
      doc.setFontSize(9);
      doc.setFont("times", "normal");
      doc.text(item.quantity !== "null" ? item.quantity : "-", 75, y);
      // doc.text("-", 85, y);
      doc.text(item.grosswt ? item.grosswt : "-", 87, y);
      doc.text(item.netWt ? item.netWt : "-", 100, y);
      doc.text(item.rate ? item.rate : "-", 115, y);
      doc.text(item.fine_percentage ? item.fine_percentage : "-", 130, y);
      const price =
        item.billtype !== "purchase"
          ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
          : parseFloat(item.price).toFixed(2);
      doc.text("-", 145, y);

      doc.text(`${parseFloat(price) * -1}`, 160, y);
      totalOldNotGoldAmount += parseFloat(price) * -1;
      pSSrNo++;
      y += 8;
    });

    doc.line(5, y - 3, 175, y - 3);
    y += 10;
    let totalOldNotGoldAmountInWords = numberToIndianWords(
      parseFloat(totalOldNotGoldAmount).toFixed(0)
    );

    let footerY = doc.internal.pageSize.height - 40;
    doc.setFontSize(9);
    doc.text(`Total in Words: ${totalOldNotGoldAmountInWords} Only`, 10, y + 5);
    // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
    // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
    // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
    doc.text("Customer Signature", 10, footerY + 8);
    doc.text(`Bill By - ${csData.billedby} `, 60, footerY + 3);
    doc.text(`Salesman - ${csData.soldby} `, 60, footerY + 8);
    doc.text("For S.K Khandre Jewellers", 135, footerY + 8);
  }

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};
