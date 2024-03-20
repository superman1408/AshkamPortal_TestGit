import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPost, updateStatus } from "../../../../action/posts";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography, Avatar } from "@mui/material";

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
      console.log("useEffect is running...!!!");
      console.log("currentId", currentId);
      setLoading(false);
    } else {
      console.log("3 is there");
      // updateArray();
    }
  }, [currentId, dispatch, isLoading]);

  //  ----------------- handle accept----------------------
  const handleAccept = () => {
    console.log(activeStatus.status);
    // e.preventDefault();
    if (activeStatus.status === "pending") {
      setActiveStatus({ ...activeStatus, status: "Accepted" });
      dispatch(updateStatus(post._id, { status: "Accepted" }));
    } else {
      console.log("Status already set");
    }
    setActiveStatus({ ...activeStatus, status: "Accepted" });
    console.log("4");
    navigate("/home");
  };

  // ---------------handle reject ---------------------------

  const handleReject = () => {
    console.log(activeStatus.status);
    // e.preventDefault();
    if (activeStatus.status === "pending") {
      setActiveStatus({ ...activeStatus, status: "Rejected" });
      dispatch(updateStatus(post._id, { status: "Rejected" }));
    } else {
      console.log("Status already set");
    }
    setActiveStatus({ ...activeStatus, status: "Rejected" });
    console.log("5");
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

  console.log(currentId);

  return (
    currentId && (
      <div>
        {array.map((item, index) => (
          <Card
            key={index}
            elevation={10}
            sx={{
              padding: "15px",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              bgcolor: "white",
              width: "110vh",
              borderRadius: "12px",

              "@media (max-width: 600px)": {
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
                    withborder="true"
                    className="p-0.5"
                  />
                  <Typography
                    sx={{
                      marginLeft: "15px",
                      marginTop: "5px",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                      color: "#16355c",
                    }}
                  >
                    {post.firstName + " " + post.lastName}
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
                      color: "#16355c",
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
                    resize: "none",
                    height: "120px",
                    width: "600px",
                    backgroundColor: "white",
                  }}
                >
                  {item.message}
                </textarea>
              </div>
              <div
                key={post._id}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "10px",
                }}
              >
                {verifyTheRole() ? (
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
      </div>
    )
  );
};

export default Message;
