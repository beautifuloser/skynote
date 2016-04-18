var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    title:String,
    author:String,
    tag:String,
    content:String,
    createTime:{
        type:Date,
        default:Date.now
    }
});
exports.Note = mongoose.model('Note',noteSchema);