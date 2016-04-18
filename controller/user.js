var User = require('../model/user').User;
exports.register = function (req, res, next) {
    //var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var passwordRepeat = req.body.passwordRepeat;
    User.findOne({username:username},function(err,user){
        var data ={
            success : false,
            message :''
        }
        if (err){
            //console.log('err');
            data.success = false;
            data.message = err;
            return res.redirect('/register');
        }
        if(user){
            //console.log('用户名已经存在');
            data.success = false;
            data.message = '用户名已经存在';
            return res.redirect('/register');
        }
        var newUser = new User({
            username:username,
            password:password
        });
        newUser.save(function(err,doc){
            if(err){
                //console.log("保存失败");
                data.success = false;
                data.message = "保存失败!";
            }
            //console.log("注册成功");
            newUser.password = null;
            delete newUser.password;
            req.session.user = newUser;
            data.success = true;
            data.message = "注册成功!";
            return res.json(data);
        });
    });
}
exports.login = function (req, res, next) {
    var rememberMe = req.body.rememberMe;
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username:username},function(err,user){
        if (user.password == password){
            //console.log('登陆成功!');
            user.password = null;
            delete user.password;
            req.session.user = user;
            var data = {
               success:true,
               message:''
            }
        }else {
            var data = {
                success:false,
                message:err
            }
        }
        return res.json(data);
    });
}