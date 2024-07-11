import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
import {
  a1,
  a18,
  a28,
  a35,
  a38,
  a52,
  a67,
  a7,
  a73,
} from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import jsPDF from "jspdf";
import { InfinitySpin } from "react-loader-spinner";
import { numberToIndianWords } from "../../../Other Functions/numberToIndianWords";
import { useNavigate } from "react-router-dom";

export default function AdminLedgerMain() {
  const [active, setActive] = useState("List");

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
  const [allPayments, setAllPayments] = useState([]);
  const ordersPerPage = 25;
  // useEffect(() => {
  //   fetch(a67)
  //     .then((res) => res.json())
  //     .then((response) => {
  //       let rcvdData = response.data.reverse();
  //       setLoading2(false);

  //       let orderedData = rcvdData.map((item, index) => {
  //         // Add extra property 'orderStatus'
  //         item.orderStatus =
  //           Math.ceil(item.balanceAmount) == 0 &&
  //           item.balanceGold == "0.000" &&
  //           item.balanceSilver == "0.000"
  //             ? "Paid"
  //             : Math.ceil(item.balanceAmount) == 0 ||
  //               item.balanceGold == "0.000" ||
  //               item.balanceSilver == "0.000"
  //             ? "Partial"
  //             : "None";
  //         // Add 's.no' property
  //         item.serialNumber = index + 1;
  //         return item;
  //       });

  //       setAllOrders2(orderedData);
  //       console.log(response.data, "response.data for 2");
  //     });
  // }, []);

  const [customerName, setCustomerName] = useState("");
  // const [allSalesTeam, setAllSalesTeam] = useState([]);
  const [allCustomerData, setAllCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [customerId, setCustomerId] = useState("");

  const fetchAllCustomersPayments = async () => {
    try {
      const response = await fetch(a73);
      const data = await response.json();
      console.log(data, "data");
      let rcvdData = data.data.reverse();
      console.log(rcvdData, "data");
      let customerOrders = rcvdData.filter((x) => x.supplierId == 0);
      const paymentsWithSerialNumber = customerOrders.map((order, index) => ({
        ...order,
        serialNumber: index + 1,
      }));
      // Update state with the array containing serial numbers
      setAllOrders(paymentsWithSerialNumber);
      // setAllOrders2(supplierOrders);
      setLoading(false);
      // setAllSupplierData(data.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch(a73)
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        let rcvdData = response.data.reverse();
        let customerOrders = rcvdData.filter((x) => x.supplierId == 0);
        const paymentsWithSerialNumber = customerOrders.map((order, index) => ({
          ...order,
          serialNumber: index + 1,
        }));

        // Update state with the array containing serial numbers
        setAllOrders(paymentsWithSerialNumber);
        // setAllOrders2(supplierOrders);
        setLoading(false);

        // setOlddata(response);
        // console.log(response.data);
      });
  }, []);

  const fetchAllCustomers = async () => {
    try {
      const response = await fetch(a1);
      const data = await response.json();
      setAllCustomerData(data.data);
      console.log(data.data, "All Cs list");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(allCustomerData, "allCustomerData");
  useEffect(() => {
    fetchAllCustomers();
  }, []);
  // useEffect(() => {
  //   fetchAllSuppliersPayments();
  // }, []);

  const handleNameInputChange = (e) => {
    const { value } = e.target;
    setCustomerName(value); // Update the name input value
    console.log(value, "input value");

    // Attempt to extract the ID from the input value
    // const inputParts = value.split(",");
    // const potentialId = inputParts[0];
    // console.log(potentialId, "extracted ID");

    // // Find the customer based on the extracted ID
    // const selected = allCustomerData.find(
    //   (customer) => customer.id.toString() === potentialId
    // );

    // console.log(selected, "selected customer");
    // const selected = allCustomerData.find((customer) => {
    //   const fullName = customer.firstName || customer.firstName;
    //   return fullName.toLowerCase() === value.toLowerCase();
    // });
    let selected = allCustomerData;
    if (customerName !== "") {
      selected = allCustomerData.find((customer) =>
        `${customer.firstName} ${customer.lastName}`
          .toLowerCase()
          .includes(customerName.toLowerCase())
      );
    }

    if (selected) {
      setCustomerId(selected.id); // Set the customer ID if a match is found
      setSelectedCustomer(selected); // Update the selected customer based on ID match
      console.log("Customer selected");
    } else {
      setCustomerId(null);
      setSelectedCustomer(null); // Reset if no match is found
      console.log("No customer match found");
    }
  };

  // useEffect(() => {
  //   if (selectedCustomer && customerName !== "") {
  //     setCustomerName(
  //       `${selectedCustomer.firstName} ${selectedCustomer.lastName}`
  //     );
  //     setCustomerId(selectedCustomer.id);

  //     // Use filter to create a new array with only the orders for the selected supplier
  //     const filteredPayments = allOrders.filter(
  //       (x) => x.customerId === selectedCustomer.id
  //     );

  //     console.log(filteredPayments, "filteredPayments");

  //     // Update state with the filtered array
  //     // setAllOrders2(filteredPayments2);

  //     const paymentsWithSerialNumber = filteredPayments.map((order, index) => ({
  //       ...order,
  //       serialNumber: index + 1,
  //     }));

  //     console.log(paymentsWithSerialNumber, "filteredPayments2");

  //     // Update state with the array containing serial numbers
  //     setAllOrders(paymentsWithSerialNumber);

  //     // Assuming filterOrders2 is a function that further processes the filtered array
  //     // filterOrders2();
  //   } else {
  //     setLoading(true);
  //     // setSupplierName("");
  //     // setSelectedCustomer(null);
  //     fetchAllCustomersPayments();
  //     filterOrders();
  //   }
  // }, [selectedCustomer]);

  // console.log(filteredPayments, "filteredPayments");
  const filterOrders = () => {
    let filtered = allOrders;
    if (customerName !== "") {
      filtered = filtered.filter((order) =>
        order.customerName.toLowerCase().includes(customerName.toLowerCase())
      );
    }

    if (fromDate !== "" && toDate !== "") {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdOn);
        return orderDate >= new Date(fromDate) && orderDate <= new Date(toDate);
      });
    }

    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };
  // console.log(allOrders2, "allOrders2");
  useEffect(() => {
    filterOrders();
    window.scrollTo(0, 0);

    // console.log(filteredOrders);
  }, [
    // orderStatus2,
    // orderNumber2,
    customerName,
    allOrders,
    fromDate,
    toDate,
    selectedCustomer,
  ]);

  // useEffect(() => {}, [currentPage]);
  // console.log(JSON.stringify(orderItems), "orderItems");
  // console.log(allOrders2);
  const indexOfLastProduct = currentPage * ordersPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ordersPerPage;
  // const currentOrders2 = filteredOrders2.slice(
  //   indexOfFirstProduct2,
  //   indexOfLastProduct2
  // );

  // console.log(customerId, "customerId");
  // console.log(selectedCustomer, "selectedCustomer");

  let currentOrders = Array.isArray(filteredOrders)
    ? filteredOrders.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  console.log(currentOrders, "currentOrders");
  console.log(currentOrders, "currentOrders");
  console.log(currentOrders, "currentOrders");
  const goToNextPage = () => {
    setCurrentPage2((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  //   Customer Ledger

  //   Supplier Ledger

  const [allOrders2, setAllOrders2] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [orderStatus2, setOrderStatus2] = useState("");
  const [orderNumber2, setOrderNumber2] = useState("");
  const [fromDate2, setFromDate2] = useState("");
  const [toDate2, setToDate2] = useState("");
  const [filteredOrders2, setFilteredOrders2] = useState([]);
  const [orderItems2, setOrderItems2] = useState([]);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [csData2, setCsData2] = useState([]);
  const [allPayments2, setAllPayments2] = useState([]);
  const ordersPerPage2 = 25;
  // useEffect(() => {
  //   fetch(a67)
  //     .then((res) => res.json())
  //     .then((response) => {
  //       let rcvdData = response.data.reverse();
  //       setLoading2(false);

  //       let orderedData = rcvdData.map((item, index) => {
  //         // Add extra property 'orderStatus'
  //         item.orderStatus =
  //           Math.ceil(item.balanceAmount) == 0 &&
  //           item.balanceGold == "0.000" &&
  //           item.balanceSilver == "0.000"
  //             ? "Paid"
  //             : Math.ceil(item.balanceAmount) == 0 ||
  //               item.balanceGold == "0.000" ||
  //               item.balanceSilver == "0.000"
  //             ? "Partial"
  //             : "None";
  //         // Add 's.no' property
  //         item.serialNumber = index + 1;
  //         return item;
  //       });

  //       setAllOrders2(orderedData);
  //       console.log(response.data, "response.data for 2");
  //     });
  // }, []);

  const [supplierName, setSupplierName] = useState("");
  const [allSalesTeam, setAllSalesTeam] = useState([]);
  const [allSupplierData, setAllSupplierData] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierId, setSupplierId] = useState("");

  const fetchAllSuppliersPayments = async () => {
    try {
      const response = await fetch(a73);
      const data = await response.json();
      // console.log(data, "data");
      let rcvdData = data.data.reverse();
      // console.log(rcvdData, "data");
      let supplierOrders = rcvdData.filter((x) => x.customerId == 0);
      const paymentsWithSerialNumber = supplierOrders.map((order, index) => ({
        ...order,
        serialNumber: index + 1,
      }));
      // Update state with the array containing serial numbers
      setAllOrders2(paymentsWithSerialNumber);
      // setAllOrders2(supplierOrders);
      setLoading2(false);
      // setAllSupplierData(data.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch(a73)
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        let rcvdData = response.data.reverse();
        let supplierOrders = rcvdData.filter((x) => x.customerId == 0);
        const paymentsWithSerialNumber = supplierOrders.map((order, index) => ({
          ...order,
          serialNumber: index + 1,
        }));

        // Update state with the array containing serial numbers
        setAllOrders2(paymentsWithSerialNumber);
        // setAllOrders2(supplierOrders);
        setLoading2(false);

        // setOlddata(response);
        // console.log(response.data);
      });
  }, []);

  const fetchAllSuppliers = async () => {
    try {
      const response = await fetch(a28);
      const data = await response.json();
      setAllSupplierData(data.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllSuppliers();
  }, []);
  // useEffect(() => {
  //   fetchAllSuppliersPayments();
  // }, []);

  const handleNameInputChange2 = (e) => {
    const { value } = e.target;
    setSupplierName(value); // Update the name input value

    const selected = allSupplierData.find((supplier) => {
      const fullName = supplier.firm_name;
      return fullName.toLowerCase() === value.toLowerCase();
    });

    if (selected) {
      setSupplierId(selected.id);
      setSelectedSupplier(selected);
    }
  };
  // useEffect(() => {
  //   if (selectedSupplier) {
  //     setSupplierName(selectedSupplier.firm_name);
  //     setSupplierId(selectedSupplier.id);

  //     // Use filter to create a new array with only the orders for the selected supplier
  //     const filteredPayments2 = allOrders2.filter(
  //       (x) => x.supplierId === selectedSupplier.id
  //     );

  //     // console.log("I am here ");
  //     // console.log(filteredPayments2, "filteredPayments2");

  //     // Update state with the filtered array
  //     // setAllOrders2(filteredPayments2);

  //     const paymentsWithSerialNumber = filteredPayments2.map(
  //       (order, index) => ({
  //         ...order,
  //         serialNumber: index + 1,
  //       })
  //     );

  //     // console.log("I am here ");
  //     // console.log(paymentsWithSerialNumber, "filteredPayments2");

  //     // Update state with the array containing serial numbers
  //     setAllOrders2(paymentsWithSerialNumber);

  //     // Assuming filterOrders2 is a function that further processes the filtered array
  //     // filterOrders2();
  //   } else {
  //     // console.log("I am herenow ");
  //     setLoading2(true);
  //     // setSupplierName("");
  //     // setSelectedSupplier(null);
  //     fetchAllSuppliersPayments();
  //   }
  // }, [selectedSupplier]);

  const filterOrders2 = () => {
    let filtered2 = allOrders2;
    if (supplierName !== "") {
      filtered2 = filtered2.filter((order) =>
        order.supplierName.toLowerCase().includes(supplierName.toLowerCase())
      );
    }

    if (fromDate2 !== "" && toDate2 !== "") {
      filtered2 = filtered2.filter((order) => {
        const orderDate2 = new Date(order.createdOn);
        return (
          orderDate2 >= new Date(fromDate2) && orderDate2 <= new Date(toDate2)
        );
      });
    }

    setFilteredOrders2(filtered2);
    setCurrentPage2(1); // Reset to the first page after filtering
  };
  // console.log(allOrders2, "allOrders2");
  useEffect(() => {
    filterOrders2();
    window.scrollTo(0, 0);

    // console.log(filteredOrders2);
  }, [
    // orderStatus2,
    // orderNumber2,
    supplierName,
    allOrders2,
    fromDate2,
    toDate2,
    selectedSupplier,
  ]);
  console.log(filteredOrders2, "filterOrders2");
  console.log(filteredOrders2, "filterOrders2");
  console.log(filteredOrders2, "filterOrders2");
  // useEffect(() => {}, [currentPage]);
  // console.log(JSON.stringify(orderItems), "orderItems");
  // console.log(allOrders2);
  const indexOfLastProduct2 = currentPage2 * ordersPerPage2;
  const indexOfFirstProduct2 = indexOfLastProduct2 - ordersPerPage2;
  // const currentOrders2 = filteredOrders2.slice(
  //   indexOfFirstProduct2,
  //   indexOfLastProduct2
  // );

  //  New Code Supplier Ledger

  // console.log(supplierId, "supplierId");
  // console.log(selectedSupplier, "selectedSupplier");

  let currentOrders2 = Array.isArray(filteredOrders2)
    ? filteredOrders2.slice(indexOfFirstProduct2, indexOfLastProduct2)
    : [];
  const totalPages2 = Math.ceil(filteredOrders2.length / ordersPerPage2);

  const goToNextPage2 = () => {
    setCurrentPage2((prevPage2) => prevPage2 + 1);
  };

  const goToPreviousPage2 = () => {
    setCurrentPage2((prevPage2) => prevPage2 - 1);
  };

  console.log(selectedSupplier, "selectedSupplier");
  console.log(selectedCustomer, "selectedCustomer");
  console.log(selectedCustomer, "selectedCustomer");
  console.log(selectedCustomer, "selectedCustomer");
  //  New Code Supplier Ledger
  //   Supplier Ledger
  // console.log(currentOrders2, "currentOrders2");
  return (
    <div>
      <AdminHeading />
      <div className="adminMainBodyBox">
        <AdminBreadCrump
          title={"All Ledger"}
          companyName={"Loyalstring"}
          module={"Accounts"}
          page={"All Ledger"}
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
                <p>Customer Ledger</p>
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
                <p>Supplier Ledger</p>
              </div>
            </div>
            <div
              style={{
                // width: "80vw",
                justifyContent: "left",
                flexWrap: "wrap",
                marginBottom: "30px",
                marginTop: "20px",
              }}
              className={
                active == "List" ? "adminAllProductsFilterBox" : "none"
              }
            >
              {!loading ? (
                <div
                  style={{ marginBottom: "5px" }}
                  className="adminAllProductsFilterCategoryBox"
                >
                  <div
                    id="adminInvoiceAddCustomerTitle"
                    className="adminInvoiceSelectLabelBox"
                  >
                    <div
                      style={{ flexWrap: "wrap" }}
                      className="adminInvoiceSelectItem"
                    >
                      {/* <button >Check</button> */}
                      <label>Customer Name</label>
                      <input
                        style={{ width: "30vw" }}
                        type="text"
                        name="customerName"
                        value={customerName}
                        onInput={handleNameInputChange}
                        list="customerNamesList"
                      />
                      <datalist id="customerNamesList">
                        {allCustomerData.map((customer, index) => (
                          <option
                            key={index}
                            // value={`${customer.id},${customer.firstName} ${customer.lastName}`}
                            value={`${customer.firstName} ${customer.lastName}`}
                          />
                        ))}
                      </datalist>
                      {/* <button
                        onClick={() => {
                          //   setSelectedCustomer(null),
                          // setAddNewCustomer(!addNewCustomer),
                          // checkIfNewCs();
                        }}
                        className="adminInvoiceAddCustomerOption"
                      >
                        <AiOutlinePlusSquare size={"20px"} />
                      </button> */}
                    </div>
                    <div className="adminInvoiceSelectItem">
                      <label>Fine Gold</label>
                      <input
                        type="text"
                        readOnly
                        value={selectedCustomer ? selectedCustomer.fineGold : 0}
                      />
                    </div>
                    <div className="adminInvoiceSelectItem">
                      <label>Fine Silver</label>
                      <input
                        type="text"
                        readOnly
                        value={
                          selectedCustomer ? selectedCustomer.fineSilver : 0
                        }
                      />
                    </div>
                    <div className="adminInvoiceSelectItem">
                      <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                        Advance Amount
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={
                          selectedCustomer ? selectedCustomer.advanceAmount : 0
                        }
                      />
                    </div>
                    <div className="adminInvoiceSelectItem">
                      <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                        Balance Amount
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={
                          selectedCustomer ? selectedCustomer.balanceAmount : 0
                        }
                      />
                    </div>
                    {/* <div className="adminInvoiceSelectItem">
                      <label>Inward Number</label>
                      <input
                        type="text"
                        readOnly
                        value={selectedCustomer ? selectedCustomer.inwardNo : 0}
                      />
                    </div> */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* <select
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
                <div className="adminAllProductsFilterLabelBox">
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
                  /> */}
                  </div>
                  {/* <div className="adminAllProductsFilterLabelBox">
                  <input
                    type="text"
                    placeholder="Search Name / Address / Mobile / Amount / Invoice..."
                    value={orderNumber2}
                    onChange={(e) => {
                      setOrderNumber2(e.target.value.toLowerCase()),
                        setCurrentPage2(1);
                    }}
                  />
                </div> */}
                </div>
              ) : null}
              {!loading ? (
                <div
                  className="adminAllOrdersTableMainBox"
                  style={{
                    overflowX: "auto",
                    boxSizing: "border-box",
                  }}
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
                        <th>S.No</th>
                        <th>Customer Name</th>
                        <th>Created On</th>
                        <th>Payment Source</th>
                        <th>Credit/Debit</th>
                        <th>Invoice No</th>
                        <th>Payment Mode</th>
                        <th>Paid Amount</th>
                        <th>Paid Gold</th>
                        <th>Paid Silver</th>
                        <th>Financial Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrders.map((x) => {
                        return (
                          // <tr key={x.Customer_id}>
                          <tr
                            // onClick={() =>
                            //   navigate(
                            //     `/supplier_allpayments?supplierId=${x.party_Details.id}&&invoiceFor=${x.id}`
                            //   )
                            // }
                            className="adminLedgerMainSupplierRow"
                            // style={{ whiteSpace: "nowrap" }}
                            key={x.id}
                          >
                            <td>{x.serialNumber}</td>
                            <td>{x.customerName}</td>
                            <td>
                              {new Date(x.createdOn).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td>{x.paymentSource}</td>
                            <td>{x.creditDebit}</td>
                            <td>
                              {x.invoiceNumber !== "undefined"
                                ? x.invoiceNumber
                                : null}
                            </td>
                            <td>{x.paymentModeType}</td>
                            <td>₹{x.amount}</td>
                            <td>{x.fineGold}</td>
                            <td>{x.fineSilver}</td>
                            <td>{x.financialYear}</td>
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
              ) : null}
              {/* </div> */}
            </div>
            <div
              style={{
                // width: "80vw",
                justifyContent: "left",
                flexWrap: "wrap",
                marginBottom: "30px",
                marginTop: "20px",
              }}
              className={
                active !== "List" ? "adminAllProductsFilterBox" : "none"
              }
            >
              {!loading2 ? (
                <div
                  style={{ marginBottom: "5px" }}
                  className="adminAllProductsFilterCategoryBox"
                >
                  <div
                    id="adminInvoiceAddCustomerTitle"
                    className="adminInvoiceSelectLabelBox"
                  >
                    <div
                      style={{ flexWrap: "wrap" }}
                      className="adminInvoiceSelectItem"
                    >
                      {/* <button >Check</button> */}
                      <label>Firm Name</label>
                      <input
                        style={{ width: "30vw" }}
                        type="text"
                        name="supplierName"
                        value={supplierName}
                        onInput={handleNameInputChange2}
                        list="supplierNamesList"
                      />
                      <datalist id="supplierNamesList">
                        {allSupplierData.map((supplier, index) => (
                          <option
                            key={index}
                            value={`${supplier.supplier_name}`}
                          />
                        ))}
                      </datalist>
                      {/* <button
                        onClick={() => {
                          //   setSelectedCustomer(null),
                          // setAddNewCustomer(!addNewCustomer),
                          // checkIfNewCs();
                        }}
                        className="adminInvoiceAddCustomerOption"
                      >
                        <AiOutlinePlusSquare size={"20px"} />
                      </button> */}
                    </div>
                    <div className="adminInvoiceSelectItem">
                      <label>Fine Gold</label>
                      <input
                        type="text"
                        readOnly
                        value={selectedSupplier ? selectedSupplier.fineGold : 0}
                      />
                    </div>
                    <div className="adminInvoiceSelectItem">
                      <label>Fine Silver</label>
                      <input
                        type="text"
                        readOnly
                        value={
                          selectedSupplier ? selectedSupplier.fineSilver : 0
                        }
                      />
                    </div>
                    <div className="adminInvoiceSelectItem">
                      <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                        Advance Amount
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={
                          selectedSupplier ? selectedSupplier.advanceAmt : 0
                        }
                      />
                    </div>
                    <div className="adminInvoiceSelectItem">
                      <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                        Balance Amount
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={
                          selectedSupplier ? selectedSupplier.balanceAmt : 0
                        }
                      />
                    </div>
                    {/* <div className="adminInvoiceSelectItem">
                      <label>Inward Number</label>
                      <input
                        type="text"
                        readOnly
                        value={selectedCustomer ? selectedCustomer.inwardNo : 0}
                      />
                    </div> */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* <select
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
                <div className="adminAllProductsFilterLabelBox">
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
                  /> */}
                  </div>
                  {/* <div className="adminAllProductsFilterLabelBox">
                  <input
                    type="text"
                    placeholder="Search Name / Address / Mobile / Amount / Invoice..."
                    value={orderNumber2}
                    onChange={(e) => {
                      setOrderNumber2(e.target.value.toLowerCase()),
                        setCurrentPage2(1);
                    }}
                  />
                </div> */}
                </div>
              ) : null}
              {!loading2 ? (
                <div
                  className="adminAllOrdersTableMainBox"
                  style={{
                    overflowX: "auto",
                    boxSizing: "border-box",
                  }}
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
                        <th>S.No</th>
                        <th>Supplier Name</th>
                        <th>Created On</th>
                        <th>Payment Source</th>
                        <th>Credit/Debit</th>
                        <th>Invoice No</th>
                        <th>Payment Mode</th>
                        <th>Paid Amount</th>
                        <th>Paid Gold</th>
                        <th>Paid Silver</th>
                        <th>Financial Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrders2.map((x) => {
                        return (
                          // <tr key={x.Customer_id}>
                          <tr
                            // onClick={() =>
                            //   navigate(
                            //     `/supplier_allpayments?supplierId=${x.party_Details.id}&&invoiceFor=${x.id}`
                            //   )
                            // }
                            className="adminLedgerMainSupplierRow"
                            // style={{ whiteSpace: "nowrap" }}
                            key={x.id}
                          >
                            <td>{x.serialNumber}</td>
                            <td>{x.supplierName}</td>
                            <td>
                              {new Date(x.createdOn).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td>{x.paymentSource}</td>
                            <td>{x.creditDebit}</td>
                            <td>
                              {x.invoiceNumber !== "undefined"
                                ? x.invoiceNumber
                                : null}
                            </td>
                            <td>{x.paymentModeType}</td>
                            <td>₹{x.amount}</td>
                            <td>{x.fineGold}</td>
                            <td>{x.fineSilver}</td>
                            <td>{x.financialYear}</td>
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
              ) : null}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
