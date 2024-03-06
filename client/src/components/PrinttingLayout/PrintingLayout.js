import { Grid, Button } from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Navigate, useNavigate } from "react-router-dom";
import LOGO from "../../assets/AshkamLogoTransparentbc.png";

// import html2pdf from "html2pdf";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PrintingLayout = ({ setPrintingLayout }) => {
  setPrintingLayout(false);
  const location = useLocation();
  const {
    total,
    basic,
    houseRent,
    uanNo,
    date,
    prevMonth,
    daysInThisPrevMonth,
    conveyance,
    communication,
    uniform,
    medical,
    cityFactor,
    employeeContribution_pf,
    employeerContribution_pf,
    employeeContribution_esic,
    totalDeduction,
    netSalary,
  } = location.state;
  const user = JSON.parse(localStorage.getItem("profile"));
  const [isPrinting, setIsPrinting] = useState(false);

  const pdfRef = useRef();
  const downloadPdf = (e) => {
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
      // window.location.reload(true);
    });
  };
  const navigate = useNavigate();
  const handleStateChange = () => {
    setPrintingLayout(true); // Change the state to true
    navigate("/:id/payslip");
  };

  return (
    <>
      <div style={{ float: "right" }}>
        {" "}
        <button onClick={handleStateChange}>Go Back</button>
      </div>
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
                    marginLeft: "20px",
                    marginTop: "30px",
                    width: "150px",
                    height: "30px",
                  }}
                >
                  <img src={LOGO} alt="logo" />
                </div>
                <td colSpan="4" style={{ marginLeft: "100px" }}>
                  SALARY SLIP
                </td>
                <span
                  style={{
                    fontSize: "15px",
                    marginRight: "-20px",
                    marginTop: "20px",
                  }}
                >
                  {new Date().toLocaleDateString()}
                </span>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Employee Id:</th>
                <td>{user.result.employeeId}</td>
                <th>Name</th>
                <td>{user.result.firstName + " " + user.result.lastName}</td>
              </tr>
              <tr>
                <th>Bank</th>
                <td></td>
                <th>Bank A/c No.</th>
                <td></td>
              </tr>
              <tr>
                <th>DOB</th>
                <td>{user.result.dob}</td>
              </tr>
              <tr>
                <th>UAN No.</th>
                <td>{uanNo}</td>
                <th>Pay days</th>
                <td>{daysInThisPrevMonth}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>India</td>
                <th>Pay Date</th>
                <td>{date}</td>
              </tr>
              <tr>
                <th>Department</th>
                <td>{user.result.department}</td>
                <th>Pay Period</th>
                <td>{prevMonth}</td>
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
                <td>{basic}</td>
                <td>Employee's Contribution (PF)</td>
                <td>{employeeContribution_pf}</td>
              </tr>
              <tr>
                <td>House Rent Allowance</td>
                <td>{houseRent}</td>
                <td>Employeer's Contribution (PF) </td>
                <td>{employeerContribution_pf}</td>
              </tr>
              <tr>
                <td>Medical Allowance</td>
                <td>{medical}</td>
                <td>Professional Tax</td>
                <td>{}</td>
              </tr>
              <tr>
                <td>Conveyance</td>
                <td>{conveyance}</td>
                <td>Employee's Contribution (ESIC)</td>
                <td>{employeeContribution_esic}</td>
              </tr>
              <tr>
                <td>Communication allowance</td>
                <td>{communication}</td>
                <td>Employeer's Contribution (ESIC)</td>
                <td>{}</td>
              </tr>
              <tr>
                <td> Uniform Allowance</td>
                <td>{uniform}</td>
                <td>TDS</td>
                <td>{}</td>
              </tr>
              <tr>
                <td>City Factor</td>
                <td>{cityFactor}</td>
              </tr>
              <tr>
                <th>Gross Earnings</th>
                <td>Rs.{total}</td>
                <th> Total Deductions</th>
                <td>{totalDeduction}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <strong>NET PAY</strong>
                </td>
                <td>Rs.{netSalary}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Grid sx={{ paddingBottom: "50px" }}>
        {!isPrinting && (
          <Button
            required
            variant="outlined"
            sx={{
              bgcolor: "skyblue",
              color: "black",
              float: "right", // Add this line to float the button to the right
              marginRight: "160px", // Optional: Add some right margin to the butto
              marginTop: "10px",
            }}
            onClick={downloadPdf}
          >
            Download
          </Button>
        )}
      </Grid>
    </>
  );
};

export default PrintingLayout;
