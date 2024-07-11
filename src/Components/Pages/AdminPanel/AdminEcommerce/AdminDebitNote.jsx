import React, { useEffect, useState } from "react";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import AdminHeading from "../Heading/AdminHeading";
import {
  a159,
  a230,
  a231,
  a38,
  a39,
  a45,
  a51,
  a52,
  a63,
  a67,
  a80,
  a85,
  s1,
} from "../../../Api/RootApiPath";
import { InfinitySpin } from "react-loader-spinner";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import logoImage from "../../../Images/loyalStringLogoSmall.png";
import { useSelector } from "react-redux";
import { numberToIndianWords } from "../../../Other Functions/numberToIndianWords";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";

export default function AdminDebitNote() {
  const [active, setActive] = useState("List");
  const [allOrders, setAllOrders] = useState([]);
  const [allOrders2, setAllOrders2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderStatus2, setOrderStatus2] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderNumber2, setOrderNumber2] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [fromDate2, setFromDate2] = useState("");
  const [toDate, setToDate] = useState("");
  const [toDate2, setToDate2] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filteredOrders2, setFilteredOrders2] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderItems2, setOrderItems2] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [csData, setCsData] = useState([]);
  const [csData2, setCsData2] = useState([]);
  const [creditType, setCreditType] = useState("");
  const [pytMode, setPytMode] = useState("");
  const [remark, setRemark] = useState("");
  const [manualAmt, setManualAmt] = useState(0);

  const ordersPerPage = 25;
  const ordersPerPage2 = 25;

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const CompanyId = adminLoggedIn.CompanyId;
  const CounterId = adminLoggedIn.CounterId;
  const BranchId = adminLoggedIn.BranchId;
  const EmployeId = adminLoggedIn.EmployeId;
  const employeeCode = adminLoggedIn.EmployeeCode;
  const fetchAllDebitNotes = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      fetch(a230, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setAllOrders(data), setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllDebitNotes();
  }, []);
  console.log(allOrders, "all Debit Notes");
  console.log(allOrders, "all Debit Notes");
  console.log(allOrders, "all Debit Notes");

  const navigate = useNavigate();
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a159, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        let rcvdData = response.reverse();
        setLoading2(false);

        let orderedData = rcvdData.map((item, index) => {
          // Add extra property 'orderStatus'
          item.orderStatus =
            parseFloat(item.BalanceAmount) == 0 &&
            item.BalanceGold == "0.000" &&
            item.BalanceSilver == "0.000"
              ? "Paid"
              : parseFloat(item.BalanceAmount) <
                  parseFloat(item.TotalPurchaseAmount) ||
                parseFloat(item.BalanceGold) < parseFloat(item.TotalFineGold) ||
                parseFloat(item.BalanceSilver) <
                  parseFloat(item.TotalFineSilver)
              ? "Partial"
              : "None";
          // Add 's.no' property
          item.serialNumber = index + 1;
          return item;
        });

        setAllOrders2(orderedData);
        console.log(response, "response.data for 2");
      });
  }, [active]);
  //   useEffect(() => {
  //     fetch(a38)
  //       .then((res) => res.json())
  //       .then((response) => {
  //         // console.log(response);
  //         let rcvdData = response.data.reverse();
  //         setAllOrders(rcvdData);
  //         setLoading(false);
  //         // setOlddata(response);
  //         console.log(response.data);
  //       });
  //   }, []);

  // ALL CREDIT NOTES
  const filterOrders = () => {
    let filtered = allOrders.reverse();
    // let filtered = [];

    if (orderStatus && orderStatus !== "") {
      filtered = allOrders.filter((order) => order.DebitType === orderStatus);
    }

    if (orderNumber && orderNumber !== "") {
      const lowercaseOrderNumber = orderNumber.toLowerCase();
      filtered = allOrders.filter((order) => {
        const customer = order;
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
      filtered = allOrders.filter((order) => {
        const orderDate = new Date(order.createdOn);
        return orderDate >= new Date(fromDate) && orderDate <= new Date(toDate);
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

  // ALL CREDIT NOTES

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
        setLoading2(false);
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
        setAllOrders2((prevOrders) =>
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
  const filterOrders2 = () => {
    let filtered2 = allOrders2;
    // let filtered2 = [];

    if (orderStatus2 && orderStatus2 !== "") {
      filtered2 = allOrders2.filter(
        (order) => order.orderStatus === orderStatus2
      );
    }

    if (orderNumber2 && orderNumber2 !== "") {
      const lowercaseOrderNumber = orderNumber2.toLowerCase();
      filtered2 = allOrders2.filter((order) => {
        const customer = order;
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

    if (fromDate2 !== "" && toDate2 !== "") {
      filtered2 = allOrders2.filter((order) => {
        const orderDate2 = new Date(order.PurchaseDate);
        return (
          orderDate2 >= new Date(fromDate2) && orderDate2 <= new Date(toDate2)
        );
      });
    }

    setFilteredOrders2(filtered2);
    setCurrentPage2(1); // Reset to the first page after filtering
  };

  useEffect(() => {
    filterOrders2();
    window.scrollTo(0, 0);

    console.log(filteredOrders2);
  }, [orderStatus2, orderNumber2, allOrders2, fromDate2, toDate2]);

  // useEffect(() => {}, [currentPage]);
  // console.log(JSON.stringify(orderItems), "orderItems");
  console.log(allOrders2);
  const indexOfLastProduct2 = currentPage2 * ordersPerPage2;
  const indexOfFirstProduct2 = indexOfLastProduct2 - ordersPerPage2;
  const currentOrders2 = filteredOrders2.slice(
    indexOfFirstProduct2,
    indexOfLastProduct2
  );

  const totalPages2 = Math.ceil(filteredOrders2.length / ordersPerPage2);

  const goToNextPage2 = () => {
    setCurrentPage2((prevPage) => prevPage + 1);
  };

  const goToPreviousPage2 = () => {
    setCurrentPage2((prevPage) => prevPage - 1);
  };

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
        setLoading2(false);
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
        setOrderItems2(data);
        setLoading2(false);
        console.log(data, "Order Items rcvd Data");
        // generateBillPDF(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    if (orderItems2.length > 0) {
      generateBillPDF(orderItems2);
    }
  }, [orderItems2]);
  const totalAmount = "$1000";
  const discount = "$50";
  const gst = "$30";
  const pricePaid = "$980";
  const [selectedItem, setSelectedItem] = useState([]);

  const scrollToCenter = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const creatCreditNote = (invoice) => {
    setSelectedItem([invoice]),
      scrollToCenter("adminSelectedCreditNoteDetailsBox");
  };
  console.log(selectedItem, "selectedItem");

  const handleSelectedItem = (e) => {
    const { name, value } = e.target;
    const updatedProduct = selectedItem[0];
    setSelectedItem([{ ...updatedProduct, [name]: value }]);
  };
  console.log(selectedItem, "selectedItem");
  const addNewCreditNote = async (e) => {
    e.preventDefault();
    if (
      parseInt(selectedItem[0].DebitAmount) !== 0 ||
      parseInt(selectedItem[0].DebitGold) !== 0 ||
      parseInt(selectedItem[0].DebitSilver) !== 0
    ) {
      const formData = {
        //   CustomerId: selectedItem[0].customer_Id,
        //   CreditAmount:
        //     creditType === "Full"
        //       ? `${selectedItem[0].receivedAmt}`
        //       : `${manualAmt}`,
        //   PaymentMode: pytMode,
        //   InvoiceNo: selectedItem[0].invoiceNo,
        DebitType: creditType,
        ClientCode: clientCode,
        VendorId: selectedItem[0].VendorId,
        DebitAmount:
          selectedItem[0].DebitAmount && selectedItem[0].DebitAmount !== ""
            ? selectedItem[0].DebitAmount
            : "0",
        PaymentMode: pytMode,
        InvoiceNo: selectedItem[0].InvoiceNo,
        RDPurchaseId: selectedItem[0].Id,
        Remark: remark,
        DebitGold:
          selectedItem[0].DebitGold && selectedItem[0].DebitGold !== ""
            ? selectedItem[0].DebitGold
            : "0",
        DebitSilver:
          selectedItem[0].DebitSilver && selectedItem[0].DebitSilver !== ""
            ? selectedItem[0].DebitSilver
            : "0",
        //   CreditType: creditType,
      };
      try {
        console.log(formData, "formData");
        console.log(formData, "formData");
        console.log(formData, "formData");
        const response = await fetch(a231, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        alert("Debit Note Raised Successfully");
        setSelectedItem([]);
        setActive("List");
        fetchAllDebitNotes();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Debit Amount/Debit Metal could not be zero");
    }
  };
  const handleFullDebit = (item) => {
    let updatedItem = item;
    updatedItem.DebitAmount = item.BalanceAmount;
    updatedItem.DebitGold = item.BalanceGold;
    updatedItem.DebitSilver = item.BalanceSilver;
    setSelectedItem([updatedItem]);
    setCreditType("Full");
  };

  const openBillImage = (image) => {
    let billImages = image.split(",");
    if (billImages.length > 0 && image !== "") {
      // Open the first image in a new tab

      window.open(`${s1}/${billImages[0]}`, "_blank");
    } else if (image !== "") {
      window.open(`${s1}/${image}`, "_blank");
    }
  };

  return (
    <div>
      <AdminHeading />

      <div className="adminMainBodyBox">
        <AdminBreadCrump
          title={"Debit Note"}
          companyName={"Loyalstring"}
          module={"E-commerce"}
          page={"Debit Note"}
        />
        <div className="adminAddCategoryMainBox">
          <div className="adminAddCategoryInnerBox">
            <div className="adminAddCategoryInnerBoxTitlesBox">
              <div
                onClick={() => {
                  setActive("List");
                }}
                className={
                  active === "List"
                    ? "adminAddCategoryInnerBoxTitle"
                    : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                }
              >
                <div
                  className={
                    active === "List"
                      ? "adminAddCategoryInnerBoxTitleLogo"
                      : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                  }
                >
                  {/* 01 */}
                  <RiListUnordered />
                </div>
                <p>All Debit Notes</p>
              </div>

              <div
                onClick={() => setActive("AddNew")}
                className={
                  active === "AddNew"
                    ? "adminAddCategoryInnerBoxTitle"
                    : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                }
              >
                <div
                  className={
                    active === "AddNew"
                      ? "adminAddCategoryInnerBoxTitleLogo"
                      : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                  }
                >
                  {/* 02 */}
                  <RiPlayListAddLine />
                </div>
                <p>Create New Debit Note</p>
              </div>
            </div>
            <div
              // style={{ marginBottom: "50px", marginTop: "40px" }}
              className={
                active === "List" ? "adminCategoryListMainBox" : "none"
              }
              style={{ marginBottom: "50px", marginTop: "40px" }}
              // className="adminAddCategoryInnerBox"
            >
              {/* <div className={loading == true ? "loading" : "none"}>
                <InfinitySpin width="200" color="#4fa94d" />
              </div> */}
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

                    <option value="Partial">Partial</option>
                    <option value="Full">Full</option>
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
                      <th>Id</th>
                      <th>Inv No</th>
                      {/* <th>Inward No</th> */}
                      {/* <th>Customer Id</th> */}
                      <th>Supplier Name</th>
                      <th>Debit Type</th>

                      {/* <th>Balance Amt</th> */}
                      {/* <th>Product Id</th> */}
                      {/* <th>Product Name</th> */}
                      {/* <th>Item Code</th> */}
                      {/* <th>Quantity</th> */}
                      <th>Debit Amt</th>
                      <th>Debit Gold</th>
                      <th>Debit Silver</th>
                      <th>Payment Mode</th>
                      <th>Remark</th>

                      <th>Created On</th>

                      {/* <th>Payment Mode</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((x) => {
                      return (
                        // <tr key={x.Customer_id}>
                        <tr style={{ whiteSpace: "nowrap" }} key={x.Id}>
                          <td>{x.Id}</td>
                          <td>{x.InvoiceNo}</td>
                          {/* <td>{x.customer_Id}</td> */}
                          {/* NOTE:"Please Uncomment bekow line" */}
                          {/* <td style={{ fontWeight: "bold" }}>{x.inwardNo}</td> */}
                          <td>{x.VendorName}</td>
                          <td>{x.DebitType}</td>
                          <td>
                            ₹{parseInt(x.DebitAmount).toLocaleString("en-IN")}
                          </td>
                          <td>{x.DebitGold}</td>
                          <td>{x.DebitSilver}</td>
                          <td>{x.PaymentMode}</td>

                          <td>{x.Remark}</td>

                          <td>
                            {new Date(x.CreatedOn).toLocaleDateString("en-GB")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="bulkProductAddingTableMain">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
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
            <div
              // style={{ marginBottom: "50px", marginTop: "40px" }}
              className={
                active !== "List" ? "adminCategoryListMainBox" : "none"
              }
              style={{ marginBottom: "50px", marginTop: "40px" }}
              // className="adminAddCategoryInnerBox"
            >
              <div className={loading2 == true ? "loading" : "none"}>
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
                    value={orderStatus2}
                    onChange={(e) => {
                      setOrderStatus2(e.target.value), setCurrentPage2(1);
                    }}
                  >
                    <option value="">Choose...</option>
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <div
                  className="adminAllProductsFilterLabelBox"
                  // className="adminAllOrderLeftBox"
                >
                  <input
                    type="date"
                    placeholder="From Date"
                    value={fromDate2}
                    onChange={(e) => setFromDate2(e.target.value)}
                  />
                  <input
                    type="date"
                    placeholder="To Date"
                    value={toDate2}
                    onChange={(e) => setToDate2(e.target.value)}
                  />
                </div>
                <div
                  className="adminAllProductsFilterLabelBox"
                  // className="adminAllOrderLeftBox"
                >
                  <input
                    type="text"
                    placeholder="Search Name / Address / Mobile / Amount / Invoice..."
                    value={orderNumber2}
                    onChange={(e) => {
                      setOrderNumber2(e.target.value.toLowerCase()),
                        setCurrentPage2(1);
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
                      <th>Id</th>
                      <th>Inv No</th>
                      <th>Inward No</th>
                      {/* <th>Customer Id</th> */}
                      <th>Supplier Name</th>
                      <th>Purchase Amt</th>
                      <th>Purchase Gold</th>
                      <th>Purchase Silver</th>
                      {/* <th>Balance Amt</th> */}
                      {/* <th>Product Id</th> */}
                      {/* <th>Product Name</th> */}
                      {/* <th>Item Code</th> */}
                      {/* <th>Quantity</th> */}
                      <th>Balance Amt</th>
                      <th>Balance Gold</th>
                      <th>Balance Silver</th>
                      <th>Branch</th>
                      <th>Discount</th>
                      <th>Invoice Date</th>
                      <th>Order Status</th>
                      <th>Show Bill</th>
                      {/* <th>Payment Mode</th> */}

                      {/* <th>Order Status</th> */}
                      <th
                        style={{
                          color: "rgb(20,20,20)",
                          textDecoration: "underline",
                        }}
                      >
                        Create Debit Note
                      </th>
                      {/* <th>Payment Mode</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders2.map((x) => {
                      return (
                        // <tr key={x.Customer_id}>
                        <tr style={{ whiteSpace: "nowrap" }} key={x.Id}>
                          <td>{x.Id}</td>
                          <td
                            // onClick={() => {
                            //   navigate(`/admin-orderdetails/${x.id}`);
                            // }}
                            //   onClick={() => {
                            //     // navigate(
                            //     //   `/admin_invoice_edit?objectRcvd=${JSON.stringify(
                            //     //     x
                            //     //   )}`
                            //     // );
                            //     getAllOrderItemsForSending(x.id, x);
                            //   }}
                            onClick={() => creatCreditNote(x)}
                            className="adminAllOrdersOrderData"
                          >
                            {x.InvoiceNo}
                          </td>
                          {/* <td>{x.customer_Id}</td> */}
                          {/* NOTE:"Please Uncomment bekow line" */}
                          <td style={{ fontWeight: "bold" }}>{x.InwardNo}</td>
                          <td>{x.VendorName}</td>
                          <td>
                            ₹
                            {parseInt(x.TotalPurchaseAmount).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td>{x.TotalFineGold}</td>
                          <td>{x.TotalFineSilver}</td>

                          <td
                            style={{
                              color:
                                Math.floor(x.BalanceAmount) === 0
                                  ? "green"
                                  : "red",
                            }}
                          >
                            ₹
                            {(
                              parseInt(x.BalanceAmount) -
                              parseInt(x.DebitAmount)
                            ).toLocaleString("en-IN")}
                          </td>
                          {/* <td>{x.balanceAmount}</td> */}
                          <td
                            style={{
                              color:
                                x.BalanceGold === "0.000" ? "green" : "red",
                            }}
                          >
                            {parseFloat(x.BalanceGold) -
                              parseFloat(x.DebitGold)}
                          </td>
                          <td
                            style={{
                              color:
                                x.BalanceSilver === "0.000" ? "green" : "red",
                            }}
                          >
                            {parseFloat(x.BalanceSilver) -
                              parseFloat(x.DebitSilver)}
                          </td>

                          <td>{x.BranchId}</td>
                          <td>₹{x.Discount}</td>
                          <td>
                            {/* {new Date(x.createdOn).toLocaleDateString("en-GB")} */}
                            {new Date(x.PurchaseDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td
                            style={{
                              whiteSpace: "nowrap",
                              color:
                                x.orderStatus === "Paid"
                                  ? "green"
                                  : x.orderStatus == "Partial"
                                  ? "orange"
                                  : "red",
                            }}
                          >
                            {x.orderStatus}
                          </td>
                          {x.InvoiceFile !== "" ? (
                            <td
                              className="adminCreditNoteOption"
                              style={{ cursor: "pointer" }}
                              onClick={() => openBillImage(x.InvoiceFile)}
                            >
                              BILL
                            </td>
                          ) : (
                            <td></td>
                          )}

                          <td
                            onClick={() => {
                              if (
                                parseFloat(x.BalanceAmount) -
                                  parseFloat(x.DebitAmount) ==
                                  0 &&
                                parseFloat(x.BalanceGold) -
                                  parseFloat(x.DebitGold) ==
                                  0 &&
                                parseFloat(x.BalanceSilver) -
                                  parseFloat(x.DebitSilver) ==
                                  0
                              ) {
                                alert("Selected Invoice is already Cleared");
                              } else {
                                creatCreditNote(x);
                              }
                            }}
                            style={{ textAlign: "center" }}
                          >
                            {parseFloat(x.BalanceAmount) -
                              parseFloat(x.DebitAmount) ==
                              0 &&
                            parseFloat(x.BalanceGold) -
                              parseFloat(x.DebitGold) ==
                              0 &&
                            parseFloat(x.BalanceSilver) -
                              parseFloat(x.DebitSilver) ==
                              0 ? (
                              <li
                                style={{ color: "green" }}
                                className="adminCreditNoteOption"
                              >
                                Cleared
                              </li>
                            ) : (
                              <li className="adminCreditNoteOption">Select</li>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="bulkProductAddingTableMain">
                  <button
                    onClick={goToPreviousPage2}
                    disabled={currentPage2 === 1}
                  >
                    Previous
                  </button>
                  <button
                    onClick={goToNextPage2}
                    disabled={currentPage2 === totalPages2}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            <div
              className={active !== "List" ? "adminAddCategoryMainBox" : "none"}
              // className="adminAddCategoryMainBox"
            >
              {selectedItem.length > 0 ? (
                <form
                  onSubmit={addNewCreditNote}
                  style={{ width: "100%" }}
                  id="adminSelectedCreditNoteDetailsBox"
                  // className="adminAddCategoryInnerBox"
                >
                  <h3 style={{ marginBottom: "40px", color: "#02a8b5" }}>
                    Apply Debit Note
                  </h3>
                  <div className="adminCreditNoteCustomerDetailsBox">
                    <div>
                      <label>Invoice No</label>
                      <input
                        type="text"
                        readOnly
                        value={selectedItem[0].InvoiceNo}
                      />
                    </div>
                    <div>
                      <label>Supplier Name</label>
                      <input
                        type="text"
                        readOnly
                        value={`${selectedItem[0].VendorName}`}
                      />
                    </div>
                    {/* <div>
                  <label>Mobile</label>
                  <input
                    type="text"
                    readOnly
                    value={`${selectedItem[0].party_Details.contact_no}`}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="text"
                    readOnly
                    value={`${selectedItem[0].party_Details.email_id}`}
                  />
                </div> */}
                    {/* <div>
                  <label>Advance Amount</label>
                  <input
                    type="text"
                    readOnly
                    value={`${selectedItem[0].party_Details.advanceAmt}`}
                  />
                </div>
                <div>
                  <label>Balance Amount</label>
                  <input
                    type="text"
                    readOnly
                    value={`${selectedItem[0].party_Details.balanceAmt}`}
                  />
                </div> */}
                    <div>
                      <label> Balance Amount </label>
                      <input
                        type="text"
                        readOnly
                        value={`${selectedItem[0].BalanceAmount}`}
                      />
                    </div>
                    <div>
                      <label> Balance Gold </label>
                      <input
                        type="text"
                        readOnly
                        value={`${selectedItem[0].BalanceGold}`}
                      />
                    </div>
                    <div>
                      <label> Balance Silver </label>
                      <input
                        type="text"
                        readOnly
                        value={`${selectedItem[0].BalanceSilver}`}
                      />
                    </div>
                    <div>
                      <label> Debit Type</label>
                      <select
                        value={creditType}
                        required="required"
                        onChange={(e) => {
                          if (e.target.value !== "Full") {
                            setCreditType(e.target.value);
                          } else {
                            handleFullDebit(selectedItem[0]);
                          }
                        }}
                      >
                        <option value={""}>Select Debit Type</option>
                        <option value={"Partial"}>Partial</option>
                        <option value={"Full"}>Full</option>
                      </select>
                    </div>

                    <div>
                      <label> Payment Mode</label>
                      <select
                        value={pytMode}
                        required="required"
                        onChange={(e) => setPytMode(e.target.value)}
                      >
                        <option value={""}>Select Payment Mode</option>
                        <option value={"Cash"}>Cash</option>
                        <option value={"Card"}>Card</option>
                        <option value={"UPI"}>UPI</option>
                        <option value={"Cheque"}>Cheque</option>
                        <option value={"RTGS"}>RTGS</option>
                        <option value={"MDS"}>MDS</option>
                        <option value={"Metal"}>Metal</option>
                      </select>
                    </div>
                    {pytMode !== "Metal" || creditType == "Full" ? (
                      <div>
                        <label> Debit Amount </label>
                        <input
                          onChange={handleSelectedItem}
                          name="DebitAmount"
                          required="required"
                          type="text"
                          value={`${selectedItem[0].DebitAmount}`}
                        />
                      </div>
                    ) : null}
                    <div>
                      <label> Remark</label>
                      <input
                        onChange={(e) => setRemark(e.target.value)}
                        type="text"
                        value={remark}
                      />
                    </div>
                    {pytMode === "Metal" || creditType == "Full" ? (
                      <>
                        <div>
                          <label> Debit Gold </label>
                          <input
                            name="DebitGold"
                            required="required"
                            onChange={handleSelectedItem}
                            type="text"
                            value={`${selectedItem[0].DebitGold}`}
                          />
                        </div>
                        <div>
                          <label> Debit Silver </label>
                          <input
                            name="DebitSilver"
                            required="required"
                            onChange={handleSelectedItem}
                            type="text"
                            value={`${selectedItem[0].DebitSilver}`}
                          />
                        </div>
                      </>
                    ) : null}
                    <div>
                      <button
                        // onClick={() => addNewCreditNote()}
                        type="submit"
                        className="adminAddCategoryEditButton"
                      >
                        Apply Debit Note
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div
                  style={{ width: "100%" }}
                  id="adminSelectedCreditNoteDetailsBox"
                  className="adminAddCategoryInnerBox"
                >
                  <h3 style={{ marginBottom: "40px", color: "#02a8b5" }}>
                    Please Select Invoice...
                  </h3>
                  <div className="adminCreditNoteCustomerDetailsBox"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
