'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('UserRooms', {
      id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
      },
      roomId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        references: {
          model: {
            tableName: 'Rooms'
          },
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('UserRooms');
  }
};
