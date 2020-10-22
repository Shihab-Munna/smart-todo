'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {

    static associate(models) {
      // define association here
      Task.belongsTo(models.Note, { foreignKey: 'NoteId' });
    }
  };
  Task.init({
    task: DataTypes.STRING,
    task_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};