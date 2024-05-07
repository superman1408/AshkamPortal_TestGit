import mongoose from "mongoose";

const PaySlipSchema = mongoose.Schema({
  title: { type: String }, // Change to String for single title
  pdf: Buffer, // Change to Buffer for single PDF buffer
  identify: {
    type: String,
  }, // Change to String for single identify
});

const PaySlipModel = mongoose.model("PaySlip", PaySlipSchema);
export default PaySlipModel;
