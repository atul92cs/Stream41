const sequelize=require('sequelize');
const db=require('../config/database');
const bcrypt=require('bcryptjs');
const User=db.define('users',{
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER
    },
         email:{type:sequelize.STRING},
         password:{type:sequelize.STRING}
});

module.exports=User;