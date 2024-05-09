// import { } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalarySlipData } from "../../../action/posts";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CorporateImage from "../../../assets/salary.png";

const SlipDownload = ({ posts, currentId }) => {
  const dispatch = useDispatch();
  const salary = useSelector((state) => state.salary);

  useEffect(() => {
    dispatch(getSalarySlipData());
  }, [dispatch, salary]);

  const handleDownload = async () => {
    console.log("button is working");
    try {
      const slip = salary.find((slip) => slip.identify === currentId);
      if (!slip) {
        throw new Error("Salary slip not found.");
      }
      const binaryDataBuffer = slip.pdf.data;
      const bufferArray = new Uint8Array(binaryDataBuffer).buffer;

      // Step 4: Create a Blob from the ArrayBuffer, specifying the file type (MIME type)
      const blob = new Blob([bufferArray], {
        type: "pdf", // Specify the MIME type of the file
      });

      // Step 5: Create a download link for the Blob
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Step 6: Set the download attribute and trigger the download
      a.download = "salaryslip.pdf";
      document.body.appendChild(a);
      a.click();

      // Step 7: Clean up the temporary URL
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Card sx={{ textAlign: "center", margin: "50px 80px 50px 100px" }}>
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
                      }}
                    >
                      Employee Id : {post?.employeeId}
                    </Typography>
                    <Typography
                      sx={{
                        margin: "auto 20px",
                        fontFamily: "Robota",
                        fontWeight: "bold",
                      }}
                    >
                      Employee Name : {post?.firstName + " " + post?.lastName}
                    </Typography>
                    {/* </div> */}
                  </div>
                );
              }
            })
          ) : (
            <tr>
              <td colSpan="2">Error: posts is not an array</td>
            </tr>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
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
                      <Typography>{slip.title}</Typography>
                    </CardContent>
                    {/* </CardActionArea> */}
                    <CardActions sx={{ justifyContent: "center" }}>
                      <button
                        style={{ fontFamily: "Roboto" }}
                        onClick={handleDownload}
                      >
                        download <FileDownloadIcon />
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
        {/*  */}
      </Card>
    </>
  );
};

export default SlipDownload;

// when download button is clicked it will download pdf files which are stored mongodb through API in file type buffer how to do it
