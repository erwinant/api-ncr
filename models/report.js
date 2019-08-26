'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
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
    ReportNo: DataTypes.STRING,
    ReportStatus: DataTypes.NUMBER,
    ProjectID: DataTypes.NUMBER,
    LocationID: DataTypes.NUMBER,
    RootCause: DataTypes.STRING,
    Scope: DataTypes.STRING,
    DelayCause: DataTypes.STRING,
    Matters: DataTypes.STRING,
    ReportBy: DataTypes.STRING,
    Description: DataTypes.STRING,
    LocationDetail: DataTypes.STRING,
    Notes: DataTypes.STRING,
    Founder: DataTypes.STRING,
    SLA: DataTypes.STRING,
    TotalCost: DataTypes.NUMBER,
    FinishDate: DataTypes.DATE,
    AssignDate: DataTypes.DATE,
    Pic: DataTypes.STRING,
    SLADesc: DataTypes.STRING,
    CloseDate: DataTypes.DATE,
    PreventiveAction:DataTypes.STRING,
    CorrectiveAction:DataTypes.STRING,
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Report.associate = function (models) {
    // associations can be defined here
    Report.hasMany(models.ReportPhoto, {
      foreignKey: 'ReportID',
      onDelete: 'CASCADE'
    });
    Report.hasMany(models.ReportProgress, {
      foreignKey: 'ReportID',
      onDelete: 'CASCADE'
    });
    Report.belongsTo(models.Location, {
      foreignKey: 'LocationID',
      onDelete: 'CASCADE'
    });
    Report.belongsTo(models.Project, {
      foreignKey: 'ProjectID',
      onDelete: 'CASCADE'
    });
    Report.belongsTo(models.uv_sla, {
      foreignKey: 'SLA',
      onDelete: 'CASCADE'
    });
  };
  return Report;
};