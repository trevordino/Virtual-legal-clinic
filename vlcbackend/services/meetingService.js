const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMeetings(data) {
  let rows;
  if (data.period == "future") {
    if (data.role == "LAWYER") {
      rows = await db.query(`SELECT * FROM meetingTable WHERE lawyerId=? AND endTime >= NOW()`, [data.userid]);
    } else if (data.role == "APPLICANT") {
      rows = await db.query(`SELECT * FROM meetingTable WHERE applicantId=? AND endTime >= NOW()`, [data.userid]);
    }
  } else if (data.period == 'past') {
    if (data.role == "LAWYER") {
      rows = await db.query(`SELECT * FROM meetingTable WHERE lawyerId=? AND endTime < NOW()`, [data.userid]);
    } else if (data.role == "APPLICANT") {
      rows = await db.query(`SELECT * FROM meetingTable WHERE applicantId=? AND endTime < NOW()`, [data.userid]);
    }
  }
  const result = helper.emptyOrRows(rows);
  return {
    result,
  };
}

async function getMeetingById(meetingId) {
  console.log(meetingId);
  let rows;
  rows = await db.query(`SELECT * FROM meetingTable WHERE meetingId=?`, meetingId);
  const result = helper.emptyOrRows(rows);
  return result;
}

async function getMeetingsWithinTime(timerange) {
  let rows;
  rows = await db.query(`SELECT * FROM meetingTable WHERE startTime >= ? AND endTime <= ?`, timerange);
  const result = helper.emptyOrRows(rows);
  return result;
}

async function createMeeting(data) {
  console.log(data);
  const result = await db.query(`INSERT INTO meetingTable SET meetingId=?, meetingLink=?, slotId=?, startTime=?, endTime=?, lawyerId=?, lawyerName=?, applicantId=?, applicantName=?, taxonomy=?, partyName=?, relationship=?, facts=?, questions=?, status=?`,  data.data);

  let message = "Error in creating meeting";
  console.log(result);
  if (result.affectedRows) {
    message = "meeting created successfully";
  }

  return { message };
}

async function updateMeeting(meetingId, data) {
  const result = await db.query(`UPDATE meetingTable SET lawyerId=?, lawyerName=? WHERE meetingId=?`, [data.data[0], data.data[1], meetingId]);

  let message = false;
  console.log(result);

  if (result.affectedRows) {
    message = true;
  }

  return message;
}

module.exports = {
  getMeetings,
  getMeetingsWithinTime,
  getMeetingById,
  create: createMeeting,
  update: updateMeeting,
};
