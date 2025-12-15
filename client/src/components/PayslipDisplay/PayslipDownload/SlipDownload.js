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
      const binaryDataBuffer = slip.pdf.data;
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

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        // minHeight: "100vh",
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
                gap: "20px",
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
          {salary
            .filter((slip) => currentId === slip.identify)
            .map((slip, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 2,
                    boxShadow: 1,
                    mb: 1,
                    p: 2,
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <ListItemAvatar>
                      <Avatar
                        src={CorporateImage}
                        alt="Salary Slip"
                        sx={{ width: 56, height: 56 }}
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
                      color="primary"
                      size="small"
                      onClick={() => handleDownload(slip)}
                      startIcon={<FileDownloadIcon />}
                    >
                      Download
                    </Button>

                    {verify && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
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
