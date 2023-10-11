import { makeStyles } from "@mui/material";
import { green } from "@mui/material/colors";

export default makeStyles((theme) => ({
  paper: {
    padding: "10px",
  },
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up("lg")]: {
      backgroundColor: green[500],
    },
  },
}));
