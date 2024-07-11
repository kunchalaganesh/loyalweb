import React from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  a125,
  a128,
  a131,
  a149,
  a159,
  a160,
  a162,
  a18,
  a20,
  a33,
  a41,
  a47,
  a54,
  a67,
  s1,
} from "../../../Api/RootApiPath";
import { useState } from "react";
import { InfinitySpin, MagnifyingGlass } from "react-loader-spinner";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { BsHandbag } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import "../../PagesStyles/AdminEcommerce.css";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import GenerateRdPurchaseReceipt from "../../../Other Functions/GenerateRdPurchaseReceipt";

export default function AdminPurchase() {
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
  const [allRdPurchaseItems, setAllRdPurchaseItems] = useState([]);
  const [filteredRdPurchaseItems, setFilteredRdPurchaseItems] = useState([]);
  const [rdPurchaseCategory, setRdPurchaseCategrory] = useState("");
  const [rdPurchaseProduct, setRdPurchaseProduct] = useState("");
  const [allVendors, setAllVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState(0);
  const [allLotNumbers, setAllLotNumbers] = useState([]);
  const [filteredLotNumbers, setFilteredLotNumbers] = useState([]);
  const [selectedLotNumber, setSelectedLotNumber] = useState("");

  const allStates = useSelector((state) => state);

  const adminLoggedIn = allStates.reducer1;
  let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;
  const rdPurchaseFormat = parseInt(adminLoggedIn.Clients.RDPurchaseFormat);

  // newView
  const [active, setActive] = useState("List");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  //   const params2 = new URLSearchParams(location.search);
  const openView = params.get("openView");
  // newView
  const navigate = useNavigate();

  useEffect(() => {
    openView === "RDPurchase";
    setActive("addNew");
    document
      .getElementById("RDPurchaseListTitle")
      .classList.add("activeCategoryTitle");
    document
      .getElementById("RDPurchaseListLogo")
      .classList.add("activeCategoryLogo");
    document.getElementById("RDPurchaseListTitle").click();
  }, [openView]);

  const fetchCategories = async () => {
    // setLoading(true);
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a125, {
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
  const fetchAllRdPurchaseItems = async () => {
    // setLoading(true);
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a162, {
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
        setAllRdPurchaseItems(data);
        setFilteredRdPurchaseItems(data);
      } else {
        null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchAllRdPurchaseItems();
  }, []);
  const fetchProductTypes = async () => {
    // setLoading(true);
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a128, {
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
        setAllProductTypes(data);
        console.log(data, "ProductTypesdata,");
      } else {
        setActive("addNew");
        document
          .getElementById("addProductListTitle")
          .classList.add("activeProductTitle");
        document
          .getElementById("addProductListLogo")
          .classList.add("activeProductLogo");
        document.getElementById("addProductListTitle").click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);
  const fetchCollectonData = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a131, {
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
        setAllCollectionTypes(data);
      } else {
        setActive("addNew");
        document
          .getElementById("addCollectionListTitle")
          .classList.add("activeCollectionTitle");
        document
          .getElementById("addCollectionLogo")
          .classList.add("activeCollectionLogo");
        document.getElementById("addCollectionListTitle").click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCollectonData();
  }, []);

  const fetchAllVendors = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a149, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setAllVendors(data);
  };
  useEffect(() => {
    fetchAllVendors();
  }, []);
  // console.log("all Products", allProducts);
  //firebase code
  // const firebaseConfig = {
  //   // Your configuration details here
  //   apiKey: "AIzaSyDerNHPJwykR6GA6H_tMb7p-eMdQ8uR13k",
  //   authDomain: "loyalstrings-3c53b.firebaseapp.com",
  //   databaseURL: "https://loyalstrings-3c53b-default-rtdb.firebaseio.com",
  //   projectId: "loyalstrings-3c53b",
  //   storageBucket: "loyalstrings-3c53b.appspot.com",
  //   messagingSenderId: "423371897105",
  //   appId: "1:423371897105:web:5cd4266256c8722a6034b0",
  //   measurementId: "G-GZGQ6XMDSJ",
  // };

  // const app = initializeApp(firebaseConfig);
  // const database = getDatabase(app);
  // const dataref = ref(database, "testdata");

  // const fetchData = () => {
  //   onValue(dataref, (snapshot) => {
  //     const data2 = snapshot.val();
  //     console.log("check allp" + data2);
  //     // setFirebaseData(data2);
  //     setAllProducts([data2]), setLoading(false);
  //   });
  // };

  const fetchAllProducts = async () => {
    // setLoading(true);
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a160, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data, "ALL URD purchase");
    try {
      // const response = await fetch(a54);
      // const data = await response.json();
      let branchProducts = data;
      console.log(branchProducts, "branchProducts");
      // Add a serial number property to each product
      //   if (selectBranch === "Home" || selectBranch === "Branch 2") {
      //     branchProducts = data.data.filter((x) => x.branchName === selectBranch);
      //   } else {
      //     branchProducts = data.data;
      //   }
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
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false); // Make sure to set loading to false even on error
    }
  };
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
  const productsPerPage = 10;
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
      setSelectedProducts(selectAll ? [] : allProducts.map((x) => x.Id));
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

  const printPDF = async (products) => {
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
        GrossWt,
        StoneWt,
        stoneAmount,
        NetWt,
        ItemCode,
        Purity,
        MRP,
        product_No,
        pieces,
        MakingFixedWastage,
        MakingPercentage,
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

      if (MRP == 0 || MRP === "") {
        doc.text(`G.WT: ${parseFloat(GrossWt).toFixed(3)}`, 3, 3);
        doc.text(`S.WT: ${parseFloat(StoneWt).toFixed(3)}`, 3, 5.5);
        if (
          parseFloat(MakingPercentage) !== 0 &&
          MakingPercentage !== "" &&
          MakingFixedWastage !== 0 &&
          MakingFixedWastage !== ""
        ) {
          doc.text(
            `W.WT: ${(
              parseFloat(NetWt) / parseFloat(MakingPercentage) +
              parseFloat(MakingFixedWastage)
            ).toFixed(3)}`,
            3,
            7.5
          );
          doc.text(
            `N.WT: ${(
              parseFloat(NetWt) +
              parseFloat(NetWt / MakingPercentage) +
              parseFloat(MakingFixedWastage)
            ).toFixed(3)}`,
            3,
            10
          );

          doc.text(`${ItemCode}`, 18, 3);
          doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
          doc.text(`${Purity}`, 18, 7.5);
          doc.text(`Pc:${pieces}`, 18, 10);
        } else if (
          parseFloat(MakingPercentage) !== 0 &&
          MakingPercentage !== ""
        ) {
          doc.text(
            `W.WT: ${(parseFloat(NetWt) / parseFloat(MakingPercentage)).toFixed(
              3
            )}`,
            3,
            7.5
          );
          doc.text(
            `N.WT: ${(
              parseFloat(NetWt) + parseFloat(NetWt / MakingPercentage)
            ).toFixed(3)}`,
            3,
            10
          );

          doc.text(`${ItemCode}`, 18, 3);
          doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
          doc.text(`${Purity}`, 18, 7.5);
          doc.text(`Pc:${pieces}`, 18, 10);
        } else if (MakingFixedWastage !== 0 && MakingFixedWastage !== "") {
          doc.text(
            `W.WT: ${parseFloat(MakingFixedWastage).toFixed(3)}`,
            3,
            7.5
          );
          doc.text(
            `N.WT: ${(
              parseFloat(MakingFixedWastage) + parseFloat(NetWt)
            ).toFixed(3)}`,
            3,
            10
          );

          doc.text(`${ItemCode}`, 18, 3);
          doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
          doc.text(`${Purity}`, 18, 7.5);
          doc.text(`Pc:${pieces}`, 18, 10);
        } else {
          doc.text(`W.WT: N/A`, 3, 8);
          doc.text(`N.WT: ${NetWt.toFixed(3)}`, 3, 10.5);

          doc.text(`${ItemCodeCode}`, 18, 3);
          doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
          doc.text(`${Purity}`, 18, 7.5);
          doc.text(`Pc:${pieces}`, 18, 10);
        }
      } else {
        doc.text(`G.WT: ${GrossWt.toFixed(3)}`, 3, 3);
        doc.text(`MRP: ${parseInt(MRP)}`, 3, 6);
        doc.text(`Pc:${pieces}`, 18, 9);
        // doc.text(`${product_No}`, 4, 11.5);
        doc.text(`${ItemCode}`, 18, 3);
        doc.text(`${Purity}`, 18, 6);
      }
    }
    const pdfData = doc.output("datauristring");
    const newWindow = window.open();
    newWindow.document.write(
      `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
    );
  };

  const printAllRDPurchase = async (orders) => {
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
      doc.text("SKU", startX + columnWidth, startY);
      doc.text("Category", startX + 3 * columnWidth - 2, startY);
      doc.text("Lot No", startX + 4 * columnWidth, startY);
      doc.text("Gross Wt", startX + 5 * columnWidth, startY);
      doc.text("Stone Wt", startX + 6 * columnWidth, startY);
      doc.text("Net Wt", startX + 7 * columnWidth, startY);
      doc.text("Clip Wt", startX + 8 * columnWidth, startY);
      doc.text("Tag Wt", startX + 9 * columnWidth, startY);
      doc.text("Lanyard Wt", startX + 10 * columnWidth, startY);
      doc.text("Total Wt", startX + 12 * columnWidth, startY);
      // doc.text("Fine%", startX + 6 * columnWidth, startY);
      // doc.text("Wastge%", startX + 7 * columnWidth, startY);
      // doc.text("Fine Wt", startX + 8 * columnWidth, startY);
      // doc.text("F+W Wt", startX + 9 * columnWidth, startY);
      // doc.text("Total Amount", startX + 10 * columnWidth, startY);
    };
    const totalNetWt = orders.reduce(
      (total, item) => total + (parseFloat(item.NetWt) || 0),
      0
    );
    const totalGrossWt = orders.reduce(
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
    // Generate orders rows

    let y = startY + lineHeight + margin;
    orders.forEach((item, index) => {
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
        item.StockKeepingUnit ? item.StockKeepingUnit.toString() : "N/A",
        startX + columnWidth,
        y
      );
      doc.text(
        item.CategoryName ? item.CategoryName.toString().substr(0, 7) : "N/A",
        startX + 3 * columnWidth - 2,
        y
      );
      doc.text(
        item.LotNumber ? item.LotNumber.toString().substr(0, 7) : "N/A",
        startX + 4 * columnWidth,
        y
      );
      doc.text(
        item.GrossWt ? item.GrossWt.toString() : "N/A",
        startX + 5 * columnWidth,
        y
      );
      doc.text(
        item.StoneWt ? item.StoneWt.toString() : "N/A",
        startX + 6 * columnWidth,
        y
      );
      doc.text(
        item.NetWt ? item.NetWt.toString() : "N/A",
        startX + 7 * columnWidth,
        y
      );
      doc.text(
        item.ClipWeight ? item.ClipWeight.toString() : "N/A",
        startX + 8 * columnWidth,
        y
      );
      doc.text(
        item.TagWeight ? item.TagWeight.toString() : "N/A",
        startX + 9 * columnWidth,
        y
      );
      doc.text(
        item.LanyardWeight
          ? parseFloat(item.LanyardWeight).toFixed(3).toString()
          : "N/A",
        startX + 10 * columnWidth,
        y
      );
      doc.text(
        parseFloat(
          parseFloat(item.GrossWt) +
            parseFloat(item.TagWeight) +
            parseFloat(item.LanyardWeight)
          //  +
          // parseFloat(item.PouchWeight) +
          // parseFloat(item.OtherWeight)
        )
          .toFixed(3)
          .toString(),
        startX + 12 * columnWidth,
        y
      );

      // doc.text(
      //   item.FinePercent ? item.FinePercent.toString() : "N/A",
      //   startX + 6 * columnWidth,
      //   y
      // );
      // doc.text(
      //   item.WastageWt ? item.WastageWt.toString() : "N/A",
      //   startX + 7 * columnWidth,
      //   y
      // );
      // doc.text(
      //   item.FineWt ? parseFloat(item.FineWt).toFixed(3).toString() : "N/A",
      //   startX + 8 * columnWidth,
      //   y
      // );
      // doc.text(
      //   item.FineWastageWt
      //     ? parseFloat(item.FineWastageWt).toFixed(3).toString()
      //     : "N/A",
      //   startX + 9 * columnWidth,
      //   y
      // );
      // doc.text(
      //   item.TotalItemAmt
      //     ? parseFloat(item.TotalItemAmt).toFixed(3).toString()
      //     : "N/A",
      //   startX + 10 * columnWidth,
      //   y
      // );

      y += lineHeight + margin;
    });

    // Add page numbers
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 50, pageHeight - 10);
    }

    // Get PDF orders as Uint8Array
    const pdfData = doc.output();

    // Create a new Blob from the PDF data
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });

    // Create a URL from the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    window.open(pdfUrl, "_blank");
  };
  // Ghares Label Below
  // const printPDF = async (products) => {
  //   const doc = new jsPDF({
  //     format: [29, 12],
  //     orientation: "landscape",
  //   });

  //   const fontSize = 6;
  //   const imageHeight = 7;
  //   const imageWidth = 7;

  //   for (let i = 0; i < products.length; i++) {
  //     const {
  //       collection,
  //       grosswt,
  //       stoneWeight,
  //       stoneAmount,
  //       netWt,
  //       itemCode,
  //       purity,
  //       mrp,
  //       product_No,
  //       pieces,
  //       making_Fixed_Wastage,
  //       making_Percentage,
  //     } = products[i];

  //     // console.log("products", products);
  //     if (i > 0) {
  //       doc.addPage(); // Add a new page for each product after the first one
  //     }

  //     doc.setFontSize(fontSize);
  //     doc.setFont("helvetica", "bold");
  //     // {
  //     //   collection.length > 20
  //     //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
  //     //     : doc.text(`${collection}`, 1, 3);
  //     // }

  //     if (mrp == 0 || mrp === "") {
  //       doc.text(`G.WT: ${parseFloat(grosswt).toFixed(3)}`, 3, 3);
  //       doc.text(`S.WT: ${parseFloat(stoneWeight).toFixed(3)}`, 3, 6);
  //       doc.text(`N.WT: ${parseFloat(netWt).toFixed(3)}`, 3, 9);

  //       doc.text(`${itemCode}`, 18, 3);
  //       // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //       doc.text(`${purity}`, 18, 6);
  //       doc.text(`Pc:${pieces}`, 18, 9);
  //     } else {
  //       doc.text(`G.WT: ${grosswt.toFixed(3)}`, 3, 3);
  //       doc.text(`MRP: ${parseInt(mrp)}`, 3, 6);
  //       doc.text(`Pc:${pieces}`, 18, 9);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 18, 3);
  ///       doc.text(`${purity}`, 18, 6);
  //     }

  //     // try {
  //     //   const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
  //     //   doc.addImage(qrCodeDataUrl, "JPEG", 1, 3, imageWidth, imageHeight);
  //     // } catch (error) {
  //     //   console.error(error);
  //     // }
  //   }

  //   const pdfData = doc.output("datauristring");
  //   const newWindow = window.open();
  //   newWindow.document.write(
  //     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  //   );
  // };
  const printList = () => {
    const selectedProductData = allProducts.filter((x) =>
      selectedProducts.includes(x.Id)
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
        item.Design ? item.Design.toString().substr(0, 8) : "N/A",
        startX + columnWidth,
        y
      );
      doc.text(
        item.GrossWt ? item.GrossWt.toString() : "N/A",
        startX + 2 * columnWidth,
        y
      );
      doc.text(
        item.NetWt ? item.NetWt.toString() : "N/A",
        startX + 3 * columnWidth,
        y
      );
      doc.text(
        item.ItemCode ? item.ItemCode.toString() : "N/A",
        startX + 4 * columnWidth,
        y
      );
      doc.text(
        item.RFIDCode ? item.RFIDCode.toString() : "N/A",
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
        item.TID ? item.TID.toString() : "N/A",
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
          product.CategoryName &&
          product.CategoryName.includes(categoryNameSelected)
      );
    }
    if (productName !== "") {
      console.log("filteredProductsTypes1", filtered);
      filtered = filtered.filter(
        (product) =>
          // product.itemType && product.itemType.includes(productNameSelected)
          product.ProductName && product.ProductName === productNameSelected
      );
      console.log("filteredProductsTypes2", filtered);
    }
    if (collectionName !== "") {
      filtered = filtered.filter(
        (product) =>
          product.Design && product.Design.includes(collectionNameSelected)
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
    (product) => product.CategoryId == categoryId
  );
  let productNameSelected = productName.split(",")[1];
  let productTypeIdSelected = parseInt(productName.split(",")[0]);
  let collectionNameSelected = collectionName.split(",")[1];
  const filteredCollection = allCollectionTypes.filter(
    (product) => product.ProductId == productNameSelected
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

  // RD Purchase List
  const [allOrders2, setAllOrders2] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [orderStatus2, setOrderStatus2] = useState("");
  const [orderNumber2, setOrderNumber2] = useState("");
  const [fromDate2, setFromDate2] = useState("");
  const [toDate2, setToDate2] = useState("");
  const [filteredOrders2, setFilteredOrders2] = useState([]);
  const [orderItems2, setOrderItems2] = useState([]);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [csData2, setCsData2] = useState([]);
  const [allPayments2, setAllPayments2] = useState([]);
  const ordersPerPage2 = 25;
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a159, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        let rcvdData = response.reverse();
        setLoading2(false);

        let orderedData = rcvdData.map((item, index) => {
          // Add extra property 'orderStatus'
          // item.PurchaseStatus =
          //   Math.ceil(item.BalanceAmount) == 0 &&
          //   item.BalanceGold == "0.000" &&
          //   item.BalanceSilver == "0.000"
          //     ? "Paid"
          //     : Math.ceil(item.BalanceAmount) == 0 ||
          //       item.BalanceGold == "0.000" ||
          //       item.BalanceSilver == "0.000"
          //     ? "Partial"
          //     : "None";
          // Add 's.no' property
          item.serialNumber = index + 1;
          return item;
        });

        setAllOrders2(orderedData);
        const allLotNumbersList = orderedData.map((x) => x.LotNumber);
        setAllLotNumbers(allLotNumbersList);
        setFilteredLotNumbers(allLotNumbersList);
        console.log(response, "response.data for 2");
      });
  }, []);
  console.log(allLotNumbers, "allLotNumbers");
  // useEffect(() => {
  //   fetch(a73)
  //     .then((res) => res.json())
  //     .then((response) => {
  //       // console.log(response);
  //       let rcvdData = response.data.reverse();
  //       let supplierOrders = rcvdData.filter((x) => x.customerId == 0);
  //       setAllOrders2(...allOrders2, supplierOrders);
  //       setLoading2(false);

  //       // setOlddata(response);
  //       console.log(response.data);
  //     });
  // }, []);

  const filterOrders2 = () => {
    let filtered2 = allOrders2;

    if (orderStatus2 && orderStatus2 !== "") {
      filtered2 = filtered2.filter(
        (order) => order.PurchaseStatus === orderStatus2
      );
    } else {
      filtered2 = allOrders2;
    }
    if (selectedLotNumber && parseInt(selectedLotNumber) !== 0) {
      filtered2 = filtered2.filter(
        (order) => order.LotNumber === selectedLotNumber
      );
    }
    if (selectedVendorId && parseInt(selectedVendorId) !== 0) {
      filtered2 = filtered2.filter(
        (order) => order.VendorId === parseInt(selectedVendorId)
      );
      console.log(selectedVendorId, "selectedVendorId");
      console.log(filtered2, "filtered2");
    } else {
      filtered2 = allOrders2;
    }

    let filteredRdPurchaseItems = allRdPurchaseItems;

    if (rdPurchaseCategory && rdPurchaseCategory !== "") {
      filteredRdPurchaseItems = filteredRdPurchaseItems.filter(
        (x) => x.CategoryId == rdPurchaseCategory
      );
    }

    if (rdPurchaseProduct && rdPurchaseProduct !== "") {
      filteredRdPurchaseItems = filteredRdPurchaseItems.filter(
        (x) => x.ProductId == rdPurchaseProduct
      );
    }

    if (rdPurchaseCategory || rdPurchaseProduct) {
      const filteredRdPurchaseItemsIds = filteredRdPurchaseItems.map(
        (order) => order.RDPurchaseId
      );
      filtered2 = filtered2.filter((x) =>
        filteredRdPurchaseItemsIds.includes(x.Id)
      );
    }

    if (orderNumber2 && orderNumber2 !== "") {
      const lowercaseOrderNumber2 = orderNumber2.toLowerCase();
      filtered2 = filtered2.filter((order) => {
        const customer = order;
        return [
          order.InvoiceNo,
          customer.FirmName,
          customer.VendorName,
          customer.City,
          customer.Address,
          customer.State,
          customer.ContactNo,
          (
            order.TotalPurchaseAmount - parseFloat(order.BalanceAmount)
          ).toString(),
          order.BalanceAmount?.toString(),
          order.TotalPurchaseAmount?.toString(),
          order.InwardNo?.toString(),
          order.TotalPurchasePrice?.toString(),
        ].some((field) => field?.toLowerCase().includes(lowercaseOrderNumber2));
      });
    }

    if (fromDate2 !== "" && toDate2 !== "") {
      const fromDateMidnight = new Date(fromDate2).setHours(0, 0, 0, 0);
      const toDateMidnight = new Date(toDate2).setHours(0, 0, 0, 0);

      filtered2 = filtered2.filter((order) => {
        const orderDate = new Date(order.PurchaseDate).setHours(0, 0, 0, 0);
        return orderDate >= fromDateMidnight && orderDate <= toDateMidnight;
      });
    }

    setFilteredOrders2(filtered2);

    if (!rdPurchaseCategory && !rdPurchaseProduct) {
      setFilteredRdPurchaseItems(
        allRdPurchaseItems.filter((x) =>
          filtered2.map((order) => order.Id).includes(x.RDPurchaseId)
        )
      );
    } else {
      setFilteredRdPurchaseItems(filteredRdPurchaseItems);
    }

    setCurrentPage2(1); // Reset to the first page after filtering
    let allFilteredLotNumbers = filtered2
      .filter((obj) => allLotNumbers.includes(obj.LotNumber))
      .map((item) => item.LotNumber);
    setFilteredLotNumbers(allFilteredLotNumbers);
  };

  useEffect(() => {
    filterOrders2();
    window.scrollTo(0, 0);
  }, [
    orderStatus2,
    orderNumber2,
    allOrders2,
    fromDate2,
    toDate2,
    rdPurchaseCategory,
    rdPurchaseProduct,
    selectedVendorId,
    selectedLotNumber,
  ]);

  console.log(allOrders2, "allOrders2");
  useEffect(() => {
    filterOrders2();
    window.scrollTo(0, 0);

    console.log(filteredOrders2);
  }, [
    orderStatus2,
    orderNumber2,
    allOrders2,
    fromDate2,
    toDate2,
    rdPurchaseCategory,
    rdPurchaseProduct,
  ]);

  // useEffect(() => {}, [currentPage]);
  // console.log(JSON.stringify(orderItems), "orderItems");
  console.log(allOrders2);
  console.log(filteredRdPurchaseItems, "filteredRdPurchaseItems");
  console.log(filteredRdPurchaseItems, "filteredRdPurchaseItems");
  console.log(allRdPurchaseItems, "allRdPurchaseItems");
  const indexOfLastProduct2 = currentPage2 * ordersPerPage2;
  const indexOfFirstProduct2 = indexOfLastProduct2 - ordersPerPage2;
  // const currentOrders2 = filteredOrders2.slice(
  //   indexOfFirstProduct2,
  //   indexOfLastProduct2
  // );
  const currentOrders2 = Array.isArray(filteredOrders2)
    ? filteredOrders2.slice(indexOfFirstProduct2, indexOfLastProduct2)
    : [];
  const totalPages2 = Math.ceil(filteredOrders2.length / ordersPerPage2);

  const goToNextPage2 = () => {
    setCurrentPage2((prevPage2) => prevPage2 + 1);
  };

  const goToPreviousPage2 = () => {
    setCurrentPage2((prevPage2) => prevPage2 - 1);
  };

  const openBillImage = (image) => {
    let billImages = image.split(",");
    if (billImages.length > 0 && image !== "") {
      // Open the first image in a new tab

      window.open(`${s1}/${billImages[0]}`, "_blank");
    } else if (image !== "") {
      window.open(`${s1}/${image}`, "_blank");
    }
  };
  // RD Purchase List

  const purchaseEdit = (x) => {
    navigate(`/purchase_entry_edit?purchaseEntryNo=${x}`);
  };

  return (
    <div>
      <AdminHeading />
      <div style={{ paddingTop: "130px" }}>
        <AdminBreadCrump
          title={"Purchase"}
          companyName={"Loyalstring"}
          module={"Trading"}
          page={"Purchase"}
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
                <p>URD Purchase</p>
              </div>

              <div
                id="RDPurchaseListTitle"
                onClick={() => setActive("AddNew")}
                className={
                  active === "AddNew"
                    ? "adminAddCategoryInnerBoxTitle"
                    : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                }
              >
                <div
                  id="RDPurchaseListLogo"
                  className={
                    active === "AddNew"
                      ? "adminAddCategoryInnerBoxTitleLogo"
                      : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                  }
                >
                  {/* 02 */}
                  <RiPlayListAddLine />
                </div>
                <p>RD Purchase</p>
              </div>
            </div>
            <div
              className={
                active === "List" ? "adminCategoryListMainBox" : "none"
              }
            >
              <div className={loading == true ? "loading" : "none"}>
                <InfinitySpin width="200" color="#4fa94d" />
              </div>

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
                            <option
                              value={`${parseInt(x.Id)},${x.ProductName}`}
                            >
                              {x.ProductName}
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
                        marginTop: "10px",
                        marginLeft: "1rem",
                        boxSizing: "border-box",
                      }}
                    >
                      <thead>
                        <tr>
                          {deleteSelected ? <th>Delete Item</th> : null}
                          <th>S.No</th>
                          {/* <th>Collection Name</th> */}
                          <th>Date</th>
                          <th>Bill No</th>
                          <th>Metal</th>
                          <th>Product</th>
                          <th>Gross Wt</th>
                          {/* <th>Stone WT</th> */}
                          <th>Net Wt</th>
                          <th>FinePercent</th>
                          <th>Gold Rate</th>
                          <th>Purchase amount</th>
                          {/* <th>Item Code</th> */}
                          {/* <th>Barcode Number</th> */}
                          {/* <th>Branch</th> */}
                          {/* <th>Tid</th> */}
                          {/* <th>Tid</th> */}
                          {/* <th>Select</th> */}
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
                                  checked={checkedProducts.includes(x.Id)}
                                  onChange={() =>
                                    handleDeleteCheckboxChange(x.Id, x.ItemCode)
                                  }
                                />
                              </td>
                            ) : null}
                            <td>{x.serialNumber}</td>
                            <td>
                              {" "}
                              {new Date(x.createdOn).toLocaleDateString(
                                "en-GB"
                              )}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {x.PurchaseInvoiceNo}
                            </td>
                            {/* <td>{x.product_Name}</td> */}
                            {/* <td
                            onClick={() => {
                              navigate(`/product_details?productId=${x.id}`);
                            }}
                            className="adminAllProductsTitle"
                          >
                            {x.collection}
                          </td> */}
                            <td>{x.CategoryName}</td>
                            <td>{x.ProductName}</td>
                            <td>{parseFloat(x.GrossWt).toFixed(3)}</td>
                            {/* <td>{parseFloat(x.stonewt).toFixed(3)}</td> */}
                            <td>{parseFloat(x.NetWt).toFixed(3)}</td>
                            <td>{x.FinePercent}%</td>
                            <td>₹ {x.GoldRate}</td>
                            <td>₹ {x.PurchaseAmount}</td>

                            {/* <td>{x.stoneWeight}</td>
                    <td>{x.netWt}</td> */}
                            {/* <td>₹ {x.mrp}</td>
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
                          </td> */}
                          </tr>
                        ))}
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
            <div
              className={
                active !== "List" ? "adminCategoryListMainBox" : "none"
              }
            >
              <div className={loading2 == true ? "loading" : "none"}>
                <InfinitySpin width="200" color="#4fa94d" />
              </div>

              <div
                style={{
                  width: "100%",
                  justifyContent: "left",
                  flexWrap: "wrap",
                  marginBottom: "30px",
                }}
                className="adminAllProductsFilterBox"
              >
                <div className="adminAllProductsFilterLabelBox">
                  <input
                    type="text"
                    placeholder="Search Vendor Name / Amount / Invoice No / Inward No..."
                    value={orderNumber2}
                    onChange={(e) => {
                      setOrderNumber2(e.target.value.toLowerCase()),
                        setCurrentPage2(1);
                    }}
                  />
                </div>
                <div
                  style={{ marginBottom: "5px" }}
                  className="adminAllProductsFilterCategoryBox"
                >
                  <select
                    value={orderStatus2}
                    onChange={(e) => {
                      setOrderStatus2(e.target.value), setCurrentPage2(1);
                    }}
                  >
                    <option value="">Choose...</option>
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                    <option value="None">None</option>
                  </select>
                </div>
                <div className="adminAllProductsFilterLabelBox">
                  <select
                    value={selectedVendorId}
                    onChange={(e) => setSelectedVendorId(e.target.value)}
                    name="selectedVendorId"
                    id="selectedVendorId"
                  >
                    <option value={0}>Select Vendor</option>

                    {allVendors.map((x, index) => (
                      <option value={x.Id} key={index}>
                        {x.FirmName}
                      </option>
                    ))}
                  </select>
                  <input
                    value={selectedLotNumber}
                    onInput={(e) => setSelectedLotNumber(e.target.value)}
                    name="selectedLotNumber"
                    type="number"
                    placeholder="Enter Lot Number"
                    id="selectedLotNumber"
                    list="selectedLotNumberList"
                  />
                  <datalist id="selectedLotNumberList">
                    {filteredLotNumbers.map((x, index) => (
                      <option value={x} key={index}>
                        {x}
                      </option>
                    ))}
                  </datalist>
                </div>
                <div
                  style={{ marginBottom: "5px" }}
                  className="adminAllProductsFilterCategoryBox"
                >
                  <select
                    value={rdPurchaseCategory}
                    onChange={(e) => {
                      setRdPurchaseCategrory(e.target.value);
                    }}
                  >
                    <option value={""}>Select an Category</option>
                    {allCategories.map((x) => (
                      <option value={x.Id}>{x.CategoryName}</option>
                    ))}
                  </select>
                </div>
                <div
                  style={{ marginBottom: "5px" }}
                  className="adminAllProductsFilterCategoryBox"
                >
                  <select
                    value={rdPurchaseProduct}
                    onChange={(e) => {
                      setRdPurchaseProduct(e.target.value);
                    }}
                  >
                    <option value={""}>Select an Product</option>
                    {allProductTypes.map((x) => (
                      <option value={x.Id}>{x.ProductName}</option>
                    ))}
                  </select>
                </div>
                <div className="adminAllProductsFilterLabelBox">
                  <input
                    type="date"
                    placeholder="From Date"
                    value={fromDate2}
                    onChange={(e) => setFromDate2(e.target.value)}
                  />
                  <input
                    type="date"
                    placeholder="To Date"
                    value={toDate2}
                    onChange={(e) => setToDate2(e.target.value)}
                  />
                </div>

                <div className="adminAllProductsFilterLabelBox">
                  <input
                    type="text"
                    placeholder="Total Fine Gold (F+W)"
                    value={`Total Fine Gold (F+W) = ${filteredOrders2
                      .reduce(
                        (a, b) =>
                          a +
                          (b.TotalFineGold ? parseFloat(b.TotalFineGold) : 0),
                        0
                      )
                      .toFixed(3)}`}
                  />
                  <input
                    type="text"
                    placeholder="Total Fine Silver (F+W)"
                    value={`Total Fine Silver (F+W) = ${filteredOrders2
                      .reduce(
                        (a, b) =>
                          a +
                          (b.TotalFineSilver
                            ? parseFloat(b.TotalFineSilver)
                            : 0),
                        0
                      )
                      .toFixed(3)}`}
                  />
                </div>
                <div className="adminAllProductsFilterLabelBox">
                  <input
                    type="text"
                    placeholder="Total Gold (Gross Wt)"
                    value={`Total Gold (Gross Wt)= ${filteredRdPurchaseItems
                      .filter((item) =>
                        item.CategoryName.toLowerCase().includes("gold")
                      )
                      .reduce(
                        (a, b) => a + (b.GrossWt ? parseFloat(b.GrossWt) : 0),
                        0
                      )
                      .toFixed(3)}`}
                  />
                  <input
                    type="text"
                    placeholder="Total Silver (Gross Wt)"
                    value={`Total Silver (Gross Wt)= ${filteredRdPurchaseItems
                      .filter((item) =>
                        item.CategoryName.toLowerCase().includes("silver")
                      )
                      .reduce(
                        (a, b) => a + (b.GrossWt ? parseFloat(b.GrossWt) : 0),
                        0
                      )
                      .toFixed(3)}`}
                  />
                </div>
                <div className="adminAllProductsFilterLabelBox">
                  <input
                    type="text"
                    placeholder="Total Gold (Net Wt)"
                    value={`Total Gold (Net Wt)= ${filteredRdPurchaseItems
                      .filter((item) =>
                        item.CategoryName.toLowerCase().includes("gold")
                      )
                      .reduce(
                        (a, b) => a + (b.NetWt ? parseFloat(b.NetWt) : 0),
                        0
                      )
                      .toFixed(3)}`}
                  />
                  <input
                    type="text"
                    placeholder="Total Silver (Net Wt)"
                    value={`Total Silver (Net Wt)= ${filteredRdPurchaseItems
                      .filter((item) =>
                        item.CategoryName.toLowerCase().includes("silver")
                      )
                      .reduce(
                        (a, b) => a + (b.NetWt ? parseFloat(b.NetWt) : 0),
                        0
                      )
                      .toFixed(3)}`}
                  />
                </div>
                <div className="adminAllProductsFilterLabelBox">
                  <input
                    type="text"
                    placeholder="Total Purchase Amount"
                    value={`Total Purchase Amount = ${filteredOrders2
                      .reduce(
                        (a, b) =>
                          a +
                          (b.TotalPurchaseAmount
                            ? parseFloat(b.TotalPurchaseAmount)
                            : 0),
                        0
                      )
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                    readOnly
                  />
                  <input
                    type="text"
                    placeholder="Total Balance Amount"
                    value={`Total Balance Amount = ${filteredOrders2
                      .reduce(
                        (a, b) =>
                          a +
                          (b.BalanceAmount ? parseFloat(b.BalanceAmount) : 0),
                        0
                      )
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                    readOnly
                  />
                </div>
                <div
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                  className="adminAllLabelledListButtonBox"
                >
                  <button
                    onClick={() => printAllRDPurchase(filteredRdPurchaseItems)}
                  >
                    Print
                  </button>
                </div>
              </div>
              <div
                className="adminAllOrdersTableMainBox"
                style={{ overflow: "auto" }}
              >
                <table
                  className="adminInventoryMainTable"
                  style={{
                    width: "100%",
                    marginLeft: "0px",
                    boxSizing: "border-box",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Inv No</th>
                      <th>Lot No</th>
                      <th>Inward No</th>
                      {/* <th>Customer Id</th> */}
                      <th>Supplier Name</th>
                      <th>Gold (F+W)</th>
                      <th>Silver (F+W)</th>
                      <th>Amt</th>
                      {/* <th>Balance Amt</th> */}
                      {/* <th>Product Id</th> */}
                      {/* <th>Product Name</th> */}
                      {/* <th>Item Code</th> */}
                      {/* <th>Quantity</th> */}
                      <th>Bal Gold</th>
                      <th>Bal Silver</th>
                      <th>Bal Amt</th>
                      {/* <th>Branch</th>
                      <th>Discount</th>
                      <th>Created On</th> */}
                      <th>Order Status</th>
                      <th>Show Bill</th>
                      {/* <th>Payment Mode</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders2.map((x) => {
                      return (
                        // <tr key={x.Customer_id}>
                        <tr
                          onClick={() => purchaseEdit(x.Id)}
                          className="adminLedgerMainSupplierRow"
                          style={{ whiteSpace: "nowrap" }}
                          key={x.Id}
                        >
                          <td>
                            {/* {new Date(x.createdOn).toLocaleDateString("en-GB")} */}
                            {new Date(x.PurchaseDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td
                            // onClick={() => {
                            //   navigate(`/admin-orderdetails/${x.id}`);
                            // }}
                            onClick={() => {
                              // navigate(
                              //   `/admin_invoice_edit?objectRcvd=${JSON.stringify(
                              //     x
                              //   )}`
                              // );
                              // getAllOrderItemsForSending(x.id, x);
                              x.InvoiceFile !== ""
                                ? openBillImage(x.InvoiceFile)
                                : null;
                            }}
                            className="adminAllOrdersOrderData"
                          >
                            {x.InvoiceNo}
                          </td>
                          {/* <td>{x.customer_Id}</td> */}
                          {/* NOTE:"Please Uncomment bekow line" */}

                          <td style={{ fontWeight: "bold" }}>{x.LotNumber}</td>
                          <td style={{ fontWeight: "bold" }}>{x.InwardNo}</td>
                          <td>{x.FirmName}</td>
                          <td>{x.TotalFineGold}</td>
                          <td>{x.TotalFineSilver}</td>
                          <td>
                            ₹
                            {parseInt(x.TotalPurchaseAmount).toLocaleString(
                              "en-IN"
                            )}
                          </td>
                          <td
                            style={{
                              color:
                                x.BalanceGold === "0.000" ? "green" : "red",
                            }}
                          >
                            {x.BalanceGold}
                          </td>
                          <td
                            style={{
                              color:
                                x.BalanceSilver === "0.000" ? "green" : "red",
                            }}
                          >
                            {x.BalanceSilver}
                          </td>
                          <td
                            style={{
                              color:
                                Math.floor(x.BalanceAmount) === 0
                                  ? "green"
                                  : "red",
                            }}
                          >
                            ₹{parseInt(x.BalanceAmount).toLocaleString("en-IN")}
                          </td>
                          {/* <td>{x.balanceAmount}</td> */}

                          {/* <td>{x.product_id}</td> */}
                          {/* <td>{x.tblProduct.product_Name}</td> */}
                          {/* <td
                          className="adminAllOrdersOrderData"
                          onClick={() => {
                            navigate(`/admin-orderdetails/${x.id}`);
                            }}
                            style={{ whiteSpace: "nowrap" }}
                            >
                            {x.tblProduct.itemCode}
                            </td> */}

                          {/* <td>{x.qty}</td> */}
                          {/* <td>
                            ₹{parseInt(x.receivedAmt).toLocaleString("en-IN")}
                            </td> */}
                          {/* <td>{x.branch}</td>
                          <td>₹{x.discount}</td>
                          <td>{new Date(x.createdOn).toLocaleDateString()}</td> */}
                          <td
                            style={{
                              whiteSpace: "nowrap",
                              color:
                                x.PurchaseStatus === "Paid"
                                  ? "green"
                                  : x.PurchaseStatus == "Partial"
                                  ? "orange"
                                  : "red",
                            }}
                          >
                            {x.PurchaseStatus}
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                GenerateRdPurchaseReceipt(x, rdPurchaseFormat)
                              }
                            >
                              Print
                            </button>
                          </td>
                          {/* <td>{x.orderStatus.filter((y) => y !== "Pending")}</td> */}
                          {/* <td>{x.paymentMode}</td> */}
                          {/* <td>
                          {x.orderStatus === "Paid" ? (
                            <select
                              required="required"
                              value={orderStatus}
                              onChange={(e) =>
                                handleOrderStatusChange(
                                  x.orderNumber,
                                  e.target.value
                                )
                              }
                            >
                              <option value={x.orderStatus}>Change..</option>
                              
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          ) : x.orderStatus === "Shipped" ? (
                            <select
                              required="required"
                              value={orderStatus}
                              onChange={(e) =>
                                handleOrderStatusChange(
                                  x.orderNumber,
                                  e.target.value
                                )
                              }
                            >
                              <option value={x.orderStatus}>Change..</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          ) : (
                            <p
                              style={
                                x.orderStatus === "Paid"
                                  ? {
                                      fontWeight: "bold",
                                      color: "rgba(0, 128, 0, 0.7)",
                                      whiteSpace: "nowrap",
                                    }
                                  : x.orderStatus === "Processing Payment"
                                  ? {
                                      fontWeight: "bold",
                                      color: "rgb(219, 153, 30)",
                                      whiteSpace: "nowrap",
                                    }
                                  : x.orderStatus === "Payment Failed"
                                  ? {
                                      fontWeight: "bold",
                                      color: "rgb(231, 30, 60)",
                                      whiteSpace: "nowrap",
                                    }
                                  : x.orderStatus === "Shipped"
                                  ? {
                                      fontWeight: "bold",
                                      color: "rgb(77, 155, 228)",
                                      whiteSpace: "nowrap",
                                    }
                                  : x.orderStatus === "Delivered"
                                  ? {
                                      fontWeight: "bold",
                                      color: "rgb(159, 77, 206)",
                                      whiteSpace: "nowrap",
                                    }
                                  : {
                                      fontWeight: "bold",
                                      color: "rgb(180, 180, 46)",
                                      whiteSpace: "nowrap",
                                    }
                              }
                            >
                              {x.orderStatus}
                            </p>
                          )}
                        </td> */}
                          {x.InvoiceFile !== "" ? (
                            <td
                              className="adminCreditNoteOption"
                              style={{ cursor: "pointer" }}
                              onClick={() => openBillImage(x.InvoiceFile)}
                            >
                              BILL
                            </td>
                          ) : (
                            <td></td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="bulkProductAddingTableMain">
                  <button
                    onClick={goToPreviousPage2}
                    disabled={currentPage2 === 1}
                  >
                    Previous
                  </button>
                  <button
                    onClick={goToNextPage2}
                    disabled={currentPage2 === totalPages2}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={active === "List" ? "adminCategoryListMainBox" : "none"}
        >
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

        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
