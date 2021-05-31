const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getSlotsByDate(colData) {
  console.log(colData);
  const rows = await db.query(`SELECT * FROM timeslotTable WHERE slotDate=?`, [colData]);
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function createSlot(slotData) {
  // const result = await db.query(`INSERT INTO timeslotTable (?) values (?)`, [slotData.fields, slotData.data]);
  const result = await db.query(`INSERT INTO timeslotTable SET timeslotId=?, slotDate=?, slotStart=?, slotEnd=?, slotNumber=?, lawyerId=?, lawyerName=?`, 
  slotData.data );

  let message = "Error in creating case";
  console.log(result);
  if (result.affectedRows) {
    message = "slot created successfully";
  }

  return { message };
}

async function update(caseid, data) {
  console.log(caseid);
  const result = await db.query(`UPDATE caseTable SET ? WHERE caseid=?`, [data, caseid]);

  let message = "Error in updating case";
  console.log(result);

  if (result.affectedRows) {
    message = "case updated successfully";
  }

  return { message };
}

module.exports = {
  getSlotsByDate,
  createSlot,
  update,
};
