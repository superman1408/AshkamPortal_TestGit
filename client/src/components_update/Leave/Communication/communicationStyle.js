import { makeStyles } from "@material-ui/styles";
export default makeStyles(() => ({
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  topPane: {
    width: "30%",
  },
  bottomPane: {
    width: "70%",
  },
}));
