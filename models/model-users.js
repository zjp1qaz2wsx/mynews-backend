// 引入mongoose
var mongoose = require('mongoose');

//创建users的schema
var usersSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        isadmin: { type : Boolean , unique : false, required : true, default: false },
    }
);

//输出model 
module.exports = mongoose.model('model-users', usersSchema);