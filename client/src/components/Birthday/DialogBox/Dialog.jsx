import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";

import { dailyEvent } from "../../../action/posts";

const FormDialog = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    dailyevent: "",
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    dispatch(dailyEvent(formData)).then(() => {
      // console.log("handleSubmit", formData);
      alert("Successfully  Added!");
      handleClose();
      window.location.reload();
    });
  };

  return (
    <>
      <div style={{ float: "right" }}>
        <IconButton variant="outlined" onClick={handleClickOpen}>
          <CampaignIcon sx={{ color: "#16365d", fontSize: "30px" }} />
        </IconButton>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set the event</DialogTitle>
        <DialogContent>
          <DialogContentText>Banner to display</DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              // autoFocus
              required
              margin="dense"
              id="dailyevent"
              name="dailyevent"
              type="text"
              fullWidth
              variant="standard"
              // value={formData.dailyevent}
              onChange={(e) =>
                setFormData({ ...formData, dailyevent: e.target.value })
              }
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormDialog;
