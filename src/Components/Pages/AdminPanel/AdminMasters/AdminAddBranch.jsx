import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
import {
  a100,
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

export default function AdminAddBranch() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [loading, setLoading] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    BranchCode: "",
    CompId: "",
    BranchName: "",
    BranchType: "",
    BranchHead: "",
    BranchAddress: "",
    PhoneNumber: "",
    MobileNumber: "",
    FaxNumber: "",
    Country: "",
    Town: "",
    State: "",
    City: "",
    PostalCode: "",
    GSTIN: "",
    BranchEmailId: "",
    BranchStatus: "",
    FinancialYear: "",
    BranchLoginStatus: "",
    OldEntry: false,
  });
  const [allCompaniesList, setAllCompaniesList] = useState([]);
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
  console.log(allCategories, "allCategories");
  console.log(allCompaniesList, "allCompaniesList");
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (id) => {
    setEditingId(id);
    // Find the item with the selected ID and set its data in the state
    const selectedItem = allCategories.find((x) => x.id === id);
    setEditedData(selectedItem);
  };

  const handleSaveClick = () => {
    handleSubmit();
    // Save the edited data to your state or send it to an API
    console.log("Edited Data:", editedData);
    setEditingId(null); // Exit editing mode
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(a35, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });
      const data = await response.json();

      console.log(data, "updated");
      if (data.message) {
        // alert(data.message);
        setMessageType("error");
        setMessageToShow(data.message);
        setShowError(true);
      } else {
        setMessageType("success");
        setMessageToShow("Updated successfully");
        setShowError(true);
      }
      fetchAllCategory();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setEditedData({ ...editedData, [name]: value });
  };

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
      BranchCode: newCategory.BranchCode,
      ClientCode: clientCode,
      CompId: newCategory.CompId,
      BranchName: newCategory.BranchName,
      BranchType: newCategory.BranchType,
      BranchHead: newCategory.BranchHead,
      BranchAddress: newCategory.BranchAddress,
      PhoneNumber: newCategory.PhoneNumber,
      MobileNumber: newCategory.MobileNumber,
      FaxNumber: newCategory.FaxNumber,
      Country: newCategory.Country,
      Town: newCategory.Town,
      State: newCategory.State,
      City: newCategory.City,
      PostalCode: newCategory.PostalCode,
      GSTIN: newCategory.GSTIN,
      BranchEmailId: newCategory.BranchEmailId,
      BranchStatus: "Active",
      FinancialYear: newCategory.FinancialYear,
      BranchLoginStatus: "Active",
      ...(newCategory.OldEntry ? { Id: newCategory.Id } : {}),
    };
    console.log(formData, "formData to send");
    try {
      const response = await fetch(
        !newCategory.OldEntry ? a100 : a99,
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
        BranchCode: "",
        CompId: "",
        BranchName: "",
        BranchType: "",
        BranchHead: "",
        BranchAddress: "",
        PhoneNumber: "",
        MobileNumber: "",
        FaxNumber: "",
        Country: "",
        Town: "",
        State: "",
        City: "",
        PostalCode: "",
        GSTIN: "",
        BranchEmailId: "",
        BranchStatus: "",
        FinancialYear: "",
        BranchLoginStatus: "",
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
          title={"Add Branch"}
          companyName={"Loyalstring"}
          module={"User Masters"}
          page={"Branch"}
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
                <p>All Branches</p>
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
                <p>Add Branch</p>
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
                    <th>Branch Name</th>
                    <th>Branch Type</th>
                    <th>Branch Head</th>
                    <th>Mobile Number</th>
                    <th>Branch Status</th>
                    <th>Branch Login Status</th>
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
                      <td>{x.BranchName}</td>
                      <td>{x.BranchType}</td>
                      <td>{x.BranchHead}</td>
                      <td>{x.MobileNumber}</td>
                      <td>{x.BranchStatus}</td>
                      <td>{x.BranchLoginStatus}</td>
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
              <p>Add New Branch</p>
              <form onSubmit={addNewCategory}>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <label>Branch Code</label>
                  <input
                    style={{ cursor: "not-allowed" }}
                    name="BranchCode"
                    value={newCategory.BranchCode}
                    readOnly
                    // onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>
                    Company ID <sup>*</sup>
                  </label>
                  <select
                    name="CompId"
                    value={newCategory.CompId}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    {allCompaniesList.map((x) => {
                      return (
                        <>
                          <option value={""}>Select an option</option>;
                          <option value={x.Id}>{x.CompName}</option>;
                        </>
                      );
                    })}
                  </select>
                  {/* <input
                    name="CompId"
                    value={newCategory.CompId}
                    onChange={handleNewCategoryChange}
                    type="text"
                  /> */}

                  <label>
                    Branch Name <sup>*</sup>
                  </label>
                  <input
                    name="BranchName"
                    value={newCategory.BranchName}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />

                  <label>
                    Branch Type <sup>*</sup>
                  </label>
                  <select
                    name="BranchType"
                    value={newCategory.BranchType}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  >
                    <option value={""}>Select an option</option>;
                    <option value={"Showroom"}>Showroom</option>
                    <option value={"Warehouse"}>Warehouse</option>
                    <option value={"Exhibition"}>Exhibition</option>
                  </select>

                  <label>Branch Head</label>
                  <input
                    name="BranchHead"
                    value={newCategory.BranchHead}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Branch Address</label>
                  <input
                    name="BranchAddress"
                    value={newCategory.BranchAddress}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Phone Number </label>
                  <input
                    name="PhoneNumber"
                    value={newCategory.PhoneNumber}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Mobile Number</label>
                  <input
                    name="MobileNumber"
                    value={newCategory.MobileNumber}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Fax Number</label>
                  <input
                    name="FaxNumber"
                    value={newCategory.FaxNumber}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>
                    Country <sup>*</sup>
                  </label>
                  <input
                    name="Country"
                    value={newCategory.Country}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />

                  <label>Town</label>
                  <input
                    name="Town"
                    value={newCategory.Town}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>State</label>
                  <input
                    name="State"
                    value={newCategory.State}
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

                  <label>Postal Code</label>
                  <input
                    name="PostalCode"
                    value={newCategory.PostalCode}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>GSTIN</label>
                  <input
                    name="GSTIN"
                    value={newCategory.GSTIN}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Branch Email ID</label>
                  <input
                    name="BranchEmailId"
                    value={newCategory.BranchEmailId}
                    onChange={handleNewCategoryChange}
                    type="email"
                  />

                  {/* <label>Branch Status</label>
                  <input
                    name="BranchStatus"
                    value={newCategory.BranchStatus}
                    onChange={handleNewCategoryChange}
                    type="text"
                  /> */}

                  <label>Financial Year</label>
                  <input
                    name="FinancialYear"
                    value={newCategory.FinancialYear}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  {/* <label>Branch Login Status</label>
                  <input
                    name="BranchLoginStatus"
                    value={newCategory.BranchLoginStatus}
                    onChange={handleNewCategoryChange}
                    type="text"
                  /> */}
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
