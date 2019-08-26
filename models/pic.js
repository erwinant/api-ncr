'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pic = sequelize.define('Pic', {
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
    PicName: DataTypes.STRING,
    Username: DataTypes.STRING,
    ProjectID: DataTypes.NUMBER
  }, {
      freezeTableName: true,
      timestamps: false,
    });
  Pic.associate = function (models) {
    // associations can be defined here
    Pic.belongsTo(models.Project, {
      foreignKey: 'ProjectID',
      onDelete: 'CASCADE'
    });
  };
  return Pic;
};