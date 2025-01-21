require("dotenv").config();
const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/fileUpload");
const authRoutes = require("./routes/auth");
const db = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/file", uploadRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});

db.dbConnect();

app.get("/", (req, res) => {
    res.send(`<h1>This is homepage <h1>`);
});



