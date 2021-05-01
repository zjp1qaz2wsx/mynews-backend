var express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
var News = require('../models/model-news');

// GET request (获取news列表)
router.get('/', function(req, res, next) {
  News.find( function(err, data){
    if(err) {
      return next(err);
    } else {
      res.json({
        msg: "success",
        result: data}
      );
    }
  });
})

// POST请求 （添加new）
router.post('/', function(req, res, next) {
  News.create(req.body, function(err,data){
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

//GET 获取指定的new
router.get('/:id', function(req, res, next) {
  News.findById(req.params.id , function(err, data) {
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

//PUT 修改指定new
router.put('/:id', function(req, res, next) {
  News.findByIdAndUpdate(req.params.id , req.body, function(err, data) {
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

//DELET 删除指定new
router.delete('/:id', function(req, res, next) {
  News.findByIdAndRemove(req.params.id , function(err, data) {
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

module.exports = router;
