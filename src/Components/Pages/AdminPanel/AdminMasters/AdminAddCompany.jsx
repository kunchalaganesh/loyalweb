import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
import { a18, a35, a7, a95, a96, a97 } from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";

export default function AdminAddCompany() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [loading, setLoading] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    ClientCode: "",
    CompCode: "",
    CompName: "",
    CompShortName: "",
    CompOwnerName: "",
    CompRegisteredAddress: "",
    CompFactoryAddress: "",
    CompMobileNo: "",
    CompPhoneNo: "",
    CompRegistrationNo: "",
    CompYearOfEstablishment: "",
    CompEmail: "",
    CompGSTINNo: "",
    CompPanNo: "",
    CompAddharNo: "",
    CompLogo: "",
    CompWebsite: "",
    CompVATNo: "",
    CompCGSTNo: "",
    CompStatus: "",
    Town: "",
    Country: "",
    State: "",
    City: "",
    FinancialYear: "",
    BaseCurrency: "",
    TransactionSeries: "",
    CompLoginStatus: "",
    OldEntry: false,
  });
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
  console.log(allCategories);
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
    let formData = new FormData();

    formData.append("ClientCode", clientCode);
    formData.append("CompName", newCategory.CompName);
    formData.append("CompShortName", newCategory.CompShortName);
    formData.append("CompOwnerName", newCategory.CompOwnerName);
    formData.append("CompRegisteredAddress", newCategory.CompRegisteredAddress);
    formData.append("CompFactoryAddress", newCategory.CompFactoryAddress);
    formData.append("CompMobileNo", newCategory.CompMobileNo);
    formData.append("CompPhoneNo", newCategory.CompPhoneNo);
    formData.append("CompRegistrationNo", newCategory.CompRegistrationNo);
    formData.append(
      "CompYearOfEstablishment",
      newCategory.CompYearOfEstablishment
    );
    formData.append("CompEmail", newCategory.CompEmail);
    formData.append("CompGSTINNo", newCategory.CompGSTINNo);
    formData.append("CompPanNo", newCategory.CompPanNo);
    formData.append("CompAddharNo", newCategory.CompAddharNo);
    formData.append("CompLogo", newCategory.CompLogo);
    formData.append("CompWebsite", newCategory.CompWebsite);
    formData.append("CompVATNo", newCategory.CompVATNo);
    formData.append("CompCGSTNo", newCategory.CompCGSTNo);
    formData.append("CompStatus", "Active");
    formData.append("Town", newCategory.Town);
    formData.append("Country", newCategory.Country);
    formData.append("State", newCategory.State);
    formData.append("City", newCategory.City);
    formData.append("FinancialYear", newCategory.FinancialYear);
    formData.append("BaseCurrency", newCategory.BaseCurrency);
    formData.append("TransactionSeries", newCategory.TransactionSeries);
    formData.append("CompLoginStatus", newCategory.CompLoginStatus || "Active");
    formData.append(
      "CompCode",
      newCategory.OldEntry ? newCategory.CompCode : "0"
    );
    formData.append("Id", newCategory.OldEntry ? newCategory.Id : "0");

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const response = await fetch(
        !newCategory.OldEntry ? a97 : a96,
        // a96,
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: formData,
        }
      );
      const data = await response.json();
      fetchAllCategory();
      setActive("List");
      setNewCategory({
        ClientCode: "",
        CompCode: "",
        CompName: "",
        CompShortName: "",
        CompOwnerName: "",
        CompRegisteredAddress: "",
        CompFactoryAddress: "",
        CompMobileNo: "",
        CompPhoneNo: "",
        CompRegistrationNo: "",
        CompYearOfEstablishment: "",
        CompEmail: "",
        CompGSTINNo: "",
        CompPanNo: "",
        CompAddharNo: "",
        CompLogo: "",
        CompWebsite: "",
        CompVATNo: "",
        CompCGSTNo: "",
        CompStatus: "",
        Town: "",
        Country: "",
        State: "",
        City: "",
        FinancialYear: "",
        BaseCurrency: "",
        TransactionSeries: "",
        CompLoginStatus: "",
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
          title={"Add Company"}
          companyName={"Loyalstring"}
          module={"User Masters"}
          page={"Company"}
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
                <p>All Companies</p>
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
                <p>Add Company</p>
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
                    <th>Company Name</th>
                    <th>Company ShortName</th>
                    <th>Owner</th>
                    <th>Company Contact No</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allCategories.map((x, index) => (
                    <tr key={x.id}>
                      <td>
                        {editingId === x.id ? (
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
                      <td>{index + 1}</td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="name"
                            value={editedData.name || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.CompName
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="slug"
                            value={editedData.slug || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.CompShortName
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="label"
                            value={(editedData.label || "").toUpperCase()} // Convert to uppercase
                            onChange={handleInputChange}
                            maxLength="4"
                            onInput={(e) => {
                              let inputValue = e.target.value
                                .toUpperCase()
                                .replace(/[^A-Z0-9]/g, ""); // Convert to uppercase and remove characters other than A-Z and 0-9

                              // Ensure the input doesn't end with a number (note: this logic seems contradictory to allowing A-Z0-9, so you might reconsider this part based on your actual needs)
                              if (/^\D+$/.test(inputValue)) {
                                // Ensure the length is not more than 4 characters
                                if (inputValue.length <= 4) {
                                  e.target.value = inputValue;
                                } else {
                                  // If it exceeds 4 characters, truncate it
                                  e.target.value = inputValue.slice(0, 4);
                                }
                              } else {
                                // If it ends with a number, this block might not be needed since you're allowing numbers; consider removing this else block.
                                e.target.value = inputValue.slice(0, -1);
                              }

                              handleInputChange(e);
                            }}
                          />
                        ) : (
                          x.CompOwnerName
                        )}
                      </td>

                      <td>
                        {editingId === x.id ? (
                          <select
                            name="parentsCategory"
                            value={editedData.parentsCategory || ""}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select an option</option>
                            <option value="Metal">Metal</option>
                            <option value="Non-Metal">Non-Metal</option>
                          </select>
                        ) : (
                          x.CompMobileNo
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="description"
                            value={editedData.description || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.CompStatus
                        )}
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
              <p>Add New Company</p>
              <form onSubmit={addNewCategory}>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <label>
                    Company Name <sup>*</sup>
                  </label>
                  <input
                    name="CompName"
                    value={newCategory.CompName}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required
                  />

                  <label>
                    Company Short Name <sup>*</sup>
                  </label>
                  <input
                    name="CompShortName"
                    value={newCategory.CompShortName}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Owner Name</label>
                  <input
                    name="CompOwnerName"
                    value={newCategory.CompOwnerName}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Registered Address</label>
                  <input
                    name="CompRegisteredAddress"
                    value={newCategory.CompRegisteredAddress}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Factory Address</label>
                  <input
                    name="CompFactoryAddress"
                    value={newCategory.CompFactoryAddress}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>
                    Mobile No <sup>*</sup>
                  </label>
                  <input
                    name="CompMobileNo"
                    value={newCategory.CompMobileNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Phone No</label>
                  <input
                    name="CompPhoneNo"
                    value={newCategory.CompPhoneNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Registration No</label>
                  <input
                    name="CompRegistrationNo"
                    value={newCategory.CompRegistrationNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Year Of Establishment</label>
                  <input
                    name="CompYearOfEstablishment"
                    value={newCategory.CompYearOfEstablishment}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Email</label>
                  <input
                    name="CompEmail"
                    value={newCategory.CompEmail}
                    onChange={handleNewCategoryChange}
                    type="email"
                  />

                  <label>GSTIN No</label>
                  <input
                    name="CompGSTINNo"
                    value={newCategory.CompGSTINNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Pan No</label>
                  <input
                    name="CompPanNo"
                    value={newCategory.CompPanNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Aadhar No</label>
                  <input
                    name="CompAddharNo"
                    value={newCategory.CompAddharNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Company Logo</label>
                  <input
                    name="CompLogo"
                    value={newCategory.CompLogo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Website</label>
                  <input
                    name="CompWebsite"
                    value={newCategory.CompWebsite}
                    onChange={handleNewCategoryChange}
                    type="url"
                  />

                  <label>VAT No</label>
                  <input
                    name="CompVATNo"
                    value={newCategory.CompVATNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>CGST No</label>
                  <input
                    name="CompCGSTNo"
                    value={newCategory.CompCGSTNo}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Status</label>
                  <input
                    name="CompStatus"
                    value={newCategory.CompStatus}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>
                    Town <sup>*</sup>
                  </label>
                  <input
                    name="Town"
                    value={newCategory.Town}
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
                  />

                  <label>
                    State <sup>*</sup>
                  </label>
                  <input
                    name="State"
                    value={newCategory.State}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>
                    City <sup>*</sup>
                  </label>
                  <input
                    name="City"
                    value={newCategory.City}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>
                    Financial Year <sup>*</sup>
                  </label>
                  <input
                    name="FinancialYear"
                    value={newCategory.FinancialYear}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>
                    Base Currency <sup>*</sup>
                  </label>
                  <input
                    name="BaseCurrency"
                    value={newCategory.BaseCurrency}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>
                    Transaction Series <sup>*</sup>
                  </label>
                  <input
                    name="TransactionSeries"
                    value={newCategory.TransactionSeries}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />

                  <label>Login Status</label>
                  <input
                    name="CompLoginStatus"
                    value={newCategory.CompLoginStatus}
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
