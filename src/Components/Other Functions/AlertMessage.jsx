import React from "react";
import "../Pages/PagesStyles/AlertMessage.css";

const AlertMessage = ({ message, type }) => {
  return (
    <div className="alertMessageMainBox">
      <div
        className={`alert ${
          type === "success"
            ? "success"
            : type === "warning"
            ? "warning"
            : "error"
        }`}
      >
        {type !== "success" ? "⚠️ " : null} {message}
      </div>
    </div>
  );
};

export default AlertMessage;
