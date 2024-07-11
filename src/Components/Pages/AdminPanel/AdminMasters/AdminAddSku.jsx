import React, { useEffect, useRef, useState } from "react";
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
  a163,
  a168,
  a169,
  a18,
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

export default function AdminAddSku() {
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
  const [description, setDescription] = useState("");
  const [making_per_gram, setMaking_per_gram] = useState(0);
  const [making_Fixed_Amt, setMaking_Fixed_Amt] = useState(0);
  const [making_Percentage, setMaking_Percentage] = useState(0);
  const [making_Fixed_Wastage, setMaking_Fixed_Wastage] = useState(0);
  const [mrp, setMRP] = useState(0);
  const [color, setColor] = useState("");
  const [additionalWeights, setAdditionalWeights] = useState(false);

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

  const [selectedVendors, setSelectedVendors] = useState([]);
  const [inputVendors, setInputVendors] = useState("");
  const [concatenatedVendors, setConcatenatedVendors] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);
  const [stoneItemActive, setStoneItemActive] = useState("");

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
    WeightCategories: "0",
    Width: "0",
    TagWeight: "0",
    FindingWeight: "0",
    LanyardWeight: "0",
    OtherWeight: "0",
    PouchWeight: "0",
    ClipWeight: "0",
    oldEntry: false,
  });
  const formData = {
    ClientCode: clientCode,
  };

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

  console.log(allSku);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleSaveClick = () => {
    handleSubmit();
    // Save the edited data to your state or send it to an API
    console.log("Edited Data:", editedData);
    setEditingId(null); // Exit editing mode
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch(a35, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });
      const data = await response.json();
      if (data.message) {
        // alert(data.message);
        setMessageType("error");
        setMessageToShow(data.message);
        setShowError(true);
      } else {
        setMessageType("success");
        setMessageToShow("Updated successfully");
        setShowError(true);
      }
      console.log(data, "updated");
      fetchAllSku();
    } catch (error) {
      console.error(error);
    }
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

  const handleAddVendor = () => {
    if (inputVendors && !selectedVendors.includes(inputVendors)) {
      setSelectedVendors([...selectedVendors, inputVendors]);
      setInputVendors(""); // Clear input after adding
    }
  };

  const handleConcatenateVendors = () => {
    const concatenated = selectedVendors.join(","); // Concatenate with a comma and a space
    setConcatenatedVendors(concatenated);
    setNewSku({
      ...newSku,
      SKUVendorItems: concatenated,
    });
  };

  const handleRemoveVendor = (index) => {
    const newVendors = selectedVendors.filter((_, i) => i !== index);
    setSelectedVendors(newVendors);
  };
  useEffect(() => {
    handleConcatenateVendors();
  }, [selectedVendors]);

  console.log(editedData, "editedData");
  const addNewSku = async (e) => {
    e.preventDefault();
    if (!selectedVendors.length > 0) {
      setMessageType("error");
      setMessageToShow("Please Select Atleast One Vendor");
      setShowError(true);
      scrollToCenter("adminSkuAddSkuSelectVendor");
    } else if (!weights.length > 0) {
      setMessageType("error");
      setMessageToShow("Please Select Atleast One Weight Category");
      setShowError(true);
      scrollToCenter("adminSkuAddSkuSelectWeights");
    } else {
      const selectedVendorsIdsList =
        selectedVendors.length > 0
          ? selectedVendors.map((x) => x.split("- ")[1])
          : [];
      const selectedVendorsList = selectedVendorsIdsList.map((x) => {
        return {
          VendorId: parseInt(x),
          SKUId: newSku.Id || 0,
          ClientCode: clientCode,
          CompanyId: CompanyId || 0,
          BranchId: BranchId || 0,
          EmployeeId: EmployeId || 0,
        };
      });

      console.log(selectedVendorsIdsList, "selectedVendorsIdsList");
      console.log(selectedVendorsList, "selectedVendorsList");
      let formData = {
        ...newSku,
        SKUVendor: selectedVendorsList,
        VendorId: selectedVendorsList[0].VendorId,
      };
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
      console.log(formData, "formData");
      try {
        const response = await fetch(!oldEntry ? a168 : a169, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
          WeightCategories: "0",
          Width: "0",
          TagWeight: "0",
          FindingWeight: "0",
          LanyardWeight: "0",
          OtherWeight: "0",
          PouchWeight: "0",
          ClipWeight: "0",
          oldEntry: false,
        });
        if (data.Message) {
          // alert(data.message);
          setMessageType("error");
          setMessageToShow(data.Message);
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
    setColor("");

    setSaleType("MRP");
    setStonePieces(0);
    // setAllStones([]);
    setFilesType(true);
    setOldEntry(false);
    setSelectedSkuId(0);
  };
  //   Add bulk stock
  const scrollToCenter = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    // console.log("scroll");
  };
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

  const filteredProducts = productTypeData.filter(
    (product) => product.CategoryId == newSku.CategoryId
  );
  const filteredCollection = collectionTypeData.filter(
    (product) => product.ProductId == newSku.ProductId
  );
  const filteredPurity = purityData.filter(
    (product) => product.CategoryId == newSku.CategoryId
  );
  const filteredBoxes = boxData.filter(
    (product) => product.ProductId == newSku.ProductId
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
      WeightCategories: "0",
      Width: "0",
      TagWeight: "0",
      FindingWeight: "0",
      LanyardWeight: "0",
      OtherWeight: "0",
      PouchWeight: "0",
      ClipWeight: "0",
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
    setColor("");

    setSaleType("MRP");
    setStonePieces(0);

    scrollToCenter("addBulkProductsBoxTop");
  };
  const handleEditData = (data) => {
    console.log(data, "data");
    console.log(data, "data");
    console.log(data, "data");
    const VendorId = data.VendorId || 0;
    const defaultVendorName = partyData.filter((x) => x.Id == data.VendorId)[0]
      .VendorName;
    const defaultVendor = `${VendorId} - ${defaultVendorName}`;
    console.log(defaultVendorName, "defaultVendorName");
    console.log(defaultVendorName, "defaultVendorName");
    const selectedVendorsList = data.SKUVendor.map(
      (x) => `${x.VendorName} - ${x.VendorId}`
    );
    console.log(selectedVendorsList, "selectedVendorsList");

    // setSelectedVendors([defaultVendor]);
    setSelectedVendors(selectedVendorsList);
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
    setColor(data.Colour);
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
    data.WeightCategories && data.WeightCategories !== "0"
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

  // You now have a File object
  console.log(inputVendors, "inputVendors");
  console.log(inputVendors, "inputVendors");
  //   Add bulk stock

  return (
    <div>
      <AdminHeading />
      <div className="adminMainBodyBox" id="addBulkProductsBoxTop">
        {showError ? (
          <AlertMessage message={messageToShow} type={messageType} />
        ) : null}
        <AdminBreadCrump
          title={"Add SKU"}
          companyName={"Loyalstring"}
          module={"Masters"}
          page={"SKU"}
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
                <p>All SKU</p>
              </div>

              <div
                onClick={() => setActive("AddNew")}
                className={
                  active === "AddNew"
                    ? "adminAddCategoryInnerBoxTitle"
                    : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                }
              >
                <div
                  className={
                    active === "AddNew"
                      ? "adminAddCategoryInnerBoxTitleLogo"
                      : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                  }
                >
                  {/* 02 */}
                  <RiPlayListAddLine />
                </div>
                <p>Add SKU</p>
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
                    <th>ID</th>
                    <th>SKU</th>
                    <th>Vendor</th>
                    <th>Category</th>
                    <th>Product</th>
                    <th>Design</th>
                    <th>Purity</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {allSku.map((x) => (
                    <tr key={x.id}>
                      <td>
                        {editingId === x.id ? (
                          <button
                            className="adminAddCategorySaveButton"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="adminAddCategoryEditButton"
                            // onClick={() => handleEditClick(x.id)}
                            onClick={() => handleEditData(x)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                      <td>{x.Id}</td>
                      <td>{x.StockKeepingUnit} </td>
                      <td>{x.VendorName} </td>
                      <td>{x.CategoryName}</td>
                      <td>{x.ProductName}</td>
                      <td>{x.DesignName}</td>
                      <td>{x.PurityName}</td>

                      <td>{x.Description}</td>
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
              <p>Add New Sku</p>
              <form onSubmit={addNewSku}>
                <div className="adminCategoryAddCategoryInnerBox">
                  <div className="adminSkuAddSkuInnerBox">
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
                        <label>
                          SKU <sup> *</sup>
                        </label>
                        <input
                          type="text"
                          value={newSku.StockKeepingUnit}
                          // onChange={(e) => {
                          //   setStockKeepingUnit(e.target.value.toUpperCase());
                          // }}
                          required="required"
                          name="StockKeepingUnit"
                          onChange={handleNewSkuChange}
                        />
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
                    {/* <div
                      style={{ gridColumn: "span 1" }}
                      className="adminSkuAddSkuInnerUpperItemsBox"
                    >
                      <label>Select Vendor</label>
                    
                      <select
                        type="number"
                        name="VendorId"
                        value={newSku.VendorId}
                        onChange={handleNewSkuChange}
                      >
                        <option value={0}>Select Vendor</option>
                        {partyData.map((x) => (
                          <option value={parseInt(x.Id)}>
                            {`${x.VendorName} - ${x.Id}`}
                          </option>
                        ))}
                      </select>
                    </div> */}
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label htmlFor="netWt">Select Vendor</label>

                      <select
                        type="number"
                        required="required"
                        // name="VendorId"
                        value={inputVendors}
                        onChange={(e) => setInputVendors(e.target.value)}
                      >
                        <option value={0}>Select Vendor</option>
                        {partyData.map((x) => (
                          // <option value={parseInt(x.Id)}>
                          <option value={`${x.VendorName} - ${x.Id}`}>
                            {`${x.VendorName} - ${x.Id}`}
                          </option>
                        ))}
                      </select>
                      {/* <input
                        type="text"
                        value={inputVendors}
                        onChange={(e) => setInputVendors(e.target.value)}
                        placeholder="Enter weight"
                      /> */}
                      <button
                        style={{ marginBottom: "25px" }}
                        type="button"
                        onClick={handleAddVendor}
                      >
                        Add Vendor
                      </button>

                      {/* <div>
                        <h4>Concatenated Weights:</h4>
                        <p>{concatenatedWeights}</p>{" "}
                      </div> */}
                    </div>

                    <div
                      style={{ gridColumn: "span 2" }}
                      className="adminSkuAddSkuInnerItemsBox"
                      id="adminSkuAddSkuSelectVendor"
                    >
                      <label htmlFor="netWt">
                        Total {selectedVendors.length} Vendors
                      </label>
                      <div
                        style={{
                          display: "flex",
                          overflowX: "auto",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                      >
                        {selectedVendors.map((vendor, index) => (
                          <div
                            key={index}
                            style={{
                              width: "20px",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              backgroundColor: "#f0f0f0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "auto",
                            }}
                          >
                            <span style={{ whiteSpace: "nowrap" }}>
                              {vendor}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveVendor(index)}
                              style={{
                                width: "25px",
                                height: "25px",
                                margin: "0px",
                                padding: "0px",
                                color: "red",
                                border: "none",
                                background: "transparent",
                              }}
                            >
                              &#10005; {/* Unicode cross symbol */}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      style={{ gridColumn: "span 2" }}
                      className="adminSkuAddSkuInnerUpperItemsBox"
                    >
                      <label>Description</label>
                      <textarea
                        type="text"
                        name="Description"
                        value={newSku.Description}
                        onChange={handleNewSkuChange}
                      />
                    </div>
                    <div
                      style={{ gridColumn: "span 1" }}
                      className="adminSkuAddSkuInnerUpperItemsBox"
                    >
                      <label>Product Remark</label>
                      <textarea
                        type="text"
                        name="ProductRemark"
                        value={newSku.ProductRemark}
                        onChange={handleNewSkuChange}
                      />
                    </div>
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label>
                        Category <sup> *</sup>
                      </label>
                      <select
                        name="CategoryId"
                        required="required"
                        value={newSku.CategoryId}
                        onChange={handleNewSkuChange}
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
                        name="ProductId"
                        required="required"
                        value={newSku.ProductId}
                        onChange={handleNewSkuChange}
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
                        name="DesignId"
                        required="required"
                        value={newSku.DesignId}
                        onChange={handleNewSkuChange}
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
                        name="PurityId"
                        required="required"
                        value={newSku.PurityId}
                        onChange={handleNewSkuChange}
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
                        value={newSku.Colour}
                        onChange={handleNewSkuChange}
                      />
                    </div>
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label>Size</label>
                      <input
                        type="text"
                        name="Size"
                        value={newSku.Size}
                        onChange={handleNewSkuChange}
                      />
                    </div>
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label htmlFor="grosswt">
                        G.Wt <sup> *</sup>
                      </label>
                      <input
                        // min="0"
                        type="number"
                        name="GrossWt"
                        value={newSku.GrossWt}
                        onChange={handleNewSkuChange}
                        // onChange={(e) => {
                        //   if (
                        //     e.target.value >= 0 &&
                        //     e.target.value > grosswt - stoneWeight
                        //   ) {
                        //     setGrosswt(e.target.value),
                        //       setNetWt(
                        //         parseFloat(e.target.value) -
                        //           parseFloat(stoneWeight)
                        //       );
                        //   } else if (e.target.value >= 0) {
                        //     setGrosswt(e.target.value);
                        //     setStoneWeight(0);
                        //     setNetWt(e.target.value);
                        //   }
                        // }}
                      />
                    </div>
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label htmlFor="stoneWeight">
                        Total St.Wt <sup> *</sup>
                      </label>

                      <input
                        // min="0"
                        type="number"
                        name="TotalStoneWeight"
                        value={newSku.TotalStoneWeight}
                        onChange={handleNewSkuChange}
                      />
                    </div>
                    <div className="adminSkuAddSkuInnerItemsBox">
                      <label htmlFor="netWt">Net.Wt</label>

                      <input type="number" value={newSku.NetWt} readOnly />
                    </div>
                    <div
                      // style={{ gridColumn: "span 3" }}
                      className="adminSkuAddSkuInnerItemsBox"
                    >
                      <label htmlFor="netWt">Pieces</label>

                      <input
                        type="number"
                        name="Pieces"
                        value={newSku.Pieces}
                        required="required"
                        onChange={handleNewSkuChange}
                        min="1"
                      />
                    </div>
                    <div
                      // style={{ gridColumn: "span 3" }}
                      className="adminSkuAddSkuInnerItemsBox"
                    >
                      <label htmlFor="netWt">Min Weight</label>

                      <input
                        type="number"
                        name="MinWeight"
                        value={newSku.MinWeight}
                        required="required"
                        onChange={handleNewSkuChange}
                      />
                    </div>
                    <div
                      // style={{ gridColumn: "span 3" }}
                      className="adminSkuAddSkuInnerItemsBox"
                    >
                      <label htmlFor="netWt">Min Quantity</label>

                      <input
                        type="number"
                        name="MinQuantity"
                        value={newSku.MinQuantity}
                        required="required"
                        onChange={handleNewSkuChange}
                        min="1"
                      />
                    </div>
                    <div
                      id="adminSkuAddSkuSelectWeights"
                      className="adminSkuAddSkuInnerItemsBox"
                    >
                      <label htmlFor="netWt">Weight Categories</label>
                      <input
                        type="text"
                        value={inputWeight}
                        onChange={(e) => setInputWeight(e.target.value)}
                        placeholder="Enter weight"
                      />
                      <button
                        style={{ marginBottom: "25px" }}
                        type="button"
                        onClick={handleAddWeight}
                      >
                        Add Weight
                      </button>

                      {/* <div>
                        <h4>Concatenated Weights:</h4>
                        <p>{concatenatedWeights}</p>{" "}
                      </div> */}
                    </div>
                    <div
                      style={{ gridColumn: "span 2" }}
                      className="adminSkuAddSkuInnerItemsBox"
                    >
                      <label htmlFor="netWt">
                        Total {weights.length} Weight Categories
                      </label>
                      <div
                        style={{
                          display: "flex",
                          overflowX: "auto",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                      >
                        {weights.map((weight, index) => (
                          <div
                            key={index}
                            style={{
                              width: "20px",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              backgroundColor: "#f0f0f0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "auto",
                            }}
                          >
                            <span style={{ whiteSpace: "nowrap" }}>
                              {weight} GM
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveWeight(index)}
                              style={{
                                width: "25px",
                                height: "25px",
                                margin: "0px",
                                padding: "0px",
                                color: "red",
                                border: "none",
                                background: "transparent",
                              }}
                            >
                              &#10005; {/* Unicode cross symbol */}
                            </button>
                          </div>
                        ))}
                      </div>
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
                          <label>Clip Weight</label>
                          <input
                            type="number"
                            // min="0"
                            name="ClipWeight"
                            value={newSku.ClipWeight}
                            onChange={handleNewSkuChange}
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Tag Weight</label>
                          <input
                            type="number"
                            // min="0"
                            name="TagWeight"
                            value={newSku.TagWeight}
                            onChange={handleNewSkuChange}
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Finding Weight</label>
                          <input
                            // min="0"
                            type="number"
                            name="FindingWeight"
                            value={newSku.FindingWeight}
                            onChange={handleNewSkuChange}
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Lanyard Weight</label>
                          <input
                            // min="0"
                            type="number"
                            name="LanyardWeight"
                            value={newSku.LanyardWeight}
                            onChange={handleNewSkuChange}
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Other Weight</label>
                          <input
                            // min="0"
                            type="number"
                            name="OtherWeight"
                            value={newSku.OtherWeight}
                            onChange={handleNewSkuChange}
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Pouch Weight</label>
                          <input
                            // min="0"
                            type="number"
                            name="PouchWeight"
                            value={newSku.PouchWeight}
                            onChange={handleNewSkuChange}
                          />
                        </div>
                      </>
                    ) : null}

                    <p className="adminSkuAddSkuInnerTitles">ADD LABOUR</p>
                    {/* <div className="adminSkuAddSkuInnerUpperItemsBox">s */}
                    {/* <div className="adminSkuAddSkuInnerItemsBox">
                      <label>Sale Type</label>
                      <select
                        value={saleType}
                        onChange={(e) => setSaleType(e.target.value)}
                      >
                        <option value={"MRP"}>MRP Based</option>
                        <option value={"Weight"}>Weight Based</option>
                      </select>
                    </div> */}
                    {/* {saleType === "MRP" ? ( */}
                    {/* <div className="adminSkuAddSkuInnerItemsBox">
                      <label>MRP</label>
                      <input
                        type="number"
                        value={mrp}
                        onChange={(e) => {
                          setMRP(e.target.value);
                        }}
                      />
                    </div> */}

                    <>
                      <div className="adminSkuAddSkuInnerItemsBox">
                        <label>Making Percentage</label>
                        <input
                          type="number"
                          min="0"
                          name="MakingPercentage"
                          value={newSku.MakingPercentage}
                          onChange={handleNewSkuChange}
                        />
                      </div>
                      <div className="adminSkuAddSkuInnerItemsBox">
                        <label>Making Per/Gram</label>
                        <input
                          min="0"
                          type="number"
                          name="MakingPerGram"
                          value={newSku.MakingPerGram}
                          onChange={handleNewSkuChange}
                        />
                      </div>
                      <div className="adminSkuAddSkuInnerItemsBox">
                        <label>Making Fixed Amount</label>
                        <input
                          min="0"
                          type="number"
                          name="MakingFixedAmt"
                          value={newSku.MakingFixedAmt}
                          onChange={handleNewSkuChange}
                        />
                      </div>
                    </>
                  </div>
                  <p className="adminSkuAddSkuInnerTitles">ADD STONE</p>

                  <div className="adminSkuAddSkuInnerItemsStoneBox">
                    {newSku.SKUStoneMain.map((stone, index) => (
                      <div className="adminSkuAddSkuInnerItemsStoneInnerBox">
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Stone Name</label>
                          <input
                            type="text"
                            value={stone.StoneMainName}
                            placeholder={`Stone Name ${index + 1}`}
                          />
                        </div>
                        <div
                          style={{ position: "relative" }}
                          className="adminSkuAddSkuInnerItemsBox"
                        >
                          <label>Select Stone 💎</label>
                          <input
                            type="text"
                            placeholder="➤"
                            // placeholder="💎"
                            onMouseEnter={() => {
                              setShowDropdown(true), setStoneItemActive(index);
                            }}
                            readOnly
                            // title="Select"
                            // type="button"
                            // onClick={() => setShowDropdown(!showDropdown)}
                          />
                          {showDropdown && stoneItemActive == index ? (
                            <div
                              onMouseLeave={() => setShowDropdown(false)}
                              style={{
                                position: "absolute",
                                zIndex: "2",
                                backgroundColor: "white",
                                width: "auto",
                                whiteSpace: "nowrap",
                                boxSizing: "border-box",
                                padding: "10px",
                                borderBottomRightRadius: "5px",
                                borderBottomLeftRadius: "5px",
                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                              }}
                              className="adminSkuAddSkuInnerItemsBox"
                            >
                              <div
                              // style={{ display: "flex" }}
                              >
                                {/* <div></div> */}
                                {allStones.map((stoneItem, itemIndex) => (
                                  <div
                                    style={{ display: "flex" }}
                                    key={itemIndex}
                                  >
                                    <label>
                                      <input
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          marginRight: "10px",
                                        }}
                                        type="checkbox"
                                        // checked={stone.SKUStoneItem.includes(
                                        //   stoneItem.StoneName
                                        // )}
                                        // checked={stone.SKUStoneItem.some(
                                        //   (si) =>
                                        //     si.StoneName === stoneItem.StoneName
                                        // )}
                                        checked={stone.SKUStoneItem.some(
                                          (si) =>
                                            si.StoneMasterId === stoneItem.Id
                                        )}
                                        onChange={(e) =>
                                          handleStoneSelectionChange(
                                            stoneItem,
                                            e.target.checked,
                                            index,
                                            itemIndex
                                          )
                                        }
                                      />
                                      {stoneItem.StoneName}
                                    </label>
                                    <label>
                                      <input
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          marginInline: "10px",
                                        }}
                                        type="text"
                                        // value={stoneItem.StonePieces}
                                        value={
                                          stone.SKUStoneItem.find(
                                            (si) =>
                                              si.StoneMasterId == stoneItem.Id
                                          )?.StonePieces || 0
                                        }
                                        // onChange={(e) =>
                                        //   handleStonePiecesChange(
                                        //     e,
                                        //     index,
                                        //     itemIndex
                                        //   )
                                        // }
                                        onChange={(e) => {
                                          const actualItemIndex =
                                            stone.SKUStoneItem.findIndex(
                                              (si) =>
                                                si.StoneMasterId ===
                                                stoneItem.Id
                                            );
                                          handleStonePiecesChange(
                                            e,
                                            index,
                                            actualItemIndex
                                          );
                                        }}
                                      />
                                      Pieces
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>

                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Stone Weight</label>
                          <input
                            type="text"
                            value={stone.StoneMainWeight}
                            // value={stone.StoneWeight}
                            placeholder={`Stone Weight ${index + 1}`}
                            // onChange={(e) =>
                            //   updateStone(index, "StoneWeight", e.target.value)
                            // }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Stone Pieces</label>
                          <input
                            type="text"
                            value={stone.StoneMainPieces}
                            // value={stone.StoneWeight}
                            placeholder={`Stone Pieces ${index + 1}`}
                            // value={stone.StonePieces}
                            // placeholder={`Stone Pieces ${index + 1}`}
                            // onChange={(e) =>
                            //   updateStone(index, "StonePieces", e.target.value)
                            // }
                          />
                        </div>
                        {/* <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Stone Rate</label>
                          <input
                            type="text"
                            value={stone.StoneMainRate}
                            // value={stone.StoneWeight}
                            placeholder={`Stone Rate ${index + 1}`}
                            // value={stone.StoneRate}
                            // placeholder={`Stone Rate ${index + 1}`}
                            // onChange={(e) =>
                            //   updateStone(index, "StoneRate", e.target.value)
                            // }
                          />
                        </div> */}
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Stone Amount</label>
                          <input
                            type="text"
                            value={stone.StoneMainAmount}
                            placeholder={`Stone Amount ${index + 1}`}
                            readOnly
                            // onChange={(e) =>
                            //   updateStone(index, "StoneAmount", e.target.value)
                            // }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Stone Description</label>
                          <input
                            type="text"
                            value={stone.StoneMainDescription}
                            // value={stone.StoneWeight}
                            placeholder={`Stone Descripttion ${index + 1}`}
                            // value={stone.StoneRate}
                            // placeholder={`Stone Rate ${index + 1}`}
                            // onChange={(e) =>
                            //   updateStone(index, "StoneRate", e.target.value)
                            // }
                          />
                        </div>
                        {/* {stones.length > 1 && ( */}
                        <div
                          style={{ alignSelf: "flex-end" }}
                          className="adminSkuAddSkuInnerItemsBox"
                        >
                          <button
                            style={{ margin: "0px" }}
                            type="button"
                            onClick={() => deleteStone(index)}
                          >
                            Remove
                          </button>
                        </div>
                        {/* )} */}
                      </div>
                    ))}
                    {stones.length < 4 ? (
                      <button
                        type="button"
                        className="adminSkuAddSkuInnerAddStoneButton"
                        style={{
                          marginTop: "20px",
                          marginBottom: "20px",
                          width: "200px",
                        }}
                        onClick={() =>
                          setNewSku((previousState) => ({
                            ...previousState,
                            SKUStoneMain: [
                              ...previousState.SKUStoneMain,
                              {
                                StoneMainName: "",
                                StoneMainWeight: "0",
                                StoneMainPieces: "0",
                                StoneMainRate: "0",
                                StoneMainAmount: "0",
                                StoneMainDescription: "",
                                SkuId: 0,
                                CompanyId: 0,
                                CounterId: 0,
                                BranchId: 0,
                                SKUStoneItem: [],
                                ClientCode: clientCode,
                                EmployeeCode: "",
                                ProductId: 0,
                              },
                            ],
                          }))
                        }

                        // onClick={() =>
                        //   handleAddStoneToSKUStoneMain(
                        //     indexOfStoneMain,
                        //     newStoneItem
                        //   )
                        // }
                      >
                        Add Stone
                      </button>
                    ) : null}
                  </div>
                  <p className="adminSkuAddSkuInnerTitles">ADD DIAMONDS</p>
                  <div className="adminSkuAddSkuInnerItemsStoneBox">
                    {newSku.Diamonds.map((diamond, index) => (
                      <div className="adminSkuAddSkuInnerItemsStoneInnerBox">
                        <div
                          key={index}
                          className="adminSkuAddSkuInnerItemsBox"
                        >
                          <label>Diamond Name</label>
                          <input
                            type="text"
                            value={diamond.DiamondName}
                            placeholder={`Diamond Name ${index + 1}`}
                            onChange={(e) =>
                              updateDiamond(
                                index,
                                "DiamondName",
                                e.target.value
                              )
                            }
                            list="diamondsList"
                          />
                          <datalist id="diamondsList">
                            {allDiamonds.map((diamond, index) => (
                              <option
                                key={index}
                                value={`${diamond.DiamondName}`}
                              />
                            ))}
                          </datalist>
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Diamond Weight</label>
                          <input
                            type="text"
                            value={diamond.DiamondWeight}
                            placeholder={`Diamond Weight ${index + 1}`}
                            onChange={(e) =>
                              updateDiamond(
                                index,
                                "DiamondWeight",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Diamond Pieces</label>
                          <input
                            type="text"
                            value={diamond.diamondPieces}
                            placeholder={`Diamond Pieces ${index + 1}`}
                            onChange={(e) =>
                              updateDiamond(
                                index,
                                "DiamondPieces",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Diamond Rate</label>
                          <input
                            type="text"
                            value={diamond.DiamondRate}
                            placeholder={`Diamond Rate ${index + 1}`}
                            onChange={(e) =>
                              updateDiamond(
                                index,
                                "DiamondRate",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Diamond Amount</label>
                          <input
                            type="text"
                            value={diamond.DiamondAmount}
                            placeholder={`Diamond Amount ${index + 1}`}
                            readOnly
                            // onChange={(e) =>
                            //   updateDiamond(index, "StoneAmount", e.target.value)
                            // }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Diamond Clarity</label>
                          <input
                            type="text"
                            value={diamond.DiamondClarity}
                            placeholder={`Diamond Clarity ${index + 1}`}
                            onChange={(e) =>
                              updateDiamond(
                                index,
                                "DiamondClarity",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Diamond Colour</label>
                          <input
                            type="text"
                            value={diamond.DiamondColour}
                            placeholder={`Diamond Colour ${index + 1}`}
                            onChange={(e) =>
                              updateDiamond(
                                index,
                                "DiamondColour",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Diamond Cut</label>
                          <input
                            type="text"
                            value={diamond.DiamondCut}
                            placeholder={`Diamond Cut ${index + 1}`}
                            onChange={(e) =>
                              updateDiamond(index, "DiamondCut", e.target.value)
                            }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Diamond Shape</label>
                          <input
                            type="text"
                            value={diamond.DiamondShape}
                            placeholder={`Diamond Shape ${index + 1}`}
                            onChange={(e) =>
                              updateDiamond(
                                index,
                                "DiamondShape",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Diamond Size</label>
                          <input
                            type="text"
                            value={diamond.DiamondSize}
                            placeholder={`Diamond Size ${index + 1}`}
                            onChange={(e) =>
                              updateDiamond(
                                index,
                                "DiamondSize",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Certificate</label>
                          <input
                            type="text"
                            value={diamond.Certificate}
                            placeholder={`Diamond Size ${index + 1}`}
                            onChange={(e) =>
                              updateDiamond(
                                index,
                                "Certificate",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Setting Type</label>
                          <input
                            type="text"
                            value={diamond.SettingType}
                            placeholder={`Setting Type ${index + 1}`}
                            onChange={(e) =>
                              updateDiamond(
                                index,
                                "SettingType",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="adminSkuAddSkuInnerItemsBox">
                          <label>Description</label>
                          <input
                            type="text"
                            value={diamond.Description}
                            placeholder={`Description ${index + 1}`}
                            onChange={(e) =>
                              updateDiamond(
                                index,
                                "Description",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* {stones.length > 1 && ( */}
                        <div
                          style={{ alignSelf: "flex-end" }}
                          className="adminSkuAddSkuInnerItemsBox"
                        >
                          <button
                            style={{ margin: "0px" }}
                            type="button"
                            onClick={() => deleteDiamond(index)}
                          >
                            Remove
                          </button>
                        </div>
                        {/* )} */}
                      </div>
                    ))}
                    {newSku.Diamonds.length < 4 ? (
                      <button
                        type="button"
                        className="adminSkuAddSkuInnerAddStoneButton"
                        style={{
                          marginTop: "20px",
                          marginBottom: "20px",
                          width: "200px",
                        }}
                        onClick={() =>
                          setNewSku((previousState) => ({
                            ...previousState,
                            Diamonds: [...previousState.Diamonds, addDiamond],
                          }))
                        }
                      >
                        Add Diamond
                      </button>
                    ) : null}
                  </div>
                  <div
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
                  </div>
                  <div
                    style={{ gridColumn: "span 3" }}
                    // style={{ display: "block" }}
                    // className="adminSkuAddSkuInnerItemsBox"
                  >
                    <label style={{ marginBottom: "5px" }}>MRP</label>
                    <input
                      min="0"
                      type="number"
                      name="MRP"
                      value={newSku.MRP}
                      onChange={handleNewSkuChange}
                    />
                  </div>
                  <div
                    style={{ gridColumn: "span 3" }}
                    className="adminSkuAddSkuInnerItemsBox"
                  >
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
