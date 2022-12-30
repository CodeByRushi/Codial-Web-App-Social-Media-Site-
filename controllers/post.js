const Post = require('../models/post');

module.exports.createPost = function(req,res){
    console.log(`Content is : ${req.body.content} by ${res.locals.user.id}`);
    Post.create({
        content:req.body.content,
        user:res.locals.user.id
    }, function(err){
        if(err){console.log("Error in creating post in DB ", err);return;}
        console.log("Post is created in DB");
        return res.redirect("back");

    });
 
}
