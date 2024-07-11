import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminMasters.css";
import { TbCircleNumber1 } from "react-icons/tb";
import {
  a149,
  a156,
  a159,
  a18,
  a223,
  a28,
  a35,
  a38,
  a39,
  a51,
  a67,
  a7,
  a74,
  a76,
  a77,
  a78,
  s1,
  s3,
} from "../../../Api/RootApiPath";
import { useSelector } from "react-redux";
import { RiListUnordered, RiPlayListAddLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlinePlusSquare } from "react-icons/ai";
import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { GiCheckMark } from "react-icons/gi";

export default function AdminPurchasePayments() {
  const [active, setActive] = useState("List");
  const [supplierName, setSupplierName] = useState("");
  const [allSalesTeam, setAllSalesTeam] = useState([]);
  const [allSupplierData, setAllSupplierData] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierId, setSupplierId] = useState("");
  const [allPurchaseData, setAllPurchaseData] = useState([]);

  // payments
  const [selectedPurchaseInvoices, setSelectedPurchaseInvoices] = useState([]);
  const [paymentType, setPaymentType] = useState("Paid");
  const [paymentGold, setPaymentGold] = useState(0);
  const [deductGold, setDeductGold] = useState(0);
  const [paymentSilver, setPaymentSilver] = useState(0);
  const [deductSilver, setDeductSilver] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [totalPayableGold, setTotalPayableGold] = useState(0);
  const [totalPayableSilver, setTotalPayableSilver] = useState(0);
  const [paymentOptions, setPaymentOptions] = useState("Cash");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [payments, setPayments] = useState([]);
  const [allProdctsNetAmount, setAllProdctsNetAmount] = useState(0);
  const [allProdctsGstAmount, setAllProdctsGstAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalPayableGstAmount, setTotalPayableGstAmount] = useState(0);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [paymentDescription, setPaymentDescription] = useState("");
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

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  const clientCode = adminLoggedIn.ClientCode;
  const CompanyId = adminLoggedIn.CompanyId;
  const CounterId = adminLoggedIn.CounterId;
  const BranchId = adminLoggedIn.BranchId;
  const EmployeId = adminLoggedIn.EmployeId;

  const calculateNetAmount = () => {
    if (selectedSupplier) {
      // let totalNetAmount = allSupplierData.reduce(
      //   (total, product) =>
      //     total + (product.finalPrice ? parseFloat(product.finalPrice) : 0),
      //   0
      // );
      let totalNetAmount = allPurchaseData.reduce(
        (total, product) =>
          parseFloat(total) +
          parseFloat(product.BalanceAmount) * 0.97 -
          (parseFloat(total) + parseFloat(product.DebitAmount) * 0.97),
        0
      );
      console.log(totalNetAmount, "totalNetAmount");
      console.log(selectedSupplier, "selectedSupplier");
      console.log(allPurchaseData, "allPurchaseData");
      let totalGstAmount = allPurchaseData.reduce(
        (total, product) =>
          parseFloat(total) +
          parseFloat(product.BalanceAmount) * 0.03 -
          (parseFloat(total) + parseFloat(product.DebitAmount) * 0.03),
        0
      );
      // let totalGstAmount = allSupplierData.reduce(
      //   (total, product) =>
      //     total +
      //     (product.totalGstAmount ? parseFloat(product.totalGstAmount) : 0),
      //   0
      // );
      let totalAmountPaying = allPurchaseData.reduce(
        (total, product) =>
          parseFloat(total) +
          (parseFloat(product.BalanceAmount) - parseFloat(product.DebitAmount)),
        0
      );

      let totalGold = allPurchaseData.reduce(
        (total, product) =>
          parseFloat(total) +
          (parseFloat(product.BalanceGold) - parseFloat(product.DebitGold)),
        0
      );

      let totalSilver = allPurchaseData.reduce(
        (total, product) =>
          parseFloat(total) +
          (parseFloat(product.BalanceSilver) - parseFloat(product.DebitSilver)),
        0
      );
      console.log(totalAmountPaying, "totalAmountPaying");
      console.log(totalAmountPaying, "totalAmountPaying");
      console.log(totalAmountPaying, "totalAmountPaying");
      console.log(totalAmountPaying, "totalAmountPaying");
      setTotalPayableGold(parseFloat(totalGold).toFixed(3));
      setTotalPayableSilver(parseFloat(totalSilver).toFixed(3));

      setAllProdctsNetAmount(parseFloat(totalNetAmount).toFixed(3));
      setTotalPayableAmount(parseFloat(totalAmountPaying).toFixed(3));
      setGrandTotal(Math.ceil(parseFloat(totalAmountPaying)).toFixed(3));
      setAllProdctsGstAmount(parseFloat(totalGstAmount).toFixed(3));
      setTotalPayableGstAmount(parseFloat(totalGstAmount).toFixed(3));
      setPaymentAmount(Math.ceil(parseFloat(totalAmountPaying)).toFixed(3));
    } else {
      setAllProdctsNetAmount(0); // Reset the total to 0 when there are no selected product
      setTotalPayableAmount(0);
      setGrandTotal(0);
      setDiscountAmount(0);
      setPaymentAmount(0);
      setAllProdctsGstAmount(0);
      setTotalPayableGstAmount(0);
      // setOldGoldAmount(0);
      setTotalPayableGold(0);
      setTotalPayableSilver(0);
    }
  };

  const calculateTotalAmount = () => {
    // Use reduce to sum all payment amounts
    const totalPaidAmount = payments.reduce(
      (total, payment) => total + parseFloat(payment.amount),
      0
    );

    return totalPaidAmount;
  };
  const calculateTotalGold = () => {
    // Use reduce to sum all payment amounts
    const totalPaidGold = payments.reduce(
      (total, payment) => total + parseFloat(payment.deductGold),
      0
    );

    return totalPaidGold;
  };
  const calculateTotalSilver = () => {
    // Use reduce to sum all payment amounts
    const totalPaidSilver = payments.reduce(
      (total, payment) => total + parseFloat(payment.deductSilver),
      0
    );

    return totalPaidSilver;
  };
  console.log(payments, "payments");
  // Render total payment amount
  const totalPaidAmount = calculateTotalAmount();
  const totalPaidGold = calculateTotalGold();
  const totalPaidSilver = calculateTotalSilver();
  const addPayment = () => {
    // Check if both payment mode and amount are provided
    if (paymentOptions && paymentAmount >= 0 && paymentType === "Paid") {
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
            mode: paymentOptions,
            amount: paymentAmount,
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
    } else if (
      paymentOptions &&
      paymentAmount > 0 &&
      paymentType === "Receive"
    ) {
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
      setPaymentAmount(parseInt(grandTotal) - parseInt(-paymentAmount));
    } else if (
      paymentOptions &&
      paymentAmount < 0 &&
      paymentType === "Receive"
    ) {
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
    setTotalPayableGold(totalPayableGold - deductGold);
    setTotalPayableSilver(totalPayableSilver - deductSilver);
    setPaymentDescription("");
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
  };

  const deletePayment = (index) => {
    // Get the amount of the payment to be deleted
    setPaymentOptions(payments[index].mode);
    const deletedAmount = parseFloat(payments[index].amount);
    const deletedGoldWeight = parseFloat(payments[index].deductGold);
    const deletedSilverWeight = parseFloat(payments[index].deductSilver);

    // Remove the payment at the specified index
    const updatedPayments = [...payments];
    updatedPayments.splice(index, 1);

    // Calculate the new grand total by subtracting the deleted amount

    // Update the payments array and grand total state
    setPayments(updatedPayments);
    const newGrandTotal = grandTotal + deletedAmount;
    setGrandTotal(newGrandTotal);
    const remainingGoldWeight = totalPayableGold + deletedGoldWeight;
    const remainingSilverWeight = totalPayableSilver + deletedSilverWeight;
    setTotalPayableGold(remainingGoldWeight);
    setTotalPayableSilver(remainingSilverWeight);
    setPaymentAmount(newGrandTotal);
    // let resetAllProductPrices = allPurchaseData.map((product) => {
    //   return {
    //     ...product,
    //     paidPrice: 0,
    //   };
    // });;
    // setAllPurchaseData(resetAllProductPrices);
  };

  // payments
  useEffect(() => {
    if (selectedSupplier) {
      setSupplierName(selectedSupplier.VendorName);
      // handleToggleCustomTab();
    } else {
      setSupplierName("");
    }
  }, [selectedSupplier]);

  const handleNameInputChange = (e) => {
    const { value } = e.target;
    setSupplierName(value); // Update the name input value

    const selected = allSupplierData.find((supplier) => {
      const fullName = supplier.VendorName;
      return fullName.toLowerCase() === value.toLowerCase();
    });

    if (selected) {
      setSupplierId(selected.Id); // Update the email input value based on selected customer's email
    }
    setSelectedSupplier(selected); // Update the selected customer based on name match
  };

  const fetchAllSuppliers = async () => {
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
      setAllSupplierData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllSuppliers();
  }, []);
  const fetchAllPurchaseData = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a159, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data, "all Supplier data");

      filterInvoices(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllPurchaseData();
  }, [selectedSupplier]);
  // const filterInvoices = (data) => {
  //   if (active === "List" && data && selectedSupplier) {
  //     const allSupplierInvoices = data.filter(
  //       (x) => x.party_Details.id === selectedSupplier.id
  //     );
  //     if (allSupplierInvoices.length > 0) {
  //       const filteredInvoices = allSupplierInvoices.filter(
  //         (a) =>
  //           parseFloat(a.balanceGold) > 0 ||
  //           parseFloat(a.balanceSilver) > 0 ||
  //           parseFloat(a.balanceAmount) > 0
  //       );
  //       setAllPurchaseData(filteredInvoices);
  //     }
  //   }
  // };
  const filterInvoices = (data) => {
    if (active === "List" && data && selectedSupplier) {
      const allSupplierInvoices = data.filter(
        (x) => x.VendorId === selectedSupplier.Id
      );
      if (allSupplierInvoices.length > 0) {
        const filteredInvoices = allSupplierInvoices
          .filter(
            (a) =>
              parseFloat(a.BalanceGold) - parseFloat(a.DebitGold) > 0 ||
              parseFloat(a.BalanceSilver) - parseFloat(a.DebitSilver) > 0 ||
              parseFloat(a.BalanceAmount) - parseFloat(a.DebitAmount) > 0
          )
          .map((invoice) => {
            return {
              ...invoice,
              paidPrice: 0,
              paidGold: 0,
              paidSilver: 0,
              paidStatus: "",
              isTicked: false, // Add isTicked property with a default value of false
            };
          });

        setAllPurchaseData(filteredInvoices);
      }
    }
  };

  useEffect(() => {
    calculateNetAmount();
  }, [selectedSupplier, allPurchaseData]);

  const handleSelectedPurchaseInvoices = (id, item) => {
    if (selectedPurchaseInvoices.filter((x) => x == id).length === 0) {
      setSelectedPurchaseInvoices([...selectedPurchaseInvoices, id]);
    } else {
      let newPurchaseInvoicesList = selectedPurchaseInvoices;
      newPurchaseInvoicesList = selectedPurchaseInvoices.filter(
        (x) => x !== id
      );
      setSelectedPurchaseInvoices(newPurchaseInvoicesList);
    }
  };
  console.log(allPurchaseData, "allPurchaseData");
  // console.log(allPurchaseData, "allPurchaseData");
  // console.log(selectedPurchaseInvoices, "selectedPurchaseInvoices");

  const updateProducts = () => {
    let remainingAmount = parseFloat(totalPaidAmount);
    let remainingGold = parseFloat(totalPaidGold);
    let remainingSilver = parseFloat(totalPaidSilver);

    const updatedProducts = allPurchaseData.map((product) => {
      const productPrice =
        parseFloat(product.BalanceAmount) - parseFloat(product.DebitAmount);
      const productGold = parseFloat(product.BalanceGold);
      const productSilver = parseFloat(product.BalanceSilver);

      // Check if the paymentOption is "Cash to Metal"
      if (paymentOptions === "Cash to Metal") {
        if (metalPaymentOption.optionSelected.toLowerCase().includes("gold")) {
          if (productGold > 0 && remainingGold >= productGold) {
            product.isTicked = true;
            product.paidGold = productGold;

            remainingGold -= productGold;
          } else if (
            productGold > 0 &&
            remainingGold < productGold &&
            remainingGold !== 0
          ) {
            product.isTicked = true;
            product.paidGold = parseFloat(remainingGold).toFixed(3);
            remainingGold = 0;
          } else {
            // If the paymentAmount is not enough for this product, set isTicked to false
            product.isTicked =
              product.paidPrice !== 0 || product.paidSilver !== 0
                ? true
                : false;
            product.paidGold = 0;
            // product.paidSilver = 0;
            // product.paidPrice = 0; // Set the paid price to zero
          }
        }
        //  if (
        //   !metalPaymentOption.optionSelected.toLowerCase().includes("gold")
        // )
        else {
          if (remainingSilver >= productSilver && productSilver > 0) {
            product.isTicked = true;
            product.paidSilver = productSilver;

            remainingSilver -= productSilver;
          } else if (
            productSilver > 0 &&
            remainingSilver < productSilver &&
            remainingSilver !== 0
          ) {
            product.isTicked = true;
            product.paidSilver = parseFloat(remainingSilver).toFixed(3);
            remainingSilver = 0;
          } else {
            // If the paymentAmount is not enough for this product, set isTicked to false
            product.isTicked =
              product.paidPrice !== 0 || product.paidGold !== 0 ? true : false;
            // product.paidGold = 0;
            product.paidSilver = 0;
            // product.paidPrice = 0; // Set the paid price to zero
          }
        }
      } else {
        // Handle the case when paymentOption is not "Cash to Metal"
        if (remainingAmount >= productPrice && productPrice > 0) {
          // Update the paid price to the product price
          product.paidPrice = productPrice;
          // product.paidGold = 0;
          // product.paidSilver = 0;
          // Set a flag to indicate that the product should be ticked
          product.isTicked = true;

          // Subtract the product price from the remainingAmount
          remainingAmount -= productPrice;
        } else if (
          remainingAmount < productPrice &&
          remainingAmount !== 0 &&
          productPrice > 0
        ) {
          // If remainingAmount is less than productPrice and not zero, set isTicked to true
          product.isTicked = true;
          // product.paidGold = 0;
          // product.paidSilver = 0;
          product.paidPrice = remainingAmount; // Set the paid price to remainingAmount
          remainingAmount = 0;
          // Reset remainingAmount to zero
        } else {
          // If the paymentAmount is not enough for this product, set isTicked to false
          product.isTicked =
            product.paidGold !== 0 || product.paidSilver !== 0 ? true : false;
          // product.paidGold = 0;
          // product.paidSilver = 0;
          product.paidPrice = 0; // Set the paid price to zero
        }
      }
      if (
        payments.length > 0 &&
        parseInt(product.paidPrice) == parseInt(product.BalanceAmount) &&
        parseFloat(product.paidGold).toFixed(3) == product.BalanceGold &&
        parseFloat(product.paidSilver).toFixed(3) == product.BalanceSilver
      ) {
        product.paidStatus = "Complete";
      } else if (
        (payments.length > 0 && product.paidPrice > 0) ||
        (payments.length > 0 && product.paidGold > 0) ||
        (payments.length > 0 && product.paidSilver > 0)
      ) {
        product.paidStatus = "Partial";
      } else if (payments.length > 0) {
        product.paidStatus = "None";
      }

      return product;
    });

    setSelectedPurchaseInvoices(updatedProducts);
    setMetalPaymentOption({
      ...metalPaymentOption,
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
    return updatedProducts;
  };

  // const updateProducts = () => {
  //   let remainingAmount = parseFloat(totalPaidAmount);
  //   let remainingGold = parseFloat(totalPaidGold);
  //   let remainingSilver = parseFloat(totalPaidSilver);
  //   console.log(remainingAmount, "remainingAmount");
  //   console.log(remainingGold, "remainingGold");
  //   console.log(remainingSilver, "remainingSilver");
  //   const updatedProducts = allPurchaseData.map((product) => {
  //     const productPrice = parseFloat(product.balanceAmount);
  //     const productGold = parseFloat(product.balanceGold);
  //     const productSilver = parseFloat(product.balanceSilver);
  //     console.log(productPrice, "productPrice");
  //     console.log(productGold, "productGold");
  //     console.log(productSilver, "productSilver");

  //     // Check if the paymentAmount is greater than the product price
  //     if (remainingAmount >= productPrice) {
  //       // Update the paid price to the product price
  //       product.paidPrice = productPrice;
  //       product.paidGold = 0;
  //       product.paidSilver = 0;
  //       // Set a flag to indicate that the product should be ticked
  //       product.isTicked = true;

  //       // Subtract the product price from the remainingAmount
  //       remainingAmount -= productPrice;
  //     } else if (remainingAmount < productPrice && remainingAmount !== 0) {
  //       // If remainingAmount is less than productPrice and not zero, set isTicked to true
  //       product.isTicked = true;
  //       product.paidGold = 0;
  //       product.paidSilver = 0;
  //       product.paidPrice = remainingAmount; // Set the paid price to remainingAmount
  //       remainingAmount = 0;
  //       // Reset remainingAmount to zero
  //     } else {
  //       // If the paymentAmount is not enough for this product, set isTicked to false
  //       product.isTicked = false;
  //       product.paidGold = 0;
  //       product.paidSilver = 0;
  //       product.paidPrice = 0; // Set the paid price to zero
  //     }
  //     if (remainingGold >= productGold) {
  //       // If remainingAmount is less than productPrice and not zero, set isTicked to true
  //       product.isTicked = true;
  //       product.paidGold = productGold;

  //       remainingGold -= productGold;
  //       // Reset remainingAmount to zero
  //     } else if (remainingGold < productGold && remainingGold !== 0) {
  //       // If remainingAmount is less than productPrice and not zero, set isTicked to true
  //       product.isTicked = true;
  //       product.paidGold = remainingGold;
  //       // Set the paid price to remainingAmount
  //       remainingGold = 0;
  //       // Reset remainingAmount to zero
  //     } else {
  //       // If the paymentAmount is not enough for this product, set isTicked to false
  //       product.isTicked = false;
  //       product.paidGold = 0;
  //       product.paidSilver = 0;
  //       product.paidPrice = 0; // Set the paid price to zero
  //     }
  //     if (remainingSilver >= productSilver) {
  //       // If remainingAmount is less than productPrice and not zero, set isTicked to true
  //       product.isTicked = true;
  //       product.paidSilver = productSilver;

  //       remainingSilver -= productSilver;
  //       // Reset remainingAmount to zero
  //     } else if (remainingSilver < productSilver && remainingSilver !== 0) {
  //       // If remainingAmount is less than productPrice and not zero, set isTicked to true
  //       product.isTicked = true;
  //       product.paidSilver = remainingSilver;
  //       // Set the paid price to remainingAmount
  //       remainingSilver = 0;
  //       // Reset remainingAmount to zero
  //     } else {
  //       // If the paymentAmount is not enough for this product, set isTicked to false
  //       product.isTicked = false;
  //       product.paidGold = 0;
  //       product.paidSilver = 0;
  //       product.paidPrice = 0; // Set the paid price to zero
  //     }

  //     return product;
  //   });
  //   setSelectedPurchaseInvoices(updatedProducts);
  //   return updatedProducts;
  // };
  const handleMetalPaymentOption = (a, b) => {
    const { value } = b.target;
    if (paymentOptions === "Metal to Cash") {
      let totalAmount = 0;
      if (metalPaymentOption.optionSelected.toLowerCase().includes("gold")) {
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
      if (metalPaymentOption.optionSelected.toLowerCase().includes("gold")) {
        if (a == "Amount") {
          fineWt = (value * 10) / metalPaymentOption.fineRate;
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
          fineWt = (metalPaymentOption.totalAmount * 10) / value;
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
          fineWt = (value * 10) / metalPaymentOption.fineRate;
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
          fineWt = (metalPaymentOption.totalAmount * 10) / value;
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
  useEffect(() => {
    updateProducts();
  }, [
    totalPayableAmount,
    totalPayableGold,
    totalPayableSilver,
    paymentAmount,
    totalPaidAmount,
  ]);
  const updateInvoices = async (invoices) => {
    if (invoices.length > 0) {
      try {
        const invoicesList = invoices.map((invoice) => {
          return {
            ...invoice,
            ClientCode: clientCode,
            Id: parseInt(invoice.Id),
            BalanceGold: `${
              parseFloat(invoice.BalanceGold).toFixed(3) -
              parseFloat(invoice.paidGold).toFixed(3)
            }`,
            BalanceSilver: `${
              parseFloat(invoice.BalanceSilver).toFixed(3) -
              parseFloat(invoice.paidSilver).toFixed(3)
            }`,
            BalanceAmount: `${
              parseFloat(invoice.BalanceAmount).toFixed(3) -
              parseFloat(invoice.paidPrice).toFixed(3)
            }`,
          };
        });
        console.log(invoicesList, "invoicesList");
        const response = await fetch(a223, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoicesList),
        });
        // for (let i = 0; i < invoicesList.length; i++) {
        //   const response = await fetch(a77, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(invoicesList),
        //   });

        // Process the response as needed
        // console.log(`Response for invoice ${i + 1}:`, response);
        const rcvdData = await response.json();
        console.log(rcvdData, "rcvdData");
        addAllSelectedPayments();
        const purchaseProductsData = rcvdData;
        // console.log(purchaseProductsData, "purchaseProductsData");
        // Set the state with order items
        if (rcvdData.Status === "error") {
          alert(rcvdData.Message);
        } else {
          alert("Updated Successfully");
        }
        // }
      } catch (error) {
        alert(error);
        console.error(error);
      }
    } else {
      alert("No Invoices Selected");
    }
  };
  const currentYear = new Date().getFullYear();
  const addAllSelectedPayments = async () => {
    try {
      const paymentsList = payments.map((payment) => {
        let item = {
          PaymentSource: "Purchase Payment",
          PaymentModeType: `${payment.mode}`,
          CreditDebit: "Debit",
          Amount: `${payment.amount}`,
          Description: payment.paymentDescription,
          TransactionType: `${payment.paymentType}`,
          SupplierId: parseInt(supplierId),
          InvoiceNumber: allPurchaseData[0].InvoiceNumber
            ? `${allPurchaseData[0].InvoiceNumber}`
            : "",
          CustomerId: 0,
          BillType: "purchase",
          PaymentVisibility: "Active",
          financialYear: `${currentYear}`,
          Branch: "Home",
          FineGold: `${payment.fineGold}`,
          FineSilver: `${payment.fineSilver}`,
          SilverRate: `${payment.silverRate}`,
          GoldRate: `${payment.goldRate}`,
          SilverAmount: `${payment.goldAmount}`,
          GoldAmount: `${payment.silverAmount}`,
          OldGoldGrosswt: `${payment.fineGold}`,
          OldSilverGrosswt: `${payment.fineSilver}`,
          GoldPurity: "",
          SilverPurity: "",
          CustomerName: "",
          SupplierName: `${selectedSupplier.FirmName}`,
          InwardNo: `${parseInt(selectedSupplier.InwardNo)}`,
          FineOtherMetal: "0",
          OtherMetalRate: "0",
          OtherMetalAmount: "0",
          OtherMetalGrossWt: "0",
          GoldPurity: "",
          SilverPurity: "",
          OtherMetalPurity: "",
          ClientCode: clientCode,
          CompanyId: CompanyId ? CompanyId : 0,
          CounterId: CounterId ? CounterId : 0,
          BranchId: BranchId ? BranchId : 0,
          EmployeId: EmployeId ? EmployeId : 0,
        };

        return item;
      });
      console.log(paymentsList, "paymentsList to send");
      const response = await fetch(a156, {
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
        // setSelectedSupplier(null);
        fetchAllPurchaseData();
        setPayments([]);
        setPaymentAmount(0);
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
  };
  console.log(metalPaymentOption, "metalPaymentOption");
  console.log(metalPaymentOption, "metalPaymentOption");
  const navigate = useNavigate();
  let totalPaidCashAmount = 0;
  useEffect(() => {
    totalPaidCashAmount = payments
      .filter((x) => x.mode == "Cash")
      .reduce((a, b) => parseInt(a) + parseInt(b.amount), 0);
  }, [payments, paymentAmount, paymentOptions]);
  return (
    <div>
      <AdminHeading />
      <div className="adminMainBodyBox">
        <AdminBreadCrump
          title={"Purchase Payments"}
          companyName={"Loyalstring"}
          module={"Trading"}
          page={"Purchase Payments"}
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
                <p>Make Payment</p>
              </div>

              <div
                onClick={() => {
                  setActive("AddNew"), navigate("/receive_payments");
                }}
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
                <p>Recieve Payment</p>
              </div>
            </div>
            {active === "List" ? (
              <div
                style={{
                  width: "100%",
                  justifyContent: "left",
                  flexWrap: "wrap",
                  marginBottom: "30px",
                  marginTop: "20px",
                }}
                className="adminAllProductsFilterBox"
              >
                <div
                  style={{ marginBottom: "5px" }}
                  className="adminAllProductsFilterCategoryBox"
                >
                  <div
                    id="adminInvoiceAddCustomerTitle"
                    className="adminInvoiceSelectLabelBox"
                  >
                    <div className="adminInvoiceSelectItem">
                      {/* <button >Check</button> */}
                      <label>Firm Name</label>
                      <input
                        style={{ width: "30vw" }}
                        type="text"
                        name="supplierName"
                        value={supplierName}
                        onInput={handleNameInputChange}
                        list="supplierNamesList"
                      />
                      <datalist id="supplierNamesList">
                        {allSupplierData.map((supplier, index) => (
                          <option
                            key={index}
                            value={`${supplier.VendorName}`}
                          />
                        ))}
                      </datalist>
                      {/* <button
                        onClick={() => {
                          //   setSelectedCustomer(null),
                          // setAddNewCustomer(!addNewCustomer),
                          // checkIfNewCs();
                        }}
                        className="adminInvoiceAddCustomerOption"
                      >
                        <AiOutlinePlusSquare size={"20px"} />
                      </button> */}
                    </div>
                    <div className="adminInvoiceSelectItem">
                      <label>Fine Gold</label>
                      <input
                        type="text"
                        readOnly
                        value={selectedSupplier ? selectedSupplier.FineGold : 0}
                      />
                    </div>
                    <div className="adminInvoiceSelectItem">
                      <label>Fine Silver</label>
                      <input
                        type="text"
                        readOnly
                        value={
                          selectedSupplier ? selectedSupplier.FineSilver : 0
                        }
                      />
                    </div>
                    <div className="adminInvoiceSelectItem">
                      <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                        Advance Amount
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={
                          selectedSupplier ? selectedSupplier.AdvanceAmt : 0
                        }
                      />
                    </div>
                    <div className="adminInvoiceSelectItem">
                      <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                        Balance Amount
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={
                          selectedSupplier ? selectedSupplier.BalanceAmt : 0
                        }
                      />
                    </div>
                    {/* <div className="adminInvoiceSelectItem">
                      <label>Inward Number</label>
                      <input
                        type="text"
                        readOnly
                        value={selectedCustomer ? selectedCustomer.inwardNo : 0}
                      />
                    </div> */}
                  </div>
                </div>
                <div
                  className="adminAllProductsFilterLabelBox"
                  // className="adminAllOrderLeftBox"
                >
                  {" "}
                  <div
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                    className="adminInviceAddedProductsTotalOuterBox"
                  >
                    <div className="adminInviceAddedProductsTotalAmountOuterBox">
                      <div className="adminInviceAddedProductsTotalItemBoxPaymentType">
                        <div onClick={() => setPaymentType("Receive")}>
                          {paymentType === "Receive" ? (
                            <FaRegDotCircle style={{ marginRight: "5px" }} />
                          ) : (
                            <FaRegCircle style={{ marginRight: "5px" }} />
                          )}
                          Receive
                        </div>
                        <div onClick={() => setPaymentType("Paid")}>
                          {paymentType === "Paid" ? (
                            <FaRegDotCircle style={{ marginRight: "5px" }} />
                          ) : (
                            <FaRegCircle style={{ marginRight: "5px" }} />
                          )}
                          Paid
                        </div>
                      </div>
                      <div
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          textAlign: "left",
                          borderTopLeftRadius: "0px",
                          borderTopRightRadius: "0px",
                        }}
                        className="adminInviceAddedProductsTotalItemBox"
                      >
                        <label>Payment Mode</label>
                        <select
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
                          <option value={"Advance Amount"}>
                            Advance Amount
                          </option>
                          <option value={"Metal to Cash"}>Metal to Cash</option>
                          <option value={"Cash to Metal"}>Cash to Metal</option>
                        </select>
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
                            type="number"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                          />
                          <button
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
                            onClick={() => {
                              setPaymentAmount(0), setPaymentOptions("Cash");
                            }}
                          >
                            <RxCross2 />
                          </button>
                        </div>
                      </div>
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
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.map((payment, index) => (
                              <tr key={index}>
                                <td>{payment.mode}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.fineGold}</td>
                                <td>{payment.fineSilver}</td>
                                {/* Button to delete the payment */}
                                <td onClick={() => deletePayment(index)}>
                                  <button
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
                      <label>Balance Gold (F + W)</label>
                      <input
                        type="text"
                        value={parseFloat(totalPayableGold).toFixed(3)}
                        readOnly
                      />
                      <label>Balance Silver (F + W)</label>
                      <input
                        type="text"
                        value={parseFloat(totalPayableSilver).toFixed(3)}
                        readOnly
                      />
                      <label>Taxable Amount</label>
                      <input
                        type="text"
                        value={parseInt(allProdctsNetAmount).toLocaleString(
                          "en-IN"
                        )}
                        readOnly
                      />
                      <label>R.O./Discount(-)</label>
                      <input
                        type="text"
                        value={parseInt(discountAmount).toLocaleString("en-IN")}
                        readOnly
                      />
                      <label>GST 3%</label>
                      <input
                        type="text"
                        value={parseInt(totalPayableGstAmount).toLocaleString(
                          "en-IN"
                        )}
                        readOnly
                      />
                      <label>Total Amount</label>
                      <input
                        type="text"
                        style={{ backgroundColor: "wheat" }}
                        value={Math.ceil(totalPayableAmount)}
                        onChange={(e) => {
                          const newTotalPayableAmount = parseFloat(
                            e.target.value
                          );
                          if (!isNaN(newTotalPayableAmount)) {
                            // Check if the input value is a valid number
                            setTotalPayableGstAmount(
                              ((newTotalPayableAmount / 103) * 3).toFixed(2)
                            );
                            changeTotalPrice(e);

                            // setGrandTotal(0);
                            // setOldGoldAmount(0);
                          } else {
                            //   setTotalPayableAmount(allProdctsNetAmount);
                            setTotalPayableAmount(0);
                          }
                        }}
                      />
                      {/* <label>Purchase Amount</label>
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
                  /> */}
                      <label>Paid Amount</label>
                      <input
                        type="text"
                        value={parseInt(totalPaidAmount)}
                        readOnly
                      />
                      <label>Balance Amount</label>
                      <input
                        type="text"
                        value={parseInt(grandTotal).toLocaleString("en-IN")}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="adminAllProductsFilterLabelBox"
                  // className="adminAllOrderLeftBox"
                >
                  {/* <p>Status</p> */}
                </div>
                <div>
                  <p style={{ textAlign: "left", marginBottom: "20px" }}>
                    Outstanding Transactions
                  </p>
                  <div className="adminPaymentsTransactionsListMainBox">
                    <div className="adminPaymentsTransactionsListItemsBox">
                      <table>
                        <thead>
                          <tr>
                            <td>SELECT</td>
                            <td>LOT NO</td>
                            <td>TOTAL AMOUNT</td>
                            <td>TOTAL GOLD</td>
                            <td>TOTAL SILVER</td>
                            <td>BALANCE AMOUNT</td>
                            <td>BALANCE GOLD</td>
                            <td>BALANCE SILVER</td>
                            <td>PAYMENT</td>
                            <td>GOLD PAID</td>
                            <td>SILVER PAID</td>
                            <td>STATUS</td>
                          </tr>
                        </thead>
                        <tbody>
                          {allPurchaseData.map((x) => {
                            return (
                              <tr>
                                <td style={{ textAlign: "center" }}>
                                  <input
                                    style={{ width: "20px", height: "20px" }}
                                    type="checkbox"
                                    value={selectedPurchaseInvoices}
                                    checked={x.isTicked}
                                    onChange={() =>
                                      handleSelectedPurchaseInvoices(x.Id, x)
                                    }
                                  />
                                </td>
                                <td>{x.LotNumber}</td>
                                <td>{x.TotalPurchaseAmount}</td>
                                <td>{x.TotalFineGold}</td>
                                <td>{x.TotalFineSilver}</td>
                                <td>
                                  {x.BalanceAmount}
                                  {x.DebitAmount !== "" &&
                                  x.DebitAmount !== "0" ? (
                                    <p style={{ whiteSpace: "nowrap" }}>
                                      Debit - {x.DebitAmount}{" "}
                                    </p>
                                  ) : null}
                                </td>
                                <td>
                                  {x.BalanceGold}
                                  {x.DebitGold !== "" && x.DebitGold !== "0" ? (
                                    <p style={{ whiteSpace: "nowrap" }}>
                                      Debit - {x.DebitGold}{" "}
                                    </p>
                                  ) : null}
                                </td>
                                <td>
                                  {x.BalanceSilver}
                                  {x.DebitSilver !== "" &&
                                  x.DebitSilver !== "0" ? (
                                    <p style={{ whiteSpace: "nowrap" }}>
                                      Debit - {x.DebitSilver}{" "}
                                    </p>
                                  ) : null}
                                </td>
                                <td
                                  style={{
                                    fontWeight: "bold",
                                    color: x.paidPrice >= 0 ? "green" : "red",
                                  }}
                                >
                                  {x.paidPrice}
                                </td>
                                <td
                                  style={{
                                    fontWeight: "bold",
                                    color: x.paidGold >= 0 ? "green" : "red",
                                  }}
                                >
                                  {x.paidGold}
                                </td>
                                <td
                                  style={{
                                    fontWeight: "bold",
                                    color: x.paidSilver >= 0 ? "green" : "red",
                                  }}
                                >
                                  {x.paidSilver}
                                </td>
                                <td
                                  style={{
                                    fontWeight: "bold",
                                    color:
                                      x.paidStatus === "None"
                                        ? "red"
                                        : x.paidStatus === "Complete"
                                        ? "green"
                                        : x.paidStatus === "Partial"
                                        ? "orange"
                                        : "black",
                                  }}
                                >
                                  {x.paidStatus}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="adminInvoiceMainSaveButtonBox">
                  <button
                    onClick={() => {
                      let invoiceToUpdate = selectedPurchaseInvoices.filter(
                        (x) => x.isTicked === true
                      );
                      console.log(invoiceToUpdate, "invoiceToUpdate");
                      updateInvoices(invoiceToUpdate);
                    }}
                  >
                    Make Payment
                  </button>
                </div>
              </div>
            ) : null}

            {/* <div className="adminAllOrderRightBox">
                <button>
                  <BsHandbag style={{ marginRight: "5px" }} />
                  Add New Order
                </button>
                <button>Export</button>
              </div> */}
            {/* </div> */}
            {active === "List" ? (
              <div
                className="adminAllOrdersTableMainBox"
                style={{ overflow: "auto" }}
              ></div>
            ) : null}
            <div
              id="adminSelectedCreditNoteDetailsBox"
              className="adminAddCategoryMainBox"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
