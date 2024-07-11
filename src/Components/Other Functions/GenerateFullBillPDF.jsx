import React from "react";
import { jsPDF } from "jspdf";
import { numberToIndianWords } from "./numberToIndianWords";

// SKKhandre Bill Below
// export const generateFullBillPDF = (x, csData) => {
//   const doc = new jsPDF({
//     orientation: "portrait",
//     // format: "a5",
//     format: [180, 250],
//   });

//   doc.setDrawColor(0, 0, 0);
//   doc.setFontSize(13);
//   doc.setFont("times");
//   if (csData.billType === "false") {
//     doc.text("Estimate", 77, 42);
//   } else {
//     doc.text("Tax Invoice", 77, 42);
//   }
//   doc.setFontSize(10);
//   doc.text("GST No : 27BBKPK5411K1ZI ", 5, 42);
//   doc.line(5, 44, 175, 44);
//   doc.setFont("times");
//   // doc.text("GST-No-27BBKPK5411K1ZI", 100, 35);
//   let y = 50; // Adjust starting Y position
//   const columnWidth = 15; // Adjust column widths for A5
//   const contentWidth = 120; // Adjust content width for A5
//   let srNo = 1;
//   let pGSrNo = 1;
//   let pSSrNo = 1;
//   let totalOldGoldAmount = 0;
//   let totalOldNotGoldAmount = 0;
//   const purchaseItems = x.filter((product) => product.billtype === "purchase");
//   console.log(x, "x");
//   console.log(csData, "csData");
//   if (csData) {
//     doc.text(`Mobile - ${csData.tblCustomerDetails.mobile}`, 5, y);
//     doc.text(
//       `Name - ${csData.tblCustomerDetails.firstName} ${csData.tblCustomerDetails.lastName}`,
//       5,
//       y + 5
//     );
//     doc.text(
//       `Address - ${csData.tblCustomerDetails.currAddStreet} ${csData.tblCustomerDetails.currAddTown} ${csData.tblCustomerDetails.currAddState} ${csData.tblCustomerDetails.currAddPinCode}`,
//       5,
//       y + 10
//     );
//     doc.text(`Invoice No - ${csData.invoiceNo}`, 125, y);
//     doc.text(
//       `Date - ${new Date(csData.createdOn).toLocaleDateString("en-GB")}`,
//       125,
//       y + 5
//     );
//     doc.text(
//       `Email - ${
//         csData.tblCustomerDetails.email.includes("@example.com")
//           ? ""
//           : csData.tblCustomerDetails.email
//       }`,
//       125,
//       y + 10
//     );
//     doc.text(`Pan Card - ${csData.tblCustomerDetails.panNo}`, 5, y + 15);
//     doc.text(`Gst No - ${csData.tblCustomerDetails.gstNo}`, 125, y + 15);
//   }

//   doc.line(5, y + 20, 175, y + 20);
//   y = 75;
//   doc.setFontSize(9);
//   doc.text("No", 6, y);
//   doc.text("Items", 12, y);
//   doc.text("HSN", 65, y);
//   doc.text("Pc/Pr", 75, y);
//   doc.text("Purity", 85, y);
//   doc.text("Grs.Wt", 95, y);
//   doc.text("Net.Wt", 107, y);
//   doc.text("Rate", 119, y);
//   doc.text("Orn Amt", 130, y);
//   doc.text("Labour", 145, y);
//   doc.text("Price", 160, y);
//   doc.line(5, y + 3, 175, y + 3);

//   const maxPageHeight = doc.internal.pageSize.height - 20;
//   y += 10;
//   doc.setFontSize(9);
//   let soldProducts = x.filter((product) => product.billtype !== "purchase");

//   soldProducts.forEach((item) => {
//     if (y + 8 > doc.internal.pageSize.height - 10) {
//       doc.addPage();
//       y = 10; // Reset Y position for the new page
//     }

//     doc.text(srNo.toString(), 6, y);
//     const productName =
//       item.productName && item.productName.length > 15
//         ? item.productName.substring(0, 12) + "..."
//         : item.productName;

//     doc.text(productName ? productName : "-", 12, y);
//     doc.setFontSize(7);
//     doc.setFont("times", "bold");
//     doc.text(
//       item.hallmark_amt ? `Hallmark amt-${item.hallmark_amt}` : "",
//       12,
//       y + 3
//     );
//     doc.setFont("times", "normal");
//     doc.setFontSize(9);
//     doc.text(
//       item.hsnCode && item.hsnCode !== "null" && item.hsnCode !== "undefined"
//         ? item.hsnCode
//         : "-",
//       65,
//       y
//     );
//     doc.setFontSize(7);
//     doc.setFont("times", "bold");
//     doc.text(item.huidCode ? `UID-${item.huidCode}` : "", 70, y + 3);
//     doc.setFontSize(9);
//     doc.setFont("times", "normal");
//     doc.text(item.quantity !== "null" ? item.quantity : "-", 75, y);
//     doc.text(item.purity ? item.purity : "-", 85, y);
//     doc.text(item.grosswt ? item.grosswt : "-", 95, y);
//     doc.text(item.netWt ? item.netWt : "-", 107, y);
//     if (item.mrp !== 0 && item.mrp !== "" && item.mrp !== "0") {
//       doc.text(`MRP -`, 119, y);
//       doc.text(`${parseFloat(item.mrp).toFixed(2)}`, 130, y);
//     } else {
//       doc.text(item.rate ? item.rate : "-", 119, y);
//       doc.text(
//         parseFloat(
//           (parseFloat(item.rate) / 10) * parseFloat(item.netWt)
//         ).toFixed(2),
//         130,
//         y
//       );
//     }
//     const price =
//       item.billtype !== "purchase"
//         ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
//         : parseFloat(item.price).toFixed(2);
//     const makingCharges = [
//       item.making_fixed_amt,
//       item.making_fixed_wastage,
//       item.making_per_gram,
//       item.making_percentage,
//     ];

