'use strict';
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
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
        Username: DataTypes.STRING,
        Email: DataTypes.STRING,
        PhoneNumber: DataTypes.STRING,
        Role:DataTypes.STRING,
        Name:DataTypes.STRING,
    }, {
            freezeTableName: true,
            timestamps: false,
        });
    Users.associate = function (models) {
        // associations can be defined here
        Users.belongsTo(models.Project, {
            foreignKey: 'ProjectID',
            onDelete: 'CASCADE'
        });
    };
    return Users;
};