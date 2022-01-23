const Data = require('../models/dataModel');

var PublicControllers = {   
    
    home: (req,res) => {
        res.send('home site')
    },

    contact: (req,res) => {
        res.send('contact site')
    },     
    

    news: (req,res) => {
        res.send('new site')
    }
};

module.exports = PublicControllers;
