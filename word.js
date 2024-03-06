
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
    const [showPrintingLayout, setShowPrintingLayout] = useState(false);
  
    const [employeeContribution_pf, setEmployeeContribution_pf] = useState(0);
    const [employeerContribution_pf, setEmployeerContribution_pf] = useState(0);
    const [employeeContribution_esic, setEmployeeContribution_esic] = useState(0);
    const [totalDeduction, setTotalDeduction] = useState(0);
    const [netSalary, setNetSalary] = useState(0);
  
    const navigate = useNavigate();
  
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

   const handlePrint = () =>{navigate("/printingLayout", {
    state: {
      total,
      basic,}})}
  
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


      return (
        <>
          <div>
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
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              employeeContribution_pf: e.target.value,
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
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              employeeContribution_esic: e.target.value,
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
                            onClick={handlePrint}

                            // onClick={handlePrint}
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
    
I want when print button navigate the printing layout file the printing layout file will open like print preview page
eveything is working fine but when I navigate the Printing layout element the useSate values are not passing


this is print layout File

const PrintingLayout = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [isPrinting, setIsPrinting] = useState(false);

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
      <div ref={pdfRef}>
        <div>
          <table
            border="1"
            style={{
              marginLeft: "100px",
              width: "80%",
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
                  fontSize: "30px",
                  fontWeight: "600",
                }}
              >
                <td colSpan="4">Pay Slip Summary</td>
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
            </tbody>
          </table>
          <br />
          <table
            style={{
              marginLeft: "100px",
              width: "80%",
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
    </>
  );
};



here two siblings files are there I want to pass the value of useState like basic & conveyance from one file to another how to do it easily