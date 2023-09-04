import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  mainContainer: {
    "@media (max-width: 600px)": {
      flexDirection: "column",
    },

    "@media (min-width: 600px)": {
      flexDirection: "row",
    },
  },

  container: {
    width: "100%",
    background: "white",
    padding: theme.spacing(3),
  },

  cardMedia: {
    padding: "3px",
    "@media (max-width: 600px)": {
      height: "400px",
      width: "400px",
    },

    "@media (min-width: 600px)": {
      height: "500px",
      width: "600px",
    },
  },

  //   @media only screen and (max-width: 600px) {
  //     .container {background: red;}
  //   }

  //   /* Small devices (portrait tablets and large phones, 600px and up) */
  //   @media only screen and (min-width: 600px) {
  //     .container {background: green;}
  //   }
  header: {
    textAlign: "center",
    // background: "purple",
    color: "black",
    marginLeft: "50px",
    marginRight: "50px",
  },

  form: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    borderRadius: "20px",

    margin: "30px 50px",
  },

  buttonContainer: {
    marginLeft: "2px",
  },

  reactplayer:{
    "@media (max-width: 600px)": {
      height: "200px",
      width: "300px",
    },

    "@media (min-width: 600px)": {
      height: "400px",
      width: "800px",
    },
  }
}));
