const express = require('express');
const route = express.Router();
const Book = require('../models/books');
const router = require('./user');

router.post('/',(req,res) => {

    book = new Book({
        name:req.body.name,
        genre:req.body.genre
    });
    
    book.save().then(book => {
        res.send(book);

    }).catch(error => {
        res.status(500).send("not");
    });
});
module.exports = router;