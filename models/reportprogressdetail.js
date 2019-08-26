'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReportProgressDetail = sequelize.define('ReportProgressDetail', {
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
    ReportProgressID: DataTypes.NUMBER,
    Start: DataTypes.DATE,
    Pause: DataTypes.DATE,
    Stop: DataTypes.DATE,
    Notes:DataTypes.STRING,
  }, {
    freezeTableName: true,
      timestamps: false,
    });
  ReportProgressDetail.associate = function (models) {
    // associations can be defined here
    ReportProgressDetail.belongsTo(models.ReportProgress, {
      foreignKey: 'ReportProgressID',
      onDelete: 'CASCADE'
    });
  };
  return ReportProgressDetail;
};