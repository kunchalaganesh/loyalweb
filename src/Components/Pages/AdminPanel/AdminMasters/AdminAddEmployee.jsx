import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
import { a18, a35, a58, a59, a60, a7 } from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";

export default function AdminAddEmployee() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");

  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
  });
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  let Entryby_Staff_id = parseInt(adminLoggedIn);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const fetchAllCategory = async () => {
    try {
      const response = await fetch(a59);
      const data = await response.json();
      setAllCategories(data.data);
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

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (
      editedData.firstname !== "" &&
      editedData.mobile !== "" &&
      editedData.mobile.length >= 10 &&
      editedData.role !== ""
    ) {
      handleSubmit();
      // Save the edited data to your state or send it to an API
      console.log("Edited Data:", editedData);
      setEditingId(null); // Exit editing mode
    } else {
      alert(
        "Name /Mobile /Role could not be blank and mobile length should be atleast 10 digit"
      );
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(a60, {
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
  const addNewCategory = async (e) => {
    e.preventDefault();
    const formData = {
      firstname: newCategory.firstname,
      lastname: newCategory.lastname,
      role: newCategory.role,
      email: newCategory.email,
      mobile: newCategory.mobile,
    };
    if (newCategory.mobile.length >= 10) {
      try {
        const response = await fetch(a58, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.message) {
          // alert(data.message);
          setMessageType("error");
          setMessageToShow(data.message);
          setShowError(true);
          setActive("AddNew");
          console.log(data.message);
        } else {
          setMessageType("success");
          setMessageToShow("Employee Added Successfully");
          setShowError(true);
        }
        fetchAllCategory();
        setActive("List");
        setNewCategory({
          firstname: "",
          lastname: "",
          email: "",
          mobile: "",
        });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Mobile No should be atleast 10 digits");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  }, [showError]);
  return (
    <div>
      <AdminHeading />
      <div className="adminMainBodyBox">
        {showError ? (
          <AlertMessage message={messageToShow} type={messageType} />
        ) : null}
        <AdminBreadCrump
          title={"Add Employee"}
          companyName={"Loyalstring"}
          module={"Masters"}
          page={"Employee"}
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
                onClick={() => setActive("AddNew")}
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
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {allCategories.map((x) => (
                    <tr key={x.id}>
                      <td>
                        {editingId === x.id ? (
                          <button
                            type="submit"
                            className="adminAddCategorySaveButton"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="adminAddCategoryEditButton"
                            onClick={() => handleEditClick(x.id)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                      <td>{x.id}</td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            required="required"
                            name="firstname"
                            value={editedData.firstname || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.firstname
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="lastname"
                            value={editedData.lastname || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.lastname
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <select
                            name="role"
                            required="required"
                            value={editedData.role || ""}
                            onChange={handleInputChange}
                          >
                            <option value="">Select an option</option>
                            <option value="Employee">Employee</option>
                            <option value="Salesman">Salesman</option>
                            <option value="Cashier">Cashier</option>
                          </select>
                        ) : (
                          x.role
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="email"
                            value={editedData.email || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.email
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            required="required"
                            name="mobile"
                            value={editedData.mobile || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.mobile
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
              <p>Add New Employee</p>
              <form onSubmit={addNewCategory}>
                <div className="adminCategoryAddCategoryInnerBox">
                  <label>
                    First Name <sup> *</sup>
                  </label>
                  <input
                    name="firstname"
                    value={newCategory.firstname}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>Last Name</label>
                  <input
                    name="lastname"
                    value={newCategory.lastname}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Email</label>
                  <input
                    name="email"
                    value={newCategory.email}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>
                    Mobile <sup> *</sup>
                  </label>
                  <input
                    name="mobile"
                    value={newCategory.mobile}
                    onChange={handleNewCategoryChange}
                    type="text"
                    required="required"
                  />
                  <label>
                    Role <sup> *</sup>
                  </label>
                  <select
                    name="role"
                    required="required"
                    value={newCategory.role}
                    onChange={handleNewCategoryChange}
                    type="text"
                  >
                    <option value="">Select an option</option>
                    <option value="Employee">Employee</option>
                    <option value="Salesman">Salesman</option>
                    <option value="Cashier">Cashier</option>
                  </select>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