//     // Filter out null, empty, or zero making charges
//     const validMakingCharges = makingCharges.filter(
//       (charge) => charge !== null && parseInt(charge) !== 0
//     );

//     // Choose making charge(s) based on the number of valid charges
//     let makingChargeText = "";
//     if (validMakingCharges.length > 1) {
//       makingChargeText = `${parseFloat(item.makingchrg).toFixed(0)}`;
//     } else if (
//       item.making_percentage !== null &&
//       parseInt(item.making_percentage) !== 0
//     ) {
//       makingChargeText = `${parseFloat(item.making_percentage).toFixed(0)}%`;
//     } else if (
//       item.making_per_gram !== null &&
//       parseInt(item.making_per_gram) !== 0
//     ) {
//       makingChargeText = `${parseFloat(item.making_per_gram).toFixed(0)}/Gm`;
//     } else if (validMakingCharges.length === 1) {
//       makingChargeText = `${parseFloat(validMakingCharges[0]).toFixed(0)}`;
//     } else {
//       makingChargeText = `${parseFloat(item.makingchrg).toFixed(0)}`;
//     }

//     // Add making charge to PDF
//     doc.text(makingChargeText, 145, y);
//     // doc.text("0.00", 115, y);
//     doc.text(price, 160, y);
//     srNo++;
//     y += 8;
//   });

//   doc.line(5, y - 3, 175, y - 3);
//   y += 10;
//   doc.setFontSize(7);
//   if (purchaseItems.length > 0) {
//     doc.line(10, y - 4, 75, y - 4);
//     y += 0;
//     doc.text("Item", 11, y);
//     doc.text("Inv No", 36, y);
//     doc.text("Amount", 61, y);
//     doc.line(10, y - 4, 10, y + 2);
//     doc.line(35, y - 4, 35, y + 2);
//     doc.line(60, y - 4, 60, y + 2);
//     doc.line(75, y - 4, 75, y + 2);

//     y += 4;
//     doc.line(10, y - 3, 75, y - 3);

//     purchaseItems.forEach((product) => {
//       y += 4;
//       doc.line(10, y - 6, 10, y + 2);
//       doc.line(35, y - 6, 35, y + 2);
//       doc.line(60, y - 6, 60, y + 2);
//       doc.line(75, y - 6, 75, y + 2);
//       doc.text(product.productName || "N/A", 11, y);
//       // doc.text(parseFloat(product.netWt).toFixed(3) || "0", 41, y);
//       doc.text(product.purchase_invoice_no || "0", 36, y);
//       doc.text((parseFloat(product.price) * -1).toFixed(0) || "0", 61, y);
//     });

//     y += 5;
//     doc.line(10, y - 3, 75, y - 3);
//   }

//   let paymentModes = csData.paymentMode ? csData.paymentMode.split(",") : [];
//   doc.setFontSize(9);
//   y += 10;
//   doc.text(`Payment Mode`, 10, y);
//   let yPaymentModes = y + 5;
//   paymentModes.forEach((paymentMode) => {
//     if (yPaymentModes > maxPageHeight - 10) {
//       doc.addPage();
//       yPaymentModes = 5;
//     }
//     const [mode, amount] = paymentMode.split(":");
//     doc.text(`${mode}`, 10, yPaymentModes);
//     doc.text(`${amount}`, 10 + columnWidth, yPaymentModes);
//     yPaymentModes += 5;
//   });

//   let totalSaleAmount = soldProducts.reduce((total, product) => {
//     return total + parseFloat((parseFloat(product.price) * 100) / 103 || 0);
//   }, 0);

//   let payableGst = parseFloat(totalSaleAmount) * 0.03;

