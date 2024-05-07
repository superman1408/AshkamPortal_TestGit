import React from "react";
import Uploading from "./PayslipLayout/Uploading";
import SlipDownload from "./PayslipDownload/SlipDownload";
import PayslipDownload from "./PayslipDownload/PayslipDownload";

const PayslipDisplay = () => {
  return (
    <div>
      <Uploading />
      <PayslipDownload />
      <SlipDownload />
    </div>
  );
};

export default PayslipDisplay;
