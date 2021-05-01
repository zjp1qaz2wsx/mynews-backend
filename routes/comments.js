var express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
var Comments = require('../models/model-comments');

// GET request (获取Comments列表)
router.get('/', function(req, res, next) {
  Comments.find( function(err, data){
    if(err) {
      return next(err);
    } else {
      res.json(
        {
          msg: "success",
          result: data
        }
      );
    }
  });
})

// POST请求 （添加comment）
router.post('/', function(req, res, next) {
  Comments.create(req.body, function(err,data){
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
})

//GET 获取指定的comment
router.get('/:id', function(req, res, next) {
  Comments.findById(req.params.id , function(err, data) {
    console.log(typeof(req.params.id))
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
})

// PUT 修改指定comment
router.put('/:id', function(req, res, next) {
  console.log("req.params.", req.params)
  console.log("req.body.", req.body)
  Comments.findByIdAndUpdate(req.params.id , req.body, function(err, data) {
    console.log("data", data)
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
})


//DELET 删除指定comment
router.delete('/:id', function(req, res, next) {
  Comments.findByIdAndRemove(req.params.id , function(err, data) {
    if(err) {
      return next(err);
    } else {
      // res.json(data);
      res.json(
        {
          code: "0",
          msg: "success",
          result: data
        }
      )
    }
  });
})

//Get all comments of specific new
router.get('/:newid', function(req, res, next) {
  console.log("newid",newid,typeof(req.params.newid))
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
    res.json({success:false, msg: 'No header userName'});
  }
})



module.exports = router;
