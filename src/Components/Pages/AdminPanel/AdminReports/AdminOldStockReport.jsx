import React from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  a125,
  a128,
  a131,
  a18,
  a20,
  a216,
  a33,
  a41,
  a47,
  a82,
} from "../../../Api/RootApiPath";
import { useState } from "react";
import { InfinitySpin, MagnifyingGlass } from "react-loader-spinner";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import "../../PagesStyles/AdminEcommerce.css";

export default function AdminOldStockReport() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [labelCode, setLabelCode] = useState("");
  const [barCode, setBarCode] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [allProductTypes, setAllProductTypes] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [allCollectionTypes, setAllCollectionTypes] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [selectedItemCodes, setSelectedItemCodes] = useState([]);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const [deleteSelectedButton, setDeleteSelectedButton] = useState(false);
  const [selectBranch, setSelectBranch] = useState("");
  const [labelledProducts, setLabelledProducts] = useState([]);
  const [unlabelledProducts, setUnLabelledProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [stockType, setStockType] = useState("");
  const productsPerPage = 100;

  const navigate = useNavigate();
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  const clientCode = adminLoggedIn.ClientCode;
  let Entryby_Staff_id = parseInt(adminLoggedIn);

  const fetchCategories = () => {
    // setLoading(true);
    const formData = { ClientCode: clientCode };
    fetch(a125, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        setAllCategories(response);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchProductTypes = async () => {
    // setLoading(true);
    const formData = { ClientCode: clientCode };
    await fetch(a128, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        setAllProductTypes(response);
      });
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);
  const fetchCollectonData = async () => {
    const formData = { ClientCode: clientCode };
    await fetch(a131, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        setAllCollectionTypes(response);
      });
  };

  useEffect(() => {
    fetchCollectonData();
  }, []);

  const fetchAllProducts = async () => {
    // setLoading(true);
    const formData = { ClientCode: clientCode };
    try {
      const response = await fetch(a216, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data, "all Products Data");
      console.log(data, "all Products Data");
      console.log(data, "all Products Data");
      const activeProduct = data.LabelledStocks.filter(
        (x) => x.Status !== "Sold"
      );
      console.log(activeProduct, "activeProduct");
      console.log(activeProduct, "activeProduct");
      console.log(activeProduct, "activeProduct");
      //   setLabelledProducts(data.data.reverse());
      setLabelledProducts(activeProduct.reverse());
      // setLabelledProducts(data.tblLabelledStocks.reverse());
      setUnLabelledProducts(data.UnlabelledStocks.reverse());
      setOrderedProducts(data.tblInvoiceDetails.reverse());
      //   setAllProducts(productsWithSerial.reverse());
      //   setAllProducts(data.data);
      setDeleteSelected(false);
      console.log(allProducts, "allProducts");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false); // Make sure to set loading to false even on error
    }
  };
  console.log(labelledProducts, "labelledProducts");
  console.log(labelledProducts, "labelledProducts");
  //   const productsData = useSelector((state) => state.reducer7.products);
  // console.log("Fetched Products:", productsData);
  //   useEffect(() => {
  //     setAllProducts(productsData);
  //   }, [allProducts]);
  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    fetchAllProducts();
    // fetchData();
  }, []);
  useEffect(() => {
    if (Entryby_Staff_id == 1) {
      setSelectBranch("Home");
    } else if (Entryby_Staff_id == 2) {
      setSelectBranch("Branch2");
    }
  }, []);
  // console.log(allProducts);
  // console.log(allProducts);
  // useEffect(() => {}, [currentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    console.log("nextClick");
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    console.log("prevClick");
  };
  const handleCheckboxChange = (productId) => {
    if (productId === "all") {
      // Select/deselect all checkboxes
      setSelectAll(!selectAll);
      setSelectedProducts(selectAll ? [] : allProducts.map((x) => x.id));
    } else {
      // Check if the product is already selected
      const isSelected = selectedProducts.includes(productId);

      // If the product is already selected, remove it from the list
      if (isSelected) {
        setSelectedProducts((prevSelected) =>
          prevSelected.filter((id) => id !== productId)
        );
      } else {
        // If the product is not selected, add it to the list
        setSelectedProducts((prevSelected) => [...prevSelected, productId]);
      }
    }
  };
  const printAll = () => {
    const selectedProductData = allProducts.filter((x) =>
      selectedProducts.includes(x.Id)
    );
    printPDF(selectedProductData);
    console.log("button", selectedProductData);
  };
  // Skkhandre New design
  const printPDF = async (products) => {
    const doc = new jsPDF({
      // format: [26, 12],
      format: [28, 12],
      orientation: "landscape",
    });

    const fontSize = 8;
    const imageHeight = 7;
    const imageWidth = 7;

    for (let i = 0; i < products.length; i++) {
      const {
        collection,
        grosswt,
        stoneWeight,
        netWt,
        stoneAmount,
        itemCode,
        purity,
        mrp,
        product_No,
        pieces,
        description,
        barcodeNumber,
      } = products[i];

      if (i > 0) {
        doc.addPage(); // Add a new page for each product after the first one
      }
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", "bold");
      // {
      //   collection.length > 20
      //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
      //     : doc.text(`${collection}`, 1, 3);
      // }

      if (mrp == 0 || mrp === "") {
        doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 2, 6);
        doc.text(`N.Wt: ${parseFloat(netWt).toFixed(3)}`, 2, 9);
        // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
        // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
        doc.text(`Pcs:${pieces}`, 19, 3);
        // doc.text(`${product_No}`, 4, 11.5);
        doc.text(`${itemCode}`, 2, 3);
        doc.text(`${purity}`, 22, 6);
        doc.setFontSize(7);
        {
          barcodeNumber
            ? doc.text(`${barcodeNumber}`, 2, 11.5)
            : doc.text("", 2, 11.5);
        }
        // doc.setFontSize(5);
        // const maxLineLength = 27;
        // const descriptionLine1 = description.substring(0, maxLineLength);
        // const descriptionLine2 = description.substring(
        //   maxLineLength,
        //   maxLineLength * 2
        // );

        // doc.text(descriptionLine1, 4, 10);
        // doc.text(descriptionLine2, 4, 11.5);
      } else {
        doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 3, 6);
        doc.text(`MRP: ${parseFloat(mrp)}`, 3, 9);
        doc.text(`Pcs:${pieces}`, 18, 3);
        // doc.text(`${product_No}`, 4, 11.5);
        // doc.text(`${product_No}`, 4, 11.5);
        doc.text(`${itemCode}`, 3, 3);
        doc.text(`${purity}`, 18, 6);
      }

      try {
        // const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
        // doc.addImage(qrCodeDataUrl, "JPEG", 3, 3, imageWidth, imageHeight);
      } catch (error) {
        console.error(error);
      }
    }

    const pdfData = doc.output("datauristring");
    const newWindow = window.open();
    newWindow.document.write(
      `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
    );
  };

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

  const filterOrders = () => {
    // let onlyActive = allProducts.filter((x) => x.onlineStatus === "Active");
    let filtered =
      stockType === "Unlabelled" ? unlabelledProducts : labelledProducts;
    // let filtered = allProducts;

    if (labelCode !== "") {
      filtered = filtered.filter((product) =>
        product.ItemCode.includes(labelCode)
      );
    }
    if (barCode !== "") {
      filtered = filtered.filter(
        (product) => product.RFIDCode && product.RFIDCode.includes(barCode)
      );
    }

    if (categoryName == "") {
      // setCategoryName(""),
      setProductName(""),
        setCollectionName(""),
        setFilteredProducts(allProducts);
      // console.log("categoryName", categoryName);
    }
    // if (productName == "") {
    //   setCollectionName("");
    //   filtered = filtered.filter(
    //     (product) =>
    //       product.category_Name &&
    //       product.category_Name.includes(categoryNameSelected)
    //   );
    //   setFilteredProducts(filtered);
    // }
    // if (collectionName == "") {
    //   filtered = filtered.filter(
    //     (product) =>
    //       product.itemType && product.itemType.includes(productNameSelected)
    //   );
    //   setFilteredProducts(filtered);
    // }
    if (categoryName !== "") {
      filtered = filtered.filter(
        (product) =>
          // product.CategoryName &&
          // product.CategoryName.includes(categoryNameSelected)
          product.CategoryId && product.CategoryId == categoryId
      );
    }
    if (productName !== "") {
      console.log("filteredProductsTypes1", filtered);
      filtered = filtered.filter(
        (product) =>
          // product.itemType && product.itemType.includes(productNameSelected)
          // product.ProductName && product.ProductName === productTypeIdSelected
          product.ProductId && product.ProductId === productTypeIdSelected
      );
      console.log("filteredProductsTypes2", filtered);
    }
    if (collectionName !== "") {
      filtered = filtered.filter(
        (product) =>
          product.DesignId && product.DesignId == collectionTypeIdSelected
      );
    }

    if (fromDate !== "" && toDate !== "") {
      filtered = filtered.filter((product) => {
        const createdDate = new Date(product.CreatedOn);
        return (
          createdDate >= new Date(fromDate) && createdDate <= new Date(toDate)
        );
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };
  console.log("Filtered", filteredProducts);
  useEffect(() => {
    filterOrders();
    window.scrollTo(0, 0);
    // console.log("filtered", filteredProducts);
    // console.log("ptype", allProductTypes);
  }, [
    categoryName,
    productName,
    collectionName,
    labelCode,
    barCode,
    allProducts,
    fromDate,
    toDate,
    stockType,
  ]);
  let categoryId = parseInt(categoryName.split(",")[0]);
  let categoryNameSelected = categoryName.split(",")[1];
  const filteredProductTypes = allProductTypes.filter(
    (product) => product.CategoryId == categoryId
  );
  let productTypeIdSelected = parseInt(productName.split(",")[0]);
  let productNameSelected = productName.split(",")[1];
  let collectionTypeIdSelected = collectionName.split(",")[0];
  let collectionNameSelected = collectionName.split(",")[1];
  const filteredCollection = allCollectionTypes.filter(
    (product) => product.ProductId == productTypeIdSelected
  );
  console.log("current", currentProducts);

  // const filteredCollection = collectionTypeData.filter(
  //   (product) => product.productType == productTypeName
  // );
  // console.log(filteredProducts);
  const handleDeleteCheckboxChange = (productId, itemCode) => {
    let updatedCheckedProducts = [...checkedProducts];
    let updatedSelectedItemCodes = [...selectedItemCodes];

    if (updatedCheckedProducts.includes(productId)) {
      updatedCheckedProducts = updatedCheckedProducts.filter(
        (id) => id !== productId
      );
      updatedSelectedItemCodes = updatedSelectedItemCodes.filter(
        (code) => code !== itemCode
      );
    } else {
      updatedCheckedProducts.push(productId);
      updatedSelectedItemCodes.push(itemCode);
    }

    if (updatedCheckedProducts.length > 0) {
      setDeleteSelectedButton(true);
    } else {
      setDeleteSelectedButton(false);
    }

    setCheckedProducts(updatedCheckedProducts);
    setSelectedItemCodes(updatedSelectedItemCodes);
  };
  const selectedItems = selectedItemCodes.map((itemCode) => ({
    ItemCode: itemCode,
  }));
  const deleteAllProducts = async (itemsToDelete) => {
    try {
      const response = await fetch(a47, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemsToDelete),
      });

      const rcvdData = await response.json();
      console.log("AllItemsDeleted", rcvdData);
      console.log("Responsee:", rcvdData.message);
      if (rcvdData.status == "Success") {
        // Deletion was successful
        // console.log("Item deleted successfully:", response.message);
        alert(rcvdData.message);
        setSelectedItemCodes([]);
        setCheckedProducts([]);
        fetchAllProducts();
        // You can show an alert or notification here
        // alert(data.message);

        setDeleteSelectedButton(false);
      } else {
        // Handle the case where deletion failed
        console.error("Failed to delete item:", response.message);

        // You can show an error message to the user
        alert("Failed to delete item: " + response.message);
      }
    } catch (error) {
      // Handle any network or fetch API errors
      console.error("An error occurred:", error);

      // Show an error message to the user
      // alert("An error occurred while deleting the item.");
    }
  };

  // UniqueProducts
  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0]; // Format: 'YYYY-MM-DD'

  const uniqueProducts = filteredProducts.reduce((acc, product) => {
    //   const uniqueProducts = currentProducts.reduce((acc, product) => {
    const collectionName = product.DesignName;

    // Check if the collectionName is already in the accumulator
    if (!acc[collectionName]) {
      // If not, initialize it with the current product
      acc[collectionName] = {
        ...product,
        count: 1,
        OpeningGrosswt: 0,
        OpeningStonewt: 0,
        OpeningNetwt: 0,
        OpeningPieces: 0,
        OpeningQuantity: 0,
        ClosingGrosswt: 0,
        ClosingStonewt: 0,
        ClosingNetwt: 0,
        ClosingPieces: 0,
        ClosingQuantity: 0,
      };
    }
    const createdDate = new Date(product.CreatedOn).toISOString().split("T")[0];
    // If yes, update the values (e.g., sum the values)
    acc[collectionName].OpeningGrosswt +=
      createdDate < todaysDate ? parseFloat(product.GrossWt) : 0;
    acc[collectionName].OpeningNetwt +=
      createdDate < todaysDate ? parseFloat(product.NetWt) : 0;
    acc[collectionName].OpeningStonewt +=
      createdDate < todaysDate ? parseFloat(product.TotalStoneWeight) : 0;
    acc[collectionName].OpeningPieces +=
      createdDate < todaysDate ? parseFloat(product.Pieces) : 0;
    acc[collectionName].OpeningQuantity +=
      createdDate < todaysDate ? parseFloat(product.Quantity) : 0;

    acc[collectionName].ClosingGrosswt +=
      createdDate <= todaysDate ? parseFloat(product.GrossWt) : 0;
    acc[collectionName].ClosingNetwt +=
      createdDate <= todaysDate ? parseFloat(product.NetWt) : 0;
    acc[collectionName].ClosingStonewt +=
      createdDate <= todaysDate ? parseFloat(product.TotalStoneWeight) : 0;
    acc[collectionName].ClosingPieces +=
      createdDate <= todaysDate ? parseFloat(product.Pieces) : 0;
    acc[collectionName].ClosingQuantity +=
      createdDate <= todaysDate ? parseFloat(product.Quantity) : 0;

    // acc[collectionName].stoneWeight = acc[collectionName].stoneWeight
    //   ? parseFloat(acc[collectionName].stoneWeight) +
    //     parseFloat(product.stoneWeight)
    //   : parseFloat(product.stoneWeight);

    // acc[collectionName].netWt = acc[collectionName].netWt
    //   ? parseFloat(acc[collectionName].netWt) + parseFloat(product.netWt)
    //   : parseFloat(product.netWt);

    // acc[collectionName].mrp = acc[collectionName].mrp
    //   ? parseFloat(acc[collectionName].mrp) + parseFloat(product.mrp)
    //   : parseFloat(product.mrp);
    // acc[collectionName].pieces = acc[collectionName].pieces
    //   ? parseFloat(acc[collectionName].pieces) + parseFloat(product.pieces)
    //   : parseFloat(product.pieces);
    // acc[collectionName].quantity = acc[collectionName].quantity
    //   ? parseFloat(acc[collectionName].quantity) + parseFloat(product.quantity)
    //   : parseFloat(product.quantity);

    acc[collectionName].count++;

    return acc;
  }, {});
  console.log(uniqueProducts, "uniqueProducts");
  console.log(uniqueProducts, "uniqueProducts");
  console.log(uniqueProducts, "uniqueProducts");
  // UniqueProducts
  return (
    <div>
      <AdminHeading />
      <div style={{ paddingTop: "130px" }}>
        <AdminBreadCrump
          title={"Inventory"}
          companyName={"Loyalstring"}
          module={"E-commerce"}
          page={"Inventory"}
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
                  <div className="adminAllProductsFilterLabelBox">
                    {/* <div className="adminAllOrderLeftBox"> */}
                    <input
                      type="text"
                      placeholder="Label..."
                      value={labelCode}
                      onChange={(e) => {
                        setLabelCode(e.target.value.toUpperCase());
                        setCurrentPage(1);
                        filterOrders();
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Barcode..."
                      value={barCode}
                      onChange={(e) => {
                        setBarCode(e.target.value.toUpperCase());
                        setCurrentPage(1);
                        filterOrders();
                      }}
                    />
                  </div>

                  <div className="adminAllProductsFilterCategoryBox">
                    <select
                      value={stockType}
                      onChange={(e) => {
                        setStockType(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="">Select Category</option>
                      <option value="Labelled">Labelled</option>
                      <option value="Unlabelled">Unlabelled</option>
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

                    <AiOutlineEdit
                      className="labelledListEditIcon"
                      style={{ padding: "5px" }}
                      size={"1.5rem"}
                      onClick={() => {
                        setDeleteSelected(!deleteSelected),
                          setSelectedItemCodes([]),
                          setCheckedProducts([]),
                          setDeleteSelectedButton(false);
                      }}
                    />
                  </div>
                  <div className="adminAllLabelledListButtonBox">
                    <button onClick={printAll}>Print</button>
                    <button onClick={printList}>Print List</button>

                    <button
                      onClick={() => {
                        setSelectedProducts([]),
                          setSelectAll(false),
                          setCategoryName(""),
                          setProductName(""),
                          setCollectionName(""),
                          setFromDate(""),
                          setToDate(""),
                          setFilteredProducts(allProducts);
                      }}
                    >
                      Reset
                    </button>
                    {deleteSelectedButton ? (
                      <button
                        onClick={() => deleteAllProducts(selectedItems)}
                        style={{ backgroundColor: "#c14456", color: "white" }}
                      >
                        Delete Selected
                      </button>
                    ) : null}
                  </div>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table
                    className="adminInventoryMainTable"
                    style={{
                      width: "100%",
                      marginLeft: "1rem",
                      boxSizing: "border-box",
                    }}
                  >
                    <thead>
                      <tr>
                        {deleteSelected ? <th>Delete Item</th> : null}
                        <th>S.No</th>
                        <th>Design Name</th>
                        <th>Opening Gross Wt</th>
                        <th>Opening Stone WT</th>
                        <th>Opening Net Wt</th>
                        {stockType === "Unlabelled" ? (
                          <th>Opening Quantity</th>
                        ) : (
                          <th>Opening Pieces</th>
                        )}
                        <th>Closing Gross Wt</th>
                        <th>Closing Stone WT</th>
                        <th>Closing Net Wt</th>
                        {stockType === "Unlabelled" ? (
                          <th>Closing Quantity</th>
                        ) : (
                          <th>Closing Pieces</th>
                        )}

                        {/* <th>Tid</th> */}
                      </tr>
                    </thead>
                    <tbody style={{ position: "relative" }}>
                      {/* {currentProducts.map((x, index) => {
                          const uniqueCollectionName= currentProducts.reduce((a,b)=>{
                              
                          })
                          return(
                          <tr key={x.id}>
                           
                            {deleteSelected ? (
                              <td>
                                <input
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                    color: "red",
                                  }}
                                  type="checkbox"
                                  checked={checkedProducts.includes(x.id)}
                                  onChange={() =>
                                    handleDeleteCheckboxChange(x.id, x.itemCode)
                                  }
                                />
                              </td>
                            ) : null}
                            <td>{x.serialNumber}</td>
                        
                            <td
                              onClick={() => {
                                navigate(`/product_details?productId=${x.id}`);
                              }}
                              className="adminAllProductsTitle"
                            >
                              {x.collection}
                            </td>
                            <td>{parseFloat(x.grosswt).toFixed(3)}</td>
                            <td>{parseFloat(x.stoneWeight).toFixed(3)}</td>
                            <td>{parseFloat(x.netWt).toFixed(3)}</td>
                           
                            <td>₹ {x.mrp}</td>
                            <td>{x.itemCode}</td>
                            <td>{x.barcodeNumber}</td>
                            <td>{x.branchName}</td>
                      
                            <td>{x.tid}</td>
                            <td>
                              <input
                                style={{
                                  cursor: "pointer",
                                }}
                                onChange={() => handleCheckboxChange(x.id)}
                                type="checkbox"
                                checked={
                                  selectAll || selectedProducts.includes(x.id)
                                }
                              />
                            </td>
                          </tr>
                        )})} */}
                      {Object.values(uniqueProducts).map(
                        (uniqueProduct, index) => (
                          <tr key={index}>
                            {/* Your existing table cells */}
                            <td>{index + 1}</td>
                            <td>{uniqueProduct.DesignName}</td>
                            <td>
                              {parseFloat(uniqueProduct.OpeningGrosswt).toFixed(
                                3
                              )}
                            </td>
                            <td>
                              {parseFloat(uniqueProduct.OpeningStonewt).toFixed(
                                3
                              )}
                            </td>
                            <td>
                              {parseFloat(uniqueProduct.OpeningNetwt).toFixed(
                                3
                              )}
                            </td>
                            {stockType === "Unlabelled" ? (
                              <td> {uniqueProduct.OpeningQuantity}</td>
                            ) : (
                              <td> {uniqueProduct.OpeningPieces}</td>
                            )}

                            <td>
                              {parseFloat(uniqueProduct.ClosingGrosswt).toFixed(
                                3
                              )}
                            </td>
                            <td>
                              {parseFloat(uniqueProduct.ClosingStonewt).toFixed(
                                3
                              )}
                            </td>
                            <td>
                              {parseFloat(uniqueProduct.ClosingNetwt).toFixed(
                                3
                              )}
                            </td>
                            {stockType === "Unlabelled" ? (
                              <td> {uniqueProduct.ClosingQuantity}</td>
                            ) : (
                              <td> {uniqueProduct.ClosingPieces}</td>
                            )}
                            {/* Add more cells as needed */}

                            {/* Your existing table cells */}
                          </tr>
                        )
                      )}
                    </tbody>
                    {/* <div className="adminAllLabelledListButtonBox">
                          <button onClick={printAll}>Print</button>
                          <button onClick={printList}>Print List</button>
    
                          <button
                            onClick={() => {
                              setSelectedProducts([]),
                                setSelectAll(false),
                                setCategoryName(""),
                                setProductName(""),
                                setCollectionName(""),
                                setFromDate(""),
                                setToDate(""),
                                setFilteredProducts(allProducts);
                            }}
                          >
                            Reset
                          </button>
                          {deleteSelectedButton ? (
                            <button
                              onClick={() => deleteAllProducts(selectedItems)}
                              style={{ backgroundColor: "#c14456", color: "white" }}
                            >
                              Delete Selected
                            </button>
                          ) : null}
                        </div> */}
                  </table>
                </div>
              </div>
            ) : null}

            {/* Pagination controls */}
            <div className="bulkProductAddingTableMain">
              <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="adminInventoryMobilePrintButtonsBox">
        <button onClick={printAll}>Print</button>
        <button onClick={printList}>Print List</button>

        <button
          onClick={() => {
            setSelectedProducts([]),
              setSelectAll(false),
              setCategoryName(""),
              setProductName(""),
              setCollectionName(""),
              setFromDate(""),
              setToDate(""),
              setFilteredProducts(allProducts);
          }}
        >
          Reset
        </button>
        {deleteSelectedButton ? (
          <button
            onClick={() => deleteAllProducts(selectedItems)}
            style={{ backgroundColor: "#c14456", color: "white" }}
          >
            Delete Selected
          </button>
        ) : null}
      </div>
    </div>
  );
}
