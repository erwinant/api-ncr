'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    LocationName: DataTypes.STRING,
    ProjectID: DataTypes.NUMBER,
    CreateBy: DataTypes.STRING,
    CreateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Location.associate = function (models) {
    Location.belongsTo(models.Project, {
      foreignKey: 'ProjectID',
      onDelete: 'CASCADE'
    });
    Location.hasMany(models.Report, {
      foreignKey: 'LocationID',
      onDelete: 'CASCADE'
    });
  };
  return Location;
};