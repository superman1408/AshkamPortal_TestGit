import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  typography: {
    alignItems: "center",
    // marginLeft: "160px",
    marginBottom: "30px",
  },
  paper: {
    // padding: theme.spacing(5),
    // borderRadius: "10px",
    // boxShadow: "0px 0px 5px 5px rgba(0,0,0,0.50)",
    // marginTop: "50px",
    // width: "500px",
    // height: "700px",
    // marginLeft: "400px",
    // justifyContent: "center space-between",
  },
  form_style: {
    padding: "15px",
    display: "flex",
    flexWrap: "wrap",
    // flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
    borderRadius: "10px",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: { marginLeft: "200px" },

  //   form{
  //     background-color: white;
  //     border-radius: 5px;
  //     width: 550px;
  //     margin: 20px auto;
  //     padding: 20px;
  //     /* height: 600px; */
  // }

  //   formbody:{
  //     text-align: left;
  //     padding: 20px 10px;
  // }

  form_body: {
    padding: "10px",
    justifyContent: "space-between",
  },

  form__label: {
    width: "40%",
  },

  form__input: {
    width: "60%",
  },

  button: {
    textAlign: "center",
    marginBottom: "60px",
  },

  buttonContainer: {
    padding: "3px",

    display: "flex",
    flexDirection: "center",
    justifyContent: "space-evenly",
    marginTop: "50px",
  },
}));
