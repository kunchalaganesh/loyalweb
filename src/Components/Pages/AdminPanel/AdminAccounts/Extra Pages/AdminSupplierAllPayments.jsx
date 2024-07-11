import React, { useEffect, useState } from "react";
import AdminHeading from "../../Heading/AdminHeading";
import AdminBreadCrump from "../../Heading/AdminBreadCrump";
import { a73, a75 } from "../../../../Api/RootApiPath";

export default function AdminSupplierAllPayments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  let params = "";
  params = new URLSearchParams(location.search);
  let supplierId = "NA";
  let invoiceFor = "NA";
  supplierId = params.get("supplierId");
  invoiceFor = params.get("invoiceFor");
  const searchPayments = async () => {
    // const formData = new FormData();
    // formData.append("Product_id", productId);
    const formData = {
      SupplierId: supplierId,
    };
    try {
      const response = await fetch(a75, {
        //   method: "POST",
        //   body: formData,
        // });
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // if (data.status == "success") {
      //   setData(data.data);
      // } else {
      //   console.error(data.error);
      // }
      setData(data);
      setLoading(false);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetch(a73)
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        let rcvdData = response.data.reverse();
        let supplierOrders = rcvdData.filter((x) => x.supplierId == supplierId);
        setData(...data, supplierOrders);
        setLoading(false);

        // setOlddata(response);
        console.log(response.data);
      });
  }, []);
  useEffect(() => {
    searchPayments();
  }, [supplierId]);
  console.log(data, "data");
  return (
    <div>
      <AdminHeading />
      <div className="adminMainBodyBox">
        <AdminBreadCrump
          title={"Supplier Payments"}
          companyName={"Loyalstring"}
          module={"Accounts"}
          page={"Supplier Payments"}
        />
        <div className="adminAddCategoryMainBox">
          <div className="adminAddCategoryInnerBox">
            <p>{supplierId}</p>
            <p>{invoiceFor}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
