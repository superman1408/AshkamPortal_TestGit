import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPost, updateStatus } from "../../../../action/posts";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, Grid, Typography, Avatar } from "@mui/material";

const Message = ({ post, currentId }) => {
  const [activeStatus, setActiveStatus] = useState({ status: "pending" });
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // useEffect(() => {
  //   if (post) {
  //     dispatch(getPost(currentId));
  //     // updateArray(post);
  //   }
  // }, []);

  useEffect(() => {
    if (isLoading === true) {
      dispatch(getPost(currentId));
      updateArray();
      console.log("useEffect is running...!!!");
      console.log("3");
      setLoading(false);
    } else {
      console.log("3 is there");
      // updateArray();
    }
  }, [isLoading]);

  //  ----------------- handle accept----------------------
  const handleAccept = () => {
    console.log(activeStatus.status);
    // e.preventDefault();
    if (activeStatus.status === "pending") {
      setActiveStatus({ ...activeStatus, status: "Accepted" });
      dispatch(updateStatus(post._id, { status: "Accepted" }));
      // navigate('/');
      // updateArray();
      // setLoading(true);
    } else {
      console.log("Status already set");
    }
    setActiveStatus({ ...activeStatus, status: "Accepted" });
    console.log("4");
    navigate("/");
  };

  // ---------------handle reject ---------------------------

  const handleReject = () => {
    console.log(activeStatus.status);
    // e.preventDefault();
    if (activeStatus.status === "pending") {
      setActiveStatus({ ...activeStatus, status: "Rejected" });
      dispatch(updateStatus(post._id, { status: "Rejected" }));
      // navigate('/');
      // updateArray();
      // setLoading(true);
    } else {
      console.log("Status already set");
    }
    setActiveStatus({ ...activeStatus, status: "Rejected" });
    console.log("5");
    navigate("/");
  };

  for (let index = 0; index < post.recipient.length; index++) {
    array.push({
      emailTo: post.recipient[index],
      subject: post.subject[index],
      message: post.requiredMessage[index],
      status: post.status[index],
    });
  }

  // console.log(array);

  return isLoading ? (
    <CircularProgress />
  ) : (
    currentId && (
      <div>
        {array.map((item) => (
          <Card
            elevation={10}
            sx={{
              padding: "5px",
              width: "70%",
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              bgcolor: "#cbe3f5",
            }}
          >
            <div key={post.login} className="translate-x-[42%]">
              <Typography
                variant="h6"
                sx={{ textAlign: "center", padding: "5px", fontWeight: "bold" }}
              >
                {item.subject}
              </Typography>
            </div>
            <div className="grid grid-rows-2 justify-between items-center">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div key={post.contact} style={{ display: "flex" }}>
                  <Avatar
                    alt="avatar"
                    src={post.selectedFile}
                    size="xs"
                    withborder={true}
                    className="p-0.5"
                  />
                  <Typography sx={{ margin: "5px 5px" }}>
                    {post.employeeName}
                  </Typography>
                </div>
                {post.status ? (
                  <div key={post.department} className="flex flex-row">
                    <Typography sx={{ marginTop: "10px" }}>
                      Status :{item.status}
                    </Typography>
                  </div>
                ) : (
                  <div key={post.email} className="flex flex-col">
                    <Typography sx={{ marginTop: "10px" }}>
                      Status : Pending
                    </Typography>
                  </div>
                )}
              </div>
              <div
                key={post.punching}
                style={{
                  border: "2px solid black",
                  padding: "2px",
                  marginTop: "10px",
                }}
              >
                <Typography sx={{ padding: "10px", bgcolor: "white" }}>
                  {item.message}
                </Typography>
              </div>
              <div
                key={post._id}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" onClick={handleAccept}>
                  Accept
                </Button>
                <Button variant="contained" onClick={handleReject}>
                  Reject
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  );
};

export default Message;
