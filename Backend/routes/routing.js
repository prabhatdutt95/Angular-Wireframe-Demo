var express = require('express')
var router = express.Router();

var dbOperation = require('../public/javascripts/DBOperations')
var users = require('../public/javascripts/user')

router.get('/login/:contactNo', function(req,res){
    var cont=req.params.contactNo;
    dbOperation.findUsers(cont).then(function(details){
        res.json(details)
    }).catch(function(error){
        next(error)
    })
})

router.post('/register', function(req,res){
    var user=users.toObject(req.body);
    dbOperation.addUser(user).then(function(check){
        res.json({ "message": "Successfully Registered! Please login" })
    }).catch(function(error){
        next(error)
    })
})
module.exports = router;