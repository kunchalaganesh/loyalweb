import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import {
  a104,
  a107,
  a125,
  a128,
  a131,
  a134,
  a149,
  a163,
  a173,
  a174,
  a179,
  a180,
  a204,
  a205,
  a206,
  a95,
  a98,
} from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import AlertMessage from "../../../Other Functions/AlertMessage";
export default function AdminCustomerTounche() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [designData, setDesignData] = useState([]);
  const [purityData, setPurityData] = useState([]);
  const [skuData, setSkuData] = useState([]);

  const [allCategories, setAllCategories] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [newCategory, setNewCategory] = useState({
    CustomerId: 0,
    CategoryId: 0,
    ProductId: 0,
    DesignId: 0,
    ClientCode: "",
    PurityId: 0,
    StoneLessPercent: "0",
    MakingFixedAmt: "0",
    MakingPerGram: "0",
    MakingFixedWastage: "0",
    MakingPercentage: "0",
    StockKeepingUnit: "",
    CompanyId: 0,
    CounterId: 0,
    BranchId: 0,
    EmployeeId: 0,
    OldEntry: false,
  });
  const [allCompaniesList, setAllCompaniesList] = useState([]);
  const [allBranchesList, setAllBranchesList] = useState([]);
  const [allDepartmentsList, setAllDepartmentsList] = useState([]);
  const [allRolesList, setAllRolesList] = useState([]);
  const [allSelectedTounche, setAllSelectedTounche] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;
  const CompanyId = adminLoggedIn.CompanyId;
  const BranchId = adminLoggedIn.BranchId;
  const CounterId = adminLoggedIn.CounterId;
  const EmployeeId = adminLoggedIn.EmployeeId;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const fetchAllCategory = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a204, {
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
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a125, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setCategoriesData(data));
  }, []);
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a128, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((x) => x.json())
      .then((y) => setProductsData(y));
  }, []);
  // console.log(productTypeData.category_id);
  const filtreredProducts = productsData.filter(
    (x) => x.CategoryId == newCategory.CategoryId
  );
  const filteredDesign = designData.filter(
    (x) => x.ProductId == newCategory.ProductId
  );
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a134, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setPurityData(data));
    // console.log(purityData);
  }, []);
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a131, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setDesignData(data));
    // console.log(purityData);
  }, []);
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a163, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setSkuData(data));
    // console.log(purityData);
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

  const fetchAllCustomers = async () => {
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
    console.log(data, "Venodors   data,");
    try {
      if (data.length > 0) {
        setAllCustomers(data);
      } else {
        // alert("Please Add Company First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allCustomers, "allCustomers");
  console.log(allCustomers, "allCustomers");
  console.log(allCustomers, "allCustomers");
  useEffect(() => {
    fetchAllCustomers();
  }, []);
  console.log(allCategories, "allCategories");
  console.log(allCompaniesList, "allCompaniesList");
  console.log(allDepartmentsList, "allDepartmentsList");
  console.log(allBranchesList, "allBranchesList");
  console.log(allRolesList, "allRolesList");

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;

    // Convert 'true'/'false' strings to boolean values if the field is 'FinePure'
    let actualValue = value;
    if (name === "FinePure") {
      actualValue = value === "true";
    }
    if (name == "StockKeepingUnit") {
      let selectedSku = skuData.find((x) => x.StockKeepingUnit == value);
      console.log(selectedSku, "selectedSku");
      console.log(selectedSku, "selectedSku");
      if (selectedSku) {
        console.log("I amd here");
        handleAllSelectedTounche(e, selectedSku);
      } else {
        setNewCategory({ ...newCategory, [name]: actualValue });
      }
    }
    // Update the edited data in the state with the potentially converted value
    setNewCategory({ ...newCategory, [name]: actualValue });
  };

  console.log(newCategory, "newCategory");
  console.log(newCategory, "newCategory");

  const addNewCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      CustomerId: parseInt(newCategory.CustomerId),
      CategoryId: parseInt(newCategory.CategoryId),
      ProductId: parseInt(newCategory.ProductId),
      DesignId: parseInt(newCategory.DesignId),
      ClientCode: clientCode,
      PurityId: parseInt(newCategory.PurityId),
      StoneLessPercent: `${newCategory.StoneLessPercent}`,
      MakingFixedAmt: `${newCategory.MakingFixedAmt}`,
      MakingPerGram: `${newCategory.MakingPerGram}`,
      MakingFixedWastage: `${newCategory.MakingFixedWastage}`,
      MakingPercentage: `${newCategory.MakingPercentage}`,
      StockKeepingUnit: newCategory.StockKeepingUnit,
      CompanyId: CompanyId ? CompanyId : 0,
      CounterId: CounterId ? CounterId : 0,
      BranchId: BranchId ? BranchId : 0,
      EmployeeId: EmployeeId ? EmployeeId : 0,
      ...(newCategory.OldEntry ? { Id: newCategory.Id } : {}),
    };
    let newArray = allSelectedTounche.filter(
      (x) => x.StockKeepingUnit !== newCategory.StockKeepingUnit
    );
    const newArrayData = [...newArray, formData];
    console.log(newArrayData, "newArrayData to send");
    try {
      const response = await fetch(
        !newCategory.OldEntry ? a205 : a206,
        // a96,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([...newArray, formData]),
        }
      );
      const data = await response.json();
      console.log(data, "1st Hit data added new");
      fetchAllCategory();
      setActive("List");
      setAllSelectedTounche([]);
      setAllSelected(false);
      setNewCategory({
        CustomerId: 0,
        CategoryId: 0,
        ProductId: 0,
        DesignId: 0,
        ClientCode: "",
        PurityId: 0,
        StoneLessPercent: "0",
        MakingFixedAmt: "0",
        MakingPerGram: "0",
        MakingFixedWastage: "0",
        MakingPercentage: "0",
        StockKeepingUnit: "",
        CompanyId: 0,
        CounterId: 0,
        BranchId: 0,
        EmployeeId: 0,
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

  const handleAllSelectedTounche = (e, x) => {
    const { value, checked } = e.target;
    if (checked) {
      const newTounche = {
        CustomerId: 0,
        CategoryId: 0,
        ProductId: 0,
        DesignId: 0,
        ClientCode: "",
        PurityId: 0,
        StoneLessPercent: "0",
        MakingFixedAmt: "0",
        MakingPerGram: "0",
        MakingFixedWastage: "0",
        MakingPercentage: "0",
        StockKeepingUnit: "",
        CompanyId: 0,
        CounterId: 0,
        BranchId: 0,
        EmployeeId: 0,
        OldEntry: false,

        CustomerId: parseInt(newCategory.CustomerId),
        CategoryId: parseInt(x.CategoryId),
        ProductId: parseInt(x.ProductId),
        DesignId: parseInt(x.DesignId),
        PurityId: parseInt(x.PurityId),
        ClientCode: clientCode,
        StoneLessPercent: newCategory.StoneLessPercent,
        MakingFixedAmt: newCategory.MakingFixedAmt,
        MakingPerGram: newCategory.MakingPerGram,
        MakingFixedWastage: newCategory.MakingFixedWastage,
        MakingPercentage: newCategory.MakingPercentage,
        StockKeepingUnit: x.StockKeepingUnit,
        CompanyId: CompanyId ? CompanyId : 0,
        CounterId: CounterId ? CounterId : 0,
        BranchId: BranchId ? BranchId : 0,
        EmployeeId: EmployeeId ? EmployeeId : 0,
      };
      setAllSelectedTounche([...allSelectedTounche, newTounche]);
    } else {
      setAllSelectedTounche(
        allSelectedTounche.filter((item) => item.StockKeepingUnit !== value)
      );
    }
    console.log(allSelectedTounche, "allSelectedTounche");
  };
  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setAllSelected(checked);
    if (checked) {
      setAllSelectedTounche(
        skuData
          .filter(
            (sku) =>
              sku.VendorId == newCategory.VendorId || newCategory.VendorId == 0
          )
          .map((x) => createTouncheObject(x))
      );
    } else {
      setAllSelectedTounche([]);
    }
  };
  const handleIndividualCheckboxChange = (e, item) => {
    const checked = e.target.checked;
    if (checked) {
      setAllSelectedTounche((prev) => [...prev, createTouncheObject(item)]);
    } else {
      setAllSelectedTounche((prev) =>
        prev.filter((x) => x.StockKeepingUnit !== item.StockKeepingUnit)
      );
      setAllSelected(false); // Uncheck the select all if any individual checkbox is unchecked
    }
  };
  const createTouncheObject = (x) => ({
    CustomerId: parseInt(newCategory.CustomerId),
    CategoryId: parseInt(x.CategoryId),
    ProductId: parseInt(x.ProductId),
    DesignId: parseInt(x.DesignId),
    PurityId: parseInt(x.PurityId),
    ClientCode: clientCode,
    StoneLessPercent: newCategory.StoneLessPercent,
    MakingFixedAmt: newCategory.MakingFixedAmt,
    MakingPerGram: newCategory.MakingPerGram,
    MakingFixedWastage: newCategory.MakingFixedWastage,
    MakingPercentage: newCategory.MakingPercentage,
    StockKeepingUnit: x.StockKeepingUnit,
    CompanyId: CompanyId ? CompanyId : 0,
    CounterId: CounterId ? CounterId : 0,
    BranchId: BranchId ? BranchId : 0,
    EmployeeId: EmployeeId ? EmployeeId : 0,
  });

  console.log(newCategory, "newcategory");
  return (
    <div>
      <AdminHeading />
      <div className="adminMainBodyBox">
        {showError ? (
          <AlertMessage message={messageToShow} type={messageType} />
        ) : null}
        <AdminBreadCrump
          title={"Add Customer Tounche"}
          companyName={"Loyalstring"}
          module={"Settings"}
          page={"Customer Tounche"}
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
                <p>All Customer Tounche</p>
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
                <p>Add Customer Tounche</p>
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
                    <th>Customer</th>
                    <th>Category</th>
                    <th>Product</th>
                    <th>Design</th>
                    <th>Purity</th>
                    <th>SKU</th>
                    <th>Stone Less</th>
                    <th>MakingFixedAmt</th>
                    <th>MakingPercentage</th>
                    <th>MakingPerGram</th>
                    <th>MakingFixedWastage</th>
                  </tr>
                </thead>
                <tbody>
                  {allCategories.map((x, index) => (
                    <tr key={x.Id}>
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
                      <td>{`${x.FirstName} ${x.LastName}`}</td>
                      {/* <td>{x.VendorName}</td> */}
                      <td>{x.CategoryName}</td>
                      <td>{x.ProductName}</td>
                      <td>{x.DesignName}</td>
                      <td>
                        {/* {x.PurityDetails.length > 0
                            // ? */}
                        {x.PurityName}
                        {/* : "NA"} */}
                      </td>
                      <td>{x.StockKeepingUnit}</td>
                      <td>{x.StoneLessPercent}</td>
                      <td>{x.MakingFixedAmt}</td>
                      <td>{x.MakingPercentage}</td>
                      <td>{x.MakingPerGram}</td>
                      <td>{x.MakingFixedWastage}</td>
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
              <p>Add New Customer Tounche</p>
              <form onSubmit={addNewCategory}>
                <div
                  style={{
                    gridTemplateColumns: "repeat(4,1fr)",
                    columnGap: "40px",
                  }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <label>
                    Select Customer<sup>*</sup>
                  </label>
                  <select
                    name="CustomerId"
                    value={newCategory.CustomerId}
                    onChange={handleNewCategoryChange}
                    required="required"
                  >
                    <option value={""}>Select an Option</option>
                    {allCustomers.map((x) => {
                      return (
                        <option value={x.Id}>
                          {/* {x.Id} - {x.VendorName} */}
                          {`${x.FirstName} - ${x.Id}`}
                        </option>
                      );
                    })}
                  </select>
                  <label>
                    Select SKU<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    value={newCategory.StockKeepingUnit}
                    onChange={handleNewCategoryChange}
                    name="StockKeepingUnit"
                    list="SKUList"
                  />
                  <datalist id="SKUList">
                    {skuData.map((x) => {
                      return (
                        <option value={x.StockKeepingUnit}>
                          {x.StockKeepingUnit}
                        </option>
                      );
                    })}
                  </datalist>
                  <label>
                    Select Category<sup>*</sup>
                  </label>
                  <select
                    name="CategoryId"
                    value={newCategory.CategoryId}
                    onChange={handleNewCategoryChange}
                    required="required"
                  >
                    <option value={""}>Select an Option</option>
                    {categoriesData.map((x) => {
                      return <option value={x.Id}>{x.CategoryName}</option>;
                    })}
                  </select>
                  <label>
                    Select Product<sup>*</sup>
                  </label>
                  <select
                    name="ProductId"
                    value={newCategory.ProductId}
                    onChange={handleNewCategoryChange}
                    required="required"
                  >
                    <option value={""}>Select an Option</option>
                    {filtreredProducts.map((x) => {
                      return <option value={x.Id}>{x.ProductName}</option>;
                    })}
                  </select>
                  <label>
                    Select Design<sup>*</sup>
                  </label>
                  <select
                    name="DesignId"
                    value={newCategory.DesignId}
                    onChange={handleNewCategoryChange}
                    required="required"
                  >
                    <option value={""}>Select an Option</option>
                    {filteredDesign.map((x) => {
                      return <option value={x.Id}>{x.DesignName}</option>;
                    })}
                  </select>
                  <label>
                    Select Purity<sup>*</sup>
                  </label>
                  <select
                    name="PurityId"
                    value={newCategory.PurityId}
                    onChange={handleNewCategoryChange}
                    required="required"
                  >
                    <option value={""}>Select an Option</option>
                    {purityData.map((x) => {
                      return <option value={x.Id}>{x.PurityName}</option>;
                    })}
                  </select>

                  <label>Stone Less Percent</label>
                  <input
                    name="StoneLessPercent"
                    value={newCategory.StoneLessPercent}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>Making Fixed Amt</label>
                  <input
                    name="MakingFixedAmt"
                    value={newCategory.MakingFixedAmt}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>MakingPercentage</label>
                  <input
                    name="MakingPercentage"
                    value={newCategory.MakingPercentage}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>MakingPerGram</label>
                  <input
                    name="MakingPerGram"
                    value={newCategory.MakingPerGram}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                  <label>MakingFixedWastage</label>
                  <input
                    name="MakingFixedWastage"
                    value={newCategory.MakingFixedWastage}
                    onChange={handleNewCategoryChange}
                    type="text"
                  />
                </div>
                {/* <div
                  style={{
                    overflowX: "auto",
                    borderTop: "1px solid rgba(0,0,0,0.2)",
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                    marginTop: "30px",
                    marginBottom: "20px",
                  }}
                >
                  <table
                    className="adminInventoryMainTable"
                    style={{
                      width: "100%",
                      marginTop: "30px",
                      marginBottom: "20px",
                      marginLeft: "1rem",
                      boxSizing: "border-box",
                    }}
                  >
                    <thead>
                      <tr>
                       <th>S.No</th>
                        <th
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
     
                          <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={handleSelectAll}
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "10px",
                            }}
                          />
                          SELECT
                        </th>
                     
                        <th>SKU</th>
                        <th>Category</th>
                        <th>Product</th>
                        <th>Purity</th>
                        <th>Pieces</th>
                        <th>Sketch Number</th>
                        <th>Weight Categories</th>
                      </tr>
                    </thead>
                    <tbody style={{ position: "relative" }}>
                      {skuData
                        .filter(
                          (sku) =>
                            sku.VendorId == newCategory.VendorId ||
                            newCategory.VendorId == 0
                        )
                        .map((x, index) => (
                          <tr key={x.Id}>
                            <td>{index + 1}</td>
                            <td>
                              <input
                                style={{ width: "20px", height: "20px" }}
                                type="checkbox"
                                checked={allSelectedTounche.some(
                                  (tounche) =>
                                    tounche.StockKeepingUnit ===
                                    x.StockKeepingUnit
                                )}
                                onChange={(e) =>
                                  handleIndividualCheckboxChange(e, x)
                                }
                                value={x.StockKeepingUnit}
                              />
                            </td>

                            <td style={{ whiteSpace: "nowrap" }}>
                              {x.StockKeepingUnit}
                            </td>
                            <td>{x.CategoryName}</td>
                            <td>{x.ProductName}</td>
                            <td>{x.PurityName}</td>
                            <td>{x.Pieces !== "" ? x.Pieces : 0}</td>
                            <td>{x.SketchNo !== "" ? x.SketchNo : 0}</td>
                            <td>
                              {x.WeightCategories !== ""
                                ? x.WeightCategories
                                : 0}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div> */}
                {!loading ? <button type="submit">Submit</button> : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
