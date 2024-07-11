import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";

import { useSelector } from "react-redux";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlinePlusSquare } from "react-icons/ai";
import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { GiCheckMark } from "react-icons/gi";
import { a149, a165 } from "../../../Api/RootApiPath";

export default function AdminVendorLedger() {
  const [active, setActive] = useState("List");
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
  const navigate = useNavigate();
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
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  const clientCode = adminLoggedIn.ClientCode;

  const fetchAllSuppliersPayments = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a165, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // console.log(data, "data");
      let rcvdData = data.reverse();
      // console.log(rcvdData, "data");
      let supplierOrders = rcvdData.filter((x) => x.CustomerId == 0);
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
    fetchAllSuppliersPayments();
  }, []);

  const fetchAllSuppliers = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a149, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllSupplierData(data);
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
      const fullName = supplier.FirmName;
      return fullName.toLowerCase() === value.toLowerCase();
    });

    if (selected) {
      setSupplierId(selected.Id);
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
        order.VendorName.toLowerCase().includes(supplierName.toLowerCase())
      );
    }

    if (fromDate2 !== "" && toDate2 !== "") {
      filtered2 = filtered2.filter((order) => {
        const orderDate2 = new Date(order.CreatedOn);
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

  return (
    <div>
      <AdminHeading />
      <div className="adminMainBodyBox">
        <AdminBreadCrump
          title={"Purchase Payments"}
          companyName={"Loyalstring"}
          module={"Trading"}
          page={"Purchase Payments"}
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
                <p>Make Payment</p>
              </div>

              <div
                onClick={() => {
                  setActive("AddNew"), navigate("/admin_customer_ledger");
                }}
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
                <p>Recieve Payment</p>
              </div>
            </div>
            {active === "List" ? (
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
                      </div>
                      <div className="adminInvoiceSelectItem">
                        <label>Fine Gold</label>
                        <input
                          type="text"
                          readOnly
                          value={
                            selectedSupplier ? selectedSupplier.FineGold : 0
                          }
                        />
                      </div>
                      <div className="adminInvoiceSelectItem">
                        <label>Fine Silver</label>
                        <input
                          type="text"
                          readOnly
                          value={
                            selectedSupplier ? selectedSupplier.FineSilver : 0
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
                            selectedSupplier ? selectedSupplier.AdvanceAmt : 0
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
                            selectedSupplier ? selectedSupplier.BalanceAmt : 0
                          }
                        />
                      </div>
                    </div>
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
                              key={x.Id}
                            >
                              <td>{x.serialNumber}</td>
                              <td>{x.VendorName}</td>
                              <td>
                                {new Date(x.CreatedOn).toLocaleDateString(
                                  "en-GB"
                                )}
                              </td>
                              <td>{x.Source}</td>
                              <td>{x.CrDr}</td>
                              <td>
                                {x.InvoiceNumber !== "undefined"
                                  ? x.InvoiceNumber
                                  : null}
                              </td>
                              <td>{x.PaymentModeType}</td>
                              <td>₹{x.Amount}</td>
                              <td>{x.FineGold}</td>
                              <td>{x.FineSilver}</td>
                              <td>{x.FinancialYear}</td>
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
            ) : null}

            {/* <div className="adminAllOrderRightBox">
                <button>
                  <BsHandbag style={{ marginRight: "5px" }} />
                  Add New Order
                </button>
                <button>Export</button>
              </div> */}
            {/* </div> */}
            {active === "List" ? (
              <div
                className="adminAllOrdersTableMainBox"
                style={{ overflow: "auto" }}
              ></div>
            ) : null}
            <div
              id="adminSelectedCreditNoteDetailsBox"
              className="adminAddCategoryMainBox"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
