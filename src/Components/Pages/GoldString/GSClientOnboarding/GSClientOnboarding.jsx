import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";
import SelectPlan from "./SelectPlan";
import Review from "./Review";
import logo from "../../../Images/loyalStringLogoWide.png";
import Customize from "./Customize";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { RxCross2 } from "react-icons/rx";
import "../GSPagesStyles/GSClientOnboarding.css";
import { a93 } from "../../../Api/RootApiPath";
import { InfinitySpin } from "react-loader-spinner";
import smallLogo from "../../../Images/loyalStringLogoSmall.png";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://loyalstring.com/">
        LoyalString
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = [
  "Personal Details",
  "Address details",
  "Select Plan",
  "Customize",
];

export default function GSClientOnboarding() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [profileImage, setProfileImage] = React.useState(null);
  const [alertMessage, setAlertMessage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [personalDetails, setPersonalDetails] = React.useState({
    FirstName: "",
    LastName: "",
    Mobile: "",
    ClientEmail: "",
    Username: "",
    Password: "",
    AllOk: false,
  });
  const [addressDetails, setAddressDetails] = React.useState({
    WebsiteAddress: "",
    StreetAddress: "",
    Town: "",
    City: "",
    State: "",
    Country: "",
    PostalCode: "",
    PanNo: "",
    GSTNo: "",
    AadharNo: "",
    AllOk: false,
  });
  const [planDetails, setPlanDetails] = React.useState({
    Plan: "",
    EcommerceUrl: "",
    AllOk: false,
  });
  const [customizeDetails, setCustomizeDetails] = React.useState({
    OrganisationName: "",
    OrganisationDetails: "",
    BaseCurrency: "",
    ClientType: "",
    EmailForOTP: "",
    AllOk: false,
  });

  const BasicAlerts = () => {
    return (
      <div className="adminInvoiceOpenEditMainBox">
        <div className="adminInvoiceOpenEditInnerBox">
          <div className="adminInvoiceOpenEditInnerTitleBox">
            <p>Error</p>
            <button
              onClick={() => setAlertMessage(false)}
              className="adminAddInvoiceMainAddLabelOptionDeleteIcon"
            >
              <RxCross2 size={"25px"} />
            </button>
          </div>
          <Stack sx={{ width: "100%" }} spacing={2}>
            {/* <Alert severity="success">This is a success Alert.</Alert>
        <Alert severity="info">This is an info Alert.</Alert> */}
            {/* <Alert severity="warning">This is a warning Alert.</Alert> */}
            <Alert severity="error">Please Fill All Required Fields</Alert>
          </Stack>
        </div>
      </div>
    );
  };
  // Handlers for setting email and mobile
  const handleSetEmail = (newEmail) => setEmail(newEmail);
  const handleSetMobile = (newMobile) => setMobile(newMobile);
  const handleSetPersonalDetails = (status) => setPersonalDetails(status);
  const handleSetAddressDetails = (data) => setAddressDetails(data);
  const handleSetPlanDetails = (data) => setPlanDetails(data);
  const handleSetCustomizeDetails = (data) => setCustomizeDetails(data);
  const handleSetProfileImage = (data) => setProfileImage(data);

  const navigate = useNavigate();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  // console.log(personalDetails, "personalDetails");
  // console.log(addressDetails, "addressDetails");
  // console.log(planDetails, "PlanDetails");
  // console.log(customizeDetails, "Customize Details");
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <PersonalDetails
            // email={email}
            // setEmail={handleSetEmail}
            // mobile={mobile}
            // setMobile={handleSetMobile}
            personalDetails={personalDetails}
            handleSetPersonalDetails={handleSetPersonalDetails}
          />
        );
      case 1:
        return (
          <AddressDetails
            addressDetails={addressDetails}
            handleSetAddressDetails={handleSetAddressDetails}
            customizeDetails={customizeDetails}
            handleSetCustomizeDetails={handleSetCustomizeDetails}
          />
        );
      case 2:
        return (
          <SelectPlan
            planDetails={planDetails}
            handleSetPlanDetails={handleSetPlanDetails}
          />
        );
      case 3:
        return (
          <Customize
            customizeDetails={customizeDetails}
            handleSetCustomizeDetails={handleSetCustomizeDetails}
            profileImage={profileImage}
            handleSetProfileImage={handleSetProfileImage}
          />
        );
      case 4:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }
  console.log(activeStep, "active step");
  useEffect(() => {
    // Set the timeout and store its ID
    const timerId = setTimeout(() => setAlertMessage(false), 1500);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timerId);
  }, [alertMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    let formData = new FormData();

    formData.append("FirstName", personalDetails.FirstName);
    formData.append("LastName", personalDetails.LastName);
    formData.append("Mobile", personalDetails.Mobile);
    formData.append("ClientEmail", personalDetails.ClientEmail);
    formData.append("StreetAddress", addressDetails.StreetAddress);
    // formData.append("Party_Details", partyName);
    formData.append("Town", addressDetails.Town);
    formData.append("City", addressDetails.City);
    formData.append("State", addressDetails.State);
    formData.append("Country", addressDetails.Country);
    formData.append("PostalCode", addressDetails.PostalCode);
    formData.append("PanNo", addressDetails.PanNo);
    formData.append("GSTNo", addressDetails.GSTNo);
    formData.append("AadharNo", addressDetails.AadharNo);
    formData.append("Plan", planDetails.Plan);
    formData.append("Username", personalDetails.Username);
    formData.append("Password", personalDetails.Password);
    formData.append("EmailForOTP", customizeDetails.EmailForOTP);
    formData.append("BaseCurrency", customizeDetails.BaseCurrency);
    formData.append("AdvertisementPointBalance", "0");
    formData.append("ClientType", customizeDetails.ClientType);
    formData.append("OrganisationName", customizeDetails.OrganisationName);
    formData.append(
      "OrganisationDetails",
      customizeDetails.OrganisationDetails
    );
    formData.append("BalanceAmt", "0");
    formData.append("FineSilver", "0");
    formData.append("FineGold", "0");
    formData.append("AdvanceAmt", "0");
    formData.append("PlanStartDate", "");
    formData.append("PlanExpiryDate", "");
    formData.append("PaymentStatus", "");
    formData.append("DesiredUsername", "");
    formData.append("PaymentStatus", "");
    formData.append("WebsiteName", "0");
    // formData.append("CreatedBy", "0");
    // formData.append(
    //   "EcommerceUrl",
    //   planDetails.EcommerceUrl ? planDetails.EcommerceUrl : ""
    // );
    // formData.append("WebsiteAddress", `${addressDetails.WebsiteAddress}`);

    formData.append("ProfilePic", "");
    // if (profileImage) {
    //   formData.append("ProfilePic", profileImage);
    // } else {
    //   formData.append("ProfilePic", "");
    // }
    // console.log(formData, "formData");
    console.log("adding client");
    for (let [key, value] of formData.entries()) {
      console.log(key, value, typeof value);
    }

    try {
      const response = await fetch(a93, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(formData),
        body: formData,
      });
      const data = await response.json();
      console.log(data, "data");
      if (data.Message) {
        // setLoading(false);
        alert(data.Message);
        // console.log("added", data);
      } else {
        handleNext();
        // Handle the error if the upload fails
        // console.error("Failed to upload the files.");
      }
    } catch (error) {
      // Handle any network or fetch API errors
      console.error("An error occurred:", error);
    }
  };
  console.log(personalDetails, "personal Details");
  console.log(addressDetails, "addressDetailss");
  console.log(customizeDetails, "customizeDetails");
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/gsHome")}
              src={logo}
              alt="Loyalsting"
            />
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {steps < 4 ? (
            <Typography component="h1" variant="h4" align="center">
              Register Now
            </Typography>
          ) : null}
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step style={{ whiteSpace: "noWrap" }} key={label}>
                <StepLabel>
                  {/* {label} */}
                  <p style={{ fontSize: "12px" }}>{label}</p>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {alertMessage ? BasicAlerts() : null}
          {activeStep === steps.length ? (
            loading ? (
              <div
                style={{ height: "100px", marginBottom: "1rem" }}
                className={loading == true ? "loading" : "none"}
              >
                <InfinitySpin
                  className={loading == true ? "loading" : "none"}
                  width="150"
                  color="#4fa94d"
                />
              </div>
            ) : (
              <React.Fragment>
                <img src={smallLogo} style={{ marginBottom: "20px" }} />

                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1" style={{ color: "green" }}>
                  Your Registration is Succesfull. 😊
                </Typography>
                <Typography variant="subtitle1">
                  Please{" "}
                  <span
                    className="clientOnboardingLoginOption"
                    onClick={() => navigate("/adminpanellogin")}
                  >
                    Login{" "}
                  </span>
                  Again to Continue with your Setup.
                  <div className="adminPanelLoginFormRegisterBox">
                    <h5 onClick={() => navigate("/adminpanellogin")}>
                      Login Now
                    </h5>
                  </div>
                </Typography>
              </React.Fragment>
            )
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                {activeStep == 0 && personalDetails.AllOk ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                ) : (activeStep == 1 && addressDetails.AllOk) ||
                  (activeStep == 2 && planDetails.AllOk) ||
                  (activeStep == 3 && customizeDetails.AllOk) ? (
                  <Button
                    variant="contained"
                    onClick={(e) =>
                      activeStep === steps.length - 1
                        ? handleSubmit(e)
                        : handleNext()
                    }
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    // onClick={() => alert("Please Enter Correct Details")}
                    onClick={() => setAlertMessage(true)}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
