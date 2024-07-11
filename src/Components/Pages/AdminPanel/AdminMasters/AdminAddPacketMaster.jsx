import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import {
  a104,
  a107,
  a125,
  a128,
  a138,
  a139,
  a163,
  a224,
  a225,
  a226,
  a95,
  a98,
} from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";
export default function AdminAddPacketMaster() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [loading, setLoading] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    CategoryId: "",
    ProductId: "",
    SKUId: "",
    PacketName: "",
    EmptyWeight: "",
    Description: "",
    CompanyId: "",
    BranchId: "",
    EmployeeId: "",
    Status: "",

    OldEntry: false,
  });
  const [allCompaniesList, setAllCompaniesList] = useState([]);
  const [allBranchesList, setAllBranchesList] = useState([]);
  const [allDepartmentsList, setAllDepartmentsList] = useState([]);
  const [allRolesList, setAllRolesList] = useState([]);
  const [allCategoriesList, setAllCategoriesList] = useState([]);
  const [allProductsList, setAllProductsList] = useState([]);
  const [allSkuList, setAllSkuList] = useState([]);
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;
  const employeeId = adminLoggedIn.EmployeeId;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const fetchAllCategory = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a226, {
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
  const fetchAllSkuList = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a163, {
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
        setAllSkuList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllSkuList();
  }, []);

  console.log(allCategories, "allCategories");
  console.log(allCompaniesList, "allCompaniesList");
  console.log(allDepartmentsList, "allDepartmentsList");
  console.log(allBranchesList, "allBranchesList");
  console.log(allRolesList, "allRolesList");
  console.log(allCategoriesList, "allCategoriesList");

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    if (name == "SKUId") {
      if (value !== "") {
        const selectedSku = allSkuList.filter(
          (x) => x.Id == parseInt(value)
        )[0];
        setNewCategory({
          ...newCategory,
          [name]: parseInt(value),
          CategoryId: `${selectedSku.CategoryId}`,
          ProductId: selectedSku.ProductId,
        });
      } else {
        setNewCategory({
          ...newCategory,
          [name]: "",
          CategoryId: "",
          ProductId: "",
        });
      }
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };
  console.log(newCategory, "newCategory");
  console.log(newCategory, "newCategory");

  const addNewCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      ClientCode: clientCode,
      CategoryId: parseInt(newCategory.CategoryId),
      ProductId: parseInt(newCategory.ProductId),
      SKUId: newCategory.SKUId !== "" ? parseInt(newCategory.SKUId) : 0,
      PacketName: newCategory.PacketName,
      EmptyWeight: newCategory.EmptyWeight,
      Description: newCategory.Description,
      CompanyId: parseInt(newCategory.CompanyId),
      BranchId: parseInt(newCategory.BranchId),
      Status: newCategory.Status,
      EmployeeId: employeeId || 0,

      ...(newCategory.OldEntry ? { Id: newCategory.Id } : {}),
    };
    console.log(formData, "formData to send");
    try {
      const response = await fetch(
        !newCategory.OldEntry ? a224 : a225,
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
      console.log(data);
      fetchAllCategory();
      setActive("List");
      setNewCategory({
        CategoryId: "",
        ProductId: "",
        SKUId: "",
        PacketName: "",
        EmptyWeight: "",
        Description: "",
        CompanyId: "",
        BranchId: "",
        EmployeeId: "",
        Status: "",
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
        setMessageToShow("Box Added Successfully");
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
          title={"Add Packet"}
          companyName={"Loyalstring"}
          module={"Product Masters"}
          page={"Packet"}
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
                <p>All Packets</p>
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
                <p>Add Packet</p>
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
                    <th>Packet Name</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Product</th>
                    <th>Empty Weight</th>
                    {/* <th>Product Id</th>
                      <th>Company Id</th>
                      <th>Branch Id</th> */}
                    <th>Description</th>
                    {/* <th>Status</th> */}
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
                      <td>{x.PacketName}</td>
                      <td>{x.StockKeepingUnit}</td>
                      <td>{x.CategoryName}</td>
                      <td>{x.ProductName}</td>
                      <td>{x.EmptyWeight}</td>
                      {/* <td>{x.ProductId}</td>
                        <td>{x.CompanyId}</td>
                        <td>{x.BranchId}</td> */}
                      <td>{x.Description}</td>
                      {/* <td>{x.Status}</td> */}
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
              <p>Add New Packet</p>
              <form onSubmit={addNewCategory}>
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
                    name="CompanyId"
                    value={newCategory.CompanyId}
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
                  </select>{" "}
                  <label>
                    Branch <sup>*</sup>{" "}
                  </label>
                  <select
                    name="BranchId"
                    value={newCategory.BranchId}
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
                  <label>SKU</label>
                  <select
                    name="SKUId"
                    value={newCategory.SKUId}
                    onChange={handleNewCategoryChange}
                    type="text"
                  >
                    <option value={""}>Select an option</option>;
                    {allSkuList.map((x) => {
                      return (
                        <>
                          <option value={x.Id}>{x.StockKeepingUnit}</option>;
                        </>
                      );
                    })}
                  </select>
                  <label>
                    Category <sup>*</sup>
                  </label>
                  <select
                    name="CategoryId"
                    value={newCategory.CategoryId}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={""}>Select an option</option>;
                    {allCategoriesList.map((x) => {
                      return (
                        <>
                          <option value={x.Id}>{x.CategoryName}</option>;
                        </>
                      );
                    })}
                  </select>{" "}
                  <label>
                    Product<sup>*</sup>
                  </label>
                  <select
                    name="ProductId"
                    value={newCategory.ProductId}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={""}>Select an option</option>;
                    {allProductsList.map((x) => {
                      return (
                        <>
                          <option value={x.Id}>{x.ProductName}</option>;
                        </>
                      );
                    })}
                  </select>{" "}
                  <label>
                    Packet Name<sup>*</sup>
                  </label>
                  <input
                    name="PacketName"
                    value={newCategory.PacketName}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>
                    Empty Weight<sup>*</sup>
                  </label>
                  <input
                    name="EmptyWeight"
                    value={newCategory.EmptyWeight}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>Description</label>
                  <input
                    name="Description"
                    value={newCategory.Description}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label htmlFor="Status">
                    Status <sup>*</sup>
                  </label>
                  <select
                    name="Status"
                    required="required"
                    value={newCategory.Status}
                    onChange={handleNewCategoryChange}
                  >
                    <option value={""}>Select Status</option>
                    <option value={"Active"}>Active</option>
                    <option value={"InActive"}>InActive</option>
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
