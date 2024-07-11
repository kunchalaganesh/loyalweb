import React, { useEffect, useState } from "react";
import AdminHeading from "../Heading/AdminHeading";
import AdminSecondNavbar from "../Heading/AdminSecondNavbar";
import { AiFillGold, AiOutlineGold } from "react-icons/ai";
import { MdBorderColor, MdOutlinePendingActions } from "react-icons/md";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import AdminDashboardCategories from "./AdminDashboardCategories";
import "../../PagesStyles/AdminHome.css";
import AdminDashboardReports from "./AdminDashboardReports";
import AdminLocation from "./AdminLocation";
import { useSelector } from "react-redux";
import AdminFirstLogin from "./AdminFirstLogin";
import { RxCross2 } from "react-icons/rx";
import { a113, a95, a98 } from "../../../Api/RootApiPath";
import { InfinitySpin } from "react-loader-spinner";
import AlertMessage from "../../../Other Functions/AlertMessage";

export default function AdminHome() {
  const [currentStep, setCurrentStep] = useState(1);
  const [allCompaniesList, setAllCompaniesList] = useState([]);
  const [allBranchesList, setAllBranchesList] = useState([]);
  const [allBanksList, setAllBanksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstTimeSetup, setFirstTimeSetup] = useState(false);

  const [showError, setShowError] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageToShow, setMessageToShow] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 2000);
  }, [showError]);

  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;

  const fetchAllCompanies = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a95, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data, "data,");
    try {
      if (data.length > 0) {
        setAllCompaniesList(data);
        fetchAllBranches();
      } else {
        setCurrentStep(1);
        setLoading(false);
        // alert("Please Add Company First");
        setMessageType("warning");
        setMessageToShow("Please Add Company First");
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllCompanies();
  }, []);

  const fetchAllBranches = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a98, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data, "data,");
    try {
      if (data.length > 0) {
        setAllBranchesList(data);
        fetchAllBanks();
      } else {
        setCurrentStep(2);
        setLoading(false);
        setMessageType("warning");
        setMessageToShow("Please Add Branch");
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   fetchAllBranches();
  // }, []);

  const fetchAllBanks = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a113, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data, "data,");
    try {
      if (data.length > 0) {
        setAllBanksList(data);
        setLoading(false);
        setCurrentStep(0);
      } else {
        setCurrentStep(3);
        setLoading(false);
        setMessageType("warning");
        setMessageToShow("Please Add Bank");
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   fetchAllBanks();
  // }, []);
  // useEffect(() => {
  //   if (allCompaniesList.length < 1) {
  //     setCurrentStep(1);
  //   } else if (allBranchesList.length < 1) {
  //     setCurrentStep(2);
  //   } else if (allBranchesList.length < 1) {
  //     setCurrentStep(3);
  //   } else {
  //     setCurrentStep(0);
  //   }
  // }, []);

  const handleMessageToShow = (e) => {
    setMessageToShow(e);
  };
  const handleMessageType = (e) => {
    setMessageType(e);
    setShowError(true);
    setCurrentStep(0);
    fetchAllCompanies();
  };
  return (
    <div>
      <AdminHeading />
      <div
        className="adminMainBodyBox"
        // style={{ paddingTop: "130px" }}
      >
        {showError ? (
          <AlertMessage message={messageToShow} type={messageType} />
        ) : null}
        <AdminBreadCrump
          title={"Welcome !"}
          companyName={"Loyalstring"}
          module={"Dashboard"}
          page={"Home"}
        />
        {loading ? (
          <div
            style={{ height: "50vh", marginBottom: "1rem" }}
            // className={loadingAdd == true ? "loading" : "none"}
            className="loading"
          >
            <InfinitySpin
              // className={loadingAdd == true ? "loading" : "none"}
              className="loading"
              width="150"
              color="#4fa94d"
            />
          </div>
        ) : (
          <>
            {currentStep !== 0 && !showError ? (
              <div className="adminInvoiceOpenEditMainBox">
                <div className="adminInvoiceOpenEditInnerBox">
                  <div className="adminInvoiceOpenEditInnerTitleBox">
                    <p>Setup Your Account</p>
                    {/* <button
                      onClick={() => setCurrentStep(0)}
                      className="adminAddInvoiceMainAddLabelOptionDeleteIcon"
                    >
                      <RxCross2 size={"25px"} />
                    </button> */}
                  </div>
                  <AdminFirstLogin
                    currentStep={currentStep}
                    handleMessageToShow={handleMessageToShow}
                    handleMessageType={handleMessageType}
                  />
                </div>
              </div>
            ) : null}
            {/* <AdminFirstLogin /> */}
            <AdminDashboardCategories />
            <AdminDashboardReports />
            <AdminLocation />
          </>
        )}
      </div>
    </div>
  );
}
