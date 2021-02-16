require("./models/User");
require("./models/track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./route/authRoutes");
const requireAuth = require("./middlewares/requireAuths");
const trackRoutes = require("./route/trackRoutes");

const app = express();
app.use(bodyParser.json()); // convert to json
app.use(authRoutes);
app.use(trackRoutes);
const mongoUri =
  "mongodb+srv://admin:passwordpassword@cluster0.syn98.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo Instance");
});
mongoose.connection.on("error", (err) => {
  console.log("Error Detected", err);
});
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});

app.listen(3000, () => {
  // Listen at port 3000
  console.log("Listening");
});

// mongodb+srv://admin:<password>@cluster0.syn98.mongodb.net/<dbname>?retryWrites=true&w=majority
// npm run dev