//   y += 10;
//   if (csData.tblCustomerDetails.currAddState === "Maharashtra") {
//     doc.text(`Sales Amount:`, 125, y);
//     doc.text(`${parseFloat(totalSaleAmount).toFixed(2)}`, 155, y);
//     doc.text(`R.O./Discount:`, 125, y + 5);
//     doc.text(`${csData.offer}`, 155, y + 5);
//     doc.text(`CGST 1.5%:`, 125, y + 10);
//     doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 155, y + 10);
//     doc.text(`SGST 1.5%:`, 125, y + 15);
//     doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 155, y + 15);
//   } else {
//     doc.text(`Sales Amount:`, 125, y + 5);
//     doc.text(`${parseFloat(totalSaleAmount).toFixed(2)}`, 155, y + 5);
//     doc.text(`R.O./Discount:`, 125, y + 10);
//     doc.text(`${csData.offer}`, 155, y + 10);
//     doc.text(`IGST 3%:`, 125, y + 15);
//     doc.text(`${parseFloat(payableGst).toFixed(2)}`, 155, y + 15);
//   }
//   doc.text(`Purchase Amount (-):`, 125, y + 20);
//   doc.text(`${parseFloat(csData.purchaseAmt).toFixed(2)}`, 155, y + 20);
//   doc.text(`Recieved Amount:`, 125, y + 25);
//   doc.text(`${parseFloat(csData.receivedAmt).toFixed(2)}`, 155, y + 25);
//   doc.text(`Balance Amount:`, 125, y + 30);
//   doc.text(
//     `${parseFloat(
//       parseFloat(csData.price) - parseFloat(csData.receivedAmt)
//     ).toFixed(2)}`,
//     155,
//     y + 30
//   );
//   doc.text(`Total:`, 125, y + 35);
//   doc.text(`${parseFloat(csData.price).toFixed(2)}`, 155, y + 35);
//   let totalAmountInWords = numberToIndianWords(
//     parseFloat(csData.price).toFixed(0)
//   );
//   doc.text(`Total in Words: ${totalAmountInWords} Only`, 10, y + 40);

//   let footerY = doc.internal.pageSize.height - 40;
//   doc.setFontSize(9);
//   // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
//   // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
//   // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
//   doc.text("Customer Signature", 10, footerY);
//   doc.text(`Bill By - ${csData.billedby} `, 60, footerY - 5);
//   doc.text(`Salesman - ${csData.soldby} `, 60, footerY);
//   doc.text("For S.K Khandre Jewellers", 135, footerY);

//   if (purchaseItems.length > 0) {
//     const purchaseItemsGold = x.filter(
//       (product) =>
//         product.billtype === "purchase" &&
//         product.categoryName.toLowerCase().includes("gold")
//     );
//     doc.addPage();
//     doc.setFontSize(12);
//     doc.setFont("times");
//     doc.text(`Mod Gold URD`, 75, 40);
//     doc.setFontSize(9);
//     doc.setFont("times");
//     let y = 45; // Adjust starting Y position
//     const columnWidth = 15; // Adjust column widths for A5
//     const contentWidth = 120; // Adjust content width for A5

//     console.log(purchaseItemsGold, "purchaseItems");
//     if (csData) {
//       doc.text(`Mobile - ${csData.tblCustomerDetails.mobile}`, 5, y);
//       doc.text(
//         `Name - ${csData.tblCustomerDetails.firstName} ${csData.tblCustomerDetails.lastName}`,
//         5,
//         y + 5
//       );
//       doc.text(
//         `Address - ${csData.tblCustomerDetails.currAddStreet} ${csData.tblCustomerDetails.currAddTown} ${csData.tblCustomerDetails.currAddState} ${csData.tblCustomerDetails.currAddPinCode}`,
//         5,
//         y + 10
//       );
//       doc.text(
//         `Invoice No - ${purchaseItemsGold[0].purchase_invoice_no}`,
//         125,
//         y
//       );
//       doc.text(
//         `Date - ${new Date(csData.createdOn).toLocaleDateString("en-GB")}`,
//         125,
//         y + 5
//       );
//       doc.text(
//         `Email - ${
//           csData.tblCustomerDetails.email.includes("@example.com")
//             ? ""
//             : csData.tblCustomerDetails.email
//         }`,
//         125,
//         y + 10
//       );
//       doc.text(`Pan Card - ${csData.tblCustomerDetails.panNo}`, 5, y + 15);
//       doc.text(`Gst No - ${csData.tblCustomerDetails.gstNo}`, 125, y + 15);
//     }
//     doc.line(5, y + 20, 175, y + 20);
//     y = 75;
//     doc.setFontSize(9);
//     doc.text("No", 6, y);
//     doc.text("Items", 12, y);
//     doc.text("HSN", 65, y);
//     doc.text("Pc/Pr", 75, y);
//     // doc.text("Other", 85, y);
//     doc.text("Grs.Wt", 87, y);
//     doc.text("Net.Wt", 100, y);
//     doc.text("Rate", 115, y);
//     doc.text("CFine", 130, y);
//     doc.text("Other", 145, y);
//     doc.text("Price", 160, y);
//     doc.line(5, y + 3, 175, y + 3);

//     const maxPageHeight = doc.internal.pageSize.height - 20;
//     y += 10;
//     doc.setFontSize(9);

//     purchaseItemsGold.forEach((item) => {
//       if (y + 8 > doc.internal.pageSize.height - 10) {
//         doc.addPage();
//         y = 10; // Reset Y position for the new page
//       }

