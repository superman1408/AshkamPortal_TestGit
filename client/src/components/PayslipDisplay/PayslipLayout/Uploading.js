import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Card, Grid, Typography } from "@mui/material";

import { salarySlipData } from "../../../action/posts";
import ComboBox from "../../ComboBox/ComboBox";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TitlePopup from "./TitlePopup";

const Uploading = ({ posts, currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null); // Change to null
  const [title, setTitle] = useState(null);

  const [titleOpen, setTitleOpen] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Set selected file directly
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const togglePopup = () => {
    setTitleOpen(!titleOpen);
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
      <Grid item xs={12} md={12}>
        <Card
          sx={{
            padding: "2px",
            // "@media(max-Width:600px)": { width: "40vh", margin: "0px" },
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: { xs: "column", sm: "row" }, // this is the correct way
              justifyContent: "space-evenly",
              gap: "30px",
              padding: "30px",
            }}
          >
            <Grid>
              <ComboBox posts={posts} setCurrentId={setCurrentId} />
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginTop: "10px",
                  fontFamily: "Roboto",
                  color: "#16355d",
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
                  defaultValue={title}
                  onFocus={togglePopup}
                />

                {titleOpen && (
                  <TitlePopup setTitle={setTitle} setTitleOpen={setTitleOpen} />
                )}
                <input
                  style={{
                    marginLeft: "50px",
                    fontFamily: "Roboto",
                    color: "#16355d",
                  }}
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
      </Grid>
    </>
  );
};

export default Uploading;

// Delays in uploading file
