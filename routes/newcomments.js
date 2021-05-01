var express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
var Comments = require('../models/model-comments');

//Get all comments of specific new
router.get('/:newid', function(req, res, next) {
  console.log("newid",req.params.newid,typeof(req.params.newid))
  if (req.params.newid) {
    var query = { newid : req.params.newid};
    Comments.find(query, function(err, data){
      if(err) {
        return next(err);
      } else {
        res.json(
          {
            code: "0",
            msg: "success",
            result: data
          }
        )
      }
    });
  } else {
    res.json({success:false, msg: 'No such newid'});
  }
})

module.exports = router;