//       doc.text(pGSrNo.toString(), 6, y);
//       const productName =
//         item.productName && item.productName.length > 15
//           ? item.productName.substring(0, 12) + "..."
//           : item.productName;

//       doc.text(productName ? productName : "-", 12, y);
//       doc.setFontSize(7);
//       doc.setFont("times", "bold");
//       doc.text(
//         item.hallmark_amt ? `Hallmark amt-${item.hallmark_amt}` : "",
//         12,
//         y + 3
//       );
//       doc.setFont("times", "normal");
//       doc.setFontSize(9);
//       doc.text(
//         item.hsnCode && item.hsnCode !== "null" && item.hsnCode !== "undefined"
//           ? item.hsnCode
//           : "-",
//         65,
//         y
//       );
//       doc.setFontSize(7);
//       doc.setFont("times", "bold");
//       doc.text(item.huidCode ? `UID-${item.huidCode}` : "", 70, y + 3);
//       doc.setFontSize(9);
//       doc.setFont("times", "normal");
//       doc.text(item.quantity !== "null" ? item.quantity : "-", 75, y);
//       // doc.text("-", 85, y);
//       doc.text(item.grosswt ? item.grosswt : "-", 87, y);
//       doc.text(item.netWt ? item.netWt : "-", 100, y);
//       doc.text(item.rate ? item.rate : "-", 115, y);
//       doc.text(item.fine_percentage ? item.fine_percentage : "-", 130, y);
//       const price =
//         item.billtype !== "purchase"
//           ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
//           : parseFloat(item.price).toFixed(2);
//       doc.text("-", 145, y);

//       doc.text(`${parseFloat(price) * -1}`, 160, y);
//       totalOldGoldAmount += parseFloat(price) * -1;
//       pGSrNo++;
//       y += 8;
//     });

//     doc.line(5, y - 3, 175, y - 3);
//     y += 10;
//     let totalOldGoldAmountInWords = numberToIndianWords(
//       parseFloat(totalOldGoldAmount).toFixed(0)
//     );

//     let footerY = doc.internal.pageSize.height - 40;
//     doc.setFontSize(9);
//     doc.text(`Total in Words: ${totalOldGoldAmountInWords} Only`, 10, y + 5);
//     // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
//     // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
//     // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
//     doc.text("Customer Signature", 10, footerY + 8);
//     doc.text(`Bill By - ${csData.billedby} `, 60, footerY + 3);
//     doc.text(`Salesman - ${csData.soldby} `, 60, footerY + 8);
//     doc.text("For S.K Khandre Jewellers", 135, footerY + 8);
//   }
//   const purchaseItemsNotGold = x.filter(
//     (product) =>
//       product.billtype === "purchase" &&
//       !product.categoryName.toLowerCase().includes("gold")
//   );
//   if (purchaseItemsNotGold.length > 0) {
//     doc.addPage();
//     doc.setFontSize(12);
//     doc.setFont("times");
//     doc.text(`Mod Silver URD`, 75, 40);
//     doc.setFontSize(9);
//     doc.setFont("times");
//     let y = 45; // Adjust starting Y position
//     const columnWidth = 15; // Adjust column widths for A5
//     const contentWidth = 120; // Adjust content width for A5

//     // console.log(purchaseItemsNotGold, "purchaseItems");
//     if (csData) {
//       doc.text(`Mobile - ${csData.tblCustomerDetails.mobile}`, 5, y);
//       doc.text(
//         `Name - ${csData.tblCustomerDetails.firstName} ${csData.tblCustomerDetails.lastName}`,
//         5,
//         y + 5
//       );
//       doc.text(
//         `Address - ${csData.tblCustomerDetails.currAddStreet} ${csData.tblCustomerDetails.currAddTown} ${csData.tblCustomerDetails.currAddState} ${csData.tblCustomerDetails.currAddPinCode}`,
//         5,
//         y + 10
//       );
//       doc.text(
//         `Invoice No - ${purchaseItemsNotGold[0].purchase_invoice_no}`,
//         125,
//         y
//       );
//       doc.text(
//         `Date - ${new Date(csData.createdOn).toLocaleDateString("en-GB")}`,
//         125,
//         y + 5
//       );
//       doc.text(
//         `Email - ${
//           csData.tblCustomerDetails.email.includes("@example.com")
//             ? ""
//             : csData.tblCustomerDetails.email
//         }`,
//         125,
//         y + 10
//       );
//       doc.text(`Pan Card - ${csData.tblCustomerDetails.panNo}`, 5, y + 15);
//       doc.text(`Gst No - ${csData.tblCustomerDetails.gstNo}`, 125, y + 15);
//     }
//     doc.line(5, y + 20, 175, y + 20);
//     y = 75;
//     doc.setFontSize(9);
//     doc.text("No", 6, y);
//     doc.text("Items", 12, y);
//     doc.text("HSN", 65, y);
//     doc.text("Pc/Pr", 75, y);
//     // doc.text("Other", 85, y);
//     doc.text("Grs.Wt", 87, y);
//     doc.text("Net.Wt", 100, y);
//     doc.text("Rate", 115, y);
//     doc.text("CFine", 130, y);
//     doc.text("Other", 145, y);
//     doc.text("Price", 160, y);
//     doc.line(5, y + 3, 175, y + 3);

