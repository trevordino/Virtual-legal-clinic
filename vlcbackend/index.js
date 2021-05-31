const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require('./routes/user');
const loginRouter = require('./routes/spcp');
const caseRouter = require('./routes/caseRoute');
const meetingRoute = require('./routes/meetingRoute');
const timeslotRoute = require('./routes/timeslotRoute');
const videoRouter = require('./routes/twilio')
var cookieParser = require('cookie-parser');
var cors = require('cors');

app.use(cors({origin: true, credentials: true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS')
//   next();
// });

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/case', caseRouter);
app.use('/meeting', meetingRoute);
app.use('/timeslot', timeslotRoute);
app.use('/twilio', videoRouter)
  
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`VLC Backend app listening at http://localhost:${port}`)
});