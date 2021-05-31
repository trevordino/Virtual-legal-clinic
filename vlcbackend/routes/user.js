const express = require("express");
const router = express.Router();
const user = require("../services/user");
const client = require("../services/spcp");

const isAuthenticated = (req, res, next) => {
  client.verifyJWT(req.cookies["connect.sid"], (err, data) => {
    if (err) {
      console.log(err);
      res.status(401).send("Unauthorized");
    } else {
      req.userName = data.userName;
      next();
    }
  });
};

/* GET user. */
router.get("/", isAuthenticated, async (req, res) => {
  // localhost:5000/user/
  console.log(req.userName);
  var userDetails = await user.getUser(req.userName);
  var isPresent = false;
  if (userDetails.data.length == 0) {
    let data = {
      userid: req.userName,
      isOnboarded: false,
      onboardingStage: 1}
    console.log(data);
    console.log(await user.create(data));
    userDetails = await user.getUser(req.userName);
  }
  res.json({
    isPresent: isPresent,
    userName: req.userName,
    userDetails: userDetails.data[0],
  });
  console.log(userDetails);
});

// router.post("/", isAuthenticated, async (req, res) => {
router.post("/", async function (req, res, next) {
  // localhost:5000/user/
  try {
    console.log(req.body);
    let data = {
      fields: ["userid", "isOnboarded", "onboardingStage"].join(", "),
      data: [req.body.username, false, 1],
    };
    console.log(data);
    res.json(await user.create(data));
  } catch (err) {
    console.error(`Error creating user`, err.message);
    next(err);
  }
});

router.put("/:userid", async function (req, res, next) {
  // localhost:5000/user/S91111111A
  try {
    let data = req.body;
    console.log('data below');
    console.log(req.params.userid)
    console.log(data);
    res.json(await user.update(req.params.userid, data));
  } catch (err) {
    console.error(`Error updating user`, err.message);
    next(err);
  }
});

module.exports = router;
