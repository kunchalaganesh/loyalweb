import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
import {
  a100,
  a104,
  a107,
  a108,
  a109,
  a110,
  a111,
  a112,
  a119,
  a120,
  a121,
  a122,
  a123,
  a124,
  a125,
  a126,
  a127,
  a128,
  a129,
  a130,
  a131,
  a132,
  a133,
  a137,
  a138,
  a139,
  a149,
  a173,
  a18,
  a191,
  a192,
  a193,
  a194,
  a195,
  a196,
  a203,
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

export default function AdminPairCustomerVendor() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [loading, setLoading] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    CustomerId: "",
    VendorId: "",
    CompanyId: 0,
    BranchId: 0,
    CounterId: 0,
    EmployeeId: 0,

    OldEntry: false,
  });
  const [allCompaniesList, setAllCompaniesList] = useState([]);
  const [allBranchesList, setAllBranchesList] = useState([]);
  const [allDepartmentsList, setAllDepartmentsList] = useState([]);
  const [allRolesList, setAllRolesList] = useState([]);
  const [allCategoriesList, setAllCategoriesList] = useState([]);
  const [allProductsList, setAllProductsList] = useState([]);
  const [allVendorsList, setAllVendorsList] = useState([]);
  const [allCustomersList, setAllCustomersList] = useState([]);
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;
  const companyId = adminLoggedIn.CompanyId;
  const branchId = adminLoggedIn.BranchId;
  const counterId = adminLoggedIn.CounterId;
  const employeeId = adminLoggedIn.EmployeeId;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const fetchAllCategory = async () => {
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
        const filteredCategories = data.filter((x) => x.VendorId !== 0);
        setAllCategories(filteredCategories);
        setAllCustomersList(data);
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

  const fetchAllVendors = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a149, {
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
        setAllVendorsList(data);
      } else {
        alert("Please Add Company First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllVendors();
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
        alert("Please Add Company First");
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
        alert("Please Add Branch First");
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
        // alert("Please Add Departments First");
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
        // alert("Please Add Roles First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllRoles();
  }, []);

  const fetchAllCategoriesList = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a125, {
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
        setAllCategoriesList(data);
      } else {
        alert("Please Add Category First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCategoriesList();
  }, []);

  const fetchAllProductsList = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a128, {
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
        setAllProductsList(data);
      } else {
        alert("Please Add Product First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllProductsList();
  }, []);

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    if (name == "DiamondValue") {
      setNewCategory({ ...newCategory, [name]: value.toUpperCase() });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };
  console.log(newCategory, "newCategory");
  console.log(newCategory, "newCategory");

  const addNewCategory = async (e) => {
    e.preventDefault();
    if (newCategory.VendorId !== "" && newCategory.CustomerId !== "") {
      setLoading(true);
      const formData = {
        ClientCode: clientCode,

        VendorId: newCategory.VendorId,
        CustomerId: newCategory.CustomerId,

        CompanyId: companyId ? companyId : 0,
        BranchId: branchId ? branchId : 0,
        CounterId: counterId ? counterId : 0,
        EmployeeId: employeeId ? employeeId : 0,

        OldEntry: false,

        ...(newCategory.OldEntry ? { Id: newCategory.Id } : {}),
      };
      console.log(formData, "formData to send");
      try {
        const response = await fetch(
          !newCategory.OldEntry ? a203 : a203,
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
          CustomerId: "",
          VendorId: "",
          CompanyId: 0,
          BranchId: 0,
          CounterId: 0,
          EmployeeId: 0,

          OldEntry: false,
        });
        if (data.Message) {
          // alert(data.message);
          setMessageType("error");
          setMessageToShow(data.Message);
          setShowError(true);
          setActive("AddNew");
        } else {
          setMessageType("success");
          setMessageToShow("Customer Vendor Paired Successfully");
          setShowError(true);
        }
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setMessageType("error");
      setMessageToShow("Please enter all details");
      setShowError(true);
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
          title={"Pair Customer Vendor"}
          companyName={"Loyalstring"}
          module={"Settings"}
          page={"Pair Customer Vendor"}
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
                <p>All Paired Customers and Vendors</p>
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
                <p>Pair Customer Vendor</p>
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
                    {/* <th>Category Name</th> */}
                    <th>Customer </th>
                    <th>Vendor </th>
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
                      {/* <td>{x.CategoryId}</td> */}
                      <td>{`${x.Id} - ${x.FirstName} ${x.LastName}`}</td>
                      <td>
                        {`${x.VendorId} - ${
                          allVendorsList.find(
                            (vendor) => vendor.Id === x.VendorId
                          )?.VendorName
                        }`}
                      </td>
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
              <p>Pair New Customer Vendor</p>
              <form onSubmit={addNewCategory}>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                    minHeight: "50px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <label>
                    Select Customer <sup>*</sup>
                  </label>
                  <select
                    name="CustomerId"
                    value={newCategory.CustomerId}
                    onChange={handleNewCategoryChange}
                    required="required"
                    // list="customerList"
                  >
                    <option value={""}>Select an Customer</option>
                    {allCustomersList.map((x, index) => (
                      <option value={x.Id} key={index}>
                        {`${x.FirstName} ${x.LastName} - ${x.Id}`}
                      </option>
                    ))}
                  </select>

                  <label>
                    Select Vendor <sup>*</sup>
                  </label>
                  <select
                    name="VendorId"
                    value={newCategory.VendorId}
                    onChange={handleNewCategoryChange}
                    required="required"
                    // list="vendorsList"
                  >
                    {/* <datalist id="vendorsList"> */}
                    <option value={""}>Select an Vendor</option>
                    {allVendorsList.map((x, index) => (
                      <option key={index} value={x.Id}>
                        {`${x.VendorName} - ${x.Id}`}
                        {/* {x.VendorName} */}
                      </option>
                    ))}
                  </select>
                  {/* </datalist> */}
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
