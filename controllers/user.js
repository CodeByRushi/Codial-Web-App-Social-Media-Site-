const { render } = require('ejs');
const User = require('../models/user');
module.exports.profile=function(req,res){

    res.end("<h1>Hi from server to profile</h1>")
}
module.exports.contact=function(req,res){

    res.end("<h1>Hi from server to contact is 456789123</h1>")
}
module.exports.signup = function(req,res){
    return res.render('user_sign_up',{});
}
module.exports.signout = function(req,res){
    console.log("sign out clicked", req.cookies);
    res.clearCookie('user_id');
    res.clearCookie('email');
    res.clearCookie('name');
    console.log("2. sign out clicked", req.cookies);
    return res.redirect('/user/signin');
}
module.exports.showProfile = function(req, res){
    // console.log(`THis is cookie sent from server ${req.cookies.name}`);
    if(req.cookies.user_id == null)// indicates iilegal get 
        return res.redirect('/user/signin');
    console.log("cookie id is : ",req.cookies.user_id);
    User.findOne({_id:req.cookies.user_id},function(err,data){
        if(err){
            console.log("error in finding user while signUp",err);
            return;
        }
        if(data){
            
            return res.render("profile",{
                title : "User_Profile",
                user : data
            });
        }else{
            return res.redirect('/user/signin');
        }
    })
    
}
module.exports.createSession = function(req,res){
    //search user in db
    User.findOne({email:req.body.email},function(err,data){
            if(err){
                console.log("error in finding user while signUp",err);
                return;
            }
            if(!data){
                //if user does not exists
                console.log("User doesnt exists");
                return res.redirect('back');
            }else{

                //user is exist now check if password is correct
                if(data.password == req.body.password)
                {
                    res.cookie('user_id', data.id);
                    res.cookie('name',data.name);
                    res.cookie('email',data.email);
                    return res.redirect('/user/profile');
                }else{
                    //if password is incorrect
                    console.log("password is incorrect");
                    return res.redirect('back');
                }
                
            }
    });

    
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
    return res.render('user_sign_in',{});
}

