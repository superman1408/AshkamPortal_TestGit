import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadAttendanceFile } from "../../action/attendance";
import {
  Button,
  Typography,
  CircularProgress,
  Card,
  Box,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const AttendanceUpload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uploading, uploadResult, error } = useSelector(
    (state) => state.attendance
  );

  const [formData, setFormData] = useState(null);

  const handleFileChange = (e) => {
    setFormData(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!formData) return alert("Please select a file!");
    dispatch(uploadAttendanceFile(formData));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        background: "linear-gradient(145deg, #eef2f7, #ffffff)",
        minHeight: "100vh",
      }}
    >
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          alignSelf: "flex-start",
          marginBottom: 2,
          marginLeft: 2,
          color: "#16355d",
          textTransform: "none",
          "&:hover": { backgroundColor: "rgba(22,53,93,0.08)" },
        }}
      ></Button>

      {/* Upload Card */}
      <Card
        sx={{
          borderRadius: "20px",
          padding: "40px 32px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          border: "1px solid rgba(22,53,93,0.1)",
          background: "linear-gradient(145deg, #ffffff, #f5f8fb)",
          textAlign: "center",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Poppins, Roboto, sans-serif",
            fontWeight: 700,
            color: "#16355d",
            marginBottom: "6px",
          }}
        >
          Upload Attendance File
        </Typography>
        <Divider
          sx={{
            width: "60px",
            height: "4px",
            background: "linear-gradient(90deg, #16355d, #1f497d)",
            borderRadius: "4px",
            margin: "12px auto 24px",
          }}
        />

        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.95rem",
            color: "#5b6c8a",
            marginBottom: "24px",
          }}
        >
          Select your Excel sheet and upload to sync team attendance records.
        </Typography>

        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          style={{
            marginBottom: "20px",
            cursor: "pointer",
            border: "1px solid #d0d7e2",
            padding: "8px",
            borderRadius: "8px",
            width: "100%",
          }}
        />

        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={handleUpload}
          disabled={uploading}
          sx={{
            background: "linear-gradient(90deg, #16355d, #1f497d)",
            fontWeight: 600,
            borderRadius: "12px",
            width: "100%",
            padding: "12px",
            fontSize: "0.95rem",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(31,73,125,0.3)",
            "&:hover": {
              background: "linear-gradient(90deg, #1f497d, #2b5ca8)",
              boxShadow: "0 6px 16px rgba(31,73,125,0.4)",
            },
          }}
        >
          {uploading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Upload"
          )}
        </Button>

        {uploadResult && (
          <Typography
            sx={{
              marginTop: "20px",
              color: "green",
              fontWeight: 500,
              fontSize: "0.9rem",
            }}
          >
            {uploadResult.message}
          </Typography>
        )}

        {error && (
          <Typography
            sx={{
              marginTop: "20px",
              color: "red",
              fontWeight: 500,
              fontSize: "0.9rem",
            }}
          >
            {error}
          </Typography>
        )}

        <Typography
          sx={{
            marginTop: "24px",
            fontSize: "0.8rem",
            color: "#6b7a8f",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Expected columns: Employee ID, Date, In Time, Out Time, Status (30-day
          sheet)
        </Typography>
      </Card>
    </Box>
  );
};

export default AttendanceUpload;
