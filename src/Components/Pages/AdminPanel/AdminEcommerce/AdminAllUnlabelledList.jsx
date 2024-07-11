import React from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  a18,
  a20,
  a31,
  a33,
  a41,
  a43,
  a47,
  a56,
  a57,
  a8,
} from "../../../Api/RootApiPath";
import { useState } from "react";
import { InfinitySpin, MagnifyingGlass } from "react-loader-spinner";
import { RxCross2 } from "react-icons/rx";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { BsHandbag } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineFileAdd } from "react-icons/ai";
import { BiSave, BiListUl } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import "../../PagesStyles/AdminEcommerce.css";

export default function AdminAllUnlabelledList() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(true);

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
  const [selectedEditItem, setSelectEditItem] = useState([]);
  const [selectedEditQuantity, setSelectEditQuantity] = useState("");
  const [selectedEditQuantityBefore, setSelectedEditQuantityBefore] =
    useState(0);
  const [showAllFields, setShowAllFields] = useState(false);
  const [pageType, setPageType] = useState("");
  const [labelItemBox, setLabelItemBox] = useState(false);
  const [showAddBtn, setShowAddBtn] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);
  const [rifdData, setRifdData] = useState([]);
  const [goldAlert, setGoldAlert] = useState(false);
  const [barCodeAlert, setBarCodeAlert] = useState(false);

  const [barcodeNumbersArray, setBarcodeNumbersArray] = useState([]);
  const [piecesBox, setPiecesBox] = useState(false);
  const [productPiecesEditId, setProductPiecesEditId] = useState(0);
  const [halfInputs, setHalfInputs] = useState(true);
  const productsPerPage = 100;

  const navigate = useNavigate();

  const fetchCategories = () => {
    // setLoading(true);
    fetch(a18)
      .then((res) => res.json())
      .then((response) => {
        setAllCategories(response.data);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchProductTypes = async () => {
    // setLoading(true);
    await fetch(a20)
      .then((res) => res.json())
      .then((response) => {
        setAllProductTypes(response.data);
      });
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);
  const fetchCollectonData = async () => {
    await fetch(a33)
      .then((res) => res.json())
      .then((response) => {
        setAllCollectionTypes(response.data);
      });
  };

  useEffect(() => {
    fetchCollectonData();
  }, []);

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  let Entryby_Staff_id = parseInt(adminLoggedIn);

  const fetchAllProducts = async () => {
    // setLoading(true);
    try {
      const response = await fetch(a56);
      const data = await response.json();
      let branchProducts = data.data;
      console.log(branchProducts, "branchProducts");
      // Add a serial number property to each product
      if (selectBranch === "Home" || selectBranch === "Branch 2") {
        branchProducts = data.data.filter((x) => x.branchName === selectBranch);
      } else {
        branchProducts = data.data;
      }
      const productsWithSerial = branchProducts.map((product, index) => ({
        ...product,
        serialNumber: index + 1,
      }));

      // setAllProducts(productsWithSerial.reverse()); // Assuming data.data is an array of products
      setAllProducts(productsWithSerial.reverse());
      //   setAllProducts(data.data);
      setDeleteSelected(false);
      console.log(allProducts, "allProducts");
      setLoading(false);
      scrollToCenter("adminUnlabelledStockMainOuterBoxTop");
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false); // Make sure to set loading to false even on error
    }
  };

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
      (total, item) => total + (parseFloat(item.netWt) || 0),
      0
    );
    const totalGrossWt = data.reduce(
      (total, item) => total + (parseFloat(item.grosswt) || 0),
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
        item.grosswt ? item.grosswt.toString() : "N/A",
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
    let filtered = allProducts;

    if (labelCode !== "") {
      filtered = filtered.filter((product) =>
        product.itemCode.includes(labelCode)
      );
    }
    if (barCode !== "") {
      filtered = filtered.filter(
        (product) =>
          product.barcodeNumber && product.barcodeNumber.includes(barCode)
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
          product.category_Name &&
          product.category_Name.includes(categoryNameSelected)
      );
    }
    if (productName !== "") {
      console.log("filteredProductsTypes1", filtered);
      filtered = filtered.filter(
        (product) =>
          // product.itemType && product.itemType.includes(productNameSelected)
          product.productTypeId &&
          product.productTypeId === productTypeIdSelected
      );
      console.log("filteredProductsTypes2", filtered);
    }
    if (collectionName !== "") {
      filtered = filtered.filter(
        (product) =>
          product.collection &&
          product.collection.includes(collectionNameSelected)
      );
    }

    if (fromDate !== "" && toDate !== "") {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdOn);
        orderDate.setHours(0, 0, 0, 0); // Set time to midnight

        const fromDateMidnight = new Date(fromDate);
        fromDateMidnight.setHours(0, 0, 0, 0); // Set time to midnight

        const toDateMidnight = new Date(toDate);
        toDateMidnight.setHours(0, 0, 0, 0); // Set time to midnight

        return orderDate >= fromDateMidnight && orderDate <= toDateMidnight;
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
  ]);
  let categoryId = parseInt(categoryName.split(",")[0]);
  let categoryNameSelected = categoryName.split(",")[1];
  const filteredProductTypes = allProductTypes.filter(
    (product) => product.category_id == categoryId
  );
  let productNameSelected = productName.split(",")[1];
  let productTypeIdSelected = parseInt(productName.split(",")[0]);
  let collectionNameSelected = collectionName.split(",")[1];
  const filteredCollection = allCollectionTypes.filter(
    (product) => product.productType == productNameSelected
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
  console.log("productName", productName);

  const editUnlabelItem = (item) => {
    setSelectEditItem([item]);
    setPageType("Edit");
    console.log(item, "Item Selected");
    scrollToCenter("adminUnlabelledStockMainAddLabelBox");
  };
  const openLabelBox = (item) => {
    setSelectEditItem([item]);
    setLabelItemBox(true);
    console.log(item, "Item Selected");
    // scrollToCenter("adminUnlabelledStockMainAddLabelBox");
  };
  useEffect(() => {
    // Scroll to the element when pageType changes to "Edit"
    if (pageType === "Edit") {
      scrollToCenter("adminUnlabelledStockMainAddLabelBox");
    }
  }, [pageType]);
  console.log(selectedEditItem, "selectedEditItem");

  const handleInputChange = (e, productId, property) => {
    // const barcodeInput = document.getElementById("barcodeNumberInput");
    // barcodeInput.style.setProperty("color", "black");
    const { value } = e.target;
    // setBarCodeAlert(false);
    const updatedProducts = selectedEditItem.map((product) => {
      if (product.id === productId) {
        // Parse properties to numbers or set them as 0 if the value is empty or invalid
        const grosswt = parseFloat(product.grosswt) || 0;
        const stoneWeight = parseFloat(product.stoneWeight) || 0;
        const netWt = parseFloat(product.netWt) || 0;

        // Update the specific property in the product object
        let updatedProduct = { ...product, [property]: value };

        if (property === "barcodeNumber") {
          // Convert the barcode number to uppercase before doing the comparison
          const barcodeValue = value.toUpperCase();
          updatedProduct.barcodeNumber = barcodeValue; // Set the barcodeNumber property to uppercase

          // Find a matching product in the rifdData array
          const matchingProduct = rifdData.find(
            (item) => item.barcodeNumber === barcodeValue
          );

          if (matchingProduct) {
            updatedProduct.tid = matchingProduct.tid;
          } else {
            // If no matching product found, set 'tid' to null or some default value
            updatedProduct.tid = null; // or any default value you want
            // setBarCodeAlert(true);
          }
        }

        // If 'grosswt' is changed, calculate 'netWt'
        if (property === "grosswt" && !isNaN(value)) {
          updatedProduct.netWt =
            parseFloat(value) - updatedProduct.stoneWeight > 0
              ? (parseFloat(value) - updatedProduct.stoneWeight).toFixed(3)
              : (updatedProduct.grosswt = value);
        }

        // If 'stoneWeight' is changed, calculate 'netWt'
        if (property === "stoneWeight" && !isNaN(value)) {
          updatedProduct.netWt =
            parseFloat(updatedProduct.grosswt) > value
              ? (updatedProduct.grosswt - parseFloat(value)).toFixed(3)
              : ((updatedProduct.grosswt = value),
                (updatedProduct.stoneWeight = value),
                (updatedProduct.netWt = 0));
        }

        // If 'netWt' is changed, calculate 'grosswt' and 'stoneWeight'
        if (property === "netWt" && !isNaN(value)) {
          updatedProduct.grosswt = (parseFloat(value) + stoneWeight).toFixed(3);
          updatedProduct.stoneWeight = (grosswt - parseFloat(value)).toFixed(3);
        }
        // if (property === "pieces" && value > 1) {
        //   //   setPiecesBox(true);
        //   setProductPiecesEditId(productId);
        //   handlePiecesChange(value, productId);
        // }

        return updatedProduct;
      }
      return product;
    });

    setSelectEditItem(updatedProducts);
  };
  const handleEditProductsUnlabelled = async () => {
    setLoading(true);
    console.log(selectedEditItem, "save");
    try {
      const updatedProductsString = selectedEditItem.map((product) => ({
        ...product,
        grosswt: product.grosswt.toString(),
        stoneWeight: product.stoneWeight.toString(),
        netWt: product.netWt.toString(),
        mrp: product.mrp.toString(),
        pieces: parseInt(product.pieces),
      }));
      const updatedProductsString2 = updatedProductsString.map((product) => {
        // Filter out properties with null values
        const filteredProduct = Object.fromEntries(
          Object.entries(product).filter(([key, value]) => value !== null)
        );
        return filteredProduct;
      });
      console.log(updatedProductsString2[0], "updatedProductsString");
      // Send the updated products to the edit API endpoint
      const response = await fetch(a57, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductsString2[0]),
      });
      const rcvdData = await response.json();
      console.log("rcvdData", rcvdData);
      // setSelectEditItem([rcvdData.data]);

      fetchAllProducts();
      if (rcvdData.status === "error") {
        setLoading(false);
        alert(rcvdData.message); // Show error message
      } else {
        // console.log("updatedProducts", updatedProducts);
        setLoading(false);
        setPageType("");
        scrollToCenter("adminUnlabelledStockMainItemsBox");
      }
    } catch (error) {
      alert(error);
      console.error(error);
      setLoading(false);
    }
  };
  const handleEditProductsUnlabelled2 = async (property, value) => {
    setLoading(true);
    console.log(selectedEditItem, "save");
    try {
      let updatedProductsString = "";
      // let totalGrossWt=""
      // let totalStoneWt=""
      // let totalNetWt=""
      if (property === "quantity") {
        updatedProductsString = selectedEditItem.map((product) => ({
          ...product,
          [property]: `${value}`,
        }));
      } else {
        const [totalGrossWt, totalStoneWt, totalNetWt] = value.split(",");
        console.log("I am here", totalGrossWt);
        updatedProductsString = selectedEditItem.map((product) => ({
          ...product,
          grosswt: `${product.grosswt - totalGrossWt}`,
          stoneWeight: `${product.stoneWeight - totalStoneWt}`,
          netWt: `${product.netWt - totalNetWt}`,
          quantity: `${product.quantity}`,
        }));
      }

      const updatedProductsString2 = updatedProductsString.map((product) => {
        // Filter out properties with null values
        const filteredProduct = Object.fromEntries(
          Object.entries(product).filter(([key, value]) => value !== null)
        );
        return filteredProduct;
      });
      console.log(updatedProductsString, "updatedProductsString1");
      console.log(updatedProductsString2[0], "updatedProductsString2");
      // Send the updated products to the edit API endpoint
      const response = await fetch(a57, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductsString2[0]),
      });
      const rcvdData = await response.json();
      console.log("rcvdData", rcvdData);
      setSelectEditItem([rcvdData.data]);
      setSelectedEditQuantityBefore(0);
      setSelectEditQuantity("");

      fetchAllProducts();
      if (rcvdData.status === "error") {
        setLoading(false);
        alert(rcvdData.message); // Show error message
      } else {
        // console.log("updatedProducts", updatedProducts);
        setLoading(false);
      }
    } catch (error) {
      alert(error);
      console.error(error);
      setLoading(false);
    }
  };
  const scrollToCenter = (elementId) => {
    const element = document.getElementById(elementId);
    const scrollableDiv = document.getElementById(
      "adminUnlabelledStockMainItemsBox"
    );
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
    if (element === "adminUnlabelledStockMainAddLabelBox") {
      scrollableDiv.scrollTop = 0;
    }
  };
  const handleQuantityChange = (e) => {
    const { value } = e.target;
    setShowAddBtn(false);
    // Check if the input is empty and reset the quantity to its original value
    if (value === "") {
      setSelectEditQuantity("");
      setSelectedEditQuantityBefore(selectedEditItem[0].quantity); // Assuming you want to reset the quantity before change to 0
      return; // Exit the function early to prevent further execution
    }

    // Parse the input value to an integer
    const newQuantity = parseInt(value, 10);

    // Check if the new quantity is a valid number, not negative, and less than or equal to the original quantity
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 0 &&
      newQuantity <= selectedEditItem[0].quantity
    ) {
      // Update the state with the new quantity
      setSelectEditQuantity(newQuantity);
      // Calculate the difference between the original quantity and the new quantity
      const quantityDifference = selectedEditItem[0].quantity - newQuantity;
      // Update the state with the quantity before change
      setSelectedEditQuantityBefore(quantityDifference);
      setShowAddBtn(true);
    } else {
      // Handle the case where the input is not a valid number, negative, or greater than the original quantity
      // Reset the input to its previous valid state or handle it as per your requirement
      setSelectEditQuantity("");
      setSelectedEditQuantityBefore(selectedEditItem[0].quantity);
      console.error("Invalid quantity input");
      // You can show an error message or handle it as per your requirement
    }
  };
  console.log(selectedEditItem, "selectedEditItem");
  console.log(selectedEditQuantity, "selectedEditQuantity");
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    let formData = new FormData();

    formData.append("Product_Name", selectedEditItem[0].product_Name);
    formData.append("Category_id", selectedEditItem[0].category_id);
    formData.append("Category_Name", selectedEditItem[0].category_Name);
    formData.append(
      "ProductTypeId",
      parseInt(selectedEditItem[0].productTypeId)
    );
    formData.append("CollectionId", parseInt(selectedEditItem[0].collectionId));
    formData.append("PartyTypeId", parseInt(selectedEditItem[0].partyTypeId));
    // formData.append("Party_Details", partyName);
    formData.append("purity", selectedEditItem[0].purity);
    formData.append("PurityId", selectedEditItem[0].purityId);
    formData.append("BoxId", parseInt(selectedEditItem[0].boxId));
    formData.append("MRP", parseFloat(selectedEditItem[0].mrp));
    formData.append("Quantity", parseInt(selectedEditQuantity));
    // formData.append(
    //   "grosswt",
    //   parseFloat(
    //     selectedEditItem[0].grosswt / parseInt(selectedEditItem[0].quantity)
    //   ).toFixed(3)
    // );
    // formData.append(
    //   "StoneWeight",
    //   selectedEditItem[0].stoneWeight / parseInt(selectedEditItem[0].quantity)
    // );
    // formData.append(
    //   "NetWt",
    //   parseFloat(
    //     selectedEditItem[0].netWt / parseInt(selectedEditItem[0].quantity)
    //   ).toFixed(3)
    // );
    formData.append("grosswt", 0);
    formData.append("StoneWeight", 0);
    formData.append("NetWt", 0);
    formData.append("Entryby_Staff_id", parseInt(Entryby_Staff_id));
    formData.append("Product_No", selectedEditItem[0].product_No);
    formData.append("Product_Code", selectedEditItem[0].product_Code);
    formData.append("Pieces", parseInt(selectedEditItem[0].pieces));
    formData.append("HUIDCode", selectedEditItem[0].huidCode);
    formData.append("Size", selectedEditItem[0].size);
    formData.append("collection", selectedEditItem[0].collection);
    formData.append("occasion", selectedEditItem[0].occasion);
    formData.append("gender", selectedEditItem[0].gender);
    formData.append("description", selectedEditItem[0].description);
    formData.append("Making_Fixed_Amt", selectedEditItem[0].making_Fixed_Amt);
    formData.append("Making_per_gram", selectedEditItem[0].making_per_gram);
    formData.append(
      "Making_Percentage",
      selectedEditItem[0].making_Percentage !== ""
        ? selectedEditItem[0].making_Percentage
        : "0"
    );
    formData.append(
      "Making_Fixed_Wastage",
      selectedEditItem[0].making_Fixed_Wastage
    );
    formData.append("StoneAmount", selectedEditItem[0].stoneAmount);
    formData.append("Featured", selectedEditItem[0].featured);
    formData.append("Itemtype", selectedEditItem[0].itemType);
    formData.append("Product_type", selectedEditItem[0].product_type);
    formData.append("branchName", selectedEditItem[0].branchName);
    // formData.append("BarcodeNumber", "");
    formData.append("Images", "");
    // selectedFiles.forEach((file) => {
    //   formData.append("Images", file);
    // });
    // formData.append("ImageList1", "");
    // formData.append("ImageList2", "");
    // formData.append("ImageList3", "");
    // formData.append("ImageList4", "");
    // formData.append("ImageList5", "");

    try {
      const response = await fetch(a8, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(formData),
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        // setSelectEditItem([data.data]);
        setLoading(false);
        // scrollToCenter("adminAddBulkStockAddedTitleStatement");
        scrollToCenter("adminAddBulkStockAddedProductsOuterBox");
        setLabelItemBox(false);
        // console.log("added", data);
        const allItemCodes = data.data.map((product) => ({
          ItemCode: product.itemCode,
        }));
        setAddedProducts(data.data);

        // setSelectEditItem([updatedProduct]);
        handleEditProductsUnlabelled2("quantity", selectedEditQuantityBefore);
        // fetchAllProducts();
        // Update the state with the updated product
        // setSelectedEditQuantityBefore(0);
        // setSelectEditQuantity("");
        // scrollToCenter("adminAddBulkStockAddedTitleStatement");
        // setData(data.data);
        // updateImages();
        // alert("added");
      } else {
        // Handle the error if the upload fails
        console.error("Failed to upload the files.");
      }
    } catch (error) {
      // Handle any network or fetch API errors
      console.error("An error occurred:", error);
    }
  };
  const playTimer = () => {
    setTimeout(() => {
      setGoldAlert(false), setBarCodeAlert(false);
    }, 2000);
  };
  const handleBarcodeNumberChange = (newValue, index) => {
    // Convert the barcode number to uppercase
    const uppercaseBarcodeNumber = newValue.toUpperCase();

    // Find a matching product in the rifdData array based on uppercaseBarcodeNumber
    const matchingProduct = rifdData.find(
      (item) => item.barcodeNumber === uppercaseBarcodeNumber
    );

    setBarcodeNumbersArray((prevBarcodeNumbersArray) => {
      const updatedArray = [...prevBarcodeNumbersArray];

      if (uppercaseBarcodeNumber.trim() === "") {
        // If barcode number is empty, update the array with an empty object
        updatedArray[index] = {};
      } else if (matchingProduct) {
        // If a matching product is found, update tid with the matching product's tid value
        const updatedItem = {
          [uppercaseBarcodeNumber]: matchingProduct.tid,
        };
        updatedArray[index] = updatedItem;
      } else {
        // If no matching product is found, set tid to an empty string
        const updatedItem = {
          [uppercaseBarcodeNumber]: "",
        };
        updatedArray[index] = updatedItem;
      }

      return updatedArray;
    });
  };
  const handlePiecesChange = (value, idRcvd, close) => {
    const updatedProducts = addedProducts.map((product) => {
      if (product.id === idRcvd) {
        const arrayOfObjects = [];

        for (let i = 0; i < value; i++) {
          const object = {
            key: `value${i + 1}`,
          };
          arrayOfObjects.push(object);
        }

        setBarcodeNumbersArray(arrayOfObjects);
      }
    });
  };
  // console.log(rifdData, "rifdData");
  const closePiecesEditBox = () => {
    const updatedProducts = addedProducts.map((product) => {
      if (product.id === productPiecesEditId) {
        return {
          ...product,
          pieces: 1,
        };
      }
      return product;
    });
    setAddedProducts(updatedProducts);
    setPiecesBox(false);
  };
  const handleCheckTidValues = () => {
    // Check if all tid values are non-empty, unique, and do not include the word 'value'
    const uniqueTidValues = new Set(
      barcodeNumbersArray.map((item) => {
        const tidValue = Object.values(item)[0];
        return tidValue !== null &&
          tidValue !== "" &&
          !tidValue.toLowerCase().includes("value")
          ? tidValue
          : null;
      })
    );

    // Check if all barcode numbers are unique and do not include their key names
    const allBarcodeNumbersValid = barcodeNumbersArray.every((item) => {
      const barcodeNumber = Object.keys(item)[0];
      const tidValue = Object.values(item)[0];
      return (
        barcodeNumber !== tidValue &&
        !barcodeNumber.toLowerCase().includes("key")
      );
    });

    if (
      uniqueTidValues.size === barcodeNumbersArray.length &&
      allBarcodeNumbersValid
    ) {
      // Generate barcodeNumberString and tidNumberString
      const barcodeNumberString = Array.from(
        barcodeNumbersArray.map((item) => Object.keys(item)[0])
      ).join(","); // Join barcode numbers with commas
      const tidNumberString = Array.from(uniqueTidValues).join(","); // Join unique tid values with commas

      // Now you can use barcodeNumberString and tidNumberString as needed
      // console.log("barcodeNumberString:", barcodeNumberString);
      // console.log("tidNumberString:", tidNumberString);

      // Search for the product in addedProducts array with matching id and update barcodeNumber and tid
      const updatedProducts = addedProducts.map((product) => {
        if (product.id === productPiecesEditId) {
          return {
            ...product,
            barcodeNumber: barcodeNumberString,
            tid: tidNumberString,
          };
        }
        return product;
      });

      // Set the state with updated products
      setAddedProducts(updatedProducts);
      setPiecesBox(false);
    } else {
      if (uniqueTidValues.size !== barcodeNumbersArray.length) {
        alert(
          "Not all tid values are non-empty, unique, or contain the word 'value'."
        );
      }

      if (!allBarcodeNumbersValid) {
        alert("Invalid barcode numbers.");
      }
    }
  };

  useEffect(() => {
    fetch(a43)
      .then((res) => res.json())
      .then((data) => setRifdData(data.data)),
      setLoadingAdd(true);
  }, []);
  const handleInputChange2 = (e, productId, property) => {
    // const barcodeInput = document.getElementById("barcodeNumberInput");
    // barcodeInput.style.setProperty("color", "black");
    const { value } = e.target;
    // setBarCodeAlert(false);
    const updatedProducts = addedProducts.map((product) => {
      if (product.id === productId) {
        // Parse properties to numbers or set them as 0 if the value is empty or invalid
        const grosswt = parseFloat(product.grosswt) || 0;
        const stoneWeight = parseFloat(product.stoneWeight) || 0;
        const netWt = parseFloat(product.netWt) || 0;

        // Update the specific property in the product object
        let updatedProduct = { ...product, [property]: value };

        if (property === "barcodeNumber") {
          // Convert the barcode number to uppercase before doing the comparison
          const barcodeValue = value.toUpperCase();
          updatedProduct.barcodeNumber = barcodeValue; // Set the barcodeNumber property to uppercase

          // Find a matching product in the rifdData array
          const matchingProduct = rifdData.find(
            (item) => item.barcodeNumber === barcodeValue
          );

          if (matchingProduct) {
            updatedProduct.tid = matchingProduct.tid;
          } else {
            // If no matching product found, set 'tid' to null or some default value
            updatedProduct.tid = null; // or any default value you want
            // setBarCodeAlert(true);
          }
        }

        // If 'stoneWeight' is changed, calculate 'netWt'
        if (property === "grosswt" && !isNaN(value)) {
          if (stoneWeight < value) {
            updatedProduct.netWt = (parseFloat(value) - stoneWeight).toFixed(3);
          } else {
            updatedProduct.netWt = value;
            updatedProduct.stoneWeight = 0;
          }
          // calculateFinalPrice(selectedProduct);
        }
        if (property === "stoneWeight" && !isNaN(value)) {
          if (value < grosswt) {
            updatedProduct.netWt = (grosswt - parseFloat(value)).toFixed(3);
          } else {
            updatedProduct.netWt = 0;
            updatedProduct.grosswt = value;
          }
        }
        if (property === "netWt" && !isNaN(value)) {
          updatedProduct.grosswt = parseFloat(
            parseFloat(stoneWeight) + parseFloat(value)
          ).toFixed(3);
        }

        if (property === "pieces" && value > 1 && stockType === "Labelled") {
          setPiecesBox(true);
          setProductPiecesEditId(productId);
          handlePiecesChange(value, productId);
        }

        return updatedProduct;
      }
      return product;
    });

    console.log(updatedProducts, "updatedProducts");
    console.log(updatedProducts, "updatedProducts");
    console.log(updatedProducts, "updatedProducts");
    setAddedProducts(updatedProducts);
  };
  const handleEditProducts = async () => {
    setLoading(true);
    console.log(addedProducts, "save:abel");
    try {
      // Validate 'grosswt' for all products
      const hasInvalidGrossWt = addedProducts.some(
        (product) =>
          (product.grosswt === "" && product.category_Name === "Gold") ||
          (parseFloat(product.grosswt) === 0 &&
            product.category_Name === "Gold")
      );

      const hasMissingBarcodeAndTid = addedProducts.some((product) => {
        if (product.barcodeNumber && product.barcodeNumber.length !== 0) {
          // Barcode is not empty or null, so check if tid is missing
          return product.tid === null || product.tid === "";
        }
        // Barcode is either empty or null, so no need to check tid
        return false;
      });

      if (hasInvalidGrossWt) {
        setLoading(false);
        alert("GrossWt could not be zero");
        // setGoldAlert(true);
        // playTimer();
      } else if (hasMissingBarcodeAndTid) {
        setLoading(false);
        alert("Missing Barcode/Tid");
        // setBarCodeAlert(true);
        // playTimer();
      } else {
        // Convert grosswt, stoneWeight, and netWt to strings before sending
        const updatedProductsString = addedProducts.map((product) => ({
          ...product,
          grosswt: product.grosswt.toString(),
          stoneWeight: product.stoneWeight.toString(),
          netWt: product.netWt.toString(),
        }));

        // Send the updated products to the edit API endpoint
        const response = await fetch(a31, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductsString),
        });
        console.log(updatedProductsString, "updatedProductsStringLabel");
        const rcvdData = await response.json();
        // Assuming rcvdData is an array of objects containing grosswt, netwt, and stoneWeight properties

        // Initialize total weights
        let totalGrosswt = 0;
        let totalNetWt = 0;
        let totalStoneWeight = 0;

        // Iterate through the received data to calculate totals
        rcvdData.data.forEach((product) => {
          // Parse the string values to numbers if needed
          const grosswt = parseFloat(product.grosswt);
          const netWt = parseFloat(product.netWt);
          const stoneWeight = parseFloat(product.stoneWeight);

          // Add to total weights
          totalGrosswt += grosswt;
          totalNetWt += netWt;
          totalStoneWeight += stoneWeight;
        });

        // Log or use the total weights as needed
        console.log("Total Gross Weight:", totalGrosswt);
        console.log("Total Net Weight:", totalNetWt);
        console.log("Total Stone Weight:", totalStoneWeight);
        handleEditProductsUnlabelled2(
          "weights",
          `${totalGrosswt},${totalStoneWeight},${totalNetWt}`
        );
        // console.log("rcvdData", rcvdData);
        //       openLabelInNew(rcvdData.data);
        //       console.log("addedProducts", addedProducts);
        //       console.log("updatedProducts", updatedProducts);
        //       // setUpdatedProducts(rcvdData.data);
        //       setLoading(false);
        //     }
        //   } catch (error) {
        //     alert(error);
        //     console.error(error);
        //     setLoading(false);
        //   }
        // };
        if (rcvdData.status === "error") {
          setLoading(false);
          alert(rcvdData.message); // Show error message
          const productsWithErrors = addedProducts.map((product) =>
            product.barcodeNumber === rcvdData.errorBarcode
              ? { ...product, hasError: true }
              : product
          );
          setAddedProducts(productsWithErrors);
          // console.log("rcvdDataErrorAdded", addedProducts);
        } else {
          openLabelInNew(rcvdData.data);
          // console.log("addedProducts", addedProducts);
          // console.log("updatedProducts", updatedProducts);
          setLoading(false);
        }
      }
    } catch (error) {
      alert(error);
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!piecesBox) {
      setBarcodeNumbersArray([]);
    }
  }, [piecesBox]);
  const openLabelInNew = async (products) => {
    const doc = new jsPDF({
      format: [29, 12],
      orientation: "landscape",
    });

    const fontSize = 6;
    const imageHeight = 7;
    const imageWidth = 7;

    for (let i = 0; i < products.length; i++) {
      const {
        collection,
        grosswt,
        stoneWeight,
        stoneAmount,
        netWt,
        itemCode,
        purity,
        mrp,
        product_No,
        pieces,
        making_Fixed_Wastage,
        making_Percentage,
      } = products[i];

      // console.log("products", products);
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
        doc.text(`G.WT: ${parseFloat(grosswt).toFixed(3)}`, 3, 3);
        doc.text(`S.WT: ${parseFloat(stoneWeight).toFixed(3)}`, 3, 5.5);
        if (
          parseFloat(making_Percentage) !== 0 &&
          making_Percentage !== "" &&
          making_Fixed_Wastage !== 0 &&
          making_Fixed_Wastage !== ""
        ) {
          doc.text(
            `W.WT: ${(
              parseFloat(netWt) / parseFloat(making_Percentage) +
              parseFloat(making_Fixed_Wastage)
            ).toFixed(3)}`,
            3,
            7.5
          );
          doc.text(
            `N.WT: ${(
              parseFloat(netWt) +
              parseFloat(netWt / making_Percentage) +
              parseFloat(making_Fixed_Wastage)
            ).toFixed(3)}`,
            3,
            10
          );

          doc.text(`${itemCode}`, 18, 3);
          doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
          doc.text(`${purity}`, 18, 7.5);
          doc.text(`Pc:${pieces}`, 18, 10);
        } else if (
          parseFloat(making_Percentage) !== 0 &&
          making_Percentage !== ""
        ) {
          doc.text(
            `W.WT: ${(
              parseFloat(netWt) / parseFloat(making_Percentage)
            ).toFixed(3)}`,
            3,
            7.5
          );
          doc.text(
            `N.WT: ${(
              parseFloat(netWt) + parseFloat(netWt / making_Percentage)
            ).toFixed(3)}`,
            3,
            10
          );

          doc.text(`${itemCode}`, 18, 3);
          doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
          doc.text(`${purity}`, 18, 7.5);
          doc.text(`Pc:${pieces}`, 18, 10);
        } else if (making_Fixed_Wastage !== 0 && making_Fixed_Wastage !== "") {
          doc.text(
            `W.WT: ${parseFloat(making_Fixed_Wastage).toFixed(3)}`,
            3,
            7.5
          );
          doc.text(
            `N.WT: ${(
              parseFloat(making_Fixed_Wastage) + parseFloat(netWt)
            ).toFixed(3)}`,
            3,
            10
          );

          doc.text(`${itemCode}`, 18, 3);
          doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
          doc.text(`${purity}`, 18, 7.5);
          doc.text(`Pc:${pieces}`, 18, 10);
        } else {
          doc.text(`W.WT: N/A`, 3, 8);
          doc.text(`N.WT: ${netWt.toFixed(3)}`, 3, 10.5);

          doc.text(`${itemCode}`, 18, 3);
          doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
          doc.text(`${purity}`, 18, 7.5);
          doc.text(`Pc:${pieces}`, 18, 10);
        }
      } else {
        doc.text(`G.WT: ${grosswt.toFixed(3)}`, 3, 3);
        doc.text(`MRP: ${parseInt(mrp)}`, 3, 6);
        doc.text(`Pc:${pieces}`, 18, 9);
        // doc.text(`${product_No}`, 4, 11.5);
        doc.text(`${itemCode}`, 18, 3);
        doc.text(`${purity}`, 18, 6);
      }
    }
    const pdfData = doc.output("datauristring");
    const newWindow = window.open();
    newWindow.document.write(
      `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
    );
  };
  return (
    <div>
      <AdminHeading />
      <div
        id="adminUnlabelledStockMainOuterBoxTop"
        style={{ paddingTop: "130px" }}
      >
        <AdminBreadCrump
          title={"Unlabelled List"}
          companyName={"Loyalstring"}
          module={"E-commerce"}
          page={"Unlabelled List"}
        />

        <div
          style={{ overflowY: "auto" }}
          className="adminUnlabelledStockMainOuterBox"
        >
          <div
            id="adminUnlabelledStockMainItemsBox"
            className="adminUnlabelledStockMainItemsBox"
          >
            <div style={{ padding: "0px" }} className="adminAddCategoryMainBox">
              <div className="adminAddCategoryInnerBox adminAddCategoryInnerBoxUnlabel">
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
                          value={categoryName}
                          onChange={(e) => {
                            setCategoryName(e.target.value);
                            setCurrentPage(1);
                          }}
                        >
                          <option value="">Select Category</option>
                          {allCategories.map((x) => {
                            return (
                              <option value={`${x.id},${x.name}`}>
                                {x.name}
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
                              <option
                                value={`${parseInt(x.id)},${x.productTitle}`}
                              >
                                {x.productTitle}
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
                          <option value="">Select Collection</option>
                          {filteredCollection.map((x) => {
                            return (
                              <option
                                value={`${parseInt(x.id)},${x.collection_Name}`}
                              >
                                {x.collection_Name}
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

                        {/* <AiOutlineEdit
                      className="labelledListEditIcon"
                      style={{ padding: "5px" }}
                      size={"1.5rem"}
                      onClick={() => {
                        setDeleteSelected(!deleteSelected),
                          setSelectedItemCodes([]),
                          setCheckedProducts([]),
                          setDeleteSelectedButton(false);
                      }}
                    /> */}
                      </div>
                      <div className="adminAllLabelledListButtonBox">
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
                            style={{
                              backgroundColor: "#c14456",
                              color: "white",
                            }}
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
                          marginTop: "20px",
                          marginLeft: "1rem",

                          boxSizing: "border-box",
                        }}
                      >
                        <thead>
                          <tr>
                            {deleteSelected ? <th>Delete Item</th> : null}
                            <th>S.No</th>
                            <th>Collection Name</th>
                            <th>Gross Wt</th>
                            <th>Stone WT</th>
                            <th>Net Wt</th>
                            <th>Quantity</th>
                            <th>Branch</th>
                            <th>Edit</th>
                            <th>Select</th>
                          </tr>
                        </thead>
                        <tbody style={{ position: "relative" }}>
                          {currentProducts.map((x, index) => (
                            <tr key={x.id}>
                              {/* <td>{index}</td> */}
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
                                      handleDeleteCheckboxChange(
                                        x.id,
                                        x.itemCode
                                      )
                                    }
                                  />
                                </td>
                              ) : null}
                              <td>{x.serialNumber}</td>
                              {/* <td>{x.product_Name}</td> */}
                              <td
                                onClick={() => editUnlabelItem(x)}
                                className="adminAllProductsTitle"
                              >
                                {x.collection}
                              </td>
                              <td>{parseFloat(x.grosswt).toFixed(3)}</td>
                              <td>{parseFloat(x.stoneWeight).toFixed(3)}</td>
                              <td>{parseFloat(x.netWt).toFixed(3)}</td>
                              <td>{x.quantity}</td>
                              {/* <td>{x.stoneWeight}</td>
                    <td>{x.netWt}</td> */}

                              <td>{x.branchName}</td>
                              {/* <td>{x.making_Percentage}</td> */}
                              <td
                                onClick={() => editUnlabelItem(x)}
                                className="adminAllProductsTitle"
                              >
                                Edit
                              </td>
                              <td
                                className="adminAllProductsTitle"
                                onClick={() => {
                                  setSelectedEditQuantityBefore(x.quantity),
                                    openLabelBox(x),
                                    setPageType("");
                                  setShowAddBtn(false);
                                }}
                              >
                                Label
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}

                <div className="bulkProductAddingTableMain">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
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
          {/* <div className="adminInventoryMobilePrintButtonsBox">
            <button onClick={printList}>Print List</button>

            <button
              onClick={() => {
                setSelectedProducts([]),
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
          <div
            id="adminUnlabelledStockMainAddLabelBox"
            // className="adminUnlabelledStockMainAddLabelBox"
          >
            {pageType === "Edit" ? (
              <div
                style={{
                  overflowX: "auto",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="adminAddCategoryMainBox"
              >
                <div
                  style={{
                    width: "90%",
                    minHeight: "100px",
                    marginBottom: "50px",
                  }}
                  className="adminAddCategoryInnerBox"
                >
                  {/* <h4 className="adminInvoiceAddTitles">Add Product</h4> */}
                  <div className="adminUnlabelledListEditDetailsMainBox">
                    <div
                      style={{ marginBottom: "1rem" }}
                      className={loading == true ? "loading" : "none"}
                    >
                      <InfinitySpin
                        className={loading == true ? "loading" : "none"}
                        width="150"
                        color="#4fa94d"
                      />
                    </div>
                    <div
                      id="adminAddBulkStockAddedTitleStatement"
                      className="adminAddBulkStockShowEditBox"
                    >
                      <h3
                        style={{
                          margin: "0px",
                          padding: "0px",
                        }}
                        className="adminAddBulkStockAddedTitle"
                      >
                        Edit Item
                      </h3>
                      <div className="adminAddBulkStockShowEditButton">
                        <AiOutlineEdit
                          onClick={() => setShowAllFields(!showAllFields)}
                          size={"20px"}
                        />
                      </div>
                    </div>
                    <div
                      style={{ marginBottom: "0px" }}
                      id="adminAddBulkStockAddedProductsOuterBox"
                      className="adminAddBulkStockAddedProductsOuterBox"
                    >
                      {/* <form onSubmit={updatedetailsBox}> */}
                      {showAllFields ? (
                        <div
                          className="bulkProductAddingTableMain"
                          style={{ margin: "1.5rem", overflowX: "auto" }}
                        >
                          <table>
                            <thead>
                              <tr style={{ whiteSpace: "nowrap" }}>
                                <th>Metal</th>
                                <th>Product Type</th>
                                <th>Collection</th>
                                <th>Purity</th>
                                <th>Quantity</th>
                                <th>GrossWt</th>
                                <th>StoneWt</th>
                                <th>NetWt</th>
                                <th>Making Per Gram</th>
                                <th>Making Percentage</th>
                                <th>Fixed Making</th>
                                <th>Fixed Wastage</th>
                                <th>Pieces</th>
                                <th>Size</th>
                                <th>Description</th>
                                <th>Occasion</th>
                                <th>Gender</th>
                                <th>Featured</th>
                                <th>Online Status</th>
                              </tr>
                            </thead>

                            <tbody>
                              {selectedEditItem.map((x) => (
                                // <tr key={x.Customer_id}>

                                <tr key={x.id}>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.category_Name}
                                      value={x.category_Name}
                                      // onChange={(e) =>
                                      //   handleInputChange(
                                      //     e,
                                      //     x.id,
                                      //     "category_Name"
                                      //   )
                                      // }
                                      readOnly
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.product_type}
                                      value={x.product_type}
                                      // onChange={(e) =>
                                      //   handleInputChange(e, x.id, "product_type")
                                      // }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.collection}
                                      value={x.collection}
                                      // onChange={(e) =>
                                      //   handleInputChange(e, x.id, "collection")
                                      // }
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.purity}
                                      value={x.purity}
                                      // onChange={(e) =>
                                      //   handleInputChange(e, x.id, "purity")
                                      // }
                                      readOnly
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.quantity}
                                      value={x.quantity}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "quantity")
                                      }
                                      // onChange={() => {
                                      //   setPurity(x.purity);
                                      // }}
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.grosswt}
                                      value={x.grosswt}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "grosswt")
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.stoneWeight}
                                      value={x.stoneWeight}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          x.id,
                                          "stoneWeight"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.netWt}
                                      value={x.netWt}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "netWt")
                                      }
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.making_per_gram}
                                      value={x.making_per_gram}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          x.id,
                                          "making_per_gram"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.making_Percentage}
                                      value={x.making_Percentage}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          x.id,
                                          "making_Percentage"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.making_Fixed_Amt}
                                      value={x.making_Fixed_Amt}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          x.id,
                                          "making_Fixed_Amt"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.making_Fixed_Wastage}
                                      value={x.making_Fixed_Wastage}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          x.id,
                                          "making_Fixed_Wastage"
                                        )
                                      }
                                    />
                                  </td>
                                  {/* <td>
                                <input
                                  type="number"
                                  placeholder={x.pieces}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "pieces")
                                  }
                                />
                              </td> */}
                                  <td>
                                    <input
                                      type="number"
                                      value={x.pieces}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "pieces")
                                      }
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.size}
                                      value={x.size}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "size")
                                      }
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.description}
                                      value={x.description}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          x.id,
                                          "description"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.occasion}
                                      value={x.occasion}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "occasion")
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.gender}
                                      value={x.gender}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "gender")
                                      }
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.featured}
                                      value={x.featured}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "featured")
                                      }
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.onlineStatus}
                                      value={x.onlineStatus}
                                      readOnly
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div
                          className="bulkProductAddingTableMain bulkProductAddingTableMain2"
                          style={{ margin: "1.5rem", overflowX: "auto" }}
                        >
                          <table>
                            <thead>
                              <tr>
                                {/* <th style={{ whiteSpace: "nowrap" }}>
                              Delete Product
                            </th> */}
                                {/* <th>Product Type</th> */}
                                <th>Metal</th>
                                <th>Collection</th>
                                <th>Purity</th>
                                <th>GrossWt</th>
                                <th>StoneWt</th>
                                <th>NetWt</th>
                                <th>Quantity</th>
                                <th>Pieces</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedEditItem.map((x) => (
                                <tr key={x.id}>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.category_Name}
                                      value={x.category_Name}
                                      readOnly
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.collection}
                                      value={x.collection}
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.purity}
                                      value={x.purity}
                                      readOnly
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.grosswt}
                                      value={x.grosswt}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "grosswt")
                                      }
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.stoneWeight}
                                      value={x.stoneWeight}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          x.id,
                                          "stoneWeight"
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.netWt}
                                      value={x.netWt}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "netWt")
                                      }
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.quantity}
                                      value={x.quantity}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "quantity")
                                      }
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.pieces}
                                      value={x.pieces}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "pieces")
                                      }
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        // </div>
                      )}
                      <div className="bulkProductAddingTableMain">
                        <button
                          onClick={() => {
                            if (selectedEditItem) {
                              handleEditProductsUnlabelled();
                            }
                          }}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            setSelectEditItem([]);
                            scrollToCenter("adminUnlabelledStockMainItemsBox");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {labelItemBox ? (
            <div className="adminUnlabelledLabelItemMainBox">
              <div className="adminInvoiceOpenEditMainBox">
                <div className="adminInvoiceOpenEditInnerBox">
                  <div className="adminInvoiceOpenEditInnerTitleBox">
                    <p>Edit Item</p>
                    <button
                      onClick={() => {
                        setLabelItemBox(false);
                        setSelectEditQuantity(0);
                      }}
                      className="adminAddInvoiceMainAddLabelOptionDeleteIcon"
                    >
                      <RxCross2 size={"25px"} />
                    </button>
                  </div>
                  <div className="adminInvoiceOpenEditOuterGridBox">
                    {/* <div className="adminInvoiceOpenEditInnerGridItem"> */}
                    <p>Enter Quantity to be Labelled</p>
                    <input
                      type="number"
                      value={selectedEditQuantity}
                      onChange={(e) => {
                        handleQuantityChange(e);
                      }}
                    />
                    {/* </div> */}
                    {/* <div className="adminInvoiceOpenEditInnerGridItem"> */}
                    <p>Remaining Quantity </p>
                    <input
                      style={{ cursor: "not-allowed" }}
                      type="number"
                      readOnly
                      value={selectedEditQuantityBefore}
                    />
                    {/* </div> */}
                    {showAddBtn ? (
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <button
                          onClick={(e) => {
                            handleSubmit(e);
                          }}
                          className="adminInvoiceEditProductSaveButton"
                        >
                          Add
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {addedProducts.length > 0 ? (
            <>
              <div
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() =>
                  scrollToCenter("adminAddBulkStockAddedProductsOuterBox")
                }
                id="adminAddBulkStockAddedTitleStatement"
                className="adminAddBulkStockShowEditBox"
              >
                <h3
                  style={{
                    margin: "0px",
                    padding: "0px",
                  }}
                  className="adminAddBulkStockAddedTitle"
                >
                  Added Products
                </h3>
                <div className="adminAddBulkStockShowEditButton">
                  <AiOutlineEdit
                    onClick={() => setShowAllFields(!showAllFields)}
                    size={"20px"}
                  />
                </div>
              </div>
              <div
                style={{ width: "85%", whiteSpace: "nowrap" }}
                id="adminAddBulkStockAddedProductsOuterBox"
                className="adminAddBulkStockAddedProductsOuterBox"
              >
                {/* <form onSubmit={updatedetailsBox}> */}
                {showAllFields ? (
                  <div
                    className="bulkProductAddingTableMain"
                    style={{
                      margin: "1.5rem",
                      overflowX: "auto",
                    }}
                  >
                    <table>
                      <thead>
                        <tr style={{ whiteSpace: "nowrap" }}>
                          <th>Product Type</th>
                          <th>Collection</th>
                          <th>Purity</th>
                          <th>Label</th>
                          <th>Barcode Number</th>
                          <th>TID</th>
                          <th>Product name</th>
                          <th>HUID Code</th>
                          <th>GrossWt</th>
                          <th>StoneWt</th>
                          <th>NetWt</th>
                          <th>Stone Amount</th>
                          <th>Making Per Gram</th>
                          <th>Making Percentage</th>
                          <th>Fixed Making</th>
                          <th>Fixed Wastage</th>
                          <th>Pieces</th>
                          <th>Size</th>
                          <th>MRP</th>
                          <th>Description</th>
                          <th>Occassion</th>
                          <th>Gender</th>
                          <th>Online Status</th>
                          <th>Delete Product</th>
                        </tr>
                      </thead>

                      <tbody>
                        {addedProducts.map((x) => (
                          // <tr key={x.Customer_id}>

                          <tr key={x.id}>
                            <td>
                              <input
                                type="text"
                                placeholder={x.product_type}
                                readOnly
                                // value={x.product_type}
                                // onChange={(e) => handleInputChange(e, x.id, "Product_type")}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder={x.collection}
                                value={x.collection}
                                readOnly
                                // onChange={(e) => handleInputChange(e, x.id, "collection")}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder={x.purity}
                                value={x.purity}
                                readOnly
                                // onChange={() => {
                                //   setPurity(x.purity);
                                // }}
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                placeholder={x.itemCode}
                                value={x.itemCode}
                                //   onChange={() => {
                                //     setItemCode(x.itemCode);
                                //   }}
                              />
                            </td>
                            <td>
                              <input
                                id="barcodeNumberInput"
                                type="text"
                                placeholder={x.barcodeNumber}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "barcodeNumber")
                                }
                                style={{
                                  color: x.hasError ? "red" : "black",
                                }}
                                //     setItemCode(x.itemCode);
                                //   }}
                              />
                            </td>
                            <td>
                              <input
                                style={{ cursor: "not-allowed" }}
                                type="text"
                                placeholder={x.tid}
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                placeholder={x.product_Name}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "product_Name")
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                maxLength={6}
                                placeholder={x.huidCode}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "huidCode")
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                placeholder={x.grosswt}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "grosswt")
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                placeholder={x.stoneWeight}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "stoneWeight")
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                placeholder={x.netWt}
                                readOnly
                                // onChange={(e) =>
                                //   handleInputChange2(e, x.id, "netWt")
                                // }
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                placeholder={x.stoneAmount}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "stoneAmount")
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                placeholder={x.making_per_gram}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "making_per_gram")
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                placeholder={x.making_Percentage}
                                onChange={(e) =>
                                  handleInputChange2(
                                    e,
                                    x.id,
                                    "making_Percentage"
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                placeholder={x.making_Fixed_Amt}
                                onChange={(e) =>
                                  handleInputChange2(
                                    e,
                                    x.id,
                                    "making_Fixed_Amt"
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                placeholder={x.making_Fixed_Wastage}
                                onChange={(e) =>
                                  handleInputChange2(
                                    e,
                                    x.id,
                                    "making_Fixed_Wastage"
                                  )
                                }
                              />
                            </td>
                            {/* <td>
                                <input
                                  type="number"
                                  placeholder={x.pieces}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "pieces")
                                  }
                                />
                              </td> */}
                            <td>
                              <input
                                type="number"
                                value={x.pieces}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "pieces")
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                placeholder={x.size}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "size")
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                placeholder={x.mrp}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "mrp")
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                placeholder={x.description}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "description")
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder={x.occasion}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "occasion")
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder={x.gender}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "gender")
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                placeholder={x.featured}
                                onChange={(e) =>
                                  handleInputChange2(e, x.id, "featured")
                                }
                              />
                            </td>
                            {/*                            
                              <td>
                                <input
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    color: "red",
                                  }}
                                  type="checkbox"
                                  checked={checkedProducts.includes(x.id)}
                                  onChange={() =>
                                    handleCheckboxChange(x.id, x.itemCode)
                                  }
                                />
                              </td> */}

                            {/* <td>
                    <button
                      type="submit"
                      onClick={() => {
                        setItemCode(x.itemCode);
                        setProductInEditImages(x.images);
                        setProductInEdit(x);
                        {
                          console.log(x.id);
                        }
                        updatedetailsBox(x.id);
                      }}
                    >
                      Update
                    </button>
                  </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div>
                    {/* <h2>Half Fields</h2> */}
                    <div
                      className="bulkProductAddingTableMain bulkProductAddingTableMain2"
                      style={{ margin: "1.5rem", overflowX: "auto" }}
                    >
                      <table>
                        <thead>
                          <tr>
                            {/* <th style={{ whiteSpace: "nowrap" }}>
                              Delete Product
                            </th> */}
                            {/* <th>Product Type</th> */}

                            <th>Collection</th>
                            <th>Purity</th>
                            <th>Label</th>
                            <th>Barcode Number</th>
                            {/* <th>TID</th> */}
                            {/* <th>Product name</th> */}
                            {/* <th>HUID Code</th> */}
                            <th>GrossWt</th>
                            <th>StoneWt</th>

                            <th>NetWt</th>
                            <th>Stone Amount</th>
                            <th>Making Per Gram</th>
                            <th>Making Percentage</th>
                            <th>Fixed Making</th>
                            {/* <th>Fixed Wastage</th> */}
                            {/* <th>Pieces</th> */}
                            {/* <th>Size</th> */}
                            <th>MRP</th>
                            {/* <th>Description</th> */}
                            {/* <th>Occassion</th> */}
                            {/* <th>Gender</th> */}
                            {/* <th>Online Status</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {addedProducts.map((x) => (
                            // <tr key={x.Customer_id}>

                            <tr key={x.id}>
                              <td>
                                <input
                                  type="text"
                                  placeholder={x.collection}
                                  value={x.collection}
                                  readOnly
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder={x.purity}
                                  value={x.purity}
                                  readOnly
                                />
                              </td>

                              <td>
                                <input
                                  type="text"
                                  placeholder={x.itemCode}
                                  value={x.itemCode}
                                  readOnly
                                />
                              </td>
                              <td>
                                <input
                                  id="barcodeNumberInput"
                                  type="text"
                                  placeholder={x.BarcodeNumber}
                                  onChange={(e) =>
                                    handleInputChange2(e, x.id, "barcodeNumber")
                                  }
                                  style={{
                                    color: x.hasError ? "red" : "black",
                                  }}
                                  //     setItemCode(x.itemCode);
                                  //   }}
                                />
                              </td>
                              {/* <td>
                                <input
                                  style={{ cursor: "not-allowed" }}
                                  type="text"
                                  placeholder={x.tid}
                                />
                              </td>
                              <td>
                              <input
                              type="text"
                                  placeholder={x.product_Name}
                                  // value={x.product_Name}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "Product_Name")
                                  }
                                />
                              </td>
                              <td>
                              <input
                              type="text"
                                  maxLength={6}
                                  placeholder={x.huidCode}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "huidCode")
                                  }
                                />
                              </td> */}
                              <td>
                                <input
                                  type="number"
                                  placeholder={x.grosswt}
                                  onChange={(e) =>
                                    handleInputChange2(e, x.id, "grosswt")
                                  }
                                  // readOnly
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  placeholder={x.stoneWeight}
                                  onChange={(e) =>
                                    handleInputChange2(e, x.id, "stoneWeight")
                                  }
                                />
                              </td>

                              <td>
                                <input
                                  type="number"
                                  placeholder={x.netWt}
                                  // onChange={(e) =>
                                  //   handleInputChange2(e, x.id, "netWt")
                                  // }
                                  readOnly
                                />
                              </td>

                              <td>
                                <input
                                  type="number"
                                  placeholder={x.stoneAmount}
                                  onChange={(e) =>
                                    handleInputChange2(e, x.id, "StoneAmount")
                                  }
                                />
                              </td>

                              <td>
                                <input
                                  type="number"
                                  placeholder={x.making_per_gram}
                                  // readOnly
                                  onChange={(e) =>
                                    handleInputChange2(
                                      e,
                                      x.id,
                                      "making_per_gram"
                                    )
                                  }
                                />
                              </td>

                              <td>
                                <input
                                  type="number"
                                  // readOnly
                                  placeholder={x.making_Percentage}
                                  onChange={(e) =>
                                    handleInputChange2(
                                      e,
                                      x.id,
                                      "making_Percentage"
                                    )
                                  }
                                />
                              </td>

                              <td>
                                <input
                                  type="number"
                                  placeholder={x.making_Fixed_Amt}
                                  onChange={(e) =>
                                    handleInputChange2(
                                      e,
                                      x.id,
                                      "making_Fixed_Amt"
                                    )
                                  }
                                  // readOnly
                                />
                              </td>

                              {/* <td>
                                <input
                                  type="number"
                                  placeholder={x.making_Fixed_Wastage}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      x.id,
                                      "Making_Fixed_Wastage"
                                    )
                                  }
                                />
                              </td> */}
                              {/* <td>
                                <input
                                  type="number"
                                  placeholder={x.pieces}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "pieces")
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  placeholder={x.size}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "Size")
                                  }
                                />
                              </td> */}

                              <td>
                                <input
                                  type="number"
                                  placeholder={x.mrp}
                                  onChange={(e) =>
                                    handleInputChange2(e, x.id, "mrp")
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="bulkProductAddingTableMain">
                  <button
                    style={{ cursor: "pointer" }}
                    // onClick={handleEditProducts}>
                    onClick={handleEditProducts}
                  >
                    <BiSave size={"12px"} style={{ marginRight: "5px" }} />
                    Save All
                  </button>

                  <Link to="/inventory">
                    <button style={{ cursor: "pointer" }}>
                      <BiListUl size={"12px"} style={{ marginRight: "5px" }} />
                      Labelled List
                    </button>
                  </Link>
                  {/* <Link to="/unlabelled_list">
                    <button style={{ cursor: "pointer" }}>
                      <BiListUl size={"12px"} style={{ marginRight: "5px" }} />
                      Unlabelled List
                    </button>
                  </Link> */}
                  {/* <Link to="/admininvoice">
                    <button style={{ cursor: "pointer" }}>
                      <FaFileInvoiceDollar 
                        size={"12px"}
                        style={{ marginRight: "5px" }}
                      />
                      To Invoice
                    </button>
                  </Link> */}

                  <button
                    onClick={() => {
                      setAddedProducts([]);
                      // setSelectedFiles([]);

                      scrollToCenter("adminUnlabelledStockMainAddLabelBox");
                    }}
                  >
                    <AiOutlineFileAdd
                      size={"12px"}
                      style={{ marginRight: "5px" }}
                    />
                    New Item
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
