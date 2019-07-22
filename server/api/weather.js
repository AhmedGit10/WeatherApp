var express = require('express');
var Weather = require('../models/weather');

var router = express.Router();

router.get('/:city',function(req,res){
    var city = req.params.city;

    Weather.retriveByCity(city,function(err,weather){
        err?res.json(err):res.json(weather);
    });
});

module.exports = router;