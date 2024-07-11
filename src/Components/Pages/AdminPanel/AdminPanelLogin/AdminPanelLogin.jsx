import React, { useEffect, useState } from "react";
import logo from "../../../Images/loyalStringLogoWide.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLoggedIn } from "../../../../redux/action/Actions";
import { addToken } from "../../../../redux/action/Actions";
import "../../PagesStyles/AdminPanelLogin.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdLogin } from "react-icons/md";
import { a172, a62, a94 } from "../../../Api/RootApiPath";
import GSHeading from "../../GoldString/GSHeading/GSHeading";
import introVideo from "../IntroVideo/LoyalString1.mp4";
import zIndex from "@mui/material/styles/zIndex";

export default function AdminPanelLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [otpInput, setOtpInput] = useState("");
  const [otpRcvd, setOtpRcvd] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [playVideo, setPlayVideo] = useState(false);
  const allStates = useSelector((state) => state);
  const adminLogged = allStates.reducer1;
  // let Entryby_Staff_id = parseInt(adminLoggedIn);

  // console.log(adminLogged, "adminLogged");
  // console.log(adminLogged, "adminLogged");
  const loggedIn = (user) => {
    // dispatch(adminLoggedIn(user));
    dispatch(adminLoggedIn(user));
  };
  const addingToken = (user) => {
    // dispatch(adminLoggedIn(user));
    dispatch(addToken(user));
  };
  useEffect(() => {
    let showPasswordOption = document.getElementById(
      "adminPanelLoginFormShowPasswordButton"
    );
    if (showPasswordOption && showPassword === true) {
      showPasswordOption.classList.add("passwordVisible");
      showPasswordOption.classList.remove("passwordHidden");
    } else if (showPasswordOption && showPassword === false) {
      showPasswordOption.classList.add("passwordHidden");
      showPasswordOption.classList.remove("passwordVisible");
    } else {
      null;
    }
  }, [showPassword]);

  console.log(adminLogged, "adminLogged");
  let isAuthenticated = "";
  if (adminLogged.Clients) {
    isAuthenticated = true;
    // if (adminLogged.toString() === "1") {
    //   isAuthenticated = true;
  } else if (adminLogged.toString() === "2") {
    isAuthenticated = true;
  } else if (adminLogged.toString() === "3") {
    isAuthenticated = true;
  } else if (adminLogged.toString() === "4") {
    isAuthenticated = true;
  } else if (adminLogged.StatusType === true) {
    isAuthenticated = true;
  } else isAuthenticated = false;

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      Username: username,
      Password: password,
    };
    try {
      const response = await fetch(a94, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.Message) {
        alert(data.Message);
      } else {
        console.log(data);
        setEmployeeDetails(data.Employee);
        if (isAuthenticated == true) {
          // loggedIn(employeeDetails);
          navigate("/adminhome");
        } else {
          // setCurrentStep(2);
          // handleSendOtp(data.Employee.Clients.EmailForOTP);
          // }
          // setPlayVideo(true);
          loggedIn(data.Employee);
          navigate("/adminhome");
        }
      }
    } catch (error) {
      // if (response.status === 500) {
      // console.log(response.status);
      // console.log(response.statusText);
      // }
      console.error(error);
      // alert(error.message);
    }
  };
  // useEffect(() => {
  //   if (playVideo) {
  //     // Assume the video element has an ID of "introVideo"
  //     const videoElement = document.getElementById("introVideo");
  //     if (videoElement) {
  //       videoElement.play();
  //       videoElement.onended = () => {
  //         navigate("/adminhome");
  //       };
  //     }
  //   }
  // }, [playVideo, navigate]);

  const handleSendOtp = async (email) => {
    const formData = {
      EmpEmail: email,
    };
    try {
      const response = await fetch(a172, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      // alert(data.Message);
      setOtpRcvd(data.Data);
      // loggedIn(data.Employee);
      // navigate("/adminhome");
    } catch (error) {
      // if (response.status === 500) {
      // console.log(response.status);
      // console.log(response.statusText);
      // }
      console.error(error);
      // alert(error.message);
    }
  };
  const handleEmployeeValid = () => {
    if (otpInput !== "" && otpRcvd !== "") {
      if (parseInt(otpInput) === parseInt(otpRcvd)) {
        loggedIn(employeeDetails);
        navigate("/adminhome");
      } else {
        alert("Incorrect OTP");
      }
    }
  };
  // const handleLogin = () => {
  //   if (username == "admin" && password == "Testing@123") {
  //     // alert(`Welcome ${username}`);
  //     loggedIn("1");
  //     navigate("/adminhome");
  //   } else if (username == "Branch2" && password == "Testing@123") {
  //     // alert(`Welcome ${username}`);
  //     navigate("/adminhome");
  //     loggedIn("2");
  //   } else if (username == "Staff2" && password == "soccerlover") {
  //     // alert(`Welcome ${username}`);
  //     navigate("/adminhome");
  //     loggedIn("3");
  //   } else if (username == "Staff3" && password == "chocolate123") {
  //     // alert(`Welcome ${username}`);
  //     navigate("/adminhome");
  //     loggedIn("4");
  //   } else if (username == "Staff4" && password == "beach2020") {
  //     // alert(`Welcome ${username}`);
  //     navigate("/adminhome");
  //     loggedIn("5");
  //   } else {
  //     alert("Sorry Incorrect Details");
  //   }
  // };

  // const handleLogin = async () => {
  //   // Assuming it's a GET request, append parameters to the URL
  //   const apiUrl = `${a62}?email=${username}&password=${password}`;

  //   try {
  //     const response = await fetch(a62, {
  //       method: "POST", // Use POST method
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: username,
  //         password: password,
  //       }),
  //     });
  //     const data = await response.json();

  //     // Process the response data, e.g., store the token
  //     const token = data.token;
  //     // Perform actions with the token, such as storing it in state or localStorage
  //     if (data.token) {
  //       console.log(data.token);
  //       loggedIn("1");
  //       addingToken(`${data.token}`);
  //       // console.log("Login successful. Token:", token);
  //       navigate("/adminhome");
  //       showUser();
  //     }
  //     // Optionally, return the token or other relevant data
  //     return token;
  //     // Rest of the code remains the same...
  //   } catch (error) {
  //     console.error("Error during login:", error.message);
  //     throw error;
  //   }
  // };

  // const allStates = useSelector((state) => state);
  // const isAdminLoggedIn = allStates.reducer1;
  // const isAdminTokenIn = allStates.reducer3;
  // const showUser = () => {
  //   console.log(isAdminLoggedIn, "isAdminLoggedIn");
  //   console.log(isAdminTokenIn, "isAdminToken");
  // };

  return (
    <div className="adminPanelLoginOuterBox">
      {playVideo ? (
        <video
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: "1000",
            backgroundColor: "#38414a",
          }}
          id="introVideo"
        >
          <source src={introVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <>
          <GSHeading />
          {currentStep === 1 ? (
            <div
              style={{ marginTop: "70px" }}
              className="adminPanelLoginInnerBox"
            >
              <div className="adminPanelLoginBox">
                <img
                  style={{ placeSelf: "flex-start", marginBottom: "30px" }}
                  className="adminPanelLoginLogo"
                  src={logo}
                  alt="loyalStringLogo"
                />
                {/* <form onSubmit={handleLogin}> */}
                <div>
                  {/* <div className="adminPanelLoginLogoStatementOuter">
              <div className="adminPanelLoginLogoStatement">
                <p>Enter your username and password to access admin panel.</p>
              </div>
            </div> */}
                  <div className="adminPanelLoginFormLabelBox">
                    <div className="adminPanelLoginFormLabelInnerBox">
                      <label htmlFor="inputEmail">Username</label>
                    </div>
                  </div>
                  <div className="adminPanelLoginFormInputBox">
                    {/* <div className="adminPanelLoginFormInputInnerBox"> */}
                    <input
                      type="text"
                      id="inputEmail"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {/* </div> */}
                  </div>

                  <div className="adminPanelLoginFormLabelBox">
                    <div className="adminPanelLoginFormLabelInnerBox">
                      <label htmlFor="inputPassword">Password</label>
                    </div>
                  </div>
                  <div className="adminPanelLoginFormInputBox">
                    <div className="adminPanelLoginFormInputInnerBox">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="inputPassword3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        style={{ cursor: "pointer" }}
                        id="adminPanelLoginFormShowPasswordButton"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible className="adminPanelLoginFormShowPasswordIcon" />
                        ) : (
                          <AiOutlineEye className="adminPanelLoginFormShowPasswordIcon" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="adminPanelLoginFormButtonOuterBox">
                    <button
                      type="submit"
                      onClick={(e) => handleLogin(e)}
                      className="adminPanelLoginFormButtonInnerBox"
                    >
                      <MdLogin style={{ marginRight: "5px" }} />
                      <div>Sign in</div>
                    </button>
                  </div>
                  {/* </form> */}
                  <div className="adminPanelLoginFormRegisterBox">
                    <p>Dont have an account ?</p>
                    <h5 onClick={() => navigate("/client_onboarding")}>
                      Register Here
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ) : currentStep == 2 ? (
            <div
              style={{ marginTop: "70px" }}
              className="adminPanelLoginInnerBox"
            >
              <div className="adminPanelLoginBox">
                <img
                  style={{ placeSelf: "flex-start", marginBottom: "30px" }}
                  className="adminPanelLoginLogo"
                  src={logo}
                  alt="loyalStringLogo"
                />
                {/* <form onSubmit={handleLogin}> */}
                <div>
                  {/* <div className="adminPanelLoginLogoStatementOuter">
            <div className="adminPanelLoginLogoStatement">
              <p>Enter your username and password to access admin panel.</p>
            </div>
          </div> */}
                  <div className="adminPanelLoginFormLabelBox">
                    <div className="adminPanelLoginFormLabelInnerBox">
                      <label htmlFor="inputEmail">
                        Enter OTP Send to Registered Email
                      </label>
                    </div>
                  </div>
                  <div className="adminPanelLoginFormInputBox">
                    {/* <div className="adminPanelLoginFormInputInnerBox"> */}
                    <input
                      type="number"
                      id="otpInput"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                    />
                    {/* </div> */}
                  </div>

                  <div className="adminPanelLoginFormButtonOuterBox">
                    <button
                      type="button"
                      onClick={() => handleEmployeeValid()}
                      className="adminPanelLoginFormButtonInnerBox"
                    >
                      <MdLogin style={{ marginRight: "5px" }} />
                      <div>Sign in</div>
                    </button>
                  </div>
                  {/* </form> */}
                  <div className="adminPanelLoginFormRegisterBox">
                    <p>Dont have an account ?</p>
                    <h5 onClick={() => navigate("/client_onboarding")}>
                      Register Here
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
