import React, { useRef } from "react";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf";

// import useStyle from "./Style";

import {
  Grid,
  Typography,
  Card,
  Divider,
  TextField,
  Container,
  Button,
} from "@mui/material";
// import { useDispatch } from "react-redux";

const PaySlip = () => {
  const contentRef = useRef();

  const [isPrinting, setIsPrinting] = useState(false);

  const handleGeneratePdf = () => {
    const content = contentRef.current;

    if (content) {
      setIsPrinting(true); // Set the flag to true when generating PDF
      html2pdf(content, {
        margin: 10,
        filename: "generated-document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      });
    }

    // handlePrint();
  };

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));

  const today = new Date();
  const date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const formatter = new Intl.DateTimeFormat("default", {
    month: "long",
    year: "numeric",
  });
  const date1 = new Date();

  const number = 1;
  const prevMonth = formatter.format(
    new Date(date1.getFullYear(), date1.getMonth() - `${number}`)
  );

  //To print total days in previous month
  const daysInThisPrevMonth = () => {
    var now = new Date();
    const prevMonth1 = now.getMonth();
    console.log("prevMonth", prevMonth1);
    console.log("now", now);
    return new Date(now.getFullYear(), prevMonth1, 0).getDate();
  };

  const { id } = useParams();
  console.log("Id in Payslip Page", id);

  const [postData, setPostData] = useState({
    employeeId: user.result.employeeId,
    firstName: user.result.firstName,
    lastName: user.result.lastName,
    uanNo: "",
    payDays: daysInThisPrevMonth(),
    payPeriod: prevMonth,
    payDate: date,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const pdfRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
    onBeforeGetContent: () => {
      setIsPrinting(true); // Set the flag to true when printing
    },
    onAfterPrint: () => {
      setIsPrinting(false); // Reset the flag after printing is done
    },
  });

  return (
    <div>
      <div ref={contentRef}>
        <Container
          fluid="true"
          ref={pdfRef}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Card
            elevation={20}
            sx={{
              // display: "flex",
              display: {
                xs: "0",
                sm: "600",
              },
              bgcolor: "background.Card",
              boxShadow: "5px",
              width: "auto",
              justifyContent: "center",
            }}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: {
                    sm: "column",
                    xs: "column",
                    md: "column",
                    lg: "column",
                    xl: "column",
                  },
                  padding: "20px",
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "center",
                  marginLeft: "30px",
                  marginRight: "30px",
                  marginBottom: "30px",
                }}
              >
                <Grid>
                  <Typography
                    variant="h4"
                    // marginLeft={60}
                    alignContent="center"
                    sx={{
                      display: "flex",
                      // flexGrow: 1,
                      fontSize: "30px",
                      fontWeight: "bold",
                      marginTop: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    Salary Slip
                  </Typography>

                  <Divider
                    sx={{
                      borderWidth: "2px",
                    }}
                  />
                </Grid>

                <Grid>
                  <Typography
                    variant="h5"
                    marginLeft={1}
                    sx={{
                      display: "flex",
                      marginTop: "20px",
                      marginBottom: "0px",
                    }}
                  >
                    Employee Pay Summary
                  </Typography>

                  <Divider orientation="horizontal" color="grey" />

                  <TextField
                    sx={{ display: "flex", mt: "10px", width: "auto" }}
                    margin="normal"
                    size="small"
                    type="text"
                    name="employeeId"
                    label="Employee Id"
                    variant="outlined"
                    value={postData.employeeId}
                    // onChange={(e) =>
                    //   setPostData({ ...postData, employeeId: e.target.value })
                    // }
                  />

                  <Grid
                    sx={{
                      display: "flex",
                      // flexDirection: {
                      //   sm: "column",
                      //   xs: "column",
                      //   md: "row",
                      //   lg: "row",
                      //   xl: "row",
                      // },
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid>
                      <TextField
                        sx={{ display: "flex" }}
                        type="text"
                        size="small"
                        margin="normal"
                        name="uanNo"
                        // id="standard-basic"
                        label="UAN No."
                        variant="outlined"
                        required
                        value={postData.uanNo}
                        onChange={(e) =>
                          setPostData({ ...postData, uanNo: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid>
                      <TextField
                        type="text"
                        margin="normal"
                        size="small"
                        name="firstName"
                        // id="standard-basic"
                        label="First Name"
                        variant="outlined"
                        required
                        fullWidth={true}
                        value={postData.firstName}
                        // onChange={(e) =>
                        //   setPostData({ ...postData, firstName: e.target.value })
                        // }
                      />
                    </Grid>

                    <Grid>
                      <TextField
                        type="text"
                        margin="normal"
                        size="small"
                        name="lastName"
                        // id="standard-basic"
                        label="Last Name"
                        variant="outlined"
                        required
                        fullwidth="true"
                        value={postData.lastName}
                        // onChange={(e) =>
                        //   setPostData({ ...postData, lastName: e.target.value })
                        // }
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid>
                      <TextField
                        sx={{ display: "flex" }}
                        type="text"
                        size="small"
                        margin="normal"
                        name="payDate"
                        label="payDate"
                        variant="outlined"
                        required
                        value={postData.payDate}
                        onChange={(e) =>
                          setPostData({ ...postData, payDate: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid>
                      <TextField
                        sx={{ display: "flex" }}
                        type="text"
                        size="small"
                        margin="normal"
                        name="payDays"
                        // id="standard-basic"
                        label="Pay Days"
                        variant="outlined"
                        required
                        value={postData.payDays}
                        onChange={(e) =>
                          setPostData({ ...postData, payDays: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid>
                      <TextField
                        sx={{ display: "flex" }}
                        type="text"
                        size="small"
                        margin="normal"
                        name="payPeriod"
                        // id="standard-basic"
                        label="payPeriod"
                        variant="outlined"
                        required
                        value={postData.payPeriod}
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            payPeriod: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  ></Grid>
                </Grid>

                <Grid>
                  {/* ---------------Button---------------- */}
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      // margin: "60px 80px 0px 100px",
                    }}
                  >
                    {!isPrinting && (
                      <>
                        <Grid>
                          <Button
                            type="submit"
                            sx={{
                              bgcolor: "skyblue",
                              color: "black",
                              alignItems: "right",
                            }}
                            onClick={() => {
                              navigate(
                                `/printLayout${user.result._id}/printLayout`
                              );
                            }}
                          >
                            Print
                          </Button>
                        </Grid>

                        <Grid>
                          <Button
                            type="button"
                            sx={{
                              bgcolor: "skyblue",
                              color: "black",
                              alignItems: "right",
                            }}
                            onClick={handleGeneratePdf}
                          >
                            Download as Pdf
                          </Button>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default PaySlip;
