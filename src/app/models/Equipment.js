import Sequelize, { Model } from 'sequelize';

class Equipment extends Model {
  static init(sequelize) {
    super.init(
      {
        partnumber: Sequelize.STRING,
        series: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Request, {
      through: 'assigns',
      foreignKey: 'equipment_id',
      as: 'equipment',
    });
  }
}

export default Equipment;
