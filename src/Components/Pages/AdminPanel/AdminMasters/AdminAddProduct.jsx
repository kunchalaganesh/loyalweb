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

export default function AdminAddProduct() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [loading, setLoading] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    CategoryId: "",
    ProductName: "",
    ShortName: "",
    Description: "",
    Slug: "",
    Status: "",

    OldEntry: false,
  });
  const [allCompaniesList, setAllCompaniesList] = useState([]);
  const [allBranchesList, setAllBranchesList] = useState([]);
  const [allDepartmentsList, setAllDepartmentsList] = useState([]);
  const [allRolesList, setAllRolesList] = useState([]);
  const [allCategoriesList, setAllCategoriesList] = useState([]);
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const fetchAllCategory = async () => {
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
        // alert("Please Add Company First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCategoriesList();
  }, []);

  console.log(allCategories, "allCategories");
  console.log(allCompaniesList, "allCompaniesList");
  console.log(allDepartmentsList, "allDepartmentsList");
  console.log(allBranchesList, "allBranchesList");
  console.log(allRolesList, "allRolesList");
  console.log(allCategoriesList, "allCategoriesList");

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setNewCategory({ ...newCategory, [name]: value });
  };
  console.log(newCategory, "newCategory");
  console.log(newCategory, "newCategory");

  const addNewCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      ClientCode: clientCode,
      CategoryId: newCategory.CategoryId,
      ProductName: newCategory.ProductName,
      ShortName: newCategory.ShortName,
      Description: newCategory.Description,
      Slug: newCategory.Slug,
      Status: "Active",
      EmployeeCode: employeeCode,

      ...(newCategory.OldEntry ? { Id: newCategory.Id } : {}),
    };
    console.log(formData, "formData to send");
    try {
      const response = await fetch(
        !newCategory.OldEntry ? a130 : a129,
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
        CategoryId: "",
        ProductName: "",
        ShortName: "",
        Description: "",
        Slug: "",
        Status: "",
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
        setMessageToShow("Category Added Successfully");
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
          title={"Add Product"}
          companyName={"Loyalstring"}
          module={"Product Masters"}
          page={"Product"}
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
                <p>All Products</p>
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
                <p>Add Product</p>
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
                    <th>Category Name</th>
                    <th>Product Name</th>
                    <th>Short Name</th>
                    <th>Description</th>
                    <th>Slug</th>
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
                      <td>{x.CategoryName}</td>
                      <td>{x.ProductName}</td>
                      <td>{x.ShortName}</td>
                      <td>{x.Description}</td>
                      <td>{x.Slug}</td>
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
              <p>Add New Product</p>
              <form onSubmit={addNewCategory}>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
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
                    Product Name<sup>*</sup>
                  </label>
                  <input
                    name="ProductName"
                    value={newCategory.ProductName}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>
                    Short Name<sup>*</sup>
                  </label>
                  <input
                    name="ShortName"
                    value={newCategory.ShortName}
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
                  <label>Slug</label>
                  <input
                    name="Slug"
                    value={newCategory.Slug}
                    onChange={handleNewCategoryChange}
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
