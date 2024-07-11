import React from "react";
import { jsPDF } from "jspdf";
import { numberToIndianWords } from "./numberToIndianWords";

export default function GenerateRdPurchaseReceipt(order, rdPurchaseFormat) {
  if (rdPurchaseFormat == 1) {
    // Thashna Label Below
    generateRdPurchaseReceipt1(order);
  } else if (rdPurchaseFormat == 2) {
    // Nice Label Below
    generateRdPurchaseReceipt2(order);
  }
}

const generateRdPurchaseReceipt1 = async (order) => {
  console.log(order);
  const doc = new jsPDF({
    orientation: "landscape",
    format: "a5",
    // format: [250, 180],
  });
  doc.setDrawColor(0, 0, 0);
  let y = 18; // Adjust starting Y position
  const columnWidth = 15; // Adjust column widths for A5
  const contentWidth = 120; // Adjust content width for A5
  let srNo = 1;
  let pGSrNo = 1;

  // console.log(x, "x");

  // doc.addPage();
  doc.setFontSize(16);
  doc.setFont("times");
  doc.text(`Purchase`, 90, 10);
  doc.setFontSize(9);
  doc.setFont("times");

  if (order) {
    doc.text(`Name - ${order.VendorName}`, 5, y);
    doc.text(`Vendor Code - ${order.VendorId}`, 5, y + 5);
    doc.text(`Date - ${order.PurchaseDate}`, 170, y);
    doc.text(`Invoice No - ${order.InvoiceNo}`, 170, y + 5);
    doc.text(`Lot No - ${order.LotNumber}`, 170, y + 10);
  }
  doc.line(5, y + 15, 200, y + 15);
  y = 40;
  doc.setFontSize(9);
  doc.text("SKU", 6, y);

  doc.text("Testing", 15, y);
  doc.text("Category", 28, y);
  doc.text("Product", 44, y);
  doc.text("Quantity", 60, y);
  doc.text("Gr.Wt", 75, y);
  doc.text("Stone.Wt", 88, y);
  doc.text("Net.wt", 103, y);
  doc.text("Fine %", 117, y);
  doc.text("Wastage", 129, y);
  doc.text("F+W Wt", 143, y);
  doc.text("Rate", 159, y);
  doc.text("Making", 170, y);
  doc.text("Amount", 184, y);
  doc.line(5, y + 3, 200, y + 3);

  const maxPageHeight = doc.internal.pageSize.height - 20;
  y += 10;
  // doc.setFontSize(9);

  order.purchaseItem.forEach((item) => {
    if (y + 8 > doc.internal.pageSize.height - 10) {
      doc.addPage();
      y = 10; // Reset Y position for the new page
    }

    doc.setFont("times", "normal");

    doc.text(item.StockKeepingUnit ? item.StockKeepingUnit : "-", 6, y);
    doc.text(item.Testing ? item.Testing : "-", 15, y);
    doc.text(item.CategoryName ? item.CategoryName : "-", 28, y);
    doc.text(item.ProductName ? item.ProductName : "-", 44, y);
    doc.text(item.Quantity ? item.Quantity : "-", 60, y);
    doc.text(item.GrossWt ? item.GrossWt : "-", 75, y);
    doc.text(item.StoneWeight ? item.StoneWeight : "-", 88, y);
    doc.text(item.NetWt ? item.NetWt : "-", 103, y);
    doc.text(item.FinePercent ? item.FinePercent : "-", 117, y);
    doc.text(item.WastagePercent ? item.WastagePercent : "-", 129, y);
    doc.text(
      item.TotalFineWithWstageWt ? item.TotalFineWithWstageWt : "-",
      143,
      y
    );

    doc.text(item.MetalRate ? item.MetalRate : "-", 159, y);
    doc.text(
      item.MakingFixedAmt &&
        item.MakingFixedWastage &&
        item.MakingPerGram &&
        item.MakingPercentage
        ? parseFloat(
            parseFloat(item.MakingFixedAmt) +
              parseFloat(item.MakingFixedWastage) +
              parseFloat(item.MakingPerGram) +
              parseFloat(item.MakingPercentage)
          ).toFixed(2)
        : "-",
      170,
      y
    );
    doc.text(item.TotalItemAmt ? item.TotalItemAmt : "-", 184, y);

    pGSrNo++;
    y += 8;
  });

  doc.line(5, y - 3, 200, y - 3);
  y += 10;

  doc.line(5, y - 4, 45, y - 4);
  doc.line(5, y - 4, 5, y + 11);
  doc.line(24, y - 4, 24, y + 11);
  doc.line(45, y - 4, 45, y + 11);
  doc.text(`Paid Gold`, 6, y);
  doc.line(5, y + 1, 45, y + 1);

  doc.text(`Paid Silver`, 6, y + 5);
  doc.line(5, y + 6, 45, y + 6);
  doc.text(`Paid Amount`, 6, y + 10);
  doc.line(5, y + 11, 45, y + 11);
  doc.text(
    `${parseFloat(
      parseFloat(order.TotalFineGold) - parseFloat(order.BalanceGold)
    ).toFixed(2)}`,
    25,
    y
  );
  doc.text(
    ` ${parseFloat(
      parseFloat(order.TotalFineSilver) - parseFloat(order.BalanceSilver)
    ).toFixed(2)}`,
    25,
    y + 5
  );
  doc.text(
    ` ${parseFloat(
      parseFloat(order.TotalPurchaseAmount) - parseFloat(order.BalanceAmount)
    ).toFixed(2)}`,
    25,
    y + 10
  );
  //Bottom Right Box
  doc.line(150, y - 4, 200, y - 4);
  doc.line(150, y - 4, 150, y + 21);
  doc.line(175, y - 4, 175, y + 21);
  doc.line(200, y - 4, 200, y + 21);
  doc.text(`Balance Gold`, 152, y);
  doc.line(150, y + 1, 200, y + 1);

  doc.text(`Balance Silver`, 152, y + 5);
  doc.line(150, y + 6, 200, y + 6);
  doc.text(`Taxable Amount`, 152, y + 10);
  doc.line(150, y + 11, 200, y + 11);
  doc.text(`GST Amount`, 152, y + 15);
  doc.line(150, y + 16, 200, y + 16);
  doc.text(`Total Amount`, 152, y + 20);
  doc.line(150, y + 21, 200, y + 21);
  doc.text(order.BalanceGold ? order.BalanceGold : "-", 177, y);
  doc.text(order.BalanceSilver ? order.BalanceSilver : "-", 177, y + 5);
  doc.text(order.TotalNetAmount ? order.TotalNetAmount : "-", 177, y + 10);
  doc.text(order.TotalGSTAmount ? order.TotalGSTAmount : "-", 177, y + 15);
  doc.text(
    order.TotalPurchaseAmount ? order.TotalPurchaseAmount : "-",
    177,
    y + 20
  );

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};

