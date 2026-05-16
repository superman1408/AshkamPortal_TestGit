import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Grid, Typography, Box, Button, TextField } from "@mui/material";
import { salarySlipData } from "../../../action/posts";
import ComboBox from "../../ComboBox/ComboBox";
// import ComboBox from "./ComboBox";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TitlePopup from "./TitlePopup";
import LoadingSpinner from "../../ReactSpinner/reactSpinner";

const Uploading = ({ posts, currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleOpen, setTitleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Auto Preview
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const togglePopup = () => setTitleOpen(!titleOpen);

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (currentId && selectedFile) {
      const MAX_FILE_SIZE_MB = 5;
      const fileSizeInMB = selectedFile.size / (1024 * 1024);

      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        alert(
          `⚠️ File size exceeds ${MAX_FILE_SIZE_MB} MB. Please upload a smaller file.`,
        );
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("pdf", selectedFile);
      formData.append("title", title);

      try {
        await dispatch(
          salarySlipData(currentId, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          }),
        );

        alert("✅ Salary slip uploaded successfully.");
        setIsSubmitting(false);
        // window.location.reload();
      } catch (err) {
        console.log(err);
        setIsSubmitting(false);
      }
    } else {
      console.log("Current ID or file not set");
      setIsSubmitting(false);
    }
  };

  return (
    <Grid item xs={12}>
      <Card sx={{ p: 3, maxWidth: 900, margin: "auto" }}>
        <Grid container spacing={3} alignItems="center">
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* ComboBox Selection */}
            <Grid item xs={12} md={4}>
              <ComboBox posts={posts} setCurrentId={setCurrentId} />
            </Grid>

            {/* File Upload Section */}
            <Grid item xs={12} md={5}>
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems="center"
                gap={2}
              >
                {/* Title Input */}
                <TextField
                  label="Enter Title"
                  value={title || ""}
                  onChange={handleTitleChange}
                  onFocus={togglePopup}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    readOnly: true, // disables typing
                  }}
                  sx={{ flex: 1 }}
                />
                {titleOpen && (
                  <TitlePopup setTitle={setTitle} setTitleOpen={setTitleOpen} />
                )}

                {/* File Input */}
                <Button
                  variant="contained"
                  component="label"
                  sx={{ backgroundColor: "#16355d" }}
                >
                  Add File
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept=".pdf"
                  />
                </Button>
              </Box>
            </Grid>

            {/* Upload Button */}
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={isSubmitting}
                sx={{
                  borderRadius: "14px",
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                  boxShadow: "0 8px 25px rgba(37,99,235,0.35)",
                  "&:hover": {
                    background: "linear-gradient(135deg,#1d4ed8,#4338ca)",
                  },
                }}
              >
                {isSubmitting ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    Uploading <LoadingSpinner size={16} color="#fff" />
                  </Box>
                ) : (
                  <>
                    Upload <FileUploadIcon sx={{ ml: 1 }} />
                  </>
                )}
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              margin: "0 auto",
            }}
          >
            {/* Modern File Preview Section */}
            {selectedFile && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    mt: 3,
                    width: "100%",
                    borderRadius: "24px",
                    overflow: "hidden",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(245,247,250,0.92))",
                    border: "1px solid rgba(255,255,255,0.4)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 16px 50px rgba(15,23,42,0.12)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 2,
                      p: 1,
                    }}
                  >
                    {/* Left Section */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flex: 1,
                        minWidth: "250px",
                      }}
                    >
                      {/* File Icon */}
                      <Box
                        sx={{
                          width: 58,
                          height: 58,
                          borderRadius: "18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                          color: "#fff",
                          fontSize: "24px",
                          boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
                        }}
                      >
                        📄
                      </Box>

                      {/* File Details */}
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: "#16355d",
                            fontSize: "15px",
                            mb: 0.5,
                          }}
                        >
                          File Added Successfully
                        </Typography>

                        <Typography
                          sx={{
                            color: "#64748b",
                            fontSize: "13px",
                            wordBreak: "break-word",
                            maxWidth: "320px",
                          }}
                        >
                          {selectedFile.name}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.5,
                            fontSize: "12px",
                            color: "#94a3b8",
                          }}
                        >
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </Typography>
                      </Box>
                    </Box>

                    {/* Right Section */}
                    <Button
                      variant="contained"
                      onClick={() =>
                        window.open(URL.createObjectURL(selectedFile), "_blank")
                      }
                      sx={{
                        borderRadius: "14px",
                        textTransform: "none",
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                        boxShadow: "0 8px 25px rgba(37,99,235,0.35)",
                        "&:hover": {
                          background: "linear-gradient(135deg,#1d4ed8,#4338ca)",
                        },
                      }}
                    >
                      Preview File
                    </Button>
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Uploading;
