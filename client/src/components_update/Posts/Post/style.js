import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  card: {
    // padding: theme.spacing(2),
    marginTop: "100px",
    backgroundColor: "#E0FFFF",
    // borderRadius: "10px",
    boxShadow: " 0px 0px 5px rgba(0,0,0,0.75)",
    width: "650px",
    // marginLeft: "350px",
  },

  header: {
    height: "30px",
    width: "600px",
    backgroundColor: "whitesmoke",
    borderRadius: "30px",
    padding: "5px",
    textAlign: "center",
    marginLeft: "10px",
  },

  form_container: {
    marginTop: "50px",
    marginLeft: "30px",
  },

  employee_profilePic: {
    backgroundColor: "whitesmoke",
    border: "1px solid black",
    width: "150px",
    height: "100px",
    float: "right",
  },

  profilePic__label: {
    width: "150px",
    height: "100px",
  },

  Avatar: {
    alignItems: "center",
  },

  // Edit: {
  //   color: theme.palette.primary.main,
  //   textAlign: "center",
  //   marginLeft: "200px",
  //   backgroundColor: "white",
  //   height: "30px",
  //   width: "70px",
  //   border: "1px solid black",
  //   borderRadius: "5px",
  //   padding: "3px",
  // },

  // Delete: {
  //   color: theme.palette.primary.main,
  //   textAlign: "center",
  //   marginLeft: "200px",
  //   backgroundColor: "white",
  //   height: "30px",
  //   width: "70px",
  //   border: "1px solid black",
  //   borderRadius: "5px",
  //   padding: "3px",
  // },

  button_Container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: "40px",
  },

  // submit: {
  //   marginLeft: "200px",
  // },

  profilePic: {
    padding: "2px",
    border: "1px dotted black",
    width: "150px",
    height: "100px",
    float: "right",
  },
}));
