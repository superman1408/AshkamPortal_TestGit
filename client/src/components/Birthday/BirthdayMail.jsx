import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// import { TransitionProps } from "@mui/material/transitions";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../action/posts";

import image from "../../assets/Balloon.png";

import CurrentbirthdayPosts from "../Birthday/CurrentbirthdayPosts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(`Message is sent by {result.user}`);
  };

  // eslint-disable-next-line no-unused-vars
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  const hasEvents = posts.length > 0;

  return (
    <div>
      {hasEvents && (
        <Button
          variant="contained"
          sx={{ marginLeft: "150px" }}
          onClick={handleClickOpen}
        >
          Wish
        </Button>
      )}

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
          <div>
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
          <Button variant="contained" style={{color: 'black', backgroundColor: 'pink'}} onClick={handleClose}>Send</Button>
          {/* <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
