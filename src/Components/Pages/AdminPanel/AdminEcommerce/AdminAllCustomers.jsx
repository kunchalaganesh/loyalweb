import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
import {
  a1,
  a173,
  a18,
  a189,
  a190,
  a20,
  a207,
  a21,
  a210,
  a213,
  a22,
  a23,
  a27,
  a28,
  a36,
  a37,
  a4,
  a40,
  a89,
  a90,
} from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { allStateList } from "../../../Api/StateList";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import AlertMessage from "../../../Other Functions/AlertMessage";

export default function AdminAllCustomers() {
  const [active, setActive] = useState("List");
  const [allCustomersData, setAllCustomersData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [customerSlabList, setCustomerSlabList] = useState([]);
  const [customerRateOfInterestList, setCustomerRateOfInterestList] = useState(
    []
  );
  const [customerCreditPeriodList, setCustomerCreditPeriodList] = useState([]);

  const [newCs, setNewCs] = useState({
    FirstName: "",
    LastName: "",
    MiddleName: "",
    PerAddStreet: "",
    CurrAddStreet: "",
    Mobile: "",
    Email: "",
    Password: "",
    CustomerLoginId: "",
    DateOfBirth: "",
    PerAddPincode: "",
    Gender: "",
    CustomerSlabId: 0,
    CreditPeriodId: 0,
    RateOfInterestId: 0,
    OnlineStatus: "",
    CurrAddTown: "",
    CurrAddPincode: "",
    CurrAddState: "",
    PerAddTown: "",
    PerAddState: "",
    GstNo: "",
    PanNo: "",
    AadharNo: "",
    BalanceAmount: "0",
    AdvanceAmount: "0",
    Discount: "0",
    CreditPeriod: "0",
    FineGold: "0",
    FineSilver: "0",
    VendorId: 0,
    AddToVendor: false,
    oldEntry: false,
  });
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const openView = params.get("openView");
  const csName = params.get("csName");
  const csMobile = params.get("csMobile");
  const csAddress = params.get("csAddress");

  useEffect(() => {
    window.scroll(0, 0);
    if (openView == "addNew") {
      setActive("AddNew");
      document
        .getElementById("adminAddCustomerTitle")
        .classList.add("activeCategoryTitle");
      document
        .getElementById("adminAddCustomerLogo")
        .classList.add("activeCategoryLogo");
      document.getElementById("adminAddCustomerTitle").click();
      setNewCs({
        ...newCs,
        FirstName: csName,
        Mobile: csMobile,
        PerAddStreet: csAddress,
        CurrAddStreet: csAddress,
      });
    }
  }, []);

  const fetchAllCustomers = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a173, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data, "data,");
    try {
      if (data.length > 0) {
        setAllCustomersData(data);
      } else {
        setActive("addNew");
        document
          .getElementById("adminAddCustomerTitle")
          .classList.add("activeCategoryTitle");
        document
          .getElementById("adminAddCustomerLogo")
          .classList.add("activeCategoryLogo");
        document.getElementById("adminAddCustomerTitle").click();
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allCustomersData);

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const fetchAllCustomersSlab = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a207, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data, "data,");
    try {
      if (data.length > 0) {
        setCustomerSlabList(data);
      } else {
        alert("Please Add Customers Slab First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCustomersSlab();
  }, []);

  const fetchAllCustomersRateOfInterest = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a210, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data, "data,");
    try {
      if (data.length > 0) {
        setCustomerRateOfInterestList(data);
      } else {
        alert("Please Add Customers Rate Of Interest");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCustomersRateOfInterest();
  }, []);

  const fetchAllCustomersCreditPeriod = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a213, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data, "data,");
    try {
      if (data.length > 0) {
        setCustomerCreditPeriodList(data);
      } else {
        alert("Please Add Customers Credit Period");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCustomersCreditPeriod();
  }, []);
  const handleEditClick = (id) => {
    setEditingId(id);
    // Find the item with the selected ID and set its data in the state
    const selectedItem = allCustomersData.find((x) => x.Id === id);
    setEditedData(selectedItem);
  };
  console.log(editedData, "editedData");
  console.log(editedData, "editedData");
  console.log(editedData, "editedData");
  console.log(editedData, "editedData");
  const handleSaveClick = () => {
    handleSubmit();
    // Save the edited data to your state or send it to an API
    console.log("Edited Data:", editedData);
    setEditingId(null); // Exit editing mode
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(a40, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });
      const data = await response.json();

      console.log(data, "updated");
      setNewCs({
        FirstName: "",
        LastName: "",
        MiddleName: "",
        PerAddStreet: "",
        CurrAddStreet: "",
        Mobile: "",
        Email: "",
        Password: "",
        CustomerLoginId: "",
        DateOfBirth: "",
        PerAddPincode: "",
        Gender: "",
        CustomerSlabId: 0,
        CreditPeriodId: 0,
        RateOfInterestId: 0,
        OnlineStatus: "",
        CurrAddTown: "",
        CurrAddPincode: "",
        CurrAddState: "",
        PerAddTown: "",
        PerAddState: "",
        GstNo: "",
        PanNo: "",
        AadharNo: "",
        BalanceAmount: "0",
        AdvanceAmount: "0",
        Discount: "0",
        CreditPeriod: "0",
        FineGold: "0",
        FineSilver: "0",
        VendorId: 0,
        AddToVendor: false,
        oldEntry: false,
      });
      fetchAllCustomers();
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setEditedData({ ...editedData, [name]: value });
    setNewCs({ ...newCs, [name]: value });
    console.log(newCs);
  };

  const handleNewCsChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    if (name == "AddToVendor") {
      if (!newCs.oldEntry) {
        setNewCs({ ...newCs, [name]: value });
      } else {
        setMessageType("error");
        setMessageToShow("Kindly Change it from Settings");
        setShowError(true);
      }
    } else {
      setNewCs({ ...newCs, [name]: value });
    }
  };
  console.log(newCs, "newCs");
  console.log(newCs, "newCs");
  console.log(newCs, "newCs");
  const addnewCs = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      FirstName: newCs.FirstName,
      MiddleName: newCs.MiddleName,
      LastName: newCs.LastName,
      Email: newCs.Email !== "" ? newCs.Email : `${newCs.Mobile}@example.com`,
      CustomerLoginId:
        newCs.CustomerLoginId !== ""
          ? newCs.CustomerLoginId
          : `${newCs.Mobile}@example.com`,
      Password: newCs.Password,
      Gender: newCs.Gender,
      CustomerSlabId: parseInt(newCs.CustomerSlabId),
      CreditPeriodId: parseInt(newCs.CreditPeriodId),
      RateOfInterestId: parseInt(newCs.RateOfInterestId),
      Mobile: newCs.Mobile,
      OnlineStatus: newCs.OnlineStatus !== "" ? newCs.OnlineStatus : "Active",
      DateOfBirth: newCs.DateOfBirth,
      AdvanceAmount: newCs.AdvanceAmount,
      BalanceAmount: newCs.BalanceAmount,
      CurrAddStreet: newCs.CurrAddStreet,
      CurrAddTown: newCs.CurrAddTown,
      CurrAddState: newCs.CurrAddState,
      CurrAddPincode: newCs.CurrAddPincode,
      PerAddStreet: newCs.PerAddStreet,
      PerAddTown: newCs.PerAddTown,
      PerAddState: newCs.PerAddState,
      PerAddPincode: newCs.PerAddPincode,
      AadharNo: newCs.AadharNo,
      Discount: newCs.Discount,
      CreditPeriod: newCs.CreditPeriod,
      PanNo: newCs.PanNo,
      FineGold: newCs.FineGold,
      FineSilver: newCs.FineSilver,
      GstNo: newCs.GstNo,
      ClientCode: clientCode,
      VendorId: newCs.VendorId,
      AddToVendor: newCs.AddToVendor === "true",

      Id: newCs.oldEntry ? newCs.Id : 0,
    };
    console.log(formData, "formData before sending");
    if (formData.Mobile.length < 10) {
      alert("please enter a valid mobile mumber");
    } else {
      try {
        console.log(formData);
        const response = await fetch(!newCs.oldEntry ? a189 : a190, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.Message === "email already exist") {
          setMessageType("error");
          setMessageToShow(data.message);
          setShowError(true);
        } else {
          setMessageType("success");
          setMessageToShow("Customer Added Successfully");
          setShowError(true);
          fetchAllCustomers();
          setActive("List");
          console.log(data, "newCsData");
          setNewCs({
            FirstName: "",
            LastName: "",
            MiddleName: "",
            PerAddStreet: "",
            CurrAddStreet: "",
            Mobile: "",
            Email: "",
            Password: "",
            CustomerLoginId: "",
            DateOfBirth: "",
            PerAddPincode: "",
            Gender: "",
            CustomerSlabId: 0,
            CreditPeriodId: 0,
            RateOfInterestId: 0,
            OnlineStatus: "",
            CurrAddTown: "",
            CurrAddPincode: "",
            CurrAddState: "",
            PerAddTown: "",
            PerAddState: "",
            GstNo: "",
            PanNo: "",
            AadharNo: "",
            BalanceAmount: "0",
            AdvanceAmount: "0",
            Discount: "0",
            CreditPeriod: "0",
            FineGold: "0",
            FineSilver: "0",
            VendorId: 0,
            AddToVendor: false,
            oldEntry: false,
          });
        }
      } catch (error) {
        console.error(error);
        alert("fail");
        alert();
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  }, [showError]);
  const handleEditData = (data) => {
    console.log(data, "data");
    console.log(data, "data");
    console.log(data, "data");
    setNewCs({ ...data, oldEntry: true });
    setActive("AddNew");
  };
  return (
    <div>
      <AdminHeading />
      <div className="adminMainBodyBox">
        {showError ? (
          <AlertMessage message={messageToShow} type={messageType} />
        ) : null}
        <AdminBreadCrump
          title={"Add Customer"}
          companyName={"Loyalstring"}
          module={"Masters"}
          page={"Customers"}
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
                  <RiListUnordered />
                </div>
                <p>All Customers</p>
              </div>

              <div
                id="adminAddCustomerTitle"
                onClick={() => setActive("AddNew")}
                className={
                  active === "AddNew"
                    ? "adminAddCategoryInnerBoxTitle"
                    : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                }
              >
                <div
                  id="adminAddCustomerLogo"
                  className={
                    active === "AddNew"
                      ? "adminAddCategoryInnerBoxTitleLogo"
                      : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                  }
                >
                  <RiPlayListAddLine />
                </div>
                <p>Add Customer</p>
              </div>
            </div>
            <div
              className={
                active === "List" ? "adminCategoryListMainBox" : "none"
              }
            >
              <table>
                <thead>
                  <tr>
                    <th>Edit</th>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mobile</th>
                    <th>Balance Amount</th>
                    <th>Advance Amount</th>
                    <th>GSTIN No</th>
                    <th>Billing Address</th>
                    <th>Pemanent Address</th>
                    <th>Email</th>
                    <th>Customer Slab</th>
                    <th>Customer Rate Of Interest</th>
                    <th>Customer Credit Period</th>
                  </tr>
                </thead>
                <tbody>
                  {allCustomersData.map((x) => (
                    <tr key={x.Id}>
                      <td>
                        {editingId === x.Id ? (
                          <button
                            className="adminAddCategorySaveButton"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="adminAddCategoryEditButton"
                            // onClick={() => handleEditClick(x.id)}
                            onClick={() => handleEditData(x)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                      <td>{x.Id}</td>
                      {/* <td> {x.firstName} {x.lastName}</td> */}
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="firstName"
                            value={editedData.firstName || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.FirstName
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="lastName"
                            value={editedData.lastName || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.LastName
                        )}
                      </td>{" "}
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="mobile"
                            value={editedData.mobile || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.Mobile
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="mobile"
                            value={editedData.balanceAmount || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.BalanceAmount
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="mobile"
                            value={editedData.advanceAmount || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.AdvanceAmount
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="gstNo"
                            value={editedData.gstNo || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.GstNo
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="currAddStreet"
                            value={editedData.currAddStreet || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p>
                            {x.CurrAddStreet} {x.CurrAddTown} {x.CurrAddState}{" "}
                            {x.CurrAddPincode}
                          </p>
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="perAddStreet"
                            value={editedData.perAddStreet || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p>
                            {x.PerAddStreet} {x.PerAddTown} {x.PerAddState}{" "}
                            {x.PerAddPincode}
                          </p>
                        )}
                      </td>
                      <td>{x.Email}</td>
                      <td>{x.CustomerSlabId}</td>
                      <td>{x.RateOfInterestId}</td>
                      <td>{x.CreditPeriodId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={
                active !== "List" ? "adminCategoryAddCategoryMainBox" : "none"
              }
            >
              <p>Add New Customer</p>
              <form onSubmit={addnewCs}>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <label>Customer Code</label>
                  {/* {allCustomersData ? ( */}
                  <input
                    name="supplier_code"
                    value={
                      newCs.oldEntry ? newCs.Id : allCustomersData.length + 1
                    }
                    readOnly
                    type="text"
                  />
                  {/* ) : ( */}
                  {/* <input name="supplier_code" value={1} readOnly type="text" /> */}
                  {/* )} */}
                  {/* <label>Supplier Type</label>
                  <select
                    name="supplierType"
                    value={newCs.supplierType || ""}
                    onChange={handleNewCsChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Party">Party</option>
                    <option value="Karigar">Karigar</option>
                  </select> */}

                  <label>
                    First Name <sup> *</sup>
                  </label>
                  <input
                    // style={{ width: "20vw" }}
                    type="text"
                    name="FirstName"
                    required="required"
                    value={newCs.FirstName}
                    onChange={handleNewCsChange}
                    list="customerNamesList"
                  />
                  <datalist id="customerNamesList">
                    {allCustomersData.map((customer) => (
                      <option
                        key={customer.Id}
                        value={`${customer.FirstName} ${customer.LastName}`}
                      />
                    ))}
                  </datalist>
                  {/* <label>First Name</label>
                  <input
                    name="firstName"
                    value={newCs.firstName}
                    onChange={handleNewCsChange}
                    type="text"
                    required="required"
                  /> */}
                  <label>Last Name</label>
                  <input
                    // style={{ width: "20vw" }}
                    type="text"
                    name="LastName"
                    value={newCs.LastName}
                    onChange={handleNewCsChange}
                    list="customerNamesList"
                  />
                  <datalist id="customerNamesList">
                    {allCustomersData.map((customer) => (
                      <option
                        key={customer.Id}
                        value={`${customer.FirstName} ${customer.LastName}`}
                      />
                    ))}
                  </datalist>
                  {/* <label>Last Name</label>
                  <input
                    name="lastName"
                    value={newCs.lastName}
                    onChange={handleNewCsChange}
                    type="text"
                    required="required"
                  /> */}
                  <label>Email</label>
                  <input
                    name="Email"
                    value={newCs.Email}
                    // required="required"
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>
                    Mobile <sup> *</sup>
                  </label>
                  <input
                    // style={{ width: "20vw" }}
                    type="text"
                    required="required"
                    name="Mobile"
                    value={newCs.Mobile}
                    onChange={handleNewCsChange}
                    list="customerMobilesList"
                  />
                  <datalist id="customerMobilesList">
                    {allCustomersData.map((customer) => (
                      <option key={customer.Id} value={`${customer.Mobile}`} />
                    ))}
                  </datalist>
                  {/* <label>Mobile</label>
                  <input
                    name="mobile"
                    value={newCs.mobile}
                    onChange={handleNewCsChange}
                    type="text"
                  /> */}
                  <label>Aadhar Number</label>
                  <input
                    name="AadharNo"
                    value={newCs.AadharNo}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>Pan Number</label>
                  <input
                    name="PanNo"
                    value={newCs.PanNo}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>GST Number</label>
                  <input
                    name="GstNo"
                    value={newCs.GstNo}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>
                    Customer Slab <sup> *</sup>
                  </label>
                  <select
                    // required="required"
                    type="text"
                    name="CustomerSlabId"
                    required="required"
                    value={newCs.CustomerSlabId}
                    onChange={handleNewCsChange}
                  >
                    <option value="">Select Customer Slab</option>
                    {customerSlabList.map((slab, index) => (
                      <option key={index} value={slab.Id}>
                        {slab.CustomerSlabName}
                      </option>
                    ))}
                  </select>
                  <label>
                    Customer Rate Of Interest <sup> *</sup>
                  </label>
                  <select
                    // required="required"
                    type="text"
                    name="RateOfInterestId"
                    required="required"
                    value={newCs.RateOfInterestId}
                    onChange={handleNewCsChange}
                  >
                    <option value="">Select Customer Rate Of Interest</option>
                    {customerRateOfInterestList.map((slab, index) => (
                      <option key={index} value={slab.Id}>
                        {slab.RateOfInterest}
                      </option>
                    ))}
                  </select>
                  <label>
                    Customer Credit Period <sup> *</sup>
                  </label>
                  <select
                    // required="required"
                    type="text"
                    name="CreditPeriodId"
                    required="required"
                    value={newCs.CreditPeriodId}
                    onChange={handleNewCsChange}
                  >
                    <option value="">Select Customer Credit Period</option>
                    {customerCreditPeriodList.map((credit, index) => (
                      <option key={index} value={credit.Id}>
                        {credit.CreditPeriod}
                      </option>
                    ))}
                  </select>

                  <label>Billing Address (Street)</label>
                  <input
                    name="CurrAddStreet"
                    value={newCs.CurrAddStreet}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>Billing Address (Town)</label>
                  <input
                    name="CurrAddTown"
                    value={newCs.CurrAddTown}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>
                    Billing Address (State) <sup> *</sup>
                  </label>
                  <select
                    // required="required"
                    type="text"
                    name="CurrAddState"
                    required="required"
                    value={newCs.CurrAddState}
                    onChange={handleNewCsChange}
                  >
                    <option value="">Select a state</option>
                    {allStateList.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <label>Billing Address (Pincode)</label>
                  <input
                    name="CurrAddPincode"
                    value={newCs.CurrAddPincode}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>PerAdd (Street)</label>
                  <input
                    name="PerAddStreet"
                    value={newCs.PerAddStreet}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>PerAdd (Town)</label>
                  <input
                    name="PerAddTown"
                    value={newCs.PerAddTown}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>
                    PerAdd (State) <sup> *</sup>
                  </label>
                  <select
                    // required="required"
                    type="text"
                    required="required"
                    name="PerAddState"
                    value={newCs.PerAddState}
                    onChange={handleNewCsChange}
                  >
                    <option value="">Select a state</option>
                    {allStateList.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <label>PerAdd (Pincode)</label>
                  <input
                    name="PerAddPincode"
                    value={newCs.PerAddPincode}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>Balance Amount</label>
                  <input
                    name="BalanceAmount"
                    value={newCs.BalanceAmount}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>Advance Amount</label>
                  <input
                    name="AdvanceAmount"
                    value={newCs.AdvanceAmount}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>Discount (Percentage)</label>
                  <input
                    name="Discount"
                    value={newCs.Discount}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  {/* <label>Credit Period (Days)</label>
                  <input
                    name="CreditPeriod"
                    value={newCs.CreditPeriod}
                    onChange={handleNewCsChange}
                    type="text"
                  /> */}
                  <label>Fine Gold</label>
                  <input
                    name="FineGold"
                    value={newCs.FineGold}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>Fine Silver</label>
                  <input
                    name="FineSilver"
                    value={newCs.FineSilver}
                    onChange={handleNewCsChange}
                    type="text"
                  />
                  <label>Add To Vendor</label>
                  <select
                    name="AddToVendor"
                    value={newCs.AddToVendor}
                    onChange={handleNewCsChange}
                    type="text"
                    required="required"
                  >
                    <option value={false}>NO</option>
                    <option value={true}>YES</option>
                  </select>
                </div>
                {!loading ? <button type="submit">Submit</button> : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
