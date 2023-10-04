import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  mainContainer: {
    display: "flex",

    "@media (max-width: 600px)": {
      flexDirection: "column",
      marginTop: "20px",
    },

    "@media (min-width: 600px)": {
      flexDirection: "row",
    },
  },
  dropDown: {
    width: "250px",
    height: "50px",
    borderRadius: "1px",
    padding: "0.5em 3.5em 0.5em 1em",
    font: "inherit",
  },
}));
