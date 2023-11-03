import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../action/posts";

import image from "../../assets/final.jpg";

import CurrentbirthdayPosts from "../Birthday/CurrentbirthdayPosts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  // const [maxWidth, setMaxWidth] =
  //   React.useState < DialogProps["maxWidth"] > "sm";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(`Message is sent by {result.user}`);
  };

  // const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
  //   setMaxWidth(
  //     // @ts-expect-error autofill of arbitrary value is not handled.
  //     event.target.value
  //   );
  // };

  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  // const UsFormatter = new Intl.DateTimeFormat("en-US");
  // const currentDate = UsFormatter.format(date);
  // const currentDate = UsFormatter.format(date);
  console.log("currentDay", currentDay);
  console.log("currentMonth", currentMonth);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Wish 
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundImage: `url(${image})`,
            backgroundrepeat: "no-repeat",
            backgroundSize: "cover",
          },
        }}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              // height: "50%",
              maxWidth: "500px", // Set your width here
            },
          },
          // backgroundImage: `url(${image})`,
          // backgroundRepeat: "no-repeat",
        }}
      >
        <DialogTitle>{"Send Your Best Wishes!!!!"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
          <div>
            {/* {posts.map((post) => {
              console.log(post.dob);

              let day = new Date(post.dob).getDate();
              let month = new Date(post.dob).getMonth() + 1;
              console.log(day);
              console.log(month);

              if (currentDay === day && currentMonth === month) {
                console.log(post.firstName, "'s birthday");
                return (
                  <Typography
                    post={post}
                    sx={{ marginLeft: "10px", fontWeight: "bold" }}
                  >
                    {post.email}
                  </Typography>
                );
              } else {
                console.log("No birthday");
              }
            })} */}
            <CurrentbirthdayPosts />
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Birthday Wishes"
            type="text"
            fullWidth
            variant="standard"
            sx={{ marginTop: "30px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Send</Button>
          {/* <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