//     const maxPageHeight = doc.internal.pageSize.height - 20;
//     y += 10;
//     doc.setFontSize(9);

//     purchaseItemsNotGold.forEach((item) => {
//       if (y + 8 > doc.internal.pageSize.height - 10) {
//         doc.addPage();
//         y = 10; // Reset Y position for the new page
//       }

//       doc.text(pSSrNo.toString(), 6, y);
//       const productName =
//         item.productName && item.productName.length > 15
//           ? item.productName.substring(0, 12) + "..."
//           : item.productName;

//       doc.text(productName ? productName : "-", 12, y);
//       doc.setFontSize(7);
//       doc.setFont("times", "bold");
//       doc.text(
//         item.hallmark_amt ? `Hallmark amt-${item.hallmark_amt}` : "",
//         12,
//         y + 3
//       );
//       doc.setFont("times", "normal");
//       doc.setFontSize(9);
//       doc.text(
//         item.hsnCode && item.hsnCode !== "null" && item.hsnCode !== "undefined"
//           ? item.hsnCode
//           : "-",
//         65,
//         y
//       );
//       doc.setFontSize(7);
//       doc.setFont("times", "bold");
//       doc.text(item.huidCode ? `UID-${item.huidCode}` : "", 70, y + 3);
//       doc.setFontSize(9);
//       doc.setFont("times", "normal");
//       doc.text(item.quantity !== "null" ? item.quantity : "-", 75, y);
//       // doc.text("-", 85, y);
//       doc.text(item.grosswt ? item.grosswt : "-", 87, y);
//       doc.text(item.netWt ? item.netWt : "-", 100, y);
//       doc.text(item.rate ? item.rate : "-", 115, y);
//       doc.text(item.fine_percentage ? item.fine_percentage : "-", 130, y);
//       const price =
//         item.billtype !== "purchase"
//           ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
//           : parseFloat(item.price).toFixed(2);
//       doc.text("-", 145, y);

//       doc.text(`${parseFloat(price) * -1}`, 160, y);
//       totalOldNotGoldAmount += parseFloat(price) * -1;
//       pSSrNo++;
//       y += 8;
//     });

//     doc.line(5, y - 3, 175, y - 3);
//     y += 10;
//     let totalOldNotGoldAmountInWords = numberToIndianWords(
//       parseFloat(totalOldNotGoldAmount).toFixed(0)
//     );

//     let footerY = doc.internal.pageSize.height - 40;
//     doc.setFontSize(9);
//     doc.text(`Total in Words: ${totalOldNotGoldAmountInWords} Only`, 10, y + 5);
//     // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
//     // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
//     // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
//     doc.text("Customer Signature", 10, footerY + 8);
//     doc.text(`Bill By - ${csData.billedby} `, 60, footerY + 3);
//     doc.text(`Salesman - ${csData.soldby} `, 60, footerY + 8);
//     doc.text("For S.K Khandre Jewellers", 135, footerY + 8);
//   }

//   const pdfBlob = doc.output("blob");
//   const pdfUrl = URL.createObjectURL(pdfBlob);
//   window.open(pdfUrl, "_blank");
// };

