// 引入mongoose
var mongoose = require('mongoose');

//创建news的schema
var newsSchema = new mongoose.Schema(
    {
        title: { type : String , unique : false, required : true, default: null },
        content: { type : String , unique : false, required : true, default: null },
        owner: { type : String , unique : false, required : true, default: null },
        addtime: { type: Date, default: Date.now },
    }
);

//输出model 
module.exports = mongoose.model('model-news', newsSchema);