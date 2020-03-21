import Sequelize, { Model } from 'sequelize';

class Equipment extends Model {
  static init(sequelize) {
    super.init(
      {
        partnumber: Sequelize.STRING,
        series: Sequelize.STRING,
        model: Sequelize.STRING,
      },
      {
        tableName: 'equipments',
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Request, {
      through: 'assigns',
      as: 'requests',
      foreignKey: 'equipment_id',
    });
  }
}

export default Equipment;
