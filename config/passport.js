const bcrypt=require('bcryptjs');
module.exports=function(passport,user)
{
    let User=user;
    let LocalStratergy=require('passport-local').Strategy;

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id).then((user)=>{
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
               return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null0);
            };
            User.findOne({where:{email:email}}).then(user=>{
                if(user)
                {
                    return done(null,false,{message:'Email id is already taken'});
                }
                else 
                {
                    const Password=hash(password);
                    const data=
                    {
                        Email:email,
                        Password:Password
                    }
                    User.create(data).then((newUser,created)=>{
                        if(!user)
                        {
                            return done(null,{message:'Error occured'});
                        }
                        if(user)
                        {
                            return done(null,{message:'User registered'});
                        }
                    });
                }
            }).catch(err=>{
                return done(null,{message:'Unknown error occured'});
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
          
            const isValid=(userpass,password)=>{
               return bcrypt.compareSync(password,userpass);
            };
            User.findOne({where:{Email:email}}).then(user=>{
                  if(!user)
                  {
                    return done(null,false,{message:'Email does not exist'});
                  }
                  else if(!isValid(user.Password,password))
                  {
                      return done(null,false,{message:'Incorrect Password'});
                  }
                  else
                  {
                      const userinfo=user.get();
                      return(null,userinfo);
                  }
            }).catch(err=>{
                 console.log('Error'+err);
                 return done(null,false,{message:'Something went wrong'});
            });
         }

    ));
}