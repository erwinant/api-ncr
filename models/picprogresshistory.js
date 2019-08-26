'use strict';
module.exports = (sequelize, DataTypes) => {
    const PicProgressHistory = sequelize.define('PicProgressHistory', {
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
        ReportProgressID: DataTypes.NUMBER
    }, {
            freezeTableName: true,
            timestamps: false,
        });
    PicProgressHistory.associate = function (models) {
        // associations can be defined here
        PicProgressHistory.belongsTo(models.ReportProgress, {
            foreignKey: 'ReportProgressID',
            onDelete: 'CASCADE'
        });
    };
    return PicProgressHistory;
};