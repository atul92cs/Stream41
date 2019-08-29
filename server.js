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
const http=require('http').Server(app);
const io=require('socket.io')(http);
let broadcaster;

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','html');
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
io.sockets.on('error', e => console.log(e));
io.sockets.on('connection',(socket)=>{
   socket.on('broadcaster',()=>{
       broadcaster=socket.id;
       socket.broadcast.emit('broadcaster');
   });
   socket.on('watcher',()=>{
       broadcaster && socket.to(broadcaster).emit('watcher',socket.id);
   });
   socket.on('offer',(id,message)=>{
       socket.to(id).emit('offer',socket.id,message);
   });
   socket.on('answer',(id,message)=>{
       socket.to(id).emit('answer',socket.id,message);
   });
   socket.on('candidate',(id,message)=>{
       socket.to(id).emit('candidate',socket.id,message);
   });
   socket.on('disconnect',()=>{
      broadcaster && socket.to(broadcaster).emit('bye',socket.id);
   });
});

const authRoute=require('./routes/userFunctions')(app,passport);
require('./config/passport')(passport,user);
http.listen(PORT,()=>{
    console.log('server started on '+PORT);
});