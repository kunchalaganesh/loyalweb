import React, { useEffect, useRef, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminTrading.css";
import {
  a1,
  a110,
  a125,
  a128,
  a131,
  a134,
  a149,
  a163,
  a165,
  a173,
  a18,
  a181,
  a185,
  a189,
  a190,
  a20,
  a201,
  a202,
  a22,
  a33,
  a4,
  a40,
  a41,
  a48,
  a49,
  a51,
  a53,
  a56,
  a57,
  a59,
  a61,
  a71,
  a74,
  s1,
} from "../../../Api/RootApiPath";
import { AiOutlineEdit, AiOutlinePlusSquare } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BsCardImage } from "react-icons/bs";
import jsPDF from "jspdf";
import logoImage from "../../../Images/soniJewellersBillTitle.jpg";
import { GiCheckMark } from "react-icons/gi";
import { AiOutlineSend } from "react-icons/ai";
import { LiaCartPlusSolid } from "react-icons/lia";
import { MdOutlineLabelOff } from "react-icons/md";
import { numberToIndianWords } from "../../../Other Functions/numberToIndianWords";
import DateTime from "../../../Other Functions/DateTime";
import { createPurchaseReceiptPDF } from "../../../Other Functions/CreatePurchaseReceiptPDF";
import { generateBillPDF } from "../../../Other Functions/GenerateBillPDF";
import { FaDollarSign, FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { allStateList } from "../../../Api/StateList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoIosList } from "react-icons/io";
import { BiReset } from "react-icons/bi";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { Category, Description, Visibility } from "@mui/icons-material";

export default function AdminInvoiceEdit() {
  const [allCsData, setAllCsData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCustomerEdit, setSelectedCustomerEdit] = useState(false);
  //   const [addNewCustomer, setAddNewCustomer] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [labelName, setLabelName] = useState("");
  const [wholesaleProductLabelName, setWholesaleProductLabelName] =
    useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [barcode, setBarcode] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [purityType, setPurityType] = useState("");
  const [productQty, setProductQty] = useState("");
  const [allSelectedProducts, setAllSelectedProducts] = useState([]);
  const [showAllFields, setShowAllFields] = useState(false);
  const [allProdctsNetAmount, setAllProdctsNetAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalPayableGstAmount, setTotalPayableGstAmount] = useState(0);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [allProdctsGstAmount, setAllProdctsGstAmount] = useState(0);
  const [productsLoading, setProductsLoading] = useState(true);
  const [updatePrices, setUpdatePrices] = useState(false);
  const [openEditBox, setOpenEditBox] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [orderItemsData, setOrderItemsData] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [orderCsData, setOrderCsData] = useState([]);
  const [oldGoldAmount, setOldGoldAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [paymentOptions, setPaymentOptions] = useState("Cash");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [payments, setPayments] = useState([]);
  const [active, setActive] = useState("Sell");
  const [paymentType, setPaymentType] = useState("Receive");
  const [allCategories, setAllCategories] = useState([]);
  const [allProductTypes, setAllProductTypes] = useState([]);
  const [allCollection, setAllCollection] = useState([]);
  const [allPurities, setAllPurities] = useState([]);
  const [allUnlabelList, setAllUnlabelList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPurity, setSelectedPurity] = useState("");
  const [allSalesTeam, setAllSalesTeam] = useState([]);
  const [allCashiersTeam, setAllCashiersTeam] = useState([]);
  const [selectedSalesEmployee, setSelectedSalesEmployee] = useState("");
  const [selectedCashierEmployee, setSelectedCashierEmployee] = useState("");
  const [allSku, setAllSku] = useState([]);
  // New Changes
  const [paymentGold, setPaymentGold] = useState(0);
  const [deductGold, setDeductGold] = useState(0);
  const [paymentSilver, setPaymentSilver] = useState(0);
  const [deductSilver, setDeductSilver] = useState(0);
  const [totalPayableGold, setTotalPayableGold] = useState(0);
  const [totalPayableSilver, setTotalPayableSilver] = useState(0);
  const [paymentDescription, setPaymentDescription] = useState("");
  const [gstType, setGstType] = useState(true);
  const [discountPercentage, setDiscountPercentage] = useState("0%");
  const [applyGstAmount, setApplyGstAmount] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);
  const [convertAmount, setConvertAmount] = useState(false);
  const [allProductsFineGold, setAllProductsFineGold] = useState(0);
  const [allProductsFineSilver, setAllProductsFineSilver] = useState(0);
  const [invoiceId, setInvoiceId] = useState(0);
  const [invoiceMainBox, setInvoiceMainBox] = useState([]);

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      const entryNo = searchParams.get("invoiceId");
      setInvoiceId(entryNo);

      if (entryNo !== 0 && allCsData.length > 0) {
        await getInvoiceById(entryNo);
      }
    }

    fetchData(); // call the async function
  }, [searchParams, allCsData]); // make sure to include searchParams in the dependency array

  const getInvoiceById = async (id) => {
    const formData = {
      ClientCode: clientCode,
      Id: id,
    };
    try {
      const response = await fetch(a202, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const allReceivedItems = data.InvoiceItem.map((x) => {
        if (x.BillType == "sale") {
          return {
            ...x,
            sell: true,
            wholesale: false,
            unlabel: false,
            purchase: false,
          };
        } else if (x.BillType == "purchase") {
          return {
            ...x,
            sell: false,
            wholesale: false,
            unlabel: false,
            purchase: true,
          };
        } else if (x.BillType == "unlabelled") {
          return {
            ...x,
            sell: false,
            wholesale: false,
            unlabel: true,
            purchase: false,
          };
        } else if (x.BillType == "purchase") {
          return {
            ...x,
            sell: false,
            wholesale: false,
            unlabel: false,
            purchase: true,
          };
        }
      });
      setInvoiceMainBox(data);
      setAllSelectedProducts(allReceivedItems);

      const selectedVendor = allCsData.find((x) => x.Id === data.CustomerId);
      setSelectedCustomer(selectedVendor);
      if (data.GSTApplied == "true") {
        setGstType(true);
      } else {
        setGstType(false);
      }
      setSelectedDate(data.InvoiceDate);
      // setInvoiceNumber(data.InvoiceNo ? data.InvoiceNo : "");
      // setGrandTotal(data.BalanceAmount);
      getAllPaymentsById(id, data);
      console.log(data, "PurchaseMainBox");
      console.log(selectedCustomer, "selectedCustomer");
    } catch (error) {
      console.error("Failed to fetch purchase data:", error);
    }
  };
  const [allPaymentsList, setAllPaymentsList] = useState([]);
  const getAllPaymentsById = async (id, mainBoxData) => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a165, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      let filteredPaymentsList = data.filter((x) => x.RDPurchaseId == id);
      setAllPaymentsList(filteredPaymentsList);
      const modifiedData = filteredPaymentsList.map((item) => {
        // Destructure the properties you need from each item
        const {
          Amount,
          FineGold,
          FineSilver,
          GoldAmount,
          GoldRate,
          Description,
          TransactionType,
          SilverAmount,
          SilverRate,
          PaymentModeType,
          Id,
          CreatedOn,
        } = item;

        // Construct a new object for each item
        let newItem = {
          amount: Amount,
          deductGold: PaymentModeType === "Cash to Metal" ? FineGold : 0,
          deductSilver: PaymentModeType === "Cash to Metal" ? FineSilver : 0,
          fineGold: FineGold,
          fineSilver: FineSilver,
          goldAmount: GoldAmount,
          goldRate: GoldRate,
          paymentDescription: Description,
          paymentType: TransactionType,
          silverAmount: SilverAmount,
          silverRate: SilverRate,
          mode: PaymentModeType,
          Id: Id,
          CreatedOn: CreatedOn,
        };

        return newItem;
      });
      let totalPaidAmount = modifiedData.reduce((accumulator, current) => {
        // Parse the amount as a float; if it's NaN, use 0 instead.
        const parsedAmount = parseFloat(current.amount) || 0;
        return accumulator + parsedAmount;
      }, 0);
      // if (mainBoxData.GSTApplied == "true") {
      //   setGstType(true);
      // } else {
      //   setGstType(false);
      // }
      setTotalPayableGold(mainBoxData.BalanceGold);
      setGrandTotal(mainBoxData.BalanceAmount);
      setTotalPayableSilver(mainBoxData.BalanceSilver);
      setTotalPayableGstAmount(mainBoxData.TotalGSTAmount);
      setPaymentAmount(mainBoxData.BalanceAmount);
      setDiscountAmount(mainBoxData.Discount);

      // console.log(grandTotal, "grandTotal");
      // console.log(grandTotal, "grandTotal");
      // console.log(grandTotal, "grandTotal");
      // console.log(totalPaidAmount, "totalPaidAmount");
      // console.log(totalPaidAmount, "totalPaidAmount");
      // Update the state with the new data UNCOMMENT BELOW LINE FOR ISSUE WITH CALCULATION
      // calculateTotalAmount();
      setPayments(modifiedData);

      console.log(data, "allPaymentsList");
      console.log(data, "allPaymentsList");
    } catch (error) {
      console.error("Failed to fetch purchase data:", error);
    }
  };

  const getTodaysDateInHTMLFormat = () => {
    const today = new Date();
    const year = today.getFullYear();
    // Pad the month and day with a leading zero if they are less than 10
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [selectedDate, setSelectedDate] = useState(getTodaysDateInHTMLFormat());

  const [metalPaymentOption, setMetalPaymentOption] = useState({
    optionSelected: "GOLD",
    fineRate: 0,
    fineWt: 0,
    totalAmount: 0,
    deductGold: 0,
    deductSilver: 0,
    goldRate: 0,
    silverRate: 0,
    goldAmount: 0,
    silverAmount: 0,
  });
  // New Changes

  const [advanceType, setAdvanceType] = useState("Advance Received");
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [purchaseProduct, setPurchaseProduct] = useState({
    CategoryName: "",
    ProductName: "",
    Id: 0,
    CustomerId: "",
    GrossWt: "0",
    NetWt: "0",
    StoneWt: "0",
    StoneAmount: "0",
    MRP: "0",
    HallmarkAmount: "0",
    making: "0",
    MakingFixedAmt: "0",
    MakingPercentage: "0",
    MakingPerGram: "0",
    MakingFixedWastage: "0",
    GoldRate: "0",
    Finepercent: "100",
    making: "0",
    NetAmt: "0",
    GSTAmount: "0",
    TotalAmt: "0",
    Quantity: "1",
    PurchaseAmount: "0",
    PurchaseInvoiceNo: "",
    PurityRate: "0",
    PurityName: "100",
    FinePercent: "100",
    finalPrice: "0",
    totalGstAmount: "0",
    purchase: true,
    unlabel: false,
    order: false,
    wholesale: false,
  });
  const [unlabelProduct, setUnlabelProduct] = useState({
    CategoryName: "",
    CategoryId: "",
    ProductId: "",
    ProductName: "",
    DesignName: "",
    Id: 0,
    SelectedUnlabelId: 0,
    GrossWt: "0",
    NetWt: "0",
    TotalStoneWeight: "0",
    TotalStoneAmount: "0",
    MRP: "0",
    HallmarkAmount: "0",
    GoldRate: "0",
    FinePercent: "0",
    making: "0",
    MakingFixedAmt: "0",
    MakingPercentage: "0",
    MakingPerGram: "0",
    MakingFixedWastage: "0",
    NetAmt: "0",
    MaxQuantity: "0",
    MaxGrossWt: "0",
    MaxNetWt: "0",
    GSTAmount: "0",
    TotalAmt: "0",
    Quantity: "1",
    UnlabelAmount: "0",
    PurityRate: "0",
    PurityId: "100",
    PurityName: "100",
    finalPrice: "0",
    totalGstAmount: "0",
    purchase: false,
    unlabel: true,
    order: false,
    wholesale: false,
    TodaysRate: "0",
  });
  const [wholesaleProduct, setWholesaleProduct] = useState({
    CategoryName: "",
    CategoryId: "",
    ProductId: "",
    ProductName: "",
    DesignName: "",
    Id: 0,
    GrossWt: "0",
    NetWt: "0",
    TotalStoneWeight: "0",
    TotalStoneAmount: "0",
    MRP: "0",
    HallmarkAmount: "0",
    GoldRate: "0",
    FinePercent: "0",
    making: "0",
    MakingFixedAmt: "0",
    MakingPercentage: "0",
    MakingPerGram: "0",
    MakingFixedWastage: "0",
    NetAmt: "0",
    MaxQuantity: "0",
    MaxGrossWt: "0",
    MaxNetWt: "0",
    GSTAmount: "0",
    TotalAmt: "0",
    Quantity: "1",
    UnlabelAmount: "0",
    PurityRate: "0",
    PurityId: "0",
    PurityName: "0",
    finalPrice: "0",
    totalGstAmount: "0",
    ConvertAmount: convertAmount,
    TotalItemAmount: "0",
    purchase: false,
    unlabel: false,
    order: false,
    wholesale: true,
    TodaysRate: "0",
  });

  const [purchaseProductList, setPurchaseProductList] = useState([]);
  const [unlabelProductList, setUnlabelProductList] = useState([]);
  const [wholesaleProductList, setWholesaleProductList] = useState([]);
  const [labelProductList, setlabelProductList] = useState([]);
  const [newCustomerFields, setNewCustomerFields] = useState({
    FirstName: "",
    LastName: "",
    MiddleName: "",
    PerAddStreet: "",
    CurrAddStreet: "",
    Mobile: "",
    Email: "",
    Password: "",
    CustomerLoginId: "",
    DateOfBirth: "",
    PerAddPincode: "",
    Gender: "",
    OnlineStatus: "",
    CurrAddTown: "",
    CurrAddPincode: "",
    CurrAddState: "",
    PerAddTown: "",
    PerAddState: "",
    GstNo: "",
    PanNo: "",
    AadharNo: "",
    BalanceAmount: "0",
    AdvanceAmount: "0",
    Discount: "0",
    CreditPeriod: "0",
    FineGold: "0",
    FineSilver: "0",
  });
  console.log(allSelectedProducts, "allSelectedProduct");

  const navigate = useNavigate();
  //   useEffect(() => {
  //     fetch(a1)
  //       .then((res) => res.json())
  //       .then((response) => {
  //         setAllCsData(response.data);
  //       });
  //   }, []);
  const fetchAllSalesTeam = async () => {
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
      setAllSalesTeam(data.filter((x) => x.Department === "Salesman"));
      setAllCashiersTeam(data.filter((x) => x.Department === "Cashier"));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllSalesTeam();
  }, []);
  const fetchAllCustomers = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a173, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const allCustomersList = data.map((x) => {
        return { ...x, MemberType: "Customer" };
      });
      // setAllCsData(allCustomersList);
      fetchAllSuppliers(allCustomersList);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllSuppliers = async (allCsList) => {
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
      const allSuppliersList = data.map((x) => {
        return { ...x, MemberType: "Vendor" };
      });
      setAllCsData([...allCsList, ...allSuppliersList]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allCsData, "allCsData");
  console.log(allCsData, "allCsData");
  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const fetchAllProducts = async () => {
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
      if (!data.Message) {
        const modifiedProducts = data.map((product) => {
          // Add a new property, modify existing properties, or both
          return {
            ...product,
            sell: true,
            purchase: false,
            unlabel: false,
            order: false,
            wholesale: false,
            FinePercent: 0,
            WastagePercent: 0,
          };
        });

        setAllProducts(modifiedProducts);
      }
      console.log(data, "Rcvd data");
      setProductsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllUnlabelledList = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a185, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // const response = await fetch(a56);
      const data = await response.json();
      setAllUnlabelList(data);
      console.log(data, "Rcvd Unlabel data");
      setProductsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  useEffect(() => {
    fetchAllCategories();
  }, []);
  useEffect(() => {
    fetchAllProductType();
  }, []);
  useEffect(() => {
    fetchAllPurities();
  }, []);
  useEffect(() => {
    fetchAllUnlabelledList();
  }, []);

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
      setAllCategories(data);
      // console.log(data, "allcategory");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllProductType = async () => {
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
      setAllProductTypes(data);
      console.log(data, "allProductTypes");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllCollectionType = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a131, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllCollection(data);
      console.log(data, "allCollection");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCollectionType();
  }, []);
  const fetchAllPurities = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a134, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setAllPurities(data);
      console.log(data, "allPurities");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
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
      console.log(data);
      setAllSku(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllSku();
  }, []);

  const [selectedSku, setSelectedSku] = useState([]);
  const [selectedSkuName, setSelectedSkuName] = useState("");
  const handleSkuInputChange = (e) => {
    const { value } = e.target;
    setSelectedSkuName(value);
    let selectedSkuItem = [];
    selectedSkuItem = allSku.find((x) => x.StockKeepingUnit == value);
    setSelectedSku(selectedSkuItem);
  };
  useEffect(() => {
    const allSkuList = allSku;
    if (selectedSku) {
      let skuProducts = allProducts.filter(
        (x) => x.SKU && x.SKU === selectedSkuName
      );
      setAllProducts(skuProducts);
    } else {
      setSelectedSku([]);
      setSelectedSkuName("");
      fetchAllProducts(allSkuList);
    }
  }, [selectedSku]);

  // Sku code above

  useEffect(() => {
    if (selectedCustomer) {
      setCustomerName(
        selectedCustomer.MemberType == "Customer"
          ? `${selectedCustomer.FirstName} ${selectedCustomer.LastName}`
          : `${selectedCustomer.VendorName}`
      );
      setCustomerMobile(
        selectedCustomer.MemberType == "Customer"
          ? selectedCustomer.Mobile
          : selectedCustomer.ContactNo
      );
      setCustomerId(selectedCustomer.Id);
      setCustomerEmail(selectedCustomer.Email);
      setCustomerAddress(selectedCustomer.CurrAddStreet);
      // handleToggleCustomTab();
    } else {
      // setCustomerName("");
      setCustomerMobile("");
      setCustomerEmail("");
      setCustomerId("");
      setCustomerAddress("");
      // setSelectedCustomer(null);
    }
    // }, [selectedCustomer, customerName, customerMobile, customerAddress]);
  }, [selectedCustomer]);

  const filteredCustomers = allCsData.filter((customer) => {
    const fullName = `${customer.FirstName} ${customer.LastName}`;
    return fullName.toLowerCase().includes(customerName.toLowerCase());
  });

  const handleNameInputChange = (e) => {
    const { value } = e.target;
    setCustomerName(value); // Update the name input value
    const cleanedValue = value.replace(/^👤\s|^🏢\s/, "");

    const selected = allCsData.find((customer) => {
      const csFullName = `${customer.FirstName} ${customer.LastName}`;
      const vendorFullName = `${customer.VendorName}`;
      return customer.MemberType == "Customer"
        ? csFullName === cleanedValue
        : vendorFullName === cleanedValue;
    });
    console.log(selected, "selected");
    console.log(selected, "selected");
    console.log(selected, "selected");
    if (selected) {
      setCustomerEmail(selected.Email);
      setCustomerId(selected.Id); // Update the email input value based on selected customer's email
    }
    setSelectedCustomerEdit(false);
    setSelectedCustomer(selected); // Update the selected customer based on name match
  };

  const handleMobileInputChange = (e) => {
    const { value } = e.target;
    setCustomerMobile(value); // Update the mobile input value

    const selected = allCsData.find((customer) => {
      const csMobile = customer.Mobile;
      const vendorMobile = customer.ContactNo;
      return customer.MemberType == "Customer"
        ? csMobile === value
        : vendorMobile === value;
    });
    if (selected) {
      setCustomerEmail(selected.Email);
      setCustomerId(selected.Id); // Update the email input value based on selected customer's email
    }

    setSelectedCustomerEdit(false);
    setSelectedCustomer(selected); // Update the selected customer based on mobile match
  };

  const handleEmailInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerEmail(value); // Update the mobile input value

    const selected = allCsData.find((customer) => customer.Email == value);
    setSelectedCustomerEdit(false);
    setSelectedCustomer(selected); // Update the selected customer based on mobile match
  };
  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerAddress(value); // Update the mobile input value

    const selected = allCsData.find(
      (customer) => customer.CurrAddStreet == value
    );
    setSelectedCustomerEdit(false);
    setSelectedCustomer(selected); // Update the selected customer based on mobile match
  };

  useEffect(() => {
    if (selectedProduct) {
      setCategoryName(selectedProduct.CategoryName);
      setProductName(selectedProduct.ProductName);
      setCollectionName(selectedProduct.DesignName);
      setPurityType(selectedProduct.PurityName);
      setBarcode(selectedProduct.RFIDCode);
      setLabelName(selectedProduct.ItemCode);
    } else {
      setCustomerName("");
      setCustomerMobile("");
      setCustomerEmail("");
    }
  }, [selectedProduct]);
  console.log(selectedProduct, "selectedProduct");
  console.log(selectedProduct, "selectedProduct");
  console.log(selectedProduct, "selectedProduct");
  const handleProductLabelChange = (e) => {
    const { value } = e.target;
    setLabelName(value.toUpperCase());
    setSelectedProduct([]);
    setCategoryName("");
    setProductName("");
    setCollectionName("");
    setPurityType("");
    setProductQty("");
    setBarcode("");
    setSelectedProductPrice(0);
    if (value) {
      const selected = allProducts.find(
        (product) => product.ItemCode === value || product.RFIDCode === value
      );
      const isAdded = allSelectedProducts.find((x) => x.ItemCode == value);
      if (selected && !isAdded) {
        let changeSelectedProduct = selected;
        changeSelectedProduct.order = false;
        changeSelectedProduct.sell = true;
        changeSelectedProduct.wholesale = false;
        setSelectedProduct(changeSelectedProduct);
        calculateFinalPrice(changeSelectedProduct, false);

        // addProductToList(selected);
        // setSelectedProduct([]);
        // if (labelName) {
        // } else {
        //   alert("Label is missing");
        // } // Calculate the final price
      } else if (selected && isAdded) {
        // setActive("Sell");
        setLabelName("");
        alert("Already Added");
        // console.log("Not selected");
      } else {
      }
    }
  };
  const handleWholesaleProductLabelChange = (e) => {
    const { value } = e.target;
    setWholesaleProductLabelName(value.toUpperCase());
    setSelectedProduct([]);
    setCategoryName("");
    setProductName("");
    setLabelName("");
    setCollectionName("");
    setPurityType("");
    setProductQty("");
    setBarcode("");
    setSelectedProductPrice(0);
    if (value) {
      const selected = allProducts.find(
        (product) => product.ItemCode === value || product.RFIDCode === value
      );
      const isAdded = allSelectedProducts.find((x) => x.ItemCode == value);
      if (selected && !isAdded) {
        let changeSelectedProduct = selected;
        changeSelectedProduct.sell = false;
        changeSelectedProduct.order = false;
        changeSelectedProduct.wholesale = true;
        changeSelectedProduct.NetWt = selected.NetWt;
        changeSelectedProduct.CategoryName = selected.CategoryName;
        changeSelectedProduct.ProductName = selected.ProductName;
        changeSelectedProduct.CategoryId = selected.CategoryId;
        changeSelectedProduct.PurityName = selected.PurityName;
        changeSelectedProduct.FinePercent = selected.FinePercent;
        changeSelectedProduct.PurityRate = selected.TodaysRate;
        changeSelectedProduct.DesignName = selected.DesignName;
        changeSelectedProduct.MRP = selected.MRP;
        changeSelectedProduct.GoldRate = selected.TodaysRate;
        (changeSelectedProduct.Quantity = selected.Quantity
          ? selected.Quantity
          : 1),
          setSelectedProduct(changeSelectedProduct);

        // setSelectedCollection(
        //   `${(selected.collectionId, selected.collection)}`
        // );
        calculateWholesaleProductFinalPrice(changeSelectedProduct, true);

        // calculateOrderPrice(changeSelectedProduct);
        // setActive("Sell");
        // addProductToList(selected);
        // setSelectedProduct([]);
        // if (labelName) {
        // } else {
        //   alert("Label is missing");
        // } // Calculate the final price
      } else if (selected && isAdded) {
        // setActive("Sell");
        setWholesaleProductLabelName("");
        alert("Already Added");
        // console.log("Not selected");
      } else {
      }
    }
  };
  console.log(selectedProduct, "selectedProduct");
  console.log(selectedProduct, "selectedProduct");
  const handleProductBarcodeChange = (e) => {
    const { value } = e.target;
    setBarcode(value.toUpperCase());
    setLabelName("");
    setSelectedProduct([]);
    setCategoryName("");
    setProductName("");
    setCollectionName("");
    setPurityType("");
    setProductQty("");
    setSelectedProductPrice(0);
    if (value) {
      const selected = allProducts.find(
        (product) => product.RFIDCode === value
      );
      if (selected) {
        setSelectedProduct(selected);
        calculateFinalPrice(selected); // Calculate the final price
      } else {
        // console.log("Not selected");
      }
    }
  };

  const calculateFinalPrice = (selectedProduct, adding) => {
    let netGoldRate =
      (parseFloat(selectedProduct.NetWt) *
        parseFloat(selectedProduct.TodaysRate)) /
      //  parseFloat(selectedProduct.PurityId)) /
      10;
    let makingCharges1 =
      parseFloat(selectedProduct.NetWt) *
      parseFloat(selectedProduct.MakingPerGram);
    let makingCharges2 =
      (parseFloat(netGoldRate) * parseFloat(selectedProduct.MakingPercentage)) /
      100;
    let makingCharges3 = parseFloat(selectedProduct.MakingFixedAmt);
    let makingCharges4 =
      (parseFloat(selectedProduct.TodaysRate) *
        parseFloat(selectedProduct.MakingFixedWastage)) /
      10;
    let hallmark_amt = parseFloat(selectedProduct.HallmarkAmount);

    let GST = 0.03;

    let grossTotalRate =
      parseFloat(netGoldRate) +
      parseFloat(makingCharges1) +
      parseFloat(makingCharges2) +
      parseFloat(makingCharges3) +
      parseFloat(makingCharges4) +
      parseFloat(hallmark_amt) +
      parseFloat(selectedProduct.TotalStoneAmount);
    let GSTAdded = parseFloat(GST) * parseFloat(grossTotalRate);
    let finalPrice = parseFloat(grossTotalRate) + parseFloat(GSTAdded);
    if (
      selectedProduct.MRP !== "" &&
      selectedProduct.MRP !== 0 &&
      selectedProduct.MRP !== "0"
    ) {
      GSTAdded = GST * parseFloat(selectedProduct.MRP);
      finalPrice = parseFloat(selectedProduct.MRP) + parseFloat(GSTAdded);
    }

    // Calculate total making charges
    let totalMakingCharges =
      parseFloat(makingCharges1) +
      parseFloat(makingCharges2) +
      parseFloat(makingCharges3) +
      parseFloat(makingCharges4);

    let updatedProduct = {};
    // Update selectedProduct with additional properties and calculated price
    if (
      selectedProduct.MRP !== "" &&
      selectedProduct.MRP !== 0 &&
      selectedProduct.MRP !== "0"
    ) {
      updatedProduct = {
        ...selectedProduct,
        purchase: false,
        unlabel: false,
        //   finalPrice: parseFloat(finalPrice).toFixed(3),
        making: 0,
        totalGstAmount: parseFloat(selectedProduct.MRP).toFixed(3) * GST,
        finalPrice:
          parseFloat(selectedProduct.MRP) -
          parseFloat(selectedProduct.MRP).toFixed(3) * GST,
        // making: totalMakingCharges,
        // totalGstAmount: GSTAdded,
      };
      setSelectedProductPrice(parseFloat(selectedProduct.mrp).toFixed(3));
    } else {
      updatedProduct = {
        ...selectedProduct,
        purchase: false,
        unlabel: false,
        finalPrice: parseFloat(grossTotalRate).toFixed(3),
        //   finalPrice: parseFloat(finalPrice).toFixed(3),
        making: totalMakingCharges,
        totalGstAmount: GSTAdded,
      };
      setSelectedProductPrice(parseFloat(finalPrice).toFixed(3));
    }
    setSelectedProduct(updatedProduct); // Update the selected product
    if (adding) {
      // alert("");
      addProductToList(updatedProduct);
    } else if ((selectedProduct.length > 0, !adding)) {
      // alert("No Product Matched");
      // console.log("no product found");
      // alert("not");
    } else {
      null;
    }
    setDiscountAmount(0);
    setDiscountPercentage("0%");
    // setAllSelectedProducts((prev) => [...prev, updatedProduct]);
    // Update the price input field
  };
  useEffect(() => {
    calculateWholesaleProductFinalPrice(wholesaleProduct);
  }, [convertAmount]);

  const calculateWholesaleProductFinalPrice = (wholesaleProduct, adding) => {
    let selectedProduct = wholesaleProduct;
    console.log("I am here", selectedProduct);
    console.log("I am here", selectedProduct);
    let netGoldRate =
      (parseFloat(selectedProduct.NetWt) *
        parseFloat(selectedProduct.TodaysRate)) /
      10;
    let makingCharges1 =
      parseFloat(selectedProduct.NetWt) *
      parseFloat(selectedProduct.MakingPerGram);
    let makingCharges2 =
      (parseFloat(netGoldRate) * parseFloat(selectedProduct.MakingPercentage)) /
      100;
    let makingCharges3 = parseFloat(selectedProduct.MakingFixedAmt);
    let makingCharges4 =
      (parseFloat(selectedProduct.TodaysRate) *
        parseFloat(selectedProduct.MakingFixedWastage)) /
      10;
    let hallmark_amt = parseFloat(selectedProduct.HallmarkAmount);

    let GST = 0.03;

    let grossTotalRate =
      parseFloat(netGoldRate) +
      parseFloat(makingCharges1) +
      parseFloat(makingCharges2) +
      parseFloat(makingCharges3) +
      parseFloat(makingCharges4) +
      parseFloat(hallmark_amt) +
      parseFloat(selectedProduct.TotalStoneAmount);
    let GSTAdded = parseFloat(GST) * parseFloat(grossTotalRate);
    let finalPrice = parseFloat(grossTotalRate) + parseFloat(GSTAdded);
    let OrderAmount = parseFloat(grossTotalRate) + parseFloat(GSTAdded);
    let CategorySelected = selectedProduct.CategoryName.toLowerCase().includes(
      "gold"
    )
      ? "gold"
      : selectedProduct.CategoryName.toLowerCase().includes("silver")
      ? "silver"
      : "other";
    let FineWeight =
      (parseFloat(selectedProduct.NetWt) *
        parseFloat(selectedProduct.FinePercent)) /
      100;
    let WastageWeight =
      (parseFloat(selectedProduct.WastagePercent) *
        parseFloat(selectedProduct.NetWt)) /
      100;
    let TotalFineWastageWeight =
      parseFloat(FineWeight) + parseFloat(WastageWeight);
    if (
      selectedProduct.MRP !== "" &&
      selectedProduct.MRP !== 0 &&
      selectedProduct.MRP !== "0"
    ) {
      GSTAdded = GST * parseFloat(selectedProduct.MRP);
      finalPrice = parseFloat(selectedProduct.MRP) + parseFloat(GSTAdded);
      OrderAmount = parseFloat(selectedProduct.MRP) + parseFloat(GSTAdded);
    }

    // Calculate total making charges
    let totalMakingCharges =
      parseFloat(makingCharges1) +
      parseFloat(makingCharges2) +
      parseFloat(makingCharges3) +
      parseFloat(makingCharges4) +
      parseFloat(selectedProduct.HallmarkAmount) +
      parseFloat(selectedProduct.TotalStoneAmount);

    let updatedProduct = {};
    // Update selectedProduct with additional properties and calculated price
    if (
      selectedProduct.MRP !== "" &&
      selectedProduct.MRP !== 0 &&
      selectedProduct.MRP !== "0"
    ) {
      updatedProduct = {
        ...selectedProduct,
        purchase: false,
        unlabel: false,
        //   finalPrice: parseFloat(finalPrice).toFixed(3),
        making: 0,
        totalGstAmount: parseFloat(selectedProduct.MRP).toFixed(3) * GST,
        finalPrice:
          parseFloat(selectedProduct.MRP) -
          parseFloat(selectedProduct.MRP).toFixed(3) * GST,
        OrderAmount:
          parseFloat(selectedProduct.MRP) -
          parseFloat(selectedProduct.MRP).toFixed(3) * GST,
        NetAmt: selectedProduct.MRP,
        GSTAmount: parseFloat(selectedProduct.MRP).toFixed(3) * GST,
        TotalAmt:
          parseFloat(selectedProduct.MRP) -
          parseFloat(selectedProduct.MRP).toFixed(3) * GST,
        OrderAmount:
          parseFloat(selectedProduct.MRP) -
          parseFloat(selectedProduct.MRP).toFixed(3) * GST,

        // making: totalMakingCharges,
        // totalGstAmount: GSTAdded,
      };
      setSelectedProductPrice(parseFloat(selectedProduct.mrp).toFixed(3));
    } else {
      updatedProduct = {
        ...selectedProduct,
        purchase: false,
        unlabel: false,
        finalPrice: convertAmount
          ? parseFloat(grossTotalRate).toFixed(3)
          : totalMakingCharges,
        OrderAmount: parseFloat(grossTotalRate).toFixed(3),
        //   finalPrice: parseFloat(finalPrice).toFixed(3),
        making: totalMakingCharges,
        totalGstAmount: convertAmount ? GSTAdded : totalMakingCharges * 0.03,
        NetAmt: parseFloat(grossTotalRate).toFixed(3),
        GSTAmount: convertAmount ? GSTAdded : totalMakingCharges * 0.03,
        TotalAmt: parseFloat(grossTotalRate).toFixed(3),
        OrderAmount: convertAmount ? parseFloat(grossTotalRate).toFixed(3) : 0,
        TotalItemAmount: convertAmount
          ? parseFloat(grossTotalRate).toFixed(3)
          : totalMakingCharges,
        FineWastageWeight: !convertAmount
          ? parseFloat(TotalFineWastageWeight).toFixed(3)
          : 0,
        FineGold:
          !convertAmount && CategorySelected == "gold"
            ? parseFloat(TotalFineWastageWeight).toFixed(3)
            : 0,
        FineSilver:
          !convertAmount && CategorySelected == "silver"
            ? parseFloat(TotalFineWastageWeight).toFixed(3)
            : 0,
      };
      setSelectedProductPrice(parseFloat(finalPrice).toFixed(3));
    }
    console.log("Beforadding");

    // setWholesaleProductLabelName("");
    setLabelName("");

    console.log(updatedProduct, "Calculated");
    console.log(updatedProduct, "Calculated");
    setDiscountAmount(0);
    setDiscountPercentage("0%");
    setSelectedProduct(updatedProduct); // Update the selected product
    setWholesaleProduct(updatedProduct); // Update the selected product
    if (adding) {
      console.log("adding");
      addWholesaleProductToList(updatedProduct);
      // alert("");
    } else if ((selectedProduct.length > 0, !adding)) {
      console.log("Not adding");

      // addProductToList(updatedProduct);
      // alert("No Product Matched");
      // console.log("no product found");
      // alert("not");
    } else {
      null;
      console.log("Null");
    }

    // setAllSelectedProducts((prev) => [...prev, updatedProduct]);
    // Update the price input field
  };

  const addProductToList = (selectedProduct) => {
    if (!allSelectedProducts.some((x) => x.Id === selectedProduct.Id)) {
      setAllSelectedProducts((prevItems) => [...prevItems, selectedProduct]);
      setLabelName("");
      setSelectedProduct([]);
      setCategoryName("");
      setProductName("");
      setCollectionName("");
      setPurityType("");
      setProductQty("");
      setSelectedProductPrice(0);
      // scrollToCenter("adminInvoiceSelectLabelBox");
      scrollToCenter("adminInvoiceAddProductsOptionsInnerBox");
    } else {
      // alert("Product Already added");
      setSelectedProduct([]);
    }
  };

  const removeProductFromList = (id) => {
    const updatedProductList = allSelectedProducts.filter((x) => x.Id !== id);
    setAllSelectedProducts(updatedProductList);
    if (allSelectedProducts && allSelectedProducts.length == 1) {
      scrollToCenter("adminInvoiceSelectCategoryBox");
    }
  };

  useEffect(() => {
    if (selectedProduct.length > 0) {
      if (selectedProduct.sell) {
        const finalPrice = calculateFinalPrice(
          selectedProduct.NetWt,
          selectedProduct.MakingPerGram,
          selectedProduct.MakingPercentage,
          selectedProduct.MakingFixedAmt,
          selectedProduct.MakingFixedWastage,
          selectedProduct.TotalStoneAmount,
          selectedProduct.MRP,
          // selectedProduct.todaysRate,

          selectedProduct.TodaysRate,
          selectedProduct.Id
        );
        setSelectedProductPrice(finalPrice); // Set the calculated final price here
        setTotalPrice((x) => parseFloat(x) + finalPrice);
      } else {
        const finalPrice = calculateFinalPrice(
          selectedProduct.NetWt,
          selectedProduct.MakingPerGram,
          selectedProduct.MakingPercentage,
          selectedProduct.MakingFixedAmt,
          selectedProduct.MakingFixedWastage,
          selectedProduct.TotalStoneAmount,
          selectedProduct.MRP,
          selectedProduct.TodaysRate,

          selectedProduct.Id
        );
        setSelectedProductPrice(finalPrice); // Set the calculated final price here
        setTotalPrice((x) => parseFloat(x) + finalPrice);
      }
    }
  }, [selectedProduct]);

  const calculateNetAmount = () => {
    if (allSelectedProducts.length > 0) {
      let totalNetAmount = allSelectedProducts.reduce(
        (total, product) => total + parseFloat(product.finalPrice),
        0
      );
      let totalGstAmount = applyGstAmount
        ? allSelectedProducts.reduce(
            (total, product) => total + parseFloat(product.totalGstAmount),
            0
          )
        : 0;
      let totalAmountPaying = applyGstAmount
        ? allSelectedProducts.reduce(
            (total, product) =>
              total +
              parseFloat(product.finalPrice) +
              parseFloat(product.totalGstAmount),
            0
          )
        : allSelectedProducts.reduce(
            (total, product) => total + parseFloat(product.finalPrice),
            0
          );
      let totalGoldPaying = allSelectedProducts.reduce(
        (total, product) =>
          total + product.FineGold ? parseFloat(product.FineGold) : 0,
        0
      );
      let totalSilverPaying = allSelectedProducts.reduce(
        (total, product) =>
          total + product.FineSilver ? parseFloat(product.FineSilver) : 0,
        0
      );

      setAllProdctsNetAmount(parseFloat(totalNetAmount).toFixed(3));
      setAllProductsFineGold(parseFloat(totalGoldPaying).toFixed(3));
      setAllProductsFineSilver(parseFloat(totalSilverPaying).toFixed(3));
      setTotalPayableGold(parseFloat(totalGoldPaying).toFixed(3));
      setTotalPayableSilver(parseFloat(totalSilverPaying).toFixed(3));
      setAllProdctsGstAmount(parseFloat(totalGstAmount).toFixed(3));
      setTotalPayableGstAmount(parseFloat(totalGstAmount).toFixed(3));
      setTotalPayableAmount(parseFloat(totalAmountPaying).toFixed(3));
      setGrandTotal(Math.ceil(parseFloat(totalAmountPaying)).toFixed(3));
      setPaymentAmount(Math.ceil(parseFloat(totalAmountPaying)).toFixed(0));
      if (Math.ceil(parseFloat(totalAmountPaying)).toFixed(0) < 0) {
        setPaymentType("Paid");
        setPaymentAmount((prev) => -prev);
      } else {
        setPaymentType("Receive");
      }
    } else {
      setAllProdctsNetAmount(0); // Reset the total to 0 when there are no selected products
      setAllProdctsGstAmount(0); // Reset the total to 0 when there are no selected products
      setTotalPayableGstAmount(0);
      setAllProductsFineGold(0);
      setAllProductsFineSilver(0);
      setTotalPayableGold(0);
      setTotalPayableSilver(0);
      setTotalPayableAmount(0);
      setGrandTotal(0);
      setDiscountAmount(0);
      setDiscountPercentage("0%");
      setPaymentAmount(0);
      setOldGoldAmount(0);
    }
  };
  useEffect(() => {
    calculateNetAmount();
  }, [selectedProduct, allSelectedProducts, applyGstAmount]);

  const handleProductDiscount = (e) => {
    const { value } = e.target;
    setDiscountAmount(value);
    setAllProdctsNetAmount((x) => x - value);
  };
  const recalculatePrices = () => {
    // Calculate individual product prices and update their properties
    const updatedProducts = allSelectedProducts.map((product) => {
      // Recalculate the price based on updated properties (e.g., grosswt, stoneWeight, etc.)
      const recalculatedProduct = calculateFinalPrice(product);

      return recalculatedProduct;
    });

    // Calculate the total net amount and total GST amount
    // setAllSelectedProducts(updatedProducts);
    // calculateNetAmount();

    // Update the state with the recalculated product list
    // setAllSelectedProducts(updatedProducts);
  };
  const changeTotalPrice = (e) => {
    const newTotalPayableAmount = parseInt(e.target.value);
    // console.log("TotalPayAmt", totalPayableAmount);
    // console.log("NewTotalPayAmt", newTotalPayableAmount);
    const perTotalPayableAmount = newTotalPayableAmount / 103;
    if (applyGstAmount) {
      setTotalPayableGstAmount((perTotalPayableAmount * 3).toFixed(3));
      setTotalPayableAmount(e.target.value);
      // setOldGoldAmount(0);
      setPaymentAmount(e.target.value);
      setPayments([]);
      setAllProdctsNetAmount((parseInt(e.target.value) * 100) / 103);

      let totalAmountPaying = allSelectedProducts.reduce(
        (total, product) =>
          total +
          parseFloat(product.finalPrice) +
          parseFloat(product.totalGstAmount),
        0
      );
      const totalMaking = allSelectedProducts.reduce(
        (total, item) => total + parseFloat(item.making),
        0
      );
      setDiscountAmount(parseInt(totalAmountPaying) - parseInt(e.target.value));
      setDiscountPercentage(
        parseFloat(
          ((parseFloat(totalAmountPaying) - parseFloat(e.target.value)) /
            parseFloat(totalMaking)) *
            100
        ).toFixed(2)
      );
      setGrandTotal(e.target.value);
      setDeductGold(0);
      setDeductSilver(0);
    } else {
      setTotalPayableGstAmount(0);
      setTotalPayableAmount(e.target.value);
      // setOldGoldAmount(0);
      setPaymentAmount(e.target.value);
      setPayments([]);
      setAllProdctsNetAmount((parseInt(e.target.value) * 100) / 100);

      let totalAmountPaying = allSelectedProducts.reduce(
        (total, product) => total + parseFloat(product.finalPrice),
        0
      );
      const totalMaking = allSelectedProducts.reduce(
        (total, item) => total + parseFloat(item.making),
        0
      );
      setDiscountAmount(parseInt(totalAmountPaying) - parseInt(e.target.value));
      setDiscountPercentage(
        parseFloat(
          ((parseFloat(totalAmountPaying) - parseFloat(e.target.value)) /
            parseFloat(totalMaking)) *
            100
        ).toFixed(2)
      );
      setGrandTotal(e.target.value);
    }
    // setDiscountAmount(
    //   (
    //     parseInt(allProdctsNetAmount) +
    //     parseInt(perTotalPayableAmount * 3) -
    //     parseInt(newTotalPayableAmount)
    //   ).toFixed(3)
    // );

    // setTotalPayableAmount(parseFloat(e.target.value));
    // setTotalPayableGstAmount(
    //   parseFloat(newTotalPayableAmount) +
    //     parseFloat(discountAmount) -
    //     parseFloat(allProdctsNetAmount)
    // );
  };
  const changeGrandTotal = (e) => {
    const { value } = parseInt(e.target);
    setOldGoldAmount(parseInt(value));
    // console.log("TotalPayAmt", totalPayableAmount);
    // console.log("NewTotalPayAmt", newTotalPayableAmount);
    setGrandTotal(
      parseInt(parseInt(totalPayableAmount) - parseInt(oldGoldAmount))
    );
    // setTotalPayableAmount(parseFloat(e.target.value));
    // setTotalPayableGstAmount(
    //   parseFloat(newTotalPayableAmount) +
    //     parseFloat(discountAmount) -
    //     parseFloat(allProdctsNetAmount)
    // );
  };
  const handleInputChange = (e, productId, property) => {
    const barcodeInput = document.getElementById("barcodeNumberInput");
    // barcodeInput.style.setProperty("color", "black");
    const { value } = e.target;
    // setBarCodeAlert(false);
    const updatedProducts = allSelectedProducts.map((product) => {
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
          updatedProduct.netWt = (parseFloat(value) - stoneWeight).toFixed(3);
          calculateFinalPrice(updatedProduct);
        }

        // If 'stoneWeight' is changed, calculate 'netWt'
        if (property === "stoneWeight" && !isNaN(value)) {
          if (value < grosswt) {
            updatedProduct.netWt = (grosswt - parseFloat(value)).toFixed(3);
          } else {
            (updatedProduct.netWt = 0), (updatedProduct.grosswt = value);
          }
        }

        // If 'netWt' is changed, calculate 'grosswt' and 'stoneWeight'
        if (property === "netWt" && !isNaN(value)) {
          let totalMakingCharges =
            parseFloat(updatedProduct.making_per_gram) +
            parseFloat(updatedProduct.making_Percentage) +
            parseFloat(updatedProduct.making_Fixed_Amt) +
            parseFloat(updatedProduct.making_Fixed_Wastage);
          updatedProduct.grosswt = (parseFloat(value) + stoneWeight).toFixed(3);
          updatedProduct.stoneWeight = (grosswt - parseFloat(value)).toFixed(3);
        }
        if (property === "mrp" && !isNaN(value)) {
          let totalMakingCharges =
            parseFloat(updatedProduct.making_per_gram) +
            parseFloat(updatedProduct.making_Percentage) +
            parseFloat(updatedProduct.making_Fixed_Amt) +
            parseFloat(updatedProduct.making_Fixed_Wastage);
          let GST = 0.03;
          //   updatedProduct.finalPrice = parseFloat(value).toFixed(3);
          (updatedProduct.finalPrice =
            parseFloat(updatedProduct.mrp) -
            parseFloat(updatedProduct.mrp).toFixed(3) * GST),
            (updatedProduct.making = 0);
          //   updatedProduct.totalGstAmount = 0;
          updatedProduct.totalGstAmount =
            parseFloat(updatedProduct.mrp).toFixed(3) * GST;
          //   updatedProduct.making = parseFloat(totalMakingCharges).toFixed(3);
          //   console.log(totalMakingCharges);
          //   updatedProduct.totalGstAmount = parseFloat(
          //     ((parseFloat(updatedProduct.mrp) + parseFloat(totalMakingCharges)) *
          //       GST) /
          //       100
          //   );
        }
        if (
          property === "netWt" ||
          property === "grossWt" ||
          property === "stoneWt" ||
          property === "making_per_gram" ||
          property === "making_Percentage" ||
          property === "making_Fixed_Amt" ||
          property === "making_Fixed_Wastage"
        ) {
          let netGoldRate =
            (parseFloat(updatedProduct.netWt) *
              parseFloat(updatedProduct.tblPurity.todaysRate)) /
            10;
          let makingCharges1 =
            parseFloat(updatedProduct.netWt) *
            parseFloat(updatedProduct.making_per_gram);
          let makingCharges2 =
            (parseFloat(netGoldRate) *
              parseFloat(updatedProduct.making_Percentage)) /
            100;
          let makingCharges3 = parseFloat(updatedProduct.making_Fixed_Amt);
          let hallmark_amt = parseFloat(updatedProduct.hallmark_amt);

          let makingCharges4 =
            (parseFloat(updatedProduct.tblPurity.todaysRate) *
              parseFloat(updatedProduct.making_Fixed_Wastage)) /
            10;
          let GST = 0.03;

          let grossTotalRate =
            parseFloat(netGoldRate) +
            parseFloat(makingCharges1) +
            parseFloat(makingCharges2) +
            parseFloat(makingCharges3) +
            parseFloat(makingCharges4) +
            parseFloat(updatedProduct.stoneAmount);
          let GSTAdded = parseFloat(GST) * parseFloat(grossTotalRate);
          let finalPrice = parseFloat(grossTotalRate) + parseFloat(GSTAdded);

          // Calculate total making charges
          let totalMakingCharges =
            parseFloat(makingCharges1) +
            parseFloat(makingCharges2) +
            parseFloat(makingCharges3) +
            parseFloat(makingCharges4);

          // console.log(netGoldRate, "netGoldRate");
          if (updatedProduct.mrp == 0 || updatedProduct.mrp == "") {
            updatedProduct.finalPrice = parseFloat(grossTotalRate).toFixed(3);
            updatedProduct.making = totalMakingCharges;
            updatedProduct.totalGstAmount = GSTAdded;
          }
          // Update selectedProduct with additional properties and calculated price

          setSelectedProduct(updatedProduct); // Update the selected product
          setSelectedProductPrice(parseFloat(finalPrice).toFixed(3));
        }
        return updatedProduct;
      }
      return product;
    });
    setAllSelectedProducts(updatedProducts);
  };
  //   useEffect(() => {
  //     recalculatePrices();
  //   }, [allSelectedProducts]);
  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, []);

  const checkPurchaseItems = () => {
    setLoading(true);
    if (purchaseProductList.length > 0) {
      // console.log("Items Available");
      addPurchaseOrderItems();
      // createOrder();
    } else if (unlabelProductList.length > 0) {
      updateUnlabelOrderItems();
    } else if (wholesaleProductList.length > 0) {
      // alert("Going for order");
      setGstType(false);
      createOrder(false);
    } else {
      createOrder(gstType);
    }
  };

  // CONTINUE FROM BELOW
  const addPurchaseOrderItems = async () => {
    try {
      const orderItemsList = purchaseProductList.map((product) => {
        return {
          CategoryName: `${product.CategoryName}`,
          ProductName: `${product.ProductName}`,
          GrossWt: `${product.GrossWt}`,
          NetWt: `${product.NetWt}`,
          TotalStoneWeight: `${product.TotalStoneWeight}`,
          GoldRate: `${product.GoldRate}`,
          FinePercent: `${product.FinePercent}`,
          NetAmt: `${product.NetAmt}`,
          GSTAmount: `${product.GSTAmount}`,
          TotalAmt: `${product.TotalAmt}`,
          Quantity: `${product.Quantity}`,
          PurchaseAmount: `${product.PurchaseAmount}`,
          // making_fixed_amt: `${product.making_Fixed_Amt}`,
          // making_fixed_wastage: `${product.making_Fixed_Wastage}`,
          // making_per_gram: `${product.making_per_gram}`,
          // making_percentage: `${product.making_Percentage}`,
          // hallmark_amt: "",
          // hallmark_no: "",
        };
      });
      console.log(orderItemsList, "orderItemsList");
      const response = await fetch(a53, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItemsList),
      });
      // console.log(orderItemsList, "orderItemsList");

      const rcvdData = await response.json();
      const purchaseProductsData = rcvdData.data;
      console.log(purchaseProductsData, "purchaseProductsData");
      // Set the state with order items
      if (rcvdData.status === "error") {
        alert(rcvdData.message);
      } else {
        purchaseProductList.forEach((product, index) => {
          product.id = purchaseProductsData[index].id;
          product.purchase_invoice_no =
            purchaseProductsData[index].purchase_invoice_no;
        });

        if (unlabelProductList.length > 0) {
          updateUnlabelOrderItems();
        } else if (labelProductList.length > 0) {
          createOrder(gstType);
          // alert("going for order");
        } else {
          setGstType(false);
          createOrder(false);
          // createPurchaseReceiptPDF(selectedCustomer, purchaseProductList);
        }
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const updateUnlabelOrderItems = async () => {
    try {
      // Map through unlabelProductList and update the corresponding item in allUnlabelList
      const updatedUnlabelItems = unlabelProductList.map((product) => {
        // Find the corresponding item in allUnlabelList based on id
        const filteredUnlabelItem = allUnlabelList.find(
          (x) => x.Id === product.Id
        );

        if (filteredUnlabelItem) {
          // Subtract quantities and other properties from filteredUnlabelItem
          filteredUnlabelItem.TotalGrossWt = (
            parseFloat(filteredUnlabelItem.TotalGrossWt) -
            parseFloat(product.GrossWt)
          ).toFixed(3);
          filteredUnlabelItem.TotalStoneWeight = (
            parseFloat(filteredUnlabelItem.TotalStoneWeight) -
            parseFloat(product.TotalStoneWeight)
          ).toFixed(3);
          filteredUnlabelItem.TotalNetWt = (
            parseFloat(filteredUnlabelItem.TotalNetWt) -
            parseFloat(product.NetWt)
          ).toFixed(3);
          filteredUnlabelItem.quantity = (
            parseInt(filteredUnlabelItem.Quantity) - parseInt(product.Quantity)
          ).toString();
        }

        return filteredUnlabelItem; // Updated unlabel item
      });

      // Filter out null or undefined items (in case any item was not found in allUnlabelList)
      const validUnlabelItems = updatedUnlabelItems.filter((item) => item);
      console.log(validUnlabelItems[0], "validUnlabelItems[0]");
      // Send the updated unlabel item to the API
      const response = await fetch(a57, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validUnlabelItems[0]), // Assuming you're updating only one item
      });

      const rcvdData = await response.json();
      console.log(rcvdData, "Unlabel hit");
      if (rcvdData.status === "error") {
        alert(rcvdData.Message);
      } else {
        createOrder(gstType);
      }
      // else if (labelProductList.length > 0) {
      //   createOrder(gstType);
      // }
      //  else {
      //   setGstType(false);
      //   createOrder(false);

      // }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  // const createPurchaseReceiptPDF = (csData, purchaseItems) => {
  //   console.log(csData, "csData");
  //   console.log(csData, "csData");
  //   console.log(csData, "csData");
  //   console.log(purchaseItems, "purchaseItems");
  //   console.log(purchaseItems, "purchaseItems");
  //   console.log(purchaseItems, "purchaseItems");
  //   const doc = new jsPDF();

  //   const lineHeight = 10;
  //   let y = 10;

  //   // Title
  //   doc.setFontSize(16);
  //   doc.text("SHREE SAIRATNA JEWELLERS", 105, y, { align: "center" });
  //   y += lineHeight;

  //   // Contact Information
  //   doc.setFontSize(10);
  //   doc.text("E-mail: anandrathod24@gmail.com", 105, y, { align: "center" });
  //   y += lineHeight;
  //   doc.text("SHOP NO 2, NEAR RAM MANDIR MAHIM ROAD, PALGHAR- 401404", 105, y, {
  //     align: "center",
  //   });
  //   y += lineHeight;
  //   doc.text("MOB: 91 8087210208 PH - 02525-252099", 105, y, {
  //     align: "center",
  //   });
  //   y += 2 * lineHeight;

  //   // Customer Information
  //   doc.text(`NAME - SHRI/SMT/MS: ${csData.firstName}`, 10, y);
  //   y += lineHeight;
  //   doc.text(`MOBILE NO.: ${csData.mobile}`, 10, y);
  //   y += lineHeight;
  //   doc.text(`ADDRESS: ${csData.currAddState}`, 10, y);
  //   y += 2 * lineHeight;

  //   // Table Headers
  //   doc.setFontSize(12);
  //   doc.text("SR NO.", 10, y);
  //   doc.text("PARTICULARS", 30, y);
  //   doc.text("PRODUCT WT", 80, y);
  //   doc.text("FINE WT", 110, y);
  //   doc.text("QTY", 140, y);
  //   doc.text("AMOUNT", 170, y);
  //   y += lineHeight;

  //   // Table Rows
  //   doc.setFontSize(10);
  //   purchaseItems.forEach((item, index) => {
  //     const indexString = (index + 1).toString();
  //     const categoryName = item.categoryName
  //       ? item.categoryName.toString()
  //       : "";
  //     const productName = item.productname ? item.productname.toString() : "";
  //     const finePercent = item.Finepercent ? item.Finepercent.toString() : "";
  //     const goldRate = item.GoldRate ? item.GoldRate.toString() : "";
  //     const purchaseAmount = item.PurchaseAmount
  //       ? item.PurchaseAmount.toString()
  //       : "";

  //     doc.text(indexString, 10, y);
  //     doc.text(categoryName, 30, y);
  //     doc.text(productName, 80, y);
  //     doc.text(finePercent, 110, y);
  //     doc.text(goldRate, 140, y);
  //     doc.text(purchaseAmount, 170, y);
  //     y += lineHeight;
  //   });
  //   // Total
  //   doc.setFontSize(12);
  //   doc.text("Total Amount", 140, y);
  //   // doc.text(csData.totalAmount, 170, y);
  //   y += 2 * lineHeight;

  //   // Footer
  //   doc.setFontSize(10);
  //   // doc.text(`DATE: ${new Date(csData.createdOn)}`, 10, y);
  //   // doc.text(`PURCHASE BILL NO.: ${csData.purchase_invoice_no}`, 100, y);
  //   y += lineHeight;
  //   doc.text("CUSTOMER SIGN", 10, y);
  //   doc.text("For Shree Sairatna Jewellers", 150, y);

  //   // Save the PDF
  //   const pdfBlob = doc.output("blob");
  //   const pdfUrl = URL.createObjectURL(pdfBlob);
  //   window.open(pdfUrl, "_blank");
  // };

  // Example usage:

  const createOrder = async (gstType) => {
    console.log(allSelectedProducts[0], "firstPro");
    const getTodaysDateInHTMLFormat = () => {
      const today = new Date();
      const year = today.getFullYear();
      // Pad the month and day with a leading zero if they are less than 10
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const newAllSelectedProducts = allSelectedProducts.map((x) => {
      return {
        ...x,
        CustomerId: selectedCustomer.Id,
        PurProductId: 0,
        UnlProductId: x.unlabel ? parseInt(x.SelectedUnlabelId) : 0,
        SKUId: 0,
        BillType: x.sell
          ? "sale"
          : x.purchase
          ? "purchase"
          : x.unlabel
          ? "unlabelled"
          : "",
        LabelledStockId: x.sell ? x.Id : 0,
      };
    });

    const totalGrossWt = allSelectedProducts.reduce(
      (a, b) => a + parseFloat(b.GrossWt ? b.GrossWt : 0).toFixed(3),
      0
    );
    const totalNetWt = allSelectedProducts.reduce(
      (a, b) => a + parseFloat(b.NetWt ? b.NetWt : 0).toFixed(3),
      0
    );
    const totalQuantity = allSelectedProducts.reduce(
      (a, b) => a + parseFloat(b.Quantity ? b.Quantity : 0).toFixed(3),
      0
    );
    const totalStoneWt = allSelectedProducts.reduce(
      (a, b) =>
        a + parseFloat(b.TotalStoneWeight ? b.TotalStoneWeight : 0).toFixed(3),
      0
    );

    // Determine the date to send
    const dateToSend = selectedDate || getTodaysDateInHTMLFormat();

    try {
      const formData = {
        ClientCode: clientCode,
        CustomerId: selectedCustomer.Id,
        // Product_id: allSelectedProducts[0].id,
        // Qty: `${allSelectedProducts.length()}`,
        // Price: `${Math.ceil(
        //   parseFloat(allProdctsNetAmount) + parseFloat(allProdctsGstAmount)
        // )}`,
        // Price: `${parseFloat(totalPayableAmount).toFixed(2)}`,
        TotalAmount: `${Math.ceil(totalPayableAmount).toFixed(2)}`,
        Billedby: `${selectedCashierEmployee}`,
        SaleType: "Sale",
        Soldby: `${selectedSalesEmployee}`,
        PaymentMode: `${paymentsString}`,
        UrdPurchaseAmt: `${parseFloat(oldGoldAmount).toFixed(3)}`,
        GST: `${parseFloat(totalPayableGstAmount).toFixed(3)}`,
        // ReceivedAmt: Math.ceil(parseFloat(totalPaidAmount)),
        ReceivedAmount: parseFloat(totalPaidAmount).toFixed(2),
        InvoiceStatus:
          wholesaleProductList.length > 0 ? "Invoice Created" : "Delivered",
        Visibility: gstType ? "Visible" : "Hidden",
        // CategoryName: `${
        //   allSelectedProducts[0].purchase == true ||
        //   allSelectedProducts[0].unlabel == true ||
        //   allSelectedProducts[0].order == true
        //     ? allSelectedProducts[0].CategoryName
        //     : allSelectedProducts[0].category_Name
        // }`,
        Offer: `${discountAmount}`,
        TotalAmount: `${parseFloat(allProdctsNetAmount).toFixed(3)}`,
        BillType: `${gstType}`,
        InvoiceDate: `${dateToSend}`,
        // BalanceAmt: `${Math.ceil(
        //   parseFloat(totalPayableAmount).toFixed(2) -
        //     parseFloat(totalPaidAmount).toFixed(2)
        // ).toFixed(2)}`,
        BalanceAmt: `${parseInt(grandTotal)}`,
        CreditAmount: "0",
        CreditGold: "0",
        CreditSilver: "0",
        GrossWt: `${totalGrossWt}`,
        NetWt: `${totalNetWt}`,
        StoneWt: `${totalStoneWt}`,
        Qty: `${totalQuantity}`,
        // BalanceAmt: `${
        //   totalPayableAmount < 0 ? parseInt(-grandTotal) : parseInt(grandTotal)
        // }`,
        TotalDiamondAmount: "0",
        TotalDiamondPieces: "0",
        TotalDiamondWeight: "0",
        TotalSaleGold: "0",
        TotalSaleSilver: "0",
        TotalSaleUrdGold: "0",
        TotalSaleUrdSilver: "0",
        TotalStoneAmount: "0",
        TotalStonePieces: "0",
        TotalStoneWeight: "0",

        BalanceGold: "0",
        BalanceSilver: "0",
        OrderType: pendingApproval
          ? "Pending Approval"
          : !pendingApproval && !applyGstAmount
          ? "Estimate"
          : "Tax Invoice",

        InvoiceItem: newAllSelectedProducts,
      };

      console.log(formData, "FORMDATA FOR ORDER");
      const response = await fetch(a201, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const rcvdData = await response.json();
      const orderData = rcvdData;
      // setOrderId(orderData.id);
      setOrderCsData(rcvdData);
      console.log(rcvdData, "1st hit");
      // createOrderItems(rcvdData.data.id);
      if (rcvdData.status === "error") {
        // setLoading(false);
        alert(rcvdData.message); // Show error message
      } else {
        // setLoading(false);
        console.log(rcvdData, "InvoiceCreated");
        // createOrderItems(rcvdData.id, rcvdData);
      }
    } catch (error) {
      alert(error);
      console.error(error);
      //   setLoading(false);
    }
  };
  const createOrderItems = async (rcvdId, x) => {
    try {
      const orderItemsList = allSelectedProducts.map((product) => {
        let item = {
          BillType: "sale",
          OrderId: rcvdId,
          CategoryName: `${product.Cate}`,
          MRP: `${product.mrp}`,
          ProductId: product.id,
          CustomerId: parseInt(customerId),
          ProductName: product.ProductName,
          Quantity: "1",
          TotalStoneWeight: product.TotalStoneWeight,
          HSNCode: `${product.HSNCode}` || "",
          // ItemCode: product.itemCode,
          GrossWt: product.GrossWt,
          MakingFixedAmt: product.MakingFixedAmt,
          MakingFixedWastage: product.MakingFixedWastage,
          MakingPerGram: product.MakingPerGram,
          MakingPercentage: product.MakingPercentage,
          HallmarkAmount: product.HallmarkAmount,
          ProductCode: "",
          ProductNo: "",
          NetWt: product.NetWt,
          StoneAmount: product.StoneAmount,
          TotalStoneAmount: product.TotalStoneAmount,
          PurityId: product.PurityId ? product.PurityId : 0,
          MakingCharg: `${product.making}`,
          MetalRate: `${product.TodaysRate}`,
          HUIDCode: product.HUIDCode,
          Size: product.Size,
          GrossWt: product.GrossWt,
          WastageWt: `${product.MakingFixedWastage}`,
          OnlineStatus: "Billed",
          Price: `${(
            parseFloat(product.finalPrice) + parseFloat(product.totalGstAmount)
          ).toFixed(3)}`,
        };
        if (product.sell) {
          item.ItemCode = product.ItemCode;
        }
        if (product.purchase) {
          item.PurchaseInvoiceNo = product.PurchaseInvoiceNo;
        }
        if (product.purchase) {
          item = {
            ...item,
            BillType: "purchase",
            ProductName: product.ProductName,
            CategoryName: product.CategoryName,
            MRP: product.MRP,
            Quantity: `${product.Quantity}`,
            StoneWeight: product.TotalStoneWeight,
            StoneAmount: product.StoneAmount,
            WastageWt: "0",
            PurchaseEntryNo: "",
            PurProductId: 0,
            FinePercentage: `${product.FinePercent}`,
            PurProductAmt: `${(
              parseFloat(product.finalPrice) +
              parseFloat(product.totalGstAmount)
            ).toFixed(3)}`,
            // Add additional properties or modify existing properties for products with purchase = true
          };
        }

        if (product.unlabel) {
          item = {
            ...item,
            BillType: "unlabelled",

            StoneAmount: "0",
            ProductId: product.Id,
            CategoryName: product.CategoryName,
            ProductName: product.ProductName,
            // ItemCode:"",
            MRP: "",
            Quantity: `${product.Quantity}`,
            MakingFixedAmt: product.MakingFixedAmt,
            MakingFixedWastage: product.MakingFixedWastage,
            MakingPerGram: product.MakingPerGram,
            MakingPercentage: product.MakingPercentage,
            HallmarkAmount: product.HallmarkAmount,
            StoneWeight: product.TotalStoneWeight,
            HSNCode: "",
            GrossWt: product.GrossWt,
            NetWt: product.NetWt,
            Purity: product.PurityId ? product.PurityId : 0,
            MakingCharg: `${product.making}`,
            MetalRate: `${product.GoldRate}`,
            HUIDCode: product.huidCode || "",
            Size: product.size || "",
            TotalWt: product.grosswt,
            WastageWt: product.making_Fixed_Wastage,
            UnlProductId: product.Id,
            UnlProductAmt: `${(
              parseFloat(product.finalPrice) +
              parseFloat(product.totalGstAmount)
            ).toFixed(3)}`,
            // Add additional properties or modify existing properties for products with purchase = true
          };
        }
        if (product.order) {
          item = {
            // ...item,
            BillType: "wholesale",
            OrderId: rcvdId,
            StoneAmount: product.stoneAmount,
            ProductId: 0,
            CategoryName: product.CategoryName,
            ProductName: product.collectionName,
            Customer_Id: parseInt(customerId),
            // ItemCode:"",
            MRP: `${product.mrp}`,
            Quantity: `${product.Quantity}`,
            making_fixed_amt: product.making_Fixed_Amt,
            making_fixed_wastage: product.making_Fixed_Wastage,
            making_per_gram: product.making_per_gram,
            making_percentage: product.making_Percentage,
            hallmark_amt: product.hallmark_amt,
            StoneWeight: product.stoneWeight,
            HSNCode: `${product.hsn_code}` || "",
            grosswt: product.grosswt,
            NetWt: product.netwt,
            Purity: product.purity,
            makingchrg: `${product.making}`,
            Rate: `${product.GoldRate}`,
            HUIDCode: product.huidCode || "",
            Size: product.size || "",
            TotalWt: product.grosswt,
            WastageWt: product.making_Fixed_Wastage,
            price: `${(
              parseFloat(product.finalPrice) +
              parseFloat(product.totalGstAmount)
            ).toFixed(3)}`,
            // Add additional properties or modify existing properties for products with purchase = true
          };
        }

        return item;
      });
      console.log(orderItemsList, "orderItemsList to send");
      const response = await fetch(a49, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItemsList),
      });

      const rcvdData = await response.json();
      const orderData = rcvdData;
      console.log(orderData, "rcvd orderData");

      // Set the state with order items
      setOrderItemsData(orderData);
      setOrderItems(orderData);

      if (rcvdData.status === "error") {
        alert(rcvdData.message);
      } else {
        // Generate bill PDF after setting the state
        // generateBillPDF(rcvdData.data, x);
        // resetAllFields();
        // window.scrollTo(0, 0);
        addAllSelectedPayments(rcvdData, x, rcvdId);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  const currentYear = new Date().getFullYear();
  const addAllSelectedPayments = async (dataRcvd, x, rcvdId) => {
    try {
      const paymentsList = payments.map((payment) => {
        let item = {
          PaymentSource: "Sale Bill",
          Description: payment.paymentDescription,
          PaymentModeType: `${payment.mode}`,
          CreditDebit: "Credit",
          Amount: `${payment.amount}`,
          // TransactionType: `${payment.paymentType}`,
          TransactionType: "Receive",
          SupplierId: 0,
          InvoiceNumber: x.invoiceNo ? `${x.invoiceNo}` : "",
          CustomerId: parseInt(customerId),
          BillType: "sale",
          PaymentVisibility: "Active",
          financialYear: `${currentYear}`,
          Branch: "Home",
          // FineGold: `${payment.fineGold}`,
          // FineSilver: `${payment.fineSilver}`,
          // SilverRate: `${payment.silverRate}`,
          // GoldRate: `${payment.goldRate}`,
          // SilverAmount: `${payment.goldAmount}`,
          // GoldAmount: `${payment.silverAmount}`,
          // OldGoldGrosswt: `${payment.fineGold}`,
          // OldSilverGrosswt: `${payment.fineSilver}`,
          FineGold: "0",

          FineSilver: "0",
          SilverRate: "0",
          GoldRate: "0",
          SilverAmount: "0",
          GoldAmount: "0",
          OldGoldGrosswt: "0",
          OldSilverGrosswt: "0",
          GoldPurity: "0",
          SilverPurity: "0",
          PurchaseOrderId: 0,
          OrderId: parseInt(rcvdId),
          CustomerName: `${selectedCustomer.FirstName} ${selectedCustomer.LastName}`,
          SupplierName: "",
          InwardNo: "",
          Status: "Receive",
        };

        return item;
      });
      console.log(paymentsList, "paymentsList to send");
      const response = await fetch(a74, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentsList),
      });

      const rcvdData = await response.json();
      const paymentsData = rcvdData.data;
      console.log(paymentsData, "3rd Hit payment modes created");

      if (rcvdData.status === "error") {
        alert(rcvdData.message);
      } else {
        if (
          labelProductList.length <= 0 &&
          unlabelProductList.length <= 0 &&
          wholesaleProductList.length <= 0
        ) {
          createPurchaseReceiptPDF(dataRcvd, x);
        } else {
          generateBillPDF(dataRcvd, x);
        }
        resetAllFields();
        window.scrollTo(0, 0);
        // setSelectedSupplier(null);
        // fetchAllPurchaseData();
        // setPayments([]);
        // setPaymentAmount(0);
        // setAllPurchaseData([]);
        // setSelectedPurchaseInvoices([]);
        // setAllPurchaseData([]);
        // Generate bill PDF after setting the state
        // generateBillPDF(rcvdData.data, x);
        // resetAllFields();
        // addAllSelectedPayments()
        window.scrollTo(0, 0);
      }
    } catch (error) {
      alert(error);
      console.error(error);
    }
    setLoading(false);
  };
  // console.log(orderCsData, "orderCsData");
  // Bill format for Sk Khandre

  // Soni Jewellers Bill Below
  // const generateBillPDF = (x, csData) => {
  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     // format: "a5",
  //     format: [160, 235],
  //   });

  //   doc.setDrawColor(0, 0, 0);
  //   doc.setFontSize(11);
  //   doc.setFont("times");
  //   doc.text("Tax Invoice", 70, 42);
  //   doc.setFontSize(9);
  //   doc.text("GST:21AGAPS4855P1ZZ", 5, 42);
  //   doc.setFont("times");
  //   // doc.text("GST-No-27BBKPK5411K1ZI", 100, 35);
  //   let y = 50; // Adjust starting Y position
  //   const columnWidth = 15; // Adjust column widths for A5
  //   const contentWidth = 120; // Adjust content width for A5
  //   let srNo = 1;
  //   let pGSrNo = 1;
  //   let pSSrNo = 1;
  //   let totalOldGoldAmount = 0;
  //   let totalOldNotGoldAmount = 0;
  //   const bulletPoint = "\u2022";

  //   const purchaseItems = x.filter(
  //     (product) => product.billtype === "purchase"
  //   );
  //   console.log(x, "x");
  //   if (csData) {
  //     doc.text(`Mobile - ${csData.tblCustomerDetails.mobile}`, 5, y);
  //     doc.text(
  //       `Name - ${csData.tblCustomerDetails.firstName} ${csData.tblCustomerDetails.lastName}`,
  //       5,
  //       y + 5
  //     );
  //     doc.text(
  //       `Address - ${csData.tblCustomerDetails.currAddStreet} ${csData.tblCustomerDetails.currAddTown} ${csData.tblCustomerDetails.currAddState} ${csData.tblCustomerDetails.currAddPinCode}`,
  //       5,
  //       y + 10
  //     );
  //     doc.text(`Invoice No - ${csData.invoiceNo}`, 105, y);
  //     doc.text(
  //       `Date - ${new Date(csData.createdOn).toLocaleDateString()}`,
  //       105,
  //       y + 5
  //     );
  //     doc.text(`Email - ${csData.tblCustomerDetails.email}`, 105, y + 10);
  //     doc.text(`Pan Card - ${csData.tblCustomerDetails.panNo}`, 5, y + 15);
  //     doc.text(`Gst No - ${csData.tblCustomerDetails.gstNo}`, 105, y + 15);
  //   }

  //   doc.line(5, y + 20, 155, y + 20);
  //   y = 75;
  //   doc.setFontSize(8);
  //   doc.text("No", 6, y);
  //   doc.text("Items", 12, y);
  //   doc.text("HSN", 65, y);
  //   doc.text("Pc/Pr", 75, y);
  //   doc.text("Purity", 85, y);
  //   doc.text("Grs.Wt", 95, y);
  //   doc.text("Net.Wt", 107, y);
  //   doc.text("Rate", 119, y);
  //   doc.text("Other", 130, y);
  //   // doc.text("Labour", 145, y);
  //   doc.text("Price", 145, y);
  //   doc.text("(incl MC)", 145, y + 3);
  //   doc.line(5, y + 6, 155, y + 6);

  //   const maxPageHeight = doc.internal.pageSize.height - 20;
  //   y += 10;
  //   doc.setFontSize(8);
  //   let soldProducts = x.filter((product) => product.billtype !== "purchase");

  //   soldProducts.forEach((item) => {
  //     if (y + 8 > doc.internal.pageSize.height - 10) {
  //       doc.addPage();
  //       y = 10; // Reset Y position for the new page
  //     }

  //     doc.text(srNo.toString(), 6, y);
  //     const productName =
  //       item.productName && item.productName.length > 15
  //         ? item.productName.substring(0, 12) + "..."
  //         : item.productName;

  //     doc.text(productName ? productName : "-", 12, y);
  //     doc.setFontSize(6);
  //     doc.setFont("times", "bold");
  //     doc.text(
  //       item.hallmark_amt ? `Hallmark amt-${item.hallmark_amt}` : "",
  //       12,
  //       y + 3
  //     );
  //     doc.setFont("times", "normal");
  //     doc.setFontSize(8);
  //     doc.text(
  //       item.hsnCode && item.hsnCode !== "null" && item.hsnCode !== "undefined"
  //         ? item.hsnCode
  //         : "-",
  //       65,
  //       y
  //     );
  //     doc.setFontSize(6);
  //     doc.setFont("times", "bold");
  //     doc.text(item.huidCode ? `UID-${item.huidCode}` : "", 70, y + 3);
  //     doc.setFontSize(8);
  //     doc.setFont("times", "normal");
  //     doc.text(item.quantity !== "null" ? item.quantity : "-", 75, y);
  //     doc.text(item.purity ? item.purity : "-", 85, y);
  //     doc.text(item.grosswt ? item.grosswt : "-", 95, y);
  //     doc.text(item.netWt ? item.netWt : "-", 107, y);
  //     doc.text(item.rate ? item.rate : "-", 119, y);
  //     doc.text(
  //       parseFloat(
  //         (parseFloat(item.rate) / 10) * parseFloat(item.netWt)
  //       ).toFixed(2),
  //       130,
  //       y
  //     );
  //     const price =
  //       item.billtype !== "purchase"
  //         ? ((parseFloat(item.price) * 100) / 103).toFixed(2)
  //         : parseFloat(item.price).toFixed(2);
  //     const makingCharges = [
  //       item.making_fixed_amt,
  //       item.making_fixed_wastage,
  //       item.making_per_gram,
  //       item.making_percentage,
  //     ];

  //     // Filter out null, empty, or zero making charges
  //     const validMakingCharges = makingCharges.filter(
  //       (charge) => charge !== null && parseInt(charge) !== 0
  //     );

  //     // Choose making charge(s) based on the number of valid charges
  //     let makingChargeText = "";
  //     if (validMakingCharges.length > 1) {
  //       makingChargeText = `${parseFloat(item.makingchrg).toFixed(0)}`;
  //     } else if (
  //       item.making_percentage !== null &&
  //       parseInt(item.making_percentage) !== 0
  //     ) {
  //       makingChargeText = `${parseFloat(item.making_percentage).toFixed(0)}%`;
  //     } else if (
  //       item.making_per_gram !== null &&
  //       parseInt(item.making_per_gram) !== 0
  //     ) {
  //       makingChargeText = `${parseFloat(item.making_per_gram).toFixed(0)}/Gm`;
  //     } else if (validMakingCharges.length === 1) {
  //       makingChargeText = `${parseFloat(validMakingCharges[0]).toFixed(0)}`;
  //     } else {
  //       makingChargeText = `${parseFloat(item.makingchrg).toFixed(0)}`;
  //     }

  //     // Add making charge to PDF
  //     // doc.text(makingChargeText, 145, y);
  //     // doc.text("0.00", 115, y);
  //     doc.text(price, 145, y);
  //     srNo++;
  //     y += 8;
  //   });

  //   doc.line(5, y - 3, 155, y - 3);
  //   y += 10;
  //   doc.setFontSize(7);
  //   if (purchaseItems.length > 0) {
  //     doc.line(10, y - 4, 75, y - 4);
  //     y += 0;
  //     doc.text("Item", 11, y);
  //     doc.text("Inv No", 36, y);
  //     doc.text("Amount", 61, y);
  //     doc.line(10, y - 4, 10, y + 2);
  //     doc.line(35, y - 4, 35, y + 2);
  //     doc.line(60, y - 4, 60, y + 2);
  //     doc.line(75, y - 4, 75, y + 2);

  //     y += 4;
  //     doc.line(10, y - 3, 75, y - 3);

  //     purchaseItems.forEach((product) => {
  //       y += 4;
  //       doc.line(10, y - 6, 10, y + 2);
  //       doc.line(35, y - 6, 35, y + 2);
  //       doc.line(60, y - 6, 60, y + 2);
  //       doc.line(75, y - 6, 75, y + 2);
  //       doc.text(product.productName || "N/A", 11, y);
  //       // doc.text(parseFloat(product.netWt).toFixed(3) || "0", 41, y);
  //       doc.text(product.purchase_invoice_no || "0", 36, y);
  //       doc.text((parseFloat(product.price) * -1).toFixed(0) || "0", 61, y);
  //     });

  //     y += 5;
  //     doc.line(10, y - 3, 75, y - 3);
  //   }

  //   let paymentModes = csData.paymentMode ? csData.paymentMode.split(",") : [];
  //   doc.setFontSize(9);
  //   y += 10;
  //   doc.text(`Payment Mode`, 10, y);
  //   let yPaymentModes = y + 5;
  //   paymentModes.forEach((paymentMode) => {
  //     if (yPaymentModes > maxPageHeight - 10) {
  //       doc.addPage();
  //       yPaymentModes = 5;
  //     }
  //     const [mode, amount] = paymentMode.split(":");
  //     doc.text(`${mode}`, 10, yPaymentModes);
  //     doc.text(`${amount}`, 10 + columnWidth, yPaymentModes);
  //     yPaymentModes += 5;
  //   });

  //   let totalSaleAmount = soldProducts.reduce((total, product) => {
  //     return total + parseFloat((parseFloat(product.price) * 100) / 103 || 0);
  //   }, 0);

  //   let payableGst = parseFloat(totalSaleAmount) * 0.03;

  //   y += 0;
  //   doc.text(`Sales Amount:`, 110, y);
  //   doc.text(`${parseFloat(totalSaleAmount).toFixed(2)}`, 140, y);
  //   doc.text(`CGST 1.5%:`, 110, y + 5);
  //   doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 140, y + 5);
  //   doc.text(`SGST 1.5%:`, 110, y + 10);
  //   doc.text(`${parseFloat(payableGst).toFixed(2) / 2}`, 140, y + 10);
  //   doc.text(`R.O./Discount:`, 110, y + 15);
  //   doc.text(`${csData.offer}`, 140, y + 15);
  //   doc.text(`Purchase Amount (-):`, 110, y + 20);
  //   doc.text(`${parseFloat(csData.purchaseAmt).toFixed(2)}`, 140, y + 20);
  //   doc.text(`Recieved Amount:`, 110, y + 25);
  //   doc.text(`${parseFloat(csData.receivedAmt).toFixed(2)}`, 140, y + 25);
  //   doc.text(`Total:`, 110, y + 30);
  //   doc.text(`${parseFloat(csData.price).toFixed(2)}`, 140, y + 30);

  //   let totalAmountInWords = numberToIndianWords(
  //     parseFloat(csData.price).toFixed(0)
  //   );
  //   doc.text(`Total in Words: ${totalAmountInWords} Only`, 10, y + 40);

  //   let footerY = doc.internal.pageSize.height - 10;
  //   doc.setFontSize(8);
  //   // doc.text("Raja Bazar, P.O. Jatni-752050, Khordha (Odisha)", 10, footerY);
  //   // doc.text("Phone Number: 0674-2492089 ", 10, footerY + 4);
  //   // doc.text("Mobile / Whatsapp: +91 7978114496 ", 10, footerY + 8);
  //   doc.text("TERM AND CONDITION", 10, footerY - 35);
  //   doc.text(
  //     `${bulletPoint} We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct`,
  //     10,
  //     footerY - 30
  //   );
  //   doc.text(
  //     `${bulletPoint} The registration certificate is valid on the date of issue of this invoice`,
  //     10,
  //     footerY - 26
  //   );
  //   doc.text(
  //     `${bulletPoint} Goods once sold can be exchanged only if returned unused within 7 days`,
  //     10,
  //     footerY - 22
  //   );
  //   doc.text(
  //     `${bulletPoint} Weight and pieces verified and found Ok`,
  //     10,
  //     footerY - 18
  //   );
  //   doc.text(
  //     `${bulletPoint} All disutes are Subject to Bhubaneswar jurisidiction only`,
  //     10,
  //     footerY - 14
  //   );

  //   doc.setFontSize(9);
  //   doc.text("Customer Signature", 10, footerY);
  //   doc.text(`Bill By - ${csData.billedby} `, 55, footerY - 5);
  //   doc.text(`Sold By - ${csData.soldby} `, 55, footerY);
  //   doc.text("For Soni Jewellers", 125, footerY);

  //   const pdfBlob = doc.output("blob");
  //   const pdfUrl = URL.createObjectURL(pdfBlob);
  //   window.open(pdfUrl, "_blank");
  // };
  // useEffect(() => {
  //   if (orderItems.length > 0) {
  //     generateBillPDF(orderItems);
  //   }
  // }, [orderItems]);
  function showPDFWithId(id) {
    // Make the API POST request with the ID
    fetch(a51, {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.blob()) // Convert response to Blob
      .then((blob) => {
        // Create a URL for the Blob object
        const pdfUrl = URL.createObjectURL(blob);

        // Open the PDF in a new window or tab
        window.open(pdfUrl, "_blank");
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const scrollToCenter = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const handleCustomerInputChange = (e, property) => {
    const updatedUserDetails = {
      ...selectedCustomer,
      [property]: e.target.value,
    };

    setSelectedCustomer(updatedUserDetails);
    // fetchAllCustomers();
    // console.log(selectedCustomer);
  };
  const handleNewCustomerInputChange = (e, property) => {
    const updatedUserDetails = {
      ...newCustomerFields,
      [property]: e.target.value,
    };

    setNewCustomerFields(updatedUserDetails);
    // fetchAllCustomers();
    // console.log(newCustomerFields);
  };
  const updateCustomerDetails = async () => {
    let updatedCustomer = selectedCustomer;
    updatedCustomer.ClientCode = clientCode;
    try {
      const response = await fetch(a190, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCustomer),
      });
      const data = await response.json();
      // console.log(data, "selected Cs");
      //   alert("updated cs");
      setSelectedCustomer(data);
      fetchAllCustomers();
      setSelectedCustomerEdit(false);
      scrollToCenter("adminInvoiceAddCustomerTitle");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  //   console.log(selectedCustomer, "selectedCustomer");
  //   console.log(customerMobile, "customerMobile");
  const checkIfNewCs = () => {
    if (customerMobile.length > 7 && !selectedCustomer) {
      addNewCustomerData();
    } else {
      alert(
        "Either Customer mobile should be greater than 8 char / customer already exists "
      );
    }
  };
  const addNewCustomerData = async () => {
    // e.preventDefault();
    const formData = {
      FirstName: customerName,
      LastName: "",
      Email: customerEmail ? customerEmail : `${customerMobile}@example.com`,
      Password: customerMobile,
      Mobile: customerMobile,
      CurrAddStreet: customerAddress ? customerAddress : ``,
      CurrAddTown: "",
      CurrAddState: "Maharashtra",
      CurrAddPinCode: "",
      PerAddStreet: customerAddress ? customerAddress : ``,
      PerAddTown: "",
      PerAddState: "",
      PerAddPinCode: "",
      AdvanceAmount: "0",
      BalanceAmount: "0",
      FineGold: "0",
      FineSilver: "0",
      Discount: "0",
      CreditPeriod: "0",
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a189, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.Message === "email already exist") {
        alert("email already exist"); // setAlertType("Email Already Exists, Try Login or use another email");
      } else {
        // alert("added Successfully");
        setSelectedCustomerEdit(false);
        setSelectedCustomer(data);
        // console.log(data, "newCsData");
      }
    } catch (error) {
      console.error(error);
      alert("fail");
      alert();
    }
  };
  const editDiscountPrices = () => {
    setDiscountAmount(0);
    let totalAmountPaying = allSelectedProducts.reduce(
      (total, product) =>
        total +
        parseFloat(product.finalPrice) +
        parseFloat(product.totalGstAmount),
      0
    );
    let amountToDeduct =
      parseFloat(totalAmountPaying) - parseFloat(totalPayableAmount);

    let totalAdjustment = 0;
    let updatedProductList = [...allSelectedProducts];
    // Check if there are products with non-zero MRP
    if (allSelectedProducts.some((x) => x.mrp !== 0)) {
      // Sort products by descending MRP
      updatedProductList.sort((a, b) => b.mrp - a.mrp);

      // Deduct amount from products in descending order of MRP
      for (let i = 0; i < updatedProductList.length; i++) {
        if (amountToDeduct > 0) {
          const deduction = Math.min(amountToDeduct, updatedProductList[i].mrp);
          updatedProductList[i].mrp -= deduction;
          updatedProductList[i].finalPrice = (
            (updatedProductList[i].mrp * 100) /
            103
          ).toFixed(2);
          updatedProductList[i].totalGstAmount = (
            (updatedProductList[i].mrp * 3) /
            103
          ).toFixed(2);
          totalAdjustment += deduction;
          amountToDeduct -= deduction;
        } else {
          break;
        }
      }
    }

    // Distribute any remaining amount among the products
    if (amountToDeduct > 0 && updatedProductList.length > 0) {
      const totalOriginalAmount = updatedProductList.reduce(
        (total, product) =>
          total +
          parseFloat(product.finalPrice) +
          parseFloat(product.totalGstAmount),
        0
      );
      //   setDiscountAmount(0);
      updatedProductList = updatedProductList.map((product) => {
        const originalAmount =
          parseFloat(product.finalPrice) + parseFloat(product.totalGstAmount);
        const adjustment =
          (originalAmount / totalOriginalAmount) * amountToDeduct;
        // console.log(
        //   typeof parseFloat(product.finalPrice),
        //   "product.finalPrice"
        // );
        // console.log(typeof product.totalGstAmount, "product.totalGstAmount");
        // console.log(
        //   typeof parseFloat(totalPayableAmount),
        //   "totalPayableAmount"
        // );
        const deductAmount = parseFloat(
          parseFloat(product.finalPrice) +
            parseFloat(product.totalGstAmount) -
            parseFloat(totalPayableAmount)
        );
        const newTotalGstAmount =
          parseFloat(product.totalGstAmount) - parseFloat(deductAmount) * 0.03;
        const newFinalPrice = (parseFloat(totalPayableAmount) * 100) / 103;
        const newMakingPerGram =
          parseFloat(product.making) - parseFloat(deductAmount);
        // console.log(totalPayableAmount, "totalPayableAmount");
        // console.log(typeof deductAmount, "deductAmount");
        // console.log(newTotalGstAmount, "newTotalGstAmount");
        // console.log(newFinalPrice, "newFinalPrice");
        // console.log(newMakingPerGram, "newMakingPerGram");
        totalAdjustment += adjustment;

        return {
          ...product,
          finalPrice: newFinalPrice,
          making: newMakingPerGram,
          totalGstAmount: newTotalGstAmount,
        };
      });

      amountToDeduct -= totalAdjustment;
    }

    // Now, updatedProductList contains the updated products with discounted prices
    // console.log("Updated Product List with Discounts", updatedProductList);
    setAllSelectedProducts(updatedProductList);
  };
  useEffect(() => {
    editDiscountPrices();
  }, [updatePrices]);
  // const editItem = (id) => {
  //   setOpenEditBox(true);
  //   // document.body.classList.add("body-no-scroll");
  // };
  const editItem = (product) => {
    setOpenEditBox(true);
    // if (!allSelectedProducts.some((x) => x.id === selectedProduct.id)) {
    setOpenEditProduct(product);

    setPayments([]);
    calculateNetAmount();
    // } else {
    // alert("Product Already added");
    // }
  };
  const closeEditItem = () => {
    setOpenEditBox(false);
    setPayments([]);
    calculateNetAmount();
    // document.body.classList.add("body-no-scroll");
  };
  const handleInputChange2 = (e, property) => {
    const { value } = e.target;
    if (selectedProduct) {
      const updatedProduct = {
        ...openEditProduct,
        [property]:
          e.target.value !== "" || e.target.value > 0 ? e.target.value : 0,
      };
      const grosswt = parseFloat(updatedProduct.GrossWt) || 0;
      const grosswtPrevious = parseFloat(openEditProduct.TotalGrossWt) || 0;
      const stoneWeight = parseFloat(updatedProduct.TotalStoneWeight) || 0;
      const stonewt = parseFloat(updatedProduct.TotalStoneWeight) || 0;
      const netWt = parseFloat(updatedProduct.NetWt) || 0;
      if (property === "GrossWt" && !isNaN(value)) {
        if (value <= parseFloat(grosswtPrevious) + 0.03) {
          console.log("grosswt openEdit", openEditProduct.GrossWt);
          console.log("grosswt updatedProduct", updatedProduct.GrossWt);
          console.log("grosswt grosswtPrevious", grosswtPrevious);
          if (stoneWeight < value) {
            updatedProduct.NetWt = (parseFloat(value) - stoneWeight).toFixed(3);
            updatedProduct.NetWt = (parseFloat(value) - stonewt).toFixed(3);
          } else {
            updatedProduct.NetWt = value;
            updatedProduct.NetWt = value;
            updatedProduct.TotalStoneWeight = 0;
            updatedProduct.TotalStoneWeight = 0;
          }
        } else {
          // updatedProduct.grosswt = grosswt;
          null;
        }
        // calculateFinalPrice(selectedProduct);
      }
      if (
        (property === "TotalStoneWeight" || property === "StoneWt") &&
        !isNaN(value)
      ) {
        if (value < grosswt) {
          updatedProduct.NetWt = (grosswt - parseFloat(value)).toFixed(3);
          updatedProduct.NetWt = (grosswt - parseFloat(value)).toFixed(3);
        } else {
          (updatedProduct.NetWt = 0), (updatedProduct.GrossWt = value);
          (updatedProduct.NetWt = 0), (updatedProduct.GrossWt = value);
        }
      }
      if (
        (property === "NetWt" || property === "TotalNetWt") &&
        !isNaN(value)
      ) {
        if (
          updatedProduct.purchase === true ||
          updatedProduct.unlabel === true
        ) {
          updatedProduct.GrossWt = (
            parseFloat(stonewt) + parseFloat(value)
          ).toFixed(3);
        } else {
          updatedProduct.GrossWt = (
            parseFloat(stoneWeight) + parseFloat(value)
          ).toFixed(3);
        }
      }
      console.log(updatedProduct, "updatedProduct");
      if (property === "TodaysRate" && !isNaN(value)) {
        updatedProduct.TodaysRate = parseFloat(value).toFixed(0);
        updatedProduct.GoldRate = parseFloat(value).toFixed(0);
        updatedProduct.PurityRate = parseFloat(value).toFixed(0);
      }

      if (
        property === "NetWt" ||
        property === "GrossWt" ||
        property === "TotalStoneWt" ||
        property === "TotalStoneAmount" ||
        property === "MakingPerGram" ||
        property === "MakingPercentage" ||
        property === "MakingFixedAmt" ||
        property === "MakingFixedWastage" ||
        property === "TodaysRate" ||
        property === "MRP" ||
        property === "HallmarkAmount"
      ) {
        let netGoldRate =
          (!updatedProduct.unlabel && updatedProduct.purchase) ||
          (updatedProduct.unlabel && !updatedProduct.purchase)
            ? (parseFloat(updatedProduct.NetWt) *
                parseFloat(updatedProduct.TodaysRate)) /
              10
            : (parseFloat(updatedProduct.NetWt) *
                parseFloat(updatedProduct.TodaysRate)) /
              10;
        let makingCharges1 =
          (!updatedProduct.unlabel && updatedProduct.purchase) ||
          (updatedProduct.unlabel && !updatedProduct.purchase)
            ? parseFloat(updatedProduct.NetWt) *
              parseFloat(updatedProduct.MakingPerGram)
            : parseFloat(updatedProduct.NetWt) *
              parseFloat(updatedProduct.MakingPerGram);
        let makingCharges2 =
          (parseFloat(netGoldRate) *
            parseFloat(updatedProduct.MakingPercentage)) /
          100;
        let makingCharges3 = parseFloat(updatedProduct.MakingFixedAmt);
        let makingCharges4 =
          (parseFloat(updatedProduct.TodaysRate) *
            parseFloat(updatedProduct.MakingFixedWastage)) /
          10;
        let GST = 0.03;

        let grossTotalRate =
          parseFloat(netGoldRate) +
          parseFloat(makingCharges1) +
          parseFloat(makingCharges2) +
          parseFloat(makingCharges3) +
          parseFloat(makingCharges4) +
          parseFloat(updatedProduct.HallmarkAmount) +
          parseFloat(updatedProduct.TotalStoneAmount);
        let GSTAdded = parseFloat(GST) * parseFloat(grossTotalRate);
        let finalPrice = parseFloat(grossTotalRate) + parseFloat(GSTAdded);

        // Calculate total making charges
        let totalMakingCharges =
          parseFloat(makingCharges1) +
          parseFloat(makingCharges2) +
          parseFloat(makingCharges3) +
          parseFloat(makingCharges4);

        // console.log(netGoldRate, "netGoldRate");
        if (
          (updatedProduct.MRP == 0 ||
            updatedProduct.MRP == "" ||
            updatedProduct.MRP == "0") &&
          !updatedProduct.purchase
        ) {
          updatedProduct.finalPrice = parseFloat(grossTotalRate).toFixed(3);
          updatedProduct.making = totalMakingCharges;
          updatedProduct.totalGstAmount = GSTAdded;
        } else if (!updatedProduct.purchase) {
          // updatedProduct = {
          //   ...updatedProduct,
          //   finalPrice: parseFloat(grossTotalRate).toFixed(3),
          //   //   finalPrice: parseFloat(finalPrice).toFixed(3),
          //   making: totalMakingCharges,
          //   totalGstAmount: GSTAdded,
          // };

          updatedProduct.finalPrice = (
            (parseFloat(updatedProduct.MRP) * 100) /
            103
          ).toFixed(3);
          updatedProduct.making = 0;
          updatedProduct.totalGstAmount = (
            (parseFloat(updatedProduct.MRP) * 3) /
            103
          ).toFixed(3);
          //   finalPrice: parseFloat(finalPrice).toFixed(3),
          // }
          setSelectedProductPrice(parseFloat(finalPrice).toFixed(3));
          setOpenEditProduct(updatedProduct);
        } else {
          if (updatedProduct.purchase === true) {
            updatedProduct.NetAmt = parseFloat(grossTotalRate).toFixed(3);
            updatedProduct.PurchaseAmount =
              parseFloat(grossTotalRate).toFixed(3);
            updatedProduct.finalPrice = `${-parseFloat(grossTotalRate).toFixed(
              3
            )}`;
            updatedProduct.making = totalMakingCharges;
            updatedProduct.totalGstAmount = 0;
          }
        }
        // Update selectedProduct with additional properties and calculated price
        if (updatedProduct.purchase) {
          calculatePurchasePrice(updatedProduct);
        }
        setSelectedProduct(updatedProduct); // Update the selected product
        setOpenEditProduct(updatedProduct);
        // calculateFinalPrice(updatedProduct);

        setSelectedProductPrice(parseFloat(finalPrice).toFixed(3));
      }
      // Update the specific product in allSelectedProducts array without changing its position
      const updatedProducts = allSelectedProducts.map((product) =>
        product.Id === updatedProduct.Id ? updatedProduct : product
      );
      // Update the state with the modified products array
      setOpenEditProduct(updatedProduct);
      setAllSelectedProducts(updatedProducts);

      // Update the openEditProduct state
    }
  };

  // const addPayment = () => {
  //   // Check if both payment mode and amount are provided
  //   if (paymentOptions && paymentAmount > 0) {
  //     // Update the payments array with new payment mode and amount
  //     setPayments([
  //       ...payments,
  //       { mode: paymentOptions, amount: paymentAmount },
  //     ]);
  //     setGrandTotal(parseInt(grandTotal) - parseInt(paymentAmount));
  //     // Clear the input fields
  //     // setPaymentOptions("Cash");
  //     setPaymentAmount(parseInt(grandTotal) - parseInt(paymentAmount));
  //   }
  // };
  // const addPayment = () => {
  //   // Check if both payment mode and amount are provided
  //   if (paymentOptions && paymentAmount >= 0 && paymentType === "Receive") {
  //     // Update the payments array with new payment mode and amount
  //     if (
  //       paymentOptions === "Metal to Cash" ||
  //       paymentOptions === "Cash to Metal"
  //     ) {
  //       setPayments([
  //         ...payments,
  //         {
  //           mode: paymentOptions,
  //           amount: paymentAmount,
  //           fineGold: parseFloat(paymentGold),
  //           fineSilver: parseFloat(paymentSilver),
  //           deductGold: deductGold,
  //           deductSilver: deductSilver,
  //           paymentType: paymentType,
  //           goldRate: metalPaymentOption.optionSelected
  //             .toLowerCase()
  //             .includes("gold")
  //             ? metalPaymentOption.fineRate
  //             : 0,
  //           silverRate: !metalPaymentOption.optionSelected
  //             .toLowerCase()
  //             .includes("gold")
  //             ? metalPaymentOption.fineRate
  //             : 0,
  //           goldAmount: metalPaymentOption.optionSelected
  //             .toLowerCase()
  //             .includes("gold")
  //             ? metalPaymentOption.totalAmount
  //             : 0,
  //           silverAmount: !metalPaymentOption.optionSelected
  //             .toLowerCase()
  //             .includes("gold")
  //             ? metalPaymentOption.totalAmount
  //             : 0,
  //           paymentDescription: paymentDescription,
  //         },
  //       ]);
  //     } else {
  //       setPayments([
  //         ...payments,
  //         {
  //           mode: !paymentOptions.toLowerCase().includes("advance")
  //             ? paymentOptions
  //             : advanceType,
  //           amount: !paymentOptions.toLowerCase().includes("advance")
  //             ? paymentAmount
  //             : advanceAmount,
  //           fineGold: 0,
  //           fineSilver: 0,
  //           deductGold: 0,
  //           deductSilver: 0,
  //           paymentType: paymentType,
  //           goldRate: 0,
  //           silverRate: 0,
  //           goldAmount: 0,
  //           silverAmount: 0,
  //           paymentDescription: paymentDescription,
  //         },
  //       ]);
  //     }
  //     if (!paymentOptions.toLowerCase().includes("advance")) {
  //       setGrandTotal(parseInt(grandTotal) - parseInt(paymentAmount));
  //       setPaymentAmount(parseInt(grandTotal) - parseInt(paymentAmount));
  //     } else if (
  //       paymentOptions.toLowerCase().includes("advance") &&
  //       advanceType === "Deduct Advance"
  //     ) {
  //       setSelectedCustomer({
  //         ...selectedCustomer,
  //         advanceAmount:
  //           parseFloat(selectedCustomer.advanceAmount) -
  //           parseFloat(advanceAmount),
  //       });
  //       setGrandTotal(parseInt(grandTotal) - parseInt(advanceAmount));
  //       setPaymentAmount(parseInt(grandTotal) - parseInt(advanceAmount));
  //       setAdvanceAmount(0);
  //     } else {
  //       setGrandTotal(parseInt(grandTotal));
  //       setPaymentAmount(parseInt(grandTotal));
  //       setAdvanceAmount(0);
  //     }
  //     // Clear the input fields
  //     // setPaymentOptions("Cash");
  //   } else if (paymentOptions && paymentAmount > 0 && paymentType === "Paid") {
  //     // Update the payments array with new payment mode and amount
  //     if (
  //       paymentOptions === "Metal to Cash" ||
  //       paymentOptions === "Cash to Metal"
  //     ) {
  //       setPayments([
  //         ...payments,
  //         {
  //           mode: paymentOptions,
  //           amount: -paymentAmount,
  //           fineGold: parseFloat(-paymentGold),
  //           fineSilver: parseFloat(-paymentSilver),
  //           deductGold: parseFloat(-deductGold),
  //           deductSilver: parseFloat(-deductSilver),
  //           paymentType: paymentType,
  //           goldRate: metalPaymentOption.optionSelected
  //             .toLowerCase()
  //             .includes("gold")
  //             ? -metalPaymentOption.fineRate
  //             : 0,
  //           silverRate: !metalPaymentOption.optionSelected
  //             .toLowerCase()
  //             .includes("gold")
  //             ? -metalPaymentOption.fineRate
  //             : 0,
  //           goldAmount: metalPaymentOption.optionSelected
  //             .toLowerCase()
  //             .includes("gold")
  //             ? -metalPaymentOption.totalAmount
  //             : 0,
  //           silverAmount: !metalPaymentOption.optionSelected
  //             .toLowerCase()
  //             .includes("gold")
  //             ? -metalPaymentOption.totalAmount
  //             : 0,
  //           paymentDescription: paymentDescription,
  //         },
  //       ]);
  //     } else {
  //       setPayments([
  //         ...payments,
  //         {
  //           mode: paymentOptions,
  //           amount: -paymentAmount,
  //           fineGold: 0,
  //           fineSilver: 0,
  //           deductGold: 0,
  //           deductSilver: 0,
  //           paymentType: paymentType,
  //           goldRate: 0,
  //           silverRate: 0,
  //           goldAmount: 0,
  //           silverAmount: 0,
  //           paymentDescription: paymentDescription,
  //         },
  //       ]);
  //     }
  //     setGrandTotal(parseInt(grandTotal) - parseInt(-paymentAmount));
  //     // Clear the input fields
  //     // setPaymentOptions("Cash");
  //     setPaymentAmount(
  //       Math.abs(parseInt(grandTotal) - parseInt(-paymentAmount))
  //     );
  //   } else if (paymentOptions && paymentAmount < 0 && paymentType === "Paid") {
  //     // Update the payments array with new payment mode and amount
  //     if (
  //       paymentOptions === "Cash to Metal" ||
  //       paymentOptions === "Metal to Cash"
  //     ) {
  //       setPayments([
  //         ...payments,
  //         {
  //           mode: paymentOptions,
  //           amount: -paymentAmount,
  //           fineGold: parseFloat(-paymentGold),
  //           fineSilver: parseFloat(-paymentSilver),
  //           deductGold: parseFloat(-deductGold),
  //           deductSilver: parseFloat(-deductSilver),
  //           paymentType: paymentType,
  //           goldRate: metalPaymentOption.optionSelected
  //             .toLowerCase()
  //             .includes("gold")
  //             ? -metalPaymentOption.fineRate
  //             : 0,
  //           silverRate: !metalPaymentOption.optionSelected
  //             .toLowerCase()
  //             .includes("gold")
  //             ? -metalPaymentOption.fineRate
  //             : 0,
  //           goldAmount: metalPaymentOption.optionSelected
  //             .toLowerCase()
  //             .includes("gold")
  //             ? -metalPaymentOption.totalAmount
  //             : 0,
  //           silverAmount: metalPaymentOption.optionSelected
  //             .toLowerCase()
  //             .includes("gold")
  //             ? -metalPaymentOption.totalAmount
  //             : 0,
  //           paymentDescription: paymentDescription,
  //         },
  //       ]);
  //     } else {
  //       setPayments([
  //         ...payments,
  //         {
  //           mode: paymentOptions,
  //           amount: -paymentAmount,
  //           fineGold: 0,
  //           fineSilver: 0,
  //           deductGold: 0,
  //           deductSilver: 0,
  //           paymentType: paymentType,
  //           goldRate: 0,
  //           silverRate: 0,
  //           goldAmount: 0,
  //           silverAmount: 0,
  //           paymentDescription: paymentDescription,
  //         },
  //       ]);
  //     }
  //     setGrandTotal(parseInt(grandTotal) - parseInt(paymentAmount));
  //     // Clear the input fields
  //     // setPaymentOptions("Cash");
  //     setPaymentAmount(parseInt(grandTotal) - parseInt(paymentAmount));
  //   }
  //   setTotalPayableGold(totalPayableGold - deductGold);
  //   setTotalPayableSilver(totalPayableSilver - deductSilver);
  //   setPaymentDescription("");
  //   // setMetalPaymentOption({
  //   //   optionSelected: "Gold",
  //   //   fineRate: 0,
  //   //   fineWt: 0,
  //   //   totalAmount: 0,
  //   //   deductGold: 0,
  //   //   deductSilver: 0,
  //   //   goldRate: 0,
  //   //   silverRate: 0,
  //   //   goldAmount: 0,
  //   //   silverAmount: 0,
  //   // });
  //   // setPaymentOptions("Cash");
  //   setPaymentGold(0);
  //   setPaymentSilver(0);
  // };
  const addPayment = () => {
    // Check if both payment mode and amount are provided
    if (paymentOptions && paymentAmount >= 0 && paymentType === "Receive") {
      // Update the payments array with new payment mode and amount
      if (
        paymentOptions === "Metal to Cash" ||
        paymentOptions === "Cash to Metal"
      ) {
        setPayments([
          ...payments,
          {
            mode: paymentOptions,
            amount: paymentAmount,
            fineGold: parseFloat(paymentGold),
            fineSilver: parseFloat(paymentSilver),
            deductGold: deductGold,
            deductSilver: deductSilver,
            paymentType: paymentType,
            goldRate: metalPaymentOption.optionSelected
              .toLowerCase()
              .includes("gold")
              ? metalPaymentOption.fineRate
              : 0,
            silverRate: !metalPaymentOption.optionSelected
              .toLowerCase()
              .includes("gold")
              ? metalPaymentOption.fineRate
              : 0,
            goldAmount: metalPaymentOption.optionSelected
              .toLowerCase()
              .includes("gold")
              ? metalPaymentOption.totalAmount
              : 0,
            silverAmount: !metalPaymentOption.optionSelected
              .toLowerCase()
              .includes("gold")
              ? metalPaymentOption.totalAmount
              : 0,
            paymentDescription: paymentDescription,
          },
        ]);
      } else {
        setPayments([
          ...payments,
          {
            mode: !paymentOptions.toLowerCase().includes("advance")
              ? paymentOptions
              : advanceType,
            amount: !paymentOptions.toLowerCase().includes("advance")
              ? paymentAmount
              : advanceAmount,
            fineGold: 0,
            fineSilver: 0,
            deductGold: 0,
            deductSilver: 0,
            paymentType: paymentType,
            goldRate: 0,
            silverRate: 0,
            goldAmount: 0,
            silverAmount: 0,
            paymentDescription: paymentDescription,
          },
        ]);
      }
      if (!paymentOptions.toLowerCase().includes("advance")) {
        setGrandTotal(parseInt(grandTotal) - parseInt(paymentAmount));
        setPaymentAmount(parseInt(grandTotal) - parseInt(paymentAmount));
      } else if (
        paymentOptions.toLowerCase().includes("advance") &&
        advanceType === "Deduct Advance"
      ) {
        setSelectedCustomer({
          ...selectedCustomer,
          advanceAmt:
            parseFloat(selectedCustomer.advanceAmt) - parseFloat(advanceAmount),
        });
        setGrandTotal(parseInt(grandTotal) - parseInt(advanceAmount));
        setPaymentAmount(parseInt(grandTotal) - parseInt(advanceAmount));
        setAdvanceAmount(0);
      } else {
        setGrandTotal(parseInt(grandTotal));
        setPaymentAmount(parseInt(grandTotal));
        setAdvanceAmount(0);
      }
      // Clear the input fields
      // setPaymentOptions("Cash");
    } else if (paymentOptions && paymentAmount > 0 && paymentType === "Paid") {
      // Update the payments array with new payment mode and amount
      if (
        paymentOptions === "Metal to Cash" ||
        paymentOptions === "Cash to Metal"
      ) {
        setPayments([
          ...payments,
          {
            mode: paymentOptions,
            amount: -paymentAmount,
            fineGold: parseFloat(-paymentGold),
            fineSilver: parseFloat(-paymentSilver),
            deductGold: parseFloat(-deductGold),
            deductSilver: parseFloat(-deductSilver),
            paymentType: paymentType,
            goldRate: metalPaymentOption.optionSelected
              .toLowerCase()
              .includes("gold")
              ? -metalPaymentOption.fineRate
              : 0,
            silverRate: !metalPaymentOption.optionSelected
              .toLowerCase()
              .includes("gold")
              ? -metalPaymentOption.fineRate
              : 0,
            goldAmount: metalPaymentOption.optionSelected
              .toLowerCase()
              .includes("gold")
              ? -metalPaymentOption.totalAmount
              : 0,
            silverAmount: !metalPaymentOption.optionSelected
              .toLowerCase()
              .includes("gold")
              ? -metalPaymentOption.totalAmount
              : 0,
            paymentDescription: paymentDescription,
          },
        ]);
      } else {
        setPayments([
          ...payments,
          {
            mode: paymentOptions,
            amount: -paymentAmount,
            fineGold: 0,
            fineSilver: 0,
            deductGold: 0,
            deductSilver: 0,
            paymentType: paymentType,
            goldRate: 0,
            silverRate: 0,
            goldAmount: 0,
            silverAmount: 0,
            paymentDescription: paymentDescription,
          },
        ]);
      }
      setGrandTotal(parseInt(grandTotal) - parseInt(-paymentAmount));
      // Clear the input fields
      // setPaymentOptions("Cash");
      setPaymentAmount(
        Math.abs(parseInt(grandTotal) - parseInt(-paymentAmount))
      );
    } else if (paymentOptions && paymentAmount <= 0 && paymentType === "Paid") {
      // Update the payments array with new payment mode and amount
      if (
        paymentOptions === "Cash to Metal" ||
        paymentOptions === "Metal to Cash"
      ) {
        setPayments([
          ...payments,
          {
            mode: paymentOptions,
            amount: -paymentAmount,
            fineGold: parseFloat(-paymentGold),
            fineSilver: parseFloat(-paymentSilver),
            deductGold: parseFloat(-deductGold),
            deductSilver: parseFloat(-deductSilver),
            paymentType: paymentType,
            goldRate: metalPaymentOption.optionSelected
              .toLowerCase()
              .includes("gold")
              ? -metalPaymentOption.fineRate
              : 0,
            silverRate: !metalPaymentOption.optionSelected
              .toLowerCase()
              .includes("gold")
              ? -metalPaymentOption.fineRate
              : 0,
            goldAmount: metalPaymentOption.optionSelected
              .toLowerCase()
              .includes("gold")
              ? -metalPaymentOption.totalAmount
              : 0,
            silverAmount: metalPaymentOption.optionSelected
              .toLowerCase()
              .includes("gold")
              ? -metalPaymentOption.totalAmount
              : 0,
            paymentDescription: paymentDescription,
          },
        ]);
      } else {
        setPayments([
          ...payments,
          {
            mode: paymentOptions,
            amount: -paymentAmount,
            fineGold: 0,
            fineSilver: 0,
            deductGold: 0,
            deductSilver: 0,
            paymentType: paymentType,
            goldRate: 0,
            silverRate: 0,
            goldAmount: 0,
            silverAmount: 0,
            paymentDescription: paymentDescription,
          },
        ]);
      }
      setGrandTotal(parseInt(grandTotal) - parseInt(paymentAmount));
      // Clear the input fields
      // setPaymentOptions("Cash");
      setPaymentAmount(parseInt(grandTotal) - parseInt(paymentAmount));
    }

    setPaymentDescription("");
    setTotalPayableGold(parseFloat(totalPayableGold - deductGold).toFixed(3));
    setTotalPayableSilver(
      parseFloat(totalPayableSilver - deductSilver).toFixed(3)
    );
    // setMetalPaymentOption({
    //   optionSelected: "Gold",
    //   fineRate: 0,
    //   fineWt: 0,
    //   totalAmount: 0,
    //   deductGold: 0,
    //   deductSilver: 0,
    //   goldRate: 0,
    //   silverRate: 0,
    //   goldAmount: 0,
    //   silverAmount: 0,
    // });
    // setPaymentOptions("Cash");
    setPaymentGold(0);
    setPaymentSilver(0);
    setPaymentOptions("Cash");
    setMetalPaymentOption({
      optionSelected: "GOLD",
      fineRate: 0,
      fineWt: 0,
      totalAmount: 0,
      deductGold: 0,
      deductSilver: 0,
      goldRate: 0,
      silverRate: 0,
      goldAmount: 0,
      silverAmount: 0,
    });
  };
  console.log(payments, "payments");
  console.log(totalPayableGold, "totalPayableGold");
  console.log(deductGold, "deductGold");
  console.log(paymentOptions, "paymentOptions");
  console.log(payments, "payments");

  const deletePayment = (index) => {
    // Get the amount of the payment to be deleted
    setPaymentOptions(payments[index].mode);
    const deletedAmount = parseFloat(payments[index].amount);
    const deletedGoldWeight = parseFloat(payments[index].deductGold);
    const deletedSilverWeight = parseFloat(payments[index].deductSilver);

    const updatedPayments = [...payments];
    updatedPayments.splice(index, 1);
    setPayments(updatedPayments);
    const newGrandTotal = grandTotal + deletedAmount;
    if (payments[index].mode === "Advance Received") {
      null;
    } else if (payments[index].mode === "Deduct Advance") {
      setSelectedCustomer({
        ...selectedCustomer,
        advanceAmt:
          parseFloat(selectedCustomer.advanceAmt) +
          parseFloat(payments[index].amount),
      });
      setGrandTotal(newGrandTotal);
      const remainingGoldWeight = totalPayableGold + deletedGoldWeight;
      const remainingSilverWeight = totalPayableSilver + deletedSilverWeight;
      setTotalPayableGold(parseFloat(remainingGoldWeight).toFixed(3));
      setTotalPayableSilver(parseFloat(remainingSilverWeight).toFixed(3));
      setPaymentAmount(Math.abs(parseInt(newGrandTotal)));
    } else {
      setGrandTotal(newGrandTotal);
      const remainingGoldWeight =
        parseFloat(totalPayableGold) + parseFloat(deletedGoldWeight);
      const remainingSilverWeight =
        parseFloat(totalPayableSilver) + parseFloat(deletedSilverWeight);
      setTotalPayableGold(parseFloat(remainingGoldWeight).toFixed(3));
      setTotalPayableSilver(parseFloat(remainingSilverWeight).toFixed(3));
      setPaymentAmount(Math.abs(parseInt(newGrandTotal)));
    }
    setPaymentOptions("Cash");
  };

  // const deletePayment = (index) => {
  //   // Get the amount of the payment to be deleted
  //   const deletedAmount = parseInt(payments[index].amount);

  //   // Remove the payment at the specified index
  //   const updatedPayments = [...payments];
  //   updatedPayments.splice(index, 1);

  //   // Calculate the new grand total by subtracting the deleted amount

  //   // Update the payments array and grand total state
  //   setPayments(updatedPayments);
  //   const newGrandTotal = parseInt(grandTotal) + parseInt(deletedAmount);
  //   setGrandTotal(newGrandTotal);
  //   setPaymentAmount(newGrandTotal);
  // };
  // const deletePayment = (index) => {
  //   // Get the amount of the payment to be deleted
  //   setPaymentOptions(payments[index].mode);
  //   const deletedAmount = parseFloat(payments[index].amount);
  //   const deletedGoldWeight = parseFloat(payments[index].deductGold);
  //   const deletedSilverWeight = parseFloat(payments[index].deductSilver);

  //   // Remove the payment at the specified index
  //   const updatedPayments = [...payments];
  //   updatedPayments.splice(index, 1);

  //   // Calculate the new grand total by subtracting the deleted amount

  //   // Update the payments array and grand total state
  //   setPayments(updatedPayments);
  //   const newGrandTotal =
  //     grandTotal +
  //     // (payments[index].paymentType === "Receive"
  //     deletedAmount;
  //   // : -deletedAmount);
  //   // (payments[index].paymentType === "Receive"
  //   //   ? +deletedAmount
  //   //   : -deletedAmount);
  //   if (payments[index].mode === "Advance Received") {
  //     null;
  //   } else if (payments[index].mode === "Deduct Advance") {
  //     setSelectedCustomer({
  //       ...selectedCustomer,
  //       advanceAmount:
  //         parseFloat(selectedCustomer.advanceAmount) +
  //         parseFloat(payments[index].amount),
  //     });
  //     setGrandTotal(newGrandTotal);
  //     const remainingGoldWeight = totalPayableGold + deletedGoldWeight;
  //     const remainingSilverWeight = totalPayableSilver + deletedSilverWeight;
  //     setTotalPayableGold(remainingGoldWeight);
  //     setTotalPayableSilver(remainingSilverWeight);
  //     setPaymentAmount(Math.abs(parseInt(newGrandTotal)));
  //   } else {
  //     setGrandTotal(newGrandTotal);
  //     const remainingGoldWeight = totalPayableGold + deletedGoldWeight;
  //     const remainingSilverWeight = totalPayableSilver + deletedSilverWeight;
  //     setTotalPayableGold(remainingGoldWeight);
  //     setTotalPayableSilver(remainingSilverWeight);
  //     setPaymentAmount(Math.abs(parseInt(newGrandTotal)));
  //   }

  //   // let resetAllProductPrices = allPurchaseData.map((product) => {
  //   //   return {
  //   //     ...product,
  //   //     paidPrice: 0,
  //   //   };
  //   // });;
  //   // setAllPurchaseData(resetAllProductPrices);
  // };
  // Convert payments array to a comma-separated string whenever you need it
  const paymentsString = payments
    .map((payment) => `${payment.mode}:${payment.amount}`)
    .join(",");
  // Function to calculate total payment amount
  const calculateTotalAmount = () => {
    // Use reduce to sum all payment amounts
    const totalPaidAmount = payments.reduce(
      (total, payment) =>
        total +
        (payment.mode !== "Advance Received" ? parseFloat(payment.amount) : 0),
      0
    );

    return totalPaidAmount;
  };

  // Render total payment amount
  const totalPaidAmount = calculateTotalAmount();

  const resetAllFields = () => {
    setProductsLoading(true);
    fetchAllProducts();
    setSelectedCustomer(null);
    setSelectedProduct([]);
    setAllSelectedProducts([]);
    setPaymentAmount(0);
    setPayments([]);
    setPaymentType("Receive");
    setGstType(true);
    setApplyGstAmount(true);
    setDiscountPercentage("0%");
    setSelectedSalesEmployee("");
    setLoading(false);
    setPendingApproval(false);
    window.scrollTo(0, 0);
  };

  // let selectedCategoryId = "";
  // let selectedCategoryName = "";
  // let selectedPurityName = "";
  // let selectedPurityRate = "";
  // console.log(purchaseProduct, "purchaseProduct");
  const handleInputChangePurchase = (e) => {
    const { name, value } = e.target;
    const updatedProduct = { ...purchaseProduct }; // Create a copy of the purchaseProduct object
    const grosswt = parseFloat(updatedProduct.GrossWt) || 0;
    const stoneWeight = parseFloat(updatedProduct.StoneWt) || 0;
    // Update the edited data in the updatedProduct object
    if (name === "CategoryName") {
      const [selectedCategoryId, selectedCategoryName] = value.split(",");
      setSelectedCategory(selectedCategoryName),
        (updatedProduct.CategoryId = parseInt(selectedCategoryId)),
        (updatedProduct.CategoryName = selectedCategoryName);
    } else if (name === "GrossWt") {
      if (stoneWeight < value) {
        updatedProduct.NetWt = parseFloat(
          parseFloat(value) - parseFloat(updatedProduct.StoneWt)
        ).toFixed(3);
        updatedProduct.GrossWt = value;
      } else {
        updatedProduct.GrossWt = value;
        updatedProduct.NetWt = value;
        updatedProduct.StoneWt = 0;
      }
    } else if (name === "StoneWt") {
      if (value < grosswt) {
        updatedProduct.NetWt = parseFloat(
          parseFloat(updatedProduct.GrossWt) - parseFloat(value)
        ).toFixed(3);
        updatedProduct.StoneWt = value;
      } else {
        (updatedProduct.NetWt = 0), (updatedProduct.GrossWt = value);
      }
    } else if (name === "NetWt") {
      if (value < grosswt) {
        updatedProduct.StoneWt = parseFloat(
          parseFloat(updatedProduct.GrossWt) - parseFloat(value)
        ).toFixed(3);
        updatedProduct.NetWt = value;
      } else {
        updatedProduct.StoneWt = 0;
        updatedProduct.NetWt = value;
        updatedProduct.GrossWt = value;
      }
    } else if (name === "FinePercent") {
      updatedProduct.FinePercent = value <= 100 ? value : 100;
      updatedProduct.Purity = value <= 100 ? value : 100;
    } else if (name === "PurityRate") {
      const [selectedPurityName, selectedPurityRate] = value.split(",");
      setSelectedPurity(selectedPurityName);
      updatedProduct.PurityName = selectedPurityName;
      updatedProduct.GoldRate = selectedPurityRate;
      updatedProduct.PurityRate = selectedPurityRate;
      updatedProduct.TodaysRate = selectedPurityRate;
    } else if (name === "GoldRate") {
      updatedProduct.GoldRate = parseFloat(value);
      updatedProduct.PurityRate = parseFloat(value);
      updatedProduct.TodaysRate = parseFloat(value);
    } else if (name === "ProductName") {
      updatedProduct.ProductName = value;
    } else {
      // updatedProduct[name] = value;
      updatedProduct[name] = value !== "" || value >= 0 ? value : 0;
    }

    // Set the state of the purchaseProduct object with the updatedProduct object
    setPurchaseProduct(updatedProduct);

    // Calculate purchase price based on the updatedProduct object
    calculatePurchasePrice(updatedProduct);

    // Rest of the function logic...
  };
  const handleInputChangeUnlabel = (e) => {
    const { name, value } = e.target;
    const updatedProduct = { ...unlabelProduct }; // Create a copy of the purchaseProduct object
    const grosswt = parseFloat(updatedProduct.GrossWt) || 0;
    const stoneWeight = parseFloat(updatedProduct.StoneWt) || 0;

    // Update the edited data in the updatedProduct object
    if (name === "CategoryId") {
      const [selectedCategoryId, selectedCategoryName] = value.split(",");
      setSelectedCategory(selectedCategoryName),
        (updatedProduct.CategoryId = parseInt(selectedCategoryId)),
        (updatedProduct.CategoryName = selectedCategoryName);
      (updatedProduct.ProductTypeId = ""),
        (updatedProduct.ProductName = ""),
        (updatedProduct.DesignName = ""),
        (updatedProduct.SelectedUnlabelId = 0),
        (updatedProduct.GrossWt = "0"),
        (updatedProduct.NetWt = "0"),
        (updatedProduct.StoneWt = "0"),
        (updatedProduct.GoldRate = "0"),
        (updatedProduct.FinePercent = "0"),
        (updatedProduct.making = "0"),
        (updatedProduct.NetAmt = "0"),
        (updatedProduct.GSTAmount = "0"),
        (updatedProduct.TotalAmt = "0"),
        (updatedProduct.Quantity = "1"),
        (updatedProduct.UnlabelAmount = "0"),
        (updatedProduct.PurityRate = "0"),
        (updatedProduct.Purity = "100%"),
        (updatedProduct.finalPrice = "0"),
        (updatedProduct.totalGstAmount = "0"),
        (updatedProduct.purchase = false),
        (updatedProduct.unlabel = true),
        (updatedProduct.TodaysRate = "0");
    } else if (name === "GrossWt") {
      if (value <= updatedProduct.MaxNetWt) {
        if (stoneWeight < value) {
          updatedProduct.NetWt = parseFloat(
            parseFloat(value) - parseFloat(updatedProduct.TotalStoneWeight)
          ).toFixed(3);
          updatedProduct.GrossWt = value;
        } else {
          updatedProduct.GrossWt = value;
          updatedProduct.NetWt = value;
          updatedProduct.TotalStoneWeight = 0;
        }
      } else {
        alert(`Maximum weight available is ${updatedProduct.MaxGrossWt}`);
      }
    } else if (name === "TotalStoneWeight") {
      if (value < grosswt) {
        updatedProduct.NetWt = parseFloat(
          parseFloat(updatedProduct.GrossWt) - parseFloat(value)
        ).toFixed(3);
        updatedProduct.TotalStoneWeight = value;
      } else {
        (updatedProduct.NetWt = 0), (updatedProduct.GrossWt = value);
      }
    } else if (name === "NetWt") {
      if (value <= updatedProduct.MaxGrossWt) {
        if (value < grosswt) {
          updatedProduct.TotalStoneWeight = parseFloat(
            parseFloat(updatedProduct.GrossWt) - parseFloat(value)
          ).toFixed(3);
          updatedProduct.NetWt = value;
        } else {
          updatedProduct.TotalStoneWeight = 0;
          updatedProduct.NetWt = value;
          updatedProduct.GrossWt = value;
        }
      } else {
        alert(`Maximum weight available is ${updatedProduct.MaxNetWt}`);
      }
    } else if (name === "Quantity") {
      if (value <= updatedProduct.MaxQuantity) {
        updatedProduct.Quantity = parseInt(value);
      } else {
        alert(`Maximum Quantity available is ${updatedProduct.MaxQuantity}`);
      }
    } else if (name === "GoldRate") {
      updatedProduct.GoldRate = parseFloat(value);
      updatedProduct.PurityRate = parseFloat(value);
      updatedProduct.TodaysRate = parseFloat(value);
    } else if (name === "ProductId") {
      const [productIdNumber, productTypeName] = value.split(",");
      updatedProduct.ProductId = parseInt(productIdNumber);
      updatedProduct.ProductName = productTypeName;
    } else if (name === "DesignId") {
      const [selectedUnlabelId, collectionNameSelected, collectionIdSelected] =
        value.split(",");
      updatedProduct.DesignName = collectionNameSelected;
      updatedProduct.DesignId = parseInt(selectedUnlabelId);
      // Trial
      updatedProduct.Purity = "";
      // let availablePurity = allUnlabelList.filter(
      //   (x) => x.id === parseInt(selectedUnlabelId)
      // )[0].purity;
      let availablePurity = allUnlabelList.filter(
        (x) => x.DesignName === collectionNameSelected
      );
      // updatedProduct.purity = availablePurity;
      // filteredPuritiesUnlabel = availablePurity;
      // return filteredPuritiesUnlabel;
      // Trial

      // updatedProduct.DesignId = collectionIdSelected;
    } else if (name === "PurityId") {
      const [selectedPurityId, selectedPurityName, selectedPurityRate] =
        value.split(",");
      setSelectedPurity(selectedPurityName);
      updatedProduct.PurityId = parseInt(selectedPurityId);
      updatedProduct.PurityName = selectedPurityName;
      updatedProduct.GoldRate = selectedPurityRate;
      updatedProduct.PurityRate = selectedPurityRate;
      updatedProduct.Purity = selectedPurityName;
      updatedProduct.TodaysRate = parseFloat(selectedPurityRate);
      updatedProduct.SelectedUnlabelId = selectedPurityId;
      updatedProduct.Id = parseInt(selectedPurityId);

      let availableQty = allUnlabelList
        .filter(
          (x) =>
            x.PurityId === parseInt(selectedPurityId) &&
            x.DesignId === updatedProduct.DesignId
        )
        .reduce((a, b) => a + parseFloat(b.Quantity), 0);
      console.log(availableQty, "availableQty");
      console.log(availableQty, "availableQty");
      console.log(availableQty, "availableQty");
      let availableGrossWt = allUnlabelList
        .filter(
          (x) =>
            x.PurityId === parseInt(selectedPurityId) &&
            x.DesignId === updatedProduct.DesignId
        )
        .reduce((a, b) => a + parseFloat(b.TotalGrossWt), 0);

      let availableNetWt = allUnlabelList
        .filter(
          (x) =>
            x.PurityId === parseInt(selectedPurityId) &&
            x.DesignId === updatedProduct.DesignId
        )
        .reduce((a, b) => a + parseFloat(b.TotalNetWt), 0);
      let availableFineWastage = allUnlabelList
        .filter(
          (x) =>
            x.PurityId === parseInt(selectedPurityId) &&
            x.DesignId === updatedProduct.DesignId
        )
        .reduce((a, b) => a + parseFloat(b.FinePlusWastageWeight), 0);
      updatedProduct.MaxQuantity = availableQty;
      // updatedProduct.grosswt = availableGrossWt;
      // updatedProduct.netwt = availableNetWt;
      updatedProduct.MaxGrossWt = availableGrossWt;
      updatedProduct.MaxNetWt = availableNetWt;
      updatedProduct.FinePercent = availableFineWastage;
    } else {
      updatedProduct[name] = value !== "" || value >= 0 ? value : 0;
    }
    console.log(updatedProduct, "updatedProduct");
    console.log(updatedProduct, "updatedProduct");
    console.log(updatedProduct, "updatedProductUnlabel");
    // Set the state of the purchaseProduct object with the updatedProduct object
    setUnlabelProduct(updatedProduct);

    // Calculate purchase price based on the updatedProduct object
    calculateUnlabelPrice(updatedProduct);

    // Rest of the function logic...
  };

  const handleInputChangeWholesale = (e) => {
    const { name, value } = e.target;
    const updatedProduct = { ...wholesaleProduct }; // Create a copy of the purchaseProduct object
    const grosswt = parseFloat(updatedProduct.GrossWt) || 0;
    const stoneWeight = parseFloat(updatedProduct.TotalStoneWeight) || 0;
    // console.log(name, "name");
    // console.log(name, "name");
    // console.log(value, "value");
    // console.log(value, "value");
    // Update the edited data in the updatedProduct object
    if (name === "CategoryId") {
      const [selectedCategoryId, selectedCategoryName] = value.split(",");
      setSelectedCategory(selectedCategoryName),
        (updatedProduct.CategoryId = selectedCategoryId),
        (updatedProduct.CategoryName = selectedCategoryName);
      (updatedProduct.ProductId = ""),
        (updatedProduct.ProductName = ""),
        (updatedProduct.DesignId = ""),
        (updatedProduct.TotalStoneAmount = 0),
        (updatedProduct.GrossWt = "0"),
        (updatedProduct.NetWt = "0")((updatedProduct.GoldRate = "0")),
        (updatedProduct.FinePercent = "0"),
        (updatedProduct.making = "0"),
        (updatedProduct.NetAmt = "0"),
        (updatedProduct.GSTAmount = "0"),
        (updatedProduct.TotalAmt = "0"),
        (updatedProduct.Quantity = "1"),
        (updatedProduct.PurityRate = "0"),
        (updatedProduct.PurityId = "0"),
        (updatedProduct.finalPrice = "0"),
        (updatedProduct.totalGstAmount = "0"),
        (updatedProduct.purchase = false),
        (updatedProduct.order = false),
        (updatedProduct.wholesale = true),
        (updatedProduct.unlabel = false),
        (updatedProduct.TodaysRate = "0");
    } else if (name === "GrossWt") {
      if (stoneWeight < value) {
        updatedProduct.NetWt = parseFloat(
          parseFloat(value) - parseFloat(updatedProduct.TotalStoneWeight)
        ).toFixed(3);
        updatedProduct.GrossWt = value;
      } else {
        updatedProduct.GrossWt = value;
        updatedProduct.NetWt = value;
        updatedProduct.TotalStoneWeight = 0;
      }
    } else if (name === "StoneWt" || name === "TotalStoneWt") {
      if (value < grosswt) {
        updatedProduct.NetWt = parseFloat(
          parseFloat(updatedProduct.GrossWt) - parseFloat(value)
        ).toFixed(3);
        updatedProduct.TotalStoneWeight = value;
      } else {
        (updatedProduct.NetWt = 0), (updatedProduct.GrossWt = value);
      }
    } else if (name === "NetWt") {
      if (value < grosswt) {
        updatedProduct.TotalStoneWeight = parseFloat(
          parseFloat(updatedProduct.GrossWt) - parseFloat(value)
        ).toFixed(3);
        updatedProduct.NetWt = value;
      } else {
        updatedProduct.TotalStoneWeight = 0;
        updatedProduct.NetWt = value;
        updatedProduct.GrossWt = value;
      }
    } else if (name === "PurityId") {
      const [selectedPurityName, selectedPurityRate] = value.split(",");
      setSelectedPurity(selectedPurityName);
      updatedProduct.PurityName = selectedPurityName;
      updatedProduct.GoldRate = selectedPurityRate;
      updatedProduct.PurityRate = selectedPurityRate;
      updatedProduct.FinePercent = 100;
      updatedProduct.TodaysRate = parseFloat(selectedPurityRate);
    } else if (name === "GoldRate") {
      if (value !== "") {
        updatedProduct.FinePercent = 100;
        updatedProduct.GoldRate = parseFloat(value);
        updatedProduct.PurityRate = parseFloat(value);
        updatedProduct.TodaysRate = parseFloat(value);
      } else {
        updatedProduct.FinePercent = 0;
        updatedProduct.GoldRate = 0;
        updatedProduct.PurityRate = 0;
        updatedProduct.TodaysRate = 0;
      }
    } else if (name === "ProductId") {
      const [productIdNumber, productTypeName] = value.split(",");
      updatedProduct.ProductId = parseInt(productIdNumber);
      updatedProduct.ProductName = productTypeName;
    } else if (name === "DesignName") {
      const [selectedUnlabelId, collectionNameSelected] = value.split(",");
      updatedProduct.DesignName = collectionNameSelected;
      // Trial
      updatedProduct.PurityId = "";
    } else if (name === "FinePercent") {
      if (value !== "") {
        updatedProduct.FinePercent = value;
      } else {
        updatedProduct.FinePercent = 0;
      }
    } else if (name === "WastagePercent") {
      if (value !== "") {
        updatedProduct.WastagePercent = value;
      } else {
        updatedProduct.WastagePercent = 0;
      }
    } else {
      updatedProduct[name] = value !== "" || value >= 0 ? value : 0;
    }
    // Set the state of the purchaseProduct object with the updatedProduct object
    setWholesaleProduct(updatedProduct);
    console.log(updatedProduct, "updatedProduct");
    console.log(updatedProduct, "updatedProduct");
    // setSelectedProduct(updatedProduct);
    // Calculate purchase price based on the updatedProduct object
    // calculateOrderPrice(updatedProduct);
    calculateWholesaleProductFinalPrice(updatedProduct);

    // Rest of the function logic...
  };

  const calculatePurchasePrice = (product) => {
    let FineRate =
      (parseFloat(product.FinePercent) * parseFloat(product.PurityRate)) / 1000;
    let netRate = parseFloat(
      parseFloat(FineRate) *
        parseFloat(product.NetWt) *
        parseFloat(product.Quantity)
    ).toFixed(3);
    // let gstRate = parseFloat(netRate) * 0.03;
    let gstRate = 0;
    let totalRate = parseFloat(parseFloat(netRate));

    setPurchaseProduct({
      ...product,
      NetAmt: netRate,
      GSTAmount: gstRate,
      TotalAmt: totalRate,
      PurchaseAmount: totalRate,
      finalPrice: `${-netRate + gstRate}`,
      totalGstAmount: `${-gstRate}`,
    });

    // setOldGoldAmount(parseFloat(totalRate).toFixed(0));
    // setGrandTotal(grandTotal - totalRate);
    // setPaymentAmount(grandTotal - totalRate);
    // Clear the input fields
    // setPaymentOptions("Cash");

    // setGrandTotal(
    //   parseInt(grandTotal) - parseInt(purchaseProduct.PurchaseAmount)
    // );
  };
  const calculateOrderPrice = (product) => {
    let FineRate =
      (parseFloat(product.Finepercent) * parseFloat(product.purityRate)) / 1000;
    let netRate = parseFloat(
      parseFloat(FineRate) *
        parseFloat(product.netwt) *
        parseFloat(product.Quantity)
    ).toFixed(3);
    let gstRate = parseFloat(netRate) * 0.03;
    // let gstRate = 0;
    let totalRate = parseFloat(netRate) + gstType ? parseFloat(gstRate) : 0;

    setWholesaleProduct({
      ...product,
      NetAmt: netRate,
      GSTAmount: gstRate,
      TotalAmt: totalRate,

      OrderAmount: totalRate,
      finalPrice: `${parseFloat(netRate)}`,
      totalGstAmount: `${gstType ? gstRate : 0}`,
    });

    // setOldGoldAmount(parseFloat(totalRate).toFixed(0));
    // setGrandTotal(grandTotal - totalRate);
    // setPaymentAmount(grandTotal - totalRate);
    // Clear the input fields
    // setPaymentOptions("Cash");

    // setGrandTotal(
    //   parseInt(grandTotal) - parseInt(purchaseProduct.PurchaseAmount)
    // );
  };

  const calculateUnlabelPrice = (unlabelProduct) => {
    let FineRate = (100 * parseFloat(unlabelProduct.PurityRate)) / 1000;
    let netRate = parseFloat(
      parseFloat(FineRate) * parseFloat(unlabelProduct.NetWt)
    ).toFixed(3);
    let totalRate = parseFloat(parseFloat(netRate));

    let netGoldRate =
      (parseFloat(unlabelProduct.NetWt) * parseFloat(unlabelProduct.GoldRate)) /
      10;
    let makingCharges1 =
      parseFloat(unlabelProduct.NetWt) *
      parseFloat(unlabelProduct.MakingPerGram);
    let makingCharges2 =
      (parseFloat(netGoldRate) * parseFloat(unlabelProduct.MakingPercentage)) /
      100;
    let makingCharges3 = parseFloat(unlabelProduct.MakingFixedAmt);
    let makingCharges4 =
      (parseFloat(unlabelProduct.GoldRate) *
        parseFloat(unlabelProduct.MakingFixedWastage)) /
      10;

    let totalMaking =
      parseFloat(makingCharges1) +
      parseFloat(makingCharges2) +
      parseFloat(makingCharges3) +
      parseFloat(makingCharges4);
    let gstRate = (parseFloat(netRate) + parseFloat(totalMaking)) * 0.03;

    setUnlabelProduct({
      ...unlabelProduct,
      NetAmt: parseFloat(netRate) + parseFloat(totalMaking),
      making: parseFloat(totalMaking),
      GSTAmount: gstRate,
      TotalAmt:
        parseFloat(netRate) + parseFloat(totalMaking) + parseFloat(gstRate),
      UnlabelAmount: parseFloat(
        parseFloat(netRate) +
          (gstType ? parseFloat(gstRate) : 0) +
          parseFloat(totalMaking)
      ).toFixed(3),
      finalPrice: `${parseFloat(netRate) + parseFloat(totalMaking)}`,
      totalGstAmount: `${gstRate}`,
    });

    // setOldGoldAmount(parseFloat(totalRate).toFixed(0));
    // setGrandTotal(grandTotal - totalRate);
    // setPaymentAmount(grandTotal - totalRate);
    // Clear the input fields
    // setPaymentOptions("Cash");

    // setGrandTotal(
    //   parseInt(grandTotal) - parseInt(purchaseProduct.PurchaseAmount)
    // );
  };
  const calculateOrderProductPrice = (wholesaleProduct) => {
    let FineRate = (100 * parseFloat(wholesaleProduct.PurityRate)) / 1000;
    let netRate = parseFloat(
      parseFloat(FineRate) * parseFloat(wholesaleProduct.NetWt)
    ).toFixed(3);
    let totalRate = parseFloat(parseFloat(netRate));

    let netGoldRate =
      (parseFloat(wholesaleProduct.NetWt) *
        parseFloat(wholesaleProduct.GoldRate)) /
      10;
    let makingCharges1 =
      parseFloat(wholesaleProduct.NetWt) *
      parseFloat(wholesaleProduct.MakingPerGram);
    let makingCharges2 =
      (parseFloat(netGoldRate) *
        parseFloat(wholesaleProduct.MakingPercentage)) /
      100;
    let makingCharges3 = parseFloat(wholesaleProduct.MakingFixedAmt);
    let makingCharges4 =
      (parseFloat(wholesaleProduct.GoldRate) *
        parseFloat(wholesaleProduct.MakingFixedWastage)) /
      10;

    let totalMaking =
      parseFloat(makingCharges1) +
      parseFloat(makingCharges2) +
      parseFloat(makingCharges3) +
      parseFloat(makingCharges4);
    let gstRate = (parseFloat(netRate) + parseFloat(totalMaking)) * 0.03;
    setWholesaleProduct({
      ...wholesaleProduct,
      NetAmt: parseFloat(netRate) + parseFloat(totalMaking),
      making: parseFloat(totalMaking),
      GSTAmount: gstRate,
      TotalAmt:
        parseFloat(netRate) + parseFloat(totalMaking) + parseFloat(gstRate),
      UnlabelAmount: parseFloat(
        parseFloat(netRate) + parseFloat(gstRate) + parseFloat(totalMaking)
      ).toFixed(3),
      finalPrice: `${parseFloat(netRate) + parseFloat(totalMaking)}`,
      totalGstAmount: `${gstRate}`,
    });

    // setOldGoldAmount(parseFloat(totalRate).toFixed(0));
    // setGrandTotal(grandTotal - totalRate);
    // setPaymentAmount(grandTotal - totalRate);
    // Clear the input fields
    // setPaymentOptions("Cash");

    // setGrandTotal(
    //   parseInt(grandTotal) - parseInt(purchaseProduct.PurchaseAmount)
    // );
  };
  // console.log(allProductTypes);
  // console.log(purchaseProduct);

  const addPurchaseProductToList = (selectedProduct) => {
    // if (!allSelectedProducts.some((x) => x.id === selectedProduct.id)) {

    if (
      selectedProduct.purchase === true &&
      selectedProduct.ProductName !== "" &&
      selectedProduct.PurchaseAmount !== 0
    ) {
      setAllSelectedProducts((prevItems) => [...prevItems, selectedProduct]);
      setLabelName("");
      setSelectedProduct([]);
      setCategoryName("");
      setProductName("");
      setCollectionName("");
      setPurityType("");
      setProductQty("");
      setSelectedProductPrice(0);
      scrollToCenter("adminInvoiceSelectLabelBox");
      setPurchaseProduct({
        CategoryName: "",
        ProductName: "",
        Id: 0,
        CustomerId: "",
        GrossWt: "0",
        NetWt: "0",
        StoneWt: "0",
        StoneAmount: "0",
        MRP: "0",
        HallmarkAmount: "0",
        making: "0",
        MakingFixedAmt: "0",
        MakingPercentage: "0",
        MakingPerGram: "0",
        MakingFixedWastage: "0",
        GoldRate: "0",
        Finepercent: "100",
        making: "0",
        NetAmt: "0",
        GSTAmount: "0",
        TotalAmt: "0",
        Quantity: "1",
        PurchaseAmount: "0",
        purchase_invoice_no: "",
        PurityRate: "0",
        PurityName: "100",
        FinePercent: "100",
        finalPrice: "0",
        totalGstAmount: "0",
        purchase: true,
        unlabel: false,
        order: false,
        wholesale: false,
      });
      setUnlabelProduct({
        CategoryName: "",
        CategoryId: "",
        ProductTypeId: "",
        ProductName: "",
        DesignName: "",
        SelectedUnlabelId: 0,
        GrossWt: "0",
        NetWt: "0",
        TotalStoneWeight: "0",
        StoneAmount: "0",
        MRP: "0",
        HallmarkAmount: "0",
        GoldRate: "0",
        FinePercent: "0",
        MakingFixedAmt: "0",
        MakingPercentage: "0",
        MakingPerGram: "0",
        MakingFixedWastage: "0",
        making: "0",
        NetAmt: "0",
        MaxQuantity: "0",
        MaxGrossWt: "0",
        MaxNetWt: "0",
        GSTAmount: "0",
        TotalAmt: "0",
        Quantity: "1",
        UnlabelAmount: "0",
        PurityRate: "0",
        PurityId: "",
        PurityName: "100",
        finalPrice: "0",
        totalGstAmount: "0",
        purchase: false,
        unlabel: true,
        TodaysRate: "0",
      });
      setActive("Sell");
    } else if (
      selectedProduct.unlabel === true &&
      selectedProduct.purchase === false &&
      selectedProduct.collectionName !== "" &&
      selectedProduct.TotalAmt !== 0
    ) {
      setAllSelectedProducts((prevItems) => [...prevItems, selectedProduct]);
      setLabelName("");
      setSelectedProduct([]);
      setCategoryName("");
      setProductName("");
      setCollectionName("");
      setPurityType("");
      setProductQty("");
      setSelectedProductPrice(0);
      scrollToCenter("adminInvoiceSelectLabelBox");
      setPurchaseProduct({
        CategoryName: "",
        ProductName: "",
        Id: 0,
        CustomerId: "",
        GrossWt: "0",
        NetWt: "0",
        StoneWt: "0",
        StoneAmount: "0",
        MRP: "0",
        HallmarkAmount: "0",
        making: "0",
        MakingFixedAmt: "0",
        MakingPercentage: "0",
        MakingPerGram: "0",
        MakingFixedWastage: "0",
        GoldRate: "0",
        Finepercent: "100",
        making: "0",
        NetAmt: "0",
        GSTAmount: "0",
        TotalAmt: "0",
        Quantity: "1",
        PurchaseAmount: "0",
        PurchaseInvoiceNo: "",
        PurityRate: "0",
        PurityName: "100",
        FinePercent: "100",
        finalPrice: "0",
        totalGstAmount: "0",
        purchase: true,
        unlabel: false,
        order: false,
        wholesale: false,
      });
      setUnlabelProduct({
        CategoryName: "",
        CategoryId: "",
        ProductTypeId: "",
        ProductNameName: "",
        DesignName: "",
        SelectedUnlabelId: 0,
        GrossWt: "0",
        NetWt: "0",
        TotalStoneWeight: "0",
        StoneAmount: "0",
        MRP: "0",
        HallmarkAmount: "0",
        GoldRate: "0",
        FinePercent: "0",
        MakingFixedAmt: "0",
        MakingPercentage: "0",
        MakingPerGram: "0",
        MakingFixedWastage: "0",
        making: "0",
        NetAmt: "0",
        MaxQuantity: "0",
        MaxGrossWt: "0",
        MaxNetWt: "0",
        GSTAmount: "0",
        TotalAmt: "0",
        Quantity: "1",
        UnlabelAmount: "0",
        PurityRate: "0",
        PurityId: "100",
        PurityName: "100",
        finalPrice: "0",
        totalGstAmount: "0",
        purchase: false,
        unlabel: true,
        TodaysRate: "0",
      });
      setActive("Sell");
    } else {
      alert("Please Correct errors");
    }
    // } else {
    // alert("Product Already added");
    // setSelectedProduct([]);
    // }
  };

  const addWholesaleProductToList = (selectedProduct) => {
    // if (!allSelectedProducts.some((x) => x.id === selectedProduct.id)) {

    if (
      selectedProduct.wholesale === true &&
      selectedProduct.productname !== ""
      // &&      selectedProduct.PurchaseAmount !== 0
    ) {
      setAllSelectedProducts((prevItems) => [...prevItems, selectedProduct]);
      setLabelName("");
      setCategoryName("");
      setProductName("");
      setCollectionName("");
      setPurityType("");
      setProductQty("");
      setSelectedProductPrice(0);
      scrollToCenter("adminInvoiceSelectLabelBox");
      setWholesaleProduct({
        CategoryName: "",
        CategoryId: "",
        ProductId: "",
        ProductName: "",
        DesignName: "",
        Id: 0,
        GrossWt: "0",
        NetWt: "0",
        TotalStoneWeight: "0",
        TotalStoneAmount: "0",
        MRP: "0",
        HallmarkAmount: "0",
        GoldRate: "0",
        FinePercent: "0",
        making: "0",
        MakingFixedAmt: "0",
        MakingPercentage: "0",
        MakingPerGram: "0",
        MakingFixedWastage: "0",
        NetAmt: "0",
        MaxQuantity: "0",
        MaxGrossWt: "0",
        MaxNetWt: "0",
        GSTAmount: "0",
        TotalAmt: "0",
        Quantity: "1",
        UnlabelAmount: "0",
        PurityRate: "0",
        PurityId: "0",
        PurityName: "0",
        finalPrice: "0",
        totalGstAmount: "0",
        ConvertAmount: convertAmount,
        TotalItemAmount: "0",
        purchase: false,
        unlabel: false,
        order: false,
        wholesale: true,
        TodaysRate: "0",
      });

      // setSelectedProduct([]);
      setActive("Sell");
      setWholesaleProductLabelName("");
      setLabelName("");
    } else {
      alert("Please Correct errors");
    }
    setWholesaleProductLabelName("");
    setSelectedProduct([]);
    // if (!convertAmount) {
    //   setGstType(false);
    //   setApplyGstAmount(false);
    //   handleGstType();
    //   // setApplyGstAmount(false);
    // }
    // } else {
    // alert("Product Already added");
    // setSelectedProduct([]);
    // }
  };

  console.log(gstType, "gstType");
  console.log(applyGstAmount, "applyGstAmount");
  useEffect(() => {
    const totalPurchaseAmount = allSelectedProducts
      .filter((x) => x.purchase === true)
      .reduce(
        (total, product) => total + parseFloat(product.PurchaseAmount),
        0
      );
    setOldGoldAmount(totalPurchaseAmount);
    setPurchaseProductList(
      allSelectedProducts.filter((x) => x.purchase === true)
    );
    setUnlabelProductList(
      allSelectedProducts.filter((x) => x.unlabel === true)
    );
    setWholesaleProductList(
      allSelectedProducts.filter((x) => x.wholesale === true)
    );
    setlabelProductList(allSelectedProducts.filter((x) => x.sell === true));

    // console.log(purchaseProductList, "onlyPurchaseProducts");
  }, [allSelectedProducts]);
  const removePurchaseProductFromList = (index) => {
    const updatedProductList = allSelectedProducts.filter(
      (_, i) => i !== index
    );
    setAllSelectedProducts(updatedProductList);
  };

  // console.log(purchaseProductList, "purchaseProductList");
  // console.log(selectedCustomer, "selectedCustomer");
  // console.log(selectedProduct);
  // console.log(openEditProduct, "openEditProduct");
  // console.log(paymentsString, "paymentsString");
  const filteredProducts = allProductTypes.filter(
    (product) => product.CategoryId == purchaseProduct.CategoryId
  );
  const filteredPurities = allPurities.filter((product) => {
    if (purchaseProduct.CategoryName === "Old Gold") {
      return product.CategoryId == 1;
    } else {
      return product.CategoryId == purchaseProduct.CategoryId;
    }
  });

  const filteredProductsUnlabel = allProductTypes.filter(
    (product) => product.CategoryId == unlabelProduct.CategoryId
  );
  const filteredProductsWholesale = allProductTypes.filter(
    (product) => product.CategoryId == wholesaleProduct.CategoryId
  );

  // const filteredPuritiesUnlabel = allPurities.filter((product) => {
  //   if (unlabelProduct.CategoryName === "Old Gold") {
  //     return product.category == "Gold";
  //   } else {
  //     return product.category == unlabelProduct.CategoryName;
  //   }
  // });
  // let filteredPuritiesUnlabel = [];
  // useEffect(() => {
  //   filteredPuritiesUnlabel = allPurities.filter((product) => {
  //     return (
  //       product.purity == unlabelProduct.purity &&
  //       product.category.toLowerCase() ==
  //         unlabelProduct.CategoryName.toLowerCase()
  //     );
  //   });
  // }, [unlabelProduct]);

  // {filteredUnlabelCollection
  //   .reduce((unique, item) => {
  //     // Check if there is already an item with the same collection in the unique array
  //     if (
  //       !unique.some(
  //         (x) => x.collection === item.collection
  //       )
  //     ) {
  //       unique.push(item); // If not, add this item to the unique array
  //     }
  //     return unique;
  //   }, [])

  // let filteredPuritiesUnlabel = allUnlabelList.filter((product) => {
  //   return (
  //     product.collection == unlabelProduct.collectionName
  //    );
  // });
  const filteredByCollection = allUnlabelList.filter(
    (product) => product.DesignId === unlabelProduct.DesignId
  );

  let filteredPuritiesUnlabel = filteredByCollection.reduce(
    (unique, product) => {
      // Check if the purity of the current product is already in the unique list
      const isPurityUnique = !unique.some(
        (uniqueProduct) => uniqueProduct.PurityId == product.PurityId
      );
      if (isPurityUnique) {
        // If the purity is unique, add the product to the list of unique products
        unique.push(product);
      }
      return unique;
    },
    []
  );

  const filteredPuritiesWholesaleProduct = allPurities.filter((product) => {
    return (
      product.CategoryId == wholesaleProduct.CategoryId
      // &&
      // product.category.toLowerCase() ==
      //   unlabelProduct.CategoryName.toLowerCase()
    );
  });

  const filteredUnlabelCollection = allUnlabelList.filter(
    (product) => product.ProductId == unlabelProduct.ProductId
  );
  const filteredWholesaleCollection = allCollection.filter(
    (product) => product.ProductId == wholesaleProduct.ProductId
  );
  const handleMetalPaymentOption = (a, b) => {
    const { value } = b.target;
    if (paymentOptions === "Metal to Cash") {
      let totalAmount = 0;
      if (
        metalPaymentOption.optionSelected !== "" &&
        metalPaymentOption.optionSelected.toLowerCase().includes("gold")
      ) {
        if (a == "Rate") {
          totalAmount = (value / 10) * metalPaymentOption.fineWt;
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineRate: value,
            totalAmount: totalAmount,
          });
          setPaymentGold(metalPaymentOption.fineWt);
          setPaymentAmount(totalAmount);
          setDeductGold(0);
        } else {
          totalAmount = (metalPaymentOption.fineRate / 10) * value;
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineWt: value,
            totalAmount: totalAmount,
          });
          setPaymentAmount(totalAmount);
          setPaymentGold(value);
          setDeductGold(0);
        }
      } else {
        if (a == "Rate") {
          totalAmount = (value / 10) * metalPaymentOption.fineWt;
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineRate: value,
            totalAmount: totalAmount,
          });
          setPaymentSilver(metalPaymentOption.fineWt);
          setPaymentAmount(totalAmount);
          setDeductSilver(0);
        } else {
          totalAmount = (metalPaymentOption.fineRate / 10) * value;
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineWt: value,
            totalAmount: totalAmount,
          });
          setPaymentAmount(totalAmount);
          setPaymentSilver(value);
          setDeductSilver(0);
        }
      }
    } else if (paymentOptions === "Cash to Metal") {
      let fineWt = 0;
      if (
        metalPaymentOption.optionSelected !== "" &&
        metalPaymentOption.optionSelected.toLowerCase().includes("gold")
      ) {
        if (a == "Amount") {
          fineWt = parseFloat(
            (value * 10) / metalPaymentOption.fineRate
          ).toFixed(3);
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineWt: fineWt !== "" ? fineWt : 0,
            totalAmount: value,
            deductGold: fineWt !== "" ? fineWt : 0,
            deductSilver: 0,
          });
          setPaymentAmount(0);
          setDeductGold(fineWt !== "" ? fineWt : 0);
          setPaymentGold(fineWt !== "" ? fineWt : 0);
          setDeductSilver(0);
          // setPaymentMetal();
        } else {
          fineWt = parseFloat(
            (metalPaymentOption.totalAmount * 10) / value
          ).toFixed(3);
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineWt: fineWt !== "" ? fineWt : 0,
            fineRate: value,
            deductGold: fineWt !== "" ? fineWt : 0,
            deductSilver: 0,
          });
          // setPaymentAmount(totalAmount);
          setDeductGold(fineWt !== "" ? fineWt : 0);
          setPaymentGold(fineWt !== "" ? fineWt : 0);
          setDeductSilver(0);
        }
      } else {
        if (a == "Amount") {
          fineWt = (
            parseFloat(value * 10) / metalPaymentOption.fineRate
          ).toFixed(3);
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineWt: fineWt !== "" ? fineWt : 0,
            totalAmount: value,
            deductGold: 0,
            deductSilver: fineWt !== "" ? fineWt : 0,
          });
          setPaymentAmount(0);
          setDeductSilver(fineWt !== "" ? fineWt : 0);
          setPaymentSilver(fineWt !== "" ? fineWt : 0);
          setDeductGold(0);
          // setPaymentAmount(totalAmount);
        } else {
          fineWt = parseFloat(
            (metalPaymentOption.totalAmount * 10) / value
          ).toFixed(3);
          setMetalPaymentOption({
            ...metalPaymentOption,
            fineWt: fineWt !== "" ? fineWt : 0,
            fineRate: value,
            deductGold: 0,
            deductSilver: fineWt !== "" ? fineWt : 0,
          });
          // setPaymentAmount(totalAmount);
          setDeductSilver(fineWt !== "" ? fineWt : 0);
          setPaymentSilver(fineWt !== "" ? fineWt : 0);
          setDeductGold(0);
        }
      }
    }
  };
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);
  const button3Ref = useRef(null);
  const button4Ref = useRef(null);
  const button5Ref = useRef(null);
  const button6Ref = useRef(null);
  const button7Ref = useRef(null);
  const button8Ref = useRef(null);
  const button9Ref = useRef(null);
  const button10Ref = useRef(null);
  const button11Ref = useRef(null);
  const button12Ref = useRef(null);
  let totalPaidCashAmount = 0;
  useEffect(() => {
    totalPaidCashAmount = payments
      .filter((x) => x.mode == "Cash")
      .reduce((a, b) => parseInt(a) + parseInt(b.amount), 0);
  }, [payments, paymentAmount, paymentOptions]);
  const totalAmountInput = document.getElementById("totalAmount");
  const uniqueNamesSet = new Set();

  const handleDiscountPercentage = (e) => {
    const { value } = e.target;
    setDiscountPercentage(value);
    const totalMaking = allSelectedProducts.reduce(
      (total, item) => total + parseFloat(item.making),
      0
    );
    setDiscountAmount((parseFloat(totalMaking) / 100) * parseFloat(value));
    // alert("Here");
    if (allSelectedProducts.length > 0) {
      let totalNetAmount = allSelectedProducts.reduce(
        (total, product) => total + parseFloat(product.finalPrice),
        0
      );
      let totalGstAmount = allSelectedProducts.reduce(
        (total, product) => total + parseFloat(product.totalGstAmount),
        0
      );
      let totalAmountPaying = allSelectedProducts.reduce(
        (total, product) =>
          total +
          parseFloat(product.finalPrice) +
          parseFloat(product.totalGstAmount),
        0
      );
      setAllProdctsNetAmount(
        (
          parseFloat(totalNetAmount) -
          ((parseFloat(totalMaking) / 100) * parseFloat(value) * 100) / 100
        ).toFixed(3)
      );
      setAllProdctsGstAmount(
        (
          parseFloat(totalGstAmount) -
          ((parseFloat(totalMaking) / 100) * parseFloat(value) * 3) / 103
        ).toFixed(3)
      );
      setTotalPayableGstAmount(
        (
          parseFloat(totalGstAmount) -
          ((parseFloat(totalMaking) / 100) * parseFloat(value) * 3) / 103
        ).toFixed(3)
      );
      setTotalPayableAmount(
        (
          parseFloat(totalAmountPaying) -
          (parseFloat(totalMaking) / 97) * parseFloat(value)
        ).toFixed(3)
      );
      setGrandTotal(
        Math.ceil(
          parseFloat(totalAmountPaying) -
            (parseFloat(totalMaking) / 97) * parseFloat(value)
        ).toFixed(3)
      );
      setPaymentAmount(
        Math.ceil(
          parseFloat(totalAmountPaying) -
            (parseFloat(totalMaking) / 97) * parseFloat(value)
        ).toFixed(0)
      );
    }
    // setGrandTotal(
    //   (prev) =>
    //     parseFloat(prev) - (parseFloat(totalMaking) / 100) * parseFloat(value)
    // );
  };

  const handleGstType = () => {
    setApplyGstAmount(!applyGstAmount);
    if (!applyGstAmount) {
      setGstType(true);
    } else {
      setGstType(false);
    }
    setPayments([]);
    setDiscountAmount(0);
    setDiscountPercentage("0%");
  };

  const handlePendingApproval = () => {
    setGstType(false);
    setPendingApproval(true);
    console.log(pendingApproval);
    // checkPurchaseItems();
  };
  useEffect(() => {
    // This code runs after `pendingApproval` has been updated and the component has re-rendered.
    if (pendingApproval == true) {
      checkPurchaseItems();
    }
  }, [pendingApproval]);
  return (
    <div>
      <AdminHeading />

      <div className="adminMainBodyBox">
        {/* <AdminBreadCrump
          title={"New Invoice"}
          companyName={"Loyalstring"}
          module={"Trading"}
          page={"Invoice"}
        /> */}
        <div className="adminAddCategoryMainBox">
          <div
            style={{ marginBottom: "50px", paddingTop: "0px" }}
            className="adminAddCategoryInnerBox"
          >
            {/* {gstType ? (
              <DateTime showInv={true} gstType={true} />
            ) : (
              <DateTime showInv={true} gstType={false} />
            )} */}

            <div className="invoiceFormDateTimeBox">
              <DateTime
                dateRcvd={selectedDate ? selectedDate : null}
                showInv={true}
                gstType={gstType}
              />
              <div className="invoiceFormDateTimeSelectDateBox">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
            {/* <h4 className="adminInvoiceAddTitles">Add Customer</h4> */}
            <div
              id="adminInvoiceAddCustomerTitle"
              className="adminInvoiceSelectLabelBox"
            >
              <div className="adminInvoiceSelectItem">
                {/* <button >Check</button> */}
                <label>
                  {selectedCustomer && selectedCustomer.MemberType === "Vendor"
                    ? "Vendor"
                    : "Customer"}{" "}
                  Name
                </label>
                <input
                  style={{ width: "20vw" }}
                  type="text"
                  name="customerName"
                  value={customerName}
                  onInput={handleNameInputChange}
                  list="customerNamesList"
                />
                <datalist id="customerNamesList">
                  {allCsData.map((customer, index) => (
                    <option
                      style={{
                        color: `${
                          customer.MemberType == "Customer" ? "green" : "red"
                        }`,
                      }}
                      key={index}
                      value={
                        customer.MemberType == "Customer"
                          ? `👤 ${customer.FirstName} ${customer.LastName}`
                          : `🏢 ${customer.VendorName}`
                      }
                    />
                  ))}
                </datalist>
                <button
                  onClick={() => {
                    // checkIfNewCs();
                    navigate(
                      `/add_customer?openView=addNew&csName=${customerName}&csMobile=${customerMobile}&csAddress=${customerAddress}`
                    );
                  }}
                  className="adminInvoiceAddCustomerOption"
                >
                  <AiOutlinePlusSquare size={"20px"} />
                </button>
                {selectedCustomer ? (
                  <div className="adminInvoiceAddedCustomerEditIconBox">
                    <button
                      onClick={() => {
                        if (
                          selectedCustomer &&
                          selectedCustomer.MemberType == "Customer"
                        ) {
                          setSelectedCustomerEdit(!selectedCustomerEdit);
                          // scrollToCenter("adminInvoiceAddedCustomerEdit");
                          scrollToCenter(
                            "adminInvoiceAddProductsOptionsTypeBox"
                          );
                        } else {
                          navigate("/add_vendor");
                        }
                      }}
                    >
                      <AiOutlineEdit size={"20px"} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCustomer(null);
                        setCustomerName("");
                        scrollToCenter("adminInvoiceAddCustomerTitle");
                        // scrollToCenter("adminInvoiceAddProductsOptionsTypeBox");
                      }}
                      id="adminInvoiceAddedCustomerRemoveIcon"
                    >
                      <RiDeleteBin2Line size={"20px"} />
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="adminInvoiceSelectItem">
                <label>
                  {" "}
                  {selectedCustomer && selectedCustomer.MemberType === "Vendor"
                    ? "Vendor"
                    : "Customer"}{" "}
                  Mobile
                </label>
                <input
                  type="text"
                  name="customerMobile"
                  value={customerMobile}
                  onInput={handleMobileInputChange}
                  onBlur={() => {
                    if (!selectedCustomer) {
                      checkIfNewCs();
                    } else {
                      null;
                    }
                  }}
                  list="customerMobilesList"
                />
                <datalist id="customerMobilesList">
                  {allCsData.map((customer, index) => (
                    <option key={index} value={customer.Mobile} />
                  ))}
                </datalist>
              </div>
              {/* <div className="adminInvoiceSelectItem">
                <label>Customer Email</label>
                <input
                  type="text"
                  name="customerEmails"
                  value={customerEmail}
                  onInput={handleEmailInputChange}
                  list="customerEmailsList"
                />
                <datalist id="customerEmailsList">
                  {allCsData.map((customer) => (
                    <option key={customer.id} value={customer.email} />
                  ))}
                </datalist>
              </div> */}
              <div className="adminInvoiceSelectItem">
                <label>
                  {" "}
                  {selectedCustomer && selectedCustomer.MemberType === "Vendor"
                    ? "Vendor"
                    : "Customer"}{" "}
                  Address
                </label>
                <input
                  // onKeyPress={(e) => {
                  //   if (e.key == "Enter") {
                  //     checkIfNewCs();
                  //   }
                  // }}
                  type="text"
                  name="customerAddress"
                  value={customerAddress}
                  onInput={handleAddressInputChange}
                  list="customersAddressList"
                />
                <datalist id="customersAddressList">
                  {allCsData.map((customer, index) => (
                    <option key={index} value={customer.CurrAddStreet} />
                  ))}
                </datalist>
              </div>
              {selectedCustomer && selectedCustomer.MemberType === "Vendor" ? (
                <div
                  style={{ marginTop: "0px", marginBottom: "0px" }}
                  className="adminInvoiceSelectLabelBox"
                >
                  <div className="adminInvoiceSelectItem">
                    <label>Fine Gold : </label>
                    {/* <input
                  type="text"
                  readOnly
                  value={selectedCustomer ? selectedCustomer.fineGold : 0}
                /> */}
                    <h4 className="adminInvoiceSelectItemBalanceMetal">
                      {selectedCustomer ? selectedCustomer.FineGold : 0}
                    </h4>
                  </div>
                  <div className="adminInvoiceSelectItem">
                    <label>Fine Silver : </label>
                    {/* <input
                  type="text"
                  readOnly
                  value={selectedCustomer ? selectedCustomer.fineSilver : 0}
                /> */}
                    <h4 className="adminInvoiceSelectItemBalanceMetal">
                      {selectedCustomer ? selectedCustomer.FineSilver : 0}
                    </h4>
                  </div>
                  <div className="adminInvoiceSelectItem">
                    <label>Advance Amount : </label>
                    {/* <input
                  type="text"
                  readOnly
                  value={selectedCustomer ? selectedCustomer.advanceAmt : 0}
                  /> */}
                    <h4>
                      {selectedCustomer ? selectedCustomer.AdvanceAmt : 0}
                    </h4>
                  </div>
                  <div className="adminInvoiceSelectItem">
                    <label>Balance Amount : </label>
                    {/* <input
                  type="text"
                  readOnly
                  value={selectedCustomer ? selectedCustomer.balanceAmt : 0}
                  /> */}
                    <h4>
                      {selectedCustomer ? selectedCustomer.BalanceAmt : 0}
                    </h4>
                  </div>
                </div>
              ) : null}
            </div>

            {selectedCustomer &&
            !selectedCustomerEdit ? null : selectedCustomer &&
              selectedCustomerEdit ? (
              <div className="adminInvoiceAddedCustomerEditMainBox">
                <p>Personal Details</p>
                <div className="adminInvoiceAddedCustomerEditBox">
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>First Name</label>
                    <input
                      onChange={(e) =>
                        handleCustomerInputChange(e, "FirstName")
                      }
                      value={selectedCustomer.FirstName}
                      type="text"
                    />
                  </div>
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Last Name</label>
                    <input
                      onChange={(e) => handleCustomerInputChange(e, "LastName")}
                      value={selectedCustomer.LastName}
                      type="text"
                    />
                  </div>
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Mobile</label>
                    <input
                      onChange={(e) => handleCustomerInputChange(e, "Mobile")}
                      value={selectedCustomer.Mobile}
                      type="text"
                    />
                  </div>
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Aadhar No.</label>
                    <input
                      onChange={(e) => handleCustomerInputChange(e, "AadharNo")}
                      value={selectedCustomer.AadharNo}
                      type="text"
                    />
                  </div>
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Adv Amt</label>
                    <input
                      onChange={(e) =>
                        handleCustomerInputChange(e, "AdvanceAmount")
                      }
                      value={selectedCustomer.AdvanceAmount}
                      type="text"
                    />
                  </div>
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Bal Amount</label>
                    <input
                      onChange={(e) =>
                        handleCustomerInputChange(e, "BalanceAmount")
                      }
                      value={selectedCustomer.BalanceAmount}
                      type="text"
                    />
                  </div>
                  {/* <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Email</label>
                    <input
                      onChange={(e) => handleCustomerInputChange(e, "email")}
                      value={selectedCustomer.email}
                      type="text"
                    />
                  </div> */}

                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Pan No.</label>
                    <input
                      onChange={(e) => handleCustomerInputChange(e, "PanNo")}
                      value={selectedCustomer.PanNo}
                      type="text"
                    />
                  </div>
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>GSTIN No.</label>
                    <input
                      onChange={(e) => handleCustomerInputChange(e, "GstNo")}
                      value={selectedCustomer.GstNo}
                      type="text"
                    />
                  </div>
                </div>
                <p>Billing Add</p>
                <div className="adminInvoiceAddedCustomerEditBox">
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Street</label>
                    <input
                      onChange={(e) =>
                        handleCustomerInputChange(e, "CurrAddStreet")
                      }
                      value={selectedCustomer.CurrAddStreet}
                      type="text"
                    />
                  </div>
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Town</label>
                    <input
                      onChange={(e) =>
                        handleCustomerInputChange(e, "CurrAddTown")
                      }
                      value={selectedCustomer.CurrAddTown}
                      type="text"
                    />
                  </div>
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>State</label>
                    <select
                      required="required"
                      type="text"
                      name="state"
                      onChange={(e) =>
                        handleCustomerInputChange(e, "CurrAddState")
                      }
                      value={selectedCustomer.CurrAddState}
                    >
                      <option value="">Select a state</option>
                      {allStateList.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>

                    {/* <label>State</label>
                    <input
                      onChange={(e) =>
                        handleCustomerInputChange(e, "currAddState")
                      }
                      value={selectedCustomer.currAddState}
                      type="text"
                    /> */}
                  </div>
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Pincode</label>
                    <input
                      onChange={(e) =>
                        handleCustomerInputChange(e, "CurrAddPinCode")
                      }
                      value={selectedCustomer.CurrAddPinCode}
                      type="text"
                    />
                  </div>
                </div>
                <p>Per Add</p>
                <div className="adminInvoiceAddedCustomerEditBox">
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Street</label>
                    <input
                      onChange={(e) =>
                        handleCustomerInputChange(e, "PerAddStreet")
                      }
                      value={selectedCustomer.PerAddStreet}
                      type="text"
                    />
                  </div>
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Town</label>
                    <input
                      onChange={(e) =>
                        handleCustomerInputChange(e, "PerAddTown")
                      }
                      value={selectedCustomer.PerAddTown}
                      type="text"
                    />
                  </div>
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>State</label>
                    <select
                      required="required"
                      type="text"
                      name="state"
                      onChange={(e) =>
                        handleCustomerInputChange(e, "PerAddState")
                      }
                      value={selectedCustomer.PerAddState}
                    >
                      <option value="">Select a state</option>
                      {allStateList.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {/* <label>State</label>
                    <input
                      onChange={(e) =>
                        handleCustomerInputChange(e, "perAddState")
                      }
                      value={selectedCustomer.perAddState}
                      type="text"
                    /> */}
                  </div>
                  <div className="adminInvoiceAddedCustomerEditItems">
                    <label>Pincode</label>
                    <input
                      onChange={(e) =>
                        handleCustomerInputChange(e, "PerAddPinCode")
                      }
                      value={selectedCustomer.PerAddPinCode}
                      type="text"
                    />
                  </div>
                </div>
                <div className="adminInvoiceAddedCustomerEditButtonBox">
                  <button onClick={() => updateCustomerDetails()}>Save</button>
                  <button
                    onClick={() => {
                      scrollToCenter("adminInvoiceAddCustomerTitle"),
                        setSelectedCustomerEdit(!selectedCustomerEdit);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}

            <h4
              id="adminInvoiceAddedCustomerEdit"
              className="adminInvoiceAddTitles"
            >
              Add Product
            </h4>

            <div className="adminInvoiceAddProductsOptionsTypeBox">
              <div className="adminAddCategoryInnerBoxTitlesBox">
                <button
                  tabIndex="1"
                  onClick={() => {
                    setActive("Sell");
                  }}
                  style={{ height: "40px" }}
                  className={
                    active === "Sell"
                      ? "adminAddCategoryInnerBoxTitle"
                      : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                  }
                >
                  <div
                    className={
                      active === "Sell"
                        ? "adminAddCategoryInnerBoxTitleLogo"
                        : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                    }
                    style={{
                      height: "20px",
                      width: "20px",
                      padding: "3px",
                      marginInline: "3px",
                    }}
                  >
                    {/* 01 */}
                    <AiOutlineSend size={"15px"} />
                  </div>
                  <p style={{ fontSize: "12px" }}>Sell</p>
                </button>

                <button
                  onClick={() => {
                    allSelectedProducts.filter((x) => x.order || x.wholesale)
                      .length > 0
                      ? alert("Could Not Add Purchase Item in Existing Bill")
                      : setActive("Purchase");
                  }}
                  style={{ height: "40px" }}
                  className={
                    active === "Purchase"
                      ? "adminAddCategoryInnerBoxTitle"
                      : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                  }
                >
                  <div
                    style={{
                      height: "20px",
                      width: "20px",
                      padding: "3px",
                      marginInline: "3px",
                    }}
                    className={
                      active === "Purchase"
                        ? "adminAddCategoryInnerBoxTitleLogo"
                        : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                    }
                  >
                    {/* 02 */}

                    <LiaCartPlusSolid size={"30px"} />
                  </div>
                  <p style={{ fontSize: "12px" }}>Purchase</p>
                </button>
                <button
                  onClick={() => {
                    allSelectedProducts.filter((x) => x.order || x.wholesale)
                      .length > 0
                      ? alert("Could Not Add Unlabel Item in Existing Bill")
                      : setActive("Unlabel");
                  }}
                  style={{ height: "40px" }}
                  className={
                    active === "Unlabel"
                      ? "adminAddCategoryInnerBoxTitle"
                      : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                  }
                >
                  <div
                    style={{
                      height: "20px",
                      width: "20px",
                      padding: "3px",
                      marginInline: "3px",
                    }}
                    className={
                      active === "Unlabel"
                        ? "adminAddCategoryInnerBoxTitleLogo"
                        : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                    }
                  >
                    {/* 02 */}

                    <MdOutlineLabelOff size={"17px"} />
                  </div>
                  <p style={{ fontSize: "12px" }}>Unlabel</p>
                </button>
                <button
                  onClick={() => {
                    // allSelectedProducts.filter(
                    //   (x) => x.purchase || x.sell || x.unlabel || x.wholesale
                    // ).length > 0
                    //   ? alert("Could Not Add Wholesale in Existing Bill")
                    //   :
                    setActive("Wholesale");
                  }}
                  style={{ height: "40px" }}
                  className={
                    active === "Wholesale"
                      ? "adminAddCategoryInnerBoxTitle"
                      : "adminAddCategoryInnerBoxTitle activeCategoryTitle"
                  }
                >
                  <div
                    style={{
                      height: "20px",
                      width: "20px",
                      padding: "3px",
                      marginInline: "3px",
                    }}
                    className={
                      active === "Wholesale"
                        ? "adminAddCategoryInnerBoxTitleLogo"
                        : "adminAddCategoryInnerBoxTitleLogo activeCategoryLogo"
                    }
                  >
                    {/* 02 */}

                    <MdOutlineLabelOff size={"17px"} />
                  </div>
                  <p style={{ fontSize: "12px" }}>Wholesale</p>
                </button>
              </div>
            </div>
            <div className="adminInviceAddedProductsTotalItemBox adminInvoiceAddProductsOptionsMainSkuBox">
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
                  <option key={index} value={`${sku.StockKeepingUnit}`} />
                ))}
              </datalist>
              {/* <label style={{ marginLeft: "10px" }}>Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              /> */}
            </div>
            {active === "Sell" ? (
              <div className="adminInvoiceAddProductsOptionsMainSellBox">
                {!productsLoading ? (
                  <div className="adminInvoiceAddProductsOptionsMainBox">
                    <div
                      id="adminInvoiceAddProductsOptionsInnerBox"
                      className="adminInvoiceAddProductsOptionsInnerBox"
                    >
                      <table>
                        <thead>
                          <tr>
                            <th>ITEM DETAILS</th>
                            <th>RATE</th>
                            <th>GROSS WT</th>
                            <th>NET WT</th>
                            <th>PURITY</th>
                            <th>MAKING</th>
                            <th>PRICE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allSelectedProducts.length > 0
                            ? allSelectedProducts.map((x, index) => {
                                let image1 = x.images
                                  ? x.images.split(",")[0]
                                  : "";
                                return (
                                  <tr
                                    key={index}
                                    style={{
                                      borderBottom:
                                        "1px solid  rgba(128, 128, 128, 0.3)",
                                    }}
                                  >
                                    <td>
                                      <div className="adminAddInvoiceMainAddLabelOption">
                                        <div className="adminAddInvoiceMainAddLabelOptionImageBox">
                                          {x.sell && image1 !== "" ? (
                                            <img
                                              src={`${s1}/${image1}`}
                                              style={{
                                                maxWidth: "50px",
                                                maxHeight: "50px",
                                                // margin: "5px",
                                              }}
                                            />
                                          ) : (
                                            <BsCardImage size={"30px"} />
                                          )}
                                        </div>
                                        <div className="adminAddInvoiceMainAddLabelOptionLabelBox">
                                          {x.purchase ? (
                                            <p
                                              style={{
                                                textAlign: "left",
                                                margin: "5px",
                                                padding: "5px",
                                                marginBottom: "0px",
                                                paddingBottom: "0px",
                                                color: "red",
                                              }}
                                            >
                                              Purchase
                                            </p>
                                          ) : x.unlabel ? (
                                            <p
                                              style={{
                                                textAlign: "left",
                                                margin: "5px",
                                                padding: "5px",
                                                marginBottom: "0px",
                                                paddingBottom: "0px",
                                                color: "green",
                                              }}
                                            >
                                              Unlabel
                                            </p>
                                          ) : x.wholesale ? (
                                            <p
                                              style={{
                                                textAlign: "left",
                                                margin: "5px",
                                                padding: "5px",
                                                marginBottom: "0px",
                                                paddingBottom: "0px",
                                                color: "purple",
                                              }}
                                            >
                                              Wholesale
                                            </p>
                                          ) : x.sell ? (
                                            <p
                                              style={{
                                                textAlign: "left",
                                                margin: "5px",
                                                padding: "5px",
                                                marginBottom: "0px",
                                                paddingBottom: "0px",
                                                color: "#02a8b5",
                                              }}
                                            >
                                              {x.ItemCode}
                                            </p>
                                          ) : null}
                                          {x.purchase ? (
                                            <p
                                              style={{
                                                fontWeight: "bold",
                                                color: "red",
                                                fontSize: "10px",
                                                textAlign: "left",
                                                margin: "0px 5px",
                                                padding: "0px 5px",
                                              }}
                                            >
                                              {`${x.CategoryName}, ${x.ProductName}`}
                                            </p>
                                          ) : x.unlabel ? (
                                            <p
                                              style={{
                                                fontWeight: "bold",
                                                color: "green",
                                                fontSize: "10px",
                                                textAlign: "left",
                                                margin: "0px 5px",
                                                padding: "0px 5px",
                                              }}
                                            >
                                              {`${x.CategoryName}, ${x.ProductName}, ${x.DesignName}`}
                                            </p>
                                          ) : x.sell ? (
                                            <p
                                              style={{
                                                fontWeight: "bold",
                                                color: "#02a8b5",
                                                fontSize: "10px",
                                                textAlign: "left",
                                                margin: "0px 5px",
                                                padding: "0px 5px",
                                              }}
                                            >
                                              {`${x.CategoryName}, ${x.ProductName}, ${x.DesignName}`}
                                            </p>
                                          ) : x.wholesale ? (
                                            <p
                                              style={{
                                                fontWeight: "bold",
                                                color: "#02a8b5",
                                                fontSize: "10px",
                                                textAlign: "left",
                                                margin: "0px 5px",
                                                padding: "0px 5px",
                                              }}
                                            >
                                              {`${x.CategoryName}, ${x.ProductName}, ${x.DesignName}`}
                                            </p>
                                          ) : null}
                                        </div>
                                        <div className="adminAddInvoiceMainAddLabelOptionEditIconBox">
                                          <button
                                            onClick={() => {
                                              if (x.sell) {
                                                editItem(x);
                                              } else if (x.purchase) {
                                                setActive("Purchase"),
                                                  removePurchaseProductFromList(
                                                    index
                                                  ),
                                                  setPurchaseProduct(x);
                                              } else if (x.unlabel) {
                                                setActive("Unlabel"),
                                                  removePurchaseProductFromList(
                                                    index
                                                  ),
                                                  setUnlabelProduct(x);
                                              } else if (x.wholesale) {
                                                setActive("Wholesale"),
                                                  removePurchaseProductFromList(
                                                    index
                                                  ),
                                                  setWholesaleProduct(x),
                                                  setWholesaleProductLabelName(
                                                    x.ItemCode
                                                  );
                                              }
                                            }}
                                            className="adminAddInvoiceMainAddLabelOptionEditIcon"
                                          >
                                            <AiOutlineEdit />
                                          </button>
                                          <button
                                            style={{ marginBottom: "5px" }}
                                            onClick={() => {
                                              x.purchase
                                                ? removePurchaseProductFromList(
                                                    index
                                                  )
                                                : x.unlabel
                                                ? removePurchaseProductFromList(
                                                    index
                                                  )
                                                : removeProductFromList(x.Id);
                                            }}
                                            className="adminAddInvoiceMainAddLabelOptionDeleteIcon"
                                          >
                                            <RxCross2 />
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                    {x.purchase ? (
                                      <td>
                                        {" "}
                                        ₹{parseFloat(x.GoldRate).toFixed(0)}
                                      </td>
                                    ) : x.unlabel ? (
                                      <td>
                                        {" "}
                                        ₹{parseFloat(x.GoldRate).toFixed(0)}
                                      </td>
                                    ) : x.sell ? (
                                      <td>
                                        {/* <input
                                        type="number"
                                        onChange={(e) =>
                                          handleInputChange2(e, "todaysRate")
                                        }
                                        value={parseFloat(
                                          x.tblPurity.todaysRate
                                        ).toFixed(0)}
                                      /> */}
                                        ₹{parseFloat(x.TodaysRate).toFixed(0)}
                                      </td>
                                    ) : (
                                      <td>
                                        ₹{parseFloat(x.GoldRate).toFixed(0)}
                                      </td>
                                    )}{" "}
                                    <td>{parseFloat(x.GrossWt).toFixed(3)}</td>
                                    {x.purchase ? (
                                      <td> {parseFloat(x.NetWt).toFixed(3)}</td>
                                    ) : x.unlabel ? (
                                      <td> {parseFloat(x.NetWt).toFixed(3)}</td>
                                    ) : x.wholesale ? (
                                      <td> {parseFloat(x.NetWt).toFixed(3)}</td>
                                    ) : (
                                      <td> {parseFloat(x.NetWt).toFixed(3)}</td>
                                    )}
                                    {/* {x.sell ? ( */}
                                    {/* <td>{parseFloat(x.Purity).toFixed(3)}</td> */}
                                    {/* ) : ( */}
                                    <td>
                                      {parseFloat(x.PurityName).toFixed(3)}
                                    </td>
                                    {/* )} */}
                                    <td> ₹{parseFloat(x.making).toFixed(3)}</td>
                                    {x.purchase ? (
                                      <td>
                                        ₹
                                        {parseFloat(x.PurchaseAmount).toFixed(
                                          3
                                        )}
                                      </td>
                                    ) : x.wholesale ? (
                                      <td>
                                        ₹
                                        {/* {parseFloat(x.OrderAmount).toFixed(3)} */}
                                        {parseFloat(
                                          parseFloat(x.finalPrice)
                                          // +                                            parseFloat(x.totalGstAmount)
                                        ).toFixed(3)}
                                      </td>
                                    ) : (
                                      <td>
                                        ₹
                                        {parseFloat(
                                          parseFloat(x.finalPrice) +
                                            parseFloat(x.totalGstAmount)
                                        ).toFixed(3)}
                                      </td>
                                    )}
                                  </tr>
                                );
                              })
                            : null}
                          <tr>
                            <td>
                              <div className="adminAddInvoiceMainAddLabelOption">
                                <div className="adminAddInvoiceMainAddLabelOptionImageBox">
                                  <BsCardImage size={"30px"} />
                                </div>
                                <div className="adminAddInvoiceMainAddLabelOptionLabelBox">
                                  <input
                                    // tabIndex="1"
                                    type="text"
                                    placeholder="Type or click to select an item"
                                    name="productLabel"
                                    value={labelName}
                                    onInput={handleProductLabelChange}
                                    onKeyPress={(e) => {
                                      if (e.key === "Ctrl") {
                                        e.preventDefault();
                                        // button1Ref.current.focus();
                                        alert("Space");
                                      } else if (e.key === "Enter") {
                                        // Call your function here
                                        if (selectedProduct.length !== 0) {
                                          calculateFinalPrice(
                                            selectedProduct,
                                            true
                                          );
                                        } else {
                                          // null;
                                          button1Ref.current.focus();
                                        }
                                      }
                                    }}
                                    list="productLabelList"
                                  />
                                  <datalist id="productLabelList">
                                    {allProducts.map((product) => (
                                      <option
                                        key={product.Id}
                                        value={product.ItemCode}
                                      />
                                    ))}
                                  </datalist>
                                </div>
                              </div>
                            </td>
                            {selectedProduct.length > 0 ? (
                              <td>{selectedProduct.TodaysRate}</td>
                            ) : (
                              <td>0</td>
                            )}
                            <td>{selectedProduct.GrossWt}</td>
                            <td> {selectedProduct.NetWt}</td>
                            <td> {selectedProduct.PurityName}</td>
                            <td> {selectedProduct.making}</td>

                            <td>₹{Math.ceil(totalPayableAmount)} </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <tr>
                    <td>
                      <div className="adminAddInvoiceMainAddLabelOption">
                        <div className="adminAddInvoiceMainAddLabelOptionImageBox">
                          <BsCardImage size={"30px"} />
                        </div>
                        <div className="adminAddInvoiceMainAddLabelOptionLabelBox">
                          <input
                            type="text"
                            placeholder="Type or click to select an item"
                            name="productLabel"
                            value={labelName}
                            onInput={handleProductLabelChange}
                            list="productLabelList"
                          />
                          <datalist id="productLabelList">
                            {allProducts.map((product) => (
                              <option
                                key={product.Id}
                                value={product.ItemCode}
                              />
                            ))}
                          </datalist>
                        </div>
                      </div>
                    </td>
                    <td>{selectedProduct.GrossWt}</td>
                    <td> {selectedProduct.NetWt}</td>
                    <td> {selectedProduct.PurityName}</td>
                    <td> {selectedProduct.making}</td>

                    <td>
                      {parseFloat(
                        parseFloat(selectedProduct.finalPrice) +
                          parseFloat(selectedProduct.totalGstAmount)
                      ).toFixed(3)}
                    </td>
                  </tr>
                )}

                {openEditBox ? (
                  <div className="adminInvoiceOpenEditMainBox">
                    <div className="adminInvoiceOpenEditInnerBox">
                      <div className="adminInvoiceOpenEditInnerTitleBox">
                        <p>Edit Item</p>
                        <button
                          onClick={closeEditItem}
                          className="adminAddInvoiceMainAddLabelOptionDeleteIcon"
                        >
                          <RxCross2 size={"25px"} />
                        </button>
                      </div>
                      <div className="adminInvoiceOpenEditOuterGridBox">
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Gross Wt</label>
                          <input
                            type="text"
                            placeholder={openEditProduct.GrossWt}
                            value={openEditProduct.GrossWt}
                            onChange={(e) => handleInputChange2(e, "GrossWt")}
                          />
                        </div>

                        {openEditProduct.order ||
                        openEditProduct.purchase ||
                        openEditProduct.unlabel ? (
                          <div className="adminInvoiceOpenEditInnerGridItem">
                            <label>Stone Wt</label>{" "}
                            <input
                              type="number"
                              placeholder={openEditProduct.TotalStoneWeight}
                              value={openEditProduct.TotalStoneWeight}
                              onChange={(e) =>
                                handleInputChange2(e, "TotalStoneWeight")
                              }
                            />
                          </div>
                        ) : (
                          <div className="adminInvoiceOpenEditInnerGridItem">
                            <label>Stone Wt</label>{" "}
                            <input
                              type="number"
                              placeholder={openEditProduct.TotalStoneWeight}
                              value={openEditProduct.TotalStoneWeight}
                              onChange={(e) =>
                                handleInputChange2(e, "TotalStoneWeight")
                              }
                            />
                          </div>
                        )}
                        {openEditProduct.order ||
                        openEditProduct.purchase ||
                        openEditProduct.unlabel ? (
                          <div className="adminInvoiceOpenEditInnerGridItem">
                            <label>Net Wt</label>
                            <input
                              type="text"
                              placeholder={openEditProduct.NetWt}
                              value={openEditProduct.NetWt}
                              onChange={(e) => handleInputChange2(e, "NetWt")}
                            />
                          </div>
                        ) : (
                          <div className="adminInvoiceOpenEditInnerGridItem">
                            <label>Net Wt</label>
                            <input
                              type="text"
                              placeholder={openEditProduct.NetWt}
                              value={openEditProduct.NetWt}
                              onChange={(e) => handleInputChange2(e, "NetWt")}
                            />
                          </div>
                        )}
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Stone Amount</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.TotalStoneAmount}
                            value={openEditProduct.TotalStoneAmount}
                            onChange={(e) =>
                              handleInputChange2(e, "TotalStoneAmount")
                            }
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Cutting Gross Wt</label>
                          <input
                            type="text"
                            placeholder={openEditProduct.CuttingGrossWt}
                            value={openEditProduct.CuttingGrossWt}
                            onChange={(e) =>
                              handleInputChange2(e, "CuttingGrossWt")
                            }
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Cutting Net Wt</label>
                          <input
                            type="text"
                            placeholder={openEditProduct.CuttingNetWt}
                            value={openEditProduct.CuttingNetWt}
                            onChange={(e) =>
                              handleInputChange2(e, "CuttingNetWt")
                            }
                          />
                        </div>
                        {/* <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Product Name</label>
                          <input
                            type="text"
                            placeholder={openEditProduct.product_Name}
                            value={openEditProduct.product_Name}
                            onChange={(e) =>
                              handleInputChange2(e, "product_Name")
                            }
                          />
                        </div> */}
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>HUID Code</label>
                          <input
                            type="text"
                            maxLength={6}
                            placeholder={openEditProduct.HUIDCode}
                            value={openEditProduct.HUIDCode}
                            onChange={(e) => handleInputChange2(e, "HUIDCode")}
                          />
                        </div>

                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Making PerGram</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.MakingPerGram}
                            value={openEditProduct.MakingPerGram}
                            onChange={(e) =>
                              handleInputChange2(e, "MakingPerGram")
                            }
                          />
                        </div>

                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Making Percentage</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.MakingPercentage}
                            value={openEditProduct.MakingPercentage}
                            onChange={(e) =>
                              handleInputChange2(e, "MakingPercentage")
                            }
                          />
                        </div>

                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Making Fixed Amount</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.MakingFixedAmt}
                            value={openEditProduct.MakingFixedAmt}
                            onChange={(e) =>
                              handleInputChange2(e, "MakingFixedAmt")
                            }
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Making Fixed Wastage</label>
                          <input
                            type="number"
                            placeholder={openEditProduct.MakingFixedWastage}
                            value={openEditProduct.MakingFixedWastage}
                            onChange={(e) =>
                              handleInputChange2(e, "MakingFixedWastage")
                            }
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Pieces</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.Pieces}
                            value={openEditProduct.Pieces}
                            onChange={(e) => handleInputChange2(e, "Pieces")}
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Size</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.Size}
                            value={openEditProduct.Size}
                            onChange={(e) => handleInputChange2(e, "Size")}
                          />
                        </div>

                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>MRP</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.MRP}
                            value={openEditProduct.MRP}
                            onChange={(e) => handleInputChange2(e, "MRP")}
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Description</label>{" "}
                          <input
                            type="text"
                            placeholder={openEditProduct.Description}
                            value={openEditProduct.Description}
                            onChange={(e) =>
                              handleInputChange2(e, "Description")
                            }
                          />
                        </div>
                        {/* <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Occasion</label>{" "}
                          <input
                            type="text"
                            placeholder={openEditProduct.occasion}
                            value={openEditProduct.occasion}
                            onChange={(e) => handleInputChange2(e, "occasion")}
                          />
                        </div> */}
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Todays Rate</label>{" "}
                          <input
                            type="text"
                            placeholder={openEditProduct.TodaysRate}
                            value={openEditProduct.TodaysRate}
                            onChange={(e) =>
                              handleInputChange2(e, "TodaysRate")
                            }
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Hallmark Amount</label>{" "}
                          <input
                            type="number"
                            placeholder={openEditProduct.HallmarkAmount}
                            value={openEditProduct.HallmarkAmount}
                            onChange={(e) =>
                              handleInputChange2(e, "HallmarkAmount")
                            }
                          />
                        </div>

                        <div className="adminInvoiceOpenEditInnerGridItem">
                          <label>Featured</label>{" "}
                          <input
                            type="text"
                            placeholder={openEditProduct.Featured}
                            value={openEditProduct.Featured}
                            onChange={(e) => handleInputChange2(e, "Featured")}
                          />
                        </div>
                        <div className="adminInvoiceOpenEditInnerGridItem">
                          {/* <label>Update</label>{" "} */}.{" "}
                          <button
                            onClick={() => {
                              setOpenEditBox(false),
                                setSelectedProduct([]),
                                setLabelName("");
                            }}
                            className="adminInvoiceEditProductSaveButton"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : active === "Purchase" ? (
              <div className="adminInvoiceAddProductsOptionsMainPurchaseBox">
                <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                  <label>Category</label>
                  <select
                    name="CategoryName"
                    onChange={handleInputChangePurchase}
                    value={`${purchaseProduct.CategoryId},${purchaseProduct.CategoryName}`}
                  >
                    <option value={""}>Select an Category</option>
                    {allCategories.map((x) => {
                      return (
                        <option key={x.Id} value={`${x.Id},${x.CategoryName}`}>
                          {x.CategoryName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                  <label>Product</label>

                  <select
                    name="ProductName"
                    onChange={handleInputChangePurchase}
                    value={purchaseProduct.ProductName}
                  >
                    <option value={""}>Select an Product</option>
                    {filteredProducts.map((x, index) => {
                      return (
                        <option key={index} value={x.ProductName}>
                          {x.ProductName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                  <label>Purity</label>

                  <select
                    name="PurityRate"
                    onChange={handleInputChangePurchase}
                    value={`${purchaseProduct.PurityName},${purchaseProduct.TodaysRate}`}
                  >
                    <option>Select an Purity</option>
                    {filteredPurities.map((x, index) => {
                      return (
                        <option
                          key={index}
                          value={`${x.PurityName},${x.TodaysRate}`}
                        >
                          {x.PurityName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                  <label>Gross Wt</label>
                  <input
                    name="GrossWt"
                    onChange={handleInputChangePurchase}
                    type="text"
                    value={purchaseProduct.GrossWt}
                  />
                </div>
                <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                  <label>Net Wt</label>
                  <input
                    name="NetWt"
                    onChange={handleInputChangePurchase}
                    type="text"
                    value={purchaseProduct.NetWt}
                  />
                </div>
                {/* <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                  <label>Stone Wt</label>
                  <input
                    name="stonewt"
                    onChange={handleInputChangePurchase}
                    type="text"
                    value={purchaseProduct.stonewt}
                  />
                </div> */}
                <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                  <label>Gold Rate</label>
                  <input
                    name="GoldRate"
                    onChange={handleInputChangePurchase}
                    type="text"
                    value={purchaseProduct.GoldRate}
                  />
                </div>
                <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                  <label>Fine Percentage</label>
                  <input
                    name="FinePercent"
                    onChange={handleInputChangePurchase}
                    type="text"
                    value={purchaseProduct.FinePercent}
                  />
                </div>
                <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                  <label>Quantity</label>
                  <input
                    name="Quantity"
                    onChange={handleInputChangePurchase}
                    type="text"
                    value={purchaseProduct.Quantity}
                  />
                </div>

                <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                  <label>Purchase Amount</label>
                  <input
                    name="PurchaseAmount"
                    onChange={handleInputChangePurchase}
                    type="text"
                    value={purchaseProduct.PurchaseAmount}
                  />
                </div>
                <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                  {/* <label>Add</label>  */}
                  <button
                    onClick={() => addPurchaseProductToList(purchaseProduct)}
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : active === "Unlabel" ? (
              <div>
                <div className="adminInvoiceAddProductsOptionsMainPurchaseBox">
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Category</label>
                    <select
                      name="CategoryId"
                      onChange={handleInputChangeUnlabel}
                      value={`${unlabelProduct.CategoryId},${unlabelProduct.CategoryName}`}
                    >
                      <option value={""}>Select an Category</option>
                      {allCategories.map((x, index) => {
                        return (
                          <option
                            key={index}
                            value={`${x.Id},${x.CategoryName}`}
                          >
                            {x.CategoryName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Product</label>

                    <select
                      name="ProductId"
                      onChange={handleInputChangeUnlabel}
                      value={`${unlabelProduct.ProductId},${unlabelProduct.ProductName}`}
                    >
                      <option value={""}>Select an Product</option>
                      {filteredProductsUnlabel.map((x, index) => {
                        return (
                          <option
                            key={index}
                            value={`${x.Id},${x.ProductName}`}
                          >
                            {x.ProductName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Design</label>

                    <select
                      name="DesignId"
                      onChange={handleInputChangeUnlabel}
                      value={`${unlabelProduct.DesignId},${unlabelProduct.DesignName}`}
                    >
                      <option value={""}>Select an Design</option>
                      {filteredUnlabelCollection
                        .reduce((unique, item) => {
                          // Check if there is already an item with the same collection in the unique array
                          if (
                            !unique.some(
                              (x) => x.DesignName === item.DesignName
                            )
                          ) {
                            unique.push(item); // If not, add this item to the unique array

                            console.log(item, "item");
                          }
                          return unique;
                        }, [])
                        .map((x, index) => (
                          <option
                            key={index}
                            value={`${x.DesignId},${x.DesignName}`}
                          >
                            {x.DesignName}
                          </option>
                        ))}

                      {/* {filteredUnlabelCollection.map((x) => {
                        return (
                          <option
                            value={`${x.id},${x.collection},${x.collectionId}`}
                          >
                            {x.collection}
                          </option>
                        );
                      })} */}
                      {/* {filteredUnlabelCollection.map((x) => {
                        if (!uniqueNamesSet.has(x.collection)) {
                          uniqueNamesSet.add(x.collection);

                          return (
                            <option
                              key={x.id}
                              value={`${x.id},${x.collection},${x.collectionId}`}
                            >
                              {x.collection}
                            </option>
                          );
                        }

                        return null;
                      })} */}
                    </select>
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Purity</label>

                    <select
                      name="PurityId"
                      onChange={handleInputChangeUnlabel}
                      value={`${unlabelProduct.PurityId},${unlabelProduct.PurityName},${unlabelProduct.PurityRate}`}
                      // value={unlabelProduct.purity}
                    >
                      <option>Select an Purity</option>
                      {filteredPuritiesUnlabel.map((x, index) => {
                        return (
                          <option
                            key={index}
                            value={`${x.PurityId},${x.PurityName},${x.TodaysRate}`}
                          >
                            {x.PurityName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Gross Wt</label>
                    <input
                      name="GrossWt"
                      onChange={handleInputChangeUnlabel}
                      // type="text"
                      value={unlabelProduct.GrossWt}
                      type="number"
                      max={unlabelProduct.MaxGrossWt}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Net Wt</label>
                    <input
                      name="NetWt"
                      onChange={handleInputChangeUnlabel}
                      type="number"
                      max={unlabelProduct.MaxNetWt}
                      value={unlabelProduct.NetWt}
                    />
                  </div>
                  {/* <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                  <label>Stone Wt</label>
                  <input
                    name="stonewt"
                    onChange={handleInputChangePurchase}
                    type="text"
                    value={purchaseProduct.stonewt}
                  />
                </div> */}
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Gold Rate</label>
                    <input
                      name="GoldRate"
                      onChange={handleInputChangeUnlabel}
                      type="text"
                      value={unlabelProduct.GoldRate}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Making Fixed Amt</label>
                    <input
                      name="MakingFixedAmt"
                      onChange={handleInputChangeUnlabel}
                      type="text"
                      value={unlabelProduct.MakingFixedAmt}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Making Percentage</label>
                    <input
                      name="MakingPercentage"
                      onChange={handleInputChangeUnlabel}
                      type="text"
                      value={unlabelProduct.MakingPercentage}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Making Pergram</label>
                    <input
                      name="MakingPerGram"
                      onChange={handleInputChangeUnlabel}
                      type="text"
                      value={unlabelProduct.MakingPerGram}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Making Fixed Wastage</label>
                    <input
                      name="MakingFixedWastage"
                      onChange={handleInputChangeUnlabel}
                      type="text"
                      value={unlabelProduct.MakingFixedWastage}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Quantity</label>
                    <input
                      name="Quantity"
                      onChange={handleInputChangeUnlabel}
                      type="number"
                      min={0}
                      max={parseInt(unlabelProduct.MaxQuantity)}
                      value={unlabelProduct.Quantity}
                    />
                  </div>

                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Total Amount</label>
                    <input
                      name="UnlabelAmount"
                      onChange={handleInputChangeUnlabel}
                      type="text"
                      value={unlabelProduct.UnlabelAmount}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    {/* <label>Add</label>  */}
                    <button
                      onClick={() => addPurchaseProductToList(unlabelProduct)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ) : active === "Wholesale" ? (
              <div>
                <div className="adminInvoiceAddProductsOptionsMainPurchaseBox">
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Label</label>
                    <input
                      // tabIndex="1"
                      type="text"
                      placeholder="Type or click to select an item"
                      name="productLabel"
                      value={wholesaleProductLabelName}
                      onInput={handleWholesaleProductLabelChange}
                      onKeyPress={(e) => {
                        if (e.key === "Ctrl") {
                          e.preventDefault();
                          // button1Ref.current.focus();
                          alert("Space");
                        } else if (e.key === "Enter") {
                          // Call your function here
                          if (selectedProduct.length !== 0) {
                            let changeSelectedProduct = selectedProduct;

                            return (
                              (changeSelectedProduct.sell = false),
                              (changeSelectedProduct.wholesale = true),
                              calculateWholesaleProductFinalPrice(
                                changeSelectedProduct,
                                true
                              ),
                              setActive("Sell")
                            );
                            // setOrderProductLabelName("");
                          } else {
                            // null;
                            button1Ref.current.focus();
                          }
                        }
                      }}
                      list="productLabelList"
                    />
                    <datalist id="productLabelList">
                      {allProducts.map((product) => (
                        <option key={product.Id} value={product.ItemCode} />
                      ))}
                    </datalist>
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Category</label>
                    <select
                      name="CategoryId"
                      onChange={handleInputChangeWholesale}
                      value={`${wholesaleProduct.CategoryId},${wholesaleProduct.CategoryName}`}
                    >
                      <option value={""}>Select an Category</option>
                      {allCategories.map((x, index) => {
                        return (
                          <option
                            key={index}
                            value={`${x.Id},${x.CategoryName}`}
                          >
                            {x.CategoryName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Product</label>

                    <select
                      name="ProductId"
                      onChange={handleInputChangeWholesale}
                      value={`${wholesaleProduct.ProductId},${wholesaleProduct.ProductName}`}
                    >
                      <option value={""}>Select an Product</option>
                      {filteredProductsWholesale.map((x, index) => {
                        return (
                          <option
                            key={index}
                            value={`${x.Id},${x.ProductName}`}
                          >
                            {x.ProductName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Design</label>

                    <select
                      name="DesignId"
                      onChange={handleInputChangeWholesale}
                      value={`${wholesaleProduct.DesignId},${wholesaleProduct.DesignName}`}
                    >
                      <option value={""}>Select an Product</option>
                      {filteredWholesaleCollection.map((x, index) => {
                        return (
                          <option key={index} value={`${x.Id},${x.DesignName}`}>
                            {x.DesignName}
                          </option>
                        );
                      })}
                      {/* {filteredUnlabelCollection.map((x) => {
                      if (!uniqueNamesSet.has(x.collection)) {
                        uniqueNamesSet.add(x.collection);

                        return (
                          <option
                            key={x.id}
                            value={`${x.id},${x.collection},${x.collectionId}`}
                          >
                            {x.collection}
                          </option>
                        );
                      }

                      return null;
                    })} */}
                    </select>
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Purity</label>

                    <select
                      name="PurityId"
                      onChange={handleInputChangeWholesale}
                      value={`${wholesaleProduct.PurityId},${wholesaleProduct.PurityName}`}
                      // value={unlabelProduct.purity}
                    >
                      <option>Select an Purity</option>
                      {filteredPuritiesWholesaleProduct.map((x, index) => {
                        return (
                          <option key={index} value={`${x.Id},${x.PurityName}`}>
                            {x.PurityName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Gross Wt</label>
                    <input
                      name="GrossWt"
                      onChange={handleInputChangeWholesale}
                      // type="text"
                      value={wholesaleProduct.GrossWt}
                      type="number"
                      max={wholesaleProduct.MaxGrossWt}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Net Wt</label>
                    <input
                      name="NetWt"
                      onChange={handleInputChangeWholesale}
                      type="number"
                      max={wholesaleProduct.MaxNetWt}
                      value={wholesaleProduct.NetWt}
                    />
                  </div>
                  {/* <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                <label>Stone Wt</label>
                <input
                  name="stonewt"
                  onChange={handleInputChangePurchase}
                  type="text"
                  value={purchaseProduct.stonewt}
                />
              </div> */}
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Gold Rate</label>
                    <div
                      style={{ width: "auto" }}
                      className="adminPurchaseEntryDollarSignBox"
                    >
                      <FaDollarSign
                        className="adminPurchaseEntryDollarSign"
                        onClick={() => setConvertAmount(!convertAmount)}
                        size={"15px"}
                        style={{
                          cursor: "pointer",
                          color: convertAmount ? "green" : "grey",
                        }}
                      />
                      <input
                        name="GoldRate"
                        onChange={handleInputChangeWholesale}
                        type="text"
                        value={wholesaleProduct.GoldRate}
                      />
                    </div>
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Fine%</label>
                    <input
                      name="FinePercent"
                      onChange={handleInputChangeWholesale}
                      type="text"
                      value={wholesaleProduct.FinePercent}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Wastage%</label>
                    <input
                      name="WastagePercent"
                      onChange={handleInputChangeWholesale}
                      type="text"
                      value={wholesaleProduct.WastagePercent}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Stone Amount</label>
                    <input
                      name="TotalStoneAmount"
                      onChange={handleInputChangeWholesale}
                      type="text"
                      value={wholesaleProduct.TotalStoneAmount}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Making Fixed Amt</label>
                    <input
                      name="MakingFixedAmt"
                      onChange={handleInputChangeWholesale}
                      type="text"
                      value={wholesaleProduct.MakingFixedAmt}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Making Percentage</label>
                    <input
                      name="MakingPercentage"
                      onChange={handleInputChangeWholesale}
                      type="text"
                      value={wholesaleProduct.MakingPercentage}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Making Pergram</label>
                    <input
                      name="MakingPerGram"
                      onChange={handleInputChangeWholesale}
                      type="text"
                      value={wholesaleProduct.MakingPerGram}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Making Fixed Wastage</label>
                    <input
                      name="MakingFixedWastage"
                      onChange={handleInputChangeWholesale}
                      type="text"
                      value={wholesaleProduct.MakingFixedWastage}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Quantity</label>
                    <input
                      name="Quantity"
                      onChange={handleInputChangeWholesale}
                      type="number"
                      min={0}
                      max={parseInt(wholesaleProduct.MaxQuantity)}
                      value={wholesaleProduct.Quantity}
                    />
                  </div>

                  {/* <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Fine Percentage</label>
                    <input
                      name="Finepercent"
                      onChange={handleInputChangeOrder}
                      type="text"
                      value={wholesaleProduct.Finepercent}
                    />
                  </div> */}

                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Fine + Wastage Wt</label>
                    <input
                      name="FineWastageWeight"
                      // onChange={handleInputChangeWholesale}
                      type="text"
                      readOnly
                      // value={wholesaleProduct.OrderAmount}
                      value={wholesaleProduct.FineWastageWeight}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    <label>Item Amount</label>
                    <input
                      name="ItemAmount"
                      // onChange={handleInputChangeWholesale}
                      type="text"
                      readOnly
                      // value={wholesaleProduct.OrderAmount}
                      value={wholesaleProduct.TotalItemAmount}
                    />
                  </div>
                  <div className="adminInvoiceAddProductsOptionsMainPurchaseItems">
                    {/* <label>Add</label>  */}
                    <button
                      onClick={() =>
                        addWholesaleProductToList(wholesaleProduct, true)
                      }
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            <div
              style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
              className="adminInviceAddedProductsTotalOuterBox"
            >
              {" "}
              <div className="adminInviceAddedProductsTotalAmountOuterBox">
                <div
                  style={{ gridAutoFlow: "row" }}
                  className="adminInviceAddedProductsTotalItemBoxPaymentType"
                >
                  <div
                    onClick={() => {
                      setPaymentAmount(Math.abs(paymentAmount));
                      setPaymentType("Paid");
                      setPaymentOptions("Cash");
                    }}
                  >
                    {paymentType === "Paid" ? (
                      <FaRegDotCircle style={{ marginRight: "5px" }} />
                    ) : (
                      <FaRegCircle style={{ marginRight: "5px" }} />
                    )}
                    Paid
                  </div>
                  <div onClick={() => setPaymentType("Receive")}>
                    {paymentType === "Receive" ? (
                      <FaRegDotCircle style={{ marginRight: "5px" }} />
                    ) : (
                      <FaRegCircle style={{ marginRight: "5px" }} />
                    )}
                    Receive
                  </div>
                </div>
                <div
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    textAlign: "left",
                  }}
                  className="adminInviceAddedProductsTotalItemBox"
                >
                  <label>Payment Mode</label>
                  <select
                    tabIndex="3"
                    ref={button2Ref}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        button3Ref.current.focus();
                      }
                    }}
                    style={{ width: "auto" }}
                    onChange={(e) => setPaymentOptions(e.target.value)}
                    value={paymentOptions}
                  >
                    <option value={"Cash"}>Cash</option>
                    <option value={"Card"}>Card</option>
                    <option value={"UPI"}>UPI</option>
                    <option value={"Cheque"}>Cheque</option>
                    <option value={"RTGS"}>RTGS</option>
                    <option value={"MDS"}>MDS</option>
                    {paymentType === "Receive" ? (
                      <>
                        <option value={"Advance Amount"}>Advance Amount</option>
                      </>
                    ) : null}

                    {paymentType === "Paid" ? (
                      <>
                        <option value={"Advance Returned"}>
                          Advance Returned
                        </option>
                      </>
                    ) : null}
                    <option value={"Metal to Cash"}>Metal to Cash</option>
                    <option value={"Cash to Metal"}>Cash to Metal</option>
                    {/* <option value={"Advance Amount"}>Advance Amount</option> */}
                  </select>

                  {paymentOptions !== "Advance Amount" ? (
                    <>
                      <label style={{ whiteSpace: "nowrap" }}>
                        Description
                      </label>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        value={paymentDescription}
                        onChange={(e) => setPaymentDescription(e.target.value)}
                      />
                      <label>Amount</label>
                      <div className="adminInviceAddedProductsAmountInputBox">
                        <input
                          style={{
                            color:
                              paymentType === "Paid" && paymentAmount !== 0
                                ? "red"
                                : paymentType === "Receive" && paymentAmount > 0
                                ? "green"
                                : "black",
                          }}
                          tabIndex="4"
                          ref={button3Ref}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              button4Ref.current.focus();
                            }
                          }}
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                        />
                        <button
                          tabIndex="5"
                          ref={button4Ref}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              button5Ref.current.focus();
                            }
                          }}
                          onClick={() => {
                            if (
                              paymentOptions == "Cash" &&
                              totalPaidCashAmount + parseInt(paymentAmount) >
                                200000
                            ) {
                              alert("Could Not Take more than 200000 in Cash");
                            } else if (
                              paymentAmount > 200000 &&
                              paymentOptions == "Cash"
                            ) {
                              alert("Could'nt Take more than 200000 in Cash");
                            } else {
                              addPayment();
                            }
                          }}
                        >
                          <GiCheckMark />
                        </button>
                        <button
                          tabIndex="6"
                          ref={button5Ref}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              button6Ref.current.focus();
                            }
                          }}
                          onClick={() => {
                            setPaymentAmount(0), setPaymentOptions("Cash");
                          }}
                        >
                          <RxCross2 />
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>

                {paymentOptions === "Advance Amount" ? (
                  <div style={{ marginTop: "20px" }}>
                    <div
                      style={{ gridAutoFlow: "row" }}
                      className="adminInviceAddedProductsTotalItemBoxPaymentType"
                    >
                      <div
                        onClick={() => {
                          setPaymentAmount(Math.abs(paymentAmount));
                          setAdvanceType("Advance Received");
                        }}
                      >
                        {advanceType === "Advance Received" ? (
                          <FaRegDotCircle style={{ marginRight: "5px" }} />
                        ) : (
                          <FaRegCircle style={{ marginRight: "5px" }} />
                        )}
                        Adv Rcvd
                      </div>
                      <div onClick={() => setAdvanceType("Deduct Advance")}>
                        {advanceType === "Deduct Advance" ? (
                          <FaRegDotCircle style={{ marginRight: "5px" }} />
                        ) : (
                          <FaRegCircle style={{ marginRight: "5px" }} />
                        )}
                        Deduct Adv
                      </div>
                    </div>

                    {advanceType === "Advance Received" ? (
                      <div
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          textAlign: "left",
                        }}
                        className="adminInviceAddedProductsTotalItemBox"
                      >
                        <label style={{ whiteSpace: "nowrap" }}>
                          Description
                        </label>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          value={paymentDescription}
                          onChange={(e) =>
                            setPaymentDescription(e.target.value)
                          }
                        />
                        <label>Amount</label>
                        <div className="adminInviceAddedProductsAmountInputBox">
                          <input
                            style={{
                              color:
                                paymentType === "Paid" && paymentAmount !== 0
                                  ? "red"
                                  : paymentType === "Receive" &&
                                    paymentAmount > 0
                                  ? "green"
                                  : "black",
                            }}
                            tabIndex="4"
                            ref={button3Ref}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                button4Ref.current.focus();
                              }
                            }}
                            type="number"
                            value={advanceAmount}
                            onChange={(e) => setAdvanceAmount(e.target.value)}
                          />
                          <button
                            tabIndex="5"
                            ref={button4Ref}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                button5Ref.current.focus();
                              }
                            }}
                            onClick={() => {
                              if (
                                paymentOptions == "Cash" &&
                                totalPaidCashAmount + parseInt(paymentAmount) >
                                  200000
                              ) {
                                alert(
                                  "Could Not Take more than 200000 in Cash"
                                );
                              } else if (
                                paymentAmount > 200000 &&
                                paymentOptions == "Cash"
                              ) {
                                alert("Could'nt Take more than 200000 in Cash");
                              } else {
                                addPayment();
                              }
                            }}
                          >
                            <GiCheckMark />
                          </button>
                          <button
                            tabIndex="6"
                            ref={button5Ref}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                button6Ref.current.focus();
                              }
                            }}
                            onClick={() => {
                              setPaymentAmount(0), setPaymentOptions("Cash");
                            }}
                          >
                            <RxCross2 />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          textAlign: "left",
                        }}
                        className="adminInviceAddedProductsTotalItemBox"
                      >
                        <label style={{ whiteSpace: "nowrap" }}>
                          Description
                        </label>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          value={paymentDescription}
                          onChange={(e) =>
                            setPaymentDescription(e.target.value)
                          }
                        />
                        <label>Amount Available</label>
                        {/* <div className="adminInviceAddedProductsAmountInputBox"> */}
                        <input
                          type="text"
                          value={
                            selectedCustomer
                              ? selectedCustomer.advanceAmount
                              : "0"
                          }
                          readOnly
                        />
                        {/* </div> */}
                        <label>Deduct Amount</label>
                        <div className="adminInviceAddedProductsAmountInputBox">
                          <input
                            style={{
                              color:
                                paymentType === "Paid" && paymentAmount !== 0
                                  ? "red"
                                  : paymentType === "Receive" &&
                                    paymentAmount > 0
                                  ? "green"
                                  : "black",
                            }}
                            tabIndex="4"
                            ref={button3Ref}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                button4Ref.current.focus();
                              }
                            }}
                            type="number"
                            value={advanceAmount}
                            onChange={(e) => {
                              if (
                                selectedCustomer &&
                                parseFloat(selectedCustomer.advanceAmount) -
                                  parseFloat(e.target.value) >=
                                  0
                              ) {
                                setAdvanceAmount(e.target.value);
                              } else {
                                null;
                              }
                            }}
                          />
                          <button
                            tabIndex="5"
                            ref={button4Ref}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                button5Ref.current.focus();
                              }
                            }}
                            onClick={() => {
                              if (
                                paymentOptions == "Cash" &&
                                totalPaidCashAmount + parseInt(paymentAmount) >
                                  200000
                              ) {
                                alert(
                                  "Could Not Take more than 200000 in Cash"
                                );
                              } else if (
                                paymentAmount > 200000 &&
                                paymentOptions == "Cash"
                              ) {
                                alert("Could'nt Take more than 200000 in Cash");
                              } else {
                                addPayment();
                              }
                            }}
                          >
                            <GiCheckMark />
                          </button>
                          <button
                            tabIndex="6"
                            ref={button5Ref}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                button6Ref.current.focus();
                              }
                            }}
                            onClick={() => {
                              setPaymentAmount(0), setPaymentOptions("Cash");
                            }}
                          >
                            <RxCross2 />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
                {paymentOptions === "Metal to Cash" ? (
                  <div className="adminInviceAddedProductsMetaltoCashMainBox">
                    <div>
                      <label>Metal</label>
                      <select
                        onChange={(e) =>
                          setMetalPaymentOption({
                            ...metalPaymentOption,
                            optionSelected: `${e.target.value}`,
                          })
                        }
                        value={metalPaymentOption.optionSelected}
                      >
                        <option value={"GOLD"}>GOLD</option>
                        <option value={"SILVER"}>SILVER</option>
                        <option value={"PLATINUM"}>PLATINUM</option>
                        <option value={"PURE GOLD"}>PURE GOLD</option>
                        <option value={"PURE SILVER"}>PURE SILVER</option>
                        <option value={"OLD GOLD"}>OLD GOLD</option>
                        <option value={"OLD SILVER"}>OLD SILVER</option>
                      </select>
                    </div>
                    <div>
                      <label>Fine Paid</label>
                      <input
                        type="number"
                        value={metalPaymentOption.fineWt}
                        onChange={(e) => {
                          handleMetalPaymentOption("fineWt", e);
                        }}
                        //     onChange={(e) =>
                        //       setMetalPaymentOption({
                        //         ...metalPaymentOption,
                        //         fineWt: e.target.value,
                        //     })
                        // }
                      />
                    </div>
                    <div>
                      <label>Rate 10/Gm</label>
                      <input
                        type="number"
                        value={metalPaymentOption.fineRate}
                        onChange={(e) => {
                          handleMetalPaymentOption("Rate", e);
                        }}
                        // onChange={(e) =>
                        //   setMetalPaymentOption({
                        //     ...metalPaymentOption,
                        //     fineRate: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                    <div>
                      <label>Total amount</label>
                      <input
                        type="number"
                        value={metalPaymentOption.totalAmount}
                        readOnly
                      />
                    </div>
                    <div
                      style={{
                        margin: "10px",
                        width: "100px",
                        marginLeft: "auto",
                        marginRight: "0px",
                      }}
                      className="adminInvoiceMainSaveButtonBox"
                    >
                      <button onClick={addPayment}>Add</button>
                    </div>
                  </div>
                ) : paymentOptions === "Cash to Metal" ? (
                  <div className="adminInviceAddedProductsMetaltoCashMainBox">
                    <div>
                      <label>Metal</label>
                      <select
                        onChange={(e) =>
                          setMetalPaymentOption({
                            ...metalPaymentOption,
                            optionSelected: `${e.target.value}`,
                          })
                        }
                        value={metalPaymentOption.optionSelected}
                      >
                        <option value={"GOLD"}>GOLD</option>
                        <option value={"SILVER"}>SILVER</option>
                        <option value={"PLATINUM"}>PLATINUM</option>
                        <option value={"PURE GOLD"}>PURE GOLD</option>
                        <option value={"PURE SILVER"}>PURE SILVER</option>
                        <option value={"OLD GOLD"}>OLD GOLD</option>
                        <option value={"OLD SILVER"}>OLD SILVER</option>
                      </select>
                    </div>
                    <div>
                      <label>Total amount</label>
                      <input
                        type="number"
                        value={metalPaymentOption.totalAmount}
                        onChange={(e) => {
                          handleMetalPaymentOption("Amount", e);
                        }}
                      />
                    </div>
                    <div>
                      <label>Rate 10/Gm</label>
                      <input
                        type="number"
                        value={metalPaymentOption.fineRate}
                        onChange={(e) => {
                          handleMetalPaymentOption("Rate", e);
                        }}
                        // onChange={(e) =>
                        //   setMetalPaymentOption({
                        //     ...metalPaymentOption,
                        //     fineRate: e.target.value,
                        //   })
                        // }
                      />
                    </div>

                    <div>
                      <label>Fine Paid</label>
                      <input
                        type="number"
                        value={metalPaymentOption.fineWt}
                        readOnly
                        //     onChange={(e) =>
                        //       setMetalPaymentOption({
                        //         ...metalPaymentOption,
                        //         fineWt: e.target.value,
                        //     })
                        // }
                      />
                    </div>
                    <div
                      style={{
                        margin: "10px",
                        width: "100px",
                        marginLeft: "auto",
                        marginRight: "0px",
                      }}
                      className="adminInvoiceMainSaveButtonBox"
                    >
                      <button onClick={addPayment}>Add</button>
                    </div>
                  </div>
                ) : null}
                <div className="adminInviceAddedProductsTotalAmountBox">
                  <table>
                    <thead>
                      <tr>
                        <th>Mode</th>
                        <th>Amount</th>
                        <th>Gold</th>
                        <th>Silver</th>
                        <th>Description</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment, index) => (
                        <tr key={index}>
                          <td>{payment.mode}</td>
                          <td
                            style={{
                              color:
                                parseInt(payment.amount) >= 0 ? "green" : "red",
                              fontWeight:
                                parseInt(payment.amount) >= 0
                                  ? "bold"
                                  : "normal",
                            }}
                          >
                            {payment.amount}
                          </td>
                          <td>{payment.fineGold}</td>
                          <td>{payment.fineSilver}</td>
                          <td>{payment.paymentDescription}</td>
                          {/* Button to delete the payment */}
                          <td onClick={() => deletePayment(index)}>
                            <button
                              tabIndex="7"
                              ref={button6Ref}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  button7Ref.current.focus();
                                }
                              }}
                              className="adminInviceAddedProductsTotalAmountDeleteOption"
                              onClick={() => deletePayment(index)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="adminInviceAddedProductsTotalItemBox">
                {allSelectedProducts.filter((x) => x.wholesale).length > 0 ? (
                  <>
                    <label>Balance Gold</label>
                    <input type="text" value={totalPayableGold} readOnly />
                  </>
                ) : null}
                {allSelectedProducts.filter((x) => x.wholesale).length > 0 ? (
                  <>
                    <label>Balance Silver</label>
                    <input type="text" value={totalPayableSilver} readOnly />
                  </>
                ) : null}
                <label>Taxable Amount</label>
                <input
                  type="text"
                  value={parseInt(allProdctsNetAmount).toLocaleString("en-IN")}
                  readOnly
                />
                <label>R.O./Discount(-)</label>
                <div className="invoiceDiscountInputBox">
                  <input
                    id="discount"
                    type="text"
                    // value={parseInt(discountAmount).toLocaleString("en-IN")}
                    value={parseFloat(discountAmount).toFixed(0)}
                    readOnly
                  />
                  <input
                    id="discountPercentage"
                    type="number"
                    placeholder="%"
                    value={discountPercentage}
                    onChange={(e) => {
                      e.target.value <= 100 && e.target.value >= 0
                        ? handleDiscountPercentage(e)
                        : null;
                    }}
                  />
                </div>

                <div className="invoiceGstCheckBox1">
                  <input
                    // className="invoiceGstCheckBox1"
                    type="checkbox"
                    defaultChecked={applyGstAmount}
                    value={applyGstAmount}
                    onChange={handleGstType}
                  />
                  <label>GST {applyGstAmount ? "3%" : "0%"}</label>

                  <input
                    // className="invoiceGstCheckBox1"

                    type="checkbox"
                    checked={gstType}
                    onChange={() => setGstType(!gstType)}
                  />
                </div>
                <input
                  type="text"
                  value={parseInt(totalPayableGstAmount).toLocaleString(
                    "en-IN"
                  )}
                  readOnly
                />
                <label>Purchase Amount</label>
                <input
                  type="text"
                  readOnly
                  value={parseInt(oldGoldAmount)}
                  onChange={(e) => {
                    if (!isNaN(oldGoldAmount)) {
                      setOldGoldAmount(e.target.value),
                        // Check if the input value is a valid number
                        setGrandTotal(
                          parseFloat(
                            parseFloat(totalPayableAmount) -
                              parseFloat(e.target.value)
                          )
                        );
                      setPaymentAmount(
                        parseFloat(
                          parseFloat(totalPayableAmount) -
                            parseFloat(e.target.value)
                        )
                      );
                    } else {
                      // setTotalPayableAmount(allProdctsNetAmount);
                      setGrandTotal(0);
                      setOldGoldAmount(0);
                    }
                  }}
                />
                <label>Total Amount</label>
                <input
                  id="totalAmount"
                  tabIndex="2"
                  ref={button1Ref}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      button2Ref.current.focus();
                    }
                  }}
                  type="text"
                  style={{ backgroundColor: "wheat" }}
                  value={Math.ceil(totalPayableAmount)}
                  onChange={(e) => {
                    const newTotalPayableAmount = parseFloat(e.target.value);
                    if (!isNaN(newTotalPayableAmount)) {
                      // Check if the input value is a valid number
                      if (applyGstAmount) {
                        setTotalPayableGstAmount(
                          ((newTotalPayableAmount / 103) * 3).toFixed(2)
                        );
                      } else {
                        setTotalPayableGstAmount(0);
                      }
                      changeTotalPrice(e);

                      // setGrandTotal(0);
                      // setOldGoldAmount(0);
                    } else {
                      //   setTotalPayableAmount(allProdctsNetAmount);
                      setTotalPayableAmount(0);
                    }
                  }}
                  onBlur={() => {
                    const totalMaking = allSelectedProducts.reduce(
                      (total, item) => total + parseFloat(item.making),
                      0
                    );

                    let totalAmountPayingNow = allSelectedProducts.reduce(
                      (total, product) =>
                        total +
                        parseFloat(product.finalPrice) +
                        parseFloat(product.totalGstAmount),
                      0
                    );
                    let totalDiscount =
                      parseInt(totalAmountPayingNow) -
                      parseInt(document.getElementById("totalAmount").value);
                    if (totalDiscount <= totalMaking) {
                      // alert("Changed");
                    } else {
                      alert("Discount Amount Exceeded");
                      setDiscountAmount(0);
                      setDiscountPercentage(0);
                      calculateNetAmount();
                    }
                    // const discount =
                    //   parseFloat(document.getElementById("discount").value) ||
                    //   0;

                    // if (discount > totalAmount) {

                    // }
                  }}
                />

                <label>Paid Amount</label>
                <input type="text" value={parseInt(totalPaidAmount)} readOnly />
                <label>Balance Amount</label>
                <input
                  type="text"
                  value={parseInt(grandTotal).toLocaleString("en-IN")}
                  readOnly
                />
                <label>Sales By:</label>
                <select
                  tabIndex="8"
                  ref={button7Ref}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      button8Ref.current.focus();
                    }
                  }}
                  value={selectedSalesEmployee}
                  onChange={(e) => setSelectedSalesEmployee(e.target.value)}
                >
                  <option value={""}>Sold By:</option>
                  {allSalesTeam.map((x) => {
                    return (
                      <option
                        value={`${x.firstname} ${x.lastname}`}
                        key={x.id}
                      >{`${x.firstname} ${x.lastname}`}</option>
                    );
                  })}
                </select>
                <label>Cashed By:</label>
                <select
                  tabIndex="9"
                  ref={button8Ref}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      button9Ref.current.focus();
                    }
                  }}
                  value={selectedCashierEmployee}
                  onChange={(e) => setSelectedCashierEmployee(e.target.value)}
                >
                  <option value={""}>Cashed By:</option>
                  {allCashiersTeam.map((x) => {
                    return (
                      <option
                        value={`${x.firstname} ${x.lastname}`}
                        key={x.id}
                      >{`${x.firstname} ${x.lastname}`}</option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* <div
              id="adminInvoiceSelectLabelBox"
              className="adminInvoiceSelectLabelBox"
            >
              <div className="adminInvoiceSelectItem">
                <label>Net Amount</label>

                <input
                  type="text"
                  value={parseInt(allProdctsNetAmount)}
                  readOnly
                />
              </div>
              <div className="adminInvoiceSelectItem">
                <label>R.O./Discount(-)</label>
                <input type="text" value={parseInt(discountAmount)} readOnly />
              </div>
              <div className="adminInvoiceSelectItem">
                <label>GST 3%</label>
                <input
                  type="text"
                  value={parseInt(totalPayableGstAmount)}
                  readOnly
                />
              </div>
              <div className="adminInvoiceSelectItem">
                <label>Total Amount</label>
                <input
                  type="text"
                  style={{ backgroundColor: "wheat" }}
                  value={Math.ceil(totalPayableAmount)}
                  onChange={(e) => {
                    const newTotalPayableAmount = parseFloat(e.target.value);
                    if (!isNaN(newTotalPayableAmount)) {
                      // Check if the input value is a valid number
                      setTotalPayableGstAmount(
                        ((newTotalPayableAmount / 103) * 3).toFixed(2)
                      );
                      changeTotalPrice(e);
                    } else {
                      //   setTotalPayableAmount(allProdctsNetAmount);
                      setTotalPayableAmount(0);
                    }
                  }}
                />
                <button onClick={() => setUpdatePrices(!updatePrices)}>
                 Update
                  </button>
              </div>
              <div
                style={{ marginBottom: "0px" }}
                className="bulkProductAddingTableMain"
              >
                <button
                  style={{ cursor: "pointer", paddingInline: "100px" }}
                  onClick={() => {
                    if (selectedCustomer && allSelectedProducts.length > 0) {
                      createOrder();
                    } else {
                      alert("Please add all details");
                    }
                  }}
                >
                  Save
                </button>
              </div>
            </div> */}
            <div className="adminInvoiceMainSaveButtonBox">
              {!loading ? (
                <button
                  tabIndex="10"
                  ref={button9Ref}
                  // onKeyPress={(e) => {
                  //   if (e.key === "Enter") {
                  //     button10Ref.current.focus();
                  //   }
                  // }}
                  style={{ marginInline: "10px" }}
                  onClick={() => {
                    if (selectedCustomer && allSelectedProducts.length > 0) {
                      createOrder(gstType);
                      // checkPurchaseItems();
                    } else {
                      alert("Please add all details");
                    }
                  }}
                >
                  <MdOutlineSaveAlt
                    size={"15px"}
                    style={{ marginRight: "5px" }}
                  />
                  Save
                </button>
              ) : null}{" "}
              {!loading ? (
                <button
                  tabIndex="10"
                  ref={button9Ref}
                  // onKeyPress={(e) => {
                  //   if (e.key === "Enter") {
                  //     button10Ref.current.focus();
                  //   }
                  // }}
                  style={{ marginInline: "10px" }}
                  onClick={() => {
                    if (selectedCustomer && allSelectedProducts.length > 0) {
                      // createOrder();
                      handlePendingApproval();
                      // setPendingApproval(true);
                      // console.log(pendingApproval);
                      // checkPurchaseItems();
                    } else {
                      alert("Please add all details");
                    }
                  }}
                >
                  <MdOutlineSaveAlt
                    size={"15px"}
                    style={{ marginRight: "5px" }}
                  />
                  Pending
                </button>
              ) : null}{" "}
              <button
                tabIndex="11"
                ref={button10Ref}
                //  onKeyPress={(e) => {
                //    if (e.key === "Enter") {
                //      button1Ref.current.focus();
                //    }
                //  }}
                style={{ marginInline: "10px" }}
                onClick={() => resetAllFields()}
              >
                <BiReset size={"16px"} style={{ marginRight: "5px" }} />
                Reset
              </button>
              <button
                //  onKeyPress={(e) => {
                //    if (e.key === "Enter") {
                //      button1Ref.current.focus();
                //    }
                //  }}

                style={{
                  marginInline: "10px",
                }}
                onClick={() => navigate("/admin_orders")}
              >
                <IoIosList size={"16px"} style={{ marginRight: "5px" }} />
                List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
