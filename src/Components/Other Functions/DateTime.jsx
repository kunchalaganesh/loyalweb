import React, { useState, useEffect } from "react";
import { a188, a38 } from "../Api/RootApiPath";
import { useSelector } from "react-redux";

export const DateTime = ({ dateRcvd, showInv, gstType }) => {
  var [date, setDate] = useState(new Date());
  const [allOrders, setAllOrders] = useState([]);
  const [lastOrderNo, setLastOrderNo] = useState("");
  const [newOrderNo, setNewOrderNo] = useState("");
  const [loading, setLoading] = useState(true);

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;

  let nextNo = "";
  let nextNo1 = [];
  let nextNo2 = [];
  let newNo = [];

  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    fetchOrders();
  }, [gstType]);
  // useEffect(() => {
  //   // Fetch data when component mounts
  //   fetchOrders();
  //   // Fetch data every 10 seconds after the component mounts
  //   const interval = setInterval(fetchOrders, 10000);

  //   // Cleanup the interval when the component is unmounted
  //   return function cleanup() {
  //     clearInterval(interval);
  //   };
  // }, []); // Empty dependency array ensures this effect runs once after initial render
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  const fetchOrders = async () => {
    setLastOrderNo("");
    setAllOrders([]);

    const formData = {
      ClientCode: clientCode,
    };
    await fetch(a188, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        let rcvdData = response.reverse();
        let gstTypeOrder = rcvdData.filter((x) =>
          gstType !== true ? x.BillType === "false" : x.BillType === "true"
        );
        setAllOrders(gstTypeOrder);
        // changeLastNo(
        //   rcvdData.length > 0 ? rcvdData[0].invoiceNo : "1st Order/"
        // );

        changeLastNo(
          gstTypeOrder.length > 0 ? gstTypeOrder[0].InvoiceNo : "1st Order/"
        );
        console.log(rcvdData);
      });
  };
  const changeLastNo = (no) => {
    setLastOrderNo(no);
    setLoading(!loading);
  };

  useEffect(() => {
    nextNo = lastOrderNo.split("/");
    nextNo1 = nextNo[0].replace(/\d+/g, "");
    nextNo2 = parseInt(nextNo[0].replace(/\D+/g, "")) + 1;
    nextNo[0] = `${nextNo1}${nextNo2}`;
    newNo = nextNo.join("/");
    setNewOrderNo(newNo);
  }, [loading]);
  const dateObject = dateRcvd !== "" ? new Date(dateRcvd) : 0;
  const formattedDate = dateObject.toLocaleDateString("en-GB");
  // console.log(gstType, "gstType Changed");
  // console.log(gstType, "gstType Changed");
  // console.log(gstType, "gstType Changed");
  // console.log(gstType, "gstType Changed");
  return (
    <div
      className="adminInvoiceAddTitles"
      style={{
        // marginInline: "5px",
        marginTop: "20px",
        width: "98%",
        flexWrap: "wrap",
        display: "flex",
        // fontSize: "14px",
        marginRight: "20px",
        justifyContent: "space-between",
        backgroundColor: "rgba(2, 168, 181, 0.2)",
        // padding: "10px",
        fontWeight: "bold",
      }}
    >
      <p style={{ margin: "0px" }}></p>
      {/* <p style={{ margin: "0px", marginRight: "15px" }}>
        Date : {dateRcvd ? formattedDate : date.toLocaleDateString("en-GB")}
      </p> */}
      {showInv ? <p style={{ margin: "0px" }}>{newOrderNo}</p> : null}
      <p style={{ margin: "0px" }}> Time : {date.toLocaleTimeString()}</p>
    </div>
  );
};

export default DateTime;
