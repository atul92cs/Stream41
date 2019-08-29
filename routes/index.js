var exports=module.exports={};
const path=require('path');
exports.signin=function(req,res)
{
    res.sendFile(path.join(__dirname,'../views/login.html'));
}
exports.signup=function(req,res)
{
    res.sendFile(path.join(__dirname,'../views/signup.html'));
}
exports.dashboard=function(req,res)
{
    res.sendFile(path.join(__dirname,'../views/dashboard.html'));
}
exports.broadcast=function(req,res)
{
    res.sendFile(path.join(__dirname,'../views/broadcast.html'));
}
exports.watch=function(req,res)
{
    res.sendFile(path.join(__dirname,'../views/view.html'));
}
exports.land=function(req,res)
{
    res.sendFile(path.join(__dirname,'../views/land.html'));
}
