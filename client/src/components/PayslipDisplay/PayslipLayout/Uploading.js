import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Card, Grid, Typography } from "@mui/material";

import { salarySlipData } from "../../../action/posts";
import ComboBox from "./ComboBox";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const Uploading = ({posts}) => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null); // Change to null
  const [title, setTitle] = useState(null);



  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Set selected file directly
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (currentId && selectedFile) {
      const formData = new FormData();
      formData.append("pdf", selectedFile);
      formData.append("title", title);

      try {
        await dispatch(
          salarySlipData(currentId, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        );
        console.log("upload:  ", formData);
        alert("Uploaded Successfully!");
        // Refresh the page
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Current ID or file not set");
    }
  };

  return (
    <>
      <Card
        sx={{
          textAlign: "center",
          margin: "10px",
          "@media(max-Width:600px)": { margin: "10px", width: "40vh" },
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "30px",
            padding: "30px",
            "@media(max-Width:600px)": { flexDirection: "column" },
          }}
        >
          <Grid>
            <ComboBox posts={posts} setCurrentId={setCurrentId} />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              "@media(max-Width:600px)": { flexDirection: "column" },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                marginTop: "10px",
                fontFamily: "Roboto",
              }}
            >
              File Upload
            </Typography>
            <div
              style={{
                fontWeight: "bold",
                marginTop: "5px",
                marginLeft: "10px",
              }}
            >
              <input
                type="text"
                onChange={handleTitleChange}
                placeholder="Enter the Title"
              />
              <input
                style={{ marginLeft: "50px", fontFamily: "Roboto" }}
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
              />
            </div>
          </Grid>
          <Grid>
            <button style={{ fontFamily: "Roboto" }} onClick={handleUpload}>
              Upload <FileUploadIcon />
            </button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Uploading;
