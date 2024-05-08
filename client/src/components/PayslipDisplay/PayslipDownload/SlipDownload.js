// import { } from "bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalarySlipData } from "../../../action/posts";
import { Typography, Button, Card } from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";

const SlipDownload = ({ posts, currentId }) => {
  const dispatch = useDispatch();
  const salary = useSelector((state) => state.salary);

  useEffect(() => {
    dispatch(getSalarySlipData());
  }, [dispatch, salary]);

  return (
    <>
      <div>
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "50px 0px 50px 100px",
          }}
        >
          <div>
            {Array.isArray(posts) ? (
              posts.map((post, index) => {
                if (post._id === currentId) {
                  return (
                    <div key={index}>
                      <Card>
                        <Typography>Employee Name</Typography>
                        <Typography>{post?.firstName}</Typography>
                      </Card>
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
          <div></div>
          <table>
            <tbody>
              {salary.map((slip, index) => {
                const matchPost = currentId === slip.identify;

                if (matchPost) {
                  return (
                    <tr key={index}>
                      <th>Title</th>
                      <td>{slip.title}</td>

                      <button style={{ fontFamily: "Roboto" }}>
                        download <FileDownloadIcon />
                      </button>
                    </tr>

                    // <Card>
                    //   <Typography>True</Typography>
                    // </Card>
                  );
                } else {
                  return null; // If no match is found, skip rendering
                }
              })}
            </tbody>
          </table>
        </Card>
        {/*  */}
      </div>
    </>
  );
};

export default SlipDownload;
