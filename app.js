const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./util/databaseConnection");
const Routes = require("./routes/mainRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/", Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
