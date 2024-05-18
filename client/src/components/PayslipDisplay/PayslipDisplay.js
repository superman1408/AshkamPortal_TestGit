import React, { useEffect, useState } from "react";
import Uploading from "./PayslipLayout/Uploading";
import SlipDownload from "./PayslipDownload/SlipDownload";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Box, Grid } from "@mui/material";

import { getPosts } from "../../action/posts";
import { useParams } from "react-router-dom";
import Panel from "../Panel/Panel";

const PayslipDisplay = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  // const role = user.result.department;

  const [isLoading, setIsLoading] = useState(true);
  const verify = () => {
    try {
      if (
        // user.result.role === "admin" ||
        (user.result.department.toLowerCase() === "human resource" &&
          user.result.role === "manager") ||
        user.result.role === "admin"
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [currentId, setCurrentId] = useState(id);
  const [post, setPost] = useState();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (posts) {
      dispatch(getPosts());

      posts.map((post) => {
        if (post._id === currentId) {
          setPost(post);
        }
      });
    }

    if (isLoading === true) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [dispatch, currentId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // "@media (max-width: 600px)": {
        //   flexDirection: "row",
        //   // width: "50%",
        // },
      }}
    >
      <div>
        <strong
          style={{
            color: "#16355d",
            marginLeft: "50px",
            fontFamily: "Roboto",
            fontSize: "30px",
          }}
        >
          Salary Slip
        </strong>
      </div>
      <Grid
        sx={{
          display: "flex",
          marginTop: "20px",
          "@media(max-Width:600px)": { flexDirection: "column" },
        }}
      >
        <Grid>
          <Panel />
        </Grid>
        <Grid>
          {verify() === true && (
            <div>
              <Uploading
                posts={posts}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </div>
          )}

          <Grid>
            <SlipDownload posts={posts} currentId={currentId} />
          </Grid>
          {/* )} */}
        </Grid>
      </Grid>
    </div>
  );
};

export default PayslipDisplay;
