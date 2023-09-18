'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Results', {
      resultID: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      SelectorID: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      questionaireID: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
      },
      resultSummary: {
        type: Sequelize.JSONB
      },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },

    }, { timestamps: true })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     */
    await queryInterface.dropTable('Results')
  }
};
