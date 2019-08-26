'use strict';
module.exports = (sequelize, DataTypes) => {
  const Enum = sequelize.define('Enum', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    RowStatus: DataTypes.INTEGER,
    EnumProp: DataTypes.STRING,
    EnumText: DataTypes.STRING,
    EnumValue: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    CreateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Enum.associate = function (models) {
    // associations can be defined here
  };
  return Enum;
};