import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  dailyevent: {
    type: String,
  },
});

const EventDetail = mongoose.model("EventDetail", eventSchema);
export default EventDetail;
