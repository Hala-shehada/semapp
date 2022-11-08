//const { Router } = require("express");
const express = require("express");
//const { resourceLimits } = require("worker_threads");
const User = require("../models/users.model");
const router = express.Router();
const config = require("../config");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");




router.route("/update/:username").patch((req, res) => {
  User.findOneAndUpdate({ username:req.params.username},
     {$set: { password:req.body.password} },
     (err,result) => {
      if (err) return res.status(500).json({msg: err});
      const msg = {
        msg: "password successfully updated",
        username: req.params.username,
      };
      return res.json(msg);
    }
  );

});
     

// router.route("/delete/:username").delete(middleware.checkToken,(req, res) => {
//   User.findOneAndDelete({ username:req.params.username},
//      {$set: { password:req.body.password} },
//      (err,result) => {
//       if (err) return res.status(500).json({msg: err});
//       const msg = {
//         msg: "user deleted",
//         username: req.params.username,
//       };
//       return res.json(msg);
//     }
//   );

// });

router.route("/delete/:username").delete(middleware.checkToken, (req, res) => {
  User.findOneAndDelete({ username: req.params.username }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    const msg = {
      msg: "User deleted",
      username: req.params.username,
    };
    return res.json(msg);
  });
});


router.route("/:username").get(middleware.checkToken, (req, res) => {
  User.findOne({ username: req.params.username }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    return res.json({
      data: result,
      username: req.params.username,
    });
  });
});




router.route("/checkusername/:username").get((req, res) => {
  User.findOne({ username:req.params.username},(err,result) => {
   if (err) return res.status(500).json({msg: err});
  if(result !== null){
    return res.json({
      Status: true,
      
    });
  }else
  return res.json({
    Status: false,
  });
});
});

router.route("/login").post((req, res) => {
  User.findOne({ username:req.body.username},
     (err,result) => {
      if (err) return res.status(500).json({msg: err});
      if(result===null){
       return res.status(403).json("Username incorrect");
      }

      if(result.password===req.body.password){
       let token = jwt.sign({username: req.body.username},config.key,{});
       res.json({
        token: token,
        msg: "Sucess",
       });
      }else{
         res.status(403).json("Password is incorrect");
      }
     
});

});

router.route("/register").post((req, res) => {
    console.log("inside the register");
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        location:req.body.location,
        phone:req.body.phone,
        password: req.body.password,
         
    });
    user
      .save()
      .then(() => {
        console.log("user registered");
        res.status(200).json({ msg: "User Successfully Registered" });

      })
      .catch((err) => {
        res.status(403).json({ msg: err });
      });

});



module.exports = router;