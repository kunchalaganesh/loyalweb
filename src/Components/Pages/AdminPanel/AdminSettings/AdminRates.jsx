import React, { useState, useEffect } from "react";
import { a134, a135, a22, a37 } from "../../../Api/RootApiPath";
import { InfinitySpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import AdminHeading from "../Heading/AdminHeading";
import AdminBreadCrump from "../Heading/AdminBreadCrump";
import "../../PagesStyles/AdminSettings.css";

export default function AdminRates() {
  const [categoryLabel, setCategoryLabel] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [purity, setPurity] = useState("");
  const [inputValues, setInputValues] = useState({});

  const [purityData, setPurityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const allStates = useSelector((state) => state);
  const adminLoggedIn = allStates.reducer1;
  //   let Entryby_Staff_id = parseInt(adminLoggedIn);
  const clientCode = adminLoggedIn.ClientCode;
  const employeeCode = adminLoggedIn.EmployeeCode;

  useEffect(() => {
    fetchAllPurity();
  }, []);
  const fetchAllPurity = async () => {
    const formData = {
      ClientCode: clientCode,
    };
    await fetch(a134, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setPurityData(data));
    console.log(purityData);
  };
  console.log(purityData, "purityData");
  console.log(purityData, "purityData");
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleUpdate = (
    id,
    name,
    purity,
    label,
    value,
    FinePercentage,
    Description
  ) => {
    setLoading(true);
    const payload = {
      Id: id,
      CategoryId: name,
      PurityName: purity,
      ShortName: label,
      TodaysRate: value || "0",
      FinePercentage: FinePercentage,
      Description: Description,
      EmployeeCode: employeeCode ? employeeCode : 0,
      ClientCode: clientCode,
      Status: "Active",
    };

    // Make the API request to update the data
    // Replace 'updateApiUrl' with the actual API endpoint for updating the data
    fetch(a135, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API if needed
        console.log(data);
        setInputValues({ ...inputValues, [id]: value });
        setLoading(false);
      })
      .catch((error) => {
        // Handle any errors that occur during the API request
        console.error(error);
      });
  };

  return (
    <div>
      <AdminHeading />
      <div className="adminMainBodyBox">
        <AdminBreadCrump
          title={"Add Daily Rates"}
          companyName={"Loyalstring"}
          module={"Settings"}
          page={"Daily Rates"}
        />
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
        <div className="dailyRateAddMainBox">
          <div className="dailyRateAddInnerBox">
            <div className="dailyRateAddTableBox">
              <table>
                <thead>
                  <tr>
                    <th>Category Label</th>
                    <th>Purity</th>
                    <th>Todays Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {purityData.map((x) => {
                    return (
                      <tr>
                        <td>{x.CategoryId}</td>
                        <td>{x.PurityName}</td>
                        <td>
                          <input
                            type="number"
                            value={inputValues[x.Id] || ""}
                            placeholder={x.TodaysRate}
                            onChange={(e) =>
                              setInputValues({
                                ...inputValues,
                                [x.Id]: e.target.value,
                              })
                            }
                          />
                          <button
                            onClick={() =>
                              handleUpdate(
                                x.Id,
                                x.CategoryId,
                                x.PurityName,
                                x.ShortName,
                                inputValues[x.Id],
                                x.FinePercentage,
                                x.Description
                              )
                            }
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
