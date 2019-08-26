const express=require('express');

const routes=require('./routes/index');

const path=require('path');
const exphbs=require('express-handlebars');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const PORT=process.env.PORT||8080;
const user=require('./models/User');
const app=express();
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','handlebars');
app.use(session({
    secret:'jackward',
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_messages=req.flash('success');
    res.locals.failure_messages=req.flash('failure');
    next();
});
const authRoute=require('./routes/userFunctions')(app,passport);
require('./config/passport')(passport,user);
app.listen(PORT,()=>{
    console.log('server started on '+PORT);
});