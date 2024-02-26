import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CountryCode from "layouts/form/data/countryCode.js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axiosInstance";
import Spinner from "components/Spinner";
import MDTypography from "components/MDTypography";

const theme = createTheme();

export default function LeaseDate({
  flightID,
  leaseDate,
  updateLeaseDate,
  handleClose,
}) {
  const [dateValue, setDateValue] = useState(new Date(leaseDate));
  const [loading, setLoading] = useState(false);

  const handleDateChange = (newDate) => {
    setDateValue(newDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const dateString = new Date(
      new Date(dateValue).getTime() -
        new Date(dateValue).getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    axios
      .patch(`flight/${flightID}`, { CONTINUED_TILL: dateString })
      .then((res) => {
        console.log(res);
        setLoading(false);
        updateLeaseDate(dateString);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        handleClose();
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent={"center"}
              >
                <MDTypography fontWeight="regular" fontSize="medium">
                  Flight ID -&nbsp;
                </MDTypography>
                <MDTypography fontWeight="bold" color="dark" fontSize="medium">
                  {flightID}
                </MDTypography>
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                alignItems="center"
                justifyContent={"center"}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    value={dateValue}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    // defaultValue={dateValue}
                    label="Lease Date"
                    id="leaseDate"
                    name="leaseDate"
                    renderInput={(params) => (
                      <TextField fullWidth required {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            {loading === true ? (
              <Spinner />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                APPLY CHANGES
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
