import {
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import AshkamLogo from "../../assets/AshKamLogo.png";

const PrintingLayout = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Grid sx={{ display: "flex" }}>
        <Grid>
          <img src={AshkamLogo} alt="logo" style={{ width: "180px" }} />
        </Grid>
        <Grid>
          <Typography sx={{ marginLeft: "100px", fontStyle: "normal" }}>
            Salary slip
          </Typography>
        </Grid>
      </Grid>
      <Grid>
        <TableContainer component={Paper} sx={{ margin: "0px 50px 0px 0px" }}>
          <Table sx={{ minWidth: 0 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Employee Pay Summary</TableCell>
                {/* <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableBody>
                <Grid></Grid>

                {/* {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.protein}</TableCell>
                  </TableRow>
                ))} */}

                <table className="time-sheet-table">
                  <thead>
                    <tr>
                      <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                        Employee name
                      </th>
                      <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                        Employee ID
                      </th>
                      <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                        UAN
                      </th>
                      <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                        PayDate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          padding: "10px",
                          alignContent: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          padding: "10px",
                          alignContent: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          padding: "10px",
                          alignContent: "center",
                        }}
                      ></td>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          padding: "10px",
                          alignContent: "center",
                        }}
                      ></td>

                      <td
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          padding: "10px",
                          alignContent: "center",
                        }}
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </TableBody>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
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
        ;
      </Grid>
    </div>
  );
};

export default PrintingLayout;
