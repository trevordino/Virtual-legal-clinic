const express = require("express");
const router = express.Router();
const timeslotService = require("../services/timeslotService");
const meetingService = require("../services/meetingService");

/* GET timslot. */
router.get("/:date", async (req, res) => {
  var date = new Date(req.params.date);
  var formattedDate = date.toJSON().slice(0, 10);
  var slotDetails = await timeslotService.getSlotsByDate(formattedDate);
  console.log(slotDetails);
  res.json(slotDetails.data);
});

router.post("/", async function (req, res, next) {
  var slotOneStartTime = "10:00:00";
  var slotOneEndTime = "12:00:00";
  var slotTwoStartTime = "12:00:00";
  var slotTwoEndTime = "14:00:00";
  try {
    var reqData = req.body;
    console.log(reqData);
    var date = new Date(reqData.date);
    var formattedDate = date.toJSON().slice(0, 10);

    for (const slot of reqData.slots) {
      var timeslotId = formattedDate + "-" + slot;
      var startTime = slot == 1 ? slotOneStartTime : slotTwoStartTime;
      var endTime = slot == 1 ? slotOneEndTime : slotTwoEndTime;
      console.log(endTime);
      let data = {
        fields: ["timeslotId", "slotDate", "slotStart", "slotEnd", "slotNumber", "lawyerId", "lawyerName"].join(", "),
        data: [timeslotId, formattedDate, startTime, endTime, slot, reqData.lawyerId, reqData.lawyerName],
      };
      console.log(data);
      await timeslotService.createSlot(data);
      
      var timeRange = [formattedDate + " " + startTime, formattedDate + " " + endTime]
      console.log(timeRange);
      var currentAppointments = await meetingService.getMeetingsWithinTime(timeRange);
      for (const aRow of currentAppointments) {
        var meetingId = aRow.meetingId
        let updateData = {
          fields: ["lawyerId", "lawyerName", "status"].join(", "),
          data: [reqData.lawyerId, reqData.lawyerName, "CONFIRMED"]
        }
        console.log(updateData);
        await meetingService.update(meetingId, updateData)
      }
      console.log(currentAppointments);
    }
    res.json({ message: true });
  } catch (err) {
    console.error(`Error creating user`, err.message);
    next(err);
  }
});

router.put("/:userid", async function (req, res, next) {
  // localhost:5000/user/S91111111A
  try {
    console.log(req.body);
    let data = req.body;
    res.json(await user.update(req.params.userid, data));
  } catch (err) {
    console.error(`Error updating user`, err.message);
    next(err);
  }
});

module.exports = router;
