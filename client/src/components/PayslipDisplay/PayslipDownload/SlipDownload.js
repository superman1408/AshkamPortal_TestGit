import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalarySlipData } from "../../../action/posts";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CorporateImage from "../../../assets/salary.png";

const SlipDownload = ({ posts, currentId }) => {
  const dispatch = useDispatch();
  const salary = useSelector((state) => state.salary);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSalarySlipData());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

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

  return (
    <>
      <Card
        sx={{
          textAlign: "center",
          margin: "10px",
          "@media(max-Width:600px)": { width: "40vh", margin: "0px" },
        }}
      >
        <div>
          {Array.isArray(posts) ? (
            posts.map((post, index) => {
              if (post._id === currentId) {
                return (
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
                        color: post?.employeeId ? "#16355d" : "red", // Change the color based on the condition
                      }}
                    >
                      Employee Id :{" "}
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
                );
              }
            })
          ) : (
            <tr>
              <td colSpan="2">Error: post is not an array</td>
            </tr>
          )}
        </div>
        <Divider
          sx={{
            borderWidth: "3px",
            bgcolor: "#e55d17",
          }}
        />
        {isLoading ? (
          <Box sx={{ marginTop: "100px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* Map over the salary array and display a download button for the salary slip with the matching currentId */}
            {salary.map((slip, index) => {
              const matchPost = currentId === slip.identify;

              if (matchPost) {
                return (
                  <div key={index} style={{ margin: "20px 20px 20px 20px" }}>
                    <Card sx={{ maxWidth: 180, maxHeight: 280 }}>
                      {/* <CardActionArea> */}
                      <CardMedia
                        component="img"
                        height="140"
                        image={CorporateImage}
                        alt="Corporate Image"
                      />
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{
                            color: "#16355d",
                          }}
                        >
                          {slip.title}
                        </Typography>
                      </CardContent>
                      {/* </CardActionArea> */}
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
                );
              } else {
                return null;
              }
            })}
          </div>
        )}
      </Card>
    </>
  );
};

export default SlipDownload;
