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
  a18,
  a191,
  a192,
  a193,
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
export default function AdminAddDiamondSizeWeightRate() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [loading, setLoading] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    DiamondSize: "0",
    DiamondWeight: "0",
    DiamondPurchaseRate: "0",
    DiamondSellRate: "0",
    DiamondMargin: "0",
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
    const response = await fetch(a191, {
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

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;

    if (name === "DiamondMargin") {
      const diamondPurchaseRate = parseFloat(
        newCategory.DiamondPurchaseRate || 0
      );
      const diamondMargin = parseFloat(value || 0);
      const diamondSellRate = (
        diamondPurchaseRate *
        (1 + diamondMargin / 100)
      ).toFixed(2);

      setNewCategory({
        ...newCategory,
        [name]: value,
        DiamondSellRate: diamondSellRate,
      });
    } else if (name === "DiamondPurchaseRate") {
      const diamondPurchaseRate = parseFloat(value || 0);
      const diamondMargin = parseFloat(newCategory.DiamondMargin || 0);
      const diamondSellRate = (
        diamondPurchaseRate *
        (1 + diamondMargin / 100)
      ).toFixed(2);

      setNewCategory({
        ...newCategory,
        [name]: value,
        DiamondSellRate: diamondSellRate,
      });
    } else if (name === "DiamondSellRate") {
      const diamondSellRate = parseFloat(value || 0);
      const diamondPurchaseRate = parseFloat(
        newCategory.DiamondPurchaseRate || 0
      );

      if (diamondPurchaseRate !== 0) {
        const diamondMargin = (
          (diamondSellRate / diamondPurchaseRate - 1) *
          100
        ).toFixed(2);

        setNewCategory({
          ...newCategory,
          [name]: value,
          DiamondMargin: diamondMargin,
        });
      } else {
        setNewCategory({
          ...newCategory,
          [name]: value,
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
      DiamondSize: newCategory.DiamondSize,
      DiamondWeight: newCategory.DiamondWeight,
      DiamondPurchaseRate: newCategory.DiamondPurchaseRate,
      DiamondSellRate: newCategory.DiamondSellRate,
      DiamondMargin: newCategory.DiamondMargin,
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
        !newCategory.OldEntry ? a192 : a193,
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
        DiamondSize: "0",
        DiamondWeight: "0",
        DiamondPurchaseRate: "0",
        DiamondSellRate: "0",
        DiamondMargin: "0",
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
        setMessageToShow("Diamond Size/Weight/Rate Added Successfully");
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
          title={"Add Diamond Size/Weight/Rate"}
          companyName={"Loyalstring"}
          module={"Product Masters"}
          page={"Diamond Size/Weight/Rate"}
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
                <p>All Diamond Size/Weight/Rate</p>
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
                <p>Add Diamond Size/Weight/Rate</p>
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
                    <th>Diamond Size</th>
                    <th>Diamond Weight</th>
                    <th>Diamond Purchase Rate</th>
                    <th>Diamond Sell Rate</th>
                    <th>Diamond Margin</th>
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
                      <td>{x.DiamondSize}</td>
                      <td>{x.DiamondWeight}</td>
                      <td>{x.DiamondPurchaseRate}</td>
                      <td>{x.DiamondSellRate}</td>
                      <td>{x.DiamondMargin}</td>
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
              <p>Add New Diamond Size/Weight/Rate</p>
              <form onSubmit={addNewCategory}>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <label>
                    Diamond Size <sup>*</sup>
                  </label>
                  <input
                    name="DiamondSize"
                    value={newCategory.DiamondSize}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>
                    Diamond Weight <sup>*</sup>
                  </label>
                  <input
                    name="DiamondWeight"
                    value={newCategory.DiamondWeight}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>
                    Diamond Purchase Rate <sup>*</sup>
                  </label>
                  <input
                    name="DiamondPurchaseRate"
                    value={newCategory.DiamondPurchaseRate}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>
                    Diamond Margin <sup>*</sup>
                  </label>
                  <input
                    name="DiamondMargin"
                    value={newCategory.DiamondMargin}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>
                    Diamond Sell Rate <sup>*</sup>
                  </label>
                  <input
                    name="DiamondSellRate"
                    value={newCategory.DiamondSellRate}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
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
