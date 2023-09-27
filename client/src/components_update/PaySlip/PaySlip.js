import React from "react";
import { FormControl, Grid, Box, Typography, Card } from "@mui/material";

const PaySlip = () => {
  return (
    <div>
      <Grid>
        <FormControl>
          <Card
            sx={{
              display: "flex",
              bgcolor: "grey",
              boxShadow: "5px",
            }}
          >
            <Typography>Payment Slip</Typography>
          </Card>
        </FormControl>
      </Grid>
    </div>
  );
};

export default PaySlip;
