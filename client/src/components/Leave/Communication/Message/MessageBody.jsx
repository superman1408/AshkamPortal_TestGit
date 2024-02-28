import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPost, updateStatus } from "../../../../action/posts";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography, Avatar } from "@mui/material";

import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

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

  // const color = () =>  {item.status === "Accepted" ? (return('green') : return('red')) }
  // // console.log(array);

  console.log(currentId);

  return (
    currentId && (
      <div>
        {" "}
        <div style={{ width: "500", height: "600" }}>
          {array.map((item, index) => (
            <Card
              key={index}
              elevation={10}
              sx={{
                padding: "15px",
                width: "auto",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                bgcolor: "smokewhite",
                borderRadius:"15px",
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div key={post.selectedFile} style={{ display: "flex", flexDirection: "row", alignContent:"center" }}>
                    <Avatar
                      alt="avatar"
                      src={post.selectedFile}
                      size="xs"
                      withborder="true"
                      className="p-0.5"
                    />
                    <Typography sx={{marginLeft: "15px", marginTop: "5px", fontFamily: "Roboto", fontWeight: "bold",color: "#16355c"}}>
                      {post.firstName + " " + post.lastName}
                    </Typography>
                  </div>
                  {item.status ? (
                    <Typography sx={{ marginTop: "5px", float: "right", fontFamily: "Roboto", fontWeight: "bold",color: "#16355c" }}>
                      Status :{item.status}
                    </Typography>
                  ) : (
                    <Typography sx={{ marginTop: "5px", fontFamily: "Roboto", fontWeight: "bold",color: "#16355c" }}>
                      Status : Pending
                    </Typography>
                  )}
                </div>
                <div
                  key={post.punching}
                  style={{
                    border: "2px solid #e55d17",
                    padding: "2px",
                    marginTop: "10px",
                  }}
                >
                  <Typography sx={{ padding: "10px", bgcolor: "white", fontFamily: "Roboto", fontWeight: "bold",color: "#16355c" }}>
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
                  <Button sx={{fontFamily: "Roboto"}} variant="contained" onClick={handleAccept}>
                    <CheckSharpIcon />
                    Accept
                  </Button>
                  <Button sx={{fontFamily: "Roboto"}} variant="contained" onClick={handleReject}>
                    <ClearSharpIcon />
                    Reject
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  );
};

export default Message;
