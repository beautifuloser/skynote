var Note = require('../model/note').Note;
var moment = require('moment');
 //= models.Note;

exports.postNote = function (req,res,next){
    var note = new Note({
        title : req.body.title,
        author : req.session.user.username,
        tag : req.body.tag,
        content : req.body.content
    });
    //console.log(note);
    note.save(function(err,doc){
        var data ={
            success :true,
            message :''
        }
        if (err){
            //console.log("save error!");
            data.success = false;
            data.message = err;
            //return res.redirect('/post');
            return res.json(data);
        }
        data.success = true;
        data.message = '发表成功!'
        //console.log("发表成功!");
        return res.json(data);
    });
}

exports.detail = function (req,res,next){
    var id = req.params._id;
    var title = req.params.title;
    console.log(id);
    Note.findOne({_id:id},function(err,note){
        console.log(id);
        if (err){
            console.log(err);
            return res.redirect('/');
        }
        if (note){
            res.render('detail',{
                title:'笔记详情',
                user:req.session.user,
                art:note,
                moment:moment
            });
            console.log(note);
            //return res.redirect('/detail');
        }
    });
}