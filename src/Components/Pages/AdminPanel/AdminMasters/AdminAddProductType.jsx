import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
import { a18, a20, a21, a36 } from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";

export default function AdminAddProductType() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [loading, setLoading] = useState(false);

  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    category: "",
    productTitle: "",
    slug: "",
    label: "",
    hsnCode: "",
    description: "",
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
  useEffect(() => {
    fetchAllProducts();
  }, []);
  useEffect(() => {
    fetchAllCategories();
  }, []);
  console.log(allProducts);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (id) => {
    setEditingId(id);
    // Find the item with the selected ID and set its data in the state
    const selectedItem = allProducts.find((x) => x.id === id);
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
      const response = await fetch(a36, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
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
      fetchAllProducts();
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setEditedData({ ...editedData, [name]: value });
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setNewProduct({ ...newProduct, [name]: value });
  };
  const addNewProduct = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = {
      Category_id: newProduct.category,
      ProductTitle: newProduct.productTitle,
      Label: newProduct.label,
      Slug: newProduct.slug,
      HSNCode: newProduct.hsnCode,
      Description: newProduct.description,
    };
    try {
      const response = await fetch(a21, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      fetchAllProducts();
      setActive("List");
      setNewProduct({
        category: "",
        productTitle: "",
        slug: "",
        label: "",
        hsnCode: "",
        description: "",
      });
      if (data.message) {
        // alert(data.message);
        setMessageType("error");
        setMessageToShow(data.message);
        setShowError(true);
        setActive("AddNew");
      } else {
        setMessageType("success");
        setMessageToShow("Product Added Successfully");
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
          module={"Masters"}
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
                  <RiListUnordered />
                </div>
                <p>All Products</p>
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
                    <th>ID</th>
                    <th>Product Title</th>
                    <th>Slug</th>
                    <th>Label</th>
                    <th>HSN Code</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map((x) => (
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
                            name="productTitle"
                            value={editedData.productTitle || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.productTitle
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
                          x.slug
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
                                .toUpperCase() // Convert to uppercase
                                .replace(/[^A-Z0-9]/g, ""); // Remove characters other than A-Z and 0-9

                              e.target.value = inputValue.substring(0, 4); // Further ensure it does not exceed 4 characters
                            }}
                          />
                        ) : (
                          x.label
                        )}
                      </td>

                      <td>
                        {editingId === x.id ? (
                          <input
                            type="text"
                            name="hsnCode"
                            value={editedData.hsnCode || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          x.hsnCode
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
                          x.description
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
              <p>Add New Product</p>
              <form onSubmit={addNewProduct}>
                <div className="adminCategoryAddCategoryInnerBox">
                  <label>
                    Category <sup> *</sup>
                  </label>
                  <select
                    required="required"
                    name="category"
                    value={newProduct.category}
                    onChange={handleNewProductChange}
                  >
                    <option value="">Select an option</option>
                    {allCategories.map((x) => {
                      return <option value={parseInt(x.id)}>{x.name}</option>;
                    })}
                  </select>
                  <label>
                    Product Title <sup> *</sup>
                  </label>
                  <input
                    name="productTitle"
                    value={newProduct.productTitle}
                    onChange={handleNewProductChange}
                    type="text"
                    required="required"
                  />
                  <label>Slug</label>
                  <input
                    name="slug"
                    value={newProduct.slug}
                    onChange={handleNewProductChange}
                    type="text"
                  />
                  <label>
                    Label <sup> *</sup>
                  </label>
                  <input
                    name="label"
                    value={newProduct.label}
                    onChange={handleNewProductChange}
                    type="text"
                    maxLength="4"
                    required="required"
                    placeholder="Only Capitals"
                    onInput={(e) => {
                      let inputValue = e.target.value
                        .toUpperCase() // Convert to uppercase
                        .replace(/[^A-Z0-9]/g, ""); // Remove characters other than A-Z and 0-9

                      e.target.value = inputValue.substring(0, 4); // Further ensure it does not exceed 4 characters
                    }}
                  />
                  <label>HSN Code</label>
                  <input
                    name="hsnCode"
                    value={newProduct.hsnCode}
                    onChange={handleNewProductChange}
                    type="text"
                  />

                  <label>Description</label>
                  <input
                    name="description"
                    value={newProduct.description}
                    onChange={handleNewProductChange}
                    type="text"
                  />
                  {!loading ? <button type="submit">Submit</button> : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