const generateRdPurchaseReceipt2 = async (order) => {
  console.log(order);
  const doc = new jsPDF({
    orientation: "portrait",
    format: "a5",
    // format: [180, 250],
  });
  doc.setDrawColor(0, 0, 0);
  // doc.setFontSize(13);
  // doc.setFont("times");
  // if (order.billType === "false") {
  //   doc.text("Estimate", 77, 42);
  // } else {
  //   doc.text("Tax Invoice", 77, 42);
  // }
  // doc.setFontSize(10);
  // doc.text("GST No : 27BBKPK5411K1ZI ", 5, 42);
  // doc.line(5, 44, 175, 44);
  // doc.setFont("times");
  // // doc.text("GST-No-27BBKPK5411K1ZI", 100, 35);
  let y = 18; // Adjust starting Y position
  const columnWidth = 15; // Adjust column widths for A5
  const contentWidth = 120; // Adjust content width for A5
  let srNo = 1;
  let pGSrNo = 1;

  // console.log(x, "x");

  // doc.addPage();
  doc.setFontSize(16);
  doc.setFont("times");
  doc.text(`Purchase`, 60, 10);
  doc.setFontSize(9);
  doc.setFont("times");

  if (order) {
    doc.text(`Name - ${order.VendorName}-${order.VendorId}`, 5, y);
    // doc.text(`Vendor Code - ${order.VendorId}`, 5, y + 5);
    doc.text(`Date - ${order.PurchaseDate}`, 119, y);
    doc.text(`Invoice No - ${order.InvoiceNo}`, 5, y + 5);
    doc.text(`Lot No - ${order.LotNumber}`, 119, y + 5);
    //   doc.text(`Name - ${order.firstName} ${order.lastName}`, 5, y + 5);
    //   doc.text(
    //     `Address - ${order.currAddStreet} ${order.currAddTown} ${order.currAddState} ${order.currAddPinCode}`,
    //     5,
    //     y + 10
    //   );
    //   doc.text(`Invoice No - ${order.purchase_invoice_no}`, 125, y);
    //   doc.text(
    //     `Date - ${new Date(order.createdOn).toLocaleDateString()}`,
    //     125,
    //     y + 5
    //   );
    //   doc.text(`Email - ${order.email}`, 125, y + 10);
    //   doc.text(`Pan Card - ${order.panNo}`, 5, y + 15);
    //   doc.text(`Gst No - ${order.gstNo}`, 125, y + 15);
  }
  doc.line(5, y + 8, 142, y + 8);
  y = 30;
  doc.setFontSize(9);
  doc.text("Sr.No", 6, y);
  // doc.text("SKU", 6, y);

  doc.text("SKU", 23, y);
  doc.text("Testing", 46, y);
  doc.text("Gr.Wt", 62, y);
  doc.text("Stone.Wt", 79, y);
  doc.text("S.Pcs", 96, y);
  doc.text("Tag.WT", 112, y);
  doc.text("Pair", 127, y);
  // doc.text("Fine %", 117, y);
  // doc.text("Wastage", 129, y);
  // doc.text("F+W Wt", 143, y);
  // doc.text("Rate", 159, y);
  // doc.text("Making", 170, y);
  // doc.text("Amount", 184, y);
  doc.line(5, y + 3, 142, y + 3);

  const maxPageHeight = doc.internal.pageSize.height - 20;
  y += 10;
  // doc.setFontSize(9);

  order.purchaseItem.forEach((item) => {
    if (y + 8 > doc.internal.pageSize.height - 10) {
      doc.addPage();
      y = 10; // Reset Y position for the new page
    }

    doc.setFont("times", "normal");

    doc.text(`${srNo}`, 10, y);
    doc.text(item.StockKeepingUnit ? item.StockKeepingUnit : "-", 23, y);
    doc.text(item.Testing ? item.Testing : "-", 46, y);
    doc.text(item.GrossWt ? item.GrossWt : "-", 62, y);
    doc.text(item.StoneWeight ? item.StoneWeight : "-", 79, y);
    doc.text(item.StonePieces ? item.StonePieces : "-", 96, y);
    doc.text(item.ClipWeight ? item.ClipWeight : "-", 112, y);
    doc.text(item.Quantity ? item.Quantity : "-", 127, y);
    // doc.text(item.NetWt ? item.NetWt : "-", 103, y);
    // doc.text(item.CategoryName ? item.CategoryName : "-", 28, y);
    // doc.text(item.ProductName ? item.ProductName : "-", 44, y);
    // doc.text(
    //   item.TotalFineWithWstageWt ? item.TotalFineWithWstageWt : "-",
    //   143,
    //   y
    // );

    // doc.text(item.MetalRate ? item.MetalRate : "-", 159, y);
    // doc.text(
    //   item.MakingFixedAmt &&
    //     item.MakingFixedWastage &&
    //     item.MakingPerGram &&
    //     item.MakingPercentage
    //     ? parseFloat(
    //         parseFloat(item.MakingFixedAmt) +
    //           parseFloat(item.MakingFixedWastage) +
    //           parseFloat(item.MakingPerGram) +
    //           parseFloat(item.MakingPercentage)
    //       ).toFixed(2)
    //     : "-",
    //   170,
    //   y
    // );
    // doc.text(item.TotalItemAmt ? item.TotalItemAmt : "-", 184, y);
    // doc.text(item.netWt ? item.netWt : "-", 100, y);
    // doc.text(item.rate ? item.rate : "-", 115, y);
    // doc.text(item.fine_percentage ? item.fine_percentage : "-", 130, y);
    // const price =
    //   item.billtype !== "purchase"
    //     ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
    //     : parseFloat(item.price).toFixed(2);
    // doc.text("-", 145, y);

    // doc.text(`${parseFloat(price) * -1}`, 160, y);
    // totalOldGoldAmount += parseFloat(price) * -1;
    srNo++;
    y += 8;
  });

  doc.line(5, y - 3, 142, y - 3);
  y += 10;

  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};
