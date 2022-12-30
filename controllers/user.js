const User = require('../models/user');
const Post = require('../models/post');
const { post } = require('../routes/post');


module.exports.profile=function(req,res){

    // Post.find({},function(err, posts){
    //     if(err){console.log("error in fetching posts",err); return;}
    //     return res.render('profile', {
    //         title:'profile',
    //         posts:posts
    //     });
    // });
    Post.find({}).populate('user').exec(function(err,posts){
        if(err){console.log("error in fetching posts",err); return;}
            let date = posts[0].user.createdAt.toString().split(' ');
            // console.log(date[0]+" "+date[1]+" "+date[2]);
            console.log(date);
            return res.render('profile', {
                title:'profile',
                posts:posts
        });
    });
    
}
module.exports.contact=function(req,res){

    res.end("<h1>Hi from server to contact is 456789123</h1>")
}
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        console.log("it is already authenticated");
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_up',{});
}

module.exports.createUser = function(req,res){
    if(req.body.password != req.body.psw_repeat)
    {
        console.log("Password does not match!");
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}, function(err,data){
        if(err){
            console.log("error in finding user while signUp",err);
            return;
        }
        if(!data){
            User.create(req.body, function(err, data){
                if(err){
                    console.log("error in creating user while signUp",err);
                    return;
                }
                console.log("Record created in db");
                return res.redirect('/user/signin');
            });

        }else{
            console.log("User already exists");
            return res.redirect('back');
        }
    })
    
}

module.exports.signin = function(req,res){
    // console.log(req.cookies);
    // res.cookie("name", 'sandysundi');
    // res.cookie("id",55);
    if(req.isAuthenticated()){
        console.log("it is already authenticated");
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in',{});
}


//sign in and create session
module.exports.createSession = function(req,res){
    return res.redirect('/user/profile');
}
module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect('/user/signin');
      });
    
}

