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

router.get("/",(req,res) => {
    Book.find()
    .then((books) => res.send(books))
    .catch((error) => {
        res.status(500).send("wrong");
    });
});
module.exports = router;