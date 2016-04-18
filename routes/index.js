var express = require('express');
var user = require("../controller/user");
//var note = require("./note");
var router = express.Router();
var Note = require('../model/note').Note;
var note = require('../controller/note');
//var Note = models.Note;
/* GET home page. */
router.get('/',function(req,res,next){
  if (req.cookies['account'] != undefined && req.cookies['account'].account != undefined){
    var user = {
      username:req.cookies['account'].account.user.username ,
      password:req.cookies['account'].account.user.password
    }
    req.session.user = user ;
    console.log(req.cookies['account']);
  }
  next();
});
router.get('/', function(req, res, next) {
  if (req.session.user){
    Note.find({author :req.session.user.username}).exec(
        function (err,allNotes){
          if (err){
            console.log(err);
          }else {
            res.render('index', {
              user:req.session.user,
              title: '首页',
              notes:allNotes
            });
          }
        });
  }else{
    res.render('index', {
      user:req.session.user,
      title: '首页',
      notes:''
    });
  }
});

router.get('/register',function(req, res, next){
  if (req.session.user){
    //已登陆用户不允许跳转注册页面
    return res.redirect('/');
  }
  res.render('register', {
    user:req.session.user,
    title: '注册'
  });
});
router.post('/register',user.register);

router.get('/login',function(req,res,next){
  if (req.session.user){
    //已登陆用户不允许跳转登陆页面
    return res.redirect('/');
  }
  res.render('login',{
    user:req.session.user,
    title:'登陆'});
});
router.post('/login',user.login);

router.get('/post', function (req, res, next) {
  if (!req.session.user){
    return res.redirect('/login');
  }
  res.render('post',{
    user:req.session.user,
    title:'写笔记'});
});
router.post('/post',note.postNote);
router.get('/logout', function (req,res,next) {
  req.session.user = null;
  return res.redirect('/login');
});
//router.post('/checkUsername',user.checkUsername);
router.get('/detail/:_id',note.detail);
module.exports = router;
