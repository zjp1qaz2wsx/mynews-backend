var express = require('express');
var router = express.Router();

var User = require('../models/model-users')

// GET 请求  (获取用户列表)
router.get('/', function (req, res, next) {
  User.find(function (err, users) {
      if (err) return next(err); // node.js 处理机制： 错误先行 
      res.json({
        msg: "success",
        result: users
      });
  });
});


// 登录： login 用 POST 方法 
router.post('/login', function (req, res, next) {

  // 查询该用户存在吗？

  User.findOne({username: req.body.username}, 
    function (err, user) {
      if (err) return next(err); // node.js 处理机制： 错误先行 
      if (user) {  // 如果用户存在
        if (req.body.password == user.password) {
          res.json({
            code: '0',
            msg: "login success! ",
            result: user
          });
        } else
          res.json({
            code: '1',
            msg: "password is wrong! ",
            result: user
          });
      } else {
        res.json({
          code: '2',
          msg: "user does not exist! ",
          result: user
        });
      }
    })
});


// 注册： user reigister POST 请求 
router.post('/register', function (req, res, next) {
  User.findOne({username: req.body.username}, 
    function (err, user) {
      if (err) return next(err); // node.js 处理机制： 错误先行 
      if (!user) {
        User.create(req.body, function (err, user) {
          if (err) return next(err); // node.js 处理机制： 错误先行 
          res.json({
            msg: "success",
            result: user
          });
        });
      } else {
        res.json({
          msg: "user exist!",
          result: user
        });
      }
    })
});

//DELET 删除指定new
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id , function(err, data) {
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

//PUT 修改指定new
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id , req.body, function(err, data) {
    if(err) {
      return next(err);
    } else {
      res.json(
        {
          msg: "success",
          result: data
        }
      )
    }
  });
})

module.exports = router;
