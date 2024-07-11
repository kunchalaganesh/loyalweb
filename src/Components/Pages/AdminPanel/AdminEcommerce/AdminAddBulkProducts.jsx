import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import AlertMessage from "../../../Other Functions/AlertMessage";
import { useSelector } from "react-redux";
import {
  a125,
  a128,
  a131,
  a134,
  a137,
  a146,
  a149,
  a152,
  a153,
  a16,
  a162,
  a163,
  a170,
  a175,
  a176,
  a177,
  a178,
  a18,
  a191,
  a194,
  a198,
  a199,
  a20,
  a22,
  a24,
  a28,
  a30,
  a31,
  a33,
  a41,
  a43,
  a47,
  a55,
  a57,
  a71,
  a8,
  a90,
} from "../../../Api/RootApiPath";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { InfinitySpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineFileAdd } from "react-icons/ai";
import { BiSave, BiListUl } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { BsImages } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { GenerateLabel } from "../../../Other Functions/GenerateLabel";
import { color } from "chart.js/helpers";

export default function AdminAddBulkProducts() {
  const [qr, setQr] = useState("");
  const [productName, setProductName] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  //   const [categoryId, setCategoryId] = useState("");
  const [pieces, setPieces] = useState(1);
  const [huid, setHuid] = useState("");
  const [netWt, setNetWt] = useState(0);
  const [size, setSize] = useState(0);
  const [hallmark, setHallmark] = useState("");
  const [hallmarkAmount, setHallmarkAmount] = useState("0");
  const [grosswt, setGrosswt] = useState(0);
  const [purity, setPurity] = useState("");
  const [collection, setCollection] = useState("");
  const [occasion, setOccasion] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  // const [productTypeId, setProductTypeId] = useState("");
  const [partyTypeId, setPartyTypeId] = useState("");
  const [boxId, setBoxId] = useState(1);
  const [making_per_gram, setMaking_per_gram] = useState(0);
  const [making_Fixed_Amt, setMaking_Fixed_Amt] = useState(0);
  const [making_Percentage, setMaking_Percentage] = useState(0);
  const [making_Fixed_Wastage, setMaking_Fixed_Wastage] = useState(0);
  const [stoneWeight, setStoneWeight] = useState(0);
  const [clipWeight, setClipWeight] = useState(0);
  const [stoneAmount, setStoneAmount] = useState(0);
  const [featured, setFeatured] = useState("");
  const [productCode, setProductCode] = useState("");
  const [mrp, setMRP] = useState(0);
  const [itemCode, setItemCode] = useState("");
  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [finePerc, setFinePerc] = useState("0");
  const [wastagePerc, setWastagePerc] = useState("0");
  const [fineWastagePerc, setFineWastagePerc] = useState("0");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [category, setCategory] = useState("");
  const [baseMetal, setBaseMetal] = useState("");
  const [productTypeData, setProductTypeData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [purityData, setPurityData] = useState([]);
  const [partyData, setPartyData] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [collectionTypeData, setCollectionTypeData] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [parameter, setParameter] = useState("");
  const [formValue, setFormValue] = useState("");
  const [productType, setProductType] = useState("");
  const [productInEdit, setProductInEdit] = useState([]);
  const [productInEditImages, setProductInEditImages] = useState();
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [showImportPopup, setShowImportPopup] = useState(false);
  const [importFile, setImportFile] = useState([]);

  const [loading, setLoading] = useState(false);
  // const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(true);

  const [goldAlert, setGoldAlert] = useState(false);
  const [barCodeAlert, setBarCodeAlert] = useState(false);
  const [importAlert, setImportAlert] = useState(false);
  const [firebaseData, setFirebaseData] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [rifdData, setRifdData] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [selectedItemCodes, setSelectedItemCodes] = useState([]);
  const [allItemCodesArray, setAllItemCodesArray] = useState([]);
  const [deleteAll, setDeleteAll] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const [showAllFields, setShowAllFields] = useState(false);
  const [stockType, setStockType] = useState("Labelled");
  const [branch, setBranch] = useState("Home");
  const [lotNumber, setLotNumber] = useState(0);
  const [packetNumber, setPacketNumber] = useState(0);

  // new logic for barcode and tid below
  const [barcodeNumbersArray, setBarcodeNumbersArray] = useState([]);
  const [piecesBox, setPiecesBox] = useState(false);
  const [productPiecesEditId, setProductPiecesEditId] = useState(0);
  const [halfInputs, setHalfInputs] = useState(true);
  const [allPurchaseItems, setAllPurchaseItems] = useState([]);
  const [allFilteredPurchaseItems, setAllFilteredPurchaseItems] = useState([]);
  const [allPacketNumbers, setAllPacketNumbers] = useState([]);
  // const [barcodeNumbersArray, setBarcodeNumbersArray] = useState([]);

  const [allSku, setAllSku] = useState([]);
  const [allSelectedSkuStones, setAllSelectedSkuStones] = useState([]);
  const [selectedSkuStones, setSelectedSkuStones] = useState([]);
  const [allSelectedSkuDiamonds, setAllSelectedSkuDiamonds] = useState([]);
  const [selectedSkuDiamonds, setSelectedSkuDiamonds] = useState([]);

  const [diamondSize, setDiamondSize] = useState("");
  const [diamondWeight, setDiamondWeight] = useState("0");
  const [diamondPurchaseRate, setDiamondPurchaseRate] = useState("0");
  const [diamondSellRate, setDiamondSellRate] = useState("0");
  const [diamondClarity, setDiamondClarity] = useState("");
  const [diamondColour, setDiamondColour] = useState("");
  const [diamondShape, setDiamondShape] = useState("");
  const [diamondCut, setDiamondCut] = useState("");
  const [diamondSettingType, setDiamondSettingType] = useState("");
  const [diamondCertificate, setDiamondCertificate] = useState("");
  const [diamondPieces, setDiamondPieces] = useState("1");
  const [diamondPurchaseAmount, setDiamondPurchaseAmount] = useState("0");
  const [diamondSellAmount, setDiamondSellAmount] = useState("0");
  const [diamondDescription, setDiamondDescription] = useState("");

  const [allDiamondSizeWeightRate, setAllDiamondSizeWeightRate] = useState([]);
  const [allDiamondAttributes, setAllDiamondAttributes] = useState([]);
  const [newStonesList, setNewStonesList] = useState([]);
  const [newDiamondsList, setNewDiamondsList] = useState([]);
  const [allStonesList, setAllStonesList] = useState([]);
  const [allDiamondsList, setAllDiamondsList] = useState([]);
  const [showAddStoneBox, setShowAddStoneBox] = useState(false);
  const [showAddDiamondBox, setShowAddDiamondBox] = useState(false);
  const [addStone, setAddStone] = useState({
    StoneName: "",
    StoneWeight: 0,
    StonePieces: 0,
    StoneRate: 0,
    StoneAmount: 0,
    Description: "",
    ClientCode: "",
    EmployeeCode: "",
    ProductId: 0,
  });

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;
  const CompanyId = adminLoggedIn.CompanyId;
  const BranchId = adminLoggedIn.BranchId;
  const CounterId = adminLoggedIn.CounterId;

  const useWarnIfUnsavedChanges = (hasUnsavedChanges) => {
    const navigate = useNavigate();

    const customNavigate = useCallback(
      (to, options = {}) => {
        if (
          hasUnsavedChanges &&
          !window.confirm(
            "You have unsaved changes. Are you sure you want to leave?"
          )
        ) {
          // User does not confirm navigation, do nothing.
          return;
        }

        // No unsaved changes or user confirmed, proceed with navigation.
        navigate(to, options);
      },
      [hasUnsavedChanges, navigate]
    );

    return customNavigate;
  };
  const customNavigate = useWarnIfUnsavedChanges(hasUnsavedChanges);

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
  let barcodeNumberString = "";
  let tidNumberString = "";
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

  // console.log("barcodeNumberString:", barcodeNumberString);
  // console.log("tidNumberString:", tidNumberString);
  // console.log("barcodeNumberString:", barcodeNumberString);
  // console.log("tidNumberString:", tidNumberString);
  useEffect(() => {
    if (!piecesBox) {
      setBarcodeNumbersArray([]);
    }
  }, [piecesBox]);
  // console.log(addedProducts, "addedProducts for barcode");
  // console.log(barcodeNumbersArray, "barcodeNumbersArray");
  // new logic for barcode and tid above

  let Entryby_Staff_id = parseInt(adminLoggedIn);

  const scrollToCenter = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // console.log("scroll");
  };
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
      .then((y) => setProductTypeData(y));
  }, []);
  // console.log(productTypeData.category_id);

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
    fetch(a149, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setPartyData(data));
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
      .then((data) => setCollectionTypeData(data));
  }, []);
  // console.log(partyData);
  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a137, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setBoxData(data));
  }, []);
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
      setAllPurchaseItems(data);
      setAllFilteredPurchaseItems(data);

      console.log(data, "AllPurchaseItems");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllPacketNumbers = async () => {
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
      setAllPacketNumbers(data);

      console.log(data, "allEmployeesData");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPurchaseItems();
    fetchAllPacketNumbers();
  }, []);

  const fetchAllSku = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a163, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllSku(data);

      console.log(data, "allSkuData");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllDiamondSizeWeightRate = async () => {
    const formData = { ClientCode: clientCode };
    try {
      const response = await fetch(a191, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllDiamondSizeWeightRate(data);
      // console.log(data, "AllVendorTounche");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllDiamondAttributes = async () => {
    const formData = { ClientCode: clientCode };
    try {
      const response = await fetch(a194, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllDiamondAttributes(data);
      // console.log(data, "AllVendorTounche");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllSku();
  }, []);
  useEffect(() => {
    fetchAllDiamondSizeWeightRate();
  }, []);

  useEffect(() => {
    fetchAllDiamondAttributes();
  }, []);
  let categoryId = parseInt(category);
  let categoryName = categoriesData.filter((x) => x.Id == parseInt(category))[0]
    ?.CategoryName;
  console.log(categoryName, "categoryName");
  console.log(categoryName, "categoryName");
  console.log(categoryName, "categoryName");
  let productTypeId = parseInt(productType) || 0;
  let productTypeName = productType;
  let collectionId = parseInt(collection) || 0;
  let collectionName = collection;
  let purityId = parseInt(purity) || 0;
  let purityName = purity;
  let partyId = parseInt(partyTypeId);
  let partyName = partyTypeId;
  let metalName = categoriesData.filter((x) => x.Id === parseInt(baseMetal))[0]
    ?.CategoryName;

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (5 > files.length > 0) {
      const newFiles = Array.from(files).slice(0, 5 - selectedFiles.length);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };

  useEffect(() => {
    const formData = {
      ClientCode: clientCode,
    };
    fetch(a175, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setRifdData(data));
    setLoadingAdd(true);
  }, []);

  // console.log(rifdData, "rifdData");

  // Skkhandre label below
  const openLabelInNew = async (products) => {
    const doc = new jsPDF({
      // format: [26, 12],
      format: [28, 13],
      orientation: "landscape",
    });

    const fontSize = 7;
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
        // doc.text(`${itemCode}`, 2, 3);
        doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 2, 3);
        doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 2, 6);
        doc.text(`N.Wt: ${parseFloat(netWt).toFixed(3)}`, 2, 9);
        // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
        // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
        doc.text(`Pcs:${pieces}`, 19, 11.5);
        // doc.text(`${product_No}`, 4, 11.5);
        doc.text(`${itemCode}`, 18, 6);
        doc.text(`${purity}`, 21, 3);
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
        doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 2, 3);
        doc.text(`MRP: ${parseFloat(mrp)}`, 2, 6);
        doc.text(`Pcs:${pieces}`, 19, 11.5);
        doc.text(`${itemCode}`, 18, 6);
        // doc.text(`${product_No}`, 4, 11.5);
        // doc.text(`${product_No}`, 4, 11.5);
        // doc.text(`${itemCode}`, 3, 3);
        doc.text(`${purity}`, 21, 3);
        {
          barcodeNumber
            ? doc.text(`${barcodeNumber}`, 2, 11.5)
            : doc.text("", 2, 11.5);
        }
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

  // Soni label below
  // const openLabelInNew = async (products) => {
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

  // NDDarbar Label Below
  // const openLabelInNew = async (products) => {
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

  // Madan Label Below
  // const openLabelInNew = async (products) => {
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

  // Soni New design
  // const openLabelInNew = async (products) => {
  //   const doc = new jsPDF({
  //     // format: [26, 12],
  //     format: [28, 12],
  //     orientation: "landscape",
  //   });

  //   const fontSize = 8;
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
  //       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 3, 6);
  //       doc.text(`N.Wt: ${parseFloat(netWt).toFixed(3)}`, 3, 9);
  //       // doc.text(`S.Wt: ${parseFloat(stoneWeight).toFixed(3)}`, 4, 8);
  //       // doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 20, 8);
  //       doc.text(`Pcs:${pieces}`, 18, 3);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 3, 3);
  //       doc.text(`${purity}`, 22, 6);
  //       doc.setFontSize(5);
  //       // const maxLineLength = 27;
  //       // const descriptionLine1 = description.substring(0, maxLineLength);
  //       // const descriptionLine2 = description.substring(
  //       //   maxLineLength,
  //       //   maxLineLength * 2
  //       // );

  //       // doc.text(descriptionLine1, 4, 10);
  //       // doc.text(descriptionLine2, 4, 11.5);
  //     } else {
  //       doc.text(`G.Wt: ${parseFloat(grosswt).toFixed(3)}`, 3, 6);
  //       doc.text(`MRP: ${parseFloat(mrp)}`, 3, 9);
  //       doc.text(`Pcs:${pieces}`, 18, 3);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 3, 3);
  //       doc.text(`${purity}`, 18, 6);
  //     }

  //     try {
  //       // const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
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
  console.log(clipWeight, "clipWeight");
  console.log(clipWeight, "clipWeight");
  const handleSubmit = async (e) => {
    e.preventDefault();

    let totalStoneAmount =
      selectedSkuStones.length > 0
        ? selectedSkuStones.reduce(
            (a, b) =>
              a +
              (
                parseFloat(b.StoneAmount) * parseFloat(selectedSku.Pieces)
              ).toFixed(2),
            0
          )
        : 0;
    setLoading(true);
    let formData = new FormData();

    formData.append("ProductTitle", productName);
    formData.append("CategoryId", categoryId);
    // formData.append("Category_Name", categoryName);
    formData.append("ProductId", parseInt(productTypeId));
    formData.append("DesignId", parseInt(collectionId));
    formData.append("VendorId", parseInt(partyId));
    formData.append("SupplierId", parseInt(partyId));
    // formData.append("Party_Details", partyName);
    // formData.append("purity", purityName);
    formData.append("PurityId", purityId);
    // formData.append("BoxId", parseInt(boxId));
    formData.append("MRP", parseFloat(mrp));
    formData.append("Quantity", parseInt(quantity));
    formData.append("GrossWt", `${parseFloat(grosswt).toFixed(3)}`);
    formData.append("ClipWeight", `${parseFloat(clipWeight).toFixed(3)}`);
    formData.append(
      "TotalStoneWeight",
      `${parseFloat(stoneWeight).toFixed(3)}`
    );
    formData.append(
      "TotalStoneAmount",
      `${parseFloat(stoneAmount).toFixed(2)}`
    );
    formData.append("NetWt", parseFloat(netWt).toFixed(3));
    // formData.append("Entryby_Staff_id", parseInt(Entryby_Staff_id));
    // formData.append("Product_No", partyName);
    formData.append("ProductCode", productCode);
    formData.append("MetalName", `${metalName}`);
    formData.append("MetalId", `${baseMetal}`);
    formData.append("Pieces", `${parseInt(pieces)}`);
    formData.append("HUIDCode", huid);
    formData.append("Size", size);
    // formData.append("Hallmark", hallmark);
    formData.append("HallmarkAmount", hallmarkAmount);
    formData.append("CollectionName", "");
    formData.append("OccassionName", "");
    formData.append("Gender", gender);
    formData.append("description", description);
    formData.append("MakingFixedAmt", making_Fixed_Amt);
    formData.append("MakingPerGram", making_per_gram);
    formData.append(
      "MakingPercentage",
      making_Percentage !== "" ? making_Percentage : "0"
    );
    formData.append("MakingFixedWastage", making_Fixed_Wastage);
    // formData.append("StoneAmount", stoneAmount);
    formData.append("Featured", featured);
    // formData.append("Itemtype", productTypeName);
    // formData.append("Product_type", productTypeName);
    formData.append("BranchName", branch);
    formData.append("SKU", selectedSkuName);
    formData.append("BlackBeads", "");
    formData.append("BoxName", "");
    formData.append("Colour", selectedSku ? selectedSku.Colour : "");
    formData.append("Status", "Active");
    formData.append("CuttingGrossWt", "0");
    formData.append("CuttingNetWt", "0");
    formData.append("HSNCode", "0");
    formData.append("LotNumber", `${lotNumber}`);
    formData.append("WarehouseId", packetNumber);
    formData.append("Margin", "0");
    formData.append("OtherWeight", selectedSku ? selectedSku.OtherWeight : "0");
    formData.append("OfferPrice", "0");
    formData.append("PouchWeight", selectedSku ? selectedSku.PouchWeight : "0");
    formData.append("TagWeight", selectedSku ? selectedSku.TagWeight : "0");
    formData.append(
      "FindingWeight",
      selectedSku ? selectedSku.FindingWeight : "0"
    );
    formData.append(
      "LanyardWeight",
      selectedSku ? selectedSku.LanyardWeight : "0"
    );
    formData.append("Ranking", "0");
    formData.append("UpdatedFrom", "Web");
    formData.append("Width", "0");
    formData.append("Height", "0");
    formData.append("ClientCode", clientCode);
    formData.append("EmployeeCode", employeeCode ? employeeCode : "");
    formData.append("CompanyId", CompanyId ? CompanyId : 0);
    formData.append("BranchId", BranchId ? BranchId : 0);
    formData.append("CounterId", CounterId ? CounterId : 0);
    formData.append("EstimatedDays", "0");
    formData.append("MetalRate", "0");
    formData.append("PurchaseCost", "0");
    formData.append("Rating", "0");
    formData.append("TotalDiamondAmount", "0");
    formData.append("TotalDiamondPieces", "0");
    formData.append("TotalDiamondWeight", "0");
    formData.append("TotalStonePieces", "0");
    formData.append("ClipQuantity", clipWeight !== 0 ? "1" : "0");

    formData.append("DiamondSize", `${diamondSize}`);
    formData.append("DiamondWeight", `${diamondWeight}`);
    formData.append("DiamondPurchaseRate", `${diamondPurchaseRate}`);
    formData.append("DiamondSellRate", `${diamondSellRate}`);
    formData.append("DiamondClarity", `${diamondClarity}`);
    formData.append("DiamondColour", `${diamondColour}`);
    formData.append("DiamondShape", `${diamondShape}`);
    formData.append("DiamondCut", `${diamondCut}`);
    formData.append("DiamondSettingType", `${diamondSettingType}`);
    formData.append("DiamondCertificate", `${diamondCertificate}`);
    formData.append("DiamondPieces", `${diamondPieces}`);
    formData.append("DiamondPurchaseAmount", `${diamondPurchaseAmount}`);
    formData.append("DiamondSellAmount", `${diamondSellAmount}`);
    formData.append("DiamondDescription", `${diamondDescription}`);

    // formData.append("BarcodeNumber", "");
    // formData.append("Images", "");
    if (selectedSkuName !== "" || selectedSku.length > 0) {
      formData.append("Images", selectedSku.Images);
      console.log("sku Selected");
    } else if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        formData.append("Images", file);
      });
      console.log("Images Selected");
    } else {
      formData.append("Images", "");
      console.log(" No Images Selected");
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    // console.log(formData, "formData");

    // formData.append("ImageList1", "");
    // formData.append("ImageList2", "");
    // formData.append("ImageList3", "");
    // formData.append("ImageList4", "");
    // formData.append("ImageList5", "");

    try {
      const response = await fetch(a176, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(formData),
        body: formData,
      });
      const data = await response.json();
      console.log(data, "1st Hit data");
      console.log(data, "1st Hit data");
      console.log(data, "data");
      if (response.ok) {
        // Check if there is a selected stone object to add
        if (selectedSkuStones && Object.keys(selectedSkuStones).length > 0) {
          const updatedProducts = data.map((product) => {
            let SKUStoneItems = selectedSkuStones.SKUStoneItem;
            // Create a new object for each product to avoid mutating the original data directly
            return {
              ...product,
              Stones: [...product.Stones, ...SKUStoneItems], // Add the selected stone object to the Stones array of each product
            };
          });
          setAddedProducts(updatedProducts); // Update your state with the new products array
          // setAddedProducts(data); // Just set the data if no stone is selected
        } else {
          setAddedProducts(data); // Just set the data if no stone is selected
        }

        setLoading(false);
        // console.log("added", data);
        const allItemCodes = data.map((product) => ({
          ItemCode: product.ItemCode,
        }));
        setAllItemCodesArray(allItemCodes);
        setDeleteAll(true);
        setPartyTypeId("");
        setCategory("");
        setProductType("");
        setPurity("");
        setQuantity(1);
        setCollection("");
        setGrosswt(0);
        setNetWt(0);
        setGender("");
        setStoneWeight(0);
        setClipWeight(0);
        setMRP(0);
        setProductName("");
        setDescription("");
        setSelectedSku([]);
        setSelectedSkuName("");
        setHasUnsavedChanges(true);
        // setHasUnsavedChanges(false);
        // customNavigate("/adminhome");
        scrollToCenter("adminAddBulkStockAddedTitleStatement");
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
  console.log(addedProducts, "addedProducts");
  console.log(addedProducts, "addedProducts");
  const handleSubmitUnlabelled = async (e) => {
    e.preventDefault();
    // console.log("unlabelled");
    setLoading(true);
    let formData = new FormData();

    formData.append("ProductTitle", productName);
    formData.append("HSNCode", "");
    formData.append("Description", description);
    formData.append("ProductCode", productCode);
    formData.append("MetalName", metalName);
    formData.append("CategoryId", categoryId);
    formData.append("ProductId", productTypeId);
    formData.append("DesignId", collectionId);
    formData.append("PurityId", purityId);
    formData.append("Colour", "");
    formData.append("TotalGrossWt", `${grosswt}`);
    formData.append("Size", `${size}`);
    formData.append("TotalNetWt", `${netWt}`);
    formData.append("CollectionName", "");
    formData.append("OccassionName", "");
    formData.append("ClipWeight", "0");
    formData.append("ClipQuantity", "0");
    formData.append("Gender", gender);
    formData.append("MakingFixedAmt", `${making_Fixed_Amt}`);
    formData.append("MakingPerGram", `${making_per_gram}`);
    formData.append("MakingFixedWastage", `${making_Fixed_Wastage}`);
    formData.append("MakingPercentage", `${making_Percentage}`);
    formData.append("TotalStoneWeight", `${stoneWeight}`);
    formData.append("TotalStoneAmount", `${stoneAmount}`);
    formData.append("TotalStonePieces", "");
    formData.append("TotalDiamondWeight", "");
    formData.append("TotalDiamondPieces", "");
    formData.append("TotalDiamondAmount", "");
    formData.append("Featured", "");
    formData.append("Pieces", pieces);
    formData.append("HallmarkAmount", hallmarkAmount);
    formData.append("HUIDCode", huid);
    formData.append("MRP", `${mrp}`);
    formData.append("VendorId", partyId);
    formData.append("BoxId", boxId);
    formData.append("TIDNumber", "");
    formData.append("RFIDCode", "");
    formData.append("BlackBeads", "");
    formData.append("Height", "");
    formData.append("Width", "");
    formData.append("OrderedItemId", 0);
    formData.append("CuttingGrossWt", "0");
    formData.append("CuttingNetWt", "0");
    formData.append("MetalRate", "0");
    formData.append("LotNumber", `${lotNumber}`);
    formData.append("DeptId", 0);
    formData.append("PurchaseCost", "");
    formData.append("Margin", "");
    formData.append("BranchName", `${branch}`);
    formData.append("BoxName", "");
    formData.append("EstimatedDays", "0");
    formData.append("OfferPrice", "0");
    formData.append("Rating", "0");
    formData.append("SKU", selectedSkuName);
    formData.append("Ranking", "0");
    formData.append("CompanyId", CompanyId ? CompanyId : 0);
    formData.append("CounterId", CounterId ? CounterId : 0);
    formData.append("BranchId", BranchId ? BranchId : 0);
    formData.append("Status", "Active");
    formData.append("ClientCode", clientCode);
    formData.append("EmployeeCode", employeeCode ? employeeCode : "0");
    formData.append("UpdatedFrom", "Web");
    formData.append("SupplierId", partyId);
    formData.append("Quantity", quantity);
    formData.append("GroupCode", "0");
    formData.append("FinePercentage", `${finePerc}`);
    formData.append("WastagePercentage", `${wastagePerc}`);
    formData.append("FinePlusWastageWeight", `${fineWastagePerc}`);
    formData.append("Images", "");
    formData.append("MetalId", baseMetal);
    formData.append("WarehouseId", packetNumber);

    formData.append("DiamondSize", `${diamondSize}`);
    formData.append("DiamondWeight", `${diamondWeight}`);
    formData.append("DiamondPurchaseRate", `${diamondPurchaseRate}`);
    formData.append("DiamondSellRate", `${diamondSellRate}`);
    formData.append("DiamondClarity", `${diamondClarity}`);
    formData.append("DiamondColour", `${diamondColour}`);
    formData.append("DiamondShape", `${diamondShape}`);
    formData.append("DiamondCut", `${diamondCut}`);
    formData.append("DiamondSettingType", `${diamondSettingType}`);
    formData.append("DiamondCertificate", `${diamondCertificate}`);
    formData.append("DiamondPieces", `${diamondPieces}`);
    formData.append("DiamondPurchaseAmount", `${diamondPurchaseAmount}`);
    formData.append("DiamondSellAmount", `${diamondSellAmount}`);
    formData.append("DiamondDescription", `${diamondDescription}`);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(a198, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      // console.log(data, "Unlabeldata");
      // console.log(data.data, "Unlabeldata");
      console.log(data, "rcvd data 1st hit");
      if (!data.Message) {
        setAddedProducts([data]);
        // console.log("Inside Response");
        setLoading(false);
        console.log("added", data);
        // const allItemCodes = data.data.map((product) => ({
        //   ItemCode: product.itemCode,
        // }));
        // setAllItemCodesArray(allItemCodes);
        setDeleteAll(true);
        setPartyTypeId("");
        setCategory("");
        setProductType("");
        setPurity("");
        setQuantity(1);
        setCollection("");
        setGrosswt(0);
        setNetWt(0);
        setClipWeight(0);
        setGender("");
        setStoneWeight(0);
        setMRP(0);
        setProductName("");
        setDescription("");
        setSelectedSku([]);
        setSelectedSkuName("");
        setHasUnsavedChanges(true);
        // setStockType("Labelled");
        scrollToCenter("adminAddBulkStockAddedTitleStatement");
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
  useEffect(() => {
    // console.log("allItemCodesArray", allItemCodesArray);
  }, [allItemCodesArray]);

  // console.log("allItemCodesArray outside useEffect", allItemCodesArray);
  const handleInputChange = (e, productId, property) => {
    // const barcodeInput = document.getElementById("barcodeNumberInput");
    // barcodeInput.style.setProperty("color", "black");
    const { value } = e.target;
    // setBarCodeAlert(false);
    const updatedProducts = addedProducts.map((product) => {
      if (product.Id === productId) {
        // Parse properties to numbers or set them as 0 if the value is empty or invalid
        const grosswt =
          stockType == "Labelled"
            ? parseFloat(product.GrossWt) || 0
            : stockType == "Unlabelled"
            ? parseFloat(product.TotalGrossWt) || 0
            : 0;
        const stoneWeight = parseFloat(product.TotalStoneWeight) || 0;
        const netWt = parseFloat(product.NetWt) || 0;

        // Update the specific property in the product object
        let updatedProduct = { ...product, [property]: value };

        if (property === "RFIDCode") {
          // Convert the barcode number to uppercase before doing the comparison
          const barcodeValue = value.toUpperCase();
          updatedProduct.RFIDCode = barcodeValue; // Set the barcodeNumber property to uppercase

          // Find a matching product in the rifdData array
          const matchingProduct = rifdData.find(
            (item) => item.BarcodeNumber === barcodeValue
          );

          if (matchingProduct) {
            updatedProduct.TIDNumber = matchingProduct.TidValue;
          } else {
            // If no matching product found, set 'tid' to null or some default value
            updatedProduct.TIDNumber = null; // or any default value you want
            // setBarCodeAlert(true);
          }
        }

        // If 'grosswt' is changed, calculate 'netWt'
        if (property === "GrossWt" && !isNaN(value)) {
          updatedProduct.NetWt =
            parseFloat(value) -
              parseFloat(updatedProduct.ClipWeight) -
              parseFloat(updatedProduct.TotalStoneWeight) >
            0
              ? (
                  parseFloat(value) -
                  parseFloat(updatedProduct.ClipWeight) -
                  parseFloat(updatedProduct.TotalStoneWeight)
                ).toFixed(3)
              : (updatedProduct.GrossWt = value);
        }
        if (property === "TotalGrossWt" && !isNaN(value)) {
          updatedProduct.TotalNetWt =
            parseFloat(value) - parseFloat(updatedProduct.TotalStoneWeight) > 0
              ? (
                  parseFloat(value) -
                  parseFloat(updatedProduct.ClipWeight) -
                  parseFloat(updatedProduct.TotalStoneWeight)
                ).toFixed(3)
              : (updatedProduct.TotalGrossWt = value);
        }

        // If 'stoneWeight' is changed, calculate 'netWt'
        if (property === "TotalStoneWeight" && !isNaN(value)) {
          updatedProduct.NetWt =
            parseFloat(updatedProduct.GrossWt) > value
              ? (updatedProduct.GrossWt - parseFloat(value)).toFixed(3)
              : ((updatedProduct.GrossWt = value),
                (updatedProduct.TotalStoneWeight = value),
                (updatedProduct.NetWt = 0));
        }
        if (property === "ClipWeight" && !isNaN(value)) {
          const clipWeight = parseFloat(value);
          if (grosswt > clipWeight) {
            // If gross weight is greater than the clip weight, update net weight
            updatedProduct.NetWt = parseFloat(
              grosswt - (stoneWeight + clipWeight)
            ).toFixed(3);
            updatedProduct.ClipWeight = clipWeight;
            updatedProduct.ClipQuantity = "1";
          } else {
            // If clip weight is greater or equal to the gross weight, adjust accordingly
            updatedProduct.GrossWt = parseFloat(
              clipWeight + stoneWeight
            ).toFixed(3);
            updatedProduct.ClipWeight = clipWeight;
            updatedProduct.ClipQuantity = "1";
            updatedProduct.NetWt = 0; // Set net weight to 0 if conditions dictate
          }
        }

        // If 'netWt' is changed, calculate 'grosswt' and 'stoneWeight'
        if (property === "NetWt" && !isNaN(value)) {
          updatedProduct.GrossWt = (
            parseFloat(value) +
            parseFloat(updatedProduct.ClipWeight) +
            stoneWeight
          ).toFixed(3);
          updatedProduct.TotalStoneWeight = (
            grosswt -
            parseFloat(value) -
            parseFloat(updatedProduct.ClipWeight)
          ).toFixed(3);
        }
        if (property === "TotalNetWt" && !isNaN(value)) {
          updatedProduct.TotalGrossWt = (
            parseFloat(value) +
            stoneWeight +
            parseFloat(updatedProduct.ClipWeight)
          ).toFixed(3);
          updatedProduct.TotalStoneWeight = (
            grosswt - parseFloat(value)
          ).toFixed(3);
        }
        if (property === "Pieces" && value > 1 && stockType === "Labelled") {
          setPiecesBox(true);
          setProductPiecesEditId(productId);
          handlePiecesChange(value, productId);
        }

        return updatedProduct;
      }
      return product;
    });

    setAddedProducts(updatedProducts);
  };

  // ... (rest of the code)

  const playTimer = () => {
    setTimeout(() => {
      setGoldAlert(false), setBarCodeAlert(false), setImportAlert(false);
    }, 2000);
  };

  const handleEditProducts = async () => {
    setLoading(true);
    console.log(addedProducts, "save:label");
    try {
      // Validate 'grosswt' for all products
      const hasInvalidGrossWt = addedProducts.some(
        (product) =>
          (product.GrossWt === "" && product.CategoryId == 1) ||
          (parseFloat(product.GrossWt) === 0 && product.CategoryId == 1)
      );

      const hasMissingBarcodeAndTid = addedProducts.some((product) => {
        if (product.RFIDCode && product.RFIDCode.length !== 0) {
          // Barcode is not empty or null, so check if tid is missing
          return product.TIDNumber === null || product.TIDNumber === "";
        }
        // Barcode is either empty or null, so no need to check tid
        return false;
      });

      if (hasInvalidGrossWt) {
        setLoading(false);
        setGoldAlert(true);
        playTimer();
      } else if (hasMissingBarcodeAndTid) {
        setLoading(false);
        setBarCodeAlert(true);
        playTimer();
      } else {
        // Convert grosswt, stoneWeight, and netWt to strings before sending
        const updatedProductsString = addedProducts.map((product) => ({
          ...product,
          GrossWt: product.GrossWt.toString(),
          TotalStoneWeight: product.TotalStoneWeight.toString(),
          NetWt: product.NetWt.toString(),
        }));

        console.log(updatedProductsString, "updatedProductsStringLabel");
        // Send the updated products to the edit API endpoint
        const response = await fetch(a177, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductsString),
        });
        const rcvdData = await response.json();
        console.log("rcvdData 2nd HIT", rcvdData);
        console.log("rcvdData 2nd HIT", rcvdData);
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
        console.log(rcvdData, "rcvdData Update Api");
        console.log(rcvdData, "rcvdData Update Api");
        if (rcvdData.status === "error") {
          setLoading(false);
          alert(rcvdData.Message); // Show error message
          const productsWithErrors = addedProducts.map((product) =>
            product.RFIDCode === rcvdData.errorBarcode
              ? { ...product, hasError: true }
              : product
          );
          setAddedProducts(productsWithErrors);
          // console.log("rcvdDataErrorAdded", addedProducts);
        } else {
          // openLabelInNew(rcvdData);
          GenerateLabel(rcvdData);
          setHasUnsavedChanges(false);
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
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleEditProductsUnlabelled = async () => {
    setLoading(true);
    console.log(addedProducts, "save");
    try {
      const updatedProductsString = addedProducts.map((product) => ({
        ...product,
        TotalGrossWt: product.TotalGrossWt.toString(),
        TotalStoneWeight: product.TotalStoneWeight.toString(),
        TotalNetWt: product.TotalNetWt.toString(),
        MRP: product.MRP.toString(),
        Pieces: `${parseInt(product.pieces)}`,
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
      const response = await fetch(a199, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductsString2[0]),
      });
      const rcvdData = await response.json();
      console.log("rcvdData", rcvdData);
      setHasUnsavedChanges(true);
      setStockType("Labelled");
      setAddedProducts([rcvdData]);
      setAddedProducts([]);
      alert("Unlabelled Stock Added");
      scrollToCenter("addBulkProductsBoxTop");
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
  // console.log("2addedProducts", addedProducts);
  const filteredProducts = productTypeData.filter(
    (product) => product.CategoryId == baseMetal
  );
  const filteredCollection = collectionTypeData.filter(
    (product) => product.ProductId == productType
  );
  const filteredPurity = purityData.filter(
    (product) => product.CategoryId == baseMetal
  );
  const filteredBoxes = boxData.filter(
    (product) => product.ProductId == productType
  );

  const handleCheckboxChange = (productId, itemCode) => {
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
      setDeleteSelected(true);
    } else {
      setDeleteSelected(false);
    }

    setCheckedProducts(updatedCheckedProducts);
    setSelectedItemCodes(updatedSelectedItemCodes);
  };

  const selectedItems = selectedItemCodes.map((itemCode) => ({
    ItemCode: itemCode,
  }));

  // console.log("checkedProducts", checkedProducts);
  // console.log("selectedItemCodes", selectedItemCodes);
  // console.log("selectedItems", selectedItems);

  const deleteAllProducts = async (itemsToDelete) => {
    const deletAllItemsList = itemsToDelete.map((x) => {
      return { ...x, ClientCode: clientCode };
    });
    // const deletAllItemsList = itemsToDelete.map(x => ({...x, ClientCode: clientCode}));

    console.log(itemsToDelete, "itemsToDelete");
    console.log(itemsToDelete, "itemsToDelete");
    console.log(deletAllItemsList, "deletAllItemsList");
    console.log(deletAllItemsList, "deletAllItemsList");
    try {
      const response = await fetch(a178, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deletAllItemsList),
      });

      const rcvdData = await response.json();
      // console.log("AllItemsDeleted", rcvdData);
      console.log("Responsee:", rcvdData);
      console.log("Responsee:", rcvdData);
      if (response.ok) {
        // Deletion was successful
        // console.log("Item deleted successfully:", response.message);
        // alert(rcvdData.message);
        setSelectedItemCodes([]);
        setCheckedProducts([]);
        scrollToCenter("addBulkProductsBoxTop");
        // You can show an alert or notification here
        // alert(data.message);
        if (itemsToDelete == allItemCodesArray) {
          setAddedProducts([]);
        } else {
          const updatedAddedProducts = addedProducts.filter((product) => {
            return !itemsToDelete.some(
              (item) => item.ItemCode === product.ItemCode
            );
          });
          setAddedProducts(updatedAddedProducts);
        }
        setDeleteAll(false);
        setDeleteSelected(false);
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
  const showAllInputs = () => {
    setHalfInputs(!halfInputs);
    const allFields = document.getElementById("bulkStockAddProductDetailsBox");
    if (halfInputs) {
      allFields.classList.add("bulkStockAddProductDetailsBoxHalfHeight");
      allFields.classList.remove("bulkStockAddProductDetailsBoxFullHeight");
    } else {
      allFields.classList.remove("bulkStockAddProductDetailsBoxHalfHeight");
      allFields.classList.add("bulkStockAddProductDetailsBoxFullHeight");
    }
  };
  const [selectedSku, setSelectedSku] = useState([]);
  const [selectedSkuName, setSelectedSkuName] = useState("");
  const handleSkuInputChange = (e) => {
    const { value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setSelectedSkuName(uppercaseValue);
    let selectedSkuItem = [];
    selectedSkuItem = allSku.find((x) => x.StockKeepingUnit == uppercaseValue);
    setSelectedSku(selectedSkuItem);
  };
  useEffect(() => {
    if (selectedSkuName !== "" && selectedSku) {
      setDescription(selectedSku.Description);
      setNetWt(selectedSku.NetWt);
      setBoxId(1);
      setPartyTypeId(selectedSku.VendorId);
      // categoryName = selectedSku.category;
      // productTypeName = selectedSku.productType;
      // collectionName = selectedSku.collection;
      // purityName = selectedSku.purity;
      setCategory(`${selectedSku.CategoryId}`);
      setBaseMetal(`${selectedSku.CategoryId}`);
      setProductType(`${selectedSku.ProductId}`);
      setCollection(`${selectedSku.DesignId}`);
      setPurity(`${selectedSku.PurityId}`);
      // categoryId = selectedSku.categoryId;
      // productTypeId = selectedSku.productTypeId;
      // purityId = selectedSku.purityId;
      // collectionId = selectedSku.collectionId;
      setSize(selectedSku.Size);
      setGrosswt(selectedSku.GrossWt);
      setPieces(selectedSku.Pieces);
      // setStoneWeight(
      //   parseFloat(selectedSku.TotalStoneWeight) *
      //     parseFloat(selectedSku.Pieces)
      // );
      setSelectedFiles(selectedSku.Images);
      // setSelectedFiles(selectedSku.images);
      setMaking_Percentage(selectedSku.MakingPercentage);
      setMaking_Fixed_Amt(selectedSku.MakingFixedAmt);
      setMaking_per_gram(selectedSku.MakingPerGram);
      setMaking_Fixed_Wastage(selectedSku.MakingFixedWastage);
      setMRP(selectedSku.MRP);
      setAllSelectedSkuStones(selectedSku.SKUStoneMain);
      setAllSelectedSkuDiamonds(selectedSku.Diamonds);
      const allFilteredPurchaseItemsList = allPurchaseItems.filter(
        (x) => x.SKUId === selectedSku.Id
      );
      setAllFilteredPurchaseItems(allFilteredPurchaseItemsList);
    } else {
      setDeleteAll(true);
      // setPartyTypeId("");
      setCategory("");
      setBaseMetal("");
      setProductType("");
      setPurity("");
      setQuantity(1);
      setCollection("");
      setGrosswt(0);
      setNetWt(0);
      setClipWeight(0);
      setGender("");
      setStoneWeight(0);
      setMRP(0);
      setBoxId(1);
      setProductName("");
      setDescription("");
      setSelectedFiles([]);
      setAllFilteredPurchaseItems(allPurchaseItems);
    }
  }, [selectedSku]);

  useEffect(() => {
    const allFilteredPurchaseItemsList = allPurchaseItems.filter(
      (x) => x.VendorId === parseInt(partyTypeId)
    );
    setAllFilteredPurchaseItems(allFilteredPurchaseItemsList);
  }, [partyTypeId]);

  const uploadExcelFile = async () => {
    if (importFile) {
      const formData = new FormData();
      formData.append("file", importFile);

      fetch(a90, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then((data) => ({
              status: response.status,
              data,
            }));
          } else {
            return response.text().then((text) => ({
              status: response.status,
              data: text,
            }));
          }
        })
        .then(({ status, data }) => {
          console.log("Success:", data);
          alert("Imported Data");
          setShowImportPopup(false);
          // Handle success response
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors
        });
    } else {
      alert("Please select a file.");
    }
  };

  const handleSelectedSkuStoneChange = (e) => {
    if (e.target.value !== "") {
      const selectedStone = allSelectedSkuStones.find(
        (stone) => stone.Id == e.target.value
      );
      console.log("I am here");
      setSelectedSkuStones(selectedStone);
      console.log("I am here");
      console.log("I am here");
      setStoneWeight(
        (
          parseFloat(selectedStone.StoneMainWeight) *
          parseFloat(selectedSku.Pieces)
        ).toFixed(3)
      );
      setNetWt(
        (
          parseFloat(grosswt) -
          parseFloat(selectedStone.StoneMainWeight) *
            parseFloat(selectedSku.Pieces)
        ).toFixed(3)
      );
      setStoneAmount(
        (
          parseFloat(selectedStone.StoneMainAmount) *
          parseFloat(selectedSku.Pieces)
        ).toFixed(2)
      );
    } else {
      console.log("I am NOWhere");
      console.log("I am NOWhere");
      setSelectedSkuStones({ Id: 0 });
    }
  };
  useEffect(() => {
    fetchAllStonesList();
  }, []);

  useEffect(() => {
    fetchAllDiamondsList();
  }, []);
  const fetchAllStonesList = async () => {
    const formData = { ClientCode: clientCode };
    try {
      const response = await fetch(a146, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllStonesList(data);
      console.log(data, "allPurities");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(newStonesList, "c%newStonesList", "", "color:red");
  const fetchAllDiamondsList = async () => {
    const formData = { ClientCode: clientCode };
    try {
      const response = await fetch(a153, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllDiamondsList(data);
      console.log(data, "allPurities");
    } catch (error) {
      console.log(error);
    }
  };
  const handleStoneChange = (index, property, value) => {
    const newStones = newStonesList;
    const selectedStone = allStonesList.find(
      (stone) => stone.StoneName === value
    );
    console.log(selectedStone, "selected Stone");
    console.log(selectedStone, "selected Stone");

    if (selectedStone) {
      newStones[index] = {
        ...newStones[index],
        StoneName: selectedStone.StoneName,
        StoneWeight: selectedStone.StoneWeight, // Assuming these fields exist in your stone objects
        StonePieces: selectedStone.StonePieces,
        StoneRate: selectedStone.StoneRate,
        StoneAmount: selectedStone.StoneAmount, // Calculate or pull this value as required
        Description: selectedStone.Description, // Assuming a description field exists
      };
    } else {
      newStones[index] = {
        ...newStones[index],
        [property]: value,
      };
    }

    return setNewStonesList(newStones);
  };
  console.log(newStonesList, "newStonesList");
  const deleteStone = (index) => {
    const updatedStones = newStonesList.filter((_, i) => i !== index);
    setNewStonesList(updatedStones);
  };
  console.log(selectedSkuStones, "selectedSkuStones");
  console.log(selectedSkuStones, "selectedSkuStones");
  return (
    <div>
      <div>
        <AdminHeading />
        <div className="adminMainBodyBox" id="addBulkProductsBoxTop">
          <AdminBreadCrump
            title={"Add Bulk Stock"}
            companyName={"Loyalstring"}
            module={"E-commerce"}
            page={"Add Bulk Stock"}
          />
          <div className="adminAddCategoryMainBox2">
            <div
              style={{
                margin: "0px",
                padding: "0px",
                backgroundColor: "transparent",
              }}
              className="adminAddCategoryInnerBox2"
            >
              {goldAlert
                ? // <AlertMessage
                  //   type="error"
                  //   message="Gross Wt of Gold could not be zero"
                  // />
                  alert("Gross Wt of Gold could not be zero")
                : null}
              {barCodeAlert
                ? // <AlertMessage
                  //   type="error"
                  //   message="Sorry, Please enter a correct Barcode"
                  // />
                  alert("Sorry, Please enter a correct Barcode")
                : null}
              {showAddStoneBox ? (
                <div className="popup">
                  <div
                    style={{ maxHeight: "250px", overflowY: "auto" }}
                    className="popup-inner"
                  >
                    <div className="adminAddProductsPopupInnerBox">
                      {newStonesList.map((x, index) => (
                        <div className="adminPurchaseEntryAddStonesMainBox">
                          <div style={{ gridColumn: "span 6" }}>
                            <h4 style={{ margin: "5px" }}>Stone {index + 1}</h4>
                          </div>
                          <label>Stone Name</label>
                          <input
                            value={x.StoneName}
                            onChange={(e) =>
                              handleStoneChange(
                                index,
                                "StoneName",
                                e.target.value
                              )
                            }
                            type="text"
                            list="allStonesList"
                          />
                          <datalist id="allStonesList">
                            {allStonesList.map((x) => {
                              return (
                                <option value={x.StoneName}>
                                  {x.StoneName}
                                </option>
                              );
                            })}
                          </datalist>
                          <label>Stone Weight</label>
                          <input
                            value={x.StoneWeight}
                            onChange={(e) =>
                              handleStoneChange(
                                index,
                                "StoneWeight",
                                e.target.value
                              )
                            }
                            type="text"
                          />
                          <label>Stone Pieces</label>
                          <input
                            value={x.StonePieces}
                            onChange={(e) =>
                              handleStoneChange(
                                index,
                                "StonePieces",
                                e.target.value
                              )
                            }
                            type="text"
                          />
                          <label>Stone Rate</label>
                          <input
                            value={x.StoneRate}
                            onChange={(e) =>
                              handleStoneChange(
                                index,
                                "StoneRate",
                                e.target.value
                              )
                            }
                            type="text"
                          />
                          <label>Stone Amount</label>
                          <input
                            value={x.StoneAmount}
                            onChange={(e) =>
                              handleStoneChange(
                                index,
                                "StoneAmount",
                                e.target.value
                              )
                            }
                            type="text"
                          />
                          <label>Stone Description</label>
                          <input
                            value={x.Description}
                            onChange={(e) =>
                              handleStoneChange(
                                index,
                                "Description",
                                e.target.value
                              )
                            }
                            type="text"
                          />
                          {/* <label>Stone Weight</label> */}
                          <button
                            className="bulkProductAddDeleteButton close-btn"
                            onClick={() => deleteStone(index)}
                          >
                            Delete Stone
                          </button>
                          <button
                            id="bulkStockAddProductImportButton"
                            onClick={() =>
                              setNewStonesList((previousState) => [
                                ...previousState,
                                addStone,
                              ])
                            }
                            className="close-btn"
                          >
                            Add Stone
                          </button>
                        </div>
                      ))}
                      {!newStonesList.length > 0 ? (
                        <button
                          id="bulkStockAddProductImportButton"
                          onClick={() =>
                            setNewStonesList((previousState) => [
                              ...previousState,
                              addStone,
                            ])
                          }
                          className="close-btn"
                        >
                          Add Stone
                        </button>
                      ) : null}
                      <button
                        onClick={() => setShowAddStoneBox(false)}
                        className="bulkProductAddDeleteButton close-btn"
                      >
                        Close
                      </button>
                    </div>
                    {/* <p>This is a popup screen!</p> */}
                  </div>
                </div>
              ) : null}
              {piecesBox ? (
                <div className="adminInvoiceOpenEditMainBox adminAddBulkStockMultiplePiecesMainBox">
                  <div className="adminInvoiceOpenEditInnerBox">
                    <div className="adminInvoiceOpenEditInnerTitleBox">
                      <button
                        onClick={() => closePiecesEditBox()}
                        className="adminAddInvoiceMainAddLabelOptionDeleteIcon"
                      >
                        close
                      </button>
                    </div>
                    <div className="adminInvoiceOpenEditOuterGridBox">
                      {barcodeNumbersArray.map((item, index) => {
                        const barcodeNumberKey = Object.keys(item)[0]; // Get the barcodeNumber key
                        const tidValue = item[barcodeNumberKey]; // Get the tid value

                        return (
                          <>
                            <div
                              className="adminInvoiceOpenEditInnerGridItem"
                              key={index}
                            >
                              <label>Barcode Number</label>
                              <input
                                type="text"
                                value={barcodeNumberKey}
                                onChange={(e) =>
                                  handleBarcodeNumberChange(
                                    e.target.value.toUpperCase(),
                                    index
                                  )
                                }
                              />
                            </div>
                            <div
                              className="adminInvoiceOpenEditInnerGridItem"
                              key={index}
                            >
                              <label>Tid</label>
                              <input type="text" value={tidValue} readOnly />
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => {
                        handleCheckTidValues();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : null}

              <div>
                {loadingAdd ? (
                  <div className="adminAddCategoryMainbox addProductMain">
                    <form
                      style={{
                        marginTop: "10px",
                      }}
                      onSubmit={
                        stockType === "Labelled"
                          ? handleSubmit
                          : handleSubmitUnlabelled
                      }
                    >
                      <h3
                        className="adminAddBulkStockAddedTitle"
                        style={{ marginBottom: "3rem", width: "97%" }}
                      >
                        ADD BULK STOCK
                      </h3>

                      {/* <h4
                        id="adminInvoiceAddedCustomerEdit"
                        className="adminInvoiceAddTitles"
                        style={{
                          marginBottom: "3rem",
                          width: "95%",
                          fontSize: "16px",
                          padding: "15px 10px",
                        }}
                      >
                        Add Product
                      </h4>{" "} */}
                      <div className="addProductDetailsUpperBox">
                        <div
                          // style={{ width: "92%" }}
                          className="addProductDetailsBox"
                        >
                          <label htmlFor="category">
                            <strong>SUPPLIER</strong>
                          </label>
                          <select
                            id="category"
                            required="required"
                            value={partyTypeId}
                            onChange={(e) => setPartyTypeId(e.target.value)}
                          >
                            <option value="">
                              Select Party / Karigar Name
                            </option>
                            {partyData.map((x, y) => {
                              return (
                                <option key={y} value={parseInt(x.Id)}>
                                  {x.VendorName}
                                </option>
                              );
                            })}
                          </select>
                          <p>Unlabelled Gold :</p>

                          <div>
                            {(() => {
                              const selectedParty = partyData.find(
                                (x) => x.Id === parseInt(partyTypeId)
                              );
                              if (selectedParty) {
                                return (
                                  <div
                                    className="addProductSupplierDetailsBox"
                                    key={selectedParty.Id}
                                  >
                                    {" "}
                                    {/* It's good practice to include a key even if it's not strictly necessary here */}
                                    <p>{selectedParty.InwardGold}</p>
                                  </div>
                                );
                              }
                              return null; // If no party is found, render nothing
                            })()}
                          </div>
                        </div>
                        <div
                          // style={{ width: "92%" }}
                          className="addProductDetailsBox"
                        >
                          <label htmlFor="sku">
                            <strong>SKU</strong>
                          </label>
                          <input
                            // style={{ width: "30vw" }}
                            type="text"
                            name="skuList"
                            placeholder="Enter SKU"
                            value={selectedSkuName}
                            onInput={handleSkuInputChange}
                            list="skuList"
                          />
                          <datalist id="skuList">
                            {allSku.map((sku, index) => (
                              <option
                                key={index}
                                value={`${sku.StockKeepingUnit}`}
                              />
                            ))}
                          </datalist>
                          <p>Unlabelled Silver :</p>
                          <div>
                            {(() => {
                              const selectedParty = partyData.find(
                                (x) => x.Id === parseInt(partyTypeId)
                              );
                              if (selectedParty) {
                                return (
                                  <div
                                    className="addProductSupplierDetailsBox"
                                    key={selectedParty.Id}
                                  >
                                    {" "}
                                    {/* It's good practice to include a key even if it's not strictly necessary here */}
                                    <p>{selectedParty.InwardSilver}</p>
                                  </div>
                                );
                              }
                              return null; // If no party is found, render nothing
                            })()}
                          </div>
                        </div>
                        <div
                          // style={{ width: "92%" }}
                          className="addProductDetailsBox"
                        >
                          <label htmlFor="invoiceType">
                            <strong>STOCK TYPE</strong>
                          </label>
                          <select
                            id="invoiceType"
                            required="required"
                            value={stockType}
                            onChange={(e) => setStockType(e.target.value)}
                          >
                            <option value="Labelled">Labelled</option>
                            <option value="Unlabelled">Unlabelled</option>
                          </select>
                          <p>Unlabelled Diamond :</p>
                          <div>
                            {(() => {
                              const selectedParty = partyData.find(
                                (x) => x.Id === parseInt(partyTypeId)
                              );
                              if (selectedParty) {
                                return (
                                  <div
                                    className="addProductSupplierDetailsBox"
                                    key={selectedParty.Id}
                                  >
                                    {" "}
                                    {/* It's good practice to include a key even if it's not strictly necessary here */}
                                    <p>{selectedParty.VendorName}</p>
                                  </div>
                                );
                              }
                              return null; // If no party is found, render nothing
                            })()}
                          </div>
                        </div>
                        <div
                          style={
                            {
                              // width: "92%",
                              // marginBottom: "20px",
                            }
                          }
                          className="addProductDetailsBox"
                        >
                          <label htmlFor="selectBranch">
                            <strong>SELECT BRANCH</strong>
                          </label>
                          <select
                            id="selectBranch"
                            required="required"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                          >
                            <option value="Home">Home</option>
                            <option value="Branch 2">Branch 2</option>
                          </select>

                          <p>Unlabelled Other :</p>
                          <div>
                            {(() => {
                              const selectedParty = partyData.find(
                                (x) => x.Id === parseInt(partyTypeId)
                              );
                              if (selectedParty) {
                                return (
                                  <div
                                    className="addProductSupplierDetailsBox"
                                    key={selectedParty.Id}
                                  >
                                    {" "}
                                    {/* It's good practice to include a key even if it's not strictly necessary here */}
                                    <p>{selectedParty.VendorName}</p>
                                  </div>
                                );
                              }
                              return null; // If no party is found, render nothing
                            })()}
                          </div>
                        </div>
                        <div
                          style={
                            {
                              // width: "92%",
                              // marginBottom: "20px",
                            }
                          }
                          className="addProductDetailsBox"
                        >
                          <label htmlFor="selectBranch">
                            <strong>SELECT LOT NUMBER</strong>
                          </label>
                          <select
                            id="selectBranch"
                            // required="required"
                            value={lotNumber}
                            onChange={(e) => setLotNumber(e.target.value)}
                          >
                            <option value={0}>Select Lot Number</option>
                            {allFilteredPurchaseItems.map((x) => {
                              return (
                                <option value={x.LotNumber}>
                                  {x.LotNumber}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div
                          style={
                            {
                              // width: "92%",
                              // marginBottom: "20px",
                            }
                          }
                          className="addProductDetailsBox"
                        >
                          <label htmlFor="selectBranch">
                            <strong>SELECT PACKET NUMBER</strong>
                          </label>
                          <select
                            id="selectBranch"
                            // required="required"
                            value={packetNumber}
                            onChange={(e) => setPacketNumber(e.target.value)}
                          >
                            <option value={0}>Select Packet Number</option>
                            {allPacketNumbers.map((x) => {
                              return (
                                <option value={x.PacketNumber}>
                                  {x.PacketNumber}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <h4
                        style={{ width: "95%", marginTop: "30px" }}
                        id="adminInvoiceAddedCustomerEdit"
                        className="adminInvoiceAddTitles"
                      >
                        Add Items
                      </h4>
                      {/* <div
                        style={{
                          display: "flex",
                          cursor: "pointer",
                          width: "100%",
                          justifyContent: "flex-end",
                        }}
                        className="adminAddBulkStockShowEditButton"
                        onClick={() => showAllInputs()}
                      >
                        <AiOutlineEdit size={"20px"} />
                      </div> */}
                      <div
                        // className="bulkStockAddProductDetailsBox bulkStockAddProductDetailsBoxHalfHeight"
                        className="bulkStockAddProductDetailsBox"
                        id="bulkStockAddProductDetailsBox"
                      >
                        <div className="bulkStockAddProductDetailsItem">
                          <label style={{ margin: 0 }}>Category</label>
                          <select
                            id="category"
                            required="required"
                            value={category}
                            onChange={(e) => {
                              if (
                                categoriesData &&
                                categoriesData
                                  .filter((x) => x.Id == e.target.value)[0]
                                  ?.CategoryName.toLowerCase() !== "diamonds"
                              ) {
                                setCategory(e.target.value),
                                  setBaseMetal(e.target.value);
                              } else if (
                                categoriesData &&
                                categoriesData
                                  .filter((x) => x.Id == e.target.value)[0]
                                  ?.CategoryName.toLowerCase() !==
                                  "loose diamonds"
                              ) {
                                setCategory(e.target.value),
                                  setBaseMetal(0),
                                  setProductType(0),
                                  setCollection(0),
                                  setPurity(0),
                                  setBoxId(0),
                                  setDiamondSize(""),
                                  setDiamondWeight("0"),
                                  setDiamondPurchaseRate("0"),
                                  setDiamondSellRate("0"),
                                  setDiamondClarity(""),
                                  setDiamondColour(""),
                                  setDiamondShape(""),
                                  setDiamondCut(""),
                                  setDiamondSettingType(""),
                                  setDiamondCertificate(""),
                                  setDiamondPieces("0"),
                                  setDiamondPurchaseAmount("0"),
                                  setDiamondSellAmount("0"),
                                  setDiamondDescription(""),
                                  setStockType("Unlabelled");
                              } else {
                                setCategory(e.target.value), setBaseMetal(1);
                              }
                            }}
                          >
                            <option value="">Category</option>
                            {categoriesData.map((x, y) => {
                              return (
                                <option key={y} value={x.Id}>
                                  {x.CategoryName}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        {categoryName &&
                        categoryName.toLowerCase() == "loose diamonds" ? (
                          <>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Diamond.Size</label>
                              <input
                                required="required"
                                type="text"
                                value={diamondSize}
                                onChange={(e) => {
                                  // setDiamondSize(e.target.value);
                                  const selectedDiamondSizeWeightRate =
                                    allDiamondSizeWeightRate.filter(
                                      (x) => x.DiamondSize == e.target.value
                                    );
                                  if (
                                    e.target.value !== "" &&
                                    selectedDiamondSizeWeightRate.length > 0
                                  ) {
                                    setDiamondSize(e.target.value),
                                      setDiamondWeight(
                                        parseFloat(
                                          parseFloat(
                                            selectedDiamondSizeWeightRate[0]
                                              ?.DiamondWeight
                                          ) * parseInt(diamondPieces)
                                        ).toFixed(3)
                                      ),
                                      setDiamondSellRate(
                                        parseFloat(
                                          parseFloat(
                                            selectedDiamondSizeWeightRate[0]
                                              ?.DiamondSellRate
                                          )
                                        ).toFixed(2)
                                      );
                                    setDiamondSellAmount(
                                      parseFloat(
                                        parseFloat(
                                          selectedDiamondSizeWeightRate[0]
                                            ?.DiamondSellRate
                                        ) * parseInt(diamondPieces)
                                      ).toFixed(2)
                                    ),
                                      setDiamondPurchaseRate(
                                        parseFloat(
                                          parseFloat(
                                            selectedDiamondSizeWeightRate[0]
                                              ?.DiamondPurchaseRate
                                          )
                                        ).toFixed(2)
                                      ),
                                      setDiamondPurchaseAmount(
                                        parseFloat(
                                          parseFloat(
                                            selectedDiamondSizeWeightRate[0]
                                              ?.DiamondPurchaseAmount
                                          ) * parseInt(diamondPieces)
                                        ).toFixed(2)
                                      );
                                    // setDiamondPieces(1);
                                  } else {
                                    setDiamondSize(e.target.value);
                                    setDiamondWeight("0");
                                    setDiamondSellRate("0");
                                    setDiamondSellAmount("0");
                                    setDiamondPurchaseRate("0");
                                    setDiamondPurchaseAmount("0");
                                    // setDiamondPieces(0);
                                  }
                                }}
                                list="diamondSizeList"
                              />
                              <datalist id="diamondSizeList">
                                {allDiamondSizeWeightRate.map((x, index) => (
                                  <option key={index}>{x.DiamondSize}</option>
                                ))}
                              </datalist>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>D.Weight</label>
                              <input
                                required="required"
                                type="text"
                                value={diamondWeight}
                                onChange={(e) => {
                                  setDiamondWeight(e.target.value);
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>D.Sell Rate</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondSellRate}
                                onChange={(e) => {
                                  setDiamondSellRate(e.target.value),
                                    setDiamondSellAmount(
                                      parseFloat(
                                        parseFloat(e.target.value) *
                                          parseInt(diamondPieces)
                                      ).toFixed(2)
                                    );
                                }}

                                // readOnly
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>D.Clarity</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondClarity}
                                onChange={(e) => {
                                  setDiamondClarity(e.target.value);
                                }}
                                list="diamondAttributesClarityList"
                              />
                              <datalist id="diamondAttributesClarityList">
                                {allDiamondAttributes
                                  .filter(
                                    (x) =>
                                      x.DiamondAttribute == "DiamondClarity"
                                  )
                                  .map((attribute) => (
                                    <option value={attribute.DiamondValue}>
                                      {attribute.DiamondValue}
                                    </option>
                                  ))}
                              </datalist>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>D.Colour</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondColour}
                                onChange={(e) => {
                                  setDiamondColour(e.target.value);
                                }}
                                list="diamondAttributesColourList"
                              />
                              <datalist id="diamondAttributesColourList">
                                {allDiamondAttributes
                                  .filter(
                                    (x) => x.DiamondAttribute == "DiamondColour"
                                  )
                                  .map((attribute) => (
                                    <option value={attribute.DiamondValue}>
                                      {attribute.DiamondValue}
                                    </option>
                                  ))}
                              </datalist>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>D.Shape</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondShape}
                                onChange={(e) => {
                                  setDiamondShape(e.target.value);
                                }}
                                list="diamondAttributesShapeList"
                              />
                              <datalist id="diamondAttributesShapeList">
                                {allDiamondAttributes
                                  .filter(
                                    (x) => x.DiamondAttribute == "DiamondShape"
                                  )
                                  .map((attribute) => (
                                    <option value={attribute.DiamondValue}>
                                      {attribute.DiamondValue}
                                    </option>
                                  ))}
                              </datalist>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>D.Cut</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondCut}
                                onChange={(e) => {
                                  setDiamondCut(e.target.value);
                                }}
                                list="diamondAttributesCutList"
                              />
                              <datalist id="diamondAttributesCutList">
                                {allDiamondAttributes
                                  .filter(
                                    (x) => x.DiamondAttribute == "DiamondCut"
                                  )
                                  .map((attribute) => (
                                    <option value={attribute.DiamondValue}>
                                      {attribute.DiamondValue}
                                    </option>
                                  ))}
                              </datalist>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>D.SettingType</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondSettingType}
                                onChange={(e) => {
                                  setDiamondSettingType(e.target.value);
                                }}
                                list="diamondAttributesSettingTypeList"
                              />
                              <datalist id="diamondAttributesSettingTypeList">
                                {allDiamondAttributes
                                  .filter(
                                    (x) =>
                                      x.DiamondAttribute == "DiamondSettingType"
                                  )
                                  .map((attribute) => (
                                    <option value={attribute.DiamondValue}>
                                      {attribute.DiamondValue}
                                    </option>
                                  ))}
                              </datalist>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>D.Certificate</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondCertificate}
                                onChange={(e) => {
                                  setDiamondCertificate(e.target.value);
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>D.Pieces</label>
                              <input
                                required="required"
                                type="number"
                                value={diamondPieces}
                                onChange={(e) => {
                                  const selectedDiamondSizeWeightRate =
                                    allDiamondSizeWeightRate.filter(
                                      (x) => x.DiamondSize == diamondSize
                                    );
                                  if (e.target.value !== "") {
                                    setDiamondPieces(e.target.value),
                                      setDiamondWeight(
                                        parseFloat(
                                          parseFloat(
                                            diamondWeight !== ""
                                              ? diamondWeight
                                              : 0
                                          ) * parseInt(e.target.value)
                                        ).toFixed(3)
                                      ),
                                      setDiamondSellAmount(
                                        parseFloat(
                                          parseFloat(diamondSellRate) *
                                            parseInt(e.target.value)
                                        ).toFixed(2)
                                      ),
                                      setDiamondPurchaseAmount(
                                        parseFloat(
                                          parseFloat(diamondPurchaseRate) *
                                            parseInt(e.target.value)
                                        ).toFixed(2)
                                      );
                                  } else {
                                    setDiamondPieces(e.target.value),
                                      setDiamondWeight(
                                        parseFloat(
                                          parseFloat(
                                            selectedDiamondSizeWeightRate[0]
                                              ?.DiamondWeight
                                          )
                                        ).toFixed(3)
                                      ),
                                      setDiamondSellRate(
                                        parseFloat(
                                          parseFloat(
                                            selectedDiamondSizeWeightRate[0]
                                              ?.DiamondSellRate
                                          )
                                        ).toFixed(2)
                                      );
                                    setDiamondSellAmount(
                                      parseFloat(
                                        parseFloat(
                                          selectedDiamondSizeWeightRate[0]
                                            ?.DiamondSellRate
                                        ) * parseInt(e.target.value)
                                      ).toFixed(2)
                                    ),
                                      setDiamondPurchaseRate(
                                        parseFloat(
                                          parseFloat(
                                            selectedDiamondSizeWeightRate[0]
                                              ?.DiamondPurchaseRate
                                          )
                                        ).toFixed(2)
                                      ),
                                      setDiamondPurchaseAmount(
                                        parseFloat(
                                          parseFloat(
                                            selectedDiamondSizeWeightRate[0]
                                              ?.DiamondPurchaseAmount
                                          ) * parseInt(e.target.value)
                                        ).toFixed(2)
                                      );
                                  }
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>D.SellAmount</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondSellAmount}
                                onChange={(e) => {
                                  setDiamondSellAmount(e.target.value);
                                  setDiamondSellRate(
                                    parseFloat(
                                      parseFloat(e.target.value) /
                                        parseInt(diamondPieces)
                                    ).toFixed(2)
                                  );
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>D.Description</label>
                              <input
                                // required="required"
                                type="text"
                                value={diamondDescription}
                                onChange={(e) => {
                                  setDiamondDescription(e.target.value);
                                }}
                              />
                            </div>
                            {addedProducts.length <= 0 ? (
                              <div
                                style={{
                                  justifyContent: "left",
                                  marginTop: "20px",
                                }}
                                className="bulkStockAddProductDetailsItem"
                              >
                                {/* <label>Add Product</label> */}
                                <button
                                  type="submit"
                                  style={{
                                    width: "100px",
                                    marginRight: "10px",
                                  }}
                                >
                                  <IoIosAddCircleOutline
                                    style={{ marginRight: "10px" }}
                                    size={"20px"}
                                  />
                                  Add
                                </button>

                                <button
                                  id="bulkStockAddProductImportButton"
                                  type="button"
                                  onClick={() =>
                                    setShowImportPopup(!showImportPopup)
                                  }
                                  style={{ width: "100px", marginInline: "0" }}
                                >
                                  <CiImport
                                    style={{ marginRight: "10px" }}
                                    size={"20px"}
                                  />
                                  Import
                                </button>
                                {/* </div> */}
                              </div>
                            ) : null}
                          </>
                        ) : (
                          <>
                            {category &&
                            categoryName.toLowerCase() == "diamonds" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0 }}>Metal</label>
                                <select
                                  id="baseMetal"
                                  required="required"
                                  value={baseMetal}
                                  onChange={(e) => setBaseMetal(e.target.value)}
                                >
                                  <option value="">Select Base Metal</option>
                                  {categoriesData.map((x, y) => {
                                    return (
                                      <option key={y} value={x.Id}>
                                        {x.CategoryName}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            ) : null}
                            <div className="bulkStockAddProductDetailsItem">
                              <label
                                htmlFor="productTypeId"
                                style={{ margin: 0 }}
                              >
                                Product
                              </label>

                              <select
                                id="productTypeId"
                                required="required"
                                value={productType}
                                onChange={(e) => setProductType(e.target.value)}
                              >
                                <option value="">Product Type</option>
                                {filteredProducts.map((x, y) => {
                                  return (
                                    <option key={y} value={parseInt(x.Id)}>
                                      {x.ProductName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Design</label>
                              <select
                                id="collection"
                                required="required"
                                value={collection}
                                onChange={(e) => setCollection(e.target.value)}
                              >
                                <option value="">Design</option>
                                {filteredCollection.map((x, y) => {
                                  return (
                                    <option key={y} value={parseInt(x.Id)}>
                                      {x.DesignName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Purity</label>
                              <select
                                id="purity"
                                required="required"
                                value={purity}
                                onChange={(e) => setPurity(e.target.value)}
                              >
                                <option value="">Purity</option>
                                {filteredPurity.map((x, y) => {
                                  return (
                                    <option key={y} value={parseInt(x.Id)}>
                                      {x.PurityName}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label htmlFor="boxId" style={{ margin: 0 }}>
                                  Box
                                </label>
                                <select
                                  id="boxId"
                                  // required="required"
                                  value={boxId}
                                  onChange={(e) => setBoxId(e.target.value)}
                                >
                                  <option value="">Box</option>
                                  {filteredBoxes.map((x, y) => {
                                    return (
                                      <option key={y} value={parseInt(x.Id)}>
                                        {x.BoxName}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            ) : null}

                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Quantity</label>
                              <input
                                required="required"
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                  setQuantity(e.target.value);
                                }}
                              />
                            </div>
                            {/* <div className="bulkStockAddProductDetailsItem">
                            <label style={{ margin: 0 }}>P Name</label>
                            <input
                              type="text"
                              required="required"
                              value={productName}
                              onChange={(e) => {
                                setProductName(e.target.value);
                              }}
                            />
                          </div> */}

                            <div className="bulkStockAddProductDetailsItem">
                              <label htmlFor="grosswt" style={{ margin: 0 }}>
                                G.Wt
                              </label>
                              {/* <select
                      id="category"
                      required="required"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">G.Wt</option>
                    </select> */}
                              <input
                                type="number"
                                id="grosswt"
                                required="required"
                                value={grosswt}
                                onChange={(e) => {
                                  setGrosswt(e.target.value),
                                    e.target.value - parseFloat(stoneWeight) > 0
                                      ? setNetWt(
                                          parseFloat(e.target.value) -
                                            parseFloat(clipWeight) -
                                            parseFloat(stoneWeight)
                                        )
                                      : (setNetWt(0),
                                        setStoneWeight(0),
                                        setClipWeight(0),
                                        setSelectedSkuStones({ Id: 0 }));
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label style={{ margin: 0 }}>Select Stone</label>
                              <select
                                // required="required"
                                value={
                                  selectedSkuStones ? selectedSkuStones.Id : ""
                                }
                                onChange={handleSelectedSkuStoneChange}
                              >
                                {/* Default option with an empty value */}
                                <option value="">Select An Stone</option>
                                {allSelectedSkuStones.map((stone, index) => (
                                  <option key={index} value={stone.Id}>
                                    {stone.StoneMainName}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label
                                htmlFor="stoneWeight"
                                style={{ margin: 0 }}
                              >
                                Clip.Wt
                              </label>

                              <input
                                type="number"
                                id="clipWeight"
                                value={clipWeight}
                                onChange={(e) => {
                                  // e.target.value <= parseFloat(grosswt)
                                  // ?
                                  setClipWeight(e.target.value),
                                    setNetWt(
                                      (
                                        parseFloat(grosswt) -
                                        parseFloat(stoneWeight) -
                                        parseFloat(e.target.value)
                                      ).toFixed(3)
                                    );
                                  // : null;
                                  // setGrosswt(
                                  //   parseFloat(netWt) + parseFloat(e.target.value)
                                  // );
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label
                                htmlFor="stoneWeight"
                                style={{ margin: 0 }}
                              >
                                St.Wt
                              </label>

                              <input
                                type="number"
                                id="stoneWeight"
                                value={stoneWeight}
                                onChange={(e) => {
                                  e.target.value <= parseFloat(grosswt)
                                    ? (setStoneWeight(e.target.value),
                                      setNetWt(
                                        (
                                          parseFloat(grosswt) -
                                          parseFloat(clipWeight) -
                                          parseFloat(e.target.value)
                                        ).toFixed(3)
                                      ))
                                    : null;
                                  // setGrosswt(
                                  //   parseFloat(netWt) + parseFloat(e.target.value)
                                  // );
                                }}
                              />
                            </div>
                            <div className="bulkStockAddProductDetailsItem">
                              <label htmlFor="netWt" style={{ margin: 0 }}>
                                Net.Wt
                              </label>
                              {/* <select
                        id="category"
                        required="required"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Net.Wt</option>
                      </select> */}
                              <input
                                type="number"
                                id="netWt"
                                value={netWt}
                                readOnly
                                // onChange={(e) => {
                                //   setNetWt(e.target.value),
                                //     setGrosswt(
                                //       parseFloat(e.target.value) +
                                //         parseFloat(stoneWeight)
                                //     );
                                // }}
                              />
                            </div>
                            {stockType !== "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0 }}>Fine%</label>
                                <input
                                  type="number"
                                  value={finePerc}
                                  onChange={(e) => {
                                    setFinePerc(e.target.value),
                                      setFineWastagePerc(e.target.value);
                                  }}
                                />
                              </div>
                            ) : null}
                            {stockType !== "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0 }}>Wastage%</label>
                                <input
                                  type="number"
                                  value={wastagePerc}
                                  onChange={(e) => {
                                    setWastagePerc(e.target.value),
                                      setFineWastagePerc(
                                        parseFloat(finePerc) +
                                          parseFloat(e.target.value)
                                      );
                                  }}
                                />
                              </div>
                            ) : null}
                            {stockType !== "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0 }}>
                                  Fine+Wastage%
                                </label>
                                <input
                                  type="number"
                                  value={fineWastagePerc}
                                  onChange={(e) => {
                                    setFineWastagePerc(e.target.value);
                                  }}
                                />
                              </div>
                            ) : null}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0 }}>MRP</label>
                                <input
                                  type="number"
                                  value={mrp}
                                  onChange={(e) => {
                                    setMRP(e.target.value);
                                  }}
                                />
                              </div>
                            ) : null}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label htmlFor="name" style={{ margin: 0 }}>
                                  P.Name
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  value={productName}
                                  onChange={(e) =>
                                    setProductName(e.target.value)
                                  }
                                />
                              </div>
                            ) : null}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label
                                  htmlFor="description"
                                  style={{ margin: 0 }}
                                >
                                  P.Description
                                </label>
                                <input
                                  style={{ width: "2fr" }}
                                  type="text"
                                  id="description"
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                />
                              </div>
                            ) : null}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0 }}>Gender</label>
                                <select
                                  value={gender}
                                  onChange={(e) => setGender(e.target.value)}
                                >
                                  <option value="">Select an option</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Unisex">Unisex</option>
                                  <option value="Kids">Kids</option>
                                </select>
                              </div>
                            ) : null}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label htmlFor="name" style={{ margin: 0 }}>
                                  Making-Percentage
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  value={making_Percentage}
                                  onChange={(e) =>
                                    setMaking_Percentage(e.target.value)
                                  }
                                />
                              </div>
                            ) : null}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <button
                                  id="bulkStockAddProductImportButton"
                                  style={{
                                    width: "100px",
                                    marginRight: "20px",
                                  }}
                                  onClick={() => setShowAddStoneBox(true)}
                                  type="button"
                                >
                                  <IoIosAddCircleOutline
                                    style={{ marginRight: "5px" }}
                                    size={"20px"}
                                  />
                                  Stone
                                </button>
                                <button
                                  id="bulkStockAddProductImportButton"
                                  style={{ width: "100px" }}
                                  onClick={() => setShowAddStoneBox(true)}
                                  type="button"
                                >
                                  {" "}
                                  <IoIosAddCircleOutline
                                    style={{ marginRight: "5px" }}
                                    size={"20px"}
                                  />
                                  Diamond
                                </button>

                                {/* <button>Add</button> */}
                              </div>
                            ) : null}
                            {stockType === "Labelled" ? (
                              <div className="bulkStockAddProductDetailsItem">
                                <label style={{ margin: 0, cursor: "pointer" }}>
                                  {/* Images {`${selectedFiles.length}`} */}
                                  <BsImages
                                    className="bulkStockAddProductAddImagesIcon"
                                    style={{ marginInline: "1rem" }}
                                    size={"2.5rem"}
                                  />
                                  <input
                                    id="images"
                                    style={{ display: "none" }}
                                    type="file"
                                    multiple
                                    onChange={handleFileInputChange}
                                  />
                                </label>
                                <label>
                                  {" "}
                                  Images {`${selectedFiles.length}`}
                                </label>
                              </div>
                            ) : null}
                            {addedProducts.length <= 0 ? (
                              <div
                                style={{
                                  justifyContent: "left",
                                }}
                                className="bulkStockAddProductDetailsItem"
                              >
                                {/* <label>Add Product</label> */}
                                <button
                                  type="submit"
                                  style={{
                                    width: "100px",
                                    marginRight: "10px",
                                  }}
                                >
                                  <IoIosAddCircleOutline
                                    style={{ marginRight: "10px" }}
                                    size={"20px"}
                                  />
                                  Add
                                </button>

                                <button
                                  id="bulkStockAddProductImportButton"
                                  type="button"
                                  onClick={() =>
                                    setShowImportPopup(!showImportPopup)
                                  }
                                  style={{ width: "100px", marginInline: "0" }}
                                >
                                  <CiImport
                                    style={{ marginRight: "10px" }}
                                    size={"20px"}
                                  />
                                  Import
                                </button>
                                {/* </div> */}
                              </div>
                            ) : null}
                          </>
                        )}
                      </div>
                    </form>
                    {showImportPopup && (
                      <div className="popup">
                        <div className="popup-inner">
                          <div className="adminAddProductsPopupInnerBox">
                            <input
                              onChange={(e) => setImportFile(e.target.files[0])} // Adjusted to handle file
                              type="file"
                              accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv" // Now accepts CSV files as well
                            />
                            <button
                              id="bulkStockAddProductImportButton"
                              onClick={() =>
                                importFile && importFile instanceof File
                                  ? uploadExcelFile()
                                  : alert("Please Select a file")
                              }
                              className="close-btn"
                            >
                              Import
                            </button>
                            <button
                              onClick={() => setShowImportPopup(false)}
                              className="bulkProductAddDeleteButton close-btn"
                            >
                              Close
                            </button>
                          </div>
                          {/* <p>This is a popup screen!</p> */}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    style={{ height: "50vh", marginBottom: "1rem" }}
                    // className={loadingAdd == true ? "loading" : "none"}
                    className="loading"
                  >
                    <InfinitySpin
                      // className={loadingAdd == true ? "loading" : "none"}
                      className="loading"
                      width="150"
                      color="#4fa94d"
                    />
                  </div>
                )}
                {/* <div>
          <h1>Table Component</h1>
          <table style={{ margin: "3rem" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>P Name</th>
                <th>Gross Wt</th>
                <th>Stone Wt</th>
                <th>Net Wt</th>
              </tr>
            </thead>
             <tbody>{renderTableRows()}</tbody> 
          </table>
        </div> */}
                <div
                  style={{ height: "100px", marginBottom: "1rem" }}
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
                    Added Products
                  </h3>
                  <div className="adminAddBulkStockShowEditButton">
                    <AiOutlineEdit
                      onClick={() => setShowAllFields(!showAllFields)}
                      size={"20px"}
                    />
                  </div>
                </div>
                <div className="adminAddBulkStockAddedProductsOuterBox">
                  {/* <form onSubmit={updatedetailsBox}> */}
                  {showAllFields ? (
                    <div
                      className="bulkProductAddingTableMain"
                      style={{ margin: "1.5rem", overflowX: "auto" }}
                    >
                      <table>
                        {stockType === "Labelled" ? (
                          <thead>
                            <tr style={{ whiteSpace: "nowrap" }}>
                              <th>Product Type</th>
                              <th>Collection</th>
                              <th>Purity</th>
                              <th>Label</th>
                              <th>Barcode Number</th>
                              <th>TID</th>
                              <th>GrossWt</th>
                              <th>ClipWt</th>
                              <th>StoneWt</th>
                              <th>NetWt</th>
                              <th>Size</th>
                              <th>Pieces</th>
                              <th>Description</th>
                              <th>Product name</th>
                              <th>HUID Code</th>
                              <th>Hallmark Amount</th>
                              <th>Stone Amount</th>
                              <th>Making Per Gram</th>
                              <th>Making Percentage</th>
                              <th>Fixed Making</th>
                              <th>Fixed Wastage</th>
                              <th>MRP</th>
                              {/* <th>Hallmark</th> */}
                              <th>Occassion</th>
                              <th>Gender</th>
                              <th>Online Status</th>
                              <th>Delete Product</th>
                            </tr>
                          </thead>
                        ) : (
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
                        )}
                        <tbody>
                          {addedProducts.map((x) => (
                            // <tr key={x.Customer_id}>

                            <tr key={x.Id}>
                              {stockType !== "Labelled" ? (
                                <td>
                                  <input
                                    type="text"
                                    placeholder={
                                      categoriesData.find(
                                        (item) => item.Id == x.CategoryId
                                      ).CategoryName
                                    }
                                    // placeholder={x.CategoryId}
                                    readOnly
                                    // value={x.product_type}
                                    // onChange={(e) => handleInputChange(e, x.id, "Product_type")}
                                  />
                                </td>
                              ) : null}
                              <td>
                                <input
                                  type="text"
                                  placeholder={
                                    x.ProductId
                                      ? productTypeData.find(
                                          (item) => item.Id == x.ProductId
                                        ).ProductName
                                      : ""
                                  }
                                  readOnly
                                  // value={x.product_type}
                                  // onChange={(e) => handleInputChange(e, x.id, "Product_type")}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder={
                                    x.DesignId
                                      ? collectionTypeData.find(
                                          (item) => item.Id == x.DesignId
                                        )?.DesignName
                                      : ""
                                  }
                                  // placeholder={x.collection}
                                  // value={x.collection}
                                  readOnly
                                  // onChange={(e) => handleInputChange(e, x.id, "collection")}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  // placeholder={x.purity}
                                  // value={x.purity}
                                  placeholder={
                                    x.PurityName
                                      ? purityData.find(
                                          (item) => item.Id == x.PurityId
                                        )?.PurityName
                                      : ""
                                  }
                                  readOnly
                                  // onChange={() => {
                                  //   setPurity(x.purity);
                                  // }}
                                />
                              </td>

                              {stockType !== "Labelled" ? (
                                <td>
                                  <input
                                    type="text"
                                    placeholder={x.Quantity}
                                    value={x.Quantity}
                                    onChange={(e) =>
                                      handleInputChange(e, x.Id, "Quantity")
                                    }
                                    // onChange={() => {
                                    //   setPurity(x.purity);
                                    // }}
                                  />
                                </td>
                              ) : null}
                              {stockType === "Labelled" ? (
                                <td>
                                  <input
                                    type="text"
                                    placeholder={x.ItemCode}
                                    value={x.ItemCode}
                                    //   onChange={() => {
                                    //     setItemCode(x.itemCode);
                                    //   }}
                                  />
                                </td>
                              ) : null}
                              {stockType === "Labelled" ? (
                                <td>
                                  <input
                                    id="RFIDCode"
                                    type="text"
                                    placeholder={x.RFIDCode}
                                    onChange={(e) =>
                                      handleInputChange(e, x.Id, "RFIDCode")
                                    }
                                    style={{
                                      color: x.hasError ? "red" : "black",
                                    }}
                                    //     setItemCode(x.itemCode);
                                    //   }}
                                  />
                                </td>
                              ) : null}
                              {stockType === "Labelled" ? (
                                <td>
                                  <input
                                    style={{ cursor: "not-allowed" }}
                                    type="text"
                                    placeholder={x.TIDNumber}
                                    value={x.TIDNumber}
                                    readOnly
                                  />
                                </td>
                              ) : null}

                              {stockType == "Labelled" ? (
                                <td>
                                  <input
                                    type="number"
                                    placeholder={x.GrossWt}
                                    value={x.GrossWt}
                                    onChange={(e) =>
                                      handleInputChange(e, x.Id, "GrossWt")
                                    }
                                  />
                                </td>
                              ) : (
                                <td>
                                  <input
                                    type="number"
                                    placeholder={x.TotalGrossWt}
                                    value={x.TotalGrossWt}
                                    onChange={(e) =>
                                      handleInputChange(e, x.Id, "TotalGrossWt")
                                    }
                                  />
                                </td>
                              )}
                              {stockType == "Labelled" ? (
                                <td>
                                  <input
                                    type="number"
                                    placeholder={x.ClipWeight}
                                    value={x.ClipWeight}
                                    onChange={(e) =>
                                      handleInputChange(e, x.Id, "ClipWeight")
                                    }
                                  />
                                </td>
                              ) : null}
                              <td>
                                <input
                                  type="number"
                                  placeholder={x.TotalStoneWeight}
                                  value={x.TotalStoneWeight}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      x.Id,
                                      "TotalStoneWeight"
                                    )
                                  }
                                />
                              </td>
                              {stockType == "Labelled" ? (
                                <td>
                                  <input
                                    type="number"
                                    placeholder={x.NetWt}
                                    value={x.NetWt}
                                    // onChange={(e) =>
                                    //   handleInputChange(e, x.id, "netWt")
                                    // }
                                    readOnly
                                  />
                                </td>
                              ) : (
                                <td>
                                  <input
                                    type="number"
                                    placeholder={x.TotalNetWt}
                                    value={x.TotalNetWt}
                                    // onChange={(e) =>
                                    //   handleInputChange(e, x.id, "netWt")
                                    // }
                                    readOnly
                                  />
                                </td>
                              )}
                              <td>
                                <input
                                  type="number"
                                  placeholder={x.Size}
                                  value={x.Size}
                                  onChange={(e) =>
                                    handleInputChange(e, x.Id, "Size")
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  value={x.Pieces}
                                  onChange={(e) =>
                                    handleInputChange(e, x.Id, "Pieces")
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder={x.Description}
                                  value={x.Description}
                                  onChange={(e) =>
                                    handleInputChange(e, x.Id, "Description")
                                  }
                                />
                              </td>
                              {stockType === "Labelled" ? (
                                <td>
                                  <input
                                    type="text"
                                    placeholder={x.ProductTitle}
                                    value={x.ProductTitle}
                                    onChange={(e) =>
                                      handleInputChange(e, x.Id, "ProductTitle")
                                    }
                                  />
                                </td>
                              ) : null}
                              {stockType === "Labelled" ? (
                                <td>
                                  <input
                                    type="text"
                                    maxLength={6}
                                    placeholder={x.HUIDCode}
                                    value={x.HUIDCode}
                                    onChange={(e) =>
                                      handleInputChange(e, x.Id, "HUIDCode")
                                    }
                                  />
                                </td>
                              ) : null}
                              {stockType === "Labelled" ? (
                                <td>
                                  <input
                                    type="number"
                                    placeholder={x.HallmarkAmount}
                                    value={x.HallmarkAmount}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        x.Id,
                                        "HallmarkAmount"
                                      )
                                    }
                                  />
                                </td>
                              ) : null}
                              {stockType === "Labelled" ? (
                                <td>
                                  <input
                                    type="number"
                                    placeholder={x.TotalStoneAmount}
                                    value={x.TotalStoneAmount}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        x.Id,
                                        "TotalStoneAmount"
                                      )
                                    }
                                  />
                                </td>
                              ) : null}
                              <td>
                                <input
                                  type="number"
                                  placeholder={x.MakingPerGram}
                                  value={x.MakingPerGram}
                                  onChange={(e) =>
                                    handleInputChange(e, x.Id, "MakingPerGram")
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  placeholder={x.MakingPercentage}
                                  value={x.MakingPercentage}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      x.Id,
                                      "MakingPercentage"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  placeholder={x.MakingFixedAmt}
                                  value={x.MakingFixedAmt}
                                  onChange={(e) =>
                                    handleInputChange(e, x.Id, "MakingFixedAmt")
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  placeholder={x.MakingFixedWastage}
                                  value={x.MakingFixedWastage}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      x.Id,
                                      "MakingFixedWastage"
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

                              {stockType === "Labelled" ? (
                                <td>
                                  <input
                                    type="number"
                                    placeholder={x.MRP}
                                    value={x.MRP}
                                    onChange={(e) =>
                                      handleInputChange(e, x.Id, "MRP")
                                    }
                                  />
                                </td>
                              ) : null}
                              {/* {stockType === "Labelled" ? (
                                <td>
                                  <input
                                    type="text"
                                    placeholder={x.hallmark}
                                    onChange={(e) =>
                                      handleInputChange(e, x.id, "hallmark")
                                    }
                                  />
                                </td>
                              ) : null} */}

                              <td>
                                <input
                                  type="text"
                                  placeholder={x.OccassionName}
                                  value={x.OccassionName}
                                  onChange={(e) =>
                                    handleInputChange(e, x.Id, "OccassionName")
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder={x.Gender}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "Gender")
                                  }
                                />
                              </td>
                              {stockType !== "Labelled" ? (
                                <td>
                                  <input
                                    type="text"
                                    placeholder={x.Status}
                                    value={x.Status}
                                    readOnly
                                  />
                                </td>
                              ) : null}
                              <td>
                                <input
                                  type="text"
                                  placeholder={x.Featured}
                                  onChange={(e) =>
                                    handleInputChange(e, x.Id, "Featured")
                                  }
                                />
                              </td>
                              {stockType === "Labelled" ? (
                                <td>
                                  <input
                                    style={{
                                      width: "25px",
                                      height: "25px",
                                      color: "red",
                                    }}
                                    type="checkbox"
                                    checked={checkedProducts.includes(x.Id)}
                                    onChange={() =>
                                      handleCheckboxChange(x.Id, x.ItemCode)
                                    }
                                  />
                                </td>
                              ) : null}
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
                              {stockType !== "Labelled" ? <th>Metal</th> : null}
                              <th>Collection</th>
                              <th>Purity</th>
                              {stockType === "Labelled" ? <th>Label</th> : null}
                              {/* <th>Barcode Number</th> */}
                              {/* <th>TID</th> */}
                              {/* <th>Product name</th> */}
                              {/* <th>HUID Code</th> */}
                              <th>GrossWt</th>
                              {/* {stockType !== "Labelled" ? ( */}
                              {stockType === "Labelled" ? (
                                <th>ClipWt</th>
                              ) : null}
                              <th>StoneWt</th>
                              {/* ) : null} */}

                              <th>NetWt</th>
                              {/* <th>Stone Amount</th> */}
                              {stockType === "Labelled" ? (
                                <th>Making Per Gram</th>
                              ) : null}
                              {stockType === "Labelled" ? (
                                <th>Making Percentage</th>
                              ) : null}
                              {stockType === "Labelled" ? (
                                <th>Fixed Making</th>
                              ) : null}
                              {/* <th>Fixed Wastage</th> */}
                              {/* <th>Pieces</th> */}
                              {/* <th>Size</th> */}
                              {/* {stockType === "Labelled" ? <th>MRP</th> : null} */}
                              {stockType !== "Labelled" ? (
                                <th>Quantity</th>
                              ) : null}
                              {stockType !== "Labelled" ? (
                                <th>Pieces</th>
                              ) : null}
                              {/* <th>Description</th> */}
                              {/* <th>Occassion</th> */}
                              {/* <th>Gender</th> */}
                              {/* <th>Online Status</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {addedProducts.map((x) => (
                              // <tr key={x.Customer_id}>

                              <tr key={x.Id}>
                                {/* <td>
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
                                <input
                                  type="text"
                                  placeholder={x.product_type}
                                
                                />
                              </td> */}
                                {stockType !== "Labelled" ? (
                                  <td>
                                    <input
                                      type="text"
                                      // placeholder={x.category_Name}
                                      placeholder={
                                        categoriesData.find(
                                          (item) => item.Id == x.CategoryId
                                        ).CategoryName
                                      }
                                      // value={x.category_Name}
                                      readOnly
                                    />
                                  </td>
                                ) : null}
                                <td>
                                  <input
                                    type="text"
                                    // placeholder={x.collection}
                                    // value={x.collection}
                                    placeholder={
                                      x.DesignName
                                        ? collectionTypeData.find(
                                            (item) => item.Id == x.DesignId
                                          ).DesignName
                                        : ""
                                    }
                                    readOnly
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    // placeholder={x.purity}
                                    // value={x.purity}
                                    placeholder={
                                      x.PurityId
                                        ? purityData.find(
                                            (item) => item.Id == x.PurityId
                                          ).PurityName
                                        : ""
                                    }
                                    readOnly
                                  />
                                </td>
                                {stockType === "Labelled" ? (
                                  <td>
                                    <input
                                      type="text"
                                      placeholder={x.ItemCode}
                                      value={x.ItemCode}
                                      readOnly
                                    />
                                  </td>
                                ) : null}
                                {/* <td>
                                <input
                                  id="barcodeNumberInput"
                                  type="text"
                                  placeholder={x.BarcodeNumber}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "barcodeNumber")
                                  }
                                  style={{
                                    color: x.hasError ? "red" : "black",
                                  }}
                                  //     setItemCode(x.itemCode);
                                  //   }}
                                />
                              </td> */}
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
                                {stockType === "Labelled" ? (
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.GrossWt}
                                      value={x.GrossWt}
                                      onChange={(e) =>
                                        handleInputChange(e, x.Id, "GrossWt")
                                      }
                                      // readOnly
                                    />
                                  </td>
                                ) : (
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.TotalGrossWt}
                                      value={x.TotalGrossWt}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          x.Id,
                                          "TotalGrossWt"
                                        )
                                      }
                                      // readOnly
                                    />
                                  </td>
                                )}

                                {stockType == "Labelled" ? (
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.ClipWeight}
                                      value={x.ClipWeight}
                                      onChange={(e) =>
                                        handleInputChange(e, x.Id, "ClipWeight")
                                      }
                                      // readOnly
                                    />
                                  </td>
                                ) : null}
                                {/* {stockType !== "Labelled" ? ( */}
                                <td>
                                  <input
                                    type="number"
                                    placeholder={x.TotalStoneWeight}
                                    value={x.TotalStoneWeight}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        x.Id,
                                        "TotalStoneWeight"
                                      )
                                    }
                                  />
                                </td>
                                {/* ) : null} */}
                                {stockType == "Labelled" ? (
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.NetWt}
                                      value={x.NetWt}
                                      readOnly
                                      // onChange={(e) =>
                                      //   handleInputChange(e, x.id, "netWt")
                                      // }
                                      // readOnly
                                    />
                                  </td>
                                ) : (
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.TotalNetWt}
                                      value={x.TotalNetWt}
                                      readOnly
                                      // onChange={(e) =>
                                      //   handleInputChange(e, x.id, "netWt")
                                      // }
                                      // readOnly
                                    />
                                  </td>
                                )}

                                {/* <td>
                                <input
                                  type="number"
                                  placeholder={x.stoneAmount}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "StoneAmount")
                                  }
                                />
                              </td> */}
                                {stockType === "Labelled" ? (
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.MakingPerGram}
                                      value={x.MakingPerGram}
                                      // readOnly
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          x.Id,
                                          "MakingPerGram"
                                        )
                                      }
                                    />
                                  </td>
                                ) : null}
                                {stockType === "Labelled" ? (
                                  <td>
                                    <input
                                      type="number"
                                      // readOnly
                                      placeholder={x.MakingPercentage}
                                      value={x.MakingPercentage}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          x.Id,
                                          "MakingPercentage"
                                        )
                                      }
                                    />
                                  </td>
                                ) : null}
                                {stockType === "Labelled" ? (
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.MakingFixedAmt}
                                      value={x.MakingFixedAmt}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          x.Id,
                                          "MakingFixedAmt"
                                        )
                                      }
                                      // readOnly
                                    />
                                  </td>
                                ) : null}
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
                                {/* {stockType === "Labelled" ? (
                                  <td>
                                    <input
                                      type="number"
                                      placeholder={x.mrp}
                                      value={x.mrp}
                                      onChange={(e) =>
                                        handleInputChange(e, x.id, "mrp")
                                      }
                                    />
                                  </td>
                                ) : null} */}
                                {stockType !== "Labelled" ? (
                                  <td>
                                    <input
                                      type="number"
                                      value={x.Quantity}
                                      onChange={(e) =>
                                        handleInputChange(e, x.Id, "Quantity")
                                      }
                                    />
                                  </td>
                                ) : null}
                                {stockType !== "Labelled" ? (
                                  <td>
                                    <input
                                      type="number"
                                      value={x.Pieces}
                                      onChange={(e) =>
                                        handleInputChange(e, x.Id, "Pieces")
                                      }
                                    />
                                  </td>
                                ) : null}
                                {/* <td>
                                <input
                                  type="text"
                                  placeholder={x.description}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "description")
                                  }
                                />
                              </td>

                              <td>
                                <input
                                  type="text"
                                  placeholder={x.occasion}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "occasion")
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder={x.gender}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "gender")
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder={x.featured}
                                  onChange={(e) =>
                                    handleInputChange(e, x.id, "Featured")
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
                    </div>
                  )}

                  <div
                    // style={{ marginLeft: "10px" }}
                    style={{ width: "100%" }}
                    className="bulkProductAddingTableMain"
                  >
                    {deleteSelected ? (
                      <button
                        style={{
                          marginLeft: deleteSelected ? "1.5rem" : "0px",
                        }}
                        onClick={() => deleteAllProducts(selectedItems)}
                        className="bulkProductAddDeleteButton"
                      >
                        Delete Selected
                      </button>
                    ) : null}
                    {addedProducts.length > 0 ? (
                      <button
                        style={{
                          marginLeft: !deleteSelected ? "1.5rem" : "0px",
                          cursor: "pointer",
                        }}
                        // onClick={handleEditProducts}>
                        onClick={
                          stockType === "Labelled"
                            ? handleEditProducts
                            : handleEditProductsUnlabelled
                        }
                      >
                        <BiSave size={"12px"} style={{ marginRight: "5px" }} />
                        Save All
                      </button>
                    ) : null}

                    <Link to="/inventory">
                      <button
                        style={{
                          cursor: "pointer",
                          marginLeft:
                            addedProducts.length > 0 ? null : "1.5rem",
                        }}
                      >
                        <BiListUl
                          size={"12px"}
                          style={{
                            marginRight: "5px",
                          }}
                        />
                        Labelled List
                      </button>
                    </Link>
                    <Link to="/unlabelled_list">
                      <button style={{ cursor: "pointer" }}>
                        <BiListUl
                          size={"12px"}
                          style={{ marginRight: "5px" }}
                        />
                        Unlabelled List
                      </button>
                    </Link>
                    {/* <Link to="/admin_invoice">
                      <button style={{ cursor: "pointer" }}>
                        <FaFileInvoiceDollar
                          size={"12px"}
                          style={{ marginRight: "5px" }}
                        />
                        To Invoice
                      </button>
                    </Link> */}
                    {!hasUnsavedChanges && addedProducts.length > 0 ? (
                      <button
                        onClick={() => {
                          setAddedProducts([]);
                          setSelectedSku([]);
                          setSelectedSkuName("");
                          setSelectedFiles([]);
                          setStockType("Labelled");
                          setDeleteAll(false);
                          setGrosswt(0);
                          setStoneWeight(0);
                          setNetWt(0);
                          setClipWeight(0);
                          scrollToCenter("addBulkProductsBoxTop");
                        }}
                      >
                        <AiOutlineFileAdd
                          size={"12px"}
                          style={{ marginRight: "5px" }}
                        />
                        New Item
                      </button>
                    ) : null}
                    {deleteAll &&
                    stockType === "Labelled" &&
                    addedProducts.length > 0 ? (
                      <button
                        onClick={() => deleteAllProducts(allItemCodesArray)}
                        className="bulkProductAddDeleteButton"
                        style={{ backgroundColor: "#c14456" }}
                      >
                        Delete All
                      </button>
                    ) : null}
                  </div>
                  {/* </form> */}
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
