import React, { useState } from "react";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

const AvatarUpload = ({ postData, setPostData }) => {
  const [preview, setPreview] = useState(postData.selectedFile || "");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setPostData({ ...postData, selectedFile: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        position: "relative",
        width: 120,
        height: 120,
        borderRadius: "50%",
        overflow: "hidden",
        cursor: "pointer",
        border: isDragActive ? "2px dashed #16355d" : "2px dashed #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f9f9f9",
        mx: "auto",
      }}
    >
      <input {...getInputProps()} />
      {preview ? (
        <Avatar
          src={preview}
          alt="Profile"
          sx={{ width: "100%", height: "100%" }}
        />
      ) : (
        <Typography textAlign="center" fontSize={12} color="grey.500">
          Drag & Drop
          <br />
          or Click
        </Typography>
      )}
      <IconButton
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          bgcolor: "rgba(0,0,0,0.6)",
          color: "#fff",
          width: 30,
          height: 30,
          "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
        }}
      >
        <CameraAlt fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default AvatarUpload;
