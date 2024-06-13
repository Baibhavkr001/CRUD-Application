const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

const cors = require("cors");
app.use(cors());

// const User = require("./models/userModel");
const userRoute = require("./routes/userRout");

app.use(express.json());

mongoose.connect(process.env.URI).then(() => {
    console.log("connected successfully");
    app.listen(process.env.PORT, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("running successfully at", process.env.PORT);
        }
    });
}).catch((error) => {
    console.log("Error", error);
})

app.use(userRoute);


