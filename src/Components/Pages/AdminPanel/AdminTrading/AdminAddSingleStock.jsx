import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
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
  a162,
  a163,
  a168,
  a169,
  a170,
  a175,
  a176,
  a177,
  a18,
  a181,
  a182,
  a20,
  a22,
  a28,
  a30,
  a33,
  a35,
  a68,
  a7,
  a71,
  a72,
  a89,
  s1,
} from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import AlertMessage from "../../../Other Functions/AlertMessage";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import { GenerateLabel } from "../../../Other Functions/GenerateLabel";

export default function AdminAddSingleStock() {
  const [active, setActive] = useState("List");
  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");
  const [totalMetalAmount, setTotalMetalAmount] = useState("");
  const [totalLabourAmount, setLabourAmount] = useState("");
  const [totalStoneAmount, setTotalStoneAmount] = useState("");
  const [totalProductAmount, setTotalProductAmount] = useState("");
  const [filesType, setFilesType] = useState(true);
  const [selectedSkuId, setSelectedSkuId] = useState(0);
  const [partyTypeId, setPartyTypeId] = useState("");
  const [category, setCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [collection, setCollection] = useState("");
  const [purity, setPurity] = useState("");
  const [productTypeData, setProductTypeData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [purityData, setPurityData] = useState([]);
  const [partyData, setPartyData] = useState([]);
  const [boxData, setBoxData] = useState([]);
  const [collectionTypeData, setCollectionTypeData] = useState([]);

  const [stockKeepingUnit, setStockKeepingUnit] = useState("");
  const [productRemark, setProductRemark] = useState("");
  const [grosswt, setGrosswt] = useState(0);
  const [netWt, setNetWt] = useState(0);
  const [stoneWeight, setStoneWeight] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("");
  const [description, setDescription] = useState("");
  const [making_per_gram, setMaking_per_gram] = useState(0);
  const [making_Fixed_Amt, setMaking_Fixed_Amt] = useState(0);
  const [making_Percentage, setMaking_Percentage] = useState(0);
  const [making_Fixed_Wastage, setMaking_Fixed_Wastage] = useState(0);
  const [mrp, setMRP] = useState(0);
  const [additionalWeights, setAdditionalWeights] = useState(false);
  const [labourFields, setLabourFields] = useState(false);
  const [grossWithClip, setGrossWithClip] = useState(false);

  const [selectedStoneRate, setSelectedStoneRate] = useState(1);
  const [selectedDiamondRate, setSelectedDiamondRate] = useState(1);
  const [saleType, setSaleType] = useState("MRP");
  const [stonePieces, setStonePieces] = useState(0);
  const [allStones, setAllStones] = useState([]);
  const [oldEntry, setOldEntry] = useState(false);
  const [allStonesList, setAllStonesList] = useState([]);
  const [allDiamonds, setAllDiamonds] = useState([]);
  const [weights, setWeights] = useState([]);
  const [inputWeight, setInputWeight] = useState("");
  const [concatenatedWeights, setConcatenatedWeights] = useState("");
  const [selectedStoneItems, setSelectedStoneItems] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [stoneItemActive, setStoneItemActive] = useState("");
  const [stockType, setStockType] = useState("Labelled");
  const [selectedSku, setSelectedSku] = useState([]);
  const [selectedSkuName, setSelectedSkuName] = useState("");

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  const clientCode = adminLoggedIn.ClientCode;
  const CompanyId = adminLoggedIn.CompanyId;
  const CounterId = adminLoggedIn.CounterId;
  const BranchId = adminLoggedIn.BranchId;
  const EmployeId = adminLoggedIn.EmployeId;
  const employeeCode = adminLoggedIn.EmployeeCode;
  let Entryby_Staff_id = parseInt(adminLoggedIn);

  const [addStoneMain, setAddStoneMain] = useState({
    StoneMainName: "",
    StoneMainWeight: 0,
    StoneMainPieces: 0,
    StoneMainRate: 0,
    StoneMainAmount: 0,
    StoneMainDescription: "",
    SkuId: 0,
    CompanyId: 0,
    CounterId: 0,
    BranchId: 0,
    SKUStoneItem: [],
    ClientCode: clientCode,
    EmployeeCode: "",
    ProductId: 0,
  });
  const [addStone, setAddStone] = useState({
    StoneName: "",
    StoneWeight: 0,
    StonePieces: 0,
    StoneRate: 0,
    StoneAmount: 0,
    Description: "",
    ClientCode: clientCode,
    EmployeeCode: "",
    ProductId: 0,
    SKUStoneItem: [],
  });
  const [addDiamond, setAddDiamond] = useState({
    DiamondName: "",
    DiamondWeight: 0,
    DiamondRate: 0,
    DiamondPieces: 0,
    DiamondClarity: "",
    DiamondColour: "",
    DiamondCut: "",
    DiamondShape: "",
    DiamondSize: 0,
    Certificate: "",
    SettingType: "",
    DiamondAmount: 0,
    DiamondPurchaseAmt: 0,
    Description: "",
    ClientCode: clientCode,
  });

  const [allSku, setAllSku] = useState([]);
  const [newSku, setNewSku] = useState({
    BlackBeads: "",
    BoxId: "0",
    BoxName: "",
    BranchId: 0,
    BranchName: "Home",
    CategoryId: 1,
    ClientCode: clientCode,
    CollectionName: "",
    Colour: "",
    CompanyId: 0,
    CounterId: 0,
    CuttingGrossWt: "",
    CuttingNetWt: "",
    Description: "",
    DesignId: 0,
    Diamonds: [],
    EmployeeId: 0,
    EstimatedDays: "0",
    Featured: "Yes",
    Gender: "",
    GrossWt: "0",
    HSNCode: "",
    HUIDCode: "",
    HallmarkAmount: "0",
    Height: "0",
    Id: 0,
    Images: "",
    MRP: "0",
    MakingFixedAmt: "0",
    MakingFixedWastage: "0",
    MakingPerGram: "0",
    MakingPercentage: "0",
    Margin: "0",
    MetalName: "",
    MetalRate: "0",
    MinQuantity: "0",
    MinWeight: "0",
    NetWt: "0",
    OccassionName: "",
    OfferPrice: "0",
    Pieces: "1",
    ProductId: 0,
    ProductRemark: "",
    PurchaseCost: "",
    PurityId: 0,
    Quantity: "1",
    Ranking: "0",
    Size: "0",
    SketchNo: "",
    Status: "Active",
    StockKeepingUnit: "",
    SKUStoneMain: [],
    TotalDiamondAmount: "0",
    TotalDiamondPieces: "0",
    TotalDiamondWeight: "0",
    TotalStoneAmount: "0",
    TotalStonePieces: "0",
    TotalStoneWeight: "0",
    VendorId: 0,
    WeightCategories: "",
    Width: "0",
    TagWeight: "0",
    FindingWeight: "0",
    LanyardWeight: "0",
    OtherWeight: "0",
    PouchWeight: "0",
    oldEntry: false,
  });
  const formData = {
    ClientCode: clientCode,
  };

  // Add Bulk Stock
  // Add Bulk Stock
  const [productName, setProductName] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [baseMetal, setBaseMetal] = useState("");
  //   const [categoryId, setCategoryId] = useState("");
  const [pieces, setPieces] = useState(1);
  const [huid, setHuid] = useState("");
  const [hallmarkAmount, setHallmarkAmount] = useState("0");
  const [gender, setGender] = useState("");
  const [stoneAmount, setStoneAmount] = useState(0);
  const [featured, setFeatured] = useState("");
  const [productCode, setProductCode] = useState("");
  const [itemType, setItemType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [finePerc, setFinePerc] = useState("0");
  const [wastagePerc, setWastagePerc] = useState("0");
  const [fineWastagePerc, setFineWastagePerc] = useState("0");
  const [parameter, setParameter] = useState("");
  const [formValue, setFormValue] = useState("");
  const [productInEditImages, setProductInEditImages] = useState();
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [showImportPopup, setShowImportPopup] = useState(false);
  const [importFile, setImportFile] = useState([]);
  const [clipWeight, setClipWeight] = useState(0);
  const [tagWeight, setTagWeight] = useState(0);
  const [findingWeight, setFindindWeight] = useState(0);
  const [lanyardWeight, setLanyardWeight] = useState(0);
  const [otherWeight, setOtherWeight] = useState(0);
  const [pouchWeight, setPouchWeight] = useState(0);

  const [loading, setLoading] = useState(false);
  // const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(true);

  const [goldAlert, setGoldAlert] = useState(false);
  const [barCodeAlert, setBarCodeAlert] = useState(false);
  const [importAlert, setImportAlert] = useState(false);
  const [firebaseData, setFirebaseData] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [rifdData, setRifdData] = useState([]);
  const [rfidnumber, setRfidNumber] = useState(null);
  const [tidnumber, setTidNumber] = useState(null);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [selectedItemCodes, setSelectedItemCodes] = useState([]);
  const [allItemCodesArray, setAllItemCodesArray] = useState([]);
  const [deleteAll, setDeleteAll] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);
  const [showAllFields, setShowAllFields] = useState(false);
  const [branch, setBranch] = useState("Home");
  const [lotNumber, setLotNumber] = useState(0);
  const [packetNumber, setPacketNumber] = useState(0);

  // new logic for barcode and tid below
  const [barcodeNumbersArray, setBarcodeNumbersArray] = useState([]);
  const [piecesBox, setPiecesBox] = useState(false);
  const [boxId, setBoxId] = useState(1);
  const [productPiecesEditId, setProductPiecesEditId] = useState(0);
  const [halfInputs, setHalfInputs] = useState(true);
  const [allPurchaseItems, setAllPurchaseItems] = useState([]);
  const [allFilteredPurchaseItems, setAllFilteredPurchaseItems] = useState([]);
  const [allPacketNumbers, setAllPacketNumbers] = useState([]);
  // const [barcodeNumbersArray, setBarcodeNumbersArray] = useState([]);

  const [allSelectedSkuStones, setAllSelectedSkuStones] = useState([]);
  const [selectedSkuStones, setSelectedSkuStones] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [allSelectedSkuDiamonds, setAllSelectedSkuDiamonds] = useState([]);
  const [selectedSkuDiamonds, setSelectedSkuDiamonds] = useState([]);
  const [allLabelledStockData, setAllLabelledStockData] = useState([]);

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

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [allDiamondSizeWeightRate, setAllDiamondSizeWeightRate] = useState([]);
  const [allDiamondAttributes, setAllDiamondAttributes] = useState([]);
  const [newStonesList, setNewStonesList] = useState([]);
  const [newDiamondsList, setNewDiamondsList] = useState([]);
  const [allDiamondsList, setAllDiamondsList] = useState([]);
  const [showAddStoneBox, setShowAddStoneBox] = useState(false);
  const [showAddDiamondBox, setShowAddDiamondBox] = useState(false);
  // const [addedProducts, setAddedProducts] = useState([]);

  // Add Bulk Stock
  // Add Bulk Stock

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const fetchAllSku = async () => {
    try {
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
    fetchAllLabelledStock();
    fetchAllPurchaseItems();
    fetchAllPacketNumbers();
  }, []);

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
  const fetchAllLabelledStock = async () => {
    const formData = { ClientCode: clientCode };
    try {
      const response = await fetch(a181, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      setAllLabelledStockData(data);
      // console.log(data, "AllVendorTounche");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(allSku);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleSaveClick = () => {
    handleSubmit();
    // Save the edited data to your state or send it to an API
    console.log("Edited Data:", editedData);
    setEditingId(null); // Exit editing mode
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setEditedData({ ...editedData, [name]: value });
  };

  const handleNewSkuChange = (e) => {
    const { name, value } = e.target;

    setNewSku((prevState) => {
      // Initialize the updated state from previous state
      let updatedState = { ...prevState, [name]: value };

      // Specific logic for various fields
      if (name === "StockKeepingUnit") {
        updatedState[name] = value.toUpperCase();
      } else if (name === "GrossWt" || name === "TotalStoneWeight") {
        // Calculate net weight
        const grossWt =
          name === "GrossWt"
            ? parseFloat(value)
            : parseFloat(prevState.GrossWt);
        const stoneWeight =
          name === "TotalStoneWeight"
            ? parseFloat(value)
            : parseFloat(prevState.TotalStoneWeight);
        const netWt = grossWt - stoneWeight;
        updatedState = {
          ...updatedState,
          NetWt: netWt.toFixed(3),
          [name]: value,
        };
      } else if (
        [
          "MakingPercentage",
          "MakingPerGram",
          "MakingFixedAmt",
          "MakingFixedWastage",
          "MRP",
        ].includes(name)
      ) {
        updatedState[name] = value !== "" ? value : 0;
      } else if (name === "VendorId") {
        updatedState[name] = parseInt(value, 10);
      }

      // Handle the Pieces change specifically
      if (name === "Pieces") {
        updatedState.SKUStoneMain = prevState.SKUStoneMain.map((stoneMain) => {
          if (stoneMain.SKUStoneItem && stoneMain.SKUStoneItem.length > 0) {
            const newPieces = parseInt(value, 10);
            const formattedName = formatStoneMainNameByPieces(
              stoneMain.SKUStoneItem,
              newPieces
            );
            const newWeight = stoneMain.SKUStoneItem.reduce(
              (total, item) => total + parseFloat(item.StoneWeight || 0),
              // * newPieces
              0
            ).toFixed(3);
            const newAmount = stoneMain.SKUStoneItem.reduce(
              (total, item) => total + parseFloat(item.StoneAmount || 0),
              // * newPieces
              0
            ).toFixed(2);
            return {
              ...stoneMain,
              StoneMainName: formattedName,
              StoneMainWeight: newWeight,
              StoneMainAmount: newAmount,
            };
          }
          return stoneMain;
        });
      }

      return updatedState;
    });
  };

  function formatStoneMainNameByPieces(stoneItems, pieces) {
    const stoneNames = stoneItems.map((item) =>
      item.StoneName.replace("Stone", "").trim()
    );
    const totalStones = stoneNames.length;
    const formattedName = `${
      parseInt(totalStones)

      // * parseInt(pieces)
    } ST ${stoneNames.join(" ")} Stone`;
    return formattedName;
  }

  const handleAddWeight = () => {
    if (inputWeight && !weights.includes(inputWeight)) {
      setWeights([...weights, inputWeight]);
      setInputWeight(""); // Clear input after adding
    }
  };

  const handleConcatenateWeights = () => {
    const concatenated = weights.join(","); // Concatenate with a comma and a space
    setConcatenatedWeights(concatenated);
    setNewSku({
      ...newSku,
      WeightCategories: concatenated,
    });
  };

  const handleRemoveWeight = (index) => {
    const newWeights = weights.filter((_, i) => i !== index);
    setWeights(newWeights);
  };
  useEffect(() => {
    handleConcatenateWeights();
  }, [weights]);
  console.log(editedData, "editedData");
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
      if (
        selectedSku.ClipWeight == 0 ||
        selectedSku.ClipWeight == "0" ||
        selectedSku.ClipWeight == "0.00" ||
        selectedSku.ClipWeight == "0.000"
      ) {
        setClipWeight(selectedSku.ClipWeight);
        setGrossWithClip(false);
      } else {
        setClipWeight(selectedSku.ClipWeight);

        setGrossWithClip(true);
      }
      setAllSelectedSkuStones(selectedSku.SKUStoneMain);

      setAllSelectedSkuDiamonds(selectedSku.Diamonds);
      const allFilteredPurchaseItemsList = allPurchaseItems.filter(
        (x) => x.SKUId === selectedSku.Id
      );
      setAllFilteredPurchaseItems(allFilteredPurchaseItemsList);
      if (selectedSku.SKUStoneMain.length > 0) {
        const selectedSkuStoneMainItem =
          // selectedSku.SKUStoneMain[0].SKUStoneItem;
          selectedSku.SKUStoneMain[0];
        setSelectedSkuStones(selectedSkuStoneMainItem);
        // const totalStoneWeight = setNetWt;
      }
    } else {
      setDeleteAll(true);
      setPartyTypeId("");
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
      setSelectedSkuStones([]);
      setGrossWithClip(false);
    }
  }, [selectedSku]);
  useEffect(() => {
    const allFilteredPurchaseItemsList = allPurchaseItems.filter(
      (x) => x.VendorId === parseInt(partyTypeId)
    );
    setAllFilteredPurchaseItems(allFilteredPurchaseItemsList);
  }, [partyTypeId]);
  const addNewSku = async (e) => {
    e.preventDefault();

    // const formData = new FormData();

    // Append regular fields
    // formData.append("StockKeepingUnit", stockKeepingUnit.toUpperCase());
    // formData.append("Description", description);
    // formData.append("ProductRemark", productRemark);
    // formData.append("ProductType", productTypeName);
    // formData.append("Purity", purityName);
    // formData.append("Colour", color);
    // formData.append("Collection", collectionName);
    // formData.append("CategoryId", parseInt(categoryId)); // Convert to string
    // formData.append("Category", categoryName.toString()); // Convert to string
    // formData.append("Size", size);
    // formData.append("GrossWt", grosswt.toString()); // Convert to string
    // formData.append("NetWt", netWt.toString()); // Convert to string
    // formData.append("TotalStoneWt", stoneWeight.toString()); // Convert to string

    // // Append StoneAmounts, StoneNames, StoneWts

    // // Append other fields
    // formData.append("MakingPercentage", making_Percentage.toString()); // Convert to string
    // formData.append("MakingFixedAmt", making_Fixed_Amt.toString()); // Convert to string
    // formData.append("MakingFixedWastage", making_Fixed_Wastage.toString()); // Convert to string
    // formData.append("MakingPerGram", making_per_gram.toString()); // Convert to string
    // formData.append("MRP", mrp.toString()); // Convert to string
    // formData.append("SaleType", saleType);
    // formData.append("StonePieces", stonePieces.toString()); // Convert to string
    // formData.append("PurityId", parseInt(purityId));
    // formData.append("ProductTypeId", parseInt(productTypeId));
    // formData.append("CollectionId", parseInt(collectionId)); // Convert to string
    // oldEntry ? formData.append("Id", parseInt(selectedSkuId)) : null;
    // // Images
    // filesType
    //   ? selectedFiles.forEach((file) => {
    //       formData.append("Images", file);
    //     })
    //   : formData.append("Images", selectedFiles);

    // // Now you can use this formData object in your fetch request
    // console.log(formData, "formData");
    // for (const entry of formData.entries()) {
    //   console.log(entry);
    // }
    // console.log(JSON.stringify(newSku), "formData");
    try {
      const response = await fetch(!oldEntry ? a168 : a169, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSku),
      });
      const data = await response.json();
      fetchAllSku();
      setActive("List");
      setNewSku({
        BlackBeads: "",
        BoxId: "0",
        BoxName: "",
        BranchId: 0,
        BranchName: "Home",
        CategoryId: 1,
        ClientCode: clientCode,
        CollectionName: "",
        Colour: "",
        CompanyId: 0,
        CounterId: 0,
        CuttingGrossWt: "",
        CuttingNetWt: "",
        Description: "",
        DesignId: 0,
        Diamonds: [],
        EmployeeId: 0,
        EstimatedDays: "0",
        Featured: "Yes",
        Gender: "",
        GrossWt: "0",
        HSNCode: "",
        HUIDCode: "",
        HallmarkAmount: "0",
        Height: "0",
        Id: 0,
        Images: "",
        MRP: "0",
        MakingFixedAmt: "0",
        MakingFixedWastage: "0",
        MakingPerGram: "0",
        MakingPercentage: "0",
        Margin: "0",
        MetalName: "",
        MetalRate: "0",
        MinQuantity: "0",
        MinWeight: "0",
        NetWt: "0",
        OccassionName: "",
        OfferPrice: "0",
        Pieces: "1",
        ProductId: 0,
        ProductRemark: "",
        PurchaseCost: "",
        PurityId: 0,
        Quantity: "1",
        Ranking: "0",
        Size: "0",
        SketchNo: "",
        Status: "Active",
        StockKeepingUnit: "",
        SKUStoneMain: [],
        TotalDiamondAmount: "0",
        TotalDiamondPieces: "0",
        TotalDiamondWeight: "0",
        TotalStoneAmount: "0",
        TotalStonePieces: "0",
        TotalStoneWeight: "0",
        VendorId: 0,
        WeightCategories: "",
        Width: "0",
        TagWeight: "0",
        FindingWeight: "0",
        LanyardWeight: "0",
        OtherWeight: "0",
        PouchWeight: "0",
        oldEntry: false,
      });
      if (data.message) {
        // alert(data.message);
        setMessageType("error");
        setMessageToShow(data.message);
        setShowError(true);
        setActive("AddNew");
      } else {
        setMessageType("success");
        setMessageToShow("SKU Added Successfully");
        setShowError(true);
      }
      resetStateValues();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const resetStateValues = () => {
    setPartyTypeId(0);
    setCategory("");
    setProductType("");
    setCollection("");
    setPurity("");
    // setProductTypeData([]);
    // setCategoriesData([]);
    // setPurityData([]);
    // setPartyData([]);
    // setBoxData([]);
    // setCollectionTypeData([]);

    setStockKeepingUnit("");
    setProductRemark("");
    setGrosswt(0);
    setNetWt(0);
    setStoneWeight(0);
    setSelectedFiles([]);
    setSize("0");
    setDescription("");
    setMaking_per_gram(0);
    setMaking_Fixed_Amt(0);
    setMaking_Percentage(0);
    setMaking_Fixed_Wastage(0);
    setMRP(0);
    setColour("");

    setSaleType("MRP");
    setStonePieces(0);
    // setAllStones([]);
    setFilesType(true);
    setOldEntry(false);
    setSelectedSkuId(0);
  };
  //   Add bulk stock

  useEffect(() => {
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
  useEffect(() => {
    fetch(a146, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setAllStones(data));
  }, []);
  console.log(allStones, "allStones");
  console.log(allStones, "allStones");
  useEffect(() => {
    fetch(a182, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setAllDiamonds(data));
  }, []);

  let categoryId = parseInt(category.split(",")[0]);
  let categoryName = category.split(",")[1];
  let productTypeId = parseInt(productType.split(",")[0]);
  let productTypeName = productType.split(",")[1];
  let collectionId = parseInt(collection.split(",")[0]);
  let collectionName = collection.split(",")[1];
  let purityId = purity !== "" ? parseInt(purity.split(",")[0]) : 0;
  let purityName = purity.split(",")[1];
  let metalName = categoriesData.filter((x) => x.Id === parseInt(baseMetal))[0]
    ?.CategoryName;

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

  const [stones, setStones] = useState([
    { stoneName: "", stoneWeight: "", stoneAmount: "", stonePieces: "" },
  ]);

  //   const updateStone = (index, field, value) => {
  //     const updatedStones = [...stones];
  //     updatedStones[index][field] = value;
  //     setStones(updatedStones);

  //     // Update corresponding state based on the field and index
  //     switch (field) {
  //       case "stoneAmount":
  //         eval(`setStoneAmount${index + 1}`)(value);
  //         break;
  //       case "stoneName":
  //         eval(`setStoneName${index + 1}`)(value);
  //         break;
  //       case "stoneWeight":
  //         eval(`setStoneWt${index + 1}`)(value);
  //         break;
  //       default:
  //         break;
  //     }
  //   };

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

  const updateStone = (index, field, value) => {
    console.log(index, "index");
    console.log(field, "field");
    console.log(value, "value");
    const updatedStones = [...newSku.SKUStoneMain];
    const updatedStone = { ...updatedStones[index], [field]: String(value) };

    // Update stone amount based on the rate from allStones when the field is "StoneName"
    if (field === "StoneName") {
      const selectedStoneFromAllStones = allStones.filter(
        (stone) => stone.StoneName === value
      );

      if (selectedStoneFromAllStones) {
        updatedStone.StoneRate = String(
          selectedStoneFromAllStones.reduce(
            (a, b) => a + parseFloat(b.StoneRate),
            0
          )
        );
        updatedStone.Description = String(
          selectedStoneFromAllStones.Description
        );
        updatedStone.StoneAmount = String(
          selectedStoneFromAllStones.StoneAmount
        );
        updatedStone.StonePieces = String(
          selectedStoneFromAllStones.StonePieces
        );
        updatedStone.StoneWeight = String(
          selectedStoneFromAllStones.StoneWeight
        );

        setSelectedStoneRate(String(selectedStoneFromAllStones.StoneAmount));
      }
    } else {
      updatedStone.StoneRate = "0";
      updatedStone.StoneAmount = "0";
      updatedStone.StonePieces = "0";
      updatedStone.StoneWeight = "0";
    }

    // If the field is "StoneRate" or "StonePieces", update the total amount
    if (field === "StoneRate" || field === "StonePieces") {
      const stonePieces =
        field === "StonePieces" ? value : updatedStone.StonePieces || "0";
      const stoneAmount =
        field === "StoneRate" ? value : updatedStone.StoneRate || "0";
      const totalAmount = Number(stonePieces) * Number(stoneAmount);
      updatedStone.StoneAmount = String(totalAmount.toFixed(2));
    }

    if (field === "StoneWeight") {
      if (value !== "") {
        const updatedGrossWt =
          parseFloat(netWt) + parseFloat(stoneWeight) + parseFloat(value);
        const updatedStoneWeight = parseFloat(stoneWeight) + parseFloat(value);
        setGrosswt(String(updatedGrossWt.toFixed(2)));
        setStoneWeight(String(updatedStoneWeight.toFixed(2)));
      }
    }

    updatedStones[index] = updatedStone;

    setNewSku((previousState) => ({
      ...previousState,
      // TotalStoneWeight: updatedStones
      //   .reduce((a, b) => a + parseFloat(b.StoneWeight), 0)
      //   .toString(),
      // TotalStoneAmount: updatedStones
      //   .reduce((a, b) => a + parseFloat(b.StoneAmount), 0)
      //   .toString(),
      SKUStoneMain: updatedStones.map((stone) => ({
        ...stone,
        StoneRate: String(stone.StoneRate),
        StoneAmount: String(stone.StoneAmount),
        StonePieces: String(stone.StonePieces),
        StoneWeight: stone.StoneWeight
          ? String(stone.StoneWeight)
          : stone.StoneWeight,
      })),
    }));
  };

  const updateDiamond = (index, field, value) => {
    console.log(index, "index");
    console.log(field, "field");
    console.log(value, "value");
    const updatedDiamonds = [...newSku.Diamonds];
    const updatedDiamond = {
      ...updatedDiamonds[index],
      [field]: String(value),
    };

    // Update Diamond amount based on the rate from allDiamonds when the field is "DiamondName"
    if (field === "DiamondName") {
      const selectedDiamondFromAllDiamonds = allDiamonds.find(
        (diamond) => diamond.DiamondName === value
      );
      if (selectedDiamondFromAllDiamonds) {
        updatedDiamond.DiamondRate = String(
          selectedDiamondFromAllDiamonds.DiamondRate
        );
        updatedDiamond.Description = String(
          selectedDiamondFromAllDiamonds.Description
        );

        setSelectedDiamondRate(
          String(selectedDiamondFromAllDiamonds.DiamondAmount)
        );
      }
    }

    // If the field is "DiamondRate" or "DiamondPieces", update the total amount
    if (field === "DiamondRate" || field === "DiamondPieces") {
      const diamondPieces =
        field === "DiamondPieces" ? value : updatedDiamond.DiamondPieces || "0";
      const diamondAmount =
        field === "DiamondRate" ? value : updatedDiamond.DiamondRate || "0";
      const totalAmount = Number(diamondPieces) * Number(diamondAmount);
      updatedDiamond.DiamondAmount = String(totalAmount.toFixed(2));
    }

    if (field === "DiamondWeight") {
      if (value !== "") {
        const updatedGrossWt =
          parseFloat(netWt) + parseFloat(diamondWeight) + parseFloat(value);
        const updatedDiamondWeight =
          parseFloat(diamondWeight) + parseFloat(value);
        setGrosswt(String(updatedGrossWt.toFixed(2)));
        setDiamondWeight(String(updatedDiamondWeight.toFixed(2)));
      }
    }

    updatedDiamonds[index] = updatedDiamond;
    setNewSku((previousState) => ({
      ...previousState,
      Diamonds: updatedDiamonds.map((diamond) => ({
        ...diamond,
        DiamondRate: String(diamond.DiamondRate),
        DiamondAmount: String(diamond.DiamondAmount),
        DiamondPieces: String(diamond.DiamondPieces),
        DiamondWeight: diamond.DiamondWeight
          ? String(diamond.DiamondWeight)
          : "0",
      })),
    }));

    // Update corresponding state based on the field and index
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const validFileCount = Math.min(files.length, 5 - selectedFiles.length);

    // Condition to reset the file selection
    if (!oldEntry || filesType) {
      // If we're not in a reset condition or if filesType is true, append new files respecting the limit
      const newFiles = Array.from(files).slice(0, validFileCount);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    } else {
      // Reset condition met, prepare to replace selectedFiles entirely
      setFilesType(true); // Assuming this is needed to indicate the type/state of file selection
      // Since we're resetting, consider the total limit from scratch
      const newFiles = Array.from(files).slice(0, Math.min(files.length, 5));
      setSelectedFiles(newFiles);
    }
  };

  const handleFileInputChangeRemove = (indexToRemove) => {
    const newSet = selectedFiles.filter(
      (file, index) => index !== indexToRemove
    );
    setSelectedFiles(newSet);
    if (selectedFiles.length == 1) {
      setSelectedFiles([]);
    }
  };

  //   console.log(stoneName1, "stoneName1");
  //   console.log(stoneAmount1, "stoneAmount1");
  //   console.log(stoneName2, "stoneName2");
  //   console.log(stoneAmount2, "stoneAmount2");
  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  }, [showError]);

  useEffect(() => {
    let selectedPurityRate =
      newSku.PurityId !== 0
        ? purityData.filter(
            (x) => parseInt(x.Id) == parseInt(newSku.PurityId)
          )[0].TodaysRate
        : 0;

    let TotalMetAmount = (parseFloat(newSku.NetWt) * selectedPurityRate) / 10;
    setTotalMetalAmount((parseFloat(newSku.NetWt) * selectedPurityRate) / 10);
    console.log(totalMetalAmount, "totalMetalAmount");

    let TotalStoneAmount = newSku.SKUStoneMain.reduce(
      (a, b) => a + parseFloat(b.StoneAmount),
      0
    );
    setTotalStoneAmount(TotalStoneAmount);

    let makingCharge1 =
      (((selectedPurityRate * parseFloat(newSku.NetWt)) / 10) *
        parseFloat(newSku.MakingPercentage)) /
      100;
    let makingCharge2 =
      parseFloat(newSku.NetWt) * parseFloat(newSku.MakingPerGram);
    let makingCharge3 = parseFloat(newSku.MakingFixedAmt);
    let TotalMaking =
      parseFloat(makingCharge1) +
      parseFloat(makingCharge2) +
      parseFloat(makingCharge3);

    setLabourAmount(TotalMaking);
    calculateTotalProductPrice(
      TotalMetAmount,
      TotalStoneAmount,
      TotalMaking,
      mrp
    );
  }, [
    netWt,
    purity,
    grosswt,
    stoneWeight,
    stones,
    making_Percentage,
    making_per_gram,
    making_Fixed_Amt,
    mrp,
    newSku,
  ]);
  const calculateTotalProductPrice = (metal, stone, making, mrp) => {
    setTotalProductAmount(() => {
      // Ensure mrp is used directly if valid, otherwise calculate the sum, defaulting each part to 0 if not a valid number
      return newSku.MRP && !isNaN(newSku.MRP) && parseFloat(newSku.MRP) !== 0
        ? parseFloat(newSku.MRP)
        : (isNaN(metal) ? 0 : parseFloat(metal)) +
            (isNaN(stone) ? 0 : parseFloat(stone)) +
            (isNaN(making) ? 0 : parseFloat(making));
    });
  };

  const resetAllFields = () => {
    setShowError(false);
    setMessageType("");
    setMessageToShow("");
    setTotalMetalAmount("");
    setLabourAmount("");
    setTotalStoneAmount("");
    setTotalProductAmount("");
    setCategory("");
    setRfidNumber(null);
    setTidNumber(null);
    setSelectedSkuStones({ Id: 0 });
    setMaking_Fixed_Amt(0);
    setMaking_Percentage(0);
    setMaking_per_gram(0);
    setMaking_Fixed_Wastage(0);
    setLotNumber(0);
    setPacketNumber(0);
    setGrossWithClip(false);

    setNewSku({
      BlackBeads: "",
      BoxId: "0",
      BoxName: "",
      BranchId: 0,
      BranchName: "Home",
      CategoryId: 1,
      ClientCode: clientCode,
      CollectionName: "",
      Colour: "",
      CompanyId: 0,
      CounterId: 0,
      CuttingGrossWt: "",
      CuttingNetWt: "",
      Description: "",
      DesignId: 0,
      Diamonds: [],
      EmployeeId: 0,
      EstimatedDays: "0",
      Featured: "Yes",
      Gender: "",
      GrossWt: "0",
      HSNCode: "",
      HUIDCode: "",
      HallmarkAmount: "0",
      Height: "0",
      Id: 0,
      Images: "",
      MRP: "0",
      MakingFixedAmt: "0",
      MakingFixedWastage: "0",
      MakingPerGram: "0",
      MakingPercentage: "0",
      Margin: "0",
      MetalName: "",
      MetalRate: "0",
      MinQuantity: "0",
      MinWeight: "0",
      NetWt: "0",
      OccassionName: "",
      OfferPrice: "0",
      Pieces: "1",
      ProductId: 0,
      ProductRemark: "",
      PurchaseCost: "",
      PurityId: 0,
      Quantity: "1",
      Ranking: "0",
      Size: "0",
      SketchNo: "",
      Status: "Active",
      StockKeepingUnit: "",
      SKUStoneMain: [],
      TotalDiamondAmount: "0",
      TotalDiamondPieces: "0",
      TotalDiamondWeight: "0",
      TotalStoneAmount: "0",
      TotalStonePieces: "0",
      TotalStoneWeight: "0",
      VendorId: 0,
      WeightCategories: "",
      Width: "0",
      TagWeight: "0",
      FindingWeight: "0",
      LanyardWeight: "0",
      OtherWeight: "0",
      PouchWeight: "0",
      oldEntry: false,
    });

    // Resetting additional states involved in your form
    setPartyTypeId("");
    setCategory("");
    setProductType("");
    setCollection("");
    setPurity("");

    setStockKeepingUnit("");
    setProductRemark("");
    setGrosswt(0);
    setNetWt(0);
    setStoneWeight(0);
    setSelectedFiles([]);
    setSize("0");
    setDescription("");
    setMaking_per_gram(0);
    setMaking_Fixed_Amt(0);
    setMaking_Percentage(0);
    setMaking_Fixed_Wastage(0);
    setMRP(0);
    setColour("");

    setSaleType("MRP");
    setStonePieces(0);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const handleEditData = (data) => {
    console.log(data, "data");
    console.log(data, "data");
    console.log(data, "data");

    setNewSku({
      ...data,
      oldEntry: true,
      SKUStoneMain: data.SKUStoneMain,
      Diamonds: data.Diamonds ? data.Diamonds : [],
      ClientCode: clientCode,
    });
    setActive("AddNew");
    setStockKeepingUnit(data.StockKeepingUnit);
    setDescription(data.Description);
    setProductRemark(data.ProductRemark);
    setCategory(`${data.CategoryId},${data.category}`);
    categoryName = data.category;
    categoryId = data.categoryId;
    setProductType(`${data.ProductId},${data.productType}`);
    productTypeName = data.productType;
    productTypeId = data.productTypeId;
    setCollection(`${data.DesignId},${data.collection}`);
    collectionName = data.collection;
    collectionId = data.collectionId;
    setPurity(`${data.PurityId},${data.purity}`);
    purityName = data.purity;
    purityId = data.purityId;
    setColour(data.Colour);
    setSize(data.Size);
    setGrosswt(data.GrossWt);
    setStoneWeight(data.TotalStoneWeight);
    setNetWt(data.NetWt);
    setMaking_Percentage(data.MakingPercentage);
    setMaking_per_gram(data.MakingPerGram);
    setMaking_Fixed_Amt(data.MakingFixedAmt);
    setMaking_Fixed_Wastage(data.MakingFixedWastage);
    setStonePieces(data.TotalStonePieces);
    setOldEntry(true);
    setFilesType(false);
    setSelectedFiles(data.Images);
    setSelectedSkuId(data.Id);
    data.WeightCategories && data.WeightCategories !== ""
      ? setWeights(data.WeightCategories.split(","))
      : setWeights([]);
  };

  console.log(newSku, "newSku");
  console.log(newSku, "newSku");

  const deleteStone = (index) => {
    const updatedStones = newSku.SKUStoneMain.filter((_, i) => i !== index);
    setNewSku({ ...newSku, SKUStoneMain: updatedStones });
  };
  const deleteDiamond = (index) => {
    const updatedDiamonds = newSku.Diamonds.filter((_, i) => i !== index);
    setNewSku({ ...newSku, Diamonds: updatedDiamonds });
  };

  // const handleStoneSelectionChange = (
  //   stoneName,
  //   isChecked,
  //   index,
  //   itemIndex
  // ) => {
  //   if (isChecked) {
  //     setSelectedStoneItems((prev) => [...prev, stoneName]);
  //     updateStone(index, "StoneName", stoneName);
  //     handleAddStoneToSKUStoneMain(index, stoneName);
  //   } else {
  //     setSelectedStoneItems((prev) =>
  //       prev.filter((name) => name !== stoneName)
  //     );
  //     handleRemoveStoneFromSKUStoneMain(index, stoneName.Id);
  //     // updateStone(index, "StoneName", stoneName);
  //   }
  // };
  const handleStoneSelectionChange = (stoneItem, isChecked, stoneMainIndex) => {
    setNewSku((previousState) => {
      let newState = { ...previousState };
      let currentStoneItems =
        newState.SKUStoneMain[stoneMainIndex].SKUStoneItem || [];
      let newStoneItem = {
        ...stoneItem,
        StoneMasterId: parseInt(stoneItem.Id),
      };
      if (isChecked) {
        // Add the stone to SKUStoneItem array
        newState.SKUStoneMain[stoneMainIndex].SKUStoneItem = [
          ...currentStoneItems,
          // stoneItem,
          newStoneItem,
        ];
      } else {
        // Remove the stone from SKUStoneItem array
        newState.SKUStoneMain[stoneMainIndex].SKUStoneItem =
          currentStoneItems.filter(
            (item) => item.StoneMasterId !== stoneItem.Id
          );
      }

      // Update StoneMainName with counts
      newState.SKUStoneMain[stoneMainIndex].StoneMainName = formatStoneMainName(
        newState.SKUStoneMain[stoneMainIndex].SKUStoneItem
      );

      // Calculate and update StoneMainWeight
      newState.SKUStoneMain[stoneMainIndex].StoneMainWeight = parseFloat(
        newState.SKUStoneMain[stoneMainIndex].SKUStoneItem.reduce(
          (total, item) => {
            return total + parseFloat(item.StoneWeight || 0);
          },
          0
        )
      )
        // * parseFloat(newSku.Pieces)
        .toFixed(3); // Assuming StoneWeight is a string that needs to be parsed
      newState.SKUStoneMain[stoneMainIndex].StoneMainPieces = parseFloat(
        newState.SKUStoneMain[stoneMainIndex].SKUStoneItem.reduce(
          (total, item) => {
            return total + parseFloat(item.StonePieces || 0);
          },
          0
        )
      ).toFixed(0); // Assuming StoneWeight is a string that needs to be parsed
      newState.SKUStoneMain[stoneMainIndex].StoneMainAmount = parseFloat(
        newState.SKUStoneMain[stoneMainIndex].SKUStoneItem.reduce(
          (total, item) => {
            return total + parseFloat(item.StoneAmount || 0);
          },
          0
        )
      ).toFixed(2); // Assuming StoneWeight is a string that needs to be parsed
      newState.SKUStoneMain[stoneMainIndex].StoneMainDescription =
        newState.SKUStoneMain[stoneMainIndex].SKUStoneItem.map(
          (x) => `${x.StonePieces} ${x.StoneName} pcs`
        ).join(", ");
      return newState;
    });

    // Update selected stone items for UI checkboxes
    if (isChecked) {
      setSelectedStoneItems((prev) => [...prev, stoneItem]);
    } else {
      setSelectedStoneItems((prev) =>
        prev.filter((item) => item.StoneMasterId !== stoneItem.Id)
      );
    }
  };

  const formatStoneMainName = (stoneItems) => {
    // Create an array of stone names, removing 'Stone' if it is part of the name
    const stoneNames = stoneItems.map((item) =>
      item.StoneName.replace("Stone", "").trim()
    );

    // Count the total number of stones selected
    const totalStones = stoneNames.length;
    const totalPieces = stoneItems.reduce(
      (a, b) => a + parseInt(b.StonePieces),
      0
    );
    // Concatenate all stone names and add "Stone" at the end
    const formattedName = `${
      // parseInt(totalStones)
      // *
      parseInt(totalPieces ? totalPieces : 0)
    } ST ${stoneNames.join(" ")} Stone`;

    return formattedName;
  };

  // Initialize or set up SKUStoneMain data
  const initializeSkuStoneMain = (SKUStoneMainData) => {
    return SKUStoneMainData.map((entry) => {
      const formattedStoneName = formatStoneMainName(entry.SKUStoneItem);
      return { ...entry, StoneMainName: formattedStoneName };
    });
  };

  // const handleAddStoneToSKUStoneMain = (stoneMainIndex, newStoneItem) => {
  //   setNewSku((previousState) => {
  //     // Copy the previous state
  //     let newState = { ...previousState };

  //     // Create a new StoneItem array or add to the existing one
  //     if (newState.SKUStoneMain[stoneMainIndex].SKUStoneItem) {
  //       // Add the new stone item to the existing SKUStoneItem array
  //       newState.SKUStoneMain[stoneMainIndex].SKUStoneItem.push(newStoneItem);
  //     } else {
  //       // Initialize the SKUStoneItem array if it doesn't exist
  //       newState.SKUStoneMain[stoneMainIndex].SKUStoneItem = [newStoneItem];
  //     }

  //     return newState;
  //   });
  // };
  // const handleRemoveStoneFromSKUStoneMain = (
  //   stoneMainIndex,
  //   stoneItemIndex
  // ) => {
  //   setNewSku((previousState) => {
  //     // Copy the previous state
  //     let newState = { ...previousState };

  //     // Check if the StoneItem array exists and has items
  //     if (
  //       newState.SKUStoneMain[stoneMainIndex].SKUStoneItem &&
  //       newState.SKUStoneMain[stoneMainIndex].SKUStoneItem.length >
  //         stoneItemIndex
  //     ) {
  //       // Remove the stone item at the given index
  //       newState.SKUStoneMain[stoneMainIndex].SKUStoneItem.splice(
  //         stoneItemIndex,
  //         1
  //       );
  //     }

  //     return newState;
  //   });
  // };

  // const handleRemoveStoneFromSKUStoneMain = (stoneMainIndex, stoneItemId) => {
  //   setNewSku((previousState) => {
  //     let newState = { ...previousState };
  //     let stoneItems = newState.SKUStoneMain[stoneMainIndex].SKUStoneItem;
  //     newState.SKUStoneMain[stoneMainIndex].SKUStoneItem = stoneItems.filter(
  //       (item) => item.Id !== stoneItemId
  //     );
  //     return newState;
  //   });
  // };
  const handleStonePiecesChange = (event, stoneMainIndex, itemIndex) => {
    const pieces = event.target.value;
    console.log(event, "event");
    console.log(stoneMainIndex, "stoneMainIndex");
    console.log(itemIndex, "itemIndex");

    setNewSku((previousState) => {
      let newState = { ...previousState };
      let stoneItems = [...newState.SKUStoneMain[stoneMainIndex].SKUStoneItem];

      // Update the pieces of the specific stone
      if (stoneItems[itemIndex]) {
        stoneItems[itemIndex] = {
          ...stoneItems[itemIndex],
          StonePieces: pieces,
          StoneWeight: (
            parseFloat(
              allStones.find((x) => x.Id == stoneItems[itemIndex].StoneMasterId)
                .StoneWeight
            ) * parseFloat(pieces)
          ).toFixed(3),
          StoneAmount: (
            parseFloat(
              allStones.find((x) => x.Id == stoneItems[itemIndex].StoneMasterId)
                .StoneAmount
            ) * parseFloat(pieces)
          ).toFixed(3),
        };
      }
      console.log(stoneItems, "stone Items");
      console.log(stoneItems, "stone Items");
      newState.SKUStoneMain[stoneMainIndex].SKUStoneItem = stoneItems;
      newState.SKUStoneMain[stoneMainIndex].StoneMainWeight = stoneItems
        .reduce((a, b) => {
          return a + parseFloat(b.StoneWeight || 0);
        }, 0)
        .toFixed(3);
      newState.SKUStoneMain[stoneMainIndex].StoneMainPieces = stoneItems
        .reduce((a, b) => {
          return a + parseFloat(b.StonePieces || 0);
        }, 0)
        .toFixed(0);
      newState.SKUStoneMain[stoneMainIndex].StoneMainAmount = stoneItems
        .reduce((a, b) => {
          return a + parseFloat(b.StoneAmount || 0);
        }, 0)
        .toFixed(0);
      newState.SKUStoneMain[stoneMainIndex].StoneMainDescription = stoneItems
        .map((x) => `${x.StonePieces} ${x.StoneName} pcs`)
        .join(", ");
      newState.SKUStoneMain[stoneMainIndex].StoneMainName =
        formatStoneMainName(stoneItems);
      return newState;
    });
  };

  const handleSelectedSkuStoneChange = (e) => {
    if (e.target.value !== "") {
      const selectedStone = allSelectedSkuStones.find(
        (stone) => stone.Id == e.target.value
      );
      console.log("I am here");
      setSelectedSkuStones(selectedStone.SKUStoneItem);
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
  console.log(selectedSkuStones, "selectedSkuStones");
  console.log(selectedSkuStones, "selectedSkuStones");

  const handleSelectedSkuStonesInputChange = (index, field, value) => {
    const updatedStones = [...selectedSkuStones.SKUStoneItem];
    updatedStones[index][field] = value;
    const totalSkuStoneWeight = updatedStones.reduce(
      (a, b) =>
        a +
        (parseFloat(b.StoneWeightEntered) / 100) *
          parseFloat(b.StoneLessPercent),
      0
    );
    if (field === "StoneWeightEntered") {
      const trimmedValue = value.trim();
      // Calculate the stone weight
      updatedStones[index][field] = trimmedValue;
      let calculatedStoneWeight = parseFloat(
        (parseFloat(trimmedValue) / 100) *
          parseFloat(updatedStones[index].StoneLessPercent)
      ).toFixed(3);

      // Check if the calculated stone weight is NaN and set it to 0 if it is
      if (isNaN(calculatedStoneWeight)) {
        calculatedStoneWeight = "0.000";
      }

      // Log the calculated stone weight
      console.log(calculatedStoneWeight, "calculatedStoneWeight");

      // Update the stone weight and stone amount
      updatedStones[index].StoneWeight = calculatedStoneWeight;
      updatedStones[index].StoneAmount = `${parseFloat(
        parseFloat(calculatedStoneWeight) *
          parseFloat(updatedStones[index].StoneRate)
      ).toFixed(2)}`;
    }
    // if (field == "StoneWeight") {
    //   setNetWt(
    //     parseFloat(
    //       parseFloat(grosswt) -
    //         parseFloat(clipWeight) -
    //         parseFloat(totalSkuStoneWeight)
    //     )
    //   );
    // }
    if (field == "StoneRate") {
      updatedStones[index].StoneAmount = `${
        value * updatedStones[index].StoneWeight
      }`;
    }
    // if (field == "StoneWeight") {
    //   updatedStones[index].StoneAmount = `${
    //     value * updatedStones[index].StoneRate
    //   }`;
    // }
    setSelectedSkuStones({ ...selectedSkuStones, SKUStoneItem: updatedStones });
  };
  useEffect(() => {
    // Check if selectedSkuStones and selectedSkuStones.SKUStoneItem are defined
    if (selectedSkuStones && selectedSkuStones.SKUStoneItem) {
      // Check the structure of selectedSkuStones
      console.log(selectedSkuStones, "selectedSkuStones");
      const filteredSkuStones =
        selectedSkuStones && selectedSkuStones.SKUStoneItem
          ? selectedSkuStones.SKUStoneItem.filter(
              (x) =>
                x.StoneWeightEntered &&
                x.StoneWeightEntered !== 0 &&
                x.StoneWeightEntered !== "" &&
                x.StoneWeightEntered !== "0"
            )
          : [];

      console.log(filteredSkuStones, "filteredSkuStones");
      console.log(filteredSkuStones, "filteredSkuStones");
      // Calculate total stone weight
      const calculatedTotalStoneWeight = filteredSkuStones.reduce(
        (a, b) => a + parseFloat(b.StoneWeight || 0), // Ensure StoneWeight is parsed correctly
        0
      );
      // const calculatedTotalStoneWeight = selectedSkuStones.SKUStoneItem.reduce(
      //   (a, b) => a + parseFloat(b.StoneWeight || 0), // Ensure StoneWeight is parsed correctly
      //   0
      // );

      // Log the calculated total stone weight
      console.log(calculatedTotalStoneWeight, "calculatedTotalStoneWeight");

      // Calculate net weight
      const calculatedNetWt = parseFloat(
        parseFloat(grosswt) -
          parseFloat(clipWeight) -
          parseFloat(calculatedTotalStoneWeight)
      );

      // Log the calculated net weight
      console.log(calculatedNetWt, "calculatedNetWt");

      // Set the net weight state
      setNetWt(calculatedNetWt);
    } else {
      console.log(
        "selectedSkuStones or selectedSkuStones.SKUStoneItem is undefined"
      );
    }
  }, [selectedSkuStones]);

  // Log netWt to see when it updates
  useEffect(() => {
    console.log(netWt, "netWt");
  }, [netWt]);

  const playTimer = () => {
    setTimeout(() => {
      setGoldAlert(false), setBarCodeAlert(false), setImportAlert(false);
    }, 2000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(grosswt).toFixed(3) > 0.0) {
      const filteredSkuStones =
        selectedSkuStones && selectedSkuStones.SKUStoneItem
          ? selectedSkuStones.SKUStoneItem.filter(
              (x) =>
                x.StoneWeightEntered &&
                x.StoneWeightEntered !== 0 &&
                x.StoneWeightEntered !== "" &&
                x.StoneWeightEntered !== "0"
            )
          : [];

      let TotalStoneWeight = filteredSkuStones.reduce(
        (a, b) => a + parseFloat(b.StoneWeight).toFixed(3),
        0
      );
      let TotalStoneAmount = filteredSkuStones.reduce(
        (a, b) => a + parseFloat(b.StoneAmount).toFixed(3),
        0
      );

      setLoading(true);
      let formData = new FormData();

      formData.append("ProductTitle", productName);
      formData.append("CategoryId", categoryId);
      // formData.append("Category_Name", categoryName);
      formData.append("ProductId", parseInt(productTypeId));
      formData.append("DesignId", parseInt(collectionId));
      formData.append("VendorId", parseInt(partyTypeId));
      formData.append("SupplierId", parseInt(partyTypeId));
      // formData.append("Party_Details", partyName);
      // formData.append("purity", purityName);
      formData.append("PurityId", purityId);
      // formData.append("BoxId", parseInt(boxId));
      formData.append("MRP", parseFloat(mrp));
      formData.append("Quantity", 1);
      formData.append("GrossWt", `${parseFloat(grosswt).toFixed(3)}`);
      formData.append("ClipWeight", `${parseFloat(clipWeight).toFixed(3)}`);
      formData.append(
        "TotalStoneWeight",
        `${parseFloat(TotalStoneWeight).toFixed(3)}`
        // `${parseFloat(stoneWeight).toFixed(3)}`
      );
      formData.append(
        "TotalStoneAmount",
        `${parseFloat(TotalStoneAmount).toFixed(2)}`
        // `${parseFloat(stoneAmount).toFixed(2)}`
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
      formData.append(
        "OtherWeight",
        selectedSku ? selectedSku.OtherWeight : "0"
      );
      formData.append("OfferPrice", "0");
      formData.append(
        "PouchWeight",
        selectedSku ? selectedSku.PouchWeight : "0"
      );
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
            const filteredSkuStones =
              selectedSkuStones && selectedSkuStones.SKUStoneItem
                ? selectedSkuStones.SKUStoneItem.filter(
                    (x) =>
                      x.StoneWeightEntered &&
                      x.StoneWeightEntered !== 0 &&
                      x.StoneWeightEntered !== "" &&
                      x.StoneWeightEntered !== "0"
                  )
                : [];
            const updatedProducts = data.map((product) => {
              let SKUStoneItems = selectedSkuStones.SKUStoneItem;
              // Create a new object for each product to avoid mutating the original data directly
              return {
                ...product,
                Stones: [...product.Stones, ...filteredSkuStones], // Add the selected stone object to the Stones array of each product
                // Stones: [...product.Stones, ...SKUStoneItems], // Add the selected stone object to the Stones array of each product
              };
            });
            setAddedProducts(updatedProducts); // Update your state with the new products array
            // setAddedProducts(data); // Just set the data if no stone is selected
            handleEditProducts(updatedProducts);
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
          setGrossWithClip(false);
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
    } else {
      alert("Gross Wt could not be zero");
    }
  };
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
  const handleEditProducts = async (addedProducts) => {
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
          TIDNumber: tidnumber,
          RFIDCode: tidnumber ? rfidnumber : null,
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
          resetAllFields();
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

  console.log(addedProducts, "addedProducts");
  // You now have a File object
  //   Add bulk stock

  const handleRfidNumber = (e) => {
    setRfidNumber(e.target.value);
    const matchingRfid = rifdData.filter(
      (x) => x.BarcodeNumber === e.target.value
    );
    console.log(matchingRfid, "matchingRfid");
    if (matchingRfid.length > 0) {
      setTidNumber(matchingRfid[0].TidValue);
    } else {
      setTidNumber(null);
    }
  };

  console.log(rfidnumber, "rfidnumber");
  console.log(tidnumber, "tidnumber");
  const handleAddProductToList = (e) => {
    e.preventDefault();

    let totalStoneAmount =
      selectedSkuStones && selectedSkuStones.length > 0
        ? selectedSkuStones.reduce(
            (a, b) =>
              a +
              (
                parseFloat(b.StoneAmount) * parseFloat(selectedSku.Pieces)
              ).toFixed(2),
            0
          )
        : 0;

    const totalCollectionItem = allLabelledStockData.filter(
      (x) => x.DesignId == collectionId
    );
    const lastCollectionItem = totalCollectionItem.reduce(
      (max, item) => (item.Id > max.Id ? item : max),
      { Id: 0 }
    );

    let lastCollectionItemId = "ABC1";
    if (totalCollectionItem.length > 0) {
      lastCollectionItemId = lastCollectionItem.ItemCode;
      console.log("First");
    } else {
      const collectionTypeItem = collectionTypeData.filter(
        (x) => x.Id == parseInt(collectionId)
      )[0];
      if (collectionTypeItem) {
        lastCollectionItemId = collectionTypeItem.LabelCode;
        console.log("Second");
      }
    }

    const match = lastCollectionItemId.match(/(\D+)(\d*)$/);

    let prefix = "ABC";
    let number = 0;
    if (match) {
      prefix = match[1]; // Non-numeric part
      number = match[2] ? parseInt(match[2]) : 0; // Numeric part or 0 if empty

      console.log("Prefix:", prefix); // "FTP"
      console.log("Number:", number); // "21"
    }

    console.log(lastCollectionItemId);
    console.log(lastCollectionItem, "lastCollectionItemCode");
    console.log(lastCollectionItem, "lastCollectionItemCode");
    console.log(lastCollectionItem, "lastCollectionItemCode");
    console.log(selectedSku, "selectedSku");
    console.log(Array.isArray(selectedSku), "Is selectedSku an array?");
    console.log(
      selectedSku && selectedSku.length > 0,
      "selectedSku length check"
    );
    console.log(selectedSkuStones, "selectedSkuStones");

    let selectedSkuData =
      Array.isArray(selectedSku) && selectedSku.length > 0
        ? selectedSku[0]
        : selectedSku && typeof selectedSku === "object"
        ? selectedSku
        : {};
    let createdProduct = {
      ProductTitle: productName,
      CategoryId: categoryId,
      ProductId: parseInt(productTypeId),
      DesignId: parseInt(collectionId),
      VendorId: parseInt(partyTypeId),
      SupplierId: parseInt(partyTypeId),
      PurityId: purityId,
      MRP: `${parseFloat(mrp).toFixed(2)}`,
      Quantity: quantity,
      GrossWt: !grossWithClip
        ? `${parseFloat(grosswt).toFixed(3)}`
        : `${parseFloat(parseFloat(grosswt) - parseFloat(clipWeight)).toFixed(
            3
          )}`,
      ClipWeight: `${parseFloat(clipWeight).toFixed(3)}`,
      TotalStoneWeight: `${parseFloat(stoneWeight).toFixed(3)}`,
      TotalStoneAmount: `${parseFloat(stoneAmount).toFixed(2)}`,
      NetWt: `${parseFloat(netWt).toFixed(3)}`,
      ProductCode: productCode,
      MetalName: `${metalName}`,
      MetalId: `${baseMetal}`,
      Pieces: `${parseInt(pieces)}`,
      HUIDCode: huid,
      Size: `${size}`,
      HallmarkAmount: `${hallmarkAmount}`,
      CollectionName: "",
      OccassionName: "",
      Gender: gender,
      Description: description,
      MakingFixedAmt: `${making_Fixed_Amt}`,
      MakingPerGram: `${making_per_gram}`,
      MakingPercentage: making_Percentage !== "" ? `${making_Percentage}` : "0",
      MakingFixedWastage: `${making_Fixed_Wastage}`,
      Featured: featured,
      BranchName: branch,
      SKU: selectedSkuName,
      SKUId: selectedSkuData.Id || 0,
      BlackBeads: "",
      BoxName: "",
      Status: "Active",
      CuttingGrossWt: "0",
      CuttingNetWt: "0",
      HSNCode: "0",
      LotNumber: `${lotNumber}`,
      WarehouseId: packetNumber,
      Margin: "0",
      OfferPrice: "0",
      Colour: selectedSkuData.Colour || "",
      OtherWeight: selectedSkuData.OtherWeight
        ? `${selectedSkuData.OtherWeight}`
        : "0",
      PouchWeight: selectedSkuData.PouchWeight
        ? `${selectedSkuData.PouchWeight}`
        : "0",
      TagWeight: selectedSkuData.TagWeight
        ? `${selectedSkuData.TagWeight}`
        : "0",
      FindingWeight: selectedSkuData.FindingWeight
        ? `${selectedSkuData.FindingWeight}`
        : "0",
      LanyardWeight: selectedSkuData.LanyardWeight
        ? `${selectedSkuData.LanyardWeight}`
        : "0",
      Ranking: "0",
      UpdatedFrom: "Web",
      Width: "0",
      Height: "0",
      ClientCode: clientCode,
      EmployeeCode: employeeCode ? employeeCode : "",
      CompanyId: CompanyId ? CompanyId : 0,
      BranchId: BranchId ? BranchId : 0,
      CounterId: CounterId ? CounterId : 0,
      EstimatedDays: "0",
      MetalRate: "0",
      PurchaseCost: "0",
      Rating: "0",
      TotalDiamondAmount: "0",
      TotalDiamondPieces: "0",
      TotalDiamondWeight: "0",
      TotalStonePieces: "0",
      ClipQuantity: clipWeight !== 0 ? "1" : "0",
      DiamondSize: `${diamondSize}`,
      DiamondWeight: `${diamondWeight}`,
      DiamondPurchaseRate: `${diamondPurchaseRate}`,
      DiamondSellRate: `${diamondSellRate}`,
      DiamondClarity: `${diamondClarity}`,
      DiamondColour: `${diamondColour}`,
      DiamondShape: `${diamondShape}`,
      DiamondCut: `${diamondCut}`,
      DiamondSettingType: `${diamondSettingType}`,
      DiamondCertificate: `${diamondCertificate}`,
      DiamondPieces: `${diamondPieces}`,
      DiamondPurchaseAmount: `${diamondPurchaseAmount}`,
      DiamondSellAmount: `${diamondSellAmount}`,
      DiamondDescription: `${diamondDescription}`,
      DesignName: collectionName,
      PurityName: purityName,
      ProductName: productTypeName,
      TaxPercentage: "3",
      Stones: newStonesList,
      Diamonds: [],
      PacketId: packetNumber !== "" ? parseInt(packetNumber) : 0,
    };

    const productList = Array.from(
      { length: createdProduct.Quantity },
      (_, i) => ({
        ...createdProduct,
        Quantity: "1",
        ItemCode: `${prefix}${number + i + 1}`,
      })
    );

    if (
      selectedSkuStones &&
      selectedSkuStones.Id !== 0 &&
      Object.keys(selectedSkuStones).length > 0
    ) {
      const updatedProducts = productList.map((product) => {
        let SKUStoneItems = selectedSkuStones.SKUStoneItem;
        return {
          ...product,
          Stones: [...product.Stones, ...SKUStoneItems], // Add the selected stone object to the Stones array of each product
        };
      });
      setAddedProducts(updatedProducts); // Update your state with the new products array
    } else {
      setAddedProducts(productList); // Just set the data if no stone is selected
    }

    setLoading(false);

    const allItemCodes = productList.map((product) => ({
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
    // setSelectedSku([]);
    // setSelectedSkuName("");
    setHasUnsavedChanges(true);
    scrollToCenter("adminAddBulkStockAddedTitleStatement");
  };
  console.log(addedProducts, "addedProducts");
  return (
    <div>
      <AdminHeading />
      <div className="adminMainBodyBox">
        {showError ? (
          <AlertMessage message={messageToShow} type={messageType} />
        ) : null}
        <AdminBreadCrump
          title={"Add Single Stock"}
          companyName={"Loyalstring"}
          module={"Trading"}
          page={"Add Single Stock"}
        />
        <div className="adminAddCategoryMainBox">
          <div className="adminAddCategoryInnerBox">
            <div
              style={{ marginTop: "0px" }}
              className="adminCategoryAddCategoryMainBox"
            >
              <form
                onSubmit={
                  stockType === "Labelled"
                    ? // ? handleSubmit
                      handleAddProductToList
                    : handleSubmitUnlabelled
                }
              >
                <div
                  style={{ marginTop: "0px" }}
                  className="adminCategoryAddCategoryInnerBox"
                >
                  <div className="adminSkuAddSkuInnerBox">
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label>
                        Select Stock Type <sup> *</sup>
                      </label>
                      <select
                        name="StockType"
                        required="required"
                        value={stockType}
                        onChange={(e) => setStockType(e.target.value)}
                      >
                        <option value="Labelled">Labelled</option>
                        <option value="Unlabelled">Unlabelled</option>
                      </select>
                    </div>
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label>Select Vendor</label>

                      <select
                        type="number"
                        name="partyTypeId"
                        value={partyTypeId}
                        onChange={(e) => setPartyTypeId(e.target.value)}
                      >
                        <option value={0}>Select Vendor</option>
                        {partyData.map((x) => (
                          <option value={parseInt(x.Id)}>
                            {`${x.VendorName} - ${x.Id}`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label>SKU</label>
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
                    </div>
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label>SELECT LOT NUMBER</label>
                      <select
                        id="selectLot"
                        // required="required"
                        value={lotNumber}
                        onChange={(e) => setLotNumber(e.target.value)}
                      >
                        <option value={0}>Select Lot Number</option>
                        {allFilteredPurchaseItems.map((x) => {
                          return (
                            <option value={x.LotNumber}>{x.LotNumber}</option>
                          );
                        })}
                      </select>
                    </div>
                    <div
                      style={{ gridColumn: "2 span" }}
                      className="adminSkuAddSkuInnerItemsBox"
                    >
                      <label>SELECT PACKET NUMBER</label>
                      <select
                        id="selectPacket"
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

                    <div
                      style={{ gridColumn: "1 span" }}
                      className="adminSkuAddSkuInnerUpperItemsBox"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label style={{ margin: 0, cursor: "pointer" }}>
                          Images{" "}
                          {`${
                            filesType
                              ? selectedFiles.length
                              : selectedFiles.split(",").length
                          }`}
                          <FaImages
                            style={{ margin: "1.2rem", marginInline: "1rem" }}
                            size={"2.5rem"}
                          />
                          <input
                            id="images"
                            style={{ display: "none" }}
                            type="file"
                            onChange={handleFileInputChange}
                            multiple
                          />
                        </label>
                      </div>
                    </div>

                    {/* <div
                        style={{ gridColumn: "span 0.2" }}
                        className="adminSkuAddSkuInnerUpperItemsBox"
                      >
                      
                        <label style={{ margin: 0, cursor: "pointer" }}>
                          Images {`${selectedFiles.length}`}
                          <FaImages
                            style={{ margin: "1.2rem", marginInline: "1rem" }}
                            size={"2.5rem"}
                          />
                          <input
                            id="images"
                            style={{ display: "none" }}
                            type="file"
                            onChange={handleFileInputChange}
                            multiple
                          />
                        </label>
                      
                      </div> */}
                    <div
                      style={{ gridColumn: "span 2", overflowX: "auto" }}
                      className="adminSkuAddSkuInnerUpperItemsBox"
                    >
                      <div className="adminSkuAddSkuInnerItemsImagesBox">
                        {filesType && selectedFiles.length > 0
                          ? selectedFiles.map((file, index) => (
                              <div className="adminSkuAddSkuInnerItemsImagesInnerBox">
                                <img
                                  key={index}
                                  src={URL.createObjectURL(file)}
                                  alt={`Selected Image ${index + 1}`}
                                  style={{
                                    maxWidth: "50px",
                                    maxHeight: "50px",
                                    margin: "5px",
                                  }}
                                />
                                <div
                                  onClick={() =>
                                    handleFileInputChangeRemove(index)
                                  }
                                  className="adminSkuAddSkuInnerItemsImagesBoxCancel"
                                >
                                  <RxCross2 strokeWidth={"2px"} />
                                </div>
                              </div>
                            ))
                          : !filesType && oldEntry && selectedFiles !== ""
                          ? selectedFiles.split(",").map((image, index) => (
                              <div className="adminSkuAddSkuInnerItemsImagesInnerBox">
                                <img
                                  key={index}
                                  style={{
                                    maxWidth: "50px",
                                    maxHeight: "50px",
                                    margin: "5px",
                                  }}
                                  className="adminOrderDetailsItemsproductImage"
                                  src={`${s1}/${image.trim()}`}
                                  alt={`Product Image ${index + 1}`}
                                />
                                {/* <div
                                    onClick={() =>
                                      handleFileInputChangeRemoveExisting(index)
                                    }
                                    className="adminSkuAddSkuInnerItemsImagesBoxCancel"
                                  >
                                    <RxCross2 strokeWidth={"2px"} />
                                  </div> */}
                              </div>
                            ))
                          : null}
                      </div>
                    </div>

                    <div
                      style={{ gridColumn: "span 1" }}
                      className="adminSkuAddSkuInnerUpperItemsBox"
                    >
                      <label>Product Name</label>
                      <textarea
                        type="text"
                        name="ProductRemark"
                        value={productName}
                        onChange={handleNewSkuChange}
                      />
                    </div>
                    <div
                      style={{ gridColumn: "span 2" }}
                      className="adminSkuAddSkuInnerUpperItemsBox"
                    >
                      <label>Description</label>
                      <textarea
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label>
                        Category <sup> *</sup>
                      </label>
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
                              ?.CategoryName.toLowerCase() !== "loose diamonds"
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
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label>
                        Product <sup> *</sup>
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
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label>
                        Design <sup> *</sup>
                      </label>
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
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label>
                        Purity <sup> *</sup>
                      </label>
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
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label>Colour</label>
                      <input
                        type="text"
                        name="Colour"
                        value={colour}
                        onChange={(e) => setColour(e.target.value)}
                      />
                    </div>
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label>Size</label>
                      <input
                        type="text"
                        name="Size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      />
                    </div>
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label htmlFor="grosswt">
                        G.Wt <sup> *</sup>
                      </label>
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
                                setClipWeight(0));
                          // setSelectedSkuStones({ Id: 0 })
                        }}
                      />
                    </div>
                    {/* <div className="adminSkuAddSkuInnerItemsBox">
                      <label htmlFor="stoneWeight">
                        Total St.Wt <sup> *</sup>
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
                    </div> */}
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label htmlFor="netWt">Net.Wt</label>

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
                    <div
                      // style={{ gridColumn: "span 3" }}
                      className="adminSkuAddSkuInnerItemsBox"
                    >
                      <label htmlFor="rfidNumber">Barcode Number</label>

                      <input
                        // style={{ color: tidnumber ? "green" : "red" }}
                        type="text"
                        name="rfidNumber"
                        value={rfidnumber ? rfidnumber : ""}
                        onChange={(e) => handleRfidNumber(e)}
                        list="rfidNumberList"
                      />
                      <datalist id="rfidNumberList">
                        {rifdData.map((rifd, index) => (
                          <option key={index} value={rifd.BarcodeNumber}>
                            {rifd.BarcodeNumber}
                          </option>
                        ))}
                      </datalist>
                    </div>
                    <div
                      // style={{ gridColumn: "span 3" }}
                      className="adminSkuAddSkuInnerItemsBox"
                    >
                      <label htmlFor="tidNumber">Tid</label>

                      <input
                        style={{
                          cursor: "not-allowed",
                          color: tidnumber ? "green" : "red",
                        }}
                        type="text"
                        name="tidNumber"
                        value={tidnumber ? tidnumber : ""}
                        readOnly
                      />
                    </div>
                    <div
                      // style={{ gridColumn: "span 3" }}
                      className="adminSkuAddSkuInnerItemsBox"
                    >
                      <label htmlFor="netWt">Pieces</label>

                      <input
                        type="number"
                        name="pieces"
                        value={pieces}
                        required="required"
                        onChange={(e) => setPieces(e.target.value)}
                        min="1"
                      />
                    </div>
                    <div
                      style={{
                        gridColumn: "span 3",
                      }}
                      className="adminSkuAddSkuInnerItemsBox"
                    >
                      <p
                        style={{ display: "flex", alignItems: "center" }}
                        className="adminSkuAddSkuInnerTitles"
                        onClick={() => setAdditionalWeights(!additionalWeights)}
                      >
                        SELECT STONE
                      </p>
                      {/* <label htmlFor="selectStone"> SELECT STONE</label> */}

                      <select
                        // required="required"
                        value={selectedSkuStones ? selectedSkuStones.Id : ""}
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

                    <div className="addSingleStockStoneMainBox">
                      <div className="addSingleStockStoneMainLabelsBox">
                        <p>Stone Name</p>
                        <p>Stone Pieces</p>
                        <p>Stone Rate</p>
                        <p>Enter Stone Weight</p>
                        <p>Stone Weight</p>
                        <p>Stone Amount</p>
                      </div>
                      {selectedSkuStones?.SKUStoneItem &&
                      selectedSkuStones.SKUStoneItem.length > 0
                        ? selectedSkuStones.SKUStoneItem.map((x, index) => (
                            <div
                              key={index}
                              className="addSingleStockStoneItemBox"
                            >
                              <input
                                type="text"
                                value={x.StoneName}
                                onChange={(e) =>
                                  handleSelectedSkuStonesInputChange(
                                    index,
                                    "StoneName",
                                    e.target.value
                                  )
                                }
                                list="allSeletedStonesList"
                              />
                              <datalist id="allSeletedStonesList">
                                {allStones.map((stone, index) => (
                                  <option key={index} value={stone.StoneName}>
                                    {stone.StoneName}
                                  </option>
                                ))}
                              </datalist>
                              <input
                                type="text"
                                value={x.StonePieces}
                                onChange={(e) =>
                                  handleSelectedSkuStonesInputChange(
                                    index,
                                    "StonePieces",
                                    e.target.value
                                  )
                                }
                              />
                              <input
                                type="text"
                                value={x.StoneRate}
                                onChange={(e) =>
                                  handleSelectedSkuStonesInputChange(
                                    index,
                                    "StoneRate",
                                    e.target.value
                                  )
                                }
                              />
                              <input
                                type="text"
                                value={
                                  x.StoneWeightEntered
                                    ? x.StoneWeightEntered
                                    : ""
                                }
                                onChange={(e) =>
                                  handleSelectedSkuStonesInputChange(
                                    index,
                                    "StoneWeightEntered",
                                    e.target.value
                                  )
                                }
                              />
                              <input
                                type="text"
                                value={x.StoneWeight}
                                // onChange={(e) =>
                                //   handleSelectedSkuStonesInputChange(
                                //     index,
                                //     "StoneWeight",
                                //     e.target.value
                                //   )
                                // }
                                readOnly
                              />

                              <input
                                type="text"
                                value={x.StoneAmount}
                                onChange={(e) =>
                                  handleSelectedSkuStonesInputChange(
                                    index,
                                    "StoneAmount",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          ))
                        : null}
                      {/* <div className="addSingleStockStoneMainLabelsBox">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedSkuStones((prevStones) => ({
                              ...prevStones,
                              SKUStoneItem: [
                                ...prevStones.SKUStoneItem,
                                addStone,
                              ],
                            }))
                          }
                        >
                          Add Stone
                        </button>
                      </div> */}
                    </div>

                    <p
                      style={{ display: "flex", alignItems: "center" }}
                      className="adminSkuAddSkuInnerTitles"
                      onClick={() => setAdditionalWeights(!additionalWeights)}
                    >
                      ADDITIONAL WEIGHTS{" "}
                      {!additionalWeights ? (
                        <IoMdAddCircleOutline
                          style={{ marginInline: "10px", cursor: "pointer" }}
                          size={"20px"}
                        />
                      ) : (
                        <IoMdRemoveCircleOutline
                          style={{ marginInline: "10px", cursor: "pointer" }}
                          size={"20px"}
                        />
                      )}
                    </p>
                    {additionalWeights ? (
                      <>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Tag Weight</label>
                          <input
                            type="number"
                            // min="0"
                            name="TagWeight"
                            value={tagWeight}
                            onChange={(e) => setTagWeight(e.target.value)}
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Finding Weight</label>
                          <input
                            // min="0"
                            type="number"
                            name="FindingWeight"
                            value={findingWeight}
                            onChange={(e) => setFindindWeight(e.target.value)}
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Lanyard Weight</label>
                          <input
                            // min="0"
                            type="number"
                            name="LanyardWeight"
                            value={lanyardWeight}
                            onChange={(e) => setLanyardWeight(e.target.value)}
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Other Weight</label>
                          <input
                            // min="0"
                            type="number"
                            name="OtherWeight"
                            value={otherWeight}
                            onChange={(e) => setOtherWeight(e.target.value)}
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Pouch Weight</label>
                          <input
                            // min="0"
                            type="number"
                            name="PouchWeight"
                            value={pouchWeight}
                            onChange={(e) => setPouchWeight(e.target.value)}
                          />
                        </div>
                      </>
                    ) : null}

                    <p
                      style={{ display: "flex", alignItems: "center" }}
                      className="adminSkuAddSkuInnerTitles"
                      onClick={() => setLabourFields(!labourFields)}
                    >
                      ADD LABOUR{" "}
                      {!labourFields ? (
                        <IoMdAddCircleOutline
                          style={{ marginInline: "10px", cursor: "pointer" }}
                          size={"20px"}
                        />
                      ) : (
                        <IoMdRemoveCircleOutline
                          style={{ marginInline: "10px", cursor: "pointer" }}
                          size={"20px"}
                        />
                      )}
                    </p>
                    {labourFields ? (
                      <>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Making Percentage</label>
                          <input
                            type="number"
                            min="0"
                            name="making_Percentage"
                            value={making_Percentage}
                            onChange={(e) =>
                              setMaking_Percentage(e.target.value)
                            }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Making Per/Gram</label>
                          <input
                            min="0"
                            type="number"
                            name="making_per_gram"
                            value={making_per_gram}
                            onChange={(e) => setMaking_per_gram(e.target.value)}
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Making Fixed Amount</label>
                          <input
                            min="0"
                            type="number"
                            name="making_Fixed_Amt"
                            value={making_Fixed_Amt}
                            onChange={(e) =>
                              setMaking_Fixed_Amt(e.target.value)
                            }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>MRP</label>
                          <input
                            min="0"
                            type="number"
                            name="mrp"
                            value={mrp}
                            onChange={(e) => setMRP(e.target.value)}
                          />
                        </div>
                      </>
                    ) : null}
                  </div>

                  {/* <div
                    style={{ gridColumn: "span 3" }}
                    className="adminSkuAddSkuInnerItemsBox"
                  >
                    <table>
                      <thead>
                        <tr>
                          <td>METAL AMOUNT</td>
                          <td>STONE AMOUNT</td>
                          <td>LABOUR AMOUNT</td>
                          <td>TOTAL AMOUNT</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {totalMetalAmount
                              ? parseFloat(totalMetalAmount).toFixed(0)
                              : 0}
                          </td>
                          <td>
                            {totalStoneAmount
                              ? parseFloat(totalStoneAmount).toFixed(0)
                              : 0}
                          </td>
                          <td>
                            {totalLabourAmount
                              ? parseFloat(totalLabourAmount).toFixed(0)
                              : 0}
                          </td>
                          <td>{totalProductAmount}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div> */}

                  <div
                    style={{ gridColumn: "span 3" }}
                    className="adminSkuAddSkuInnerItemsBox"
                  >
                    <button
                      style={{ width: "200px", marginRight: "20px" }}
                      type="button"
                      onClick={() => handleAddProductToList()}
                    >
                      ADD
                    </button>
                    <button
                      style={{ width: "200px", marginRight: "20px" }}
                      type="submit"
                    >
                      SUBMIT
                    </button>
                    {/* </div> */}
                    {/* <div
                      style={{ gridColumn: "span 1" }}
                      className="adminSkuAddSkuInnerItemsBox"
                    > */}
                    {/* <div
                      style={{ gridColumn: "span 1" }}
                      className="adminSkuAddSkuInnerItemsBox"
                    > */}
                    <button
                      onClick={resetAllFields}
                      style={{ width: "200px" }}
                      type="button"
                    >
                      Reset
                    </button>
                  </div>
                  {/* </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
