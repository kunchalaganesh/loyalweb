import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminBreadCrump({ title, companyName, module, page }) {
  const navigate = useNavigate();
  return (
    <div className="adminDesktopBreadCrumpMainBox">
      <h4>{title}</h4>
      <div className="adminDesktopBreadCrumpLinks">
        <p onClick={() => navigate("/adminhome")}>{companyName} </p>
        <p>{` > `}</p>
        <p>{module}</p>
        <p>{` > `}</p>
        <p style={{ textDecoration: "underline" }}>
          <strong>{page}</strong>
        </p>
      </div>
    </div>
  );
}
