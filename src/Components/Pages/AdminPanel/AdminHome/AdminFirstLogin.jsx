import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { Box, TextField, Typography, Grid } from "@mui/material";
import { allCountriesList } from "../../../Api/CountriesAllList";
import { FcCheckmark } from "react-icons/fc";
import { useSelector } from "react-redux";
import {
  a100,
  a110,
  a114,
  a115,
  a95,
  a96,
  a97,
  a98,
  a99,
} from "../../../Api/RootApiPath";
import { financialYearsList } from "../../../Api/FinancialYearsList";
import AlertMessage from "../../../Other Functions/AlertMessage";
import { countries } from "../../../Api/CountriesList";
import { allStateList } from "../../../Api/StateList";
import { popularBanksIndia, popularBanksUS } from "../../../Api/BanksList";

export default function AdminFirstLogin({
  currentStep,
  handleMessageToShow,
  handleMessageType,
}) {
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [showError, setShowError] = useState(true);
  const [messageType, setMessageType] = useState("success");
  const [messageToShow, setMessageToShow] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowError(false);
    }, 750000);
  }, [showError]);

  const [newCompany, setNewCompany] = useState({
    ClientCode: "",
    CompCode: "",
    CompName: "",
    CompShortName: "",
    CompOwnerName: "",
    CompRegisteredAddress: "",
    CompFactoryAddress: "",
    CompMobileNo: "",
    CompPhoneNo: "",
    CompRegistrationNo: "",
    CompYearOfEstablishment: "",
    CompEmail: "",
    CompGSTINNo: "",
    CompPanNo: "",
    CompAddharNo: "",
    CompLogo: "",
    CompWebsite: "",
    CompVATNo: "",
    CompCGSTNo: "",
    CompStatus: "",
    Town: "",
    Country: adminLoggedIn.Clients.Country,
    State: adminLoggedIn.Clients.State,
    City: "",
    FinancialYear: "",
    BaseCurrency: adminLoggedIn.Clients.BaseCurrency,
    TransactionSeries: "",
    CompLoginStatus: "",
    OldEntry: false,
  });

  const [allCompaniesList, setAllCompaniesList] = useState([]);

  const [newBranch, setNewBranch] = useState({
    BranchCode: "",
    CompanyId: "",
    BranchName: "",
    BranchType: "",
    BranchHead: "",
    BranchAddress: "",
    PhoneNumber: "",
    MobileNumber: "",
    FaxNumber: "",
    Country: adminLoggedIn.Clients.Country,
    Town: "",
    State: adminLoggedIn.Clients.State,
    City: "",
    PostalCode: "",
    GSTIN: "",
    BranchEmailId: "",
    BranchStatus: "",
    FinancialYear: newCompany.FinancialYear,
    BranchLoginStatus: "",
    OldEntry: false,
  });
  const [allEmployees, setAllEmployees] = useState([]);
  const [allBranchesList, setAllBranchesList] = useState([]);
  const [newBank, setNewBank] = useState({
    BankName: "",
    AccountName: "",
    BankAccountNo: "",
    BranchName: "",
    MobileNumber: "",
    AccountType: "",
    BranchAddress: "",
    IfscCode: "",

    OldEntry: false,
  });
  const [allBanksList, setAllBanksList] = useState([]);

  const toggleOpen = () => setIsOpen(!isOpen);
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  useEffect(() => {
    setStep(currentStep);
  }, [currentStep]);

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

    try {
      if (data.length > 0) {
        const allCompanies = data.map((x) => {
          return { ...x, OldEntry: true };
        });
        setAllCompaniesList(allCompanies);
        setNewCompany(allCompanies[0]);
        setNewBranch((x) => {
          return {
            ...x,
            FinancialYear: allCompanies[0].FinancialYear,
            CompanyId: allCompanies[0].Id,
          };
        });
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

    try {
      if (data.length > 0) {
        const allCompanies = data.map((x) => {
          return { ...x, OldEntry: true };
        });
        setAllBranchesList(allCompanies);
        setNewBranch(allCompanies[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBranches();
  }, []);

  const fetchAllEmployees = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    const response = await fetch(a110, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    try {
      if (data.length > 0) {
        setAllEmployees(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);
  const addCompany = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("ClientCode", clientCode);
    formData.append("CompName", newCompany.CompName);
    formData.append("CompShortName", newCompany.CompShortName);
    formData.append("CompOwnerName", newCompany.CompOwnerName);
    formData.append("CompRegisteredAddress", newCompany.CompRegisteredAddress);
    formData.append("CompFactoryAddress", newCompany.CompFactoryAddress);
    formData.append("CompMobileNo", newCompany.CompMobileNo);
    formData.append("CompPhoneNo", newCompany.CompPhoneNo);
    formData.append("CompRegistrationNo", newCompany.CompRegistrationNo);
    formData.append(
      "CompYearOfEstablishment",
      newCompany.CompYearOfEstablishment
    );
    formData.append("CompEmail", newCompany.CompEmail);
    formData.append("CompGSTINNo", newCompany.CompGSTINNo);
    formData.append("CompPanNo", newCompany.CompPanNo);
    formData.append("CompAddharNo", newCompany.CompAddharNo);
    formData.append("CompLogo", newCompany.CompLogo);
    formData.append("CompWebsite", newCompany.CompWebsite);
    formData.append("CompVATNo", newCompany.CompVATNo);
    formData.append("CompCGSTNo", "");
    formData.append("CompStatus", "Active");
    formData.append("Town", newCompany.Town);
    formData.append("Country", newCompany.Country);
    formData.append("State", newCompany.State);
    formData.append("City", newCompany.City);
    formData.append("FinancialYear", newCompany.FinancialYear);
    formData.append("BaseCurrency", newCompany.BaseCurrency);
    formData.append("TransactionSeries", newCompany.TransactionSeries);
    formData.append("CompLoginStatus", newCompany.CompLoginStatus || "Active");
    formData.append(
      "CompCode",
      newCompany.OldEntry ? newCompany.CompCode : "0"
    );
    formData.append("Id", newCompany.OldEntry ? newCompany.Id : "0");

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    // if (
    //   newCompany.OldEntry || allCompaniesList.length < 1
    //     ? console.log("First")
    //     : console.log("second")
    // )
    try {
      const response = await fetch(
        !newCompany.OldEntry ? a97 : a96,
        // a96,
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: formData,
        }
      );
      const data = await response.json();

      const updatedCompany = {
        ...data,
        OldEntry: true,
      };

      setNewCompany(updatedCompany);

      setStep(step + 1);
      // setMessageType("success");
      // setMessageToShow("Company Added Successfully");
      // setShowError(true);
      handleMessageToShow("Company Added Successfully");
      handleMessageType("success");
      fetchAllCompanies();
    } catch (error) {
      console.error(error);
    }
  };

  const addBranch = async (e) => {
    e.preventDefault();

    const formData = {
      BranchCode: newBranch.BranchCode,
      ClientCode: clientCode,
      CompanyId: newBranch.CompanyId,
      BranchName: newBranch.BranchName,
      BranchType: newBranch.BranchType,
      BranchHead: newBranch.BranchHead,
      BranchAddress: newBranch.BranchAddress,
      PhoneNumber: newBranch.PhoneNumber,
      MobileNumber: newBranch.MobileNumber,
      FaxNumber: newBranch.FaxNumber,
      Country: newBranch.Country,
      Town: newBranch.Town,
      State: newBranch.State,
      City: newBranch.City,
      PostalCode: newBranch.PostalCode,
      GSTIN: newBranch.GSTIN,
      BranchEmailId: newBranch.BranchEmailId,
      BranchStatus: "Active",
      FinancialYear: newBranch.FinancialYear,
      BranchLoginStatus: "Active",
      ...(newBranch.OldEntry ? { Id: newBranch.Id } : {}),
    };
    console.log(formData, "formData to send");
    try {
      const response = await fetch(
        !newBranch.OldEntry ? a100 : a99,
        // a96,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      const updatedBranch = {
        ...data,
        OldEntry: true,
      };

      setNewBranch(updatedBranch);

      setStep(step + 1);
      handleMessageToShow("Branch Added Successfully");
      handleMessageType("success");
    } catch (error) {
      console.error(error);
    }
  };

  const addBank = async (e) => {
    e.preventDefault();

    const formData = {
      ClientCode: clientCode,
      BankName: newBank.BankName,
      AccountName: newBank.AccountName,
      BankAccountNo: newBank.BankAccountNo,
      BranchName: newBank.BranchName,
      MobileNumber: newBank.MobileNumber,
      AccountType: newBank.AccountType,
      BranchAddress: newBank.BranchAddress,
      IfscCode: newBank.IfscCode,
      ...(newBank.OldEntry ? { Id: newBank.Id } : {}),
    };
    console.log(formData, "formData to send");
    try {
      const response = await fetch(
        !newBank.OldEntry ? a115 : a114,
        // a96,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      const updatedBank = {
        ...data,
        OldEntry: true,
      };

      setNewBank(updatedBank);

      setStep(step + 1);
      handleMessageToShow("Bank Added Successfully");
      handleMessageType("success");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewCompanyChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setNewCompany({ ...newCompany, [name]: value });
  };
  const states = {
    US: ["California", "Texas", "Florida", "New York"],
    IN: allStateList,
    // Add more states for each country as needed
  };

  const [countryStates, setCountryStates] = useState([]);
  const handleNewBranchChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setNewBranch({ ...newBranch, [name]: value });
    if (name == "Country" && value == "India") {
      setCountryStates(states.IN);
      setNewBranch({ ...newBranch, Country: value, State: "" });
    } else if (name == "Country" && value == "United States") {
      setCountryStates(states.US);
      setNewBranch({ ...newBranch, Country: value, State: "" });
    } else {
      setNewBranch({ ...newBranch, [name]: value });
      setCountryStates([]);
    }
  };

  const handleNewBankChange = (e) => {
    const { name, value } = e.target;
    // Update the edited data in the state
    setNewBank({ ...newBank, [name]: value });
  };
  console.log(newBranch, "newBranch");
  useEffect(() => {
    if (newBranch.Country === "United States") {
      setAllBanksList(popularBanksUS);
    } else {
      setAllBanksList(popularBanksIndia);
    }
  }, [newBranch]);
  return (
    <div style={{ width: "100%" }}>
      {step === 1 ? (
        <div className="adminFirstLoginInnerBox">
          <h4 style={{ textAlign: "left" }}>1. Add Company</h4>

          <form onSubmit={(e) => addCompany(e)}>
            <div>
              <label>
                Company Name <sup>*</sup>
              </label>
              <input
                type="text"
                name="CompName"
                required="required"
                value={newCompany.CompName}
                onChange={handleNewCompanyChange}
              />
            </div>
            <div>
              <label>
                Company Short Name <sup>*</sup>
              </label>
              <input
                type="text"
                required="required"
                name="CompShortName"
                value={newCompany.CompShortName}
                onChange={handleNewCompanyChange}
              />
            </div>
            <div>
              <label>
                Company Mobile No. <sup>*</sup>
              </label>
              <input
                name="CompMobileNo"
                required="required"
                type="text"
                value={newCompany.CompMobileNo}
                onChange={handleNewCompanyChange}
              />
            </div>
            <div>
              <label>Town / Village</label>
              <input
                name="Town"
                type="text"
                value={newCompany.Town}
                onChange={handleNewCompanyChange}
              />
            </div>
            <div>
              <label>
                City <sup>*</sup>
              </label>
              <input
                name="City"
                type="text"
                required="required"
                value={newCompany.City}
                onChange={handleNewCompanyChange}
              />
            </div>
            <div>
              <label>
                Country <sup>*</sup>
              </label>
              <select
                name="Country"
                required="required"
                value={newCompany.Country}
                onChange={handleNewCompanyChange}
              >
                {allCountriesList.map((x, y) => (
                  <option key={y} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>
                State <sup>*</sup>
              </label>
              <input
                name="State"
                type="text"
                required="required"
                value={newCompany.State}
                onChange={handleNewCompanyChange}
              />
            </div>
            <div>
              <label>
                Financial Year <sup>*</sup>
              </label>
              <select
                required="required"
                name="FinancialYear"
                type="text"
                value={newCompany.FinancialYear}
                onChange={handleNewCompanyChange}
              >
                <option value={""}>Choose Financial Year</option>

                {financialYearsList.map((x, index) => (
                  <option key={index} value={x}>
                    {x}
                  </option>
                ))}
              </select>
              {/* <input
                required="required"
                name="FinancialYear"
                type="text"
                value={newCompany.FinancialYear}
                onChange={handleNewCompanyChange}
              /> */}
            </div>
            <div>
              <label>
                Base Currency <sup>*</sup>
              </label>
              <select
                required="required"
                name="BaseCurrency"
                type="text"
                value={newCompany.BaseCurrency}
                onChange={handleNewCompanyChange}
              >
                <option value={""}>Choose Base Currency</option>
                <option value={"Rupee"}>Rupee</option>
                <option value={"Dollar"}>Dollar</option>
                <option value={"Pound"}>Pound</option>
              </select>
              {/* <input
                required="required"
                name="BaseCurrency"
                type="text"
                value={newCompany.BaseCurrency} 
                onChange={handleNewCompanyChange}
              /> */}
            </div>
            <div>
              <label>
                Transaction Series <sup>*</sup>
              </label>
              <input
                required="required"
                type="text"
                name="TransactionSeries"
                value={newCompany.TransactionSeries}
                onChange={handleNewCompanyChange}
              />
            </div>
            {!isOpen ? (
              <div>
                <div
                  style={{ margin: "0px" }}
                  className="adminPanelLoginFormRegisterBox"
                >
                  <h5
                    style={{ margin: "0px" }}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Show All
                  </h5>
                </div>
                <button
                  type="submit"
                  // onClick={(e) => {
                  //   addCompany(e);
                  // }}
                  style={{ marginInline: "0px" }}
                  className="customerBillAddButton"
                >
                  {!newCompany.OldEntry ? "Add" : "Update"}
                </button>
              </div>
            ) : null}

            {isOpen ? (
              <>
                <div>
                  <label>Company Owner Name </label>
                  <input
                    type="text"
                    name="CompOwnerName"
                    value={newCompany.CompOwnerName}
                    onChange={handleNewCompanyChange}
                  />
                </div>
                <div>
                  <label>Company Registered Address</label>
                  <input
                    type="text"
                    name="CompRegisteredAddress"
                    value={newCompany.CompRegisteredAddress}
                    onChange={handleNewCompanyChange}
                  />
                </div>
                <div>
                  <label>Company Factory Address</label>
                  <input
                    type="text"
                    name="CompFactoryAddress"
                    value={newCompany.CompFactoryAddress}
                    onChange={handleNewCompanyChange}
                  />
                </div>

                <div>
                  <label>Company Phone No.</label>
                  <input
                    name="CompPhoneNo"
                    type="text"
                    value={newCompany.CompPhoneNo}
                    onChange={handleNewCompanyChange}
                  />
                </div>

                <div>
                  <label>Company Registration No.</label>
                  <input
                    name="CompRegistrationNo"
                    type="text"
                    value={newCompany.CompRegistrationNo}
                    onChange={handleNewCompanyChange}
                  />
                </div>
                <div>
                  <label>Year Of Establishment</label>
                  <input
                    name="CompYearOfEstablishment"
                    type="text"
                    value={newCompany.CompYearOfEstablishment}
                    onChange={handleNewCompanyChange}
                  />
                </div>
                <div>
                  <label>Company Email</label>
                  <input
                    name="CompEmail"
                    type="text"
                    value={newCompany.CompEmail}
                    onChange={handleNewCompanyChange}
                  />
                </div>
                <div>
                  <label>Company GSTIN No.</label>
                  <input
                    type="text"
                    name="CompGSTINNo"
                    value={newCompany.CompGSTINNo}
                    onChange={handleNewCompanyChange}
                  />
                </div>
                <div>
                  <label>Company Pan No.</label>
                  <input
                    name="CompPanNo"
                    type="text"
                    value={newCompany.CompPanNo}
                    onChange={handleNewCompanyChange}
                  />
                </div>
                <div>
                  <label>Company Website</label>
                  <input
                    name="CompWebsite"
                    type="text"
                    value={newCompany.CompWebsite}
                    onChange={handleNewCompanyChange}
                  />
                </div>
                {/* <div>
                  <label>Company CGST No</label>
                  <input
                    name="CompCGSTNo"
                    type="text"
                    value={newCompany.CompCGSTNo}
                    onChange={handleNewCompanyChange}
                  />
                </div> */}
                <div>
                  <div
                    style={{ margin: "0px" }}
                    className="adminPanelLoginFormRegisterBox"
                  >
                    <h5
                      style={{ margin: "0px" }}
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      Show Less
                    </h5>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => addCompany(e)}
                    style={{ marginInline: "0px" }}
                    className="customerBillAddButton"
                  >
                    {!newCompany.OldEntry ? "Add" : "Update"}
                  </button>
                </div>
              </>
            ) : null}
            {/* <div>
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                style={{ marginInline: "0px" }}
                className="customerBillAddButton"
              >
                Add
              </button>
            </div> */}
          </form>

          <h4 style={{ textAlign: "left" }}>2. Add Branch</h4>
          <h4 style={{ textAlign: "left" }}>3. Add Bank </h4>
        </div>
      ) : step === 2 ? (
        <div className="adminFirstLoginInnerBox">
          <h4
            className="underline-animate"
            onClick={() =>
              newCompany.OldEntry ? setStep(step - 1) : setStep(step - 1)
            }
            style={{ textAlign: "left" }}
          >
            1. Add Company
            <FcCheckmark
              className="adminFirstLoginInnerBoxCheckIcon"
              size={"20px"}
            />
          </h4>
          <h4 style={{ textAlign: "left" }}>2. Add Branch</h4>
          <form onSubmit={(e) => addBranch(e)}>
            {/* <div>
              <label>Branch Code</label>
              <input
                style={{ cursor: "not-allowed" }}
                name="BranchCode"
                value={newBranch.BranchCode}
                readOnly
                // onChange={handleNewBankChange}
                type="text"
              />
            </div> */}
            <div>
              <label>
                Company Name <sup>*</sup>
              </label>
              <select
                name="CompanyId"
                value={newBranch.CompanyId}
                onChange={handleNewBranchChange}
                type="text"
                required="required"
              >
                {allCompaniesList.map((x) => {
                  return (
                    <>
                      <option value={""}>Select an option</option>;
                      <option value={x.Id}>{x.CompName}</option>;
                    </>
                  );
                })}
              </select>
            </div>

            <div>
              <label>
                Branch Name <sup>*</sup>
              </label>
              <input
                name="BranchName"
                value={newBranch.BranchName}
                onChange={handleNewBranchChange}
                type="text"
                required="required"
              />
            </div>
            <div>
              <label>
                Branch Type <sup>*</sup>
              </label>
              <select
                name="BranchType"
                value={newBranch.BranchType}
                onChange={handleNewBranchChange}
                type="text"
                required="required"
              >
                <option value={""}>Select an option</option>;
                <option value={"Showroom"}>Showroom</option>
                <option value={"Warehouse"}>Warehouse</option>
                <option value={"Exhibition"}>Exhibition</option>
              </select>
            </div>
            <div>
              <label>Branch Head</label>
              <input
                name="BranchHead"
                value={newBranch.BranchHead}
                onChange={handleNewBranchChange}
                type="text"
                list="allEmployeesList"
              />
            </div>
            <datalist id="allEmployeesList">
              {allEmployees.map((x) => (
                <option
                  value={`${x.FirstName} ${x.LastName}`}
                >{`${x.FirstName} ${x.LastName}`}</option>
              ))}
            </datalist>
            <div>
              <label>Branch Address</label>
              <input
                name="BranchAddress"
                value={newBranch.BranchAddress}
                onChange={handleNewBranchChange}
                type="text"
              />
            </div>
            <div>
              <label>Phone Number </label>
              <input
                name="PhoneNumber"
                value={newBranch.PhoneNumber}
                onChange={handleNewBranchChange}
                type="text"
              />
            </div>
            <div>
              <label>Mobile Number</label>
              <input
                name="MobileNumber"
                value={newBranch.MobileNumber}
                onChange={handleNewBranchChange}
                type="text"
              />
            </div>
            <div>
              <label>Fax Number</label>
              <input
                name="FaxNumber"
                value={newBranch.FaxNumber}
                onChange={handleNewBranchChange}
                type="text"
              />
            </div>

            <div>
              <label>Town</label>
              <input
                name="Town"
                value={newBranch.Town}
                onChange={handleNewBranchChange}
                type="text"
              />
            </div>

            <div>
              <label>City</label>
              <input
                name="City"
                value={newBranch.City}
                onChange={handleNewBranchChange}
                type="text"
              />
            </div>
            <div>
              <label>
                Country <sup>*</sup>
              </label>

              <select
                name="Country"
                value={newBranch.Country}
                onChange={handleNewBranchChange}
                required="required"
                id="Country"
              >
                {countries.map((x, index) => (
                  <option key={index} value={x.label}>
                    {x.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>
                State <sup>*</sup>
              </label>
              <input
                name="State"
                value={newBranch.State}
                onChange={handleNewBranchChange}
                type="text"
                required="required"
                list="branchStatesList"
              />
              <datalist id="branchStatesList">
                {countryStates.map((x, index) => (
                  <option key={index} value={x}>
                    {x}
                  </option>
                ))}
              </datalist>
            </div>
            <div>
              <label>Postal Code</label>
              <input
                name="PostalCode"
                value={newBranch.PostalCode}
                onChange={handleNewBranchChange}
                type="text"
              />
            </div>
            <div>
              <label>GSTIN</label>
              <input
                name="GSTIN"
                value={newBranch.GSTIN}
                onChange={handleNewBranchChange}
                type="text"
              />
            </div>
            <div>
              <label>Branch Email ID</label>
              <input
                name="BranchEmailId"
                value={newBranch.BranchEmailId}
                onChange={handleNewBranchChange}
                type="email"
              />
            </div>
            {/* <label>Branch Status</label>
                  <input
                    name="BranchStatus"
                    value={newBranch.BranchStatus}
                    onChange={handleNewBranchChange}
                    type="text"
                  /> */}

            <div>
              <label>
                Financial Year <sup>*</sup>
              </label>
              <select
                required="required"
                name="FinancialYear"
                type="text"
                value={newBranch.FinancialYear}
                onChange={handleNewBranchChange}
              >
                <option value={""}>Choose Financial Year</option>

                {financialYearsList.map((x, index) => (
                  <option key={index} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                // onClick={() => setStep(step + 1)}
                // onClick={(e) => addBranch(e)}
                style={{ marginInline: "0px" }}
                className="customerBillAddButton"
              >
                {!newBranch.OldEntry ? "Add" : "Update"}
              </button>
            </div>
          </form>

          <h4 style={{ textAlign: "left" }}>3. Add Bank </h4>
        </div>
      ) : step === 3 ? (
        <div className="adminFirstLoginInnerBox">
          <h4
            onClick={() => (newCompany.OldEntry ? setStep(1) : setStep(1))}
            className="underline-animate"
            style={{ textAlign: "left" }}
          >
            1. Add Company
            <FcCheckmark
              className="adminFirstLoginInnerBoxCheckIcon"
              size={"20px"}
            />
          </h4>
          <h4
            className="underline-animate"
            onClick={() => (newCompany.OldEntry ? setStep(2) : setStep(2))}
            style={{ textAlign: "left" }}
          >
            2. Add Branch
            <FcCheckmark
              className="adminFirstLoginInnerBoxCheckIcon"
              size={"20px"}
            />
          </h4>
          <h4 style={{ textAlign: "left" }}>3. Add Bank</h4>
          <form onSubmit={(e) => addBank(e)}>
            <div>
              <label>
                Bank Name<sup>*</sup>
              </label>
              {/* <input
                name="BankName"
                value={newBank.BankName}
                onChange={handleNewBankChange}
                required="required"
                type="text"
                /> */}
              <select
                name="BankName"
                value={newBank.BankName}
                onChange={handleNewBankChange}
                required="required"
              >
                <option value={""}>Select Bank Name</option>
                {allBanksList.map((x, index) => (
                  <option key={index} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>
                Account Name<sup>*</sup>
              </label>
              <input
                name="AccountName"
                value={newBank.AccountName}
                onChange={handleNewBankChange}
                type="text"
                required="required"
              />
            </div>
            <div>
              <label>
                Bank Account No.<sup>*</sup>
              </label>
              <input
                name="BankAccountNo"
                value={newBank.BankAccountNo}
                onChange={handleNewBankChange}
                type="number"
                required="required"
              />
            </div>
            <div>
              <label>
                Branch Name<sup>*</sup>
              </label>
              <input
                name="BranchName"
                value={newBank.BranchName}
                onChange={handleNewBankChange}
                type="text"
                required="required"
              />
            </div>
            <div>
              <label>Mobile Number</label>
              <input
                name="MobileNumber"
                value={newBank.MobileNumber}
                onChange={handleNewBankChange}
                type="number"
              />
            </div>
            <div>
              <label>
                Account Type<sup>*</sup>
              </label>
              {/* <input
                name="AccountType"
                value={newBank.AccountType}
                onChange={handleNewBankChange}
                required="required"
                type="text"
                /> */}
              <select
                name="AccountType"
                value={newBank.AccountType}
                onChange={handleNewBankChange}
                required="required"
              >
                <option value={""}>Select Account Type</option>
                <option value={"Saving"}>Saving</option>
                <option value={"Current"}>Current</option>
                <option value={"OD"}>OD</option>
                <option value={"CC"}>CC</option>
              </select>
            </div>
            <div>
              <label>Branch Address</label>
              <input
                name="BranchAddress"
                value={newBank.BranchAddress}
                onChange={handleNewBankChange}
                type="text"
              />
            </div>
            <div>
              <label>
                Ifsc Code<sup>*</sup>
              </label>
              <input
                name="IfscCode"
                value={newBank.IfscCode}
                onChange={handleNewBankChange}
                type="text"
                required="required"
              />
            </div>
            <div>
              <button
                type="submit"
                // onClick={() => setStep(step + 1)}

                style={{ marginInline: "0px" }}
                className="customerBillAddButton"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
