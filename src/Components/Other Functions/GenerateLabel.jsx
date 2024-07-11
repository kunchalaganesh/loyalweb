import React from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

// SK Khandre And Krishiv Label Below

// export const GenerateLabel = (products) => {
//   const doc = new jsPDF({
//     // format: [26, 12],
//     format: [28, 12],
//     orientation: "landscape",
//   });

//   const fontSize = 7;
//   const imageHeight = 7;
//   const imageWidth = 7;

//   for (let i = 0; i < products.length; i++) {
//     const {
//       collection,
//       grosswt,
//       stoneWeight,
//       netWt,
//       stoneAmount,
//       itemCode,
//       purity,
//       mrp,
//       product_No,
//       pieces,
//       description,
//       barcodeNumber,
//     } = products[i];

//     if (i > 0) {
//       doc.addPage(); // Add a new page for each product after the first one
//     }
//     doc.setFontSize(fontSize);
//     doc.setFont("helvetica", "bold");
//     // {
//     //   collection.length > 20
//     //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
//     //     : doc.text(`${collection}`, 1, 3);
//     // }

//     if (mrp == 0 || mrp === "") {
//       // doc.text(`${itemCode}`, 2, 3);
//       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 2, 3);
//       doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 2, 6);
//       doc.text(`N.Wt: ${parseFloat(netWt).toFixed(3)}`, 2, 9);
//       // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
//       // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
//       doc.text(`Pcs:${pieces}`, 19, 11.5);
//       // doc.text(`${product_No}`, 4, 11.5);
//       doc.text(`${itemCode}`, 18, 6);
//       doc.text(`${purity}`, 21, 3);
//       doc.setFontSize(7);
//       {
//         barcodeNumber
//           ? doc.text(`${barcodeNumber}`, 2, 11.5)
//           : doc.text("", 2, 11.5);
//       }
//       // doc.setFontSize(5);
//       // const maxLineLength = 27;
//       // const descriptionLine1 = description.substring(0, maxLineLength);
//       // const descriptionLine2 = description.substring(
//       //   maxLineLength,
//       //   maxLineLength * 2
//       // );

//       // doc.text(descriptionLine1, 4, 10);
//       // doc.text(descriptionLine2, 4, 11.5);
//     } else {
//       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 2, 3);
//       doc.text(`MRP: ${parseFloat(mrp)}`, 2, 6);
//       doc.text(`Pcs:${pieces}`, 19, 11.5);
//       doc.text(`${itemCode}`, 18, 6);
//       // doc.text(`${product_No}`, 4, 11.5);
//       // doc.text(`${product_No}`, 4, 11.5);
//       // doc.text(`${itemCode}`, 3, 3);
//       doc.text(`${purity}`, 21, 3);
//       {
//         barcodeNumber
//           ? doc.text(`${barcodeNumber}`, 2, 11.5)
//           : doc.text("", 2, 11.5);
//       }
//     }

//     try {
//       // const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
//       // doc.addImage(qrCodeDataUrl, "JPEG", 3, 3, imageWidth, imageHeight);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const pdfData = doc.output("datauristring");
//   const newWindow = window.open();
//   newWindow.document.write(
//     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
//   );
// };

// Kalamandir Label Below
// export const GenerateLabel = async (products) => {
//   const doc = new jsPDF({
//     // format: [26, 12],
//     format: [81, 12],
//     orientation: "landscape",
//   });

//   const fontSize = 6;
//   const imageHeight = 12;
//   const imageWidth = 12;

//   for (let i = 0; i < products.length; i++) {
//     const {
//       collection,
//       GrossWt,
//       TotalStoneWeight,
//       NetWt,
//       TotalStoneAmount,
//       ItemCode,
//       PurityName,
//       MRP,
//       product_No,
//       Pieces,
//       Description,
//       RFIDCode,
//       category_Name,
//       Size,
//       SKU,
//       ProductTitle,
//       OccassionName,
//     } = products[i];

//     if (i > 0) {
//       doc.addPage(); // Add a new page for each product after the first one
//     }
//     doc.setFontSize(fontSize);
//     doc.setFont("helvetica", "bold");
//     // doc.line(26, 0, 26, 12);
//     // {
//     //   collection.length > 20
//     //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
//     //     : doc.text(`${collection}`, 1, 3);
//     // }

//     if (MRP == 0 || MRP === "") {
//       // doc.text(`${itemCode}`, 2, 3);
//       doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 30, 3);
//       doc.text(`${OccassionName}`, 30, 6);
//       doc.text(`OW: ${parseFloat(TotalStoneWeight).toFixed(3)}`, 30, 9);
//       doc.text(`NW: ${parseFloat(NetWt).toFixed(3)}`, 43, 3);
//       doc.text(`${SKU}`, 30, 11.5);

