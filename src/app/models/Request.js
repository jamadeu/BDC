import Sequelize, { Model } from 'sequelize';

class Request extends Model {
  static init(sequelize) {
    super.init(
      {
        request: Sequelize.STRING,
        reserveds_date: Sequelize.DATE,
        seal: Sequelize.STRING,
        expedition_date: Sequelize.DATE,
        invoice: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Locality, {
      foreignKey: 'locality_id',
      as: 'locality',
    });

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    this.belongsToMany(models.Equipment, {
      through: 'assigns',
      foreignKey: 'request_id',
      as: 'equipment',
    });
  }
}

export default Request;
