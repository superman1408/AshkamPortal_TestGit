import { Button, Card, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComboBox from "./ComboBox";

import { getPosts, salarySlipData } from "../../action/posts";
import { useParams } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const PayslipLayout = () => {
  const id = useParams();
  //   const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [currentId, setCurrentId] = useState(null);
  // console.log(currentId);

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    salarySlip: "",
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFormData({
      ...formData,
      salarySlip: e.target.files[0],
    });
  };

  console.log(formData.salarySlip);

  useEffect(() => {
    if (!currentId) return setCurrentId(id);
    dispatch(getPosts()).then(() => {});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, posts]);
  //   console.log(posts);

  const handleUpload = (e) => {
    if (currentId) {
      e.preventDefault();
      dispatch(salarySlipData(currentId, formData))
        .then(() => {
          console.log("upload");
        })
        .catch((err) => {
          console.log(err);
        });
      //   setUser(null);
    } else {
      console.log("Not set current ID");
    }

    if (selectedFile) {
      // You can use APIs like FileReader to read the file content or
      // use it to upload the file to a server
      console.log("Uploading file:", selectedFile);
    } else {
      console.log("No file selected.");
    }
  };

  // Handle file upload logic here
  //     if (selectedFile) {
  //       // You can use APIs like FileReader to read the file content or
  //       // use it to upload the file to a server
  //       console.log("Uploading file:", selectedFile);
  //     } else {
  //       console.log("No file selected.");
  //     }
  //   };
  return (
    <>
      <Card sx={{ textAlign: "center", margin: "50px 0px 50px 200px" }}>
        <Grid
          container
          sx={{
            padding: "30px",
            display: "flex",
            width: "auto",
            justifyContent: "space-evenly",
          }}
        >
          <Grid item sx={{}}>
            <ComboBox posts={posts} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item sx={{ display: "flex", marginLeft: "100px" }}>
            <Typography sx={{ fontWeight: "bold", marginTop: "10px" }}>
              File Upload
            </Typography>
            <div
              style={{
                fontWeight: "bold",
                marginTop: "5px",
                marginLeft: "10px",
              }}
            >
              <input type="file" onChange={handleFileChange} accept=".pdf" />
            </div>
          </Grid>
          <Grid item sx={{ marginLeft: "100px" }}>
            <Button onClick={handleUpload}>
              upload <FileUploadIcon />
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default PayslipLayout;
