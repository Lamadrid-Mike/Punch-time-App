const TimeCard = require("../models/timeCardModel");

/* GET home page. */
exports.mainController = function (req, res, next) {
  res.render("index", { title: "Express" });
};

exports.postRequest = async function (req, res) {
  try {
    const newTime = await TimeCard.create(req.body);
    console.log(newTime);
    res.status(201).json({
      message: "timeAdded",
      data: newTime,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
