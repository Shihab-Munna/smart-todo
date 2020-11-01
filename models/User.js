'use strict';
const { Model } = require('sequelize');
const { generateHash, validPassword} = require('../util/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      User.hasMany(models.Note);
    }
  };
  User.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password:{
        type: DataTypes.STRING,
        set(value) {
          let hash = generateHash(value);
          this.setDataValue('password', hash);
        },
    } 
  }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};