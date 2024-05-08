// import { } from "bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalarySlipData } from "../../../action/posts";
import { Typography, Button, Card } from "@mui/material";

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
          <table>
            <tbody>
              {Array.isArray(posts) ? (
                posts.map((post, index) => {
                  if (post._id === currentId) {
                    return (
                      <tr key={index}>
                        <th>Employee Name</th>
                        <td>{post?.firstName}</td>
                      </tr>
                    );
                  }
                })
              ) : (
                <tr>
                  <td colSpan="2">Error: posts is not an array</td>
                </tr>
              )}
              {Array.isArray(salary) ? (
                salary.map((salar, index) => {
                  // if (post._id === currentId) {
                  return (
                    <tr key={index}>
                      <th>Title</th>
                      <td>{salar?.title}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="2">Error: posts is not an array</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
};

export default SlipDownload;
