'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Histories', {
      id: Sequelize.DataTypes.STRING,
      value: Sequelize.DataTypes.STRING,
      roomId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        references: {
          model: {
            tableName: 'rooms'
          },
          key: 'id'
        }
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

    await queryInterface.dropTable('Histories');
  }
};
