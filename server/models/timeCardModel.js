const mongoose = require("mongoose");

const timeCardSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "please input username"],
  },
  workedTime: {
    type: Number,
  },
});

const TimeCard = mongoose.model("timeCard", timeCardSchema);

module.exports = TimeCard;
