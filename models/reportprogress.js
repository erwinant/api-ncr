'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReportProgress = sequelize.define('ReportProgress', {
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
    Pic: DataTypes.STRING,
    ReportID: DataTypes.NUMBER,
    Notes: DataTypes.STRING,
    ProgressStatus: DataTypes.NUMBER,
    Photo: DataTypes.STRING,
    Percentage: DataTypes.NUMBER
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  ReportProgress.associate = function (models) {
    // associations can be defined here
    ReportProgress.hasMany(models.ReportProgressDetail, {
      foreignKey: 'ReportProgressID',
      onDelete: 'CASCADE'
    });
  };
  return ReportProgress;
};