'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReportPhoto = sequelize.define('ReportPhoto', {
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
    Filename: DataTypes.STRING,
    ReportID: DataTypes.NUMBER
  }, {
    freezeTableName: true,
      timestamps: false,
    });
  ReportPhoto.associate = function (models) {
    // associations can be defined here
    ReportPhoto.belongsTo(models.Report, {
      foreignKey: 'ReportID',
      onDelete: 'CASCADE'
    });
  };
  return ReportPhoto;
};