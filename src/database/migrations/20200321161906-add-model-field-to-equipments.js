module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('equipments', 'model', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('equipments');
  },
};
