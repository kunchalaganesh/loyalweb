import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "../../../Api/CountriesList";
import { allStateList } from "../../../Api/StateList";

export default function AddressDetails({
  addressDetails,
  handleSetAddressDetails,
  customizeDetails,
  handleSetCustomizeDetails,
}) {
  useEffect(() => {
    if (
      addressDetails.City !== "" &&
      addressDetails.State !== "" &&
      addressDetails.Country !== ""
    ) {
      handleSetAddressDetails({ ...addressDetails, AllOk: true });
    } else {
      handleSetAddressDetails({ ...addressDetails, AllOk: false });
    }
  }, [addressDetails.City, addressDetails.State, addressDetails.Country]);

  const states = {
    US: ["California", "Texas", "Florida", "New York"],
    IN: allStateList,
    // Add more states for each country as needed
  };

  const [countryStates, setCountryStates] = useState([]);

  const handleCountryChange = (event, newValue) => {
    if (newValue) {
      setCountryStates(states[newValue.code] || []);
      handleSetAddressDetails({
        ...addressDetails,
        Country: newValue.label,
        State: "", // Reset state when country changes
      });
      handleSetCustomizeDetails({
        ...customizeDetails,
        BaseCurrency: newValue.label === "India" ? "Rupee" : "Dollar",
        AllOk: true,
      });
    } else {
      setCountryStates([]);
      handleSetAddressDetails({
        ...addressDetails,

        Country: "",
        State: "",
      });
    }
  };

  const handleStateChange = (event, newValue) => {
    handleSetAddressDetails({
      ...addressDetails,
      State: newValue || "",
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Address Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="WebsiteAddress"
            label="Website Address"
            fullWidth
            value={addressDetails.WebsiteAddress}
            onChange={(e) =>
              handleSetAddressDetails({
                ...addressDetails,
                WebsiteAddress: e.target.value,
              })
            }
            autoComplete="WebsiteAddress"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="StreetAddress"
            label="Street Address"
            fullWidth
            value={addressDetails.StreetAddress}
            onChange={(e) =>
              handleSetAddressDetails({
                ...addressDetails,
                StreetAddress: e.target.value,
              })
            }
            autoComplete="StreetAddress"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="Town/Village"
            label="Town / Village"
            fullWidth
            autoComplete="Town/Village"
            variant="standard"
            value={addressDetails.Town}
            onChange={(e) =>
              handleSetAddressDetails({
                ...addressDetails,
                Town: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="City"
            label="City"
            fullWidth
            autoComplete="City"
            variant="standard"
            value={addressDetails.City}
            onChange={(e) =>
              handleSetAddressDetails({
                ...addressDetails,
                City: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 250 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.label === value}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
                required
              />
            )}
            onChange={handleCountryChange}
            value={
              countries.find(
                (country) => country.label === addressDetails.Country
              ) || null
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            id="state-select-demo"
            sx={{ width: 250 }}
            options={countryStates}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a state"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
                required
              />
            )}
            onChange={handleStateChange}
            value={addressDetails.State || null}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="PostalCode"
            label="Postal Code"
            fullWidth
            autoComplete="PostalCode"
            variant="standard"
            value={addressDetails.PostalCode}
            onChange={(e) =>
              handleSetAddressDetails({
                ...addressDetails,
                PostalCode: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="PanNo"
            label="Pan No"
            fullWidth
            autoComplete="PanNo"
            variant="standard"
            value={addressDetails.PanNo}
            onChange={(e) =>
              handleSetAddressDetails({
                ...addressDetails,
                PanNo: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="GSTNo"
            label="GST No"
            fullWidth
            autoComplete="GSTNo"
            variant="standard"
            value={addressDetails.GSTNo}
            onChange={(e) =>
              handleSetAddressDetails({
                ...addressDetails,
                GSTNo: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="AadharNo"
            label="Aadhar No"
            fullWidth
            autoComplete="AadharNo"
            variant="standard"
            value={addressDetails.AadharNo}
            onChange={(e) =>
              handleSetAddressDetails({
                ...addressDetails,
                AadharNo: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
