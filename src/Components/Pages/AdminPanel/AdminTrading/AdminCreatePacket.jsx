import React, { useEffect, useState } from "react";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import AdminHeading from "../Heading/AdminHeading";
import { useSelector } from "react-redux";
import {
  a110,
  a125,
  a128,
  a149,
  a159,
  a162,
  a163,
  a170,
  a171,
} from "../../../Api/RootApiPath";
import { RxCross2 } from "react-icons/rx";

export default function AdminCreatePacket() {
  const [allVendorsList, setAllVendorsList] = useState([]);
  const [allCategoriesList, setAllCategoriesList] = useState([]);
  const [allProductsList, setAllProductsList] = useState([]);
  const [allLotNumberList, setAllLotNumberList] = useState([]);
  const [vendorName, setVendorName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedLotNumber, setSelectedLotNumber] = useState(null);
  const [allPurchaseItems, setAllPurchaseItems] = useState([]);
  const [masterPurchaseItems, setMasterPurchaseItems] = useState([]);
  const [showPurchaseLotPopup, setShowPurchaseLotPopup] = useState(false);
  const [purchaseLotSelected, setPurchaseLotSelected] = useState([]);
  const [newPurchaseLot, setNewPurchaseLot] = useState([]);
  const [availableGrossWt, setAvailableGrossWt] = useState(0);
  const [availableStoneWt, setAvailableStoneWt] = useState(0);
  const [availableNetWt, setAvailableNetWt] = useState(0);
  const [allEmployeesList, setAllEmployeesList] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [allPurchaseLotList, setAllPurchaseLotList] = useState([]);
  const [selectedPurchaseLotItem, setSelectedPurchaseLotItem] = useState([]);
  const [karigarName, setKarigarName] = useState("");
  const [allSku, setAllSku] = useState([]);

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const loggedInUserId = adminLoggedIn.Id;
  const loggedInUserFirstName = adminLoggedIn.FirstName;

  useEffect(() => {
    fetchAllVendors();
    fetchAllCategories();
    fetchAllProducts();
    fetchAllPurchaseItems();
    fetchAllLotNumbers();
    fetchAllEmployees();
    fetchAllPurchaseLotList();
  }, []);
  const fetchAllVendors = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a149, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllVendorsList(data);

      console.log(data, "allCSData");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCategories = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a125, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllCategoriesList(data);

      console.log(data, "allCSData");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllProducts = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a128, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllProductsList(data);

      console.log(data, "allCSData");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllLotNumbers = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a159, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllLotNumberList(data);

      console.log(data, "Main Box");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllPurchaseItems = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a162, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMasterPurchaseItems(data.reverse());

      console.log(data, "AllPurchaseItems");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllEmployees = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a110, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllEmployeesList(data);

      console.log(data, "allEmployeesData");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllPurchaseLotList = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a170, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllPurchaseLotList(data.reverse());

      console.log(data, "allEmployeesData");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllSku = async () => {
    try {
      const formData = { ClientCode: clientCode };
      const response = await fetch(a163, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      setAllSku(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllSku();
  }, []);

  useEffect(() => {
    let filtered = masterPurchaseItems;

    if (selectedVendor) {
      filtered = filtered.filter((item) => item.VendorId === selectedVendor.Id);
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.CategoryId === selectedCategory.Id
      );
    }
    if (selectedProduct) {
      filtered = filtered.filter(
        (item) => item.ProductId === selectedProduct.Id
      );
    }
    if (selectedLotNumber) {
      filtered = filtered.filter(
        (item) => item.LotNumber === selectedLotNumber.LotNumber
      );
    }

    setAllPurchaseItems(filtered);
  }, [
    selectedVendor,
    selectedCategory,
    selectedProduct,
    selectedLotNumber,
    masterPurchaseItems,
  ]);

  const handleNameInputChange = (e) => {
    const { value } = e.target;
    setVendorName(value);
    const selected = allVendorsList.find(
      (vendor) => vendor.VendorName.toLowerCase() === value.toLowerCase()
    );
    setSelectedVendor(selected);
  };
  const handleEmployeeNameInputChange = (e) => {
    const { value } = e.target;
    setEmployeeName(value);
    const selected = allEmployeesList.find(
      (vendor) => vendor.FirstName.toLowerCase() === value.toLowerCase()
    );
    if (selected) {
      setNewPurchaseLot((prev) => {
        return { ...prev, AssignedEmployeeId: `${selected.Id}` };
      });
    } else {
      setEmployeeName("");
    }
    // setSelectedVendor(selected);
  };
  const handleKarigarNameInputChange = (e) => {
    const { value } = e.target;
    const selected = allEmployeesList.find(
      (vendor) => vendor.FirstName.toLowerCase() === value.toLowerCase()
    );
    if (selected) {
      setKarigarName(value);
    } else {
      setKarigarName("");
    }
    // setSelectedVendor(selected);
  };

  const handleCategoryNameInputChange = (e) => {
    const { value } = e.target;
    setCategoryName(value);
    const selected = allCategoriesList.find(
      (category) => category.CategoryName.toLowerCase() === value.toLowerCase()
    );
    setSelectedCategory(selected);
  };
  const handleProductNameInputChange = (e) => {
    const { value } = e.target;
    setProductName(value);
    const selected = allProductsList.find(
      (category) => category.ProductName.toLowerCase() === value.toLowerCase()
    );
    setSelectedProduct(selected);
  };
  const handleLotNumberInputChange = (e) => {
    const { value } = e.target;
    setLotNumber(value);
    const selected = allLotNumberList.find(
      (category) => category.LotNumber.toLowerCase() === value.toLowerCase()
    );
    setSelectedLotNumber(selected);
    // if (selected) {
    // const selectedVendor = allVendorsList.find(
    //   (vendor) => vendor.VendorName.toLowerCase() === value.toLowerCase()
    // );
    // setSelectedVendor(selectedVendor);
    //   setVendorName(selected.VendorName);
    // } else {
    //   setVendorName("");
    // }
  };

  const handlePurchaseLot = (x) => {
    setPurchaseLotSelected(x);
    const selected = allEmployeesList.find(
      (vendor) =>
        vendor.FirstName.toLowerCase() === loggedInUserFirstName.toLowerCase()
    );
    if (selected) {
      setNewPurchaseLot(() => {
        return {
          ...x,
          NetWt: 0,
          StoneWeight: 0,
          AssignGrossWt: 0,
          AssignedEmployeeId: `${selected.Id}`,
        };
      });
      setEmployeeName(`${loggedInUserFirstName}`);
    } else {
      setEmployeeName("");
    }

    setShowPurchaseLotPopup(true);
    setAvailableGrossWt(() => {
      if (x.CategoryId == 1) {
        return x.UnlabelledGoldWeight;
      } else if (x.CategoryId == 2) {
        return x.UnlabelledSilverWeight;
      } else {
        return x.UnlabelledOtherWeight;
      }
    });
    setAvailableStoneWt(0);
    setAvailableNetWt(0);
    // setEmployeeName("");

    // setAvailableGrossWt(x.GrossWt);
    // setAvailableStoneWt(x.StoneWt);
    // setAvailableNetWt(x.NetWt);
  };
  console.log(purchaseLotSelected, "purchaseLotSelected");
  console.log(purchaseLotSelected, "purchaseLotSelected");
  console.log(purchaseLotSelected, "purchaseLotSelected");
  const closeEditItem = (x) => {
    setShowPurchaseLotPopup(false);
  };
  const handleInputChange2 = (e, property) => {
    const { value } = e.target;
    if (newPurchaseLot) {
      let updatedProduct = { ...newPurchaseLot };

      // Convert input value to a float for accurate comparisons and calculations
      const numericValue = parseFloat(value);
      const maxAllowedWt = parseFloat(purchaseLotSelected.GrossWt) + 0.03;

      if (property === "AssignGrossWt") {
        if (!isNaN(numericValue) && numericValue <= maxAllowedWt) {
          // Calculate the remaining weight and update the state
          setAvailableGrossWt(
            (parseFloat(purchaseLotSelected.GrossWt) - numericValue).toFixed(3)
          );
        } else if (isNaN(numericValue) || numericValue > maxAllowedWt) {
          // If the numeric value exceeds the allowed weight, set AvailableGrossWt to 0
          setAvailableGrossWt(0);
        }

        // Update the product details with the new property value
        updatedProduct = { ...updatedProduct, [property]: value };
        setNewPurchaseLot(updatedProduct);
      }
    }
  };

  console.log(newPurchaseLot, "newPurchaseLot");
  console.log(newPurchaseLot, "newPurchaseLot");
  console.log(newPurchaseLot, "newPurchaseLot");
  const addPurchaseLot = async (e) => {
    e.preventDefault();
    if (
      newPurchaseLot.GrossWt !== "" &&
      parseFloat(newPurchaseLot.GrossWt) !== 0
    ) {
      const formData = {
        ClientCode: clientCode,
        AssignedEmployeeId: newPurchaseLot.AssignedEmployeeId,
        AvailableGrossWt: `${newPurchaseLot.GrossWt}`,
        AvailableNetWt: `${newPurchaseLot.NetWt}`,
        AvailableStoneWt: `${newPurchaseLot.StoneWt}`,
        BranchId: newPurchaseLot.BranchId,
        CategoryId: newPurchaseLot.CategoryId,
        CompanyId: newPurchaseLot.CompanyId,
        CounterId: newPurchaseLot.CounterId,
        CounterId: newPurchaseLot.CounterId,
        DiamondAmount: newPurchaseLot.DiamondAmount,
        DiamondPieces: newPurchaseLot.DiamondPieces,
        DiamondWeight: newPurchaseLot.DiamondWeight,
        EmployeeId: newPurchaseLot.EmployeeId,
        GrossWt: `${newPurchaseLot.AssignGrossWt}`,
        LotNumber: newPurchaseLot.LotNumber,
        NetWt: `${newPurchaseLot.NetWt}`,
        ProductId: newPurchaseLot.ProductId,
        RDPurchaseId: newPurchaseLot.RDPurchaseId,
        RDPurchaseItemId: newPurchaseLot.Id,
        Status: "Active",
        StockKeepingUnit: newPurchaseLot.StockKeepingUnit,
        StoneAmount: newPurchaseLot.StoneAmount,
        StoneName: newPurchaseLot.StoneName,
        StonePieces: newPurchaseLot.StonePieces,
        StoneRate: newPurchaseLot.StoneRate,
        StoneWeight: `${newPurchaseLot.StoneWt}`,
        StoneWt: `${newPurchaseLot.StoneWt}`,
        TaxId: newPurchaseLot.TaxId,
        TaxPercentage: newPurchaseLot.TaxPercentage,
        VendorId: newPurchaseLot.VendorId,
        Stones: newPurchaseLot.Stones,
        Diamonds: newPurchaseLot.Diamonds,
      };

      console.log(formData, "PurchaseLot FormData");
      console.log(formData, "PurchaseLot FormData");
      console.log(formData, "PurchaseLot FormData");
      console.log(formData, "PurchaseLot FormData");
      try {
        const response = await fetch(a171, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([formData]),
        });
        const data = await response.json();
        console.log(data, "Added New lot");

        console.log(data, "Added New lot");
        alert(`Packet Number- ${data[0].PacketNumber}`);
        setShowPurchaseLotPopup(false);
        fetchAllPurchaseLotList();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Assigned Gross Wt could not be zero");
    }
  };
  // console.log(allPurchaseItems, "allPurchaseItems");
  // console.log(allLotNumberList, "allLotNumberList");
  // console.log(selectedLotNumber, "selectedLotNumber");
  // console.log(purchaseLotSelected, "PurchaseLotSelected");
  // console.log(newPurchaseLot, "NewPurchaseLot");
  console.log(allPurchaseLotList, "allPackets");
  return (
    <div>
      <AdminHeading />
      <div style={{ paddingTop: "130px" }}>
        <AdminBreadCrump
          title={"Assign Employee"}
          companyName={"Loyalstring"}
          module={"Trading"}
          page={"Assign Employee"}
        />
        <div className="adminAddCategoryMainBox">
          <div className="adminAddCategoryInnerBox">
            <div className="adminCreatePurchaseLotOuterBox">
              <div
                style={{ gridColumn: "2 span", height: "250px" }}
                className="adminCreatePurchaseLotInnerBox"
              >
                <h4>Search Purchase Item</h4>
                <div className="adminCreatePurchaseLotInnerBoxSelectBox">
                  <label>Select Vendor</label>
                  <input
                    style={{ width: "20vw" }}
                    type="text"
                    name="vendorName"
                    value={vendorName}
                    onInput={handleNameInputChange}
                    list="vendorNameLists"
                  />

                  <datalist id="vendorNameLists">
                    {allVendorsList.map((vendor, index) => (
                      <option key={index} value={`${vendor.FirmName}`} />
                    ))}
                  </datalist>
                </div>
                <div className="adminCreatePurchaseLotInnerBoxSelectBox">
                  <label>Select Lot Number</label>
                  <input
                    style={{ width: "20vw" }}
                    type="text"
                    name="lotNumber"
                    value={lotNumber}
                    onInput={handleLotNumberInputChange}
                    list="lotNumberList"
                  />

                  <datalist id="lotNumberList">
                    {allLotNumberList
                      .filter((x) => x.VendorName == vendorName)
                      .map((product, index) => (
                        <option key={index} value={`${product.LotNumber}`} />
                      ))}
                  </datalist>
                </div>
                <div className="adminCreatePurchaseLotInnerBoxSelectBox">
                  <label>Select Category</label>
                  <input
                    style={{ width: "20vw" }}
                    type="text"
                    name="categoryName"
                    value={categoryName}
                    onInput={handleCategoryNameInputChange}
                    list="categoryNameLists"
                  />

                  <datalist id="categoryNameLists">
                    {allCategoriesList.map((category, index) => (
                      <option key={index} value={`${category.CategoryName}`} />
                    ))}
                  </datalist>
                </div>
                <div className="adminCreatePurchaseLotInnerBoxSelectBox">
                  <label>Select Product</label>
                  <input
                    style={{ width: "20vw" }}
                    type="text"
                    name="productName"
                    value={productName}
                    onInput={handleProductNameInputChange}
                    list="productNameLists"
                  />

                  <datalist id="productNameLists">
                    {allProductsList.map((product, index) => (
                      <option key={index} value={`${product.ProductName}`} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div
                style={{
                  gridColumn: "2 span",
                  height: "300px",
                  paddingTop: "0px",
                }}
                className="adminCreatePurchaseLotInnerBox"
              >
                <h4>All Purchase Items</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Vendor Name</th>
                      <th>Lot Number</th>
                      <th>Category Name</th>
                      <th>Product Name</th>
                      <th>Unlabelled Gold Wt</th>
                      <th>Unlabelled Silver Wt</th>
                      <th>Unlabelled Other Metal Wt</th>
                      <th>Assigned Gold Wt</th>
                      <th>Assigned Silver Wt</th>
                      <th>Assigned Other Metal Wt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPurchaseItems.map((x) => {
                      return (
                        <tr
                          key={x.id}
                          className="adminCreatePurchaseLotInnerTableItemsBox"
                          onClick={() => {
                            handlePurchaseLot(x);
                            // setShowPurchaseLotPopup(true),
                            //   setPurchaseLotSelected(x);
                          }}
                        >
                          <td>{x.VendorName}</td>
                          <td>{x.LotNumber}</td>
                          <td>{x.CategoryName}</td>
                          <td>{x.ProductName}</td>
                          <td>{x.UnlabelledGoldWeight}</td>
                          <td>{x.UnlabelledSilverWeight}</td>
                          <td>{x.UnlabelledOtherMetalWeight}</td>
                          <td>{x.AssignedGoldWeight}</td>
                          <td>{x.AssignedSilverWeight}</td>
                          <td>{x.AssignedOtherMetalWeight}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* <div className="adminCreatePurchaseLotInnerBox"> */}
              <div
                style={{
                  gridColumn: "2 span",
                  height: "300px",
                  paddingTop: "0px",
                }}
                className="adminCreatePurchaseLotInnerBox"
              >
                <h4>All Packet Items</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Packet Number</th>
                      <th>Lot Number</th>
                      <th>Assigned Employee Id</th>
                      <th>StockKeepingUnit</th>
                      <th>Assigned Gross Wt</th>
                      <th>Assigned Stone Wt</th>
                      <th>Assigned Net Wt</th>
                      <th>Available GrossWt</th>
                      <th>Available Stone Wt</th>
                      <th>Available Net Wt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPurchaseLotList.map((x) => {
                      return (
                        <tr
                          key={x.id}
                          className="adminCreatePurchaseLotInnerTableItemsBox"
                          onClick={() => {
                            setSelectedPurchaseLotItem(x);
                            // setShowPurchaseLotPopup(true),
                            //   setPurchaseLotSelected(x);
                          }}
                        >
                          <td>
                            <strong>{x.PacketNumber}</strong>
                          </td>
                          <td>{x.LotNumber}</td>
                          <td>{x.AssignedEmployeeId}</td>
                          <td>{x.StockKeepingUnit}</td>
                          <td>{x.GrossWt}</td>
                          <td>{x.StoneWeight}</td>
                          <td>{x.NetWt}</td>
                          <td>{x.AvailableGrossWt}</td>
                          <td>{x.AvailableStoneWt}</td>
                          <td>{x.AvailableNetWt}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* </div> */}
              <div className="adminCreatePurchaseLotInnerBox">
                <h4>Assign Employee</h4>

                <div className="adminCreatePurchaseLotInnerBoxSelectBox">
                  <label>Packet number</label>
                  <input
                    style={{ width: "20vw" }}
                    type="text"
                    value={selectedPurchaseLotItem.PacketNumber}
                    readOnly
                  />
                </div>
                <div className="adminCreatePurchaseLotInnerBoxSelectBox">
                  <label>Select Karigar</label>
                  <input
                    style={{ width: "20vw" }}
                    type="text"
                    name="karigarName"
                    value={karigarName}
                    onInput={handleKarigarNameInputChange}
                    list="karigarNameLists"
                  />

                  <datalist id="karigarNameLists">
                    {allVendorsList.map((vendor, index) => (
                      <option key={index} value={`${vendor.FirmName}`} />
                    ))}
                  </datalist>
                </div>
                <div className="adminCreatePurchaseLotInnerBoxSelectBox">
                  <label>Select Order Number</label>
                  <input
                    style={{ width: "20vw" }}
                    type="text"
                    name="lotNumber"
                    value={lotNumber}
                    onInput={handleLotNumberInputChange}
                    list="lotNumberLists"
                  />

                  <datalist id="lotNumberLists">
                    {allLotNumberList.map((product, index) => (
                      <option key={index} value={`${product.LotNumber}`} />
                    ))}
                  </datalist>
                </div>
                <div className="adminCreatePurchaseLotInnerBoxSelectBox">
                  <label>Assign Gross Wt</label>
                  <input
                    style={{ width: "20vw" }}
                    type="text"
                    value={selectedPurchaseLotItem.GrossWt}
                    readOnly
                    // onInput={handleCategoryNameInputChange}
                  />
                </div>
                <div className="adminCreatePurchaseLotInnerBoxSelectBox">
                  <label>Assign Net Wt</label>
                  <input
                    style={{ width: "20vw" }}
                    type="text"
                    value={selectedPurchaseLotItem.NetWt}
                    readOnly
                    // onInput={handleCategoryNameInputChange}
                  />
                </div>
              </div>
              {showPurchaseLotPopup ? (
                <div className="adminInvoiceOpenEditMainBox">
                  <div className="adminInvoiceOpenEditInnerBox">
                    <div className="adminInvoiceOpenEditInnerTitleBox">
                      <p>Assign Employee</p>
                      <button
                        onClick={closeEditItem}
                        className="adminAddInvoiceMainAddLabelOptionDeleteIcon"
                      >
                        <RxCross2 size={"25px"} />
                      </button>
                    </div>
                    <form
                      onSubmit={(e) => addPurchaseLot(e)}
                      className="adminInvoiceOpenEditOuterGridBox"
                    >
                      {/* <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Select Sku</label>
                        <input
                          type="text"
                          name="StockKeepingUnit"
                          value={newPurchaseLot.StockKeepingUnit}
                          onChange={(e) =>
                            handleInputChange2(e, "StockKeepingUnit")
                          }
                          list="skuLists"
                          required="required"
                        />

                        <datalist id="skuLists">
                          {allSku.map((sku, index) => (
                            <option key={index} value={sku.StockKeepingUnit} />
                          ))}
                        </datalist>
                      </div> */}
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Select Employee</label>
                        <input
                          type="text"
                          name="employeeName"
                          value={employeeName}
                          onInput={handleEmployeeNameInputChange}
                          list="employeeNameLists"
                          // required="required"
                        />

                        <datalist id="employeeNameLists">
                          {allEmployeesList.map((employee, index) => (
                            <option
                              key={index}
                              value={`${employee.FirstName}`}
                            />
                          ))}
                        </datalist>
                      </div>
                      {/* <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Firm Name</label>
                        <input
                          type="text"
                          // placeholder={newPurchaseLot.FirmName}
                          value={newPurchaseLot.FirmName}
                          readOnly
                        />
                      </div> */}
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Lot Number</label>
                        <input
                          type="text"
                          placeholder={newPurchaseLot.LotNumber}
                          value={newPurchaseLot.LotNumber}
                          readOnly
                        />
                      </div>

                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Category Name</label>
                        <input
                          type="text"
                          placeholder={newPurchaseLot.CategoryName}
                          value={newPurchaseLot.CategoryName}
                          readOnly
                        />
                      </div>

                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Product Name</label>
                        <input
                          type="text"
                          placeholder={newPurchaseLot.ProductName}
                          value={newPurchaseLot.ProductName}
                          readOnly
                        />
                      </div>

                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Total Gross Wt</label>
                        <input
                          type="text"
                          // placeholder={newPurchaseLot.GrossWt}
                          placeholder={purchaseLotSelected.GrossWt}
                          // value={newPurchaseLot.GrossWt}
                          // value={purchaseLotSelected.GrossWt}
                          // value={availableGrossWt}
                          // onChange={(e) => handleInputChange2(e, "GrossWt")}
                          readOnly
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Assign Gross Wt</label>
                        <input
                          type="number"
                          step="0.001"
                          placeholder={newPurchaseLot.AssignGrossWt}
                          required="required"
                          value={newPurchaseLot.AssignGrossWt}
                          onChange={(e) =>
                            handleInputChange2(e, "AssignGrossWt")
                          }
                          onBlur={() => {
                            if (
                              parseFloat(newPurchaseLot.AssignGrossWt) >
                              parseFloat(purchaseLotSelected.GrossWt)
                            ) {
                              alert(
                                "Assigned Gross Wt could not be greater than available Gross Wt"
                              );
                              setAvailableGrossWt(
                                purchaseLotSelected.AvailableGrossWt
                              ),
                                setNewPurchaseLot((x) => {
                                  return { ...x, AssignGrossWt: 0 };
                                });
                            }
                          }}
                        />
                      </div>

                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Available Gross Wt</label>
                        <input
                          type="text"
                          placeholder={availableGrossWt}
                          // value={newPurchaseLot.GrossWt}
                          // value={purchaseLotSelected.GrossWt}
                          // value={availableGrossWt}
                          // onChange={(e) => handleInputChange2(e, "GrossWt")}
                          readOnly
                        />
                      </div>
                      {/* <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Available Stone Wt</label>{" "}
                        <input
                          type="number"
                          // value={purchaseLotSelected.StoneWt}
                          value={availableStoneWt}
                          readOnly
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Assign Stone Wt</label>{" "}
                        <input
                          type="text"
                          // min={0}
                          placeholder={newPurchaseLot.StoneWt}
                          value={newPurchaseLot.StoneWt}
                          onChange={(e) => handleInputChange2(e, "StoneWt")}
                        />
                      </div>

                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Available Net Wt</label>
                        <input
                          type="text"
                          // value={purchaseLotSelected.NetWt}
                          value={availableNetWt}
                          readOnly
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Assigned Net Wt</label>
                        <input
                          type="text"
                          placeholder={newPurchaseLot.NetWt}
                          value={newPurchaseLot.NetWt}
                          onChange={(e) => handleInputChange2(e, "NetWt")}
                          min={0}
                        />
                      </div> */}
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        {/* <label>Create Lot</label> */}
                        <button
                          type="submit"
                          className="adminInvoiceEditProductSaveButton"
                        >
                          Create Packet
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
