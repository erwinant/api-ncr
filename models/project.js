'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    RowStatus: DataTypes.NUMBER,
    ProjectType: DataTypes.STRING,
    ProjectName: DataTypes.STRING,
    ProjectAddress: DataTypes.STRING,
    ProjectStatus: DataTypes.STRING,
    CreateBy: DataTypes.STRING,
    CreateDate: DataTypes.DATE,
    UpdateBy: DataTypes.STRING,
    UpdateDate: DataTypes.DATE
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Project.associate = function (models) {
    // associations can be defined here
    Project.hasMany(models.Location, {
      foreignKey: 'ProjectID',
      onDelete: 'CASCADE'
    });
    Project.hasMany(models.Pic, {
      foreignKey: 'ProjectID',
      onDelete: 'CASCADE'
    });
    Project.hasMany(models.Report, {
      foreignKey: 'ProjectID',
      onDelete: 'CASCADE'
    });
    Project.hasMany(models.Users, {
      foreignKey: 'ProjectID',
      onDelete: 'CASCADE'
    });
  };
  return Project;
};