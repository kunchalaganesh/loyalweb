import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Avatar, colors } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Box from "@mui/material/Box";
import { CgProfile } from "react-icons/cg";

export default function Customize({
  customizeDetails,
  handleSetCustomizeDetails,
  profileImage,
  handleSetProfileImage,
}) {
  useEffect(() => {
    if (
      customizeDetails.OrganisationName !== "" &&
      customizeDetails.ClientType !== "" &&
      customizeDetails.EmailForOTP !== "" &&
      customizeDetails.BaseCurrency !== ""
    ) {
      handleSetCustomizeDetails({ ...customizeDetails, AllOk: true });
    } else {
      handleSetCustomizeDetails({ ...customizeDetails, AllOk: false });
    }
  }, [
    customizeDetails.OrganisationName,
    customizeDetails.ClientType,
    customizeDetails.EmailForOTP,
    customizeDetails.BaseCurrency,
  ]);
  const [image, setImage] = useState(profileImage);
  const handleFileInputChange = (event) => {
    const file = event.target.files[0]; // Take the first file
    if (file) {
      setImage(file);
      handleSetProfileImage(file);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Organinisation
      </Typography>
      <Grid container spacing={3}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          item
          xs={12}
          // sm={6}
        >
          {!image ? (
            <div className="GSClientCustomiseProfileBox">
              <label>
                <CgProfile
                  style={{ margin: "1.2rem", marginInline: "1rem" }}
                  size={"2.5rem"}
                />
                Add Profile Pic
                <input
                  id="images"
                  style={{ display: "none" }}
                  type="file"
                  onChange={handleFileInputChange}
                />
              </label>
              <div className="profilePicOverlay">
                {/* Overlay content goes here */}
                Click to upload your profile picture
              </div>
            </div>
          ) : (
            <div className="GSClientCustomiseProfileBox">
              <label
                className="GSClientCustomiseProfileBoxImagesLabel"
                htmlFor="images"
              >
                {" "}
                {/* This label is associated with the input below */}
                <img src={URL.createObjectURL(image)} alt={`Selected Image`} />
              </label>
              <input
                id="images"
                style={{ display: "none" }}
                type="file"
                onChange={handleFileInputChange}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="OrganisationName"
            name="OrganisationName"
            label="Organisation Name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={customizeDetails.OrganisationName}
            onChange={(e) =>
              handleSetCustomizeDetails({
                ...customizeDetails,
                OrganisationName: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="OrganisationDetails"
            name="OrganisationDetails"
            label="Organisation Details"
            fullWidth
            autoComplete="OrganisationDetails"
            variant="standard"
            value={customizeDetails.OrganisationDetails}
            onChange={(e) =>
              handleSetCustomizeDetails({
                ...customizeDetails,
                OrganisationDetails: e.target.value,
              })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Currency <sup>*</sup>
              </InputLabel>
              <NativeSelect
                // defaultValue={"Rupee"}
                inputProps={{
                  name: "BaseCurrency",
                  id: "uncontrolled-native",
                }}
                value={customizeDetails.BaseCurrency}
                onChange={(e) =>
                  handleSetCustomizeDetails({
                    ...customizeDetails,
                    BaseCurrency: e.target.value,
                  })
                }
              >
                <option value={""}>Choose Base Currency</option>
                <option value={"Rupee"}>Rupee</option>
                <option value={"Dollar"}>Dollar</option>
                <option value={"Pound"}>Pound</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="clientType">
                Client Type <sup>*</sup>
              </InputLabel>
              <NativeSelect
                // defaultValue={1}
                inputProps={{
                  name: "clientType",
                  id: "clientType",
                }}
                value={customizeDetails.ClientType}
                onChange={(e) =>
                  handleSetCustomizeDetails({
                    ...customizeDetails,
                    ClientType: e.target.value,
                  })
                }
              >
                <option value={""}></option>
                <option value={"Type 1"}>Type 1</option>
                <option value={"Type 2"}>Type 2</option>
                <option value={"Type 3"}>Type 3</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="EmailForOTP"
            name="EmailForOTP"
            label="Email For OTP"
            fullWidth
            autoComplete="EmailForOTP"
            variant="standard"
            value={customizeDetails.EmailForOTP}
            onChange={(e) =>
              handleSetCustomizeDetails({
                ...customizeDetails,
                EmailForOTP: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
