const sequelize=require('sequelize');
const db=require('../config/database');
const bcrypt=require('bcryptjs');
const User=db.define('users',{
         Email:{type:sequelize.STRING},
         Password:{type:sequelize.STRING}
});
User.beforeCreate((user,options)=>{
    const salt=bcrypt.genSaltSync();
    user.Password=bcrypt.hashSync(user.Password,salt);
});
User.prototype.validPassword=(password)=>{
   return bcrypt.compareSync(password,this.password);
};
module.exports=User;