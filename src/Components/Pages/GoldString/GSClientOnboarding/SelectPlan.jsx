import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function SelectPlan({ planDetails, handleSetPlanDetails }) {
  // Initialize a state variable to keep track of checked checkboxes
  const [checkedState, setCheckedState] = useState(Array(6).fill(false));

  // Handler to toggle the checked state
  const handleOnChange = (position) => {
    // Update the checked state based on the position of the checkbox clicked
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };
  useEffect(() => {
    if (checkedState.includes(true)) {
      const planNames = handleSetPlanDetails({
        Plan: `${checkedState}`,
        AllOk: true,
      });
    } else {
      handleSetPlanDetails({
        Plan: `${checkedState}`,
        AllOk: false,
        EcommerceUrl: "",
      });
    }
  }, [checkedState]);
  console.log(checkedState, "checkedState");
  console.log(checkedState[5], "checkedState[6");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select Plan
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {checkedState.map((item, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item}
                      onChange={() => handleOnChange(index)}
                    />
                  }
                  label={`Option${index + 1}`}
                />
              </FormGroup>
            </Item>
          </Grid>
        ))}
      </Grid>
      {checkedState[5] ? (
        <Grid item xs={12} md={6} sx={{ mt: 2.5 }}>
          <TextField
            id="EcommerceUrl"
            label="Ecommerce Url"
            fullWidth
            autoComplete="EcommerceUrl"
            variant="standard"
            value={planDetails.EcommerceUrl}
            onChange={(e) =>
              handleSetPlanDetails({
                ...planDetails,
                EcommerceUrl: e.target.value,
              })
            }
          />
        </Grid>
      ) : null}
    </React.Fragment>
  );
}
