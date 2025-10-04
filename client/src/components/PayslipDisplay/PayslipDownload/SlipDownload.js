import React, { useMemo } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Box,
  LinearProgress,
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CorporateImage from "../../../assets/salary.png";

const SlipDownload = ({ posts, currentId, salary, isLoading }) => {
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

  return (
    <>
      <Card
        sx={{
          textAlign: "center",
          margin: "10px",
          // "@media(max-Width:600px)": { width: "40vh", margin: "0px" },
        }}
      >
        <div>
          {Array.isArray(matchedPosts) ? (
            matchedPosts.map((post, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  gap: "20px",
                  padding: "20px",
                }}
              >
                <Typography
                  sx={{
                    margin: "auto 20px",
                    fontFamily: "Robota",
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
                  sx={{
                    margin: "auto 20px",
                    fontFamily: "Robota",
                    fontWeight: "bold",
                    color: "#16355d",
                  }}
                >
                  Employee Name :
                  {post?.firstName.charAt(0).toUpperCase() +
                    post?.firstName.slice(1).toLowerCase() +
                    " " +
                    post?.lastName.charAt(0).toUpperCase() +
                    post?.lastName.slice(1).toLowerCase()}
                </Typography>
              </div>
            ))
          ) : (
            <Typography>Error: post is not an array</Typography>
          )}
        </div>
        <Divider
          sx={{
            borderWidth: "3px",
            bgcolor: "#336699",
          }}
        />
        {isLoading ? (
          <Box sx={{ marginTop: "100px" }}>
            <LinearProgress thickness={1} />
          </Box>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {salary.map((slip, index) =>
              currentId === slip.identify ? (
                <div
                  key={index}
                  style={{
                    flex: "1 1 160px",
                    maxWidth: "180px",
                    margin: "10px",
                  }}
                >
                  <Card sx={{ maxWidth: 180, maxHeight: 280 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={CorporateImage}
                      alt="Corporate Image"
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography sx={{ color: "#16355d" }}>
                        {slip.title}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <button
                        style={{ fontFamily: "Roboto" }}
                        onClick={() => handleDownload(slip)}
                      >
                        Download <FileDownloadIcon />
                      </button>
                    </CardActions>
                  </Card>
                </div>
              ) : null
            )}
          </div>
        )}
      </Card>
    </>
  );
};

export default SlipDownload;
