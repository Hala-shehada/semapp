const jwt = require("jsonwebtoken");
const config = require("./config");

const checkToken = (req, re, next)=> {
    let token = req.headers["authorization"];
    console.log(token);
    token = token.slice(7,token.length);
    next();
};

module.exports = {
    checkToken:  checkToken,
};