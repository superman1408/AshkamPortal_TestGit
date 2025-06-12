import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPost, updateStatus } from "../../../../action/posts";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Avatar, Grid } from "@mui/material";

import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

const Message = ({ post, currentId }) => {
  const [activeStatus, setActiveStatus] = useState({ status: "pending" });
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  let array = [];

  const updateArray = async (post) => {
    const array = [];
    for (let index = 0; index < post.recipient.length; index++) {
      await array.push({
        emailTo: post.recipient[index],
        subject: post.subject[index],
        message: post.requiredMessage[index],
        status: post.status[index],
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading === true) {
      dispatch(getPost(currentId));
      updateArray();
      setLoading(false);
    } else {
      console.log("there is  no change in the data");
      // updateArray();
    }
  }, [currentId, dispatch, isLoading]);

  //  ----------------- handle accept----------------------
  const handleAccept = () => {
    if (activeStatus.status === "pending") {
      setActiveStatus({ ...activeStatus, status: "Accepted" });
      dispatch(updateStatus(post._id, { status: "Accepted" }));
    } else {
      console.log("Status already set");
    }
    setActiveStatus({ ...activeStatus, status: "Accepted" });
    navigate("/home");
  };

  // ---------------handle reject ---------------------------

  const handleReject = () => {
    if (activeStatus.status === "pending") {
      setActiveStatus({ ...activeStatus, status: "Rejected" });
      dispatch(updateStatus(post._id, { status: "Rejected" }));
    } else {
      console.log("Status already set");
    }
    setActiveStatus({ ...activeStatus, status: "Rejected" });
    navigate("/home");
  };

  const verifyTheRole = () => {
    if (user.result.role === "admin" || user.result.role === "manager") {
      return true;
    } else {
      return false;
    }
  };

  for (let index = 0; index < post.recipient.length; index++) {
    array.push({
      emailTo: post.recipient[index],
      subject: post.subject[index],
      message: post.requiredMessage[index],
      status: post.status[index],
    });
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    currentId && (
      <Grid container justifyContent="center">
        {array.map((item, index) => (
          <Card
            key={index}
            elevation={10}
            sx={{
              padding: "10px",
              margin: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              bgcolor: "white",
              width: "auto",
              borderRadius: "12px",

              "@media (maxWidth: 600px)": {
                width: "300px",
              },
            }}
          >
            <div key={post.login} className="translate-x-[42%]">
              <Typography
                sx={{
                  textAlign: "center",
                  padding: "5px",
                  // fontWeight: "bold",
                  fontFamily: "Roboto",
                  // fontWeight: "bold",
                  color: "#16355c",
                }}
              >
                {item.subject}
              </Typography>
            </div>
            <div className="grid grid-rows-2 justify-between items-center">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  key={post.selectedFile}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                  }}
                >
                  <Avatar
                    alt="avatar"
                    src={post.selectedFile}
                    size="xs"
                    withBorder="true"
                    className="p-0.5"
                  />
                  <Typography
                    sx={{
                      marginLeft: "10px",
                      marginTop: "5px",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                      color: "#16355c",
                    }}
                  >
                    {post?.firstName.charAt(0).toUpperCase() +
                      post?.firstName.slice(1).toLowerCase() +
                      " " +
                      post?.lastName.charAt(0).toUpperCase() +
                      post?.lastName.slice(1).toLowerCase()}
                  </Typography>
                </div>
                {item.status ? (
                  <Typography
                    sx={{
                      marginTop: "5px",
                      float: "right",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                      color: "#16355c",
                    }}
                  >
                    Status :{item.status}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      marginTop: "5px",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                      color: "#1aba7d",
                    }}
                  >
                    Status : Pending
                  </Typography>
                )}
              </div>
              <div
                key={post.punching}
                style={{
                  // border: "2px solid #e55d17",
                  padding: "2px",
                  marginTop: "10px",
                }}
              >
                <textarea
                  style={{
                    margin: "2px",
                    // resize: "none",
                    height: "120px",
                    width: windowWidth <= 600 ? "200px" : "580px",
                    backgroundColor: "white",
                  }}
                  defaultValue={item.message}
                ></textarea>
              </div>
              <div
                key={post._id}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "10px",
                }}
              >
                {item.status?.toLowerCase() === "pending" && verifyTheRole() ? (
                  <>
                    <button
                      style={{ fontFamily: "Roboto" }}
                      variant="contained"
                      onClick={handleAccept}
                    >
                      <CheckSharpIcon />
                      Accept
                    </button>
                    <button
                      style={{ fontFamily: "Roboto" }}
                      variant="contained"
                      onClick={handleReject}
                    >
                      <ClearSharpIcon />
                      Reject
                    </button>
                  </>
                ) : (
                  <div>Please check your status above..!!</div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </Grid>
    )
  );
};

export default Message;
