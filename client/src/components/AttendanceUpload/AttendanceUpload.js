import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadAttendanceFile } from "../../action/attendance";
import { Button, Typography, CircularProgress } from "@mui/material";

const AttendanceUpload = () => {
  const dispatch = useDispatch();
  const { uploading, uploadResult, error } = useSelector(
    (state) => state.attendance
  );

  const [formData, setFormData] = useState(null);

  const handleFileChange = (e) => {
    setFormData(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!formData) return alert("Please select a file!");
    dispatch(uploadAttendanceFile(formData)); // formData = selected file
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Typography variant="h6">Upload Attendance Excel</Typography>

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileChange}
        style={{ marginTop: 20 }}
      />

      <div style={{ marginTop: 20 }}>
        <Button variant="contained" onClick={handleUpload} disabled={uploading}>
          {uploading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </div>

      {uploadResult && (
        <Typography style={{ marginTop: 20, color: "green" }}>
          {uploadResult.message}
        </Typography>
      )}

      {error && (
        <Typography style={{ marginTop: 20, color: "red" }}>{error}</Typography>
      )}

      <Typography style={{ marginTop: 10, fontSize: 12 }}>
        Expected columns: Employee ID, Date, In Time, Out Time, Status (30-day
        sheet)
      </Typography>
    </div>
  );
};

export default AttendanceUpload;
