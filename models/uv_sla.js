'use strict';
module.exports = (sequelize, DataTypes) => {
    const uv_sla = sequelize.define('uv_sla', {
        EnumText: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        EnumValue: DataTypes.INTEGER,
        EnumProp: DataTypes.STRING,
        EnumDesc: DataTypes.STRING,
    }, {
            freezeTableName: true,
            timestamps: false,
        });
    uv_sla.associate = function (models) {
        // associations can be defined here
        uv_sla.belongsTo(models.Report, {
            foreignKey: 'EnumText',
            onDelete: 'CASCADE'
        });
    };
    return uv_sla;
};