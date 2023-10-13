import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  container: {
    // display: "flex",
    backgroundColor:'black',
    // marginTop: "2px",
    // paddingRight: "10px",

    "@media (max-width: 600px)": {
      flexDirection: "column",
      marginTop: "20px",
    },

    "@media (min-width: 600px)": {
      flexDirection: "row",
    },
  },
}));
