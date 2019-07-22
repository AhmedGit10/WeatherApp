var express = require('express');
var Cities = require('../models/cities');

var router = express.Router();

router.get('/',(req,res)=>{
    Cities.retriveAll((err,cities)=>{
        err? res.json(err):res.json(cities);
    })
});

router.post('/',(req,res)=>{
    let city = req.body.city;

    Cities.insert(city,(err,result)=>{
        err? res.json(err):res.json(result);
    })
});

module.exports = router;