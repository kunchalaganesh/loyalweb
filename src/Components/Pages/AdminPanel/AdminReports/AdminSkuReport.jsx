import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import {
  a125,
  a128,
  a131,
  a134,
  a149,
  a163,
  a221,
  a222,
} from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { MagnifyingGlass } from "react-loader-spinner";
import { ExportToExcel } from "../../../Other Functions/ExportToExcel";

export default function AdminSkuReport() {
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  const clientCode = adminLoggedIn.ClientCode;
  const [allSkuKarigarReport, setAllSkuKarigarReport] = useState([]);
  const [filteredSkuKarigarReport, setFilteredSkuKarigarReport] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [vendorName, setVendorName] = useState("");
  const [loading, setLoading] = useState(true);

  const [allCategories, setAllCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [allProductTypes, setAllProductTypes] = useState([]);
  const [productName, setProductName] = useState("");
  const [allCollectionTypes, setAllCollectionTypes] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [allPurityTypes, setAllPurityTypes] = useState([]);
  const [purityName, setPurityName] = useState("");
  const [allSku, setAllSku] = useState([]);
  const [skuName, setSkuName] = useState("");

  const today = new Date();
  const [fromDate, setFromDate] = useState(today.toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(today.toISOString().split("T")[0]);

  const fetchAllVendors = async () => {
    setLoading(true);
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a149, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data, "data");
    setAllVendors(data);
  };

  useEffect(() => {
    fetchAllVendors();
  }, []);

  const fetchAllCategory = async () => {
    setLoading(true);
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
        fetchAllSkuData();
      });
  };
  const fetchAllSkuData = async () => {
    const formData = { ClientCode: clientCode };
    await fetch(a163, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        setAllSku(response);
        fetchAllSkuKarigarReport();
      });
  };
  const fetchAllSkuKarigarReport = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a222, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setAllSkuKarigarReport(data);
    setFilteredSkuKarigarReport(data);
    setLoading(false);
    console.log(data, "data");
  };
  useEffect(() => {
    fetchAllSkuKarigarReport();
  }, []);

  let categoryId = parseInt(categoryName.split(",")[0]);
  let categoryNameSelected = categoryName.split(",")[1];
  let productTypeIdSelected = parseInt(productName.split(",")[0]);
  let productNameSelected = productName.split(",")[1];
  let collectionTypeIdSelected = collectionName.split(",")[0];
  let collectionNameSelected = collectionName.split(",")[1];
  let purityTypeIdSelected = purityName.split(",")[0];
  let purityNameSelected = purityName.split(",")[1];

  const selectedVendorId = vendorName.split(",")[0];
  const selectedVendorName = vendorName.split(",")[1];

  const filteredProductTypes = allProductTypes.filter(
    (product) => product.CategoryId == categoryId
  );

  const filteredCollection = allCollectionTypes.filter(
    (product) => product.ProductId == productTypeIdSelected
  );

  const filteredPurities = allPurityTypes.filter(
    (product) => product.CategoryId == categoryId
  );

  const filterReports = () => {
    let filteredReports = allSkuKarigarReport;

    if (vendorName) {
      const vendorId = parseInt(vendorName.split(",")[0]);
      filteredReports = filteredReports.filter((x) => x.VendorId === vendorId);
    }
    if (categoryName) {
      const categoryId = parseInt(categoryName.split(",")[0]);
      filteredReports = filteredReports.filter(
        (x) => x.CategoryId === categoryId
      );
    }
    if (productName) {
      const productTypeId = parseInt(productName.split(",")[0]);
      filteredReports = filteredReports.filter(
        (x) => x.ProductId === productTypeId
      );
    }
    if (collectionName) {
      const collectionId = parseInt(collectionName.split(",")[0]);
      filteredReports = filteredReports.filter(
        (x) => x.DesignId === collectionId
      );
    }
    if (purityName) {
      const purityId = parseInt(purityName.split(",")[0]);
      filteredReports = filteredReports.filter((x) => x.PurityId === purityId);
    }
    if (skuName) {
      const skuId = parseInt(skuName.split(",")[0]);
      filteredReports = filteredReports.filter((x) => x.SKUId === skuId);
    }

    setFilteredSkuKarigarReport(filteredReports);
  };

  useEffect(() => {
    filterReports();
  }, [
    vendorName,
    categoryName,
    productName,
    collectionName,
    purityName,
    skuName,
  ]);

  const printList = () => {
    printListAll(filteredSkuKarigarReport);
  };
  const printExcel = () => {
    const excelData = filteredSkuKarigarReport.map((x) => {
      return {
        Code: x.SKU,
        ItemName: x.ItemName,
        Pc: x.Pc,
        StonePcs: x.StonePcs,
        StoneWeight: x.StoneWeight,
        FineWeight: x.FineWeight,
      };
    });
    ExportToExcel(
      excelData,
      `${vendorName} - ${today.toISOString().split("T")[0]}`
    );
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
  return (
    <div>
      <AdminHeading />
      <div style={{ paddingTop: "130px" }}>
        <AdminBreadCrump
          title={"SKU Report"}
          companyName={"Loyalstring"}
          module={"Reports"}
          page={"SKU Report"}
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
                <div className="adminAllProductsFilterDatesBox">
                  <select
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                      // setCurrentPage(1);
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
                </div>
                <div className="adminAllProductsFilterDatesBox">
                  <select
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                      // setCurrentPage(1);
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
                      // setCurrentPage(1);
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
                <div
                  style={{
                    width: "100%",
                    justifyContent: "left",
                    flexWrap: "wrap",
                  }}
                  className="adminAllProductsFilterBox"
                >
                  {/* <div className="adminAllProductsFilterCategoryBox"> */}
                  <div className="adminAllProductsFilterDatesBox">
                    <select
                      value={vendorName}
                      onChange={(e) => {
                        setVendorName(e.target.value);
                      }}
                    >
                      <option value="">Select Vendor</option>
                      {allVendors.map((x) => {
                        return (
                          <option value={`${x.Id},${x.VendorName}`}>
                            {x.VendorName}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      value={skuName}
                      onChange={(e) => {
                        setSkuName(e.target.value);
                        // setCurrentPage(1);
                      }}
                    >
                      <option value="">Select Sku</option>
                      {allSku.map((x) => {
                        return (
                          <option
                            value={`${parseInt(x.Id)},${x.StockKeepingUnit}`}
                          >
                            {x.StockKeepingUnit}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="adminAllLabelledListButtonBox">
                    {/* <button onClick={printAll}>Print</button> */}
                    <button onClick={printList}>Print List</button>
                    <button onClick={printExcel}>Export Excel</button>
                    {/* <button onClick={printListAll}>Print List</button> */}

                    <button
                      onClick={() => {
                        setVendorName(""),
                          setCategoryName(""),
                          setProductName(""),
                          setCollectionName(""),
                          setPurityName(""),
                          setSkuName("");
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="adminReportTableMainBox">
              <table className="adminReportTable">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Item Name</th>
                    <th>QTY</th>
                    <th>Total Wt</th>
                    <th>Packing Wt</th>
                    <th>Gross Wt</th>
                    <th>Stone Pcs</th>
                    <th>Stone Wt</th>
                    <th>Net Wt</th>
                    <th>Fine Wt</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSkuKarigarReport.map((item, index) => (
                    <tr key={index}>
                      <td>{item.SKU}</td>
                      <td>{item.ItemName}</td>
                      <td>{item.Pc}</td>
                      <td>{item.TotalWeight}</td>
                      <td>{item.PackingWeight}</td>
                      <td>{item.GrossWeight}</td>
                      <td>{item.StonePcs}</td>
                      <td>{item.StoneWeight}</td>
                      <td>{item.NetWeight}</td>
                      <td>{item.FineWeight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
