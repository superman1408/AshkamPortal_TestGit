import mongoose from "mongoose";

const PaySlipSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "PdfDetails" },
  {identify: String}, // unique id for each payslip
);

const PaySlipModel = mongoose.model("PaySlipModel", PaySlipSchema);
export default PaySlipModel;