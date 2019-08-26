'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rules = sequelize.define('Rules', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    CreateBy: DataTypes.STRING,
    CreateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE,
    RuleName: DataTypes.STRING,
    Role: DataTypes.STRING,
    Ui: DataTypes.STRING
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Rules.associate = function (models) {
    // associations can be defined here
  };
  return Rules;
};