// Krishiv Bill Below
export const generateFullBillPDF = (x, csData) => {
  const doc = new jsPDF({
    orientation: "portrait",
    format: "a4",
    // format: [180, 250],
  });

  doc.setDrawColor(0, 0, 0, 0.3);
  doc.setFontSize(12);
  // doc.line(5, 10, 205, 10);
  doc.setFont("times");
  if (csData.billType === "false") {
    doc.text(`${csData.orderType}`, 90, 47.5);
  } else {
    doc.text(`${csData.orderType}`, 90, 47.5);
  }
  doc.setFontSize(10);
  doc.line(5, 44, 205, 44);
  doc.line(5, 290, 205, 290);
  doc.line(5, 44, 5, 290);
  doc.line(205, 44, 205, 290);
  doc.line(5, 48, 205, 48);
  doc.setFont("times");

  // doc.text("GST-No-27BBKPK5411K1ZI", 100, 35);
  let y = 51; // Adjust starting Y position
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
  if (csData) {
    // Ship to
    doc.text("Consignee (Ship to)", 6, 51);
    doc.setFont("times", "bold");
    doc.text(
      `${csData.tblCustomerDetails.firstName} ${csData.tblCustomerDetails.lastName}`,
      6,
      y + 4
    );
    doc.setFont("times", "normal");
    doc.text(
      `${
        csData.tblCustomerDetails.currAddStreet
          ? csData.tblCustomerDetails.currAddStreet
          : "Street"
      }`,
      6,
      y + 8
    );
    doc.text(
      `${
        csData.tblCustomerDetails.currAddTown
          ? csData.tblCustomerDetails.currAddTown
          : "Town"
      }`,
      6,
      y + 12
    );
    doc.text(
      `${csData.tblCustomerDetails.currAddState} ${
        csData.tblCustomerDetails.currAddPinCode
          ? csData.tblCustomerDetails.currAddPinCode
          : "Pincode"
      }`,
      6,
      y + 16
    );
    doc.text(`Invoice No - ${csData.invoiceNo}`, 120, y);
    doc.text(
      `Invoice Date - ${new Date(csData.createdOn).toLocaleDateString(
        "en-GB"
      )}`,
      120,
      y + 4
    );

    // doc.text(`Pan Card - ${csData.tblCustomerDetails.panNo}`, 5, y + 15);
    doc.text(`GSTIN/UIN - ${csData.tblCustomerDetails.gstNo}`, 6, y + 20);
    doc.line(5, y + 22, 115, y + 22);

    y = 78;
    doc.text("Buyer (Bill to)", 6, y);
    doc.setFont("times", "bold");
    doc.text(
      `${csData.tblCustomerDetails.firstName} ${csData.tblCustomerDetails.lastName}`,
      6,
      y + 4
    );
    doc.setFont("times", "normal");
    doc.text(
      `${
        csData.tblCustomerDetails.perAddStreet
          ? csData.tblCustomerDetails.perAddStreet
          : "Street"
      }`,
      6,
      y + 8
    );
    doc.text(
      `${
        csData.tblCustomerDetails.perAddTown
          ? csData.tblCustomerDetails.perAddTown
          : "Town"
      }`,
      6,
      y + 12
    );
    doc.text(
      `${csData.tblCustomerDetails.perAddState} ${
        csData.tblCustomerDetails.perAddPinCode
          ? csData.tblCustomerDetails.perAddPinCode
          : "Pincode"
      }`,
      6,
      y + 16
    );

    // doc.text(`Pan Card - ${csData.tblCustomerDetails.panNo}`, 5, y + 15);
    doc.text(`GSTIN/UIN - ${csData.tblCustomerDetails.gstNo}`, 6, y + 20);
    doc.line(115, y - 30, 115, y + 21);
  }
  doc.line(5, y + 21, 205, y + 21);
  y = 105;
  doc.setFontSize(9);
  doc.text("S.No", 6, y);
  doc.text("Description Of Goods", 15, y);
  doc.text("HSN", 70, y);
  doc.text("Pcs", 85, y);
  doc.text("Purity", 95, y);
  doc.text("Gross", 105, y);
  doc.text("Wt", 105, y + 3);
  doc.text("Net", 117, y);
  doc.text("Wt", 117, y + 3);
  doc.text("Other", 130, y);
  doc.text("Charges", 130, y + 3);
  doc.text("Rate", 145, y);
  doc.text("Amount", 160, y);
  doc.text("Hallmark", 175, y);
  doc.text("Charges", 175, y + 3);
  doc.text("Total", 190, y);
  doc.text("Amount", 190, y + 3);
  doc.line(5, y + 5, 205, y + 5);

  const maxPageHeight = doc.internal.pageSize.height - 20;
  y += 10;
  doc.setFontSize(9);
  let soldProducts = x.filter((product) => product.billtype !== "purchase");

  doc.setFontSize(8);
  soldProducts.forEach((item) => {
    if (y + 8 > doc.internal.pageSize.height - 10) {
      doc.addPage();
      y = 10; // Reset Y position for the new page
    }

    doc.text(srNo.toString(), 6, y);
    const productName =
      item.productName && item.productName.length > 15
        ? item.productName.substring(0, 30) + "..."
        : item.productName;
    const purityName = item.purity ? item.purity : "-";

    doc.text(productName ? `${purityName} ${productName}` : "-", 15, y);
    // doc.setFontSize(7);
    // doc.setFont("times", "bold");
    // doc.text(
    //   item.hallmark_amt ? `Hallmark amt-${item.hallmark_amt}` : "",
    //   12,
    //   y + 3
    // );
    // doc.setFont("times", "normal");
    // doc.setFontSize(9);
    doc.text(
      item.hsnCode && item.hsnCode !== "null" && item.hsnCode !== "undefined"
        ? item.hsnCode
        : "-",
      70,
      y
    );
    // doc.setFontSize(7);
    // doc.setFont("times", "bold");
    // doc.text(item.huidCode ? `UID-${item.huidCode}` : "", 70, y + 3);
    // doc.setFontSize(9);
    // doc.setFont("times", "normal");
    doc.text(item.quantity !== "null" ? item.quantity : "-", 85, y);
    doc.text(item.purity ? item.purity : "-", 95, y);
    doc.text(item.grosswt ? item.grosswt : "-", 105, y);
    doc.text(item.netWt ? item.netWt : "-", 117, y);
    doc.text(item.stoneAmount ? item.stoneAmount : "-", 130, y);
    if (item.mrp !== 0 && item.mrp !== "" && item.mrp !== "0") {
      doc.text(`MRP -`, 130, y);
      doc.text(`${parseFloat(item.mrp).toFixed(2)}`, 145, y);
    } else {
      doc.text(item.rate ? item.rate : "-", 145, y);
      doc.text(
        parseFloat(
          (parseFloat(item.rate) / 10) * parseFloat(item.netWt)
        ).toFixed(2),
        160,
        y
      );
      doc.text(
        parseFloat(
          parseFloat(parseFloat(item.rate) / 10) * parseFloat(item.netWt) +
            parseFloat(item.hallmark_amt ? item.hallmark_amt : 0) +
            parseFloat(item.stoneAmount ? item.stoneAmount : 0)
        ).toFixed(2),
        190,
        y
      );
    }
    doc.text(item.hallmark_amt ? `${item.hallmark_amt}` : "-", 175, y);

    const price =
      item.billtype !== "purchase"
        ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
        : parseFloat(item.price).toFixed(2);
    const makingCharges = [
      item.making_fixed_amt,
      item.making_fixed_wastage,
      item.making_per_gram,
      item.making_percentage,
    ];

    // Filter out null, empty, or zero making charges
    const validMakingCharges = makingCharges.filter(
      (charge) => charge !== null && parseInt(charge) !== 0
    );

    // Choose making charge(s) based on the number of valid charges
    let makingChargeText = "";
    if (validMakingCharges.length > 1) {
      makingChargeText = `${parseFloat(item.makingchrg).toFixed(0)}`;
    } else if (
      item.making_percentage !== null &&
      parseInt(item.making_percentage) !== 0
    ) {
      makingChargeText = `${parseFloat(item.making_percentage).toFixed(0)}%`;
    } else if (
      item.making_per_gram !== null &&
      parseInt(item.making_per_gram) !== 0
    ) {
      makingChargeText = `${parseFloat(item.making_per_gram).toFixed(0)}/Gm`;
    } else if (validMakingCharges.length === 1) {
      makingChargeText = `${parseFloat(validMakingCharges[0]).toFixed(0)}`;
    } else {
      makingChargeText = `${parseFloat(item.makingchrg).toFixed(0)}`;
    }

    // Add making charge to PDF
    // doc.text(makingChargeText, 145, y);
    // doc.text("0.00", 115, y);
    // doc.text(price, 160, y);
    srNo++;
    y += 8;
  });

  doc.line(5, y - 3, 205, y - 3);
  doc.setFont("times", "bold");
  doc.text("Total", 10, y);

  doc.setFont("times", "normal");
  const totalQuantity = soldProducts.reduce(
    (a, b) => a + parseFloat(b.quantity),
    0
  );
  const totalGrossWt = soldProducts.reduce((a, b) => {
    return parseFloat(a) + parseFloat(b.grosswt);
  }, 0);
  const totalNetWt = soldProducts.reduce((a, b) => {
    return parseFloat(a) + parseFloat(b.netWt);
  }, 0);
  const totalStoneAmount = soldProducts.reduce((a, b) => {
    return parseFloat(a) + parseFloat(b.stoneAmount);
  }, 0);
  const totalNetAmount = soldProducts.reduce((a, b) => {
    return (
      parseFloat(a) +
      parseFloat((parseFloat(b.rate) / 10) * parseFloat(b.netWt))
    );
  }, 0);
  const totalHallmarkCharges = soldProducts.reduce((a, b) => {
    return parseFloat(a) + parseFloat(b.hallmark_amt ? b.hallmark_amt : 0);
  }, 0);
  const totalProductAmount = soldProducts.reduce((a, b) => {
    return (
      parseFloat(a) +
      parseFloat(
        parseFloat(parseFloat(b.rate) / 10) * parseFloat(b.netWt) +
          parseFloat(b.hallmark_amt ? b.hallmark_amt : 0) +
          parseFloat(b.stoneAmount ? b.stoneAmount : 0)
      )
    );
  }, 0);

  doc.text(totalQuantity.toFixed(0), 85, y);
  doc.text(totalGrossWt.toFixed(3), 105, y);
  doc.text(totalNetWt.toFixed(3), 117, y);
  doc.text(totalStoneAmount.toFixed(2), 130, y);
  doc.text(totalNetAmount.toFixed(2), 160, y);
  doc.text(totalHallmarkCharges.toFixed(2), 175, y);
  doc.text(totalProductAmount.toFixed(2), 190, y);
  doc.line(5, y + 1, 205, y + 1);
  y += 10;
  // doc.setFontSize(7);
  if (purchaseItems.length > 0) {
    doc.line(10, y - 4, 75, y - 4);
    y += 0;
    doc.text("Item", 11, y);
    doc.text("Inv No", 36, y);
    doc.text("Amount", 61, y);
    doc.line(10, y - 4, 10, y + 2);
    doc.line(35, y - 4, 35, y + 2);
    doc.line(60, y - 4, 60, y + 2);
    doc.line(75, y - 4, 75, y + 2);

    y += 4;
    doc.line(10, y - 3, 75, y - 3);

    purchaseItems.forEach((product) => {
      y += 4;
      doc.line(10, y - 6, 10, y + 2);
      doc.line(35, y - 6, 35, y + 2);
      doc.line(60, y - 6, 60, y + 2);
      doc.line(75, y - 6, 75, y + 2);
      doc.text(product.productName || "N/A", 11, y);
      // doc.text(parseFloat(product.netWt).toFixed(3) || "0", 41, y);
      doc.text(product.purchase_invoice_no || "0", 36, y);
      doc.text((parseFloat(product.price) * -1).toFixed(0) || "0", 61, y);
    });

    y += 5;
    doc.line(10, y - 3, 75, y - 3);
  }

  let paymentModes = csData.paymentMode ? csData.paymentMode.split(",") : [];
  doc.setFontSize(9);
  y += 10;
  doc.text(`Payment Mode`, 10, y);
  let yPaymentModes = y + 5;
  paymentModes.forEach((paymentMode) => {
    if (yPaymentModes > maxPageHeight - 10) {
      doc.addPage();
      yPaymentModes = 5;
    }
    const [mode, amount] = paymentMode.split(":");
    doc.text(`${mode}`, 10, yPaymentModes);
    doc.text(`${amount}`, 10 + columnWidth, yPaymentModes);
    yPaymentModes += 5;
  });

  let totalSaleAmount = soldProducts.reduce((total, product) => {
    return total + parseFloat((parseFloat(product.price) * 100) / 103 || 0);
  }, 0);

  let payableGst = parseFloat(totalSaleAmount) * 0.03;

  y += 10;
  if (csData.tblCustomerDetails.currAddState === "Maharashtra") {
    doc.text(`Sales Amount:`, 155, y);
    doc.text(`${parseFloat(totalSaleAmount).toFixed(2)}`, 185, y);
    doc.text(`R.O./Discount:`, 155, y + 5);
    doc.text(`${csData.offer}`, 185, y + 5);
    doc.text(`CGST 1.5%:`, 155, y + 10);
    doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 185, y + 10);
    doc.text(`SGST 1.5%:`, 155, y + 15);
    doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 185, y + 15);
  } else {
    doc.text(`Sales Amount:`, 155, y + 5);
    doc.text(`${parseFloat(totalSaleAmount).toFixed(2)}`, 185, y + 5);
    doc.text(`R.O./Discount:`, 155, y + 10);
    doc.text(`${csData.offer}`, 185, y + 10);
    doc.text(`IGST 3%:`, 155, y + 15);
    doc.text(`${parseFloat(payableGst).toFixed(2)}`, 185, y + 15);
  }
  doc.text(`Purchase Amount (-):`, 155, y + 20);
  doc.text(`${parseFloat(csData.purchaseAmt).toFixed(2)}`, 185, y + 20);
  doc.text(`Recieved Amount:`, 155, y + 25);
  doc.text(`${parseFloat(csData.receivedAmt).toFixed(2)}`, 185, y + 25);
  doc.text(`Balance Amount:`, 155, y + 30);
  doc.text(
    `${parseFloat(
      parseFloat(csData.price) - parseFloat(csData.receivedAmt)
    ).toFixed(2)}`,
    185,
    y + 30
  );
  doc.text(`Total:`, 155, y + 35);
  doc.text(`${parseFloat(csData.price).toFixed(2)}`, 185, y + 35);
  let totalAmountInWords = numberToIndianWords(
    parseFloat(csData.price).toFixed(0)
  );
  doc.text(`Total in Words: ${totalAmountInWords} Only`, 10, y + 40);

  let footerY = doc.internal.pageSize.height - 50;
  doc.setFontSize(9);
  // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
  // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
  // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
  // doc.text("Customer Signature", 10, footerY);
  doc.setFont("times", "bold");
  doc.line(5, footerY - 4, 205, footerY - 4);
  doc.text("Terms And Conditions :- ", 10, footerY);
  doc.setFont("times", "normal");
  doc.text(
    `Note: - No Eway Bill is required to be Generated as the Goods covered under this Invoice are Exempted as per Serial No. 4/5 to the Annexure `,
    10,
    footerY + 5
  );
  doc.text(`to Rule 138(14) of the CGST Rules.`, 10, footerY + 9);
  doc.text(
    `Consumer can get the purity of the Hallmarked Jewellery / Artifacts verified from any of the BIS recognized A & H Center`,
    10,
    footerY + 13
  );
  doc.text(
    `List of BIS recognized A & H center along with address and contact details is available on the webiste "www.bis.gov.in"`,
    10,
    footerY + 17
  );
  doc.text(`Hallmark Charges is Rs 45 Per Piece`, 10, footerY + 21);
  doc.text(
    `This Bill includes Labour Charges, Hallmark Charges, Stone/Beads/Mina and other Charges `,
    10,
    footerY + 25
  );
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.text(`Receivers Signature`, 10, footerY + 42);
  doc.setFont("times", "normal");
  doc.setFontSize(7);
  doc.line(5, footerY + 27, 205, footerY + 27);

  if (purchaseItems.length > 0) {
    const purchaseItemsGold = x.filter(
      (product) =>
        product.billtype === "purchase" &&
        product.categoryName.toLowerCase().includes("gold")
    );
    doc.addPage();
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
        `Invoice No - ${purchaseItemsNotGold[0].purchase_invoice_no}`,
        125,
        y
      );
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
