const db = require("./db");
const helper = require("../helper");
const config = require("../config");


async function getUser(userName) {
  const rows = await db.query(`SELECT * FROM userTable WHERE userid=?`, [userName]);
  const data = helper.emptyOrRows(rows);
  return {
    data
  };
}

async function createUser(user) {
  console.log(user.fields);
  // const result = await db.query(
  //   `INSERT INTO userTable (?) VALUES (?)`,
  //   [user.fields, user.data]
  // );
  const result = await db.query(
    `INSERT INTO virtual_legal_clinic.userTable SET ?`,
    user
  );
  

  let message = "Error in creating user";
  console.log(result);
  if (result.affectedRows) {
    message = "user created successfully created successfully";
  }

  return { message };
}

async function updateUser(userid, data) {
  console.log(userid);
  console.log(data);
  const result = await db.query(
    `UPDATE userTable SET ? WHERE userid=?`,
    [data, userid]
  );

  let message = "Error in updating user";
  console.log(JSON.stringify(result));

  if (result.affectedRows) {
    message = "User updated successfully";
  }
  console.log(message);

  return { message };
}

module.exports = {
  getUser,
  create: createUser,
  update: updateUser,
};
