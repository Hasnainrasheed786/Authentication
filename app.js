require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser");
const userdb = require("./models/userSchema");
const formdb=require("./models/formSchema")
const port = 8080;

// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });

app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(router);

app.get("/fetch/:id", (req, res) => {
  fetchid = req.params.id;
  userdb.findOne({ id: fetchid }, function (err, val) {
    if (err) {
      res.send(err);
    } else {
      res.send(val);
    }
  });
});

app.listen(port, () => {
  console.log(`server start at port no : ${port}`);
  console.log();
});
