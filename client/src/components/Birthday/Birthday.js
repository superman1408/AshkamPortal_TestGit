/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography, Avatar, Container, Card } from "@mui/material";

import { getPosts, getEvents } from "../../action/posts";

import FormDialog from "./DialogBox/Dialog";
import Image from "../../assets/b1.png";
import "./style.css";

const Birthday = () => {
  const dispatch = useDispatch();
  const [evento, setEvento] = useState("");
  const posts = useSelector((state) => state.posts);
  // const event = useSelector((state) => state.event);
  const user = JSON.parse(localStorage.getItem("profile"));
  const role = user.result.role;
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;

  const detectSize = () => {
    setDimension((prevDimension) => ({
      ...prevDimension,
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []); // Empty dependency array to run effect only once when component mounts

  const event = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getEvents()).then(() => {
      if (event) {
        event.map((item) => {
          setEvento(item.dailyevent);
        });
      } else {
        setEvento("No hay eventos programados para hoy");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, evento, event]);

  // const isBirthdayToday = () => {
  //   posts.map((post) => {
  //     // console.log(post.firstName)
  //     let day = new Date(post.dob).getDate();
  //     let month = new Date(post.dob).getMonth() + 1;
  //     const currentDay = new Date().getDate();
  //     const currentMonth = new Date().getMonth() + 1;
  //     if (currentDay === day && currentMonth === month) {
  //     }
  //   });
  // };

  const birthdaysToday = posts.filter((post) => {
    const day = new Date(post.dob).getDate();
    const month = new Date(post.dob).getMonth() + 1;
    return currentDay === day && currentMonth === month;
  });

  // const [isVisible, setIsVisible] = useState(false);

  const verify = () => {
    if (user.result.role === "admin" || user.result.role === "manager") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Container
        sx={{
          display: "flex",
          marginTop: "10px",
          maxWidth: "500px",
          marginLeft: "20px",
          padding: "10px",
          // bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: "10px",
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
        }}
      >
        <Grid sx={{ display: "flex" }}>
          <div>
            {birthdaysToday.length === 0 ? (
              // eslint-disable-next-line jsx-a11y/no-distracting-elements
              <marquee
                direction="up"
                style={{ color: "#047681", fontFamily: "Roboto" }}
              >
                <strong style={{ color: "#e55d17", fontFamily: "Roboto" }}>
                  No Birthday Today!
                </strong>
                <br />
                <br />
                {/* There are no event today. <br /> */}
                Please check back tomorrow or try again later.
              </marquee>
            ) : (
              <div style={{ padding: "10px", width: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Roboto",
                    textAlign: "left",
                    color: "#16355d",
                  }}
                >
                  Happy Birthday
                </Typography>
                {birthdaysToday.map((post) => {
                  return (
                    <React.Fragment key={post.dob}>
                      <div style={{ display: "flex", marginTop: "5px" }}>
                        {/* <Card
                          elevation={15}
                          sx={{
                            display: "flex",
                            marginTop: "15px",
                            alignItems: "center",
                            width: "70%",
                          }}
                        > */}
                        <Typography>{`\u2022`}</Typography>
                        <Avatar
                          post={post}
                          sx={{
                            width: 31,
                            height: 30,
                            marginLeft: "20px",
                          }}
                          alt="user"
                          src={post.selectedFile}
                        />
                        <Typography
                          post={post}
                          variant="h6"
                          sx={{
                            marginLeft: "20px",
                            fontFamily: "Roboto",
                            fontSize: "18px",
                            color: "#e55d17",
                          }}
                        >
                          {post.firstName + " " + post.lastName}
                        </Typography>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            <div
              style={{
                display: "flex",
                marginTop: "10px",
                marginLeft: "10px",
                // backgroundColor: "#16355d",
              }}
            >
              {/* ..................................Event is being displayed from here onwards........................................................................ */}

              <marquee
                style={{
                  color: "#16355c",
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                }}
              >
                <div style={{ backgroundColor: "#f7f797" }}>{evento}</div>
              </marquee>
            </div>
          </div>
          <div
            style={{
              bgcolor: "#ecd0f5",
              float: "right",
            }}
          >
            {verify() === true && <FormDialog />}
            {/* <FormDialog /> */}
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default Birthday;
