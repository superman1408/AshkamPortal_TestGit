import React, { useState } from "react";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate, useParams } from "react-router-dom";
// import useStyles from "./style";
import Panel from "../Panel/Panel";
import { sendMail, sendMailData } from "../../action/mail";
import Calender from "../Calender/Calender";
// import ChartComponent from "./pieGraph";

const RoughPayslip = () => {
  //   const classes = useStyles();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts);

  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("profile"));

  // console.log(id);

  const [select, setSelect] = useState("");
  const [mailData, setMailData] = useState({
    recipient: "",
    requiredMessage: "",
    subject: "",
  });

  // useEffect(
  //   (mailData) => {
  //     if (mailData) {
  //       setMailData({
  //         recipient: "",
  //         requiredMessage: "",
  //         subject: "",
  //       });
  //     }
  //   },
  //   [mailData]
  // );

  // const date = new Date();

  const [valueTo, setValueTo] = useState();

  const [valueFrom, setValueFrom] = useState();

  const options = [
    { label: "SELECT RoughPayslip", value: "" },
    { label: "Casual RoughPayslip", value: "Casual RoughPayslip" },
    { label: "Sick RoughPayslip", value: "Sick RoughPayslip" },
    { label: "P RoughPayslip", value: "P RoughPayslip" },
    { label: "Floating RoughPayslip", value: "Floating RoughPayslip" },
  ];

  const UsFormatter = new Intl.DateTimeFormat("en-US");
  const fromDate = UsFormatter.format(valueTo);
  const toDate = UsFormatter.format(valueFrom);

  const handleSelect = (event) => setSelect(event.target.value);

  switch (select) {
    case "Casual RoughPayslip":
      break;

    case "Sick RoughPayslip":
      break;

    case "P RoughPayslip":
      // console.log("You have selected P RoughPayslip");

      break;

    case "Floating RoughPayslip":
      // console.log("You have selected Floating RoughPayslip");

      break;

    default:
      console.log(Error);
      break;
  }

  const RoughPayslipType = select;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mailData) {
      // dispatch(sendMail(mailData, navigate));
      dispatch(sendMailData(id, mailData));
      if (posts) {
        posts.map((post) =>
          navigate(`/mail/${post._id}/communication`, { replace: true })
        );
      }
    }
    clear();
  };

  const clear = () => {
    setMailData({
      recipient: "",
      requiredMessage: "",
      subject: "",
    });
    console.log("clicked me in clear");
  };

  return (
    <div
      //   className={classes.mainContainer}
      style={{ padding: "5px", display: "flex" }}
    >
      <Panel />
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Typography
          variant="h6"
          sx={{ padding: "3px", textAlign: "center" }}
        >{`Inbox - ${user.result.email}`}</Typography>
        <div
          //   className={classes.mainContainer}
          style={{
            padding: "5px",
            display: "flex",
            marginLeft: "10px",
          }}
        >
          <Card
            elevation={10}
            sx={{
              padding: "10px",
              width: {
                sx: 1.0, // 100%
                sm: 250,
                md: 700,
              },
            }}
          >
            <TextField
              type="email"
              name="recipient"
              label="Recipient"
              variant="outlined"
              required
              fullWidth
              sx={{ marginTop: "10px" }}
              onChange={(e) =>
                setMailData({ ...mailData, recipient: e.target.value })
              }
            />

            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                "@media (max-width: 600px)": {
                  flexDirection: "column",
                },
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="From"
                    value={valueTo}
                    onChange={(newValue) => setValueTo(newValue)}
                    required
                    fullWidth
                  />
                </DemoContainer>
              </LocalizationProvider>

              <div style={{ margin: "10px 0px" }}>
                <select
                  value={select ? select : ""}
                  onChange={handleSelect}
                  placeholder="Select RoughPayslip"
                  //   className={classes.dropDown}
                >
                  {options.map((option) => (
                    <option key={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </Grid>

            <Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="To"
                    value={valueFrom}
                    required
                    halfWidth
                    onChange={(newValue) => setValueFrom(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            {select && (
              <TextField
                name="subject"
                label="Subject"
                required
                fullWidth
                sx={{ marginTop: "10px", fontWeight: "500px" }}
                value={
                  (mailData.subject = `Applying for ${RoughPayslipType} from ${fromDate} to ${toDate}`)
                }
                onChange={(e) =>
                  setMailData({
                    ...mailData,
                    [e.target.subject]: e.target.value,
                  })
                }
              />
            )}
            <Grid>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                minRows={8}
                sx={{ marginTop: "10px", fontWeight: "200px" }}
                onChange={(e) =>
                  setMailData({
                    ...mailData,
                    requiredMessage: e.target.value,
                  })
                }
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ float: "right", marginTop: "10px" }}
              >
                Send
              </Button>
            </Grid>
          </Card>
          <div style={{ marginLeft: "10px" }}>
            <Card
              elevation={10}
              sx={{
                "@media (max-width: 600px)": {
                  marginTop: "20px",
                },
              }}
            >
              <Calender />
            </Card>
            {/* <Card elevation={10} sx={{ marginTop: "10px", padding: "5px" }}>
              <ChartComponent />
            </Card> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default RoughPayslip;
