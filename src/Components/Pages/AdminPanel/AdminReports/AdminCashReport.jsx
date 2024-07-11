import React, { useEffect, useState } from "react";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import AdminHeading from "../Heading/AdminHeading";
import "../../PagesStyles/AdminReport.css";
import { a38, a67, a73, a87, a88 } from "../../../Api/RootApiPath";

export default function AdminCashReport() {
  const today = new Date().toISOString().split("T")[0];
  //   const today = new Date();
  const [date, setDate] = useState(today);
  const [allData, setAllData] = useState([]);
  const [allOrdersData, setAllOrdersData] = useState([]); // Added this line
  const [allRDPurchaseData, setAllRDPurchaseData] = useState([]);
  const [allPaymentModeData, setAllPaymentModeData] = useState([]);
  const [received, setReceived] = useState([
    { name: "Gold Sale", weight: 0, amount: 0 },
    { name: "Silver Sale", weight: 0, amount: 0 },
    { name: "Platinum Sale", weight: 0, amount: 0 },
    { name: "Diamond Sale", weight: 0, amount: 0 },
    { name: "Stone Sale", weight: 0, amount: 0 },
    { name: "Order Advance", weight: 0, amount: 0 },
    { name: "Old Balance", weight: 0, amount: 0 },
    { name: "Repair", weight: 0, amount: 0 },
    { name: "Total", weight: 0, amount: 0 },
  ]);
  const [paid, setPaid] = useState([
    { name: "Gold Purchase", weight: 0, amount: 0 },
    { name: "URD Purchase", weight: 0, amount: 0 },
    { name: "Silver Purchase", weight: 0, amount: 0 },
    { name: "Platinum Purchase", weight: 0, amount: 0 },
    { name: "Diamond Purchase", weight: 0, amount: 0 },
    { name: "Stone Purchase", weight: 0, amount: 0 },
    { name: "Advance Paid", weight: 0, amount: 0 },
    { name: "Expenses", weight: 0, amount: 0 },
    { name: "Total", weight: 0, amount: 0 },
  ]);
  const [paymentMode, setPaymentMode] = useState([
    { name: "Cash", amount: 0 },
    { name: "UPI", amount: 0 },
    { name: "RTGS", amount: 0 },
    { name: "Cheque", amount: 0 },
    { name: "Card", amount: 0 },
    { name: "Advance Used", amount: 0 },
    { name: "Balance", amount: 0 },
    { name: "Total", amount: 0 },
  ]);
  const [paymentMode2, setPaymentMode2] = useState([
    { name: "Cash", amount: 0 },
    { name: "UPI", amount: 0 },
    { name: "RTGS", amount: 0 },
    { name: "Cheque", amount: 0 },
    { name: "Card", amount: 0 },
    { name: "Advance Used", amount: 0 },
    { name: "Balance", amount: 0 },
    { name: "Total", amount: 0 },
  ]);
  const [metalPayment, setMetalPayment] = useState([
    { name: "Fine Gold", amount: 0 },
    { name: "Fine Silver", amount: 0 },
  ]);
  const [metalPayment2, setMetalPayment2] = useState([
    { name: "Fine Gold", amount: 0 },
    { name: "Fine Silver", amount: 0 },
  ]);
  const [approxProfit, setApproxProfit] = useState([
    { name: "Gold", amount: 0 },
    { name: "Silver", amount: 0 },
    { name: "Amount", amount: 0 },
  ]);
  const [cash, setCash] = useState([
    { name: "Inward Cash", amount: 0 },
    { name: "Outward Cash", amount: 0 },
    { name: "Cash In Hand", amount: 0 },
  ]);
  const [loadingAllOrders, setLoadingAllOrders] = useState(true);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setDate(newDate);
  };

  const fetchAllOrdersData = async () => {
    try {
      const response = await fetch(a87);
      const data = await response.json();
      setAllOrdersData(data.data);

      updateReceivedData();
      setLoadingAllOrders(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(allData, "ALLDATA");
  console.log(allData, "alldata");
  console.log(allData, "alldata");
  console.log(allData, "alldata");
  console.log(allData, "alldata");
  const fetchData = async () => {
    try {
      const response = await fetch(a73);
      const data = await response.json();
      const sortedData = data.data.sort((a, b) => {
        const dateA = new Date(a.createdOn);
        const dateB = new Date(b.createdOn);
        // return dateA - dateB; // Ascending order
        return dateB - dateA;
      });

      setAllData(sortedData);
      filterPaymentModeData(sortedData);
      filterPaymentModeData2(sortedData);
      filterPaymentModeMetal(sortedData);
      filterPaymentModeMetal2(sortedData);

      const today = new Date();

      const todayPayments = data.data.filter((payment) => {
        const paymentDate = new Date(payment.createdOn);

        const isSaleBillPayment =
          payment.paymentSource &&
          payment.paymentSource.toLowerCase().includes("sale");

        const isPurchaseBillPayment =
          payment.paymentSource &&
          payment.paymentSource.toLowerCase().includes("purchase");
        return (
          isSaleBillPayment &&
          isPurchaseBillPayment &&
          paymentDate.getDate() === date.getDate() &&
          paymentDate.getMonth() === date.getMonth() &&
          paymentDate.getFullYear() === date.getFullYear()
        );
      });

      const oldBalance = todayPayments.reduce(
        (total, payment) => total + parseFloat(payment.amount) || 0,
        0
      );

      setReceived((prevReceived) => {
        const updatedReceived = [...prevReceived];

        // Update Old Balance at index 6
        updatedReceived[6] = {
          ...updatedReceived[6],
          amount: oldBalance,
        };

        // Update Total at index 8
        const totalWeight = updatedReceived
          .slice(0, 8)
          .reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);
        const totalAmount = updatedReceived
          .slice(0, 8)
          .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
        updatedReceived[8] = {
          ...updatedReceived[8],
          weight: totalWeight,
          amount: totalAmount + oldBalance,
        };

        return updatedReceived;
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [date]);

  useEffect(() => {
    fetchAllOrdersData();
  }, []);
  useEffect(() => {
    fetchAllOrdersData();
  }, [date]);

  const updateReceivedData = async () => {
    if (!loadingAllOrders) {
      try {
        const response = await fetch(a87);
        const data = await response.json();
        // const ordersData = data.data;

        const ordersData = data.data.filter((x) =>
          isSameDate(new Date(x.createdOn), new Date(date))
        );

        // Function to check if two dates are on the same day
        function isSameDate(date1, date2) {
          return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
          );
        }

        setReceived((prevReceived) => {
          const updatedReceived = [...prevReceived];

          // Update data based on ordersData
          const categories = ["gold", "silver", "platinum", "diamond", "stone"];

          categories.forEach((category, index) => {
            updatedReceived[index] = {
              ...updatedReceived[index],
              weight: ordersData.reduce(
                (total, order) =>
                  total +
                  (order.categoryName.toLowerCase().includes(category)
                    ? parseFloat(order.grosswt) || 0
                    : 0),
                0
              ),
              amount: ordersData.reduce(
                (total, order) =>
                  total +
                  (order.categoryName.toLowerCase().includes(category)
                    ? parseFloat(order.mrp !== "0" ? order.mrp : order.price) ||
                      0
                    : 0),
                0
              ),
            };
          });

          // Update Total at index 8
          const totalWeight = updatedReceived
            .slice(0, 8)
            .reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);
          const totalAmount = updatedReceived
            .slice(0, 8)
            .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
          updatedReceived[8] = {
            ...updatedReceived[8],
            weight: totalWeight,
            amount: totalAmount,
          };
          return updatedReceived;
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  };
  const fetchAllRDPurchases = async () => {
    try {
      //   const response = await fetch(a67);
      const response = await fetch(a88);
      const data = await response.json();
      console.log(data, "data");
      console.log(data, "data");
      console.log(data.data, "data");
      const todaysRDData = data.data.filter((x) =>
        isSameDate(new Date(x.createdOn), new Date(date))
      );

      // Function to check if two dates are on the same day
      function isSameDate(date1, date2) {
        return (
          date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
        );
      }
      setAllRDPurchaseData(todaysRDData);
      updateRDPurchseData(todaysRDData);
    } catch (error) {
      console.log(error);
    }
  };
  const updateRDPurchseData = (todaysRDData) => {
    const fineGoldPurchase = todaysRDData.reduce(
      (a, b) => a + parseFloat(b.fineGold),
      0
    );
    const fineGoldPurchaseAmount = todaysRDData.reduce(
      (a, b) =>
        a +
        (b.categoryName.toLowerCase().includes("gold")
          ? parseFloat(b.totalItemAmt)
          : 0),
      0
    );
    const fineSilverPurchase = todaysRDData.reduce(
      (a, b) => a + parseFloat(b.fineSilver),
      0
    );
    const fineSilverPurchaseAmount = todaysRDData.reduce(
      (a, b) =>
        a +
        (b.categoryName.toLowerCase().includes("silver")
          ? parseFloat(b.totalItemAmt)
          : 0),
      0
    );

    setPaid((prevReceived) => {
      const updatedReceived = [...prevReceived];

      // Update Old Balance at index 6
      updatedReceived[0] = {
        ...updatedReceived[0],
        weight: fineGoldPurchase,
        amount: fineGoldPurchaseAmount,
      };
      updatedReceived[2] = {
        ...updatedReceived[2],
        weight: fineSilverPurchase,
        amount: fineSilverPurchaseAmount,
      };
      updatedReceived[8] = {
        ...updatedReceived[8],
        weight: fineSilverPurchase + fineGoldPurchase,
        amount: fineSilverPurchaseAmount + fineGoldPurchaseAmount,
      };

      return updatedReceived;
    });
  };
  useEffect(() => {
    fetchAllRDPurchases();
  }, []);
  useEffect(() => {
    fetchAllRDPurchases();
  }, [date]);

  const filterPaymentModeData = (payments) => {
    // const filteredData = payments.filter((x) =>
    //   isSameDate(new Date(x.createdOn), new Date(date))
    // );

    const filteredData = payments
      // .filter((x) => x.billType && x.billType.toLowerCase().includes("sale"))
      .filter(
        (x) =>
          x.transactionType &&
          x.transactionType.toLowerCase().includes("receive")
      )
      .filter((x) => isSameDate(new Date(x.createdOn), new Date(date)));
    // Function to check if two dates are on the same day
    function isSameDate(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }
    const allCash = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("cash"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const allUpi = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("upi"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const allRtgs = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("rtgs"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const allCheque = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("cheque"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const allCard = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("card"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const allAdvance = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("advance"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const allBalance = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("balance"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const totalAmount =
      parseFloat(allCash) +
      parseFloat(allUpi) +
      parseFloat(allRtgs) +
      parseFloat(allCheque) +
      parseFloat(allCard) +
      parseFloat(allAdvance) +
      parseFloat(allBalance);

    setPaymentMode((prevReceived) => {
      const updatedReceived = [...prevReceived];

      // Update Old Balance at index 6
      updatedReceived[0] = {
        ...updatedReceived[0],
        amount: allCash,
      };
      updatedReceived[1] = {
        ...updatedReceived[1],
        amount: allUpi,
      };
      updatedReceived[2] = {
        ...updatedReceived[2],
        amount: allRtgs,
      };
      updatedReceived[3] = {
        ...updatedReceived[3],
        amount: allCheque,
      };
      updatedReceived[4] = {
        ...updatedReceived[4],
        amount: allCard,
      };
      updatedReceived[5] = {
        ...updatedReceived[5],
        amount: allBalance,
      };
      updatedReceived[6] = {
        ...updatedReceived[6],
        amount: allAdvance,
      };
      updatedReceived[7] = {
        ...updatedReceived[7],
        amount: totalAmount,
      };

      return updatedReceived;
    });
    setAllPaymentModeData(filteredData);
    console.log(filteredData, "filteredData");
    console.log(filteredData, "filteredData");
    console.log(filteredData, "filteredData");
    console.log(filteredData, "filteredData");
  };
  const filterPaymentModeData2 = (payments) => {
    // const filteredData = payments.filter((x) =>
    //   isSameDate(new Date(x.createdOn), new Date(date))
    // );

    const filteredData = payments
      // .filter((x) => x.billType && x.billType.toLowerCase().includes("sale"))
      .filter(
        (x) =>
          x.transactionType && x.transactionType.toLowerCase().includes("paid")
      )
      .filter((x) => isSameDate(new Date(x.createdOn), new Date(date)));
    // Function to check if two dates are on the same day
    function isSameDate(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }
    const allCash = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("cash"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const allUpi = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("upi"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const allRtgs = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("rtgs"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const allCheque = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("cheque"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const allCard = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("card"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const allAdvance = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("advance"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const allBalance = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("balance"))
      .reduce((a, b) => a + parseFloat(b.amount), 0);
    const totalAmount =
      parseFloat(allCash) +
      parseFloat(allUpi) +
      parseFloat(allRtgs) +
      parseFloat(allCheque) +
      parseFloat(allCard) +
      parseFloat(allAdvance) +
      parseFloat(allBalance);

    setPaymentMode2((prevReceived) => {
      const updatedReceived = [...prevReceived];

      // Update Old Balance at index 6
      updatedReceived[0] = {
        ...updatedReceived[0],
        amount: allCash,
      };
      updatedReceived[1] = {
        ...updatedReceived[1],
        amount: allUpi,
      };
      updatedReceived[2] = {
        ...updatedReceived[2],
        amount: allRtgs,
      };
      updatedReceived[3] = {
        ...updatedReceived[3],
        amount: allCheque,
      };
      updatedReceived[4] = {
        ...updatedReceived[4],
        amount: allCard,
      };
      updatedReceived[5] = {
        ...updatedReceived[5],
        amount: allBalance,
      };
      updatedReceived[6] = {
        ...updatedReceived[6],
        amount: allAdvance,
      };
      updatedReceived[7] = {
        ...updatedReceived[7],
        amount: totalAmount,
      };

      return updatedReceived;
    });
    // setAllPaymentModeData(filteredData);
    console.log(filteredData, "filteredData");
    console.log(filteredData, "filteredData");
    console.log(filteredData, "filteredData");
    console.log(filteredData, "filteredData");
  };
  const filterPaymentModeMetal = (payments) => {
    // const filteredData = payments.filter((x) =>
    //   isSameDate(new Date(x.createdOn), new Date(date))
    // );

    const filteredData = payments
      // .filter((x) => x.billType && x.billType.toLowerCase().includes("sale"))
      .filter(
        (x) =>
          x.transactionType &&
          x.transactionType.toLowerCase().includes("receive")
      )
      .filter((x) => isSameDate(new Date(x.createdOn), new Date(date)));
    // Function to check if two dates are on the same day
    function isSameDate(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }
    const allGold = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("cash to metal"))
      .reduce((a, b) => a + parseFloat(b.fineGold), 0);
    const allSilver = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("cash to metal"))
      .reduce((a, b) => a + parseFloat(b.fineSilver), 0);

    setMetalPayment((prevReceived) => {
      const updatedReceived = [...prevReceived];

      // Update Old Balance at index 6
      updatedReceived[0] = {
        ...updatedReceived[0],
        amount: allGold,
      };
      updatedReceived[1] = {
        ...updatedReceived[1],
        amount: allSilver,
      };

      return updatedReceived;
    });
    // setAllPaymentModeData(filteredData);
    console.log(filteredData, "filteredData");
    console.log(filteredData, "filteredData");
    console.log(filteredData, "filteredData");
    console.log(filteredData, "filteredData");
  };
  const filterPaymentModeMetal2 = (payments) => {
    // const filteredData = payments.filter((x) =>
    //   isSameDate(new Date(x.createdOn), new Date(date))
    // );

    const filteredData = payments
      // .filter((x) => x.billType && x.billType.toLowerCase().includes("sale"))
      .filter(
        (x) =>
          x.transactionType && x.transactionType.toLowerCase().includes("paid")
      )
      .filter((x) => isSameDate(new Date(x.createdOn), new Date(date)));
    // Function to check if two dates are on the same day
    function isSameDate(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }
    const allGold = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("cash to metal"))
      .reduce((a, b) => a + parseFloat(b.fineGold), 0);
    const allSilver = filteredData
      .filter((x) => x.paymentModeType.toLowerCase().includes("cash to metal"))
      .reduce((a, b) => a + parseFloat(b.fineSilver), 0);

    setMetalPayment2((prevReceived) => {
      const updatedReceived = [...prevReceived];

      // Update Old Balance at index 6
      updatedReceived[0] = {
        ...updatedReceived[0],
        amount: allGold,
      };
      updatedReceived[1] = {
        ...updatedReceived[1],
        amount: allSilver,
      };

      return updatedReceived;
    });
    // setAllPaymentModeData(filteredData);
    console.log(filteredData, "filteredData");
    console.log(filteredData, "filteredData");
    console.log(filteredData, "filteredData");
    console.log(filteredData, "filteredData");
  };

  console.log(allPaymentModeData, "allPaymentModeData");
  console.log(allPaymentModeData, "allPaymentModeData");
  console.log(allPaymentModeData, "allPaymentModeData");
  // useEffect(() => {
  //   filterPaymentModeData();
  // }, []);
  // useEffect(() => {
  //   filterPaymentModeData();
  // }, [date]);

  //   useEffect(() => {
  //     updateReceivedData();
  //   }, [loadingAllOrders, date]);

  return (
    <div>
      <AdminHeading />
      <div style={{ paddingTop: "130px" }}>
        <AdminBreadCrump
          title={"Reports"}
          companyName={"Loyalstring"}
          module={"Reports"}
          page={"Cash Report"}
        />
        <div className="adminAddCategoryMainBox">
          <div className="adminAddCategoryInnerBox">
            <div className="cashReportUpperBox">
              <div>
                <label>Opening Cash</label>
                <input type="text" value={0} readOnly />
              </div>
              <div>
                <label>Cash In Hand</label>
                <input type="text" value={0} readOnly />
              </div>
              <div>
                <label>Date</label>
                <input
                  type="date"
                  id="dateInput"
                  name="dateInput"
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
            </div>

            <div className="cashReportLowerBox">
              <div className="cashReportLowerItemBox">
                <div>
                  <h3>Received</h3>
                  <table>
                    <thead></thead>
                    <tbody>
                      {received.map((x, index) => {
                        return (
                          <tr key={index}>
                            <td>{x.name} </td>
                            <td>{parseFloat(x.weight).toFixed(3)}</td>
                            <td>{parseFloat(x.amount).toFixed(0)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="cashReportLowerItemBox">
                <div>
                  <h3>Paid</h3>
                  <table>
                    <thead></thead>
                    <tbody>
                      {paid.map((x, index) => {
                        return (
                          <tr key={index}>
                            <td>{x.name} </td>
                            <td>{parseFloat(x.weight).toFixed(3)}</td>
                            <td>{parseFloat(x.amount).toFixed(0)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="cashReportLowerItemBox">
                <div>
                  <h3>Payment Mode (Received)</h3>
                  <table>
                    <thead></thead>
                    <tbody>
                      {paymentMode.map((x, index) => {
                        return (
                          <tr key={index}>
                            <td>{x.name} </td>

                            <td>{parseFloat(x.amount).toFixed(0)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="cashReportLowerItemBox">
                <div>
                  <h3>Payment Mode (Paid)</h3>
                  <table>
                    <thead></thead>
                    <tbody>
                      {paymentMode2.map((x, index) => {
                        return (
                          <tr key={index}>
                            <td>{x.name} </td>
                            <td>{parseFloat(x.amount).toFixed(0)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="cashReportLowerItemBox">
                <div>
                  <h3>Metal Payment (Received)</h3>
                  <table>
                    <thead></thead>
                    <tbody>
                      {metalPayment.map((x, index) => {
                        return (
                          <tr key={index}>
                            <td>{x.name} </td>
                            <td>{parseFloat(x.amount).toFixed(0)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="cashReportLowerItemBox">
                <div>
                  <h3>Metal Payment (Paid)</h3>
                  <table>
                    <thead></thead>
                    <tbody>
                      {metalPayment2.map((x, index) => {
                        return (
                          <tr key={index}>
                            <td>{x.name} </td>
                            <td>{parseFloat(x.amount).toFixed(0)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="cashReportLowerItemBox">
                <div>
                  <h3>Approx Profit</h3>
                  <table>
                    <thead></thead>
                    <tbody>
                      {approxProfit.map((x, index) => {
                        return (
                          <tr key={index}>
                            <td>{x.name} </td>
                            <td>{parseFloat(x.amount).toFixed(0)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="cashReportLowerItemBox">
                <div>
                  <h3>CASH</h3>
                  <table>
                    <thead></thead>
                    <tbody>
                      {cash.map((x, index) => {
                        return (
                          <tr key={index}>
                            <td>{x.name} </td>
                            <td>{parseFloat(x.amount).toFixed(0)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
