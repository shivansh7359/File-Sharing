const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DB_URl)
    .then(console.log("DB connected"))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })
}