import {
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const PayslipLayout = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Handle file upload logic here
    if (selectedFile) {
      // You can use APIs like FileReader to read the file content or
      // use it to upload the file to a server
      console.log("Uploading file:", selectedFile);
    } else {
      console.log("No file selected.");
    }
  };
  return (
    <>
      <Container style={{ alignItems: "center" }}>
        <Grid sx={{ display: "flex" }}>
          <Grid>
            <TextField
              sx={{ display: "flex", mt: "10px", width: "auto" }}
              // margin="none"
              size="small"
              type="text"
              name="Nameofemployee "
              label="Name of Employee"
              variant="outlined"
              // value={}
              // onChange={(e) =>
              //   setPostData({ ...postData, employeeId: e.target.value })
              // }
            />
          </Grid>
          <Grid style={{ display: "flex", marginLeft: "50px" }}>
            <Typography sx={{ marginRight: "20px" }}>file Upload</Typography>
            <input type="file" onChange={handleFileChange} accept=".pdf" />
            <Button onClick={handleUpload}>upload</Button>{" "}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PayslipLayout;
