import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { TextField, Typography } from "@mui/material";
import image from "../../assets/final.jpg";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
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
  };

  // const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
  //   setMaxWidth(
  //     // @ts-expect-error autofill of arbitrary value is not handled.
  //     event.target.value
  //   );
  // };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Wish Him
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
              height: "50%",
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
          <Typography>tira@gmail.com</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Birthday Wishes"
            type="text"
            fullWidth
            variant="standard"
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
