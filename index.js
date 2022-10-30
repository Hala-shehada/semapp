const express = require("express");
const mongoose = require("mongoose");
const Port = process.env.PORT || 5000;
const app = express();
require('dotenv').config();

// const mongoDbURL = process.env.mongoDbURL || 'mongodb+srv://halanuha:QKkdp2tuhnPF45j8@appdb.u8evh6i.mongodb.net/<SemDB>?retryWrites=true&w=majority'
// mongoose.connect("mongodb+srv://halanuha:QKkdp2tuhnPF45j8@appdb.u8evh6i.mongodb.net/<SemDB>?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true } )
const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDb connected");
});

app.use(express.json());
const userRoute = require("./routes/user");
app.use("/user", userRoute);

app.route("/").get((req,res) => res.json("hello world!!!"));

app.listen(Port, () => console.log(`welcome your server lisiting at port ${Port}`));
