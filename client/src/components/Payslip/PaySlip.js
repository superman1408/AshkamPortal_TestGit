import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import LOGO from "../../assets/AshkamLogoTransparentbc.png";
import { useReactToPrint } from "react-to-print";

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
  const [total, setTotal] = useState();
  const [basic, setBasic] = useState();
  const [uanNo, setUanNo] = useState();

  const [houseRent, setHouserent] = useState();
  const [conveyance, setConveyance] = useState();
  const [communication, setCommunication] = useState();
  const [uniform, setUniform] = useState();
  const [medical, setMedical] = useState();
  const [cityFactor, setCityFactor] = useState();
  // const [showPrintingLayout, setShowPrintingLayout] = useState(false);

  const [employeeContribution_pf, setEmployeeContribution_pf] = useState(0);
  const [employeerContribution_pf, setEmployeerContribution_pf] = useState(0);
  const [employeeContribution_esic, setEmployeeContribution_esic] = useState(0);
  const [totalDeduction, setTotalDeduction] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  const [dataGenerated, setDataGenerated] = useState(false);
  const [printingshow, setPrintingShow] = useState(false);

  const navigate = useNavigate();

  const GS =
    basic +
    houseRent +
    conveyance +
    communication +
    uniform +
    medical +
    cityFactor;

  const pf = basic * 0.12;
  const esic = GS * 0.04;

  const totaldeduction = pf + pf + esic;
  const net = GS - totaldeduction;
  console.log("net", net);

  const calculateTotal = () => {
    setTotal(GS);
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
    setEmployeeContribution_pf(pf);
    setEmployeerContribution_pf(pf);
    setEmployeeContribution_esic(esic);
    setTotalDeduction(totaldeduction);
    setNetSalary(net);
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
      <div>
        <Container
          fluid="true"
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
                    value={user.result.employeeId}
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
                        value={uanNo}
                        onChange={(e) => setUanNo(+e.target.value)}
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
                        value={user.result.firstName}
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
                        value={user.result.lastName}
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                        margin="normal"
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
                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  ></Grid>
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
                          value={basic}
                          onChange={(e) => setBasic(+e.target.value)}
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
                          value={houseRent}
                          onChange={(e) => setHouserent(+e.target.value)}
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
                          value={conveyance}
                          onChange={(e) => setConveyance(+e.target.value)}
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
                          value={communication}
                          onChange={(e) => setCommunication(+e.target.value)}
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
                          value={uniform}
                          onChange={(e) => setUniform(+e.target.value)}
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
                          value={medical}
                          onChange={(e) => setMedical(+e.target.value)}
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
                          value={cityFactor}
                          onChange={(e) => setCityFactor(+e.target.value)}
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
                          value={total || ""}
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
                          value={netSalary || ""}
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
                          value={employeeContribution_pf || ""}
                          // onChange={(e) =>
                          //   setPostData({
                          //     ...postData,
                          //     employeeContribution_pf: e.target.value,
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
                          value={employeerContribution_pf || ""}
                          // onChange={(e) =>
                          //   setPostData({
                          //     ...postData,
                          //     employeerContribution_pf: e.target.value,
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
                          value={employeeContribution_esic || ""}
                          // onChange={(e) =>
                          //   setPostData({
                          //     ...postData,
                          //     employeeContribution_esic: e.target.value,
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
                          value={totalDeduction || ""}
                          // onChange={(e) =>
                          //   setPostData({
                          //     ...postData,
                          //     totalDeduction: e.target.value,
                          //   })
                          // }
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
                table
                style={{
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
                {/* <thead> */}
                <tr
                  height="100px"
                  style={{
                    // backgroundColor: "lightgray",
                    color: "black",
                    // textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "600",
                    border: "1px solid black",
                  }}
                >
                  <div
                    style={{
                      // marginLeft: "20px",
                      marginTop: "30px",
                      width: "150px",
                      height: "30px",
                    }}
                  >
                    <img src={LOGO} alt="logo" />
                  </div>
                  <td style={{ textAlign: "left" }}>SALARY SLIP</td>
                </tr>
                {/* </thead> */}
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
                    <th style={{ border: "1px solid black" }}>Employee Id</th>
                    <td style={{ border: "1px solid black" }}>
                      {user.result.employeeId}
                    </td>
                    <th style={{ border: "1px solid black" }}>Name</th>
                    <td style={{ border: "1px solid black" }}>
                      {user.result.firstName + " " + user.result.lastName}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Bank</th>
                    <td style={{ border: "1px solid black" }}></td>
                    <th style={{ border: "1px solid black" }}>Bank A/c No.</th>
                    <td style={{ border: "1px solid black" }}></td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>DOB</th>
                    <td style={{ border: "1px solid black" }}>
                      {user.result.dob}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>UAN No.</th>
                    <td style={{ border: "1px solid black" }}>{uanNo}</td>
                    <th style={{ border: "1px solid black" }}>Pay days</th>
                    <td style={{ border: "1px solid black" }}>
                      {daysInThisPrevMonth}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Location</th>
                    <td style={{ border: "1px solid black" }}>India</td>
                    <th style={{ border: "1px solid black" }}>Pay Date</th>
                    <td style={{ border: "1px solid black" }}>{date}</td>
                  </tr>
                  <tr>
                    <th style={{ border: "1px solid black" }}>Department</th>
                    <td style={{ border: "1px solid black" }}>
                      {user.result.department}
                    </td>
                    <th style={{ border: "1px solid black" }}>Pay Period</th>
                    <td style={{ border: "1px solid black" }}>{prevMonth}</td>
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
                    <td style={{ border: "1px solid black" }}>{basic}</td>
                    <td style={{ border: "1px solid black" }}>
                      Employee's Contribution
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {employeeContribution_pf || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>
                      House Rent Allowance
                    </td>
                    <td style={{ border: "1px solid black" }}>{houseRent}</td>
                    <td style={{ border: "1px solid black" }}>
                      Employeer's Contribution
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {employeerContribution_pf || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>
                      Medical Allowance
                    </td>
                    <td style={{ border: "1px solid black" }}>{medical}</td>
                    <td style={{ border: "1px solid black" }}>
                      Professional Tax
                    </td>
                    <td style={{ border: "1px solid black" }}>{}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>Conveyance</td>
                    <td style={{ border: "1px solid black" }}>{conveyance}</td>

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
                      {communication}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      Employee's Contribution
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {employeeContribution_esic || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>
                      {" "}
                      Uniform Allowance
                    </td>
                    <td style={{ border: "1px solid black" }}>{uniform}</td>
                    <td style={{ border: "1px solid black" }}>
                      Employeer's Contribution
                    </td>
                    <td style={{ border: "1px solid black" }}>{}</td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid black" }}>City Factor</td>
                    <td style={{ border: "1px solid black" }}>{cityFactor}</td>
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
                      Rs. {total || ""}
                    </td>
                    <th style={{ border: "1px solid black" }}>
                      {" "}
                      Total Deductions
                    </th>
                    <td style={{ border: "1px solid black" }}>
                      Rs. {totalDeduction || ""}
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
                      Rs. {netSalary || ""}
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
