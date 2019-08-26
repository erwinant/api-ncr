'use strict';
module.exports = (sequelize, DataTypes) => {
    const uv_report1 = sequelize.define('uv_report1', {
        ReportNo: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        CreateBy: DataTypes.STRING,
        CreateDate: DataTypes.DATE,
        RootCause: DataTypes.STRING,
        Scope: DataTypes.STRING,
        DelayCause: DataTypes.STRING,
        PicName: DataTypes.STRING,
        EnumProp: DataTypes.STRING,
        ReportStatus: DataTypes.STRING,
        Pic: DataTypes.STRING,
        MonthName: DataTypes.STRING,
        Year: DataTypes.STRING,
        ProjectName: DataTypes.STRING,
        ProjectType: DataTypes.STRING,
        ProjectID: DataTypes.NUMBER,
        TotalCost: DataTypes.NUMBER,
        Late: DataTypes.NUMBER,
        PreventiveAction: DataTypes.STRING,
        CorrectiveAction: DataTypes.STRING,
    }, {
            freezeTableName: true,
            timestamps: false,
        });
    uv_report1.associate = function (models) {
        // associations can be defined here

    };
    return uv_report1;
};