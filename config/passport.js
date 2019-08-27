const bcrypt=require('bcryptjs');
module.exports=function(passport,user)
{
    let User=user;
    let LocalStratergy=require('passport-local').Strategy;

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
       User.findOne({where:{id:id}}).then(user=>{
           if(user)
           {
               done(null,user.get());
           }
           else 
           {
               done(user.errors,null);
           }
       });
    });
    passport.use('local-signup',new LocalStratergy(
        {
            usernameField:'email',
            passwordField:'password',
            passReqToCallback:true
        },
        (req,email,password,done)=>
        {
            const hash=(password)=>{
               return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
            };
            User.findOne({where:{email:email}}).then(user=>{
                if(user)
                {
                    return done(null,false,{message:'Email already taken'});
                }
                else 
                {
                    const Password=hash(password);
                    const data=
                    {
                        email:email,
                        password:Password
                    };
                    User.create(data).then((newUser,created)=>{
                        if(!newUser)
                        {
                            return done(null,false);
                        }
                        if(newUser)
                        {
                            return done(null,newUser);
                        }
                    });
                }
            });
        }
    ));
    passport.use('local-signin',new LocalStratergy(
        {
            usernameField:'email',
            passwordField:'password',
            passReqToCallback:true
        },
         (req,email,password,done)=>{
             const User=user;
            const isValid=(userpass,password)=>{
               return bcrypt.compareSync(password,userpass);
            };
            User.findOne({where:{email:email}}).then(user=>{
                  if(!user)
                  {
                    return done(null,false,{message:'Email does not exist'});
                  }
                 if(!isValid(user.password,password))
                  {
                      return done(null,false,{message:'Incorrect Password'});
                  }
                 
                      let userinfo=user.get();
                      return done(null,userinfo);
                  
            }).catch(err=>{
                 console.log('Error'+err);
                 return done(null,false,{message:'Something went wrong'});
            });
         }

    ));
}