import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import LOGO from "../../assets/AshkamLogoTransparentbc.png";
import { useReactToPrint } from "react-to-print";

import useMediaQuery from "@mui/material/useMediaQuery";

import {
  Grid,
  Typography,
  Card,
  Divider,
  TextField,
  Container,
  Button,
} from "@mui/material";
import Panel from "../Panel/Panel";
// import { useDispatch } from "react-redux";

const PaySlip = () => {
  const [postData, setPostData] = useState({
    total: "",
    netSalary: "",
    basic: "",
    uanNo: "",
    houseRent: "",
    conveyance: "",
    communication: "",
    uniform: "",
    medical: "",
    cityFactor: "",
    baseBranch: "",
    offsite: "",
    panNo: "",
    accountNo: "",
    bank: "",
    designation: "",
    level: "",
    leave: "",
    totalDeduction: "",
    employeeContribution_pf: "",
    employeerContribution_pf: "",
    employeeContribution_esic: "",
  });

  // const [showPrintingLayout, setShowPrintingLayout] = useState(false);

  const [dataGenerated, setDataGenerated] = useState(false);
  const [printingshow, setPrintingShow] = useState(false);

  const matches = useMediaQuery("(min-width:1120px)");

  const navigate = useNavigate();

  const GS =
    parseInt(postData.basic) +
    parseInt(postData.houseRent) +
    parseInt(postData.conveyance) +
    parseInt(postData.communication) +
    parseInt(postData.uniform) +
    parseInt(postData.medical) +
    parseInt(postData.cityFactor);

  const pf = postData.basic * 0.12;
  const esic = GS * 0.04;

  const totaldeduction = pf + pf + esic;
  const net = GS - totaldeduction;
  console.log("net", net);

  const calculateTotal = () => {
    setPostData((postData) => {
      return { ...postData, total: GS };
    });
    calculatePf();
    // setPrintingShow(true);
    if (isNaN(net) || net <= 0) {
      setDataGenerated(false);
      console.log(net);
    } else {
      setDataGenerated(true);
    }
    console.log(net);
  };

  const calculatePf = () => {
    setPostData((postData) => {
      return {
        ...postData,
        netSalary: net,
        totalDeduction: totaldeduction,
        employeeContribution_pf: pf,
        employeerContribution_pf: pf,
        employeeContribution_esic: esic,
      };
    });
  };

  // const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const today = new Date();
  const [date, setDate] = useState(
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear()
  );

  // to print Previous Month
  const formatter = new Intl.DateTimeFormat("default", {
    month: "long",
    year: "numeric",
  });
  const date1 = new Date();

  const number = 1;
  const [prevMonth, setPrevMon] = useState(
    formatter.format(
      new Date(date1.getFullYear(), date1.getMonth() - `${number}`)
    )
  );

  //To print total days in previous month
  const [daysInThisPrevMonth, setDaysInThisPrevMonth] = useState(() => {
    var now = new Date();
    const prevMonth1 = now.getMonth();
    console.log("prevMonth", prevMonth1);
    console.log("now", now);
    return new Date(now.getFullYear(), prevMonth1, 0).getDate();
  });

  const { id } = useParams();
  console.log("Id in Payslip Page", id);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const componentRef = useRef();

  // Assuming you have an if statement that ends somewhere before this point.

  const handlePdf = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Salary Slip",
    onBeforePrint: () => setPrintingShow(true),
    onAfterPrint: () => setPrintingShow(false), // Corrected state variable name
  });

  const handletrue = () => {
    setPrintingShow(true);
    setTimeout(() => {
      handlePdf();
    }, 10);
  };

  return (
    <>
      <div style={{ display: "flex" }}>{matches && <Panel />}</div>
      <div>
        <Container
          fluid="true"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
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
                      marginTop: "5px",
                    }}
                  >
                    Employee Pay Summary
                  </Typography>

                  <Divider orientation="horizontal" color="grey" />

                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid>
                      <TextField
                        sx={{ display: "flex", mt: "10px", width: "auto" }}
                        margin="dense"
                        size="small"
                        type="text"
                        name="employeeId"
                        label="Employee Id"
                        variant="outlined"
                        value={user.result.employeeId}
                        // onChange={(e) =>
                        //   setPostData({ ...postData, employeeId: e.target.value })
                        // }
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        sx={{ display: "flex", mt: "10px", width: "auto" }}
                        margin="dense"
                        size="small"
                        type="text"
                        name="bankName"
                        label="Bank Name"
                        variant="outlined"
                        value={postData.bank}
                        onChange={(e) =>
                          setPostData({ ...postData, bank: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        sx={{ display: "flex", mt: "10px", width: "auto" }}
                        margin="dense"
                        size="small"
                        type="text"
                        name="location"
                        label="Location"
                        variant="outlined"
                        // value={}
                        // onChange={(e) =>
                        //   setPostData({ ...postData, employeeId: e.target.value })
                        // }
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid>
                      <TextField
                        type="text"
                        margin="dense"
                        size="small"
                        name="firstName"
                        // id="standard-basic"
                        label="First Name"
                        variant="outlined"
                        required
                        fullWidth={true}
                        value={
                          user.result.firstName + " " + user.result.lastName
                        }
                        // onChange={(e) =>
                        //   setPostData({ ...postData, firstName: e.target.value })
                        // }
                      />
                    </Grid>

                    <Grid>
                      <TextField
                        sx={{ display: "flex", mt: "10px", width: "auto" }}
                        margin="dense"
                        size="small"
                        type="text"
                        name="accountNo"
                        label="Account No."
                        variant="outlined"
                        value={postData.accountNo}
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            accountNo: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        sx={{ display: "flex", mt: "10px", width: "auto" }}
                        margin="dense"
                        size="small"
                        type="text"
                        name="baseBranch"
                        label="Base Branch"
                        variant="outlined"
                        value={postData.baseBranch}
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            baseBranch: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid>
                      <TextField
                        type="text"
                        margin="dense"
                        size="small"
                        name="designation"
                        // id="standard-basic"
                        label="Designation"
                        variant="outlined"
                        required
                        fullwidth="true"
                        value={postData.designation}
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            designation: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid>
                      <TextField
                        sx={{ display: "flex" }}
                        type="text"
                        size="small"
                        margin="dense"
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
                        sx={{ display: "flex", mt: "10px", width: "auto" }}
                        margin="dense"
                        size="small"
                        type="text"
                        name="Offsite"
                        label="Offsite"
                        variant="outlined"
                        value={postData.offsite}
                        onChange={(e) =>
                          setPostData({ ...postData, offsite: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid>
                      <TextField
                        sx={{ display: "flex", mt: "10px", width: "auto" }}
                        margin="dense"
                        size="small"
                        type="text"
                        name="level"
                        label="Level Gr"
                        variant="outlined"
                        value={postData.level}
                        onChange={(e) =>
                          setPostData({ ...postData, level: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        sx={{ display: "flex" }}
                        type="text"
                        size="small"
                        margin="dense"
                        name="payDays"
                        // id="standard-basic"
                        label="Pay Days"
                        variant="outlined"
                        required
                        value={daysInThisPrevMonth}
                        onChange={(e) =>
                          setDaysInThisPrevMonth(+e.target.value)
                        }
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        sx={{ display: "flex" }}
                        type="text"
                        size="small"
                        margin="dense"
                        name="payDate"
                        label="payDate"
                        variant="outlined"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid>
                      <TextField
                        sx={{ display: "flex", mt: "10px", width: "auto" }}
                        margin="dense"
                        size="small"
                        type="text"
                        name="pan"
                        label="PAN No."
                        variant="outlined"
                        value={postData.panNo}
                        onChange={(e) =>
                          setPostData({ ...postData, panNo: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid>
                      <TextField
                        sx={{ display: "flex" }}
                        type="text"
                        size="small"
                        margin="dense"
                        name="Leave"
                        // id="standard-basic"
                        label="Leave balance"
                        variant="outlined"
                        required
                        value={postData.leave}
                        onChange={(e) =>
                          setPostData({ ...postData, leave: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid>
                      <TextField
                        sx={{ display: "flex" }}
                        type="text"
                        size="small"
                        margin="dense"
                        name="payPeriod"
                        // id="standard-basic"
                        label="payPeriod"
                        variant="outlined"
                        required
                        value={prevMonth}
                        onChange={(e) => setPrevMon(+e.target.value)}
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

                  <Grid
                    sx={{
                      display: "flex",
                      mb: "10px",
                      "@media (max-width: 600px)": {
                        flexDirection: "column",
                      },

                      "@media (min-width: 600px)": {
                        flexDirection: "row",
                      },
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Grid
                        sx={{
                          display: "flex",
                          marginTop: "20px",
                          // marginRight: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">Earnings</Typography>
                        <Typography variant="h6">Amount</Typography>
                      </Grid>
                      <Divider orientation="horizontal" color="grey" />

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography marginTop={3}>Basic</Typography>
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
                            setPostData({
                              ...postData,
                              basic: e.target.value,
                            })
                          }
                        />
                      </Grid>

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography marginTop={3}>
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
                            setPostData({
                              ...postData,
                              houseRent: e.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography marginTop={3}>
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
                            setPostData({
                              ...postData,
                              conveyance: e.target.value,
                            })
                          }
                        />
                      </Grid>

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography marginTop={3}>Communication</Typography>
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

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography marginTop={3}>Uniform allowance</Typography>
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
                            setPostData({
                              ...postData,
                              uniform: e.target.value,
                            })
                          }
                        />
                      </Grid>

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography marginTop={3}>Medical allowance</Typography>
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
                            setPostData({
                              ...postData,
                              medical: e.target.value,
                            })
                          }
                        />
                      </Grid>

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography marginTop={3}>City Factors</Typography>
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
                            setPostData({
                              ...postData,
                              cityFactor: e.target.value,
                            })
                          }
                        />
                      </Grid>

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography marginTop={3}>
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
                          value={postData.total || ""}
                          // onChange={(e) =>
                          //   setPostData({
                          //     ...postData,
                          //     grossEarnings: e.target.value,
                          //   })
                          // }
                        />
                      </Grid>

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography marginTop={3} sx={{ fontWeight: "bold" }}>
                          Net Salary (Rs)
                        </Typography>
                        <TextField
                          size="small"
                          type="text"
                          margin="normal"
                          name="netSalary"
                          // id="standard-basic"
                          label="amount"
                          variant="outlined"
                          value={postData.netSalary || ""}
                          // onChange={(e) =>
                          //   setPostData({
                          //     ...postData,
                          //     netSalary: e.target.value,
                          //   })
                          // }
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "50px",
                      }}
                    >
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "20px",
                        }}
                      >
                        <Typography variant="h6">Deductions</Typography>
                        <Typography variant="h6">Amount</Typography>
                      </Grid>
                      <Divider orientation="horizontal" color="grey" />

                      <Typography marginTop={3} sx={{ fontWeight: "bold" }}>
                        Provident fund
                      </Typography>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography marginTop={3}>
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
                          value={postData.employeeContribution_pf || ""}
                        />
                      </Grid>

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography marginTop={3} alignItems={"center"}>
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
                          value={postData.employeerContribution_pf || ""}
                        />
                      </Grid>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography marginTop={3} alignItems={"center"}>
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
                          // value={}
                          // onChange={(e) =>
                          //   setPostData({ ...postData, pf: e.target.value })
                          // }
                        />
                      </Grid>

                      <Typography
                        marginTop={4}
                        // marginRight={18}
                        sx={{ fontWeight: "bold" }}
                      >
                        ESIC
                      </Typography>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
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
                          value={postData.employeeContribution_esic || ""}
                        />
                      </Grid>

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
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
                          value=""
                          // onChange={(e) =>
                          //   setPostData({
                          //     ...postData,
                          //     employeerContribution_esic: e.target.value,
                          //   })
                          // }
                        />
                      </Grid>

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "25px",
                        }}
                      >
                        <Typography
                          marginTop={3}
                          // marginRight={14}
                          fontWeight="bold"
                        >
                          TDS
                        </Typography>
                        <TextField
                          type="text"
                          size="small"
                          margin="normal"
                          name="tds"
                          // id="standard-basic"
                          label="amount"
                          variant="outlined"
                          // value=""
                          // onChange={(e) =>
                          //   setPostData({
                          //     ...postData,
                          //     tds: e.target.value,
                          //   })
                          // }
                        />
                      </Grid>

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          marginTop={3}
                          // marginRight={14}
                          sx={{ fontWeight: "bold" }}
                        >
                          Total Deductions
                        </Typography>
                        <TextField
                          type="text"
                          size="small"
                          margin="normal"
                          name="totalDeduction"
                          // id="standard-basic"
                          label="amount"
                          variant="outlined"
                          value={postData.totalDeduction || ""}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid>
                  {/* ---------------Button---------------- */}

                  <Grid
                    sx={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid>
                      <Button
                        required
                        fullWidth={true}
                        sx={{
                          bgcolor: "skyblue",
                          color: "black",
                        }}
                        onClick={calculateTotal}
                      >
                        Generate
                      </Button>
                    </Grid>

                    <Grid>
                      <Button
                        type="submit"
                        sx={{
                          bgcolor: "skyblue",
                          color: "black",
                          // alignItems: "right",
                        }}
                        onClick={handletrue}

                        // onClick={handlePrint}
                      >
                        Preview
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Container>
        {/* ---------------------------------------------------- pdf layout------------------------------------------------------- */}
        {printingshow && (
          <div ref={componentRef}>
            <div style={{ overflowX: "auto", padding: "60px" }}>
              <table
                style={{
                  padding: "10px",
                  // marginLeft: "100px",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  // maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                }}
              >
                <tr
                  height="100px"
                  style={{
                    backgroundColor: "lightgray",
                    color: "black",
                    // textAlign: "center",
                    fontSize: "25px",
                    fontWeight: "600",
                    border: "1px solid black",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div
                    style={{
                      // marginLeft: "20px",
                      marginTop: "30px",
                      width: "130px",
                      height: "20px",
                    }}
                  >
                    <img src={LOGO} alt="logo" />
                  </div>
                  <td>SALARY SLIP</td>
                  <td style={{}}>{prevMonth}</td>
                </tr>
              </table>
              <br />
              <table
                style={{
                  // marginLeft: "100px",
                  padding: "10px",
                  // marginLeft: "100px",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                }}
              >
                <tbody>
                  {/* <tr>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "30px",
                        width: "20%",
                      }}
                    ></th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "30px",
                        width: "20%",
                      }}
                    ></th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "30px",
                        width: "20%",
                      }}
                    ></th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "30px",
                        width: "20%",
                      }}
                    ></th>
                    <th
                      style={{
                        border: "1px solid black",
                        padding: "30px",
                        width: "20%",
                      }}
                    ></th>
                  </tr> */}
                  <tr>
                    <th style={{ border: "1px solid black" }}>Employee Id</th>
                    <td style={{ border: "1px solid black" }}>
                      {user.result.employeeId}
                    </td>
                    <th style={{ border: "1px solid black" }}>Bank Name</th>
                    <td style={{ border: "1px solid black" }}>
                      {postData.bank}
                    </td>

                    <th style={{ border: "1px solid black" }}>Location</th>
                    <td style={{ border: "1px solid black" }}>Ranchi</td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Name</th>
                    <td style={{ border: "1px solid black" }}>
                      {user.result.firstName + " " + user.result.lastName}
                    </td>
                    <th style={{ border: "1px solid black" }}>Account No</th>
                    <td style={{ border: "1px solid black" }}>
                      {postData.accountNo}
                    </td>
                    <th style={{ border: "1px solid black" }}>Base Branch</th>
                    <td style={{ border: "1px solid black" }}>
                      {postData.baseBranch}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Dsgn</th>
                    <td style={{ border: "1px solid black" }}>
                      {postData.designation}
                    </td>
                    <th style={{ border: "1px solid black" }}>UAN No.</th>
                    <td style={{ border: "1px solid black" }}>
                      {postData.uanNo}
                    </td>
                    <th style={{ border: "1px solid black" }}>Offsite</th>
                    <td style={{ border: "1px solid black" }}>
                      {postData.offsite}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Level (Gr)</th>
                    <td style={{ border: "1px solid black" }}>
                      {postData.level}
                    </td>
                    <th style={{ border: "1px solid black" }}>Pay days</th>
                    <td style={{ border: "1px solid black" }}>
                      {daysInThisPrevMonth}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>PAN No.</th>
                    <td style={{ border: "1px solid black" }}>
                      {postData.panNo}
                    </td>
                    <th style={{ border: "1px solid black" }}>Leave Balance</th>
                    <td style={{ border: "1px solid black" }}>
                      {postData.leave}
                    </td>
                    <th style={{ border: "1px solid black" }}>Pay Date</th>
                    <td style={{ border: "1px solid black" }}>{date}</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <table
                style={{
                  // marginLeft: "100px",
                  padding: "10px",
                  // marginLeft: "100px",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        border: "1px solid black",
                        backgroundColor: "#027580",
                      }}
                    >
                      Earnings
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        backgroundColor: "#018191",
                      }}
                    >
                      Amount
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        backgroundColor: "#018191",
                      }}
                    >
                      Deductions
                    </th>
                    <th
                      style={{
                        border: "1px solid black",
                        backgroundColor: "#018191",
                      }}
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid black" }}></td>
                    <td style={{ border: "1px solid black" }}></td>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Provident Fund
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>Basic</td>
                    <td style={{ border: "1px solid black" }}>
                      {postData.basic}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      Employee's Contribution
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {postData.employeeContribution_pf || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>
                      House Rent Allowance
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {postData.houseRent}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      Employeer's Contribution
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {postData.employeerContribution_pf || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>
                      Medical Allowance
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {postData.medical}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      Professional Tax
                    </td>
                    <td style={{ border: "1px solid black" }}>{}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>Conveyance</td>
                    <td style={{ border: "1px solid black" }}>
                      {postData.conveyance}
                    </td>

                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      ESIC
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>
                      Communication allowance
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {postData.communication}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      Employee's Contribution
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {postData.employeeContribution_esic || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>
                      {" "}
                      Uniform Allowance
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {postData.uniform}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      Employeer's Contribution
                    </td>
                    <td style={{ border: "1px solid black" }}>{}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>City Factor</td>
                    <td style={{ border: "1px solid black" }}>
                      {postData.cityFactor}
                    </td>
                    <td style={{ border: "1px solid black" }}>TDS</td>
                    <td style={{ border: "1px solid black" }}>{}</td>
                  </tr>
                  <tr>
                    <th
                      style={{
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                      }}
                    >
                      Gross Earnings
                    </th>
                    <td
                      style={{
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                      }}
                    >
                      Rs. {postData.total || ""}
                    </td>
                    <th style={{ border: "1px solid black" }}>
                      {" "}
                      Total Deductions
                    </th>
                    <td style={{ border: "1px solid black" }}>
                      Rs. {postData.totalDeduction || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}></td>
                    <td style={{ border: "1px solid black" }}></td>
                    <td
                      style={{
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                      }}
                    >
                      <strong>NET PAY</strong>
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        backgroundColor: "lightgray",
                      }}
                    >
                      Rs. {postData.netSalary || ""}
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <table
                style={{
                  // marginLeft: "100px",
                  padding: "10px",
                  // marginLeft: "100px",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "30px",
                        width: "33.33%",
                      }}
                    ></td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "30px",
                        width: "33.33%",
                      }}
                    ></td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "30px",
                        width: "33.33%",
                      }}
                    ></td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      HUMAN RESOURCE
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      ACCOUNT MANAGER
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      DIR-F&A
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontSize: "12px",
                        backgroundColor: "#027580",
                      }}
                    >
                      Prepared by
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontSize: "12px",
                        backgroundColor: "#027580",
                      }}
                    >
                      Checked by
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        textAlign: "center",
                        fontSize: "12px",
                        backgroundColor: "#027580",
                      }}
                    >
                      Approved by
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PaySlip;
