import React from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  a125,
  a128,
  a131,
  a178,
  a18,
  a181,
  a20,
  a33,
  a41,
  a47,
} from "../../../Api/RootApiPath";
import { useState } from "react";
import { InfinitySpin, MagnifyingGlass } from "react-loader-spinner";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import "../../PagesStyles/AdminEcommerce.css";
import { GenerateLabel } from "../../../Other Functions/GenerateLabel";

export default function AdminInventory() {
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
  const productsPerPage = 100;

  const navigate = useNavigate();

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;
  const labelFormat = parseInt(adminLoggedIn.LabelFormat);
  const fetchCategories = () => {
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
      .then((response) => {
        setAllCategories(response);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchProductTypes = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    await fetch(a128, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    const formData = {
      ClientCode: clientCode,
    };
    await fetch(a131, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

  let Entryby_Staff_id = parseInt(adminLoggedIn);

  const fetchAllProducts = async () => {
    // setLoading(true);
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a181, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      let branchProducts = data;
      console.log(branchProducts, "branchProducts");
      // Add a serial number property to each product
      if (selectBranch === "Home" || selectBranch === "Branch 2") {
        branchProducts = data.filter((x) => x.BranchName === selectBranch);
      } else {
        branchProducts = data;
      }
      const productsWithSerial = branchProducts.map((product, index) => ({
        ...product,
        serialNumber: index + 1,
      }));

      // setAllProducts(productsWithSerial.reverse()); // Assuming data.data is an array of products
      setAllProducts(productsWithSerial.reverse());
      //   setAllProducts(data.data);
      setDeleteSelected(false);
      console.log(productsWithSerial, "productsWithSerial");
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
          prevSelected.filter((Id) => Id !== productId)
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
    await GenerateLabel(products, labelFormat);
  };

  // Soni label below
  // const printPDF = async (products) => {
  //   const doc = new jsPDF({
  //     // format: [26, 12],
  //     format: [100, 13],
  //     orientation: "landscape",
  //   });

  //   const fontSize = 9;
  //   const imageHeight = 12;
  //   const imageWidth = 12;

  //   for (let i = 0; i < products.length; i++) {
  //     const {
  //       collection,
  //       grosswt,
  //       stoneWeight,
  //       netWt,
  //       stoneAmount,
  //       diamondWeight,
  //       itemCode,
  //       purity,
  //       mrp,
  //       product_No,
  //       pieces,
  //       description,
  //     } = products[i];

  //     if (i > 0) {
  //       doc.addPage(); // Add a new page for each product after the first one
  //     }

  //     doc.setFontSize(fontSize);
  //     // {
  //     //   collection.length > 20
  //     //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
  //     //     : doc.text(`${collection}`, 1, 3);
  //     // }

  //     if (mrp == 0 || mrp === "") {
  //       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 55, 3);
  //       doc.text(`N.Wt: ${parseFloat(netWt).toFixed(3)}`, 55, 6);
  //       // doc.text(`${purity}`, 30, 6);
  //       // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 12);
  //       // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 30, 12);
  //       doc.text(diamondWeight ? `Crt: ${diamondWeight}` : "Crt: ", 25, 3);
  //       doc.text(`Pcs:${pieces}`, 25, 6);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 25, 9);
  //       doc.setFontSize(5);
  //       const maxLineLength = 40;
  //       const descriptionLine1 = description.substring(0, maxLineLength);
  //       const descriptionLine2 = description.substring(
  //         maxLineLength,
  //         maxLineLength * 2
  //       );

  //       doc.text(descriptionLine1, 55, 9);
  //       doc.text(descriptionLine2, 55, 11.5);
  //     } else {
  //       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 30, 6);
  //       doc.text(`MRP: ${parseFloat(mrp)}`, 11, 9);
  //       doc.text(`Pcs:${pieces}`, 30, 2);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${product_No}`, 4, 12);
  //       doc.text(`${itemCode}`, 4, 3);
  //       doc.text(`${purity}`, 30, 12);
  //     }

  //     try {
  //       const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
  //       doc.addImage(qrCodeDataUrl, "JPEG", 7, 1, imageWidth, imageHeight);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   const pdfData = doc.output("datauristring");
  //   const newWindow = window.open();
  //   newWindow.document.write(
  //     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  //   );
  // };
  // Madans label below
  // const printPDF = async (products) => {
  //   const doc = new jsPDF({
  //     // format: [26, 12],
  //     format: [28, 12],
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
  //       netWt,
  //       stoneAmount,
  //       itemCode,
  //       purity,
  //       mrp,
  //       product_No,
  //       pieces,
  //       description,
  //     } = products[i];

  //     if (i > 0) {
  //       doc.addPage(); // Add a new page for each product after the first one
  //     }

  //     doc.setFontSize(fontSize);
  //     // {
  //     //   collection.length > 20
  //     //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
  //     //     : doc.text(`${collection}`, 1, 3);
  //     // }

  //     if (mrp == 0 || mrp === "") {
  //       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 4, 4);
  //       doc.text(`N.Wt: ${parseFloat(netWt).toFixed(3)}`, 4, 6);
  //       doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
  //       doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
  //       doc.text(`Pcs:${pieces}`, 18, 2);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 4, 2);
  //       doc.text(`${purity}`, 22, 4);
  //       doc.setFontSize(5);
  //       const maxLineLength = 27;
  //       const descriptionLine1 = description.substring(0, maxLineLength);
  //       const descriptionLine2 = description.substring(
  //         maxLineLength,
  //         maxLineLength * 2
  //       );

  //       doc.text(descriptionLine1, 4, 10);
  //       doc.text(descriptionLine2, 4, 11.5);
  //     } else {
  //       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 11, 5.5);
  //       doc.text(`MRP: ${parseFloat(mrp)}`, 11, 7.5);
  //       doc.text(`Pcs:${pieces}`, 18, 2);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 4, 3);
  //       doc.text(`${purity}`, 18, 11.5);
  //     }

  //     try {
  //       const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
  //       // doc.addImage(qrCodeDataUrl, "JPEG", 3, 3, imageWidth, imageHeight);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   const pdfData = doc.output("datauristring");
  //   const newWindow = window.open();
  //   newWindow.document.write(
  //     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  //   );
  // };

  // NDDarbar Label below
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
  //       doc.text(`S.WT: ${parseFloat(stoneWeight).toFixed(3)}`, 3, 5.5);
  //       if (
  //         parseFloat(making_Percentage) !== 0 &&
  //         making_Percentage !== "" &&
  //         making_Fixed_Wastage !== 0 &&
  //         making_Fixed_Wastage !== ""
  //       ) {
  //         doc.text(
  //           `W.WT: ${(
  //             parseFloat(netWt) / parseFloat(making_Percentage) +
  //             parseFloat(making_Fixed_Wastage)
  //           ).toFixed(3)}`,
  //           3,
  //           7.5
  //         );
  //         doc.text(
  //           `N.WT: ${(
  //             parseFloat(netWt) +
  //             parseFloat(netWt / making_Percentage) +
  //             parseFloat(making_Fixed_Wastage)
  //           ).toFixed(3)}`,
  //           3,
  //           10
  //         );

  //         doc.text(`${itemCode}`, 18, 3);
  //         doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //         doc.text(`${purity}`, 18, 7.5);
  //         doc.text(`Pc:${pieces}`, 18, 10);
  //       } else if (
  //         parseFloat(making_Percentage) !== 0 &&
  //         making_Percentage !== ""
  //       ) {
  //         doc.text(
  //           `W.WT: ${(
  //             parseFloat(netWt) / parseFloat(making_Percentage)
  //           ).toFixed(3)}`,
  //           3,
  //           7.5
  //         );
  //         doc.text(
  //           `N.WT: ${(
  //             parseFloat(netWt) + parseFloat(netWt / making_Percentage)
  //           ).toFixed(3)}`,
  //           3,
  //           10
  //         );

  //         doc.text(`${itemCode}`, 18, 3);
  //         doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //         doc.text(`${purity}`, 18, 7.5);
  //         doc.text(`Pc:${pieces}`, 18, 10);
  //       } else if (making_Fixed_Wastage !== 0 && making_Fixed_Wastage !== "") {
  //         doc.text(
  //           `W.WT: ${parseFloat(making_Fixed_Wastage).toFixed(3)}`,
  //           3,
  //           7.5
  //         );
  //         doc.text(
  //           `N.WT: ${(
  //             parseFloat(making_Fixed_Wastage) + parseFloat(netWt)
  //           ).toFixed(3)}`,
  //           3,
  //           10
  //         );

  //         doc.text(`${itemCode}`, 18, 3);
  //         doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //         doc.text(`${purity}`, 18, 7.5);
  //         doc.text(`Pc:${pieces}`, 18, 10);
  //       } else {
  //         doc.text(`W.WT: N/A`, 3, 8);
  //         doc.text(`N.WT: ${netWt.toFixed(3)}`, 3, 10.5);

  //         doc.text(`${itemCode}`, 18, 3);
  //         doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //         doc.text(`${purity}`, 18, 7.5);
  //         doc.text(`Pc:${pieces}`, 18, 10);
  //       }
  //     } else {
  //       doc.text(`G.WT: ${grosswt.toFixed(3)}`, 3, 3);
  //       doc.text(`MRP: ${parseInt(mrp)}`, 3, 6);
  //       doc.text(`Pc:${pieces}`, 18, 9);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 18, 3);
  //       doc.text(`${purity}`, 18, 6);
  //     }
  //   }
  //   const pdfData = doc.output("datauristring");
  //   const newWindow = window.open();
  //   newWindow.document.write(
  //     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  //   );
  // };

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
  //      doc.text(`${purity}`, 18, 6);
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
      doc.text("Gross Wt", startX + 3 * columnWidth, startY);
      doc.text("Net Wt", startX + 4 * columnWidth, startY);
      doc.text("Item Code", startX + 5 * columnWidth, startY);
      doc.text("Barcode No", startX + 6.5 * columnWidth, startY);
      // doc.text("M Fixed Amt", startX + 7 * columnWidth, startY);
      // doc.text("M Fix Wastage", startX + 8.5 * columnWidth, startY);
      // doc.text("M Percentage", startX + 10 * columnWidth, startY);
      // doc.text("M per_gram", startX + 11.5 * columnWidth, startY);
      // doc.text("stoneAmount", startX + 13 * columnWidth, startY);
      doc.text("Tid", startX + 8.53 * columnWidth, startY);
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
        startX + 3 * columnWidth,
        y
      );
      doc.text(
        item.netWt ? item.netWt.toString() : "N/A",
        startX + 4 * columnWidth,
        y
      );
      doc.text(
        item.itemCode ? item.itemCode.toString() : "N/A",
        startX + 5 * columnWidth,
        y
      );
      doc.text(
        item.barcodeNumber ? item.barcodeNumber.toString() : "N/A",
        startX + 6.5 * columnWidth,
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
        startX + 8.5 * columnWidth,
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
      filtered = filtered.filter(
        (product) => product.ItemCode && product.ItemCode.includes(labelCode)
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
          product.ProductId && product.ProductId === productTypeIdSelected
      );
      console.log("filteredProductsTypes2", filtered);
    }
    if (collectionName !== "") {
      filtered = filtered.filter(
        (product) =>
          product.DesignName &&
          product.DesignName.includes(collectionNameSelected)
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
    const deletAllItemsList = itemsToDelete.map((x) => {
      return { ...x, ClientCode: clientCode };
    });
    try {
      const response = await fetch(a178, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deletAllItemsList),
      });

      const rcvdData = await response.json();
      console.log("AllItemsDeleted", rcvdData);
      console.log("Response:", rcvdData);
      // if (rcvdData.status == "Success") {
      // Deletion was successful
      // console.log("Item deleted successfully:", response.message);
      // alert(rcvdData.Message);
      setSelectedItemCodes([]);
      setCheckedProducts([]);
      fetchAllProducts();
      // You can show an alert or notification here
      // alert(data.message);

      setDeleteSelectedButton(false);
      // } else {
      // Handle the case where deletion failed
      // console.error("Failed to delete item:", response.Message);

      // You can show an error message to the user
      // alert("Failed to delete item: " + response.Message);
      // }
    } catch (error) {
      // Handle any network or fetch API errors
      console.error("An error occurred:", error);

      // Show an error message to the user
      // alert("An error occurred while deleting the item.");
    }
  };
  console.log("productName", productName);

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
                      whiteSpace: "nowrap",
                    }}
                  >
                    <thead>
                      <tr>
                        {deleteSelected ? <th>Delete Item</th> : null}
                        <th>S.No</th>
                        <th>Design Name</th>
                        <th>SKU</th>
                        <th>Gross Wt</th>
                        <th>Stone WT</th>
                        <th>Clip WT</th>
                        <th>Net Wt</th>
                        <th>Tag Wt</th>
                        <th>Lanyard Wt</th>
                        <th>Total Wt</th>
                        <th>Stone Amt</th>
                        <th>Hallmark Amt</th>
                        <th>Other Charges</th>
                        <th>MRP</th>
                        <th>Item Code</th>
                        <th>Inward No</th>
                        <th>Barcode Number</th>
                        <th>Branch</th>
                        <th>Tid</th>
                        {/* <th>Tid</th> */}
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody style={{ position: "relative" }}>
                      {currentProducts.map((x, index) => (
                        <tr key={x.Id}>
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
                          {/* <td>{x.product_Name}</td> */}
                          <td
                            onClick={() => {
                              navigate(`/product_details?productId=${x.Id}`);
                            }}
                            className="adminAllProductsTitle"
                          >
                            {x.DesignName}
                          </td>
                          <td>{x.SKU}</td>
                          <td>{parseFloat(x.GrossWt).toFixed(3)}</td>
                          <td>{parseFloat(x.TotalStoneWeight).toFixed(3)}</td>
                          <td>{parseFloat(x.ClipWeight).toFixed(3)}</td>
                          <td>{parseFloat(x.NetWt).toFixed(3)}</td>
                          <td>{parseFloat(x.TagWeight).toFixed(3)}</td>
                          <td>{parseFloat(x.LanyardWeight).toFixed(3)}</td>
                          <td>
                            {parseFloat(
                              parseFloat(x.GrossWt) +
                                parseFloat(x.TagWeight) +
                                parseFloat(x.LanyardWeight)
                            ).toFixed(3)}
                          </td>
                          {/* <td>{x.stoneWeight}</td>
                  <td>{x.netWt}</td> */}
                          <td>
                            ₹{" "}
                            {x.Stones && x.Stones.length > 0
                              ? x.Stones.reduce(
                                  (a, b) =>
                                    a + (parseFloat(b.StoneAmount) || 0),
                                  0
                                ).toFixed(3)
                              : (0.0).toFixed(3)}
                          </td>

                          <td>₹ {x.HallmarkAmount}</td>
                          <td>₹ {x.MRP}</td>
                          <td>{x.ItemCode}</td>
                          <td>{x.LotNumber}</td>
                          <td>{x.RFIDCode}</td>
                          <td>{x.BranchName}</td>
                          {/* <td>{x.making_Percentage}</td> */}
                          <td>{x.TIDNumber}</td>
                          <td>
                            <input
                              style={{
                                cursor: "pointer",
                              }}
                              onChange={() => handleCheckboxChange(x.Id)}
                              type="checkbox"
                              checked={
                                selectAll || selectedProducts.includes(x.Id)
                              }
                            />
                          </td>
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
