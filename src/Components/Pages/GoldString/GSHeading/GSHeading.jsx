import React from "react";
import "../GSPagesStyles/GSHeading.css";
import gsLogo from "../../../Images/GSHome/loyalStringLogoWide.png";
import { useNavigate } from "react-router-dom";

export default function GSHeading() {
  const navigate = useNavigate();
  return (
    <div className="gsHeadingMainOuterBox">
      <div onClick={() => navigate("/gshome")} className="gsHeadingLogoBox">
        <img src={gsLogo} alt="LoyalString" />
      </div>
      <div className="gsHeadingNavBoxMain">
        <nav>
          <li onClick={() => navigate("/gshome")}>Home</li>
          <li>About</li>
          <li>Products</li>
          <li>Services</li>
          <li onClick={() => navigate("/adminpanellogin")}>Login</li>
          {/* <li>Services</li> */}
        </nav>
      </div>
    </div>
  );
}
