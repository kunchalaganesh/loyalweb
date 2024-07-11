import React from "react";
import AdminTopNavbar from "./AdminTopNavbar";
import AdminSecondNavbar from "./AdminSecondNavbar";
import AdminBreadCrump from "./AdminBreadCrump";

export default function AdminHeading() {
  return (
    <div>
      <AdminTopNavbar />
      <AdminSecondNavbar />

      {/* <AdminBreadCrump /> */}
    </div>
  );
}
