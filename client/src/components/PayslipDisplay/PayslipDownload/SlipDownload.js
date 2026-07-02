import React, { useMemo } from "react";
import {
  Typography,
  Card,
  Divider,
  Box,
  LinearProgress,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import CorporateImage from "../../../assets/salary.png";

const SlipDownload = ({
  posts,
  currentId,
  salary,
  isLoading,
  onDelete,
  deleteEntry,
  verify,
}) => {
  const handleDownload = async (slip) => {
    try {
      // Depending on how Mongo/Mongoose serializes Buffer,
      // slip.pdf can be either a Buffer or an object like { data: [...] }.
      const pdfValue = slip?.pdf;
      if (!pdfValue) throw new Error("PDF data not found in slip");

      const binaryDataBuffer = Array.isArray(pdfValue?.data)
        ? pdfValue.data
        : Array.isArray(pdfValue)
          ? pdfValue
          : pdfValue?.data
            ? pdfValue.data
            : pdfValue;

      const bufferArray = new Uint8Array(binaryDataBuffer).buffer;
      const blob = new Blob([bufferArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "salaryslip.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const matchedPosts = useMemo(() => {
    return posts.filter((post) => post._id === currentId);
  }, [posts, currentId]);
  console.log(verify);

  const filteredSalary = useMemo(() => {
    return salary.filter((slip) => currentId === slip.identify);
  }, [salary, currentId]);

  // const filteredSalary = useMemo(() => {
  //   return salary.filter((employee) => currentId === employee._id);
  // }, [salary, currentId]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",

        paddingTop: "10px",
        backgroundColor: "#f0f4f8",
      }}
    >
      {/* Employee Info */}
      <div>
        {Array.isArray(matchedPosts) ? (
          matchedPosts.map((post, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
                padding: "20px",
                width: "100%", // 👈 ensures full width available
              }}
            >
              <Typography
                align="center"
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  color: post?.employeeId ? "#16355d" : "red",
                }}
              >
                Employee Id :
                {post?.employeeId
                  ? post?.employeeId
                  : "Please complete your profile !!"}
              </Typography>
              <Typography
                align="center"
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  color: "#16355d",
                }}
              >
                Employee Name :
                {`${post?.firstName.charAt(0).toUpperCase()}${post?.firstName
                  .slice(1)
                  .toLowerCase()} ${post?.lastName
                  .charAt(0)
                  .toUpperCase()}${post?.lastName.slice(1).toLowerCase()}`}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography color="error">Error: post is not an array</Typography>
        )}
      </div>

      <Divider sx={{ borderWidth: "3px", bgcolor: "#336699" }} />

      {/* Loader */}
      {isLoading ? (
        <Box sx={{ marginTop: "100px" }}>
          <LinearProgress />
        </Box>
      ) : (
        <List
          sx={{
            width: "100%",
            maxWidth: "100%",
            bgcolor: "background.paper",
            padding: "10px",
          }}
        >
          {/* {salary
            .filter((slip) => currentId === slip.identify)
            .map((slip, index) => ( */}

          {filteredSalary.map((slip) => (
            // employee.slips.map((slip) =>
            <React.Fragment key={slip._id}>
              <ListItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: "22px",
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
                  mb: 2,
                  p: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(15,23,42,0.12)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <ListItemAvatar>
                    <Avatar
                      src={CorporateImage}
                      alt="Salary Slip"
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "18px",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ color: "#16355d", fontWeight: 600 }}>
                        {slip.title}
                      </Typography>
                    }
                    secondary="PDF Document"
                  />
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: "14px",
                      textTransform: "none",
                      px: 2,
                      color: "white",
                      background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                      boxShadow: "0 8px 20px rgba(37,99,235,0.3)",
                      "&:hover": {
                        background: "linear-gradient(135deg,#1d4ed8,#4338ca)",
                      },
                    }}
                    onClick={() => handleDownload(slip)}
                    startIcon={<FileDownloadIcon />}
                  >
                    Download
                  </Button>

                  {verify && (
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{
                        borderRadius: "14px",
                        textTransform: "none",
                        px: 2,
                        boxShadow: "0 8px 20px rgba(239,68,68,0.25)",
                      }}
                      onClick={() => deleteEntry(slip._id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
    </Card>
  );
};

export default SlipDownload;