//       // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
//       // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
//       doc.text(`PCS:${Pieces}`, 48, 11.5);
//       // doc.text(`NO MRP ITEM`, 48, 11.5);
//       // doc.text(`${product_No}`, 4, 11.5);
//       doc.text(`${ItemCode}`, 13, 3);
//       doc.text(`${PurityName}`, 23, 3);
//       // doc.text(`${ProductTitle}`, 13, 6);
//       // doc.text(`${Description}`, 20, 6);
//       doc.text(`${Size ? Size : ""}`, 13, 9);
//       doc.setFontSize(7);
//       {
//         RFIDCode ? doc.text(`${RFIDCode}`, 30, 10) : doc.text("", 30, 10);
//       }
//       // doc.setFontSize(5);
//       // const maxLineLength = 27;
//       // const descriptionLine1 = description.substring(0, maxLineLength);
//       // const descriptionLine2 = description.substring(
//       //   maxLineLength,
//       //   maxLineLength * 2
//       // );

//       // doc.text(descriptionLine1, 4, 10);
//       // doc.text(descriptionLine2, 4, 11.5);
//     } else {
//       doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 30, 4);
//       doc.text(`${SKU}`, 30, 7);
//       doc.text(`MRP: ${parseFloat(MRP).toFixed(0)}/-`, 30, 10);
//       doc.text(`NW: ${parseFloat(NetWt).toFixed(3)}`, 43, 4);
//       // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
//       // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
//       // doc.text(`PCS:${Pieces}`, 48, 10);
//       doc.text(`MRP ITEM`, 48, 10);
//       // doc.text(`${product_No}`, 4, 11.5);
//       doc.text(`${ItemCode}`, 13, 4);
//       doc.text(`${ProductTitle}`, 13, 7);
//       doc.text(`${Description}`, 20, 7);
//       doc.text(`${OccassionName}`, 23, 4);

//       //   doc.text(`${purity}`, 34, 4);
//       //   doc.text(`${category_Name}`, 12, 7);
//       //   doc.text(`${size ? size : ""}`, 12, 10);
//       doc.setFontSize(7);
//       {
//         barcodeNumber ? doc.text(`${RFIDCode}`, 30, 10) : doc.text("", 30, 10);
//       }
//     }

//     try {
//       const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
//       doc.addImage(qrCodeDataUrl, "JPEG", 1, 0, imageWidth, imageHeight);
//       console.log(qrCodeDataUrl, "qrCodeDataUrl");
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const pdfData = doc.output("datauristring");
//   const newWindow = window.open();
//   newWindow.document.write(
//     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
//   );
// };

