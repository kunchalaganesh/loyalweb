import React, { useEffect, useState } from "react";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import AdminHeading from "../Heading/AdminHeading";
import {
  a188,
  a228,
  a229,
  a38,
  a39,
  a45,
  a51,
  a52,
  a63,
  a84,
} from "../../../Api/RootApiPath";
import { InfinitySpin } from "react-loader-spinner";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import logoImage from "../../../Images/loyalStringLogoSmall.png";
import { useSelector } from "react-redux";
import { numberToIndianWords } from "../../../Other Functions/numberToIndianWords";
import { creditNotePrint } from "../../../Other Functions/CreditNotePrint";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";

export default function AdminCreditNote() {
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
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedItem2, setSelectedItem2] = useState([]);
  const [csData, setCsData] = useState([]);
  const [creditType, setCreditType] = useState("");
  const [pytMode, setPytMode] = useState("");
  const [manualAmt, setManualAmt] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);
  const [creditGold, setCreditGold] = useState(0);
  const [creditSilver, setCreditSilver] = useState(0);
  const [allCreditNotes, setAllCreditNotes] = useState([]);
  const [remark, setRemark] = useState("");

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

  const fetchAllCreditNotes = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      fetch(a228, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          const sortedData = data.sort((a, b) => {
            const dateA = new Date(a.CreatedOn);
            const dateB = new Date(b.CreatedOn);
            // return dateA - dateB; // Ascending order
            return dateB - dateA; // For descending order
          });
          setAllCreditNotes(sortedData);
          setAllOrders(sortedData);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllCreditNotes();
  }, []);
  console.log(allCreditNotes, "allCreditNotes");
  console.log(allCreditNotes, "allCreditNotes");
  console.log(allCreditNotes, "allCreditNotes");

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
        setAllOrders2(rcvdData);
        setLoading2(false);
        // setOlddata(response);
        console.log(response);
      });
  }, []);

  function showPDFWithId(id) {
    // Make the API POST request with the ID
    fetch(a51, {
      method: "POST",
      body: JSON.stringify({ Id: id }),
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
            order.orderNumber === orderNumber2
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
    // let filtered = [];

    // if (orderStatus && orderStatus !== "") {
    //   filtered = allOrders.filter(
    //     (order) => order.orderStatus === orderStatus2
    //   );
    // }

    if (orderNumber && orderNumber !== "") {
      const lowercaseOrderNumber = orderNumber2.toLowerCase();
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
        const orderDate2 = new Date(order.createdOn);
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
  const indexOfLastProduct = currentPage * ordersPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const indexOfLastProduct2 = currentPage2 * ordersPerPage2;
  const indexOfFirstProduct2 = indexOfLastProduct2 - ordersPerPage2;
  const currentOrders2 = filteredOrders2.slice(
    indexOfFirstProduct2,
    indexOfLastProduct2
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const totalPages2 = Math.ceil(filteredOrders2.length / ordersPerPage2);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const goToNextPage2 = () => {
    setCurrentPage2((prevPage2) => prevPage2 + 1);
  };

  const goToPreviousPage2 = () => {
    setCurrentPage2((prevPage2) => prevPage2 - 1);
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

  const scrollToCenter = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };
  const creatCreditNote = (invoice) => {
    setSelectedItem([invoice]),
      scrollToCenter("adminSelectedCreditNoteDetailsBox");
  };
  console.log(selectedItem, "selectedItem");
  const addNewCreditNote = async (e) => {
    e.preventDefault();
    if (creditAmount > 0) {
      setLoading(true);
      const formData = {
        ClientCode: clientCode,
        CustomerId: parseInt(selectedItem[0].CustomerId),
        CreditAmount:
          creditType === "Full"
            ? `${parseFloat(selectedItem[0].ReceivedAmount).toFixed(3)}`
            : `${parseFloat(creditAmount).toFixed(2)}`,
        PaymentMode: pytMode,
        InvoiceNo: selectedItem[0].InvoiceNo,
        OrderId: parseInt(selectedItem[0].Id),
        CreditType: creditType,
        Remark: remark,
        CompanyId: CompanyId ? CompanyId : 0,
        CounterId: CounterId ? CounterId : 0,
        BranchId: BranchId ? BranchId : 0,
        EmployeId: EmployeId ? EmployeId : 0,
        // CreditAmount: `${parseFloat(creditAmount).toFixed(2)}`,
        CreditGold: `${parseFloat(creditGold).toFixed(3)}`,
        CreditSilver: `${parseFloat(creditSilver).toFixed(3)}`,
      };
      try {
        console.log(formData, "formData");
        console.log(formData, "formData");
        console.log(formData, "formData");
        const response = await fetch(a229, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        alert("Credit Note Raised Successfully");
        setSelectedItem([]);
        setActive("List");
        fetchAllCreditNotes();
        setCreditAmount(0);
        setCreditGold(0);
        setCreditSilver(0);
        setCreditType("");
        setRemark("");
        creditNotePrint(data);
        window.scroll(0, 0);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Credit Amount could not be zero");
    }
  };
  return (
    <div>
      <AdminHeading />

      <div className="adminMainBodyBox">
        <AdminBreadCrump
          title={"Credit Note"}
          companyName={"Loyalstring"}
          module={"E-commerce"}
          page={"Credit Note"}
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
                <p>All Credit Notes</p>
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
                <p>Create New Credit Note</p>
              </div>
            </div>
            <div
              className={
                active === "List" ? "adminCategoryListMainBox" : "none"
              }
              style={{ marginBottom: "50px", marginTop: "40px" }}
            >
              {/* <div className={loading == true ? "loading" : "none"}>
                <InfinitySpin width="200" color="#4fa94d" />
              </div> */}

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
                  className="adminAllProductsFilterLabelBox"

                  // className="adminAllProductsFilterCategoryBox"
                  // className="adminAllOrderLeftBox"
                >
                  <input
                    style={{ width: "100%" }}
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
                {/* <div
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
                </div> */}
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
                      <th>Invoice No</th>
                      {/* <th>Customer Id</th> */}
                      <th>Customer Name</th>
                      <th>Credit Type</th>
                      <th>Credit Amount</th>
                      <th>Credit Gold</th>
                      <th>Credit Silver</th>
                      <th>Payment Mode</th>
                      <th>Remark</th>
                      <th>Print</th>
                      <th>Created On</th>
                      {/* <th>Order Status</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((x) => {
                      return (
                        // <tr key={x.Customer_id}>
                        <tr style={{ whiteSpace: "nowrap" }} key={x.Id}>
                          <td>{x.Id}</td>
                          <td>{x.InvoiceNo}</td>

                          <td>{x.FirstName + " " + x.LastName}</td>
                          <td>{x.CreditType}</td>
                          <td>{x.CreditAmount}</td>
                          <td>{x.CreditGold}</td>
                          <td>{x.CreditSilver}</td>
                          <td>{x.PaymentMode}</td>
                          <td>{x.Remark}</td>
                          <td onClick={() => creditNotePrint(x)}>
                            <button type="button">PRINT</button>
                          </td>

                          <td>
                            {" "}
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
              className={
                active !== "List" ? "adminCategoryListMainBox" : "none"
              }
              style={{ marginBottom: "50px" }}
            >
              <div className={loading2 == true ? "loading" : "none"}>
                <InfinitySpin width="200" color="#4fa94d" />
              </div>

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
                      <th>Invoice No</th>
                      {/* <th>Customer Id</th> */}
                      <th>Customer Name</th>
                      <th>Price</th>
                      <th>Purchase Amt</th>
                      {/* <th>Product Id</th> */}
                      {/* <th>Product Name</th> */}
                      {/* <th>Item Code</th> */}
                      {/* <th>Quantity</th> */}
                      <th>Recieved Amt</th>
                      <th>Created On</th>
                      {/* <th>Order Status</th> */}
                      <th
                        style={{
                          color: "rgb(20,20,20)",
                          textDecoration: "underline",
                        }}
                      >
                        Create Credit Note
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
                            {x.invoiceNo}
                          </td>

                          <td>{x.FirstName + " " + x.LastName}</td>
                          <td>
                            ₹
                            {parseInt(
                              parseFloat(x.TotalAmount) + parseFloat(x.GST)
                            ).toLocaleString("en-IN")}
                          </td>
                          <td>
                            ₹
                            {parseInt(x.UrdPurchaseAmt).toLocaleString("en-IN")}
                          </td>

                          <td>
                            ₹
                            {parseInt(x.ReceivedAmount).toLocaleString("en-IN")}
                          </td>
                          <td>
                            {" "}
                            {new Date(x.InvoiceDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td
                            onClick={() => creatCreditNote(x)}
                            style={{ textAlign: "center" }}
                          >
                            <li className="adminCreditNoteOption">Select</li>
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
              className={
                active !== "List" ? "adminCategoryListMainBox" : "none"
              }
              // id="adminSelectedCreditNoteDetailsBox"
              // className="adminAddCategoryMainBox"
            >
              {selectedItem.length > 0 ? (
                <div
                  style={{ width: "100%", marginBottom: "40px" }}
                  // className="adminAddCategoryInnerBox"
                >
                  <h3 style={{ marginBottom: "40px", color: "#02a8b5" }}>
                    Apply Credit Note
                  </h3>
                  <form
                    onSubmit={addNewCreditNote}
                    className="adminCreditNoteCustomerDetailsBox"
                  >
                    <div>
                      <label>Invoice No</label>
                      <input
                        type="text"
                        readOnly
                        value={selectedItem[0].InvoiceNo}
                      />
                    </div>
                    <div>
                      <label>Customer Name</label>
                      <input
                        type="text"
                        readOnly
                        value={`${selectedItem[0].FirstName} ${selectedItem[0].LastName}`}
                      />
                    </div>
                    <div>
                      <label> Total Amount </label>
                      <input
                        type="text"
                        readOnly
                        value={`${parseFloat(
                          parseFloat(selectedItem[0].TotalAmount) +
                            parseFloat(selectedItem[0].GST)
                        )}`}
                      />
                    </div>
                    <div>
                      <label> Recieved Amount </label>
                      <input
                        type="text"
                        readOnly
                        value={`${selectedItem[0].ReceivedAmount}`}
                      />
                    </div>
                    <div>
                      <label> Credit Type</label>
                      <select
                        required="required"
                        value={creditType}
                        onChange={(e) => setCreditType(e.target.value)}
                      >
                        <option value={""}>Select an option</option>
                        <option value={"Partial"}>Partial</option>
                        <option value={"Full"}>Full</option>
                      </select>
                    </div>

                    <div>
                      <label> Payment Mode</label>
                      <select
                        required="required"
                        value={pytMode}
                        onChange={(e) => setPytMode(e.target.value)}
                      >
                        <option value={""}>Select an option</option>
                        <option value={"Cash"}>Cash</option>
                        <option value={"Card"}>Card</option>
                        <option value={"UPI"}>UPI</option>
                        <option value={"Cheque"}>Cheque</option>
                        <option value={"RTGS"}>RTGS</option>
                        <option value={"MDS"}>MDS</option>
                      </select>
                    </div>
                    {creditType === "Partial" || creditType === "" ? (
                      <div>
                        <label> Credit Amount</label>
                        <input
                          type="number"
                          value={creditAmount}
                          onChange={(e) => setCreditAmount(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div>
                        <label> Credit Amount</label>
                        <input
                          type="number"
                          value={parseFloat(
                            parseFloat(selectedItem[0].TotalAmount) +
                              parseFloat(selectedItem[0].GST)
                          )}
                          readonly
                        />
                      </div>
                    )}
                    <div>
                      <label> Remark</label>
                      <input
                        onChange={(e) => setRemark(e.target.value)}
                        type="text"
                        value={remark}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        // onClick={() => addNewCreditNote()}
                        className="adminAddCategoryEditButton"
                      >
                        Apply Credit Note
                      </button>
                    </div>
                  </form>
                </div>
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
