'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
  
    static associate(models) {
      // define association here
      Note.belongsTo(models.User, { foreignkey: 'userId' }),
      Note.hasMany(models.Task);
    }
  };
  Note.init({
    note_title: DataTypes.STRING,
    note_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};