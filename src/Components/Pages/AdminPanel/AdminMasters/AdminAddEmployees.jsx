import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
import {
  a100,
  a101,
  a104,
  a107,
  a108,
  a109,
  a110,
  a111,
  a112,
  a18,
  a35,
  a7,
  a95,
  a96,
  a97,
  a98,
  a99,
} from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";
import { allCountriesList } from "../../../Api/CountriesAllList";
import { allStateList } from "../../../Api/StateList";

export default function AdminAddEmployees() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [loading, setLoading] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    CompCode: "",
    BranchCode: "",
    EmployeeCode: "",
    FirstName: "",
    LastName: "",
    EmpEmail: "",
    MobileNumber: "",
    Town: "",
    StreetAddress: "",
    City: "",
    State: "",
    Country: "",
    AadharNo: "",
    PanNo: "",
    DateOfBirth: "",
    Gender: "",
    Designation: "",
    WorkLocation: "",
    Department: "",
    ReportingTo: "",
    BankName: "",
    AccountName: "",
    BankAccountNo: "",
    BranchName: "",
    IfscCode: "",
    JoiningDate: "",
    Salary: "",
    UserName: "",
    Password: "",
    SeatingLocation: "",
    FinancialYear: "",

    OldEntry: false,
  });
  const [allCompaniesList, setAllCompaniesList] = useState([]);
  const [allBranchesList, setAllBranchesList] = useState([]);
  const [allDepartmentsList, setAllDepartmentsList] = useState([]);
  const [allRolesList, setAllRolesList] = useState([]);
  const [allCountersList, setAllCountersList] = useState([]);
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const fetchAllCategory = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a110, {
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
        setAllCategories(data);
      } else {
        setActive("addNew");
        document
          .getElementById("addCategoryListTitle")
          .classList.add("activeCategoryTitle");
        document
          .getElementById("addCategoryListLogo")
          .classList.add("activeCategoryLogo");
        document.getElementById("addCategoryListTitle").click();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCategory();
  }, []);
  const fetchAllCompanies = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a95, {
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
        setAllCompaniesList(data);
      } else {
        // alert("Please Add Company First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCompanies();
  }, []);

  const fetchAllBranches = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a98, {
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
        setAllBranchesList(data);
      } else {
        // alert("Please Add Company First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllBranches();
  }, []);

  const fetchAllDepartments = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a104, {
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
        setAllDepartmentsList(data);
      } else {
        // alert("Please Add Company First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllDepartments();
  }, []);

  const fetchAllRoles = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a107, {
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
        setAllRolesList(data);
      } else {
        // alert("Please Add Company First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllRoles();
  }, []);

  const fetchAllCounters = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a101, {
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
        setAllCountersList(data);
      } else {
        // alert("Please Add Company First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCounters();
  }, []);
  console.log(allCategories, "allCategories");
  console.log(allCompaniesList, "allCompaniesList");
  console.log(allDepartmentsList, "allDepartmentsList");
  console.log(allBranchesList, "allBranchesList");
  console.log(allRolesList, "allRolesList");

  const states = {
    US: ["California", "Texas", "Florida", "New York"],
    IN: allStateList,
    // Add more states for each country as needed
  };

  const [countryStates, setCountryStates] = useState([]);
  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setNewCategory({ ...newCategory, [name]: value });
    if (name == "Country" && value == "India") {
      setCountryStates(states.IN);
      setNewCategory({ ...newCategory, Country: value, State: "" });
    } else if (name == "Country" && value == "United States") {
      setCountryStates(states.US);
      setNewCategory({ ...newCategory, Country: value, State: "" });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
      setCountryStates([]);
    }
    if (name == "BranchCode") {
      setNewCategory({
        ...newCategory,
        FinancialYear: allBranchesList.filter((x) => x.Id == parseInt(value))[0]
          ?.FinancialYear,
        BranchCode: value,
      });
    }
  };
  console.log(newCategory, "newCategory");
  console.log(newCategory, "newCategory");

  const addNewCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      ClientCode: clientCode,
      CompCode: newCategory.CompCode,
      BranchCode: newCategory.BranchCode,
      EmployeeCode: newCategory.EmployeeCode,
      FirstName: newCategory.FirstName,
      LastName: newCategory.LastName,
      EmpEmail: newCategory.EmpEmail,
      MobileNumber: newCategory.MobileNumber,
      Town: newCategory.Town,
      StreetAddress: newCategory.StreetAddress,
      City: newCategory.City,
      State: newCategory.State,
      Country: newCategory.Country,
      AadharNo: newCategory.AadharNo,
      PanNo: newCategory.PanNo,
      DateOfBirth: newCategory.DateOfBirth,
      Gender: newCategory.Gender,
      Designation: newCategory.Designation,
      WorkLocation: newCategory.WorkLocation,
      Department: newCategory.Department,
      ReportingTo: newCategory.ReportingTo,
      BankName: newCategory.BankName,
      AccountName: newCategory.AccountName,
      BankAccountNo: newCategory.BankAccountNo,
      BranchName: newCategory.BranchName,
      IfscCode: newCategory.IfscCode,
      JoiningDate: newCategory.JoiningDate,
      Salary: newCategory.Salary,
      UserName: newCategory.UserName,
      Password: newCategory.Password,
      SeatingLocation: newCategory.SeatingLocation,
      FinancialYear: newCategory.FinancialYear,
      ...(newCategory.OldEntry ? { Id: newCategory.Id } : {}),
    };
    console.log(formData, "formData to send");
    try {
      const response = await fetch(
        !newCategory.OldEntry ? a112 : a111,
        // a96,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      fetchAllCategory();
      setActive("List");
      setNewCategory({
        CompCode: "",
        BranchCode: "",
        EmployeeCode: "",
        FirstName: "",
        LastName: "",
        EmpEmail: "",
        MobileNumber: "",
        Town: "",
        StreetAddress: "",
        City: "",
        State: "",
        Country: "",
        AadharNo: "",
        PanNo: "",
        DateOfBirth: "",
        Gender: "",
        Designation: "",
        WorkLocation: "",
        Department: "",
        ReportingTo: "",
        BankName: "",
        AccountName: "",
        BankAccountNo: "",
        BranchName: "",
        IfscCode: "",
        JoiningDate: "",
        Salary: "",
        UserName: "",
        Password: "",
        SeatingLocation: "",
        FinancialYear: "",
        OldEntry: false,
      });
      if (data.message) {
        // alert(data.message);
        setMessageType("error");
        setMessageToShow(data.message);
        setShowError(true);
        setActive("AddNew");
      } else {
        setMessageType("success");
        setMessageToShow("Employee Added Successfully");
        setShowError(true);
      }
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
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
    setNewCategory({ ...data, OldEntry: true });
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
          title={"Add Employees"}
          companyName={"Loyalstring"}
          module={"User Masters"}
          page={"Employees"}
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
                <p>All Employees</p>
              </div>

              <div
                id="addCategoryListTitle"
                onClick={() => setActive("AddNew")}
                className={
                  active === "AddNew"
                    ? "adminAddCategoryInnerBoxTitle"
                    : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                }
              >
                <div
                  id="addCategoryListLogo"
                  className={
                    active === "AddNew"
                      ? "adminAddCategoryInnerBoxTitleLogo"
                      : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                  }
                >
                  {/* 02 */}
                  <RiPlayListAddLine />
                </div>
                <p>Add Employee</p>
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
                    <th>Sr.No</th>
                    {/* <th>Comp Code</th>
                    <th>Branch Code</th> */}
                    <th>Employee Code</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Emp Email</th>
                    <th>Mobile Number</th>
                    <th>Town</th>
                    <th>Street Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Aadhar No</th>
                    <th>Pan No</th>
                    <th>Date Of Birth</th>
                    <th>Gender</th>
                    <th>Designation</th>
                    <th>Work Location</th>
                    <th>Department</th>
                    <th>Reporting To</th>
                    <th>Bank Name</th>
                    <th>Account Name</th>
                    <th>Bank AccountNo</th>
                    <th>Branch Name</th>
                    <th>Ifsc Code</th>
                    <th>Joining Date</th>
                    <th>Salary</th>
                    {/* <th>User Name</th>
                    <th>Password</th> */}
                    <th>Seating Location</th>
                    <th>Financial Year</th>
                  </tr>
                </thead>
                <tbody>
                  {allCategories.map((x, index) => (
                    <tr key={x.id}>
                      <td>
                        <button
                          className="adminAddCategoryEditButton"
                          // onClick={() => handleEditClick(x.id)}
                          onClick={() => handleEditData(x)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      {/* <td>{x.CompCode}</td>
                      <td>{x.BranchCode}</td> */}
                      <td>{x.EmployeeCode}</td>
                      <td>{x.FirstName}</td>
                      <td>{x.LastName}</td>
                      <td>{x.EmpEmail}</td>
                      <td>{x.MobileNumber}</td>
                      <td>{x.Town}</td>
                      <td>{x.StreetAddress}</td>
                      <td>{x.City}</td>
                      <td>{x.State}</td>
                      <td>{x.Country}</td>
                      <td>{x.AadharNo}</td>
                      <td>{x.PanNo}</td>
                      <td>{x.DateOfBirth}</td>
                      <td>{x.Gender}</td>
                      <td>{x.Designation}</td>
                      <td>{x.WorkLocation}</td>
                      <td>{x.Department}</td>
                      <td>{x.ReportingTo}</td>
                      <td>{x.BankName}</td>
                      <td>{x.AccountName}</td>
                      <td>{x.BankAccountNo}</td>
                      <td>{x.BranchName}</td>
                      <td>{x.IfscCode}</td>
                      <td>{x.JoiningDate}</td>
                      <td>{x.Salary}</td>
                      {/* <td>{x.UserName}</td>
                      <td>{x.Password}</td> */}
                      <td>{x.SeatingLocation}</td>
                      <td>{x.FinancialYear}</td>
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
              <p>Add New Employee</p>
              <form onSubmit={addNewCategory}>
                <h4
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                  id="adminInvoiceAddedCustomerEdit"
                  className="adminInvoiceAddTitles"
                >
                  Personal Details
                </h4>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <label>
                    First Name <sup>*</sup>
                  </label>
                  <input
                    name="FirstName"
                    value={newCategory.FirstName}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>Last Name</label>
                  <input
                    name="LastName"
                    value={newCategory.LastName}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Emp Email</label>
                  <input
                    name="EmpEmail"
                    value={newCategory.EmpEmail}
                    onChange={handleNewCategoryChange}
                    type="email"
                  />
                  <label>Mobile Number</label>
                  <input
                    name="MobileNumber"
                    value={newCategory.MobileNumber}
                    onChange={handleNewCategoryChange}
                    type="tel"
                  />
                  <label>Street Address</label>
                  <input
                    name="StreetAddress"
                    value={newCategory.StreetAddress}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Town</label>
                  <input
                    name="Town"
                    value={newCategory.Town}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>City</label>
                  <input
                    name="City"
                    value={newCategory.City}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>
                    Country <sup>*</sup>
                  </label>

                  <select
                    name="Country"
                    value={newCategory.Country}
                    onChange={handleNewCategoryChange}
                    required="required"
                  >
                    {allCountriesList.map((x, y) => (
                      <option key={y} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                  <label>
                    State <sup>*</sup>
                  </label>
                  <input
                    name="State"
                    value={newCategory.State}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                    list="statesList"
                  />
                  <datalist id="statesList">
                    {countryStates.map((x, index) => (
                      <option key={index} value={x}>
                        {x}
                      </option>
                    ))}
                  </datalist>
                  <label>Aadhar No</label>
                  <input
                    name="AadharNo"
                    value={newCategory.AadharNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Pan No</label>
                  <input
                    name="PanNo"
                    value={newCategory.PanNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Date Of Birth</label>
                  <input
                    name="DateOfBirth"
                    value={newCategory.DateOfBirth}
                    onChange={handleNewCategoryChange}
                    type="date"
                  />
                  <label>Gender</label>
                  <select
                    name="Gender"
                    value={newCategory.Gender}
                    onChange={handleNewCategoryChange}
                    required="required"
                  >
                    <option value={""}>Select An Option</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </select>
                  <label>Work Location</label>
                  <input
                    name="WorkLocation"
                    value={newCategory.WorkLocation}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                </div>
                <h4
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                  id="adminInvoiceAddedCustomerEdit"
                  className="adminInvoiceAddTitles"
                >
                  System Details
                </h4>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <label>
                    Company <sup>*</sup>
                  </label>
                  <select
                    name="CompCode"
                    value={newCategory.CompCode}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={""}>Select an option</option>;
                    {allCompaniesList.map((x) => {
                      return (
                        <>
                          <option value={x.Id}>{x.CompName}</option>;
                        </>
                      );
                    })}
                  </select>
                  <label>
                    Branch <sup>*</sup>
                  </label>
                  <select
                    name="BranchCode"
                    value={newCategory.BranchCode}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={""}>Select an option</option>;
                    {allBranchesList.map((x) => {
                      return (
                        <>
                          <option value={x.Id}>{x.BranchName}</option>;
                        </>
                      );
                    })}
                  </select>
                  <label>Department</label>
                  <select
                    name="Department"
                    value={newCategory.Department}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={""}>Select an option</option>;
                    {allDepartmentsList.map((x) => {
                      return (
                        <>
                          <option value={x.DeptName}>{x.DeptName}</option>;
                        </>
                      );
                    })}
                  </select>
                  <label>Counter</label>
                  {/* <input
                    name="SeatingLocation"
                    value={newCategory.SeatingLocation}
                    onChange={handleNewCategoryChange}
                    type="text"
                  /> */}
                  <select
                    name="SeatingLocation"
                    value={newCategory.SeatingLocation}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={""}>Select an option</option>;
                    {allCountersList.map((x) => {
                      return (
                        <>
                          <option value={x.Id}>{x.CounterName}</option>;
                        </>
                      );
                    })}
                  </select>
                  <label>
                    Roles <sup>*</sup>
                  </label>
                  <select
                    name="Designation"
                    value={newCategory.Designation}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={""}>Select an option</option>;
                    <option value={"Director"}>Director</option>;
                    <option value={"Company Head"}>Company Head</option>;
                    <option value={"Branch Head"}>Branch Head</option>;
                    <option value={"Manager"}>Manager</option>;
                    <option value={"Accountant"}>Accountant</option>;
                    <option value={"Floor Manager"}>Floor Manager</option>
                    <option value={"Team Lead"}>Team Lead</option>;
                    <option value={"Salesman"}>Salesman</option>;
                    <option value={"Cashier"}>Cashier</option>;
                    <option value={"Other User"}>Other User</option>;
                    {allRolesList.map((x) => {
                      return (
                        <>
                          <option value={x.Role}>{x.Role}</option>;
                        </>
                      );
                    })}
                  </select>
                  <label>Reporting To</label>
                  {/* <input
                    name="ReportingTo"
                    value={newCategory.ReportingTo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  /> */}
                  <select
                    name="ReportingTo"
                    value={newCategory.ReportingTo}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={""}>Select an option</option>;
                    {allCategories.map((x) => {
                      return (
                        <>
                          <option
                            value={`${x.FirstName} ${x.LastName}`}
                          >{`${x.FirstName} ${x.LastName}`}</option>
                        </>
                      );
                    })}
                  </select>
                  <label>
                    User Name<sup>*</sup>
                  </label>
                  <input
                    name="UserName"
                    value={newCategory.UserName}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>
                    Password<sup>*</sup>
                  </label>
                  <input
                    name="Password"
                    value={newCategory.Password}
                    onChange={handleNewCategoryChange}
                    type="password"
                    required="required"
                  />
                </div>
                <h4
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                  id="adminInvoiceAddedCustomerEdit"
                  className="adminInvoiceAddTitles"
                >
                  Bank Details
                </h4>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <label>Bank Name</label>
                  <input
                    name="BankName"
                    value={newCategory.BankName}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Account Name</label>
                  <input
                    name="AccountName"
                    value={newCategory.AccountName}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Bank Account No</label>
                  <input
                    name="BankAccountNo"
                    value={newCategory.BankAccountNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Branch Name</label>
                  <input
                    name="BranchName"
                    value={newCategory.BranchName}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Ifsc Code</label>
                  <input
                    name="IfscCode"
                    value={newCategory.IfscCode}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Joining Date</label>
                  <input
                    name="JoiningDate"
                    value={newCategory.JoiningDate}
                    onChange={handleNewCategoryChange}
                    type="date"
                  />
                  <label>Salary</label>
                  <input
                    name="Salary"
                    value={newCategory.Salary}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Financial Year</label>
                  <input
                    style={{ cursor: "not-allowed" }}
                    name="FinancialYear"
                    placeholder={newCategory.FinancialYear}
                    // value={newCategory.FinancialYear}
                    // onChange={handleNewCategoryChange}
                    readOnly
                    type="text"
                  />
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
