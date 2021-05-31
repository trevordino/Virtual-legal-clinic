const express = require("express");
const router = express.Router();
const meeting = require("../services/meetingService");
const user = require("../services/user");
const client = require("../services/spcp");
const meetingService = require("../services/meetingService");
const timeslotService = require("../services/timeslotService");

/* GET meeting by user. */
router.get("/:period/:role/:userid", async function (req, res, next) {
  console.log('GET meeting by period, role, user');
  console.log(req.params.period);
  console.log(req.params.role);
  console.log(req.params.userid);
  let data = {
    role: req.params.role,
    userid: req.params.userid,
    period: req.params.period,
  };
  meetingDetails = await meeting.getMeetings(data);
  console.log(meetingDetails)
  res.json(meetingDetails.result);
});

router.get("/id/:meetingid", async function (req, res, next) {
  console.log(req.params.meetingId)
  meetingDetails = await meeting.getMeetingById(req.params.meetingid);
  console.log(meetingDetails);
  res.json(meetingDetails);
});

router.get("/:period", async function (req, res, next) {
  var period = new Date(req.params.period);
  console.log(period);
  var startDate = period.getFullYear() + "-" + (period.getMonth() + 1) + "-" + period.getDate();
  var endDate = period;
  endDate.setDate(endDate.getDate() + 1);
  endDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
  result = await meetingService.getMeetingsWithinTime([startDate, endDate]);
  console.log(result);
  res.json(result);
});

// router.post("/", isAuthenticated, async (req, res) => {
router.post("/", async function (req, res, next) {
  // localhost:5000/user/
  try {
    var data = req.body;
    var slotDate = new Date(data.slotDate);
    slotDate = slotDate.toJSON().slice(0, 10);
    let lawyerAvail = await timeslotService.getSlotsByDate(slotDate);
    let lawyerName, lawyerId = null;
    let status = 'PENDING';
    if (lawyerAvail.data.length != 0) {
      let slotTime = new Date(data.startTime);
      for (const aLawyer of lawyerAvail.data) {
        let lawyerStart = new Date(slotDate + "T" + aLawyer.slotStart + ".000Z");
        let lawyerEnd = new Date(slotDate + "T" + aLawyer.slotEnd + ".000Z");
        if (lawyerStart <= slotTime && lawyerEnd >= slotTime) {
          lawyerName = aLawyer.lawyerName
          lawyerId = aLawyer.lawyerId
          status = 'CONFIRMED';
          console.log(slotTime);
          console.log(lawyerStart);
          console.log(lawyerEnd);
        }
      }
    }
    console.log(lawyerAvail);
    let reqData = {
      fields: ["meetingId", "meetingLink", "slotId", "startTime", "endTime", "lawyerId", "lawyerName", "applicantId", "applicantName", "taxonomy", "partyName", "relationship", "facts", "questions", "status"],
      data: [data.meetingId, data.meetingLink, data.slotId, data.startTime, data.endTime, lawyerId, lawyerName, data.applicantId, data.applicantName, data.taxonomy, data.partyName, data.relationship, data.facts, data.questions, status],
    };
    res.json(await meetingService.create(reqData));
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
