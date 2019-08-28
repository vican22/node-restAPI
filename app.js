const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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

app.listen(8080, () => console.log("Server started!"));
