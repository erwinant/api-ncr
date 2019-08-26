'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Id: {
        type: Sequelize.NUMBER
      },
      RowStatus: {
        type: Sequelize.NUMBER
      },
      CreateBy: {
        type: Sequelize.STRING
      },
      CreateDate: {
        type: Sequelize.DATE
      },
      UpdateBy: {
        type: Sequelize.STRING
      },
      UpdateDate: {
        type: Sequelize.DATE
      },
      PicName: {
        type: Sequelize.STRING
      },
      ProjectID: {
        type: Sequelize.NUMBER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pics');
  }
};