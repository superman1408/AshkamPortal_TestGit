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
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CorporateImage from "../../../assets/salary.png";

const SlipDownload = ({ posts, currentId }) => {
  const dispatch = useDispatch();
  const salary = useSelector((state) => state.salary);

  useEffect(() => {
    dispatch(getSalarySlipData());
  }, [dispatch, salary]);

  const handleDownload = async (slipId) => {
    try {
      const slip = salary.find((slip) => slip.identify === slipId);

      if (!slip) {
        throw new Error("Salary slip not found.");
      }

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
          "@media(max-Width:600px)": { margin: "10px", width: "40vh" },
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
        <Divider
          sx={{
            borderWidth: "3px",
            bgcolor: "#e55d17",
          }}
        />
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
                        onClick={() => handleDownload(slip.identify)}
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
