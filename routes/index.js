var exports=module.exports={};

exports.signin=function(req,res)
{
    res.render('login');
}
exports.signup=function(req,res)
{
    res.render('signup');
}
exports.dashboard=function(req,res)
{
    res.render('dashboard');
}
exports.broadcast=function(req,res)
{
    res.render('broadcast',{layout:'second'});
}
exports.watch=function(req,res)
{
    res.render('view',{layout:'third'});
}
exports.land=function(req,res)
{
    res.render('land');
}