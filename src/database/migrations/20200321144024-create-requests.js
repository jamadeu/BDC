module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('requests', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      request: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reserveds_date: {
        type: Sequelize.DATE,
      },
      seal: {
        type: Sequelize.STRING,
      },
      expedition_date: {
        type: Sequelize.DATE,
      },
      invoice: {
        type: Sequelize.STRING,
      },
      locality_id: {
        type: Sequelize.INTEGER,
        references: { model: 'localities', key: 'id' },
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('requests');
  },
};
