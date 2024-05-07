import React from "react";
import Uploading from "./PayslipLayout/Uploading";
import SlipDownload from "./PayslipDownload/SlipDownload";

const PayslipDisplay = () => {
  return (
    <div>
      <Uploading />
      <SlipDownload />
    </div>
  );
};

export default PayslipDisplay;
