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
  a140,
  a141,
  a142,
  a143,
  a144,
  a145,
  a146,
  a147,
  a148,
  a18,
  a182,
  a183,
  a184,
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

export default function AdminAddDiamond() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [loading, setLoading] = useState(false);

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;

  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    DiamondName: "",
    DiamondWeight: 0,
    DiamondRate: 0,
    DiamondPieces: 0,
    DiamondClarity: "",
    DiamondColour: "",
    DiamondCut: "",
    DiamondShape: "",
    DiamondSize: 0,
    Certificate: "",
    SettingType: "",
    DiamondAmount: 0,
    DiamondPurchaseAmt: 0,
    Description: "",
    ClientCode: clientCode,

    OldEntry: false,
  });
  const [allCompaniesList, setAllCompaniesList] = useState([]);
  const [allBranchesList, setAllBranchesList] = useState([]);
  const [allDepartmentsList, setAllDepartmentsList] = useState([]);
  const [allRolesList, setAllRolesList] = useState([]);
  const [allCategoriesList, setAllCategoriesList] = useState([]);
  const [allProductsList, setAllProductsList] = useState([]);
  const [diamondClarity, setDiamondClarity] = useState([
    "VVS",
    "VS",
    "VSSI",
    "SI",
    "I1",
    "Other",
  ]);
  const [diamondColour, setDiamondColour] = useState([
    "EF",
    "FG",
    "GF",
    "HI",
    "IG",
  ]);
  const [diamondShape, setDiamondShape] = useState([
    "Round",
    "Princess",
    "Cushion",
    "Oval",
    "Marquise",
    "Pear",
    "Radiant",
    "Asscher",
    "Emerald",
    "Heart",
    "Trillion",
    "Triangle",
  ]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const fetchAllCategory = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a182, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data, "data,");
    try {
      if (data && data.length > 0) {
        setAllCategories(data);
        // Updates for clarity
        const updatedClarity = new Set([...diamondClarity]);
        const updatedColour = new Set([...diamondColour]);
        const updatedShape = new Set([...diamondShape]);
        data.forEach((item) => {
          if (item.DiamondClarity) {
            updatedClarity.add(item.DiamondClarity);
          }
          if (item.DiamondColour) {
            updatedColour.add(item.DiamondColour);
          }
          if (item.DiamondShape) {
            updatedShape.add(item.DiamondShape);
          }
        });
        setDiamondClarity([...updatedClarity]);
        setDiamondColour([...updatedColour]);
        setDiamondShape([...updatedShape]);
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
        // alert("Please Add Branch First");
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
        // alert("Please Add Department First");
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
        // alert("Please Add Role First");
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
        // alert("Please Add Categories First");
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
        // alert("Please Add Product First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllProductsList();
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
      DiamondName: newCategory.DiamondName,
      DiamondWeight: newCategory.DiamondWeight,
      DiamondPieces: newCategory.DiamondPieces,
      DiamondRate: newCategory.DiamondRate,
      DiamondClarity: newCategory.DiamondClarity,
      DiamondColour: newCategory.DiamondColour,
      DiamondCut: newCategory.DiamondCut,
      DiamondShape: newCategory.DiamondShape,
      DiamondSize: newCategory.DiamondSize,
      Certificate: newCategory.Certificate,
      SettingType: newCategory.SettingType,
      DiamondAmount: newCategory.DiamondAmount,
      DiamondPurchaseAmt: newCategory.DiamondPurchaseAmt,
      Description: newCategory.Description,
      ClientCode: clientCode,
      EmployeeCode: newCategory.EmployeeCode ? newCategory.EmployeeCode : 0,

      ...(newCategory.OldEntry ? { Id: newCategory.Id } : {}),
    };
    console.log(formData, "formData to send");
    try {
      const response = await fetch(
        !newCategory.OldEntry ? a183 : a184,
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
        DiamondName: "",
        DiamondWeight: 0,
        DiamondRate: 0,
        DiamondPieces: 0,
        DiamondClarity: "",
        DiamondColour: "",
        DiamondCut: "",
        DiamondShape: "",
        DiamondSize: 0,
        Certificate: "",
        SettingType: "",
        DiamondAmount: 0,
        DiamondPurchaseAmt: 0,
        Description: "",
        ClientCode: clientCode,

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
        setMessageToShow("Occassion Added Successfully");
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
          title={"Add Diamond"}
          companyName={"Loyalstring"}
          module={"Product Masters"}
          page={"Diamond"}
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
                <p>All Diamonds</p>
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
                <p>Add Diamond</p>
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
                    {/* <th>Product Id</th> */}
                    <th>Edit</th>
                    <th>Diamond Name</th>
                    <th>Diamond Weight</th>
                    <th>Diamond Pieces</th>
                    <th>Diamond Rate</th>
                    <th>Diamond Amount</th>
                    <th>Description</th>
                    {/* <th>Client Code</th>
                      <th>Employee Code</th> */}
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
                      {/* <td>{x.ProductId}</td> */}
                      <td>{x.DiamondName}</td>
                      <td>{x.DiamondWeight}</td>
                      <td>{x.DiamondPieces}</td>
                      <td>{x.DiamondRate}</td>
                      <td>{x.DiamondAmount}</td>
                      <td>{x.Description}</td>
                      {/* <td>{x.ClientCode}</td>
                        <td>{x.EmployeeCode}</td> */}
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
              <p>Add New Diamond</p>
              <form onSubmit={addNewCategory}>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <label>
                    Diamond Name<sup>*</sup>
                  </label>
                  <input
                    name="DiamondName"
                    value={newCategory.DiamondName}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />

                  <label>
                    Diamond Weight<sup>*</sup>
                  </label>
                  <input
                    name="DiamondWeight"
                    value={newCategory.DiamondWeight}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />

                  <label>
                    Diamond Pieces<sup>*</sup>
                  </label>
                  <input
                    name="DiamondPieces"
                    value={newCategory.DiamondPieces}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />

                  <label>Diamond Rate</label>
                  <input
                    name="DiamondRate"
                    value={newCategory.DiamondRate}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />
                  <label>Diamond Clarity</label>
                  <input
                    name="DiamondClarity"
                    value={newCategory.DiamondClarity}
                    onChange={handleNewCategoryChange}
                    type="text"
                    list="diamondClarityList"
                    // required="required"
                  />
                  <datalist id="diamondClarityList">
                    {diamondClarity.map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </datalist>
                  <label>Diamond Colour</label>
                  <input
                    name="DiamondColour"
                    value={newCategory.DiamondColour}
                    onChange={handleNewCategoryChange}
                    type="text"
                    list="diamondColourList"
                    // required="required"
                  />
                  <datalist id="diamondColourList">
                    {diamondColour.map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </datalist>
                  <label>Diamond Cut</label>
                  <input
                    name="DiamondCut"
                    value={newCategory.DiamondCut}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />
                  <label>Diamond Shape</label>
                  <input
                    name="DiamondShape"
                    value={newCategory.DiamondShape}
                    onChange={handleNewCategoryChange}
                    type="text"
                    list="diamondShapeList"
                    // required="required"
                  />
                  <datalist id="diamondShapeList">
                    {diamondShape.map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </datalist>
                  <label>Diamond Size</label>
                  <input
                    name="DiamondSize"
                    value={newCategory.DiamondSize}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />
                  <label>Certificate</label>
                  <input
                    name="Certificate"
                    value={newCategory.Certificate}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />
                  <label>Setting Type</label>
                  <input
                    name="SettingType"
                    value={newCategory.SettingType}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />
                  <label>Diamond Amount</label>
                  <input
                    name="DiamondAmount"
                    value={newCategory.DiamondAmount}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />
                  <label>Diamond Purchase Amt</label>
                  <input
                    name="DiamondPurchaseAmt"
                    value={newCategory.DiamondPurchaseAmt}
                    onChange={handleNewCategoryChange}
                    type="text"
                    // required="required"
                  />

                  <label>Description</label>
                  <input
                    name="Description"
                    value={newCategory.Description}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  {/*    <label htmlFor="ClientCode">
                      Client Code<sup>*</sup>
                    </label>
                    <input
                      name="ClientCode"
                      value={newCategory.ClientCode}
                      onChange={handleNewCategoryChange}
                      type="text"
                      required
                    />
  
                    <label htmlFor="EmployeeCode">
                      Employee Code<sup>*</sup>
                    </label>
                    <input
                      name="EmployeeCode"
                      value={newCategory.EmployeeCode}
                      onChange={handleNewCategoryChange}
                      type="text"
                    required 
                    />*/}
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
