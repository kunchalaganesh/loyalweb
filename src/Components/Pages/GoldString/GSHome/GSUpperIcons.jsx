import React from "react";
import { HiOutlineBeaker } from "react-icons/hi";
import { AiOutlineCloudSync } from "react-icons/ai";
import { MdOutlineVpnLock } from "react-icons/md";
import { FaRegPaperPlane } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { GiProgression } from "react-icons/gi";

export default function GSUpperIcons() {
  return (
    <div className="gsHomeUpperIconsMainBox">
      <div className="gsHomeUpperIconsItemsBox">
        <HiOutlineBeaker className="gsHomeUpperIconsIcon" />
        <p>Inventory Tracking</p>
      </div>
      <div className="gsHomeUpperIconsItemsBox">
        <AiOutlineCloudSync className="gsHomeUpperIconsIcon" />
        <p>Online Sync</p>
      </div>
      <div className="gsHomeUpperIconsItemsBox">
        <MdOutlineVpnLock className="gsHomeUpperIconsIcon" />
        <p>Secured Login</p>
      </div>
      <div className="gsHomeUpperIconsItemsBox">
        <FaRegPaperPlane className="gsHomeUpperIconsIcon" />
        <p>Quick Billing</p>
      </div>
      <div className="gsHomeUpperIconsItemsBox">
        <TbReportSearch className="gsHomeUpperIconsIcon" />
        <p>Reports</p>
      </div>
      <div className="gsHomeUpperIconsItemsBox">
        <GiProgression className="gsHomeUpperIconsIcon" />
        <p>Progress Analysis</p>
      </div>
    </div>
  );
}
