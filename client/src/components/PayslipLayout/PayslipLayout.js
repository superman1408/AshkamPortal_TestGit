import { Button, Card, Typography } from "@mui/material";
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
      <div style={{ alignItems: "center" }}>
        <Card>
          <div style={{ display: "flex" }}>
            <div>
              <Card>Name of Employee</Card>
            </div>
            <div style={{ display: "flex" }}>
              <Typography>file Upload</Typography>
              <input type="file" onChange={handleFileChange} accept=".pdf" />
              <Button onClick={handleUpload}>upload</Button>{" "}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default PayslipLayout;
