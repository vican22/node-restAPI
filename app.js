const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const mongoURI = require("./config/keys").MONGO_URI;
const feedRoutes = require("./routes/feed");

const app = express();

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allowed-Origin", "*");
//   res.setHeader("Access-Control-Allowed-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader(
//     "Access-Control-Allowed-Headers",
//     "Content-Type, Authorization"
//   );
//   next();
// });
app.use(cors());

app.use("/feed", feedRoutes);

mongoose
  .connect(mongoURI)
  .then(result => {
    app.listen(8080, () => console.log("Server started!"));
  })
  .catch(err => console.log(err));
