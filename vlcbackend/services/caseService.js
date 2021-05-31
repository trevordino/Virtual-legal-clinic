const db = require("./db");
const helper = require("../helper");
const config = require("../config");


async function getAllCase(colName, colData) {
  const rows = await db.query(`SELECT * FROM caseTable WHERE ?=?`, 
    [colName, colData]
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  };
}

async function getCase(caseName) {
    const rows = await db.query(`SELECT * FROM caseTable WHERE caseid=?`, 
      [caseName]
    );
    const data = helper.emptyOrRows(rows);
    return {
      data
    };
  }

async function create(caseData) {
  console.log(caseData.fields);
  const result = await db.query(
    `INSERT INTO caseTable (?) VALUES (?)`,
    [caseData.fields, caseData.data]
  );

  let message = "Error in creating case";
  console.log(result);
  if (result.affectedRows) {
    message = "case created successfully created successfully";
  }

  return { message };
}

async function update(caseid, data) {
  console.log(caseid);
  const result = await db.query(
    `UPDATE caseTable SET ? WHERE caseid=?`,
    [data, caseid]
  );

  let message = "Error in updating case";
  console.log(result);

  if (result.affectedRows) {
    message = "case updated successfully";
  }

  return { message };
}

module.exports = {
  create,
  update,
  getAllCase,
  getCase,
};