export const GenerateLabel = async (products, labelFormat) => {
  if (labelFormat == 1) {
    // Thashna Label Below
    generateLabel1(products);
  } else if (labelFormat == 2) {
    // Nice Label Below
    generateLabel2(products);
  }
};
const generateLabel1 = async (products) => {
  const doc = new jsPDF({
    format: [27, 14],
    // format: [81, 12],
    orientation: "landscape",
  });

  const fontSize = 7;
  const imageHeight = 12;
  const imageWidth = 12;

  for (let i = 0; i < products.length; i++) {
    const {
      collection,
      GrossWt,
      TotalStoneWeight,
      NetWt,
      TotalStoneAmount,
      ItemCode,
      PurityName,
      MRP,
      ProductNo,
      Pieces,
      Description,
      RFIDCode,
      CategoryName,
      Size,
      SKU,
      ProductTitle,
      OccassionName,
    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");
    // doc.line(26, 0, 26, 12);
    // {
    //   collection.length > 20
    //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
    //     : doc.text(`${collection}`, 1, 3);
    // }

    if (MRP == 0 || MRP === "") {
      // doc.text(`${itemCode}`, 2, 3);
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 3, 8);
      doc.text(`${SKU}`, 17, 4);
      doc.text(`${ItemCode}`, 3, 4);
      doc.text(`${PurityName}`, 19, 8);
      doc.text(`Size: ${Size ? Size : ""}`, 3, 12);
      {
        RFIDCode ? doc.text(`${RFIDCode}`, 16, 12) : doc.text("", 16, 12);
      }
      // doc.text(`${occasion}`, 30, 6);
      // doc.text(`OW: ${parseFloat(stoneWeight).toFixed(3)}`, 30, 9);
      // doc.text(`NW: ${parseFloat(netWt).toFixed(3)}`, 43, 3);

      // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
      // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
      // doc.text(`PCS:${pieces}`, 48, 11.5);
      // doc.text(`${product_No}`, 4, 11.5);
      // doc.text(`${product_Name}`, 13, 6);
      // doc.text(`${description}`, 20, 6);
      // doc.setFontSize(7);
      // doc.setFontSize(5);
      // const maxLineLength = 27;
      // const descriptionLine1 = description.substring(0, maxLineLength);
      // const descriptionLine2 = description.substring(
      //   maxLineLength,
      //   maxLineLength * 2
      // );

      // doc.text(descriptionLine1, 4, 10);
      // doc.text(descriptionLine2, 4, 11.5);
    } else {
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 3, 8);
      doc.text(`${SKU}`, 17, 4);
      doc.text(`${ItemCode}`, 3, 4);
      doc.text(`${PurityName}`, 19, 8);
      doc.text(`Size: ${Size ? Size : ""}`, 3, 12);
      {
        RFIDCode ? doc.text(`${RFIDCode}`, 16, 12) : doc.text("", 16, 12);
      }

      //   doc.text(`${purity}`, 34, 4);
      //   doc.text(`${category_Name}`, 12, 7);
      //   doc.text(`${size ? size : ""}`, 12, 10);
    }

    try {
      // const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
      // doc.addImage(qrCodeDataUrl, "JPEG", 1, 0, imageWidth, imageHeight);
      // console.log(qrCodeDataUrl, "qrCodeDataUrl");
    } catch (error) {
      console.error(error);
    }
  }

  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );
};
const generateLabel2 = async (products) => {
  const doc = new jsPDF({
    format: [38, 25],
    // format: [81, 12],
    orientation: "landscape",
  });

  const fontSize = 7;
  const imageHeight = 12;
  const imageWidth = 12;

  for (let i = 0; i < products.length; i++) {
    const {
      collection,
      GrossWt,
      TotalStoneWeight,
      NetWt,
      TotalStoneAmount,
      ItemCode,
      PurityName,
      MRP,
      ProductNo,
      Pieces,
      Description,
      RFIDCode,
      CategoryName,
      Size,
      SKU,
      ProductTitle,
      OccassionName,
      Stones,
    } = products[i];

    if (i > 0) {
      doc.addPage(); // Add a new page for each product after the first one
    }
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");
    // doc.line(26, 0, 26, 12);
    // {
    //   collection.length > 20
    //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
    //     : doc.text(`${collection}`, 1, 3);
    // }

    if (MRP == 0 || MRP === "" || MRP === "0.00") {
      // doc.text(`${itemCode}`, 2, 3);
      let yCoordinate = 4; // Starting Y-coordinate
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 3, yCoordinate);
      yCoordinate += 4;
      doc.setFontSize(5);
      if (Stones && Stones.length > 0) {
        Stones.forEach((stone) => {
          doc.text(
            `${stone.StoneName} ${parseFloat(stone.StoneWeight).toFixed(3)}`,
            3,
            yCoordinate
          );
          yCoordinate += 3; // Move to the next line
        });
      }
      doc.setFontSize(7);
      doc.text(`NWt: ${parseFloat(NetWt).toFixed(3)}`, 3, yCoordinate + 1);
      yCoordinate = 15;
      doc.setFontSize(5);
      if (Stones && Stones.length > 0) {
        Stones.forEach((stone) => {
          doc.text(`${stone.Description}`, 19, yCoordinate);
          yCoordinate += 3; // Move to the next line
        });
      }
    } else {
      let yCoordinate = 4; // Starting Y-coordinate
      doc.text(`GW: ${parseFloat(GrossWt).toFixed(3)}`, 3, yCoordinate);
      yCoordinate += 4;
      doc.setFontSize(5);
      if (Stones && Stones.length > 0) {
        Stones.forEach((stone) => {
          doc.text(
            `${stone.StoneName} ${parseFloat(stone.StoneWeight).toFixed(3)}`,
            3,
            yCoordinate
          );
          yCoordinate += 3; // Move to the next line
        });
      }
      doc.setFontSize(7);
      doc.text(`NWt: ${parseFloat(NetWt).toFixed(3)}`, 3, yCoordinate + 1);
      yCoordinate = 15;
      doc.setFontSize(5);
      if (Stones && Stones.length > 0) {
        Stones.forEach((stone) => {
          doc.text(`${stone.Description}`, 19, yCoordinate);
          yCoordinate += 3; // Move to the next line
        });
      }
    }

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(ItemCode);
      doc.addImage(qrCodeDataUrl, "JPEG", 25, 0, imageWidth, imageHeight);
      console.log(qrCodeDataUrl, "qrCodeDataUrl");
    } catch (error) {
      console.error(error);
    }
  }

  const pdfData = doc.output("datauristring");
  const newWindow = window.open();
  newWindow.document.write(
    `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  );
};
