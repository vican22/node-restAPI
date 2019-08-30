const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

const mongoURI = require("./config/keys").MONGO_URI;

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());

app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

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
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(result => {
    const server = app.listen(8080, () => console.log("Server started!"));

    const io = require("./socket").init(server);
    io.on("connection", socket => {
      console.log("Client connected");
    });
  })
  .catch(err => console.log(err));
