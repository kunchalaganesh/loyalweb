import React, { useEffect, useState } from "react";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import AdminHeading from "../Heading/AdminHeading";
import { a188, a38, a39, a45, a51, a52, a82 } from "../../../Api/RootApiPath";
import { InfinitySpin } from "react-loader-spinner";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import logoImage from "../../../Images/loyalStringLogoSmall.png";
import { useSelector } from "react-redux";
import { numberToIndianWords } from "../../../Other Functions/numberToIndianWords";
import { generateFullBillPDF } from "../../../Other Functions/GenerateFullBillPDF";

export default function AdminAllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [csData, setCsData] = useState([]);
  const [tempOrderList, setTempOrderList] = useState([]);
  const ordersPerPage = 25;

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;

  const navigate = useNavigate();
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a188, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        let rcvdData = response.reverse();
        setAllOrders(rcvdData);
        setLoading(false);

        // setOlddata(response);
        console.log(response.data);
      });
  }, []);
  // useEffect(() => {
  //   fetch(a82)
  //     .then((res) => res.json())
  //     .then((response) => {
  //       // console.log(response);
  //       let rcvdData = response.reverse();
  //       setTempOrderList(rcvdData);

  //       // setOlddata(response);
  //       console.log(response);
  //     });
  // }, []);
  console.log(tempOrderList, "tempOrderList");
  console.log(tempOrderList, "tempOrderList");
  function showPDFWithId(id) {
    // Make the API POST request with the ID
    fetch(a51, {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.blob()) // Convert response to Blob
      .then((blob) => {
        // Create a URL for the Blob object
        const pdfUrl = URL.createObjectURL(blob);

        // Open the PDF in a new window or tab
        window.open(pdfUrl, "_blank");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const handleOrderStatusChange = (orderNumber, newStatus) => {
    // Make the API request to update the order status
    const formData = {
      orderNumber: orderNumber,
      OrderStatus: newStatus,
    };
    fetch(a39, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // alert("changed");
        // Update the order status in the local state
        setAllOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderNumber === orderNumber
              ? { ...order, orderStatus: newStatus }
              : order
          )
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // const removeUnpaid = (x) => {
  //   x.filter((y) => {
  //     if (y !== "Pending") {
  //       return [...y];
  //     }
  //   });
  //   return x;
  // };

  // const filterOrders = (x) => {
  //   allOrders.filter((y) => y.orderName === x);
  //   return setFilteredOrders(allOrders);
  // };
  const filterOrders = () => {
    let filtered = allOrders;

    if (orderStatus && orderStatus !== "") {
      filtered = filtered.filter((order) => order.orderStatus === orderStatus);
    }

    if (orderNumber && orderNumber !== "") {
      const lowercaseOrderNumber = orderNumber.toLowerCase();
      filtered = filtered.filter((order) => {
        const customer = order.tblCustomerDetails;
        const invoiceNoMatch =
          order.invoiceNo &&
          order.invoiceNo.toLowerCase().includes(lowercaseOrderNumber);
        const firstNameMatch =
          customer.firstName &&
          customer.firstName.toLowerCase().includes(lowercaseOrderNumber);
        const lastNameMatch =
          customer.lastName &&
          customer.lastName.toLowerCase().includes(lowercaseOrderNumber);
        const currAddStreetMatch =
          customer.currAddStreet &&
          customer.currAddStreet.toLowerCase().includes(lowercaseOrderNumber);
        const currAddTownMatch =
          customer.currAddTown &&
          customer.currAddTown.toLowerCase().includes(lowercaseOrderNumber);
        const currAddStateMatch =
          customer.currAddState &&
          customer.currAddState.toLowerCase().includes(lowercaseOrderNumber);
        const currAddPincodeMatch =
          customer.currAddPincode &&
          customer.currAddPincode.toLowerCase().includes(lowercaseOrderNumber);
        const perAddStreetMatch =
          customer.perAddStreet &&
          customer.perAddStreet.toLowerCase().includes(lowercaseOrderNumber);
        const perAddTownMatch =
          customer.perAddTown &&
          customer.perAddTown.toLowerCase().includes(lowercaseOrderNumber);
        const perAddStateMatch =
          customer.perAddState &&
          customer.perAddState.toLowerCase().includes(lowercaseOrderNumber);
        const perAddPincodeMatch =
          customer.perAddPincode &&
          customer.perAddPincode.toLowerCase().includes(lowercaseOrderNumber);
        const csMobileMatch =
          customer.mobile &&
          customer.mobile.toLowerCase().includes(lowercaseOrderNumber);
        const rcvdAmtMatch =
          order.receivedAmt &&
          order.receivedAmt.toString().includes(lowercaseOrderNumber);
        const priceAmtMatch =
          order.price && order.price.toString().includes(lowercaseOrderNumber);

        return (
          invoiceNoMatch ||
          firstNameMatch ||
          lastNameMatch ||
          currAddStreetMatch ||
          currAddTownMatch ||
          currAddStateMatch ||
          currAddPincodeMatch ||
          perAddStreetMatch ||
          perAddTownMatch ||
          perAddStateMatch ||
          perAddPincodeMatch ||
          csMobileMatch ||
          rcvdAmtMatch ||
          priceAmtMatch
        );
      });
    }

    if (fromDate !== "" && toDate !== "") {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.invoiceDate);
        orderDate.setHours(0, 0, 0, 0); // Set time to midnight

        const fromDateMidnight = new Date(fromDate);
        fromDateMidnight.setHours(0, 0, 0, 0); // Set time to midnight

        const toDateMidnight = new Date(toDate);
        toDateMidnight.setHours(0, 0, 0, 0); // Set time to midnight

        return orderDate >= fromDateMidnight && orderDate <= toDateMidnight;
      });
    }

    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  useEffect(() => {
    filterOrders();
    window.scrollTo(0, 0);

    console.log(filteredOrders);
  }, [orderStatus, orderNumber, allOrders, fromDate, toDate]);

  // useEffect(() => {}, [currentPage]);
  // console.log(JSON.stringify(orderItems), "orderItems");
  console.log(allOrders);
  const indexOfLastProduct = currentPage * ordersPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  // function numberToIndianWords(num) {
  //   var ones = [
  //     "",
  //     "One ",
  //     "Two ",
  //     "Three ",
  //     "Four ",
  //     "Five ",
  //     "Six ",
  //     "Seven ",
  //     "Eight ",
  //     "Nine ",
  //     "Ten ",
  //     "Eleven ",
  //     "Twelve ",
  //     "Thirteen ",
  //     "Fourteen ",
  //     "Fifteen ",
  //     "Sixteen ",
  //     "Seventeen ",
  //     "Eighteen ",
  //     "Nineteen ",
  //   ];
  //   var tens = [
  //     "",
  //     "",
  //     "Twenty",
  //     "Thirty",
  //     "Forty",
  //     "Fifty",
  //     "Sixty",
  //     "Seventy",
  //     "Eighty",
  //     "Ninety",
  //   ];
  //   if ((num = num.toString()).length > 9)
  //     return "Overflow: Maximum 9 digits supported";
  //   let n = ("000000000" + num)
  //     .substr(-9)
  //     .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  //   if (!n) return;
  //   var str = "";
  //   str +=
  //     n[1] != 0
  //       ? (ones[Number(n[1])] || tens[n[1][0]] + " " + ones[n[1][1]]) + "Crore "
  //       : "";
  //   str +=
  //     n[2] != 0
  //       ? (ones[Number(n[2])] || tens[n[2][0]] + " " + ones[n[2][1]]) + "Lakh "
  //       : "";
  //   str +=
  //     n[3] != 0
  //       ? (ones[Number(n[3])] || tens[n[3][0]] + " " + ones[n[3][1]]) +
  //         "Thousand "
  //       : "";
  //   str +=
  //     n[4] != 0
  //       ? (ones[Number(n[4])] || tens[n[4][0]] + " " + ones[n[4][1]]) +
  //         "Hundred "
  //       : "";
  //   str +=
  //     n[5] != 0
  //       ? (str != "" ? "and " : "") +
  //         (ones[Number(n[5])] || tens[n[5][0]] + " " + ones[n[5][1]])
  //       : "";
  //   return str;
  // }

  // Example usage:

  const number = 150000; // Replace with your number
  const words = numberToIndianWords(number);
  console.log(words); // Outputs "One Lakh Fifty Thousand"

  // Nd darbar Bill Below
  // const generateBillPDF = (
  //   // itemsList,
  //   x
  //   // totalAmount,
  //   // discount,
  //   // gst,
  //   // pricePaid
  // ) => {
  //   const doc = new jsPDF({
  //     orientation: "landscape",
  //     format: "a5",
  //   });
  //   // let itemsListed = [x.tblProduct];
  //   // let itemsLists = orderItems;
  //   console.log(x);
  //   // Add logo and heading
  //   doc.addImage(logoImage, "PNG", 10, 10, 15, 10);
  //   doc.setFontSize(18);
  //   doc.text("N. D. Darbar Sindgi", 30, 15);
  //   doc.setFontSize(12);
  //   doc.text("Old SBI Road, SINDGI, Dist. Vijaypur (Karnataka)", 30, 22);
  //   doc.setFontSize(10);
  //   doc.text("Whastapp - 8123803806", 145, 14);
  //   doc.text("Mob - 7022308916", 155, 20);
  //   doc.setDrawColor(255, 0, 0);
  //   doc.line(10, 25, 200, 25);

  //   // Add items table
  //   doc.setDrawColor(0, 0, 0);
  //   doc.setFontSize(14);
  //   let y = 30;
  //   const creationDate = new Date(x.createdOn);
  //   doc.setFontSize(10);

  //   if (x.tblCustomerDetails) {
  //     doc.text(
  //       `Name - ${x.tblCustomerDetails.firstName} ${x.tblCustomerDetails.lastName}`,
  //       10,
  //       y
  //     );
  //     doc.text(`Mobile - ${x.tblCustomerDetails.mobile}`, 10, y + 6);
  //     doc.text(
  //       `Address - ${x.tblCustomerDetails.currAddStreet} ${x.tblCustomerDetails.currAddTown} ${x.tblCustomerDetails.currAddState} ${x.tblCustomerDetails.currAddPinCode}`,
  //       10,
  //       y + 12
  //     );
  //     doc.text(`Invoice No - ${x.invoiceNo}`, 130, y);
  //     doc.text(`Date - ${creationDate.toLocaleString()}`, 130, y + 6);
  //     doc.text(`Email - ${x.tblCustomerDetails.email}`, 130, y + 12);
  //   }

  //   doc.line(10, y + 15, 200, y + 15);
  //   doc.setFontSize(10);
  //   y = 50;
  //   doc.text("Items", 10, y);
  //   doc.text("HSN", 50, y);
  //   doc.text("Gr.Wt", 65, y);
  //   doc.text("Stone.Wt", 80, y);
  //   doc.text("Net.Wt", 100, y);
  //   doc.text("Proc.Wt", 115, y);
  //   doc.text("Total.Wt", 130, y);
  //   doc.text("Making", 145, y);
  //   doc.text("Rate:10/Gm", 160, y);
  //   doc.text("Price", 185, y);
  //   doc.line(10, y + 3, 200, y + 3);
  //   const maxPageHeight = doc.internal.pageSize.height - 20;
  //   y = 60; // Adjust starting Y position
  //   const columnWidth = 40;
  //   doc.setFontSize(8);
  //   orderItems.forEach((item) => {
  //     if (y + 10 > maxPageHeight) {
  //       doc.addPage();
  //       y = 30; // Reset Y position for the new page
  //     }
  //     item.productName
  //       ? doc.text(item.productName, 10, y)
  //       : doc.text("-", 10, y);
  //     item.hsnCode !== "null"
  //       ? doc.text(item.hsnCode, 50, y)
  //       : doc.text("-", 50, y);
  //     item.grosswt ? doc.text(item.grosswt, 65, y) : doc.text("-", 65, y);
  //     item.stoneWeight
  //       ? doc.text(item.stoneWeight, 80, y)
  //       : doc.text("-", 80, y);
  //     item.netWt ? doc.text(item.netWt, 100, y) : doc.text("-", 100, y);
  //     // doc.text(item.procWt, 115, y);
  //     // // doc.text(item.totalWt, 130, y);
  //     item.makingchrg
  //       ? doc.text(`${parseInt(item.makingchrg)}`, 145, y)
  //       : doc.text("", 145, y);
  //     item.rate
  //       ? doc.text(`${parseInt(item.rate)}`, 165, y)
  //       : doc.text("-", 160, y);
  //     item.price
  //       ? doc.text(`${parseInt(item.price)}`, 185, y)
  //       : doc.text("", 185, y);
  //     y += 8;
  //   });
  //   // Add total amount
  //   doc.line(10, y - 5, 200, y - 5);
  //   doc.text(`Sales Amount: ${x.price}`, 155, y);
  //   doc.text(`CGST 1.5%: ${parseFloat(x.govtTax) / 2}`, 155, y + 4);
  //   doc.text(`SGST 1.5%: ${parseFloat(x.govtTax) / 2}`, 155, y + 8);
  //   doc.text(`R.O./Discount: ${x.offer}`, 155, y + 12);
  //   doc.text(`Total: ${x.receivedAmt}`, 155, y + 16);
  //   doc.line(10, y + 20, 200, y + 18);

  //   // Add price total box
  //   // const priceTotalBoxX = 130;
  //   // const priceTotalBoxY = 180; // Adjust position
  //   // doc.rect(priceTotalBoxX, priceTotalBoxY, 60, 40);
  //   // doc.text("Price Total", priceTotalBoxX + 5, priceTotalBoxY + 5);
  //   // doc.text(`Discount: ${discount}`, priceTotalBoxX + 5, priceTotalBoxY + 15);
  //   // doc.text(`GST: ${gst}`, priceTotalBoxX + 5, priceTotalBoxY + 25);
  //   // doc.text(
  //   //   `Price Paid: ${pricePaid}`,
  //   //   priceTotalBoxX + 5,
  //   //   priceTotalBoxY + 35
  //   // );

  //   // Add footer with company branches
  //   const footerY = doc.internal.pageSize.height - 12;
  //   doc.setFontSize(10);
  //   doc.text("Other Branches:", 10, footerY);
  //   doc.text("Saraf Bazar: Vijayapur (Ph:251562)", 40, footerY);
  //   doc.text(
  //     "Darbar Square: Opposite Balaji Temple, Vijayapur (Ph: 221177)",
  //     40,
  //     footerY + 4
  //   );
  //   doc.text("www.darbarjewellers.com", 40, footerY + 8);

  //   // Save or display the PDF
  //   const pdfBlob = doc.output("blob");
  //   const pdfUrl = URL.createObjectURL(pdfBlob);
  //   window.open(pdfUrl, "_blank");
  // };

  // Soni Jewellers Bill Below
  // const generateBillPDF = (x) => {
  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     // format: "a5",
  //     format: [160, 235],
  //   });

  //   doc.setDrawColor(0, 0, 0);
  //   doc.setFontSize(11);
  //   doc.setFont("times");
  //   doc.text("Tax Invoice", 70, 42);
  //   doc.setFontSize(9);
  //   doc.text("GST:21AGAPS4855P1ZZ", 5, 42);
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
  //   const bulletPoint = "\u2022";

  //   const purchaseItems = x.filter(
  //     (product) => product.billtype === "purchase"
  //   );
  //   console.log(x, "x");
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
  //     doc.text(`Invoice No - ${csData.invoiceNo}`, 105, y);
  //     doc.text(
  //       `Date - ${new Date(csData.createdOn).toLocaleDateString()}`,
  //       105,
  //       y + 5
  //     );
  //     doc.text(`Email - ${csData.tblCustomerDetails.email}`, 105, y + 10);
  //     doc.text(`Pan Card - ${csData.tblCustomerDetails.panNo}`, 5, y + 15);
  //     doc.text(`Gst No - ${csData.tblCustomerDetails.gstNo}`, 105, y + 15);
  //   }

  //   doc.line(5, y + 20, 155, y + 20);
  //   y = 75;
  //   doc.setFontSize(8);
  //   doc.text("No", 6, y);
  //   doc.text("Items", 12, y);
  //   doc.text("HSN", 65, y);
  //   doc.text("Pc/Pr", 75, y);
  //   doc.text("Purity", 85, y);
  //   doc.text("Grs.Wt", 95, y);
  //   doc.text("Net.Wt", 107, y);
  //   doc.text("Rate", 119, y);
  //   doc.text("Other", 130, y);
  //   // doc.text("Labour", 145, y);
  //   doc.text("Price", 145, y);
  //   doc.text("(incl MC)", 145, y + 3);
  //   doc.line(5, y + 6, 155, y + 6);

  //   const maxPageHeight = doc.internal.pageSize.height - 20;
  //   y += 10;
  //   doc.setFontSize(8);
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
  //     doc.setFontSize(6);
  //     doc.setFont("times", "bold");
  //     doc.text(
  //       item.hallmark_amt ? `Hallmark amt-${item.hallmark_amt}` : "",
  //       12,
  //       y + 3
  //     );
  //     doc.setFont("times", "normal");
  //     doc.setFontSize(8);
  //     doc.text(
  //       item.hsnCode && item.hsnCode !== "null" && item.hsnCode !== "undefined"
  //         ? item.hsnCode
  //         : "-",
  //       65,
  //       y
  //     );
  //     doc.setFontSize(6);
  //     doc.setFont("times", "bold");
  //     doc.text(item.huidCode ? `UID-${item.huidCode}` : "", 70, y + 3);
  //     doc.setFontSize(8);
  //     doc.setFont("times", "normal");
  //     doc.text(item.quantity !== "null" ? item.quantity : "-", 75, y);
  //     doc.text(item.purity ? item.purity : "-", 85, y);
  //     doc.text(item.grosswt ? item.grosswt : "-", 95, y);
  //     doc.text(item.netWt ? item.netWt : "-", 107, y);
  //     doc.text(item.rate ? item.rate : "-", 119, y);
  //     doc.text(
  //       parseFloat(
  //         (parseFloat(item.rate) / 10) * parseFloat(item.netWt)
  //       ).toFixed(2),
  //       130,
  //       y
  //     );
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
  //     // doc.text(makingChargeText, 145, y);
  //     // doc.text("0.00", 115, y);
  //     doc.text(price, 145, y);
  //     srNo++;
  //     y += 8;
  //   });

  //   doc.line(5, y - 3, 155, y - 3);
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

  //   y += 0;
  //   doc.text(`Sales Amount:`, 110, y);
  //   doc.text(`${parseFloat(totalSaleAmount).toFixed(2)}`, 140, y);
  //   doc.text(`CGST 1.5%:`, 110, y + 5);
  //   doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 140, y + 5);
  //   doc.text(`SGST 1.5%:`, 110, y + 10);
  //   doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 140, y + 10);
  //   doc.text(`R.O./Discount:`, 110, y + 15);
  //   doc.text(`${csData.offer}`, 140, y + 15);
  //   doc.text(`Purchase Amount (-):`, 110, y + 20);
  //   doc.text(`${parseFloat(csData.purchaseAmt).toFixed(2)}`, 140, y + 20);
  //   doc.text(`Recieved Amount:`, 110, y + 25);
  //   doc.text(`${parseFloat(csData.receivedAmt).toFixed(2)}`, 140, y + 25);
  //   doc.text(`Total:`, 110, y + 30);
  //   doc.text(`${parseFloat(csData.price).toFixed(2)}`, 140, y + 30);

  //   let totalAmountInWords = numberToIndianWords(
  //     parseFloat(csData.price).toFixed(0)
  //   );
  //   doc.text(`Total in Words: ${totalAmountInWords} Only`, 10, y + 40);

  //   let footerY = doc.internal.pageSize.height - 10;
  //   doc.setFontSize(8);
  //   // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
  //   // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
  //   // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
  //   doc.text("TERM AND CONDITION", 10, footerY - 35);
  //   doc.text(
  //     `${bulletPoint} We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct`,
  //     10,
  //     footerY - 30
  //   );
  //   doc.text(
  //     `${bulletPoint} The registration certificate is valid on the date of issue of this invoice`,
  //     10,
  //     footerY - 26
  //   );
  //   doc.text(
  //     `${bulletPoint} Goods once sold can be exchanged only if returned unused within 7 days`,
  //     10,
  //     footerY - 22
  //   );
  //   doc.text(
  //     `${bulletPoint} Weight and pieces verified and found Ok`,
  //     10,
  //     footerY - 18
  //   );
  //   doc.text(
  //     `${bulletPoint} All disutes are Subject to Bhubaneswar jurisidiction only`,
  //     10,
  //     footerY - 14
  //   );

  //   doc.setFontSize(9);
  //   doc.text("Customer Signature", 10, footerY);
  //   doc.text(`Bill By - ${csData.billedby} `, 55, footerY - 5);
  //   doc.text(`Sold By - ${csData.soldby} `, 55, footerY);
  //   doc.text("For Soni Jewellers", 125, footerY);

  //   if (purchaseItems.length > 0) {
  //     const purchaseItemsGold = x.filter(
  //       (product) =>
  //         product.billtype === "purchase" &&
  //         product.categoryName &&
  //         product.categoryName.toLowerCase().includes("gold")
  //     );
  //     doc.addPage();
  //     doc.setFontSize(12);
  //     doc.setFont("times");
  //     doc.text(`Mod Gold URD`, 62, 40);
  //     doc.setFontSize(9);
  //     doc.text("GST:21AGAPS4855P1ZZ", 5, 40);
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
  //       doc.text(`Invoice No - ${csData.invoiceNo}`, 105, y);
  //       doc.text(
  //         `Date - ${new Date(csData.createdOn).toLocaleDateString()}`,
  //         105,
  //         y + 5
  //       );
  //       doc.text(`Email - ${csData.tblCustomerDetails.email}`, 105, y + 10);
  //       doc.text(`Pan Card - ${csData.tblCustomerDetails.panNo}`, 5, y + 15);
  //       doc.text(`Gst No - ${csData.tblCustomerDetails.gstNo}`, 105, y + 15);
  //     }
  //     doc.line(5, y + 20, 155, y + 20);
  //     y = 75;
  //     doc.setFontSize(9);
  //     doc.text("No", 6, y);
  //     doc.text("Items", 12, y);
  //     doc.text("HSN", 65, y);
  //     doc.text("Pc/Pr", 75, y);
  //     // doc.text("Other", 85, y);
  //     doc.text("Grs.Wt", 85, y);
  //     doc.text("Net.Wt", 95, y);
  //     doc.text("Rate", 107, y);
  //     doc.text("CFine", 119, y);
  //     doc.text("Other", 130, y);
  //     doc.text("Price", 145, y);
  //     doc.line(5, y + 3, 155, y + 3);

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
  //         item.hsnCode &&
  //           item.hsnCode !== "null" &&
  //           item.hsnCode !== "undefined"
  //           ? item.hsnCode
  //           : "-",
  //         65,
  //         y
  //       );
  //       doc.setFontSize(7);
  //       doc.setFont("times", "bold");
  //       doc.text(item.huidCode ? `UID-${item.huidCode}` : "", 60, y + 3);
  //       doc.setFontSize(9);
  //       doc.setFont("times", "normal");
  //       doc.text(item.quantity !== "null" ? item.quantity : "-", 75, y);
  //       // doc.text("-", 85, y);
  //       doc.text(item.grosswt ? item.grosswt : "-", 85, y);
  //       doc.text(item.netWt ? item.netWt : "-", 95, y);
  //       doc.text(item.rate ? item.rate : "-", 107, y);
  //       doc.text(item.fine_percentage ? item.fine_percentage : "-", 119, y);
  //       const price =
  //         item.billtype !== "purchase"
  //           ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
  //           : parseFloat(item.price).toFixed(2);
  //       doc.text("-", 130, y);

  //       doc.text(`${parseFloat(price) * -1}`, 145, y);
  //       totalOldGoldAmount += parseFloat(price) * -1;
  //       pGSrNo++;
  //       y += 8;
  //     });

  //     doc.line(5, y - 3, 155, y - 3);
  //     y += 10;
  //     let totalOldGoldAmountInWords = numberToIndianWords(
  //       parseFloat(totalOldGoldAmount).toFixed(0)
  //     );

  //     doc.text(`Total in Words: ${totalOldGoldAmountInWords} Only`, 10, y + 40);

  //     let footerY = doc.internal.pageSize.height - 10;
  //     doc.setFontSize(8);
  //     // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
  //     // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
  //     // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
  //     doc.text("TERM AND CONDITION", 10, footerY - 35);
  //     doc.text(
  //       `${bulletPoint} We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct`,
  //       10,
  //       footerY - 30
  //     );
  //     doc.text(
  //       `${bulletPoint} The registration certificate is valid on the date of issue of this invoice`,
  //       10,
  //       footerY - 26
  //     );
  //     doc.text(
  //       `${bulletPoint} Goods once sold can be exchanged only if returned unused within 7 days`,
  //       10,
  //       footerY - 22
  //     );
  //     doc.text(
  //       `${bulletPoint} Weight and pieces verified and found Ok`,
  //       10,
  //       footerY - 18
  //     );
  //     doc.text(
  //       `${bulletPoint} All disutes are Subject to Bhubaneswar jurisidiction only`,
  //       10,
  //       footerY - 14
  //     );

  //     doc.setFontSize(9);
  //     doc.text("Customer Signature", 10, footerY);
  //     doc.text(`Bill By - ${csData.billedby} `, 55, footerY - 5);
  //     doc.text(`Sold By - ${csData.soldby} `, 55, footerY);
  //     doc.text("For Soni Jewellers", 125, footerY);
  //   }
  //   const purchaseItemsNotGold = x.filter(
  //     (product) =>
  //       product.billtype === "purchase" &&
  //       !product.categoryName.toLowerCase().includes("gold")
  //   );
  //   if (
  //     purchaseItemsNotGold.length > 0
  //     // !purchaseItems.categoryName.toLowerCase().includes("gold")
  //   ) {
  //     doc.addPage();
  //     doc.setFontSize(12);
  //     doc.setFont("times");
  //     doc.text(`Mod Silver URD`, 62, 40);
  //     doc.setFontSize(9);
  //     doc.text("GST:21AGAPS4855P1ZZ", 5, 40);
  //     doc.setFont("times");
  //     let y = 45; // Adjust starting Y position
  //     const columnWidth = 15; // Adjust column widths for A5
  //     const contentWidth = 120; // Adjust content width for A5

  //     console.log(purchaseItemsNotGold, "purchaseItems");
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
  //       doc.text(`Invoice No - ${csData.invoiceNo}`, 105, y);
  //       doc.text(
  //         `Date - ${new Date(csData.createdOn).toLocaleDateString()}`,
  //         105,
  //         y + 5
  //       );
  //       doc.text(`Email - ${csData.tblCustomerDetails.email}`, 105, y + 10);
  //       doc.text(`Pan Card - ${csData.tblCustomerDetails.panNo}`, 5, y + 15);
  //       doc.text(`Gst No - ${csData.tblCustomerDetails.gstNo}`, 105, y + 15);
  //     }
  //     doc.line(5, y + 20, 155, y + 20);
  //     y = 75;
  //     doc.setFontSize(9);
  //     doc.text("No", 6, y);
  //     doc.text("Items", 12, y);
  //     doc.text("HSN", 65, y);
  //     doc.text("Pc/Pr", 75, y);
  //     // doc.text("Other", 85, y);
  //     doc.text("Grs.Wt", 85, y);
  //     doc.text("Net.Wt", 95, y);
  //     doc.text("Rate", 107, y);
  //     doc.text("CFine", 119, y);
  //     doc.text("Other", 130, y);
  //     doc.text("Price", 145, y);
  //     doc.line(5, y + 3, 155, y + 3);

  //     const maxPageHeight = doc.internal.pageSize.height - 20;
  //     y += 10;
  //     doc.setFontSize(9);

  //     purchaseItemsNotGold.forEach((item) => {
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
  //         item.hsnCode &&
  //           item.hsnCode !== "null" &&
  //           item.hsnCode !== "undefined"
  //           ? item.hsnCode
  //           : "-",
  //         65,
  //         y
  //       );
  //       doc.setFontSize(7);
  //       doc.setFont("times", "bold");
  //       doc.text(item.huidCode ? `UID-${item.huidCode}` : "", 60, y + 3);
  //       doc.setFontSize(9);
  //       doc.setFont("times", "normal");
  //       doc.text(item.quantity !== "null" ? item.quantity : "-", 75, y);
  //       // doc.text("-", 85, y);
  //       doc.text(item.grosswt ? item.grosswt : "-", 85, y);
  //       doc.text(item.netWt ? item.netWt : "-", 95, y);
  //       doc.text(item.rate ? item.rate : "-", 107, y);
  //       doc.text(item.fine_percentage ? item.fine_percentage : "-", 119, y);
  //       const price =
  //         item.billtype !== "purchase"
  //           ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
  //           : parseFloat(item.price).toFixed(2);
  //       doc.text("-", 130, y);

  //       doc.text(`${parseFloat(price) * -1}`, 145, y);
  //       totalOldNotGoldAmount += parseFloat(price) * -1;
  //       pSSrNo++;
  //       y += 8;
  //     });
  //     doc.line(5, y - 3, 175, y - 3);
  //     y += 10;
  //     let totalOldNotGoldAmountInWords = numberToIndianWords(
  //       parseFloat(totalOldNotGoldAmount).toFixed(0)
  //     );

  //     doc.setFontSize(9);
  //     doc.text(
  //       `Total in Words: ${totalOldNotGoldAmountInWords} Only`,
  //       10,
  //       y + 5
  //     );
  //     let footerY = doc.internal.pageSize.height - 10;
  //     doc.setFontSize(8);
  //     // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
  //     // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
  //     // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
  //     doc.text("TERM AND CONDITION", 10, footerY - 35);
  //     doc.text(
  //       `${bulletPoint} We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct`,
  //       10,
  //       footerY - 30
  //     );
  //     doc.text(
  //       `${bulletPoint} The registration certificate is valid on the date of issue of this invoice`,
  //       10,
  //       footerY - 26
  //     );
  //     doc.text(
  //       `${bulletPoint} Goods once sold can be exchanged only if returned unused within 7 days`,
  //       10,
  //       footerY - 22
  //     );
  //     doc.text(
  //       `${bulletPoint} Weight and pieces verified and found Ok`,
  //       10,
  //       footerY - 18
  //     );
  //     doc.text(
  //       `${bulletPoint} All disutes are Subject to Bhubaneswar jurisidiction only`,
  //       10,
  //       footerY - 14
  //     );

  //     doc.setFontSize(9);
  //     doc.text("Customer Signature", 10, footerY);
  //     doc.text(`Bill By - ${csData.billedby} `, 55, footerY - 5);
  //     doc.text(`Sold By - ${csData.soldby} `, 55, footerY);
  //     doc.text("For Soni Jewellers", 125, footerY);
  //   }

  //   const pdfBlob = doc.output("blob");
  //   const pdfUrl = URL.createObjectURL(pdfBlob);
  //   window.open(pdfUrl, "_blank");
  // };

  // Bill format for Sk Khandre

  // const itemsList = [
  //   {
  //     // doc.text("Items", 10, y);
  //     // doc.text("HSN", 50, y);
  //     // doc.text("Gr.Wt", 65, y);
  //     // doc.text("Stone.Wt", 80, y);
  //     // doc.text("Net.Wt", 100, y);
  //     // doc.text("Proc.Wt", 115, y);
  //     // doc.text("Total.Wt", 130, y);
  //     // doc.text("Making", 145, y);
  //     // doc.text("Rate:10/Gm", 160, y);
  //     // doc.text("Price", 185, y);
  //     product_Name: "Item 1",
  //     hsn: "10g",
  //     grossWt: "Gold",
  //     stoneWt: "95%",
  //     netWt: "$100",
  //     procWt: "$100",
  //     totalWt: "$100",
  //     making: "$100",
  //     rate: "$100",
  //     price: "$100",
  //   },
  //   {
  //     product_Name: "Item 2",
  //     hsn: "20g",
  //     grossWt: "Gold",
  //     stoneWt: "95%",
  //     netWt: "$200",
  //     procWt: "$200",
  //     totalWt: "$200",
  //     making: "$200",
  //     rate: "$200",
  //     price: "$200",
  //   },

  //   {
  //     product_Name: "Item 2",
  //     hsn: "20g",
  //     grossWt: "Gold",
  //     stoneWt: "95%",
  //     netWt: "$200",
  //     procWt: "$200",
  //     totalWt: "$200",
  //     making: "$200",
  //     rate: "$200",
  //     price: "$200",
  //   },

  //   // Add more items here
  // ];
  const getAllOrderItemsForSending = async (id, x) => {
    fetch(a52, {
      method: "POST",
      body: JSON.stringify({ OrderId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // Convert response to Blob
      .then((data) => {
        // setOrderItems(data);
        // setCsData(x);
        navigate(`/admin_invoice_edit?orderItems=${JSON.stringify(x)}`);
        setLoading(false);
        console.log(data, "Order Items rcvd Data");
        // generateBillPDF(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getAllOrderItems = async (id, x) => {
    fetch(a52, {
      method: "POST",
      body: JSON.stringify({ OrderId: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // Convert response to Blob
      .then((data) => {
        setOrderItems(data);
        setLoading(false);
        console.log(data, "Order Items rcvd Data");
        // generateBillPDF(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    if (orderItems.length > 0) {
      generateFullBillPDF(orderItems, csData);
    } else if (csData.length !== 0) {
      alert("No Items Found in Invoice");
    }
  }, [orderItems]);
  const totalAmount = "$1000";
  const discount = "$50";
  const gst = "$30";
  const pricePaid = "$980";

  return (
    <div>
      <AdminHeading />

      <div className="adminMainBodyBox">
        <AdminBreadCrump
          title={"All Orders"}
          companyName={"Loyalstring"}
          module={"E-commerce"}
          page={"All Orders"}
        />
        <div className="adminAddCategoryMainBox">
          <div
            style={{ marginBottom: "50px" }}
            className="adminAddCategoryInnerBox"
          >
            <div className={loading == true ? "loading" : "none"}>
              {/* <h1>Loading...</h1> */}
              <InfinitySpin width="200" color="#4fa94d" />
            </div>
            {/* <div
              style={{ marginInline: "0px", paddingInline: "0px" }}
              className="adminAllOrdersFilterBox"
            > */}
            <div
              style={{
                width: "100%",
                justifyContent: "left",
                flexWrap: "wrap",
                marginBottom: "30px",
              }}
              className="adminAllProductsFilterBox"
            >
              <div
                style={{ marginBottom: "5px" }}
                className="adminAllProductsFilterCategoryBox"
              >
                <select
                  value={orderStatus}
                  onChange={(e) => {
                    setOrderStatus(e.target.value), setCurrentPage(1);
                  }}
                >
                  <option value="">Choose...</option>
                  <option value="Pending Payment">Pending Payment</option>
                  <option value="Payment Failed">Payment Failed</option>
                  <option value="Paid">Paid</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <div
                className="adminAllProductsFilterLabelBox"
                // className="adminAllOrderLeftBox"
              >
                <input
                  type="date"
                  placeholder="From Date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="To Date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <div
                className="adminAllProductsFilterLabelBox"
                // className="adminAllOrderLeftBox"
              >
                <input
                  type="text"
                  placeholder="Search Name / Address / Mobile / Amount / Invoice..."
                  value={orderNumber}
                  onChange={(e) => {
                    setOrderNumber(e.target.value.toLowerCase()),
                      setCurrentPage(1);
                  }}
                />
                {/* <p>Status</p> */}
              </div>
            </div>
            {/* <div className="adminAllOrderRightBox">
                <button>
                  <BsHandbag style={{ marginRight: "5px" }} />
                  Add New Order
                </button>
                <button>Export</button>
              </div> */}
            {/* </div> */}
            <div
              className="adminAllOrdersTableMainBox"
              style={{ overflow: "auto" }}
            >
              <table
                className="adminInventoryMainTable"
                style={{
                  width: "100%",
                  marginLeft: "1rem",
                  boxSizing: "border-box",
                }}
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Bill No</th>
                    {/* <th>Customer Id</th> */}
                    <th>Customer Name</th>
                    <th>Inv Amt</th>
                    <th>Total Sell Wt (G+S)</th>
                    <th>URD Amt</th>
                    <th>Total URD Wt (G+S)</th>
                    {/* <th>Product Id</th> */}
                    {/* <th>Product Name</th> */}
                    {/* <th>Item Code</th> */}
                    {/* <th>Quantity</th> */}
                    <th>Rcvd Amt</th>
                    <th>Bal Amt</th>

                    {/* <th>Payment Mode</th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((x) => {
                    return (
                      // <tr key={x.Customer_id}>
                      <tr style={{ whiteSpace: "nowrap" }} key={x.Id}>
                        {/* <td>{x.id}</td> */}
                        <td>
                          {/* {new Date(x.createdOn).toLocaleDateString("en-GB")} */}
                          {new Date(x.InvoiceDate).toLocaleDateString("en-GB")}
                        </td>
                        <td
                          // onClick={() => {
                          //   navigate(`/admin-orderdetails/${x.id}`);
                          // }}
                          onClick={() => {
                            // navigate(
                            //   `/admin_invoice_edit?objectRcvd=${JSON.stringify(
                            //     x
                            //   )}`
                            // );
                            // getAllOrderItemsForSending(x.Id, x);
                            navigate(`/admin_invoice_edit?invoiceId=${x.Id}`);
                          }}
                          className="adminAllOrdersOrderData"
                        >
                          {x.InvoiceNo}
                        </td>
                        {/* <td>{x.customer_Id}</td> */}
                        {/* NOTE:"Please Uncomment bekow line" */}
                        <td>{x.firstName + " " + x.lastName}</td>
                        <td>
                          ₹{parseInt(x.TotalAmount).toLocaleString("en-IN")}
                        </td>
                        <td>
                          Sell Wt(G:{x.TotalSaleGold}+S:{x.TotalSaleSilver})
                        </td>
                        <td>
                          ₹{parseInt(x.UrdPurchaseAmt).toLocaleString("en-IN")}
                        </td>
                        <td>
                          URD Wt(G:{x.TotalSaleUrdGold}+S:
                          {x.TotalSaleUrdSilver})
                        </td>
                        {/* <td>{x.product_id}</td> */}
                        {/* <td>{x.tblProduct.product_Name}</td> */}
                        {/* <td
                          className="adminAllOrdersOrderData"
                          onClick={() => {
                            navigate(`/admin-orderdetails/${x.id}`);
                          }}
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {x.tblProduct.itemCode}
                        </td> */}

                        {/* <td>{x.qty}</td> */}
                        <td>
                          ₹{parseInt(x.ReceivedAmount).toLocaleString("en-IN")}
                        </td>

                        {/* <td style={{ whiteSpace: "nowrap" }}>
                          <p
                            style={
                              x.orderStatus === "Paid"
                                ? {
                                    backgroundColor: "rgba(0, 128, 0, 0.7)",
                                    color: "white",
                                    borderRadius: "5px",
                                    padding: "2px",
                                    margin: "0px 5px",
                                  }
                                : x.orderStatus === "Processing Payment"
                                ? {
                                    backgroundColor: "rgb(219, 153, 30)",
                                    color: "white",
                                    borderRadius: "5px",
                                    padding: "2px 10px",
                                    margin: "0px 5px",
                                  }
                                : x.orderStatus === "Payment Failed"
                                ? {
                                    backgroundColor: "rgb(231, 30, 60)",
                                    color: "white",
                                    borderRadius: "4px",
                                    padding: "2px 10px",
                                    margin: "0px 5px",
                                  }
                                : x.orderStatus === "Shipped"
                                ? {
                                    backgroundColor: "rgb(77, 155, 228)",
                                    color: "white",
                                    borderRadius: "4px",
                                    padding: "2px 10px",
                                    margin: "0px 5px",
                                  }
                                : x.orderStatus === "Delivered"
                                ? {
                                    backgroundColor: "rgb(159, 77, 206)",
                                    color: "white",
                                    borderRadius: "4px",
                                    padding: "2px 10px",
                                    margin: "0px 5px",
                                  }
                                : {
                                    backgroundColor: "rgb(180, 180, 46)",
                                    color: "white",
                                    borderRadius: "4px",
                                    padding: "2px 10px",
                                  }
                            }
                          >
                            {x.orderStatus}
                          </p>
                        </td> */}
                        <td
                          style={{
                            color: parseInt(x.BalanceAmt) > 0 ? "red" : "black",
                          }}
                        >
                          ₹{parseInt(x.BalanceAmt)}
                        </td>

                        {/* <td>{x.orderStatus.filter((y) => y !== "Pending")}</td> */}
                        {/* <td>{x.paymentMode}</td> */}
                        {/* <td>
                          {x.orderStatus === "Paid" ? (
                            <select
                              required="required"
                              value={orderStatus}
                              onChange={(e) =>
                                handleOrderStatusChange(
                                  x.orderNumber,
                                  e.target.value
                                )
                              }
                            >
                              <option value={x.orderStatus}>Change..</option>
                              
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          ) : x.orderStatus === "Shipped" ? (
                            <select
                              required="required"
                              value={orderStatus}
                              onChange={(e) =>
                                handleOrderStatusChange(
                                  x.orderNumber,
                                  e.target.value
                                )
                              }
                            >
                              <option value={x.orderStatus}>Change..</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          ) : (
                            <p
                              style={
                                x.orderStatus === "Paid"
                                  ? {
                                      fontWeight: "bold",
                                      color: "rgba(0, 128, 0, 0.7)",
                                      whiteSpace: "nowrap",
                                    }
                                  : x.orderStatus === "Processing Payment"
                                  ? {
                                      fontWeight: "bold",
                                      color: "rgb(219, 153, 30)",
                                      whiteSpace: "nowrap",
                                    }
                                  : x.orderStatus === "Payment Failed"
                                  ? {
                                      fontWeight: "bold",
                                      color: "rgb(231, 30, 60)",
                                      whiteSpace: "nowrap",
                                    }
                                  : x.orderStatus === "Shipped"
                                  ? {
                                      fontWeight: "bold",
                                      color: "rgb(77, 155, 228)",
                                      whiteSpace: "nowrap",
                                    }
                                  : x.orderStatus === "Delivered"
                                  ? {
                                      fontWeight: "bold",
                                      color: "rgb(159, 77, 206)",
                                      whiteSpace: "nowrap",
                                    }
                                  : {
                                      fontWeight: "bold",
                                      color: "rgb(180, 180, 46)",
                                      whiteSpace: "nowrap",
                                    }
                              }
                            >
                              {x.orderStatus}
                            </p>
                          )}
                        </td> */}
                        <td>
                          <button
                            style={{ padding: "0px", cursor: "pointer" }}
                            onClick={() => {
                              // showPDFWithId(x.id), setLoading(true);
                              // generateBillPDF([x], [x]);
                              // console.log("order", [x.tblProduct]);
                              setCsData(x);
                              getAllOrderItems(x.Id);
                            }}
                          >
                            show bill
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="bulkProductAddingTableMain">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
