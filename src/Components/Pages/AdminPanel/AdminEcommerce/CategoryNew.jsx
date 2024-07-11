import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
import { a18, a20, a29, a30, a79 } from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";

export default function CategoryNew() {
  const [active, setActive] = useState("List");
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allBoxes, setAllBoxes] = useState([]);
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [newProduct, setNewProduct] = useState({
    metalName: "",
    productName: "",
    boxName: "",
    emptyWeight: "",
  });
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  let Entryby_Staff_id = parseInt(adminLoggedIn);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const fetchAllProducts = async () => {
    try {
      const response = await fetch(a20);
      const data = await response.json();
      setAllProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllCategories = async () => {
    try {
      const response = await fetch(a18);
      const data = await response.json();
      setAllCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllBoxes = async () => {
    try {
      const response = await fetch(a30);
      const data = await response.json();
      setAllBoxes(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  useEffect(() => {
    fetchAllCategories();
  }, []);
  useEffect(() => {
    fetchAllBoxes();
  }, []);
  console.log(allBoxes);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (id) => {
    setEditingId(id);
    // Find the item with the selected ID and set its data in the state
    const selectedItem = allBoxes.find((x) => x.id === id);
    setEditedData(selectedItem);
  };

  const handleSaveClick = () => {
    // handleSubmit();
    // Save the edited data to your state or send it to an API
    // console.log("Edited Data:", editedData);
    // setEditingId(null); // Exit editing mode
    handleSubmit();
  };
  const handleSubmit = async () => {
    const formData = {
      Id: editingId,
      ...editedData,
      // MetalName: editedData.metalName,
      // ProductName: editedData.productName,
      // BoxName: editedData.boxName,
      // EmptyWeight: editedData.emptyWeight,
    };
    try {
      const response = await fetch(a79, {
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
      } else {
        setMessageType("success");
        setMessageToShow("Updated successfully");
        setShowError(true);
      }
      console.log(data, "updated");
      setEditingId(null);
      fetchAllBoxes();
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setEditedData({ ...editedData, [name]: value });
  };

  const handleNewBoxChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setNewProduct({ ...newProduct, [name]: value });
  };
  const addNewBox = async (e) => {
    e.preventDefault();
    const formData = {
      MetalName: newProduct.metalName,
      ProductName: newProduct.productName,
      BoxName: newProduct.boxName,
      EmptyWeight: newProduct.emptyWeight,
    };
    try {
      const response = await fetch(a29, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      fetchAllBoxes();
      setActive("List");
      setNewProduct({
        metalName: "",
        productName: "",
        boxName: "",
        emptyWeight: "",
      });
      if (data.message) {
        // alert(data.message);
        setMessageType("error");
        setMessageToShow(data.message);
        setShowError(true);
        setActive("AddNew");
      } else {
        setMessageType("success");
        setMessageToShow("Box Added Successfully");
        setShowError(true);
      }
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
  console.log(newProduct, "newProduct");

  const [count, setCount] = useState(10);

  return (
    <div>
      <AdminHeading />
      <div className="adminMainBodyBox">
        {showError ? (
          <AlertMessage message={messageToShow} type={messageType} />
        ) : null}
        <AdminBreadCrump
          title={"Add category"}
          companyName={"Loyalstring"}
          module={"E-Commerce"}
          page={"category new"}
        />
        <div className="adminAddCategoryMainBox">
          <div className="adminAddCategoryInnerBox">
            <h1>Counter</h1>
            <button
              onClick={() => {
                setCount(count + 1);
              }}
            >
              +
            </button>
            <p>{count}</p>
            <button
              onClick={() => {
                setCount(count - 1);
              }}
            >
              -
            </button>
            {/* <div className="adminAddCategoryInnerBoxTitlesBox">
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
                <p>All Boxes</p>
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
                  <RiPlayListAddLine />
                </div>
                <p>Add Box</p>
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
                    <th>Box Name</th>
                    <th>Category</th>
                    <th>Product Name</th>
                    <th>Empty Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {allBoxes.map((x) => (
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
                            name="boxName"
                            value={editedData.boxName || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.boxName
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <select
                            required="required"
                            name="metalName"
                            value={editedData.metalName || ""}
                            onChange={handleInputChange}
                          >
                            <option value="">Select an option</option>
                            {allCategories.map((x) => {
                              return (
                                <option value={x.category}>{x.name}</option>
                              );
                            })}
                          </select>
                        ) : (
                          x.metalName
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="productName"
                            value={editedData.productName || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.productName
                        )}
                      </td>
                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="emptyWeight"
                            value={editedData.emptyWeight || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.emptyWeight
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
              <p>Add New Box</p>
              <form onSubmit={addNewBox}>
                <div className="adminCategoryAddCategoryInnerBox">
                  <label>Category</label>
                  <select
                    required="required"
                    name="metalName"
                    value={newProduct.metalName}
                    onChange={handleNewBoxChange}
                  >
                    <option value="">Select an option</option>
                    {allCategories.map((x) => {
                      return <option value={x.category}>{x.name}</option>;
                    })}
                  </select>
                  <label>Product</label>
                  <select
                    id="product"
                    name="productName"
                    required="required"
                    value={newProduct.productName || ""}
                    onChange={handleNewBoxChange}
                  >
                    <option value="">Select an option</option>
                    {allProducts.map((product) => (
                      <option
                        key={product.productTitle}
                        value={product.productTitle}
                      >
                        {product.productTitle}
                      </option>
                    ))}
                  </select>
                  <label>Box Name</label>
                  <input
                    name="boxName"
                    value={newProduct.boxName}
                    onChange={handleNewBoxChange}
                    type="text"
                    required="required"
                  />
                  <label>Empty Weight</label>
                  <input
                    name="emptyWeight"
                    value={newProduct.emptyWeight}
                    onChange={handleNewBoxChange}
                    type="text"
                    required="required"
                  />

                  <button type="submit">Submit</button>
                </div>
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
