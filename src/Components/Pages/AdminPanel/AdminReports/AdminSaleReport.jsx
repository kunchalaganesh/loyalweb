import React, { useEffect, useState } from "react";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import AdminHeading from "../Heading/AdminHeading";
import { a38, a39, a45, a51, a52 } from "../../../Api/RootApiPath";
import { InfinitySpin } from "react-loader-spinner";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import logoImage from "../../../Images/loyalStringLogoSmall.png";
import { useSelector } from "react-redux";
import { numberToIndianWords } from "../../../Other Functions/numberToIndianWords";

export default function AdminSaleReport() {
  const [allOrders, setAllOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 25;
  const [totalSales, setTotalSales] = useState(0);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [totalRecieved, setTotalRecieved] = useState(0);
  const [csData, setCsData] = useState([]);

  const allStates = useSelector((state) => state);

  const navigate = useNavigate();
  useEffect(() => {
    // Fetch all orders
    fetch(a38)
      .then((res) => res.json())
      .then((response) => {
        let rcvdData = response.data.reverse();
        const ordersWithSrno = rcvdData.map((order, index) => {
          return {
            ...order,
            srno: index + 1,
          };
        });
        setAllOrders(ordersWithSrno);
        setLoading(false);
      });
  }, []);

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
  useEffect(() => {
    // Filter orders for today's date
    const today = new Date().toLocaleDateString();
    const todayOrders = allOrders.filter(
      (order) => new Date(order.createdOn) === today
    );

    // Calculate total sales and total purchase amounts for today
    const totalSalesAmount = currentOrders.reduce(
      (acc, order) => acc + parseFloat(order.price),
      0
    );

    const totalPurchaseAmount = currentOrders.reduce(
      (acc, order) => acc + parseFloat(order.purchaseAmt),
      0
    );
    const totalRecievesAmount = currentOrders.reduce(
      (acc, order) => acc + parseFloat(order.receivedAmt),
      0
    );

    // Set the state variables for total sales and total purchase
    setTotalSales(totalSalesAmount);
    setTotalPurchase(totalPurchaseAmount);
    setTotalRecieved(totalRecievesAmount);
  }, [orderStatus, orderNumber, fromDate, toDate, currentOrders]);

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
        navigate(
          `/admin_invoice_edit?csData=${JSON.stringify(
            x
          )}&orderItems=${JSON.stringify(data)}`
        );
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
      generateBillPDF(orderItems);
    }
  }, [orderItems]);

  const generateBillPDF = (x) => {
    const doc = new jsPDF({
      orientation: "portrait",
      // format: "a5",
      format: [180, 250],
    });

    doc.setDrawColor(0, 0, 0);
    doc.setFontSize(13);
    doc.setFont("times");
    doc.text("Tax Invoice", 77, 42);
    doc.setFontSize(10);
    doc.text("GST No : 27BBKPK5411K1ZI ", 5, 42);
    doc.line(5, 44, 175, 44);
    doc.setFont("times");
    // doc.text("GST-No-27BBKPK5411K1ZI", 100, 35);
    let y = 50; // Adjust starting Y position
    const columnWidth = 15; // Adjust column widths for A5
    const contentWidth = 120; // Adjust content width for A5
    let srNo = 1;
    let pGSrNo = 1;
    let pSSrNo = 1;
    let totalOldGoldAmount = 0;
    let totalOldNotGoldAmount = 0;
    const purchaseItems = x.filter(
      (product) => product.billtype === "purchase"
    );
    console.log(x, "x");
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
    doc.text("Purity", 85, y);
    doc.text("Grs.Wt", 95, y);
    doc.text("Net.Wt", 107, y);
    doc.text("Rate", 119, y);
    doc.text("Orn Amt", 130, y);
    doc.text("Labour", 145, y);
    doc.text("Price", 160, y);
    doc.line(5, y + 3, 175, y + 3);

    const maxPageHeight = doc.internal.pageSize.height - 20;
    y += 10;
    doc.setFontSize(9);
    let soldProducts = x.filter((product) => product.billtype !== "purchase");

    soldProducts.forEach((item) => {
      if (y + 8 > doc.internal.pageSize.height - 10) {
        doc.addPage();
        y = 10; // Reset Y position for the new page
      }

      doc.text(srNo.toString(), 6, y);
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
      doc.text(item.purity ? item.purity : "-", 85, y);
      doc.text(item.grosswt ? item.grosswt : "-", 95, y);
      doc.text(item.netWt ? item.netWt : "-", 107, y);
      doc.text(item.rate ? item.rate : "-", 119, y);
      doc.text(
        parseFloat(
          (parseFloat(item.rate) / 10) * parseFloat(item.netWt)
        ).toFixed(2),
        130,
        y
      );
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
      doc.text(makingChargeText, 145, y);
      // doc.text("0.00", 115, y);
      doc.text(price, 160, y);
      srNo++;
      y += 8;
    });

    doc.line(5, y - 3, 175, y - 3);
    y += 10;
    doc.setFontSize(7);
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
      doc.text(`Sales Amount:`, 125, y);
      doc.text(`${parseFloat(totalSaleAmount).toFixed(2)}`, 155, y);
      doc.text(`R.O./Discount:`, 125, y + 5);
      doc.text(`${csData.offer}`, 155, y + 5);
      doc.text(`CGST 1.5%:`, 125, y + 10);
      doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 155, y + 10);
      doc.text(`SGST 1.5%:`, 125, y + 15);
      doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 155, y + 15);
    } else {
      doc.text(`Sales Amount:`, 125, y + 5);
      doc.text(`${parseFloat(totalSaleAmount).toFixed(2)}`, 155, y + 5);
      doc.text(`R.O./Discount:`, 125, y + 10);
      doc.text(`${csData.offer}`, 155, y + 10);
      doc.text(`IGST 3%:`, 125, y + 15);
      doc.text(`${parseFloat(payableGst).toFixed(2)}`, 155, y + 15);
    }
    doc.text(`Purchase Amount (-):`, 125, y + 20);
    doc.text(`${parseFloat(csData.purchaseAmt).toFixed(2)}`, 155, y + 20);
    doc.text(`Recieved Amount:`, 125, y + 25);
    doc.text(`${parseFloat(csData.receivedAmt).toFixed(2)}`, 155, y + 25);
    doc.text(`Balance Amount:`, 125, y + 30);
    doc.text(
      `${parseFloat(
        parseFloat(csData.price) - parseFloat(csData.receivedAmt)
      ).toFixed(2)}`,
      155,
      y + 30
    );
    doc.text(`Total:`, 125, y + 35);
    doc.text(`${parseFloat(csData.price).toFixed(2)}`, 155, y + 35);
    let totalAmountInWords = numberToIndianWords(
      parseFloat(csData.price).toFixed(0)
    );
    doc.text(`Total in Words: ${totalAmountInWords} Only`, 10, y + 40);

    let footerY = doc.internal.pageSize.height - 40;
    doc.setFontSize(9);
    // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
    // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
    // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
    doc.text("Customer Signature", 10, footerY);
    doc.text(`Bill By - ${csData.billedby} `, 60, footerY - 5);
    doc.text(`Salesman - ${csData.soldby} `, 60, footerY);
    doc.text("For S.K Khandre Jewellers", 135, footerY);

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
          item.hsnCode &&
            item.hsnCode !== "null" &&
            item.hsnCode !== "undefined"
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
          item.hsnCode &&
            item.hsnCode !== "null" &&
            item.hsnCode !== "undefined"
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
      doc.text(
        `Total in Words: ${totalOldNotGoldAmountInWords} Only`,
        10,
        y + 5
      );
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
              <div
                className="adminAllProductsFilterLabelBox"
                // className="adminAllOrderLeftBox"
              >
                <input
                  type="text"
                  readOnly
                  placeholder="From Sales"
                  value={`Total Sales - ${parseInt(totalSales).toLocaleString(
                    "INR"
                  )}`}
                />
                <input
                  style={{ marginInline: "10px" }}
                  type="text"
                  placeholder="Total Purchase"
                  value={`Total Purchase - ${parseInt(
                    totalPurchase
                  ).toLocaleString("INR")}`}
                  readOnly
                />
                <input
                  style={{ marginInline: "10px" }}
                  type="text"
                  placeholder="Total Recieved"
                  value={`Total Recieved - ${parseInt(
                    totalRecieved
                  ).toLocaleString("INR")}`}
                  readOnly
                />
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
                      <tr style={{ whiteSpace: "nowrap" }} key={x.id}>
                        {/* <td>{x.id}</td> */}
                        <td>
                          {/* {new Date(x.createdOn).toLocaleDateString("en-GB")} */}
                          {new Date(x.invoiceDate).toLocaleDateString("en-GB")}
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
                            getAllOrderItemsForSending(x.id, x);
                          }}
                          className="adminAllOrdersOrderData"
                        >
                          {x.invoiceNo}
                        </td>
                        {/* <td>{x.customer_Id}</td> */}
                        {/* NOTE:"Please Uncomment bekow line" */}
                        <td>
                          {x.tblCustomerDetails.firstName +
                            " " +
                            x.tblCustomerDetails.lastName}
                        </td>
                        <td>₹{parseInt(x.price).toLocaleString("en-IN")}</td>
                        <td>
                          Sell Wt(G:{x.totalSaleGold}+S:{x.totalSaleSilver})
                        </td>
                        <td>
                          ₹{parseInt(x.purchaseAmt).toLocaleString("en-IN")}
                        </td>
                        <td>
                          URD Wt(G:{x.totalSaleUrdGold}+S:
                          {x.totalSaleUrdSilver})
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
                          ₹{parseInt(x.receivedAmt).toLocaleString("en-IN")}
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
                            color: parseInt(x.balanceAmt) > 0 ? "red" : "black",
                          }}
                        >
                          ₹{parseInt(x.balanceAmt)}
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
                              getAllOrderItems(x.id);
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
