import { Button, Card, Typography } from "@mui/material";
import React from "react";

const PayslipLayout = () => {
  return (
    <>
      <div style={{ alignItems: "center" }}>
        <Card>
          <div style={{ display: "flex" }}>
            <div>
              <Card>Name of Employee</Card>
            </div>
            <div style={{ display: "flex" }}>
              <Typography>file Upload</Typography>
              <Button>upload</Button>{" "}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default PayslipLayout;
