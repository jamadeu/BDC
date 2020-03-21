module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('assigns', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      request_id: {
        type: Sequelize.INTEGER,
        references: { model: 'requests', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      equipment_id: {
        type: Sequelize.INTEGER,
        references: { model: 'equipments', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('assigns');
  },
};
