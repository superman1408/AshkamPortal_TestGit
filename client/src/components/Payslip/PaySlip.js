import React, { useRef } from "react";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import printLayout from "../printLayout/printLayout";

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
  // const [currentId, setCurrentId] = useState();
  const [total, setTotal] = useState(0);
  const [basic, setBasic] = useState();
  const [houseRent, setHouserent] = useState();
  const [conveyance, setConveyance] = useState();
  const [communication, setCommunication] = useState();
  const [uniform, setUniform] = useState();
  const [medical, setMedical] = useState();
  const [cityFactor, setCityFactor] = useState();

  const [employeeContribution_pf, setEmployeeContribution_pf] = useState(0);
  const [employeerContribution_pf, setEmployeerContribution_pf] = useState(0);
  const [employeeContribution_esic, setEmployeeContribution_esic] = useState(0);
  const [totalDeduction, setTotalDeduction] = useState(0);
  const [netSalary, setNetSalary] = useState(0);

  const navigate = useNavigate();

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

  const calculateTotal = () => {
    setTotal(GS);
    calculatePf();
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
  const date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  //to print current month
  // const month = new Date().toLocaleString("en-US", {
  //   month: "long",
  //   year: "numeric",
  // });

  // const makeDate = new Date();
  // const prev = new Date(makeDate.setMonth(makeDate.getMonth() - 1));
  // console.log(prev);

  // to print Previous Month
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

    netSalary: "",
    // employeeContribution_pf: employeeContribution_pf || "",
    // employeerContribution_pf: employeeContribution_pf || "",
    // employeeContribution_esic: employeeContribution_esic || "",
    employeerContribution_esic: "",
    tds: "",
    totalDeduction: "",
  });

  console.log("total", total);
  console.log("grossEarnings", postData.grossEarnings);

  // const post = useSelector((state) =>
  //   currentId ? state.posts.find((p) => p._id === currentId) : null
  // );

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (currentId) {
    //   dispatch(updatePost(currentId, postData));
    // } else {
    //   dispatch(createPost(postData));
    // }
  };

  // to view postdata
  // useEffect(() => {
  //   if (post) return setPostData(post);
  // }, [post]);

  // to print data
  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  const handlePrint = () => {
    window.print();
  };

  const pdfRef = useRef();
  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  return (
    <>
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

                <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
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
                        setPostData({ ...postData, payPeriod: e.target.value })
                      }
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography marginTop={3}>Gross Earnings (Rs)</Typography>
                      <TextField
                        size="small"
                        type="text"
                        margin="normal"
                        name="grossEarnings"
                        // id="standard-basic"
                        label="amount"
                        variant="outlined"
                        value={total || ""}
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            grossEarnings: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            netSalary: e.target.value,
                          })
                        }
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            employeeContribution_pf: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            employeerContribution_pf: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                        value={postData.pf}
                        onChange={(e) =>
                          setPostData({ ...postData, pf: e.target.value })
                        }
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            employeeContribution_esic: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                        value={postData.employeerContribution_esic}
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            employeerContribution_esic: e.target.value,
                          })
                        }
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
                        value={postData.tds}
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            tds: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Grid
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            totalDeduction: e.target.value,
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
                    justifyContent: "space-between",
                    // margin: "60px 80px 0px 100px",
                  }}
                >
                  {!isPrinting && (
                    <>
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
                            alignItems: "right",
                          }}
                          // onClick={() => {
                          //   navigate("/printingLayout");
                          //   // Full Weekly Activity route
                          // }}

                          onClick={handlePrint}
                        >
                          Print
                        </Button>
                      </Grid>

                      <Grid>
                        <Button
                          type="submit"
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
                  ;
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>
      {/* ---------------------------------------------------- pdf layout------------------------------------------------------- */}
      <div ref={pdfRef}>
        <div>
          <table
            border="1"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid black",
            }}
          >
            <thead>
              <tr
                height="100px"
                style={{
                  backgroundColor: "#363636",
                  color: "#ffffff",
                  textAlign: "center",
                  fontSize: "24px",
                  fontWeight: "600",
                }}
              >
                <td colSpan="4">Daliyaspirants.com Design Limited</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Personel NO:</th>
                <td>0123456</td>
                <th>Name</th>
                <td>{user.result.firstName}</td>
              </tr>
              <tr>
                <th>Bank</th>
                <td>x0x0x0</td>
                <th>Bank A/c No.</th>
                <td>0x2x6x25x6</td>
              </tr>
              <tr>
                <th>DOB</th>
                <td>23/02/xxxx</td>
                <th>Lop Days</th>
                <td>0</td>
              </tr>
              <tr>
                <th>PF No.</th>
                <td>26123456</td>
                <th>STD days</th>
                <td>30</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>India</td>
                <th>Working Days</th>
                <td>30</td>
              </tr>
              <tr>
                <th>Department</th>
                <td>IT</td>
                <th>Designation</th>
                <td>Designer</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid black",
            }}
          >
            <thead>
              <tr>
                <th>Earnings</th>
                <th>Amount</th>
                <th>Deductions</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basic</td>
                <td>29000</td>
                <td>provident fund</td>
                <td>1900</td>
              </tr>
              <tr>
                <td>House Rent Allowance</td>
                <td>2000</td>
                <td>professional tax</td>
                <td>600</td>
              </tr>
              <tr>
                <td>special Allowance</td>
                <td>400</td>
                <td>Income tax</td>
                <td>500</td>
              </tr>
              <tr>
                <td>conveyance</td>
                <td>3000</td>
              </tr>
              <tr>
                <td>ADD Special allowance</td>
                <td>2000</td>
              </tr>
              <tr>
                <td>shift Allowance</td>
                <td>1000</td>
              </tr>
              <tr>
                <td>bonus</td>
                <td>500</td>
              </tr>
              <tr>
                <td>medical Allowance</td>
                <td>600</td>
              </tr>
              <tr>
                <th>Gross Earnings</th>
                <td>Rs.38500</td>
                <th>Gross Deductions</th>
                <td>Rs.3000</td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <strong>NET PAY</strong>
                </td>
                <td>Rs.35500</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <Grid>
          {!isPrinting && (
            <Button
              required
              fullWidth={true}
              sx={{
                bgcolor: "skyblue",
                color: "black",
              }}
              onClick={downloadPdf}
            >
              Generate
            </Button>
          )}
        </Grid>
      </div>
    </>
  );
};

export default PaySlip;
