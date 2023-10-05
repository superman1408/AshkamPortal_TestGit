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
  Button,
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

          <Typography
            variant="h4"
            fontFamily={""}
            sx={{ marginTop: "20px", marginBottom: "0px" }}
          >
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
                sx={{ display: "flex", mr: "50px" }}
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
                sx={{ display: "flex", mr: "50px" }}
                type="text"
                margin="normal"
                name="middleName"
                label="Middle Name"
                variant="outlined"
                required
              />
            </Grid>

            <Grid>
              <TextField
                sx={{ display: "flex", mr: "20px" }}
                type="text"
                margin="normal"
                name="lastName"
                // id="standard-basic"
                label="Last Name"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid>
              <TextField
                sx={{ display: "flex", mr: "40px" }}
                type="text"
                size="small"
                margin="normal"
                name="UAN"
                // id="standard-basic"
                label="UAN No."
                variant="outlined"
                required
              />
            </Grid>

            <Grid>
              <TextField
                sx={{ display: "flex", mr: "40px" }}
                type="text"
                size="small"
                margin="normal"
                name="payDays"
                // id="standard-basic"
                label="Pay Days"
                variant="outlined"
                required
              />
            </Grid>

            <Grid>
              <TextField
                sx={{ display: "flex", mr: "40px" }}
                type="text"
                size="small"
                margin="normal"
                name="payPeriod"
                // id="standard-basic"
                label="payPeriod"
                variant="outlined"
                required
              />
            </Grid>

            <Grid>
              <TextField
                sx={{ display: "flex", mr: "20px" }}
                type="text"
                size="small"
                margin="normal"
                name="payDate"
                label="payDate"
                variant="outlined"
                required
              />
            </Grid>
          </Grid>

          <Typography
            variant="h4"
            sx={{ marginTop: "50px", marginBottom: "0px" }}
          >
            Income Details
          </Typography>

          <Divider orientation="horizontal" color="grey" />

          <Grid sx={{ display: "flex", flexDirection: "row", mb: "10px" }}>
            <Grid sx={{ display: "flex", flexDirection: "column" }}>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                }}
              >
                <Typography variant="h6">Earnings</Typography>
                <Typography variant="h6" marginLeft={30}>
                  Amount
                </Typography>
              </Grid>
              <Divider orientation="horizontal" color="grey" />
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography marginTop={3} marginRight={30}>
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
                <Typography marginTop={3} marginRight={21}>
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
                <Typography marginTop={3} marginRight={18}>
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
                <Typography marginTop={3} marginRight={18}>
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
                <Typography marginTop={3} marginRight={24}>
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
                <Typography marginTop={3} marginRight={18} fontFamily="bolder">
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
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                }}
              >
                <Typography variant="h6">Deductions</Typography>
                <Typography variant="h6" marginLeft={30}>
                  Amount
                </Typography>
              </Grid>
              <Divider orientation="horizontal" color="grey" />

              <Typography marginTop={3} marginRight={18} fontStyle={"inherit"}>
                Provident fund
              </Typography>
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography marginTop={3} marginRight={15}>
                  Employee's Contribution
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
                <Typography
                  marginTop={3}
                  marginRight={14}
                  alignItems={"center"}
                >
                  Employeer's Contribution
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
                <Typography
                  marginTop={3}
                  marginRight={23}
                  alignItems={"center"}
                >
                  Professinal Tax
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

              <Typography marginTop={4} marginRight={18}>
                ESIC
              </Typography>
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  marginTop={3}
                  marginRight={22}
                  alignItems={"center"}
                >
                  Employee's Contribution
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
                <Typography
                  marginTop={3}
                  marginRight={22}
                  alignItems={"center"}
                >
                  Employeer's Contribution
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

          {/* ---------------Button---------------- */}
          <Grid
            sx={{ display: "flex", flexDirection: "row", marginTop: "60px" }}
          >
            <Grid>
              <Button
                sx={{ bgcolor: "skyblue", color: "black", marginLeft: "20px" }}
              >
                Generate
              </Button>
            </Grid>
            <Grid>
              <Button
                sx={{ bgcolor: "skyblue", color: "black", marginLeft: "900px" }}
              >
                Print
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PaySlip;
