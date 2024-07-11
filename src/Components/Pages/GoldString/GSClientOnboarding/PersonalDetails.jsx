import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function PersonalDetails({
  // email,
  // setEmail,
  // mobile,
  // setMobile,
  personalDetails,
  handleSetPersonalDetails,
}) {
  const [email, setEmail] = useState(personalDetails.ClientEmail);
  const [mobile, setMobile] = useState(personalDetails.Mobile);
  const [isEmailValid, setIsEmailValid] = useState(null); // Changed to null
  const [isMobileValid, setIsMobileValid] = useState(null); // Changed to null
  const [showPassword, setShowPassword] = useState(false);
  // Email validation function
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Mobile validation function (simple length check, adjust regex/validation logic as necessary for your requirements)
  const validateMobile = (mobile) => {
    return mobile.length === 10 && !isNaN(mobile);
  };

  // Handlers for input changes
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    if (emailValue) {
      setIsEmailValid(validateEmail(emailValue));
    } else {
      setIsEmailValid(null); // Reset validation state when empty
    }
  };

  const handleMobileChange = (event) => {
    const mobileValue = event.target.value;
    setMobile(mobileValue);
    if (mobileValue) {
      setIsMobileValid(validateMobile(mobileValue));
    } else {
      setIsMobileValid(null); // Reset validation state when empty
    }
  };

  const resetMainValues = () => {
    handleSetPersonalDetails({
      FirstName: "",
      LastName: "",
      Mobile: "",
      ClientEmail: "",
      Username: "",
      Password: "",
      AllOk: false,
    });
    setEmail("");
    setMobile("");
  };
  useEffect(() => {
    if (isMobileValid && isEmailValid) {
      handleSetPersonalDetails({
        ...personalDetails,
        ClientEmail: email,
        Mobile: mobile,
        AllOk: true,
      });
    } else if (email !== "" && mobile !== "") {
      validateEmail(personalDetails.ClientEmail);
      validateMobile(personalDetails.Mobile);
      if (isMobileValid && isEmailValid) {
        handleSetPersonalDetails({
          ...personalDetails,
          ClientEmail: email,
          Mobile: mobile,
          AllOk: true,
        });
      }
    } else {
      console.log("I am here");
      handleSetPersonalDetails({ ...personalDetails, AllOk: false });
    }
  }, [mobile, email]);

  useEffect(() => {
    resetMainValues();
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={personalDetails.FirstName}
            onChange={(e) =>
              handleSetPersonalDetails({
                ...personalDetails,
                FirstName: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={personalDetails.LastName}
            onChange={(e) =>
              handleSetPersonalDetails({
                ...personalDetails,
                LastName: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mobile"
            name="mobile"
            label="Mobile"
            fullWidth
            autoComplete="tel"
            variant="standard"
            value={mobile}
            onChange={handleMobileChange}
            InputProps={{
              endAdornment:
                isMobileValid === null ? null : isMobileValid ? (
                  <InputAdornment position="end">
                    <CheckCircleOutlineIcon style={{ color: "green" }} />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <ErrorOutlineIcon style={{ color: "red" }} />
                  </InputAdornment>
                ),
            }}
            error={isMobileValid === false}
          />
          {isMobileValid === false && (
            <FormHelperText error={true}>Invalid mobile number</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={email}
            onChange={handleEmailChange}
            InputProps={{
              endAdornment:
                isEmailValid === null ? null : isEmailValid ? (
                  <InputAdornment position="end">
                    <CheckCircleOutlineIcon style={{ color: "green" }} />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <ErrorOutlineIcon style={{ color: "red" }} />
                  </InputAdornment>
                ),
            }}
            error={isEmailValid === false}
          />
          {isEmailValid === false && (
            <FormHelperText error={true}>Invalid email address</FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Username"
            name="Username"
            label="Username"
            fullWidth
            // autoComplete="Username"
            variant="standard"
            value={personalDetails.Username}
            onChange={(e) =>
              handleSetPersonalDetails({
                ...personalDetails,
                Username: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Password"
            name="Password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            // autoComplete="Password"
            variant="standard"
            value={personalDetails.Password}
            onChange={(e) =>
              handleSetPersonalDetails({
                ...personalDetails,
                Password: e.target.value,
              })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
