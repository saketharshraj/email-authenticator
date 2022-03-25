require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connectDB");
const emailRoutes = require("./routes/emailAuthRoutes")

const errorHandler = require("./error/errorHandler");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", emailRoutes)

app.use(errorHandler);

connectDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "You have reached the email authentication server",
    });
});

app.get("/dbstatus", (req, res) => {
    const dbConnection = mongoose.connection.readyState;
    if (dbConnection == 1) {
        res.send("DB Connected");
    } else if (dbConnection == 2) {
        res.send("Connecting to DB");
    } else if (dbConnection == 3) {
        res.send("Disconnecting from DB");
    } else {
        res.send("DB is disconnected");
    }
});

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
