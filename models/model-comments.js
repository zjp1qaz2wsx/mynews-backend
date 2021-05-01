// 引入mongoose
var mongoose = require('mongoose');

//创建comments的schema
var commentsSchema = new mongoose.Schema(
    {
        content: { type : String , unique : false, required : true, default: null },
        newid: { type : String , unique : false, required : true, default: null },
        owner: { type : String , unique : false, required : true, default: null },
        addtime: { type: Date, default: Date.now },
    }
);

//输出model 
module.exports = mongoose.model('model-comments', commentsSchema);