import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    dailyevent: String,
  },
  {
    timestamps: true,
  },
);

const EventDetail = mongoose.model("EventDetail", eventSchema);
export default EventDetail;
