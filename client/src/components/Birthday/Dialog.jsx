import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { dailyEvent } from "../../action/posts";
import { useParams } from "react-router-dom";

export default function FormDialog() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    dailyevent: "",
  });
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(id);

  

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  

  const handleClose = () => {
    setOpen(false);
  };

  



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(dailyEvent(formData));
    handleClose();
  };




  return (
    <>
      <div>
        <IconButton
          variant="outlined"
          onClick={handleClickOpen}
        >
          <MoreVertIcon sx={{color: "blue"}} />
        </IconButton>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set the event</DialogTitle>
        <DialogContent>
          <DialogContentText>Banner to display</DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="dailyevent"
              name="dailyevent"
              type="text"
              fullWidth
              variant="standard"
              value={formData.dailyevent}
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
}
