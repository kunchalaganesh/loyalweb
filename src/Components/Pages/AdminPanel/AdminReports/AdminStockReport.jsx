import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import AdminReportTable from "./AdminReportTable/AdminReportTable";
import { useSelector } from "react-redux";
import {
  a125,
  a128,
  a131,
  a134,
  a216,
  a218,
  a219,
  a220,
} from "../../../Api/RootApiPath";
import { MagnifyingGlass } from "react-loader-spinner";
import { AiOutlineEdit } from "react-icons/ai";
import jsPDF from "jspdf";

export default function AdminStockReport() {
  const [allCategories, setAllCategories] = useState([]);

  const [tablesHead, setAllTablesHead] = useState([
    "SrNo",
    "Category",
    "Qty",
    "Opening GrWt",
    "Opening NetWt",
    "Stock In Qty",
    "Stock In Wt",
    "Sale Qty",
    "Sale Wt",
    "Closing Qty",
    "Closing GrWt",
    "Closing NetWt",
    "CategoryId",
  ]);
  const [tablesDataDefault, setTablesDataDefault] = useState([
    {
      SrNo: 0,
      Category: 0,
      Qty: 0,
      OpeningGrWt: 0,
      OpeningNetWt: 0,
      StockInQty: 0,
      StockInWt: 0,
      SaleQty: 0,
      SaleWt: 0,
      ClosingQty: 0,
      ClosingGrWt: 0,
      ClosingNetWt: 0,
      CategoryId: 0,
    },
  ]);
  // let tablesDataDefault =

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  let today = new Date();
  const [fromDate, setFromDate] = useState(today.toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(today.toISOString().split("T")[0]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayTable, setDisplayTable] = useState("All");

  // OLD STOCK REPORT

  const [categoryName, setCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [allProductTypes, setAllProductTypes] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [allCollectionTypes, setAllCollectionTypes] = useState([]);
  const [purityName, setPurityName] = useState("");
  const [allPurityTypes, setAllPurityTypes] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [stockType, setStockType] = useState("");
  const [purityId, setPurityId] = useState("");
  const productsPerPage = 100;
  // OLD STOCK REPORT

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  const clientCode = adminLoggedIn.ClientCode;

  const fetchAllCategory = async () => {
    setLoading(true);
    setLoading2(true);
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a125, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data, "data");
    setAllCategories(data);
    fetchProductTypes();
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);
  const fetchProductTypes = async () => {
    const formData = { ClientCode: clientCode };
    await fetch(a128, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        setAllProductTypes(response);
        fetchCollectonData();
      });
  };

  // useEffect(() => {
  //   fetchProductTypes();
  // }, []);
  const fetchCollectonData = async () => {
    const formData = { ClientCode: clientCode };
    // setLoading(true);
    await fetch(a131, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        setAllCollectionTypes(response);
        fetchPuritiesData();
      });
  };

  // useEffect(() => {
  //   fetchCollectonData();
  // }, []);
  const fetchPuritiesData = async () => {
    const formData = { ClientCode: clientCode };
    await fetch(a134, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        setAllPurityTypes(response);
        fetchDefaultStockReport();
      });
  };

  // useEffect(() => {
  //   fetchPuritiesData();
  // }, []);
  const fetchDefaultStockReport = async () => {
    // const today = new Date();
    // const fromDate = today.toISOString().split("T")[0];
    // const toDate = today.toISOString().split("T")[0];
    setLoading2(true);
    const formData = {
      ClientCode: clientCode,
      FromDate: fromDate,
      ToDate: toDate,
      StockType: stockType,
    };
    const response = await fetch(a218, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    // setAllCategories(data);
    console.log(data, "data");
    console.log(data, "data");
    let setInitialDefaultData = data.map((x, index) => {
      return {
        "S No": index + 1,
        Category: x.Category,
        "Opening G.WT": x.OpeningGrossWeight,
        "Opening N.WT": x.OpeningNetWeight,
        "Opening Qty": x.OpeningQuantity,
        "Stock In Qty": x.StockEntryQuantity,
        "Stock In WT": x.StockEntryGrWt,
        "Sale Qty": x.SaleQty,
        "Sale WT": x.SaleGrossWt,
        "Closing Qty": x.ClosingQty,
        "Closing G.WT": x.ClosingGrossWeight,
        "Closing N.WT": x.ClosingNetWeight,
        Id: x.CategoryId,
      };
    });

    // console.log(setInitialCategories, "setInitialCategories");
    // setTablesDataDefault(setInitialCategories);
    // setTablesDataDefault(data);
    setTablesDataDefault(setInitialDefaultData);
    setLoading(false);
    setLoading2(false);
  };
  const fetchStockReportByProduct = async () => {
    // const today = new Date();
    // const fromDate = today.toISOString().split("T")[0];
    // const toDate = today.toISOString().split("T")[0];
    setLoading2(true);
    const formData = {
      ClientCode: clientCode,
      FromDate: fromDate,
      ToDate: toDate,
      CategoryId: categoryId,
      StockType: stockType,
      PurityId: purityTypeIdSelected ? parseInt(purityTypeIdSelected) : 0,
    };
    console.log(formData, "formData");
    const response = await fetch(a219, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    // setAllCategories(data);
    console.log(data, "data");
    console.log(data, "data");
    let setInitialDefaultData = data.map((x, index) => {
      return {
        "S No": index + 1,
        Category: x.Category,
        Product: x.Product,
        "Opening G.WT": x.OpeningGrossWeight,
        "Opening N.WT": x.OpeningNetWeight,
        "Opening Qty": x.OpeningQuantity,
        "Stock In Qty": x.StockEntryQuantity,
        "Stock In WT": x.StockEntryGrWt,
        "Sale Qty": x.SaleQty,
        "Sale WT": x.SaleGrossWt,
        "Closing Qty": x.ClosingQty,
        "Closing G.WT": x.ClosingGrossWeight,
        "Closing N.WT": x.ClosingNetWeight,
        Id: `${x.CategoryId}`,
        ProductId: `${x.ProductId}`,
      };
    });

    // console.log(setInitialCategories, "setInitialCategories");
    // setTablesDataDefault(setInitialCategories);
    // setTablesDataDefault(data);
    setTablesDataDefault(setInitialDefaultData);
    setLoading2(false);
  };

  const fetchStockReportByDesign = async () => {
    // const today = new Date();
    // const fromDate = today.toISOString().split("T")[0];
    // const toDate = today.toISOString().split("T")[0];
    setLoading2(true);
    const formData = {
      ClientCode: clientCode,
      FromDate: fromDate,
      ToDate: toDate,
      StockType: stockType,
      ProductId: productTypeIdSelected ? parseInt(productTypeIdSelected) : 0,
      PurityId: purityTypeIdSelected ? parseInt(purityTypeIdSelected) : 0,
    };

    console.log(formData, "formData");
    const response = await fetch(a220, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    // setAllCategories(data);
    console.log(data, "data");
    console.log(data, "data");
    let setInitialDefaultData = data.map((x, index) => {
      return {
        "S No": index + 1,
        Category: x.Category,
        Product: x.Product,
        Design: x.Design,
        "Opening G.WT": x.OpeningGrossWeight,
        "Opening N.WT": x.OpeningNetWeight,
        "Opening Qty": x.OpeningQuantity,
        "Stock In Qty": x.StockEntryQuantity,
        "Stock In WT": x.StockEntryGrWt,
        "Sale Qty": x.SaleQty,
        "Sale WT": x.SaleGrossWt,
        "Closing Qty": x.ClosingQty,
        "Closing G.WT": x.ClosingGrossWeight,
        "Closing N.WT": x.ClosingNetWeight,
        // Id: x.CategoryId,
        // ProductId: x.ProductId,
      };
    });

    // console.log(setInitialCategories, "setInitialCategories");
    // setTablesDataDefault(setInitialCategories);
    // setTablesDataDefault(data);
    setTablesDataDefault(setInitialDefaultData);
    setLoading2(false);
  };

  useEffect(() => {
    if (
      fromDate !== "" &&
      toDate !== "" &&
      categoryName == "" &&
      productName == ""
    ) {
      fetchDefaultStockReport();
    } else if (
      fromDate !== "" &&
      toDate !== "" &&
      categoryName !== "" &&
      productName == ""
    ) {
      fetchStockReportByProduct();
    } else if (
      fromDate !== "" &&
      toDate !== "" &&
      categoryName !== "" &&
      productName !== ""
    ) {
      fetchStockReportByDesign();
    }
  }, [fromDate, toDate, categoryName, productName, stockType, purityName]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const printList = () => {
    const selectedProductData = allProducts.filter((x) =>
      selectedProducts.includes(x.id)
    );
    printListAll(filteredProducts);
  };

  const printListAll = async (data) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const startX = 10; // Adjusted startX value for the serial number column
    let startY = 20;
    const lineHeight = 5;
    const margin = 5;
    const serialNumberWidth = 20; // Width for the serial number column
    const columnWidth =
      (pageWidth - startX - serialNumberWidth - 10 * margin) / 10;

    doc.setFont("helvetica", "normal");
    // doc.setFontSize(12);
    doc.setFontSize(8);

    const generateHeader = () => {
      doc.text("S. No.", startX, startY); // Serial Number
      doc.text("Collection", startX + columnWidth, startY);
      doc.text("Gross Wt", startX + 2 * columnWidth, startY);
      doc.text("Net Wt", startX + 3 * columnWidth, startY);
      doc.text("Item Code", startX + 4 * columnWidth, startY);
      doc.text("Barcode No", startX + 5.5 * columnWidth, startY);
      // doc.text("M Fixed Amt", startX + 7 * columnWidth, startY);
      // doc.text("M Fix Wastage", startX + 8.5 * columnWidth, startY);
      // doc.text("M Percentage", startX + 10 * columnWidth, startY);
      // doc.text("M per_gram", startX + 11.5 * columnWidth, startY);
      // doc.text("stoneAmount", startX + 13 * columnWidth, startY);
      doc.text("Tid", startX + 7.53 * columnWidth, startY);
    };
    const totalNetWt = data.reduce(
      (total, item) => total + (parseFloat(item.NetWt) || 0),
      0
    );
    const totalGrossWt = data.reduce(
      (total, item) => total + (parseFloat(item.GrossWt) || 0),
      0
    );
    // Generate header on the first page
    generateHeader();
    doc.text(
      `Total Net Wt: ${totalNetWt.toFixed(3)} gm`,
      startX + 5 * columnWidth,
      startY - 10
    );
    doc.text(
      `Total Gross Wt: ${totalGrossWt.toFixed(3)} gm`,
      startX,
      startY - 10
    );
    // Generate data rows

    let y = startY + lineHeight + margin;
    data.forEach((item, index) => {
      // Check if we need to start a new page
      if (index > 0 && y + lineHeight > pageHeight - margin) {
        doc.addPage();
        startY = 20; // Reset startY for the new page
        // Generate header on each new page
        generateHeader();
        y = startY + lineHeight + margin; // Update y position for the new page
      }

      const serialNumber = index + 1;
      doc.text(serialNumber.toString(), startX, y);
      doc.text(
        item.collection ? item.collection.toString().substr(0, 8) : "N/A",
        startX + columnWidth,
        y
      );
      doc.text(
        item.GrossWt ? item.GrossWt.toString() : "N/A",
        startX + 2 * columnWidth,
        y
      );
      doc.text(
        item.netWt ? item.netWt.toString() : "N/A",
        startX + 3 * columnWidth,
        y
      );
      doc.text(
        item.itemCode ? item.itemCode.toString() : "N/A",
        startX + 4 * columnWidth,
        y
      );
      doc.text(
        item.barcodeNumber ? item.barcodeNumber.toString() : "N/A",
        startX + 5.5 * columnWidth,
        y
      );
      // doc.text(
      //   item.making_Fixed_Amt ? item.making_Fixed_Amt.toString() : "N/A",
      //   startX + 7 * columnWidth,
      //   y
      // );
      // doc.text(
      //   item.making_Fixed_Wastage
      //     ? item.making_Fixed_Wastage.toString()
      //     : "N/A",
      //   startX + 8.5 * columnWidth,
      //   y
      // );
      // doc.text(
      //   item.making_Percentage ? item.making_Percentage.toString() : "N/A",
      //   startX + 10 * columnWidth,
      //   y
      // );
      // doc.text(
      //   item.making_per_gram ? item.making_per_gram.toString() : "N/A",
      //   startX + 11.5 * columnWidth,
      //   y
      // );
      // doc.text(
      //   item.stoneAmount ? item.stoneAmount.toString() : "N/A",
      //   startX + 13 * columnWidth,
      //   y
      // );
      doc.text(
        item.tid ? item.tid.toString() : "N/A",
        startX + 7.5 * columnWidth,
        y
      );
      y += lineHeight + margin;
    });

    // Add page numbers
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 50, pageHeight - 10);
    }

    // Get PDF data as Uint8Array
    const pdfData = doc.output();

    // Create a new Blob from the PDF data
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });

    // Create a URL from the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    window.open(pdfUrl, "_blank");
  };
  let categoryId = parseInt(categoryName.split(",")[0]);
  let categoryNameSelected = categoryName.split(",")[1];
  const filteredProductTypes = allProductTypes.filter(
    (product) => product.CategoryId == categoryId
  );
  let productTypeIdSelected = parseInt(productName.split(",")[0]);
  let productNameSelected = productName.split(",")[1];
  let collectionTypeIdSelected = collectionName.split(",")[0];
  let collectionNameSelected = collectionName.split(",")[1];
  let purityTypeIdSelected = purityName.split(",")[0];
  let purityNameSelected = purityName.split(",")[1];
  const filteredCollection = allCollectionTypes.filter(
    (product) => product.ProductId == productTypeIdSelected
  );
  const filteredPurities = allPurityTypes.filter(
    (product) => product.CategoryId == categoryId
  );

  const handleDisplayTable = (e) => {
    setDisplayTable("All");
    console.log(e, "E");
    if (displayTable === "All") {
      setDisplayTable("Category");
      setCategoryName(`${e.Id},${e.Category}`);
      // fetchStockReportByProduct()
    } else if (displayTable === "Category") {
      setDisplayTable("Product");
      setProductName(`${e.ProductId},${e.Product}`);
    } else {
      fetchDefaultStockReport();
    }
  };

  return (
    <div>
      <AdminHeading />
      <div style={{ paddingTop: "130px" }}>
        <AdminBreadCrump
          title={"Stock Report"}
          companyName={"Loyalstring"}
          module={"Reports"}
          page={"Stock Report"}
        />
        <div className="adminAddCategoryMainBox">
          <div className="adminAddCategoryInnerBox">
            <div className={loading == true ? "loading" : "none"}>
              {/* <h1>Loading...</h1> */}
              {/* <InfinitySpin width="200" color="#4fa94d" /> */}
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
              />
            </div>

            {!loading == true ? (
              <div>
                <div
                  style={{
                    width: "100%",
                    justifyContent: "left",
                    flexWrap: "wrap",
                  }}
                  className="adminAllProductsFilterBox"
                >
                  <div className="adminAllProductsFilterCategoryBox">
                    <select
                      value={stockType}
                      onChange={(e) => {
                        setStockType(e.target.value);
                        // setCurrentPage(1);
                      }}
                    >
                      <option value="">Stock Type</option>
                      <option value="Labelled Stock">Labelled</option>
                      <option value="Unlabelled Stock">Unlabelled</option>
                    </select>
                    <select
                      value={categoryName}
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="">Select Category</option>
                      {allCategories.map((x) => {
                        return (
                          <option value={`${x.Id},${x.CategoryName}`}>
                            {x.CategoryName}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      value={purityName}
                      onChange={(e) => {
                        setPurityName(e.target.value);
                        // setCurrentPage(1);
                      }}
                    >
                      <option value="0">Select Purity</option>
                      {filteredPurities.map((x) => {
                        return (
                          <option value={`${x.Id},${x.PurityName}`}>
                            {x.PurityName}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      value={productName}
                      onChange={(e) => {
                        setProductName(e.target.value);
                        setCurrentPage(1);
                        setCollectionName("");
                      }}
                    >
                      <option value="">Select Product Type</option>
                      {filteredProductTypes.map((x) => {
                        return (
                          <option value={`${parseInt(x.Id)},${x.ProductName}`}>
                            {x.ProductName}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      value={collectionName}
                      onChange={(e) => {
                        setCollectionName(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="">Select Design</option>
                      {filteredCollection.map((x) => {
                        return (
                          <option value={`${parseInt(x.Id)},${x.DesignName}`}>
                            {x.DesignName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="adminAllProductsFilterDatesBox">
                    {/* <div
                          style={{
                            display: "flex",
                            marginTop: "1rem",
                            alignItems: "center",
                          }}
                        > */}
                    <input
                      style={{ cursor: "pointer" }}
                      type="date"
                      placeholder="From Date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />

                    <input
                      // style={{ margin: "1rem" }}
                      type="date"
                      placeholder="To Date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                  <div className="adminAllLabelledListButtonBox">
                    {/* <button onClick={printAll}>Print</button> */}
                    <button onClick={printList}>Print List</button>
                    {/* <button onClick={printListAll}>Print List</button> */}

                    <button
                      onClick={() => {
                        // setSelectedProducts([]),
                        // setSelectAll(false),
                        setCategoryName(""),
                          setProductName(""),
                          setCollectionName(""),
                          setStockType(""),
                          setDisplayTable("ALL"),
                          setFromDate(today.toISOString().split("T")[0]),
                          setToDate(today.toISOString().split("T")[0]);
                        // setFilteredProducts();
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            {/* {displayTable == "All" ? ( */}
            {!loading2 ? (
              <AdminReportTable
                data={tablesDataDefault}
                handleDisplayTable={handleDisplayTable}
                currentDisplay={displayTable}
                // data={uniqueProductsArray}
                // tableHeads={tablesHead}
              />
            ) : null}
            {/* ) : displayTable == "Category" ? ( */}
            {/* <AdminReportTable
                data={tablesDataDefault}
                handleDisplayTable={handleDisplayTable}
                currentDisplay={displayTable}
                // data={uniqueProductsArray}
                // tableHeads={tablesHead}
              /> */}
            {/* ) : null} */}
          </div>
        </div>
      </div>
    </div>
  );
}
