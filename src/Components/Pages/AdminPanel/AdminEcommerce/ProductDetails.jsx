import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  a17,
  a24,
  s1,
  a26,
  s3,
  a43,
  a31,
  a200,
  a175,
  a177,
} from "../../../Api/RootApiPath";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { BsImages } from "react-icons/bs";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import AdminHeading from "../Heading/AdminHeading";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineEdit } from "react-icons/ai";
import { GenerateLabel } from "../../../Other Functions/GenerateLabel";

export default function ProductDetails() {
  const [data, setData] = useState([]);
  const [popUp, setPopup] = useState(false);
  const [parameter, setParameter] = useState("");
  const [formValue, setFormValue] = useState("");
  const [placeHolder, setPlaceHolder] = useState("");
  const [loading, setLoading] = useState(false);
  const [qr, setQr] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [rfidData, setRfidData] = useState([]);
  const [barcodeChangeButton, setBarcodeChangeButton] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState([]);
  const [openEditBox, setOpenEditBox] = useState(false);

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  let Entryby_Staff_id = parseInt(adminLoggedIn);
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;
  const labelFormat = parseInt(adminLoggedIn.LabelFormat);

  // console.log(Entryby_Staff_id);
  const location = useLocation();
  let allImages = "";
  let params = "";
  params = new URLSearchParams(location.search);
  let productId = "NA";
  productId = params.get("productId");
  const searchProduct = async () => {
    // const formData = new FormData();
    // formData.append("Product_id", productId);
    const formData = {
      Id: productId,
      ClientCode: clientCode,
    };
    try {
      const response = await fetch(a200, {
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
      setOpenEditProduct(data);
      setOpenEditBox(false);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
    }
  };
  if (data != "" && data.Images) {
    allImages = data.Images.split(",");
  } else allImages = "No Data Found";
  const updatedetails = (entry) => {
    setPopup(true);
    if (entry === "image") {
      setPopup("imageRequested");
    }
  };
  const updatedetailsBox = async (parameter) => {
    const formData = {
      Id: productId,
      ClientCode: clientCode,
      [parameter]: formValue,
    };
    // const formData = new FormData();
    // formData.append("Product_id", productId);
    // formData.append("FieldName", parameter);
    // formData.append("FieldValue", formValue);
    try {
      const response = await fetch(a24, {
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
      //   console.log(data);
      //   setPopup(false);
      //   alert(`${parameter} Changed Successfully`);
      // } else {
      //   console.error(data.error);
      // }
      // setLoading(false);
      // setPopup(false);
      // alert(`${parameter} Changed Successfully`);
      updateStaffId();
    } catch (error) {
      console.error(error);
    }
  };
  const updateStaffId = async () => {
    const formData = {
      Id: productId,
      Entryby_Staff_id: Entryby_Staff_id,
    };
    // const formData = new FormData();
    // formData.append("Product_id", productId);
    // formData.append("FieldName", parameter);
    // formData.append("FieldValue", formValue);
    try {
      const response = await fetch(a24, {
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
      //   console.log(data);
      //   setPopup(false);
      //   alert(`${parameter} Changed Successfully`);
      // } else {
      //   console.error(data.error);
      // }
      setLoading(false);
      setPopup(false);
      alert(`${parameter} Changed Successfully`);
    } catch (error) {
      console.error(error);
    }
  };
  const updateImagesBox = async (parameter) => {
    // const formData = {
    //   [parameter]: formValue,
    // };
    const formData = new FormData();
    formData.append("Images", formValue);
    // formData.append("Product_id", productId);
    // formData.append("FieldName", parameter);
    // formData.append("FieldValue", formValue);
    try {
      const response = await fetch(`${a26}/${productId}`, {
        //   method: "POST",
        //   body: formData,
        // });
        method: "PUT",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(formData),
        body: formData,
      });
      const data = await response.json();
      // if (data.status == "success") {
      //   console.log(data);
      //   setPopup(false);
      //   alert(`${parameter} Changed Successfully`);
      // } else {
      //   console.error(data.error);
      // }
      setPopup(false);
      alert(`${parameter} Changed Successfully`);
    } catch (error) {
      console.error(error);
    }
  };
  let productData = [data];
  console.log(productData);
  // const handleFileInputChange = (event) => {
  //   const files = event.target.files;
  //   if (files.length > 5) {
  //     alert("You can select up to 5 files.");
  //     event.target.value = null; // Reset the file input
  //     return;
  //   }

  //   // Handle the selected files as desired
  //   else setFormValue(files);
  //   console.log(formValue);
  //   // updateImagesBox(parameter);
  // };
  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (5 > files.length > 0) {
      const newFiles = Array.from(files).slice(0, 5 - selectedFiles.length);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };
  const handleFileSubmit = async () => {
    // event.preventDefault();

    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });
    console.log(formData, "formData", productId);
    try {
      const response = await fetch(`${a26}/${productId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        // Files uploaded successfully
        // setLoading(false);
        // console.log("Files uploaded successfully.");
        // setPopup(false);
        // alert(`${parameter} Changed Successfully`);
        updateStaffId();
      } else {
        // Handle the error if the upload fails
        console.error("Failed to upload the files.");
      }
    } catch (error) {
      // Handle any network or fetch API errors
      console.error("An error occurred:", error);
    }
  };

  const getRfidData = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    try {
      fetch(a175, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => setRfidData(data));
    } catch (error) {
      console.error(error);
    }
  };
  console.log(rfidData);
  useEffect(() => {
    searchProduct();
  }, [popUp]);
  useEffect(() => {
    getRfidData();
  }, [popUp]);

  // useEffect(() => {
  //   QRCode.toDataURL(data.itemCode).then(setQr);
  // }, [data]);

  // const printPDF = async (products) => {
  //   const doc = new jsPDF({
  //     format: [29, 12],
  //     orientation: "landscape",
  //   });

  //   const fontSize = 6;
  //   const imageHeight = 7;
  //   const imageWidth = 7;

  //   for (let i = 0; i < products.length; i++) {
  //     const {
  //       collection,
  //       grosswt,
  //       stoneWeight,
  //       stoneAmount,
  //       netWt,
  //       itemCode,
  //       purity,
  //       mrp,
  //       product_No,
  //       pieces,
  //       making_Fixed_Wastage,
  //       making_Percentage,
  //     } = products[i];

  //     // console.log("products", products);
  //     if (i > 0) {
  //       doc.addPage(); // Add a new page for each product after the first one
  //     }

  //     doc.setFontSize(fontSize);
  //     doc.setFont("helvetica", "bold");
  //     // {
  //     //   collection.length > 20
  //     //     ? doc.text(`${collection.substr(0, 26)}`, 1, 3)
  //     //     : doc.text(`${collection}`, 1, 3);
  //     // }

  //     if (mrp == 0 || mrp === "") {
  //       doc.text(`G.WT: ${parseFloat(grosswt).toFixed(3)}`, 3, 3);
  //       doc.text(`S.WT: ${parseFloat(stoneWeight).toFixed(3)}`, 3, 5.5);
  //       if (
  //         parseFloat(making_Percentage) !== 0 &&
  //         making_Percentage !== "" &&
  //         making_Fixed_Wastage !== 0 &&
  //         making_Fixed_Wastage !== ""
  //       ) {
  //         doc.text(
  //           `W.WT: ${(
  //             parseFloat(netWt) / parseFloat(making_Percentage) +
  //             parseFloat(making_Fixed_Wastage)
  //           ).toFixed(3)}`,
  //           3,
  //           7.5
  //         );
  //         doc.text(
  //           `N.WT: ${(
  //             parseFloat(netWt) +
  //             parseFloat(netWt / making_Percentage) +
  //             parseFloat(making_Fixed_Wastage)
  //           ).toFixed(3)}`,
  //           3,
  //           10
  //         );

  //         doc.text(`${itemCode}`, 18, 3);
  //         doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //         doc.text(`${purity}`, 18, 7.5);
  //         doc.text(`Pc:${pieces}`, 18, 10);
  //       } else if (
  //         parseFloat(making_Percentage) !== 0 &&
  //         making_Percentage !== ""
  //       ) {
  //         doc.text(
  //           `W.WT: ${(
  //             parseFloat(netWt) / parseFloat(making_Percentage)
  //           ).toFixed(3)}`,
  //           3,
  //           7.5
  //         );
  //         doc.text(
  //           `N.WT: ${(
  //             parseFloat(netWt) + parseFloat(netWt / making_Percentage)
  //           ).toFixed(3)}`,
  //           3,
  //           10
  //         );

  //         doc.text(`${itemCode}`, 18, 3);
  //         doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //         doc.text(`${purity}`, 18, 7.5);
  //         doc.text(`Pc:${pieces}`, 18, 10);
  //       } else if (making_Fixed_Wastage !== 0 && making_Fixed_Wastage !== "") {
  //         doc.text(
  //           `W.WT: ${parseFloat(making_Fixed_Wastage).toFixed(3)}`,
  //           3,
  //           7.5
  //         );
  //         doc.text(
  //           `N.WT: ${(
  //             parseFloat(making_Fixed_Wastage) + parseFloat(netWt)
  //           ).toFixed(3)}`,
  //           3,
  //           10
  //         );

  //         doc.text(`${itemCode}`, 18, 3);
  //         doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //         doc.text(`${purity}`, 18, 7.5);
  //         doc.text(`Pc:${pieces}`, 18, 10);
  //       } else {
  //         doc.text(`W.WT: N/A`, 3, 8);
  //         doc.text(`N.WT: ${netWt.toFixed(3)}`, 3, 10.5);

  //         doc.text(`${itemCode}`, 18, 3);
  //         doc.text(`${parseFloat(stoneAmount).toFixed(2)}`, 18, 5.5);
  //         doc.text(`${purity}`, 18, 7.5);
  //         doc.text(`Pc:${pieces}`, 18, 10);
  //       }
  //     } else {
  //       doc.text(`G.WT: ${grosswt.toFixed(3)}`, 3, 3);
  //       doc.text(`MRP: ${parseInt(mrp)}`, 3, 6);
  //       doc.text(`Pc:${pieces}`, 18, 9);
  //       // doc.text(`${product_No}`, 4, 11.5);
  //       doc.text(`${itemCode}`, 18, 3);
  //       doc.text(`${purity}`, 18, 6);
  //     }

  //     // try {
  //     //   const qrCodeDataUrl = await QRCode.toDataURL(itemCode);
  //     //   doc.addImage(qrCodeDataUrl, "JPEG", 1, 3, imageWidth, imageHeight);
  //     // } catch (error) {
  //     //   console.error(error);
  //     // }
  //   }

  //   const pdfData = doc.output("datauristring");
  //   const newWindow = window.open();
  //   newWindow.document.write(
  //     `<iframe width='100%' height='100%' src='${pdfData}'></iframe>`
  //   );
  // };

  // Skkhandre New design
  const openLabelInNew = async (products) => {
    GenerateLabel(products, labelFormat);
  };

  const setBarcode = (value) => {
    // Update the barcodeNumber property in the data object
    const barcodeValue = value.toUpperCase();
    setData((prevData) => ({
      ...prevData,
      barcodeNumber: barcodeValue,
    }));

    // Find a matching product in the rifdData array
    const matchingProduct = rfidData.find(
      (item) => item.barcodeNumber === barcodeValue
    );

    if (matchingProduct) {
      // Update the 'tid' property in the data object with the matching product's tid
      setData((prevData) => ({
        ...prevData,
        tid: matchingProduct.tid,
      })),
        setBarcodeChangeButton(true);
    } else {
      // If no matching product found, set 'tid' to null or some default value
      setData((prevData) => ({
        ...prevData,
        tid: null, // or any default value you want
      })),
        setBarcodeChangeButton(false);
      // setBarCodeAlert(true);
    }
    if (value === "" && matchingProduct === undefined) {
      setBarcodeChangeButton(true);
    }
  };

  const updateBarcodeNumber = async () => {
    setLoading(true);
    const data2 = [data];

    try {
      const response = await fetch(a31, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data2),
      });

      const rcvdData = await response.json();
      console.log("rcvdData", rcvdData);
      setData(rcvdData.data[0]);
      setLoading(false);
      setPopup(false);
      alert(`${parameter} Changed Successfully`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const handleInputChange2 = (e, property) => {
    const { value } = e.target;
    if (openEditProduct) {
      const updatedProduct = {
        ...openEditProduct,
        [property]: e.target.value,
      };
      const grosswt = parseFloat(updatedProduct.GrossWt) || 0;
      const stoneWeight = parseFloat(updatedProduct.TotalStoneWeight) || 0;
      const netWt = parseFloat(updatedProduct.NetWt) || 0;
      if (property === "GrossWt" && !isNaN(value)) {
        updatedProduct.NetWt = (parseFloat(value) - stoneWeight).toFixed(3);
        // calculateFinalPrice(selectedProduct);
      }
      if (property === "TotalStoneWeight" && !isNaN(value)) {
        updatedProduct.NetWt = (grosswt - parseFloat(value)).toFixed(3);
      }
      if (property === "NetWt" && !isNaN(value)) {
        updatedProduct.GrossWt = (
          parseFloat(stoneWeight) + parseFloat(value)
        ).toFixed(3);
      }
      if (property === "RFIDCode") {
        updatedProduct.TIDNumber = null;
        const barcodeValue = value.toUpperCase();
        updatedProduct.RFIDCode = barcodeValue;
        const matchingProduct = rfidData.find(
          (item) => item.BarcodeNumber === barcodeValue
        );

        if (matchingProduct) {
          updatedProduct.TIDNumber = matchingProduct.TidValue;
        } else {
          // If no matching product found, set 'tid' to null or some default value
          updatedProduct.TIDNumber = null; // or any default value you want
          // setBarCodeAlert(true);
        }
      }

      setOpenEditProduct(updatedProduct);
    }
  };
  console.log(openEditProduct, "openEditProduct");
  const editItem = (product) => {
    setOpenEditBox(true);
    // if (!allSelectedProducts.some((x) => x.id === selectedProduct.id)) {
    setOpenEditProduct(product);

    // } else {
    // alert("Product Already added");
    // }
  };
  const closeEditItem = () => {
    setOpenEditBox(false);
    // document.body.classList.add("body-no-scroll");
  };

  const handleUpdateProduct = async () => {
    console.log(openEditProduct, "openEditProductBefore");
    const openEditProduct2 = [{ ...openEditProduct, ClientCode: clientCode }];
    const hasMissingBarcodeAndTid = openEditProduct2.some((product) => {
      if (product.RFIDCode && product.RFIDCode.length !== 0) {
        // Barcode is not empty or null, so check if tid is missing
        return product.TIDNumber === null || product.TIDNumber === "";
      }
      // Barcode is either empty or null, so no need to check tid
      return false;
    });
    if (hasMissingBarcodeAndTid) {
      setLoading(false);
      alert("Sorry, Please enter a correct Barcode");
    } else {
      setLoading(true);
      try {
        const response = await fetch(a177, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(openEditProduct2),
        });

        const rcvdData = await response.json();

        if (rcvdData.status === "error") {
          setLoading(false);
          // alert(rcvdData.message); // Show error message
          // Assuming openEditProduct is a single object
          setOpenEditProduct({ ...openEditProduct, hasError: true });
        } else {
          alert("Updated Successfully");
          console.log("updatedProduct", openEditProduct);
          console.log("rcvdDataDat", rcvdData);
          // Assuming you want to update the state with the response data
          setOpenEditProduct(rcvdData);
          searchProduct();
          setLoading(true);
        }
      } catch (error) {
        alert(error);
        console.error(error);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <AdminHeading />
      <div style={{ paddingTop: "130px" }}>
        <AdminBreadCrump
          title={"Inventory"}
          companyName={"Loyalstring"}
          module={"E-commerce"}
          page={"Inventory"}
        />

        <div className="adminAddCategoryMainBox">
          <div className="adminAddCategoryInnerBox">
            {/* <h2 style={{ margin: "10px 0" }}>Product details</h2> */}
            {/* <h4 className="adminInvoiceAddTitles">Add Product</h4> */}
            {/* <MyPDF
            name={data.product_Name}
            grossWt={data.grosswt}
            stoneWt={data.stoneWeight}
            netWt={data.netWt}
            itemCode={data.itemCode}
            purity={data.purity}
            pieces={data.pieces}
            mrp={data.mrp}
            product_No={data.product_No}
          /> */}
            {/* <MyPDF data={data} /> */}
            <div className="adminProductDetailsMainBox">
              {/* <div className="adminProductDetailImageBox">
              <img
                style={{ width: "300px", cursor: "pointer" }}
                // src={`${s1}${data.ImageList1}`}
                // src={`${s1}${data.imageList1}`}
                // src={`${s3}${data.images}`}
                src={`${s3}/${allImages[0]}`}
                alt="images"
                onClick={() => {
                  setPlaceHolder("Add Image");
                  setParameter("Images");
                  updatedetails("image");
                }}
              />
            </div> */}
              <div
                className="adminProductDetailDetailsBox"
                style={{ width: "100%" }}
              >
                <h3 style={{ marginLeft: "10px" }}>
                  Last Modified By : {data.entryby_Staff_id}
                </h3>
                <h2
                  // onClick={() => {
                  //   setPlaceHolder(data.collection);
                  //   setParameter("Collection Name");
                  //   updatedetails();
                  // }}
                  style={{ margin: "10px" }}
                >
                  {data.DesignName}
                </h2>
                <div style={{ margin: "20px 10px" }}>
                  {data.Images && data.Images.length > 0 ? (
                    data.Images.split(",").map((image, index) => (
                      <img
                        key={index}
                        style={{
                          height: "100px",
                          width: "100px",
                          marginRight: "10px",
                        }}
                        onClick={() => {
                          setPlaceHolder("Add Image");
                          setParameter("Images");
                          updatedetails("image");
                        }}
                        className="adminOrderDetailsItemsproductImage"
                        src={`${s1}/${image.trim()}`}
                        alt={`Product Image ${index + 1}`}
                      />
                    ))
                  ) : (
                    <div className="adminProductDetailsMainAddImageBox">
                      <BsImages
                        className="adminProductDetailsMainAddImageIcon"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setPlaceHolder("Add Image");
                          setParameter("Images");
                          updatedetails("image");
                        }}
                        size={"30px"}
                      />
                      <h3 style={{ marginLeft: "10px" }}>Image</h3>
                      <button
                        style={{ marginLeft: "auto" }}
                        onClick={() => {
                          editItem(openEditProduct);
                        }}
                        className="adminAddInvoiceMainAddLabelOptionEditIcon"
                      >
                        <AiOutlineEdit size={"25px"} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="adminProductDetailsInfoBox">
                  <div>
                    <p style={{ margin: "10px 0" }}>
                      Label: {data.imageHeighttemCode}
                    </p>
                    <p style={{ margin: "10px 0" }}>
                      Product Type: {data.ProductName}
                    </p>
                    <p style={{ margin: "10px 0" }}>
                      Purity: {data.PurityName}
                    </p>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <p> .</p>
                    <p style={{ margin: "10px 0" }}>
                      Barcode Number: {data.RFIDCode}
                    </p>
                    <p style={{ margin: "10px 0" }}>
                      Tid Number: {data.TIDNumber}
                    </p>
                  </div>
                </div>
                {/* <h2
                onClick={() => {
                  setPlaceHolder(data.product_Name);
                  setParameter("Product_Name");
                  updatedetails();
                }}
                style={{ margin: "1rem 0" }}
              >
                {data.product_Name}
              </h2> */}
                <p
                  // onClick={() => {
                  //   setPlaceHolder(data.description);
                  //   setParameter("description");
                  //   updatedetails();
                  // }}
                  style={{
                    color: "red",
                    lineHeight: "1.5rem",
                    margin: "1rem 0",
                  }}
                >
                  {data.Description}
                </p>
                <div className="adminProductDetailDetailsBoxItems">
                  {/* <p
                  className="adminProductDetailDetailsBoxEditItems"
                  onClick={() => {
                    setPlaceHolder(data.size);
                    setParameter("Size");
                    updatedetails();
                  }}
                >
                  Size: {data.size == "" ? "0" : data.size}
                </p> */}
                  <p
                  // className="adminProductDetailDetailsBoxEditItems"
                  // onClick={() => {
                  //   setPlaceHolder(data.grosswt);
                  //   setParameter("grosswt");
                  //   updatedetails();
                  // }}
                  >
                    Gross Wt: {data.GrossWt}gm
                  </p>
                  <p
                    className="adminProductDetailDetailsBoxEditItems"
                    // onClick={() => {
                    //   setPlaceHolder(data.stoneWeight);
                    //   setParameter("stoneWeight");
                    //   updatedetails();
                    // }}
                  >
                    Stone Wt: {data.TotalStoneWeight}gm
                  </p>
                  <p
                    className="adminProductDetailDetailsBoxEditItems"
                    // onClick={() => {
                    //   setPlaceHolder(data.netWt);
                    //   setParameter("NetWt");
                    //   updatedetails();
                    // }}
                  >
                    Net Wt: {data.NetWt}gm
                  </p>
                  <p
                    className="adminProductDetailDetailsBoxEditItems"
                    // onClick={() => {
                    //   setPlaceHolder(data.stoneAmount);
                    //   setParameter("StoneAmount");
                    //   updatedetails();
                    // }}
                  >
                    Stone Amount: {data.TotalStoneAmount}
                  </p>
                </div>
                <div className="adminProductDetailDetailsBoxItems">
                  <p
                    className="adminProductDetailDetailsBoxEditItems"
                    // onClick={() => {
                    //   setPlaceHolder(data.making_per_gram);
                    //   setParameter("making_per_gram");
                    //   updatedetails();
                    // }}
                  >
                    M.PerGram: ₹{data.MakingPerGram}
                  </p>
                  <p
                    className="adminProductDetailDetailsBoxEditItems"
                    // onClick={() => {
                    //   setPlaceHolder(data.making_Percentage);
                    //   setParameter("making_Percentage");
                    //   updatedetails();
                    // }}
                  >
                    M.Percentage: {data.MakingPercentage}%
                  </p>
                  {/* <p
                // onClick={() => {
                //   setPlaceHolder(data.purity);
                //   setParameter("purity");
                //   updatedetails();
                // }}
                >
                  Purity: {data.purity}
                </p> */}
                  <p
                    className="adminProductDetailDetailsBoxEditItems"
                    // onClick={() => {
                    //   setPlaceHolder(data.making_Fixed_Amt);
                    //   setParameter("making_Fixed_Amt");
                    //   updatedetails();
                    // }}
                  >
                    M.Fixed.Amt: ₹{data.MakingFixedAmt}
                  </p>
                  <p
                    className="adminProductDetailDetailsBoxEditItems"
                    // onClick={() => {
                    //   setPlaceHolder(data.making_Fixed_Wastage);
                    //   setParameter("making_Fixed_Wastage");
                    //   updatedetails();
                    // }}
                  >
                    M.Fixed.Wastage: {data.MakingFixedWastage}gm
                  </p>
                </div>
                <div className="adminProductDetailDetailsBoxItems">
                  <p
                    className="adminProductDetailDetailsBoxEditItems"
                    // onClick={() => {
                    //   setPlaceHolder(data.mrp);
                    //   setParameter("mrp");
                    //   updatedetails();
                    // }}
                  >
                    MRP: ₹{data.MRP}
                  </p>
                  <p
                    className="adminProductDetailDetailsBoxEditItems"
                    // onClick={() => {
                    //   setPlaceHolder(data.occasion);
                    //   setParameter("occasion");
                    //   updatedetails();
                    // }}
                  >
                    Occassion: {data.OccassionName}
                  </p>
                  <p
                    className="adminProductDetailDetailsBoxEditItems"
                    // onClick={() => {
                    //   setPlaceHolder(data.gender);
                    //   setParameter("gender");
                    //   updatedetails();
                    // }}
                  >
                    Gender: {data.Gender}
                  </p>
                  <p
                    className="adminProductDetailDetailsBoxEditItems"
                    // onClick={() => {
                    //   setPlaceHolder(data.statusType);
                    //   setParameter("StatusType");
                    //   updatedetails();
                    // }}
                  >
                    Status: {data.Status}
                  </p>
                  {/* <p
                // onClick={() => {
                  //   setPlaceHolder(data.itemType);
                  //   setParameter("itemType");
                  //   updatedetails();
                // }}
                >
                  ItemType: {data.itemType}
                </p> */}
                  {/* <p
                  onClick={() => {
                    setPlaceHolder(data.collection);
                    setParameter("collection");
                    updatedetails();
                  }}
                >
                  Collection: {data.collection}
                </p> */}
                </div>
                <div className="adminProductDetailDetailsBoxItems">
                  <p
                    className="adminProductDetailDetailsBoxEditItems adminProductDetailDetailsBoxEditItemsBarcode"
                    // onClick={() => {
                    //   setPlaceHolder(data.barcodeNumber);
                    //   setParameter("barcodeNumber");
                    //   updatedetails();
                    // }}
                  >
                    Barcode Number: {data.RFIDCode}
                  </p>

                  {/* <p
                  onClick={() => {
                    setPlaceHolder(data.pieces);
                    setParameter("Pieces");
                    updatedetails();
                  }}
                >
                Pieces: {data.pieces}
                </p> */}

                  {/* <p>Item Code: {data.itemCode}</p> */}
                  {/* <p>Item Code: {data.BarcodeNumber}</p> */}
                </div>
                {/* <img style={{ width: "120px" }} src={qr} /> */}
                <button
                  style={{ margin: "20px 10px" }}
                  onClick={() => openLabelInNew([data])}
                  className="adminOrderDetailsPdfButton"
                >
                  Print Label
                </button>
              </div>
              <div
                style={{ height: "auto", paddingBottom: "50px" }}
                className={
                  popUp == true ? "updateAccountDetailsPopupMainBox" : "none"
                }
              >
                <div className="updateAccountDetailsPopupCloseBtn">
                  <AiOutlineClose
                    size={"3rem"}
                    onClick={() => setPopup(false)}
                  />
                </div>
                <h1 style={{ color: "rgba(0,0,0,0.5)" }}>
                  Change {parameter}{" "}
                </h1>
                {parameter === "barcodeNumber" ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <input
                      style={{ marginBottom: "10px" }}
                      placeholder={placeHolder}
                      type="text"
                      value={data.barcodeNumber}
                      onChange={(e) => setBarcode(e.target.value)}
                    />
                    <input
                      style={{ cursor: "not-allowed", marginTop: "10px" }}
                      type="text"
                      placeholder={data.tid}
                      // value={data.tid} // Set the value of the input to data.tid
                      readOnly // Make the input read-only
                    />
                    <div
                      style={{ height: "70px", marginBottom: "1rem" }}
                      className={loading == true ? "loading" : "none"}
                    >
                      <InfinitySpin width="150" color="#4fa94d" />
                    </div>
                    {barcodeChangeButton ? (
                      <button
                        onClick={() => {
                          if (data.barcodeNumber === "" && data.tid === null) {
                            updateBarcodeNumber();
                            // Show an alert when barcodeNumber is empty and tid is null
                          } else {
                            // updatedetailsBox(parameter);
                            updateBarcodeNumber();
                            // setLoading(true);
                          }
                        }}
                      >
                        {data.barcodeNumber === "" && data.tid === null
                          ? "Change Barcode Empty"
                          : `Change Barcode to - ${data.barcodeNumber}`}
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <input
                      placeholder={placeHolder}
                      type="text"
                      onChange={(e) => setFormValue(e.target.value)}
                    />
                    <div
                      style={{ height: "70px", marginBottom: "1rem" }}
                      className={loading == true ? "loading" : "none"}
                    >
                      <InfinitySpin width="150" color="#4fa94d" />
                    </div>
                    <button
                      onClick={() => {
                        updatedetailsBox(parameter), setLoading(true);
                      }}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
              {openEditBox ? (
                <div className="adminInvoiceOpenEditMainBox">
                  <div className="adminInvoiceOpenEditInnerBox">
                    <div className="adminInvoiceOpenEditInnerTitleBox">
                      <p>Edit Item</p>
                      <button
                        onClick={closeEditItem}
                        className="adminAddInvoiceMainAddLabelOptionDeleteIcon"
                      >
                        <RxCross2 size={"25px"} />
                      </button>
                    </div>
                    <div className="adminInvoiceOpenEditOuterGridBox">
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Gross Wt</label>
                        <input
                          type="text"
                          placeholder={openEditProduct.GrossWt}
                          value={openEditProduct.GrossWt}
                          onChange={(e) => handleInputChange2(e, "GrossWt")}
                        />
                      </div>

                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Stone Wt</label>{" "}
                        <input
                          type="number"
                          placeholder={openEditProduct.TotalStoneWeight}
                          value={openEditProduct.TotalStoneWeight}
                          onChange={(e) =>
                            handleInputChange2(e, "TotalStoneWeight")
                          }
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Net Wt</label>
                        <input
                          type="text"
                          placeholder={openEditProduct.NetWt}
                          value={openEditProduct.NetWt}
                          onChange={(e) => handleInputChange2(e, "NetWt")}
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Stone Amount</label>{" "}
                        <input
                          type="number"
                          placeholder={openEditProduct.TotalStoneAmount}
                          value={openEditProduct.TotalStoneAmount}
                          onChange={(e) =>
                            handleInputChange2(e, "TotalStoneAmount")
                          }
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Product Name</label>
                        <input
                          type="text"
                          placeholder={openEditProduct.ProductTitle}
                          value={openEditProduct.ProductTitle}
                          onChange={(e) =>
                            handleInputChange2(e, "ProductTitle")
                          }
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>HSNCode </label>
                        <input
                          type="text"
                          maxLength={6}
                          placeholder={openEditProduct.HSNCode}
                          value={openEditProduct.HSNCode}
                          onChange={(e) => handleInputChange2(e, "HSNCode")}
                        />
                      </div>

                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Making PerGram</label>{" "}
                        <input
                          type="number"
                          placeholder={openEditProduct.MakingPerGram}
                          value={openEditProduct.MakingPerGram}
                          onChange={(e) =>
                            handleInputChange2(e, "MakingPerGram")
                          }
                        />
                      </div>

                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Making Percentage</label>{" "}
                        <input
                          type="number"
                          placeholder={openEditProduct.MakingPercentage}
                          value={openEditProduct.MakingPercentage}
                          onChange={(e) =>
                            handleInputChange2(e, "MakingPercentage")
                          }
                        />
                      </div>

                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Making Fixed Amount</label>{" "}
                        <input
                          type="number"
                          placeholder={openEditProduct.MakingFixedAmt}
                          value={openEditProduct.MakingFixedAmt}
                          onChange={(e) =>
                            handleInputChange2(e, "MakingFixedAmt")
                          }
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Making Fixed Wastage</label>
                        <input
                          type="number"
                          placeholder={openEditProduct.MakingFixedWastage}
                          value={openEditProduct.MakingFixedWastage}
                          onChange={(e) =>
                            handleInputChange2(e, "MakingFixedWastage")
                          }
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Pieces</label>{" "}
                        <input
                          type="number"
                          placeholder={openEditProduct.Pieces}
                          value={openEditProduct.Pieces}
                          onChange={(e) => handleInputChange2(e, "Pieces")}
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Purity</label>{" "}
                        <input
                          type="text"
                          placeholder={openEditProduct.PurityName}
                          value={openEditProduct.PurityName}
                          onChange={(e) => handleInputChange2(e, "PurityName")}
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Size</label>{" "}
                        <input
                          type="number"
                          placeholder={openEditProduct.Size}
                          value={openEditProduct.Size}
                          onChange={(e) => handleInputChange2(e, "Size")}
                        />
                      </div>

                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>MRP</label>{" "}
                        <input
                          type="number"
                          placeholder={openEditProduct.MRP}
                          value={openEditProduct.MRP}
                          onChange={(e) => handleInputChange2(e, "MRP")}
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Description</label>{" "}
                        <input
                          type="text"
                          placeholder={openEditProduct.Description}
                          value={openEditProduct.Description}
                          onChange={(e) => handleInputChange2(e, "Description")}
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Occasion</label>{" "}
                        <input
                          type="text"
                          placeholder={openEditProduct.OccassionName}
                          value={openEditProduct.OccassionName}
                          onChange={(e) =>
                            handleInputChange2(e, "OccassionName")
                          }
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <label>Gender</label>{" "}
                        <input
                          type="text"
                          placeholder={openEditProduct.Gender}
                          value={openEditProduct.Gender}
                          onChange={(e) => handleInputChange2(e, "Gender")}
                        />
                      </div>

                      <div className="adminInvoiceOpenEditInnerGridItem">
                        <input
                          type="text"
                          placeholder={
                            openEditProduct.RFIDCode
                              ? openEditProduct.RFIDCode
                              : "Enter Barcode"
                          }
                          value={openEditProduct.RFIDCode}
                          onChange={(e) => handleInputChange2(e, "RFIDCode")}
                        />
                        <input
                          type="text"
                          placeholder={
                            openEditProduct.TIDNumber
                              ? openEditProduct.TIDNumber
                              : "TIDNumber"
                          }
                          value={openEditProduct.TIDNumber}
                          readOnly
                        />
                      </div>
                      <div className="adminInvoiceOpenEditInnerGridItem">
                        {/* <label>Update</label>{" "} */}.{" "}
                        <button
                          onClick={() => {
                            handleUpdateProduct();
                          }}
                          className="adminInvoiceEditProductSaveButton"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* Image requested */}
              <div
                style={{ height: "auto" }}
                className={
                  popUp == "imageRequested"
                    ? "updateAccountDetailsPopupMainBox"
                    : "none"
                }
              >
                <div
                  style={{ margin: "20px" }}
                  className="updateAccountDetailsPopupCloseBtn"
                >
                  <AiOutlineClose
                    size={"3rem"}
                    onClick={() => {
                      setPopup(false), setSelectedFiles([]);
                    }}
                  />
                </div>
                <h1 style={{ color: "rgba(0,0,0,0.5)" }}>
                  Change {parameter}{" "}
                </h1>
                <input
                  placeholder={placeHolder}
                  type="file"
                  multiple
                  max="5"
                  // onChange={(e) => setFormValue(e.target.value)}
                  // onChange={(e) => handleFileInputChange(e)}
                  onChange={handleFileInputChange}
                />
                <div
                  style={{ height: "70px", marginBottom: "1rem" }}
                  className={loading == true ? "loading" : "none"}
                >
                  <InfinitySpin width="150" color="#4fa94d" />
                </div>
                <p>{selectedFiles.length} out of 5 images selected</p>
                {/* <button onClick={() => updateImagesBox(parameter)}>Submit</button> */}
                <button
                  style={{ margin: "20px" }}
                  onClick={() => {
                    handleFileSubmit(parameter), setLoading(true);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>

            {/* <div className="newBox2"> */}
            {/* <ProductDetails images={fakeImages} /> */}
            {/* </div> */}
            <div className={popUp === true ? "new" : "new2"}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
