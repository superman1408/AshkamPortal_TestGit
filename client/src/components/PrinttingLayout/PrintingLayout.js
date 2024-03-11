import { Grid, Button } from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

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
  // const downloadPdf = (e) => {
  //   const input = pdfRef.current;
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4", true);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;
  //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const imgX = (pdfWidth - imgWidth * ratio) / 2;
  //     const imgY = 30;

  //     // Set font size here
  //     // pdf.setFontSize(20); // Adjust 16 to your desired font size

  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       imgX,
  //       imgY,
  //       imgWidth * ratio,
  //       imgHeight * ratio
  //     );

  //     const currentDate = new Date().toLocaleDateString();
  //     const currentTime = new Date().toLocaleTimeString();
  //     const dateTime = `${currentDate} ${currentTime}`;
  //     pdf.setFontSize(10);
  //     pdf.text(dateTime, 10, pdfHeight - 10, { align: "left" }); // Adjust the position as needed
  //     pdf.save("SalarySlip.pdf");
  //   });
  // };

  const componentRef = useRef();

  const handlePpd = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Visitor Pass",
    onAfterPrint: () => console.log("Printed PDF successfully!"),
    fontSize: "15px",
  });

  const navigate = useNavigate();
  const handleStateChange = () => {
    setPrintingLayout(true); // Change the state to true
    navigate("/:id/payslip");
  };

  return (
    <>
      <div style={{ display: "flex", float: "right" }}>
        <button onClick={handleStateChange}>⬅️ Go Back</button>
      </div>
      <div ref={componentRef}>
        <div style={{ overflowX: "auto", padding: "40px" }}>
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
              {/* <span
                  style={{
                    fontSize: "15px",
                    // marginRight: "-20px",
                    // marginTop: "20px",
                    textAlign: "right",
                  }}
                >
                  {new Date().toLocaleDateString()}
                </span> */}
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
                <td style={{ border: "1px solid black" }}>{user.result.dob}</td>
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
                <td style={{ border: "1px solid black" }}>Medical Allowance</td>
                <td style={{ border: "1px solid black" }}>{medical}</td>
                <td style={{ border: "1px solid black" }}>Professional Tax</td>
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
                <td style={{ border: "1px solid black" }}>{communication}</td>
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
                <th style={{ border: "1px solid black" }}> Total Deductions</th>
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

      <Grid sx={{ paddingBottom: "50px" }}>
        {!isPrinting && (
          <Button
            required
            variant="outlined"
            sx={{
              bgcolor: "skyblue",
              color: "black",
              float: "right",
              marginRight: "160px",
              marginTop: "10px",
            }}
            onClick={handlePpd}
          >
            Download
          </Button>
        )}
      </Grid>
    </>
  );
};

export default PrintingLayout;
