const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const blogRoute = require("./routes/blogroutes.js");

app.use(cors());
app.use(express.json());

app.use("/", blogRoute);


mongoose.connect(process.env.DB_URL).then((result) => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});

