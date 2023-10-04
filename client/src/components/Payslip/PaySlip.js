import React from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  Input,
  TextField,
  Container,
} from "@mui/material";

const PaySlip = () => {
  return (
    <div
      maxWidth="true"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {/* <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      > */}
      <Paper
        elevation={20}
        sx={{
          display: "flex",
          bgcolor: "background.paper",
          boxShadow: "5px",
          // width: "900px",
          // marginLeft: "100px",
          // marginRight: "50px",
          marginTop: "10px",
        }}
      >
        <Grid
          sx={{
            marginLeft: "30px",
            marginRight: "30px",
            marginBottom: "30px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              // flexGrow: 1,
              fontSize: "30px",
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Salary Slip
          </Typography>

          <Divider
            sx={{
              borderWidth: "2px",
            }}
          />

          <Typography sx={{ marginTop: "20px", marginBottom: "0px" }}>
            Employee Pay Summary
          </Typography>

          <Divider orientation="horizontal" color="grey" />

          <TextField
            sx={{ display: "flex", mt: "10px" }}
            margin="normal"
            type="text"
            name="employeeId"
            label="Employee Id"
            variant="outlined"
            required
          />

          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid>
              <TextField
                sx={{ display: "flex", mr: "20px" }}
                type="text"
                margin="normal"
                name="firstName"
                // id="standard-basic"
                label="First Name"
                variant="outlined"
                required
              />
            </Grid>

            <Grid>
              <TextField
                type="text"
                margin="normal"
                name="lastName"
                label="Last Name"
                variant="outlined"
                required
              />
            </Grid>
          </Grid>

          <TextField
            type="text"
            margin="normal"
            name="lastName"
            // id="standard-basic"
            label="last Name"
            variant="outlined"
            required
          />

          <TextField
            type="text"
            margin="normal"
            name="UAN"
            // id="standard-basic"
            label="UAN No."
            variant="outlined"
            required
          />

          <TextField
            type="text"
            margin="normal"
            name="payDays"
            // id="standard-basic"
            label="Pay Days"
            variant="outlined"
            required
          />
          <TextField
            type="text"
            margin="normal"
            name="payPeriod"
            // id="standard-basic"
            label="payPeriod"
            variant="outlined"
            required
          />
          <TextField
            type="text"
            margin="normal"
            name="payDate"
            // id="standard-basic"
            label="payDate"
            variant="outlined"
            required
          />

          <Typography sx={{ marginTop: "50px", marginBottom: "0px" }}>
            Income Details
          </Typography>

          <Divider orientation="horizontal" color="grey" />

          <Grid sx={{ display: "flex", flexDirection: "row", mb: "10px" }}>
            <Grid sx={{ display: "flex", flexDirection: "column" }}>
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography>Earnings</Typography>
                <Typography marginLeft={30}>Amount</Typography>
              </Grid>
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography marginTop={4} marginRight={30}>
                  Basic
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  margin="normal"
                  name="payDate"
                  // id="standard-basic"
                  label="amount"
                  variant="outlined"
                />
              </Grid>
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography marginTop={3} marginRight={15}>
                  House rent allowance
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  margin="normal"
                  name="amount"
                  // id="standard-basic"
                  label="amount"
                  variant="outlined"
                />
              </Grid>
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography marginTop={3} marginRight={14}>
                  Conveyance allowance
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  margin="normal"
                  name="amount"
                  // id="standard-basic"
                  label="amount"
                  variant="outlined"
                />
              </Grid>

              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography marginTop={3} marginRight={14}>
                  Communication
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  margin="normal"
                  name="amount"
                  // id="standard-basic"
                  label="amount"
                  variant="outlined"
                />
              </Grid>

              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography marginTop={3} marginRight={14}>
                  Uniform allowance
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  margin="normal"
                  name="amount"
                  // id="standard-basic"
                  label="amount"
                  variant="outlined"
                />
              </Grid>

              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography marginTop={3} marginRight={14}>
                  Medical allowance
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  margin="normal"
                  name="amount"
                  // id="standard-basic"
                  label="amount"
                  variant="outlined"
                />
              </Grid>

              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography marginTop={3} marginRight={14}>
                  City Factors
                </Typography>
                <TextField
                  size="small"
                  type="text"
                  margin="normal"
                  name="amount"
                  // id="standard-basic"
                  label="amount"
                  variant="outlined"
                />
              </Grid>

              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography marginTop={3} marginRight={14}>
                  Gross Earnings (Rs)
                </Typography>
                <TextField
                  size="small"
                  type="text"
                  margin="normal"
                  name="amount"
                  // id="standard-basic"
                  label="amount"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Grid sx={{ display: "flex", flexDirection: "column", ml: "80px" }}>
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography>Deductions</Typography>
                <Typography marginLeft={30}>Amount</Typography>
              </Grid>
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography marginTop={4} marginRight={20}>
                  Income Tax
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  margin="normal"
                  name="payDate"
                  // id="standard-basic"
                  label="amount"
                  variant="outlined"
                />
              </Grid>

              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography marginTop={4} marginRight={17}>
                  Provident fund
                </Typography>
                <TextField
                  type="text"
                  size="small"
                  margin="normal"
                  name="payDate"
                  // id="standard-basic"
                  label="amount"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PaySlip;
