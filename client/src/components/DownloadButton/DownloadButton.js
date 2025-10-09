// DownloadButton.jsx
import React from "react";
import { Button, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useReactToPrint } from "react-to-print";

const DownloadButton = ({
  componentRef,
  filename = "Timesheet",
  setPrintingShow,
}) => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const dateTime = `${currentDate} ${currentTime}`;

  const handleDownload = useReactToPrint({
    content: () => componentRef.current,
    dateTime,
    documentTitle: filename,
    // onBeforePrint: () => setPrintingShow(true),
    onAfterPrint: () => setPrintingShow(false),
  });

  const startPrint = () => {
    setPrintingShow(true);
    setTimeout(() => {
      handleDownload();
    }, 10);
  };

  return (
    <Tooltip title="Download as PDF">
      <Button
        variant="contained"
        startIcon={<DownloadIcon />}
        onClick={startPrint}
        sx={{
          background: "linear-gradient(135deg, #0d325c, #16355d)",
          borderRadius: "5px",
          padding: "10px 20px",
          fontFamily: "Roboto",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(135deg, #16355d, #0d325c)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          },
          float: "right",
          marginTop: "20px",
        }}
      >
        Download PDF
      </Button>
    </Tooltip>
  );
};

export default DownloadButton;
