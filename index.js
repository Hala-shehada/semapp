const express = require("express");
const mongoose = require("mongoose");
const Port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();


async function connectDB() {
    await mongoose.connect(
        process.env.MONGO_URL,
      { useUnifiedTopology: true, useNewUrlParser: true }
    );
   
    console.log("MongoDb connected");
   }
   connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const userRoute = require("./routes/user");
app.use("/user", userRoute);


app.route("/").get((req,res) => res.json("hello world!!!"));

app.listen(Port, () => console.log(`welcome your server lisiting at port ${Port}`));
