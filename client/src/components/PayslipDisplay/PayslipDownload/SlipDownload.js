// import { } from "bootstrap";
import React, { useEffect } from "react";
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
                    {/* <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                        width: "100vh",
                        padding: "20px",
                      }} // added gap property
                    > */}
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
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={CorporateImage}
                        alt="Corporate Image"
                      />
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography>{slip.title}</Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <button style={{ fontFamily: "Roboto" }}>
                        download <FileDownloadIcon />
                      </button>
                    </CardActions>
                  </Card>
                </div>
              );
            } else {
              return null; // If no match is found, skip rendering
            }
          })}
        </div>
        {/*  */}
      </Card>
    </>
  );
};

export default SlipDownload;
