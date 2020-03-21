module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('assigns', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('assigns');
  },
};
