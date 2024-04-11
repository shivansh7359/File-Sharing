const express = require("express");
const cors = require("cors");
const upload = require("./routes/routes");
const db = require("./config/db");

const app = express();

app.use(express.json());

require("dotenv").config();

app.use(cors());

app.use("/", upload);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});

db.dbConnect();

app.get("/", (req, res) => {
    res.send(`<h1>This is homepage <h1>`);
});



