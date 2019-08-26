'use strict';
module.exports = (sequelize, DataTypes) => {
  const PushNotif = sequelize.define('PushNotif', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.INTEGER,
    PushData: DataTypes.STRING,
    DeviceType: DataTypes.STRING,
    Username: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    CreateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE
  }, {
      freezeTableName: true,
      timestamps: false,
    });
    PushNotif.associate = function (models) {
    // associations can be defined here
  };
  return PushNotif;
};