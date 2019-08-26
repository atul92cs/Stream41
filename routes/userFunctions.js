const routes=require('./index');
module.exports=function(app,passport){
    app.post('/signin',passport.authenticate('local-signin',{successRedirect:'/dashboard',failureRedirect:'/signin'}));
    app.post('/signup',passport.authenticate('local-siginup',{successRedirect:'/',failureRedirect:'/signup'}));
    app.get('/broadcast',isLoggedin,routes.broadcast);
    app.get('/watch',isLoggedin,routes.watch);
    app.get('/dashboard',isLoggedin,routes.dashboard);
    app.get('/signin',routes.signin);
    app.get('/signup',routes.signup);
    function isLoggedin(req,res,next)
    {
       if(req.isAuthenticated())
      {
        return next();    
      }
      else
      {
          res.redirect('/signin');
      }
   }

}