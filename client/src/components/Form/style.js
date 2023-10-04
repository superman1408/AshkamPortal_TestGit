import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  typography: {
    alignItems: "center",
    // marginLeft: "160px",
    marginBottom: "30px",
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
