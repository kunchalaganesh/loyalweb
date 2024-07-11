import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import {
  AiOutlineDown,
  AiOutlineAppstore,
  AiOutlineGold,
} from "react-icons/ai";
import { TfiRulerPencil } from "react-icons/tfi";
import { TbStack2 } from "react-icons/tb";
import { BsClipboardPlus } from "react-icons/bs";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { RiCoupon3Line } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function AdminSecondNavbar() {
  const navigate = useNavigate();
  const reports = [
    { id: 24, name: "Stock", linkto: "/stock_report" },
    { id: 25, name: "Sale", linkto: "/admin_sale_report" },
    { id: 26, name: "Purchase", linkto: "/purchase" },
    { id: 27, name: "Customer Ledger", linkto: "/ledger_main" },
    { id: 27, name: "Supplier Ledger", linkto: "/ledger_main" },
    { id: 28, name: "Cash", linkto: "/cash_report" },
    { id: 29, name: "Old Metal", linkto: "/purchase?openView:RDPurchase" },
    // { id: 30, name: "GST", linkto: "/adminhome" },
  ];

  return (
    <div className="adminDesktopSecondNavbarMainBox">
      <div
        onClick={() => {
          navigate("/purchase_entry");
        }}
        className="adminDesktopSecondNavbarItemsBox"
      >
        <AiOutlineGold size={"20px"} />
        {/* <FcMoneyTransfer size={"20px"} /> */}
        <p>Purchase Entry</p>
        {/* <AiOutlineDown /> */}
      </div>
      <div
        onClick={() => {
          // navigate("/add_bulk_product");
          navigate("/add_bulk_stock_new");
        }}
        className="adminDesktopSecondNavbarItemsBox"
      >
        <BsClipboardPlus size={"17px"} />
        <p>Add Stock</p>
        {/* <AiOutlineDown /> */}
      </div>
      <div
        onClick={() => navigate("/admin_invoice")}
        className="adminDesktopSecondNavbarItemsBox"
      >
        <FaFileInvoiceDollar size={"17px"} />
        <p>Invoice</p>
        {/* <AiOutlineDown /> */}
      </div>
      <div
        onClick={() => navigate("/receive_payments")}
        className="adminDesktopSecondNavbarItemsBox"
      >
        <GiReceiveMoney size={"17px"} />
        <p>Payment Received</p>
        {/* <AiOutlineDown /> */}
      </div>
      <div className="adminDesktopSecondNavbarDropdownReportsBox">
        <div className="adminDesktopSecondNavbarItemsBox">
          <HiOutlineDocumentReport size={"17px"} />
          <p>Reports</p>
          <AiOutlineDown />
        </div>
        <div className="adminDesktopSecondNavbarDropdownReportsItemsMainBox">
          {reports.map((x) => {
            return <p onClick={() => navigate(`${x.linkto}`)}>{x.name}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
