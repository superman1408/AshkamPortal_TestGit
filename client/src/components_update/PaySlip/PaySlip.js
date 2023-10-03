import React from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  Input,
  TextField,
} from "@mui/material";

const PaySlip = () => {
  return (
    <div>
      <Grid>
        <Paper
          sx={{
            display: "flex",
            bgcolor: "background.paper",
            boxShadow: "5px",
            marginLeft: "200px",
            marginRight: "200px",
            marginTop: "10px",
          }}
        >
          <Grid>
            <Grid>
              <Typography sx={{ alignItems: "center" }}>Salary Slip</Typography>
            </Grid>
            <Divider orientation="horizontal" />
            <Grid>
              <TextField
                type="text"
                name="lastName"
                id="standard-basic"
                label="Employee Id"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid>
              <TextField
                type="text"
                name="lastName"
                id="standard-basic"
                label="Employee Name"
                variant="standard"
                fullWidth
              />

              <TextField
                type="text"
                name="lastName"
                id="standard-basic"
                label="last Name"
                variant="standard"
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default PaySlip;
