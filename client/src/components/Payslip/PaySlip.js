import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
// import ComponentToPrint from "react-to-print";

import { UseSelector } from "react-redux";

import { createPost, updatePost } from "../../action/posts";

// import useMediaQuery from "react-responsive";

import {
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  Input,
  TextField,
  Container,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const PaySlip = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    uanNo: "",
    payDays: "",
    payPeriod: "",
    payDate: "",
    basic: "",
    houseRent: "",
    conveyance: "",
    communication: "",
    uniform: "",
    medical: "",
    cityFactor: "",
    employeeContribution_pf: "",
    employeerContribution_pf: "",
    employeeContribution_esic: "",
    employeerContribution_esic: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
  };

  // to view postdata
  useEffect(() => {
    if (post) return setPostData(post);
  }, [post]);

  // to print data
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Container
      maxWidth="true"
      ref={componentRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Paper
        elevation={20}
        sx={{
          display: "flex",
          display: {
            xs: "0",
            sm: "600",
          },
          flexWrap: "nowrap",
          bgcolor: "background.paper",
          boxShadow: "5px",
          width: "900px",
          // marginLeft: "100px",
          // marginRight: "50px",
          marginTop: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
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
              marginLeft: "30px",
              marginRight: "30px",
              marginBottom: "30px",
            }}
          >
            <Grid>
              <Typography
                variant="h4"
                marginLeft={60}
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
                fontFamily={""}
                marginLeft={1}
                sx={{ display: "flex", marginTop: "20px", marginBottom: "0px" }}
              >
                Employee Pay Summary
              </Typography>

              <Divider orientation="horizontal" color="grey" />

              <TextField
                sx={{ display: "flex", mt: "10px" }}
                margin="normal"
                type="text"
                name="employeeId"
                label="Employee Id"
                variant="outlined"
                required
                value={postData.employeeId}
                onChange={(e) =>
                  setPostData({ ...postData, employeeId: e.target.value })
                }
              />

              <Grid
                sx={{
                  display: "flex",
                  flexDirection: {
                    sm: "column",
                    xs: "column",
                    md: "row",
                    lg: "row",
                    xl: "row",
                  },
                }}
              >
                <Grid>
                  <TextField
                    sx={{ display: "flex", mr: "50px" }}
                    type="text"
                    margin="normal"
                    name="firstName"
                    // id="standard-basic"
                    label="First Name"
                    variant="outlined"
                    required
                    value={postData.firstName}
                    onChange={(e) =>
                      setPostData({ ...postData, firstName: e.target.value })
                    }
                  />
                </Grid>

                <Grid>
                  <TextField
                    sx={{ display: "flex", mr: "50px" }}
                    type="text"
                    margin="normal"
                    name="middleName"
                    label="Middle Name"
                    variant="outlined"
                    required
                    value={postData.middleName}
                    onChange={(e) =>
                      setPostData({ ...postData, middleName: e.target.value })
                    }
                  />
                </Grid>

                <Grid>
                  <TextField
                    sx={{ display: "flex", mr: "0px" }}
                    type="text"
                    margin="normal"
                    name="lastName"
                    // id="standard-basic"
                    label="Last Name"
                    variant="outlined"
                    required
                    value={postData.lastName}
                    onChange={(e) =>
                      setPostData({ ...postData, lastName: e.target.value })
                    }
                  />
                </Grid>
              </Grid>

              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Grid>
                  <TextField
                    sx={{ display: "flex", mr: "50px" }}
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
                    sx={{ display: "flex", mr: "50px" }}
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
                    sx={{ display: "flex", mr: "50px" }}
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
                      setPostData({ ...postData, payPeriod: e.target.value })
                    }
                  />
                </Grid>

                <Grid>
                  <TextField
                    sx={{ display: "flex", mr: "20px" }}
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
              </Grid>
            </Grid>

            <Grid>
              <Typography
                variant="h5"
                sx={{ marginTop: "50px", marginLeft: "10px" }}
              >
                Income Details
              </Typography>

              <Divider orientation="horizontal" color="grey" />

              <Grid sx={{ display: "flex", flexDirection: "row", mb: "10px" }}>
                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "20px",
                    }}
                  >
                    <Typography variant="h6">Earnings</Typography>
                    <Typography variant="h6" marginLeft={30}>
                      Amount
                    </Typography>
                  </Grid>
                  <Divider orientation="horizontal" color="grey" />
                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography marginTop={3} marginRight={30} >
                      Basic
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      margin="normal"
                      name="basic"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.basic}
                      onChange={(e) =>
                        setPostData({ ...postData, basic: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography marginTop={3} marginRight={15}>
                      House rent allowance
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      margin="normal"
                      name="houseRent"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.houseRent}
                      onChange={(e) =>
                        setPostData({ ...postData, houseRent: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography marginTop={3} marginRight={14}>
                      Conveyance allowance
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      margin="normal"
                      name="conveyance"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.conveyance}
                      onChange={(e) =>
                        setPostData({ ...postData, conveyance: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography marginTop={3} marginRight={21}>
                      Communication
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      margin="normal"
                      name="communication"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.communication}
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          communication: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography marginTop={3} marginRight={18}>
                      Uniform allowance
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      margin="normal"
                      name="uniform"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.uniform}
                      onChange={(e) =>
                        setPostData({ ...postData, uniform: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography marginTop={3} marginRight={18}>
                      Medical allowance
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      margin="normal"
                      name="medical"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.medical}
                      onChange={(e) =>
                        setPostData({ ...postData, medical: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography marginTop={3} marginRight={24}>
                      City Factors
                    </Typography>
                    <TextField
                      size="small"
                      type="text"
                      margin="normal"
                      name="cityFactor"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.cityFactor}
                      onChange={(e) =>
                        setPostData({ ...postData, cityFactor: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      marginTop={3}
                      // marginRight={18}
                      fontFamily="bolder"
                    >
                      Gross Earnings (Rs)
                    </Typography>
                    <TextField
                      size="small"
                      type="text"
                      margin="normal"
                      name="grossEarnings"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.grossEarnings}
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          grossEarnings: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </Grid>

                <Grid
                  sx={{ display: "flex", flexDirection: "column", ml: "80px" }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "20px",
                    }}
                  >
                    <Typography variant="h6">Deductions</Typography>
                    <Typography variant="h6" marginLeft={30}>
                      Amount
                    </Typography>
                  </Grid>
                  <Divider orientation="horizontal" color="grey" />

                  <Typography
                    marginTop={3}
                    // marginRight={18}
                    sx={{ font: "bolder" }}
                  >
                    Provident fund
                  </Typography>
                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography marginTop={3} marginRight={15}>
                      Employee's Contribution
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      margin="normal"
                      name="employeeContribution_pf"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.employeeContribution_pf}
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          employeeContribution_pf: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      marginTop={3}
                      // marginRight={14}
                      alignItems={"center"}
                    >
                      Employeer's Contribution
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      margin="normal"
                      name="employeerContribution_pf"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.uaemployeerContribution_pfnNo}
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          employeerContribution_pf: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      marginTop={3}
                      // marginRight={23}
                      alignItems={"center"}
                    >
                      Professinal Tax
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      margin="normal"
                      name="pf"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.pf}
                      onChange={(e) =>
                        setPostData({ ...postData, pf: e.target.value })
                      }
                    />
                  </Grid>

                  <Typography
                    marginTop={4}
                    // marginRight={18}
                    sx={{ font: "bolder" }}
                  >
                    ESIC
                  </Typography>
                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      marginTop={3}
                      // marginRight={15}
                      alignItems={"center"}
                    >
                      Employee's Contribution
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      margin="normal"
                      name="employeeContribution_esic"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.employeeContribution_esic}
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          employeeContribution_esic: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      marginTop={3}
                      // marginRight={14}
                      alignItems={"center"}
                    >
                      Employeer's Contribution
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      margin="normal"
                      name="employeerContribution_esic"
                      // id="standard-basic"
                      label="amount"
                      variant="outlined"
                      value={postData.employeerContribution_esic}
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          employeerContribution_esic: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid>
              {/* ---------------Button---------------- */}
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "60px",
                }}
              >
                <Grid>
                  {/* button to trigger printing of target component */}
                  {/* <ReactToPrint
                    trigger={() => <Button>Print this out!</Button>}
                    content={() => componentRef}
                  /> */}
                  {/* component to be printed */}{" "}
                  {/* <ComponentToPrint ref={(el) => (componentRef = el)} /> */}
                  <Button
                    sx={{
                      bgcolor: "skyblue",
                      color: "black",
                      marginLeft: "20px",
                    }}
                  >
                    Generate
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
                    onClick={handlePrint}
                  >
                    Print
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PaySlip;
